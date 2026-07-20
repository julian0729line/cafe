# Arquitectura Modular — Café Valparaíso Web

**GOAL 02 · Contrato de arquitectura** · Fecha: 2026-07-02 · Base: `docs/AUDITORIA.md` (commit `75056bc`)

Este documento es el **contrato** que gobierna los GOALs 03–15. Ningún GOAL posterior debería
contradecirlo; si un GOAL necesita desviarse, primero se actualiza este documento y se explica por qué.

---

## 1. Objetivo de la arquitectura

**Problema que resuelve.** La auditoría (GOAL 01) confirmó que el proyecto es técnicamente sano,
pero su organización bloquea la evolución hacia la web oficial de Café Valparaíso:

- `app/page.tsx` (317 líneas) concentra orquestación **y** todo el contenido comercial (menú con
  precios, testimonios, horarios, contacto). Editar un precio hoy = editar código de una página.
- La marca "Café Literario / Desde 2008" está repetida en **12 archivos**: el rebranding es
  imposible de hacer con seguridad sin una fuente única.
- Los 17 componentes viven en una carpeta plana (`app/components/`) sin taxonomía: no se sabe qué
  es primitiva, qué es sección y qué es infraestructura de auth.
- No existen las rutas comerciales (agenda, menú, reservas, librería, espacios, contacto), y sin
  una arquitectura definida cada ruta nueva multiplicaría el desorden (6 copias más de nav/footer).

**Por qué antes de rediseñar.** Rediseñar sobre la estructura actual duplicaría contenido y
componentes; refactorizar después del rediseño costaría el doble y arriesgaría auth. El orden
correcto es: contrato (este doc) → carpetas (03) → datos (08) → sistema UI (04-06) → construcción (07-10).

---

## 2. Principios rectores

**Técnicos**
1. **No romper la cadena de auth** (middleware → factories → callback → páginas protegidas). Se toca solo en GOALs dedicados (11/14) y con QA en ambos modos.
2. **Invariante de build**: `npm run build` debe pasar **sin variables de entorno** después de cada cambio. Es lo que garantiza deploys infalibles (modo "escaparate").
3. **Server Components por defecto**; `"use client"` solo en hojas que lo exigen (motion, formularios, hooks de navegador).
4. **Una sola fuente de verdad por concepto**: marca en `data/site.ts`, navegación en `data/navigation.ts`, menú en `data/menu.ts`.
5. **Profundidad justa**: carpetas por rol, sin atomic design, sin barrels (`index.ts`), sin abstracciones especulativas. Si una carpeta tendría <2 archivos reales, no se crea todavía.

**Visuales**
6. **El contenido es dato; el diseño es componente.** Cero textos de negocio, precios u horarios dentro de JSX.
7. **Tokens antes que hex**: los colores viven en `@theme` (`globals.css`); los componentes nuevos no introducen hex arbitrarios.
8. **Accesibilidad no negociable**: tintes accesibles sobre oliva, `prefers-reduced-motion` con apagado centralizado, `:focus-visible`, targets táctiles ≥44px.

**Comerciales**
9. **La web pública es la prioridad**: agenda, menú, reservas, La Maga, sedes y contacto son el producto; el área de socios es un complemento que ya funciona y no debe frenar nada.
10. **Mantenible por una persona no técnica**: cambiar un precio, un horario o un evento = editar una línea en `data/`, nunca un componente.

---

## 3. Separación entre zona pública y zona protegida

| Zona | Rutas | Características | Reglas |
|---|---|---|---|
| **Pública / comercial** | `/`, `/agenda`, `/menu`, `/reservas`, `/libreria`, `/espacios`, `/contacto` | Server Components, contenido desde `data/`+`content/`, **funcionan sin variables de entorno**, indexables (SEO) | **NUNCA** en el matcher del middleware. **NUNCA** importan Supabase. Comparten `PublicNavbar`/`PublicFooter` |
| **Auth** | `/login`, `/register`, `/auth/callback` | Client pages (formularios) + route handler. Con env: formularios; sin env: vista "Muy pronto" | En el matcher (redirigen a `/dashboard` si ya hay sesión). Solo estas páginas + callback importan `utils/supabase/client` en zona no protegida |
| **Protegida / socios** | `/dashboard`, `/perfil`, `/perfil/editar`, `/admin` | Server Components con datos de sesión (admin: gate de rol dentro de la página). `noindex` | En el matcher. Solo ellas importan `utils/supabase/server`. Navbar propia (futuro `MemberShell`), **no** el nav público |

