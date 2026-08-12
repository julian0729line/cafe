-- ============================================================================
-- PRUEBAS DE RLS Y PRIVILEGIOS — NO ES UNA MIGRACIÓN
--
-- Este archivo no crea ni modifica nada. Cada prueba abre una transacción,
-- simula un usuario y termina en `rollback`, así que puede correrse contra
-- una base real sin dejar rastro.
--
-- No lo ejecutes entero de una vez: cada bloque se pega y se corre por
-- separado, comparando el resultado con el "ESPERADO" que lo acompaña.
--
-- POR QUÉ NO BASTA CON CONSULTAR NORMALMENTE
--
-- El editor SQL de Supabase corre como `postgres`, que es dueño de las
-- tablas y está EXENTO de RLS. Un `select` hecho ahí devuelve todas las
-- filas siempre, políticas o no. Para probar seguridad hay que cambiar de
-- rol (`set local role`) y simular el JWT que PostgREST inyectaría
-- (`request.jwt.claims`), que es de donde `auth.uid()` saca el usuario.
--
-- El orden importa: primero las claims, después el rol. Al revés, `set role`
-- ya habría bajado privilegios y algunos entornos rechazan la asignación.
--
-- Requiere `setup.sql`, `admin.sql` y `contact.sql` ya aplicados.
-- ============================================================================


-- ---------------------------------------------------------------------------
-- PASO 0 — conseguir los UUID reales y sustituirlos abajo
-- ---------------------------------------------------------------------------

select p.id, u.email, p.rol
from public.perfiles p
join auth.users u on u.id = p.id
order by p.rol, u.email;

-- Reemplaza en todo el archivo:
--   00000000-0000-0000-0000-000000000001  -> un usuario con rol 'cliente'
--   00000000-0000-0000-0000-000000000002  -> otro usuario cualquiera (la víctima)
--   00000000-0000-0000-0000-000000000003  -> el usuario con rol 'admin'


-- ===========================================================================
-- 1. Un usuario normal puede leer SU perfil
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

select id, nombre, rol from public.perfiles;

rollback;
-- ESPERADO: exactamente 1 fila, la del usuario 001.
-- Si salen más, la política "Ver propio perfil" no está filtrando.
-- Si sale 42P17, la recursión sigue viva (ver prueba 6).


-- ===========================================================================
-- 2. Un usuario normal puede actualizar un campo permitido de su perfil
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

update public.perfiles
set bebida_favorita = 'prueba-rls', updated_at = now()
where id = '00000000-0000-0000-0000-000000000001';

rollback;
-- ESPERADO: UPDATE 1.
-- Esta prueba es la que evita el falso positivo de "todo está bloqueado":
-- si falla, el hardening rompió /perfil/editar.


-- ===========================================================================
-- 3. Un usuario normal NO puede convertirse en admin   ← LA PRUEBA CLAVE
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

update public.perfiles
set rol = 'admin'
where id = '00000000-0000-0000-0000-000000000001';

rollback;
-- ESPERADO: ERROR 42501 «permission denied for table perfiles».
-- El grant de columna corta el intento antes incluso de llegar a RLS.
--
-- El mensaje dice "table" y no "column rol": cuando el rol carece de
-- privilegio a nivel de tabla y la columna concreta tampoco está concedida,
-- Postgres reporta la denegación a nivel de tabla. Comprobado en Postgres 16.
-- Lo que importa es que deniega; el mensaje es menos específico de lo que
-- sugiere la intuición, y conviene saberlo para no confundirlo con un fallo
-- de configuración distinto.
--
-- ANTES del hardening esto devolvía «UPDATE 1»: ese es el bug que se cierra.
-- Vale la pena correrla ANTES y DESPUÉS para ver el cambio con los propios
-- ojos; el `rollback` garantiza que la corrida "antes" no deja un admin real.


-- ===========================================================================
-- 3-bis. Tampoco por la puerta de atrás del upsert
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

insert into public.perfiles (id, nombre, rol)
values ('00000000-0000-0000-0000-000000000001', 'yo', 'admin')
on conflict (id) do update set rol = excluded.rol;

rollback;
-- ESPERADO: ERROR 42501 «permission denied for table perfiles» (`rol` no está
-- ni en el grant de insert ni en el de update). Cubre la vía que usa
-- /perfil/editar, que escribe con `upsert` y no con `update`.


-- ===========================================================================
-- 4. Un usuario normal NO puede modificar el perfil de otro
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

update public.perfiles
set nombre = 'secuestrado'
where id = '00000000-0000-0000-0000-000000000002';

