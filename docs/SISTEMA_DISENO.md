# Sistema de Diseño — Café Valparaíso Web

**GOAL 04 · Sistema de diseño y tokens visuales** · Fecha: 2026-07-04
Referencia: `docs/AUDITORIA.md`, `docs/ARQUITECTURA_MODULAR.md`, `docs/ESTRUCTURA_BASE.md`

Este documento es el **contrato visual**: define cómo debe verse, sentirse y comportarse la marca
antes de construir un solo componente nuevo. Los tokens de `lib/design-tokens.ts` son su
traducción a código. Ninguno de los dos se conecta todavía a la UI — eso es trabajo de GOAL 05/06.

---

## 1. Objetivo del sistema visual

Sin un sistema documentado, cada componente nuevo (GOAL 05 en adelante) tomaría decisiones de
color, tipografía y espaciado por su cuenta, repitiendo el problema que ya diagnosticó GOAL 01:
hex arbitrarios dispersos (63 usos de un mismo tono de texto sin nombre, 52 del rojo de marca sin
variantes documentadas) y ninguna regla escrita sobre qué tono usar en qué contexto.

Este GOAL resuelve eso **antes** de escribir el primer `Button.tsx`: define principios, paleta,
tipografía, espaciado, criterios de componente y reglas de motion como contrato único. Cuando
GOAL 05 construya `components/ui/Button.tsx`, no inventará un rojo nuevo — leerá este documento
y `designTokens.colors.brand.red`.

---

## 2. Diagnóstico visual actual

**Análisis realizado sobre** `app/globals.css`, `app/layout.tsx`, `app/page.tsx` y los componentes
de `app/components/`, con verificación por búsqueda de patrones (no por muestreo).

### Paleta actual (verificada por conteo real de uso)

| Hex | Usos | Rol actual |
|---|---|---|
| `#F5F5F0` | 102 | Texto principal / fondos claros de botones (off-white, "marfil") |
| `#4A5728` | 72 | Bordes y divisores sobre fondo oscuro (oliva medio) |
| `#A6B86B` | 63 | **Texto atenuado accesible** sobre oliva (tinte validado, sin token formal) |
| `#C1121F` | 52 | Rojo de marca (CTAs, ticker, acentos) |
| `#343E1C` | 50 | Fondo principal (oliva oscuro) |
| `#FF7F70` | 17 | **Acento coral accesible para texto** sobre oliva (sin token formal) |
| `#C9A227` | 11 | Eyebrow dorado (sin token formal) |
| `#960E17` | 8 | Rojo oscuro (hover, error) |
| `#D9DCC4` | 4 | Crema secundaria (sin token formal) |
| `#2A331A` | 4-5 | Oliva más profundo (scrollbar, mosaicos) |
| `#6B7A3C`, `#8A9A52` | 2 c/u | **Legado**: tonos pre-corrección de contraste, casi retirados |

### Tipografías actuales
`Playfair Display` (400/700/900, itálica) como display, `DM Sans` (400/500/700/900) como cuerpo,
cargadas vía `next/font/google` en `app/layout.tsx`, expuestas como `.font-playfair`/`.font-sans-app`.
**Es un pareo editorial ya acertado** — serif de carácter + sans neutro legible — no requiere cambio.

### Patrones visuales actuales
Contenedor `max-w-6xl` (dominante, 7 usos) con `px-8` (24 usos, desktop) / `px-4` (11, móvil).
Secciones con `py-28` (dominante) / `py-24` / `py-32`. Radios: `rounded-full` (pills/botones,
18 usos), `rounded-[1.25rem]` (tarjetas, 13), `rounded-[1.5rem]` (paneles grandes, 5). Dos familias
de sombra reales y distintas: **sombra dura editorial** `shadow-[5px_5px_0px_0px_<color>]` (sin
blur, tipo sello de imprenta — usada en CTAs primarios) y **sombra suave de elevación**
`shadow-[0_10px_30px_rgba(0,0,0,0.2)]` (tarjetas). Tracking dominante `0.2em-0.3em` en labels/
botones, `0.35em-0.4em` en eyebrows del hero (el más enfático). Line-height: `leading-relaxed`
(1.625) en cuerpo (dominante, 14 usos), `0.9-0.95` en titulares display, `1.02-1.05` en H2/H3.

