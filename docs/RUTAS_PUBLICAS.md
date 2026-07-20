# Rutas Públicas Comerciales — Café Valparaíso Web

GOAL 10. Documenta las 6 páginas públicas comerciales (`/agenda`, `/menu`,
`/reservas`, `/libreria`, `/espacios`, `/contacto`), todas Server
Components que reutilizan `PublicShell`, los componentes UI de GOAL 05 y
la capa de datos de GOAL 08. Con este GOAL el sitio deja de ser solo un
home y pasa a ser navegable.

## 1. Objetivo del GOAL 10

Crear una primera versión real, compilable y sobria de las 6 rutas
públicas que ya estaban previstas en `data/navigation.ts` desde GOAL 08
(`/agenda`, `/menu`, `/reservas`, `/libreria`, `/espacios`, `/contacto`),
sin inventar ningún dato comercial exacto todavía pendiente de
confirmación por el negocio.

## 2. Rutas creadas

| Ruta | Archivo | Propósito | Datos usados | Datos pendientes | Riesgos |
|---|---|---|---|---|---|
| `/agenda` | `app/agenda/page.tsx` | Agenda cultural | `eventCategories`, `featuredEvents` | Eventos y fechas reales (`featuredEvents` vacío) | Página se ve "vacía" de eventos hasta que se confirme la agenda real |
| `/menu` | `app/menu/page.tsx` | Carta/menú | `menuPreviewItems` | Platos y precios reales | Categorías genéricas pueden percibirse como carta ya definitiva si no se actualiza pronto |
| `/reservas` | `app/reservas/page.tsx` | Reservas | `spacesPreview`, `contactConfig.reservationChannels` | Canal de reservas real, políticas, horarios | Sin canal de reserva en línea todavía; toda reserva depende de `/contacto` |
| `/libreria` | `app/libreria/page.tsx` | Librería La Maga | `libraryCategories` | Inventario, autores, horarios | Ninguno relevante nuevo |
| `/espacios` | `app/espacios/page.tsx` | Espacios y experiencias | `spacesPreview` | Aforos, precios, direcciones, sedes reales | Ninguno relevante nuevo |
| `/contacto` | `app/contacto/page.tsx` | Contacto | `contactConfig`, `siteConfig.name` | Teléfono, WhatsApp, correo, Instagram, sedes | Página muestra explícitamente "canales pendientes"; debe actualizarse en cuanto haya datos reales |

Las 6 páginas son Server Components (sin `"use client"`), exportan
`metadata` (`title`/`description`) y usan `PublicShell` con el mismo
patrón de `navbar`/`footer` que ya usa `app/page.tsx`.

## 3. Arquitectura aplicada

- **`PublicShell`**: cada página envuelve su contenido en `PublicShell`,
  con `navbar` (marca, eyebrow, `navItems` de `publicNavigation`, CTA) y
  `footer` (marca, descripción, una columna "Explora" construida desde
  `publicNavigation.items`, un ítem de contacto derivado de
  `contactConfig.reservationChannels`, copyright con el año actual) — el
  mismo patrón que GOAL 09, repetido localmente en cada archivo (por
  instrucción explícita del GOAL, no se creó ningún helper compartido
  nuevo en este GOAL).
- **Componentes UI**: cada página usa `Container` (ancho `wide`),
  `SectionHeader` (con `titleAs="h1"` para el encabezado principal),
  `Card` (variantes `dark`/`paper`/`outline`/`editorial` según el tono de
  cada sección) y `Badge` para categorías/etiquetas; `LinkButton` para
  todos los CTA.
- **`data/`**: cada página importa únicamente los archivos de datos que
  le corresponden (`data/events.ts` en agenda, `data/menu.ts` en menú,
  `data/spaces.ts` en reservas/espacios, `data/library.ts` en librería,
  `data/contact.ts` en todas para el footer y en contacto para el
  contenido principal, `data/site.ts`/`data/navigation.ts` en todas para
  marca/navegación).
- **Contenido sobrio**: ninguna página reutiliza las secciones de
  `components/sections/home/` (esas son específicamente "preview" para
  el home); cada ruta construye su propio contenido completo con
  `Card`/`Badge`, evitando duplicar el mismo encabezado dos veces.
- **Metadata**: las 6 páginas exportan `export const metadata: Metadata`
  con `title` (usa `siteConfig.name`) y `description` propios de cada
  ruta, sin depender de `generateMetadata` (no hace falta, no son rutas
  dinámicas).

## 4. Manejo de datos pendientes

- **Teléfonos/WhatsApp/correo/Instagram**: solo se muestran si
  `contactConfig.phone`/`whatsapp`/`email`/`instagram` no son `null`. Hoy
  los cuatro son `null`, así que `/contacto` muestra el mensaje sobrio
  "Los canales oficiales (teléfono, WhatsApp, correo e Instagram) se
  actualizarán pronto." en vez de la palabra `null` o `pending`.
- **Direcciones/sedes**: `contactConfig.locations` está vacío; `/contacto`
  muestra "Aún no publicamos una dirección confirmada. Escríbenos y te
  contamos cómo llegar." en vez de un array vacío o un placeholder falso.
- **Precios**: ninguna página de menú/espacios/reservas muestra ningún
  precio; `/menu` explica que "la carta detallada, con precios y
  disponibilidad, se publicará próximamente".
- **Fechas**: `/agenda` no muestra ninguna fecha; como `featuredEvents`
  está vacío, se muestra el fallback "Estamos preparando la próxima
  agenda cultural. Vuelve pronto o escríbenos para conocer las próximas
  actividades." (texto pedido explícitamente por la tarea).
