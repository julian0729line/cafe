import { infoRapida } from '@/lib/content'
import Reveal from './Reveal'

/**
 * Las tres preguntas que trae quien llega de Instagram o de Maps: dónde queda,
 * qué hay y si sirve para un evento. Van inmediatamente después del hero
 * porque esa persona no viene a que la convenzan — viene a resolver logística.
 */
export default function InfoRapida() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {infoRapida.map((card, index) => (
          <Reveal key={card.title} delay={index * 80}>
            <article
              className={`ck-card flex h-full flex-col justify-between p-7 md:p-8 ${
                card.tone === 'tint' ? 'bg-[#E4E8CF]' : 'bg-[#F5F5F0]'
              }`}
            >
              <div>
                <h3 className="ck-d text-[30px] md:text-[36px]">{card.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed">{card.text}</p>
              </div>
              <a
                href={card.href}
                className="mt-7 inline-block text-[16px] font-bold"
                style={{
                  textDecoration: 'underline',
                  textDecorationColor: '#C1121F',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 4,
                }}
              >
                {card.cta} →
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
