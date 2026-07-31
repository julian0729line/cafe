import Image from 'next/image'

export interface HomeMediaFrameProps {
  /** Ruta local de una fotografía real (p. ej. `/media/la-maga.webp`). Si no
   *  existe, se muestra una composición editorial sobria (nunca una imagen rota). */
  src?: string
  alt?: string
  /** Etiqueta editorial mostrada en el marco (nombre de la sede, la librería…). */
  label?: string
  /** Número de sección/pieza, opcional, en la esquina. */
  index?: string
  /** Pie de foto editorial (crédito/lugar). Solo se muestra si hay `src` real
   *  o como intención de encuadre cuando el marco está vacío. */
  caption?: string
  /** Relación de aspecto reservada para evitar layout shift. Por defecto `4 / 5`. */
  aspectRatio?: string
  /** Textura del marco vacío: `tile` (mosaico art-directed con matiz cálido) u
   *  `olive` (superficie sobria plana, comportamiento histórico). */
  emptyTexture?: 'tile' | 'olive'
  /** Prioridad de carga para imágenes LCP. */
  priority?: boolean
  className?: string
}

/**
 * Marco de medios del home (Server Component). Reserva la proporción para una
 * futura fotografía real: si se pasa `src`, usa `next/image`; si no, muestra un
 * fallback editorial con intención compositiva (mosaico art-directed a la
 * paleta, número de pieza, label e indicación discreta). No usa gradientes
 * genéricos, URLs externas ni iconos de imagen rota, y nunca finge que existe
 * una foto — pero tampoco se lee como un hueco vacío.
 */
export default function HomeMediaFrame({
  src,
  alt = '',
  label,
  index,
  caption,
  aspectRatio = '4 / 5',
  emptyTexture = 'tile',
  priority = false,
  className = '',
}: HomeMediaFrameProps) {
  return (
    <figure
      className={`relative m-0 overflow-hidden border border-[#4A5728] bg-[#343E1C] ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
          {caption ? (
            <figcaption className="absolute inset-x-4 bottom-4 font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#F5F5F0]/70">
              {caption}
            </figcaption>
          ) : null}
        </>
      ) : (
        <div className={`absolute inset-0 ${emptyTexture === 'tile' ? 'tile' : ''}`} aria-hidden="true">
          <span className="grain-soft" />
          {/* Hatch editorial diagonal para que el marco vacío lea como encuadre,
              no como hueco. Decorativo, sin coste de red. */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, #F5F5F0 0px, #F5F5F0 1px, transparent 1px, transparent 26px)',
            }}
          />
          {index ? (
            <span className="absolute left-4 top-4 font-playfair text-2xl font-black italic leading-none text-[#F5F5F0]/25">
              {index}
            </span>
          ) : null}
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1">
            {label ? (
              <span className="font-playfair text-lg italic text-[#F5F5F0]/85">{label}</span>
            ) : null}
            <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#A6B86B]">
              {caption ?? 'Imagen pendiente'}
            </span>
          </div>
        </div>
      )}
    </figure>
  )
}
