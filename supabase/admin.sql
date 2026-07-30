-- 1. Agregar columna de rol a perfiles
alter table public.perfiles
  add column if not exists rol text default 'cliente';

-- 2. Política: admin puede ver todos los perfiles
create policy "Admin ve todos los perfiles"
  on public.perfiles for select
  using (
    auth.uid() = id
    or exists (
      select 1 from public.perfiles p
      where p.id = auth.uid() and p.rol = 'admin'
    )
  );

-- 3. Marcar al dueño del café como admin
update public.perfiles
set rol = 'admin'
where id = (
  select id from auth.users
  where email = 'julian.vasquezbo@gmail.com'
);

-- 4. Cerrar la escalada de privilegios: la política "Actualizar propio
-- perfil" (definida en setup.sql) usa `using (auth.uid() = id)` sin
-- `with check`, así que Postgres reutiliza el mismo `using` como check.
-- Eso permite que cualquier usuario autenticado cambie su propio `rol` a
-- 'admin' con un update directo (aunque la UI nunca envíe ese campo, nada
-- en la base de datos lo impedía). Se reemplaza la política para exigir
-- que `rol` no cambie en un update hecho por el propio usuario.
drop policy if exists "Actualizar propio perfil" on public.perfiles;

create policy "Actualizar propio perfil"
  on public.perfiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and rol = (select p.rol from public.perfiles p where p.id = auth.uid())
  );
