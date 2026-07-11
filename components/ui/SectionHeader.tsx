import type { ElementType } from 'react'

export interface SectionHeaderProps {
  eyebrow?: string
  title: string
  /**
   * Énfasis editorial opcional: palabra/frase que se añade al final del título
   * en serif itálica y color rojo de marca (patrón "Agenda cultural." del
   * lenguaje Claude Design). Retrocompatible: si no se pasa, el título no cambia.
   */
  emphasis?: string
  description?: string
  align?: 'left' | 'center'
  titleAs?: 'h1' | 'h2' | 'h3'
  className?: string
}

const ALIGN_CLASSES = {
  left: 'text-left items-start',
  center: 'text-center items-center',
} as const

export default function SectionHeader({
  eyebrow,
  title,
  emphasis,
  description,
  align = 'left',
  titleAs = 'h2',
  className = '',
}: SectionHeaderProps) {
  const TitleTag: ElementType = titleAs
  const TITLE_SIZE_CLASSES = {
    h1: '',
    h2: 'text-[2.25rem]',
    h3: 'text-2xl',
  } as const

  return (
    <div className={`flex flex-col gap-4 ${ALIGN_CLASSES[align]} ${className}`.trim()}>
      {eyebrow ? (
        <span className="font-sans-app text-[0.6875rem] font-bold uppercase tracking-[0.35em] text-[#C9A227]">
          {eyebrow}
        </span>
      ) : null}
      <TitleTag
        className={`font-playfair font-black leading-[1.05] tracking-tight text-[#F5F5F0] ${TITLE_SIZE_CLASSES[titleAs]}`.trim()}
        style={
          titleAs === 'h1'
            ? { fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)' }
            : undefined
        }
      >
        {title}
        {emphasis ? (
          <>
            {' '}
            <em className="italic text-[#C1121F]">{emphasis}</em>
          </>
        ) : null}
      </TitleTag>
      {description ? (
        <p className="font-sans-app max-w-2xl text-base leading-relaxed text-[#A6B86B]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
