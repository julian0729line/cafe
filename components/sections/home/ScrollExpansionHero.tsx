'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import LinkButton from '@/components/ui/LinkButton'
import type { HeroCta, HeroHighlight } from './HeroSection'

export interface ScrollExpansionHeroProps {
  eyebrow: string
  title: string
  titleLead?: string
  titleAccent?: string
  description: string
  topLeftLabel?: string
  topRightLabel?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  highlights: HeroHighlight[]
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
 * Hero cinematográfico des-encajado (iteración 2). El video real del café manda
 * a sangre completa: una capa `object-cover` desenfocada llena el fondo sin
 * bordes de caja, y el mismo metraje nítido se ve contenido encima, preservando
 * su composición vertical. El copy vive anclado abajo-izquierda como un cartel
 * (no en un panel central). Sin scrim en bloque: sólo un degradado direccional
 * inferior para legibilidad. Client Component (único del home junto a la
 * atmósfera). Conserva el patrón `mounted`/`reduce` y el gate de reproducción.
 */
export default function ScrollExpansionHero({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  topLeftLabel,
  topRightLabel,
  primaryCta,
  secondaryCta,
  highlights,
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
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const handleVideoReady = () => setVideoReady(true)
  const showVideo = videoReady && !reduce

  // La capa de fondo desenfocada solo existe para tapar el letterbox que deja
  // `object-contain` en desktop. En móvil el video nítido ya usa `object-cover`
  // y llena el marco por completo, así que ahí esa segunda copia del mismo
  // archivo no aporta nada visual — no tiene sentido descargarla dos veces.
  const [showBgVideo, setShowBgVideo] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setShowBgVideo(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const els = [videoRef.current, bgVideoRef.current]
    for (const video of els) {
      if (!video) continue
      if (reduce) {
        video.pause()
        continue
      }
      video.play().catch(() => {})
    }
  }, [reduce])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Movimiento sobrio: leve escala de ambiente (no una "tarjeta que crece") y
  // parallax del copy. Con reduced motion, todo queda en su estado final.
  const mediaScale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1.05, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [0, -40])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], reduce ? [1, 1] : [1, 0.35])

  const lead = titleLead ?? title
  const accent = titleAccent

  return (
    <section
      ref={ref}
      aria-label="Presentación de Café Valparaíso"
      className="relative h-[150vh] bg-[#12180a] md:h-[175vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Escena a sangre completa */}
        <motion.div
          aria-hidden="true"
          style={{ scale: mediaScale, willChange: 'transform' }}
          className="absolute inset-0 z-0"
        >
          {/* Capa base de reserva: nunca pantalla negra */}
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : FALLBACK_MEDIA_BACKGROUND,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {videoSrc ? (
            <>
              {/* Respaldo desenfocado a sangre completa: mata el borde de caja
                  y llena los costados del video vertical sin barras. Solo se
                  monta en desktop (ver showBgVideo) — en móvil el video nítido
                  ya cubre el marco entero con object-cover, así que esta
                  segunda copia del mismo archivo no tendría nada que tapar. */}
              {showBgVideo ? (
                <video
                  ref={bgVideoRef}
                  className={`absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.5] transition-opacity duration-700 ease-out ${
                    showVideo ? 'opacity-100' : 'opacity-0'
                  }`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  disablePictureInPicture
                  aria-hidden="true"
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              ) : null}

              {/* Metraje nítido: cover en móvil (poco recorte en pantalla
                  vertical), contain en desktop (preserva la composición). */}
              <video
                ref={videoRef}
                onCanPlay={handleVideoReady}
                onLoadedData={handleVideoReady}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out md:object-contain ${
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
            </>
          ) : null}

          {/* Degradado direccional inferior (no un bloque de scrim): el video
              respira arriba, el texto se lee sobre oscuridad abajo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12180a] via-[#12180a]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12180a]/70 via-transparent to-transparent" />
          <span className="grain-soft" />
        </motion.div>

        {/* Micro-labels editoriales de las esquinas superiores */}
        {topLeftLabel || topRightLabel ? (
          <div className="fade-up fade-up-1 pointer-events-none absolute inset-x-5 top-6 z-10 flex items-start justify-between md:inset-x-10 md:top-9">
            {topLeftLabel ? (
              <span className="font-sans-app text-[10px] uppercase tracking-[0.4em] text-[#F5F5F0]/70">
                {topLeftLabel}
              </span>
            ) : (
              <span />
            )}
            {topRightLabel ? (
              <span className="text-right font-sans-app text-[10px] uppercase tracking-[0.4em] text-[#F5F5F0]/70">
                {topRightLabel}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Copy anclado abajo-izquierda, como un cartel. El título sangra el
            borde izquierdo del contenedor con tracking negativo. */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-14 md:px-10 md:pb-20"
        >
          <div className="mx-auto w-full max-w-7xl">
            <p className="fade-up fade-up-1 font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.4em] text-[#C9A227]">
              {eyebrow}
            </p>

            <h1
              className="fade-up fade-up-2 mt-4 font-playfair font-black leading-[0.82] tracking-[-0.04em] text-[#F5F5F0]"
              style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)' }}
            >
              <span className="block">{lead}</span>
              {accent ? <span className="-mt-2 block italic text-[#FF7F70] md:-mt-4">{accent}</span> : null}
            </h1>

            <div className="fade-up fade-up-3 mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md font-playfair text-lg italic leading-relaxed text-[#F5F5F0]/85 md:text-xl">
                {description}
              </p>

              {primaryCta || secondaryCta ? (
                <div className="flex flex-wrap items-center gap-4">
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

            {highlights.length > 0 ? (
              <ul className="fade-up fade-up-4 mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#F5F5F0]/15 pt-5">
                {highlights.map((highlight) => (
                  <li
                    key={highlight.label}
                    className="font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9DCC4]"
                  >
                    <span className="text-[#A6B86B]">{highlight.label}:</span> {highlight.value}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
