import { libreria, waLink, wa } from '@/lib/content'
import { HandNote, Kicker, SectionTitle } from './Pieces'
import Reveal from './Reveal'

/**
 * La foto de La Maga todavía no existe, así que en su lugar va un marco
 * declarado como pendiente en vez de un `<img>` roto o una imagen de banco.
 * Un hueco honesto se puede llenar; una foto de stock de una librería
 * cualquiera contradice justo lo que esta sección dice.
 */
export default function Libreria() {
  return (
    <section id="libreria" className="ck-dots px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div
              className="ck-card ck-card-lg grid place-items-center bg-[#E4E8CF] p-8 text-center"
              style={{ aspectRatio: '4 / 5' }}
            >
              <p className="hd-hand text-[26px] text-[#4A5728]">
                foto de La Maga
                <br />
                pendiente
              </p>
            </div>
            <p className="mt-5">
              <HandNote className="text-[26px]" rotate={-3}>
                {libreria.handNote}
              </HandNote>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <Kicker number={4} label="Librería La Maga" />
            <SectionTitle title={libreria.title} accent={libreria.titleAccent} />
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed md:text-[19px]">
              {libreria.text}
            </p>
            <a href={waLink(wa.actividad)} className="ck-btn ck-ink mt-8">
              {libreria.cta} →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
