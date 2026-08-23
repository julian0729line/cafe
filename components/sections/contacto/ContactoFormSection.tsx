'use client'

import { useActionState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { submitContactMessage, type ContactFormState } from '@/app/contacto/actions'

const initialState: ContactFormState = { status: 'idle' }

export interface ContactoFormSectionProps {
  index?: string
  eyebrow?: string
  title?: string
  emphasis?: string
  description?: string
  className?: string
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

// Campos sobre papel, no cajas de navegador. El blanco puro con borde gris al
// 20% leia como formulario por defecto sobre el crema de la seccion: fuera de
// paleta y con mas borde del que pide el sistema. Ahora son marfil con una
// linea fina oliva, y el foco lo marca el rojo de la casa.
const inputClasses =
  'w-full rounded-[3px] border border-[#4A5728]/45 bg-[#FDFCF7] px-4 py-3 font-sans-app text-sm text-[#181f0d] placeholder:text-[#8a8a80] transition-colors focus:border-[#C1121F] focus:outline-none focus:ring-2 focus:ring-[#C1121F]/25'

const labelClasses =
  'mb-2 block font-sans-app text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A5728]'

/**
 * Formulario de contacto: cada envío se guarda en Supabase (tabla
 * `mensajes_contacto`, ver `supabase/contact.sql`) — solo inserción, sin
 * ningún login de por medio. Client Component: necesita `useActionState`
 * para mostrar el estado de envío.
 */
export default function ContactoFormSection({
  index = '03',
  eyebrow = 'Escríbenos aquí',
  title = 'O déjanos un',
  emphasis = 'mensaje directo.',
  description = 'Cuéntanos qué necesitas y te respondemos por correo o por WhatsApp.',
  className = '',
}: ContactoFormSectionProps) {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState)

  return (
    <section className={cn('bg-[#F7F1E6] py-20 md:py-28', className)}>
      <Container variant="text">
        <p className="font-sans-app text-[11px] font-medium uppercase tracking-[0.4em] text-[#4A5728]">
          <span className="mr-3 tabular-nums text-[#C1121F]">{index}</span>
          {eyebrow}
        </p>
        <h2
          className="mt-5 font-playfair font-black leading-[0.95] tracking-tight text-[#181f0d]"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
        >
          {title} <span className="italic text-[#C1121F]">{emphasis}</span>
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl font-sans-app text-base leading-relaxed text-[#4A5728]">
            {description}
          </p>
        ) : null}

        <form action={formAction} className="mt-10 space-y-5">
          <div>
            <label htmlFor="contacto-nombre" className={labelClasses}>
              Nombre
            </label>
            <input
              id="contacto-nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contacto-email" className={labelClasses}>
              Correo (opcional)
            </label>
            <input
              id="contacto-email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="contacto-mensaje" className={labelClasses}>
              Mensaje
            </label>
            <textarea
              id="contacto-mensaje"
              name="mensaje"
              required
              rows={5}
              className={inputClasses}
            />
          </div>

          {state.status !== 'idle' && state.message ? (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                'rounded-sm border-2 px-4 py-3',
                state.status === 'success'
                  ? 'border-[#4A5728] bg-[#4A5728]/10 text-[#343E1C]'
                  : 'border-[#C1121F] bg-[#C1121F]/10 text-[#960E17]'
              )}
            >
              <p className="font-sans-app text-[11px] font-bold uppercase tracking-widest">
                {state.message}
              </p>
            </div>
          ) : null}

          <Button type="submit" variant="secondary" size="lg" disabled={isPending}>
            {isPending ? 'Enviando…' : 'Enviar mensaje'}
          </Button>
        </form>
      </Container>
    </section>
  )
}
