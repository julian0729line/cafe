'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import LinkButton from '@/components/ui/LinkButton'
import type { HeroCta, HeroHighlight } from './HeroSection'

export interface ScrollExpansionHeroProps {
  eyebrow: string
  title: string
  description: string
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

export default function ScrollExpansionHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  videoSrc,
  posterSrc,
  backgroundSrc,
}: ScrollExpansionHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  // `reduce` se mantiene en `false` durante el render del servidor y el primer
  // render del cliente (evita mismatch de hidratación con reduced motion) y
  // solo adopta la preferencia real tras montar, vía requestAnimationFrame
  // (no es setState síncrono en efecto: cumple react-hooks/set-state-in-effect).
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const reduce = mounted && Boolean(prefersReduced)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // La expansión ocurre mientras el bloque está fijado (primeros ~45% del track).
  // Con reduced motion, todos los rangos quedan en su estado final (estáticos).
  const scale = useTransform(scrollYProgress, [0, 0.45], reduce ? [1, 1] : [0.72, 1])
  const radius = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [28, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.45], reduce ? [0.36, 0.36] : [0.52, 0.34])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4], reduce ? [0, 0] : [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.45], reduce ? [0, 0] : [0, -32])

  return (
    <section
      ref={ref}
      aria-label="Presentación de Café Valparaíso"
      className="relative h-[160vh] border-b border-[#4A5728] bg-[#343E1C] md:h-[185vh]"
    >
      {/* Fondo que se desvanece a medida que el medio llena la pantalla */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: backgroundOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="aurora h-full w-full">
          <div
            className="aurora-blob"
            style={{
              top: '-8%',
              left: '-6%',
              width: '55vw',
              height: '55vw',
              background: 'radial-gradient(circle, rgba(201,162,39,0.45), transparent 65%)',
            }}
          />
          <div
            className="aurora-blob b2"
            style={{
              bottom: '-12%',
              right: '-8%',
              width: '48vw',
              height: '48vw',
              background: 'radial-gradient(circle, rgba(193,18,31,0.34), transparent 65%)',
            }}
          />
        </div>
      </motion.div>

      {/* Bloque fijado: aquí vive el medio que se expande y el copy editorial */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-4 md:px-8">
        {/* Medio (video real o fondo cinematográfico de reserva) */}
        <motion.div
          aria-hidden="true"
          style={{ scale, borderRadius: radius, willChange: 'transform' }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          {videoSrc ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={posterSrc}
              aria-hidden="true"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div
              className="h-full w-full"
              style={{
                backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : FALLBACK_MEDIA_BACKGROUND,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

          {/* Scrim para legibilidad del copy sobre el medio */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[#1f2713]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2713]/80 via-transparent to-[#1f2713]/30" />
        </motion.div>

        {/* Copy editorial: visible e interactivo desde el inicio (fade-up al cargar) */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto w-full max-w-5xl text-center"
        >
          <p className="fade-up fade-up-1 font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.35em] text-[#C9A227]">
            {eyebrow}
          </p>

          <h1
            className="fade-up fade-up-2 mt-5 font-playfair font-black leading-[0.92] tracking-tight text-[#F5F5F0]"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            {title}
          </h1>

          <p className="fade-up fade-up-3 mx-auto mt-6 max-w-xl font-playfair text-lg italic leading-relaxed text-[#F5F5F0] md:text-xl">
            {description}
          </p>

          {primaryCta || secondaryCta ? (
            <div className="fade-up fade-up-4 mt-9 flex flex-wrap items-center justify-center gap-5">
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

          {highlights.length > 0 ? (
            <ul className="fade-up fade-up-4 mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
        </motion.div>
      </div>
    </section>
  )
}
