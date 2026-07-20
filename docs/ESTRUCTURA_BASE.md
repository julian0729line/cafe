# Estructura Base — Café Valparaíso Web

**GOAL 03 · Creación de estructura de carpetas base** · Fecha: 2026-07-04
Referencia: `docs/AUDITORIA.md` (commit `75056bc`) y `docs/ARQUITECTURA_MODULAR.md` (commit `29a18cc`)

---

## 1. Objetivo del GOAL 03

Crear el **esqueleto modular vacío** definido como contrato en `docs/ARQUITECTURA_MODULAR.md`,
para que los refactors futuros (GOALs 04-10) tengan dónde aterrizar sin necesidad de decidir
estructura sobre la marcha. Este GOAL **no cambia comportamiento visual ni funcional**: no mueve
componentes, no toca `app/page.tsx`, no crea rutas ni componentes con lógica. Es exclusivamente
la preparación del terreno.

---

## 2. Carpetas creadas

| Carpeta | Propósito | Estado | Notas |
|---|---|---|---|
| `components/ui/` | Primitivas visuales genéricas (Button, Card, Container, SectionHeader, Badge…) | **Nueva** | Vacía, con `.gitkeep` |
| `components/layout/` | Cáscara compartida (PublicNavbar, PublicFooter, MemberShell) | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/home/` | Secciones de la landing (`/`) | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/agenda/` | Secciones de la futura ruta `/agenda` | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/menu/` | Secciones de la futura ruta `/menu` | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/reservas/` | Secciones de la futura ruta `/reservas` | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/libreria/` | Secciones de la futura ruta `/libreria` | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/espacios/` | Secciones de la futura ruta `/espacios` | **Nueva** | Vacía, con `.gitkeep` |
| `components/sections/contacto/` | Secciones de la futura ruta `/contacto` | **Nueva** | Vacía, con `.gitkeep` |
| `components/cards/` | Tarjetas de dominio (EventCard, MenuItemCard, SpaceCard, BookCategoryCard) | **Nueva** | Vacía, con `.gitkeep` |
| `components/motion/` | Primitivas client de animación (destino futuro de Reveal, Counter, Parallax…) | **Nueva** | Vacía, con `.gitkeep` |
| `components/auth/` | Piezas visuales del flujo de acceso (destino futuro de AuthAside, AuthFormShell, AuthComingSoon) | **Nueva** | Vacía, con `.gitkeep` |
| `data/` | Hechos estructurados tipados (marca, sedes, menú, eventos, navegación) | **Nueva** | Vacía, con `.gitkeep` |
| `content/` | Voz editorial por página (titulares, párrafos, CTAs) | **Nueva** | Vacía, con `.gitkeep` |
| `types/` | Tipos TypeScript compartidos (si llegaran a necesitarse entre 2+ módulos de `data/`) | **Nueva** | Vacía, con `.gitkeep` |

**Total: 15 carpetas nuevas, 15 archivos `.gitkeep`.** Ninguna carpeta existente fue renombrada ni
alterada. No se creó ningún `index.ts` (barrel exports quedan explícitamente fuera de alcance).

---

## 3. Carpetas existentes respetadas

Verificado con `git status` antes y después: **cero archivos existentes movidos, renombrados o
modificados.**

