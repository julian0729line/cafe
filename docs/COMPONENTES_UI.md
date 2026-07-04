# Componentes UI base — Café Valparaíso

GOAL 05. Documenta los 8 componentes visuales reutilizables creados en
`components/ui/`. Ninguno está conectado todavía a `app/page.tsx` ni a
ninguna ruta existente: son piezas de librería, listas para consumirse en
GOALs futuros (06/07 en adelante).

## 1. Alcance

Se crearon exactamente estos archivos, todos nuevos, sin tocar ningún
archivo existente del proyecto:

- `components/ui/Container.tsx`
- `components/ui/SectionHeader.tsx`
- `components/ui/Button.tsx`
- `components/ui/LinkButton.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Card.tsx`
- `components/ui/Input.tsx`
- `components/ui/Textarea.tsx`
- `docs/COMPONENTES_UI.md` (este archivo)

Se eliminó `components/ui/.gitkeep`: esa carpeta ya no está vacía.

Ningún componente existente (`Hero`, `Nav`, `PageHero`, `MediaSlot`, etc.)
fue movido, renombrado ni modificado. No se instalaron dependencias nuevas.
No se creó ninguna ruta. No se conectó ningún componente a `app/page.tsx`.

## 2. Inventario y props

### `Container`
Envoltorio de ancho máximo + padding horizontal responsive. Polimórfico vía
`as` (por defecto `div`).

```ts
interface ContainerProps {
  as?: ElementType
  variant?: 'default' | 'wide' | 'text' | 'full' // max-w-6xl | 7xl | 2xl | none
  className?: string
  children: ReactNode
}
```

### `SectionHeader`
Encabezado de sección: eyebrow opcional + título + descripción opcional.
`titleAs` controla la etiqueta real (`h1`/`h2`/`h3`, default `h2`) para que
cada página controle su propia jerarquía de encabezados en vez de que el
componente asuma un nivel fijo.

```ts
interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  titleAs?: 'h1' | 'h2' | 'h3'
  className?: string
}
```

### `Button` / `LinkButton`
`Button` renderiza un `<button>`; `LinkButton` envuelve `next/link` con la
misma apariencia. Ambos comparten `buttonBaseClasses`,
`buttonVariantClasses` y `buttonSizeClasses` exportados desde `Button.tsx`
para que no exista duplicación de estilos entre los dos.

```ts
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'wine'
type ButtonSize = 'sm' | 'md' | 'lg'
```

- `primary`: réplica del CTA principal del hero (fondo crema, sombra dura
  roja, invierte en hover).
- `secondary`: réplica del botón de submit de login/register (rojo sólido,
  sombra dura oliva oscuro).
- `ghost`: borde oliva sutil, para acciones secundarias sobre Modo Noche.
- `dark`: pill oliva sólida.
- `wine`: sólido vino, para contextos Modo Papel/editorial.

### `Badge`
Pill de una sola línea para etiquetas cortas (categorías de menú, estados).

```ts
type BadgeVariant = 'default' | 'olive' | 'wine' | 'brass' | 'outline'
```

### `Card`
Contenedor con esquinas `rounded-[1.25rem]` (token `radius.md`). Polimórfico
vía `as`.

```ts
type CardVariant = 'paper' | 'dark' | 'outline' | 'editorial'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'
```

`dark` reutiliza la clase `.tile` ya existente en `globals.css`.
`editorial` replica la tarjeta destacada roja del dashboard (sombra dura).

### `Input` / `Textarea`
Campo con label superior + input/textarea + hint o error. Ambos usan
`forwardRef` (`displayName` = `'Input'` / `'Textarea'`) para poder
integrarse con `react-hook-form` u otros manejos de formularios en el
futuro sin reescribirse.

```ts
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}
```

`error` tiene prioridad visual y de `aria-describedby` sobre `hint`.
`aria-invalid` se marca automáticamente cuando hay `error`.

## 3. Base visual real (no inventada)

Los valores de color/sombra/radio de cada variante se tomaron de patrones
**ya en producción**, verificados por grep antes de escribir código:

