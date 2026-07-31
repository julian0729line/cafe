# Café Valparaíso

Sitio público de Café Valparaíso: café literario, cultural y gastronómico
con sedes en Pance y Juanambú, Cali. Next.js 16 (App Router, Turbopack) +
React 19 + Supabase, con un sistema de diseño editorial propio.

## Empezar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

La home carga sin ninguna variable de entorno. Login, registro, dashboard,
perfil y `/admin` necesitan Supabase — copia `.env.example` a `.env.local`
y completa las llaves (ver "Auth y datos" abajo).

```bash
npm run build      # build de producción
npm run start       # sirve el build
npm run lint        # eslint
npx tsc --noEmit    # chequeo de tipos
```

No hay suite de tests.

## Stack

- **Next.js 16** (App Router, Turbopack) — atención: es una versión con
  cambios de ruptura sobre lo que la mayoría del training data conoce; ver
  `AGENTS.md`.
- **React 19**, TypeScript estricto, Tailwind CSS v4
- **Supabase** — solo auth + una tabla `perfiles` (con RLS), nada más
- `motion/react` para animación

## Auth y datos (Supabase)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=...
```

Sin estas variables el sitio se despliega igual como escaparate — login,
registro y el área de socios simplemente se ocultan en vez de romperse
(`utils/supabase/config.ts`). El esquema de base de datos vive en
`supabase/setup.sql` y `supabase/admin.sql` (se corren a mano en el SQL
Editor de Supabase — no hay runner de migraciones).

## Documentación

- **`CLAUDE.md`** — arquitectura vigente, convenciones y gotchas técnicos.
  Es la referencia real del estado actual del código.
- **`AGENTS.md`** — reglas para agentes de IA trabajando en este repo
  (cambios de ruptura de Next 16, convención de commits).
- **`docs/`** — bitácora histórica de la reconstrucción del sitio, un
  documento por fase de trabajo. Ver [`docs/README.md`](./docs/README.md)
  para el índice.
- **`DEPLOY.md`** — cómo se despliega (Vercel ya está conectado vía la
  integración de GitHub; auto-despliega cada PR y cada push a `main`) y
  qué variables de entorno configurar en producción.

## Contribuir

Cada cambio va en una rama (`feat/…`, `fix/…`, `docs/…`, `chore/…`) y un
Pull Request contra `main` — nunca commits directos. Ver la plantilla de
PR para el formato esperado.
