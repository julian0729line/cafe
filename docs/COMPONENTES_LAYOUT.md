# Componentes de Layout — Café Valparaíso Web

GOAL 06. Documenta el marco reutilizable de layout público
(`components/layout/`) que servirá de estructura común a las futuras
páginas públicas comerciales (home, agenda, menú, reservas, librería,
espacios, contacto). Ninguno de estos componentes está conectado todavía
a `app/page.tsx` ni a ninguna ruta existente.

## 1. Objetivo del GOAL 06

Crear los tres bloques estructurales de layout público —navbar, footer y
shell— como piezas de librería aisladas, sin contenido comercial
definitivo ni conexión a la landing actual. Son el andamiaje sobre el que
GOAL 07+ construirá las secciones editoriales, y sobre el que un GOAL
futuro conectará `data/navigation.ts`, `data/site.ts` y `data/contact.ts`.

## 2. Componentes creados

| Componente | Archivo | Propósito | Server/Client | Props principales | Uso futuro |
|---|---|---|---|---|---|
| `PublicNavbar` | `components/layout/PublicNavbar.tsx` | Navegación pública superior | Server Component (sin `"use client"`) | `brandLabel`, `brandHref`, `eyebrow`, `navItems`, `cta`, `className` | Recibirá `navItems` desde `data/navigation.ts` |
| `PublicFooter` | `components/layout/PublicFooter.tsx` | Pie de página público | Server Component (sin `"use client"`) | `brand`, `description`, `columns`, `contactItems`, `legalLinks`, `socialLinks`, `copyright`, `className` | Recibirá datos desde `data/site.ts` / `data/contact.ts` |
| `PublicShell` | `components/layout/PublicShell.tsx` | Envoltorio de página pública (navbar + main + footer) | Server Component (sin `"use client"`) | `children`, `showNavbar`, `showFooter`, `navbar`, `footer`, `className`, `mainClassName` | Envolverá cada página pública nueva (agenda, menú, etc.) |

## 3. Principios aplicados

- **`docs/SISTEMA_DISENO.md`**: paleta reutilizada tal cual — superficie
  Modo Noche (`#343E1C` navbar, `#2A331A` footer, un tono más profundo
  para diferenciar el pie del cuerpo), texto `onNight` (`#F5F5F0`
  primario, `#A6B86B` muted, `#C9A227` eyebrow, `#D9DCC4` para texto
  terciario como el copyright — se evitó deliberadamente el gris
  `onPaper.muted` (`#8C8373`) para no mezclar familias de texto de las dos
  superficies, tal como exige el contrato de tokens). Tipografía
  `.font-playfair` en la marca (itálica, igual que el `Nav` cliente
  existente) y `.font-sans-app` en el resto.
- **`docs/COMPONENTES_UI.md`**: `PublicNavbar` y `PublicFooter` construyen
  su ancho con `Container` (variante `wide`, igual que el resto del
  sistema), y el CTA de la navbar usa `LinkButton` variante `secondary`
  (el mismo botón rojo con sombra dura ya documentado en GOAL 05).
- **Arquitectura modular** (`docs/ARQUITECTURA_MODULAR.md`): los tres
  componentes viven en `components/layout/`, la zona ya reservada para
  este propósito desde GOAL 03; no se reutilizó ni movió nada de
  `components/` (zona de componentes existentes de la landing actual).

## 4. Decisiones técnicas

- **Por qué no se usó `"use client"`**: los tres componentes son
  puramente presentacionales — reciben props y renderizan HTML/Tailwind.
  No leen scroll, no necesitan estado de apertura/cierre ni
  `IntersectionObserver`. Mantenerlos como Server Components evita JS de
  cliente innecesario y es coherente con la regla del proyecto de que
  `app/page.tsx` se mantenga como Server Component salvo hojas puntuales
  con animación.
- **Por qué no se creó menú hamburguesa todavía**: un menú hamburguesa
  funcional requiere estado (`open`/`close`) y por lo tanto
  `"use client"`, lo cual está explícitamente prohibido en este GOAL. En
  su lugar, `PublicNavbar` resuelve el caso móvil sin JS: la marca y el
  CTA quedan siempre visibles, y los `navItems` (cuando existen) se
  muestran en una fila con `overflow-x-auto` —scroll horizontal nativo,
  sin script—. El menú hamburguesa animado ya existe como componente de
  cliente separado (`app/components/Nav.tsx`) y no fue tocado; la
  integración de una versión pública equivalente queda para un GOAL
  posterior si se decide reemplazarlo.
- **Por qué no se conectó a `app/page.tsx`**: el GOAL pide explícitamente
  crear la estructura primero y validarla de forma aislada; conectar
  ahora forzaría a decidir contenido definitivo de navegación/footer
  antes de que exista `data/navigation.ts` / `data/site.ts`.
- **Por qué no se crearon archivos en `data/`**: los tres componentes
  reciben sus datos por props con defaults mínimos (no vacíos de
  significado, pero sí deliberadamente genéricos); no importan ni asumen
  la existencia de ningún archivo de `data/` o `content/` todavía.
