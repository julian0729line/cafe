# Migración de Claude Design a Next.js

Auditoría de migración visual del prototipo "design_handoff_cafe" (Claude
Design) hacia el repositorio real de Café Valparaíso. **Este documento no
implementa pantallas ni migra código**: es el mapa técnico para
reconstruir el diseño dentro de la arquitectura actual en GOALs
posteriores.

> Nota de numeración: el repositorio ya va por el GOAL 16 (hero
> expansivo). El prompt tituló esta tarea "GOAL 15 — Auditoría de
> migración"; para no chocar con el historial, este documento se refiere a
> ella como **Auditoría de migración** y renumera el plan de trabajo desde
> **GOAL 17** en adelante (§15).

## 1. Resumen ejecutivo

El prototipo entrega **dos productos** con la misma identidad visual pero
bases distintas:

1. **Café Valparaíso** — sitio público (Inicio, Agenda, Menú, Reservas,
   Librería, Espacios, Contacto, + Nosotros/Encuéntranos secundarias).
   Fondo base `#181f0d`. **Contenido disciplinado**: todo dato no
   confirmado está marcado "pendiente de confirmar", sin precios ni
   fechas inventadas.
2. **Café Literario** — app de cliente autenticada (login, registro,
   dashboard, perfil, admin). Fondo base `#343E1C`. **Contiene datos
   ficticios** ("2008", "16 años", precios de ejemplo) que **no deben
   migrarse**.

El repo real **ya cubre** el sitio público a nivel estructural (7 rutas,
layout, cards, data/content, SEO, a11y, hero expansivo) y la app
autenticada (login/register/dashboard/perfil/admin con Supabase). Lo que
aporta el prototipo es sobre todo **dirección visual de alta fidelidad**:
un lenguaje editorial más marcado (dropcaps, hover-fills, filmstrips,
marquees, reveal, cursor personalizado, índice numerado) que hoy el repo
implementa de forma más sobria.

**La migración es de estética, no de arquitectura.** El repo ya tiene la
arquitectura correcta; el prototipo es referencia visual a reconstruir con
los componentes y tokens reales — nunca copiando su montaje (React/Tailwind
por CDN, Babel en navegador, `Object.assign(window)`, web components,
navegación por archivos `.html`).

## 2. Estado del prototipo

| Aspecto | Cómo lo hace el prototipo |
|---|---|
| Carga de React | `React`/`ReactDOM` por **CDN** + **Babel en el navegador** (JSX en runtime) |
| Carga de Tailwind | **Tailwind CDN** (no build) |
| Navegación | **Archivos `.html` estáticos** enlazados por `href` (`Cafe Valparaiso Agenda.html`, …); en `screens.jsx`, navegación **en memoria** (`nav()`), sin router |
| Estado | `useState`/`useEffect` locales; en la app, referencia a Supabase en los `.tsx`; `screens.jsx` usa mocks |
| Animaciones | **CSS** (`@keyframes` marquee, heroRise, flyUp, reveal, menu-fill) + **JS manual** (parallax, cursor, drag) |
| Scroll | **listeners `window.scroll` manuales** (parallax de título, scroll-progress, nav scrolled) |
| Imágenes | **web component `<image-slot>`** (`image-slot.js`, placeholder drag&drop) + un `<video>` con asset `uploads/video valpa-*.mp4` |
| Navbar / footer compartidos | `site-common.jsx` (`SiteNav`, `SiteFooter`) expuestos con `Object.assign(window, …)` |
| Representación de páginas | Cada página = una función React global montada en un `.html` que carga los `.jsx` por `<script type="text/babel">` |
| Código puramente demo | CDN React/ReactDOM/Babel/Tailwind, `Object.assign(window)`, `<image-slot>`, `.html` estáticos, `screens.jsx` (SPA mock), `portal-*.jsx` (exploraciones), datos de ejemplo de la app |

## 3. Estado del repositorio