**Qué no debe mezclarse:** componentes de `ui/`, `layout/`, `sections/`, `cards/` y `motion/`
sirven a cualquier zona pero **no conocen Supabase ni la sesión**. Un componente visual que
necesite saber si hay usuario debe recibirlo por props desde la página. La única excepción
autorizada existente: `Nav` y `page.tsx` leen `isSupabaseConfigured` (un booleano de build, no un
cliente) para ocultar los enlaces de socios en modo escaparate — permitido porque no toca red ni sesión.

---

## 4. Estructura propuesta de carpetas (árbol definitivo)

Evaluación de la propuesta del brief: **correcta en lo esencial; se adopta con 6 ajustes** (ver §4.1).

```text
cafe/
├── app/                          # SOLO rutas, layout, template y estilos globales
│   ├── layout.tsx                #   fuentes + metadata (leerá de data/site.ts en GOAL 08)
│   ├── template.tsx              #   transición de página (NO tocar)
│   ├── globals.css               #   tokens @theme + capa de utilidades (se amplía en GOAL 04)
│   ├── page.tsx                  #   home: SOLO orquestación de secciones (~60 líneas objetivo)
│   ├── agenda/page.tsx           #   ┐
│   ├── menu/page.tsx             #   │ rutas comerciales (GOAL 10)
│   ├── reservas/page.tsx         #   │ server components, datos de data/
│   ├── libreria/page.tsx         #   │ NUNCA en el matcher del middleware
│   ├── espacios/page.tsx         #   │
│   ├── contacto/page.tsx         #   ┘
│   ├── login/ · register/        #   auth (client pages existentes; no se reescriben)
│   ├── auth/callback/route.ts    #   INTOCABLE fuera de GOALs 11/14
│   ├── dashboard/ · perfil/ · admin/   # zona socios (existentes)
│   ├── sitemap.ts · robots.ts    #   SEO (GOAL 12)
│   └── not-found.tsx             #   404 con diseño propio (GOAL 12/14)
│
├── components/                   # (raíz, fuera de app/) — presentación pura, sin Supabase
│   ├── ui/                       # primitivas: Button, LinkButton, Card, Container,
│   │                             #   SectionHeader, Badge, Eyebrow, MediaSlot, PageHero
│   ├── layout/                   # PublicNavbar, PublicFooter, MemberShell (navbar socios)
│   ├── sections/                 # secciones de página, subcarpeta por ruta:
│   │   ├── home/                 #   HeroSection, HistoriaSection, AmbienteSection,
│   │   │                         #   MenuPreviewSection, TestimoniosSection, UbicacionSection,
│   │   │                         #   CtaFinalSection, PreloaderSection (+ futuras Culture/Library/Spaces preview)
│   │   ├── agenda/ · menu/ · reservas/ · libreria/ · espacios/ · contacto/   # (GOAL 10)
│   ├── cards/                    # EventCard, MenuItemCard, SpaceCard, BookCategoryCard (GOAL 10)
│   ├── motion/                   # Reveal, Counter, Parallax, MagneticButton, ScrollProgress,
│   │                             #   VelocityMarquee (primitivas client de animación)
│   └── auth/                     # AuthAside, AuthFormShell, AuthComingSoon (existentes)
│
├── data/                         # HECHOS estructurados y tipados (la "base de datos estática")
│   ├── site.ts                   #   marca, claim, año, sedes, contacto, WhatsApp, redes, horarios
│   ├── navigation.ts             #   enlaces de navbar + footer (una sola fuente)
│   ├── menu.ts                   #   categorías/platos/precios reales
│   ├── events.ts                 #   agenda cultural (fase 1 estática; fase 2 Supabase)
│   ├── spaces.ts                 #   sedes/espacios con dirección y fotos
│   ├── library.ts                #   Librería La Maga: categorías, curaduría
│   ├── testimonials.ts           #   testimonios reales
│   └── contact.ts                #   canales de contacto y reservas
│
├── content/                      # VOZ editorial por página (titulares, párrafos, CTAs)
│   ├── home.ts · agenda.ts · menu.ts · reservations.ts
│   ├── library.ts · spaces.ts · contact.ts
│   └── auth.ts                   #   citas/copy de login-register (hoy inline en las páginas)
│
├── lib/                          # helpers puros (formatDate, formatPrice, cn) — crear al necesitarse
├── utils/supabase/               # client.ts · server.ts · config.ts — NO SE MUEVE NI SE RENOMBRA
├── middleware.ts                 # INTOCABLE fuera de GOALs 11/14
├── supabase/                     # SQL (setup, admin; futuro: eventos.sql, reservas.sql)
├── public/media/                 # medios reales (videos/fotos) para MediaSlot
└── docs/                         # AUDITORIA.md, este contrato, y los docs de GOALs siguientes
```

