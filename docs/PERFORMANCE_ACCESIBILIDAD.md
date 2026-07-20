# Performance y Accesibilidad Técnica — Café Valparaíso Web

GOAL 14. Documenta la auditoría técnica de accesibilidad y performance
básica de las 7 rutas públicas, y las correcciones aplicadas: skip link,
`<main>` enfocable, tap targets bajo 44px en navbar/botones, y
`aria-current` en la navegación activa.

## 1. Objetivo del GOAL 14

Cerrar los pendientes técnicos de accesibilidad detectados en GOAL 13
(tap targets bajo el ideal de 44px) y auditar de forma sistemática
landmarks, foco, jerarquía de headings, contraste y performance básica
del sitio público, sin tocar contenido comercial, sin rediseñar y sin
instalar dependencias.

Herramienta usada: Playwright/Chromium contra `npm run dev`, con
mediciones programáticas (overflow, conteo de `<h1>`/`<main>`,
`aria-current`, cajas de tap target, foco por teclado) y un cálculo de
contraste WCAG (fórmula de luminancia relativa) sobre los pares de color
reales usados en el sistema de diseño.

## 2. Rutas auditadas

| Ruta | Viewports revisados | Landmarks | H1 | Overflow | Foco | Tap targets | Estado final |
|---|---|---|---|---|---|---|---|
| `/` | 5 obligatorios | 1 header, 1 main, 1 footer, 2 nav (nombrados) | 1 | Sin overflow | Skip link + `:focus-visible` OK | ≥44px tras fix | OK |
| `/agenda` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |
| `/menu` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |
| `/reservas` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |
| `/libreria` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |
| `/espacios` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |
| `/contacto` | ídem | ídem | 1 | Sin overflow | ídem | ídem | OK |

Verificado con 35 combinaciones (7 rutas × 5 viewports): 0 con overflow,
0 con conteo de `<h1>` distinto de 1, 0 con conteo de `<main>` distinto
de 1 (todas con `id="contenido-principal"` y `tabindex="-1"`).

## 3. Hallazgos principales

**Accesibilidad**: no existía skip link ni forma de mover el foco
directamente al contenido principal; el `<main>` no tenía `id` ni era
enfocable programáticamente. Los enlaces de navegación (~31px de alto) y
el CTA `sm`/`md` de botones (~35px y ~42.5px) quedaban por debajo del
tap target ideal de 44px. La navegación no indicaba semánticamente cuál
era la página activa (`aria-current`).

**Performance**: las 7 rutas públicas siguen prerenderizando como
estáticas (`○`); ninguna página pública usa `"use client"`, estado local,
efectos ni importa Supabase o `next/navigation`. No se detectaron
imágenes inexistentes, loops de datos inflados ni imports pesados
innecesarios.

**Navegación**: única área con correcciones reales de accesibilidad en
este GOAL (skip link vive en `PublicShell`, tap targets y `aria-current`
viven en `PublicNavbar`/`Button`).

**Footer**: estructura semántica ya correcta desde GOAL 06 (columnas
como `<nav aria-label>`, listas `<ul>`/`<li>`); no requirió cambios.

**Cards** (`EventCard`, `MenuItemCard`, `SpaceCard`, `BookCategoryCard`):
ya usaban `<h3>` correctamente desde GOAL 11; no requirieron cambios.

**Secciones home**: jerarquía de headings ya correcta (`<h1>` único en
`HeroSection`, `<h2>` vía `SectionHeader`, `<h3>` en tarjetas internas);
no requirieron cambios.

**Mobile**: tras el ajuste de `min-h-11`, los enlaces de navegación y
botones `sm`/`md` alcanzan 44px de alto real en 390px de ancho, sin
alterar el layout ni provocar overflow (reverificado en las 35
combinaciones).

## 4. Correcciones aplicadas

