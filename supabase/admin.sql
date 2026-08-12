-- ============================================================================
-- Rol de administrador + cierre de la escalada de privilegios en `perfiles`.
--
-- NO EJECUTAR A CIEGAS. Procedimiento en 4 fases al final del archivo:
--   A. estado antes   B. ensayo con ROLLBACK   C. corrida real   D. verificación
--
-- Este archivo es idempotente y transaccional: o se aplica entero, o no se
-- aplica nada. Correrlo dos veces deja el mismo estado que correrlo una vez.
--
-- Requiere `setup.sql` ya aplicado (tabla `perfiles`, RLS y trigger).
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 0. Schema privado para los helpers
--
-- Los helpers NO pueden vivir en `public`: PostgREST expone ese schema, así
-- que cualquier función allí es invocable por RPC desde el navegador con la
-- anon key. `private` no está en los schemas expuestos por la Data API, así
-- que estas funciones solo son alcanzables desde dentro de la base.
-- ---------------------------------------------------------------------------

create schema if not exists private;

-- `usage` en el schema es necesario para que las expresiones de las políticas
-- (que se evalúan con los privilegios de quien consulta) puedan llamar al
-- helper. No expone nada por API: PostgREST solo enruta schemas expuestos.
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------
-- 1. Columna `rol`
--
-- En cuatro pasos en vez de uno solo, para ser idempotente incluso si una
-- versión anterior de este archivo ya creó la columna como nullable.
-- ---------------------------------------------------------------------------

alter table public.perfiles add column if not exists rol text;

update public.perfiles set rol = 'cliente' where rol is null;

alter table public.perfiles alter column rol set default 'cliente';
alter table public.perfiles alter column rol set not null;

-- Solo dos roles existen en el diseño actual. Sin esto, un `update` podría
-- dejar `rol = 'aadmin'` (typo) y el usuario perdería acceso en silencio, o
-- podría inventarse un rol que ninguna política contempla.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'perfiles_rol_check'
      and conrelid = 'public.perfiles'::regclass
  ) then
    alter table public.perfiles
      add constraint perfiles_rol_check check (rol in ('cliente', 'admin'));
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 2. Helper: ¿el usuario actual es admin?
--
-- ESTE ES EL ARREGLO DE LA RECURSIÓN. Una política `select` sobre `perfiles`
-- no puede consultar `perfiles` directamente: RLS también se aplicaría a esa
-- subconsulta, y evaluar la política exigiría evaluar la política.
-- Postgres lo corta con `42P17: infinite recursion detected in policy for
-- relation "perfiles"`, y a partir de ahí NINGUNA lectura de la tabla
-- funciona (ni siquiera la del propio dueño).
--
-- `security definer` hace que el cuerpo corra con los privilegios del creador
-- (el dueño de la tabla), que está exento de RLS: la subconsulta NO vuelve a
-- disparar las políticas y la recursión desaparece.
--
-- `set search_path = ''` es obligatorio en toda función `security definer`:
-- sin él, quien la invoque puede anteponer un schema propio al search_path y
-- hacer que `perfiles` resuelva a una tabla suya. Con el search_path vacío,
-- cada relación queda calificada con su schema explícito y no hay ambigüedad.
-- ---------------------------------------------------------------------------

create or replace function private.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.perfiles p
    where p.id = (select auth.uid())
      and p.rol = 'admin'
  );
$$;

-- Postgres concede `execute` a PUBLIC por defecto en cada función nueva. Para
-- una función `security definer` eso es demasiado: se revoca y se concede
-- solo a `authenticated`, que es el único rol cuyas políticas la llaman.
-- `anon` no la necesita — ninguna política suya la invoca.
revoke all on function private.es_admin() from public;
grant execute on function private.es_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- 3. Trigger que preserva `rol`
--
-- Segunda capa, independiente de RLS y de los grants. A diferencia de un
-- `with check` con subconsulta, un trigger recibe OLD y NEW explícitos: no
-- depende de qué versión de la fila vea el snapshot del statement. Es la
-- diferencia entre "creemos que MVCC nos devuelve el valor viejo" y "tenemos
-- el valor viejo en la mano".
--
-- Solo bloquea a `authenticated` (el rol con el que PostgREST ejecuta las
-- peticiones del navegador). `service_role` y `postgres` — el editor SQL y
-- las tareas administrativas — sí pueden cambiar roles, que es justamente
-- como se nombra a un admin.
-- ---------------------------------------------------------------------------

