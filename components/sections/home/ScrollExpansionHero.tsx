'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import LinkButton from '@/components/ui/LinkButton'
import Microphrase from './Microphrase'
import type { HeroCta } from './HeroSection'

export interface ScrollExpansionHeroProps {
  title: string
  titleLead?: string
  titleAccent?: string
  tagline: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  microphrase?: string
  videoSrc?: string
  posterSrc?: string
  backgroundSrc?: string
}

// Fondo cinematográfico de reserva (sin assets externos): capas cálidas de la
// paleta Valparaíso. Se usa cuando aún no hay video/imagen real en public/media.
const FALLBACK_MEDIA_BACKGROUND =
  'radial-gradient(120% 90% at 22% 18%, rgba(201,162,39,0.30), transparent 60%),' +
  'radial-gradient(90% 80% at 82% 88%, rgba(193,18,31,0.26), transparent 62%),' +
  'radial-gradient(80% 70% at 60% 40%, rgba(166,184,107,0.18), transparent 65%),' +
  'linear-gradient(160deg, #3d4720 0%, #2a331a 55%, #1f2713 100%)'

/**
 * Hero cinematográfico compacto. El metraje real del café manda a sangre
 * completa (capa cover desenfocada de fondo + metraje nítido encima), copy tipo
 * cartel anclado abajo-izquierda. Contenido mínimo: nombre + una línea + dos
 * accesos (se entiende en cinco segundos). Un único `<video>`. Conserva el
 * patrón `mounted`/`reduce` y el gate de reproducción. Client Component.
 */
export default function ScrollExpansionHero({
  title,
  titleLead,
  titleAccent,
  tagline,
  primaryCta,
  secondaryCta,
  microphrase,
  videoSrc,
  posterSrc,
  backgroundSrc,
}: ScrollExpansionHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const reduce = mounted && Boolean(prefersReduced)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const handleVideoReady = () => setVideoReady(true)
  const showVideo = videoReady && !reduce

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (reduce) {
      video.pause()
      return
    }
    video.play().catch(() => {})
  }, [reduce])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const mediaScale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1.05, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [0, -40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [1, 0.35])

  const lead = titleLead ?? title
  const accent = titleAccent

  return (
    <section
      ref={ref}
      aria-label="Presentación de Café Valparaíso"
      className="relative h-[140vh] bg-[#12180a] md:h-[160vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Escena a sangre completa */}
        <motion.div
          aria-hidden="true"
          style={{ scale: mediaScale, willChange: 'transform' }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : FALLBACK_MEDIA_BACKGROUND,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {videoSrc ? (
            // Un único <video>, a sangre completa (object-cover): sin caja, sin
            // barras. El fallback editorial queda debajo hasta que el video está
            // listo (nunca pantalla negra).
            <video
              ref={videoRef}
              onCanPlay={handleVideoReady}
              onLoadedData={handleVideoReady}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                showVideo ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={posterSrc}
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-[#12180a] via-[#12180a]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12180a]/70 via-transparent to-transparent" />
          <span className="grain-soft" />
        </motion.div>

        {microphrase ? (
          <Microphrase tone="night" className="left-5 top-24 text-xl md:left-10 md:top-28 md:text-2xl">
            {microphrase}
          </Microphrase>
        ) : null}

        {/* Copy anclado abajo-izquierda, como un cartel. */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-14 md:px-10 md:pb-20"
        >
          <div className="mx-auto w-full max-w-7xl">
            <h1
              className="fade-up fade-up-2 font-playfair font-black leading-[0.82] tracking-[-0.04em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)' }}
            >
              <span className="block">{lead}</span>
              {accent ? <span className="-mt-2 block italic text-[#FF7F70] md:-mt-4">{accent}</span> : null}
            </h1>

            <p className="fade-up fade-up-3 mt-5 max-w-md font-playfair text-lg italic leading-relaxed text-[#F5F5F0]/85 md:text-xl">
              {tagline}
            </p>

            {primaryCta || secondaryCta ? (
              <div className="fade-up fade-up-4 mt-8 flex flex-wrap items-center gap-4">
                {primaryCta ? (
                  <LinkButton
                    href={primaryCta.href}
                    variant="primary"
                    size="lg"
                    {...(primaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    aria-label={primaryCta.ariaLabel ?? primaryCta.label}
                  >
                    {primaryCta.label}
                  </LinkButton>
                ) : null}
                {secondaryCta ? (
                  <LinkButton
                    href={secondaryCta.href}
                    variant="ghost"
                    size="lg"
                    className="border-[#F5F5F0]/40 text-[#F5F5F0] hover:border-[#F5F5F0]"
                    {...(secondaryCta.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    aria-label={secondaryCta.ariaLabel ?? secondaryCta.label}
                  >
                    {secondaryCta.label}
                  </LinkButton>
                ) : null}
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
