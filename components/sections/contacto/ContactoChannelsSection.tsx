import Container from '@/components/ui/Container'

export type ContactChannelLine = {
  label: string
  value: string
  href: string
  external?: boolean
}

export interface ContactoChannelsSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  channels?: ContactChannelLine[]
  emptyMessage?: string
  note?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Canales oficiales confirmados (`contactConfig`): hoy solo WhatsApp. Cada
 * canal no confirmado (teléfono, correo, Instagram) simplemente no aparece
 * en la lista — no se muestra ningún label vacío ni texto "pendiente de
 * confirmar" que deteriore la página. Nota explícita: un mensaje es una
 * solicitud, no una reserva confirmada. Server Component.
 */
export default function ContactoChannelsSection({
  index = '02',
  eyebrow = 'Canales oficiales',
  title = 'Escríbenos y',
  emphasis = 'te respondemos.',
  description = 'El canal más rápido para resolver dudas, preguntar por un espacio o iniciar una solicitud de reserva.',
  channels = [],
  emptyMessage = 'Los canales oficiales se están actualizando. Vuelve pronto.',
  note = 'Escribir aquí abre una conversación real, no confirma una reserva de inmediato: revisamos los detalles contigo antes de confirmar las condiciones.',
  className = '',
}: ContactoChannelsSectionProps) {
  return (
    <section className={cn('bg-[#F5F5F0] py-20 md:py-28', className)}>
      <Container variant="default">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 max-w-2xl font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl font-sans-app text-base leading-relaxed text-[#4A5728]">
            {description}
          </p>
        ) : null}

        {channels.length > 0 ? (
          <ul className="mt-12 flex flex-col gap-5 md:flex-row md:flex-wrap">
            {channels.map((channel) => (
              <li
                key={channel.label}
                className="border border-[#181f0d]/15 bg-[#F7F1E6] px-8 py-7 md:min-w-[300px]"
              >
                <span className="font-sans-app text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A2230]">
                  {channel.label}
                </span>
                <a
                  href={channel.href}
                  className="press mt-2 flex min-h-11 w-fit items-center font-playfair text-2xl text-[#181f0d] transition-colors hover:text-[#C1121F]"
                  {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {channel.value}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 max-w-md font-playfair text-lg italic leading-relaxed text-[#4A5728]">
            {emptyMessage}
          </p>
        )}

        {note ? (
          <p className="mt-10 max-w-xl font-sans-app text-sm leading-relaxed text-[#4A5728]">
            {note}
          </p>
        ) : null}
      </Container>
    </section>
  )
}
