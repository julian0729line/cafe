import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import AgendaHero from '@/components/sections/agenda/AgendaHero'
import AgendaStatusSection from '@/components/sections/agenda/AgendaStatusSection'
import AgendaProgramsSection from '@/components/sections/agenda/AgendaProgramsSection'
import AgendaClosingSection from '@/components/sections/agenda/AgendaClosingSection'
import { siteConfig } from '@/data/site'
import { publicNavigation } from '@/data/navigation'
import { contactConfig } from '@/data/contact'
import { eventCategories, featuredEvents, eventsConfig, type EventCategory } from '@/data/events'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Agenda cultural',
  description:
    'Consulta la agenda cultural de Café Valparaíso: clubes de lectura, música, conversaciones y encuentros culturales en Cali.',
  path: '/agenda',
})

// Glosas editoriales breves para cada categoría real de `data/events.ts`.
// Describen el tipo de encuentro, sin fechas, artistas ni precios.
const PROGRAM_DESCRIPTIONS: Record<EventCategory, string> = {
  'Clubes de lectura': 'Encuentros alrededor de un libro, con la Librería La Maga.',
  'Música en vivo': 'Sesiones en vivo entre conversaciones y café.',
  Conversaciones: 'Charlas con autores, artistas y voces de la ciudad.',
  'Arte y cultura': 'Talleres, lecturas y actividades culturales.',
}

const programLines = eventCategories.map((category, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: category,
  description: PROGRAM_DESCRIPTIONS[category],
  status: 'Programación próxima',
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
        activeHref: '/agenda',
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
      <AgendaHero />
      {featuredEvents.length === 0 ? (
        <AgendaStatusSection
          title={eventsConfig.emptyStateTitle}
          message="Estamos preparando la próxima programación cultural. Las fechas y los detalles se publicarán próximamente."
        />
      ) : null}
      <AgendaProgramsSection lines={programLines} />
      <AgendaClosingSection />
    </PublicShell>
  )
}
