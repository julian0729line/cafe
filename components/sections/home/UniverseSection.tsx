import type { ReactNode } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

type Cta = { label: string; href: string }

export interface UniverseSectionProps {
  eyebrow?: string
  menu: {
    piece: string
    name: string
    dishLead: string
    dishAccent: string
    ingredients: string
    cta: Cta
  }
  spaces: { piece: string; name: string; sedes: readonly string[]; line: string; cta: Cta }
}

function Piece({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between overflow-hidden border p-7 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-9 ${className}`}
    >
      {children}
    </Link>
  )
}

function Access({ label, tone }: { label: string; tone: 'coral' | 'wine' }) {
  const c = tone === 'coral' ? 'text-[#FF7F70]' : 'text-[#7A2230]'
  return (
    <span
      className={`mt-8 inline-flex items-center gap-2 font-sans-app text-[11px] font-bold uppercase tracking-[0.22em] ${c}`}
    >
      {label}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </span>
  )
}

function PieceLabel({ piece, tone }: { piece: string; tone: 'night' | 'paper' }) {
  const c = tone === 'night' ? 'text-[#A6B86B]' : 'text-[#4A5728]'
  const n = tone === 'night' ? 'text-[#FF7F70]' : 'text-[#C1121F]'
  return (
    <span className={`font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] ${c}`}>
      <span className={`mr-2 tabular-nums ${n}`}>{piece}</span>
      Acceso
    </span>
  )
}

/**
 * Universo Valparaíso — el corazón del Home. Dos accesos (Menú, Espacios) en
 * una sola composición. Comparten la gramática de las «cartas de lugar»
 * (nombre protagonista + una línea útil + acceso), pero varían en escala,
 * superficie y énfasis. Cada pieza es un enlace-carta completo. Sin párrafos,
 * sin marcos-foto vacíos, sin ghost type. Server Component.
 */
export default function UniverseSection({
  eyebrow = 'Universo Valparaíso',
  menu,
  spaces,
}: UniverseSectionProps) {
  return (
    <section aria-label="Universo Café Valparaíso" className="relative overflow-hidden bg-[#F5F5F0] py-20 md:py-28">
      <Container variant="default" className="relative">
        <p className="mb-8 font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728] md:mb-10">
          {eyebrow}
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* MENÚ — secundario a propósito. La carta ya tuvo su protagonismo
              arriba, en «La carta en movimiento»: repetir aquí el cinemagraph
              del Lomo pondría dos protagonistas gastronómicos en el mismo
              recorrido. Queda como acceso tipográfico, sin fotografía. */}
          <Piece
            href={menu.cta.href}
            className="min-h-[16rem] border-[#4A5728] bg-[#12180a] md:col-span-5 md:min-h-[26rem]"
          >
            <PieceLabel piece={menu.piece} tone="night" />
            <span>
              <span
                className="block font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#F5F5F0]"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                La carta
              </span>
              <span className="mt-4 block font-sans-app text-sm leading-relaxed text-[#A6B86B]">
                Cocina de autor, café de especialidad y postres de la casa.
              </span>
              <Access label={menu.cta.label} tone="coral" />
            </span>
          </Piece>

          {/* ESPACIOS — papel, arquitectónica (dos sedes como par tipográfico) */}
          <Piece
            href={spaces.cta.href}
            className="min-h-[22rem] border-[rgba(28,25,18,.16)] bg-[#F7F1E6] md:col-span-7 md:min-h-[26rem]"
          >
            <PieceLabel piece={spaces.piece} tone="paper" />
            <span>
              <span className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                {spaces.sedes.map((sede, i) => (
                  <span
                    key={sede}
                    className="font-playfair font-black leading-[0.9] tracking-[-0.03em] text-[#181f0d]"
                    style={{ fontSize: i === 0 ? 'clamp(2.2rem, 5vw, 3.8rem)' : 'clamp(1.8rem, 4vw, 3rem)' }}
                  >
                    {sede}
                  </span>
                ))}
              </span>
              <span className="mt-4 block font-sans-app text-sm leading-relaxed text-[#4A5728]">
                {spaces.line}
              </span>
              <Access label={spaces.cta.label} tone="wine" />
            </span>
          </Piece>
        </div>
      </Container>
    </section>
  )
}
