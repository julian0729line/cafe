'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Container from '@/components/ui/Container'
import LinkButton from '@/components/ui/LinkButton'

export interface GastroSceneSectionProps {
  eyebrow?: string
  statement?: string
  emphasis?: string
  lead?: string
  lines?: string[]
  videoSrc?: string
  cta?: { label: string; href: string }
}

/**
 * Escena gastronómica (iteración 2, Icónico B). El metraje real del café corre
 * a sangre completa con un tratamiento duotono (multiply oliva→rojo + grano),
 * y encima vive una declaración sensorial y las líneas confirmadas del menú. Es
 * el momento donde la gastronomía deja de ser lista y se vuelve deseable, sin
 * inventar platos ni precios. Reutiliza el único asset real existente. Respeta
 * `prefers-reduced-motion`: bajo esa preferencia el video queda pausado como
 * fondo estático. Client Component.
 */
export default function GastroSceneSection({
  eyebrow = 'Gastronomía',
  statement = 'Se come sin prisa,',
  emphasis = 'se lee sin reloj.',
  lead = 'Café de especialidad, cocina de autor y una mesa que no tiene apuro.',
  lines = [],
  videoSrc,
  cta,
}: GastroSceneSectionProps) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const reduce = mounted && Boolean(prefersReduced)

  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduce) {
      video.pause()
      return
    }
    video.play().catch(() => {})
  }, [reduce])

  return (
    <section
      aria-label="La gastronomía de Café Valparaíso"
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#12180a] py-20 md:py-28"
    >
      {/* Metraje real a sangre completa */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {/* Duotono editorial: multiply oliva→rojo sobre el metraje + oscurecido
          direccional para legibilidad. No es un filtro genérico. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(150deg, rgba(52,62,28,0.82), rgba(193,18,31,0.42) 70%, rgba(122,34,48,0.6))', mixBlendMode: 'multiply' }}
      />
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-gradient-to-t from-[#12180a] via-[#12180a]/35 to-[#12180a]/55" />
      <span className="grain-soft z-0" aria-hidden="true" />

      <Container variant="wide" className="relative z-10">
        <div className="max-w-4xl">
          <p className="font-sans-app text-[11px] font-bold uppercase tracking-[0.45em] text-[#C9A227]">
            {eyebrow}
          </p>
          <h2
            className="mt-6 font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#F5F5F0]"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6.5rem)' }}
          >
            {statement}
            {emphasis ? <span className="block italic text-[#FF7F70]">{emphasis}</span> : null}
          </h2>
          {lead ? (
            <p className="mt-8 max-w-xl font-playfair text-lg italic leading-relaxed text-[#F5F5F0]/90 md:text-xl">
              {lead}
            </p>
          ) : null}
        </div>

        {lines.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#F5F5F0]/20 pt-8">
            {lines.map((line, i) => (
              <li key={line} className="flex items-baseline gap-3">
                <span className="font-sans-app text-[11px] tabular-nums text-[#FF7F70]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-playfair text-xl text-[#F5F5F0] md:text-2xl">{line}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {cta ? (
          <div className="mt-10">
            <LinkButton
              href={cta.href}
              variant="ghost"
              size="lg"
              className="border-[#F5F5F0]/40 text-[#F5F5F0] hover:border-[#F5F5F0] hover:bg-[rgba(245,245,240,0.08)]"
            >
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
