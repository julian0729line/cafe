import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type SpacePreview = {
  title: string
  description?: string
  tag?: string
  href?: string
}

export interface SpacesPreviewSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  spaces?: SpacePreview[]
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_SPACES: SpacePreview[] = [
  { title: 'Salón principal', tag: 'Encuentros' },
  { title: 'Sala de lectura', tag: 'Enfoque' },
  { title: 'Espacio para eventos', tag: 'Celebraciones' },
]

export default function SpacesPreviewSection({
  eyebrow = 'Espacios',
  title = 'Un lugar para cada encuentro',
  description = 'Espacios pensados para reuniones, celebraciones y actividades culturales.',
  spaces = DEFAULT_SPACES,
  cta = { label: 'Ver espacios', href: '/espacios' },
  className = '',
}: SpacesPreviewSectionProps) {
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

        {spaces.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {spaces.map((space) => (
              <Card key={space.title} variant="dark" padding="md">
                {space.tag ? <Badge variant="brass">{space.tag}</Badge> : null}
                <h3 className="mt-4 font-playfair text-xl font-bold text-[#F5F5F0]">
                  {space.title}
                </h3>
                {space.description ? (
                  <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                    {space.description}
                  </p>
                ) : null}
                {space.href ? (
                  <LinkButton href={space.href} variant="ghost" size="sm" className="mt-6">
                    Ver más
                  </LinkButton>
                ) : null}
              </Card>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
