import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import LinkButton from '@/components/ui/LinkButton'
import SpaceCard from '@/components/cards/SpaceCard'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { spacesPreview } from '@/data/spaces'
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

const spaces = spacesPreview.map((space) => ({
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
        })),
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      <section className="border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <SectionHeader
            titleAs="h1"
            eyebrow="Espacios · Pance y Juanambú"
            title="Un lugar para cada encuentro"
            description="Espacios en nuestras sedes de Pance y Juanambú, pensados para reuniones, celebraciones y actividades culturales, con la misma identidad editorial de Café Valparaíso."
          />
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard
                key={space.title}
                title={space.title}
                tag={space.tag}
                description={space.description}
              />
            ))}
          </div>

          <Card variant="outline" padding="lg" className="mt-10">
            <p className="font-playfair italic text-lg leading-relaxed text-[#D9DCC4]">
              Los detalles de cada espacio en Pance y Juanambú (capacidad, disponibilidad y
              condiciones) se confirman directamente por contacto, mientras terminamos de publicar
              la información completa.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <LinkButton href="/reservas" variant="ghost" size="md">
                Ir a reservas
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
