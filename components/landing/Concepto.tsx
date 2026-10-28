import { concepto } from '@/lib/content'
import { Kicker, SectionTitle } from './Pieces'
import Reveal from './Reveal'

const tones = {
  cream: { bg: '#F5F5F0', fg: '#181f0d' },
  red: { bg: '#C1121F', fg: '#F5F5F0' },
  ink: { bg: '#181f0d', fg: '#F5F5F0' },
} as const

/** Sección oscura: el contraste con el resto marca el corte narrativo. Sobre
 *  fondo ink las tarjetas invierten borde y sombra a crema, porque una sombra
 *  sólida del mismo color del fondo sencillamente no existe. */
export default function Concepto() {
  return (
    <section id="concepto" className="bg-[#181f0d] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Kicker number={1} label="El concepto" tone="cream" />
          <SectionTitle title={concepto.title} accent={concepto.titleAccent} tone="cream" />
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#F5F5F0] md:text-[19px]">
            {concepto.text}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {concepto.pilares.map((pilar, index) => {
            const tone = tones[pilar.tone]
            return (
              <Reveal key={pilar.title} delay={index * 90}>
                <article
                  className="ck-card ck-on-dark flex h-full flex-col justify-between p-7 md:p-8"
                  style={{ background: tone.bg, color: tone.fg }}
                >
                  <span className="hd-hand text-[24px]" style={{ color: pilar.tone === 'cream' ? '#C1121F' : '#F5F5F0' }}>
                    capítulo {index + 1}
                  </span>
                  <h3 className="ck-d mt-5 text-[48px] leading-[0.9] md:text-[36px] lg:text-[60px]">
                    {pilar.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed">{pilar.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