### Animaciones actuales
Sistema de motion ya maduro: dos curvas reales dominan — `cubic-bezier(0.16,1,0.3,1)` (entrada, 7
usos: fade-up, reveal, btn-fill) y `cubic-bezier(0.23,1,0.32,1)` (interacción/press, 3 usos).
Duraciones reales: `160ms` (press), `300ms` (hover/underline), `800ms` (reveal). **Bloque único**
`@media (prefers-reduced-motion: reduce)` apaga todo (`.fade-up`, `.reveal`, `.marquee-track`,
`.press`, `.radar-ring`, `.map-pin`, `.menu-item`, `.aurora-blob`, `.media-zoom`) — disciplina
correcta y poco común; **se preserva sin cambios**.

### Fortalezas a conservar
- El pareo tipográfico Playfair + DM Sans.
- La familia cromática oliva/verde + rojo + dorado — ya es "café literario premium cálido" en su
  ADN, coherente con la dirección que pide este GOAL (editorial, cultural, colombiano sin folclor).
- Los tintes de texto accesibles (`#A6B86B`, `#FF7F70`, `#C9A227`) ya fueron corregidos para pasar
  WCAG AA sobre oliva oscuro — no reinventar, solo tokenizar.
- La disciplina de `prefers-reduced-motion` centralizada.
- La "sombra dura editorial" (`5px 5px 0px`) es un rasgo de identidad distintivo, no genérico.
- El componente `MediaSlot` (duotono + scrim) ya resuelve tratamiento de imagen coherente.

### Riesgos detectados
- **Todo el sistema es de un solo modo (oscuro cinematográfico).** No existe ningún neutro cálido
  claro (marfil/papel/tinta) para páginas de lectura larga (menú, agenda, contacto) — estas rutas
  comerciales nuevas (GOAL 10) necesitarán superficies distintas al hero inmersivo.
- Los 5 tintes accesibles (`#A6B86B`, `#FF7F70`, `#C9A227`, `#D9DCC4`, `#2A331A`) se usan como hex
  arbitrario en cientos de clases `text-[#...]`, no como tokens — un cambio de marca hoy exigiría
  buscar y reemplazar en decenas de archivos.
- El rojo de marca (`#C1121F`) es un rojo vivo/vermellón, no un vino/borgoña — funciona bien para
  CTAs puntuales pero sería agresivo si se usara como superficie o texto extenso.
- `PageHero` (documentado en auditoría) emite dos `<h1>` por página — se corrige en GOAL 05, no aquí.

### Qué conviene conservar
Familia cromática, pareo tipográfico, las dos curvas de easing, las dos familias de sombra, la
disciplina de reduced-motion, el patrón de contenedor `max-w-6xl` + `px-8/px-4`.

### Qué conviene evitar
Introducir una paleta ajena sin relación con lo ya construido; añadir una tercera curva de easing
sin razón; usar sombras blandas genéricas de "SaaS" (grises difusos sin tinte); dorado/latón como
color dominante (es acento, no protagonista); cualquier gradiente frío o "glow" tecnológico.

---

## 3. Principios visuales

1. **Editorial antes que decorativo.** Cada elemento visual comunica jerarquía de lectura, no
   decoración gratuita.
2. **Dos superficies, una identidad.** El "Modo Noche" cinematográfico (hero, atmósfera, momentos
   de marca) y el "Modo Papel" editorial claro (menú, agenda, librería, contacto — lectura larga)
   comparten la misma familia cromática y tipográfica; nunca se sienten como dos marcas.
3. **El espacio en blanco es lujo, no vacío.** El aire alrededor de un titular vende más que un
   segundo botón.
4. **Cálido, no ruidoso.** Un acento por composición. Nunca dos colores de marca compitiendo en
   la misma vista.
5. **Cultura con intención comercial.** Cada sección editorial (agenda, librería) conduce a una
   acción clara (reservar, ver más, escribir) sin sentirse un anuncio.
6. **Jerarquía tipográfica fuerte y contenida.** Un salto de escala grande entre titular y cuerpo;
   pocos pesos intermedios.
7. **Sombra con carácter, no con ruido.** Se usa la sombra dura editorial (identidad) o la sombra
   suave de elevación (funcional) — nunca sombras blandas grises "de plantilla".
8. **Mobile-first sin perder elegancia.** El aire y la jerarquía se preservan al reducir el
   viewport; nunca se comprime todo para que "quepa".
