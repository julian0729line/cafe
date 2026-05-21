import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const nombre = user.user_metadata?.nombre ?? user.email?.split('@')[0]

  const { data: miPerfil } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single()

  const esAdmin = miPerfil?.rol === 'admin'

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col">

      {/* Navbar — oliva oscuro */}
      <nav className="bg-[#4A5728] border-b-2 border-[#C1121F] px-8 py-4 flex items-center justify-between">
        <span className="text-[#F5F5F0] text-[10px] font-black tracking-[0.4em] uppercase">
          ☕ Proyecto Café
        </span>
        <div className="flex items-center gap-6">
          <span className="text-[#8A9A52] text-[10px] tracking-widest uppercase">
            {user.email}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F5F5F0] border-2 border-[#F5F5F0]/20 px-4 py-2 hover:border-[#C1121F] hover:text-[#C1121F] transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </nav>

      {/* Hero de bienvenida */}
      <div className="bg-[#343E1C] px-8 py-16 border-b border-[#4A5728]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Bienvenido de vuelta
          </p>
          <h1 className="text-6xl font-black tracking-tighter text-[#F5F5F0] leading-none">
            HOLA,<br />
            <span className="text-[#C1121F]">{nombre?.toUpperCase()}.</span>
          </h1>
          <div className="flex gap-3 mt-6">
            <div className="w-16 h-[3px] bg-[#C1121F]" />
            <div className="w-8 h-[3px] bg-[#6B7A3C]" />
          </div>
        </div>
      </div>

      {/* Cards — 30% rojo */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-4xl mx-auto">

          <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
            Tu espacio
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Link href="/perfil" className="bg-[#C1121F] p-8 border-2 border-[#960E17] group hover:bg-[#960E17] transition-colors block">
              <p className="text-[#F5F5F0]/50 text-[10px] font-bold tracking-widest uppercase mb-4">01</p>
              <h3 className="text-[#F5F5F0] font-black text-xl tracking-tight leading-tight mb-2">
                MI PERFIL
              </h3>
              <p className="text-[#F5F5F0]/60 text-xs leading-relaxed">
                Preferencias, historial y tu espacio favorito en el café.
              </p>
              <div className="mt-6 text-[#F5F5F0] text-xs font-bold tracking-widest uppercase">
                Ver →
              </div>
            </Link>

            <div className="bg-[#4A5728] p-8 border-2 border-[#6B7A3C] group hover:border-[#C1121F] transition-colors cursor-pointer">
              <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-4">02</p>
              <h3 className="text-[#F5F5F0] font-black text-xl tracking-tight leading-tight mb-2">
                MIS VISITAS
              </h3>
              <p className="text-[#8A9A52] text-xs leading-relaxed">
                Tu historial de visitas y momentos en el café.
              </p>
              <div className="mt-6 text-[#6B7A3C] text-xs font-bold tracking-widest uppercase">
                Próximamente
              </div>
            </div>

            <div className="bg-[#4A5728] p-8 border-2 border-[#6B7A3C] group hover:border-[#C1121F] transition-colors cursor-pointer">
              <p className="text-[#8A9A52] text-[10px] font-bold tracking-widest uppercase mb-4">03</p>
              <h3 className="text-[#F5F5F0] font-black text-xl tracking-tight leading-tight mb-2">
                FEEDBACK
              </h3>
              <p className="text-[#8A9A52] text-xs leading-relaxed">
                Comparte tu experiencia y ayuda a mejorar el café.
              </p>
              <div className="mt-6 text-[#6B7A3C] text-xs font-bold tracking-widest uppercase">
                Próximamente
              </div>
            </div>

          </div>

          {/* Barra de estado + acceso admin */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 border-2 border-[#4A5728] bg-[#4A5728]/30 px-6 py-4 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#8A9A52]" />
              <p className="text-[#6B7A3C] text-[10px] tracking-widest uppercase">
                Cuenta activa · {user.email}
              </p>
            </div>
            {esAdmin && (
              <Link
                href="/admin"
                className="border-2 border-[#C1121F] px-6 py-4 text-[#C1121F] text-[10px] font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-[#F5F5F0] transition-colors whitespace-nowrap"
              >
                Panel Admin →
              </Link>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}
