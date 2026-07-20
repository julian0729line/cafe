# Cards de Dominio — Café Valparaíso Web

GOAL 11. Documenta los 4 componentes de tarjeta específicos por dominio
(`components/cards/`) y la refactorización de las 5 páginas públicas que
tenían el mismo patrón `Card + Badge + título + descripción` repetido a
mano desde GOAL 10.

## 1. Objetivo del GOAL 11

Reducir la duplicación visual detectada en GOAL 10 (cada página pública
repetía manualmente `Card` + `Badge` condicional + `<h2>`/`<h3>` +
descripción condicional) creando un componente de tarjeta por dominio
(evento, ítem de menú, espacio, categoría de librería), y usarlos en las
5 páginas donde aplica, sin cambiar contenido, CTAs ni intención visual.

## 2. Componentes creados

| Componente | Archivo | Dominio | Props principales | Uso actual | Uso futuro |
|---|---|---|---|---|---|
| `EventCard` | `components/cards/EventCard.tsx` | Agenda cultural | `title`, `category?`, `dateLabel?`, `description?`, `href?`, `ctaLabel?` | `/agenda` (estado con eventos, hoy vacío) | Se poblará cuando `data/events.ts` tenga `featuredEvents` reales |
| `MenuItemCard` | `components/cards/MenuItemCard.tsx` | Menú/carta | `title`, `category?`, `description?`, `href?`, `ctaLabel?` | `/menu` | Listo para carta real vía `data/menu.ts`, sin campo de precio |
| `SpaceCard` | `components/cards/SpaceCard.tsx` | Espacios/reservas | `title`, `description?`, `tag?`, `href?`, `ctaLabel?` | `/reservas` y `/espacios` | Listo para sedes reales vía `data/spaces.ts` |
| `BookCategoryCard` | `components/cards/BookCategoryCard.tsx` | Librería La Maga | `title`, `description?`, `tag?`, `href?`, `ctaLabel?` | `/libreria` | Listo para curaduría/categorías reales vía `data/library.ts` |

Los 4 son Server Components (sin `"use client"`), sin barrel export.

## 3. Páginas refactorizadas

| Página | Archivo | Card usada | Qué duplicación se eliminó | Riesgo | Validación |
|---|---|---|---|---|---|
| `/agenda` | `app/agenda/page.tsx` | `EventCard` | Bloque `Card + Badge + <h2> + dateLabel + description` repetido por evento | Bajo (estado vacío no usa la card, sigue igual) | `lint`, `build`, `tsc`, grep, revisión visual |
| `/menu` | `app/menu/page.tsx` | `MenuItemCard` | Bloque `Card + Badge + <h2> + description` repetido por ítem | Bajo | ídem |
| `/reservas` | `app/reservas/page.tsx` | `SpaceCard` | Bloque `Card + Badge condicional + <h2> + description` repetido por espacio | Bajo | ídem |
| `/espacios` | `app/espacios/page.tsx` | `SpaceCard` | Mismo bloque que `/reservas` | Bajo | ídem |
| `/libreria` | `app/libreria/page.tsx` | `BookCategoryCard` | Bloque `Card + <h2> + description` repetido por categoría | Bajo | ídem |

`app/contacto/page.tsx` no fue tocado: no tiene un patrón de tarjeta
repetido por lista (usa dos `Card` de contenido distinto, cada una
única), por lo que ninguna de las 4 cards nuevas aplica ahí.

Cambio menor de semántica: los títulos de cada tarjeta dentro de estos
bloques pasaron de `<h2>` (competían entre sí dentro de la misma sección)
a `<h3>` (dentro de las cards nuevas), lo cual es más correcto
jerárquicamente bajo el `<h1>` de `SectionHeader` — no afecta el
invariante de un solo `<h1>` por página ni cambia el contenido visible.

## 4. Principios aplicados

- **`docs/SISTEMA_DISENO.md`**: cada card reutiliza las variantes de
  `Card` ya definidas por dominio (`dark` para agenda/espacios, `paper`
  para menú —Modo Papel—, `outline` para librería), sin introducir
  ningún color o sombra nuevos.
- **`docs/COMPONENTES_UI.md`**: las 4 cards son composiciones puras de
  `Card` + `Badge` + `LinkButton`, sin reimplementar estilos a mano.
- **`docs/RUTAS_PUBLICAS.md`**: la refactorización cierra exactamente la
  duplicación que ese documento (§7 y §8) había señalado como riesgo y
  como recomendación para este GOAL.
- **Veracidad comercial**: ninguna card introduce un campo de precio,
  fecha, dirección o aforo; todos los campos son opcionales y se ocultan
  si no llegan (`category?`, `dateLabel?`, `description?`, `tag?`,
  `href?`).
- **Accesibilidad**: cada card usa `<h3>` para su título (jerarquía
  correcta bajo el `<h1>` de la página), y el CTA (cuando existe) es un
  `LinkButton` real con el `:focus-visible` global heredado de GOAL 05.
