---
name: cafe-valparaiso-creative-director
description: Skill directora y constitución visual de Café Valparaíso. Úsala ANTES de cualquier cambio visual, de layout, de motion o de copy en este proyecto — decide qué skill especializada consultar (ui-ux-pro-max, emil-design-eng, review-animations, animation-vocabulary, redesign-existing-projects, generación de imágenes) y con qué límites. Tiene autoridad final sobre las 18 skills instaladas en .agents/skills/: bloquea direcciones incompatibles (brutalismo, minimalismo corporativo, glassmorphism, SaaS genérico) y evita que varias skills de "taste" compitan por la misma decisión.
---

# Director Creativo — Café Valparaíso

Esta skill no es una skill de diseño más: es la que decide **qué** skill
usar, **cuándo**, y con qué límites. Ninguna otra skill de `.agents/skills/`
tiene permiso para redefinir la identidad visual de Café Valparaíso — solo
para ejecutar dentro de ella.

## Principio central

**En cada pantalla existe un solo protagonista.** Puede ser una fotografía,
un video, un título, un evento, un plato o una interacción — nunca varios
a la vez.

Distribución de atención por vista:
- **70% calma** — espacio en blanco, jerarquía clara, un solo foco
- **20% identidad editorial** — tipografía, acento de color, textura
- **10% sorpresa** — el detalle de motion o composición que da carácter

No convertir cada sección en un afiche. No convertir cada componente en una
demostración de diseño. No aplicar recursos de varias skills a la vez.

## Identidad fija (decisiones ya tomadas — no se reinterpretan por GOAL)

- Fondo oliva profundo, marfil como base de contraste
- Rojo como acento dominante ocasional; coral como acento secundario
- Playfair Display (display) + DM Sans (cuerpo)
- Dirección editorial cultural, no corporativa
- Fotografía gastronómica real (nunca inventada ni stock)
- Asimetría controlada, radios pequeños, grain discreto
- Movimiento sobrio
- Lenguaje cálido, breve, natural

**Prohibido sin petición explícita de Julián:** poesía ocupando pantallas
completas, lujo corporativo genérico, tarjetas estilo SaaS, exceso de
sombras, decoraciones gratuitas.

Ver `CLAUDE.md` y `docs/MIGRACION_CLAUDE_DESIGN.md` §5 para el detalle de
tokens (colores, tipografía, utilidades CSS) ya implementado.

## Jerarquía de skills — cuándo consultar cada una

**1. Estructura y UX → `ui-ux-pro-max`**
Jerarquía, accesibilidad, responsive, navegación, interacción, densidad,
claridad. No puede alterar por sí sola la identidad de marca definida arriba.

**2. Motion y microinteracciones → `emil-design-eng`, `review-animations`,
`animation-vocabulary`**
Exclusivamente para: microinteracciones, transiciones, easing, duración,
máscaras, reveals, feedback, reduced motion.

Prohibido: scroll hijacking, cursor followers, movimiento ornamental
constante, animaciones 3D innecesarias, más de una familia de movimiento
por vista, varias animaciones compitiendo entre sí.

**3. Auditoría y rediseño → `redesign-existing-projects`**
Detectar ruido, redundancia, jerarquía rota, recursos innecesarios; evaluar
si una mejora realmente aumenta claridad. **Usar antes de sumar cualquier
efecto nuevo**, no después.

**4. Imágenes → skills de `imagegen-*` / `image-to-code`**
Solo ante solicitud explícita de crear/editar/integrar una imagen. No
intervienen en decisiones generales de layout. No deben inventar material
gastronómico como si fuera fotografía real. Trabajan bajo un brief visual
aprobado por Julián.

**5. Skills de "taste" → una sola a la vez, nunca varias**
`design-taste-frontend` (v1 o v2), `gpt-taste`, `high-end-visual-design`,
`impeccable` y similares pueden consultarse como referencia puntual, pero
esta skill directora decide cuál (si acaso) y nunca dos compiten por la
misma decisión.

**6. Direcciones incompatibles — no usar salvo petición explícita**
`industrial-brutalist-ui`, `minimalist-ui`, sistemas militares, brutalismo
rígido, estética pastel, minimalismo corporativo, futurismo tecnológico,
glassmorphism, neumorfismo, estética SaaS.

## Protocolo de decisión

Antes de cualquier cambio visual, responder estas 10 preguntas. Si una
decisión no las supera, no se implementa:

1. ¿Cuál es el único protagonista del viewport?
2. ¿Qué debe mirar primero la persona?
3. ¿Qué información necesita realmente?
4. ¿Qué elemento puede eliminarse?
5. ¿El movimiento comunica o solo adorna?
6. ¿La nueva intervención aumenta o reduce ruido?
7. ¿Esta decisión pertenece a Café Valparaíso o a una tendencia?
8. ¿La fotografía necesita espacio o compite con la tipografía?
9. ¿La interacción funciona sin movimiento?
10. ¿El resultado sigue siendo claro en móvil?

## Presupuesto de ruido

**Por viewport:** máximo un protagonista · una tipografía display dominante
· un acento cromático fuerte · una animación protagonista · una microfrase
decorativa · dos CTA principales · una textura visible · una superposición
relevante.

**Por página:** máximo dos microfrases · un gran bloque rojo · una
interacción experimental · una familia de easing · una transición de
página característica.

## Voz de marca

Frases breves, tono cálido, lenguaje concreto. Cultura sin solemnidad,
literatura sin exceso poético, hospitalidad sin frases comerciales
genéricas.

**Preferir:** "La carta", "Lo que está pasando", "Los libros", "Las dos
sedes", "Reserva tu mesa", "Esta semana", "Café de por medio".

**Evitar:** "Más que un café", "Una experiencia inolvidable", "Donde las
historias cobran vida", "La magia de encontrarnos", "Una experiencia para
los sentidos", párrafos abstractos que ocupen espacio visual.
