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
  /** Relación de aspecto reservada para evitar layout shift. Por defecto `4 / 5`. */
  aspectRatio?: string
  className?: string
}

/**
 * Marco de medios del home (Server Component). Reserva la proporción para una
 * futura fotografía real: si se pasa `src`, usa `next/image`; si no, muestra un
 * fallback editorial sobrio (superficie oliva + grano + número + label + nota
 * discreta «Imagen pendiente»). No usa gradientes genéricos, URLs externas,
 * `<image-slot>` ni iconos de imagen rota, y nunca finge que existe una foto.
 */
export default function HomeMediaFrame({
  src,
  alt = '',
  label,
  index,
  aspectRatio = '4 / 5',
  className = '',
}: HomeMediaFrameProps) {
  return (
    <div
      className={`relative overflow-hidden border border-[#4A5728] bg-[#343E1C] ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          {/* Superficie oliva + grano, sin gradientes genéricos */}
          <span className="grain-soft" />
          {index ? (
            <span className="absolute left-4 top-4 font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A9A52]">
              {index}
            </span>
          ) : null}
          <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1">
            {label ? (
              <span className="font-playfair text-lg italic text-[#F5F5F0]/85">{label}</span>
            ) : null}
            <span className="font-sans-app text-[10px] uppercase tracking-[0.25em] text-[#8A9A52]">
              Imagen pendiente
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