- **Mantenibilidad**: las 5 páginas ahora expresan su lista de tarjetas
  en una sola línea por campo (`<EventCard title=... category=... />`),
  en vez de ~10 líneas de JSX repetido por cada elemento.

## 5. Decisiones técnicas

- **Por qué no se usó `"use client"`**: las 4 cards son presentacionales
  puras (props → JSX), sin estado ni efectos; igual que el resto del
  sistema de componentes desde GOAL 05.
- **Por qué no se instalaron paquetes**: no hacía falta ninguna
  dependencia nueva; las cards son composición directa de componentes UI
  ya existentes.
- **Por qué no se creó barrel export**: instrucción explícita del GOAL;
  además mantiene el patrón de imports directos ya usado en todo el
  proyecto desde GOAL 05.
- **Por qué no se modificó `data/` ni `content/`**: las cards son
  puramente de presentación; las páginas siguen siendo responsables de
  adaptar `null` → `undefined` antes de pasar props (mismo patrón de
  GOAL 09/10), sin que las cards necesiten saber nada sobre el origen de
  los datos.
- **Por qué cada card acepta props simples**: cada prop corresponde 1:1 a
  un campo ya existente en el tipo de datos de su dominio
  (`FeaturedEvent`, `MenuPreviewLine`, `SpacePreviewLine`,
  `libraryCategories`), sin agregar campos nuevos como `price` o
  `capacity` que el propio GOAL prohíbe explícitamente.
- **Cómo se evitó renderizar `null`/`pending`**: cada campo opcional se
  renderiza condicionalmente (`{description ? ... : null}`); ninguna card
  imprime la palabra `null`, `undefined` ni `pending` en el DOM.
- **Cómo se evitó inventar datos**: las cards no tienen ningún valor por
  defecto para `category`, `dateLabel`, `description`, `tag` o `href`
  (todos son `undefined` si no se pasan); el único default es
  `ctaLabel = 'Ver más'`, que es texto de interfaz, no un dato comercial.

## 6. Qué NO se hizo en este GOAL

- No se modificó el home (`app/page.tsx`).
- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocó Supabase.
- No se tocó middleware.
- No se tocó auth, dashboard, perfil ni admin.
- No se crearon rutas nuevas.
- No se agregaron rutas al middleware.
- No se agregaron links a `/login` ni `/register`.
- No se modificó `data/` ni `content/`.
- No se inventaron datos comerciales (teléfonos, direcciones, precios,
  fechas, horarios, aforos, correos, links externos).

## 7. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Cambio de `<h2>` a `<h3>` en títulos de tarjeta pase desapercibido y alguien lo interprete como regresión | Baja | Bajo | Documentado explícitamente en §3; es una mejora de jerarquía semántica, no una regresión |
| Las 4 cards se usen a futuro con datos que sí incluyan precio/aforo, tentando a agregar esos campos directamente a la card | Media | Medio | Las cards no tienen esos campos por diseño; cualquier adición debe pasar por una revisión explícita de veracidad comercial, no solo un cambio de props |
| `/contacto` quede "desalineada" visualmente al no tener su propia card de dominio | Baja | Bajo | Es correcto: `/contacto` no tiene una lista repetida de elementos, no necesita una card de dominio |

## 8. Checklist para GOAL 12

Tres opciones evaluadas, ninguna ejecutada en este GOAL:

- **Opción A — Navegación/comunidad**: definir acceso discreto a
  `/login`/`/register`, resolver el hueco funcional de GOAL 09.
- **Opción B — SEO y metadata avanzada**: metadata global, Open Graph,
  descripciones por ruta, sitemap/robots.
- **Opción C — Optimización mobile y QA visual**: auditar mobile, ajustar
  espacios, revisar contraste, verificar navegación horizontal.

**Recomendación**: priorizar la **Opción B (SEO y metadata avanzada)**.
Las 6 rutas públicas ya existen y cada una exporta su propio `title`/
`description`, pero ninguna tiene Open Graph, sitemap ni robots.txt — es
la base técnica que hace que el sitio sea indexable y compartible
correctamente, y es independiente de decisiones de producto (a
diferencia de la Opción A) y de trabajo visual iterativo (Opción C). La
Opción C es más valiosa una vez haya más contenido real que auditar
visualmente; la Opción A sigue sin bloquear nada técnico.

## 9. Recomendación final

El proyecto está listo para avanzar a GOAL 12 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Si se elige la Opción B, revisar primero qué metadata ya provee
  `app/layout.tsx` (GOAL 09 no lo tocó) para no duplicar `openGraph`/
  `twitter` que ya existan ahí.
- Si se elige la Opción A en su lugar, resolver primero el copy exacto
  ("Mi cuenta" vs. "Comunidad" vs. "Ingresar") antes de tocar
  `PublicNavbar`/`PublicFooter`.
