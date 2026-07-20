# SEO y Metadata — Café Valparaíso Web

GOAL 12. Documenta la capa SEO técnica añadida al sitio: utilidad
compartida (`lib/seo.ts`), metadata global (`app/layout.tsx`), metadata
por ruta pública, `robots.ts` y `sitemap.ts`. Sin inventar dominio,
contacto ni ningún otro dato comercial.

## 1. Objetivo del GOAL 12

Dejar el sitio "presentable" para buscadores y para compartir enlaces
(Google, redes sociales) sin tocar producto ni contenido comercial:
metadata tipada y consistente en las 7 páginas públicas, Open Graph y
Twitter Card por ruta, URL canónica por ruta, `robots.txt` que protege
las rutas privadas, y `sitemap.xml` con solo las rutas públicas
comerciales.

## 2. Archivos creados

| Archivo | Propósito | Riesgo | Validación |
|---|---|---|---|
| `lib/seo.ts` | Utilidad SEO compartida: `getBaseUrl()` y `createPageMetadata()` | Bajo (sin dependencias nuevas, sin estado) | `tsc`, uso real en 7 páginas + `robots.ts`/`sitemap.ts` |
| `app/robots.ts` | Genera `/robots.txt` | Bajo | `build`, verificado con `curl` en dev |
| `app/sitemap.ts` | Genera `/sitemap.xml` | Bajo | `build`, verificado con `curl` en dev |
| `docs/SEO_METADATA.md` | Este documento | Ninguno | N/A |

## 3. Archivos modificados

| Archivo | Cambio | Motivo | Riesgo | Validación |
|---|---|---|---|---|
| `data/site.ts` | Se agregaron `siteUrl: null`, `locale`, `defaultLocale`, `seo.titleTemplate`, `seo.defaultTitle` | Campos SEO estructurales que la tarea permitía agregar; sin inventar dominio | Bajo | `tsc` |
| `app/layout.tsx` | Metadata global reescrita con `title.template`/`title.default`, `metadataBase`, `keywords`, `openGraph`, `twitter`, `robots`, todo desde `siteConfig` | La metadata anterior seguía usando la marca vieja ("Café Literario — 16 años...", pre-rebrand); se actualizó a `siteConfig` | Medio (cambia el `<title>` global) | `build`, verificado con `curl` en dev |
| `app/page.tsx` | Se agregó `export const metadata` (el home no tenía ninguna) usando `createPageMetadata` + `title: { absolute: ... }` para no duplicar el sufijo de marca | El home nunca había tenido metadata propia desde GOAL 09 | Bajo | ídem |
| `app/agenda/page.tsx` | Metadata manual reemplazada por `createPageMetadata({ title: 'Agenda cultural', ... })` | Reutilizar la utilidad SEO en vez de objetos `Metadata` ad-hoc | Bajo | ídem |
| `app/menu/page.tsx` | ídem, `title: 'Menú'` | ídem | Bajo | ídem |
| `app/reservas/page.tsx` | ídem, `title: 'Reservas'` | ídem | Bajo | ídem |
| `app/libreria/page.tsx` | ídem, `title: 'Librería La Maga'` | ídem | Bajo | ídem |
| `app/espacios/page.tsx` | ídem, `title: 'Espacios'` | ídem | Bajo | ídem |
| `app/contacto/page.tsx` | ídem, `title: 'Contacto'` | ídem | Bajo | ídem |

Ninguna de estas páginas cambió su contenido visual, sus CTAs, su `<h1>`
ni su lista de imports de UI/cards existentes salvo por la línea de
metadata.

## 4. Metadata global

`app/layout.tsx` ahora define, a nivel de toda la aplicación:

- `title`: objeto con `template: '%s | Café Valparaíso'` y
  `default: 'Café Valparaíso'` — cada página hija solo aporta su título
  corto (`'Agenda cultural'`, `'Menú'`, etc.) y Next.js compone el título
  final (`"Agenda cultural | Café Valparaíso"`).
- `description`, `keywords`, `applicationName`, `creator`: todos desde
  `siteConfig` (marca, no una persona inventada).
- `metadataBase`: resuelto vía `getBaseUrl()` (ver §8).
- `openGraph`/`twitter`: valores por defecto (título/descr. de marca,
  `locale: 'es_CO'`, `siteName`), que cada página sobrescribe con los
  suyos vía `createPageMetadata`.
- `robots: { index: true, follow: true }` por defecto.

## 5. Metadata por ruta

