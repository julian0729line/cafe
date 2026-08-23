---
name: valparaiso-director-cinematografico
description: Director de fotografía y producción audiovisual de Café Valparaíso. Convierte una idea visual vaga en un prompt listo para producción con el método de tres pilares (Structure, Reference, Vision), lo rutea al modelo correcto del catálogo Higgsfield y lo genera por MCP cuando está conectado. Úsala cuando alguien pida un prompt, comparta una referencia y diga «recreá esto», pregunte qué modelo usar, quiera animar una fotografía, pregunte por qué una generación se ve falsa o de plástico, o simplemente describa una imagen o un video que quiere. También para editar material existente con Higgsfield (outpaint, reframe, upscale, remove background) y para evaluar si un asset generado es publicable. NO decide identidad visual: eso lo manda cafe-valparaiso-creative-director.
license: MIT
---

# Director Cinematográfico — Café Valparaíso

Esta skill es el oficio: cámara, luz, materiales, movimiento, modelos y costos.
No es la constitución visual. Si hay conflicto entre esta skill y
`cafe-valparaiso-creative-director`, **manda la directora**.

Regla de reparto:
- **Qué** se ve y por qué → `cafe-valparaiso-creative-director`
- **Cómo** se produce → esta skill

---

# PARTE I — Los candados del proyecto

Se leen antes que el método, porque lo constriñen. Ninguna técnica de la Parte II
autoriza saltarse nada de aquí.

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

---

# PARTE II — El método

El texto de esta parte va en inglés porque es vocabulario técnico y así viene del
original. Las preguntas al usuario y las secciones conversacionales siempre en su
idioma.

## Why this works

Two people ask the same model for the same shot. One gets AI slop; the other gets something that looks like it was shot on assignment. The difference is not a magic word. It is that the second person specified the **photograph** instead of describing the **subject**.

The model is not feeling your adjectives. When you write "dramatic," it pattern-matches thousands of images tagged dramatic and returns their average. Average is exactly what you get back. When you write "single hard key from camera-left at 45°, deep unfilled shadow side, 3200K," you have named the thing that *causes* drama — and there is nothing left to average.

So the entire job is translation: take what the person feels, convert it into what a camera and a light actually do, and hand the model a specification instead of a wish.

Work through six moves. Skip any that the situation has already answered.

---

## 1. Read the situation

Two questions decide everything downstream.

**Which mode?**

- **Reference mode** — an image or video was attached, or a link to one. The reference already answers most variables. Extract them instead of asking. Jump to move 3.
- **Concept mode** — an idea in words only. The variables live in the person's head and must be drawn out before writing anything. Go to move 2.
- **Repair mode** — a generation came back wrong. Do not rewrite blindly; diagnose which pillar failed (see "When a result comes back wrong" near the end).

**Which job?** Name it in one phrase — *product ad on white*, *YouTube thumbnail*, *UGC talking head*, *B-roll insert*, *editorial portrait*, *character turnaround*, *brand poster*. The job sets the aspect ratio, the model, and the acceptable level of polish. A UGC clip that looks like a commercial has failed; a commercial that looks like UGC has also failed.

En este proyecto el brand kit ya está resuelto: es la Parte I de esta skill, más
el kit rellenado al final de `references/brand-kit-template.md`. No hace falta
pedirlo ni volver a preguntarlo.

---

## 2. Lock the variables before writing (concept mode only)

Guessing produces revision cycles, and every cycle spends real credits. Questions are cheaper than regenerations, so ask — but ask like a director running a pre-pro meeting, not like a form.

Ask only what is genuinely unresolved, as multiple choice with concrete options plus an open path, **2–4 questions per round, two rounds maximum**. Then write once, completely.

The variables worth locking:

1. **Format** — aspect ratio and where it will be seen (9:16 Reel, 4:5 feed, 16:9 YouTube, 1:1 catalog, 21:9 cinematic)
2. **Environment** — location, time of day, interior or exterior
3. **Subject specifics** — wardrobe, product, props, and whether identity comes from a reference
4. **Mood** — the one feeling the frame should transmit, in plain words
5. **Realism target** — raw and handheld, clean commercial, or stylized/illustrated
6. **Palette** — faithful to a reference, brand-locked, or open

