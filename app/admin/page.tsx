import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: miPerfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  if (miPerfil?.rol !== 'admin') redirect('/dashboard')

  const { data: perfiles } = await supabase
    .from('perfiles')
    .select('*')
    .order('created_at', { ascending: false })

  const total = perfiles?.length ?? 0

  const contBebidas: Record<string, number> = {}
  perfiles?.forEach(p => {
    if (p.bebida_favorita) contBebidas[p.bebida_favorita] = (contBebidas[p.bebida_favorita] ?? 0) + 1
  })
  const topBebida = Object.entries(contBebidas).sort((a, b) => b[1] - a[1])[0]

  const contEspacios: Record<string, number> = {}
  perfiles?.forEach(p => {
    if (p.espacio_favorito) contEspacios[p.espacio_favorito] = (contEspacios[p.espacio_favorito] ?? 0) + 1
  })
  const topEspacio = Object.entries(contEspacios).sort((a, b) => b[1] - a[1])[0]

  const completos = perfiles?.filter(p => p.bebida_favorita || p.espacio_favorito).length ?? 0

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-clip">
      <div className="grain" aria-hidden="true" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#343E1C]/90 backdrop-blur-sm border-b border-[#4A5728] px-8 py-4 flex items-center justify-between">
        <Link href="/" className="press font-playfair italic text-[#F5F5F0] text-base tracking-wide">
          Café Literario
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/dashboard" className="press font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase hover:text-[#F5F5F0] transition-colors">
            Dashboard
          </Link>
          <span className="font-sans-app text-[#FF7F70] text-[10px] font-bold tracking-widest uppercase border border-[#C1121F] rounded-full px-3 py-1">
            Admin
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative px-8 py-16 border-b border-[#4A5728] overflow-hidden vignette noise">
        <div className="aurora">
          <div className="aurora-blob" style={{ top: '-25%', left: '5%', width: '38vw', height: '38vw', background: 'radial-gradient(circle, rgba(180,132,58,0.4), transparent 65%)' }} />
          <div className="aurora-blob b2" style={{ bottom: '-30%', right: '8%', width: '32vw', height: '32vw', background: 'radial-gradient(circle, rgba(193,18,31,0.32), transparent 65%)' }} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="fade-up fade-up-1 font-sans-app text-[#C9A227] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Panel de administración</p>
          <h1 className="fade-up fade-up-2 font-playfair font-black text-[#F5F5F0] leading-[0.95]" style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
            Tu café<br /><span className="italic text-[#FF7F70]">en números.</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 px-8 py-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Métricas */}
          <div>
            <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">Métricas</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-[#C1121F] rounded-[1.25rem] border border-[#960E17] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <p className="font-sans-app text-[#F5F5F0]/50 text-[10px] font-bold tracking-widest uppercase mb-3">Total clientes</p>
                <p className="font-playfair font-black text-[#F5F5F0] text-5xl leading-none tabular-nums">{total}</p>
              </div>

              <div className="tile rounded-[1.25rem] border border-[#4A5728] p-6">
                <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-3">Bebida top</p>
                <p className="font-playfair font-bold text-[#F5F5F0] text-xl leading-tight">{topBebida ? topBebida[0] : '—'}</p>
                {topBebida && <p className="font-sans-app text-[#A6B86B] text-xs mt-1 tabular-nums">{topBebida[1]} {topBebida[1] === 1 ? 'persona' : 'personas'}</p>}
              </div>

              <div className="tile rounded-[1.25rem] border border-[#4A5728] p-6">
                <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-3">Espacio top</p>
                <p className="font-playfair font-bold text-[#F5F5F0] text-xl leading-tight">{topEspacio ? topEspacio[0] : '—'}</p>
                {topEspacio && <p className="font-sans-app text-[#A6B86B] text-xs mt-1 tabular-nums">{topEspacio[1]} {topEspacio[1] === 1 ? 'persona' : 'personas'}</p>}
              </div>

              <div className="tile rounded-[1.25rem] border border-[#4A5728] p-6">
                <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-3">Perfiles completos</p>
                <p className="font-playfair font-black text-[#F5F5F0] text-5xl leading-none tabular-nums">{completos}</p>
                <p className="font-sans-app text-[#A6B86B] text-xs mt-1 tabular-nums">de {total}</p>
              </div>

            </div>
          </div>

          {/* Distribución bebidas */}
          {Object.keys(contBebidas).length > 0 && (
            <div>
              <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">Bebidas favoritas</p>
              <div className="tile rounded-[1.25rem] border border-[#4A5728] p-8 space-y-4">
                {Object.entries(contBebidas).sort((a, b) => b[1] - a[1]).map(([bebida, count]) => (
                  <div key={bebida} className="flex items-center gap-4">
                    <span className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase w-28 shrink-0">{bebida}</span>
                    <div className="flex-1 bg-[#2A331A] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#C1121F] h-full rounded-full" style={{ width: `${(count / total) * 100}%` }} />
                    </div>
                    <span className="font-sans-app text-[#F5F5F0] text-xs font-bold w-6 text-right tabular-nums">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lista de clientes */}
          <div>
            <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
              Clientes registrados ({total})
            </p>
            <div className="rounded-[1.25rem] border border-[#4A5728] overflow-hidden">

              <div className="grid grid-cols-4 px-6 py-3 bg-[#4A5728]/50">
                {['Nombre', 'Bebida', 'Espacio', 'Miembro desde'].map(h => (
                  <span key={h} className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase">{h}</span>
                ))}
              </div>

              {perfiles && perfiles.length > 0 ? perfiles.map(p => (
                <div key={p.id} className="grid grid-cols-4 px-6 py-4 border-t border-[#4A5728] hover:bg-[#4A5728]/30 transition-colors">
                  <span className="font-sans-app text-[#F5F5F0] text-sm font-bold truncate">
                    {p.nombre ?? <span className="text-[#A6B86B]">Sin nombre</span>}
                  </span>
                  <span className="font-sans-app text-[#A6B86B] text-sm truncate">{p.bebida_favorita ?? '—'}</span>
                  <span className="font-sans-app text-[#A6B86B] text-sm truncate">{p.espacio_favorito ?? '—'}</span>
                  <span className="font-sans-app text-[#A6B86B] text-xs tabular-nums">
                    {new Date(p.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )) : (
                <div className="px-6 py-10 text-center border-t border-[#4A5728]">
                  <p className="font-sans-app text-[#A6B86B] text-xs tracking-widest uppercase">Sin clientes aún</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