| Ruta | Title (renderizado) | Description | Canonical | Open Graph | Twitter Card |
|---|---|---|---|---|---|
| `/` | `Café Valparaíso` (sin sufijo, vía `title.absolute`) | "Café Valparaíso reúne cultura, gastronomía y literatura en un mismo espacio en Cali, Colombia." | `/` | title/description propios, `type: website` | `summary_large_image` |
| `/agenda` | `Agenda cultural \| Café Valparaíso` | "Consulta la agenda cultural de Café Valparaíso: clubes de lectura, música, conversaciones y encuentros culturales en Cali." | `/agenda` | ídem | ídem |
| `/menu` | `Menú \| Café Valparaíso` | "Conoce las líneas gastronómicas de Café Valparaíso: café, cocina, coctelería y postres en un espacio cultural en Cali." | `/menu` | ídem | ídem |
| `/reservas` | `Reservas \| Café Valparaíso` | "Información para reservar encuentros, celebraciones y actividades en Café Valparaíso, en Cali." | `/reservas` | ídem | ídem |
| `/libreria` | `Librería La Maga \| Café Valparaíso` | "Librería La Maga reúne curaduría literaria, clubes de lectura y conversación alrededor de los libros en Café Valparaíso." | `/libreria` | ídem | ídem |
| `/espacios` | `Espacios \| Café Valparaíso` | "Conoce los espacios de Café Valparaíso para encuentros privados, actividades culturales y celebraciones en Cali." | `/espacios` | ídem | ídem |
| `/contacto` | `Contacto \| Café Valparaíso` | "Canales oficiales de contacto de Café Valparaíso. La información comercial confirmada se actualizará en esta página." | `/contacto` | ídem | ídem |

Todo verificado renderizado en navegador real (`curl` sobre `npm run
dev`): `<title>`, `<link rel="canonical">`, `og:title`, `og:description`,
`og:url`, `og:site_name`, `og:locale`, `og:type`, `twitter:card`,
`twitter:title`, `twitter:description` presentes y correctos en `/agenda`
(muestreo representativo).

Ninguna página incluye imagen Open Graph (`og:image`/`twitter:image`):
no existe ninguna imagen confirmada en `public/` apta para ese uso (solo
iconos genéricos de la plantilla `create-next-app` y `public/media/`
vacío salvo su `README.md`), y la tarea prohíbe explícitamente
inventar una.

## 6. Sitemap

`app/sitemap.ts` incluye únicamente las 7 rutas públicas comerciales:

```text
/
/agenda
/menu
/reservas
/libreria
/espacios
/contacto
```

Excluye explícitamente (por omisión, nunca se listan):

```text
/login
/register
/dashboard
/perfil
/admin
/auth/callback
```

Cada entrada tiene `url` (vía `getBaseUrl()`), `lastModified` (fecha
actual real, `new Date()` — nunca una fecha de evento inventada),
`changeFrequency` (`weekly` para home/agenda, `monthly` para el resto) y
`priority` (1 para home, 0.6–0.8 para el resto). Verificado generado
correctamente en `/sitemap.xml` durante `npm run build` y en dev.

## 7. Robots

`app/robots.ts` genera:

```text
User-Agent: *
Allow: /
Disallow: /dashboard
Disallow: /perfil
Disallow: /admin

Sitemap: <baseUrl>/sitemap.xml
```

Se permite el crawling general (`Allow: /`) y solo se desaconsejan
explícitamente las 3 rutas protegidas por middleware
(`/dashboard`, `/perfil`, `/admin`). `/login` y `/register` no están
deshabilitadas (son técnicamente rastreables, tal como permite la
tarea), pero tampoco se promueven en ningún lado: no aparecen en el
`sitemap.xml` ni reciben ningún link nuevo desde este GOAL.

## 8. Manejo de dominio/canonical

- **No se encontró ningún dominio de producción confirmado** en el repo:
  se revisaron `README.md`, `DEPLOY.md`, `render.yaml`, `netlify.toml`,
  `.env.example` y `package.json` — todos usan plantillas genéricas
  (`xxx.onrender.com`, `xxx.netlify.app`) o simplemente no mencionan un
  dominio fijo. Por eso `data/site.ts` define `siteUrl: null`.
- **`NEXT_PUBLIC_SITE_URL`**: `getBaseUrl()` en `lib/seo.ts` lo usa como
  primera opción (`process.env.NEXT_PUBLIC_SITE_URL`), de modo que basta
  con configurar esa variable en el hosting real (Render/Netlify) para
  que todo el canonical/OG/sitemap/robots apunte al dominio correcto sin
  tocar código.
