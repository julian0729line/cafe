# Espacios y Reservas — Claude Design

GOAL 21. Reconstrucción editorial de `/espacios` y `/reservas` al nivel
visual de Home, Agenda, Menú y Librería (sistema "Claude Design"), como dos
páginas relacionadas pero con personalidad propia: Espacios vende la
atmósfera, Reservas ordena la intención — sin simular ninguna funcionalidad
transaccional que todavía no existe.

## 1. Objetivo

Transformar `/espacios` (de un grid de 3 cards genéricas de tipos de uso) y
`/reservas` (de un grid idéntico + una caja "Cómo funciona") en dos
secuencias editoriales de cinco actos cada una, honestas sobre lo que sí y
no está confirmado: dos sedes sin dirección/capacidad, cuatro tipos de
encuentro, y ningún backend de reservas real.

## 2. Auditoría inicial

**Fuentes de datos reales encontradas**:
- `data/spaces.ts` — `spacesPreview` (4 tipos de encuentro confirmados:
  Encuentros privados, Celebraciones, Reuniones, Actividades culturales,
  cada uno con `tag`/`description`, `status: 'pending'`) y `spacesConfig`
  (`sedes: ['Pance', 'Juanambú']`, sin descripción/dirección/capacidad por
  sede; `statusNotes` confirma que aforos, tarifas y disponibilidad no
  están confirmados).
- `data/contact.ts` — `contactConfig.locations` (Pance y Juanambú, `city`,
  `address: null`, `mapsUrl: null`, `notes: "Dirección pendiente de
  confirmar."`) y `contactConfig.reservationChannels` (un único canal:
  `{ label: 'Formulario de contacto', href: '/contacto', status: 'pending' }`).
- `docs/DATOS_NEGOCIO_FASE_1.md` confirma explícitamente que `spacesPreview`
  está documentado para renderizar tanto en `/espacios` como en `/reservas`
  (línea "Tipos de espacio ... → `/espacios`, `/reservas`, home"), lo que
  respalda reutilizar el mismo dato confirmado en ambas páginas sin
  inventar una segunda fuente.

**Componentes existentes relacionados**: `components/cards/SpaceCard.tsx`
(card genérica con badge + descripción + CTA opcional, usada antes en ambas
páginas). Se reutilizó su semántica de datos (título, tag, descripción),
pero no el componente en sí — se sentía repetitivo entre `/espacios` y
`/reservas` y demasiado cercano a una card inmobiliaria/e-commerce.

**Assets locales disponibles**: ninguno. `public/media/` solo contiene
`valparaiso-home.mp4` y su `README.md` (assets del hero del Home, GOAL
anterior). No hay fotografía de Pance ni Juanambú.

**Lógica real de reservas encontrada**: **ninguna**. Se buscó
exhaustivamente:
- Sin rutas en `app/api/`.
- Sin `'use server'` / Server Actions relacionadas con reservas.
- Sin tabla de reservas en `supabase/setup.sql` (solo existe `perfiles`,
  para el área privada de usuario — no relacionada).
- El único "canal" real es la ruta `/contacto`, ya usada como destino del
  botón "Reservar" del navbar (`publicNavigation.cta`) y como
  `reservationChannels[0].href`.

**Limitaciones detectadas**: sin capacidad, tarifa, consumo mínimo, abono,
política de cancelación, horario, WhatsApp, teléfono ni correo confirmados
en ningún archivo de datos. Ver §22.

## 3. Dirección artística general

Se mantiene el sistema Claude Design: fondo profundo `#181f0d`, marfil
`#F5F5F0`, olivas, rojo editorial `#C1121F`, coral `#FF7F70` sobre fondo
oscuro, Playfair Display + DM Sans, grano sutil (`.grain-soft`), radios
pequeños, espacio negativo. Ninguna clase nueva en `app/globals.css`: todo
se resolvió con las utilidades ya existentes y Tailwind inline.

## 4. Dirección de Espacios

Visita editorial y arquitectónica: marcos y líneas finas (CSS puro, sin
plano técnico ni medidas) en vez de la «M» tipográfica ya usada en
Librería. Composición asimétrica (sedes alternadas izquierda/derecha),
ritmo amplio, narrativa de lugar. Secuencia de fondos: oscuro → marfil →
oscuro → marfil → oscuro, distinta de la de Librería (oscuro → marfil →
oscuro → oliva → rojo).

