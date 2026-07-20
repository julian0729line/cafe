# Desplegar el Café Literario (gratis) y verlo desde cualquier lugar

El objetivo: conectar el repo a un hosting **una sola vez**. Desde ahí, cada
cambio que se suba a GitHub se publica solo — sin terminal, funciona desde el
celular.

> **Importante:** esta web ejecuta Next.js del lado del servidor (middleware +
> Supabase), así que necesita un hosting que **corra Node**, no solo archivos
> estáticos. Y usa **Next.js 16**, muy reciente.

## Antes de empezar

1. **Fusiona el Pull Request #1** a `main` (desde github.com o la app de GitHub:
   botón *Merge*), para que se publique la versión con todo el diseño.
2. Ten a mano tus 2 llaves de **Supabase** (supabase.com → tu proyecto →
   **Settings → API**):
   - `NEXT_PUBLIC_SUPABASE_URL` → campo **Project URL**
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → campo **anon public**

   > La página de inicio funciona sin estas variables; login / registro /
   > dashboard / perfil sí las necesitan.
3. Define también `NEXT_PUBLIC_SITE_URL` con la URL real donde quedará
   publicado el sitio (por ejemplo `https://cafe-literario.onrender.com`, o
   tu dominio propio si ya lo conectaste — ver "Dominio propio" más abajo).

   > Sin esta variable, el canonical, Open Graph y `sitemap.xml` apuntan a
   > `localhost` de forma silenciosa (sin error de build). Si más adelante
   > conectas un dominio propio, actualiza esta variable para que apunte ahí.

---

## Opción recomendada (gratis, apta para uso comercial): Render

Render corre el servidor de Next tal cual (`next start`), así que soporta
Next.js 16 sin adaptadores. El repo ya trae `render.yaml` preconfigurado.

1. Entra a **render.com** e inicia sesión con **GitHub**.
2. **New → Blueprint**.
3. Conecta y elige el repositorio **`cafe`**. Render lee `render.yaml` solo.
4. Te pedirá las 3 variables (las 2 de Supabase + `NEXT_PUBLIC_SITE_URL`) →
   pégalas. Si todavía no sabes la URL final, usa provisionalmente
   `https://cafe-literario.onrender.com` y actualízala si luego conectas un
   dominio propio.
5. **Apply / Create**. En unos minutos tendrás una URL tipo
   **`cafe-literario.onrender.com`**.

> Nota del plan gratis de Render: si el sitio pasa un rato sin visitas, se
> "duerme" y la primera carga tarda ~30-50 s; luego va rápido. Perfecto para
> mostrar y probar. Se puede quitar subiendo de plan cuando quieras.

---

## Alternativa gratis: Netlify

Más rápida (sin dormir), detecta Next.js sola. El repo trae `netlify.toml`.
El soporte de Next 16 en Netlify es reciente; si el build fallara, usa Render.

1. Entra a **netlify.com** → **Log in with GitHub**.
2. **Add new site → Import an existing project** → elige el repo `cafe`.
3. No cambies el comando de build (lo toma de `netlify.toml`).
4. En **Environment variables**, agrega las 3 (las 2 de Supabase +
   `NEXT_PUBLIC_SITE_URL`; usa provisionalmente la URL `.netlify.app` si
   todavía no tienes dominio propio).
5. **Deploy site** → obtienes una URL `xxx.netlify.app`.

---

## Sobre Vercel

Vercel tiene plan gratis (**Hobby**), pero su licencia gratuita es para
proyectos **personales/no comerciales**. Para un negocio (un café) pedirían el
plan Pro de pago. Por eso, para uso comercial, arriba están Render y Netlify.
Si algún día quieres el rendimiento de Vercel, el repo también despliega ahí
sin cambios (Add New → Project → importar `cafe` → variables → Deploy).

---

## Después: desplegar sin terminal (desde el celular)

Con cualquiera de las opciones, una vez conectado:

- **Cada cambio a `main`** → se actualiza la web de producción sola. Basta
  fusionar un Pull Request desde la app de **GitHub** en el celular.
- **Cada Pull Request** → genera una **URL de vista previa** para probar antes
  de publicar.

Recomendado: instala la app del hosting elegido y la de **GitHub** en el celular
para recibir aviso cuando cada despliegue esté listo.

---

## Dominio propio (opcional)

En el panel del hosting → **Domains / Custom domain** puedes conectar un dominio
(por ejemplo el que compres en Hostinger): agregas el dominio y te indican qué
registros DNS poner. Mientras tanto, la URL gratuita ya es pública y sirve para
mostrar y probar.

> Si conectas un dominio propio después de desplegar, actualiza la variable
> `NEXT_PUBLIC_SITE_URL` al nuevo dominio y vuelve a desplegar — si no, el
> canonical y Open Graph seguirán apuntando a la URL gratuita anterior.

## Si algo falla

- **El repo no aparece** → dale permiso de acceso al repositorio `cafe` en la
  configuración de la GitHub App del hosting.
- **El build falla** → casi siempre es una variable mal escrita; revisa que los
  nombres sean exactos. En Netlify, si es por Next 16, usa Render.
- **La home carga pero login/dashboard dan error** → faltan o están mal las 2
  variables de Supabase.
