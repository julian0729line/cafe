# Medios (videos y fotos) del Café Literario

Sube aquí tus archivos y la web los usará automáticamente, con el tratamiento
duotono, el scrim y el zoom en hover ya aplicados.

## Video de fondo del hero
1. Sube tu video como `public/media/hero.mp4` (recomendado: 1920x1080, mudo,
   10-20s en loop, < 8 MB).
2. En `app/components/Hero.tsx` cambia:
   `const HERO_VIDEO = null`  ->  `const HERO_VIDEO = '/media/hero.mp4'`
   (opcional) `const HERO_POSTER = '/media/hero.jpg'` para el primer frame.

## Galería "El ambiente"
Cada mosaico acepta video o imagen. En `app/page.tsx`, en el arreglo `AMBIENTE`,
agrega a cada rincón la ruta de su archivo, por ejemplo:

    { eyebrow: 'El corazón', label: 'El salón principal',
      cls: 'md:col-span-2 md:row-span-2', video: '/media/salon.mp4' },

y en el `<MediaSlot>` de esa sección pásale `video={video}` (o `image={image}`).

Formatos: `.mp4` (video, H.264) o `.jpg`/`.webp` (imagen).
Mientras no haya archivo, se muestra un mosaico art-directed a la paleta.
