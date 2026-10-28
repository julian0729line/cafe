import { ticker } from '@/lib/content'

/** Banda roja en movimiento continuo. El contenido va duplicado: la animación
 *  recorre exactamente la mitad, así que el salto al reiniciar es invisible. */
export default function Marquee() {
  const run = [...ticker, ...ticker]
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-2 border-[#181f0d] bg-[#C1121F] py-4"
    >
      <div className="ck-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {run.map((word, index) => (
          <span key={`${word}-${index}`} className="flex items-center gap-6">
            <span className="font-playfair text-[24px] font-medium italic text-[#F5F5F0] md:text-[30px]">
              {word}
            </span>
            <span className="text-[#181f0d]">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
