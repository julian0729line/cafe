import { visitanos, waLink } from '@/lib/content'
import { Kicker, SectionTitle } from './Pieces'
import Reveal from './Reveal'

/**
 * Dos sedes desambiguadas, cada una con su propio enlace a WhatsApp y su
 * propio mensaje. Pance y Juanambú están lejos entre sí: tratarlas como una
 * sola dirección es el descuido que más caro sale en un negocio de dos locales.
 *
 * Direcciones y horarios siguen como «Por confirmar» hasta que lleguen los
 * reales. Es el bloqueador de mayor impacto de la página y no se arregla con
 * código.
 */
export default function Visitanos() {
  return (
    <section id="visitanos" className="bg-[#E4E8CF] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Kicker number={5} label="Visítanos" />
          <SectionTitle title={visitanos.title} accent={visitanos.titleAccent} />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {visitanos.sedes.map((sede, index) => {
            const dark = index === 1
            return (
              <Reveal key={sede.name} delay={index * 80}>
                <article
                  className={`ck-card flex h-full flex-col justify-between p-7 md:p-8 ${
                    dark ? 'ck-on-dark bg-[#181f0d] text-[#F5F5F0]' : 'bg-[#F5F5F0]'
                  }`}
                >
                  <div>
                    <span className="text-[13px] font-bold uppercase tracking-[0.18em]">Sede</span>
                    <h3 className="ck-d mt-2 text-[36px] leading-tight md:text-[48px]">
                      {sede.name}
                    </h3>
                    {/* Rótulos visibles: sin ellos, dos «Por confirmar»
                        seguidos parecen un error de la página en vez de un
                        dato que falta. Y el horario es justo lo que más busca
                        quien ya conoce el sitio, así que el hueco tiene que
                        leerse como hueco. */}
                    <dl className="mt-5 space-y-3 text-[16px]">
                      <div>
                        <dt
                          className="text-[12px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: dark ? '#A6B86B' : '#4A5728' }}
                        >
                          Dirección
                        </dt>
                        <dd>{sede.address}</dd>
                      </div>
                      <div>
                        <dt
                          className="text-[12px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: dark ? '#A6B86B' : '#4A5728' }}
                        >
                          Horario
                        </dt>
                        <dd>{sede.hours}</dd>
                      </div>
                    </dl>
                  </div>
                  <a
                    href={waLink(sede.waMessage)}
                    className={`ck-btn mt-7 ${dark ? 'ck-red ck-on-dark' : 'ck-ink'}`}
                  >
                    Reservar en {sede.name}
                  </a>
                </article>
              </Reveal>
            )
          })}

          <Reveal delay={160}>
            <article className="ck-card h-full bg-[#F5F5F0] p-7 md:p-8">
              <span className="text-[13px] font-bold uppercase tracking-[0.18em]">Canales</span>
              <dl className="mt-5 space-y-4">
                {visitanos.canales.map((canal) => (
                  <div key={canal.label}>
                    <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#4A5728]">
                      {canal.label}
                    </dt>
                    <dd className="text-[17px]">{canal.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
