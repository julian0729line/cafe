import Container from '@/components/ui/Container'
import type { CapituloTexto as CapTexto } from '@/content/menuNumero'

/**
 * Capítulo-texto — el respiro tipográfico que hace que la página se lea como
 * revista y no como galería. Página en marfil (o panel vino), frase Playfair
 * corta y numeral fantasma detrás. Sin foto: alterna con los capítulos-foto
 * (nunca dos fotos seguidas). Server Component.
 */
export default function CapituloTexto({ cap }: { cap: CapTexto }) {
  const vino = cap.variant === 'vino'

  return (
    <section
      className={`relative overflow-hidden ${vino ? 'bg-[#7A2230] text-[#F5F5F0]' : 'bg-[#F5F5F0] text-[#1E2410]'}`}
    >
      {/* Numeral fantasma */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[-0.02em] top-[-0.1em] select-none font-playfair font-bold leading-[0.7] ${
          vino ? 'text-[#F5F5F0] opacity-[0.08]' : 'text-[#4A5728] opacity-[0.07]'
        }`}
        style={{ fontSize: 'clamp(9rem, 22vw, 15rem)' }}
      >
        {cap.numeral}
      </span>

      <Container variant="default">
        <div className="relative z-10 max-w-[22ch] py-16 md:py-28">
          <p
            className={`font-sans-app text-[0.7rem] font-bold uppercase tracking-[0.22em] ${
              vino ? 'text-[#FF7F70]' : 'text-[#C1121F]'
            }`}
          >
            {cap.eyebrow}
          </p>
          <p
            className="mt-4 font-playfair font-medium leading-[1.12] text-balance"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)' }}
          >
            {cap.fraseLead}
            {cap.fraseAccent ? <span className="italic text-[#FF7F70]">{cap.fraseAccent}</span> : null}
          </p>
          <p
            className={`mt-6 max-w-[44ch] font-sans-app text-sm leading-relaxed ${
              vino ? 'text-[#F5F5F0]/80' : 'text-[#4A5728]'
            }`}
          >
            {cap.desc}
          </p>
        </div>
      </Container>
    </section>
  )
}