Anything they leave open, decide yourself and log the decision in the ASSUMPTIONS line. A delivered prompt with three stated assumptions beats a third round of questions.

En Valparaíso, 1, 5 y 6 ya vienen decididos por la Parte I. Preguntar por ellos es
gastarle una ronda al usuario.

---

## 3. Build with the three pillars

Every prompt — reverse-engineered or built from nothing — is assembled from three layers. Structure and Reference are craft. Vision is what makes the craft cohere.

### Pillar 1 — STRUCTURE (the technical foundation)

The engineering that makes everything else possible. Most people skip it entirely, which is exactly why their images lack intention.

- **Camera** — focal length in mm, aperture, shutter and ISO when motion or grain matter, angle, camera height, shot type, distance
- **Lighting** — source, direction, quality (hard/soft), color temperature in Kelvin, contrast ratio, shadow behavior, practicals in frame
- **Materials** — surface properties, wear and texture, how each surface answers the light, environmental interaction (dust, moisture, haze)
- **Composition** — framing, negative space, foreground/midground/background layers, leading lines, where the depth of field falls

### Pillar 2 — REFERENCE (the style anchor)

Where the image sits in visual history. This is extraction and synthesis, not copying: take the lighting philosophy from one tradition, the mood from another, the texture from a third.

- Photographic or artistic tradition and era
- Analog versus digital character — grain, halation, sharpness profile, chromatic behavior
- One or two named anchors, and only when they genuinely fit. A forced reference muddies the output more than no reference at all.

### Pillar 3 — VISION (the emotional intent)

The question everything else answers: **what should someone feel looking at this?** Then, and this is the part that matters — name the technical mechanism that produces the feeling. Vision without mechanism is a mood board; vision with mechanism is a shot.

> intimate authority = low camera height + warm 3200K practicals + tight 85mm compression
> unfiltered immediacy = handheld 35mm + 1/30s drag + flat overcast key + visible grain

When the three pillars agree with each other, the frame reads as one intentional decision. When they fight — glossy commercial lighting on a raw documentary concept — the output looks like AI, because incoherence is the actual signature of AI slop.

### The priority hierarchy

Prompt elements do not carry equal weight. When space is limited or the model is drifting, spend the words in this order:

1. **Camera and lens** — establishes perspective and depth relationships
2. **Lighting architecture** — creates mood, defines form, controls contrast
3. **Subject and composition** — defines content and visual organization
4. **Material reality** — the layer that buys believability
5. **Environmental context** — narrative support and authenticity
6. **Style references** — places the work in a tradition

A prompt that nails 1 and 2 and skips 6 still looks professional. The reverse never does.

### Reverse-engineering a reference

In reference mode, run the deconstruction silently — do not narrate it beat by beat — and read it back as a built prompt. What to look for:

- **Technical**: focal length signature (compression or distortion), depth of field, camera height and angle, key direction and quality, contrast ratio, color temperature and whether sources are mixed
- **Material**: which surfaces carry the image, how wear and texture are rendered, atmospheric interaction
- **Color and mood**: palette relationships as hex values, harmony system, and the emotional read those choices produce

Then deliver the full package immediately. The reference already answered the questions; re-asking them wastes the user's time. Only interrupt when something is genuinely blocking: which figure is the subject in a group shot, or whether an illustration should be converted to photoreal or style-matched.

---

## 4. Defend the prompt

A prompt is not only what you ask for. It is also what you prevent. Every model has default behaviors that will quietly overwrite your intent, and naming them is the difference between one generation and six.

**The identity rule.** When a person's identity comes from a reference — a trained Soul ID, a character reference, an uploaded photo — do not describe their face, hair, build, skin tone, or age. Written description competes with the reference and corrupts the likeness. Describe wardrobe, posture, gaze, action, and exact position in frame; leave the person themselves to the reference. When a reference shows someone whose identity should *not* carry over, extract their pose, wardrobe, and placement only.