| Archivo | Problema detectado | Cambio aplicado | Motivo | Riesgo | Validación |
|---|---|---|---|---|---|
| `components/layout/PublicShell.tsx` | Sin skip link; `<main>` no enfocable | Se agregó `<a href="#contenido-principal">Saltar al contenido principal</a>` (con `sr-only focus:not-sr-only`, oculto hasta recibir foco) antes del navbar; `<main>` ahora tiene `id="contenido-principal"` y `tabIndex={-1}`; se agregó `activeHref` al tipo del prop `navbar` para pasarlo a `PublicNavbar` | Patrón estándar WCAG de "bypass blocks" (2.4.1); permite a usuarios de teclado saltar la navegación repetida | Bajo: solo visible/enfocable al usar teclado, no cambia el layout visual por defecto | Verificado con Playwright: primer `Tab` enfoca el skip link (visible), `Enter` mueve el foco a `<main>` (`document.activeElement.id === 'contenido-principal'`); antes de foco, el link mide 1×1px fuera de pantalla |
| `components/layout/PublicNavbar.tsx` | Enlaces de navegación con ~31px de alto (bajo 44px); sin indicación semántica de página activa | Se agregó `min-h-11` + `inline-flex items-center` a los enlaces de navegación (antes `block`); se agregó prop `activeHref` y `aria-current={item.href === activeHref ? 'page' : undefined}` por enlace | Tap target más cercano al estándar de 44px; `aria-current="page"` es el atributo ARIA correcto para indicar la página actual sin necesitar `next/navigation` (cada página ya conoce su propia ruta estática) | Bajo: cambio de alto (+13px aprox.) sin alterar tipografía, color ni el patrón de scroll horizontal ya validado en GOAL 13 | Medido con Playwright: alto real pasa de 31px a 44px; re-auditadas las 35 combinaciones, 0 con overflow; verificado 1 `aria-current="page"` por ruta (excepto `/reservas`, que no tiene ítem de nav propio — ver §9) |
| `components/ui/Button.tsx` | Tamaños `sm` (~35px) y `md` (~42.5px) de `buttonSizeClasses` bajo 44px | Se agregó `min-h-11` a `sm` y `md` (se dejó `lg` sin cambios, ya mide ≥44px) | Componente compartido usado por `Button` y `LinkButton` en todo el sitio (CTA del navbar, CTAs de secciones y páginas); corregir aquí resuelve el problema para todos los consumidores a la vez | Bajo: solo agrega alto mínimo, `buttonBaseClasses` ya centra el contenido (`items-center justify-center`) | Medido: CTA `sm` del navbar pasa de 35px a 44px; CTA `md` ("Escríbenos") pasa de 42.5px a 44px; revisión visual (capturas) confirma que no se ve desproporcionado |
| `app/page.tsx`, `app/agenda/page.tsx`, `app/menu/page.tsx`, `app/reservas/page.tsx`, `app/libreria/page.tsx`, `app/espacios/page.tsx`, `app/contacto/page.tsx` | La navegación no podía indicar la página activa sin conocer la ruta actual | Se agregó `activeHref: '/'` / `'/agenda'` / etc. al objeto `navbar` que cada página ya le pasa a `PublicShell` | Cada Server Component conoce su propia ruta de forma estática (es la carpeta en la que vive), por lo que no hace falta `next/navigation` ni lógica de cliente | Ninguno: un literal de string adicional por página, sin lógica nueva | Verificado: 30/30 combinaciones no-`/reservas` muestran exactamente 1 `aria-current="page"`; `/reservas` correctamente 0 (no es un ítem de navegación, ver §9) |

## 5. Archivos modificados

- `components/layout/PublicShell.tsx` — skip link + `<main>` enfocable + prop `activeHref`.
- `components/layout/PublicNavbar.tsx` — tap targets + `aria-current`.
- `components/ui/Button.tsx` — tap targets `sm`/`md` (afecta `LinkButton` también, que reexporta las mismas clases).
- `app/page.tsx`, `app/agenda/page.tsx`, `app/menu/page.tsx`, `app/reservas/page.tsx`, `app/libreria/page.tsx`, `app/espacios/page.tsx`, `app/contacto/page.tsx` — cada uno agrega su propio `activeHref` al `navbar`.

