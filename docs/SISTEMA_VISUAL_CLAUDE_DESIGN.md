# Sistema visual compartido — Claude Design

GOAL 17. Traslada el **lenguaje visual** del prototipo de Claude Design
(`docs/MIGRACION_CLAUDE_DESIGN.md`) al sistema real del repositorio: tokens,
componentes UI compartidos, layout público y utilidades CSS reutilizables.
**No reconstruye páginas todavía** (eso es GOAL 18+), no copia la arquitectura
del prototipo y no toca datos comerciales, auth, Supabase ni el área privada.

## 1. Objetivo

Acercar el sitio público a la dirección editorial de alta fidelidad del
prototipo — base casi negra con matiz verde, profundidad por capas oliva,
radios editoriales (fin del look SaaS), botones/enlaces con carácter — a
través del **sistema de diseño compartido**, sin reconstruir pantallas. El
objetivo es que las páginas que se migren en GOALs posteriores hereden ya una
base visual coherente.

## 2. Decisiones aprobadas

### Fondo principal

- **Base del sitio público: `#181f0d`** (verde casi negro). Es el nuevo fondo
  editorial principal, aplicado en `PublicShell` (no en `body`, para no alterar
  el área privada).
- Los tonos oliva se conservan como **capas secundarias** que aportan
  profundidad: `#343E1C` (navbar / superficie secundaria), `#2A331A` (footer),
  `#4A5728` (bordes / superficie elevada), `#6B7A3C`, `#8A9A52`.
- **No se aplanó la web a negro**: hay jerarquía `#181f0d` (base) → `#343E1C`
  (navbar) → `#2A331A` (footer) → superficies oliva → crema `#F5F5F0`/`#F7F1E6`
  → rojo `#C1121F`.

### Paleta

| Rol | Color |
|---|---|
| Fondo editorial principal (público) | `#181f0d` |
| Superficie secundaria | `#343E1C` |
| Superficie elevada / borde fuerte | `#4A5728` |
| Borde editorial claro | `#6B7A3C` |
| Oliva atenuado (metadata) | `#8A9A52` |
| Acento rojo editorial | `#C1121F` (hover `#960E17`) |
| Marfil principal | `#F5F5F0` (papel cálido `#F7F1E6`) |
| Dorado eyebrow | `#C9A227` |
| Tintes de texto AA sobre noche | `#A6B86B`, `#D9DCC4`, `#FF7F70` |

### Radios

Se abandona el aspecto redondeado tipo SaaS. Criterio **editorial, no
brutalista**:

- Cards editoriales: `rounded-sm` (antes `rounded-[1.25rem]`).
- Contenedores/inputs/botones: radio pequeño (`rounded-sm`).
- Media contenida: radio moderado (`radius.lg = 0.5rem`); media expandida: `0`.
- Badges: conservan `rounded-full` (etiqueta editorial).

### Hero

El **hero expansivo de GOAL 16 no se modificó**. Su refinamiento editorial
(tipografía, composición, video, grain, ritmo del prototipo) queda para un
GOAL posterior. En GOAL 17 solo hereda, indirectamente, los botones editoriales
al usar `LinkButton`.

## 3. Tokens (`lib/design-tokens.ts`)

`design-tokens.ts` es un archivo **solo-datos** (no lo importa ningún
componente en runtime; es el contrato visual documentado). Los cambios no
rompen imports.

| Token | Valor anterior | Valor nuevo | Uso | Impacto |
|---|---|---|---|---|
| `colors.hierarchy` | *(no existía)* | grupo nuevo | Vista canónica de la jerarquía cromática pública | Documental; alias de colores ya existentes |
| `colors.hierarchy.backgroundPrimary` | — | `#181f0d` | Fondo editorial principal público | Nuevo |
| `colors.hierarchy.backgroundSecondary` | — | `#343E1C` | Superficie secundaria (navbar) | = `base.olive` |
| `colors.hierarchy.surface` | — | `#4A5728` | Superficie elevada / borde fuerte | = `border.night` |
| `colors.hierarchy.border` | — | `#6B7A3C` | Borde editorial claro | Oliva claro |
| `colors.hierarchy.muted` | — | `#8A9A52` | Metadata / acento tenue | Oliva muted |
| `colors.hierarchy.accent` | — | `#C1121F` | Acento rojo | = `brand.red` |
| `colors.hierarchy.paper` | — | `#F5F5F0` | Marfil principal | = `text.onNight.primary` |
| `colors.base.blackGreen` | *(no existía)* | `#181f0d` | Base editorial casi negra | Nuevo |
| `colors.base.olive` (comentario) | "fondo principal de Modo Noche" | "superficie secundaria de Modo Noche" | Reencuadre semántico | Sin cambio de valor |
| `radius.sm` | `0.5rem` | `0.25rem` | Inputs/botones/detalles | Radio más sobrio |
| `radius.md` | `1.25rem` | `0.375rem` | Tarjetas editoriales | Fin del look SaaS |
| `radius.lg` | `1.5rem` | `0.5rem` | Media/video contenido | Radio más sobrio |
| `radius.none` / `radius.full` | `0` / `999px` | *(sin cambio)* | Media expandida / badges | — |

