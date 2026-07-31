import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/perfil', '/admin', '/login', '/register'],
    },
    sitemap: new URL('/sitemap.xml', baseUrl).toString(),
  }
}
