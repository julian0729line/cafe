import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'
import Folio from '@/components/ui/Folio'
import GhostType from '@/components/ui/GhostType'
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
 * «Librería La Maga» — el momento compositivo más audaz del home. Doble capa de
 * asimetría: media rotada que se superpone con el titular Playfair, sello rojo
 * «La Maga» y tipografía-imagen «M». Server Component.
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
    <section
      className={cn('relative overflow-hidden bg-[#181f0d] py-24 md:py-36', className)}
    >
      <GhostType tone="night" position="left-bottom" sizeVw={38} opacity={0.08}>
        M
      </GhostType>

      <Container variant="default" className="relative">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-x-14">
          {/* Media rotada + sello, tirada hacia arriba para superponerse con el
              titular en desktop (capa, no fila). */}
          <div className="md:col-span-5 md:pt-12">
            <div className="relative z-0" style={{ transform: 'rotate(-1.4deg)' }}>
              <HomeMediaFrame
                index={index}
                label={mediaLabel}
                caption="Cali · Librería La Maga"
                aspectRatio="4 / 5"
              />
              <div className="absolute -bottom-3 -right-3 rotate-[2deg] bg-[#C1121F] px-4 py-2">
                <span className="font-sans-app text-[9px] uppercase tracking-[0.3em] text-[#F5F5F0]">
                  La Maga
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 md:col-span-7 md:-ml-10">
            <Folio number={index} label={eyebrow} tone="night" variant="stacked" />
            <h2
              className="mt-8 font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)' }}
            >
              {title} <span className="italic text-[#FF7F70]">{emphasis}</span>
            </h2>
            {description ? (
              <p className="mt-6 max-w-xl font-sans-app text-base leading-relaxed text-[#D9DCC4] md:text-lg">
                {description}
              </p>
            ) : null}

            {categories.length > 0 ? (
              <ul className="mt-9 flex flex-col gap-4 border-t border-[#4A5728] pt-8">
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
