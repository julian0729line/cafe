import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'

const PUBLIC_ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/agenda', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/menu', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/reservas', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/libreria', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/espacios', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contacto', changeFrequency: 'monthly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  return PUBLIC_ROUTES.map((route) => ({
    url: new URL(route.path, baseUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