- **Cómo se manejan enlaces externos**: todo `FooterLink`/`PublicNavItem`
  con `external: true` (o `cta.external`) agrega `target="_blank"` y
  `rel="noreferrer"` en el punto de render, nunca de forma global.
- **Cómo se preserva accesibilidad**: `<nav aria-label="Navegación
  principal">` en la navbar; cada columna del footer es su propio `<nav
  aria-label={column.title}>`; `<ul aria-label="Redes sociales">` y `<ul
  aria-label="Enlaces legales">` etiquetan las listas sin texto visible
  de heading; jerarquía de encabezados con `<h3>` para títulos de columna
  (el `<h1>`/`<h2>` de cada página los define la propia página, no el
  layout); contraste de texto verificado contra los mismos pares
  fondo/texto ya validados en `SISTEMA_DISENO.md` (`onNight.*` sobre
  `#343E1C`/`#2A331A`).

## 5. Guía rápida de uso futuro

```tsx
// Navbar sola, con datos ya resueltos (ej. desde data/navigation.ts)
<PublicNavbar
  eyebrow="Café literario · Cali"
  navItems={[
    { label: 'Inicio', href: '/' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Menú', href: '/menu' },
  ]}
  cta={{ label: 'Reservar', href: '/reservas' }}
/>

// Footer solo
<PublicFooter
  columns={[
    { title: 'Explora', links: [{ label: 'Librería', href: '/libreria' }] },
  ]}
  contactItems={[{ label: 'WhatsApp', value: '+57 300 000 0000', href: 'https://wa.me/573000000000', external: true }]}
/>

// Shell completo envolviendo una futura página pública
<PublicShell
  navbar={{ cta: { label: 'Reservar', href: '/reservas' } }}
  footer={{ copyright: '© 2026 Café Valparaíso' }}
>
  {children}
</PublicShell>
```

No se modificó ninguna página existente para usarlos: los ejemplos son
ilustrativos, no código ejecutado en este GOAL.

## 6. Qué NO se hizo en este GOAL

- No se modificó `app/page.tsx`.
- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocaron rutas.
- No se tocó Supabase.
- No se tocó middleware.
- No se movieron ni renombraron componentes existentes.
- No se conectó el layout a la landing todavía.
- No se creó menú hamburguesa con estado.
- No se crearon archivos en `data/` ni `content/`.
- No se crearon barrel exports (`index.ts`).

## 7. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `PublicNavbar` sin `navItems` queda visualmente "vacía" en desktop | Media | Bajo | Es el comportamiento esperado en este GOAL (defaults mínimos); se resuelve al conectar `data/navigation.ts` en un GOAL futuro |
| Coexistencia de dos navbars (el `Nav` cliente animado de la landing y el nuevo `PublicNavbar` server) puede confundir sobre cuál usar | Media | Medio | Documentado explícitamente en este archivo (§4); `Nav.tsx` sigue siendo el de la landing actual, `PublicNavbar` es para páginas públicas nuevas — la unificación se decide en un GOAL posterior |
| Footer con superficie `#2A331A` fija puede no adaptarse bien si una página pública futura usa Modo Papel | Baja | Medio | Fuera de alcance de este GOAL; se revisará cuando exista la primera página en Modo Papel real |
| `overflow-x-auto` sin indicador visual de "hay más contenido" en móvil | Baja | Bajo | Aceptable para un primer entregable sin JS; se puede mejorar con un fade lateral en un GOAL de refinamiento visual |

## 8. Checklist para GOAL 07

**GOAL 07 — Secciones editoriales para la landing.**

Crear las primeras secciones reutilizables en `components/sections/home/`,
por ejemplo:

- `HeroSection.tsx`
- `AboutSection.tsx`
- `CulturePreviewSection.tsx`
- `MenuPreviewSection.tsx`
- `LibraryPreviewSection.tsx`
- `SpacesPreviewSection.tsx`
- `ReservationCTASection.tsx`

Estas secciones deberían apoyarse en los componentes UI de GOAL 05
(`Container`, `SectionHeader`, `Card`, `Badge`, `LinkButton`) y, cuando
aplique, en `PublicShell`/`PublicNavbar`/`PublicFooter` de este GOAL —
pero **todavía no implementarlas ni conectarlas en este GOAL 06**.

## 9. Recomendación final

El proyecto está listo para avanzar a GOAL 07 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit.
- GOAL 07 debe seguir sin conectar nada a `app/page.tsx` todavía (según
  el propio mensaje del usuario, la conexión real se decide en un GOAL
  posterior a la creación de secciones).
- Se recomienda que un GOAL intermedio defina `data/navigation.ts` antes
  o junto con GOAL 07, ya que varias secciones (`MenuPreviewSection`,
  `LibraryPreviewSection`) probablemente necesitarán props de datos
  similares a los de `PublicFooter`/`PublicNavbar`.
