# Contacto — Claude Design (GOAL 22 — Fase B)

Cierre operativo del flujo comercial público: `/contacto` deja de ser una
lista de canales vacíos y se convierte en el punto donde una visita
realmente puede convertirse en una conversación con Café Valparaíso.

## 1. Objetivo

La auditoría integral (previa a este GOAL) identificó que el flujo
Espacios → Reservas → Contacto no tenía ninguna salida operativa real:
`data/contact.ts` no tenía ningún canal confirmado. Con datos reales
confirmados por el negocio (WhatsApp y las direcciones de Pance y
Juanambú), este GOAL: (1) centraliza esos datos en `data/contact.ts`, y
(2) reconstruye `/contacto` con el sistema editorial Claude Design ya
usado en Agenda/Menú/Librería/Espacios/Reservas, para que el canal
funcione de verdad — sin inventar nada que siga sin confirmar.

## 2. Datos confirmados en esta fase

| Campo | Valor | Fuente |
|---|---|---|
| WhatsApp (texto visible) | `317 790 7408` | Confirmado por el negocio |
| WhatsApp (enlace técnico) | `https://wa.me/573177907408` | Mismo número, formato internacional para `wa.me` |
| Dirección Pance | `Cra. 125 #23A-58, Cali, Colombia` | Confirmado por el negocio |
| Dirección Juanambú | `Av. 9 Norte #9-31, Cali, Colombia` | Confirmado por el negocio |
| Canal principal de reservas | WhatsApp | Confirmado por el negocio |

**Siguen sin confirmar (quedan en `null`, no se inventan)**: teléfono
independiente (explícitamente distinto del WhatsApp, por instrucción
directa del negocio), correo electrónico, Instagram, enlaces de Google
Maps de cada sede.

**Horarios — decisión deliberada de no publicar**: existen dos registros
previos distintos del negocio (uno más reciente que otro, con horarios de
cierre diferentes). Ninguno de los dos se publica en este GOAL; no existe
ningún campo de horario en `data/contact.ts` hasta que el negocio confirme
cuál versión está vigente. Publicar el registro equivocado sería peor que
no publicar ninguno.

## 3. Dirección artística

Mantiene el sistema Claude Design (fondo `#181f0d`, marfil `#F5F5F0`, rojo
`#C1121F`, coral `#FF7F70`, Playfair + DM Sans, `.grain-soft`), con una
secuencia de fondos propia: oscuro (Hero) → marfil (Canales) → oscuro
(Sedes) → oliva profundo `#2A331A` (Cierre — fondo no usado todavía en
ningún otro cierre del sitio, para diferenciarlo de los cierres rojos de
Agenda/Librería y los cierres `#181f0d` de Menú/Espacios/Reservas).

A diferencia de Librería (la «M» tipográfica) o Espacios (marcos y líneas
arquitectónicas), Contacto **no tiene un recurso decorativo dominante**:
es deliberadamente la página más directa y funcional del sitio, porque su
trabajo es que la conversación empiece rápido, no crear atmósfera. Es
también el único hero del sitio con un CTA externo real en la portada
(«Escribir por WhatsApp»).

## 4. Arquitectura

`app/contacto/page.tsx` sigue siendo Server Component: arma `knownChannels`
(solo canales con valor confirmado, vía `if`) y `locations` a partir de
`contactConfig`, ambos con `.map()`/`push` sin modificar la fuente. Los
cuatro componentes nuevos en `components/sections/contacto/` son Server
Components puros — sin `"use client"`, sin estado, sin listeners.

**Corrección aplicada durante la verificación final**: `ContactoClosingSection`
tenía originalmente `https://wa.me/573177907408` hardcodeado como valor por
defecto de `primaryCta` — una duplicación real del dato de negocio fuera de
`data/contact.ts`. Se eliminó ese default (la prop queda sin valor por
defecto) y `app/contacto/page.tsx` ahora pasa `primaryCta` explícitamente
con `href={contactConfig.whatsappHref}`. Verificado con
`grep -rl "573177907408"` sobre todo el repo: el número solo aparece en
`data/contact.ts`.

## 5. Hero

`ContactoHero.tsx`: eyebrow, único `<h1>` ("Hablemos *en Valparaíso.*"),
línea roja editorial, descripción, y un CTA real a WhatsApp
(`target="_blank" rel="noreferrer"`, mismo patrón de enlace externo ya
usado en `HeroSection`/`LinkButton` para CTAs externos).

## 6. Canales oficiales

`ContactoChannelsSection.tsx` consume `knownChannels` (hoy solo WhatsApp).
Cada canal no confirmado simplemente no aparece en la lista — **no se
muestra ningún label vacío ni texto "pendiente de confirmar"** (verificado:
la página no contiene ese texto en ningún viewport). Incluye la nota
explícita pedida: escribir por WhatsApp abre una conversación real, no
confirma una reserva de inmediato. El valor de cada canal (`317 790 7408`)
es un enlace real de `min-h-11` (44px) — ver hallazgo de accesibilidad en
§10.

## 7. Sedes

`ContactoLocationsSection.tsx` consume `contactConfig.locations`, ahora con
dirección exacta. El enlace "Ver en Google Maps" solo se renderiza si
`mapsUrl` existe (hoy no existe en ninguna sede, así que no aparece —
no se inventó ninguna URL de Maps).

## 8. Cierre