### 4.1 Ajustes respecto a la propuesta del brief (con justificación)

1. **Se añade `components/motion/`** — existen ya 6 primitivas de animación puras (Reveal, Counter,
   Parallax, MagneticButton, ScrollProgress, VelocityMarquee) que no son "ui" ni "sections". El brief
   proponía solo `FadeIn/Reveal`; se conserva el inventario real. (`Preloader` NO va aquí: es una
   sección de la home → `sections/home/PreloaderSection`.)
2. **`components/auth/` conserva los 3 componentes reales** (AuthAside, AuthFormShell,
   AuthComingSoon). **Se descarta por ahora** extraer `LoginForm.tsx`/`RegisterForm.tsx` del brief:
   los formularios contienen los handlers de Supabase y separarlos es riesgo de auth sin beneficio
   inmediato. Si algún día se extraen, será en GOAL 11 con QA dedicado.
3. **`MediaSlot` y `PageHero` van a `ui/`**, no a sections: son primitivas reutilizadas por
   varias páginas (PageHero por 4 rutas de socios; MediaSlot por home y futuras rutas).
4. **`data/` y `content/` se mantienen separados** (el brief lo pedía; la hoja de ruta original
   sugería fusionarlos). Decisión final: **separados**, porque el sitio es editorial y la
   distinción "hechos que cambian a menudo" (precios, horarios, eventos) vs. "voz de marca"
   (titulares, párrafos) corresponde a dos modos de edición distintos para una persona no técnica.
   Regla de desempate en §9. Cláusula de escape: si en la práctica la frontera estorba, `content/`
   puede fusionarse dentro de `data/` en un único commit mecánico sin tocar componentes.
5. **`utils/supabase/` no se mueve** (el brief lo mantenía; se confirma y se eleva a regla):
   los imports `@/utils/supabase/*` atraviesan middleware y páginas protegidas; moverlos es
   riesgo de auth sin ganancia. `lib/supabase.ts` (legado, sin importadores) se retira recién en
   GOAL 14, no antes.
6. **No habrá archivos placeholder vacíos.** Las carpetas nacen cuando reciben su primer archivo
   real (git no versiona carpetas vacías). `cards/` y las subcarpetas de sections comerciales se
   crean en GOAL 10; `data/`+`content/` en GOAL 08.

---

## 5. Responsabilidad de cada carpeta

| Carpeta | Responsabilidad | Qué NO debe contener |
|---|---|---|
| `app/` | Rutas (una carpeta por URL), layout raíz, template de transición, estilos globales, sitemap/robots | Componentes reutilizables, contenido de negocio, lógica visual compleja |
| `components/ui/` | Primitivas visuales genéricas y reutilizables en cualquier página (Button, Card, Container, SectionHeader, Badge, Eyebrow, LinkButton, MediaSlot, PageHero) | Textos de negocio, imports de Supabase, conocimiento de rutas concretas |
| `components/layout/` | Cáscara compartida: PublicNavbar, PublicFooter, MemberShell | Contenido inline (los enlaces vienen de `data/navigation.ts`) |
| `components/sections/<ruta>/` | Bloques de página completos, uno por sección visual; componen `ui/` + `motion/` + `cards/` y reciben/leen su contenido de `data/`+`content/` | Primitivas genéricas (van a ui/), fetch a Supabase |
| `components/cards/` | Tarjetas de dominio repetibles en listas (EventCard, MenuItemCard, SpaceCard, BookCategoryCard) | Layout de página, estado global |
| `components/motion/` | Primitivas client de animación puras y reutilizables; todas respetan `useReducedMotion` | Contenido, estilos de marca específicos |
| `components/auth/` | Piezas visuales del flujo de acceso (aside editorial, shell, "Muy pronto") | Handlers de Supabase (viven en las páginas login/register) |
| `data/` | Hechos estructurados tipados: marca, sedes, menú, eventos, navegación, testimonios, contacto | JSX, lógica, textos largos editoriales |
| `content/` | Copy editorial por página: titulares, párrafos, microcopy, CTAs (etiqueta + destino) | Precios, horarios, teléfonos, listas de dominio |
| `lib/` | Funciones puras compartidas (formato de precio/fecha, `cn`) — se crea al haber 2+ usos reales | Clientes de servicios, estado |
| `utils/supabase/` | Factories de cliente (server/client) + flag `isSupabaseConfigured`. **Congelada** | Cualquier cosa nueva; no crece sin GOAL dedicado |
| `docs/` | Contratos y auditorías del proyecto (este archivo, AUDITORIA.md, futuros QA-AUTH, DESIGN-SYSTEM) | Documentación de usuario final |