## 4. Componentes actualizados

| Componente | Cambio | Motivo | Riesgo | Validación |
|---|---|---|---|---|
| `PublicShell` | Fondo `bg-[#181f0d]` + `text-[#F5F5F0]` en el contenedor raíz | Base editorial pública sin tocar `body` (privado intacto) | Bajo | login sigue en `#343E1C`; 7 rutas en `#181f0d` (Playwright) |
| `Card` | `rounded-[1.25rem]` → `rounded-sm`; `transition-colors`; borde oliva en variante `dark` | Fin del look SaaS; marco editorial | Bajo | Cards no rompen páginas (agenda/menú) |
| `Button` / `LinkButton` | Radio `rounded-sm`; sin sombras "stamp"; sin píldoras (`ghost`/`dark`); hover-fill sobrio por color; `lg` con `min-h-12` | Botones editoriales, no SaaS | Medio (cambio visual notable de los CTA) | Tap targets 44px; foco visible; AA |
| `Input` / `Textarea` | `rounded-none` → `rounded-sm`; `min-h-11`; placeholder `#6B6355` (más legible) | Radio sobrio + altura táctil + legibilidad | Bajo | Compilan; formularios consumidores intactos |
| `Container` | Padding `px-4 md:px-8` → `px-6 md:px-8 lg:px-12` (24/32/48px) | Aire editorial consistente | Bajo | 0 overflow horizontal en 5 viewports |
| `SectionHeader` | Nueva prop opcional `emphasis` (énfasis serif itálico rojo); `tracking-tight` en título | Patrón "Agenda *cultural.*" del prototipo | Bajo | Retrocompatible (prop opcional); tsc OK |
| `Badge` | Sin cambios (conserva `rounded-full`) | Ya lee como etiqueta editorial | Nulo | — |
| `PublicNavbar` | Enlaces `rounded-full` → `rounded-sm` + hover-bg sutil | Fin de píldoras; coherencia editorial | Bajo | 44px, `aria-current`, scroll-x, sin overflow |
| `PublicFooter` | Más aire (`py-12 md:py-16` → `py-14 md:py-20`) | Menos apariencia de placeholder técnico | Bajo | Sin overflow; contenido intacto |

## 5. Utilidades CSS (`app/globals.css`)

| Utilidad | Estado | Descripción | Reduced motion |
|---|---|---|---|
| `.grain` | **Ya existía** | Textura fija SVG (feTurbulence), `opacity 0.05`, `pointer-events:none`, sin archivo externo | Estática |
| `.underline-slide` | **Ya existía** | Subrayado rojo que crece al hover | Sí (transición) |
| `.dropcap` | **Nueva** | Capitular editorial (`::first-letter` serif itálica roja). Estática. Preparada, no aplicada | No anima |
| `.menu-row` / `.menu-fill` | **Nuevas** | Fila de menú/índice con relleno rojo `scaleY` al hover (CSS puro). Preparadas para GOAL 19+, **no aplicadas a páginas** | Sí: sin transición de movimiento (estado instantáneo) |
| `.editorial-fill` | **Nueva** | Relleno deslizante reutilizable: lavado tenue de `currentColor` (`scaleX`, opacidad 0.14). Preparada, no aplicada | Sí: sin transición |
| `.fly-word` | **No implementada** | Se deja para el GOAL del home (requiere lógica/composición del hero) | — |

Todas las utilidades animadas nuevas respetan el bloque único
`@media (prefers-reduced-motion: reduce)` (ampliado con `.menu-fill` y
`.editorial-fill::before`). No se añadieron animaciones continuas.

