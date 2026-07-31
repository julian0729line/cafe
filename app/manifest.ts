import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#181f0d',
    theme_color: '#181f0d',
    lang: 'es',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
