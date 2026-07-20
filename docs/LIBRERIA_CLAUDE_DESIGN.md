# Librería La Maga — Claude Design

GOAL 20. Reconstrucción editorial de `/libreria` al nivel visual de Home,
Agenda y Menú (sistema "Claude Design" de los GOALs 17-19), como una de las
páginas más memorables de Café Valparaíso: literaria, íntima y contemporánea.

## 1. Objetivo

Transformar `/libreria` de una página de cards genéricas (grid 3 columnas +
nota + dos CTA) a una secuencia editorial de cinco actos: portada, manifiesto
de curaduría, categorías, estado de clubes y encuentros, y cierre. Sin tocar
Reservas, Espacios, Contacto, área privada, ni — crítico — el Home, su hero
o el video real integrado en el GOAL previo.

## 2. Dirección artística

Paleta y tipografía heredadas del sistema Claude Design (`CLAUDE.md`,
`docs/SISTEMA_VISUAL_CLAUDE_DESIGN.md`): fondo profundo `#181f0d`, marfil
`#F5F5F0`, olivas (`#4A5728`/`#343E1C`/`#A6B86B`), rojo editorial `#C1121F`,
acento coral accesible `#FF7F70` sobre fondo oscuro. Playfair Display para
títulos serif, DM Sans para labels/cuerpo. Radios pequeños (`rounded-sm`),
grano sutil (`.grain-soft`), mucho espacio negativo, composición asimétrica.

Para diferenciar Librería de Agenda (nocturna, filas con borde) y Menú
(marfil luminoso, `.menu-row`/`.menu-fill`), se introdujeron dos recursos
propios:

- **La «M» tipográfica** gigante y tenue (recurso decorativo, no un logo)
  en el hero y en el cierre, sangrando por el borde de la sección.
- **`.editorial-fill`** (definida en GOAL 17, sin aplicar hasta ahora) como
  hover de las filas de categorías: un lavado tenue de `currentColor`, más
  sobrio que el relleno sólido rojo (`.menu-fill`) de Menú.

La secuencia de fondos alterna fondo profundo → marfil → fondo profundo →
oliva con borde rojo → rojo de marca, dándole un ritmo propio, distinto del
patrón de Agenda (oscuro/oscuro/oscuro/rojo) y de Menú (marfil/marfil/oscuro).

## 3. Arquitectura

- `app/libreria/page.tsx` **sigue siendo Server Component**: solo compone
  datos de `data/library.ts` (vía `.map`, sin modificar la fuente) y monta
  las cinco secciones dentro de `PublicShell`.
- Los cinco componentes nuevos en `components/sections/libreria/` son
  **Server Components**: sin `"use client"`, sin `useState`/`useEffect`,
  sin listeners, sin motion. Todo el hover (`.editorial-fill`) es CSS puro.
- `BookCategoryCard.tsx` no se modificó ni se usó: su lenguaje de card con
  borde + badge se sentía genérico y repetía el patrón de card del Home: se
  reutilizaron sus **datos y semántica** (título + descripción de
  `libraryCategories`), reconstruyendo la presentación como filas
  editoriales dentro de `LibraryCategoriesSection`.

## 4. Hero

`LibraryHero.tsx`: fondo `#181f0d`, «M» gigante (`52vw`, opacidad ~25% sobre
oliva) sangrando por la esquina superior derecha dentro de un contenedor
`overflow-hidden` (nunca genera overflow horizontal). Título asimétrico
(`md:ml-[6%]`), único `<h1>`: "Librería *La Maga.*" con itálica coral.
Eyebrow numerado ("01 · Café Valparaíso · Literatura") y descripción en
Playfair itálica que nombra curaduría, clubes de lectura y conversación —
las seis ideas pedidas (Librería La Maga, Café Valparaíso, literatura,
curaduría, conversación, encuentro) quedan cubiertas entre eyebrow, `<h1>` y
descripción, sin fotografía inventada ni "Imagen pendiente" como
protagonista.

## 5. Manifiesto

`LibraryManifestoSection.tsx`: fondo marfil, reutiliza el patrón de
`AboutSection.tsx` (capitular `.dropcap`, cita lateral con borde rojo,
numeración, palabras clave) con contenido propio de Librería. Máximo dos
párrafos: el primero (con capitular) describe la curaduría propia y su
relación con la mesa; el segundo, el club de lectura como forma de
encuentro, citando textualmente la nota ya confirmada de que el inventario
no está publicado en línea. Sin cifras ("miles de títulos") ni
especialidades no confirmadas. Las palabras clave se derivan directamente
de los títulos de `libraryCategories` (curaduría literaria, club de
lectura, estantería comunitaria).

