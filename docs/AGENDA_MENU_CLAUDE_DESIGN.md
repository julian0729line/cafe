# Agenda y Menú — Claude Design

GOAL 19. Reconstruye `/agenda` y `/menu` para alcanzar el nivel editorial del
Home reconstruido en GOAL 18, reutilizando el sistema visual de GOAL 17
(`#181f0d`, oliva, rojo, marfil, radios pequeños, grano) y las utilidades CSS
ya preparadas en GOAL 17 (`.menu-row`/`.menu-fill`, `.grain-soft`). No toca
Reservas, Librería, Espacios, Contacto, auth ni área privada.

## 1. Objetivo del GOAL 19

Sustituir el patrón anterior de ambas páginas — `SectionHeader` + grilla de
`EventCard`/`MenuItemCard` (cards SaaS repetitivas) — por una arquitectura de
Hero editorial + filas de programación/categorías + cierre, coherente con el
lenguaje ya establecido en el Home, sin inventar eventos, fechas, artistas,
platos ni precios, y sin salir de Server Components.

## 2. Referencias utilizadas

El directorio `design_handoff_cafe/` (prototipo Claude Design en HTML/JSX) no
existe en este entorno de ejecución — no fue posible releerlo literalmente en
esta sesión. En su lugar se usó como referencia visual **equivalente y ya
validada**: los componentes del Home construidos en GOAL 18
(`CulturePreviewSection.tsx`, `MenuPreviewSection.tsx`), que ya implementan el
mismo sistema "Claude Design" (fondo `#181f0d`, filas numeradas, `.menu-row`/
`.menu-fill`, tipografía editorial) sobre datos reales. También se revisaron:
`docs/SISTEMA_VISUAL_CLAUDE_DESIGN.md`, `docs/HOME_CLAUDE_DESIGN.md`,
`docs/CARDS_DOMINIO.md`, `docs/RUTAS_PUBLICAS.md`, `app/globals.css`,
`lib/design-tokens.ts`, `data/events.ts`, `data/menu.ts` y las páginas
anteriores de `/agenda` y `/menu`.

## 3. Arquitectura de Agenda

`app/agenda/page.tsx` compone, en orden: `AgendaHero` →
`AgendaStatusSection` (solo si `featuredEvents.length === 0`) →
`AgendaProgramsSection` → `AgendaClosingSection`. Todos Server Components.

### Hero (`AgendaHero`)

Fondo `#181f0d`, `.grain-soft`, eyebrow "Cultura" con número editorial `01`,
`<h1>` único ("Agenda" + `<em>` itálica coral "cultural."), línea roja
decorativa (`h-px w-24 bg-[#C1121F]`) y descripción sobria derivada de las
categorías reales (sin fechas ni sedes por evento). Sin cards, sin imagen
externa, sin media frame (se mantuvo puramente tipográfico para no dar
protagonismo a un "Imagen pendiente" en la portada).

### Estado de programación (`AgendaStatusSection`)

