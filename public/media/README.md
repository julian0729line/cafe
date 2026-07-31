# Medios (videos y fotos) del Café Literario

Sube aquí tus archivos y la web los usará automáticamente, con el tratamiento
duotono, el scrim y el zoom en hover ya aplicados.

## Video de fondo del hero (home actual)

El hero real del home (`components/sections/home/ScrollExpansionHero.tsx`) usa
`public/media/valparaiso-home.mp4`: vertical, 480×848, ~11s, con pista de
audio AAC (silenciada vía `muted`; no se pudo remover porque el entorno no
tiene `ffmpeg` — ver `docs/HERO_VIDEO_REAL.md`).

Las rutas fluyen tipadas por una sola fuente de verdad — no se duplican rutas
literales en ningún componente:

```
content/home.ts (hero.videoSrc / hero.posterSrc)
  -> app/page.tsx
  -> components/sections/home/HeroSection.tsx
  -> components/sections/home/ScrollExpansionHero.tsx
```

Para activar el poster (fondo ambiental desenfocado + crossfade al reproducir):
1. Coloca la imagen en `public/media/valparaiso-home-poster.webp`.
2. En `content/home.ts`, cambia `hero.posterSrc: undefined` por la ruta
   `'/media/valparaiso-home-poster.webp'`.

Mientras `posterSrc` sea `undefined`, el hero degrada de forma segura: sin
capa ambiental, sin crossfade, sin 404 ni ícono roto — el video aparece
directamente sobre el degradado editorial de reserva en cuanto está listo.

> Nota: el componente legado `app/components/Hero.tsx` (con la constante
> `HERO_VIDEO`) ya se eliminó del repo — nunca formó parte de este flujo.

## Galería "El ambiente"
Cada mosaico acepta video o imagen. En `app/page.tsx`, en el arreglo `AMBIENTE`,
agrega a cada rincón la ruta de su archivo, por ejemplo:

    { eyebrow: 'El corazón', label: 'El salón principal',
      cls: 'md:col-span-2 md:row-span-2', video: '/media/salon.mp4' },

y en el `<MediaSlot>` de esa sección pásale `video={video}` (o `image={image}`).

Formatos: `.mp4` (video, H.264) o `.jpg`/`.webp` (imagen).
Mientras no haya archivo, se muestra un mosaico art-directed a la paleta.