- CTA primario → clases del botón del Hero (`app/components/Hero.tsx`).
- Botón secundario/rojo → botón de submit de `app/login/page.tsx` /
  `app/register/page.tsx`.
- Input/label → el mismo `app/login/page.tsx` (no el `.input-group` de
  `globals.css`, que no tiene ningún consumidor real en el proyecto).
- Tarjeta oscura → clase `.tile` existente.
- Radio `1.25rem`, sombra dura `5px 5px 0px 0px` → documentados en
  `lib/design-tokens.ts` (`radius.md`, `shadows.stamp`).

## 4. Por qué no se importa `designTokens` en runtime

`lib/design-tokens.ts` sigue sin conectarse a ningún componente, tal como
establece su propio comentario de cabecera ("no se conecta todavía a
ningún componente... eso ocurre en GOAL 05/06") y `SISTEMA_DISENO.md`.

Motivo técnico: Tailwind v4 resuelve utilidades mediante análisis estático
de las clases literales presentes en el código fuente. Si un componente
interpola valores del objeto `designTokens` dentro de un string de clase
(`` `bg-[${designTokens.colors.brand.red}]` ``), Tailwind no puede detectar
esa clase en tiempo de build y no la genera. Por eso los 8 componentes usan
clases Tailwind literales con los mismos valores hexadecimales ya
documentados en `design-tokens.ts`, mantenidos en sincronía manualmente
por convención del propio contrato de tokens. Ningún componente de este
GOAL importa `designTokens`.

## 5. Utilidades de `globals.css` reutilizadas

- `.press` — feedback táctil en `Button`/`LinkButton` (ya es
  reduced-motion-safe en el bloque global existente).
- `.tile` — fondo de `Card` variante `dark`.
- `:focus-visible` global — se mantiene intacto en todos los componentes;
  `Input`/`Textarea` además cambian el color de borde en foco
  (`focus-visible:border-[#C1121F]`) como mejora de accesibilidad sobre el
  patrón original de los formularios de login/register, que cancelaban el
  anillo con `focus:outline-none` sin agregar una alternativa visible.

## 6. Decisiones de alcance / diferido

- `PageHero.tsx` **no se tocó** en este GOAL. `SISTEMA_DISENO.md` §12
  sugería resolver ahí su doble `<h1>` "en GOAL 05", pero el alcance real
  entregado para este GOAL no incluye archivos existentes — se difiere
  explícitamente a un GOAL futuro que sí autorice modificarlo.
- Las 4 tarjetas de dominio (agenda/menú/libro/espacio) mencionadas en
  `SISTEMA_DISENO.md` §7 quedan fuera de este GOAL; se construirán sobre
  `Card` en un GOAL posterior.
- Ningún componente de este GOAL se conecta a `app/page.tsx` ni a ninguna
  ruta: es librería aislada, verificada solo por build/lint/typecheck.

## 7. Patrones nuevos introducidos

Este GOAL introduce, por primera vez en el proyecto:

- `forwardRef` + `displayName` (`Input`, `Textarea`).
- Prop `as?: ElementType` para componentes polimórficos (`Container`,
  `Card`).
- Mapas de clases exportados y compartidos entre dos componentes
  (`Button` → `LinkButton`).

No se agregó `clsx` ni `class-variance-authority`: no están instalados y
no son necesarios para el número de variantes actual (unión de template
strings basta).

## 8. Validaciones ejecutadas

- `npm run lint`
- `npm run build` (sin variables de entorno)
- `npx tsc --noEmit`
- `git status`

Resultados y deuda preexistente detectada (no corregida en este GOAL, solo
documentada) se reportan en la respuesta final de este GOAL, no en este
documento.

## 9. Checklist GOAL 05

- [x] `Container`
- [x] `SectionHeader`
- [x] `Button`
- [x] `LinkButton`
- [x] `Badge`
- [x] `Card`
- [x] `Input`
- [x] `Textarea`
- [x] `docs/COMPONENTES_UI.md`
- [ ] Conectar a `app/page.tsx` (diferido a GOAL 06/07)
- [ ] Tarjetas de dominio (diferido)
- [ ] Fix `PageHero` doble `<h1>` (diferido)