-- OJO: `security invoker` (el modo por defecto), NO `security definer`. Dentro
-- de una función `security definer`, `current_user` es el DUEÑO de la función,
-- así que la comparación de abajo nunca sería cierta y el trigger dejaría
-- pasar todo en silencio. Aquí no hace falta elevar privilegios: la función no
-- lee ninguna tabla, solo compara OLD contra NEW.
create or replace function private.preservar_rol()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.rol is distinct from old.rol and current_user = 'authenticated' then
    raise exception 'El rol de un perfil no puede modificarse desde la API pública'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function private.preservar_rol() from public;

drop trigger if exists perfiles_preservar_rol on public.perfiles;

create trigger perfiles_preservar_rol
  before update on public.perfiles
  for each row
  execute function private.preservar_rol();

-- ---------------------------------------------------------------------------
-- 4. Privilegios SQL (capa independiente de RLS)
--
-- RLS decide QUÉ FILAS ve un rol; los GRANT deciden QUÉ OPERACIONES y SOBRE
-- QUÉ COLUMNAS puede hacer. Son dos capas distintas y ambas hacen falta:
-- Supabase concede por defecto select/insert/update/delete a `anon` y
-- `authenticated` sobre todo lo que se cree en `public`, así que sin este
-- bloque `rol` es una columna escribible y solo RLS lo impide.
--
-- Aquí está la garantía dura contra la escalada: `authenticated` simplemente
-- NO tiene privilegio de escritura sobre la columna `rol`. Un intento falla
-- con `42501 permission denied for column rol` antes de que RLS opine.
--
-- Las columnas concedidas son exactamente las que envía `/perfil/editar`
-- (`app/perfil/editar/page.tsx`), que usa `upsert` — de ahí que `id` aparezca
-- también en el update: PostgREST incluye la clave del conflicto en el
-- `on conflict do update`. Cambiar `id` a otro usuario sigue siendo imposible
-- porque la política exige `auth.uid() = id` tanto al entrar como al salir.
-- ---------------------------------------------------------------------------

revoke all on table public.perfiles from public;
revoke all on table public.perfiles from anon;
revoke all on table public.perfiles from authenticated;

-- `anon` no recibe nada: ninguna ruta pública lee ni escribe perfiles.

grant select on table public.perfiles to authenticated;

grant insert (id, nombre, bebida_favorita, espacio_favorito, notas, updated_at)
  on table public.perfiles to authenticated;

grant update (id, nombre, bebida_favorita, espacio_favorito, notas, updated_at)
  on table public.perfiles to authenticated;

-- Sin `delete`: no hay UI que borre perfiles ni política que lo permita.

grant all on table public.perfiles to service_role;

-- ---------------------------------------------------------------------------
-- 5. Políticas RLS
--
-- Se recrean TODAS las de `perfiles` (incluidas las tres de `setup.sql`) para
-- que este archivo sea la foto completa y verificable del estado final, y no
-- una capa de parches sobre políticas que hay que ir a leer a otro archivo.
--
-- `to authenticated` en todas: sin esa cláusula una política aplica al rol
-- `public`, es decir también a `anon`. Hoy eso no abre nada (con `anon`,
-- `auth.uid()` es null y `null = id` da null, que RLS trata como falso), pero
-- deja la puerta dependiendo de una sutileza de SQL en vez de una regla.
--
-- `(select auth.uid())` en vez de `auth.uid()`: Postgres lo evalúa una sola
-- vez como InitPlan en lugar de una vez por fila. Es la recomendación de
-- rendimiento de Supabase y se nota en la tabla completa que lee /admin.
-- ---------------------------------------------------------------------------

drop policy if exists "Ver propio perfil" on public.perfiles;
drop policy if exists "Admin ve todos los perfiles" on public.perfiles;
drop policy if exists "Insertar propio perfil" on public.perfiles;
drop policy if exists "Actualizar propio perfil" on public.perfiles;

create policy "Ver propio perfil"
  on public.perfiles for select
  to authenticated
  using ((select auth.uid()) = id);

