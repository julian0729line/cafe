import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import HomeMediaFrame from './HomeMediaFrame'

export type LibraryCategoryPreview = {
  title: string
  description?: string
}

export interface LibraryPreviewSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  categories?: LibraryCategoryPreview[]
  mediaLabel?: string
  cta?: { label: string; href: string }
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const DEFAULT_CATEGORIES: LibraryCategoryPreview[] = [
  { title: 'Curaduría literaria', description: 'Una selección propia, cuidada título a título.' },
  { title: 'Club de lectura', description: 'Encuentros para leer y conversar en comunidad.' },
  { title: 'Estantería comunitaria', description: 'Un lugar para compartir y descubrir libros.' },
]

/**
 * «Librería La Maga» — bloque editorial memorable sobre fondo profundo.
 * Composición asimétrica: media frame rotado (foto futura) + detalle
 * tipográfico «M» decorativo + curaduría. Server Component.
 */
export default function LibraryPreviewSection({
  index = '04',
  eyebrow = 'Librería La Maga',
  title = 'Un estante que',
  emphasis = 'conversa con la carta.',
  description = 'Curaduría literaria hecha a mano y clubes de lectura que empiezan con un café servido.',
  categories = DEFAULT_CATEGORIES,
  mediaLabel = 'Librería La Maga',
  cta = { label: 'Conocer Librería La Maga', href: '/libreria' },
  className = '',
}: LibraryPreviewSectionProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-[#4A5728] bg-[#181f0d] py-20 md:py-32', className)}>
      {/* Gran «M» tipográfica decorativa (no es un logo) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 bottom-0 select-none font-playfair font-black italic leading-none text-[#4A5728]/20"
        style={{ fontSize: '34vw' }}
      >
        M
      </span>

      <Container variant="default" className="relative">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* Media frame rotado, listo para una fotografía real */}
          <div className="md:col-span-5">
            <div className="relative" style={{ transform: 'rotate(-1.2deg)' }}>
              <HomeMediaFrame index={index} label={mediaLabel} aspectRatio="4 / 5" />
              <div className="absolute -bottom-3 -right-3 bg-[#C1121F] px-4 py-2">
                <span className="font-sans-app text-[9px] uppercase tracking-[0.3em] text-[#F5F5F0]">
                  La Maga
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#A6B86B]">
              <span className="mr-3 tabular-nums text-[#FF7F70]">{index}</span>
              {eyebrow}
            </p>
            <h2
              className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#F5F5F0]"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)' }}
            >
              {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
            </h2>
            {description ? (
              <p className="mt-6 max-w-xl font-sans-app text-base leading-relaxed text-[#D9DCC4] md:text-lg">
                {description}
              </p>
            ) : null}

            {categories.length > 0 ? (
              <ul className="mt-8 flex flex-col gap-4 border-t border-[#4A5728] pt-8">
                {categories.map((category) => (
                  <li key={category.title} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="text-[#FF7F70]">
                      —
                    </span>
                    <div>
                      <h3 className="font-playfair text-lg text-[#F5F5F0]">{category.title}</h3>
                      {category.description ? (
                        <p className="mt-1 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {cta ? (
              <LinkButton href={cta.href} variant="ghost" size="md" className="mt-10">
                {cta.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
