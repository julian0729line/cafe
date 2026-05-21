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