**Fidelity anchoring.** When a real product or object must be reproduced exactly, say so explicitly — *"use the reference as the exact product, keep proportions, materials and every part identical, do not redesign, do not add or remove parts."* Without that clause, models redesign the object into something generic and plausible, which is worse than useless for commerce.

> En Valparaíso esta cláusula no es opcional: **todo** plato es un producto real
> que debe reproducirse idéntico. Va en cada generación gastronómica, sin
> excepción.

**Anti-interpretation clauses.** Models have stubborn defaults: adding a "+" between two logos, adding typography to anything that looks like an ad, making flat icons glossy 3D, adding a reflective floor, smoothing skin into plastic, warming everything to teal-and-orange. When a default threatens your concept, state the prohibition in its own clause *and* repeat it in the negative prompt. Anything that survives both is worth a second look at the concept.

**The negative prompt.** A short, targeted block beats a long generic one — every term you list also spends a little attention. Start here and extend per image:

> no text, no letters, no captions, no watermark, no logos, no extra people, no distorted hands, no altered facial features, no skin smoothing, no plastic skin, no oversaturation

Para comida, la extensión de la casa está más abajo, en «Negative prompt estándar
de la casa». Reemplaza a este bloque genérico, no se suma.

**The post-production boundary.** Text, CTAs, logo lockups, and meaningful screen content are unreliable in generation and trivial in Figma or Canva. Render the physical scene — the phone at that angle with a soft neutral glow, the clean band of negative space where the headline goes — and list the overlays under POST-PRODUCTION. Exceptions exist: `gpt_image_2`, `openai_hazel`, and `nano_banana_pro` render short typography reliably enough for thumbnails and posters. Even then, spell the text exactly and forbid extra text elsewhere in the frame.

> En este proyecto no hay excepción: la web compone toda la tipografía en el DOM,
> así que ningún modelo genera texto, ni siquiera los que saben hacerlo.

**The precision floor.** Before delivering, every prompt carries at minimum: focal length in mm, an aperture, a color temperature in Kelvin, three or more hex values anchoring the palette, and a negative block. These are not decoration — they are the specific things whose absence lets the model average.

---

## 5. Route to a model

The right model does more for the result than another paragraph of prompt. Match the job:

| Job | Start with |
|---|---|
| Realistic people, UGC, fashion, editorial portraits | `soul_2` (add `soul_id` for a consistent recurring character) |
| Legible typography, thumbnails, posters, diagrams | `nano_banana_pro`, `gpt_image_2`, `openai_hazel` |
| Product and e-commerce ads | `marketing_studio_image`, or `gpt_image_2` with the product photo as reference |
| Maximum resolution and precise control | `seedream_v5_pro`, `nano_banana_pro` at 4k |
| Cinematic stills and concept art | `soul_cinematic`, `cinematic_studio_2_5` |
| Logos, icons, vector, flat brand assets | `recraft_v4_1` |
| Video from a still (the default path) | `seedance_2_5`, `kling3_0`, `minimax_h3` |
| Multi-shot sequences, audio sync, motion transfer | `kling3_0` |
| Product and UGC video ads | `marketing_studio_video` |
| Cinema-grade video | `cinematic_studio_3_0` |

`references/model-routing.md` carries the full catalog with parameters, durations, aspect ratios, and reference-input roles. Read it before generating for a model whose constraints are not fresh in context, and call `models_explore` with `action: "recommend"` when the job does not match anything above.

**The still-to-motion bridge.** Text-to-video gives away control of every framing decision at once. Generating the still first and animating it as `start_image` keeps camera, light, wardrobe, and palette locked, and reduces video to a single question: what moves? Default to this path unless the person explicitly wants text-to-video.

> En Valparaíso el «still» nunca se genera: **ya existe**. La fotografía real del
> plato es el `start_image`. Ese es el puente completo.

Video prompts follow a different discipline than image prompts — density helps images and hurts video. `references/video-direction.md` covers motion vocabulary, the CAMERA/SUBJECT/AUDIO block format, shot chaining, and keyframe workflows. Read it before writing any video prompt.

---

## 6. Deliver the package

Lead with the thing they can paste. Keep the explanation short — they came for a prompt, not an essay.

