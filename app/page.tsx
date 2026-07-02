import Link from 'next/link'
import { Reveal } from './components/Reveal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Counter } from './components/Counter'
import { ScrollProgress } from './components/ScrollProgress'
import { Parallax } from './components/Parallax'
import { MagneticButton } from './components/MagneticButton'
import { MediaSlot } from './components/MediaSlot'
import { Preloader } from './components/Preloader'
import { AmbienteScroll } from './components/AmbienteScroll'
import { VelocityMarquee } from './components/VelocityMarquee'

const TICKER_ITEMS = [
  'Café Literario', '16 Años', 'Desde 2008', 'Libros & Espresso',
  'Comunidad', 'Historia Viva', 'Tu Lugar', 'Palabras & Café',
  'Café Literario', '16 Años', 'Desde 2008', 'Libros & Espresso',
  'Comunidad', 'Historia Viva', 'Tu Lugar', 'Palabras & Café',
]

const AMBIENTE = [
  { eyebrow: 'El corazón', label: 'El salón principal' },
  { eyebrow: 'El oficio', label: 'La barra de café' },
  { eyebrow: 'El alma', label: 'Los libros' },
  { eyebrow: 'La hora mágica', label: 'Noches de lectura' },
]

const MENU_CATEGORIES = [
  {
    title: 'Cafés',
    items: [
      { name: 'Espresso', desc: 'Origen único, tueste medio', price: '$3.500' },
      { name: 'Cortado', desc: 'Espresso con un toque de leche', price: '$4.000' },
      { name: 'Café de autor', desc: 'Rotación mensual del barista', price: '$5.500' },
      { name: 'Cold brew', desc: 'Reposo de 18 horas', price: '$4.800' },
    ],
  },
  {
    title: 'Repostería',
    items: [
      { name: 'Croissant de almendra', desc: 'Horneado cada mañana', price: '$4.200' },
      { name: 'Torta de naranja', desc: 'Receta de la casa desde 2008', price: '$4.800' },
      { name: 'Galletas de avena', desc: 'Con chips de chocolate 70%', price: '$2.500' },
    ],
  },
  {
    title: 'Para leer y compartir',
    items: [
      { name: 'Mesa de lectura', desc: 'Reserva tu rincón favorito', price: 'Gratis' },
      { name: 'Club de lectura', desc: 'Encuentros el primer jueves de mes', price: 'Abierto' },
      { name: 'Estantería comunitaria', desc: 'Trae un libro, llévate otro', price: 'Trueque' },
    ],
  },
]

const STATS = [
  { count: 2008, label: 'año de apertura' },
  { count: 16, label: 'años en el mercado' },
  { text: '∞', label: 'conversaciones' },
  { count: 1, label: 'lugar único' },
]

const TESTIMONIALS = [
  {
    quote: 'Vengo desde que era estudiante. Aquí terminé mi tesis y, quince años después, sigo pidiendo el mismo cortado.',
    name: 'Mariana Restrepo',
    role: 'Cliente desde 2009',
  },
  {
    quote: 'No es un café, es mi segunda biblioteca. Cada visita me llevo una conversación nueva.',
    name: 'Andrés Gaitán',
    role: 'Escritor',
  },
  {
    quote: 'El único lugar donde el barista te recomienda un libro junto con tu espresso.',
    name: 'Lucía Ferreira',
    role: 'Miembro del club de lectura',
  },
]