9. **El motion tiene una razón.** Toda animación nueva responde a una de estas: entrada de
   contenido, retroalimentación de interacción o dirección de atención — nunca "porque se puede".
10. **Accesibilidad es identidad, no obligación.** Los tintes ya corregidos para WCAG AA son parte
    del sistema, no un parche.
11. **Colombiano por sensibilidad, no por decorado.** Calidez, sobremesa, ritmo — nunca íconos
    folclóricos ni tipografías "tropicales".
12. **Comercial sin agresividad.** Un CTA se distingue por jerarquía tipográfica y espacio, no por
    tamaño desmedido ni color chillón.

---

## 4. Paleta cromática recomendada

**Decisión de dirección de arte:** se **evoluciona**, no se reemplaza, la paleta actual. Se
formalizan como tokens los 5 tintes ya validados (dejan de ser hex sueltos) y se **añade** la
familia de neutros cálidos claros (marfil/papel/tinta) que el sistema actual no tiene y que las
rutas comerciales de lectura larga van a necesitar. Se añade un rojo vino/borgoña como **acento
editorial** distinto del rojo de marca vivo — ambos conviven, cada uno con su rol.

### Base (neutros fundamentales)

| Token | Hex | Uso recomendado | Evitar |
|---|---|---|---|
| `base.ivory` (marfil) | `#F7F1E6` | Fondo principal de "Modo Papel" (menú, agenda, librería, contacto) | No usarlo en Modo Noche; no como texto |
| `base.paper` (beige/papel) | `#EFE4D0` | Superficie elevada sobre marfil (tarjetas, franjas) en Modo Papel | No como fondo de página completa |
| `base.ink` (negro tinta) | `#1C1912` | Texto principal sobre superficies claras | No como fondo; no mezclarlo con oliva en la misma vista |
| `base.forest` (verde bosque) | `#2A331A` *(=actual, formalizado)* | Superficie más profunda en Modo Noche (fondos, overlays oscuros) | No como texto |
| `base.olive` (oliva editorial) | `#343E1C` *(=actual, formalizado)* | Fondo principal de "Modo Noche" (hero, atmósfera) | No en Modo Papel |

### Marca

| Token | Hex | Uso recomendado | Evitar |
|---|---|---|---|
| `brand.red` | `#C1121F` *(=actual)* | CTAs primarios, ticker, acentos puntuales de marca | No como superficie grande ni como color de texto extenso |
| `brand.redDark` | `#960E17` *(=actual)* | Estado hover/pressed del rojo de marca; bordes de error | — |
| `brand.wine` (rojo vino/borgoña) | `#7A2230` *(nuevo)* | Acento editorial en Modo Papel: texto enfático corto, divisores, badges — donde el rojo vivo sería agresivo | No como CTA principal (ese rol es de `brand.red`); no en Modo Noche (compite con `brand.red`) |
| `brand.gold` (dorado viejo/latón) | `#C9A227` *(=actual, formalizado)* | Acento sobrio: eyebrows, micro-detalles, nunca superficies | No como color dominante ni de fondo |

### Acentos

| Token | Hex | Uso recomendado | Evitar |
|---|---|---|---|
| `accent.coral` | `#FF7F70` *(=actual)* | Texto de énfasis sobre Modo Noche (ya validado WCAG AA); foco visible global | No sobre Modo Papel (ahí usar `brand.wine`) |
| `accent.oliveMuted` | `#A6B86B` *(=actual)* | Texto secundario/atenuado sobre Modo Noche (ya validado) | No sobre Modo Papel |

### Superficies

| Token | Hex/valor | Uso recomendado |
|---|---|---|
| `surface.night` | `base.olive` `#343E1C` | Fondo de sección en Modo Noche |
| `surface.nightDeep` | `base.forest` `#2A331A` | Elevación/profundidad dentro de Modo Noche |
| `surface.paper` | `base.ivory` `#F7F1E6` | Fondo de sección en Modo Papel |
| `surface.paperRaised` | `base.paper` `#EFE4D0` | Tarjetas/elevación dentro de Modo Papel |
| `surface.brandSolid` | `brand.red` `#C1121F` | Bloques sólidos de marca (franja de ticker, badge destacado) |

### Texto