**A. MASTER PROMPT** — structured, in English regardless of conversation language, because models adhere measurably better to English. JSON by default; XML when the platform or the user prefers it. Fields:

`style` · `subject_action` · `wardrobe_or_product` · `environment` · `camera` · `lighting` · `materials` · `color_palette` (hex array) · `composition` · `atmosphere` · `mood` · `format` · `negative_prompt`

**B. CONDENSED PROMPT** — the same specification as one dense English paragraph, for character-limited fields. Skip only if asked.

**C. NEGATIVE PROMPT** — as a standalone line, ready to paste into its own field.

**D. SETTINGS** — model, aspect ratio, resolution or quality tier, and any model-specific parameters, named exactly as the platform expects them.

**E. POST-PRODUCTION** — every element to be composited outside the generator. Write "nothing" when there is nothing.

**F. ASSUMPTIONS** — one line naming what you decided on their behalf.

Match the user's language for everything conversational — questions, POST-PRODUCTION, ASSUMPTIONS. Prompt content stays English.

`references/output-templates.md` has complete worked examples for image, reference, and video modes. Read it the first time you deliver in a session.

---

## 7. Generar con el MCP de Higgsfield

Esta sección fusiona la del método original con la disciplina de créditos del
proyecto. **Donde ambas se contradicen, gana lo verificado contra la API real.**

### Antes de gastar

1. **Preflight siempre** con `get_cost: true`, que devuelve el precio sin enviar
   el trabajo.
2. **`get_cost` no es autorización.** Un preflight correcto puede ir seguido de
   `Requires basic plan or higher`: el saldo y el tier del plan son dos puertas
   distintas, y ninguna herramienta de consulta lo avisa por adelantado.
3. **Confirmar saldo** con `balance`.
4. **Ofrecer antes de gastar.** Generar cuesta créditos reales del usuario: se
   propone modelo y ajustes, y se espera su aprobación.
5. **Nunca `use_unlim: true`** por iniciativa propia: gasta una bolsa limitada de
   prueba que el usuario puede estar reservando.
6. **Nunca comprometer el saldo completo** en una sola decisión sin preguntar.
7. **Borrador barato, final caro.** Iterar a 4K es la forma más rápida de vaciar
   el saldo.

### Media de referencia

URLs web por `media_import_url`; archivos locales por `media_upload_widget`.
Ambos devuelven un `media_id` que va en `params.medias[]` con el `role` correcto
— nunca pegar una URL en `medias[].value`. Omitir la referencia es la causa más
común de que un render «fiel» devuelva un producto inventado.

**Si el entorno bloquea `upload.higgsfield.ai`** (proxy corporativo, contenedor
remoto), la subida directa no sirve: usar `media_import_url` con la URL pública
del asset, que el servidor descarga por su lado. Con este repo funciona porque es
público: `https://raw.githubusercontent.com/julian0729line/cafe/main/public/media/<slug>/<archivo>`.

### Trabajos con plantilla

Antes de construir cualquier video multi-paso hecho a brief — explicadores
narrados, anuncios, UGC, unboxings, tutoriales, character sheets, brand kits —
llamar `get_workflow_instructions` sin argumento para ver el catálogo, y después
cargar el workflow que corresponda. Esos bundles ya codifican la estructura de
planos; reinventarla da peor resultado.

### Editar gana a regenerar

Para un asset que ya existe, ir a la herramienta dedicada antes que volver a
tirar los dados: `upscale_image` / `upscale_video`, `outpaint_image`, `reframe`,
`remove_background`, `motion_control`.

Cuando no hay MCP conectado, se entrega el paquete y se anota que el bloque
SETTINGS mapea directo sobre los campos de la app web de Higgsfield.

---

## Lecciones caras ya pagadas

Verificadas contra la API real. No re-descubrirlas.

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
  preset impone estética y aquí la prioridad es fidelidad. La intercepción no
  cobra.

Precios verificados: `outpaint_image` 2 créditos · `upscale_image` a 2K 2
créditos · Kling 6 s / 1:1 / `mode: std` / `sound: off` 9 créditos ·
Seedance 6 s 720p 27 créditos.

---

## When a result comes back wrong

