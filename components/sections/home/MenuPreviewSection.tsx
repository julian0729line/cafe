import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'

export type MenuPreviewItem = {
  title: string
  category?: string
  description?: string
  href?: string
}

export interface MenuPreviewSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  items?: MenuPreviewItem[]
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_ITEMS: MenuPreviewItem[] = [
  { title: 'Cafés de especialidad', category: 'Café' },
  { title: 'Cocina de autor', category: 'Cocina' },
  { title: 'Coctelería de temporada', category: 'Coctelería' },
  { title: 'Postres de la casa', category: 'Postres' },
]

export default function MenuPreviewSection({
  eyebrow = 'Lo que servimos',
  title = 'Nuestro menú',
  description = 'Café, cocina y coctelería con identidad propia, pensados para acompañar cada visita.',
  items = DEFAULT_ITEMS,
  cta = { label: 'Ver menú', href: '/menu' },
  className = '',
}: MenuPreviewSectionProps) {
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

        {items.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <Card key={item.title} variant="paper" padding="md">
                {item.category ? <Badge variant="wine">{item.category}</Badge> : null}
                <h3 className="mt-4 font-playfair text-xl font-bold text-[#1C1912]">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#6B6355]">
                    {item.description}
                  </p>
                ) : null}
                {item.href ? (
                  <LinkButton href={item.href} variant="wine" size="sm" className="mt-6">
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
