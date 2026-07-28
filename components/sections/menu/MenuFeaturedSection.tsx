import Container from '@/components/ui/Container'
import DishTile from './DishTile'
import type { MenuFeaturedItem } from '@/data/menu'

export interface MenuFeaturedSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  items?: MenuFeaturedItem[]
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Destacados de la casa — galería de platos, bebidas y postres con foto real
 * como cinemagraphs (baldosas `DishTile`). Dirigida por `menuFeatured` de
 * `data/menu.ts`: crece sola a medida que el negocio sube más fotos. Si no hay
 * ítems, la sección no se renderiza. El grid respeta la relación de aspecto de
 * cada ítem. Server Component.
 */
export default function MenuFeaturedSection({
  index = '03',
  eyebrow = 'De la cocina y la barra',
  title = 'Lo que sale',
  emphasis = 'a la mesa.',
  items = [],
  className = '',
}: MenuFeaturedSectionProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('bg-[#F5F5F0] pb-20 md:pb-28', className)}>
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 max-w-3xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <DishTile key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