| Token | Hex | Contexto | Contraste |
|---|---|---|---|
| `text.onNight.primary` | `#F5F5F0` | Texto principal sobre Modo Noche | Validado |
| `text.onNight.muted` | `#A6B86B` | Texto secundario sobre Modo Noche | Validado WCAG AA (~5.2:1) |
| `text.onNight.accent` | `#FF7F70` | Énfasis sobre Modo Noche | Validado WCAG AA (~4.6:1) |
| `text.onNight.eyebrow` | `#C9A227` | Eyebrows/labels sobre Modo Noche | Usar solo en tamaño ≥11px por tracking amplio |
| `text.onNight.soft` | `#D9DCC4` | Variante crema secundaria (citas, subtítulos) | — |
| `text.onPaper.primary` | `#1C1912` | Texto principal sobre Modo Papel | Alto contraste por diseño |
| `text.onPaper.secondary` | `#6B6355` *(nuevo, gris cálido)* | Texto secundario/cuerpo largo sobre Modo Papel | A validar en implementación (objetivo AA) |
| `text.onPaper.muted` | `#8C8373` *(nuevo, gris cálido claro)* | Captions/metadata sobre Modo Papel | Solo texto no esencial |

### Bordes

| Token | Valor | Uso |
|---|---|---|
| `border.night` | `#4A5728` *(=actual, 72 usos formalizados)* | Divisores/bordes en Modo Noche |
| `border.nightSubtle` | `rgba(245,245,240,0.12)` | Bordes sutiles sobre superficies oscuras (glass nav) |
| `border.paper` | `rgba(28,25,18,0.12)` *(nuevo)* | Divisores/bordes en Modo Papel |
| `border.paperStrong` | `rgba(28,25,18,0.28)` *(nuevo)* | Bordes con más presencia en Modo Papel (inputs, tarjetas destacadas) |

### Estados

| Token | Hex | Uso |
|---|---|---|
| `state.focus` | `#FF7F70` *(=actual, ya es la regla global `:focus-visible`)* | Anillo de foco en toda la web, ambos modos |
| `state.success` | `#5B7A4F` *(nuevo)* | Confirmaciones (ej. "reserva enviada") — distinto del oliva de marca para no confundir rol |
| `state.danger` | `#960E17` *(=actual)* | Errores de formulario (ya usado en login/registro) |
| `state.dangerSurface` | `rgba(193,18,31,0.10)` *(=actual, ya usado en cajas de error)* | Fondo de mensajes de error |

### Overlays

| Token | Valor | Uso |
|---|---|---|
| `overlay.vignette` | `rgba(18,24,8,0.6)` *(=actual)* | Viñeta cinematográfica en heroes de Modo Noche |
| `overlay.scrimNight` | `rgba(42,51,26,0.72)` *(=actual)* | Scrim sobre media (fotos/video) sección Modo Noche |
| `overlay.scrimPaper` | `rgba(28,25,18,0.55)` *(nuevo)* | Scrim sobre media en Modo Papel (para legibilidad de texto sobre foto) |
| `overlay.grain` | `opacity 0.05` *(=actual)* | Grano fijo de textura sobre toda la página |

---

## 5. Tipografía

**Se parte de las fuentes ya instaladas — no se agrega ninguna.** `Playfair Display` (display,
serif con carácter editorial) + `DM Sans` (cuerpo, sans neutro y legible), ambas vía `next/font/google`
en `app/layout.tsx`, expuestas como `--font-playfair` / `--font-dm-sans`.

| Nivel | Fuente | Tamaño (real, grounded) | Peso | Tracking | Line-height |
|---|---|---|---|---|---|
| Display (momentos hero/CTA) | Playfair Display, black | `clamp(4rem, 12vw, 10rem)` | 900 | tight (`-0.03em`) | `0.9` |
| H1 | Playfair Display, black | `clamp(2.75rem, 7.5vw, 6.5rem)` | 900 | tight (`-0.03em`) | `0.92` |
| H2 | Playfair Display, bold | `2.25rem` (crece con clamp en heroes internos) | 700 | normal | `1.05` |
| H3 | Playfair Display, bold | `1.5rem` | 700 | normal | `1.1` |
| Párrafo / lead | DM Sans o Playfair itálica (citas) | `1.125rem` | 400 | normal | `1.6` |
| Párrafo / body | DM Sans | `1rem` | 400 | normal | `1.625` (leading-relaxed) |
| Caption | DM Sans | `0.875rem` | 500 | wide (`0.05em`) | `1.4` |
| Eyebrow/label | DM Sans | `0.6875rem` (11px, real) | 700 | wider (`0.35em`) | `1` |
| Botón | DM Sans | `0.6875rem–0.75rem` | 700-900 | wide (`0.2em`–`0.3em`) | `1` |

