# QA Visual Mobile — Café Valparaíso Web

GOAL 13. Documenta la auditoría visual responsive de las 7 rutas públicas
en 5 viewports (mobile pequeño, mobile estándar, tablet, desktop, desktop
amplio) y la única corrección real aplicada: overflow horizontal
estructural en `PublicNavbar` en el rango 768–1023px.

## 1. Objetivo del GOAL 13

Auditar visualmente el sitio público completo en móvil, tablet y
desktop, detectar problemas reales de responsive (no estéticos ni de
gusto) y corregir únicamente lo necesario, preservando la identidad
editorial, el contenido y la arquitectura ya construidos en GOAL 01-12.

Herramienta usada: Playwright con Chromium (`/opt/pw-browsers/chromium`),
disponible en el entorno vía el paquete global de Node
(`/opt/node22/lib/node_modules/playwright`), contra `npm run dev` en
`localhost:3000`. Se generaron 35 combinaciones (7 rutas × 5 viewports)
con medición programática de `scrollWidth`/`clientWidth` (overflow
horizontal) y conteo de `<h1>`, más capturas de pantalla para inspección
visual manual.

## 2. Rutas auditadas

| Ruta | Viewports revisados | Estado inicial | Problemas encontrados | Correcciones aplicadas | Estado final |
|---|---|---|---|---|---|
| `/` | 360×740, 390×844, 768×1024, 1280×900, 1440×1000 | Overflow horizontal en 768×1024 (43px) | Navbar desborda a la derecha en el rango tablet-portrait | Corrección en `PublicNavbar.tsx` (compartida, ver §4) | Sin overflow en los 5 viewports |
| `/agenda` | ídem | ídem (mismo navbar) | ídem | ídem (heredada) | Sin overflow |
| `/menu` | ídem | ídem | ídem | ídem | Sin overflow |
| `/reservas` | ídem | ídem | ídem | ídem | Sin overflow |
| `/libreria` | ídem | ídem | ídem | ídem | Sin overflow |
| `/espacios` | ídem | ídem | ídem | ídem | Sin overflow |
| `/contacto` | ídem | ídem | ídem | ídem | Sin overflow |

El problema y la corrección fueron idénticos en las 7 rutas porque el
overflow no dependía del contenido de cada página, sino del layout
compartido `PublicNavbar` (usado por las 7 vía `PublicShell`) — el
`scrollWidth` excedía `clientWidth` en exactamente 43px en las 7 rutas
por igual en 768×1024, confirmando que era un problema estructural, no
de contenido.

## 3. Hallazgos principales

**Mobile (360×740, 390×844)**: sin overflow horizontal en ninguna ruta.
Navegación horizontal por scroll (sin JS) funciona correctamente: en
360px se ven "Inicio, Agenda, Menú, Librería" y el resto es accesible
por scroll táctil, comportamiento esperado desde GOAL 06. CTA superior
("Reservar") y marca conviven sin solaparse. Cards se apilan en una sola
columna con espaciado consistente (`gap-6`). Badges envuelven en 2×2 sin
romper layout (`flex-wrap gap-3`).

**Tablet (768×1024)**: era el único viewport con overflow horizontal
real, causado por `PublicNavbar` (ver §4). Corregido. Tras la corrección,
en este rango (768–1023px) el navbar usa el mismo layout seguro de móvil
(columna + scroll horizontal + CTA compacto), lo cual es intencional: a
768px de ancho no cabe cómodamente una sola fila con marca + 6 enlaces +
CTA sin apretar el diseño.

**Desktop (1280×900) y desktop amplio (1440×1000)**: sin overflow. El
layout de una sola fila del navbar (marca + enlaces + CTA) solo se activa
desde 1024px (`lg:`), donde se confirmó que cabe con aire de sobra
(verificado también en 1024px exacto, ver §4). Contenedores `wide`
(`max-w-7xl`) dejan márgenes laterales cómodos sin sensación de vacío en
1440px.

**Accesibilidad visual**: `:focus-visible` global (outline coral 2px)
sigue funcionando correctamente tras la corrección — verificado con
navegación por teclado (`Tab`) sobre el primer enlace de navegación.

**Navegación**: única corrección de este GOAL, documentada en §4.

**Footer**: legible y sin saturación en los 5 viewports; en móvil las
columnas se apilan verticalmente (`grid-cols-1`), sin overlap ni texto
cortado.

**Cards** (`EventCard`, `MenuItemCard`, `SpaceCard`, `BookCategoryCard`):
se apilan en una columna en móvil y usan `md:grid-cols-2/3`,
`lg:grid-cols-4` según la página, sin desbordarse ni verse apretadas en
ningún viewport auditado.

