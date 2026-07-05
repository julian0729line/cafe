/**
 * Utilidad SEO compartida — Café Valparaíso.
 *
 * `getBaseUrl` usa `NEXT_PUBLIC_SITE_URL` si existe, o `siteConfig.siteUrl`
 * (hoy `null`: no hay dominio de producción confirmado en el repo), o un
 * fallback técnico de `localhost` que solo existe para que `metadataBase`,
 * `robots.ts` y `sitemap.ts` compilen en desarrollo — nunca se muestra en
 * la UI.
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/data/site'

const fallbackBaseUrl = 'http://localhost:3000'

export function getBaseUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl ?? fallbackBaseUrl
  return new URL(configuredUrl)
}

export type CreatePageMetadataOptions = {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const baseUrl = getBaseUrl()
  const absoluteUrl = new URL(path, baseUrl).toString()
  const socialTitle = title === siteConfig.name ? title : `${title} — ${siteConfig.name}`

  return {
    title,
    description,
    metadataBase: baseUrl,
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    keywords: [...siteConfig.brandKeywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  }
}