---

## 6. Convenciones de nombres

| Elemento | Convención | Ejemplos |
|---|---|---|
| Componentes | `PascalCase.tsx`, nombre = qué es | `Button.tsx`, `MediaSlot.tsx` |
| Secciones | Sufijo `Section`, en `sections/<ruta>/` | `HeroSection.tsx`, `EventsListSection.tsx` |
| Cards | Sufijo `Card` | `EventCard.tsx`, `MenuItemCard.tsx` |
| Layout | Prefijo por zona | `PublicNavbar.tsx`, `PublicFooter.tsx`, `MemberShell.tsx` |
| Motion | Nombre del efecto, sin sufijo | `Reveal.tsx`, `Parallax.tsx` |
| Archivos de datos | `camelCase.ts` (aquí: minúscula simple), plural si es lista | `site.ts`, `navigation.ts`, `events.ts` |
| Archivos de contenido | Nombre de la ruta que alimentan | `content/home.ts`, `content/agenda.ts` |
| Rutas (URL) | Español, minúsculas, sin acentos, kebab-case si compuesta | `/agenda`, `/libreria`, `/espacios` |
| Exports de datos | `const` en UPPER_SNAKE para listas, tipos en PascalCase **co-locados en el mismo archivo** | `export type MenuItem = {...}; export const MENU: MenuCategory[] = [...]` en `data/menu.ts` |
| Tipos compartidos | Solo si 2+ archivos de data los comparten → `data/types.ts` (no crear antes) | — |
| Props de componentes | Interface inline o `type Props` local; no carpeta global de tipos | — |
| Un componente por archivo | Sin barrels (`index.ts`); subcomponentes privados pueden convivir en el archivo de su dueño | `Heading()` dentro de `AmbienteSection.tsx` ✔ |

---

## 7. Reglas para Server Components y Client Components

**Regla base: todo es Server Component hasta que algo lo impida.** `"use client"` es una hoja, no
una raíz: se marca el componente más pequeño posible, nunca la página entera (con las excepciones
listadas).

| Caso | Regla |
|---|---|
| Páginas públicas (`/`, comerciales) | **Server.** Componen secciones; las secciones pueden ser client si animan, pero la página no lleva `"use client"` |
| Secciones | Server si son estáticas (p. ej. futuras MenuCategoriesSection); client solo si usan motion orquestado (HeroSection, AmbienteSection). Preferir: sección server que importa hojas de `motion/` |
| Formularios | Client (estado + handlers). Hoy: login, register, perfil/editar. Los formularios comerciales futuros (reservas/contacto) también client, **pero sin Supabase en fase 1** (WhatsApp/mailto) |
| Animaciones | Siempre client, siempre en `components/motion/` o dentro de la sección que las orquesta; siempre con `useReducedMotion` o apagado CSS equivalente |
| Auth (páginas login/register) | **Excepción heredada**: son client pages completas. Se conservan así (funcionan y están probadas); no convertir sin GOAL 11 |
| Dashboard / perfil / admin | Server (leen sesión con `utils/supabase/server`); la server action de logout vive en la página. `perfil/editar` es client (formulario) y su guard está en middleware |
| Componentes visuales puros (ui/, cards/) | Server por defecto. Client únicamente si encapsulan interacción propia (p. ej. un futuro `Button` magnético reutiliza `motion/MagneticButton`) |
| Supabase server vs client | `utils/supabase/server` → SOLO en server components/actions/route handlers de zona protegida y callback. `utils/supabase/client` → SOLO en client pages de auth y formularios de socios. **Jamás en `components/` visuales** |

