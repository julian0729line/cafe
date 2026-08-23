-- ============================================================================
-- Tabla del formulario de contacto (`/contacto`).
--
-- No requiere login: un visitante anónimo inserta un mensaje y nada más.
-- El dueño del café los lee desde el editor de tablas de Supabase, que usa
-- `service_role` y no pasa por RLS.
--
-- Idempotente y transaccional. Ver el procedimiento al final.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1. Tabla
--
-- Las columnas son exactamente las que envía la server action
-- (`app/contacto/actions.ts`): nombre, email, mensaje. `email` es opcional
-- allí, así que aquí es nullable. No se añaden campos que el formulario no
-- manda (teléfono, asunto, etc.): una columna que nadie llena solo confunde
-- a quien lea la tabla.
-- ---------------------------------------------------------------------------

create table if not exists public.mensajes_contacto (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  email      text,
  mensaje    text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. Validación de integridad
--
-- Esto NO es anti-spam (ver la nota sobre rate limiting al final): es evitar
-- que una fila absurda entre a la tabla. Sin un límite superior, `text` en
-- Postgres admite ~1 GB por valor, así que un único POST puede inflar la
-- base. Sin un límite inferior, `btrim` deja pasar filas de espacios que la
-- validación del cliente creía haber rechazado.
--
-- En constraints y no en la política: un `check` se evalúa igual sin importar
-- quién inserte, y el error que devuelve (23514) es explícito, mientras que
-- una política que no pasa devuelve un genérico "violates row-level security"
-- imposible de diagnosticar.
--
-- Bloque `do` porque `add constraint` no admite `if not exists`.
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'mensajes_contacto_nombre_check'
      and conrelid = 'public.mensajes_contacto'::regclass
  ) then
    alter table public.mensajes_contacto
      add constraint mensajes_contacto_nombre_check
      check (char_length(btrim(nombre)) between 1 and 120);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'mensajes_contacto_mensaje_check'
      and conrelid = 'public.mensajes_contacto'::regclass
  ) then
    alter table public.mensajes_contacto
      add constraint mensajes_contacto_mensaje_check
      check (char_length(btrim(mensaje)) between 1 and 2000);
  end if;

  -- 254 es el máximo de una dirección de correo (RFC 5321). La comprobación
  -- de forma es deliberadamente laxa: validar correos con una expresión
  -- estricta rechaza direcciones legítimas, y aquí solo queremos descartar
  -- basura evidente. El campo sigue siendo opcional.
  if not exists (
    select 1 from pg_constraint
    where conname = 'mensajes_contacto_email_check'
      and conrelid = 'public.mensajes_contacto'::regclass
  ) then
    alter table public.mensajes_contacto
      add constraint mensajes_contacto_email_check
      check (
        email is null
        or (char_length(email) between 3 and 254 and position('@' in email) > 1)
      );
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 3. RLS
-- ---------------------------------------------------------------------------

alter table public.mensajes_contacto enable row level security;

-- ---------------------------------------------------------------------------
-- 4. Privilegios SQL
--
-- Capa distinta de RLS y, en esta tabla, la más importante: Supabase concede
-- por defecto select/insert/update/delete a `anon` y `authenticated` sobre
-- lo que se cree en `public`. Si nos quedáramos solo con la política de
-- insert, `anon` conservaría el privilegio de `select`, `update` y `delete`;
-- lo único que lo frenaría sería la ausencia de políticas para esos comandos
-- — es decir, la seguridad dependería de que nadie añada una política
-- permisiva por descuido más adelante.
--
-- Se revoca todo y se concede insert SOLO sobre las tres columnas del
-- formulario. `id` y `created_at` quedan fuera a propósito: con el grant a
-- nivel de tabla, un cliente podía mandar su propio `created_at` y falsear
-- la fecha de un mensaje.
-- ---------------------------------------------------------------------------

revoke all on table public.mensajes_contacto from public;
revoke all on table public.mensajes_contacto from anon;
revoke all on table public.mensajes_contacto from authenticated;

