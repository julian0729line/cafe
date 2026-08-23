import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import HeroSection from '@/components/sections/home/HeroSection'
import UniverseSection from '@/components/sections/home/UniverseSection'
import CartaEnMovimientoSection from '@/components/sections/home/CartaEnMovimientoSection'
import ReservationCTASection from '@/components/sections/home/ReservationCTASection'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { siteConfig } from '@/data/site'
import { homeContent } from '@/content/home'
import { menuFeatured } from '@/data/menu'
import { createPageMetadata } from '@/lib/seo'

// El meta-título usa `seo.title` (con la línea "Café literario y cultural en
// Cali"), no `seo.defaultTitle`: el `<h1>` del hero ya muestra "Café
// Valparaíso" a pantalla completa, así que repetir exactamente esas mismas
// dos palabras como meta-título sería un duplicado H1/título innecesario.
export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    path: '/',
  }),
  title: { absolute: siteConfig.seo.title },
}

const navItems = publicNavigation.items.map((item) => ({ ...item }))

const footerNavColumn = {
  title: 'Explora',
  links: publicNavigation.items.map((item) => ({ label: item.label, href: item.href })),
}

const footerContactItems = contactConfig.reservationChannels.map((channel) => ({
  label: 'Contacto',
  value: channel.label,
  href: channel.href,
  external: channel.href.startsWith('http'),
}))

const u = homeContent.universe


// Los platos de «La carta en movimiento» salen de `data/menu.ts` (única fuente
// de verdad de nombres e ingredientes). `content/home.ts` solo elige cuáles y
// en qué orden; si un slug no existiera en los datos, simplemente no se
// muestra en vez de romper la sección.
const ACENTOS: Record<string, string> = {
  lomo: '#FF7F70',
  'te-chai': '#C9A227',
  'capuccino-licor': '#C9A227',
  'blanca-mujer': '#FF7F70',
  tapeo: '#C9A227',
}

const cartaDishes = homeContent.carta.slugs
  .map((slug) => menuFeatured.find((d) => d.slug === slug))
  .filter((d): d is NonNullable<typeof d> => Boolean(d))
  .map((d) => ({
    slug: d.slug,
    nameLead: d.nameLead,
    nameAccent: d.nameAccent,
    ingredients: d.ingredients,
    accent: ACENTOS[d.slug] ?? '#FF7F70',
    lqip: d.lqip,
    hasMobile: d.hasMobile ?? false,
  }))

export default function HomePage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: siteConfig.concept,
        navItems,
        cta: publicNavigation.cta,
        activeHref: '/',
      }}
      footer={{
        brand: siteConfig.name,
        description: siteConfig.description,
        columns: [footerNavColumn],
        contactItems: footerContactItems,
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      {/* 1 · Hero cinematográfico compacto */}
      <HeroSection
        title={homeContent.hero.title}
        titleLead={homeContent.hero.titleLead}
        titleAccent={homeContent.hero.titleAccent}
        tagline={homeContent.hero.tagline}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        microphrase={homeContent.microphrases.hero}
        videoSrc={homeContent.hero.videoSrc}
        posterSrc={homeContent.hero.posterSrc}
      />

      {/* 2 · La carta en movimiento — el único momento experimental */}
      <CartaEnMovimientoSection
        eyebrow={homeContent.carta.eyebrow}
        dishes={cartaDishes}
        cta={homeContent.carta.cta}
      />

      {/* 3 · Universo Valparaíso — dos accesos, la carta ya secundaria */}
      <UniverseSection
        eyebrow={u.eyebrow}
        menu={u.menu}
        spaces={u.spaces}
      />

      {/* 4 · Cierre de reserva */}
      <ReservationCTASection
        title={homeContent.reservationCta.title}
        primaryCta={homeContent.reservationCta.primaryCta}
      />
    </PublicShell>
  )
}