| Capa | Implementación actual |
|---|---|
| Server Components | `app/page.tsx` + las 7 páginas públicas + `HeroSection` (wrapper) |
| Client Components | `ScrollExpansionHero` (home); `app/components/*` legacy; formularios auth |
| Layout público | `components/layout/{PublicShell,PublicNavbar,PublicFooter}.tsx` |
| Componentes UI | `components/ui/{Container,SectionHeader,Button,LinkButton,Badge,Card,Input,Textarea}.tsx` |
| Secciones home | `components/sections/home/*` (Hero, About, Culture/Menu/Library/Spaces preview, ReservationCTA) |
| Cards de dominio | `components/cards/{EventCard,MenuItemCard,SpaceCard,BookCategoryCard}.tsx` |
| Capa data | `data/{site,navigation,contact,events,menu,spaces,library}.ts` |
| Capa content | `content/home.ts` |
| SEO | `lib/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, metadata por ruta |
| Auth / Supabase | `utils/supabase/*`, `middleware.ts`, rutas `login/register/dashboard/perfil/admin` |
| Animación disponible | **`motion` `^12.42.2`** (ya usada en `ScrollExpansionHero` y `app/components/*`) |
| Utilidades CSS ya presentes | `.grain`, `.noise`, `.marquee-track`, `.fade-up(-1..4)`, `.btn-fill(-red)`, `.underline-slide`, `.reveal/.reveal-visible`, `.tile`, `.menu-item`, `.press`, `.aurora`, `:focus-visible` global, bloque único `prefers-reduced-motion` |
| Componentes legacy reutilizables | `app/components/{Reveal,VelocityMarquee,AmbienteScroll,ScrollProgress,MagneticButton,Parallax,MediaSlot,Counter}.tsx` (patrones equivalentes a los del prototipo, hoy fuera del home) |

## 4. Diferencias de arquitectura

| Elemento del prototipo | Implementación actual | Riesgo de copiarlo tal cual | Forma correcta de reconstruirlo | Archivo destino recomendado |
|---|---|---|---|---|
| **Tailwind CDN** | Tailwind v4 build (`@import` + `@theme`) | Alto: sin purga, estilos no versionados, FOUC | Usar clases Tailwind del proyecto; tokens en `app/globals.css` | (ninguno nuevo) |
| **Babel en navegador** | Compilación TS/JSX en build | Alto: perf, sin type-safety | Componentes `.tsx` reales | `components/**` |
| **React global (CDN)** | React 19 + RSC | Alto: rompe SSR/hidratación | Imports ES normales | — |
| **`Object.assign(window, …)`** | Módulos ES / imports | Alto: contamina global, no tree-shake | `export`/`import` | — |
| **`<image-slot>` (web component)** | `next/image` / `<img>` + `MediaSlot` | Alto: JS de 31 KB, no SSR, no optim. | `next/image` con assets reales; placeholder editorial CSS mientras no haya foto | `components/ui/` (un `MediaFrame`) o reusar `app/components/MediaSlot.tsx` |
| **listeners de scroll manuales** | `motion` `useScroll`/`useTransform` | Medio: perf, cleanup, jank | `motion` (ya lo hace `ScrollExpansionHero`) | `components/sections/**` (client aislado) |
| **CustomCursor** | (no existe) | Medio: a11y/touch/perf; puede molestar | `motion` en client aislado, `pointer:coarse` off, respeta reduced-motion; **opcional** | `components/motion/CustomCursor.tsx` |
| **Reveal** | `.reveal/.reveal-visible` + `app/components/Reveal.tsx` | Bajo | Reusar `Reveal` existente (IntersectionObserver) | `app/components/Reveal.tsx` |
| **ScrollProgress** | `app/components/ScrollProgress.tsx` (motion) | Bajo | Reusar; montar en `PublicShell` | `app/components/ScrollProgress.tsx` |
| **SiteNav (scroll transparent→dark, índice móvil numerado, "Ingresar")** | `PublicNavbar` (sólido, sin overlay, sin login) | Medio: requiere estado/scroll → client | Nuevo `PublicNavbar` client con `useScroll`, overlay móvil sin bloquear scroll; link "Ingresar" gateado por `isSupabaseConfigured` | `components/layout/PublicNavbar.tsx` |
| **SiteFooter** | `PublicFooter` | Bajo | Ajustar copy/orden a la referencia | `components/layout/PublicFooter.tsx` |
| **Hero (video + flying words + parallax + marquee)** | `ScrollExpansionHero` (expansión por scroll, fallback CSS) | Medio: dos direcciones de hero distintas | **Decisión de producto**: mantener expansión, adoptar video+palabras, o fundir; reconstruir en el client actual | `components/sections/home/ScrollExpansionHero.tsx` |
| **Filmstrip (drag horizontal)** | `app/components/AmbienteScroll.tsx` (drag/scroll con motion) | Bajo | Reusar/adaptar `AmbienteScroll` como client aislado | `app/components/AmbienteScroll.tsx` o nuevo `components/motion/Filmstrip.tsx` |
| **Menu hover-fill (scaleY rojo)** | `.menu-item` (translateX) | Bajo: solo CSS | Añadir utilidad `.menu-row/.menu-fill` a globals.css | `app/globals.css` |
| **Marquee/ticker** | `.marquee-track` + `VelocityMarquee` | Bajo | Reusar `.marquee-track` o `VelocityMarquee` | — |
| **Dropcap** | (no existe) | Bajo: solo CSS | Añadir `.dropcap` a globals.css | `app/globals.css` |
| **Muse (frase rotatoria 4.5s)** | (no existe) | Bajo | Client aislado con intervalo, respeta reduced-motion | `components/sections/home/*` |
| **Bento grids (3 variantes)** | (no existe) | Medio: exploración, elegir una | Descartar 2, reconstruir 1 solo si se aprueba | `components/sections/**` |
| **Navegación simulada (`nav()`, `.html`)** | App Router real | Alto: no aplica | `next/link` + rutas reales (ya existen) | — |
| **Datos hardcodeados** | `data/`/`content/` | Alto | Consumir capa data/content | `data/**`, `content/**` |
| **localStorage** | Supabase Auth + cookies | Alto: no persiste sesión real | Mantener Supabase (no tocar) | `utils/supabase/*` |
| **auth simulada (`screens.jsx`)** | Supabase real | Alto | Mantener auth real | `utils/supabase/*`, `middleware.ts` |

## 5. Sistema visual detectado

- **Colores** (tokens del prototipo): oliva `#4A5728`, oliva oscuro
  `#343E1C`, oliva claro `#6B7A3C`, oliva muted `#8A9A52`, rojo marca
  `#C1121F`, rojo oscuro `#960E17`, off-white `#F5F5F0`. **Base del sitio
  público: `#181f0d`** (verde casi negro) — distinto del `#343E1C` de la
  app y del `#343E1C`/`#2A331A` que hoy usa el repo público.
- **Uso del color**: oliva ~70% base, **rojo ~20-30% máx** (CTAs, palabra
  clave en itálica, bloques de cierre), off-white para contraste y fondos
  crema (`#F5F5F0`) en secciones Menú/Librería.
- **Tipografías**: Playfair Display (400/700/900 + itálica) para display;
  DM Sans (400/500/700/900) para UI. Patrón: headline Playfair con **una
  palabra en itálica + rojo** ("Agenda *cultural.*", "La *Maga.*").
- **Tamaños/jerarquía**: eyebrows DM Sans 9-11px `tracking-[0.25em–0.5em]`
  uppercase oliva-claro; H1 `clamp(2.6rem, 8-9vw, 6.5-7.5rem)`; portadas
  con `pt-40/52`.
- **Bordes/espaciado**: **esquinas rectas** (`rounded-none`), bordes
  `border-2`, sombras duras tipo "stamp" (`shadow-[4-5px_4-5px_0_0]`, sin
  blur). (Contrasta con el `rounded-[1.25rem]` que hoy usa el repo en
  `Card` — decisión visual a reconciliar.)
- **Fondos/textura**: `grain` (SVG feTurbulence, opacity ~0.06-0.07) sobre
  heros y bloques rojos.
- **Hover states**: menu-fill rojo `scaleY`, `underline-slide`,
  `btn-fill`, links oliva→rojo, borde oliva→rojo en tarjetas.
- **Ritmo vertical**: secciones `py-24 md:py-32/36`; alternancia de fondos
  (oliva `#181f0d` ↔ crema `#F5F5F0` ↔ rojo `#C1121F`) como respiración
  editorial.
- **Composición editorial**: índice numerado (01, 02…), dropcaps, comillas
  gigantes de fondo, foto de La Maga rotada -1.2°, filmstrips arrastrables.

*(No se cambian todavía los tokens reales del repo; esto es inventario.)*

## 6. Componentes reutilizables (casi directos)

- `Reveal` (repo `app/components/Reveal.tsx`) ≈ `Reveal` del prototipo.
- `ScrollProgress` (repo) ≈ `ScrollProgress` del prototipo.
- `VelocityMarquee` / `.marquee-track` (repo) ≈ marquee del prototipo.
- `AmbienteScroll` (repo, drag horizontal) ≈ `Filmstrip` del prototipo.
- `.btn-fill`, `.underline-slide`, `.fade-up`, `.grain`, `.noise` (repo) =
  idénticos a los del prototipo (mismo origen).
- `PublicFooter` ≈ `SiteFooter` (ajuste de copy).
- Cards (`EventCard`, `MenuItemCard`, `SpaceCard`, `BookCategoryCard`) =
  base para las líneas de Agenda/Menú/Espacios/Librería.

## 7. Componentes a reconstruir

- `PublicNavbar` → añadir transición transparente→oscuro por scroll,
  overlay móvil con índice numerado, link "Ingresar" (client component).
- `Hero` del home → decidir dirección (expansión vs. video+palabras) y
  reconstruir en `ScrollExpansionHero`.
- `MenuList`/`MenuRow` con hover-fill rojo → nueva utilidad `.menu-row` +
  componente de lista para `/menu` y el preview del home.
- `Dropcap` (manifiestos de "Qué es" y Librería) → utilidad `.dropcap`.
- `Muse` (frase rotatoria) → client aislado opcional.
- `Filmstrip` de espacios con captions → adaptar `AmbienteScroll`.
- `IndiceTira` (índice secundario post-hero) → sección server simple.

## 8. Componentes a descartar

- `<image-slot>` / `image-slot.js` (web component de 31 KB) → `next/image`.
- `Object.assign(window, …)`, CDN React/Tailwind, Babel en navegador.
- `screens.jsx` (SPA mock de la app), navegación `nav()` en memoria.
- Páginas `.html` estáticas.
- `bento-screens.jsx`, `portal-screens.jsx`, `portal-minimal.jsx`,
  `portal-vanguard`(como montaje) → exploraciones; a lo sumo tomar ideas,
  no migrar. **`portal-minimal.jsx` trae precios de ejemplo → descartar.**
- `CustomCursor` → **opcional**; evaluar (riesgo a11y/touch); no bloquea.

## 9. Mapeo por ruta

| Ruta | Referencia Design | Página Next actual | Reutilizables | Nuevos necesarios | Data que consume | Animaciones propuestas | Riesgos | Prioridad |
|---|---|---|---|---|---|---|---|---|
| `/` | `portal-vanguard.jsx` / `Inicio.html` | `app/page.tsx` (7 secciones) | Secciones home, cards, `ScrollExpansionHero`, marquee | Hero (decisión), `IndiceTira`, `Muse`, menu-fill, dropcap, filmstrip | `content/home.ts`, `data/*` | Reveal, marquee, filmstrip drag, parallax/expansión | Doble dirección de hero; base `#181f0d` vs `#343E1C` | **Alta** |
| `/agenda` | `agenda.jsx` | `app/agenda/page.tsx` | `EventCard`, `SectionHeader` | Bloque "próxima programación" (borde rojo), líneas numeradas | `data/events.ts` | Reveal | Ninguno nuevo | Media |
| `/menu` | `carta.jsx` | `app/menu/page.tsx` | `MenuItemCard` | `MenuList`/`MenuRow` hover-fill sobre fondo crema | `data/menu.ts` | menu-fill (CSS) | Contraste sobre crema | Media |
| `/reservas` | `reservas.jsx` | `app/reservas/page.tsx` | `SpaceCard` | Líneas numeradas de tipos; cierre rojo | `data/spaces.ts`, `data/contact.ts` | Reveal | Ninguno | Media |
| `/libreria` | `libreria.jsx` | `app/libreria/page.tsx` | `BookCategoryCard` | Manifiesto dropcap sobre crema; foto La Maga rotada | `data/library.ts` | Reveal, dropcap | Falta asset foto La Maga | Media |
| `/espacios` | `espacios.jsx` | `app/espacios/page.tsx` | `SpaceCard`, `AmbienteScroll` | Filmstrip 4 rincones + captions | `data/spaces.ts` | filmstrip drag | Faltan fotos de rincones | Media |
| `/contacto` | `contacto.jsx` | `app/contacto/page.tsx` | `Card` | Grid sedes Pance/Juanambú + canales "pendientes" | `data/contact.ts`, `data/site.ts` | Reveal | Ninguno (ya alineado) | Baja |

## 10. Mapeo del home (bloque por bloque)

| # | Bloque | Referencia prototipo | Componente actual | Componente destino | Server/Client | Assets | Data | Animación | Riesgo perf |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Navbar | `SiteNav` | `PublicNavbar` | `PublicNavbar` (v2 con scroll+overlay) | **Client** | — | `data/navigation.ts` | scroll transparent→dark | Bajo |
| 2 | Hero | `Hero` (video+palabras) / repo expansión | `ScrollExpansionHero` | `ScrollExpansionHero` | **Client** | video+poster (pendiente) | `content/home.ts` | expansión **o** video+flying words (decidir) | Medio (video/LCP) |
| 3 | Qué es | `QueEs` (dropcap) | `AboutSection` | `AboutSection` | Server | — | `content/home.ts` | Reveal + dropcap | Bajo |
| 4 | Agenda preview | `AgendaPreview` | `CulturePreviewSection` | igual | Server | — | `data/events.ts` | Reveal | Bajo |
| 5 | Menú preview | `MenuPreview` (hover-fill, crema) | `MenuPreviewSection` | igual + menu-fill | Server | — | `data/menu.ts` | menu-fill CSS | Bajo |
| 6 | Librería La Maga | `LibreriaPreview` (foto rotada) | `LibraryPreviewSection` | igual | Server | foto La Maga (pendiente) | `data/library.ts` | Reveal | Bajo |
| 7 | Espacios y reservas | `EspaciosPreview` (filmstrip) | `SpacesPreviewSection` | igual + filmstrip | **Client (filmstrip)** | 4 fotos (pendiente) | `data/spaces.ts` | drag horizontal | Bajo |
| 8 | CTA final | `CtaFinal` (rojo + marquee) | `ReservationCTASection` | igual + marquee de fondo | Server (marquee CSS) | — | `content/home.ts` | marquee lento | Bajo |
| 9 | Footer | `SiteFooter` | `PublicFooter` | igual | Server | — | `data/*` | — | Bajo |

*(La sección "Muse"/frase rotatoria e "IndiceTira" del prototipo son
transiciones opcionales entre bloques.)*

## 11. Datos falsos o no confirmados

**En el sitio público Valparaíso: no se detectaron datos falsos** — usa
consistentemente "pendiente de confirmar", "por confirmar",
"próximamente", sin precios ni fechas. **Se puede migrar su copy tal cual.**

**Datos ficticios detectados (NO migrar), todos en la app "Café Literario"
y en exploraciones — no en el sitio público:**

| Dato ficticio | Dónde aparece |
|---|---|
| `2008` / "año de apertura" | `page.tsx`, `bento-screens.jsx`, `portal-screens.jsx`, `screens.jsx` |
| "16 años" / "Dieciséis años" / "Desde 2008" | `page.tsx`, `register-page.tsx`, `bento-screens.jsx`, `portal-screens.jsx`, `screens.jsx` |
| Precios de ejemplo (Espresso 5.000, Latte 8.000, Tostada 14.000, …) | `portal-screens.jsx`, `portal-minimal.jsx` |
| Estado "Abierto/Cerrado ahora" (horario en vivo) | `encuentranos.jsx` (`useOpenStatus`) — horario de ejemplo |
| Dirección/horarios de ejemplo | `encuentranos.jsx` |
| Bebidas como catálogo cerrado | `screens.jsx`, `perfil-editar-page.tsx` (opciones de perfil, OK como UI, no como menú público) |

No se detectaron: testimonios inventados, correos ficticios, dirección de
Medellín, ni métricas inventadas en el **sitio público**. (El "∞" y
stats 2008/16/∞/1 del home de la app son de la app, no del público.)

## 12. Assets necesarios

*(No se descargan ni se generan; el negocio debe aportarlos. Fallback:
placeholder editorial CSS mientras no existan — nunca stock/Unsplash.)*

| Asset | Formato | Proporción | Resolución | Peso máx | Página | Fallback |
|---|---|---|---|---|---|---|
| Hero video | `.mp4` (H.264, mudo, loop) | 16:9 | 1920×1080 | ≤ 6–8 MB | `/` | Fondo cinematográfico CSS (ya implementado) |
| Hero poster | `.webp` | 16:9 | 1920×1080 | ≤ 250 KB | `/` | Primer frame / gradiente |
| Sede Pance | `.webp` | 4:5 / 3:2 | ≥ 1600px lado | ≤ 300 KB | `/contacto`, `/espacios` | Placeholder editorial CSS |
| Sede Juanambú | `.webp` | 4:5 / 3:2 | ≥ 1600px | ≤ 300 KB | `/contacto`, `/espacios` | Placeholder |
| Café (barra) | `.webp` | 4:5 | ≥ 1400px | ≤ 250 KB | `/menu`, home | Placeholder |
| Cocina | `.webp` | 4:5 | ≥ 1400px | ≤ 250 KB | `/menu` | Placeholder |
| Postres | `.webp` | 4:5 | ≥ 1400px | ≤ 250 KB | `/menu` | Placeholder |
| Coctelería | `.webp` | 4:5 | ≥ 1400px | ≤ 250 KB | `/menu` | Placeholder |
| Agenda (ambiente) | `.webp` | 3:2 | ≥ 1600px | ≤ 300 KB | `/agenda` | Placeholder |
| Librería La Maga | `.webp` | 4:5 | ≥ 1400px | ≤ 300 KB | `/libreria`, home | Placeholder (foto rotada -1.2°) |
| Espacios (4 rincones: sala, lectura, barra, terraza) | `.webp` | 4:5 | ≥ 1400px | ≤ 300 KB c/u | `/espacios`, home | Placeholder + caption |
| Textura grain | (ya embebida SVG) | — | — | — | global | Ya existe (`.grain`) |

## 13. Estrategia de animación

| Animación | Técnica recomendada | Notas |
|---|---|---|
| Reveal on scroll | **CSS** `.reveal` + IntersectionObserver (`Reveal` existente) | Ya respeta reduced-motion |
| Marquee / ticker | **CSS** `.marquee-track` (o `VelocityMarquee`) | Reduced-motion: pausar |
| Menu hover-fill | **CSS** `.menu-row/.menu-fill` | Sin JS; solo hover (desktop) |
| Dropcap | **CSS** `::first-letter` | Estático |
| Hero (expansión / video / palabras) | **Motion, Client aislado** (`ScrollExpansionHero`) | `useScroll`/`useTransform`; scroll nativo; ya reduced-motion-safe |
| Parallax de título | **Motion** `useTransform` (no listener manual) | Client aislado |
| Filmstrip drag | **Motion / pointer** en client aislado (`AmbienteScroll`) | Táctil + teclado; `scroll-snap` |
| Muse (frase rotatoria) | **Motion / setInterval** client aislado | Pausar en reduced-motion |
| ScrollProgress | **Motion** (`ScrollProgress` existente) | Decorativo (`aria-hidden`) |
| CustomCursor | **Motion** client aislado — **opcional** | Off en `pointer:coarse`; off en reduced-motion; evaluar a11y |
| Flying words | **CSS** `@keyframes flyUp` | `aria-hidden`; off en reduced-motion |

Reglas transversales: `prefers-reduced-motion` centralizado en el bloque
único de `globals.css`; **nunca** bloquear scroll (sin `preventDefault`,
sin listeners globales de wheel/touch); todo componente animado como
**Client Component aislado** para no cliente-izar páginas server;
performance: mantener `/` estática, video con `preload="metadata"`+poster.

## 14. Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Copiar el montaje del prototipo (CDN/Babel/`window`) | Alta si se copia literal | Alto | Prohibido; reconstruir con componentes reales (este doc) |
| Conflicto de base de color `#181f0d` (prototipo) vs `#343E1C`/`#2A331A` (repo) | Alta | Medio | Decidir el fondo base público en GOAL 17 (sistema visual) antes de tocar páginas |
| Doble dirección de hero (expansión actual vs video+palabras del prototipo) | Alta | Medio | Decisión de producto explícita antes de tocar el hero |
| `<image-slot>` / falta de fotos reales | Alta | Medio | `next/image` + placeholder editorial CSS; assets en §12 |
| `rounded-none` editorial del prototipo vs `rounded-[1.25rem]` del repo | Media | Medio | Reconciliar en tokens (GOAL 17); no mezclar radios sin criterio |
| CustomCursor daña a11y/touch/perf | Media | Medio | Opcional; si se hace, apagarlo en touch y reduced-motion |
| Cliente-izar páginas server por animaciones | Media | Medio | Todo motion en client aislado; páginas siguen server |
| Migrar copy de la app (2008/precios) al público | Baja | Alto | §11 marca qué NO migrar; el público ya está limpio |
| Link "Ingresar" a la app expone auth prematuramente | Media | Bajo | Gatear por `isSupabaseConfigured` (patrón ya usado) |

## 15. Plan GOAL 17–24

*(Renumerado desde 17 porque el repo ya llegó al 16.)*

**GOAL 17 — Sistema visual compartido**
- Objetivo: fijar tokens/base de color del público (decidir `#181f0d` vs
  actual), radios (`rounded-none` vs actual), y añadir utilidades del
  prototipo (`.menu-row/.menu-fill`, `.dropcap`, `.fly-word`) a globals.css.
- Permitidos: `app/globals.css`, `lib/design-tokens.ts`, `docs/`.
- Prohibidos: páginas, componentes de dominio, Supabase, middleware.
- Dependencias: ninguna nueva. Validaciones: lint/build/tsc, contraste AA.
- Éxito: tokens y utilidades listos, build estático, sin regresión visual
  de rutas existentes.

**GOAL 18 — Home**
- Objetivo: reconstruir el home editorial (hero decidido, IndiceTira, Muse,
  menu-fill, filmstrip, marquee CTA) sobre secciones existentes.
- Permitidos: `components/sections/home/*`, `app/page.tsx`, `content/home.ts`,
  `components/motion/*` (nuevos client aislados), `app/globals.css` (si falta utilidad).
- Prohibidos: otras rutas, Supabase, middleware, data.
- Validaciones: 5 viewports, 1 h1/1 main, scroll libre, reduced-motion,
  hidratación, `/` estática.
- Éxito: home a alta fidelidad sin datos falsos ni assets inventados.

**GOAL 19 — Agenda y Menú**
- Objetivo: portadas + líneas numeradas (Agenda) y listas hover-fill sobre
  crema (Menú).
- Permitidos: `app/agenda/page.tsx`, `app/menu/page.tsx`, cards, `globals.css`.
- Prohibidos: data (solo consumir), Supabase, otras rutas.
- Éxito: sin precios/fechas inventadas; contraste AA sobre crema.

**GOAL 20 — Librería**
- Objetivo: manifiesto dropcap + foto La Maga (placeholder) + líneas.
- Permitidos: `app/libreria/page.tsx`, cards, `globals.css`.
- Éxito: sin inventario inventado.

**GOAL 21 — Espacios y Reservas**
- Objetivo: filmstrip de rincones (client aislado) + tipos de reserva.
- Permitidos: `app/espacios/page.tsx`, `app/reservas/page.tsx`, `components/motion/*`.
- Éxito: filmstrip táctil/teclado, sin aforos/tarifas inventadas.

**GOAL 22 — Contacto + Navegación pública**
- Objetivo: contacto (sedes Pance/Juanambú, canales pendientes) +
  `PublicNavbar` v2 (scroll, overlay móvil, "Ingresar" gateado).
- Permitidos: `app/contacto/page.tsx`, `components/layout/*`.
- Prohibidos: Supabase/middleware/rutas auth.
- Éxito: nav accesible sin bloquear scroll; acceso a la app resuelto.

**GOAL 23 — Microinteracciones**
- Objetivo: Reveal/marquee/underline-slide/btn-fill/ScrollProgress/(cursor
  opcional) afinados y reduced-motion-safe en todo el público.
- Permitidos: `components/motion/*`, `app/globals.css`, secciones.
- Éxito: 0 jank, 0 bloqueo de scroll, reduced-motion completo.

**GOAL 24 — QA visual final**
- Objetivo: auditoría 5 viewports × 7 rutas (overflow, h1/main, tap
  targets, contraste, hidratación, `/robots`/`/sitemap`, build sin env).
- Permitidos: solo correcciones puntuales de lo migrado + `docs/`.
- Éxito: todo verde; documento de cierre.

*(El área privada — dashboard/perfil/admin — ya existe con Supabase; su
rediseño visual, si se desea, sería un GOAL aparte y explícito, sin tocar
la lógica de auth.)*

## 16. Recomendación de implementación

1. **No copiar** ningún archivo del prototipo; usarlo solo como referencia
   visual (fidelidad de color, tipografía, hover, ritmo).
2. Empezar por **GOAL 17 (sistema visual)** para resolver primero las dos
   decisiones que bloquean todo lo demás: **(a)** base de color del público
   (`#181f0d` del prototipo vs `#343E1C`/`#2A331A` actual) y **(b)** radios
   (`rounded-none` editorial vs `rounded-[1.25rem]` actual). Sin eso, cada
   página migrada arrastraría inconsistencias.
3. Resolver la **dirección del hero** (mantener la expansión por scroll ya
   implementada en GOAL 16, adoptar el video+flying-words del prototipo, o
   fundir ambos) como decisión de producto **antes** de GOAL 18.
4. Migrar el **copy del sitio público tal cual** (está limpio y
   disciplinado); **no** migrar ningún texto de la app "Café Literario"
   (2008/16 años/precios).
5. Todas las animaciones como **Client Components aislados** con `motion`,
   respetando reduced-motion y sin bloquear scroll; las páginas siguen
   siendo Server Components.
6. Los **assets** (§12) los aporta el negocio; mientras tanto, placeholder
   editorial CSS — nunca stock ni imágenes inventadas.
