import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import LinkButton from '@/components/ui/LinkButton'

export type LibraryCategoryPreview = {
  title: string
  description?: string
}

export interface LibraryPreviewSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  categories?: LibraryCategoryPreview[]
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_CATEGORIES: LibraryCategoryPreview[] = [
  {
    title: 'Curaduría literaria',
    description: 'Una selección propia, cuidada título a título.',
  },
  {
    title: 'Club de lectura',
    description: 'Encuentros para leer y conversar en comunidad.',
  },
  {
    title: 'Estantería comunitaria',
    description: 'Un lugar para compartir y descubrir libros.',
  },
]

export default function LibraryPreviewSection({
  eyebrow = 'Librería La Maga',
  title = 'Libros y conversación',
  description = 'Curaduría literaria, clubes de lectura y un rincón para perderse entre libros.',
  categories = DEFAULT_CATEGORIES,
  cta = { label: 'Ver librería', href: '/libreria' },
  className = '',
}: LibraryPreviewSectionProps) {
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

        {categories.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.title} variant="outline" padding="md">
                <h3 className="font-playfair text-xl font-bold text-[#F5F5F0]">
                  {category.title}
                </h3>
                {category.description ? (
                  <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                    {category.description}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