- **Fallback técnico**: si no hay `NEXT_PUBLIC_SITE_URL` ni
  `siteConfig.siteUrl`, se usa `http://localhost:3000` — solo para que
  `metadataBase`, `robots.ts` y `sitemap.ts` compilen y funcionen en
  desarrollo. Este fallback nunca se muestra en la UI (no hay ningún
  texto visible que lo referencie) y no es un dato comercial.
- **Pendiente para producción**: en cuanto exista un dominio real,
  configurar `NEXT_PUBLIC_SITE_URL` en el entorno de despliegue (o
  reemplazar `siteUrl: null` en `data/site.ts` si se prefiere fijarlo en
  código) — ningún otro archivo necesita cambiar.

## 9. Manejo de datos pendientes

Verificado por grep en todos los archivos creados/modificados de este
GOAL: no se inventó ningún teléfono, dirección, precio, fecha, horario,
aforo, correo, WhatsApp, Instagram ni enlace de Maps. Las descriptions
usan únicamente los textos sobrios ya sugeridos/aprobados por la tarea
(agenda cultural, líneas gastronómicas, espacios para encuentros,
curaduría literaria, canales de contacto pendientes de confirmar), sin
ningún claim de autoridad ("el mejor café de Cali", "la librería más
importante", etc.).

## 10. Qué NO se hizo en este GOAL

- No se tocó Supabase.
- No se tocó middleware.
- No se tocó autenticación.
- No se tocó dashboard, perfil ni admin.
- No se crearon rutas nuevas.
- No se agregaron rutas al middleware.
- No se agregaron links a `/login` ni `/register`.
- No se agregó analytics.
- No se agregaron pixels.
- No se inventaron datos comerciales.
- No se instalaron paquetes.

## 11. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El cambio de `<title>` global (de "Café Literario — 16 años..." a "Café Valparaíso") sorprenda si alguien tenía el título viejo indexado/guardado | Baja | Bajo | Es una corrección de deuda preexistente (la marca ya era "Café Valparaíso" desde GOAL 04), no una regresión |
| Sin `og:image`, los enlaces compartidos en redes se ven sin imagen de vista previa | Alta | Medio | Documentado explícitamente; requiere una imagen real en `public/` que hoy no existe — no se puede resolver sin inventar un asset |
| `siteUrl: null` + sin `NEXT_PUBLIC_SITE_URL` en producción haría que canonical/OG/sitemap apunten a `localhost` en el sitio real | Media | Alto | Documentado en §8 como pendiente explícito; requiere una sola variable de entorno al desplegar, sin tocar código |
| `robots.ts` permite crawlear `/login`/`/register` (no están en `Disallow`) | Baja | Bajo | Es el comportamiento pedido explícitamente por la tarea; esas rutas no tienen datos sensibles, solo formularios públicos |

## 12. Checklist para GOAL 13

Tres opciones evaluadas:

- **A — Navegación/comunidad**: resolver acceso discreto a `/login`/
  `/register`, decidir copy ("Mi cuenta", "Ingresar", "Comunidad").
- **B — QA visual mobile**: auditar responsive, overflow, navegación
  horizontal, capturas mobile/desktop, legibilidad.
- **C — Datos reales del negocio**: completar contacto, sedes, horarios,
  menú, agenda y librería con información confirmada.

**Recomendación**: priorizar la **Opción C (datos reales del negocio)**
tan pronto el negocio pueda entregarlos, porque es el cuello de botella
real que impide que todo lo construido en GOAL 08-12 (data, contenido,
metadata, SEO) muestre información definitiva. Mientras esos datos no
lleguen, la **Opción B (QA visual mobile)** es la más productiva a
continuación: ya hay 7 páginas reales que auditar visualmente, y no
depende de ninguna decisión de negocio pendiente. La Opción A puede
esperar: es una decisión de producto aislada, sin dependencias técnicas.

## 13. Recomendación final

El proyecto está listo para avanzar a GOAL 13 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Si se elige la Opción C, coordinar con el negocio antes de tocar
  `data/contact.ts`/`data/events.ts`/`data/menu.ts`/etc., para no volver
  a caer en datos aproximados.
- Si se elige la Opción B en su lugar, usar las 7 rutas ya existentes
  como alcance completo de la auditoría (no hace falta esperar más
  contenido para revisar layout/espaciado/contraste).
- Configurar `NEXT_PUBLIC_SITE_URL` en el entorno de despliegue real
  tan pronto exista un dominio, para que el SEO de este GOAL surta efecto
  completo en producción.