## 6. Componentes NO modificados

Confirmado — **no se tocaron**:

- **Páginas** públicas (`app/**/page.tsx`): sin cambios (solo heredan el
  sistema visual vía componentes).
- **Data** (`data/**`) y **content** (`content/**`): sin cambios.
- **Hero expansivo** (`ScrollExpansionHero.tsx`, `HeroSection.tsx`): sin cambios.
- **Cards de dominio** (`components/cards/**`): sin cambios.
- **Auth / Supabase** (`utils/supabase/**`, formularios): sin cambios.
- **Middleware** (`middleware.ts`): sin cambios.
- **Área privada**: `login`, `register`, `dashboard`, `perfil`, `admin` sin
  cambios. No importan los componentes UI modificados (verificado por grep) y
  `body` conserva `#343E1C` (verificado: login `rgb(52,62,28)`).
- **`package.json`**: sin cambios (no se instalaron paquetes).

## 7. Accesibilidad

- **Contraste**: eyebrow dorado `#C9A227`, título marfil `#F5F5F0` y cuerpo
  `#A6B86B`/`#D9DCC4` sobre `#181f0d` mantienen AA. Cards crema conservan texto
  tinta `#1C1912`. Placeholder de inputs a `#6B6355` (más legible que `#aaa`).
- **Tap targets**: nav links 44px, CTA/botones 44px (`min-h-11`; `lg`
  `min-h-12`), inputs 44px (`min-h-11`). Enlaces de texto inline del footer se
  mantienen en su tamaño informativo (no son tap targets primarios; sin cambio).
- **Foco visible**: `:focus-visible` global (coral `#FF7F70`) intacto; inputs
  mantienen su indicador (borde → rojo).
- **Reduced motion**: bloque único ampliado; utilidades nuevas sin movimiento
  bajo la preferencia. Home en reduced-motion: 1 `<h1>`, 0 errores, 0 mismatch.
- **Semántica preservada**: un solo `<main>` y un solo `<h1>` por página en las
  7 rutas × 5 viewports; skip link (`#contenido-principal`) enfoca al primer
  `Tab`; landmarks intactos.

## 8. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Quitar la sombra "stamp" de los botones cambia notablemente los CTA | Alta | Medio | Es la dirección editorial aprobada (sin sombras en botones); la variante `editorial` de `Card` conserva el sello como rasgo de identidad |
| El fondo `#181f0d` reduce el contraste de textos oliva oscuros mal usados a futuro | Baja | Medio | Guía de tintes AA documentada (§7); labels de input siguen en secciones de papel |
| Las utilidades `.menu-row`/`.editorial-fill` aún no probadas en páginas reales | Media | Bajo | Preparadas pero no aplicadas; se validarán al usarlas en GOAL 19+ |
| Padding de `Container` mayor podría apretar contenido en 360px | Baja | Bajo | Verificado: 0 overflow horizontal en 360×740 |

## 9. Assets pendientes

Sin cambios respecto a la auditoría (§12 de `MIGRACION_CLAUDE_DESIGN.md`): el
negocio debe aportar hero video/poster, fotos de sedes (Pance/Juanambú), barra,
cocina, postres, coctelería, La Maga y rincones de espacios. Mientras tanto:
**placeholder editorial CSS** (`.tile`, fondo cinematográfico del hero) — nunca
stock ni imágenes inventadas. GOAL 17 no introdujo ningún asset.

## 10. Recomendación para GOAL 18

GOAL 18 = **reconstrucción visual del Home** sobre las secciones existentes,
heredando ya este sistema visual. Antes de empezar:

1. **Resolver la dirección del hero** (mantener la expansión de GOAL 16,
   adoptar el video + flying-words del prototipo, o fundir ambos) como decisión
   de producto explícita.
2. Aplicar en el home las utilidades preparadas aquí: `.dropcap` (manifiesto
   "Qué es"), `.menu-row/.menu-fill` (preview de menú), `.editorial-fill`
   (filas/CTA), `SectionHeader emphasis` (títulos con palabra en itálica roja).
3. Añadir microinteracciones como **Client Components aislados** (`motion`),
   respetando reduced-motion y sin bloquear scroll; el home sigue siendo Server
   Component salvo el hero.
4. No introducir datos falsos ni assets inventados; consumir `content/home.ts`
   y `data/**`.
