import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import ContactoHero from '@/components/sections/contacto/ContactoHero'
import ContactoChannelsSection from '@/components/sections/contacto/ContactoChannelsSection'
import ContactoLocationsSection from '@/components/sections/contacto/ContactoLocationsSection'
import ContactoClosingSection from '@/components/sections/contacto/ContactoClosingSection'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto',
  description:
    'Escríbenos por WhatsApp o visítanos en las sedes de Pance y Juanambú de Café Valparaíso, en Cali.',
  path: '/contacto',
})

type ContactChannel = { label: string; value: string; href: string; external?: boolean }

// Solo se incluyen canales confirmados: los que sigan en `null` (teléfono,
// correo, Instagram) simplemente no aparecen, sin mostrar ningún label
// vacío ni texto "pendiente de confirmar".
const knownChannels: ContactChannel[] = []
if (contactConfig.whatsapp && contactConfig.whatsappHref) {
  knownChannels.push({
    label: 'WhatsApp',
    value: contactConfig.whatsapp,
    href: contactConfig.whatsappHref,
    external: true,
  })
}
if (contactConfig.phone) {
  knownChannels.push({ label: 'Teléfono', value: contactConfig.phone, href: `tel:${contactConfig.phone}` })
}
if (contactConfig.email) {
  knownChannels.push({ label: 'Correo', value: contactConfig.email, href: `mailto:${contactConfig.email}` })
}

const locations = contactConfig.locations.map((location) => ({
  name: location.name,
  city: location.city,
  address: location.address,
  mapsUrl: location.mapsUrl,
}))

export default function ContactoPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
        activeHref: '/contacto',
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
      <ContactoHero whatsappHref={contactConfig.whatsappHref} />
      <ContactoChannelsSection channels={knownChannels} />
      <ContactoLocationsSection locations={locations} />
      <ContactoClosingSection
        primaryCta={{ label: 'Escribir por WhatsApp', href: contactConfig.whatsappHref, external: true }}
      />
    </PublicShell>
  )
}