**Reglas anti-regresión aprendidas en este repo** (obligatorias):
- No llamar `createClient()` en scope de módulo o de render de un client component (rompe el
  prerender sin env). Crearlo **dentro** de handlers/effects. (Caso documentado: `perfil/editar`.)
- No ramificar la **estructura** JSX por `useReducedMotion()` en el primer render (hydration
  mismatch). Patrón aprobado: estructura única + gate `mounted` vía rAF, o apagado por CSS.
- Evitar `setState` síncrono en `useEffect` (regla `react-hooks/set-state-in-effect` activa).
  Patrón aprobado: animar con `duration: 0` (ver `Counter`).
- El contenedor raíz usa `overflow-x-clip` (no `hidden`): `hidden` rompe `position: sticky` del
  scroll horizontal anclado.

---

## 8. Reglas para Supabase y autenticación

**Archivos congelados** (se tocan solo en GOAL 11 —verificación/QA— o GOAL 14 —migración a
`proxy`— y siempre en commit aislado con QA de ambos modos):

| Archivo | Por qué es crítico |
|---|---|
| `middleware.ts` | Único guard de rutas protegidas + modo sin-env. Un error rompe login O rompe el deploy escaparate |
| `utils/supabase/server.ts` / `client.ts` | Factories con `env!`; seguros SOLO porque el middleware garantiza que no se invocan sin credenciales |
| `utils/supabase/config.ts` | `isSupabaseConfigured`: pilar del invariante de build |
| `app/auth/callback/route.ts` | `exchangeCodeForSession`: sin él no se activan cuentas |
| Handlers en `login/register` y server action `logout` en dashboard | Flujo de sesión probado |
| `supabase/*.sql` | RLS + trigger de perfiles; se **añade** SQL nuevo (eventos/reservas) sin editar el existente |

**Reglas duras:**
1. Las rutas comerciales nuevas **NO entran al matcher** del middleware. (Matcher actual:
   `/dashboard/:path*`, `/perfil/:path*`, `/admin/:path*`, `/login`, `/register` — no se amplía.)
2. **Ningún componente de `components/` importa Supabase.** Solo páginas de auth (client), páginas
   protegidas (server), el callback y futuras server actions. Si una sección necesita datos de
   Supabase (agenda fase 2), la **página** hace el fetch y pasa los datos por props.
3. El booleano `isSupabaseConfigured` sí puede importarse desde componentes (es un flag de build,
   no un cliente); usos actuales: `Nav`, `page.tsx`, páginas de auth.
4. El gate de **rol admin** vive dentro de `app/admin/page.tsx` (no en middleware): mantenerlo así
   y replicar el patrón para futuras rutas de administración.
5. Después de CUALQUIER goal que toque archivos compartidos: correr el checklist QA-AUTH
   (login → dashboard → perfil → editar → admin → logout, con env; y redirects/“Muy pronto”, sin env).

---

## 9. Reglas para contenido y datos

**Regla de desempate:** *¿Lo editaría el dueño del café al cambiar la operación del negocio
(precio, horario, evento, teléfono)?* → `data/`. *¿Lo editaría al cambiar cómo habla la marca
(titular, párrafo, tono)?* → `content/`.

| Elemento | Destino | Archivo |
|---|---|---|
| Nombre de marca, claim, año de fundación | `data/` | `site.ts` |
| Teléfonos, email, **WhatsApp** (número + mensaje preformateado) | `data/` | `site.ts` (o `contact.ts` si crece) |
| Sedes (nombre, dirección, mapa, horarios por sede) | `data/` | `site.ts` → `spaces.ts` para el detalle |
| Horarios generales | `data/` | `site.ts` |
| Redes sociales | `data/` | `site.ts` |
| Navegación (navbar + footer, orden, visibilidad) | `data/` | `navigation.ts` |
| Agenda cultural (eventos: título, fecha, lugar, precio) | `data/` | `events.ts` (fase 2: Supabase) |
| Platos del menú (nombre, descripción, precio, categoría) | `data/` | `menu.ts` |
| Categorías/curaduría de Librería La Maga | `data/` | `library.ts` |
| Testimonios (cita, autor, rol) | `data/` | `testimonials.ts` |
| Titulares y párrafos de cada página | `content/` | `home.ts`, `agenda.ts`, … |
| Microcopy y CTAs (etiqueta + href) | `content/` | archivo de su página |
| Citas del panel de auth ("Tu lugar te espera…") | `content/` | `auth.ts` |
| Metadata SEO por página (title/description) | `content/` (leída por `metadata` de cada page) | archivo de su página |
| Textos de sistema del área de socios (labels de formularios, errores) | Se quedan en sus páginas (no son contenido editorial y están acoplados al flujo) | — |

