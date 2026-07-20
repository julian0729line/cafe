# Video real del hero — Café Valparaíso

Documenta la integración del primer video real (`public/media/valparaiso-home.mp4`)
como fondo del hero expansivo (`docs/HOME_HERO_EXPANSIVO.md`), reemplazando
el fondo cinematográfico de reserva por el medio real cuando está disponible.

## 1. Asset

- Ruta: `public/media/valparaiso-home.mp4`
- Formato: MP4 (H.264/`avc1`), pista de audio AAC
- Dimensiones: **480×848** (vertical, ratio ≈ 0.566)
- Duración: ~11.03s, en loop
- Peso: ~1.8 MB
- `moov` antes de `mdat` (faststart ya presente; no requiere reprocesado
  para empezar a reproducir antes de descargar el archivo completo)

## 2. Limitación conocida: audio no removido

El entorno de desarrollo usado para esta integración no tiene `ffmpeg`
instalado, y no está autorizado instalar software adicional. Por lo tanto
**la pista de audio AAC original sigue presente en el archivo**; el hero
depende exclusivamente del atributo `muted` (+ `playsInline`, requerido en
iOS para permitir autoplay silencioso) para garantizar que nunca se
reproduzca sonido.

Si en el futuro se dispone de `ffmpeg`, se recomienda reencodear sin audio
para reducir el peso del archivo:

```
ffmpeg -i valparaiso-home.mp4 -an -c:v copy valparaiso-home-sinaudio.mp4
```

## 3. Por qué un video vertical necesita un tratamiento distinto

El hero ocupa todo el ancho del viewport en tablet/desktop. Un video
480×848 estirado o recortado a `object-cover` en una franja horizontal
ancha se vería como un recorte agresivo del encuadre original (perdería
la composición vertical). La solución adoptada:

- **Mobile**: `object-cover` — el viewport ya es angosto y vertical, el
  recorte es mínimo y el resultado es idéntico a un hero de video estándar.
- **Tablet/desktop (`md:` en adelante)**: `object-contain` — el video se
  ve completo, centrado, sin recortar sus lados. El espacio sobrante a los
  costados lo ocupa una **capa ambiental**: el mismo poster, oscurecido
  (`brightness-[0.55]`) y desenfocado (`blur-2xl`), a `object-cover` y con
  `scale-110` (para que el desenfoque no deje un borde transparente visible
  en los límites de la imagen). El resultado es un fondo continuo sin
  barras negras ni vacíos.

## 4. Crossfade poster → video

En vez de asumir que el video está listo de inmediato, el componente
escucha `onCanPlay`/`onLoadedData` del propio `<video>` para saber cuándo
puede empezar a mostrarse (`videoReady`). Mientras tanto se ve el poster
(o, si no hay poster, el degradado editorial de reserva ya existente —
nunca pantalla negra ni ícono roto). Al quedar listo, una transición
`transition-opacity duration-700 ease-out` cruza la opacidad del poster
(a `0`) con la del video (a `1`).

`showVideo = videoReady && !reduce` es la única fuente de verdad de esa
transición: con `prefers-reduced-motion: reduce` nunca llega a `true`, así
que el poster (o el fondo de reserva) permanece visible de forma estática,
sin importar si el evento del video ya disparó.

## 5. Reduced motion

El atributo HTML `autoPlay` no puede condicionarse a la preferencia de
movimiento reducido del usuario. Por eso el play/pause se controla de
forma **imperativa**, reutilizando el patrón `mounted`/`reduce` ya
existente en el componente (evita mismatch de hidratación):

```ts
useEffect(() => {
  const video = videoRef.current
  if (!video) return
  if (reduce) {
    video.pause()
    return
  }
  video.play().catch(() => {})
}, [reduce])
```

Con `prefers-reduced-motion: reduce`: el video queda pausado, solo se ve
el poster/fondo estático, y no hay expansión ligada al scroll (mecánica ya
cubierta por `docs/HOME_HERO_EXPANSIVO.md` §6, sin cambios).

## 6. Poster — aplazado (decisión, no bloqueante)

