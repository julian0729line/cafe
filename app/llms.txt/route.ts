import { siteConfig } from '@/data/site'
import { contactConfig } from '@/data/contact'
import { spacesConfig } from '@/data/spaces'
import { getBaseUrl } from '@/lib/seo'

/**
 * `/llms.txt` — resumen del negocio para agentes/LLMs, en el formato
 * convencional (título, descripción, secciones con enlaces). Solo datos ya
 * confirmados en `data/`; nada de horarios, aforos ni tarifas, que siguen
 * sin confirmar. Se regenera con `getBaseUrl()`, así que apunta solo a
 * rutas absolutas cuando `NEXT_PUBLIC_SITE_URL` ya esté configurado.
 */
export function GET() {
  const baseUrl = getBaseUrl()
  const url = (path: string) => new URL(path, baseUrl).toString()

  const sedes = spacesConfig.sedes
    .map((name) => contactConfig.locations.find((location) => location.name === name))
    .filter((location): location is NonNullable<typeof location> => Boolean(location))
    .map((location) => `- ${location.name}: ${location.address}, ${location.city}`)
    .join('\n')

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Páginas

- [Inicio](${url('/')})
- [Menú](${url('/menu')})
- [Espacios](${url('/espacios')})
- [Contacto](${url('/contacto')})

## Sedes

${sedes}

## Contacto

- WhatsApp (reservas): ${contactConfig.whatsapp}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
