# Café Valparaíso — Cinemagraphs & Galería de Menú

> **Documento de handoff para revisión de UX/UI.**
> Resume el trabajo de diseño hecho hasta ahora (cinemagraphs de fotos reales
> en el Home y galería de destacados en `/menu`). La última sección pide una
> revisión concreta con una skill de UX y recomendaciones para continuar.

---

## 1. Contexto

**Café Valparaíso** (Cali) — café literario, cultural y gastronómico.
Stack: **Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4
(tokens vía `@theme` en `app/globals.css`, sin `tailwind.config`) · Supabase
(auth)**.

Objetivo del refresh: subir el sitio de "plano" a algo **editorial y memorable**
(referencia cartel/cine de autor, revista cultural, gastronomía premium), **sin
romper nada** (auth, build, páginas internas).

---

## 2. Qué se construyó (resumen)

1. **Dos cinemagraphs en el Home** — fotos reales de platos que "respiran" con
   CSS:
   - **Lomo Bestiario** → carta *Menú* dentro de `UniverseSection`.
   - **Tapeo Cortázar** → escena *Atmósfera* (antes un degradado abstracto).
2. **Galería «Destacados» en `/menu`** — sistema reutilizable, dirigido por
   datos, con **6 baldosas-cinemagraph**: 3 platos + 2 bebidas + 1 postre.

Todo con **fotografía real**, nunca generada por IA (ver §4).

---

## 3. La técnica: cinemagraph CSS de foto real

Una sola imagen que parece cobrar vida, **sin video y sin JavaScript**:

- **Push-in**: `transform: scale()` + `translateY()` lento (8–9 s).
- **Origen del push-in** = el foco del plato (`transform-origin`), lo que crea un
  **pseudo-parallax de una sola imagen** (sin recortes ni "fantasmas").
- **Respiración de luz**: un radial cálido con `opacity` animada +
  `mix-blend-mode: soft-light`.
- **Grain estático** encima para textura editorial.
- **Loop exacto** con `animation-direction: alternate` (ida y vuelta, sin salto).
- **`prefers-reduced-motion: reduce`** → animación congelada en un fotograma.
- **Solo `transform`/`opacity`** (propiedades de compositor) + `will-change` →
  barato en GPU, sin reflow.
- **Server Components**, cero JS de cliente.

### Principio bloqueado: foto real, no IA

El usuario adjuntó *prompts* de generación (JSON) para cada plato, pero la
decisión está fijada: **se usa la foto real, el JSON solo sirve de referencia de
ingredientes.** Un modelo generativo reinterpreta las texturas de la comida
(el glaseado, el ajonjolí, la espuma) y produce el "look de IA" que la marca
rechaza. Un cinemagraph fiel necesita la foto real.

---

## 4. Sistema de diseño (referencia)

**Fuentes** (`next/font/google`, con `display: swap` y variables CSS):
- Display / titulares → **Playfair Display** (`.font-playfair`).
- Cuerpo / UI → **DM Sans** (`.font-sans-app`).

**Tokens de color** (`@theme` en `globals.css`):
| Token | Hex | Uso |
|---|---|---|
| `--color-off-white` | `#F5F5F0` | papel / fondo claro |
| `--color-olive` | `#4A5728` | verde oliva (bordes, texto) |
| `--color-olive-dark` / background | `#343E1C` | verde profundo base |
| `--color-red-brand` | `#C1121F` | rojo acento (CTA, folios) |

**Colores de las escenas oscuras / cinemagraphs** (usados inline):
`#12180a` (noche verdosa), `#FF7F70` (coral, acentos de nombre),
`#7A2230` (vino), `#181f0d`, `#D9DCC4`, `#EFE4D0`, `#F7F1E6`.

**Reglas anti-"AI slop"** (del `CLAUDE.md` del proyecto): nada de paleta
cian-sobre-oscuro ni gradientes morado→azul; nada de Inter/Roboto/Arial; nada
de centrar todo; nada de grids genéricos de tarjetas icono+título+texto; nada de
emoji como iconos; variar el ritmo de las frases en el copy.

---

## 5. Arquitectura y archivos

