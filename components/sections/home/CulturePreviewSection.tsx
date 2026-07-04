import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type CultureEventPreview = {
  title: string
  category?: string
  dateLabel?: string
  description?: string
  href?: string
}

export interface CulturePreviewSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  events?: CultureEventPreview[]
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_EVENTS: CultureEventPreview[] = [
  { title: 'Club de lectura', category: 'Comunidad' },
  { title: 'Noche de lecturas en voz alta', category: 'Literatura' },
  { title: 'Encuentro de autores locales', category: 'Cultura' },
]

export default function CulturePreviewSection({
  eyebrow = 'Agenda cultural',
  title = 'Cosas que pasan aquí',
  description = 'Encuentros, lecturas y actividades para vivir la cultura más allá de una taza de café.',
  events = DEFAULT_EVENTS,
  cta = { label: 'Ver agenda', href: '/agenda' },
  className = '',
}: CulturePreviewSectionProps) {
  return (
    <section className={cn('border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-28', className)}>
      <Container variant="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          {cta ? (
            <LinkButton href={cta.href} variant="ghost" size="md" className="shrink-0">
              {cta.label}
            </LinkButton>
          ) : null}
        </div>

        {events.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {events.map((event) => (
              <Card key={event.title} variant="dark" padding="md">
                {event.category ? <Badge variant="olive">{event.category}</Badge> : null}
                <h3 className="mt-4 font-playfair text-xl font-bold text-[#F5F5F0]">
                  {event.title}
                </h3>
                {event.dateLabel ? (
                  <p className="mt-2 font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#A6B86B]">
                    {event.dateLabel}
                  </p>
                ) : null}
                {event.description ? (
                  <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                    {event.description}
                  </p>
                ) : null}
                {event.href ? (
                  <LinkButton href={event.href} variant="ghost" size="sm" className="mt-6">
                    Ver más
                  </LinkButton>
                ) : null}
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-12 font-playfair italic text-lg text-[#D9DCC4]">
            Próximamente publicaremos la agenda cultural.
          </p>
        )}
      </Container>
    </section>
  )
}
