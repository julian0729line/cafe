# Auditoría Técnica — Café Valparaíso Web

**GOAL 01 · Línea base previa a refactor** · Fecha: 2026-07-02 · Commit auditado: `c61edbe`
Rama: `claude/terminal-md-project-context-joayuj`

---

## 1. Resumen ejecutivo

El proyecto está en **buen estado técnico**: compila sin errores, pasa lint, tiene autenticación
Supabase funcional y centralizada, un sistema visual editorial propio ya maduro (motion, tokens
parciales, accesibilidad cuidada) y **cumple el invariante crítico: el build pasa completo SIN
variables de entorno** (modo "escaparate"), lo que hace los despliegues infalibles.

Su deuda **no es de calidad, es de organización y de contenido**:

- El **contenido de negocio vive incrustado en el código** (menú, testimonios, horarios, marca).
  La marca actual "Café Literario · Desde 2008" aparece en **12 archivos**; el rebranding a
  **Café Valparaíso** hoy exigiría tocarlos todos a mano.
- **No existen las rutas comerciales** de la visión (agenda, menú, reservas, librería La Maga,
  espacios, contacto): todo es una landing de una sola página con anclas.
- Los 17 componentes existentes están en una **carpeta plana** sin taxonomía (`app/components/`),
  y las primitivas UI (botones, eyebrows) se repiten como cadenas largas de Tailwind.

Veredicto: **listo para pasar a GOAL 02** sin correcciones previas. No se detectó nada roto.

---

## 2. Stack técnico

| Pieza | Versión real (lockfile) | Nota |
|---|---|---|
| Next.js | **16.2.6** (App Router, Turbopack) | Avisa deprecación: `middleware.ts` → `proxy` |
| React / React DOM | **19.2.4** | |
| TypeScript | **5.9.3** | `strict` habilitado, `tsc --noEmit` limpio |
| Tailwind CSS | **4.3.0** | v4 vía `@tailwindcss/postcss`; tokens en `@theme` de `globals.css` (no hay `tailwind.config`) |
| motion (Framer Motion) | **12.42.2** | Import `motion/react`; única dependencia de animación |
| @supabase/supabase-js | **2.106.1** | |
| @supabase/ssr | **0.10.3** | Cookies de sesión en middleware/server |
| ESLint | **9.39.4** (flat config) | `eslint-config-next` 16.2.6 |
| Node | `engines: >=20.9.0` · `.node-version`: 20.11.0 | Requerido por Next 16 |

**Scripts** (`package.json`): `dev` (next dev), `build` (next build), `start` (next start),
`lint` (eslint). **No hay test suite.** Type-check: `npx tsc --noEmit` (sin script propio).

**Deploy preconfigurado**: `render.yaml` (Render, blueprint plan free), `netlify.toml`,
`.env.example`, guía en `DEPLOY.md`. PR #1 abierto hacia `main`.

---

## 3. Estructura actual del repositorio

```text
cafe/
├── app/
│   ├── page.tsx                 # Landing (317 líneas: orquestación + CONTENIDO hardcodeado)
│   ├── layout.tsx               # Fuentes next/font + metadata global (marca hardcodeada)
│   ├── template.tsx             # Transición de página (fade por navegación)
│   ├── globals.css              # 293 líneas: tokens @theme + capa de utilidades + keyframes
│   ├── components/              # 17 componentes en carpeta PLANA (sin taxonomía)
│   ├── admin/page.tsx           # Panel admin (server, protegida, rol admin)
│   ├── auth/callback/route.ts   # Intercambio de código de confirmación email
│   ├── dashboard/page.tsx       # Área de socio (server, protegida)
│   ├── login/page.tsx           # Login (client)
│   ├── register/page.tsx        # Registro (client)
│   └── perfil/page.tsx + perfil/editar/page.tsx
├── middleware.ts                # Protección de rutas + modo sin-Supabase (62 líneas)
├── utils/supabase/              # server.ts / client.ts / config.ts (isSupabaseConfigured)
├── lib/supabase.ts              # Cliente anónimo sin cookies (LEGADO: nadie lo importa)
├── supabase/                    # setup.sql (perfiles + RLS + trigger), admin.sql (rol)
├── public/media/                # Slots para video/foto reales + README de uso
├── docs/                        # (esta auditoría)
├── .agents/skills/              # 18 skills de diseño (tooling de desarrollo, NO del sitio)
├── CLAUDE.md · AGENTS.md · DEPLOY.md · README.md · skills-lock.json
└── render.yaml · netlify.toml · .node-version · .env.example
```

