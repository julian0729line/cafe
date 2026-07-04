# Data y Content — Café Valparaíso Web

GOAL 08. Documenta la primera capa ordenada de datos (`data/`) y contenido
(`content/`) que alimentará, en un GOAL posterior, las secciones de
`components/sections/home/` y el layout público de `components/layout/`.
Ninguno de estos archivos está conectado todavía a `app/page.tsx` ni a
ningún componente.

## 1. Objetivo del GOAL 08

Sacar el contenido del código: crear archivos tipados y centralizados en
`data/` (marca, navegación, contacto, agenda, menú, espacios, librería) y
`content/` (textos estructurados del home) para que una persona no técnica
pueda editar el contenido real más adelante sin tocar componentes. Se
aplicó una regla estricta de veracidad: ningún dato comercial exacto no
confirmado en el repo fue inventado.

## 2. Archivos creados

| Archivo | Propósito | Export principal | Datos confirmados | Datos pendientes |
|---|---|---|---|---|
| `data/site.ts` | Configuración de marca | `siteConfig` | Nombre, ciudad, país, concepto (genéricos de trabajo) | `legalName`, `foundedLabel` (`null`) |
| `data/navigation.ts` | Navegación pública futura | `publicNavigation` | Estructura de items y CTA | Las rutas (`/agenda`, `/menu`, etc.) aún no existen como páginas |
| `data/contact.ts` | Datos de contacto | `contactConfig` | Ciudad principal | `whatsapp`, `phone`, `email`, `instagram`, `locations`, `maps` (todos `null`/vacíos) |
| `data/events.ts` | Agenda cultural | `eventCategories`, `featuredEvents`, `eventsConfig` | Categorías genéricas | `featuredEvents` vacío: sin eventos, fechas ni precios |
| `data/menu.ts` | Estructura gastronómica | `menuCategories`, `menuPreviewItems`, `menuConfig` | Categorías y líneas genéricas | Sin precios ni platos específicos |
| `data/spaces.ts` | Espacios y reservas | `spacesPreview`, `spacesConfig` | Líneas genéricas de espacio | Sin aforos, precios ni sedes |
| `data/library.ts` | Librería La Maga | `libraryCategories`, `libraryConfig` | Categorías de línea editorial | Sin inventario, autores ni horarios |
| `content/home.ts` | Textos estructurados del home | `homeContent` | Composición de los datos anteriores por sección | Hereda los mismos pendientes de `data/` |

## 3. Principios aplicados

- **Arquitectura modular** (`docs/ARQUITECTURA_MODULAR.md`): `data/` y
  `content/` son las dos zonas que ya estaban reservadas desde GOAL 03
  para esta separación; no se usó ninguna otra carpeta.
- **Separación entre presentación y contenido**: ningún archivo de esta
  capa importa React ni componentes; son datos puros, tal como exige el
  GOAL. Las secciones de GOAL 07 seguirán resolviendo su propio fallback
  hasta que un GOAL futuro las conecte a `homeContent`.
- **Veracidad comercial**: se verificó por grep que ningún archivo nuevo
  contiene patrones de teléfono, precio, correo o link inventado (ver
  §validaciones). El único dato de contacto que ya existía en el repo
  (`contacto@cafeliterario.com · +57 300 000 0000`, en el `app/page.tsx`
  actual) es en sí mismo un placeholder obviamente ficticio — no se tomó
  como fuente de verdad y no se replicó aquí.
- **Mantenibilidad para una persona no técnica**: los archivos son objetos
  y arrays planos con nombres de campo descriptivos en español/inglés
  simple, sin lógica de negocio ni funciones; cada archivo con datos
  pendientes trae su propio `statusNotes` explicando qué falta.
- **Preparación para rutas comerciales futuras**: `publicNavigation` y los
  `ctaHref` de cada archivo apuntan a `/agenda`, `/menu`, `/reservas`,
  `/libreria`, `/espacios`, `/contacto` — rutas que aún no existen como
  páginas, tal como exige este GOAL.

## 4. Decisiones de modelado

- **Por qué `data/` y `content/` se separan**: `data/` guarda estructuras
  reutilizables y neutrales (marca, navegación, contacto, catálogos por
  categoría) que podrían usarse desde cualquier página futura, no solo el
  home. `content/home.ts` compone esos datos en la forma exacta que
  necesita cada sección del home (textos de eyebrow/título/descripción +
  los arrays de `data/`), y es el único archivo de contenido "por página".
- **Qué vive en `data/`**: catálogos y configuración (`siteConfig`,
  `publicNavigation`, `contactConfig`, categorías/listas de agenda, menú,
  espacios, librería).
- **Qué vive en `content/`**: textos editoriales ya compuestos y listos
  para pasar como props a una sección concreta (`homeContent.hero`,
  `homeContent.about`, etc.).
- **Por qué no se conectó nada a `app/page.tsx`**: el GOAL pide
  explícitamente crear y validar esta capa de forma aislada antes de que
  un GOAL posterior decida cómo reemplazar el contenido hoy incrustado en
  la landing.
