import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

// Monograma de marca (sin logo real todavía): inicial "V" de Valparaíso
// sobre el óleo profundo de la paleta, con el mismo par de barras
// rojo/salvia que marca los encabezados en todo el sitio.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#181f0d',
        }}
      >
        <div style={{ display: 'flex', fontSize: 300, fontWeight: 800, color: '#F5F5F0' }}>V</div>
        <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
          <div style={{ width: 84, height: 14, backgroundColor: '#C1121F' }} />
          <div style={{ width: 42, height: 14, backgroundColor: '#A6B86B' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
