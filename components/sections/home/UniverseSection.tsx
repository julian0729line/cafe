import type { ReactNode } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import LomoBestiarioCinemagraph from './LomoBestiarioCinemagraph'

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
  agenda: {
    piece: string
    name: string
    line: string
    event?: { title: string; dateLabel: string | null } | null
    cta: Cta
  }
  library: { piece: string; name: string; line: string; cta: Cta }
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
 * Universo Valparaíso — el corazón del Home. Cuatro accesos (Menú, Agenda,
 * Librería La Maga, Espacios) en una sola composición-mosaico. Comparten la
 * gramática de las «cartas de lugar» de Espacios (nombre protagonista + una
 * línea útil + acceso), pero varían en escala, superficie y énfasis. Cada pieza
 * es un enlace-carta completo. Sin párrafos, sin marcos-foto vacíos, sin ghost
 * type. Server Component.
 */
export default function UniverseSection({
  eyebrow = 'Universo Valparaíso',
  menu,
  agenda,
  library,
  spaces,
}: UniverseSectionProps) {
  return (
    <section aria-label="Universo Café Valparaíso" className="relative overflow-hidden bg-[#F5F5F0] py-20 md:py-28">
      <Container variant="default" className="relative">
        <p className="mb-8 font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728] md:mb-10">
          {eyebrow}
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* MENÚ — cinemagraph del plato insignia «Lomo Bestiario» */}
          <Piece
            href={menu.cta.href}
            className="min-h-[22rem] border-[#4A5728] bg-[#12180a] md:col-span-7 md:min-h-[26rem]"
          >
            <LomoBestiarioCinemagraph
              label={`${menu.piece} · ${menu.name}`}
              dishLead={menu.dishLead}
              dishAccent={menu.dishAccent}
              ingredients={menu.ingredients}
              accessLabel={menu.cta.label}
            />
          </Piece>

          {/* AGENDA — papel, temporal (evento real si existe; si no, descriptor) */}
          <Piece
            href={agenda.cta.href}
            className="min-h-[19rem] border-[rgba(28,25,18,.16)] bg-[#EFE4D0] md:col-span-5 md:min-h-[24rem]"
          >
            <PieceLabel piece={agenda.piece} tone="paper" />
            <span>
              <span
                className="block font-playfair font-black leading-[0.9] tracking-[-0.02em] text-[#181f0d]"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
              >
                {agenda.name}
              </span>
              {agenda.event ? (
                <span className="mt-4 block font-playfair text-lg text-[#7A2230] md:text-xl">
                  {agenda.event.dateLabel ? <span className="tabular-nums">{agenda.event.dateLabel} · </span> : null}
                  {agenda.event.title}
                </span>
              ) : (
                <span className="mt-4 block max-w-xs font-sans-app text-sm leading-relaxed text-[#4A5728]">
                  {agenda.line}
                </span>
              )}
              <Access label={agenda.cta.label} tone="wine" />
            </span>
          </Piece>

          {/* LIBRERÍA LA MAGA — noche profunda, íntima */}
          <Piece
            href={library.cta.href}
            className="min-h-[15rem] border-[#4A5728] bg-[#12180a] md:col-span-5 md:min-h-[20rem]"
          >
            <PieceLabel piece={library.piece} tone="night" />
            <span>
              <span
                className="block font-playfair font-black leading-[0.92] tracking-[-0.02em] text-[#F5F5F0]"
                style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)' }}
              >
                {library.name}
              </span>
              <span className="mt-3 block max-w-xs font-playfair text-base italic leading-snug text-[#D9DCC4] md:text-lg">
                {library.line}
              </span>
              <Access label={library.cta.label} tone="coral" />
            </span>
          </Piece>

          {/* ESPACIOS — papel, arquitectónica (dos sedes como par tipográfico) */}
          <Piece
            href={spaces.cta.href}
            className="min-h-[15rem] border-[rgba(28,25,18,.16)] bg-[#F7F1E6] md:col-span-7 md:min-h-[20rem]"
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
