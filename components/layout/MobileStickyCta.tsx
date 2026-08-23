import { contactConfig } from '@/data/contact'

/**
 * Barra de reserva fija, solo en móvil (`md:hidden`): el CTA de reserva
 * queda siempre a un toque, sin depender de hacer scroll hasta el cierre de
 * cada página. `pb-[env(safe-area-inset-bottom)]` respeta el home indicator
 * de iOS. Server Component: es un enlace estático, sin estado.
 */
export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#4A5728] bg-[#181f0d]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <a
        href={contactConfig.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="press flex min-h-12 w-full items-center justify-center gap-2 font-sans-app text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F5F0]"
      >
        Reservar por WhatsApp
      </a>
    </div>
  )
}
