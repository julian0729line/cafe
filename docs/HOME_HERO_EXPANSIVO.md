# Hero expansivo — Café Valparaíso

GOAL 16. Documenta el nuevo hero editorial del home con expansión de medio
controlada por scroll nativo (reinterpretación de un patrón tipo
`ScrollExpandMedia`), sin bloquear el scroll y respetando accesibilidad,
performance y la arquitectura Server-Component del proyecto.

## 1. Objetivo

Elevar el impacto de la página inicial: el medio (video real o fondo
cinematográfico de reserva) comienza dentro de un marco central editorial
y se expande suavemente a pantalla completa mientras el usuario hace
scroll, con el título, el copy y los CTA como apertura cinematográfica.
Solo se tocó el home; el resto de secciones y rutas quedan intactas.

## 2. Arquitectura

- `app/page.tsx` **sigue siendo Server Component** (no se modificó).
- `components/sections/home/HeroSection.tsx` es un **wrapper Server
  Component**: resuelve defaults de contenido y pasa props al cliente. No
  contiene lógica de animación ni `"use client"`.
- `components/sections/home/ScrollExpansionHero.tsx` es el **único nuevo
  Client Component** del home; concentra toda la lógica de scroll/motion.
- El orden del home no cambió: Hero → Qué es Café Valparaíso → Agenda →
  Menú → Librería → Espacios → CTA final → Footer.

## 3. Componente cliente aislado

`ScrollExpansionHero.tsx` (`"use client"`) usa `motion/react` (la librería
`motion` ya instalada, `^12.42.2` — no se agregó ninguna dependencia):

- `useScroll({ target: ref, offset: ['start start', 'end start'] })`
  para el progreso real del scroll de la sección.
- `useTransform` para derivar de ese progreso: escala del medio
  (`0.72 → 1`), `borderRadius` (`28px → 0`), opacidad del scrim
  (`0.52 → 0.34`), opacidad del fondo aurora (`1 → 0`) y un desplazamiento
  vertical corto del copy (`0 → -32px`).
- **Scroll nativo del navegador**: no se interceptan `wheel` ni
  `touchmove`, no hay `preventDefault`, no hay `scrollTo(0,0)` de captura,
  no hay listeners globales.
- Estructura: contenedor de `160vh`/`185vh` (mobile/desktop) con un bloque
  interno `sticky top-0 h-[100svh]`; dentro, el medio (`absolute inset-0`)
  que escala, y el copy centrado por encima.

## 4. Comportamiento por viewport

- **Desktop (1280 / 1440)**: marco inicial editorial contenido; al hacer
  scroll el medio se expande hasta casi pantalla completa; copy centrado
  con drift corto. Sin overflow horizontal.
- **Tablet (768)**: mismo efecto, sin overflow lateral; navegación
  intacta; el medio nunca supera el viewport.
- **Mobile (360 / 390)**: track más corto (`160vh`) para reducir la
  duración del efecto; se usa `100svh` (no `vh`) para evitar saltos con la
  barra del navegador; el gesto vertical nunca se bloquea; CTA con tap
  target ≥ 44px (tamaño `lg`: ~50–52px medidos).

Verificado en los 5 viewports obligatorios: 0 overflow horizontal (arriba
y a media expansión), 1 `<h1>` y 1 `<main>` en todos, 0 errores de
consola.

## 5. Accesibilidad

- **Un solo `<h1>`**: el título "Café Valparaíso" es un único heading
  (separación visual posible con `<span>`, pero aquí es un string único).
- **Un solo `<main>`**: aportado por `PublicShell`, sin cambios.
- **Skip link** (`#contenido-principal`) sigue funcionando: primer `Tab`
  lo enfoca, `Enter` mueve el foco al `<main>` (verificado).
- **Landmarks** intactos (header/nav/main/footer).
- **CTA**: `LinkButton` con foco visible global y tap target ≥ 44px.
- **Copy visible e interactivo desde el inicio**: el texto y los CTA no se
  ocultan durante el scroll (usan `.fade-up` de aparición al cargar, ya
  reduced-motion-safe); solo el medio se transforma. Nada requiere scroll
  para volverse clicable.
- **Medio decorativo**: el `<video>`/fondo lleva `aria-hidden="true"` y no
  reproduce audio; es ignorado por lectores de pantalla.
- **Contraste**: copy `#F5F5F0`/`#C9A227`/`#D9DCC4` sobre medio oscuro con
  scrim `#1f2713` + gradiente inferior; se mantiene AA.

## 6. Reduced motion

Con `prefers-reduced-motion: reduce`:

- No hay expansión ligada al scroll: los rangos de `useTransform` quedan
  en su **estado final** (medio a escala 1, `borderRadius` 0, fondo
  desvanecido), verificado (`transform: none` en el medio).
- El contenido es visible desde el inicio y **no requiere interacción**
  para continuar.
- La preferencia se aplica tras montar (patrón `mounted` +
  `requestAnimationFrame`), de modo que el primer render del cliente
  coincide con el del servidor y **no hay mismatch de hidratación**
  (verificado: 0 errores de hidratación en modo normal y en reduced
  motion).