const HOURS = [
  { day: 'Lunes a viernes', time: '7:30 a 20:00' },
  { day: 'Sábados', time: '8:00 a 21:00' },
  { day: 'Domingos', time: '9:00 a 18:00' },
]

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-clip">
      <Preloader />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Nav />

      <Hero />

      {/* ── TICKER MARQUEE (reactivo a la velocidad de scroll) ── */}
      <VelocityMarquee items={TICKER_ITEMS} />

      {/* ── HISTORIA ── */}
      <section id="historia" className="px-8 py-28 border-b border-[#4A5728] scroll-mt-24">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center mb-20">
            <Reveal>
              <MediaSlot
                eyebrow="Desde 2008"
                label="Nuestra casa"
                className="rounded-[1.5rem] h-full min-h-[420px]"
              />
            </Reveal>

            <Reveal delay={120}>
              <h2 className="text-balance font-playfair font-bold text-4xl md:text-5xl text-[#F5F5F0] leading-[1.05] mb-6">
                No somos solo un café.<br />
                <span className="italic pb-1 inline-block text-[#FF7F70]">Somos un capítulo.</span>
              </h2>
              <p className="font-playfair text-[#D9DCC4] text-lg leading-loose mb-6">
                Desde 2008 hemos sido testigos de primeros encuentros, tesis terminadas a medianoche,
                lecturas en voz alta y amistades que empezaron sobre una taza de espresso.
              </p>
              <p className="font-sans-app text-[#A6B86B] text-sm leading-relaxed">
                Cada mesa tiene una historia distinta. Ven a escribir la tuya con nosotros.
              </p>
            </Reveal>
          </div>

          <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#4A5728] border border-[#4A5728]">
            {STATS.map(({ count, text, label }) => (
              <div key={label} className="bg-[#343E1C] px-8 py-10 flex flex-col justify-between gap-6">
                <span className="font-playfair font-black text-[#F5F5F0] leading-none"
                  style={{ fontSize: text === '∞' ? '3.5rem' : '3rem' }}>
                  {text ? text : <Counter to={count!} />}
                </span>
                <span className="font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B]">
                  {label}
                </span>
              </div>
            ))}
          </Reveal>

        </div>
      </section>

      {/* ── EL AMBIENTE (scroll horizontal anclado, listo para tus videos) ── */}
      <AmbienteScroll items={AMBIENTE} />

      {/* ── MENÚ ── */}
      <section id="menu" className="px-8 py-28 border-b border-[#4A5728] scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#C9A227] mb-4">
            Lo que servimos
          </p>
          <h2 className="text-balance font-playfair font-black text-5xl md:text-6xl text-[#F5F5F0] leading-tight mb-16">
            Nuestro menú.<br />
            <span className="italic">Hecho cada día.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#4A5728] border border-[#4A5728]">
            {MENU_CATEGORIES.map(({ title, items }, i) => (
              <Reveal key={title} delay={i * 90} className="bg-[#343E1C] p-10">
                <h3 className="font-playfair font-bold text-2xl text-[#F5F5F0] mb-6">{title}</h3>
                <ul className="flex flex-col gap-1">
                  {items.map(({ name, desc, price }) => (
                    <li key={name} className="menu-item flex items-start justify-between gap-4 border-l-2 border-transparent pl-4 py-3">
                      <div>
                        <p className="font-sans-app text-sm font-bold text-[#F5F5F0]">{name}</p>
                        <p className="font-sans-app text-xs text-[#A6B86B] mt-1">{desc}</p>
                      </div>
                      <span className="menu-price font-playfair italic text-[#FF7F70] whitespace-nowrap">{price}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="px-8 py-28 border-b border-[#4A5728]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-balance font-playfair font-black text-4xl md:text-5xl text-[#F5F5F0] leading-tight mb-16">
            Lo que dicen<br />
            <span className="italic">quienes vuelven.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#4A5728] border border-[#4A5728]">
            {TESTIMONIALS.map(({ quote, name, role }, i) => (
              <Reveal key={name} delay={i * 90} className="bg-[#343E1C] p-10 flex flex-col justify-between gap-8">
                <p className="font-playfair italic text-[#F5F5F0] text-xl leading-relaxed">
                  <span className="text-[#FF7F70] text-3xl leading-none mr-1 align-[-0.15em]">“</span>
                  {quote}
                </p>
                <div>
                  <p className="font-sans-app text-sm font-bold text-[#F5F5F0]">{name}</p>
                  <p className="font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] mt-1">{role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UBICACIÓN Y HORARIOS ── */}
      <section id="ubicacion" className="px-8 py-28 border-b border-[#4A5728] scroll-mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          <Reveal>
            <h2 className="font-playfair font-black text-4xl md:text-5xl text-[#F5F5F0] leading-tight mb-8">
              Encuéntranos
            </h2>

            <div className="flex flex-col gap-2 mb-10">
              <p className="font-sans-app text-sm text-[#F5F5F0]">Calle de las Letras 123, Centro Histórico</p>
              <p className="font-sans-app text-sm text-[#A6B86B]">contacto@cafeliterario.com · +57 300 000 0000</p>
            </div>

            <div className="flex flex-col gap-3">
              {HOURS.map(({ day, time }) => (
                <div key={day} className="flex items-center justify-between border-b border-[#4A5728] pb-3">
                  <span className="font-sans-app text-[11px] font-bold tracking-[0.15em] uppercase text-[#A6B86B]">{day}</span>
                  <span className="font-playfair italic text-[#F5F5F0]">{time}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mapa estilizado (radar) — placeholder animado hasta tener dirección real */}
          <Reveal delay={120} className="relative overflow-hidden rounded-[1.5rem] border border-[#4A5728] bg-[#2A331A] min-h-[340px] flex items-center justify-center">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(166,184,107,0.10), transparent 70%)' }} />
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'repeating-linear-gradient(0deg,#4A5728 0px,#4A5728 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#4A5728 0px,#4A5728 1px,transparent 1px,transparent 40px)' }} />
            <div className="radar-ring" />
            <div className="radar-ring d2" />
            <div className="radar-ring d3" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <svg className="map-pin" width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill="#C1121F" />
                <circle cx="12" cy="9" r="2.6" fill="#F5F5F0" />
              </svg>
              <span className="font-sans-app text-[10px] font-bold tracking-[0.3em] uppercase text-[#A6B86B]">
                Centro Histórico
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── CONTACTO / CTA FINAL ── */}
      <section id="contacto" className="px-8 py-32 relative noise overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 72px)' }} />

        <Parallax distance={60} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="font-playfair font-black text-[22vw] text-[#4A5728]/30 leading-none">
            VISITA.
          </span>
        </Parallax>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Reveal>
            <h2 className="font-playfair font-black text-[#F5F5F0] leading-none mb-4"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
              Tu próxima
            </h2>
            <h2 className="font-sans-app font-black text-[#FF7F70] uppercase leading-none tracking-tighter mb-12"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
              taza.
            </h2>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton href="#ubicacion"
              className="press btn-fill group font-sans-app text-[11px] font-black tracking-[0.3em] uppercase text-[#343E1C] bg-[#F5F5F0] border-2 border-[#F5F5F0] px-10 py-5 inline-flex items-center gap-3 shadow-[5px_5px_0px_0px_#C1121F]">
              <span>Cómo llegar</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </MagneticButton>
            <Link href="/register"
              className="press font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0]/60 hover:text-[#F5F5F0] transition-colors border-b border-transparent hover:border-[#F5F5F0]/30 pb-0.5">
              Únete al programa de socios
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-[#4A5728] px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-playfair italic text-[#F5F5F0] text-xl block mb-1">Café Literario</span>
            <span className="font-sans-app text-[10px] tracking-widest uppercase text-[#A6B86B]">
              16 años · Desde 2008
            </span>
          </div>
          <div className="flex gap-8">
            <Link href="/login" className="font-sans-app text-[10px] tracking-widest uppercase text-[#A6B86B] underline-slide hover:text-[#F5F5F0] transition-colors">
              Ingresar
            </Link>
            <Link href="/register" className="font-sans-app text-[10px] tracking-widest uppercase text-[#A6B86B] underline-slide hover:text-[#F5F5F0] transition-colors">
              Registrarse
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