Solo se renderiza cuando `featuredEvents` está vacío (estado real actual).
Bloque con **borde rojo** sobre superficie `#2A331A` (verde bosque, más
profunda que el fondo del hero), etiqueta pequeña, título serif itálico y
texto secundario. El título usa `eventsConfig.emptyStateTitle` (dato real de
`data/events.ts`); el texto secundario usa la frase explícitamente autorizada
en el prompt del GOAL 19 ("Estamos preparando la próxima programación
cultural. Las fechas y los detalles se publicarán próximamente."), distinta
de `eventsConfig.emptyStateMessage` pero igualmente sin fechas inventadas.
Sin botones deshabilitados falsos.

### Líneas culturales (`AgendaProgramsSection`)

Consume `eventCategories` de `data/events.ts` sin modificarlo. Cada fila
(ancho completo, no grilla de tarjetas) muestra número, nombre de categoría,
una glosa editorial breve (definida localmente en `app/agenda/page.tsx`, sin
fechas/artistas/precios) y el estado "Programación próxima". Las filas **no**
son `<a>`/`<button>` (no hay detalle real al que enlazar); el hover es
puramente decorativo (cambio de borde + fondo oliva suave por transición de
color, sin movimiento) y no es necesario para entender el contenido.

### Cierre (`AgendaClosingSection`)

Fondo rojo `#C1121F`, `.grain-soft`, título breve, texto secundario ("Los
canales oficiales están en actualización.") y un único CTA a `/contacto`
(botón variante `dark` para diferenciarse del CTA final del Home). Sin
WhatsApp, teléfono ni correo inventado.

## 4. Arquitectura de Menú

`app/menu/page.tsx` compone, en orden: `MenuHero` → `MenuCategoriesSection` →
`MenuClosingSection`. Todos Server Components.

### Hero (`MenuHero`)

Fondo **marfil** `#F5F5F0` (a propósito, distinto del fondo oscuro de
Agenda), `.grain-soft`, eyebrow "Gastronomía", `<h1>` único ("El" + `<em>`
itálica roja "menú." — acento rojo `#C1121F`, la variante AA-correcta del
acento coral sobre superficies claras, ya usada en `MenuPreviewSection` del
Home), línea roja decorativa y descripción "Café, cocina, coctelería y
postres." (coincide 1:1 con `menuCategories` de `data/menu.ts`) más una
segunda frase sobria reutilizada de la copy ya aprobada de la página anterior
("Nuestras líneas gastronómicas, con identidad propia."). Sin platos ni
fotografías inventadas.

### Categorías (`MenuCategoriesSection`)

Consume `menuCategories` y `menuPreviewItems` de `data/menu.ts` sin
modificarlos (el `page.tsx` cruza ambos arrays localmente con `.map`/`.find`
para obtener la descripción de cada categoría). Filas editoriales con
`.menu-row`/`.menu-fill` (relleno rojo `scaleY` al hover, ya definido en
GOAL 17): número rojo, nombre en verde profundo, descripción existente,
separador. Sin radio grande, sin sombra, sin cards SaaS. Como las categorías
no son enlaces reales, las filas son `<li>` planos, sin `<a>`/`<button>` ni
`tabIndex` artificial; el hover-fill es decorativo y el contenido es legible
sin él.

### Información pendiente

Debajo de las filas, un párrafo sobrio y fijo: "La carta completa y sus
precios se incorporarán cuando la información esté confirmada." — evita
sonar a lanzamiento comercial ("Precios disponibles próximamente") y deja
claro que la página no está rota.

### Cierre (`MenuClosingSection`)

Fondo **verde profundo** `#181f0d` (distinto del rojo de Agenda y del CTA
final del Home), `.grain-soft`, título breve ("Una mesa, una conversación y
algo para compartir.") y un único CTA a `/reservas` (botón variante
`secondary`, rojo sólido). Sin políticas de reserva inventadas.

## 5. Fuentes de datos

- **`data/events.ts`**: `eventCategories` (4 categorías reales: Clubes de
  lectura, Música en vivo, Conversaciones, Arte y cultura), `featuredEvents`
  (vacío a propósito), `eventsConfig.emptyStateTitle` (usado literal).
  **No modificado.**
- **`data/menu.ts`**: `menuCategories` (Café, Cocina, Coctelería, Postres),
  `menuPreviewItems` (título + categoría + descripción por línea). **No
  modificado.**
- **Adaptaciones locales**: `app/agenda/page.tsx` construye `programLines`
  vía `eventCategories.map(...)` + un `Record<EventCategory, string>` local
  de glosas editoriales; `app/menu/page.tsx` construye `categoryLines`
  cruzando `menuCategories` con `menuPreviewItems` vía `.find(...)`. Ninguna
  adaptación usa `any` ni type assertions inseguras.
- **Datos ausentes, no inventados**: fechas, horarios, artistas, autores,
  aforos, precios y platos específicos. Ambas páginas los tratan como
  ausentes (estado editorial, no simulado).

## 6. Componentes creados

| Componente | Responsabilidad | Server/Client | Props principales | Riesgo |
|---|---|---|---|---|
| `AgendaHero` | Portada editorial de Agenda | Server | `eyebrow`, `titleLead`, `titleAccent`, `description`, `index` | Bajo |
| `AgendaStatusSection` | Estado real de la agenda (vacío honesto) | Server | `eyebrow`, `title`, `message` | Bajo |
| `AgendaProgramsSection` | Filas de categorías culturales reales | Server | `index`, `eyebrow`, `title`, `emphasis`, `description`, `lines` | Bajo |
| `AgendaClosingSection` | Cierre editorial + CTA a contacto | Server | `title`, `description`, `cta` | Bajo |
| `MenuHero` | Portada editorial de Menú (marfil) | Server | `eyebrow`, `titleLead`, `titleAccent`, `description`, `note`, `index` | Bajo |
| `MenuCategoriesSection` | Filas de categorías gastronómicas reales | Server | `index`, `eyebrow`, `title`, `emphasis`, `categories`, `pendingNote` | Bajo |
| `MenuClosingSection` | Cierre editorial + CTA a reservas | Server | `title`, `cta` | Bajo |

Ninguno usa `"use client"`, estado local, efectos ni listeners. Las
interacciones hover se resuelven con CSS/Tailwind (`.menu-row`/`.menu-fill`
ya definidas, o `hover:` de Tailwind para transiciones de color puras).

## 7. Diferenciación visual

Agenda y Menú comparten navbar, footer, tipografía (Playfair + DM Sans),
labels editoriales (número + eyebrow uppercase), espaciado (`Container`,
`py-20 md:py-28/32`) y el mismo lenguaje de CTA (`LinkButton`), pero no se
ven iguales:

| | Agenda | Menú |
|---|---|---|
| Hero | Fondo `#181f0d` (nocturno) | Fondo `#F5F5F0` (marfil, luminoso) |
| Cuerpo | Filas de ancho completo, borde por fila | `.menu-row`/`.menu-fill`, relleno rojo al hover |
| Acento | Coral `#FF7F70` (AA sobre noche) | Rojo `#C1121F` (AA sobre papel) |
| Hover | Cambio de borde + fondo oliva suave | Relleno rojo `scaleY` (gesto principal) |
| Cierre | Bloque rojo `#C1121F` + botón oscuro | Bloque verde profundo `#181f0d` + botón rojo |
| Sensación | Cultural, de programación, basada en ritmo/bordes | Gastronómica, táctil, basada en papel/contraste |

No se repite la misma cuadrícula ni el mismo hero con solo texto cambiado:
Agenda usa filas de ancho completo sin fondo alterno; Menú usa el patrón
`.menu-row` con relleno de color como gesto de interacción principal.

## 8. Responsive

Auditado con Playwright (Chromium) en 360×740, 390×844, 768×1024, 1280×900 y
1440×1000 sobre `/agenda` y `/menu`: **0 overflow horizontal** en las 10
combinaciones, una columna en móvil, títulos sin cortes, tap targets mínimos
de 44px (nav, CTAs), descripciones siempre visibles (no dependen del hover).
En tablet, la navbar no desborda y los títulos usan `clamp()` para no crecer
en exceso. En desktop, columnas de lectura controladas (`max-w-2xl`/`max-w-4xl`
según el bloque) y espacio negativo generoso.

## 9. Accesibilidad

- Exactamente **1 `<h1>`** y **1 `<main>`** por ruta (verificado en 10
  combinaciones ruta×viewport).
- Skip link (`#contenido-principal`) visible en el primer `Tab` en ambas
  rutas.
- `aria-current="page"` correcto: "Agenda" en `/agenda`, "Menú" en `/menu`.
- Contraste AA: coral `#FF7F70`/marfil `#F5F5F0`/oliva-muted `#A6B86B` sobre
  `#181f0d` (Agenda); rojo `#C1121F`/verde `#181f0d`/`#4A5728` sobre `#F5F5F0`
  (Menú) — combinaciones ya validadas en el Home (GOAL 18).
- Elementos decorativos (`.grain-soft`, línea roja, `.menu-fill`) marcados
  `aria-hidden="true"`.
- Ninguna fila no interactiva se convirtió en `<a>`/`<button>` ni recibió
  `tabIndex` artificial solo para tener hover.
- `prefers-reduced-motion`: confirmado 0 errores de hidratación y 1 `<h1>`
  en ambas rutas bajo `reducedMotion: 'reduce'`; las transiciones nuevas son
  solo de color (no de movimiento), coherentes con el resto del sistema.
- Orden semántico `h1 → h2 → h3` respetado en ambas páginas.

## 10. Performance

- `/agenda` y `/menu` siguen **estáticas** (`○`) en `npm run build` sin
  variables de entorno.
- 0 Client Components nuevos, 0 listeners, 0 recursos externos, 0 imágenes
  (ni rotas ni externas — ninguna de las dos páginas usa `<Image>` ni
  `HomeMediaFrame`, por decisión de mantener el hero puramente tipográfico).
- 0 dependencias nuevas; `package.json` sin cambios.
- 0 errores de hidratación en modo normal y en `reducedMotion: 'reduce'`.

## 11. Archivos modificados

- `app/agenda/page.tsx` (reescrito)
- `app/menu/page.tsx` (reescrito)

Creados:

- `components/sections/agenda/AgendaHero.tsx`
- `components/sections/agenda/AgendaStatusSection.tsx`
- `components/sections/agenda/AgendaProgramsSection.tsx`
- `components/sections/agenda/AgendaClosingSection.tsx`
- `components/sections/menu/MenuHero.tsx`
- `components/sections/menu/MenuCategoriesSection.tsx`
- `components/sections/menu/MenuClosingSection.tsx`
- `docs/AGENDA_MENU_CLAUDE_DESIGN.md`

Eliminados: `components/sections/agenda/.gitkeep`,
`components/sections/menu/.gitkeep` (ya no necesarios).

`app/globals.css` **no se modificó**: `.menu-row`, `.menu-fill` y
`.grain-soft` (creadas en GOAL 17/18) ya cubrían todas las necesidades
visuales de este GOAL.

## 12. Datos pendientes

- Fechas, artistas y detalle real de eventos culturales (`featuredEvents`).
- Carta detallada con precios y platos específicos (`data/menu.ts` solo
  tiene líneas/categorías, no ítems con precio).
- Fotografía real para ambos heroes (se optó por mantenerlos tipográficos,
  sin `HomeMediaFrame`, evitando cualquier "Imagen pendiente" protagonista).

## 13. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `design_handoff_cafe/` no disponible en este entorno | Alto (confirmado) | Bajo | Se usó como referencia equivalente el Home GOAL 18 (mismo sistema, ya validado) y la especificación textual del propio GOAL 19 |
| Texto de `AgendaStatusSection.message` no proviene literalmente de `data/events.ts` | Medio | Bajo | Es la frase explícitamente autorizada por el prompt del GOAL 19 ("texto secundario permitido"); no inventa fechas ni datos de negocio |
| Páginas anteriores usaban `EventCard`/`MenuItemCard` | Bajo | Ninguno | Esas cards de dominio no se eliminaron ni modificaron; simplemente dejaron de usarse en estas dos rutas (siguen disponibles para uso futuro) |

## 14. Recomendación para GOAL 20 — Librería La Maga

Aplicar el mismo método: Hero editorial propio (tercera identidad visual,
distinta de la nocturna de Agenda y la marfil de Menú — quizá un tono
intermedio, oliva/papel, dado que `data/library.ts` mezcla categorías y
curaduría), filas o bloques para `libraryCategories` reutilizando el
lenguaje de `.menu-row`/`.editorial-fill` donde aplique, y un cierre editorial
con CTA a `/reservas` o `/contacto` según corresponda. Mantener la misma
disciplina de datos: solo `data/library.ts`, sin inventar autores, libros ni
precios; usar `HomeMediaFrame` únicamente si aporta composición y no da
protagonismo a "Imagen pendiente".
