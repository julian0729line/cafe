import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import LinkButton from '@/components/ui/LinkButton'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contacto',
  description:
    'Canales oficiales de contacto de Café Valparaíso. La información comercial confirmada se actualizará en esta página.',
  path: '/contacto',
})

const phone: string | null = contactConfig.phone
const whatsapp: string | null = contactConfig.whatsapp
const email: string | null = contactConfig.email
const instagram: string | null = contactConfig.instagram

type ContactChannel = { label: string; value: string; href?: string }

const knownChannels: ContactChannel[] = []
if (phone) knownChannels.push({ label: 'Teléfono', value: phone, href: `tel:${phone}` })
if (whatsapp) knownChannels.push({ label: 'WhatsApp', value: whatsapp })
if (email) knownChannels.push({ label: 'Correo', value: email, href: `mailto:${email}` })
if (instagram) knownChannels.push({ label: 'Instagram', value: instagram })

const locations = contactConfig.locations

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
        })),
        copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. Todos los derechos reservados.`,
      }}
    >
      <section className="border-b border-[#4A5728] px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <SectionHeader
            titleAs="h1"
            eyebrow="Contacto"
            title="Hablemos"
            description={`Café Valparaíso está en ${contactConfig.primaryCity}. Escríbenos para reservas, dudas o propuestas culturales.`}
          />
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Card variant="dark" padding="lg">
              <h2 className="font-playfair text-xl font-bold text-[#F5F5F0]">
                Canales oficiales
              </h2>
              {knownChannels.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {knownChannels.map((channel) => (
                    <li key={channel.label} className="font-sans-app text-sm text-[#A6B86B]">
                      <span className="block text-[0.6875rem] uppercase tracking-[0.1em] text-[#D9DCC4]">
                        {channel.label}
                      </span>
                      {channel.href ? (
                        <a href={channel.href} className="press text-[#A6B86B] hover:text-[#F5F5F0]">
                          {channel.value}
                        </a>
                      ) : (
                        <span>{channel.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                  Los canales oficiales (teléfono, WhatsApp, correo e Instagram) se actualizarán
                  pronto.
                </p>
              )}
            </Card>

            <Card variant="outline" padding="lg">
              <h2 className="font-playfair text-xl font-bold text-[#F5F5F0]">Sedes</h2>
              {locations.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-4">
                  {locations.map((location) => (
                    <li key={location.name} className="font-sans-app text-sm text-[#A6B86B]">
                      <span className="block font-bold text-[#F5F5F0]">
                        {location.name} · {location.city}
                      </span>
                      <span className="mt-1 block">
                        {location.address ?? location.notes ?? 'Dirección pendiente de confirmar.'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                  Aún no publicamos una dirección confirmada. Escríbenos y te contamos cómo
                  llegar.
                </p>
              )}
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/reservas" variant="ghost" size="md">
              Ir a reservas
            </LinkButton>
            <LinkButton href="/agenda" variant="ghost" size="md">
              Ver agenda cultural
            </LinkButton>
          </div>
        </Container>
      </section>
    </PublicShell>
  )
}