**Secciones home**: `HeroSection` (grid 2 columnas en `md:`+),
`AboutSection`, `CulturePreviewSection`, `MenuPreviewSection`,
`LibraryPreviewSection`, `SpacesPreviewSection` y
`ReservationCTASection` mantienen jerarquía editorial y buen espaciado
entre secciones (`py-16 md:py-24`/`md:py-28`) en los 5 viewports.

## 4. Archivos modificados

| Archivo | Cambio realizado | Motivo | Riesgo | Validación |
|---|---|---|---|---|
| `components/layout/PublicNavbar.tsx` | Se cambiaron los 4 breakpoints `md:` del layout de una sola fila (`md:flex-row md:items-center md:justify-between md:gap-6 md:py-4`, `md:hidden` del CTA móvil, `overflow-x-auto md:overflow-visible`, `hidden md:block` del CTA desktop) a `lg:` | El contenido real (marca + 6 enlaces + CTA) no cabe en una sola fila sin desbordar hasta ~820-850px de ancho; medido overflow de 43px en 768px y 0px desde 850px en adelante. Se eligió `lg:` (1024px, breakpoint estándar de Tailwind) por dar margen de sobra sobre el umbral medido, sin introducir un breakpoint arbitrario | Bajo: en el rango 768–1023px el navbar ahora usa el layout de columna + scroll horizontal de móvil (ya probado y funcional desde GOAL 06) en vez del layout de una fila | Auditoría completa re-ejecutada tras el cambio: 0/35 combinaciones con overflow; capturas visuales en 360, 390, 768, 1024 y 1440px confirmando el comportamiento esperado en cada régimen |

Ningún otro archivo de los permitidos en este GOAL requirió cambios: el
resto de componentes UI, layout, secciones y cards, y las 7 páginas
públicas, no presentaron problemas reales de responsive tras la
auditoría.

## 5. Archivos no modificados deliberadamente

Confirmado por `git status` — no se tocaron:

- Supabase (`utils/supabase/*`, `lib/supabase.ts`).
- `middleware.ts`.
- Auth, dashboard, perfil, admin.
- `data/`.
- `content/`.
- `package.json`.

## 6. Decisiones de diseño responsive

- **Mobile-first**: el layout base de `PublicNavbar` sigue siendo el de
  columna (marca arriba, nav-scroll debajo); el layout de una fila es la
  excepción que se activa progresivamente (`lg:`), no al revés.
- **Espacio en blanco**: se preservaron los paddings de sección
  existentes (`py-16 md:py-24`/`md:py-28`); no se ajustó ninguno porque
  ya generaban aire suficiente entre secciones en los 5 viewports.
- **Jerarquía editorial**: `SectionHeader` con `titleAs="h1"` una sola
  vez por página se mantiene intacto; no se tocó tipografía ni tamaños de
  título.
- **Legibilidad**: párrafos de descripción ya usan `max-w-lg`/`max-w-2xl`
  según sección, manteniendo un ancho de línea cómodo en todos los
  viewports; no requirió ajuste.
- **Tap targets**: se midió el alto real de los enlaces de navegación
  (~31px) y del botón CTA (~35px) en móvil. Están por debajo del ideal de
  44px (WCAG 2.5.5, criterio **AAA**), pero el proyecto solo se compromete
  a WCAG **AA** (`CLAUDE.md`), donde este criterio no aplica. Se dejaron
  sin modificar para no arrastrar un cambio de tamaño de botón a todo el
  sistema de componentes (`Button`/`LinkButton`) fuera del alcance de un
  bug real; ver §8.
- **Navegación horizontal sin JS**: se preservó el patrón
  `overflow-x-auto` para el listado de enlaces en el rango donde no cabe
  una fila completa (ahora hasta `lg:`), sin introducir ningún menú
  hamburguesa con estado (prohibido explícitamente en este GOAL).
- **Footer respirable**: no se tocó; ya se apila correctamente en móvil
  desde GOAL 06.
- **Cards no saturadas**: se confirmó visualmente que ninguna grilla de
  cards se ve apretada en tablet/mobile; no requirió cambio de `gap` ni
  de `grid-cols`.

## 7. Verificaciones técnicas

- **`npm run lint`**: 0 errores, 136 warnings — mismos preexistentes de
  siempre (scripts de `.agents/skills/`, `perfil/editar/page.tsx`),
  ninguno originado por el cambio de este GOAL.
- **`npm run build`**: exitoso, sin variables de entorno; las 7 rutas
  públicas + `/robots.txt` + `/sitemap.xml` siguen prerenderizando como
  estáticas.
- **`npx tsc --noEmit`**: exit 0, sin errores.
- **Conteo de `<h1>`**: 1 por ruta en las 7 páginas públicas, verificado
  en las 35 combinaciones de la auditoría (antes y después del fix).
- **Overflow horizontal**: 7/35 combinaciones con overflow antes del fix
  (viewport 768×1024 en las 7 rutas, una por ruta); 0/35 combinaciones
  tras el fix.