**Uso por nivel:**
- **H1**: un titular por vista, máximo 2 líneas. Reservado para el momento de mayor peso de la página.
- **H2**: títulos de sección, siempre acompañados de eyebrow opcional (máx. 1 cada 3 secciones, regla ya vigente en la landing).
- **H3**: subtítulos internos de sección (tarjetas, categorías).
- **Párrafos**: máximo ~65 caracteres de ancho de línea para lectura cómoda.
- **Captions**: metadatos, fechas, precios secundarios.
- **Botones**: siempre mayúscula + tracking amplio, nunca oración completa larga.

**Riesgos de legibilidad:**
- El itálico de Playfair con descendentes (`g j p q y`) requiere `line-height ≥ 1.1` + reserva
  inferior (`pb-1`) — regla ya aplicada en el hero actual, debe mantenerse en todo texto itálico nuevo.
- Eyebrows a `11px` con tracking `0.35em` son ilegibles si el peso baja de 700 — nunca usar
  eyebrow en peso regular.
- En Modo Papel, `text.onPaper.secondary` sobre `base.paper` (no sobre `base.ivory`) debe
  verificarse en implementación — es la combinación de menor contraste del sistema.

---

## 6. Espaciado y layout

| Token | Valor | Grounded en |
|---|---|---|
| `layout.maxWidth.content` | `72rem` (`max-w-6xl`) | Contenedor dominante real (7 usos) |
| `layout.maxWidth.wide` | `80rem` (`max-w-7xl`) | Hero ancho real (1 uso, único caso que lo necesita) |
| `layout.maxWidth.text` | `42rem` (`max-w-2xl`) | Columnas de lectura larga (4 usos reales) |
| `layout.maxWidth.narrow` | `36rem` (`max-w-sm`) | Formularios/columnas angostas (3 usos reales) |
| `spacing.container.x` (móvil) | `1rem` (`px-4`) | Real, 11 usos |
| `spacing.container.xDesktop` | `2rem` (`px-8`) | Real, dominante, 24 usos |
| `spacing.section.mobile` | `4rem` | Estimado a partir del ritmo real (`py-24`≈mínimo real) |
| `spacing.section.desktop` | `7rem` (`py-28`) | Real, dominante, 6 usos |

**Reglas de grid:** CSS Grid para estructuras multi-columna (ya en uso: menú 3 columnas, stats 4
columnas); Flexbox para agrupaciones lineales (nav, filas de tarjetas). Sin flexbox con matemática
de porcentajes.