| Elemento | Estado | Confirmación |
|---|---|---|
| `app/` (todas sus rutas: `admin/`, `auth/callback/`, `dashboard/`, `login/`, `perfil/`, `perfil/editar/`, `register/`, `page.tsx`, `layout.tsx`, `template.tsx`, `globals.css`) | Intacto | Ningún archivo tocado |
| `app/components/` (15 archivos: Nav, Hero, PageHero, AmbienteScroll, Preloader, VelocityMarquee, Reveal, Counter, Parallax, MagneticButton, ScrollProgress, MediaSlot, AuthAside, AuthFormShell, AuthComingSoon) | Intacto, permanece exactamente donde está | Es la carpeta plana actual; su migración a `components/` (raíz) es trabajo de un GOAL futuro (05, por lotes, con `git mv`), no de este |
| `lib/supabase.ts` | Intacto | No se tocó `lib/` |
| `utils/supabase/` (`client.ts`, `server.ts`, `config.ts`) | Intacto | No se tocó ningún archivo de Supabase |
| `middleware.ts` | Intacto | No se tocó |
| Rutas protegidas (`/dashboard`, `/perfil`, `/perfil/editar`, `/admin`) y de auth (`/login`, `/register`, `/auth/callback`) | Intactas | Ningún archivo de estas rutas fue leído para escritura ni modificado |
| `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs` | Intactos | No se instalaron paquetes ni se cambió configuración |
| `docs/AUDITORIA.md`, `docs/ARQUITECTURA_MODULAR.md` | Intactos | Solo se leyeron como referencia, según lo indicado |

---

## 4. Qué NO se hizo en este GOAL

- No se movieron componentes (los 15 archivos de `app/components/` siguen ahí).
- No se refactorizó `app/page.tsx`.
- No se crearon rutas comerciales en `app/` (`/agenda`, `/menu`, `/reservas`, `/libreria`, `/espacios`, `/contacto` no existen todavía).
- No se tocó Supabase (`utils/supabase/*`, `lib/supabase.ts`, `supabase/*.sql`).
- No se tocó `middleware.ts`.
- No se tocó ningún flujo de autenticación (login, registro, callback, logout, guards).
- No se instalaron paquetes ni se modificó `package.json`.
- No se cambió ninguna configuración (`tsconfig.json`, `next.config.ts`, Tailwind/PostCSS, ESLint).
- No se crearon componentes con lógica ni contenido — las 15 carpetas nuevas están vacías.
- No se crearon barrel exports (`index.ts`) en ninguna carpeta nueva.
- No se hizo commit. No se hizo push.

---

## 5. Uso futuro de cada carpeta

- **`components/ui/`** — Primitivas reutilizables en cualquier página: `Button`, `LinkButton`, `Card`, `Container`, `SectionHeader`, `Badge`, `Eyebrow`. También destino futuro de `MediaSlot.tsx` y `PageHero.tsx` (hoy en `app/components/`).
- **`components/layout/`** — Cáscara compartida entre rutas: `PublicNavbar` (evolución de `Nav.tsx`), `PublicFooter` (hoy inline en `page.tsx`), y a futuro `MemberShell` para unificar la navbar repetida en dashboard/perfil/admin.
- **`components/sections/home/`** — Destino de las secciones de la landing actual una vez extraídas de `app/page.tsx`: Hero, Historia, Ambiente, MenuPreview, Testimonios, Ubicación, CtaFinal, Preloader.
- **`components/sections/agenda/`** — Secciones de la futura ruta `/agenda`: hero de agenda + listado de eventos.
- **`components/sections/menu/`** — Secciones de la futura ruta `/menu`: hero de menú + categorías completas.
- **`components/sections/reservas/`** — Secciones de la futura ruta `/reservas`: hero + información/CTA de reserva.
- **`components/sections/libreria/`** — Secciones de la futura ruta `/libreria` (Librería La Maga): hero + curaduría.
- **`components/sections/espacios/`** — Secciones de la futura ruta `/espacios`: hero + grid de sedes/espacios.
- **`components/sections/contacto/`** — Secciones de la futura ruta `/contacto`: hero + información de contacto.
- **`components/cards/`** — Tarjetas de dominio reutilizadas en listas: `EventCard`, `MenuItemCard`, `SpaceCard`, `BookCategoryCard`.
- **`components/motion/`** — Destino futuro de las primitivas de animación puras hoy en `app/components/`: `Reveal`, `Counter`, `Parallax`, `MagneticButton`, `ScrollProgress`, `VelocityMarquee`.
- **`components/auth/`** — Destino futuro de las piezas visuales de auth hoy en `app/components/`: `AuthAside`, `AuthFormShell`, `AuthComingSoon`. Nunca contendrán handlers de Supabase.
- **`data/`** — Hechos estructurados y tipados: `site.ts` (marca, sedes, contacto, WhatsApp), `navigation.ts`, `menu.ts`, `events.ts`, `spaces.ts`, `library.ts`, `testimonials.ts`.
- **`content/`** — Voz editorial por página: `home.ts`, `agenda.ts`, `menu.ts`, `reservations.ts`, `library.ts`, `spaces.ts`, `contact.ts`.
- **`types/`** — Tipos TypeScript compartidos entre 2+ archivos de `data/`, solo si llegan a necesitarse (regla del contrato: no crear tipos globales especulativos; hasta entonces cada archivo de `data/` co-loca sus propios tipos).

