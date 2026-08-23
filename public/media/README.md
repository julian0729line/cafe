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

## Fotografía de sedes (/espacios)

`/espacios` acepta **una foto por sede**, y cada sede es independiente: la que
tenga foto la muestra, la que no, conserva su bloque tipográfico sin huecos ni
imágenes rotas. Hoy las dos están en `null`.

1. Deja el archivo en `public/media/espacios/` (por ejemplo
   `public/media/espacios/juanambu-muro.webp`).
2. En `data/spaces.ts`, rellena la sede en `sedePhotos`:

   ```ts
   export const sedePhotos: Record<SedeName, SedePhoto | null> = {
     Pance: null,
     Juanambú: {
       src: '/media/espacios/juanambu-muro.webp',
       alt: 'Muro azul cubierto de cuadros, afiches y retratos frente a las mesas del salón',
       aspect: '4 / 5',
     },
   }
   ```

Formatos: `.webp` o `.jpg`. El `alt` debe describir **lo que se ve en la sala**
(no repetir el nombre de la sede, que ya va como título al lado).

> Regla de la casa: una foto de sede es una promesa de a dónde va a llegar el
> cliente. Solo entra material real del lugar que nombra — nunca una foto de la
> otra sede, ni una imagen genérica de banco de imágenes, ni una generada.

## Galería "El ambiente"
Cada mosaico acepta video o imagen. En `app/page.tsx`, en el arreglo `AMBIENTE`,
agrega a cada rincón la ruta de su archivo, por ejemplo:

    { eyebrow: 'El corazón', label: 'El salón principal',
      cls: 'md:col-span-2 md:row-span-2', video: '/media/salon.mp4' },

y en el `<MediaSlot>` de esa sección pásale `video={video}` (o `image={image}`).

Formatos: `.mp4` (video, H.264) o `.jpg`/`.webp` (imagen).
Mientras no haya archivo, se muestra un mosaico art-directed a la paleta.
