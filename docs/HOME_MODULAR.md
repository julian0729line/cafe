# Home Modular — Café Valparaíso Web

GOAL 09. Documenta el reemplazo de `app/page.tsx` por el nuevo home
modular: `PublicShell` + las 7 secciones de `components/sections/home/`,
alimentadas por `content/home.ts` y los archivos de `data/`. Es el primer
GOAL que cambia la página visible.

## 1. Objetivo del GOAL 09

Conectar por primera vez todo lo construido en GOAL 05-08 (componentes UI,
layout público, secciones editoriales, capa de datos/contenido) en la
página principal real, reemplazando el home anterior (hero animado,
historia, menú incrustado, testimonios, ubicación con placeholder ficticio
y footer propio) por una composición declarativa y sin datos falsos.

## 2. Archivos modificados y creados

| Archivo | Tipo de cambio | Propósito | Riesgo | Validación |
|---|---|---|---|---|
| `app/page.tsx` | Modificado (reescrito completo) | Nuevo home modular: `PublicShell` + 7 secciones + datos de `data/`/`content/` | Cambio visual importante de la landing; pérdida del punto de entrada a `/login`/`/register` desde el home (ver §9) | `lint`, `build`, `tsc`, revisión visual en navegador (desktop y mobile) |
| `docs/HOME_MODULAR.md` | Nuevo | Este documento | Ninguno | N/A |

Ningún otro archivo fue modificado ni creado.

## 3. Nueva arquitectura del home

`app/page.tsx` ahora es un Server Component puro que:

- Envuelve todo en `PublicShell` (`components/layout/PublicShell.tsx`),
  pasándole `navbar` (con `siteConfig.name`, `publicNavigation.brandHref`,
  el `eyebrow` ya definido en `homeContent.hero`, `navItems` derivados de
  `publicNavigation.items` y el `cta` de `publicNavigation.cta`) y
  `footer` (con `siteConfig.name`/`description`, una columna de
  navegación construida localmente a partir de `publicNavigation.items`,
  un ítem de contacto derivado de `contactConfig.reservationChannels`, y
  un `copyright` con el año actual).
- Renderiza, en orden, las 7 secciones de `components/sections/home/`:
  `HeroSection`, `AboutSection`, `CulturePreviewSection`,
  `MenuPreviewSection`, `LibraryPreviewSection`, `SpacesPreviewSection`,
  `ReservationCTASection`.
- Alimenta cada sección con su sub-objeto correspondiente de
  `homeContent` (`content/home.ts`): `homeContent.hero`,
  `homeContent.about`, `homeContent.culture`, `homeContent.menu`,
  `homeContent.library`, `homeContent.spaces`,
  `homeContent.reservationCta`.
- Nota de import: los componentes de GOAL 05-07 son `export default`, no
  exports nombrados. `app/page.tsx` usa `import PublicShell from
  '@/components/layout/PublicShell'` (y equivalentes), no
  `import { PublicShell } from ...` — se adaptó al export real de cada
  archivo, tal como pedía la tarea.

## 4. Qué se reemplazó del home anterior

El `app/page.tsx` anterior dejó de renderizarse (sin eliminar sus
archivos fuente): `Preloader`, `ScrollProgress`, `Nav` (con scroll-spy y
menú hamburguesa animado), `Hero` (hero cinematográfico con parallax),
`VelocityMarquee` (ticker), la sección "Historia" con `MediaSlot` y
`Counter`, `AmbienteScroll` (galería horizontal anclada), la sección de
menú con precios (`$3.500`, etc.), la sección de testimonios, la sección
de ubicación/horarios con el placeholder
`contacto@cafeliterario.com · +57 300 000 0000` y una dirección
inventada, la sección de CTA final con `Parallax`/`MagneticButton`, y el
footer propio con enlaces `#menu`/`#ubicacion` y el link condicional a
`/register` (gateado por `isSupabaseConfigured`).

