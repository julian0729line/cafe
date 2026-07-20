import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import ReservationsHero from '@/components/sections/reservas/ReservationsHero'
import ReservationsOptionsSection from '@/components/sections/reservas/ReservationsOptionsSection'
import ReservationsProcessSection from '@/components/sections/reservas/ReservationsProcessSection'
import ReservationsConditionsSection from '@/components/sections/reservas/ReservationsConditionsSection'
import ReservationsClosingSection from '@/components/sections/reservas/ReservationsClosingSection'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { spacesPreview } from '@/data/spaces'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Reservas',
  description:
    'Información para reservar encuentros, celebraciones y actividades en Café Valparaíso, en Cali.',
  path: '/reservas',
})

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
}

// Tipos de solicitud confirmados (mismos datos reales de `spacesPreview`,
// ya documentados para render en /espacios y /reservas).
const options = spacesPreview.map((space) => ({
  title: space.title,
  tag: nullableToUndefined(space.tag),
  description: nullableToUndefined(space.description),
}))

export default function ReservasPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
        activeHref: '/reservas',
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
        })),
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      <ReservationsHero />
      <ReservationsOptionsSection options={options} />
      <ReservationsProcessSection />
      <ReservationsConditionsSection />
      <ReservationsClosingSection />
    </PublicShell>
  )
}
