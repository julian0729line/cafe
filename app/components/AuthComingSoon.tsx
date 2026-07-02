import Link from 'next/link'
import { AuthAside } from './AuthAside'

/** Vista "muy pronto" para login/registro cuando Supabase no está configurado. */
export function AuthComingSoon({
  eyebrow,
  titleTop,
  titleAccent,
  quote,
  bandLabel,
}: {
  eyebrow: string
  titleTop: string
  titleAccent: string
  quote: string
  bandLabel: string
}) {
  return (
    <div className="min-h-screen flex">
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
          <div className="w-full max-w-sm text-center fade-up fade-up-2">
            <h2 className="font-playfair font-black text-4xl text-[#343E1C] leading-[0.95] mb-4">
              Muy pronto
            </h2>
            <div className="w-10 h-[3px] bg-[#C1121F] mx-auto mb-6" />
            <p className="font-sans-app text-sm text-[#4A5728] leading-relaxed mb-8">
              El programa de socios estará disponible en unos días. Mientras tanto,
              te esperamos en el café.
            </p>
            <Link
              href="/"
              className="press font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#343E1C] underline underline-offset-4 decoration-[#C1121F]"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
