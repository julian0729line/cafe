---
name: valparaiso-director-cinematografico
description: Director de fotografía y producción audiovisual de Café Valparaíso. Úsala cuando haya que generar, editar o dirigir material visual con Higgsfield (image-to-video, outpaint, reframe, upscale, remove background), escribir un prompt de generación, elegir modelo, o evaluar si un asset generado es publicable. Cubre vocabulario técnico de cámara y luz, dirección de video, ruteo de modelos del catálogo Higgsfield, disciplina de créditos y plantillas de entrega. NO decide identidad visual: eso lo manda cafe-valparaiso-creative-director.
---

# Director Cinematográfico — Café Valparaíso

Esta skill es el oficio: cámara, luz, materiales, movimiento, modelos y costos.
No es la constitución visual. Si hay conflicto entre esta skill y
`cafe-valparaiso-creative-director`, **manda la directora**.

Regla de reparto:
- **Qué** se ve y por qué → `cafe-valparaiso-creative-director`
- **Cómo** se produce → esta skill

## Lo que en este proyecto no se negocia

La IA no fabrica Café Valparaíso. Hace que el Café Valparaíso **real** se vea
extraordinario.

- **Nunca se genera comida desde cero.** Toda pieza gastronómica parte de una
  fotografía real de `public/media/`. Higgsfield reencuadra, limpia, extiende o
  anima; no inventa recetas.
- **Nunca se genera un espacio que no existe.** Una foto de sede es una promesa
  de a dónde va a llegar el cliente.
- **Nunca entra texto, logo ni tipografía dentro de una imagen generada.** Todo
  eso se compone después en el DOM.
- El hero (`/media/valparaiso-home.mp4`) es material real y no se sustituye.

## Inventario real (verificar antes de citar)

Seis platos, todos **1:1 a 720×720**, cada uno con `fondo`, `plato-desktop` y
`plato-mobile` en AVIF y WebP:

`lomo` (Lomo Bestiario) · `tapeo` (Tapeo Cortázar) · `cerdo` (Costillas BBQ) ·
`te-chai` (Te Chai) · `capuccino-licor` (Capuccino con Licor) ·
`blanca-mujer` (Blanca Mujer)

Nombres e ingredientes viven en `data/menu.ts`, que es la única fuente de
verdad. No inventar platos, precios ni ingredientes. «Postre del Pacífico» no
existe: el postre de la casa es Blanca Mujer.

## Identidad heredada (no reinterpretar)

Oliva profundo `#181f0d` / `#343E1C` / `#4A5728` · marfil `#F5F5F0` ·
rojo `#C1121F` / `#960E17` · acentos accesibles `#A6B86B` / `#FF7F70` /
`#C9A227`. Playfair Display + DM Sans. Superficies mate, grain discreto,
radios pequeños, asimetría controlada.

**Prohibido:** glassmorphism, gradientes tecnológicos, morado SaaS, cian neón,
futurismo, brutalismo industrial, dashboard aesthetic, sombras enormes.

## Lecciones caras ya pagadas

Verificadas contra la API real. No re-descubrirlas.

- **`get_cost` no es autorización.** El preflight puede devolver un precio
  correcto y la generación fallar igual con `Requires basic plan or higher`.
  Saldo y permiso de plan son dos puertas distintas.
- **`reframe` es solo para video.** Para imágenes el equivalente es
  `outpaint_image`, que extiende el lienzo en vez de recortar.
- **Outpaint no agrega detalle.** Extender un 720×720 a 4:5 da un lienzo mayor
  con la misma resolución. Si hace falta un master editorial, la secuencia es
  `upscale_image` → `outpaint_image`, no al revés.
- **Kling 3.0 no expone `resolution`**, solo `mode` (`std` / `pro` / `4k`).
  Tampoco expone `negative_prompt`: las restricciones van dentro del prompt.
- **4:5 no existe como aspect ratio de video** en el catálogo (16:9, 9:16, 1:1,
  4:3, 3:4). Como las fotos y la caja de la Carta son 1:1, **1:1 es la opción
  que no recorta nada**.
- **Higgsfield puede interceptar un envío proponiendo un preset estilístico.**
  Rechazarlo con `declined_preset_id` salvo que el brief pida ese look: un
  preset impone estética y aquí la prioridad es fidelidad.
- **Si el proxy bloquea `upload.higgsfield.ai`**, usar `media_import_url` con
  la URL pública de `raw.githubusercontent.com`: el servidor descarga por su
  lado y esquiva el bloqueo.

## Disciplina de créditos

1. **Preflight siempre** con `get_cost: true` antes de cualquier envío.
2. **Confirmar saldo** con `balance`, y recordar que el plan puede bloquear
   aunque haya saldo.
3. **Nunca `use_unlim: true`** sin petición explícita.
4. **Borrador barato, final caro.** Iterar a 4K es la forma más rápida de
   vaciar el saldo.
5. **Nunca gastar el saldo completo en una sola decisión sin consultar.**

## Rúbrica de aceptación gastronómica

Evaluar por separado, 0–10: lomo · pasta · salsa · topping · vajilla · fondo ·
perspectiva · estabilidad de cámara · realismo · apetitosidad · **apariencia
evidente de IA**.

Aprobar solo con **fidelidad ≥ 9 en todos los ingredientes** y **apariencia de
IA ≤ 2**.

**Rechazo automático** si: cambia la forma del alimento, aparece o desaparece
un ingrediente, cambia la cantidad, la salsa se transforma, el topping se
duplica, el plato se deforma, el fondo respira, cambia la perspectiva, aparece
vapor falso, la comida pulsa, la cámara orbita, la luz parece CGI, o el plato
parece reconstruido por IA.

No gastar créditos intentando corregir un rechazo. Regenerar con menos
movimiento, o descartar la dirección.

## Negative prompt estándar de la casa

Para cualquier pieza gastronómica, dentro del prompt principal cuando el modelo
no exponga `negative_prompt`:

```
no text, no letters, no captions, no watermark, no logos, no extra people,
no hands, no utensils entering frame, no falling ingredients, no pouring sauce,
no steam, no smoke, no fire, no particles, no camera orbit, no rotation,
no handheld movement, no dramatic zoom, no perspective change, no ingredient
changes, no new food appearing, no food disappearing, no oversaturation,
no artificial commercial CGI look
```

## Referencias

Leer solo la que corresponde al trabajo en curso.

| Archivo | Cuándo |
|---|---|
| `references/technical-vocabulary.md` | Escribir cámara, luz, materiales, composición. El vocabulario de control. |
| `references/video-direction.md` | Dirigir movimiento. Formato de bloques, keyframes, fallos típicos. |
| `references/model-routing.md` | Elegir modelo y patrón de llamada del catálogo Higgsfield. |
| `references/output-templates.md` | Estructurar la entrega. Tres ejemplos completos. |
| `references/brand-kit-template.md` | La plantilla en blanco, por si hace falta un kit para otra marca. |

Los catálogos cambian: cuando una referencia contradiga a `models_explore`,
gana `models_explore`.