### Home
- `components/sections/home/LomoBestiarioCinemagraph.tsx` — baldosa de la carta
  *Menú* (dentro del `<Piece>`-enlace de `UniverseSection`). CSS: `.lomo-plato`
  / `.lomo-luz`.
- `components/sections/home/AtmosphereBreakSection.tsx` — escena *Atmósfera* con
  **Tapeo Cortázar** contenido (plato iluminado que emerge de la oscuridad).
  CSS: `.tapeo-plato` / `.tapeo-luz`. Texto real (nombre + ingredientes) sobre la
  imagen decorativa.
- `content/home.ts` — textos del Home (incl. el bloque `atmosphere`).

> **Regla de composición:** *un protagonista por escena.* El Lomo manda en la
> escena *Universo*; el Tapeo, en *Atmósfera*. Viven en **viewports distintos**,
> así que nunca compiten en pantalla.

### Menú (`/menu`)
- `data/menu.ts` → **`menuFeatured: MenuFeaturedItem[]`** — fuente de verdad de
  la galería. Cada ítem: `slug`, `kind` (`'plato' | 'bebida' | 'postre'`),
  `nameLead`/`nameAccent`, `ingredients`, `aspect`, `origin` (transform-origin),
  `luz` (min/max opacidad), `hasMobile`, `lqip` (placeholder base64 inline).
- `components/sections/menu/DishTile.tsx` — **baldosa genérica**. Misma técnica,
  parametrizada por **CSS vars** (`--dish-origin`, `--dish-luz-min/max`,
  `--dish-delay` para desincronizar la respiración entre baldosas). Nombre e
  ingredientes como texto real sobre un scrim; foto con `alt` descriptivo.
- `components/sections/menu/MenuFeaturedSection.tsx` — **galería** (índice 03,
  "De la cocina y la barra"). Grid responsive `1 → 2 → 3` columnas; respeta el
  `aspect` de cada ítem; no se renderiza si no hay ítems.
- `app/menu/page.tsx` — orden: Hero (01) → Categorías (02) → **Destacados (03)**
  → Cierre.
- CSS genérico en `globals.css`: `.dish-plato` / `.dish-luz` (un solo par de
  keyframes para N ítems).

### Assets (pipeline)
- Carpeta por ítem: `public/media/{slug}/` con
  `{slug}-plato-desktop.{avif,webp}`, `{slug}-plato-mobile.{avif,webp}`,
  `{slug}-fondo.{avif,webp}`.
- Generados con **`sharp` fuera del repo**: recorte cuadrado (quitando el
  *letterbox*/chrome de los screenshots de la app), AVIF + WebP, fondo
  desenfocado y **LQIP** (~22 px, base64 inline → sin parpadeo en negro).

---

## 6. Los 6 destacados actuales

| # | Nombre | Tipo | Ingredientes (línea) | Precio | Origen de la foto |
|---|---|---|---|---|---|
| 1 | **Lomo Bestiario** | Plato | Pasta · hongos · cebolla crocante | — | foto real (720²) |
| 2 | **Tapeo Cortázar** | Plato | Pan dorado · jamón curado · rúgula · almendra · glaseado | — | foto real (469²) |
| 3 | **Costillas BBQ** | Plato | Papas criollas · ajonjolí · cebollín · salsa verde | — | foto real (469²) |
| 4 | **Te Chai** | Bebida | Especias · panela · leche artesanal | $16.000 | screenshot app (~355²) |
| 5 | **Capuccino con Licor** | Bebida | Espresso · leche · licor Amaretto | $18.000 | screenshot app (~355²) |
| 6 | **Blanca Mujer** | Postre | Guanábana · agraz · salsa de berries · romero | $19.000 | screenshot app (~360²) |

Los nombres se dividen en dos tonos (crema + coral cursiva). Hoy **no se muestran
precios** en las baldosas (ver §9).

---

## 7. Accesibilidad y rendimiento

**A11y**
- Capas de imagen **decorativas** (`aria-hidden`); el **nombre e ingredientes son
  texto real** en el DOM, legibles sin movimiento.
