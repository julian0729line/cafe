import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import MenuHero from '@/components/sections/menu/MenuHero'
import MenuNumeroSection from '@/components/sections/menu/numero/MenuNumeroSection'
import MenuClosingSection from '@/components/sections/menu/MenuClosingSection'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Menú',
  description:
    'Conoce las líneas gastronómicas de Café Valparaíso: café, cocina, coctelería y postres en un espacio cultural en Cali.',
  path: '/menu',
})

export default function MenuPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
        activeHref: '/menu',
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
      <MenuHero />
      <MenuNumeroSection />
      <MenuClosingSection />
    </PublicShell>
  )
}
