# Home editorial — Claude Design

GOAL 18. Reconstrucción visual editorial de la ruta `/` para acercarla al
prototipo de Claude Design, **manteniendo la arquitectura real** (Server
Components, hero expansivo del GOAL 16, sistema visual del GOAL 17) y **sin
inventar datos ni assets**. Solo se tocó el Inicio.

## 1. Objetivo

Elevar el home de una colección de tarjetas a una **pieza editorial con
ritmo**: superficies alternadas, títulos serif de alto impacto con acento rojo,
filas numeradas, hover-fill de menú, un bloque memorable para la Librería La
Maga y un cierre rojo con fuerza. Cada sección tiene identidad propia; ninguna
repite la misma cuadrícula.

## 2. Referencias utilizadas

- `docs/MIGRACION_CLAUDE_DESIGN.md` — mapa de migración (bloques del home).
- `docs/SISTEMA_VISUAL_CLAUDE_DESIGN.md` — tokens, radios, utilidades (GOAL 17).
- `docs/HOME_HERO_EXPANSIVO.md` — hero expansivo (GOAL 16).
- Prototipo `design_handoff_cafe/portal-vanguard.jsx`, `site.css`,
  `site-common.jsx`, `Cafe Valparaiso Inicio.html` — **solo referencia visual**
  (composición, tipografía, grain, ritmo, uso del rojo). No se copió su montaje
  (CDN React/Tailwind/Babel, `Object.assign(window)`, `<image-slot>`, `.html`).

## 3. Arquitectura del home

- `app/page.tsx` **sigue siendo Server Component**: compone `content/home.ts` y
  reparte props a las secciones.
- Las 7 secciones son **Server Components**; el **único Client Component** es
  `ScrollExpansionHero.tsx` (hero). No se creó ningún Client Component nuevo.
- Orden fijo: **Hero → Qué es → Agenda → Menú → Librería → Espacios → CTA final
  → Footer**.
- `content/home.ts` es la **única fuente de texto** del home (no se duplican
  strings en los componentes); compone datos reales de `data/*` sin inventar.
- Ritmo de superficies (identidad por sección): `#181f0d` (hero) → **marfil**
  (Qué es) → `#181f0d` (Agenda) → **marfil** (Menú) → `#181f0d` (Librería) →
  `#181f0d` (Espacios) → **rojo `#C1121F`** (CTA).

## 4. Hero expansivo

`HeroSection` (wrapper server) + `ScrollExpansionHero` (client). Se conservó la
**expansión por scroll del GOAL 16** y se refinó la composición del prototipo:

- Un único `<h1>` compuesto en dos líneas: **«Café»** (marfil) y **«Valparaíso»**
  (itálica, acento coral `#FF7F70` — variante AA del rojo sobre fondo oscuro).
- Eyebrow con el concepto: «Café literario, cultural, artístico y gastronómico».
- Micro-labels de esquina: «Café · Cultura · Cocina» / «Cali, Colombia».
- Copy: «Un lugar para leer, conversar y comer. Sedes en Pance y Juanambú…».
- CTAs visibles desde el inicio: **Reservar** (`/reservas`) y **Ver agenda**
  (`/agenda`).
- Highlights: Ciudad Cali · Sedes Pance y Juanambú · Librería La Maga.
- **Grain** sutil (`.grain-soft`), scrim + gradiente inferior para legibilidad.
- Fondo `#181f0d`; medio central expansivo (video real si existe, si no el
  **fallback cinematográfico CSS** ya existente). Sin sombras pesadas, sin neón,
  sin palabras que vuelen, sin claims.
- Scroll **nativo**, sin `preventDefault` ni listeners globales; reduced-motion
  deja el hero en su estado final (sin mismatch de hidratación).

## 5. Qué es Café Valparaíso

`AboutSection` — **manifiesto editorial sobre marfil** (`#F5F5F0`):

- Kicker numerado `01` (rojo) + eyebrow.
- Título serif grande con énfasis itálico rojo `#C1121F` (AA sobre marfil).
- Párrafo principal con **dropcap** (`.dropcap`) y ancho de lectura controlado
  (máx. 2 párrafos).
- **Cita lateral** editorial con barra roja.
- Fila de palabras clave: Literatura · Café · Cocina · Arte · Música ·
  Conversaciones · Comunidad · Cali · Pance y Juanambú.
- Comilla gigante decorativa (`aria-hidden`), mucho espacio negativo.

## 6. Agenda cultural

`CulturePreviewSection` — **filas editoriales numeradas** sobre `#181f0d`:

- Kicker `02` + título con énfasis coral.
- 4 filas con **categorías reales** de `data/events.ts` (Clubes de lectura,
  Música en vivo, Conversaciones, Arte y cultura): número, título, descripción
  breve y estado **«Programación próxima»**.
