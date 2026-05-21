'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

const BEBIDAS = ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Flat White', 'Cold Brew', 'Té', 'Otra']
const ESPACIOS = ['Ventana', 'Interior tranquilo', 'Terraza', 'Barra', 'Sofás', 'Sin preferencia']

export default function EditarPerfilPage() {
  const router = useRouter()
  const supabase = createClient()

  const [nombre, setNombre] = useState('')
  const [bebida, setBebida] = useState('')
  const [espacio, setEspacio] = useState('')
  const [notas, setNotas] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    async function cargar() {
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
      <div className="min-h-screen bg-[#343E1C] flex items-center justify-center">
        <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.4em] uppercase animate-pulse">
          Cargando...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#343E1C] flex flex-col">

      {/* Navbar */}
      <nav className="bg-[#4A5728] border-b-2 border-[#C1121F] px-8 py-4 flex items-center justify-between">
        <Link href="/perfil" className="text-[#F5F5F0] text-[10px] font-black tracking-[0.4em] uppercase hover:text-[#C1121F] transition-colors">
          ← Perfil
        </Link>
        <span className="text-[#8A9A52] text-[10px] tracking-widest uppercase">Editar</span>
      </nav>

      {/* Hero */}
      <div className="bg-[#343E1C] px-8 py-14 border-b border-[#4A5728]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#6B7A3C] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Editar perfil</p>
          <h1 className="text-5xl font-black tracking-tighter text-[#F5F5F0] leading-none">
            CUÉNTANOS<br />
            <span className="text-[#C1121F]">MÁS.</span>
          </h1>
          <div className="flex gap-3 mt-5">
            <div className="w-16 h-[3px] bg-[#C1121F]" />
            <div className="w-8 h-[3px] bg-[#6B7A3C]" />
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleGuardar} className="space-y-6">

            {/* Nombre */}
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A9A52] mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="w-full border-2 border-[#6B7A3C] bg-[#4A5728] px-4 py-3 text-[#F5F5F0] text-sm focus:outline-none focus:border-[#C1121F] rounded-none placeholder:text-[#6B7A3C]"
              />
            </div>

            {/* Bebida favorita */}
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A9A52] mb-3">
                Bebida favorita
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BEBIDAS.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBebida(b)}
                    className={`py-3 px-2 text-[10px] font-bold tracking-widest uppercase border-2 transition-colors ${
                      bebida === b
                        ? 'bg-[#C1121F] border-[#C1121F] text-[#F5F5F0]'
                        : 'bg-transparent border-[#6B7A3C] text-[#8A9A52] hover:border-[#F5F5F0] hover:text-[#F5F5F0]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Espacio favorito */}
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A9A52] mb-3">
                Espacio favorito
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ESPACIOS.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEspacio(e)}
                    className={`py-3 px-2 text-[10px] font-bold tracking-widest uppercase border-2 transition-colors ${
                      espacio === e
                        ? 'bg-[#C1121F] border-[#C1121F] text-[#F5F5F0]'
                        : 'bg-transparent border-[#6B7A3C] text-[#8A9A52] hover:border-[#F5F5F0] hover:text-[#F5F5F0]'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A9A52] mb-2">
                Algo más que quieras que sepamos
              </label>
              <textarea
                value={notas}
                onChange={e => setNotas(e.target.value)}
                placeholder="Alergias, preferencias especiales, etc."
                rows={3}
                className="w-full border-2 border-[#6B7A3C] bg-[#4A5728] px-4 py-3 text-[#F5F5F0] text-sm focus:outline-none focus:border-[#C1121F] rounded-none placeholder:text-[#6B7A3C] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving || guardado}
              className="w-full bg-[#C1121F] hover:bg-[#960E17] text-[#F5F5F0] font-black py-4 text-[11px] tracking-[0.3em] uppercase transition-colors disabled:opacity-60 shadow-[4px_4px_0px_0px_#4A5728]"
            >
              {guardado ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar cambios →'}
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}
