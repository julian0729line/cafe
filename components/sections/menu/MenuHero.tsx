import Container from '@/components/ui/Container'

export interface MenuHeroProps {
  eyebrow?: string
  titleLead?: string
  titleAccent?: string
  description?: string
  note?: string
  index?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Portada editorial de «El menú»: fondo marfil luminoso (a diferencia del
 * fondo profundo de Agenda), acento rojo AA sobre papel. Sin platos ni
 * fotografías inventadas. Server Component.
 */
export default function MenuHero({
  eyebrow = 'Gastronomía',
  titleLead = 'El',
  titleAccent = 'menú.',
  description = 'Café, cocina, coctelería y postres.',
  note = 'Nuestras líneas gastronómicas, con identidad propia.',
  index = '01',
  className = '',
}: MenuHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-[rgba(28,25,18,0.12)] bg-[#F5F5F0] py-24 md:py-36',
        className
      )}
    >
      <span className="grain-soft" aria-hidden="true" />
      <Container variant="default" className="relative">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h1
          className="mt-6 max-w-4xl font-playfair font-black leading-[0.9] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          {titleLead} <em className="italic text-[#C1121F]">{titleAccent}</em>
        </h1>
        <span className="mt-8 block h-px w-24 bg-[#C1121F]" aria-hidden="true" />
        {description ? (
          <p className="mt-8 max-w-xl font-playfair text-xl italic leading-relaxed text-[#181f0d] md:text-2xl">
            {description}
          </p>
        ) : null}
        {note ? (
          <p className="mt-3 max-w-xl font-sans-app text-base leading-relaxed text-[#4A5728]">
            {note}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
