# Desplegar el Café Literario (y verlo desde cualquier lugar)

El objetivo: conectar el repo a **Vercel una sola vez**. Desde ahí, cada cambio
que se suba a GitHub se publica solo — sin terminal, funciona desde el celular.

---

## Primera vez (5 minutos, se hace una sola vez)

1. Entra a **vercel.com** e inicia sesión con tu cuenta de **GitHub**.
2. **Add New → Project** y elige el repositorio `julian0729line/cafe`.
3. Vercel detecta Next.js solo — no cambies nada de la configuración de build.
4. Abre **Environment Variables** y agrega estas dos (de supabase.com →
   Settings → API):

   | Nombre | Valor |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | la URL de tu proyecto Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | tu anon key |

   > La página de inicio funciona incluso sin estas variables; solo login,
   > registro, dashboard y perfil las necesitan. Aun así, conviene ponerlas.

5. **Deploy**. En ~1 minuto tendrás una URL tipo `cafe-xxx.vercel.app` que
   puedes abrir desde el celular, compartir con otros cafés, etc.

---

## Después: desplegar sin terminal (desde el celular)

Una vez conectado, Vercel escucha el repositorio automáticamente:

- **Cada cambio a la rama `main`** → se actualiza la web de producción (tu URL
  principal). Basta con fusionar un Pull Request desde la app de **GitHub** en
  el celular, o desde github.com en el navegador.
- **Cada Pull Request** → Vercel crea una **URL de vista previa** propia y la
  comenta en el PR. Así pruebas un cambio antes de publicarlo, todo desde el
  teléfono.

En la práctica: cuando trabajemos un cambio, se sube al repo y tú solo abres el
enlace que aparece en Vercel o en el PR. No necesitas la terminal para nada.

Recomendado: instala la app **Vercel** y la de **GitHub** en el celular para
recibir notificación cuando un deploy esté listo.

---

## Dominio propio (opcional, cuando quieras)

En Vercel → Project → **Settings → Domains** puedes conectar un dominio (por
ejemplo el que compres en Hostinger): agregas el dominio y Vercel te indica qué
registros DNS poner. Mientras tanto, la URL `.vercel.app` ya es pública y sirve
para mostrar y probar.
