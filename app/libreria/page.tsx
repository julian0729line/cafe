import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import LibraryHero from '@/components/sections/libreria/LibraryHero'
import LibraryManifestoSection from '@/components/sections/libreria/LibraryManifestoSection'
import LibraryCategoriesSection from '@/components/sections/libreria/LibraryCategoriesSection'
import LibraryEncountersSection from '@/components/sections/libreria/LibraryEncountersSection'
import LibraryClosingSection from '@/components/sections/libreria/LibraryClosingSection'
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

// Filas editoriales de categorías: mismos datos y semántica de
// `libraryCategories` (data/library.ts), sin inventar libros ni autores.
const categoryLines = libraryCategories.map((category) => ({
  title: category.title,
  description: category.description,
}))

// Palabras clave del manifiesto: derivadas de las categorías reales, sin
// especialidades no confirmadas.
const manifestoKeywords = libraryCategories.map((category) => category.title)

export default function LibreriaPage() {
  return (
    <PublicShell
      navbar={{
        brandLabel: siteConfig.name,
        brandHref: publicNavigation.brandHref,
        eyebrow: `Café literario · ${siteConfig.city}`,
        navItems: publicNavigation.items.map((item) => ({ ...item })),
        cta: publicNavigation.cta,
        activeHref: '/libreria',
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
      <LibraryHero />
      <LibraryManifestoSection keywords={manifestoKeywords} />
      <LibraryCategoriesSection categories={categoryLines} />
      <LibraryEncountersSection />
      <LibraryClosingSection />
    </PublicShell>
  )
}