- **Por qué no se usaron datos falsos**: cualquier dato comercial exacto
  (teléfono, WhatsApp, dirección, precio, fecha, horario, aforo, link)
  que no estuviera ya confirmado de forma fidedigna en el repo se dejó en
  `null`, array vacío, o con `status: 'pending'` — nunca inventado.
- **Cómo se manejarán datos pendientes**: cada archivo con huecos trae un
  campo `statusNotes` (string legible) explicando qué falta, además de los
  propios `null`/`status: 'pending'` a nivel de campo, para que quien
  edite el archivo sepa exactamente qué reemplazar.
- **Cómo se preparan rutas futuras sin crearlas todavía**: todos los
  `href` usan las rutas ya acordadas en GOALs anteriores
  (`/agenda`, `/menu`, `/reservas`, `/libreria`, `/espacios`,
  `/contacto`) como texto plano; no se creó ningún archivo bajo `app/`
  para esas rutas.
- **Nota técnica sobre `null` vs. props opcionales**: los componentes de
  GOAL 05/07 declaran sus campos opcionales como `string | undefined`
  (`description?: string`), no `string | null`. Esta capa usa `null` de
  forma deliberada (por instrucción explícita del GOAL) para marcar
  "pendiente de confirmar" de forma más explícita que `undefined`. Como
  `content/home.ts` no importa los tipos de props de los componentes,
  esto no genera conflicto de tipos en este GOAL; **el GOAL que conecte
  esta capa a las secciones deberá decidir** si transforma `null` →
  `undefined` en el punto de conexión o si amplía los tipos de props para
  aceptar `null` explícitamente.

## 5. Datos pendientes por confirmar

El negocio debe suministrar, antes de publicar contenido real:

- Teléfono.
- WhatsApp.
- Instagram.
- Correo electrónico.
- Direcciones / sedes.
- Horarios.
- Menú real (platos y precios).
- Agenda cultural real (eventos y fechas).
- Salones/espacios reales y sus condiciones.
- Aforos.
- Políticas de reserva.
- Link de Google Maps.
- Link(s) de canal de reservas.
- Textos legales (términos, política de datos, `legalName`).

## 6. Guía rápida de uso futuro

```ts
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { homeContent } from '@/content/home'
```

No se modificó ninguna página existente para usarlos: son datos listos,
no conectados.

## 7. Qué NO se hizo en este GOAL

- No se modificó `app/page.tsx`.
- No se modificó `app/layout.tsx`.
- No se modificó `app/globals.css`.
- No se tocaron rutas.
- No se tocó Supabase.
- No se tocó middleware.
- No se conectó contenido a componentes.
- No se crearon rutas comerciales.
- No se inventaron teléfonos, direcciones, precios, fechas, horarios,
  aforos ni links.

## 8. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `null`/`status: 'pending'` se publiquen por error como contenido real si alguien conecta esta capa sin revisar | Media | Alto | Cada archivo trae `statusNotes` explícito; este documento lista los pendientes en §5 |
| Desajuste de tipos entre `data/`/`content/` (`null`) y las props de las secciones (`undefined`) al conectar en GOAL 09 | Alta | Bajo | Documentado en §4; se resuelve en el propio GOAL de conexión, no aquí |
| El placeholder ficticio ya existente en `app/page.tsx` (`+57 300 000 0000`) se confunda con un dato real al migrar contenido | Baja | Medio | Señalado explícitamente en §3; esta capa no lo reutilizó |
| Categorías genéricas (menú, agenda, espacios) generen expectativa de que ya hay contenido real | Media | Bajo | `statusNotes` y este documento dejan claro que son categorías de trabajo, no inventario real |

## 9. Checklist para GOAL 09

**GOAL 09 — Rediseño modular de la página principal `/`.**

- Importar `PublicShell` (`components/layout/PublicShell.tsx`).
- Importar las 7 secciones de `components/sections/home/`.
- Importar `homeContent` (`content/home.ts`) y pasar sus sub-objetos como
  props de cada sección.
- Importar `publicNavigation` para alimentar `PublicNavbar` vía
  `PublicShell`.
- Importar `contactConfig`/`siteConfig` para alimentar `PublicFooter`.
- Reemplazar progresivamente el contenido de `app/page.tsx` (decidir si es
  reemplazo total o convivencia con las secciones ya existentes —
  riesgo señalado en `docs/SECCIONES_HOME.md` §7).
- Validar que la página siga teniendo un solo `<h1>` (lo aporta
  `HeroSection`).
- Validar visualmente en navegador (mobile y desktop).
- Validar `lint`/`build`/`tsc`.
- No tocar autenticación, dashboard, perfil ni admin.

## 10. Recomendación final

El proyecto está listo para avanzar a GOAL 09 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit.
- GOAL 09 debe resolver explícitamente, antes de escribir código, el
  desajuste `null`/`undefined` señalado en §4 (decidir transformación en
  el punto de uso vs. ampliar tipos de props).
- GOAL 09 debe decidir explícitamente cómo conviven las secciones nuevas
  con el contenido equivalente que hoy ya existe en `app/page.tsx`, en
  vez de simplemente apilar ambos.