## 5. Arquitectura de `/espacios`

`app/espacios/page.tsx` es Server Component: solo mapea `spacesConfig.sedes`
+ `contactConfig.locations` (para las sedes) y `spacesPreview` (para las
ocasiones) con `.map()`, sin modificar ninguna fuente. Los cinco
componentes nuevos en `components/sections/espacios/` son Server Components
puros — sin `"use client"`, sin estado, sin listeners.

## 6. Hero de Espacios

`SpacesHero.tsx`: fondo `#181f0d`, recurso arquitectónico abstracto
(marcos y líneas finas superpuestas, `aria-hidden`, ocultos en mobile para
evitar cualquier riesgo de overflow) en vez de un plano técnico o medidas
inventadas. Único `<h1>`: "Espacios para *encontrarnos.*" (copy exacto
autorizado). CTA real a `/reservas` ("Solicitar una reserva").

## 7. Sedes y espacios

`SpacesLocationsSection.tsx` consume `spacesConfig.sedes` cruzado con
`contactConfig.locations` para obtener `city`. Por cada sede solo se
muestra **nombre y ciudad** — los únicos campos confirmados: sin dirección
(`null`), sin capacidad (no existe el campo), sin fotografía (no hay
archivo local). Composición tipográfica alternada (Pance con borde
superior, Juanambú desplazada a la derecha con borde lateral en desktop)
en vez de una cuadrícula uniforme. Una nota de cierre honesta ("Capacidad,
disponibilidad y condiciones... se confirman por contacto") sustituye
cualquier campo vacío o "por definir".

## 8. Ocasiones

`SpacesOccasionsSection.tsx` consume `spacesPreview` tal cual (los 4 tipos
confirmados), en un módulo de dos columnas con divisores de borde
izquierdo — ni la card original, ni la fila de ancho completo ya usada en
Agenda/Menú/Librería. Sin bodas, conferencias ni otro uso no confirmado.
Cierra con un CTA real ("Ir a reservas" → `/reservas`).

## 9. Dirección de Reservas

Página más precisa, funcional y ordenada que Espacios: lectura secuencial,
jerarquía informativa, narrativa de proceso. Secuencia de fondos: oscuro →
marfil → oscuro → oliva con borde rojo → oscuro. Sin recurso decorativo
dominante en el hero (a diferencia de Espacios).

## 10. Arquitectura de `/reservas`

`app/reservas/page.tsx` es Server Component: mapea `spacesPreview` (mismo
dato confirmado que Espacios, documentado para ambas rutas en
`docs/DATOS_NEGOCIO_FASE_1.md`) con `.map()`. Los cinco componentes nuevos
en `components/sections/reservas/` son Server Components puros.

## 11. Hero de Reservas

`ReservationsHero.tsx`: comunica explícitamente que una reserva **comienza
con una solicitud** que se revisa, nunca con una confirmación inmediata.
Sin formulario en el hero. Copy exacto: "Organicemos *tu encuentro.*" No usa
ninguna de las frases prohibidas ("Reserva confirmada", "Disponibilidad
inmediata", "Elige fecha y paga", "Confirmación automática").

## 12. Opciones

`ReservationsOptionsSection.tsx` reutiliza `spacesPreview` (el mismo dato
real de Espacios) en filas compactas de lectura secuencial — deliberadamente
distintas del grid de dos columnas de `SpacesOccasionsSection`, para que
ambas páginas no compartan estructura aunque compartan la fuente de datos.

## 13. Proceso

`ReservationsProcessSection.tsx` usa exactamente la estructura conceptual
autorizada: "01 — Cuéntanos sobre tu encuentro. / 02 — Revisamos los
detalles. / 03 — Confirmamos contigo las condiciones." Sin afirmar tiempos
de respuesta, bloqueo automático de fecha ni pago en línea.

## 14. Condiciones

`ReservationsConditionsSection.tsx`: ninguna política (personas, consumo
mínimo, abono, cancelación, horarios) está confirmada en `data/spaces.ts`
ni `data/contact.ts`, así que la sección completa se reduce a la línea
neutral exacta autorizada: "Las condiciones se confirman de acuerdo con
las características de cada solicitud." — sin listar categorías de política
que insinúen valores ya definidos. Mismo patrón visual (caja con borde rojo
sobre oliva) ya validado en `AgendaStatusSection`/`LibraryEncountersSection`,
reutilizado con contenido propio, sin acordeón.

## 15. Canales y CTA

Prioridad seguida: (1) ninguna ruta propia de reservas existe en el
proyecto; (2) `contactConfig.reservationChannels[0]` apunta a `/contacto`;
(3) `/contacto` (misma ruta). El cierre de Reservas usa "Hablar con el
equipo" → `/contacto` (describe la acción real, no promete confirmación ni
pago) y "Ver espacios" → `/espacios` como cierre del círculo entre ambas
páginas.

## 16. Fuente de datos

`data/spaces.ts` (`spacesPreview`, `spacesConfig`) y `data/contact.ts`
(`contactConfig.locations`, `contactConfig.reservationChannels`), sin
modificar ninguno de los dos. `data/site.ts`, `data/navigation.ts` se
consumen solo para navbar/footer, igual que en las páginas ya aprobadas.

## 17. Responsive

Auditado en 360×740, 390×844, 768×1024, 1280×900 y 1440×1000 en ambas
rutas: cero overflow horizontal en las diez combinaciones. El recurso
arquitectónico del hero de Espacios está oculto en mobile (`hidden
md:block`), así que nunca genera overflow. Una columna en mobile, CTA
reales a 44-52.5px de alto, orden de lectura lógico en ambas páginas.

## 18. Accesibilidad

- Un solo `<h1>` y un solo `<main>` por ruta, verificado en los 5
  viewports de cada una.
- Skip link verificado por teclado en ambas rutas: `Tab` enfoca "Saltar al
  contenido principal", `Enter` mueve el foco a `<main id="contenido-principal">`.
- `aria-current="page"` correcto en "Espacios" dentro del navbar. En
  `/reservas` es `null` porque "Reservas" nunca fue un ítem del navbar
  (`data/navigation.ts`): solo existe como el botón CTA "Reservar"
  (`publicNavigation.cta`), un patrón preexistente no modificado en este
  GOAL — comportamiento correcto, no una regresión.
- Cero enlaces vacíos ni `href="#"`.
- Decoración (`grain-soft`, marcos/líneas) con `aria-hidden="true"`.
- Sin controles falsos: las filas de ocasiones/opciones son elementos no
  interactivos sin `tabIndex` artificial.

## 19. Performance

- `/espacios` y `/reservas` **siguen prerenderizando estáticas** (`○`).
- Cero Client Components nuevos, cero listeners, cero recursos externos.
- Sin imágenes (ninguna existe localmente); cero riesgo de imagen rota.
- Sin layout shift, sin dependencias nuevas, `package.json` intacto.

## 20. Archivos creados

- `components/sections/espacios/SpacesHero.tsx`
- `components/sections/espacios/SpacesIntroductionSection.tsx`
- `components/sections/espacios/SpacesLocationsSection.tsx`
- `components/sections/espacios/SpacesOccasionsSection.tsx`
- `components/sections/espacios/SpacesClosingSection.tsx`
- `components/sections/reservas/ReservationsHero.tsx`
- `components/sections/reservas/ReservationsOptionsSection.tsx`
- `components/sections/reservas/ReservationsProcessSection.tsx`
- `components/sections/reservas/ReservationsConditionsSection.tsx`
- `components/sections/reservas/ReservationsClosingSection.tsx`
- `docs/ESPACIOS_RESERVAS_CLAUDE_DESIGN.md` (este documento)

## 21. Archivos modificados

- `app/espacios/page.tsx` (recompuesto con las cinco secciones nuevas).
- `app/reservas/page.tsx` (recompuesto con las cinco secciones nuevas).

## 22. Archivos eliminados

- `components/sections/espacios/.gitkeep`
- `components/sections/reservas/.gitkeep`

(ambos directorios dejaron de estar vacíos).

## 23. Datos pendientes

- Dirección exacta, mapa y horario de cada sede.
- Capacidad/aforo por sede o por tipo de espacio.
- Tarifas, consumo mínimo, abono, política de cancelación.
- Canal directo de reservas (WhatsApp, teléfono, correo, o un formulario
  funcional con backend real).
- Fotografía real de Pance y Juanambú.

## 24. Protección de páginas aprobadas

Confirmado mediante `git diff --stat` antes de este documento:

- **Home intacto**: `app/page.tsx`, `content/home.ts` sin diff.
- **Hero intacto**: `components/sections/home/` sin diff.
- **Video intacto**: `public/media/valparaiso-home.mp4`,
  `public/media/README.md`, `docs/HERO_VIDEO_REAL.md` sin diff.
- **Agenda intacta**: `app/agenda/page.tsx`, `components/sections/agenda/`
  sin diff.
- **Menú intacto**: `app/menu/page.tsx`, `components/sections/menu/` sin
  diff.
- **Librería intacta**: `app/libreria/page.tsx`,
  `components/sections/libreria/`, `docs/LIBRERIA_CLAUDE_DESIGN.md` sin
  diff.
- **Contacto intacto**: `app/contacto/page.tsx` sin diff.
- **`data/` y `content/` intactos**: sin diff en ningún archivo de esas
  carpetas.
- **Auth, Supabase, middleware intactos**: no se tocó ningún archivo de
  autenticación, `utils/supabase/`, `middleware.ts` ni `supabase/*.sql`.
- **`package.json` y lockfile intactos**: sin diff; no se instaló ninguna
  dependencia.

## 25. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Sin fotografía real de las sedes, ambas páginas dependen enteramente de tipografía/CSS | Alta | Bajo | Decisión editorial deliberada, coherente con Librería (que tampoco usa fotos inventadas) |
| El único canal de reservas es `/contacto`, que a su vez no tiene un formulario real todavía | Alta | Medio | Documentado explícitamente en §26; el CTA nunca promete un envío o confirmación que no existe |
| `spacesPreview` se reutiliza en Espacios y Reservas con distinta presentación: podría sentirse repetitivo si un usuario visita ambas páginas seguidas | Media | Bajo | Los layouts son deliberadamente distintos (grid de 2 columnas vs. filas compactas) y cada uno cumple un propósito distinto (para qué sirven los espacios vs. qué puedes solicitar) |
| La sección de Condiciones es muy breve (una sola línea) por falta de políticas confirmadas | Media | Bajo | Es preferible a inventar cifras; el tono es deliberado y editorial, no un placeholder |

## 26. Funcionalidad futura de reservas

- **No existe backend real** para solicitudes de reserva: sin ruta en
  `app/api/`, sin Server Action, sin tabla en Supabase.
- **No existe un formulario funcional**: ni en `/reservas` ni en
  `/contacto`. Ambas páginas solo enlazan a canales que hoy son, en el
  mejor de los casos, un enlace a `/contacto` sin campos de contacto
  confirmados (WhatsApp, teléfono y correo están en `null`).
- **Qué falta para reservas transaccionales**: (1) definir el canal real
  (WhatsApp Business, correo, o un formulario con Server Action + tabla en
  Supabase); (2) confirmar capacidades, tarifas y políticas por sede; (3)
  si se opta por un formulario propio, decidir su arquitectura (Server
  Action + validación server-side vs. un Client Component aislado, del
  mismo modo que `ScrollExpansionHero` es la única hoja cliente del Home).
- **Qué no se simuló**: ningún envío, disponibilidad, calendario,
  confirmación, pago, cotización automática ni estado de carga. Todos los
  CTA de este GOAL apuntan a rutas reales (`/reservas`, `/espacios`,
  `/contacto`) sin ninguna interacción falsa.

## 27. Recomendación para GOAL 22

Con Home, Agenda, Menú, Librería, Espacios y Reservas ya reconstruidos, el
siguiente bloque natural es **Contacto**: es la página que finalmente
recibe todo el tráfico que Espacios y Reservas ya dirigen hacia ella. Antes
de rediseñarla visualmente, valdría la pena resolver primero (fuera de
alcance de diseño, a nivel de negocio/datos) al menos un canal de contacto
real (WhatsApp, teléfono o correo) en `data/contact.ts`, porque sin eso
`/contacto` seguirá mostrando el mismo estado "pendiente de confirmar" que
heredan Espacios y Reservas. Si el negocio no puede confirmar un canal
todavía, GOAL 22 puede igualmente aplicar el mismo método (auditoría real,
dirección artística propia, documentación) sin inventar ninguno.
