'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { PageHero } from '../../components/PageHero'

const BEBIDAS = ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Flat White', 'Cold Brew', 'Té', 'Otra']
const ESPACIOS = ['Ventana', 'Interior tranquilo', 'Terraza', 'Barra', 'Sofás', 'Sin preferencia']

export default function EditarPerfilPage() {
  const router = useRouter()

  const [nombre, setNombre] = useState('')
  const [bebida, setBebida] = useState('')
  const [espacio, setEspacio] = useState('')
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    async function cargar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data } = await supabase.from('perfiles').select('*').eq('id', user.id).single()
      if (data) {
        setNombre(data.nombre ?? '')
        setBebida(data.bebida_favorita ?? '')
        setEspacio(data.espacio_favorito ?? '')
        setNotas(data.notas ?? '')
      }
      setLoading(false)
    }
    cargar()
  }, [])

  async function handleGuardar(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('perfiles').upsert({
      id: user.id,
      nombre,
      bebida_favorita: bebida,
      espacio_favorito: espacio,
      notas,
      updated_at: new Date().toISOString(),
    })

    setSaving(false)
    setGuardado(true)
    setTimeout(() => { router.push('/perfil') }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-clip">
        <div className="grain" aria-hidden="true" />
        <nav className="sticky top-0 z-40 bg-[#343E1C]/90 backdrop-blur-sm border-b border-[#4A5728] px-8 py-4 flex items-center justify-between">
          <span className="font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B]">← Perfil</span>
          <span className="font-playfair italic text-[#F5F5F0] text-base">Editar</span>
        </nav>
        <div className="px-8 py-14 border-b border-[#4A5728]">
          <div className="max-w-2xl mx-auto animate-pulse">
            <div className="h-3 w-28 bg-[#4A5728] rounded mb-5" />
            <div className="h-12 w-72 bg-[#4A5728]/70 rounded" />
          </div>
        </div>
        <div className="flex-1 px-8 py-12">
          <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
            <div>
              <div className="h-3 w-20 bg-[#4A5728] rounded mb-2" />
              <div className="h-12 w-full bg-[#4A5728]/40 rounded-lg" />
            </div>
            <div>
              <div className="h-3 w-28 bg-[#4A5728] rounded mb-3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-11 bg-[#4A5728]/40 rounded-full" />)}
              </div>
            </div>
            <div>
              <div className="h-3 w-28 bg-[#4A5728] rounded mb-3" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-11 bg-[#4A5728]/40 rounded-full" />)}
              </div>
            </div>
            <div className="h-14 w-full bg-[#4A5728]/60 rounded" />
          </div>
        </div>
      </div>
    )
  }

  const chip = (active: boolean) =>
    `press py-3 px-2 text-[10px] font-bold tracking-widest uppercase border rounded-full transition-colors ${
      active
        ? 'bg-[#C1121F] border-[#C1121F] text-[#F5F5F0]'
        : 'bg-transparent border-[#4A5728] text-[#A6B86B] hover:border-[#F5F5F0] hover:text-[#F5F5F0]'
    }`

  const field =
    'w-full border border-[#4A5728] bg-[#4A5728]/30 px-4 py-3 text-[#F5F5F0] text-sm rounded-lg focus:outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 transition-shadow placeholder:text-[#F5F5F0]/35'

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col overflow-x-clip">
      <div className="grain" aria-hidden="true" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#343E1C]/90 backdrop-blur-sm border-b border-[#4A5728] px-8 py-4 flex items-center justify-between">
        <Link href="/perfil" className="press font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] hover:text-[#F5F5F0] transition-colors">
          ← Perfil
        </Link>
        <span className="font-playfair italic text-[#F5F5F0] text-base">Editar</span>
      </nav>

      {/* Hero */}
      <PageHero
        eyebrow="Editar perfil"
        ghost="EDITAR"
        lines={[{ text: 'Cuéntanos' }, { text: 'más.', accent: true, italic: true }]}
        maxWidth="max-w-2xl"
      />

      {/* Formulario */}
      <div className="flex-1 px-8 py-12">
        <div className="max-w-2xl mx-auto fade-up fade-up-3">
          <form onSubmit={handleGuardar} className="space-y-8">

            <div>
              <label className="block font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] mb-2">
                Nombre
              </label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" className={field} />
            </div>

            <div>
              <label className="block font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] mb-3">
                Bebida favorita
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BEBIDAS.map(b => (
                  <button key={b} type="button" onClick={() => setBebida(b)} className={chip(bebida === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] mb-3">
                Espacio favorito
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ESPACIOS.map(e => (
                  <button key={e} type="button" onClick={() => setEspacio(e)} className={chip(espacio === e)}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-sans-app text-[10px] font-bold tracking-[0.2em] uppercase text-[#A6B86B] mb-2">
                Algo más que quieras que sepamos
              </label>
              <textarea value={notas} onChange={e => setNotas(e.target.value)} placeholder="Alergias, preferencias especiales, etc." rows={3} className={`${field} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={saving || guardado}
              className="press btn-fill btn-fill-red w-full bg-[#C1121F] text-[#F5F5F0] font-black py-4 text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-60 shadow-[4px_4px_0px_0px_#4A5728] flex items-center justify-center gap-3"
            >
              <span>{guardado ? 'Guardado ✓' : saving ? 'Guardando...' : 'Guardar cambios'}</span>
              {!saving && !guardado && <span className="transition-transform group-hover:translate-x-1">→</span>}
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}
