import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import LinkButton from '@/components/ui/LinkButton'
import EventCard from '@/components/cards/EventCard'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { eventCategories, featuredEvents } from '@/data/events'

export const metadata: Metadata = {
  title: `Agenda cultural — ${siteConfig.name}`,
  description:
    'Encuentros, lecturas y actividades culturales de Café Valparaíso en Cali.',
}

function nullableToUndefined<T>(value: T | null): T | undefined {
  return value ?? undefined
}

const events = featuredEvents.map((event) => ({
  title: event.title,
  category: event.category,
  dateLabel: nullableToUndefined(event.dateLabel),
  description: nullableToUndefined(event.description),
  href: nullableToUndefined(event.href),
}))

export default function AgendaPage() {
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
            eyebrow="Agenda cultural"
            title="Cosas que pasan en Valparaíso"
            description="Club de lectura, música en vivo, conversaciones y arte: la agenda que hace de Café Valparaíso un espacio cultural, no solo gastronómico."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {eventCategories.map((category) => (
              <Badge key={category} variant="olive">
                {category}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.title}
                  title={event.title}
                  category={event.category}
                  dateLabel={event.dateLabel}
                  description={event.description}
                  href={event.href}
                />
              ))}
            </div>
          ) : (
            <Card variant="outline" padding="lg">
              <p className="font-playfair italic text-lg leading-relaxed text-[#D9DCC4]">
                Estamos preparando la próxima agenda cultural. Vuelve pronto o escríbenos para
                conocer las próximas actividades.
              </p>
              <div className="mt-6">
                <LinkButton href="/contacto" variant="ghost" size="md">
                  Escríbenos
                </LinkButton>
              </div>
            </Card>
          )}
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <Card
            variant="editorial"
            padding="lg"
            className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="font-playfair text-2xl font-black text-[#F5F5F0] md:text-3xl">
                ¿Quieres proponer una actividad?
              </h2>
              <p className="mt-3 max-w-md font-sans-app text-sm leading-relaxed text-[#F5F5F0]/85">
                Escríbenos y te contamos cómo sumarte a la agenda cultural de Café Valparaíso.
              </p>
            </div>
            <LinkButton href="/contacto" variant="dark" size="lg">
              Contáctanos
            </LinkButton>
          </Card>
        </Container>
      </section>
    </PublicShell>
  )
}