Ningún otro archivo permitido en este GOAL (`PublicFooter`, `Card`,
`Badge`, `SectionHeader`, `Container`, `Input`, `Textarea`, cards de
dominio, secciones home) requirió cambios: la auditoría no encontró
problemas reales de accesibilidad o performance en ellos (ver §9 para
el detalle de por qué no se tocaron).

## 6. Archivos no modificados deliberadamente

Confirmado por `git status` — no se tocaron:

- Supabase (`utils/supabase/*`, `lib/supabase.ts`).
- `middleware.ts`.
- Auth, dashboard, perfil, admin.
- `data/`.
- `content/`.
- `package.json`.

## 7. Performance

- Las 7 rutas públicas siguen prerenderizando como estáticas (`○`) tras
  el build, igual que antes de este GOAL.
- No se introdujo JS de cliente: ninguna página ni componente modificado
  usa `"use client"`, `useState`, `useEffect` ni ningún hook.
- No se instaló ningún paquete (`package.json` sin cambios).
- No se referenció ninguna imagen inexistente; no se tocó `public/`.
- `/robots.txt` y `/sitemap.xml` se generan correctamente en el build
  (`○ /robots.txt`, `○ /sitemap.xml`), sin cambios respecto a GOAL 12.
- No se introdujo ningún `Date.now()` ni valor dinámico nuevo en páginas
  públicas; el único uso de fecha dinámica (`new Date()` en
  `app/sitemap.ts` y en el `copyright` del footer) ya existía desde
  GOAL 09/12 y no se tocó.
- Advertencia ya conocida y sin cambios: `middleware` sigue marcado como
  convención deprecada por Next.js (migración a `proxy` sugerida),
  deuda preexistente fuera de alcance de este GOAL.

## 8. Accesibilidad

- **Skip link**: implementado en `PublicShell`, oculto (`sr-only`) hasta
  recibir foco de teclado; al activarse mueve el foco a `<main>`.
  Verificado funcional con Playwright.
- **Landmarks**: exactamente 1 `<header>`, 1 `<footer>`, 2 `<nav>` por
  página (navbar principal + columna "Explora" del footer), cada uno con
  `aria-label` distinto — sin landmarks duplicados o sin nombre.
- **`<main>`**: exactamente 1 por página, con `id="contenido-principal"`
  y `tabIndex={-1}` para ser el destino válido del skip link.
- **H1 único**: verificado en las 35 combinaciones, siempre 1.
- **Focus visible**: la regla global `:focus-visible` (GOAL 04) sigue
  intacta y se verificó funcionando sobre el primer enlace de navegación
  tras el cambio de tap targets.
- **Tap targets**: enlaces de navegación y botones `sm`/`md` ahora miden
  44px de alto real (antes 31-42.5px); botones `lg` ya cumplían.
- **Links discernibles**: todos los enlaces del sitio tienen texto visible
  descriptivo (ningún "click aquí" ni ícono sin `aria-label`); los CTA
  con solo icono no existen en el sitio actual.
- **Navbar accesible**: `<nav aria-label="Navegación principal">` ya
  existía; se sumó `aria-current="page"` en el enlace correspondiente a
  la ruta activa.
- **Footer accesible**: estructura ya correcta desde GOAL 06, sin
  cambios necesarios.
- **Contraste**: se identificaron y verificaron matemáticamente
  (fórmula WCAG de luminancia relativa) los 10 pares de color
  texto/fondo realmente usados en el sistema (texto sobre Modo Noche,
  Modo Papel, badges, botones, footer) — los 10 pasan WCAG AA (ratio
  mínimo encontrado: 4.62:1, la mayoría entre 5:1 y 15:1). No se detectó
  ningún par de color real por debajo de AA; no se requirió ningún ajuste
  de color.

## 9. Problemas no corregidos