**El video real ya está integrado y activo en el hero.** La creación del
poster queda **aplazada como decisión de producto**: no hay un archivo real
verificado (mismo encuadre del video, del café real) disponible todavía, y
su ausencia **no bloquea ni rompe la página**.

`public/media/valparaiso-home-poster.webp` **no existe** en este
repositorio y no se referencia en ningún componente. `content/home.ts` deja
`hero.posterSrc: undefined` de forma explícita y comentada. Con `posterSrc`
en `undefined`:

- El hero usa su **fallback editorial CSS** existente (`#181f0d`, superficies
  oliva, `grain-soft`, overlay oscuro) — la misma composición estable de
  `docs/HOME_HERO_EXPANSIVO.md`, sin pantalla negra ni layout shift.
- No se renderiza ninguna capa ambiental ni de poster en primer plano.
- El `<video poster={undefined}>` simplemente omite el atributo (sin 404).
- El video crossfadea directo sobre ese fallback en cuanto
  `onCanPlay`/`onLoadedData` dispara; si el video nunca llega a estar listo
  (falla de red, códec no soportado, etc.), el fallback permanece visible
  indefinidamente — nunca queda una referencia rota.
- Con `prefers-reduced-motion: reduce`, se muestra únicamente ese fallback
  estático (el video quedaría pausado y en opacidad 0 aunque llegara a
  cargar), con título, copy y CTA visibles desde el inicio.

El poster **podrá añadirse más adelante sin modificar la arquitectura**: la
prop `posterSrc` ya está tipada y conectada de punta a punta.

Para activarlo cuando exista un poster real y verificado (mismo encuadre
que el video, sin marcas de agua ni contenido no relacionado):

1. Colocar el archivo en `public/media/valparaiso-home-poster.webp`.
2. En `content/home.ts`, cambiar `posterSrc: undefined` por
   `'/media/valparaiso-home-poster.webp'`.

No se requiere ningún otro cambio de código: el componente ya está
preparado para ambos casos.

## 7. Flujo de datos (sin rutas duplicadas)

```
content/home.ts (hero.videoSrc, hero.posterSrc)
  -> app/page.tsx           (<HeroSection videoSrc posterSrc />)
  -> HeroSection.tsx         (Server Component, ya exponía estas props)
  -> ScrollExpansionHero.tsx (Client Component, capas + crossfade + reduced motion)
```

`HeroSection.tsx` no requirió cambios: ya declaraba y reenviaba
`videoSrc`/`posterSrc`/`backgroundSrc` desde el GOAL 16.

## 8. Archivos modificados

- **Creado**: `public/media/valparaiso-home.mp4` (asset real).
- **Creado**: `docs/HERO_VIDEO_REAL.md` (este documento).
- **Modificado**: `content/home.ts` — `hero.videoSrc`/`hero.posterSrc`.
- **Modificado**: `app/page.tsx` — pasa `videoSrc`/`posterSrc` a `HeroSection`.
- **Modificado**: `components/sections/home/ScrollExpansionHero.tsx` — capas
  de poster/ambiente/crossfade, `object-cover`/`object-contain` responsive,
  control imperativo de reduced motion.
- **Modificado**: `public/media/README.md` — documenta la ruta real y el
  flujo de activación del poster.
- **No modificado**: `HeroSection.tsx`, `app/globals.css` (todo el
  tratamiento se resolvió con utilidades Tailwind inline; no hizo falta
  ninguna clase nueva).

## 9. Validaciones

- `npm run lint`: sin nuevos errores/warnings.
- `npx tsc --noEmit`: exit 0.
- `npm run build`: exitoso sin variables de entorno; `/` sigue estática.
- Revisión visual (360/390/768/1280/1440): video vertical completo sin
  recorte en tablet/desktop, recorte mínimo en mobile, sin barras negras,
  sin layout shift, sin ícono roto, sin controles nativos visibles.
- `prefers-reduced-motion: reduce`: solo se ve el fondo estático (poster o
  degradado de reserva), sin autoplay, sin expansión ligada al scroll.
