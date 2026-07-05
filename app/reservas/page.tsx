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

export const metadata: Metadata = {
  title: `Reservas — ${siteConfig.name}`,
  description: 'Reserva tu mesa o tu espacio en Café Valparaíso, en Cali.',
}

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
}

const spaces = spacesPreview.map((space) => ({
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
            eyebrow="Reservas"
            title="Reserva tu lugar en Valparaíso"
            description="Ya sea para una mesa, un encuentro privado o una actividad cultural, cuéntanos qué necesitas y te ayudamos a organizarlo."
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
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <Card variant="outline" padding="lg">
            <h2 className="font-playfair text-2xl font-bold text-[#F5F5F0]">
              Cómo funciona
            </h2>
            <p className="mt-4 max-w-2xl font-sans-app text-sm leading-relaxed text-[#A6B86B]">
              Todavía no tenemos un canal de reservas en línea confirmado. Escríbenos contándonos
              la fecha, el número de personas y el tipo de encuentro que tienes en mente, y te
              confirmamos la disponibilidad directamente.
            </p>
            <div className="mt-6">
              <LinkButton href="/contacto" variant="ghost" size="md">
                Escríbenos para reservar
              </LinkButton>
            </div>
          </Card>
        </Container>
      </section>
    </PublicShell>
  )
}