Ninguno de esos archivos (`app/components/Hero.tsx`, `Nav.tsx`,
`MediaSlot.tsx`, `AmbienteScroll.tsx`, `VelocityMarquee.tsx`,
`Preloader.tsx`, `ScrollProgress.tsx`, `Parallax.tsx`,
`MagneticButton.tsx`, `Counter.tsx`, `Reveal.tsx`) fue eliminado ni
modificado; simplemente dejaron de importarse desde `app/page.tsx`.

## 5. Manejo de datos pendientes

- **Teléfonos/WhatsApp/correo/Instagram**: no se muestran en ningún
  punto. El footer solo incluye un ítem de contacto genérico (`label:
  'Contacto'`, `value: 'Formulario de contacto'`, `href: '/contacto'`),
  derivado de `contactConfig.reservationChannels` (que ya está marcado
  `status: 'pending'` en `data/contact.ts`) — no un dato de contacto real.
- **Direcciones**: no se muestra ninguna; el antiguo placeholder
  ("Calle de las Letras 123, Centro Histórico") desapareció junto con la
  sección de ubicación que ya no se renderiza.
- **Precios**: `MenuPreviewSection` recibe `menuItems` (adaptados desde
  `homeContent.menu.items`) con `category`/`title`/`description`, sin
  ningún campo de precio.
- **Fechas**: `CulturePreviewSection` recibe `cultureEvents`, que hoy es
  un array vacío (`featuredEvents` de `data/events.ts` no tiene eventos
  confirmados), por lo que la sección muestra su propio fallback
  editorial ("Próximamente publicaremos la agenda cultural."), sin fecha
  inventada.
- **Horarios/aforos**: no aparecen en ninguna sección nueva.
- **Links**: todos los `href` usados apuntan a rutas internas futuras
  (`/agenda`, `/menu`, `/reservas`, `/libreria`, `/espacios`,
  `/contacto`) definidas en `data/navigation.ts` y `data/*.ts`; ninguno
  apunta a un dominio externo inventado (WhatsApp, Instagram, Maps).

## 6. Resolución `null`/`undefined`

Se usaron adaptadores locales en `app/page.tsx`, sin modificar `data/` ni
`content/`, tal como exigía la tarea:

- `nullableToUndefined<T>(value: T | null): T | undefined` — convierte
  cualquier campo `null` de los datos (`dateLabel`, `description`, `href`,
  `tag`) al `undefined` que esperan las props opcionales de las
  secciones.
- `cultureEvents`, `menuItems` y `spaces` son arrays construidos con
  `.map()` sobre `homeContent.culture.events`, `homeContent.menu.items` y
  `homeContent.spaces.spaces` respectivamente, aplicando
  `nullableToUndefined` campo a campo. Esto también resuelve, de paso, la
  incompatibilidad de mutabilidad de array (los datos de origen son
  arrays mutables tipados en `data/`, pero `.map()` igual garantiza un
  array nuevo compatible con el tipo de prop esperado).
- `highlights`, `features` y `categories` (arrays literales dentro del
  `as const` de `content/home.ts`, o reexportados como `as const` desde
  `data/library.ts`) se pasan con spread (`[...homeContent.hero.highlights]`,
  etc.) para convertir el tipo de tupla de solo lectura que genera
  `as const` en el array mutable que declaran las props de cada sección
  (`HeroHighlight[]`, `AboutFeature[]`, `LibraryCategoryPreview[]`).
- `navItems` para `PublicNavbar` se construye con
  `publicNavigation.items.map((item) => ({ ...item }))` por el mismo
  motivo (de tupla de solo lectura a array mutable).

No fue necesario modificar ningún tipo en `components/` ni en `data/`.

## 7. Accesibilidad y semántica

- **Un solo `<h1>`**: verificado por grep en todo el árbol renderizado
  (`app/page.tsx` + `PublicShell` + `PublicNavbar` + `PublicFooter` + las
  7 secciones) — una sola coincidencia, la de `HeroSection`. También
  verificado en navegador real con Playwright (`page.locator('h1').count()
  === 1`).