rollback;
-- ESPERADO: UPDATE 0.
-- Ojo: aquí NO hay error. RLS filtra las filas que el `using` no deja ver,
-- así que el update simplemente no encuentra nada. «UPDATE 0» es el éxito.
-- Si aparece «UPDATE 1», la política de update está rota.


-- ===========================================================================
-- 5. El admin ve todos los perfiles — y solo eso
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000003","role":"authenticated"}';
set local role authenticated;

select count(*) from public.perfiles;

rollback;
-- ESPERADO: el total de perfiles de la base (lo que necesita /admin, que
-- hace select('*') sobre la tabla entera).

begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000003","role":"authenticated"}';
set local role authenticated;

update public.perfiles
set rol = 'admin'
where id = '00000000-0000-0000-0000-000000000002';

rollback;
-- ESPERADO: ERROR 42501 «permission denied for table perfiles».
-- Deliberado: en el diseño actual NINGÚN usuario de la API cambia roles,
-- ni siquiera un admin. Los roles se otorgan desde el editor SQL con
-- service_role. Si algún día el panel necesita hacerlo, hará falta una
-- función `security definer` dedicada, no ampliar este grant.


-- ===========================================================================
-- 6. `perfiles` se lee sin error de recursión
-- ===========================================================================
begin;
set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

explain (costs off) select * from public.perfiles;
select private.es_admin();

rollback;
-- ESPERADO: el plan se imprime y `es_admin()` devuelve false, sin
-- «42P17 infinite recursion detected in policy for relation "perfiles"».
--
-- Esta es la prueba de que el helper `security definer` hizo su trabajo: la
-- política de admin consulta perfiles sin volver a disparar RLS.


-- ===========================================================================
-- 7. Un visitante anónimo puede enviar un mensaje de contacto
-- ===========================================================================
begin;
set local role anon;

insert into public.mensajes_contacto (nombre, email, mensaje)
values ('Prueba', 'prueba@ejemplo.com', 'Mensaje de prueba de RLS.');

rollback;
-- ESPERADO: INSERT 0 1.
-- Si falla, /contacto está roto para el público, que es su único usuario.


-- ===========================================================================
-- 8. Un mensaje demasiado largo se rechaza
-- ===========================================================================
begin;
set local role anon;

insert into public.mensajes_contacto (nombre, mensaje)
values ('Prueba', repeat('x', 2001));

rollback;
-- ESPERADO: ERROR 23514 «violates check constraint
-- "mensajes_contacto_mensaje_check"».

begin;
set local role anon;

insert into public.mensajes_contacto (nombre, mensaje)
values ('   ', 'hola');

rollback;
-- ESPERADO: ERROR 23514 sobre `mensajes_contacto_nombre_check`.
-- Un nombre de solo espacios no es un nombre.


-- ===========================================================================
-- 9. Un anónimo NO puede leer los mensajes
-- ===========================================================================
begin;
set local role anon;

select * from public.mensajes_contacto;

rollback;
-- ESPERADO: ERROR 42501 «permission denied for table mensajes_contacto».
-- Nótese que el error es de PRIVILEGIO, no de política: `anon` ni siquiera
-- tiene `select` sobre la tabla. Es la protección más fuerte de las dos,
-- porque no depende de que nadie añada una política de select por error.


-- ===========================================================================
-- 10. Un anónimo NO puede modificar mensajes
-- ===========================================================================
begin;
set local role anon;

update public.mensajes_contacto set mensaje = 'alterado';

rollback;
-- ESPERADO: ERROR 42501.


-- ===========================================================================
-- 11. Un anónimo NO puede borrar mensajes
-- ===========================================================================
begin;
set local role anon;

delete from public.mensajes_contacto;

rollback;
-- ESPERADO: ERROR 42501.
-- Sin esto, un `delete` sin `where` desde la anon key vaciaría la tabla.


-- ===========================================================================
-- 12. Un anónimo no toca `perfiles` en absoluto
-- ===========================================================================
begin;
set local role anon;

select * from public.perfiles;

rollback;
-- ESPERADO: ERROR 42501 «permission denied for table perfiles».
-- Ninguna ruta pública lee perfiles, así que `anon` no necesita nada ahí.


-- ===========================================================================
-- 13. Un anónimo no puede falsear la fecha de un mensaje
-- ===========================================================================
begin;
set local role anon;

insert into public.mensajes_contacto (nombre, mensaje, created_at)
values ('Prueba', 'hola', '2001-01-01');

rollback;
-- ESPERADO: ERROR 42501. `created_at` e `id` quedan fuera del grant de
-- insert a propósito: los pone la base, no el cliente.


-- ===========================================================================
-- 14. La segunda capa aguanta sola (prueba del trigger)
-- ===========================================================================
begin;

