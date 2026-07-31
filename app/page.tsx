import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import HeroSection from '@/components/sections/home/HeroSection'
import UniverseSection from '@/components/sections/home/UniverseSection'
import AtmosphereBreakSection from '@/components/sections/home/AtmosphereBreakSection'
import ReservationCTASection from '@/components/sections/home/ReservationCTASection'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { siteConfig } from '@/data/site'
import { homeContent } from '@/content/home'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    path: '/',
  }),
  title: { absolute: siteConfig.seo.defaultTitle },
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
}))

const u = homeContent.universe

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

      {/* 2 · Universo Valparaíso — dos accesos */}
      <UniverseSection
        eyebrow={u.eyebrow}
        menu={u.menu}
        spaces={u.spaces}
      />

      {/* 3 · Atmósfera — respiración visual con «Tapeo Cortázar» (entrada) */}
      <AtmosphereBreakSection
        kicker={homeContent.atmosphere.kicker}
        dishLead={homeContent.atmosphere.dishLead}
        dishAccent={homeContent.atmosphere.dishAccent}
        ingredients={homeContent.atmosphere.ingredients}
        microphrase={homeContent.atmosphere.microphrase}
      />

      {/* 4 · Cierre de reserva */}
      <ReservationCTASection
        title={homeContent.reservationCta.title}
        primaryCta={homeContent.reservationCta.primaryCta}
      />
    </PublicShell>
  )
}
