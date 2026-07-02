import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { PageHero } from '../components/PageHero'
import { isSupabaseConfigured } from '@/utils/supabase/config'

export default async function DashboardPage() {
  if (!isSupabaseConfigured) redirect('/')
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
    <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-hidden">
      <div className="grain" aria-hidden="true" />

      {/* Navbar */}
      <nav className="bg-[#343E1C]/90 backdrop-blur-sm border-b border-[#4A5728] px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="press font-playfair italic text-[#F5F5F0] text-base tracking-wide">
          Café Literario
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden sm:block font-sans-app text-[#A6B86B] text-[10px] tracking-widest uppercase">
            {user.email}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="press font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#F5F5F0] border border-[#4A5728] rounded-full px-5 py-2 hover:border-[#C1121F] hover:text-[#FF7F70] transition-colors"
            >
              Salir
            </button>
          </form>
        </div>
      </nav>

      {/* Hero de bienvenida */}
      <PageHero
        eyebrow="Bienvenido de vuelta"
        ghost="SOCIO"
        lines={[{ text: 'Hola,' }, { text: `${nombre}.`, accent: true, italic: true }]}
      />

      {/* Cards */}
      <div className="flex-1 px-8 py-16">
        <div className="max-w-5xl mx-auto">

          <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            Tu espacio
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Link
              href="/perfil"
              className="press group bg-[#C1121F] rounded-[1.25rem] p-8 border border-[#960E17] hover:-translate-y-1 transition-transform duration-300 block shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <p className="font-sans-app text-[#F5F5F0]/60 text-[10px] font-bold tracking-widest uppercase mb-6">01</p>
              <h3 className="font-playfair font-bold text-[#F5F5F0] text-2xl leading-tight mb-3">
                Mi perfil
              </h3>
              <p className="font-sans-app text-[#F5F5F0]/70 text-xs leading-relaxed">
                Preferencias, historial y tu espacio favorito en el café.
              </p>
              <div className="mt-8 flex items-center gap-2 font-sans-app text-[#F5F5F0] text-[10px] font-bold tracking-widest uppercase">
                <span>Ver</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <div className="tile rounded-[1.25rem] p-8 border border-[#4A5728]">
              <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-6">02</p>
              <h3 className="font-playfair font-bold text-[#F5F5F0] text-2xl leading-tight mb-3">
                Mis visitas
              </h3>
              <p className="font-sans-app text-[#A6B86B] text-xs leading-relaxed">
                Tu historial de visitas y momentos en el café.
              </p>
              <div className="mt-8 font-sans-app text-[#C9A227] text-[10px] font-bold tracking-widest uppercase">
                Próximamente
              </div>
            </div>

            <div className="tile rounded-[1.25rem] p-8 border border-[#4A5728]">
              <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-6">03</p>
              <h3 className="font-playfair font-bold text-[#F5F5F0] text-2xl leading-tight mb-3">
                Feedback
              </h3>
              <p className="font-sans-app text-[#A6B86B] text-xs leading-relaxed">
                Comparte tu experiencia y ayuda a mejorar el café.
              </p>
              <div className="mt-8 font-sans-app text-[#C9A227] text-[10px] font-bold tracking-widest uppercase">
                Próximamente
              </div>
            </div>

          </div>

          {/* Estado + acceso admin */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 border border-[#4A5728] bg-[#4A5728]/20 rounded-full px-6 py-4 flex items-center gap-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6B86B] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A6B86B]" />
              </span>
              <p className="font-sans-app text-[#A6B86B] text-[10px] tracking-widest uppercase">
                Cuenta activa · {user.email}
              </p>
            </div>
            {esAdmin && (
              <Link
                href="/admin"
                className="press flex items-center gap-2 border-2 border-[#C1121F] rounded-full px-6 py-4 text-[#FF7F70] text-[10px] font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-[#F5F5F0] transition-colors whitespace-nowrap"
              >
                <span>Panel Admin</span>
                <span>→</span>
              </Link>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}