-- Simula que en el futuro alguien vuelve a conceder el privilegio de escribir
-- `rol` — por un script nuevo, una migración descuidada o un `grant all`.
grant update (rol) on table public.perfiles to authenticated;

set local "request.jwt.claims" = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
set local role authenticated;

update public.perfiles set rol = 'admin'
where id = '00000000-0000-0000-0000-000000000001';

rollback;
-- ESPERADO: ERROR «El rol de un perfil no puede modificarse desde la API
-- pública», lanzado por private.preservar_rol().
--
-- Esta prueba es la que justifica que exista el trigger: sin él, perder el
-- grant de columna reabriría la escalada sin que nadie se diera cuenta.
-- El `grant` está dentro de la transacción, así que el `rollback` lo deshace.


-- ===========================================================================
-- 15. ¿Una petición autenticada real llega como `authenticated`?
--
-- Las pruebas 1-14 SIMULAN el rol con `set local role`. Eso valida las
-- políticas, pero no demuestra que PostgREST use ese mismo rol en el proyecto
-- real — y de ahí depende el trigger `preservar_rol`, que solo bloquea cuando
-- `current_user = 'authenticated'`.
--
-- Este bloque es la parte que NO se puede resolver desde el editor SQL: hay
-- que entrar por la API. Con la sesión iniciada en la app, saca el access
-- token (`supabase.auth.getSession()` en la consola del navegador) y lanza:
--
--   curl -i -X PATCH \
--     "https://<PROYECTO>.supabase.co/rest/v1/perfiles?id=eq.<TU_UUID>" \
--     -H "apikey: <ANON_KEY>" \
--     -H "Authorization: Bearer <ACCESS_TOKEN>" \
--     -H "Content-Type: application/json" \
--     -d '{"rol":"admin"}'
--
-- ESPERADO: 401/403 con un error de privilegios sobre `perfiles`.
--   - Si responde 2xx, la escalada sigue abierta: NO fusionar ni dar por
--     bueno el hardening.
--   - Si responde con el mensaje del trigger («El rol de un perfil no puede
--     modificarse desde la API pública»), significa que el grant de columna
--     no está aplicado pero el trigger sí — revisa el punto 4 de admin.sql.
--
-- Y el equivalente que SÍ debe funcionar, para descartar un falso positivo
-- en el que todo esté bloqueado:
--
--   curl -i -X PATCH \
--     "https://<PROYECTO>.supabase.co/rest/v1/perfiles?id=eq.<TU_UUID>" \
--     -H "apikey: <ANON_KEY>" \
--     -H "Authorization: Bearer <ACCESS_TOKEN>" \
--     -H "Content-Type: application/json" \
--     -H "Prefer: resolution=merge-duplicates" \
--     -d '{"nombre":"Prueba"}'
--
-- ESPERADO: 2xx. Esto es además lo que confirma el punto abierto del PR: que
-- el `upsert` real de PostgREST convive con los grants por columna.
-- Hazlo con un usuario de prueba, no con la cuenta del dueño.
-- ===========================================================================


-- ===========================================================================
-- EXTRA — inventario de privilegios (solo lectura, sin cambiar de rol)
-- ===========================================================================

select table_name, grantee, privilege_type, column_name
from information_schema.column_privileges
where table_schema = 'public'
  and table_name in ('perfiles', 'mensajes_contacto')
  and grantee in ('anon', 'authenticated')
order by table_name, grantee, column_name, privilege_type;
-- ESPERADO:
--   perfiles / anon              -> ninguna fila
--   perfiles / authenticated     -> select en todas; insert y update en
--                                   id, nombre, bebida_favorita,
--                                   espacio_favorito, notas, updated_at.
--                                   NUNCA insert/update sobre `rol`.
--   mensajes_contacto / anon     -> insert en nombre, email, mensaje. Nada más.
--   mensajes_contacto / authenticated -> igual que anon.

select p.proname, p.prosecdef as security_definer, p.proconfig, r.rolname as ejecutable_por
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
left join lateral (
  select rolname from pg_roles
  where has_function_privilege(rolname, p.oid, 'execute')
    and rolname in ('anon', 'authenticated', 'service_role', 'public')
) r on true
where n.nspname = 'private';
-- ESPERADO: dos funciones, ambas con proconfig = {search_path=}.
--   es_admin       -> security_definer = TRUE  (necesita saltar RLS para no
--                     recursar), ejecutable por authenticated.
--   preservar_rol  -> security_definer = FALSE. Deliberado: la función compara
--                     `current_user`, y dentro de un `security definer` eso
--                     sería el dueño de la función en vez de quien la llama,
--                     con lo que el trigger dejaría pasar todo en silencio.
--                     No necesita privilegios elevados porque no lee tablas.