Todo archivo de `data/`/`content/` exporta **tipos + constantes** (`as const` cuando convenga),
sin lógica. Los componentes los importan con `@/data/...` / `@/content/...`.

---

## 10. Sistema visual y UI (organización; implementación en GOALs 04-05)

- **Tokens** (`app/globals.css`, bloque `@theme`): completar los que faltan —
  `--color-text-muted: #A6B86B`, `--color-accent-coral: #FF7F70`, `--color-eyebrow-gold: #C9A227`,
  `--color-cream-soft: #D9DCC4`, `--color-olive-deepest: #2A331A` — y usarlos vía clases de token.
  **Regla: ningún componente nuevo introduce hex arbitrarios** (`text-[#...]` queda congelado y
  se migra progresivamente).
- **Colores**: paleta actual se conserva (oliva/crema/rojo + tintes accesibles). El posible ajuste
  de paleta de Café Valparaíso se hace **en los tokens**, nunca componente a componente.
- **Tipografías**: Playfair Display (display) + DM Sans (cuerpo) vía `next/font` en `layout.tsx`;
  expuestas como `.font-playfair`/`.font-sans-app`. Cambiar tipografía = cambiar `layout.tsx` + 2 clases.
- **Espaciados**: escala Tailwind estándar; secciones `py-24/28/32`; contenedor `max-w-6xl mx-auto px-8`
  (se formaliza en `ui/Container`).
- **Botones** (`ui/Button` + `ui/LinkButton`): variantes `primary` (crema con sombra roja, relleno
  deslizante `.btn-fill`), `outline-red` (pill), `ghost` (subrayado deslizante); prop opcional
  `magnetic` que envuelve con `motion/MagneticButton`. Todas con `.press` (feedback táctil).
- **Cards** (`ui/Card` + `cards/*`): superficie `.tile` (mosaico art-directed) o `bg-red` destacada;
  radios `rounded-[1.25rem]`/`[1.5rem]` (escala existente).
- **Container / SectionHeader / Eyebrow / Badge**: extraen los patrones repetidos hoy (eyebrow
  dorado tracking `.35em`, títulos Playfair con línea roja+oliva).
- **Estados**: hover con transform/opacity (nunca width/height), `:active` `.press`,
  `:focus-visible` global (anillo coral, ya definido).
- **Accesibilidad**: contraste AA con los tintes; toda animación nueva se registra en el bloque
  único `@media (prefers-reduced-motion: reduce)`; un solo `<h1>` por página (corregir `PageHero`
  en GOAL 05: título compuesto = 1 `<h1>` con `<span>`, no 2 `<h1>`).

---

## 11. Estrategia para extraer `app/page.tsx` (GOALs 07-08; NO ejecutar ahora)

Orden seguro, un bloque por commit, la página nunca deja de compilar:

1. **Identificar bloques** (ya inventariados en AUDITORIA §5/§7): Preloader, Hero, Ticker,
   Historia, Ambiente, MenuPreview, Testimonios, Ubicación (+mapa radar), CtaFinal, Footer.
2. **Crear el componente equivalente** en `sections/home/` (o `layout/` para el footer)
   **copiando el JSX tal cual** — sin rediseñar en el mismo paso.
3. **Migrar su contenido** a `content/home.ts` y `data/*` (el componente lo recibe por import o props).
4. **Reemplazar el bloque** en `page.tsx` por `<XSection />`. Un bloque a la vez.
5. **Validar visualmente** contra el baseline de capturas (desktop + móvil) — especial cuidado con
   los 3 bloques con gotchas: Preloader (hydration), AmbienteScroll (sticky + `overflow-x-clip`
   del contenedor raíz), scroll-spy del Nav (ids de sección deben conservarse: `#historia`,
   `#ambiente`, `#menu`, `#ubicacion`, `#contacto`, `#top`).
6. **`npx tsc --noEmit` + `npm run lint` + `npm run build` sin env** después de cada bloque.

Resultado objetivo: `page.tsx` ≤ ~60 líneas (imports + orquestación + ids de sección).

## 12. Estrategia para rutas comerciales nuevas (GOAL 10; NO ejecutar ahora)

