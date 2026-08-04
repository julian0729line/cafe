-- Tabla para el formulario de contacto (/contacto).
--
-- No requiere login: cualquier visitante puede insertar un mensaje (RLS solo
-- permite `insert`, nunca `select`/`update`/`delete` desde la API pública).
-- El dueño del café los lee desde el editor de tablas de Supabase, que usa
-- la service role y no pasa por estas políticas.

create table if not exists public.mensajes_contacto (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  email      text,
  mensaje    text not null,
  created_at timestamptz not null default now()
);

alter table public.mensajes_contacto enable row level security;

create policy "Cualquiera puede enviar un mensaje"
  on public.mensajes_contacto for insert
  to anon, authenticated
  with check (true);