-- Permisiva: se suma (OR) a la anterior. Un admin ve su fila por la primera
-- política y las demás por esta. Llama al helper, nunca a `perfiles`.
create policy "Admin ve todos los perfiles"
  on public.perfiles for select
  to authenticated
  using (private.es_admin());

create policy "Insertar propio perfil"
  on public.perfiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

-- `using` filtra qué filas pueden tocarse; `with check` valida cómo quedan.
-- La versión anterior omitía `with check`, y Postgres entonces reutiliza
-- `using` como check — que era exactamente el hueco por el que se colaba la
-- escalada. `rol` ya no se menciona aquí: lo protegen el grant de columna
-- (capa 4) y el trigger (capa 3).
create policy "Actualizar propio perfil"
  on public.perfiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- ---------------------------------------------------------------------------
-- 6. Nombrar al admin
--
-- Falla en voz alta si el usuario no existe. La versión anterior hacía un
-- `update ... where id = (select ...)`: si el correo no estaba registrado,
-- afectaba 0 filas, reportaba éxito y dejaba el sistema sin ningún admin sin
-- que nadie se enterara.
--
-- Correo ya presente en el repositorio desde la versión anterior de este
-- archivo; no se introduce una identidad nueva.
-- ---------------------------------------------------------------------------

do $$
declare
  v_email text := 'julian.vasquezbo@gmail.com';
  v_id    uuid;
begin
  select u.id into v_id from auth.users u where u.email = v_email;

  if v_id is null then
    raise exception
      'No hay ningún usuario registrado con el correo %. Regístralo en la app antes de correr este script.',
      v_email;
  end if;

  update public.perfiles set rol = 'admin' where id = v_id;

  if not found then
    raise exception
      'El usuario % existe en auth.users pero no tiene fila en public.perfiles (¿falló el trigger handle_new_user?).',
      v_email;
  end if;
end $$;

commit;


-- ============================================================================
-- PROCEDIMIENTO
--
-- El editor SQL de Supabase corre como `postgres`, que está EXENTO de RLS.
-- Una consulta hecha ahí sin cambiar de rol NO prueba nada sobre las
-- políticas. Las pruebas reales están en `supabase/tests.sql`.
-- ============================================================================
--
-- A. ESTADO ANTES (solo lectura, guarda la salida antes de tocar nada)
--
--    select policyname, cmd, roles, qual, with_check
--    from pg_policies where schemaname = 'public' and tablename = 'perfiles'
--    order by policyname;
--
--    select grantee, privilege_type, column_name
--    from information_schema.column_privileges
--    where table_schema = 'public' and table_name = 'perfiles'
--    order by grantee, column_name;
--
--    select count(*) as perfiles, count(*) filter (where rol = 'admin') as admins
--    from public.perfiles;   -- la columna `rol` puede no existir todavía
--
-- B. ENSAYO CON ROLLBACK (no deja rastro)
--
--    Pega el archivo completo cambiando el `commit;` final por `rollback;`.
--    Si algo falla, falla aquí y la base queda intacta. Comprueba en
--    particular que no aparezca `42P17` (recursión) ni `23514` (el check de
--    `rol` chocando con un valor ya existente distinto de cliente/admin).
--
-- C. CORRIDA REAL
--
--    El archivo tal cual, con su `commit;`. Es todo o nada.
--
-- D. VERIFICACIÓN POSTERIOR
--
--    Repite las tres consultas de (A) y compara. Después corre
--    `supabase/tests.sql`, que es lo único que prueba de verdad las políticas.
--
-- ROLLBACK DESPUÉS DE UN COMMIT
--
--    Este script no borra datos: crea una columna, políticas, dos funciones y
--    un trigger. Para revertirlo:
--
--      begin;
--      drop trigger if exists perfiles_preservar_rol on public.perfiles;
--      drop function if exists private.preservar_rol();
--      drop policy if exists "Admin ve todos los perfiles" on public.perfiles;
--      drop function if exists private.es_admin();
--      grant update on table public.perfiles to authenticated;  -- estado laxo previo
--      commit;
--
--    No se recomienda: devuelve la escalada de privilegios. Documentado por
--    completitud, no como plan.
-- ============================================================================