- **`<main>` desde `PublicShell`**: `PublicShell` sigue envolviendo los
  children en `<main className="flex-1">`, sin cambios respecto a
  GOAL 06.
- **Navbar semántico**: `PublicNavbar` renderiza `<header>` +
  `<nav aria-label="Navegación principal">`, sin cambios respecto a
  GOAL 06.
- **Footer semántico**: `PublicFooter` renderiza `<footer>` con
  `<nav aria-label="Explora">` (la columna construida en este GOAL) y el
  ítem de contacto bajo su propio `<h3>Contacto</h3>`, sin cambios de
  estructura respecto a GOAL 06.
- **CTAs accesibles**: todos los CTA de las secciones y del navbar/footer
  usan `LinkButton`/`Link`, que ya traen `:focus-visible` global (GOAL 04)
  y soporte de `aria-label`.
- **Links externos**: no se agregó ningún link externo en este GOAL (no
  hay WhatsApp/Instagram/Maps confirmados); por lo tanto no aplica
  `rel="noreferrer"` todavía, pero el mecanismo ya existe en
  `PublicNavbar`/`PublicFooter`/`LinkButton` desde GOAL 05/06 para cuando
  se agregue un link externo real.

## 8. Qué NO se hizo en este GOAL

- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocaron rutas.
- No se tocó Supabase.
- No se tocó middleware.
- No se tocó autenticación.
- No se tocaron dashboard, perfil ni admin.
- No se crearon rutas comerciales.
- No se inventaron datos comerciales (teléfonos, direcciones, precios,
  fechas, horarios, aforos, links).

## 9. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El home ya no tiene ningún punto de entrada visible a `/login`/`/register` (el `app/page.tsx` anterior mostraba "Únete al programa de socios" cuando `isSupabaseConfigured`) | Alta | Medio | Decisión obligada por la regla "no importes Supabase" en `app/page.tsx`; se debe decidir en un GOAL futuro si se agrega un acceso a socios en `PublicNavbar`/`PublicFooter` sin acoplar esos componentes a Supabase (p. ej. vía una prop booleana pasada desde afuera) |
| Contenido del home cambia de forma perceptible para visitantes que ya conocían la versión anterior (sin historia con foto, sin testimonios, sin ticker animado) | Alta | Bajo | Esperado y autorizado explícitamente por este GOAL; los componentes viejos siguen en el repo por si se reintroduce alguno como sección adicional |
| Página ya no tiene ninguna animación de entrada/scroll (motion) porque las nuevas secciones son Server Components sin JS | Media | Bajo | Coherente con el alcance de GOAL 05-07 (secciones sin `"use client"`); se puede añadir motion opcional en un GOAL de refinamiento visual posterior, sin romper el carácter Server Component de `app/page.tsx` |
| El ítem de contacto del footer ("Formulario de contacto" → `/contacto`) enlaza a una ruta que aún no existe | Alta | Bajo | Esperado: las rutas comerciales se crean en GOAL 10; hasta entonces el link no resuelve, pero no rompe el build de `/` |

## 10. Checklist para GOAL 10

**GOAL 10 — Creación de rutas públicas comerciales.**

Crear progresivamente (sin implementar todavía en este GOAL 09):

```text
/agenda
/menu
/reservas
/libreria
/espacios
/contacto
```

Cada ruta debería reutilizar `PublicShell` + los datos de `data/`
correspondientes, y resolver el riesgo señalado en §9 sobre el acceso a
`/login`/`/register` desde la navegación pública si el negocio lo sigue
necesitando.

## 11. Recomendación final

El proyecto está listo para avanzar a GOAL 10 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Antes de crear las rutas comerciales, decidir explícitamente el riesgo
  de §9 sobre el acceso a `/login`/`/register` desde el home público.
- Validar con el negocio los datos pendientes listados en
  `docs/DATA_CONTENT.md` §5 antes de que las nuevas rutas los necesiten
  para contenido real (agenda, menú, espacios, librería, contacto).