- **Scrim** de degradado bajo el texto → contraste sobre la foto (objetivo AA).
- `alt` **descriptivo** en la foto del `/menu` (es informativa en una carta).
- Nombres como `span` (no `h2`) para **no romper la jerarquía** de encabezados.
- `prefers-reduced-motion` respetado en todas las animaciones.

**Rendimiento**
- `<picture>` con **AVIF + WebP**; **LQIP** inline (sin flash blanco/negro);
  `loading="lazy"` + `decoding="async"`.
- **Cero JS** (Server Components); animación solo en compositor (`transform` /
  `opacity` + `will-change`).

---

## 8. Invariantes / restricciones (no romper)

- **`npm run build` debe pasar SIN variables de entorno → 19/19 páginas
  estáticas.** (Verificado tras cada cambio.)
- **No tocar:** auth, `data/` (salvo *añadir* `menuFeatured`), Supabase,
  middleware, navbar, footer, `package.json`, lockfile, config de deploy, rutas
  internas (`/admin`, `/dashboard`, `/perfil`, …).
- Dependencias de imagen (`sharp`, `playwright`) instaladas **fuera del repo**.
- Rama de trabajo: **`claude/home-compacto-visual-v3`**.

---

## 9. Estado actual y decisiones pendientes

- **Sin commitear** todavía (todo el trabajo vive en el working tree de la rama
  v3, listo para un solo commit cuando se apruebe).
- **Precios:** las 3 bebidas/postre traen precio; los 3 platos, no. Hoy la
  galería no muestra precio (para ser consistente). Decisión abierta: mostrar
  precios en todas (faltan los de los platos) vs. mantenerlo sin precios.
- **Calidad de imagen:** las bebidas y el postre salieron de **screenshots de la
  app** (~355 px) → algo menos nítidas que los platos. Si aparece la **foto
  original**, se reemplaza y quedan perfectas.

---

## 10. Petición de revisión (para la skill de UX)

Por favor evalúa el trabajo anterior y **devuelve recomendaciones priorizadas**
(quick wins vs. cambios mayores) sobre:

1. **Jerarquía y legibilidad** de las baldosas: ¿el texto sobre la foto (nombre
   + ingredientes) se lee bien en todas? ¿el scrim da contraste **AA real**
   (4.5:1 cuerpo / 3:1 grande) sobre las fotos más claras (p. ej. Te Chai)?
2. **Movimiento**: ¿la "respiración" (push-in + luz) **aporta o distrae**? ¿los
   tiempos (8–9 s) y el desfase entre baldosas son adecuados? ¿6 elementos
   animados a la vez es demasiado en un viewport?
3. **Sistema y consistencia**: Home vs. `/menu` — ¿la regla "un protagonista por
   escena" se sostiene? ¿el Tapeo en *Atmósfera* funciona o se siente forzado?
4. **Galería `/menu`**: ¿el orden *platos → bebidas → postre* es el mejor?
   ¿conviene **agrupar por categoría con subtítulos**, o mezclar? ¿la cuadrícula
   uniforme cuadrada es correcta, o algunas (bebidas verticales) pedirían otra
   relación de aspecto / un layout tipo *masonry* o destacado-grande?
5. **Precios**: recomienda un patrón (mostrar/ocultar, ubicación, formato COP) y
   si mezclar ítems con y sin precio es aceptable a nivel UX.
6. **Escalabilidad**: cómo se comporta el grid con 7, 9, 12 ítems; si hace falta
   filtro/categorías/paginación cuando la carta crezca.
7. **Coherencia con el resto de `/menu`**: la sección existente de *Categorías*
   usa filas con *hover-fill* rojo; ¿la galería de fotos convive bien con ella o
   compiten? ¿el orden de secciones (Categorías antes que Destacados) es el
   ideal?
8. **Próximos pasos del tema de diseño**: qué falta para que `/menu` (y el Home)
   se sientan "terminados" en el nivel editorial buscado — micro-interacciones,
   estados de foco/hover, ritmo tipográfico, densidad, etc.

**Restricción para las recomendaciones:** deben respetar los invariantes de §8
(build sin env, no tocar auth/data/rutas internas), la regla de **foto real, no
IA** (§3), y las reglas anti-"AI slop" del proyecto (§4).