`ContactoClosingSection.tsx`: título directo ("Escríbenos y te confirmamos
los detalles."), nota que refuerza otra vez la distinción
solicitud/confirmación, CTA primario a WhatsApp y CTA secundario a
`/espacios` (cierra el círculo con la página que normalmente origina el
flujo).

## 9. Efecto compartido en el resto del sitio (transparencia)

`contactConfig.reservationChannels` alimenta el footer de **las siete
rutas públicas** (`PublicShell` → `contactItems`), no solo `/contacto`.
Al cambiar ese canal de `{ label: 'Formulario de contacto', href: '/contacto' }`
a `{ label: 'WhatsApp', href: 'https://wa.me/573177907408' }`, el footer de
Home, Agenda, Menú, Librería, Espacios y Reservas **también** empezó a
mostrar el canal real de WhatsApp — verificado por `curl` en las seis
rutas — sin que ninguno de esos `page.tsx` se haya modificado (son cambios
que emanan solo de `data/contact.ts`, la fuente centralizada).

**Limitación conocida y documentada**: en esas seis páginas, el enlace de
WhatsApp del footer **no abre en pestaña nueva** (`target="_blank"` ausente),
porque esas páginas están fuera del alcance autorizado de este GOAL — su
`page.tsx` no fue tocado. Solo `/contacto` (que sí está en alcance) construye
ese campo `external: true`. Es un ajuste de una línea por página, pendiente
para un GOAL futuro que autorice tocar esos archivos.

## 10. Accesibilidad

- Un solo `<h1>` y un solo `<main>` en `/contacto`, verificado en los 5
  viewports.
- Skip link verificado por teclado: `Tab` enfoca "Saltar al contenido
  principal", `Enter` mueve el foco a `<main id="contenido-principal">`.
- `aria-current="page"` correcto en "Contacto" del navbar.
- **Hallazgo corregido durante la validación**: el enlace del valor
  `317 790 7408` medía 32px de alto en mobile (por debajo del mínimo de
  44px) porque su altura dependía solo de la tipografía. Se corrigió con
  `flex min-h-11 w-fit items-center` — ahora mide exactamente 44px,
  verificado con Playwright antes y después del ajuste.
- Todos los CTA reales miden 44-52.5px de alto.
- Cero enlaces vacíos ni `href="#"`.
- Decoración (`grain-soft`) con `aria-hidden="true"`.

## 11. Performance

- `/contacto` sigue prerenderizando estática (`○`).
- Cero Client Components nuevos, cero listeners, cero recursos externos,
  cero imágenes (ninguna existe localmente).
- Sin layout shift, sin dependencias nuevas, `package.json` intacto.

## 12. Archivos creados

- `components/sections/contacto/ContactoHero.tsx`
- `components/sections/contacto/ContactoChannelsSection.tsx`
- `components/sections/contacto/ContactoLocationsSection.tsx`
- `components/sections/contacto/ContactoClosingSection.tsx`
- `docs/CONTACTO_CLAUDE_DESIGN.md` (este documento)

## 13. Archivos modificados

- `data/contact.ts` — WhatsApp, direcciones de Pance/Juanambú,
  `reservationChannels` actualizado a WhatsApp real.
- `app/contacto/page.tsx` — recompuesto con las cuatro secciones nuevas.

## 14. Archivos eliminados

- `components/sections/contacto/.gitkeep`

## 15. Datos pendientes

- Teléfono independiente (explícitamente no es el mismo número que WhatsApp).
- Correo electrónico.
- Instagram oficial.
- Enlaces de Google Maps de Pance y Juanambú.
- Horarios: dos registros previos distintos, pendientes de una
  confirmación final del negocio sobre cuál está vigente.
- `target="_blank"` en el enlace de WhatsApp del footer de las seis
  páginas fuera de alcance de este GOAL (§9).
- Propagar la dirección confirmada a `SpacesLocationsSection` (Espacios):
  hoy esa sección solo muestra nombre y ciudad, sin la dirección exacta
  que ya existe en `data/contact.ts` — no se tocó `components/sections/espacios/`
  en este GOAL por estar fuera de su alcance autorizado.

## 16. Protección de páginas aprobadas

Confirmado mediante `git diff --stat` antes de este documento: Home,
hero, video, Agenda, Menú, Librería, Espacios, Reservas, `PageHero.tsx`,
`auth/callback/route.ts`, `.env.example`, `DEPLOY.md`, `middleware.ts`,
`package.json` y el lockfile — todos sin diff, ninguno modificado.

## 17. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El footer de las 6 páginas fuera de alcance no abre WhatsApp en pestaña nueva | Alta (ya confirmado) | Bajo | Cambio de una línea por página, documentado en §9 y §15 para un GOAL futuro |
| Solo un canal (WhatsApp) disponible: si el negocio prefiere otro canal como respaldo, hoy no hay alternativa | Media | Medio | El componente ya soporta múltiples canales (`knownChannels`); agregar teléfono/correo es inmediato en cuanto se confirmen |
| Los horarios siguen sin publicarse | Alta (decisión deliberada) | Bajo | Mejor no publicar que publicar una versión potencialmente vencida; el negocio puede confirmar cuál registro es vigente en cualquier momento |

## 18. Recomendación para la siguiente fase

Con Contacto operativo, el flujo comercial público completo
(Espacios → Reservas → Contacto → WhatsApp) ya es utilizable de punta a
punta. Sugerido a continuación, en orden de impacto: (1) un GOAL de una
sola línea por página para añadir `external: true` al footer de las 6
páginas restantes (§9); (2) confirmar la versión vigente de horarios y
agregarla a `data/contact.ts`; (3) recién entonces, considerar la fusión
del PR #1 a `main` — la auditoría integral ya había marcado el canal de
contacto como el bloqueante principal, y ese bloqueante queda resuelto en
esta fase.
