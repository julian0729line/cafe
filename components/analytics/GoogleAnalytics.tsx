import Script from 'next/script'

/**
 * GA4 (gtag.js), cargado solo si `NEXT_PUBLIC_GA4_ID` está configurado — sin
 * esa env var, este componente no renderiza nada (no-op), así que el sitio
 * sigue funcionando igual mientras no exista la propiedad de Analytics.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID
  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
