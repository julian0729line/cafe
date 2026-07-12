import Container from '@/components/ui/Container'

export interface AgendaHeroProps {
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
 * Portada editorial de «Agenda cultural»: fondo profundo, grano, título
 * grande, mucho aire y un detalle de línea roja. Sin cards, sin imagen
 * externa, sin fechas ni artistas inventados. Server Component.
 */
export default function AgendaHero({
  eyebrow = 'Cultura',
  titleLead = 'Agenda',
  titleAccent = 'cultural.',
  description = 'Clubes de lectura, música, conversaciones, arte y cultura: los encuentros que hacemos en Café Valparaíso.',
  index = '01',
  className = '',
}: AgendaHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-[#4A5728] bg-[#181f0d] py-24 md:py-36',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
          <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
          {eyebrow}
        </p>
        <h1
          className="mt-6 max-w-4xl font-playfair font-black leading-[0.9] tracking-tight text-[#F5F5F0]"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          {titleLead} <em className="italic text-[#FF7F70]">{titleAccent}</em>
        </h1>
        <span className="mt-8 block h-px w-24 bg-[#C1121F]" aria-hidden="true" />
        {description ? (
          <p className="mt-8 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B] md:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
