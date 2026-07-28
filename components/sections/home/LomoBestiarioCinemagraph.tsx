export interface LomoBestiarioCinemagraphProps {
  /** Etiqueta pequeña (folio + sección), p. ej. «01 · Menú». */
  label?: string
  dishLead?: string
  dishAccent?: string
  ingredients?: string
  accessLabel?: string
}

// LQIP (~24px) incrustado: evita cualquier parpadeo en blanco antes de que
// carguen las imágenes reales. Generado con sharp desde la foto original.
const LQIP = 'data:image/webp;base64,UklGRgoBAABXRUJQVlA4IP4AAAAwBgCdASoYABgAPu1srlIppaQiqAgBMB2JaACsBagcYFURHSPVgv6q1ny9flv44vmakEeJXkbyamSAAP5ojTDkNccBSndMbQvKKk95t+t4vNfWPJ47KrpbUzEeEzrPtcCuYvinS1tNh1SzsHUvjO99Z6pqplDPdo8ZbroVcJl4ZR57NGeVVcZJWTpSiHQBHb4wcfkTvKbJz+EWf332XKwEQhl9ZySOiBAoT7Id1Iu6YtE7Jec0lAO75zWuw3XBpTr6KGq2Oci0WWaS+xlmOY3ngm94VGcHHR85bBrkfYIlSfovHi30J01kd5MslOig6lN0LS8Xdx+H/9H69I4AAA=='

/**
 * Lomo Bestiario — cinemagraph de la carta «Menú» dentro de Universo
 * Valparaíso. La fotografía real del plato cobra vida con transforms CSS
 * (push-in con origen en el centro del medallón + respiración de luz + grain),
 * fidelidad 100% al plato, loop exacto por `alternate`. Las capas de imagen son
 * decorativas (`aria-hidden`); el nombre del plato y sus ingredientes existen
 * como texto real en el DOM, legibles sin movimiento. `prefers-reduced-motion`
 * congela la pieza en el fotograma inicial. Sin JavaScript. Server Component.
 * Se monta dentro del `<Piece>` (que es el enlace a /menu).
 */
export default function LomoBestiarioCinemagraph({
  label = '01 · Menú',
  dishLead = 'Lomo',
  dishAccent = 'Bestiario',
  ingredients = 'Pasta · hongos · cebolla crocante',
  accessLabel = 'Ver menú',
}: LomoBestiarioCinemagraphProps) {
  return (
    <>
      {/* ── Capas decorativas ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ backgroundImage: `url("${LQIP}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Fondo desenfocado (ambiente, estático) */}
        <picture>
          <source type="image/avif" srcSet="/media/lomo/lomo-fondo.avif" />
          <img
            src="/media/lomo/lomo-fondo.webp"
            alt=""
            width={480}
            height={480}
            decoding="async"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* Capa plato (animada): mobile = recorte 4:5 a sangre; desktop = cuadrado a la derecha */}
        <picture>
          <source media="(max-width: 767px)" type="image/avif" srcSet="/media/lomo/lomo-plato-mobile.avif" />
          <source media="(max-width: 767px)" type="image/webp" srcSet="/media/lomo/lomo-plato-mobile.webp" />
          <source type="image/avif" srcSet="/media/lomo/lomo-plato-desktop.avif" />
          <img
            src="/media/lomo/lomo-plato-desktop.webp"
            alt=""
            width={720}
            height={720}
            decoding="async"
            loading="lazy"
            className="lomo-plato absolute inset-0 h-full w-full object-cover object-top md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-auto md:object-center"
          />
        </picture>

        {/* Respiración de luz sobre la salsa */}
        <span
          className="lomo-luz absolute inset-0"
          style={{ background: 'radial-gradient(42% 40% at 60% 58%, rgba(255,214,150,0.95), transparent 70%)' }}
        />

        {/* Grain estático */}
        <span className="grain-soft" />

        {/* Scrim direccional (0 → ~55% negro, abajo-izquierda) para contraste AA del título */}
        <span
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top right, rgba(0,0,0,0.62), rgba(0,0,0,0.18) 46%, transparent 68%)' }}
        />
      </span>

      {/* ── Contenido real (texto en el DOM) ── */}
      <span className="relative z-10 font-sans-app text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5F5F0]/80">
        <span className="mr-2 tabular-nums text-[#FF7F70]">{label.split('·')[0]?.trim()}</span>
        {label.includes('·') ? label.split('·').slice(1).join('·').trim() : null}
      </span>

      <span className="relative z-10 block">
        <span
          className="font-playfair font-black leading-[0.82] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}
        >
          <span className="block text-[#F5F5F0]">{dishLead}</span>
          <span className="-mt-1 block italic text-[#FF7F70]">{dishAccent}</span>
        </span>
        {ingredients ? (
          <span className="mt-4 block font-sans-app text-xs uppercase tracking-[0.18em] text-[#F5F5F0]/80">
            {ingredients}
          </span>
        ) : null}
        <span className="mt-7 inline-flex items-center gap-2 font-sans-app text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF7F70]">
          {accessLabel}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </span>
    </>
  )
}
