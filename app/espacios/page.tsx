import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { spacesPreview } from '@/data/spaces'

export const metadata: Metadata = {
  title: `Espacios — ${siteConfig.name}`,
  description: 'Espacios de Café Valparaíso para encuentros, celebraciones y cultura en Cali.',
}

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
            eyebrow="Espacios"
            title="Un lugar para cada encuentro"
            description="Espacios pensados para reuniones, celebraciones y actividades culturales, con la misma identidad editorial de Café Valparaíso."
          />
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {spaces.map((space) => (
              <Card key={space.title} variant="dark" padding="md">
                {space.tag ? <Badge variant="brass">{space.tag}</Badge> : null}
                <h2 className="mt-4 font-playfair text-xl font-bold text-[#F5F5F0]">
                  {space.title}
                </h2>
                {space.description ? (
                  <p className="mt-3 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                    {space.description}
                  </p>
                ) : null}
              </Card>
            ))}
          </div>

          <Card variant="outline" padding="lg" className="mt-10">
            <p className="font-playfair italic text-lg leading-relaxed text-[#D9DCC4]">
              Los detalles de cada espacio (capacidad, disponibilidad y condiciones) se confirman
              directamente por contacto, mientras terminamos de publicar la información completa.
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