Sin carpetas `data/`, `content/`, `components/` (raíz), `sections/` ni `ui/` — objetivo de GOALs 02-08.

---

## 4. Rutas existentes

| Ruta | Archivo | Tipo | Render | Propósito | Riesgos |
|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Pública | ○ estática | Landing completa (hero, historia, ambiente, menú, testimonios, ubicación, CTA) | Concentra todo el contenido; 317 líneas |
| `/login` | `app/login/page.tsx` | Auth | ○ estática (client) | Inicio de sesión; sin env muestra "Muy pronto" | Tocar el handler rompe acceso |
| `/register` | `app/register/page.tsx` | Auth | ○ estática (client) | Registro + pantalla "revisa tu correo"; sin env "Muy pronto" | Flujo emailRedirectTo → callback |
| `/auth/callback` | `app/auth/callback/route.ts` | Auth | ƒ dinámica | `exchangeCodeForSession` del email de confirmación | NO tocar: rompe activación de cuentas |
| `/dashboard` | `app/dashboard/page.tsx` | Protegida | ƒ dinámica | Home del socio; server action de logout; detecta rol admin | Server action `logout` inline |
| `/perfil` | `app/perfil/page.tsx` | Protegida | ƒ dinámica | Datos del perfil (tabla `perfiles`) | — |
| `/perfil/editar` | `app/perfil/editar/page.tsx` | Protegida | ○ (client, guard en middleware) | Formulario upsert de perfil; skeleton de carga | Único warning de lint (deps del effect) |
| `/admin` | `app/admin/page.tsx` | Admin | ƒ dinámica | Métricas + tabla de clientes; exige `perfiles.rol === 'admin'` | Redirect a /dashboard si no es admin |
| `/_not-found` | (implícita) | Pública | ○ | 404 por defecto de Next | Sin diseño propio (oportunidad) |

**Rutas comerciales inexistentes** (ver §13): `/agenda`, `/menu`, `/reservas`, `/libreria`,
`/espacios`, `/contacto`.

---

## 5. Arquitectura actual de componentes

Todos en `app/components/` (carpeta plana). Clasificación y destino recomendado:

| Componente | Líneas | Tipo real | Usado por | Recomendación futura |
|---|---|---|---|---|
| `Nav.tsx` | 197 | layout (client) | `/` | → `components/layout/PublicNavbar`; enlaces desde `data/navigation.ts`; hoy scroll-spy solo de anclas de la home |
| `Hero.tsx` | 185 | section (client) | `/` | → `components/sections/HeroSection`; toggle `HERO_VIDEO` interno |
| `PageHero.tsx` | 81 | ui/section (client) | dashboard, perfil, editar, admin | → `components/ui/`; **emite 2 `<h1>` por página** (ver §12/§14 SEO) |
| `AmbienteScroll.tsx` | 105 | section (client) | `/` | → sections; scroll horizontal anclado con geometría medida por frame — mover SIN reescribir |
| `Preloader.tsx` | 93 | section/overlay (client) | `/` | → sections; texto de marca hardcodeado |
| `VelocityMarquee.tsx` | 68 | motion (client) | `/` | → `components/motion/` |
| `Reveal.tsx` | 43 | motion (client) | `/` | → motion |
| `Counter.tsx` | 35 | motion (client) | `/` | → motion; patrón anti `set-state-in-effect` documentado |
| `Parallax.tsx` | 32 | motion (client) | `/` | → motion |
| `MagneticButton.tsx` | 48 | motion/ui (client) | `/` | → motion; candidato a variante de `ui/Button` |
| `ScrollProgress.tsx` | 19 | motion (client) | `/` | → motion |
| `MediaSlot.tsx` | 73 | ui (server) | `/` | → ui; slot video/imagen con duotono; clave para medios reales |
| `AuthAside.tsx` | 74 | auth (server) | AuthFormShell | → `components/auth/`; marca hardcodeada |
| `AuthFormShell.tsx` | 46 | auth (server) | login, register, AuthComingSoon | → auth; shell compartido (extraído en /simplify) |
| `AuthComingSoon.tsx` | 44 | auth (server) | login, register | → auth; vista "Muy pronto" sin Supabase |

