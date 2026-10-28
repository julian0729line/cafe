import { hero, waLink, wa } from '@/lib/content'
import { HandNote } from './Pieces'

/**
 * Primera pantalla. Es donde se concentra la mayor parte de la atención, así
 * que el nombre, qué es el sitio y la acción primaria son legibles sin scroll
 * y sin esperar a ninguna animación.
 *
 * El vídeo lleva `poster` y `preload="metadata"`: el LCP lo resuelve una
 * imagen de 28 KB, no un MP4 de 1.8 MB.
 */
export default function Hero() {
  return (
    // El padding superior deja libre la barra flotante (fija, con su propio
    // margen). En mobile es más alta porque los botones envuelven, de ahí los
    // 36 de arranque: con menos, el sticker queda debajo del nav.
    <section id="inicio" className="ck-dots px-4 pb-16 pt-36 md:px-8 md:pb-24 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <span className="ck-sticker">
            <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full bg-[#C1121F]" />
            {hero.sticker}
          </span>

          <h1 className="ck-d mt-7 text-[clamp(3.4rem,9vw,7.6rem)] leading-[0.86]">
            {hero.titleLine1}
            <br />
            <em className="font-playfair italic text-[#C1121F]">{hero.titleLine2}</em>
          </h1>

          <p className="mt-7 max-w-xl text-[18px] leading-relaxed md:text-[24px]">
            {hero.lead} <strong className="font-bold">{hero.leadBold}</strong>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={waLink(wa.general)} className="ck-btn ck-red">
              {hero.ctaPrimary} →
            </a>
            <a href="#agenda" className="ck-btn ck-cream">
              {hero.ctaSecondary}
            </a>
            <HandNote className="hidden text-[24px] sm:inline-block" rotate={-3}>
              {hero.handNote}
            </HandNote>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {hero.pills.map((pill) => (
              <li
                key={pill}
                className="hd-box border-2 border-[#181f0d] bg-[#F5F5F0] px-4 py-2 text-sm font-bold"
              >
                {pill}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div
            className="ck-card ck-card-lg relative overflow-hidden bg-[#181f0d]"
            style={{ aspectRatio: '4 / 5' }}
          >
            {/* WebM primero: pesa menos en los navegadores que lo soportan,
                y el MP4 queda de respaldo para Safari antiguo. Sin audio, así
                que no hay nada que silenciar ni que controlar. */}
            <video
              className="h-full w-full object-cover"
              poster={hero.video.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Interior de Café Valparaíso"
            >
              <source src={hero.video.webm} type="video/webm" />
              <source src={hero.video.src} type="video/mp4" />
            </video>
          </div>

          <span
            className="ck-sticker absolute -left-2 -top-3 bg-[#C1121F] text-[#F5F5F0]"
            style={{ borderColor: '#181f0d' }}
          >
            {hero.videoSticker}
          </span>

          <HandNote className="absolute -bottom-7 right-2 text-[30px]" rotate={-3} tone="ink">
            {hero.videoNote}
          </HandNote>
        </div>
      </div>
    </section>
  )
}
