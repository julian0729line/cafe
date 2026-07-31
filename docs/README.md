# Índice de docs — Café Valparaíso

23 documentos, uno por GOAL (o grupo de GOALs) de la reconstrucción del
sitio. Cada uno documenta un cambio ya hecho — no son specs a futuro.
Agrupados por fase para poder ubicar algo sin tener que abrir los 23.

Para contexto de arquitectura vigente (no histórico), empieza por
`CLAUDE.md` en la raíz del repo — estos documentos son la bitácora de cómo
se llegó ahí, no la referencia del estado actual.

## Fase A — Arquitectura base (GOAL 01–11)

Primera reconstrucción del repo desde cero: estructura, sistema de diseño
inicial y las páginas públicas modulares.

| GOAL | Doc | Qué documenta |
|---|---|---|
| 01 | [AUDITORIA.md](./AUDITORIA.md) | Línea base técnica previa al refactor |
| 02 | [ARQUITECTURA_MODULAR.md](./ARQUITECTURA_MODULAR.md) | Contrato de arquitectura que gobierna los GOALs 03–15 |
| 03 | [ESTRUCTURA_BASE.md](./ESTRUCTURA_BASE.md) | Creación de la estructura de carpetas base |
| 04 | [SISTEMA_DISENO.md](./SISTEMA_DISENO.md) | Sistema de diseño y tokens visuales iniciales |
| 05 | [COMPONENTES_UI.md](./COMPONENTES_UI.md) | 8 componentes visuales reutilizables (`components/ui/`) |
| 06 | [COMPONENTES_LAYOUT.md](./COMPONENTES_LAYOUT.md) | Marco reutilizable de layout público (`components/layout/`) |
| 07 | [SECCIONES_HOME.md](./SECCIONES_HOME.md) | 7 secciones editoriales del home |
| 08 | [DATA_CONTENT.md](./DATA_CONTENT.md) | Primera capa ordenada de `data/` y `content/` |
| 09 | [HOME_MODULAR.md](./HOME_MODULAR.md) | Reemplazo de `app/page.tsx` por el home modular (`PublicShell` + secciones) |
| 10 | [RUTAS_PUBLICAS.md](./RUTAS_PUBLICAS.md) | Las 6 páginas públicas comerciales, todas Server Components |
| 11 | [CARDS_DOMINIO.md](./CARDS_DOMINIO.md) | 4 componentes de tarjeta por dominio (`components/cards/`) |

## Fase B — SEO, QA y datos reales (GOAL 12–16)

Capa técnica de calidad sobre la base ya construida, más la primera
incorporación de datos reales del negocio.

| GOAL | Doc | Qué documenta |
|---|---|---|
| 12 | [SEO_METADATA.md](./SEO_METADATA.md) | Capa SEO técnica: `lib/seo.ts`, metadata global y por página |
| 13 | [QA_VISUAL_MOBILE.md](./QA_VISUAL_MOBILE.md) | Auditoría visual responsive en 5 viewports |
| 14 | [PERFORMANCE_ACCESIBILIDAD.md](./PERFORMANCE_ACCESIBILIDAD.md) | Auditoría de accesibilidad y performance básica + correcciones |
| 15 | [DATOS_NEGOCIO_FASE_1.md](./DATOS_NEGOCIO_FASE_1.md) | Primeros datos reales confirmados del negocio |
| 16 | [HOME_HERO_EXPANSIVO.md](./HOME_HERO_EXPANSIVO.md) | Hero editorial con expansión de medio por scroll nativo |

## Fase C — Migración al sistema "Claude Design" (GOAL 17–22)

Rediseño editorial completo del sitio sobre un prototipo visual de
referencia ("Claude Design"), página por página.

| GOAL | Doc | Qué documenta |
|---|---|---|
| — | [MIGRACION_CLAUDE_DESIGN.md](./MIGRACION_CLAUDE_DESIGN.md) | Auditoría de migración del prototipo visual — mapa técnico, no implementa pantallas. Renumera el plan como GOAL 17 en adelante |
| — | [HERO_VIDEO_REAL.md](./HERO_VIDEO_REAL.md) | Integración del primer video real como fondo del hero (complementa GOAL 16) |
| 17 | [SISTEMA_VISUAL_CLAUDE_DESIGN.md](./SISTEMA_VISUAL_CLAUDE_DESIGN.md) | Traslado del lenguaje visual del prototipo al sistema real (tokens compartidos) |
| 18 | [HOME_CLAUDE_DESIGN.md](./HOME_CLAUDE_DESIGN.md) | Reconstrucción editorial de `/` |
| 19 | [AGENDA_MENU_CLAUDE_DESIGN.md](./AGENDA_MENU_CLAUDE_DESIGN.md) | Reconstrucción editorial de `/agenda` y `/menu` |
| 20 | [LIBRERIA_CLAUDE_DESIGN.md](./LIBRERIA_CLAUDE_DESIGN.md) | Reconstrucción editorial de `/libreria` |
| 21 | [ESPACIOS_RESERVAS_CLAUDE_DESIGN.md](./ESPACIOS_RESERVAS_CLAUDE_DESIGN.md) | Reconstrucción editorial de `/espacios` y `/reservas` |
| 22B | [CONTACTO_CLAUDE_DESIGN.md](./CONTACTO_CLAUDE_DESIGN.md) | Reconstrucción de `/contacto` con el primer canal de reserva real (WhatsApp) |

**No tienen doc propio en `docs/`** (quedaron como historial de commit/PR,
no como documento dedicado): GOAL 22 — Fase A (hardening de
`auth/callback` contra open redirect, fix del doble `<h1>` de `PageHero`) y
todo lo posterior a este índice — ver `git log` y los Pull Requests para
esa parte de la historia.
