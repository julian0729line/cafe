import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { PageHero } from '../components/PageHero'

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

  const datos = [
    { label: 'Nombre', value: perfil?.nombre ?? '—', big: true },
    { label: 'Correo', value: user.email, big: false },
    { label: 'Bebida favorita', value: perfil?.bebida_favorita ?? '—', big: true },
    { label: 'Espacio favorito', value: perfil?.espacio_favorito ?? '—', big: true },
  ]

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-clip">
      <div className="grain" aria-hidden="true" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#343E1C]/90 backdrop-blur-sm border-b border-[#4A5728] px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="press font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] hover:text-[#F5F5F0] transition-colors">
          ← Dashboard
        </Link>
        <span className="font-playfair italic text-[#F5F5F0] text-base">Mi perfil</span>
      </nav>

      {/* Hero */}
      <PageHero
        eyebrow="Perfil"
        ghost="PERFIL"
        lines={[{ text: nombre, tail: '.' }]}
        maxWidth="max-w-4xl"
      />

      {/* Contenido */}
      <div className="flex-1 px-8 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Datos */}
          <div className="tile rounded-[1.25rem] border border-[#4A5728] p-8">
            <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Tus datos</p>
            <div className="space-y-5">
              {datos.map(({ label, value, big }, i) => (
                <div key={label}>
                  {i > 0 && <div className="w-full h-px bg-[#4A5728] mb-5" />}
                  <p className="font-sans-app text-[#A6B86B] text-[10px] tracking-widest uppercase mb-1">{label}</p>
                  <p className={`text-[#F5F5F0] ${big ? 'font-playfair text-xl' : 'font-sans-app text-sm'}`}>{value}</p>
                </div>
              ))}
              {perfil?.notas && (
                <div>
                  <div className="w-full h-px bg-[#4A5728] mb-5" />
                  <p className="font-sans-app text-[#A6B86B] text-[10px] tracking-widest uppercase mb-1">Notas</p>
                  <p className="font-sans-app text-[#D9DCC4] text-sm leading-relaxed">{perfil.notas}</p>
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-4">
            <Link
              href="/perfil/editar"
              className="press group bg-[#C1121F] rounded-[1.25rem] p-8 border border-[#960E17] hover:-translate-y-1 transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <p className="font-sans-app text-[#F5F5F0]/50 text-[10px] font-bold tracking-widest uppercase mb-6">01</p>
              <h3 className="font-playfair font-bold text-2xl text-[#F5F5F0] mb-3">Editar perfil</h3>
              <p className="font-sans-app text-[#F5F5F0]/70 text-xs leading-relaxed mb-8">
                Actualiza tu nombre, bebida favorita y espacio preferido.
              </p>
              <span className="flex items-center gap-2 font-sans-app text-[#F5F5F0] text-[10px] font-bold tracking-widest uppercase">
                Ir a editar <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            <div className="tile rounded-[1.25rem] border border-[#4A5728] p-8">
              <p className="font-sans-app text-[#A6B86B] text-[10px] font-bold tracking-widest uppercase mb-6">02</p>
              <h3 className="font-playfair font-bold text-xl text-[#F5F5F0] mb-3">Mis visitas</h3>
              <p className="font-sans-app text-[#A6B86B] text-xs leading-relaxed mb-6">
                Tu historial completo en el café.
              </p>
              <span className="font-sans-app text-[#C9A227] text-[10px] font-bold tracking-widest uppercase">Próximamente</span>
            </div>

            <div className="border border-[#4A5728] bg-[#4A5728]/20 rounded-full px-6 py-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#A6B86B]" />
              <p className="font-sans-app text-[#A6B86B] text-[10px] tracking-widest uppercase">
                Miembro desde {new Date(user.created_at).toLocaleDateString('es-CO', { year: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