Patrón único por ruta: `app/<ruta>/page.tsx` (server) = `metadata` (de `content/<ruta>.ts`) +
`<PublicNavbar/>` + `<XHeroSection/>` + secciones + `<PublicFooter/>`.

| Ruta | Contenido (fuente) | Secciones | Comparte |
|---|---|---|---|
| `/agenda` | `data/events.ts` + `content/agenda.ts` | AgendaHero, EventsList | `EventCard`, PageHero/ui, MediaSlot |
| `/menu` | `data/menu.ts` + `content/menu.ts` | MenuHero, MenuCategories | `MenuItemCard`, patrón `.menu-item` existente |
| `/reservas` | `data/contact.ts` + `content/reservations.ts` | ReservationsHero, ReservationInfo (+CTA WhatsApp) | Button; fase 1 SIN formulario-Supabase |
| `/libreria` | `data/library.ts` + `content/library.ts` | LibraryHero, LibraryCuration | `BookCategoryCard`, MediaSlot |
| `/espacios` | `data/spaces.ts` + `content/spaces.ts` | SpacesHero, SpacesGrid | `SpaceCard`, MediaSlot, mapa |
| `/contacto` | `data/site.ts`/`contact.ts` + `content/contact.ts` | ContactHero, ContactInfo | Button (WhatsApp), horario (patrón HOURS) |

Fases: **F1** estáticas desde `data/` (todas funcionan sin env) → **F2** agenda desde tabla
`eventos` (SQL nuevo + lectura pública; fetch en la página, nunca en componentes) → **F3** reservas
con persistencia si el negocio lo pide (RLS de insert público, GOAL propio).
`PublicNavbar` evoluciona en GOAL 06 para soportar **anclas en `/` + rutas reales** (hoy solo anclas).

## 13. Estrategia para preservar rutas protegidas

1. Los GOALs 03-10 **no editan** la lógica de `/login`, `/register`, `/dashboard`, `/perfil`,
   `/admin`, `/auth/callback` — solo, cuando toque, sus imports (GOAL 03) o su cáscara visual
   (`MemberShell` en GOAL 06, commit aislado).
2. Matcher del middleware: **inmutable** en estos GOALs.
3. Tras cada GOAL que toque archivos compartidos: **QA-AUTH en ambos modos** —
   sin env: `/dashboard|/perfil|/admin` → `/`, `/login|/register` → "Muy pronto";
   con env: flujo completo registro→callback→login→dashboard→perfil→editar→admin→logout.
4. Cualquier cambio en la zona de auth va en **commit propio** titulado como tal, nunca mezclado
   con cambios visuales.
5. El baseline de capturas (GOAL 03, antes de mover nada) incluye las 4 páginas de socios vía
   la técnica de previews temporales ya usada en el proyecto.

## 14. Alias e imports

Ya configurado en `tsconfig.json`: `"paths": { "@/*": ["./*"] }` (raíz). **Suficiente — no se
añaden alias nuevos ni se modifica `tsconfig.json` en esta fase.**

Convención de imports (obligatoria en código nuevo, se normaliza el existente en GOAL 03):

```ts
import { Button } from '@/components/ui/Button'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { SITE } from '@/data/site'
import { HOME } from '@/content/home'
import { createClient } from '@/utils/supabase/server'   // solo zona protegida
```

Reglas: nada de rutas relativas ascendentes (`../../components/...`) en código nuevo; imports
relativos `./` solo entre hermanos del mismo módulo; sin barrels.

## 15. Orden recomendado para GOAL 03 (creación de estructura base)

**Qué se crea:** solo las carpetas que reciben archivos reales al moverlos:
`components/ui/`, `components/layout/`, `components/sections/home/`, `components/motion/`,
`components/auth/`. (**NO** crear aún: `cards/`, `data/`, `content/`, `lib/`, subcarpetas de
sections comerciales — nacen en GOALs 05/08/10 con su primer archivo real. **NO** crear
placeholders vacíos ni `.gitkeep`.)

**Movimientos (solo `git mv` + actualizar imports; cero reescritura interna):**