**Breakpoints:** los estándar de Tailwind (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`) — no
se define escala propia, ya es suficiente y está en uso.

**Ritmo vertical:** una sección = un `py-*` consistente dentro de su nivel (`desktop` o `mobile`);
nunca mezclar `py-24` y `py-32` como vecinos directos sin razón de jerarquía.

**Aire en móvil:** el contenedor reduce su padding horizontal (`px-8`→`px-4`) pero el `py-*` de
sección se reduce proporcionalmente, no se elimina — el aire vertical es lo último que se recorta.

---

## 7. Componentes UI base (criterios visuales — NO implementar en este GOAL)

| Componente | Criterio visual |
|---|---|
| **Button** | Variantes: `primary` (superficie `brand.red` o `base.ivory` según modo, sombra dura editorial `5px 5px 0px`), `outline` (borde 2px, pill), `ghost` (subrayado deslizante, sin fondo). Máximo 3 variantes. Siempre `.press` (feedback táctil) |
| **LinkButton** | Mismo criterio que Button pero como texto/link; subrayado deslizante en vez de relleno |
| **Card** | Sin borde+sombra+fondo blanco genérico. En Modo Noche: superficie `.tile` (mosaico) o `brand.red` sólido si es destacada. En Modo Papel: `surface.paperRaised` + borde sutil `border.paper`, sin sombra o con `shadows.soft` |
| **Badge** | Texto pequeño + tracking amplio, sin fondo pastel; usar `brand.gold` o `brand.wine` como acento de borde/texto, nunca relleno saturado |
| **SectionHeader** | Eyebrow opcional (regla: máx. 1 cada 3 secciones) + H2 + línea doble de acento (roja + oliva/muted, patrón ya usado) |
| **Container** | Envoltorio de `layout.maxWidth.content` + `spacing.container.x/xDesktop`, mx-auto |
| **Input** | Modo Noche: fondo `border.night`/20, borde `border.night`, focus `state.focus`. Modo Papel: fondo `base.paper`, borde `border.paper`, focus `state.focus`. Label flotante (patrón `.input-group` ya existe) |
| **Textarea** | Mismo criterio que Input, altura mínima 3 líneas |
| **EventCard** | Imagen (MediaSlot) + fecha en caption + título H3 + CTA "Ver más"; fecha con `font-variant-numeric: tabular-nums` |
| **MenuItemCard** | Patrón ya probado en `.menu-item`: nombre + descripción + precio alineado a la derecha, hover con translateX + color de precio |
| **SpaceCard** | Imagen dominante (MediaSlot) + nombre de sede + dirección corta; overlay scrim para legibilidad |
| **BookCategoryCard** | Tipográfico ante todo (nombre de categoría en Playfair), imagen opcional secundaria |

---

## 8. Estados interactivos

| Estado | Regla |
|---|---|
| **Hover** | Solo `transform`/`opacity`/`color` — nunca `width`/`height`. Gatear detrás de `@media (hover: hover) and (pointer: fine)` cuando el efecto es decorativo (evita "hover pegado" en táctil) |
| **Focus visible** | Regla global ya vigente: `outline: 2px solid state.focus; outline-offset: 3px` — se mantiene para todo componente nuevo |
| **Active** | Patrón `.press` ya vigente: `transform: scale(0.97)`, transición `160ms` |
| **Disabled** | Opacidad reducida (`~0.5-0.6`) + `cursor-not-allowed`; nunca solo un cambio de tono difícil de percibir |
| **Transiciones** | Duración por rol (ver §9); propiedad explícita, nunca `transition: all` |
| **Reduced motion** | Todo estado animado nuevo se añade al bloque único `@media (prefers-reduced-motion: reduce)` existente en `globals.css` — no se crean bloques nuevos |

---

## 9. Motion y animaciones

**Grounded en el sistema real, no en valores nuevos:**

| Rol | Duración | Curva |
|---|---|---|
| `fast` (press, feedback inmediato) | `160ms` | `standard` |
| `base` (hover, underline, transiciones de color) | `300ms` | `standard` |
| `slow` (reveal de contenido, entrada de sección) | `800ms` | `entrance` |

- `easing.entrance` = `cubic-bezier(0.16, 1, 0.3, 1)` — entradas (fade-up, reveal, aparición de página).
- `easing.standard` = `cubic-bezier(0.23, 1, 0.32, 1)` — interacción (press, hover, transiciones de estado).

**Qué conservar:** el patrón de aparición por scroll con blur+translateY (`.reveal`), el
stagger de listas, el patrón `.press` en todo elemento interactivo, el apagado centralizado por
`prefers-reduced-motion`.

**Qué evitar:** una tercera curva de easing sin justificación; animaciones infinitas decorativas
fuera de las ya establecidas (aurora, radar, marquee — que ya tienen su rol y su apagado);
animar `top/left/width/height` (rompe rendimiento); parallax/scroll-hijack nuevo sin necesidad
narrativa clara.

**Accesibilidad de motion:** ningún componente nuevo puede introducir movimiento que no tenga
equivalente apagado en el bloque `prefers-reduced-motion` ya existente en `globals.css`.

---

## 10. Imágenes y dirección de arte

- **Fotografía editorial**, nunca stock genérico de "restaurante feliz". Composición con espacio
  negativo, luz cálida natural, nunca flash frontal plano.
- **Tratamiento**: todo medio pasa por el patrón ya construido en `.media-frame` (duotono sutil:
  `grayscale(0.35) contrast(1.05) brightness(0.78)` + `.media-scrim` para legibilidad de texto
  superpuesto) — se mantiene como estándar único, no se crean tratamientos alternativos sueltos.
- **Recortes**: horizontal para atmósfera/sedes, cuadrado o vertical moderado para libros/platos —
  nunca recortes forzados que corten rostros o platos a la mitad.
- **Overlays**: usar los tokens de `overlay.*` (scrim, viñeta) — nunca un overlay negro plano sin
  tinte de marca.
- **Qué evitar con imágenes generadas por IA**: composición perfectamente simétrica y "brillo
  artificial" evidente, manos/texto deformado, iluminación de estudio genérica sin relación con el
  espacio real, cualquier imagen que no pueda pasar por una fotografía editada por un fotógrafo real.
- **Gastronomía**: luz lateral cálida, plano cercano con profundidad de campo, la mesa/madera del
  café visible en el encuadre — nunca fondo blanco de catálogo.
- **Agenda cultural**: gente real en el espacio, movimiento sutil (desenfoque de manos, lectura en
  curso), nunca poses de stock mirando a cámara.
- **Espacios/sedes**: luz natural de ventana, profundidad (primer plano + fondo), nunca gran angular
  distorsionado tipo inmobiliaria.

---

## 11. Voz visual comercial

El sistema vende por **jerarquía y espacio**, no por insistencia:

- **Reservas**: un único CTA por vista con esa intención (regla "no duplicar intención de CTA" ya
  aplicada en la landing); botón `primary`, nunca más de uno "compitiendo" en la misma composición.
- **Agenda**: cada evento se presenta como contenido editorial (fecha en caption, no en badge
  gritón) que conduce naturalmente a "reservar tu lugar" al final, no en cada tarjeta.
- **Menú**: precios en `tabular-nums`, alineados, sin signos de urgencia ("¡solo hoy!"); el patrón
  `.menu-item` ya logra esto.
- **Librería La Maga**: se presenta como cultura, no como tienda — tipografía protagonista sobre
  imagen de producto.
- **Eventos**: la fecha y el lugar son datos, no gritos; el CTA es siempre el mismo verbo
  ("Reservar tu lugar"/"Ver más") para no fragmentar la intención de conversión.
- **Sedes**: fotografía + dirección concreta, sin superlativos ("el mejor café de..."); la calidad
  visual argumenta por sí sola.
- **WhatsApp**: se trata como un canal más, con el mismo criterio tipográfico y de color que
  cualquier otro CTA — nunca un botón flotante verde brillante desconectado del sistema.

---

## 12. Accesibilidad

- **Contraste**: mínimo WCAG AA (4.5:1 texto normal, 3:1 texto grande ≥24px o ≥18.66px bold). Los
  5 tintes de Modo Noche ya están validados; los 2 nuevos grises cálidos de Modo Papel
  (`text.onPaper.secondary/muted`) deben verificarse en el momento de implementación antes de
  usarse en cuerpo de texto extenso.
- **Foco**: la regla global `:focus-visible` (`state.focus`, `#FF7F70`, offset 3px) se mantiene
  para todo componente nuevo; ningún componente elimina el outline sin sustituto visible.
- **Tamaños mínimos**: objetivos táctiles ≥44×44px; eyebrows/labels nunca por debajo de `0.6875rem`
  (11px) y siempre en peso 700+.
- **Legibilidad móvil**: ancho de línea de párrafo ≤65 caracteres; nunca reducir tracking de
  eyebrows para "que quepan" — se reduce el texto o se envuelve.
- **Estados de botones**: hover, focus, active y disabled visualmente distintos entre sí (no solo
  un cambio de opacidad de 2%).
- **Jerarquía semántica**: **un solo `<h1>` por página.** Se detectó que `PageHero` (componente
  existente) emite dos `<h1>` — al refactorizarlo en GOAL 05, el titular compuesto ("Hola, Mariana")
  debe ser **un** `<h1>` con un `<span>` interno para el énfasis de color, no dos etiquetas `<h1>`
  consecutivas. Esta corrección se ejecuta en GOAL 05, no en este documento.

---

## 13. Tokens TypeScript

`lib/design-tokens.ts` traduce este documento a un objeto `designTokens` con 8 grupos:
`colors`, `typography`, `spacing`, `radius`, `shadows`, `borders`, `motion`, `layout`.

- Es **solo datos**: ningún componente lo importa todavía (eso ocurre recién en GOAL 05, cuando
  `components/ui/Button.tsx` lea `designTokens.colors.brand.red` en vez de escribir el hex).
- No sustituye ni modifica `app/globals.css` — ambos coexistirán: `globals.css` seguirá sirviendo
  las clases de utilidad y animaciones (`.press`, `.reveal`, `.aurora`, etc.); `design-tokens.ts`
  será la fuente de verdad que futuros componentes TSX consulten para valores de diseño en TypeScript
  (por ejemplo, props tipadas de un componente, o lógica condicional de estilo).
- Los valores están alineados 1:1 con las tablas de la sección 4-9 de este documento — cualquier
  cambio de paleta/tipografía/motion se hace aquí primero, nunca directamente en un componente.
- Es de solo lectura (`as const`): no contiene lógica, no se muta en runtime.

---

## 14. Qué NO se aplicó todavía

- No se modificó `app/globals.css`.
- No se modificó la landing (`app/page.tsx` sigue exactamente igual).
- No se modificó ningún componente existente (`app/components/*`).
- No se modificó configuración de Tailwind/PostCSS.
- No se modificaron rutas.
- No se conectaron los tokens de `lib/design-tokens.ts` a ningún componente ni página.
- No se tocó Supabase, middleware ni autenticación.
- No se instaló ningún paquete.

---

## 15. Checklist para GOAL 05 — Componentes UI reutilizables

Orden recomendado (de menor a mayor riesgo/dependencia):

1. **`Container`** — el más simple, sin estado ni variantes; base de todo lo demás.
2. **`SectionHeader`** — depende solo de tipografía/espaciado; usarlo fuerza a resolver ya la
   regla "eyebrow máx. 1 cada 3 secciones" y el criterio H2.
3. **`Button` + `LinkButton`** — consumen `designTokens.colors.brand/accent` y `motion`; validar
   aquí que las dos curvas de easing y las duraciones migran limpio desde CSS a props/clases.
4. **`Badge`** — pequeño, bajo riesgo, valida el uso de `brand.gold`/`brand.wine` como acento.
5. **`Card`** (con sus dos variantes de superficie: Noche/Papel) — el primero que ejercita el
   concepto de "dos superficies, una identidad".
6. **`Input` + `Textarea`** — reutilizan el patrón `.input-group` ya existente; validar que no
   rompen los formularios de auth (no se tocan todavía, solo se define el componente para uso futuro).
7. **`EventCard`, `MenuItemCard`, `SpaceCard`, `BookCategoryCard`** — al final, porque dependen de
   `Card` + `Container` + tipografía ya resueltos, y de contenido de dominio que aún no existe
   (`data/`, GOAL 08) — se construyen con datos de ejemplo hasta entonces.
8. En paralelo: **corregir el doble `<h1>` de `PageHero`** al migrarlo a `components/ui/` (parte
   natural de GOAL 05, no de GOAL 04).

---

## 16. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Que "Modo Papel" (nuevo, sin implementar) resulte poco armónico con "Modo Noche" al construirse en GOAL 05/06 | Media | Medio | Ambos comparten exactamente la misma familia cromática (oliva/rojo/dorado) y tipografía; validar con capturas comparadas al construir el primer componente en Modo Papel |
| Que los 2 grises cálidos nuevos (`text.onPaper.*`) no pasen WCAG AA en la implementación real | Media | Medio | Verificar contraste con herramienta antes de usarlos en cuerpo de texto extenso (anotado explícitamente en §12) |
| Que `design-tokens.ts` diverja de `globals.css` con el tiempo (dos fuentes de verdad) | Media | Medio | Regla explícita en §13: cualquier cambio de valor se hace primero en el token, y de ahí se propaga; se revisita en GOAL 06 |
| Sobre-fragmentar componentes UI antes de tener contenido real de `data/` | Baja | Bajo | Orden del checklist §15 deja las cards de dominio al final, con datos de ejemplo mientras tanto |
| Que el rojo "vino/borgoña" nuevo se use por error donde corresponde el rojo de marca vivo | Baja | Bajo | Rol documentado explícitamente en §4 (tabla Marca): `brand.wine` no es CTA, `brand.red` sí |

---

## 17. Recomendación final

**El proyecto está listo para pasar a GOAL 05**, bajo estas condiciones:

1. Tratar este documento y `lib/design-tokens.ts` como la única fuente de verdad de valores de
   diseño desde ahora — ningún componente nuevo introduce un hex, tracking o duración que no esté
   aquí.
2. Construir los componentes de GOAL 05 en el orden del checklist §15, validando en cada uno que
   consumen `designTokens` en vez de repetir valores.
3. Resolver el doble `<h1>` de `PageHero` como parte de su migración en GOAL 05.
4. Verificar contraste real de los dos grises cálidos nuevos antes de usarlos en cuerpo de texto
   de Modo Papel.

No se detectó ningún bloqueante técnico: el sistema actual es una base sólida y coherente: este
GOAL lo formaliza y lo extiende, no lo reemplaza.