- Hover de **borde oliva → rojo** (no toda la sección roja).
- CTA **Ver agenda** (`/agenda`). Sin fechas, artistas, horarios ni precios.

## 7. Gastronomía y menú

`MenuPreviewSection` — **lista editorial sobre marfil** con `.menu-row` /
`.menu-fill` (GOAL 17):

- Kicker `03` + título con énfasis rojo.
- 4 líneas reales de `data/menu.ts` (Café, Cocina, Coctelería, Postres) con su
  descripción; número `0N` + palabra serif + descripción itálica.
- **Hover-fill rojo** (`scaleY`) que tiñe la fila; la información es **siempre
  visible** (el hover solo añade el relleno decorativo → no es la única vía).
- Sin precios ni platos inventados. Nota «La carta con precios se comparte en la
  mesa.». CTA **Ver menú** (`/menu`).

## 8. Librería La Maga

`LibraryPreviewSection` — **bloque memorable** sobre `#181f0d`, composición
asimétrica 5/7:

- **Media frame rotado** (`-1.2°`, `HomeMediaFrame`) con badge rojo «La Maga».
- **«M» tipográfica gigante** decorativa (`aria-hidden`, no es un logo).
- Título serif con énfasis coral; texto de curaduría.
- **Categorías reales** de `data/library.ts` (Curaduría literaria, Club de
  lectura, Estantería comunitaria) como lista con guion rojo.
- CTA **Conocer Librería La Maga** (`/libreria`). Sin inventario, autores,
  precios ni stock.

## 9. Espacios y reservas

`SpacesPreviewSection` — **dos grandes bloques** para las sedes:

- Kicker `05` + título con énfasis coral.
- Bloques **Pance** y **Juanambú** (`data/spaces.ts` → `spacesConfig.sedes`),
  cada uno con `HomeMediaFrame` (`3/2`), numeración `05.1` / `05.2` y caption.
- Fila de tipos reales (`spacesPreview`): Encuentros privados · Celebraciones ·
  Reuniones · Actividades culturales.
- CTAs **Ver espacios** (`/espacios`) y **Reservar** (`/reservas`). Nota
  «Aforos y tarifas, pendientes de confirmar.». Sin direcciones, aforos ni
  tarifas inventadas. **Sin filmstrip con drag** (por decisión del GOAL).

## 10. CTA final

`ReservationCTASection` — **cierre sobre rojo `#C1121F`**:

- **Grain** (`.grain-soft`) + **wordmark tenue estático** «Café Valparaíso»
  (`aria-hidden`, sin marquee continuo, para no animar fuera de viewport).
- Eyebrow «Planea tu visita» + título serif itálico «Conversemos sobre tu
  próxima reserva.» + copy breve.
- **Dos CTAs**: Reservar (`/reservas`) y Contacto (`/contacto`). Mucho aire, sin
  datos de contacto inventados.

## 11. Media frames

`HomeMediaFrame.tsx` (**nuevo, Server Component**):

- Props: `src`, `alt`, `label`, `index`, `aspectRatio` (por defecto `4/5`).
- Con `src` → `next/image` (`fill`, `object-cover`, `sizes`).
- Sin `src` → **fallback editorial sobrio**: superficie oliva `#343E1C`, grano
  (`.grain-soft`), número de sección, label y nota discreta **«Imagen
  pendiente»**. Sin gradientes genéricos, sin URLs externas, sin `<image-slot>`,
  sin iconos de imagen rota.
- **Proporción reservada** vía `aspect-ratio` → sin layout shift.
- Usado en Librería (1×, `4/5`, rotado) y Espacios (2×, `3/2`, Pance/Juanambú).

## 12. Responsive

Auditado en **360×740, 390×844, 768×1024, 1280×900, 1440×1000**:

- **0 overflow horizontal** en los 5 viewports.
- Móvil: una columna, tipografía con `clamp()` sin cortes, media frames con
  proporción estable, hero sin atrapar scroll, menú usable sin hover.
- Tablet (768): navbar con scroll horizontal usable, composición aún en una
  columna donde corresponde (grids `md:` no se activan demasiado pronto).
- Desktop: composición **asimétrica** (Librería 5/7), grids distintos por
  sección (2 col Agenda, lista Menú, 2 bloques Espacios), anchos de lectura
  controlados (`max-w-2xl/3xl`).

## 13. Accesibilidad

- **Un solo `<main>`** (en `PublicShell`) y **un solo `<h1>`** (hero:
  «Café Valparaíso»); el resto son `<h2>`/`<h3>` — jerarquía semántica, no por
  tamaño.
