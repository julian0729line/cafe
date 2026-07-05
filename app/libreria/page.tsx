import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import LinkButton from '@/components/ui/LinkButton'
import BookCategoryCard from '@/components/cards/BookCategoryCard'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { libraryCategories } from '@/data/library'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Librería La Maga',
  description:
    'Librería La Maga reúne curaduría literaria, clubes de lectura y conversación alrededor de los libros en Café Valparaíso.',
  path: '/libreria',
})

export default function LibreriaPage() {
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
            eyebrow="Librería La Maga"
            title="Libros y conversación"
            description="Una curaduría literaria propia, clubes de lectura y un rincón pensado para leer, conversar y descubrir."
          />
        </Container>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <Container variant="wide">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {libraryCategories.map((category) => (
              <BookCategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>

          <Card variant="dark" padding="lg" className="mt-10">
            <p className="font-playfair italic text-lg leading-relaxed text-[#D9DCC4]">
              Todavía no publicamos nuestro inventario en línea. Si buscas un título en
              particular o quieres sumarte al club de lectura, escríbenos y te contamos más.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <LinkButton href="/agenda" variant="ghost" size="md">
                Ver agenda cultural
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