## 7. Performance

- La ruta `/` **sigue prerenderizándose como estática** (`○`) en el build.
- **Solo el hero es cliente**: el resto del home no añadió JS de cliente.
- Sin listeners globales, sin `setState` síncrono en efecto (cumple
  `react-hooks/set-state-in-effect`), sin memory leaks (el
  `requestAnimationFrame` se cancela en el cleanup).
- Sin errores de hidratación (verificado en ambos modos de motion).
- Sin recursos externos: el fondo de reserva es CSS (gradientes de la
  paleta); no se cargan imágenes/videos de stock ni URLs externas.
- El medio no bloquea el render inicial: sin video real, el fondo es CSS
  inmediato; con video, `preload="metadata"` y `poster` prioritario.
- Dimensiones del medio reservadas (`absolute inset-0` dentro de un bloque
  `sticky h-[100svh]`), sin layout shift del contenido (el copy es
  sticky/centrado desde el primer paint).

## 8. Assets utilizados

- **Ninguno externo.** No hay video ni imagen real en `public/media/`
  (solo `README.md`), por lo que el hero usa el **fondo cinematográfico de
  reserva** (`FALLBACK_MEDIA_BACKGROUND`): capas radiales cálidas en
  dorado/rojo/oliva sobre un degradado oliva profundo, coherente con el
  sistema de diseño (`docs/SISTEMA_DISENO.md`).

## 9. Assets pendientes (los debe aportar el negocio)

El componente ya admite estas props opcionales; cuando existan los
archivos reales, basta con pasarlos (por ejemplo desde `HeroSection` o
`content/home.ts`) sin cambiar la lógica:

- `videoSrc` → sugerido `public/media/valparaiso-home.mp4`
  (mudo, en loop, horizontal, liviano; H.264/mp4).
- `posterSrc` → sugerido `public/media/valparaiso-home-poster.webp`
  (primer frame, se muestra antes del video).
- `backgroundSrc` → sugerido `public/media/valparaiso-home-background.webp`
  (imagen fija alternativa si no hay video).

Mientras esos archivos no existan, **no se referencian** (props
`undefined`) para no romper la página; se usa el fondo de reserva.

## 10. Archivos modificados

- **Creado**: `components/sections/home/ScrollExpansionHero.tsx` (único
  Client Component nuevo).
- **Creado**: `docs/HOME_HERO_EXPANSIVO.md` (este documento).
- **Modificado**: `components/sections/home/HeroSection.tsx` (ahora wrapper
  editorial que delega en el cliente; API de props conservada + props de
  assets opcionales).
- **No fue necesario** modificar `app/page.tsx`, `app/globals.css` ni
  `content/home.ts`: la API de `HeroSection` se mantuvo compatible y las
  utilidades reutilizadas (`.fade-up`, `.aurora`, bloque global de
  reduced-motion) ya existían.

## 11. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Sin video real, el hero depende del fondo CSS de reserva | Alta | Bajo | Es un fallback editorial coherente; documentadas en §9 las rutas de assets a aportar |
| La navbar sólida (olive) cubre la franja superior del medio expandido | Media | Bajo | Aceptable visualmente; el copy y el marco están centrados, no en el borde superior; no se tocó la navbar (compartida) |
| Bajo reduced motion queda ~60–85vh de "scroll muerto" con el hero fijo antes de la siguiente sección | Baja | Bajo | El contenido es visible desde el inicio y no requiere interacción; es un compromiso estándar para no reintroducir mismatch de hidratación |
| Con un futuro video pesado podría afectar LCP | Media | Medio | `preload="metadata"` + `poster` prioritario; el negocio debe entregar un video liviano (§9) |

## 12. Validaciones

- `npm run lint`: 0 errores (136 warnings preexistentes, ninguno del nuevo
  componente).
- `npm run build`: exitoso sin variables de entorno; `/` sigue estática;
  `/robots.txt` y `/sitemap.xml` intactos.
- `npx tsc --noEmit`: exit 0.
- Playwright (360×740, 390×844, 768×1024, 1280×900, 1440×1000): 0 overflow
  horizontal, 1 `<h1>`, 1 `<main>`, 0 errores de consola; scroll libre
  (avanza y retrocede a posiciones exactas, nunca atrapado); skip link
  funcional; reduced motion muestra el hero estático con contenido
  visible; 0 mismatch de hidratación en modo normal y reduced.

## 13. Recomendación visual para la siguiente sección del home

La sección "Más que un café" (About) entra justo después de la expansión.
Para encadenar mejor la apertura cinematográfica con el cuerpo editorial,
se recomienda: (a) darle a la primera sección un poco más de aire superior
(`pt`) para que respire tras el hero a pantalla completa; y (b) considerar
un `Reveal`/fade-up sobrio al entrar sus tarjetas (reutilizando utilidades
ya existentes, sin nuevo JS de cliente pesado), manteniendo el tono
editorial. No se hizo en este GOAL por alcance (solo el hero), pero es el
siguiente paso natural de pulido visual.