- **Horarios/aforos**: no aparecen en ninguna página; `/espacios`
  explica que "los detalles de cada espacio (capacidad, disponibilidad y
  condiciones) se confirman directamente por contacto".
- **Links**: ningún link externo (WhatsApp, Instagram, Maps) fue
  agregado; todos los enlaces `href` de estas 6 páginas apuntan a rutas
  internas ya existentes (`/reservas`, `/agenda`, `/contacto`, etc.). En
  `/contacto` se evitó deliberadamente enlazar el ítem "Formulario de
  contacto" de `contactConfig.reservationChannels` hacia `/contacto`
  mismo (sería un link circular a la propia página); en su lugar, esa
  página resuelve el contenido de contacto directamente.

Nota importante sobre `statusNotes`: los campos `statusNotes` de
`eventsConfig`/`menuConfig`/`spacesConfig`/`libraryConfig`/`contactConfig`
son notas internas para quien edita el repositorio, no copy para el
usuario final. Ninguna página los muestra tal cual; cada mensaje sobrio
visible al usuario fue redactado específicamente para este GOAL con tono
editorial, no copiado de esos campos internos.

## 5. SEO y semántica

- **Metadata por página**: las 6 páginas exportan `metadata` con `title`
  y `description` propios (confirmado, ver §2).
- **Un solo `<h1>` por página**: cada página usa `SectionHeader
  titleAs="h1"` una única vez como encabezado principal; el resto de
  títulos usa `<h2>` (dentro de `Card`s) — verificado por grep, ver
  §validaciones.
- **Secciones semánticas**: cada página usa `<section>` para cada bloque
  (encabezado, contenido principal, CTA), igual que el home.
- **Cards/listas**: se usan `Card` para categorías/eventos/espacios/menú y
  `<ul>`/`<li>` para listas de canales de contacto y sedes.
- **Navegación pública compartida**: las 6 páginas reciben el mismo
  `navbar`/`footer` que el home (misma marca, mismos `navItems`, mismo
  CTA), por lo que la navegación es consistente en todo el sitio.

## 6. Qué NO se hizo en este GOAL

- No se modificó el home (`app/page.tsx`).
- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocó Supabase.
- No se tocó middleware (`middleware.ts` no fue leído para modificarse,
  solo revisado para confirmar que su matcher no necesita cambios).
- No se tocó auth, dashboard, perfil ni admin.
- No se agregaron rutas al middleware.
- No se creó lógica cliente (`"use client"` en ninguna de las 6 páginas).
- No se agregaron links a login/register.
- No se inventaron datos comerciales (teléfonos, direcciones, precios,
  fechas, horarios, aforos, correos, links de WhatsApp/Instagram/Maps).

## 7. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Las 6 páginas repiten el mismo bloque `navbar`/`footer` línea por línea (duplicación intencional de este GOAL) | Alta | Bajo | Aceptado explícitamente por la tarea ("no crees helpers compartidos en otro archivo en este GOAL"); un GOAL futuro puede extraer un helper de layout público si la duplicación se vuelve difícil de mantener |
| `/agenda` y `/menu` pueden percibirse como "ya completas" aunque son solo categorías genéricas | Media | Medio | Cada página incluye explícitamente un mensaje de que el contenido detallado se publicará/actualizará próximamente |
| `/reservas` no tiene ningún canal de reserva funcional (solo redirige a `/contacto`) | Alta | Medio | Es el estado real y honesto de los datos hoy; se resuelve cuando `contactConfig`/`data/contact.ts` tenga un canal confirmado |
| Sin acceso visible a `/login`/`/register` en ninguna de estas páginas (mismo riesgo ya aceptado en GOAL 09) | Alta | Bajo | Ya aceptado explícitamente por el usuario en GOAL 09; queda para el GOAL de navegación/comunidad |

## 8. Checklist para GOAL 11

Dos opciones posibles, sin ejecutar ninguna todavía:

**Opción A — Revisar y ajustar navegación/comunidad**
- Decidir si se agrega un link discreto a `/login` o `/register`.
- Definir el texto ("Mi cuenta", "Comunidad", "Ingresar").
- No contaminar la navegación comercial con lenguaje de "app"/SaaS.

**Opción B — Crear componentes de cards de dominio**
- `EventCard`
- `MenuItemCard`
- `SpaceCard`
- `BookCategoryCard`

**Recomendación**: priorizar la **Opción B** antes que la A. Las 6 rutas
de este GOAL ya repiten manualmente el mismo patrón de tarjeta (`Card` +
`Badge` + título + descripción) en `/agenda`, `/menu`, `/reservas`,
`/espacios` y `/libreria` — extraer `EventCard`/`MenuItemCard`/
`SpaceCard`/`BookCategoryCard` reduce esa duplicación real y ya existente
antes de que crezca más. La decisión de navegación/comunidad (Opción A)
es una decisión de producto que puede tomarse en cualquier momento y no
se vuelve más cara si se pospone un GOAL más.

## 9. Recomendación final

El proyecto está listo para avanzar a GOAL 11 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Se recomienda ejecutar la Opción B (cards de dominio) primero, dado el
  nivel real de duplicación visual ya presente en estas 6 páginas.
- La Opción A (navegación/comunidad) debe resolverse antes de considerar
  el sitio "completo" de cara al usuario final, pero no bloquea el avance
  técnico del proyecto.
