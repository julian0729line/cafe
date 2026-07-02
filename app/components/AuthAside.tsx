import Link from 'next/link'

/** Panel lateral editorial cinematográfico para login / registro. */
export function AuthAside({
  eyebrow,
  titleTop,
  titleAccent,
  quote,
}: {
  eyebrow: string
  titleTop: string
  titleAccent: string
  quote: string
}) {
  return (
    <div className="hidden lg:flex w-[55%] bg-[#343E1C] flex-col justify-between p-14 relative overflow-hidden vignette noise">
      {/* Auroras cálidas */}
      <div className="aurora">
        <div
          className="aurora-blob"
          style={{ top: '-10%', left: '-8%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(180,132,58,0.5), transparent 65%)' }}
        />
        <div
          className="aurora-blob b2"
          style={{ bottom: '-15%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(193,18,31,0.4), transparent 65%)' }}
        />
        <div
          className="aurora-blob b3"
          style={{ top: '25%', right: '20%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(138,154,82,0.45), transparent 65%)' }}
        />
      </div>

      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 56px)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#343E1C] via-transparent to-[#343E1C]/40" />

      {/* "16" de patrimonio */}
      <div className="absolute bottom-0 right-0 font-playfair font-black text-[20rem] leading-none text-[#F5F5F0]/[0.05] select-none pointer-events-none z-0 translate-x-8 translate-y-8">
        16
      </div>

      <Link href="/" className="press font-playfair italic text-[#F5F5F0] text-lg relative z-10">
        Café Literario
      </Link>

      <div className="relative z-10">
        <p className="fade-up fade-up-1 font-sans-app text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A227] mb-6">
          {eyebrow}
        </p>
        <h1
          className="fade-up fade-up-2 font-playfair font-black leading-[0.9] text-[#F5F5F0] mb-3"
          style={{ fontSize: 'clamp(3rem, 6.2vw, 6.5rem)' }}
        >
          {titleTop}
          <br />
          <span className="italic text-[#FF7F70]">{titleAccent}</span>
        </h1>
        <div className="fade-up fade-up-3 flex gap-3 mt-6 mb-8">
          <div className="w-16 h-[3px] bg-[#C1121F]" />
          <div className="w-8 h-[3px] bg-[#A6B86B]" />
        </div>
        <p className="fade-up fade-up-3 font-playfair italic text-[#D9DCC4] text-lg leading-relaxed max-w-xs">
          {quote}
        </p>
      </div>

      <span className="font-sans-app text-[10px] font-bold tracking-[0.3em] uppercase text-[#A6B86B] relative z-10">
        16 años · Desde 2008
      </span>
    </div>
  )
}
