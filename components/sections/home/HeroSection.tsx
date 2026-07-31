import ScrollExpansionHero from './ScrollExpansionHero'
import { contactConfig } from '@/data/contact'

export type HeroCta = {
  label: string
  href: string
  external?: boolean
  ariaLabel?: string
}

export interface HeroSectionProps {
  title?: string
  /** Composición visual del título en dos líneas (un único `<h1>`). */
  titleLead?: string
  titleAccent?: string
  /** Línea breve bajo el título (una sola). */
  tagline?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  /** Microfrase editorial flotante, decorativa. */
  microphrase?: string
  /** Assets opcionales del hero. Si no existen, se usa un fondo de reserva. */
  videoSrc?: string
  posterSrc?: string
  backgroundSrc?: string
}

/**
 * Wrapper editorial (Server Component) del hero compacto del home. Toda la
 * lógica de animación ligada al scroll vive en el Client Component
 * `ScrollExpansionHero`. Este wrapper solo resuelve defaults y pasa props.
 */
export default function HeroSection({
  title = 'Café Valparaíso',
  titleLead = 'Café',
  titleAccent = 'Valparaíso',
  tagline = 'Café, cocina y cultura en Cali.',
  primaryCta = { label: 'Reservar', href: contactConfig.whatsappHref, external: true },
  secondaryCta = { label: 'Ver menú', href: '/menu' },
  microphrase,
  videoSrc,
  posterSrc,
  backgroundSrc,
}: HeroSectionProps) {
  return (
    <ScrollExpansionHero
      title={title}
      titleLead={titleLead}
      titleAccent={titleAccent}
      tagline={tagline}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      microphrase={microphrase}
      videoSrc={videoSrc}
      posterSrc={posterSrc}
      backgroundSrc={backgroundSrc}
    />
  )
}
