import Link from 'next/link'

const TICKER_ITEMS = [
  'Café Literario', '16 Años', 'Desde 2008', 'Libros & Espresso',
  'Comunidad', 'Historia Viva', 'Tu Lugar', 'Palabras & Café',
  'Café Literario', '16 Años', 'Desde 2008', 'Libros & Espresso',
  'Comunidad', 'Historia Viva', 'Tu Lugar', 'Palabras & Café',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between border-b border-[#4A5728]/60 bg-[#343E1C]/90 backdrop-blur-sm">
        <span className="font-playfair text-[#F5F5F0] text-base italic tracking-wide">
          Café Literario
        </span>
        <div className="flex items-center gap-1">
          <Link href="/login"
            className="font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#8A9A52] px-5 py-2.5 underline-slide">
            Ingresar
          </Link>
          <Link href="/register"
            className="btn-fill btn-fill-red font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0] border-2 border-[#C1121F] px-5 py-2.5">
            Únete
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 noise">

        {/* Grid de fondo */}
        <div className="absolute inset-0 z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 72px)' }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* Número 16 — el ancla visual */}
          <div className="fade-up fade-up-1 relative select-none pointer-events-none mb-[-2rem] md:mb-[-4rem]">
            <span className="font-playfair font-black text-[22vw] leading-none text-[#F5F5F0]/[0.07] block">
              16
            </span>
          </div>

          {/* Headline principal */}
          <div className="relative z-10">
            <p className="fade-up fade-up-1 font-sans-app text-[10px] font-bold tracking-[0.4em] uppercase text-[#6B7A3C] mb-5">
              Café Literario · Desde 2008
            </p>

            <h1 className="fade-up fade-up-2 font-playfair font-black leading-[0.88] tracking-tight text-[#F5F5F0] mb-2"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
              Dieciséis años
            </h1>
            <h1 className="fade-up fade-up-2 font-sans-app font-black leading-[0.88] tracking-tighter text-[#F5F5F0] uppercase mb-8"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>
              siendo
              <span className="text-[#C1121F]"> tu lugar.</span>
            </h1>

            <p className="fade-up fade-up-3 font-playfair italic text-[#8A9A52] text-xl max-w-lg leading-relaxed mb-12">
              Un espacio donde cada taza cuenta una historia y cada página abre un mundo.
            </p>

            {/* CTAs */}
            <div className="fade-up fade-up-4 flex flex-wrap items-center gap-5">
              <Link href="/register"
                className="btn-fill group font-sans-app text-[11px] font-black tracking-[0.3em] uppercase text-[#343E1C] bg-[#F5F5F0] border-2 border-[#F5F5F0] px-8 py-4 flex items-center gap-3 shadow-[5px_5px_0px_0px_#C1121F]">
                <span>Crear mi perfil</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/login"
                className="font-sans-app text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5F5F0]/50 hover:text-[#F5F5F0] transition-colors border-b border-transparent hover:border-[#F5F5F0]/30 pb-0.5">
                Ya tengo cuenta
              </Link>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-[#F5F5F0] animate-pulse" />
          <span className="font-sans-app text-[9px] tracking-[0.3em] uppercase text-[#F5F5F0] rotate-90 origin-center mt-4">scroll</span>
        </div>

      </section>

      {/* ── TICKER MARQUEE ── */}
      <div className="bg-[#C1121F] border-y-2 border-[#960E17] py-4 overflow-hidden">
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="font-sans-app font-black text-[11px] tracking-[0.3em] uppercase text-[#F5F5F0] px-8 flex items-center gap-8">
              {item}
              <span className="text-[#960E17] text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HISTORIA EN NÚMEROS ── */}
      <section className="px-8 py-24 border-b border-[#4A5728]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Números */}
          <div className="grid grid-cols-2 gap-px bg-[#4A5728]">
            {[
              { num: '2008', label: 'año de apertura' },
              { num: '16', label: 'años en el mercado' },
              { num: '∞', label: 'conversaciones' },
              { num: '1', label: 'lugar único' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-[#343E1C] px-8 py-10 flex flex-col justify-between">
                <span className="font-playfair font-black text-[#F5F5F0] leading-none"
                  style={{ fontSize: num === '∞' ? '4rem' : '3.5rem' }}>
                  {num}
                </span>
                <span className="font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7A3C] mt-3">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Texto */}
          <div>
            <p className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#6B7A3C] mb-6">
              Nuestra historia
            </p>
            <h2 className="font-playfair font-bold text-4xl text-[#F5F5F0] leading-snug mb-6">
              No somos solo un café.<br />
              <span className="italic text-[#C1121F]">Somos un capítulo.</span>
            </h2>
            <p className="font-playfair text-[#8A9A52] text-lg leading-loose mb-6">
              Desde 2008 hemos sido testigos de primeros encuentros, tesis terminadas a medianoche,
              lecturas en voz alta y amistades que empezaron sobre una taza de espresso.
            </p>
            <p className="font-sans-app text-[#6B7A3C] text-sm leading-relaxed">
              Esta plataforma es nuestra manera de recordarte — y de que tú también
              dejes tu huella en nuestra historia.
            </p>
          </div>

        </div>
      </section>

      {/* ── QUÉ OFRECE LA PLATAFORMA ── */}
      <section className="px-8 py-24 border-b border-[#4A5728]">
        <div className="max-w-6xl mx-auto">
          <p className="font-sans-app text-[10px] font-bold tracking-[0.35em] uppercase text-[#6B7A3C] mb-4">
            Tu espacio digital
          </p>
          <h2 className="font-playfair font-black text-5xl text-[#F5F5F0] leading-tight mb-16">
            Más que un registro.<br />
            <span className="italic">Una memoria.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#4A5728]">

            <div className="bg-[#343E1C] p-10 group hover:bg-[#C1121F] transition-colors duration-500">
              <span className="font-playfair font-black text-[5rem] leading-none text-[#4A5728] group-hover:text-[#960E17] transition-colors block mb-6 select-none">01</span>
              <h3 className="font-playfair font-bold text-2xl text-[#F5F5F0] mb-3">Tu perfil</h3>
              <p className="font-sans-app text-sm text-[#8A9A52] group-hover:text-[#F5F5F0]/70 transition-colors leading-relaxed">
                Nombre, bebida favorita, el rincón que siempre buscas. Cuéntanos cómo eres.
              </p>
            </div>

            <div className="bg-[#343E1C] p-10 group hover:bg-[#C1121F] transition-colors duration-500">
              <span className="font-playfair font-black text-[5rem] leading-none text-[#4A5728] group-hover:text-[#960E17] transition-colors block mb-6 select-none">02</span>
              <h3 className="font-playfair font-bold text-2xl text-[#F5F5F0] mb-3">Tus visitas</h3>
              <p className="font-sans-app text-sm text-[#8A9A52] group-hover:text-[#F5F5F0]/70 transition-colors leading-relaxed">
                Un historial de todos los momentos que viviste aquí. Tu bitácora personal.
              </p>
            </div>

            <div className="bg-[#343E1C] p-10 group hover:bg-[#C1121F] transition-colors duration-500">
              <span className="font-playfair font-black text-[5rem] leading-none text-[#4A5728] group-hover:text-[#960E17] transition-colors block mb-6 select-none">03</span>
              <h3 className="font-playfair font-bold text-2xl text-[#F5F5F0] mb-3">Tu voz</h3>
              <p className="font-sans-app text-sm text-[#8A9A52] group-hover:text-[#F5F5F0]/70 transition-colors leading-relaxed">
                Feedback, preferencias y sugerencias. Ayúdanos a escribir el próximo capítulo.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-8 py-32 relative noise overflow-hidden">
        <div className="absolute inset-0 z-0"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 72px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 72px)' }} />

        {/* "ÚNETE" ghost background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="font-playfair font-black text-[22vw] text-[#4A5728]/30 leading-none">
            ÚNETE.
          </span>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="font-sans-app text-[10px] font-bold tracking-[0.4em] uppercase text-[#6B7A3C] mb-8">
            Empieza aquí
          </p>
          <h2 className="font-playfair font-black text-[#F5F5F0] leading-none mb-4"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            Tu historia
          </h2>
          <h2 className="font-sans-app font-black text-[#C1121F] uppercase leading-none tracking-tighter mb-12"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            empieza.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/register"
              className="btn-fill group font-sans-app text-[11px] font-black tracking-[0.3em] uppercase text-[#343E1C] bg-[#F5F5F0] border-2 border-[#F5F5F0] px-10 py-5 flex items-center gap-3 shadow-[5px_5px_0px_0px_#C1121F]">
              <span>Crear mi perfil gratis</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-[#4A5728] px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-playfair italic text-[#F5F5F0] text-lg block mb-1">Café Literario</span>
            <span className="font-sans-app text-[10px] tracking-widest uppercase text-[#6B7A3C]">
              16 años · Desde 2008
            </span>
          </div>
          <div className="flex gap-8">
            <Link href="/login" className="font-sans-app text-[10px] tracking-widest uppercase text-[#6B7A3C] underline-slide hover:text-[#F5F5F0] transition-colors">
              Ingresar
            </Link>
            <Link href="/register" className="font-sans-app text-[10px] tracking-widest uppercase text-[#6B7A3C] underline-slide hover:text-[#F5F5F0] transition-colors">
              Registrarse
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