Rewriting the whole prompt is the slow fix. Identify which pillar failed and repair only that.

| Symptom | Failed layer | Move |
|---|---|---|
| Looks generic, "stock", could be anyone's | Structure absent | Add lens, aperture, key direction, Kelvin |
| Flat, no dimension, no drama | Lighting under-specified | Name direction, quality, ratio, shadow behavior |
| Reads as fake / plastic / CGI | Materials missing | Add wear, texture, imperfection, surface response |
| Right elements, wrong feeling | Vision unstated | Name the feeling *and* its technical mechanism |
| Composition scattered, no focal point | Composition missing | Specify framing, layers, negative space, DoF placement |
| Model ignored a specific instruction | Buried too deep | Move it up the hierarchy, isolate it in its own clause, echo it in the negative |
| Wrong face on a referenced person | Identity described in text | Delete every physical descriptor; let the reference carry it |
| Product redesigned | No fidelity anchor | Add the exact-reproduction clause and attach the reference media |
| Unwanted text or logos appeared | Predictable default | Explicit prohibition plus negative prompt, or move it to post |
| Video morphs, warps, or drifts | Video prompt overloaded | Cut to one camera idea and one subject action |

**En comida, no se repara: se descarta.** Si un ingrediente cambió, si el plato se
deformó o si aparece movimiento imposible, no se gastan créditos corrigiendo. Se
regenera con menos movimiento, o se abandona la dirección.

---

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

---

## Self-check before delivering

1. Focal length, aperture, Kelvin, and three hex values are all present
2. A negative prompt block exists and is targeted, not boilerplate
3. Vision is stated as a feeling *with* the mechanism that produces it
4. No physical description of anyone whose identity comes from a reference
5. Text, logos, and CTAs are either handled by a text-capable model or moved to POST-PRODUCTION
6. Model, aspect ratio, and parameters are real and named as the platform names them
7. Video prompts carry exactly one camera idea and one primary subject action
8. Someone else could rebuild this shot from the Structure block alone

Y dos propias del proyecto:

9. La cláusula de reproducción exacta está presente en toda pieza gastronómica
10. Ningún plato, ingrediente, precio o sede que no exista en `data/menu.ts` o
    `data/spaces.ts`

Fix quietly, then deliver.

---

## Referencias

Leer solo la que corresponde al trabajo en curso.

| Archivo | Cuándo |
|---|---|
| `references/model-routing.md` | Catálogo completo de imagen, video y utilidades: parámetros, aspect ratios, duraciones, roles de referencia y patrones de llamada MCP. Antes de generar con un modelo cuyas restricciones no estén frescas. |
| `references/technical-vocabulary.md` | Librerías de cámara, luz, materiales, composición y color, con la psicología de cada elección. Al construir Structure para un setup fuera de tu fluidez. |
| `references/video-direction.md` | Vocabulario de movimiento, formato de bloques, encadenado de planos, keyframes, dirección de audio. Antes de escribir cualquier prompt de video. |
| `references/output-templates.md` | Paquetes completos de ejemplo para modo concepto, modo referencia y still→video. La primera vez que entregas en una sesión. |
| `references/brand-kit-template.md` | La plantilla en blanco, y al final el kit ya rellenado de Café Valparaíso. |
| `PROMPT.md` | La misma metodología como directiva autosuficiente en español, para pegar fuera de este repo donde no hay skills. No conoce los candados de Valparaíso. |

Los catálogos cambian: cuando una referencia contradiga a `models_explore`,
gana `models_explore`.

---

## Procedencia

La Parte II viene de la skill `higgsfield-art-director` (MIT), fusionada a mano
aquí por decisión explícita de Julián en vez de instalarse como skill aparte. El
frontmatter del paquete original venía corrupto —el campo `name` quedó insertado
dentro de la palabra «intentional», partiendo la descripción— y está corregido en
este archivo.

**Una actualización upstream del bundle exige reconciliación manual**, porque la
Parte II está entrelazada con los candados de la Parte I y con las notas de
Valparaíso dentro de cada sección. El original sin tocar vive en
`~/Downloads/higgsfield-art-director/`.
