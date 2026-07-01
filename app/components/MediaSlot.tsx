import type { ReactNode } from 'react'

/**
 * Ranura de medios lista para tus videos/fotos.
 *
 * - Sube tus archivos a `public/media/` (por ejemplo `public/media/salon.mp4`).
 * - Pasa la ruta: <MediaSlot video="/media/salon.mp4" poster="/media/salon.jpg" />
 *   o una imagen: <MediaSlot image="/media/salon.jpg" />
 * - Mientras no haya archivo, se muestra un mosaico art-directed a la paleta.
 *
 * Todo el tratamiento (duotono, scrim, zoom en hover) se aplica solo.
 */
export function MediaSlot({
  video,
  image,
  poster,
  eyebrow,
  label,
  className = '',
  children,
}: {
  video?: string
  image?: string
  poster?: string
  eyebrow?: string
  label?: string
  className?: string
  children?: ReactNode
}) {
  const hasMedia = Boolean(video || image)

  return (
    <div className={`group media-frame ${hasMedia ? '' : 'tile'} ${className}`}>
      {video ? (
        <video
          className="media-zoom"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          src={video}
        />
      ) : image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="media-zoom" src={image} alt={label ?? ''} />
      ) : null}

      {hasMedia && <div className="media-scrim" />}

      {(eyebrow || label || children) && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
          {children ? (
            children
          ) : (
            <>
              {eyebrow && (
                <span className="font-sans-app text-[9px] font-bold tracking-[0.35em] uppercase text-[#FF7F70] mb-2">
                  {eyebrow}
                </span>
              )}
              {label && (
                <span className="font-playfair italic text-[#F5F5F0] text-2xl leading-tight">
                  {label}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
