# Secciones Home — Café Valparaíso Web

GOAL 07. Documenta las 7 secciones editoriales del home público
(`components/sections/home/`), construidas sobre los componentes UI de
GOAL 05 y pensadas para conectarse en GOAL 08 a `content/home.ts` y
`data/site.ts`. Ninguna sección está conectada todavía a `app/page.tsx`.

## 1. Objetivo del GOAL 07

Crear las piezas visuales reales del home —hero, quiénes somos, y los
cinco previews comerciales/culturales— como componentes de librería
aislados, con contenido fallback sobrio y sin datos falsos, listos para
recibir contenido real vía props en un GOAL posterior.

## 2. Secciones creadas

| Sección | Archivo | Propósito | Server/Client | Props principales | Uso futuro |
|---|---|---|---|---|---|
| `HeroSection` | `components/sections/home/HeroSection.tsx` | Hero editorial del home, único `<h1>` de la página | Server | `eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta`, `highlights` | Recibirá contenido desde `content/home.ts` |
| `AboutSection` | `components/sections/home/AboutSection.tsx` | Presenta qué es Café Valparaíso | Server | `eyebrow`, `title`, `description`, `features` | `content/home.ts` |
| `CulturePreviewSection` | `components/sections/home/CulturePreviewSection.tsx` | Preview de agenda cultural | Server | `eyebrow`, `title`, `description`, `events`, `cta` | `data/events.ts` |
| `MenuPreviewSection` | `components/sections/home/MenuPreviewSection.tsx` | Preview gastronómico | Server | `eyebrow`, `title`, `description`, `items`, `cta` | `data/menu.ts` |
| `LibraryPreviewSection` | `components/sections/home/LibraryPreviewSection.tsx` | Preview de Librería La Maga | Server | `eyebrow`, `title`, `description`, `categories`, `cta` | `data/library.ts` |
| `SpacesPreviewSection` | `components/sections/home/SpacesPreviewSection.tsx` | Preview de espacios y reservas | Server | `eyebrow`, `title`, `description`, `spaces`, `cta` | `data/spaces.ts` |
| `ReservationCTASection` | `components/sections/home/ReservationCTASection.tsx` | CTA final de conversión | Server | `eyebrow`, `title`, `description`, `primaryCta`, `secondaryCta` | `data/contact.ts` |

Todas son Server Components (sin `"use client"`).

## 3. Principios aplicados

- **`docs/SISTEMA_DISENO.md`**: paleta Modo Noche reutilizada en la
  mayoría de secciones (`#343E1C`/`#2A331A` implícito vía `.tile`,
  `#F5F5F0` texto primario, `#A6B86B` muted, `#C9A227` eyebrow, `#FF7F70`
  acento). `MenuPreviewSection` usa deliberadamente `Card` variante
  `paper` (Modo Papel), coherente con que el sistema de diseño reserva
  Modo Papel para menú/agenda/librería/contacto — un primer uso real de
  esa superficie fuera de GOAL 04.
- **`docs/COMPONENTES_UI.md`**: todas las secciones se apoyan en
  `Container` (ancho `wide`, consistente con `PublicNavbar`/`PublicFooter`
  de GOAL 06), `SectionHeader` para eyebrow+título+descripción,
  `Card`/`Badge` para las piezas de contenido y `LinkButton` para todos
  los CTA — cero botones o tarjetas hechos a mano.
- **`docs/COMPONENTES_LAYOUT.md`**: las secciones no dependen de
  `PublicShell`/`PublicNavbar`/`PublicFooter`, pero están diseñadas para
  vivir dentro de él sin conflicto (mismo ancho de contenedor, mismos
  bordes `#4A5728` entre secciones).
- **Arquitectura modular**: cada sección vive en
  `components/sections/home/`, la zona reservada desde GOAL 03
  exclusivamente para secciones de home.

## 4. Decisiones técnicas

- **Por qué no se usó `"use client"`**: todas reciben props y renderizan
  HTML/Tailwind puro, sin estado ni efectos; igual que en GOAL 06, esto
  evita JS de cliente innecesario en secciones que son, en esencia,
  presentación de contenido.
- **Por qué no se conectó a `app/page.tsx`**: el GOAL pide explícitamente
  crear y validar las secciones de forma aislada antes de decidir cómo
  (y si) reemplazan o conviven con las secciones ya existentes de la
  landing actual (`Hero`, `MediaSlot`, etc.).
- **Por qué no se crearon archivos en `data/`/`content/`**: cada sección
  resuelve su propio fallback vía valores por defecto en la firma de la
  función; ninguna importa ni asume la existencia de un archivo de datos
  todavía inexistente.
- **Por qué se usaron fallbacks mínimos**: para que cada sección se
  pueda renderizar de forma aislada (Storybook-like) sin props y sin
  romper, y para que el fallback sirva de guía de tono editorial al
  redactar el contenido real en GOAL 08.
