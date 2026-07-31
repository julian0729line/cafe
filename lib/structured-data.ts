/**
 * JSON-LD (schema.org) para Café Valparaíso.
 *
 * Solo incluye datos ya confirmados en `data/site.ts` y `data/contact.ts`:
 * dos sedes con dirección real, WhatsApp como teléfono de contacto. No
 * declara `openingHours` (horarios sin confirmar — ver nota en
 * `data/contact.ts`) ni `image` (sin fotografía real todavía).
 */

import { siteConfig } from '@/data/site'
import { contactConfig } from '@/data/contact'
import { getBaseUrl } from '@/lib/seo'

// El WhatsApp ya está confirmado en formato internacional (`whatsappHref`);
// se deriva el mismo número al formato E.164 que espera `telephone`.
function whatsappToE164(href: string): string | null {
  const digits = href.match(/(\d+)$/)?.[1]
  return digits ? `+${digits}` : null
}

export function buildLocalBusinessJsonLd(): object[] {
  const baseUrl = getBaseUrl()
  const telephone = whatsappToE164(contactConfig.whatsappHref)

  return contactConfig.locations
    .filter((location) => location.status === 'confirmed' && location.address)
    .map((location) => ({
      '@context': 'https://schema.org',
      '@type': 'CafeOrRestaurant',
      name: `${siteConfig.name} — ${location.name}`,
      url: new URL('/contacto', baseUrl).toString(),
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address,
        addressLocality: location.city,
        addressCountry: 'CO',
      },
      ...(telephone ? { telephone } : {}),
      servesCuisine: 'Café y cocina de autor',
      brand: {
        '@type': 'Brand',
        name: siteConfig.name,
      },
    }))
}
