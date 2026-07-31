import type { ReactNode } from 'react'
import Link from 'next/link'
import { AuthAside } from './AuthAside'

/**
 * Estructura compartida de las páginas de auth: panel editorial (AuthAside) +
 * columna de formulario con la banda roja superior. Lo usan login, registro y
 * la vista "Muy pronto" (AuthComingSoon); cada uno pasa su contenido como
 * children.
 */
export function AuthFormShell({
  eyebrow,
  titleTop,
  titleAccent,
  quote,
  bandLabel,
  children,
}: {
  eyebrow: string
  titleTop: string
  titleAccent: string
  quote: string
  bandLabel: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Único h1 real de la página: AuthAside solo lo muestra visualmente
          en desktop (oculto bajo lg), así que en móvil este es el único
          encabezado que un lector de pantalla encuentra. */}
      <h1 className="sr-only">{titleTop} {titleAccent}</h1>
      <AuthAside eyebrow={eyebrow} titleTop={titleTop} titleAccent={titleAccent} quote={quote} />

      <div className="w-full lg:w-[45%] bg-[#F5F5F0] flex flex-col">
        <div className="bg-[#C1121F] px-10 py-4 flex items-center justify-between">
          <Link href="/" className="press text-[#F5F5F0] text-[10px] font-bold tracking-[0.3em] uppercase lg:hidden">
            Café Literario
          </Link>
          <span className="text-[#F5F5F0] text-[10px] font-bold tracking-[0.3em] uppercase ml-auto">
            {bandLabel}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