Inline sin extraer: **footer** (en `page.tsx`), **navbar de socios** (repetida en dashboard/
perfil/editar/admin, 4 copias), **mapa radar** (en `page.tsx`), **tarjetas** de menú/testimonios.

---

## 6. Estado actual del diseño visual

**Paleta** (definida en `@theme` de `globals.css` + usada como clases arbitrarias):

| Rol | Hex | Estado |
|---|---|---|
| Fondo principal (oliva oscuro) | `#343E1C` | token `--color-olive-dark` |
| Oliva medio / bordes | `#4A5728` | token `--color-olive` |
| Oliva profundo (scrollbar/tiles) | `#2A331A` | **sin token** (hardcodeado) |
| Crema (texto principal) | `#F5F5F0` | token `--color-off-white` |
| Rojo marca (fondos/bordes) | `#C1121F` / `#960E17` | tokens |
| **Texto atenuado accesible** | `#A6B86B` | **sin token** — decenas de usos `text-[#A6B86B]` |
| **Acento coral accesible (texto)** | `#FF7F70` | **sin token** |
| **Dorado (eyebrows)** | `#C9A227` | **sin token** |
| Crema secundaria | `#D9DCC4` | **sin token** |

Regla vigente (documentada en CLAUDE.md): los crudos `#6B7A3C`/`#8A9A52`/`#C1121F` **no** se usan
como texto sobre oliva (fallan WCAG AA); se usan los tintes accesibles de arriba.

**Tipografías** (`app/layout.tsx`, next/font): **Playfair Display** (display; 400/700/900,
italic) + **DM Sans** (cuerpo; 400/500/700/900), expuestas como `.font-playfair` / `.font-sans-app`.

**Capa de utilidades propia** (`globals.css`): `.aurora`/`.aurora-blob` (brillos cálidos
animados), `.vignette`, `.grain` (grano fijo), `.noise`, `.reveal`, `.fade-up`, `.press`
(feedback táctil), `.btn-fill` (relleno deslizante), `.underline-slide`, `.tile`, `.media-frame`
(+scrim/zoom), `.menu-item`, `.radar-ring`/`.map-pin`, `.marquee-track`, scrollbar temática,
`:focus-visible` global (anillo coral). **Todas las animaciones tienen apagado en un único bloque
`@media (prefers-reduced-motion: reduce)`** — regla a preservar.

**Patrones editoriales**: heroes "protagonista" (palabra fantasma gigante + Playfair enorme +
entrada kinética con blur), preloader con contador, scroll horizontal anclado, marquee reactivo a
velocidad de scroll, botón magnético, contadores en viewport, transición de página por `template.tsx`.

---

## 7. Estado actual del contenido (hardcodeado)

| Contenido | Archivo | Constante/ubicación |
|---|---|---|
| Ticker de marca (8 frases ×2) | `app/page.tsx` | `TICKER_ITEMS` |
| Galería "El ambiente" (4 rincones) | `app/page.tsx` | `AMBIENTE` |
| **Menú completo con precios** (3 categorías, 10 ítems) | `app/page.tsx` | `MENU_CATEGORIES` |
| Stats de historia (2008, 16, ∞, 1) | `app/page.tsx` | `STATS` |
| **Testimonios (3, con nombres ficticios)** | `app/page.tsx` | `TESTIMONIALS` |
| **Horarios** | `app/page.tsx` | `HOURS` |
| **Dirección/contacto placeholder** ("Calle de las Letras 123", `contacto@cafeliterario.com`, `+57 300 000 0000`) | `app/page.tsx` | sección Ubicación |
| Copy de todas las secciones (títulos, párrafos) | `app/page.tsx` | JSX inline |
| Metadata SEO (title/description/OG) | `app/layout.tsx` | `metadata` |
| Textos del preloader | `app/components/Preloader.tsx` | JSX |
| Citas y títulos de auth | `app/login/page.tsx`, `app/register/page.tsx` | props inline |
| Enlaces de navegación | `app/components/Nav.tsx` | `LINKS` |
| Opciones de perfil (bebidas/espacios) | `app/perfil/editar/page.tsx` | `BEBIDAS`, `ESPACIOS` |
| Textos del panel admin | `app/admin/page.tsx` | JSX |

