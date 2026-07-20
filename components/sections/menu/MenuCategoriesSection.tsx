import Container from '@/components/ui/Container'

export type MenuCategoryLine = {
  title: string
  description?: string
}

export interface MenuCategoriesSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  categories?: MenuCategoryLine[]
  pendingNote?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Categorías reales de `data/menu.ts` en filas editoriales con hover-fill
 * rojo (`.menu-row`/`.menu-fill`, ya definidas en GOAL 17). No son enlaces:
 * sin carta detallada todavía, así que no se usan `<a>`/`<button>` ni
 * `tabIndex` artificial — el hover es puramente decorativo. Server
 * Component.
 */
export default function MenuCategoriesSection({
  index = '02',
  eyebrow = 'Nuestras líneas',
  title = 'Cuatro formas',
  emphasis = 'de estar en la mesa.',
  categories = [],
  pendingNote = 'La carta completa y sus precios se incorporarán cuando la información esté confirmada.',
  className = '',
}: MenuCategoriesSectionProps) {
  return (
    <section className={cn('bg-[#F5F5F0] py-20 md:py-32', className)}>
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

        {categories.length > 0 ? (
          <ul className="mt-12 border-t border-[#181f0d]/10">
            {categories.map((category, i) => (
              <li
                key={category.title}
                className="menu-row group flex flex-col gap-2 border-b border-[#181f0d]/10 py-7 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="menu-fill" aria-hidden="true" />
                <span className="relative z-10 flex items-baseline gap-5">
                  <span className="font-sans-app text-[11px] tabular-nums text-[#C1121F] transition-colors group-hover:text-[#F5F5F0]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-playfair text-2xl text-[#181f0d] transition-colors group-hover:text-[#F5F5F0] md:text-3xl">
                    {category.title}
                  </span>
                </span>
                {category.description ? (
                  <span className="relative z-10 max-w-md font-sans-app text-sm leading-relaxed text-[#4A5728] transition-colors group-hover:text-[#F5F5F0] md:text-right">
                    {category.description}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {pendingNote ? (
          <p className="mt-10 max-w-xl font-playfair text-base italic leading-relaxed text-[#4A5728]">
            {pendingNote}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