| Lote | De `app/components/` a | Archivos | Importadores a actualizar |
|---|---|---|---|
| 1 | `components/motion/` | Reveal, Counter, Parallax, MagneticButton, ScrollProgress, VelocityMarquee | `app/page.tsx`, Hero, AmbienteScroll |
| 2 | `components/ui/` | MediaSlot, PageHero | `app/page.tsx`, AmbienteScroll, 4 páginas de socios |
| 3 | `components/auth/` | AuthAside, AuthFormShell, AuthComingSoon | login, register (AuthAside solo lo importa AuthFormShell) |
| 4 | `components/layout/` | Nav → `PublicNavbar.tsx` (solo renombre de archivo; el export puede conservarse como `Nav` hasta GOAL 06) | `app/page.tsx` |
| 5 | `components/sections/home/` | Hero → `HeroSection.tsx`, AmbienteScroll → `AmbienteSection.tsx`, Preloader → `PreloaderSection.tsx` (renombre de archivo; export interno igual) | `app/page.tsx` |

**Qué NO se mueve todavía:** `middleware.ts`, `utils/supabase/*`, `lib/supabase.ts` (legado, se
retira en GOAL 14), `app/template.tsx`, `app/globals.css`, ningún `page.tsx`, ningún contenido.

**Validación por lote (semáforo):** `npx tsc --noEmit` → `npm run lint` → `npm run build` sin env
(11/11) → captura de `/` y una página de socios comparada contra baseline → commit del lote.
Antes del lote 1: generar el **baseline de capturas** (desktop 1440 + móvil 390; con y sin env).

## 16. Criterios de éxito de esta arquitectura

- [ ] Separación física clara: rutas en `app/`, presentación en `components/{ui,layout,sections,cards,motion,auth}`, hechos en `data/`, voz en `content/`.
- [ ] La marca existe en **un solo lugar** (`data/site.ts`); `grep "Café Literario\|Valparaíso"` fuera de `data/`+`content/` devuelve 0 resultados en JSX.
- [ ] `app/page.tsx` ≤ ~60 líneas (solo orquestación); ninguna página concentra contenido.
- [ ] Ningún archivo de `components/` importa `utils/supabase/{server,client}` (verificable con grep).
- [ ] Las rutas protegidas siguen aisladas: matcher intacto, QA-AUTH en verde en ambos modos.
- [ ] `npm run build` pasa **sin variables de entorno** tras cada GOAL (11/11 + rutas nuevas).
- [ ] `npx tsc --noEmit` y `npm run lint` sin errores.
- [ ] Cambiar un precio/horario/sede = editar 1 línea de `data/` sin tocar componentes.
- [ ] Las 6 rutas comerciales existen, comparten navbar/footer y funcionan sin env.
- [ ] Cero hex nuevos fuera de tokens; toda animación nueva registrada en el bloque reduced-motion.

## 17. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Import roto al mover componentes (GOAL 03) | Alta (trivial) | Bajo | `git mv` por lotes + `tsc` como semáforo antes de cada commit |
| Romper cadena de auth por tocar archivo compartido | Media | Alto | Lista de congelados (§8), commits aislados, QA-AUTH ambos modos |
| Perder invariante build-sin-env (p. ej. `createClient()` en render) | Media | Alto | Regla §7; build sin env tras cada lote/GOAL |
| Regresión de Preloader/AmbienteScroll al mover/renombrar | Media | Medio | Mover sin reescribir; gotchas documentados (§7); captura comparada |
| Scroll-spy del Nav roto con rutas nuevas | Alta | Bajo | Rediseño del Nav previsto en GOAL 06 (anclas + rutas) |
| Sobre-fragmentación (carpetas/archivos vacíos, barrels) | Media | Medio | Regla “sin placeholders, sin barrels; carpeta nace con su primer archivo real” |
| Frontera data/content confusa en la práctica | Media | Bajo | Regla de desempate (§9) + cláusula de fusión mecánica (§4.1.4) |
| Divergencia entre este contrato y la ejecución | Media | Medio | Todo GOAL cita este doc; si se desvía, primero se actualiza el contrato |

## 18. Recomendación final

**El proyecto está listo para GOAL 03**, bajo estas condiciones:

1. Generar el **baseline de capturas** (con y sin env, desktop y móvil) antes del primer `git mv`.
2. Ejecutar los movimientos **por lotes** con el semáforo `tsc → lint → build sin env → captura → commit`.
3. Respetar la lista de archivos **congelados** (§8) y no crear placeholders vacíos.
4. En paralelo (no bloqueante): recopilar los **datos reales de Café Valparaíso** (sedes, menú,
   horarios, WhatsApp, La Maga) — insumo del GOAL 08, el de mayor valor comercial.

Este documento queda como contrato: los GOALs 03-15 se redactan y validan contra sus secciones.
