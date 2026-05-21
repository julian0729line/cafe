-- 1. Tabla de perfiles
create table if not exists public.perfiles (
  id               uuid references auth.users on delete cascade primary key,
  nombre           text,
  bebida_favorita  text,
  espacio_favorito text,
  notas            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- 2. Activar seguridad por filas (RLS)
alter table public.perfiles enable row level security;

-- 3. Políticas: cada usuario solo accede a su propio perfil
create policy "Ver propio perfil"
  on public.perfiles for select
  using (auth.uid() = id);

create policy "Insertar propio perfil"
  on public.perfiles for insert
  with check (auth.uid() = id);

create policy "Actualizar propio perfil"
  on public.perfiles for update
  using (auth.uid() = id);

-- 4. Función que crea el perfil cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.perfiles (id, nombre)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nombre'
  );
  return new;
end;
$$;

-- 5. Trigger que llama a esa función al crear un usuario
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