grant insert (nombre, email, mensaje)
  on table public.mensajes_contacto to anon, authenticated;

-- Sin select: nadie lee mensajes desde la API pública.
-- Sin update ni delete: un mensaje enviado no se altera ni se borra por API.

grant all on table public.mensajes_contacto to service_role;

-- ---------------------------------------------------------------------------
-- 5. Política
--
-- Una sola, y solo para `insert`. No existe política de select/update/delete,
-- así que esos comandos quedan denegados por partida doble (sin privilegio y
-- sin política). `with check (true)` es correcto aquí: no hay concepto de
-- "fila propia" en un formulario anónimo, y las restricciones de contenido
-- viven en los constraints del punto 2.
-- ---------------------------------------------------------------------------

drop policy if exists "Cualquiera puede enviar un mensaje" on public.mensajes_contacto;

create policy "Cualquiera puede enviar un mensaje"
  on public.mensajes_contacto for insert
  to anon, authenticated
  with check (true);

commit;


-- ============================================================================
-- PROCEDIMIENTO
--
-- A. ESTADO ANTES
--
--    select policyname, cmd, roles, with_check
--    from pg_policies
--    where schemaname = 'public' and tablename = 'mensajes_contacto';
--
--    select grantee, privilege_type, column_name
--    from information_schema.column_privileges
--    where table_schema = 'public' and table_name = 'mensajes_contacto'
--    order by grantee, column_name;
--
-- B. ENSAYO: el archivo completo con `rollback;` en vez de `commit;`.
--
-- C. CORRIDA REAL: el archivo tal cual.
--
-- D. VERIFICACIÓN: repite (A), y corre la parte de contacto de
--    `supabase/tests.sql`. El editor SQL corre como `postgres` y salta RLS,
--    así que probar ahí "a secas" no demuestra nada.
--
-- ROLLBACK DESPUÉS DEL COMMIT
--
--    begin;
--    drop policy if exists "Cualquiera puede enviar un mensaje" on public.mensajes_contacto;
--    -- la tabla y los mensajes recibidos se conservan; `drop table` los borra.
--    commit;
--
-- ============================================================================
-- RATE LIMITING: FUERA DE ESTE ARCHIVO, A PROPÓSITO
--
-- Este archivo protege la INTEGRIDAD del dato y los PERMISOS. No intenta
-- frenar el abuso, y no debería: un límite por IP o por ventana de tiempo no
-- se puede implementar honestamente dentro de una política RLS. Postgres no
-- conoce la IP del cliente, y un `check` que contara inserciones recientes
-- haría un scan por cada envío y sería trivial de esquivar.
--
-- Fingir el rate limiting aquí sería peor que no tenerlo: daría por resuelto
-- un problema que seguiría abierto.
--
-- Las tres opciones reales, para un checkpoint aparte:
--
--   1. Pre-request check de la Data API. Una función que Supabase ejecuta
--      antes de cada petición y que puede rechazarla mirando cabeceras
--      (incluida la IP). Es lo más cercano a "gratis": no añade
--      infraestructura. A cambio corre en el camino crítico de TODAS las
--      peticiones, así que tiene que ser muy barata.
--
--   2. Edge Function + almacén de contadores (Redis/Upstash). El control más
--      fino: ventanas deslizantes, límites distintos por ruta. Añade un
--      servicio externo, una credencial más y un punto de fallo — el
--      formulario deja de funcionar si el contador no responde, salvo que se
--      diseñe el modo degradado.
--
--   3. CAPTCHA / anti-bot (Turnstile, hCaptcha) en el formulario. Ataca el
--      spam automatizado, que es el 99% del problema real en un formulario
--      de café, y no limita a un humano legítimo que escriba dos veces.
--      Cuesta fricción para el visitante y un script de terceros — que en
--      este sitio hay que mirar con lupa por el presupuesto de rendimiento.
--
-- Recomendación: (3) primero, (1) si hace falta reforzar. (2) es
-- desproporcionado para el volumen esperado de este sitio.
-- Nada de esto se implementa sin autorización explícita.
-- ============================================================================