- **`"use client"`**: ausente en `PublicNavbar.tsx` y en las 7 páginas
  públicas, verificado por grep.
- **Datos falsos**: verificado por grep (teléfonos, precios, correos,
  links externos) sobre el único archivo modificado — cero coincidencias
  (el cambio fue puramente de clases Tailwind, no tocó ningún texto).
- **Supabase/middleware no tocados**: confirmado por `git status` —
  ningún archivo de esas rutas aparece en el diff.

## 8. Problemas no corregidos

- **Tap targets de ~31-35px en navbar móvil** (por debajo del ideal de
  44px): no corregido en este GOAL porque (a) es un criterio WCAG AAA,
  no AA (el compromiso de accesibilidad del proyecto), y (b) corregirlo
  bien implicaría subir el tamaño base de `Button`/`LinkButton` en todo
  el sistema de componentes, un cambio de alcance mayor al de un bug
  puntual. Se recomienda evaluarlo explícitamente si el negocio prioriza
  accesibilidad AAA en un GOAL futuro (ver Opción C, §10).
- **Duplicación visual de la palabra "Contacto"** en el footer de las 7
  páginas (aparece como encabezado de columna y como label del único
  ítem de contacto, ej. "CONTACTO" / "Contacto" / "Formulario de
  contacto"): detectado en las capturas, pero **no es un problema de
  responsive** (se ve igual en todos los viewports) sino una redundancia
  de copy/estructura de datos ya existente desde GOAL 09/10. No se
  corrigió porque la tarea restringe cambios de copy a "microajustes de
  legibilidad imprescindibles", y este no bloquea la legibilidad ni la
  usabilidad — solo se ve repetitivo. Se recomienda revisarlo en un GOAL
  de contenido/datos, no en uno de QA visual.
- **Botón "Escríbenos para reservar" envuelve a dos líneas** dentro del
  botón `ghost` (`rounded-full`) en `/reservas` a 360px de ancho: sigue
  siendo legible y no se corta ni se superpone, solo ocupa dos líneas en
  vez de una. No se corrigió porque arreglarlo bien requeriría acortar el
  texto del CTA (cambio de copy no imprescindible) o cambiar el
  comportamiento de wrap del componente `Button` para todo el sistema
  (fuera de alcance para un caso puntual y no roto).

## 9. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El cambio de `md:` a `lg:` en `PublicNavbar` reduzca la ventana en la que se ve el layout "premium" de una sola fila (ahora solo desde 1024px en vez de 768px) | Baja | Bajo | Es la corrección correcta: a 768-1023px el layout de una fila literalmente no cabía sin desbordar; el layout de columna+scroll ya es el diseño mobile-first probado desde GOAL 06 |
| Algún dispositivo con ancho real entre 1024 y 1279px (poco común) podría acercarse de nuevo al límite si el contenido de navegación creciera (más enlaces) | Baja | Medio | Documentado: si `publicNavigation.items` crece más allá de 6 enlaces, re-auditar este mismo umbral |
| Tap targets bajo 44px (§8) generen fricción real en usuarios con motricidad reducida | Baja | Medio | Documentado explícitamente como pendiente para un GOAL de accesibilidad AAA si el negocio lo prioriza |

## 10. Checklist para GOAL 14

Tres opciones evaluadas:

- **A — Datos reales del negocio**: completar teléfono, WhatsApp, sedes,
  horarios, menú, agenda, salones y políticas.
- **B — Navegación/comunidad**: resolver acceso discreto a `/login` y
  `/register`.
- **C — Performance/accesibilidad técnica**: Lighthouse, contraste
  sistemático, landmarks, tamaños de tap targets, `aria-labels`.

**Recomendación**: mantener la prioridad ya establecida en
`docs/SEO_METADATA.md` — **Opción A (datos reales del negocio)** en
cuanto estén disponibles, porque sigue siendo el cuello de botella real
de todo lo construido en GOAL 08-13. Como este GOAL 13 ya cubrió QA
visual, la siguiente opción más productiva mientras se reúnen los datos
es la **Opción C (performance/accesibilidad técnica)**, que incluye
justamente el pendiente de tap targets señalado en §8 y puede ejecutarse
sin depender de ninguna decisión de negocio. La Opción B sigue sin
bloquear nada técnico y puede esperar.

## 11. Recomendación final

El proyecto está listo para avanzar a GOAL 14 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Si se elige la Opción C, incluir explícitamente una revisión de tap
  targets (§8) y considerar si vale la pena subir el tamaño `sm` de
  `Button`/`LinkButton` a nivel de sistema.
- Si se elige la Opción A, coordinar con el negocio antes de tocar
  `data/`/`content/`, igual que se recomendó en GOAL 12.
