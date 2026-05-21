import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verificar que es admin
  const { data: miPerfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  if (miPerfil?.rol !== 'admin') redirect('/dashboard')

  // Todos los perfiles
  const { data: perfiles } = await supabase
    .from('perfiles')
    .select('*')
    .order('created_at', { ascending: false })

  const total = perfiles?.length ?? 0

  // Bebida más popular
  const contBebidas: Record<string, number> = {}
  perfiles?.forEach(p => {
    if (p.bebida_favorita) contBebidas[p.bebida_favorita] = (contBebidas[p.bebida_favorita] ?? 0) + 1
  })
  const topBebida = Object.entries(contBebidas).sort((a, b) => b[1] - a[1])[0]

  // Espacio más popular
  const contEspacios: Record<string, number> = {}
  perfiles?.forEach(p => {
    if (p.espacio_favorito) contEspacios[p.espacio_favorito] = (contEspacios[p.espacio_favorito] ?? 0) + 1
  })
  const topEspacio = Object.entries(contEspacios).sort((a, b) => b[1] - a[1])[0]

  // Perfiles completos (con al menos bebida o espacio)
  const completos = perfiles?.filter(p => p.bebida_favorita || p.espacio_favorito).length ?? 0

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col">

      {/* Navbar */}
      <nav className="bg-[#4A5728] border-b-2 border-[#C1121F] px-8 py-4 flex items-center justify-between">
        <span className="text-[#F5F5F0] text-[10px] font-black tracking-[0.4em] uppercase">☕ Proyecto Café</span>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[#8A9A52] text-[10px] tracking-widest uppercase hover:text-[#F5F5F0] transition-colors">
            Dashboard
          </Link>
          <span className="text-[#C1121F] text-[10px] font-bold tracking-widest uppercase border border-[#C1121F] px-3 py-1">
            Admin
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-14 border-b border-[#4A5728]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Panel de administración</p>
          <h1 className="text-6xl font-black tracking-tighter text-[#F5F5F0] leading-none">
            TU CAFÉ<br />
            <span className="text-[#C1121F]">EN NÚMEROS.</span>
          </h1>
          <div className="flex gap-3 mt-5">
            <div className="w-16 h-[3px] bg-[#C1121F]" />
            <div className="w-8 h-[3px] bg-[#6B7A3C]" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Métricas */}
          <div>
            <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Métricas</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-[#C1121F] border-2 border-[#960E17] p-6">
                <p className="text-[#F5F5F0]/40 text-[10px] font-bold tracking-widest uppercase mb-3">Total clientes</p>
                <p className="text-[#F5F5F0] font-black text-5xl leading-none">{total}</p>
              </div>

              <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-6">
                <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-3">Bebida top</p>
                <p className="text-[#F5F5F0] font-black text-xl leading-tight">
                  {topBebida ? topBebida[0] : '—'}
                </p>
                {topBebida && (
                  <p className="text-[#6B7A3C] text-xs mt-1">{topBebida[1]} personas</p>
                )}
              </div>

              <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-6">
                <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-3">Espacio top</p>
                <p className="text-[#F5F5F0] font-black text-xl leading-tight">
                  {topEspacio ? topEspacio[0] : '—'}
                </p>
                {topEspacio && (
                  <p className="text-[#6B7A3C] text-xs mt-1">{topEspacio[1]} personas</p>
                )}
              </div>

              <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-6">
                <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-3">Perfiles completos</p>
                <p className="text-[#F5F5F0] font-black text-5xl leading-none">{completos}</p>
                <p className="text-[#6B7A3C] text-xs mt-1">de {total}</p>
              </div>

            </div>
          </div>

          {/* Distribución bebidas */}
          {Object.keys(contBebidas).length > 0 && (
            <div>
              <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Bebidas favoritas</p>
              <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-6 space-y-3">
                {Object.entries(contBebidas).sort((a, b) => b[1] - a[1]).map(([bebida, count]) => (
                  <div key={bebida} className="flex items-center gap-4">
                    <span className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase w-28 shrink-0">{bebida}</span>
                    <div className="flex-1 bg-[#343E1C] h-[6px]">
                      <div
                        className="bg-[#C1121F] h-full transition-all"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                    <span className="text-[#F5F5F0] text-xs font-bold w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lista de clientes */}
          <div>
            <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              Clientes registrados ({total})
            </p>
            <div className="border-2 border-[#4A5728] divide-y-2 divide-[#4A5728]">

              {/* Header */}
              <div className="grid grid-cols-4 px-6 py-3 bg-[#4A5728]">
                {['Nombre', 'Bebida', 'Espacio', 'Miembro desde'].map(h => (
                  <span key={h} className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase">{h}</span>
                ))}
              </div>

              {/* Filas */}
              {perfiles && perfiles.length > 0 ? perfiles.map(p => (
                <div key={p.id} className="grid grid-cols-4 px-6 py-4 hover:bg-[#4A5728]/40 transition-colors">
                  <span className="text-[#F5F5F0] text-sm font-bold truncate">
                    {p.nombre ?? <span className="text-[#6B7A3C]">Sin nombre</span>}
                  </span>
                  <span className="text-[#8A9A52] text-sm truncate">{p.bebida_favorita ?? '—'}</span>
                  <span className="text-[#8A9A52] text-sm truncate">{p.espacio_favorito ?? '—'}</span>
                  <span className="text-[#6B7A3C] text-xs">
                    {new Date(p.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )) : (
                <div className="px-6 py-8 text-center">
                  <p className="text-[#6B7A3C] text-xs tracking-widest uppercase">Sin clientes aún</p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