**Todo lo anterior debe migrar a `data/`** (GOAL 08). Los testimonios son ficticios (creados como
placeholder editorial): reemplazar por reales o retirar antes del lanzamiento oficial.

---

## 8. Strings de marca y rebranding pendiente

Apariciones de la marca actual que deberán salir de `data/site.ts` (grep verificado):

| Archivo | Qué dice hoy |
|---|---|
| `app/layout.tsx` (×6) | title/description/OG/Twitter: "Café Literario — 16 años siendo tu lugar", "Desde 2008" |
| `app/page.tsx` (×7) | Ticker, eyebrow "Desde 2008", párrafo historia, "Receta de la casa desde 2008", footer "Café Literario / 16 años · Desde 2008", email `contacto@cafeliterario.com` |
| `app/components/Hero.tsx` | Eyebrow "Café Literario · Desde 2008" |
| `app/components/Nav.tsx` | Logo texto "Café Literario" |
| `app/components/Preloader.tsx` (×2) | "Café Literario", "Dieciséis años sirviendo café y palabras." |
| `app/components/AuthAside.tsx` (×2) | Logo + "16 años · Desde 2008" |
| `app/components/AuthFormShell.tsx` | Banda móvil "Café Literario" |
| `app/register/page.tsx` (×2) | Cita "…16 años de conversaciones…" |
| `app/dashboard/page.tsx` | Logo navbar "Café Literario" |
| `app/admin/page.tsx` | Logo navbar "Café Literario" |
| `app/components/AmbienteScroll.tsx` | Copy de rincones (indirecto vía `AMBIENTE`) |
| `public/media/README.md`, `CLAUDE.md`, `DEPLOY.md` | Referencias documentales |

Además el **"16"/palabras fantasma** son motivo visual (Hero, AuthAside: número gigante) — al
rebrandear decidir el motivo equivalente de Café Valparaíso. Faltan por completo: sedes,
Librería La Maga, WhatsApp, redes sociales, dirección real en Cali.

---

## 9. Supabase y autenticación

**Arquitectura de clientes** (tres factories, por contexto de ejecución):

- `utils/supabase/server.ts` — server components / route handlers / server actions; `createClient()`
  asíncrono, cablea `cookies()` de Next.
- `utils/supabase/client.ts` — componentes `'use client'` (browser).
- `utils/supabase/config.ts` — **`isSupabaseConfigured`**: flag que hace a Supabase opcional
  (modo escaparate). Pieza clave del deploy sin credenciales.
- `lib/supabase.ts` — cliente anónimo sin cookies. **Nadie lo importa (legado)**; candidato a
  retirar en GOAL 14, no antes.

**Flujo**: registro (`signUp` con `emailRedirectTo` → `/auth/callback` →
`exchangeCodeForSession`) → login (`signInWithPassword`) → sesión por cookies →
logout (server action en dashboard). **Los factories usan `process.env...!`**: son seguros SOLO
porque el middleware garantiza que ninguna petición sin credenciales llega a código que los llame.

**Base de datos** (`supabase/setup.sql`): tabla `perfiles` (id→auth.users, nombre,
bebida_favorita, espacio_favorito, notas, timestamps) con **RLS** (select/insert/update solo la
fila propia) + trigger `handle_new_user` que crea el perfil al registrarse. `admin.sql`: columna/
criterio de rol admin. **No existen tablas** para eventos, reservas, sedes ni libros (GOAL 10).

**NO tocar sin QA dedicado**: `middleware.ts`, `utils/supabase/*`, `app/auth/callback/route.ts`,
los handlers de login/register, la server action de logout, y los `redirect` de páginas protegidas.

---

## 10. Middleware y rutas protegidas

`middleware.ts` corre SOLO en su matcher: `/dashboard/:path*`, `/perfil/:path*`, `/admin/:path*`,
`/login`, `/register`. Lógica:

1. **Sin Supabase configurado**: rutas protegidas → redirect `/`; login/register pasan (muestran
   "Muy pronto"). Nada llega a crear un cliente Supabase (evita el crash de los factories).
2. **Con Supabase**: refresca sesión (cookies), no autenticado en protegida → `/login`;
   autenticado en login/register → `/dashboard`.
3. La comprobación de **rol admin NO está aquí**: está dentro de `app/admin/page.tsx`
   (`perfiles.rol !== 'admin'` → `/dashboard`). Correcto, pero hay que saberlo.