---

## 6. Riesgos evitados

Al **no mover ni reescribir código todavía**, se evitaron en este GOAL:

- **Imports rotos**: mover los 15 archivos de `app/components/` sin el semáforo de validación por lotes (definido en el GOAL 02, §15) habría arriesgado romper `tsc` en un solo paso masivo.
- **Regresión de componentes sensibles**: `AmbienteScroll` (scroll horizontal anclado con geometría medida por frame) y `Preloader` (hydration con `useReducedMotion`) tienen gotchas documentados; moverlos fuera de su lote y sin captura de comparación sería riesgoso.
- **Ruptura de la cadena de auth**: no se tocó ningún archivo de `utils/supabase/`, `middleware.ts` ni las páginas protegidas, eliminando cualquier riesgo sobre login/dashboard/perfil/admin en este paso.
- **Pérdida del invariante de build sin variables de entorno**: al no modificar código funcional, el build mantiene su comportamiento exacto anterior.
- **Sobre-ingeniería prematura**: no se crearon `index.ts` ni tipos especulativos en `types/`; las carpetas nacen vacías y se llenan solo cuando reciban su primer archivo real, tal como exige el contrato de arquitectura.

---

## 7. Checklist para pasar a GOAL 04

- [x] Estructura de carpetas base creada y verificada (`components/{ui,layout,sections/*,cards,motion,auth}`, `data/`, `content/`, `types/`).
- [x] Ningún archivo existente movido, renombrado ni modificado.
- [x] `app/`, `lib/`, `utils/supabase/`, `middleware.ts` y rutas protegidas intactos.
- [x] `npm run lint` sin regresión respecto al estado documentado en GOAL 01/02.
- [x] `npm run build` pasa sin variables de entorno.
- [x] `git status` muestra únicamente los archivos nuevos de este GOAL.
- [ ] **Pendiente antes de GOAL 04 (sistema visual/tokens)**: generar el baseline de capturas de pantalla (desktop + móvil, con y sin variables de entorno) de todas las rutas actuales, tal como prevé el GOAL 02 (§15) antes de tocar `globals.css` o mover cualquier componente.
- [ ] Confirmar con el responsable del negocio si ya hay datos reales de Café Valparaíso disponibles (no bloquea GOAL 04, pero sí GOAL 08).

---

## Resultado de validaciones obligatorias

Ejecutadas después de crear las carpetas y este documento, **sin variables de entorno** (no existe `.env.local`, solo `.env.example`):

### `npm run lint`

```
✖ 136 problems (0 errors, 136 warnings)
```

**0 errores.** De los 136 warnings, 135 provienen de `.agents/skills/**` (scripts de terceros, deuda ya documentada en GOAL 01 — ajena a este proyecto) y **1 es preexistente del proyecto** (`app/perfil/editar/page.tsx:39`, `react-hooks/exhaustive-deps`, ya documentado en `docs/AUDITORIA.md`). **Mismo estado exacto que en GOAL 01 y GOAL 02** — sin regresión.

### `npm run build`

```
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages using 3 workers (11/11)
```

**Build exitoso, sin variables de entorno.** El invariante crítico se mantiene intacto.

### `git status`

```
Untracked files:
  components/
  content/
  data/
  docs/ESTRUCTURA_BASE.md
  types/
```

Únicamente las carpetas nuevas (con sus `.gitkeep`) y el documento de este GOAL. Ningún archivo existente aparece como modificado.
