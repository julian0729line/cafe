# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read first (breaking changes)

@AGENTS.md

This project runs **Next.js 16 (App Router, Turbopack) + React 19**. APIs and
conventions differ from older training data — read the relevant guide under
`node_modules/next/dist/docs/` before writing Next-specific code, and heed
deprecation warnings (the dev server currently warns that `middleware.ts`
should migrate to `proxy`).

## Commands

```bash
npm run dev        # dev server (Turbopack) on :3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config: eslint.config.mjs)
npx tsc --noEmit   # type-check (no separate script)
```

There is **no test suite**.

## Environment / gotchas

- Supabase env (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) goes
  in `.env.local` for dev (see `.env.example`). The **homepage renders without
  env**; only `middleware.ts`-guarded routes (login/register/dashboard/perfil/
  admin) touch Supabase and need env **at request time**.
- **`npm run build` must succeed with no env set** — client pages must not call
  `createClient()` in render/module scope (it runs during prerender and throws).
  Create the Supabase client **inside** effects/handlers instead (see
  `app/perfil/editar/page.tsx`). Regressing this reintroduces the prerender
  failure that once broke Vercel deploys.
- Path alias: `@/*` → repo root (e.g. `@/utils/supabase/server`).

## Architecture

### Auth & data (Supabase)

Three client factories exist — pick by execution context:

- `utils/supabase/server.ts` — **server** components, route handlers, and server
  actions. `createClient()` is async and wires Next `cookies()` for session.
- `utils/supabase/client.ts` — **client** ('use client') components (browser).
- `lib/supabase.ts` — a plain cookieless anon client; simplest, no session.

`middleware.ts` runs on `/dashboard`, `/perfil`, `/admin`, `/login`,
`/register`: it refreshes the session, redirects unauthenticated users off
protected routes, and redirects authenticated users away from `/login` and
`/register`. Because it calls `supabase.auth.getUser()`, **these routes need env
vars even to render**. `app/auth/callback/route.ts` exchanges the email
confirmation code.

Database lives in `supabase/setup.sql` (a `perfiles` table with RLS so each user
only sees their own row, plus a `handle_new_user` trigger that auto-creates a
profile on signup) and `supabase/admin.sql`. Admin gating keys off
`perfiles.rol === 'admin'` (the dashboard reads it to reveal the `/admin` link).

### Design system (the homepage + auth pages are a cinematic redesign)

- **Palette** is defined in `app/globals.css` `@theme`: olive `#343E1C`/`#4A5728`,
  red `#C1121F`/`#960E17`, cream `#F5F5F0`. On dark backgrounds use the
  **accessible text tints** — `#A6B86B` (muted), `#FF7F70` (coral accent),
  `#C9A227` (gold eyebrow). The raw `#6B7A3C`/`#8A9A52`/`#C1121F` fail WCAG AA as
  text on olive; don't reintroduce them as foreground colors.
- **Fonts** via `next/font` in `app/layout.tsx`: Playfair Display (display) +
  DM Sans (body), used through `.font-playfair` / `.font-sans-app`.
- `globals.css` carries a **utility layer** relied on across pages: `.aurora` /
  `.aurora-blob` (animated warm glows), `.vignette`, `.grain` (fixed film grain),
  `.reveal` (scroll-in), `.fade-up`, `.press` (tactile `:active`), `.btn-fill`
  (sliding fill), `.tile` / `.media-frame` (art-directed media), `.radar-ring` /
  `.map-pin`, `.menu-item`. **Every animated class is also disabled in the single
  `@media (prefers-reduced-motion: reduce)` block — add new animations there too.**
- **Motion components** (`app/components/`, using `motion/react`) are isolated
  `'use client'` leaves so `app/page.tsx` stays a Server Component: `Hero`,
  `Nav` (floating glass + IntersectionObserver scroll-spy + mobile menu),
  `Reveal`, `Counter`, `ScrollProgress`, `Parallax`, `MagneticButton`, and
  `AuthAside` (shared login/register panel). JS animations gate on
  `useReducedMotion()`.
- **`MediaSlot`** (a Server Component) is the **video-ready slot**: it renders a
  `<video>`/`<img>` with duotone treatment when given a path, else an
  art-directed placeholder tile. Drop files in `public/media/` and set the path —
  see `public/media/README.md`. The hero video is toggled by `HERO_VIDEO` in
  `app/components/Hero.tsx`.

### Lint constraints that bite

`eslint` (flat config, `next` rules) enforces `react-hooks/set-state-in-effect`:
do **not** call `setState` synchronously inside a `useEffect` body. `Counter`
works around this by animating with `duration: 0` under reduced motion instead of
calling `setValue` directly.

## Installed design skills

`.agents/skills/` holds design skills added via `npx skills add` — aesthetic
"taste" directives plus `ui-ux-pro-max`, a queryable UX/accessibility database
run with `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>"
--design-system`. `__pycache__/` is gitignored.

## Key docs

- `AGENTS.md` — the breaking-changes charter (imported above).
- `README.md` — stock create-next-app notes.
- `DEPLOY.md` — Vercel setup + how deploys happen from mobile (no terminal).
- `.env.example` — the env vars to set (dev `.env.local` / Vercel).
- `public/media/README.md` — how to drop in real videos/photos.
