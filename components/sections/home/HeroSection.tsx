import ScrollExpansionHero from './ScrollExpansionHero'

export type HeroHighlight = {
  label: string
  value: string
}

export type HeroCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface HeroSectionProps {
  eyebrow?: string
  title?: string
  /** Composición visual del título en dos líneas (un único `<h1>`). */
  titleLead?: string
  titleAccent?: string
  description?: string
  /** Micro-labels editoriales en las esquinas superiores del hero. */
  topLeftLabel?: string
  topRightLabel?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  highlights?: HeroHighlight[]
  /** Assets opcionales del hero. Si no existen, se usa un fondo cinematográfico de reserva. */
  videoSrc?: string
  posterSrc?: string
  backgroundSrc?: string
}

const DEFAULT_HIGHLIGHTS: HeroHighlight[] = [
  { label: 'Ciudad', value: 'Cali' },
  { label: 'Sedes', value: 'Pance y Juanambú' },
  { label: 'Librería', value: 'La Maga' },
]

/**
 * Wrapper editorial (Server Component) del hero del home. Toda la lógica de
 * animación ligada al scroll vive en el único Client Component del home,
 * `ScrollExpansionHero`. Este wrapper solo resuelve defaults de contenido y
 * pasa las props necesarias.
 */
export default function HeroSection({
  eyebrow = 'Café literario, cultural, artístico y gastronómico',
  title = 'Café Valparaíso',
  titleLead = 'Café',
  titleAccent = 'Valparaíso',
  description = 'Un lugar para leer, conversar y comer. Sedes en Pance y Juanambú, en Cali.',
  topLeftLabel = 'Café · Cultura · Cocina',
  topRightLabel = 'Cali, Colombia',
  primaryCta = { label: 'Reservar', href: '/reservas' },
  secondaryCta = { label: 'Ver agenda', href: '/agenda' },
  highlights = DEFAULT_HIGHLIGHTS,
  videoSrc,
  posterSrc,
  backgroundSrc,
}: HeroSectionProps) {
  return (
    <ScrollExpansionHero
      eyebrow={eyebrow}
      title={title}
      titleLead={titleLead}
      titleAccent={titleAccent}
      description={description}
      topLeftLabel={topLeftLabel}
      topRightLabel={topRightLabel}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      highlights={highlights}
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      backgroundSrc={backgroundSrc}
    />
  )
}
