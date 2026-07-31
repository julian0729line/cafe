import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import SpacesHero from '@/components/sections/espacios/SpacesHero'
import SpacesIntroductionSection from '@/components/sections/espacios/SpacesIntroductionSection'
import SpacesLocationsSection from '@/components/sections/espacios/SpacesLocationsSection'
import SpacesOccasionsSection from '@/components/sections/espacios/SpacesOccasionsSection'
import SpacesClosingSection from '@/components/sections/espacios/SpacesClosingSection'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { spacesPreview, spacesConfig } from '@/data/spaces'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Espacios',
  description:
    'Conoce los espacios de Café Valparaíso para encuentros privados, actividades culturales y celebraciones en Cali.',
  path: '/espacios',
})

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
}

// Sedes confirmadas: solo nombre y ciudad (`spacesConfig.sedes`,
// `contactConfig.locations`). Sin dirección, capacidad ni fotografía, porque
// no están confirmadas todavía.
const locations = spacesConfig.sedes.map((name) => {
  const match = contactConfig.locations.find((location) => location.name === name)
  return { name, city: match?.city ?? siteConfig.city }
})

// Tipos de encuentro confirmados (`spacesPreview`), sin inventar categorías.
const occasions = spacesPreview.map((space) => ({
  title: space.title,
  tag: nullableToUndefined(space.tag),
  description: nullableToUndefined(space.description),
}))

export default function EspaciosPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
        activeHref: '/espacios',
      }}
      footer={{
        brand: siteConfig.name,
        description: siteConfig.description,
        columns: [
          {
            title: 'Explora',
            links: publicNavigation.items.map((item) => ({ label: item.label, href: item.href })),
          },
        ],
        contactItems: contactConfig.reservationChannels.map((channel) => ({
          label: 'Contacto',
          value: channel.label,
          href: channel.href,
          external: channel.href.startsWith('http'),
        })),
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      <SpacesHero />
      <SpacesIntroductionSection />
      <SpacesLocationsSection locations={locations} />
      <SpacesOccasionsSection occasions={occasions} />
      <SpacesClosingSection />
    </PublicShell>
  )
}
