import { carta, waLink, wa } from '@/lib/content'
import { HandNote, Kicker, SectionTitle } from './Pieces'
import Reveal from './Reveal'

/**
 * La carta en HTML, nunca en PDF: un PDF en un navegador dentro de Instagram
 * es un callejón sin salida, no lo indexa bien el buscador y no se puede medir.
 *
 * Hoy son cuatro categorías, no platos con precio. Es la carencia más
 * importante de la página — el menú es lo primero que mira quien decide dónde
 * comer — y espera los datos reales del cliente.
 */
export default function Carta() {
  return (
    <section
      id="carta"
      className="border-y-2 border-[#181f0d] bg-[#E4E8CF] px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Kicker number={3} label="Gastronomía" />
            <SectionTitle title={carta.title} accent={carta.titleAccent} />
            <p className="mt-6 max-w-md text-[17px] leading-relaxed">{carta.text}</p>
            <p className="mt-7">
              <HandNote className="text-[28px]" rotate={-3}>
                {carta.handNote}
              </HandNote>
            </p>
            <a href={waLink(wa.general)} className="ck-btn ck-red mt-7">
              {carta.cta} →
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          {carta.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="ck-card-sm group flex flex-wrap items-baseline gap-x-5 gap-y-2 bg-[#F5F5F0] p-6 transition-colors hover:bg-[#C1121F] hover:text-[#F5F5F0]">
                <span className="hd-hand text-[24px] text-[#C1121F] transition-colors group-hover:text-[#F5F5F0]">
                  {index + 1}.
                </span>
                <h3 className="ck-d text-[30px] md:text-[36px]">{item.title}</h3>
                <p className="ml-auto max-w-sm text-[16px] leading-relaxed">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
