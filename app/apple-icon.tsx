import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Mismo monograma que app/icon.tsx, sin esquinas transparentes (iOS
// recorta el redondeado él solo) y a la resolución que espera Apple.
export default function AppleIcon() {
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
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, color: '#F5F5F0' }}>V</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <div style={{ width: 30, height: 5, backgroundColor: '#C1121F' }} />
          <div style={{ width: 15, height: 5, backgroundColor: '#A6B86B' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
