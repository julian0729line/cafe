import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import HeroSection from '@/components/sections/home/HeroSection'
import AboutSection from '@/components/sections/home/AboutSection'
import CulturePreviewSection from '@/components/sections/home/CulturePreviewSection'
import MenuPreviewSection from '@/components/sections/home/MenuPreviewSection'
import LibraryPreviewSection from '@/components/sections/home/LibraryPreviewSection'
import SpacesPreviewSection from '@/components/sections/home/SpacesPreviewSection'
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

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
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

const cultureEvents = homeContent.culture.events.map((event) => ({
  title: event.title,
  category: event.category,
  dateLabel: nullableToUndefined(event.dateLabel),
  description: nullableToUndefined(event.description),
  href: nullableToUndefined(event.href),
}))

const menuItems = homeContent.menu.items.map((item) => ({
  title: item.title,
  category: item.category,
  description: nullableToUndefined(item.description),
}))

const spaces = homeContent.spaces.spaces.map((space) => ({
  title: space.title,
  tag: nullableToUndefined(space.tag),
  description: nullableToUndefined(space.description),
}))

export default function HomePage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: homeContent.hero.eyebrow,
        navItems,
        cta: publicNavigation.cta,
      }}
      footer={{
        brand: siteConfig.name,
        description: siteConfig.description,
        columns: [footerNavColumn],
        contactItems: footerContactItems,
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      <HeroSection
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        highlights={[...homeContent.hero.highlights]}
      />
      <AboutSection
        eyebrow={homeContent.about.eyebrow}
        title={homeContent.about.title}
        description={homeContent.about.description}
        features={[...homeContent.about.features]}
      />
      <CulturePreviewSection
        eyebrow={homeContent.culture.eyebrow}
        title={homeContent.culture.title}
        description={homeContent.culture.description}
        events={cultureEvents}
        cta={homeContent.culture.cta}
      />
      <MenuPreviewSection
        eyebrow={homeContent.menu.eyebrow}
        title={homeContent.menu.title}
        description={homeContent.menu.description}
        items={menuItems}
        cta={homeContent.menu.cta}
      />
      <LibraryPreviewSection
        eyebrow={homeContent.library.eyebrow}
        title={homeContent.library.title}
        description={homeContent.library.description}
        categories={[...homeContent.library.categories]}
        cta={homeContent.library.cta}
      />
      <SpacesPreviewSection
        eyebrow={homeContent.spaces.eyebrow}
        title={homeContent.spaces.title}
        description={homeContent.spaces.description}
        spaces={spaces}
        cta={homeContent.spaces.cta}
      />
      <ReservationCTASection
        eyebrow={homeContent.reservationCta.eyebrow}
        title={homeContent.reservationCta.title}
        description={homeContent.reservationCta.description}
        primaryCta={homeContent.reservationCta.primaryCta}
        secondaryCta={homeContent.reservationCta.secondaryCta}
      />
    </PublicShell>
  )
}
