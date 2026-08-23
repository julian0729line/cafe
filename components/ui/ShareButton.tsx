'use client'

import { useState } from 'react'

export interface ShareButtonProps {
  title: string
  text?: string
  className?: string
}

/**
 * Comparte la página actual: `navigator.share` en móviles/navegadores
 * compatibles, con fallback a copiar el enlace al portapapeles (y
 * confirmación visual "Enlace copiado"). Client Component: depende de
 * `window.location` y de APIs del navegador, no de props de datos.
 */
export default function ShareButton({ title, text, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch {
        // El usuario canceló el share sheet — no es un error a mostrar.
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sin Web Share ni clipboard disponible: no hay fallback adicional.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`press -my-2 inline-flex min-h-11 items-center gap-2 font-sans-app text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${className}`}
      aria-label="Compartir esta página"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" />
        <line x1="8.6" y1="13.4" x2="15.4" y2="17.6" />
      </svg>
      {copied ? 'Enlace copiado' : 'Compartir'}
    </button>
  )
}
