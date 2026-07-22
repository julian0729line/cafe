'use client'

import { useEffect, useRef, useState } from 'react'

export interface MicrophraseProps {
  children: string
  /** Clases de posición/estilo del contenedor absoluto (lo ubica el padre). */
  className?: string
  tone?: 'night' | 'paper' | 'red'
}

const TONE: Record<NonNullable<MicrophraseProps['tone']>, string> = {
  night: 'text-[#D9DCC4]',
  paper: 'text-[#7A2230]',
  red: 'text-[#F5F5F0]',
}

/**
 * Microfrase editorial flotante: una anotación breve (3–6 palabras) integrada
 * a la composición, no un modal ni un banner. Decorativa (`aria-hidden`), no
 * bloquea navegación ni cubre controles. Aparece con una transición sutil al
 * entrar en viewport; con `prefers-reduced-motion` se muestra estática. La
 * ubicación (esquina, lateral, fuera del grid) la define el padre vía
 * `className`. Client Component mínimo.
 */
export default function Microphrase({ children, className = '', tone = 'night' }: MicrophraseProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      // Estáticas con reduced motion: se muestran de una, pero se difiere el
      // setState fuera del cuerpo del efecto (regla set-state-in-effect).
      const id = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(id)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 select-none font-playfair italic leading-none transition-all duration-700 ease-out ${
        TONE[tone]
      } ${shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} ${className}`}
    >
      {children}
    </span>
  )
}