- **`/reservas` no tiene item propio en `publicNavigation.items`** (solo
  aparece como CTA "Reservar"), por lo que no recibe `aria-current`. No
  es un bug: es la estructura de navegación ya decidida desde GOAL 08,
  y el CTA no es semánticamente un enlace de navegación sino una acción,
  por lo que no debería llevar `aria-current`. Cambiar esto sería una
  decisión de navegación (Opción B de GOALs anteriores), fuera de
  alcance de este GOAL de accesibilidad técnica.
- **Duplicación visual de la palabra "Contacto" en el footer** (ya
  señalada en `docs/QA_VISUAL_MOBILE.md` §8): sigue sin corregirse; es
  una redundancia de copy/datos, no un problema de accesibilidad técnica
  (no confunde a lectores de pantalla, cada instancia tiene semántica
  correcta: un `<h3>` y un `<span>` con roles distintos).
- **Botón "Escríbenos para reservar" envuelve a dos líneas en 360px** (ya
  señalado en GOAL 13): sigue siendo legible y accesible (no se corta,
  no se superpone); no se tocó el copy para no exceder el alcance
  permitido ("microajustes... si es imprescindible").
- **`Input`/`Textarea`** no se auditaron a fondo: no tienen ningún
  consumidor real en el sitio hoy (no hay formularios montados en
  ninguna ruta pública), por lo que no había nada que verificar en
  contexto de uso real.

## 10. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El aumento de `min-h-11` en botones `sm`/`md` cambie ligeramente el ritmo vertical en páginas con muchos CTAs seguidos | Baja | Bajo | Verificado visualmente (capturas desktop/mobile): el cambio es de ~2-13px por botón, no genera saturación ni desalineación |
| Futuras páginas olviden pasar `activeHref` a `PublicShell`/`PublicNavbar` | Media | Bajo | El prop es opcional; si no se pasa, simplemente ningún enlace recibe `aria-current` (degradación segura, no rompe nada) |
| El skip link no sea descubierto por usuarios de mouse/touch (funciona solo con teclado) | Baja | Bajo | Es el comportamiento estándar esperado de un skip link (WCAG 2.4.1); no requiere ser visible para usuarios sin necesidad de él |

## 11. Checklist para GOAL 15

Tres opciones evaluadas:

- **A — Datos reales del negocio**: completar teléfono, WhatsApp, sedes,
  horarios, menú, agenda, salones y políticas.
- **B — Navegación/comunidad**: resolver acceso discreto a `/login` y
  `/register`.
- **C — Pulido visual editorial**: ritmo de secciones, microinteracciones
  sobrias, contraste refinado, preparación de assets reales.

**Recomendación**: mantener la prioridad ya establecida en GOALs
anteriores — **Opción A (datos reales del negocio)** en cuanto estén
disponibles, porque sigue siendo el cuello de botella real de todo lo
construido en GOAL 08-14. El chasis técnico (SEO, responsive,
accesibilidad, performance) ya está sólido tras GOAL 12-14; no hay
ninguna razón técnica para seguir puliendo antes de tener contenido real
que mostrar. Si el negocio todavía no puede entregar los datos, la
**Opción C (pulido visual editorial)** es la siguiente más productiva
(ya no hay pendientes técnicos de accesibilidad ni performance que la
bloqueen). La Opción B sigue sin bloquear nada técnico y puede esperar.

## 12. Recomendación final

El proyecto está listo para avanzar a GOAL 15 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- Si se elige la Opción A, coordinar con el negocio antes de tocar
  `data/`/`content/`, igual que se recomendó en GOAL 12/13.
- Si se elige la Opción C, no reabrir los ajustes de tap target/skip
  link de este GOAL sin una razón concreta — ya están validados.
- La Opción B, cuando se ejecute, debería decidir si `/reservas` (u otro
  ítem futuro sin nav propio) necesita su propio tratamiento de
  `aria-current` o si su naturaleza de CTA lo excluye permanentemente.