- Skip link, `aria-current`, landmarks y foco visible global intactos.
- **Tap targets ≥ 44px** (medido: mínimo 44 en los 5 viewports).
- **Contraste AA**: rojo `#C1121F` solo como texto sobre marfil; sobre fondo
  oscuro el acento es **coral `#FF7F70`**. Copy marfil/oliva-claro sobre
  `#181f0d`; ivory sobre rojo en el CTA.
- **Elementos decorativos** (comilla, «M», wordmark, grain, media, badge) con
  `aria-hidden="true"`.
- **Menú usable con teclado**: la información es texto siempre visible; el único
  interactivo es el CTA (enfocable). El hover-fill es puramente decorativo.
- **Reduced motion**: hero estático; `.menu-fill` sin transición de movimiento.

## 14. Performance

- `/` **sigue prerenderizándose como estática** (`○`) en el build sin env.
- **Solo el hero** aporta JS de cliente; el resto del home es server.
- **Sin listeners globales nuevos**, sin assets externos, sin iframes/YouTube,
  sin fuentes nuevas.
- **0 errores de consola** y **0 mismatch de hidratación** (normal y reduced).
- Media frames con proporción reservada → **sin layout shift**.
- Video mudo; sin imágenes inexistentes (fallback CSS/editorial).
- CTA final con wordmark **estático** (no marquee) → sin animación continua.

## 15. Assets pendientes

No hay fotografías/video reales en `public/` (solo `README.md` y `.svg`). Los
`HomeMediaFrame` muestran el **fallback editorial**. Cuando el negocio los
entregue (ver §12 de `MIGRACION_CLAUDE_DESIGN.md`), basta pasar `src`:

- Hero: `videoSrc` + `posterSrc` (16:9, mudo, liviano).
- Librería La Maga (`4/5`).
- Sedes Pance y Juanambú (`3/2`).

Nunca stock ni imágenes externas.

## 16. Archivos modificados

**Creados**:
- `components/sections/home/HomeMediaFrame.tsx` (Server Component).
- `docs/HOME_CLAUDE_DESIGN.md` (este documento).

**Modificados**:
- `app/page.tsx` (threading de props; sigue Server Component).
- `content/home.ts` (contenido editorial, solo datos reales/seguros).
- `components/sections/home/HeroSection.tsx`.
- `components/sections/home/ScrollExpansionHero.tsx`.
- `components/sections/home/AboutSection.tsx`.
- `components/sections/home/CulturePreviewSection.tsx`.
- `components/sections/home/MenuPreviewSection.tsx`.
- `components/sections/home/LibraryPreviewSection.tsx`.
- `components/sections/home/SpacesPreviewSection.tsx`.
- `components/sections/home/ReservationCTASection.tsx`.
- `app/globals.css` (utilidad `.grain-soft`, estrictamente para hero + CTA).

**No se tocó**: otras rutas, `data/*`, Supabase, auth, middleware, área privada,
`package.json`. No se instalaron dependencias.

## 17. Riesgos

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Sin fotos reales, el home depende de fallbacks editoriales | Alta | Bajo | `HomeMediaFrame` es sobrio y coherente; basta pasar `src` cuando existan |
| El acento rojo cambia a coral sobre fondo oscuro (no es el `#C1121F` puro del prototipo) | Media | Bajo | Decisión de accesibilidad: `#C1121F` falla AA como texto sobre `#181f0d`; coral `#FF7F70` es la variante AA |
| Dos secciones marfil (Qué es, Menú) podrían parecerse | Baja | Bajo | Distinta composición (manifiesto vs. lista menu-row) y separadas por Agenda oscura |
| El hover-fill del menú es solo desktop | Baja | Nulo | La información es texto siempre visible; el fill es decorativo |
| `content/home.ts` acopla texto a `data/*` | Baja | Bajo | Es la capa de composición prevista; tipado estable, sin datos inventados |

## 18. Recomendación para GOAL 19

**GOAL 19 — Agenda y Menú** (páginas completas):

1. **Agenda** (`/agenda`): portada editorial + líneas numeradas de las 4
   categorías reales, reutilizando el patrón de filas del home; empty state
   «Agenda próxima a publicarse» de `data/events.ts`. Sin fechas/artistas.
2. **Menú** (`/menu`): lista `.menu-row`/`.menu-fill` sobre marfil con las
   líneas reales; **cuidar contraste AA** sobre crema (descripciones en
   `#4A5728`, no `#6B7A3C`). Sin precios ni platos inventados.
3. Reutilizar `HomeMediaFrame` si esas páginas necesitan medios.
4. Mantener Server Components; animaciones solo como Client aislado si hiciera
   falta (no debería). Validar 5 viewports, 1 `h1`/`main`, AA e hidratación.
