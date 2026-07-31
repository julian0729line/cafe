import Container from '@/components/ui/Container'
import NumeroFoto from './NumeroFoto'
import type { MenuFeaturedItem } from '@/data/menu'

/**
 * Portada del número — la «historia de portada»: el plato de la casa contenido
 * en panel verde profundo + su nombre binomial gigante. Sin precio. El panel
 * oscuro es el marco donde entra la fotografía real; su tono sale de la paleta
 * de marca (verdes/noche), nunca de un marrón. Server Component.
 */
export default function PortadaCarta({
  eyebrow,
  dish,
  sub,
}: {
  eyebrow: string
  dish: MenuFeaturedItem
  sub: string
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#181F0D] text-[#F5F5F0]"
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 15% 10%, rgba(74,87,40,.55), transparent 55%),' +
          'radial-gradient(120% 120% at 92% 100%, rgba(18,24,10,.9), transparent 60%)',
      }}
    >
      <Container variant="default">
        <div className="grid items-center gap-8 py-14 md:grid-cols-[minmax(0,44%)_minmax(0,1fr)] md:gap-14 md:py-24">
          <NumeroFoto dish={dish} className="mx-auto w-full max-w-[420px] md:mx-0" />
          <div>
            <p className="font-sans-app text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#FF7F70]">
              {eyebrow}
            </p>
            <h2
              className="mt-3 font-playfair font-semibold leading-[0.9] tracking-[-0.02em] text-balance"
              style={{ fontSize: 'clamp(3.25rem, 9vw, 5rem)' }}
            >
              {dish.nameLead} <span className="italic text-[#FF7F70]">{dish.nameAccent}</span>
            </h2>
            <p
              className="mt-3 max-w-[24ch] font-playfair leading-snug text-[#F5F5F0]/75"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              {sub}
            </p>
            <p className="mt-6 font-sans-app text-xs uppercase tracking-[0.05em] text-[#F5F5F0]/60">
              {dish.ingredients}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
