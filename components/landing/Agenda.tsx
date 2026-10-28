import { agenda } from '@/lib/content'
import { HandNote, Kicker, SectionTitle } from './Pieces'
import NewsletterForm from './NewsletterForm'
import Reveal from './Reveal'

export default function Agenda() {
  return (
    <section id="agenda" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker number={2} label="Agenda cultural" />
              <SectionTitle title={agenda.title} accent={agenda.titleAccent} />
            </div>
            <HandNote className="text-[30px]" rotate={-4}>
              {agenda.handNote}
            </HandNote>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {agenda.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article
                className={`ck-card h-full p-6 md:p-7 ${
                  index % 2 === 0 ? 'bg-[#F5F5F0]' : 'bg-[#E4E8CF]'
                }`}
              >
                <h3 className="ck-d text-[24px] leading-tight md:text-[28px]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="ck-card mt-10 bg-[#C1121F] p-7 text-[#F5F5F0] md:p-10">
            <div className="grid items-center gap-7 lg:grid-cols-2">
              <div>
                <h3 className="ck-d text-[30px] leading-tight md:text-[40px]">
                  {agenda.newsletter.title}{' '}
                  <span className="hd-mark-light">{agenda.newsletter.titleMark}</span>
                </h3>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed">
                  {agenda.newsletter.text}
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
