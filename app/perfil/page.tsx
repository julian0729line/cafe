import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const nombre = perfil?.nombre ?? user.user_metadata?.nombre ?? '—'

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col">

      {/* Navbar */}
      <nav className="bg-[#4A5728] border-b-2 border-[#C1121F] px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-[#F5F5F0] text-[10px] font-black tracking-[0.4em] uppercase hover:text-[#C1121F] transition-colors">
          ← ☕ Proyecto Café
        </Link>
        <span className="text-[#8A9A52] text-[10px] tracking-widest uppercase">Mi perfil</span>
      </nav>

      {/* Hero */}
      <div className="bg-[#343E1C] px-8 py-14 border-b border-[#4A5728]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Perfil</p>
          <h1 className="text-6xl font-black tracking-tighter text-[#F5F5F0] leading-none">
            {nombre.toUpperCase()}.
          </h1>
          <div className="flex gap-3 mt-5">
            <div className="w-16 h-[3px] bg-[#C1121F]" />
            <div className="w-8 h-[3px] bg-[#6B7A3C]" />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Datos */}
          <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-8">
            <p className="text-[#8A9A52] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Tus datos</p>

            <div className="space-y-5">
              <div>
                <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase mb-1">Nombre</p>
                <p className="text-[#F5F5F0] font-black text-lg">{perfil?.nombre ?? '—'}</p>
              </div>
              <div className="w-full h-px bg-[#6B7A3C]/30" />
              <div>
                <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase mb-1">Correo</p>
                <p className="text-[#F5F5F0] text-sm">{user.email}</p>
              </div>
              <div className="w-full h-px bg-[#6B7A3C]/30" />
              <div>
                <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase mb-1">Bebida favorita</p>
                <p className="text-[#F5F5F0] font-black text-lg">{perfil?.bebida_favorita ?? '—'}</p>
              </div>
              <div className="w-full h-px bg-[#6B7A3C]/30" />
              <div>
                <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase mb-1">Espacio favorito</p>
                <p className="text-[#F5F5F0] font-black text-lg">{perfil?.espacio_favorito ?? '—'}</p>
              </div>
              {perfil?.notas && (
                <>
                  <div className="w-full h-px bg-[#6B7A3C]/30" />
                  <div>
                    <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase mb-1">Notas</p>
                    <p className="text-[#8A9A52] text-sm leading-relaxed">{perfil.notas}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-4">
            <Link
              href="/perfil/editar"
              className="bg-[#C1121F] hover:bg-[#960E17] text-[#F5F5F0] p-8 border-2 border-[#960E17] transition-colors group"
            >
              <p className="text-[#F5F5F0]/40 text-[10px] font-bold tracking-widest uppercase mb-4">01</p>
              <h3 className="font-black text-2xl tracking-tight mb-2">EDITAR PERFIL</h3>
              <p className="text-[#F5F5F0]/60 text-xs leading-relaxed mb-6">
                Actualiza tu nombre, bebida favorita y espacio preferido.
              </p>
              <span className="text-[10px] font-bold tracking-widest uppercase">Ir a editar →</span>
            </Link>

            <div className="bg-[#4A5728] border-2 border-[#6B7A3C] p-8">
              <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-4">02</p>
              <h3 className="text-[#F5F5F0] font-black text-xl tracking-tight mb-2">MIS VISITAS</h3>
              <p className="text-[#8A9A52] text-xs leading-relaxed mb-4">
                Tu historial completo en el café.
              </p>
              <span className="text-[#6B7A3C] text-[10px] font-bold tracking-widest uppercase">Próximamente</span>
            </div>

            <div className="border-2 border-[#4A5728] px-6 py-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8A9A52]" />
              <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase">
                Miembro desde {new Date(user.created_at).toLocaleDateString('es-CO', { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