## 6. Categorías

`LibraryCategoriesSection.tsx` consume `libraryCategories` de
`data/library.ts` tal cual (tres categorías reales, sin inventar libros,
autores ni precios). Filas editoriales de ancho completo con numeración
serif itálica, separadores (`border-t`/`border-b`) y hover `.editorial-fill`
(lavado tenue, no relleno sólido). No son elementos interactivos: `<li>`
simple, sin `<a>`/`<button>` ni `tabIndex` artificial, consistente con el
patrón ya usado en `AgendaProgramsSection`/`MenuCategoriesSection` para
listas sin destino de navegación real todavía.

## 7. Clubes y encuentros

`LibraryEncountersSection.tsx`: `data/library.ts` no trae programación de
clubes confirmada (fechas, moderadores, sedes), así que se presenta como
decisión editorial explícita, reutilizando el patrón visual ya probado de
`AgendaStatusSection` (caja con borde rojo `#C1121F` sobre fondo oliva
`#2A331A`/`#343E1C`, ya validado en accesibilidad AA en GOAL 19). Título
exacto: "La próxima programación de clubes y encuentros se publicará
próximamente." Mensaje de apoyo reutiliza la descripción confirmada de la
categoría "Club de lectura". CTA único: "Ver agenda" → `/agenda`.

## 8. Cierre

`LibraryClosingSection.tsx`: fondo rojo `#C1121F`, grano y la «M» tipográfica
tenue (opacidad 10% sobre rojo) repetida del hero para cerrar el círculo
visual. Copy exacto: "Los libros también son una forma de encontrarnos."
Dos CTA: "Ver agenda" (`variant="dark"`, patrón ya probado en
`AgendaClosingSection`) y "Contacto" (`variant="ghost"` con override de
borde/texto marfil, mismo patrón usado en el CTA secundario del hero del
Home para legibilidad AA sobre rojo). Rutas: `/agenda` y `/contacto`, sin
inventar canales de contacto ni catálogo online.

## 9. Fuente de datos

Único archivo de datos consumido para el contenido propio de la página:
`data/library.ts` (`libraryCategories`, sin modificar). `app/libreria/page.tsx`
también importa `data/site.ts`, `data/navigation.ts` y `data/contact.ts`
únicamente para armar `navbar`/`footer` de `PublicShell`, exactamente igual
que `app/agenda/page.tsx` y `app/menu/page.tsx` — ningún dato nuevo ni
inventado.

## 10. Responsive

Auditado en 360×740, 390×844, 768×1024, 1280×900 y 1440×1000: cero overflow
horizontal en los cinco. Mobile: una columna, «M» decorativa contenida por
`overflow-hidden` (nunca desborda), títulos sin cortes, CTA reales
(`LinkButton`) a 44-50.5px de alto medido. Tablet: la composición no salta
a proporciones de desktop antes de tiempo (mismo `Container` con paddings
progresivos `px-6 md:px-8 lg:px-12`). Desktop: asimetría del hero
(`md:ml-[6%]`), anchos de lectura controlados (`max-w-2xl`/`max-w-3xl` en
manifiesto y categorías), jerarquía clara sin repetir la cuadrícula de
Agenda/Menú.

## 11. Accesibilidad

- Un solo `<h1>` ("Librería La Maga.") y un solo `<main>`, verificado en los
  cinco viewports.
- Skip link verificado por teclado: primer `Tab` enfoca "Saltar al
  contenido principal", `Enter` mueve el foco a `<main id="contenido-principal">`.
- `aria-current="page"` correcto en el ítem "Librería" de la navbar
  (heredado de `PublicShell`, sin cambios).
- Jerarquía `h1 → h2 → h3` respetada (hero `h1`; título de cada sección
  `h2`; título de cada categoría `h3`).
- Decoración (`grain-soft`, la «M» tipográfica) lleva `aria-hidden="true"`.
- Sin elementos interactivos falsos: las filas de categorías son `<li>`
  sin `tabIndex` ni semántica de botón.
- CTA reales (`LinkButton`) miden 44-50.5px de alto, dentro del tap target
  mínimo.
- Reduced motion: la página no introduce ningún componente `"use client"`
  ni animación nueva; no hay nada que degradar.

