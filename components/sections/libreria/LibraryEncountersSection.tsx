import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export type LibraryEncountersCta = { label: string; href: string }

export interface LibraryEncountersSectionProps {
  eyebrow?: string
  title?: string
  message?: string
  cta?: LibraryEncountersCta
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Estado editorial de «Clubes y encuentros»: `data/library.ts` no trae
 * programación confirmada (fechas, moderadores, sedes), así que se declara
 * como decisión editorial y no como error, con salida a la agenda cultural.
 * Sin fechas, libros ni moderadores inventados. Server Component.
 */
export default function LibraryEncountersSection({
  eyebrow = 'Clubes y encuentros',
  title = 'La próxima programación de clubes y encuentros se publicará próximamente.',
  message = 'Club de lectura: encuentros para leer y conversar en comunidad. Fechas, títulos y moderadores se confirman antes de publicarse.',
  cta = { label: 'Ver agenda', href: '/agenda' },
  className = '',
}: LibraryEncountersSectionProps) {
  return (
    <section className={cn('bg-[#2A331A] py-16 md:py-24', className)}>
      <Container variant="default">
        <div className="border border-[#C1121F] bg-[#343E1C] px-8 py-14 md:px-14 md:py-16">
          <span className="font-sans-app text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF7F70]">
            {eyebrow}
          </span>
          <p className="mt-6 max-w-2xl font-playfair text-2xl italic leading-snug text-[#F5F5F0] md:text-3xl">
            {title}
          </p>
          {message ? (
            <p className="mt-5 max-w-xl font-sans-app text-base leading-relaxed text-[#A6B86B]">
              {message}
            </p>
          ) : null}
          {cta ? (
            <div className="mt-8">
              <LinkButton href={cta.href} variant="ghost" size="md">
                {cta.label}
              </LinkButton>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
