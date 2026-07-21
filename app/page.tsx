import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import HeroSection from '@/components/sections/home/HeroSection'
import RedInterludeSection from '@/components/sections/home/RedInterludeSection'
import AboutSection from '@/components/sections/home/AboutSection'
import AtmosphereScrollSection from '@/components/sections/home/AtmosphereScrollSection'
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

const cultureLines = homeContent.culture.lines.map((line) => ({
  number: line.number,
  title: line.title,
  description: line.description,
  status: line.status,
}))

const menuItems = homeContent.menu.items.map((item) => ({
  title: item.title,
  category: item.category,
  description: nullableToUndefined(item.description),
}))

const libraryCategories = homeContent.library.categories.map((category) => ({
  title: category.title,
  description: category.description,
}))

const aboutKeywords = [...homeContent.about.keywords]
const spacesSedes = [...homeContent.spaces.sedes]
const spacesKinds = [...homeContent.spaces.kinds]
const heroHighlights = [...homeContent.hero.highlights]
const atmosphereTiles = homeContent.atmosphere.tiles.map((tile) => ({ ...tile }))

export default function HomePage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: homeContent.hero.eyebrow,
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
      <HeroSection
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        titleLead={homeContent.hero.titleLead}
        titleAccent={homeContent.hero.titleAccent}
        description={homeContent.hero.description}
        topLeftLabel={homeContent.hero.topLeftLabel}
        topRightLabel={homeContent.hero.topRightLabel}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        highlights={heroHighlights}
        videoSrc={homeContent.hero.videoSrc}
        posterSrc={homeContent.hero.posterSrc}
      />
      <RedInterludeSection
        eyebrow={homeContent.redInterlude.eyebrow}
        statement={homeContent.redInterlude.statement}
        emphasis={homeContent.redInterlude.emphasis}
        ghost={homeContent.redInterlude.ghost}
        footnote={homeContent.redInterlude.footnote}
      />
      <AboutSection
        index={homeContent.about.index}
        eyebrow={homeContent.about.eyebrow}
        title={homeContent.about.title}
        emphasis={homeContent.about.emphasis}
        lead={homeContent.about.lead}
        body={homeContent.about.body}
        aside={homeContent.about.aside}
        keywords={aboutKeywords}
      />
      <AtmosphereScrollSection
        eyebrow={homeContent.atmosphere.eyebrow}
        title={homeContent.atmosphere.title}
        emphasis={homeContent.atmosphere.emphasis}
        lead={homeContent.atmosphere.lead}
        tiles={atmosphereTiles}
        closingLead={homeContent.atmosphere.closingLead}
        closingCta={homeContent.atmosphere.closingCta}
      />
      <CulturePreviewSection
        index={homeContent.culture.index}
        eyebrow={homeContent.culture.eyebrow}
        title={homeContent.culture.title}
        emphasis={homeContent.culture.emphasis}
        description={homeContent.culture.description}
        lines={cultureLines}
        cta={homeContent.culture.cta}
      />
      <MenuPreviewSection
        index={homeContent.menu.index}
        eyebrow={homeContent.menu.eyebrow}
        title={homeContent.menu.title}
        emphasis={homeContent.menu.emphasis}
        items={menuItems}
        note={homeContent.menu.note}
        cta={homeContent.menu.cta}
      />
      <LibraryPreviewSection
        index={homeContent.library.index}
        eyebrow={homeContent.library.eyebrow}
        title={homeContent.library.title}
        emphasis={homeContent.library.emphasis}
        description={homeContent.library.description}
        categories={libraryCategories}
        mediaLabel={homeContent.library.mediaLabel}
        cta={homeContent.library.cta}
      />
      <SpacesPreviewSection
        index={homeContent.spaces.index}
        eyebrow={homeContent.spaces.eyebrow}
        title={homeContent.spaces.title}
        emphasis={homeContent.spaces.emphasis}
        description={homeContent.spaces.description}
        sedes={spacesSedes}
        kinds={spacesKinds}
        note={homeContent.spaces.note}
        primaryCta={homeContent.spaces.primaryCta}
        secondaryCta={homeContent.spaces.secondaryCta}
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