**Riesgos**: (a) añadir rutas comerciales nuevas al matcher las rompería en modo escaparate —
regla: NO incluirlas; (b) Next 16 avisa que `middleware.ts` debe migrar a `proxy` — hacerlo en
commit aislado con QA (GOAL 14); (c) el matcher usa prefijos: cualquier futura subruta de
`/perfil/*` queda protegida automáticamente (deseable, pero recordarlo).

---

## 11. Build, lint y estado técnico (invariantes verificados)

Ejecutados en esta auditoría, **sin `.env` presente** (solo existe `.env.example`):

| Comando | Resultado | Detalle |
|---|---|---|
| `npm run lint` | ✅ **exit 0** | **0 errores**, 136 warnings — **solo 1 del proyecto**: `app/perfil/editar/page.tsx:39` `react-hooks/exhaustive-deps` (falta `router` en deps del effect). Los otros 135 provienen de `.agents/skills/**` (scripts de terceros que el flat config barre — deuda: excluir esa carpeta del lint) |
| `npm run build` | ✅ **exit 0** | Compila, TypeScript OK, **prerender 11/11 SIN variables de entorno**. Rutas: `/`, `/login`, `/register`, `/perfil/editar`, `/_not-found` estáticas; `/admin`, `/dashboard`, `/perfil`, `/auth/callback` dinámicas. Warning informativo: deprecación middleware→proxy |
| `npx tsc --noEmit` | ✅ limpio | (verificado a lo largo de la sesión, re-confirmado por el build) |

**Invariante confirmado: el proyecto compila y prerenderiza completo sin variables de entorno.**
Nada que corregir para avanzar.

---

## 12. Deuda técnica detectada

**Alta prioridad**
1. Contenido de negocio incrustado en `app/page.tsx` y componentes (§7) — bloquea rebranding y mantenimiento no técnico.
2. Marca "Café Literario" repetida en 12 archivos (§8) — el rebranding a Café Valparaíso depende de `data/site.ts`.
3. Carpeta plana `app/components/` sin taxonomía; footer y navbar de socios sin extraer (4 copias de navbar).
4. Ausencia total de rutas comerciales (§13).

**Media prioridad**
5. Tintes accesibles (`#A6B86B`, `#FF7F70`, `#C9A227`, `#D9DCC4`, `#2A331A`) sin token — cientos de clases arbitrarias `text-[#...]`.
6. Primitivas UI repetidas como strings Tailwind largos (botón `press btn-fill…` ×6+, eyebrow ×10+).
7. `PageHero` emite dos `<h1>` por página (SEO/semántica); heroes de `/` también usan `<h1>` doble.
8. Lint barre `.agents/skills/**` (135 warnings ajenos) — falta `ignores` en `eslint.config.mjs`.
9. Deprecación `middleware.ts` → `proxy` pendiente (Next 16).
10. Warning `exhaustive-deps` en `perfil/editar`.

**Baja prioridad**
11. `lib/supabase.ts` legado sin usuarios.
12. Testimonios ficticios y datos de contacto placeholder visibles en producción.
13. Sin página 404 con diseño propio.
14. `next.config.ts` vacío (sin `metadataBase`, sin config de imágenes para futuros medios).
15. No hay test suite (aceptado; QA por checklist + Playwright manual).

---

## 13. Oportunidades comerciales (para ser la web oficial de Café Valparaíso)

| Pieza | Estado | Qué falta |
|---|---|---|
| **Agenda cultural** | ❌ No existe | Ruta `/agenda` + `data/events.ts` (fase 2: tabla `eventos` en Supabase con lectura pública) + EventCard + preview en home |
| **Menú** | ⚠️ Solo preview en home con datos placeholder | Ruta `/menu` completa por categorías con datos reales; precios reales |
| **Reservas** | ❌ No existe | Ruta `/reservas`; decidir canal: WhatsApp (rápido) vs formulario→Supabase (requiere RLS de insert público); CTA "Reservar" como acción primaria del sitio |
| **Librería La Maga** | ❌ No se menciona | Ruta `/libreria` + sección en home; es diferenciador único frente a otros cafés |
| **Espacios/Sedes** | ⚠️ Solo mapa radar placeholder | Ruta `/espacios` con sedes reales de Cali (fotos, mapa real, horarios por sede) |
| **Contacto** | ⚠️ Datos falsos en home | Ruta `/contacto` + datos reales + **botón WhatsApp** (canal principal en Colombia) |
| **SEO local** | ❌ Mínimo | JSON-LD `CafeOrCoffeeShop` con geo/horarios, sitemap, robots, OG image real, keywords "café literario Cali", Google Business Profile enlazado |
| **Comunidad** | ⚠️ Sistema de socios funcional pero genérico | Conectarlo a beneficios reales (eventos, club de lectura) una vez resuelto el acceso a Supabase |
| **Medios reales** | ⚠️ Slots listos (`MediaSlot`, `HERO_VIDEO`) | Fotos/videos reales del local — máximo impacto visual pendiente |