## 12. Performance

- `/libreria` **sigue prerenderizando estática** (`○`) en el build.
- **Cero Client Components nuevos**: los cinco componentes y la página son
  Server Components puros.
- Sin listeners, sin recursos externos, sin imágenes rotas (no se usa
  ninguna imagen; toda la composición es tipografía y CSS).
- Sin layout shift: no hay medios con dimensiones pendientes de reservar.
- El Home, su hero y el video real **no se modificaron** (§15).
- `package.json` intacto; no se instalaron dependencias.

## 13. Archivos creados

- `components/sections/libreria/LibraryHero.tsx`
- `components/sections/libreria/LibraryManifestoSection.tsx`
- `components/sections/libreria/LibraryCategoriesSection.tsx`
- `components/sections/libreria/LibraryEncountersSection.tsx`
- `components/sections/libreria/LibraryClosingSection.tsx`
- `docs/LIBRERIA_CLAUDE_DESIGN.md` (este documento)

**Modificado**: `app/libreria/page.tsx` (recompuesto con las cinco
secciones nuevas). **Eliminado**: `components/sections/libreria/.gitkeep`
(ya no es un directorio vacío). Ningún otro archivo fue tocado.

## 14. Datos pendientes (los debe aportar el negocio)

- Inventario de libros, autores y precios: no confirmados en el repo: la
  página no los muestra ni los insinúa.
- Programación real de clubes y encuentros (fechas, títulos, moderadores,
  sede): pendiente; la sección 7 declara el estado explícitamente.
- Fotografía real de la librería: cuando exista, puede incorporarse como un
  medio adicional en el hero o el manifiesto sin cambiar la arquitectura
  (mismo patrón opcional `src`/fallback ya usado en `HomeMediaFrame`).

## 15. Protección del Home y del video

Confirmado mediante `git diff --stat` antes de este documento:

- `public/media/valparaiso-home.mp4` **no fue modificado** (diff vacío).
- El hero del Home (`components/sections/home/ScrollExpansionHero.tsx`,
  `HeroSection.tsx`) **no fue modificado** (diff vacío).
- `app/page.tsx` y `content/home.ts` **no fueron modificados** (diff vacío).
- La ausencia de poster **continúa siendo no bloqueante**, tal como quedó
  documentado en `docs/HERO_VIDEO_REAL.md` (commit `875e69c`); este GOAL no
  la tocó.
- El Home **sigue usando el video real** en su hero (sin cambios en la
  integración).
- **Reduced motion del Home sigue intacto**: `ScrollExpansionHero.tsx` no
  fue tocado, por lo tanto su lógica de `mounted`/`reduce` permanece
  exactamente como quedó validada en el commit `875e69c`.

## 16. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Sin fotografía real, la página depende enteramente de tipografía/CSS | Alta | Bajo | Es una decisión editorial deliberada (la «M» como recurso, no un placeholder de imagen); coherente con el resto del sitio, que nunca finge fotos inexistentes |
| La «M» gigante podría sentirse repetitiva si se reutiliza en más páginas futuras | Baja | Bajo | Por ahora es exclusiva de Librería (hero + cierre); no se usó en Home/Agenda/Menú |
| `.editorial-fill` es sutil comparado con `.menu-fill`: podría pasar desapercibida en hover táctil (mobile no tiene hover) | Media | Bajo | El contenido es legible sin depender del hover; la numeración y los separadores ya comunican la estructura sin necesitar el efecto |
| Sin programación real de clubes, la sección 7 podría sentirse incompleta por tiempo prolongado | Media | Bajo | El estado editorial es explícito y con CTA a `/agenda`, no un vacío ni un error |

## 17. Recomendación para GOAL 21

GOAL 21 — Espacios y Reservas: aplicar el mismo método (auditar
`app/espacios/page.tsx`/`app/reservas/page.tsx` y `data/spaces.ts` /
`data/reservations` reales, definir una dirección artística propia que las
diferencie de Home/Agenda/Menú/Librería, y documentar en
`docs/ESPACIOS_RESERVAS_CLAUDE_DESIGN.md`). Dado que Reservas probablemente
involucra un formulario, ese GOAL deberá decidir explícitamente si el
formulario requiere un Client Component aislado (como `ScrollExpansionHero`
en el Home) o si puede resolverse con una Server Action, manteniendo el
resto de la página como Server Component. Mantener la misma protección
estricta del Home, su hero y el video real.
