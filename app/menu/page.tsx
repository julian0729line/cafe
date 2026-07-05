import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import LinkButton from '@/components/ui/LinkButton'
import MenuItemCard from '@/components/cards/MenuItemCard'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { menuPreviewItems } from '@/data/menu'

export const metadata: Metadata = {
  title: `Menú — ${siteConfig.name}`,
  description: 'Café, cocina, coctelería y postres de Café Valparaíso en Cali.',
}

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
}

const items = menuPreviewItems.map((item) => ({
  title: item.title,
  category: item.category,
  description: nullableToUndefined(item.description),
}))

export default function MenuPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
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
      <section className="border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <SectionHeader
            titleAs="h1"
            eyebrow="Lo que servimos"
            title="Nuestro menú"
            description="Café, cocina de autor, coctelería de temporada y postres de la casa: nuestras líneas gastronómicas, con identidad propia."
          />
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <MenuItemCard
                key={item.title}
                title={item.title}
                category={item.category}
                description={item.description}
              />
            ))}
          </div>

          <Card variant="outline" padding="lg" className="mt-10">
            <p className="font-playfair italic text-lg leading-relaxed text-[#D9DCC4]">
              La carta detallada, con precios y disponibilidad, se publicará próximamente.
              Mientras tanto, escríbenos si quieres conocer más sobre nuestras líneas
              gastronómicas.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <LinkButton href="/reservas" variant="ghost" size="md">
                Reservar
              </LinkButton>
              <LinkButton href="/contacto" variant="ghost" size="md">
                Escríbenos
              </LinkButton>
            </div>
          </Card>
        </Container>
      </section>
    </PublicShell>
  )
}