---

## 14. Riesgos principales antes de refactorizar

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Romper cadena de auth al mover/renombrar componentes compartidos | Media | Alto | No tocar archivos de §9 fuera de su GOAL; QA de flujo completo en ambos modos tras cada fase |
| Perder el invariante "build sin env" (p. ej. `createClient()` en scope de render) | Media | Alto | Regla escrita en CLAUDE.md; correr `npm run build` sin env tras cada GOAL |
| Regresión del scroll anclado (AmbienteScroll) o del preloader al extraer secciones | Media | Medio | Tienen gotchas documentados (`overflow-x-clip` en raíz, sticky, geometría por frame); mover sin reescribir + captura comparada |
| Scroll-spy del Nav roto al introducir rutas reales (hoy solo anclas de `/`) | Alta | Bajo | Rediseñar Nav en GOAL 06 para soportar anclas y rutas |
| Añadir rutas comerciales al matcher del middleware por error | Baja | Alto | Regla explícita en GOAL 10; test sin env de cada ruta nueva |
| Migración middleware→proxy con semántica distinta | Media | Alto | Commit aislado (GOAL 14) + checklist QA-AUTH completo |
| Rebranding incompleto (strings olvidados) | Media | Medio | Lista exhaustiva en §8; verificación final con grep de "Literario\|2008\|16 años" |
| Hydration mismatch al crear componentes client con ramas por `useReducedMotion` | Media | Medio | Patrón ya resuelto (estructura única + gate `mounted`); documentado en componentes existentes |
| Regresión visual silenciosa al tokenizar colores (GOAL 04) | Media | Medio | Capturas baseline por ruta antes/después |

---

## 15. Checklist antes de GOAL 02

- [x] `npm run lint` pasa (0 errores) — verificado en esta auditoría.
- [x] `npm run build` pasa **sin variables de entorno** (11/11) — verificado.
- [x] `npx tsc --noEmit` limpio.
- [x] Inventario completo de componentes y usos (§5).
- [x] Inventario de contenido hardcodeado (§7) y strings de marca (§8).
- [x] Riesgos identificados y mitigaciones definidas (§14).
- [ ] **Datos reales de Café Valparaíso** recopilados: nombre/claim definitivo, sedes de Cali con
      direcciones y horarios, menú real con precios, eventos, info de Librería La Maga, WhatsApp,
      redes, correo. *(Necesario para GOAL 08; no bloquea GOALs 02-07.)*
- [ ] Decisión del canal de reservas (WhatsApp / formulario / Supabase).
- [ ] Decisión de flujo de ramas (recomendado: una rama por GOAL sobre `main` tras fusionar PR #1).
- [ ] Baseline de capturas por ruta (desktop + móvil, con y sin env) guardada.
      *(Se puede generar al inicio de GOAL 03, antes del primer movimiento.)*

---

## 16. Recomendación final

**El proyecto está LISTO para pasar al GOAL 02.** No hay nada roto que corregir primero: lint sin
errores, build 11/11 sin env, auth funcional y centralizada, y riesgos mapeados con mitigación.

Condiciones para avanzar con seguridad:

1. Mantener el **invariante "build sin env"** como semáforo tras cada GOAL.
2. No tocar los archivos de auth (§9) fuera de los GOALs 11/14, y siempre con QA en ambos modos.
3. Ejecutar GOAL 02 (arquitectura) y GOAL 03 (mover componentes) **antes** de escribir componentes
   nuevos, para que lo nuevo nazca ordenado.
4. En paralelo, recopilar los **datos reales de Café Valparaíso** (checklist §15): son el insumo
   del GOAL 08, que es el paso de mayor valor (habilita el rebranding completo desde `data/`).