- **Cómo se evitaron datos falsos**: ningún fallback incluye teléfono,
  dirección exacta, precio o fecha. `CulturePreviewSection` omite
  deliberadamente `dateLabel` en sus eventos por defecto (el campo existe
  en el tipo, pero no se inventa una fecha); si `events` llega vacío,
  se muestra el texto "Próximamente publicaremos la agenda cultural.".
  `MenuPreviewSection` usa nombres de categoría genéricos ("Cocina de
  autor") sin platos ni precios específicos. `ReservationCTASection`
  apunta a rutas (`/reservas`, `/contacto`) en vez de a un número de
  WhatsApp o teléfono real.
- **Cómo se preserva accesibilidad**: cada sección es un `<section>`
  semántico; los títulos de tarjetas usan `<h3>` (el `<h2>` de cada
  bloque lo aporta `SectionHeader`, y el único `<h1>` de la página lo
  aporta `HeroSection`); todos los CTA usan `LinkButton` (que ya trae
  `:focus-visible` global y soporte de `aria-label`/enlaces externos con
  `rel="noreferrer"` heredado de GOAL 05/06).
- **Cómo se preserva el invariante de un solo `<h1>`**: `HeroSection` es
  la única sección que renderiza un `<h1>` (el título principal). Todas
  las demás secciones usan `SectionHeader` con su default `titleAs="h2"`,
  y las tarjetas internas usan `<h3>`. Esto es intencional porque
  `HeroSection` es la única pensada para ir primera en el home; el resto
  de secciones asumen que ya existe un `<h1>` anterior en la página.

## 5. Guía rápida de uso futuro

```tsx
<HeroSection />
<AboutSection />
<CulturePreviewSection />
<MenuPreviewSection />
<LibraryPreviewSection />
<SpacesPreviewSection />
<ReservationCTASection />
```

Con contenido real (ejemplo ilustrativo, no ejecutado en este GOAL):

```tsx
<CulturePreviewSection
  events={realEventsFromDataFile}
  cta={{ label: 'Ver agenda completa', href: '/agenda' }}
/>
```

No se modificó ninguna página existente para usarlas.

## 6. Qué NO se hizo en este GOAL

- No se modificó `app/page.tsx`.
- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocaron rutas.
- No se tocó Supabase.
- No se tocó middleware.
- No se movieron componentes existentes.
- No se conectaron estas secciones a la landing.
- No se crearon archivos `data/` ni `content/`.
- No se inventaron teléfonos, direcciones, precios ni fechas.
- No se crearon rutas comerciales.

## 7. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Fallbacks por defecto se perciban como contenido "casi final" y se dejen sin reemplazar | Media | Medio | Documentado explícitamente en §4 y en cada default (tono genérico, sin datos comerciales precisos); GOAL 08 debe reemplazarlos por `content/home.ts` |
| Coexistencia entre las secciones nuevas y las secciones equivalentes ya existentes en `app/page.tsx` (historia, menú, testimonios, ubicación) puede generar duplicidad conceptual | Alta | Medio | Fuera de alcance de este GOAL; la decisión de reemplazar vs. convivir se toma en el GOAL que sí conecte estas secciones a la landing |
| `MenuPreviewSection` usa Modo Papel (`Card variant="paper"`) mientras el resto del home sigue en Modo Noche | Media | Bajo | Es una decisión deliberada alineada con `SISTEMA_DISENO.md`; se debe validar visualmente el contraste entre secciones consecutivas cuando se conecten en la landing real |
| Tipos de `href` en CTAs apuntan a rutas que aún no existen (`/agenda`, `/menu`, `/reservas`, etc.) | Alta | Bajo | Esperado en este GOAL (rutas comerciales se crean en un GOAL posterior); no rompe build porque estas secciones no están montadas todavía |

## 8. Checklist para GOAL 08

**GOAL 08 — Separación de contenido en archivos `data` y `content`.**

Crear (sin implementar todavía en este GOAL 07):

```text
data/site.ts
data/navigation.ts
data/events.ts
data/menu.ts
data/spaces.ts
data/library.ts
data/contact.ts

content/home.ts
```

Estos archivos deberían exportar los datos tipados que hoy viven como
defaults dentro de cada sección (`HeroHighlight[]`, `CultureEventPreview[]`,
`MenuPreviewItem[]`, `LibraryCategoryPreview[]`, `SpacePreview[]`, los
`FooterColumn`/`FooterContactItem` de GOAL 06 y los `PublicNavItem` de
`PublicNavbar`), para que GOAL 09+ solo tenga que importar y pasar props,
sin tocar los componentes.

## 9. Recomendación final

El proyecto está listo para avanzar a GOAL 08 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit.
- GOAL 08 debe limitarse a crear los archivos de datos tipados citados en
  §8, reutilizando los tipos ya exportados por cada sección (`AboutFeature`,
  `CultureEventPreview`, `MenuPreviewItem`, `LibraryCategoryPreview`,
  `SpacePreview`, `HeroHighlight`, `HeroCta`, `ReservationCta`) en vez de
  redefinirlos.
- La decisión de cómo convive el contenido nuevo con las secciones
  equivalentes de `app/page.tsx` (riesgo de la tabla anterior) debe
  tomarse explícitamente antes de cualquier GOAL que conecte estas
  secciones a la landing.
