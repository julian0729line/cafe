import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/site'

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Tarjeta tipográfica de marca, no una foto: `public/media/` todavía no
// tiene fotografía real del café (solo el video del hero), y esta ruta no
// debe inventar una. Reutiliza la paleta oficial de app/globals.css.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '76px',
          backgroundColor: '#181f0d',
          backgroundImage:
            'radial-gradient(120% 90% at 22% 10%, rgba(201,162,39,0.30), transparent 60%), radial-gradient(90% 80% at 88% 92%, rgba(193,18,31,0.30), transparent 62%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#C9A227',
            marginBottom: 28,
          }}
        >
          Pance &amp; Juanambú · Cali
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 128,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: -2,
            color: '#F5F5F0',
          }}
        >
          <span>Café</span>
          <span style={{ color: '#FF7F70' }}>Valparaíso</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#D9DCC4',
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          <div style={{ width: 64, height: 6, backgroundColor: '#C1121F' }} />
          <div style={{ width: 32, height: 6, backgroundColor: '#A6B86B' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
