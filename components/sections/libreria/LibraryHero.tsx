import Container from '@/components/ui/Container'

export interface LibraryHeroProps {
  eyebrow?: string
  titleLead?: string
  titleAccent?: string
  description?: string
  index?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Portada editorial de «Librería La Maga»: fondo profundo, una «M» tipográfica
 * gigante y tenue (recurso decorativo, no un logo) sangrando por el borde
 * derecho, título asimétrico y mucho aire. Sin cards, sin fotografía
 * inventada. Server Component.
 */
export default function LibraryHero({
  eyebrow = 'Café Valparaíso · Literatura',
  titleLead = 'Librería',
  titleAccent = 'La Maga.',
  description = 'Curaduría literaria, clubes de lectura y conversación: el rincón de libros de Café Valparaíso.',
  index = '01',
  className = '',
}: LibraryHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-[#4A5728] bg-[#181f0d] py-28 md:py-40',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />

      {/* «M» tipográfica gigante y tenue: recurso decorativo, no un logo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10vw] -top-[12vw] select-none font-playfair text-[#4A5728]/25 font-black italic leading-none"
        style={{ fontSize: '52vw' }}
      >
        M
      </span>

      <Container variant="default" className="relative">
        <div className="max-w-3xl md:ml-[6%]">
          <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
            <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
            {eyebrow}
          </p>
          <h1
            className="mt-6 font-playfair font-black leading-[0.88] tracking-tight text-[#F5F5F0]"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          >
            {titleLead} <em className="italic text-[#FF7F70]">{titleAccent}</em>
          </h1>
          <span className="mt-8 block h-px w-24 bg-[#C1121F]" aria-hidden="true" />
          {description ? (
            <p className="mt-8 max-w-xl font-playfair text-xl italic leading-relaxed text-[#D9DCC4] md:text-2xl">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
