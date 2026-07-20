# Datos reales del negocio — Fase 1

GOAL 15. Documenta la primera incorporación de datos reales confirmados de
Café Valparaíso a la capa `data/`, al contenido del home (`content/home.ts`)
y a las páginas públicas, dejando explícitamente pendiente todo dato
comercial no confirmado.

## 1. Objetivo del GOAL 15

Reemplazar los placeholders genéricos de GOAL 08 por los datos reales que
el negocio ya confirmó (marca, ciudad, concepto ampliado, sedes de Pance
y Juanambú, Librería La Maga, líneas generales de menú/agenda/espacios),
sin inventar ningún dato operativo (direcciones, teléfonos, horarios,
precios, fechas, aforos, links). El objetivo es que la web deje de
sentirse genérica pero siga siendo 100% veraz.

## 2. Datos confirmados incorporados

| Dato | Valor | Dónde se aplicó | Riesgo | Validación |
|---|---|---|---|---|
| Concepto ampliado | café literario, cultural, artístico y gastronómico | `data/site.ts` (`concept`) | Bajo | `tsc`, build |
| Tagline | "Café literario, cultura y gastronomía en Cali" | `data/site.ts` (`tagline`) → hero home | Bajo | render en `/` |
| Descripción de marca | menciona cultura, gastronomía, literatura, conversación, sedes y La Maga en Cali | `data/site.ts` (`description`) → about home + footer + SEO | Bajo | render + meta |
| Sedes | Pance y Juanambú (Cali) | `data/contact.ts` (`locations`), `data/spaces.ts` (`sedes`), `content/home.ts`, `/espacios`, `/reservas`, `/contacto` | Bajo | render en 4 rutas |
| Librería La Maga | nombre confirmado como línea del proyecto | `data/library.ts` (`name`), hero highlights home | Bajo | render en `/` y `/libreria` |
| Líneas de menú | café, cocina, coctelería, postres (con descripción general, sin precios) | `data/menu.ts` (`menuPreviewItems`) → `/menu`, home | Bajo | render en `/menu` |
| Categorías de agenda | clubes de lectura, música en vivo, conversaciones, arte y cultura | `data/events.ts` (`eventCategories`) → `/agenda` | Bajo | render en `/agenda` |
| Tipos de espacio | encuentros privados, celebraciones, reuniones, actividades culturales | `data/spaces.ts` (`spacesPreview`) → `/espacios`, `/reservas`, home | Bajo | render en 3 rutas |
| `brandKeywords` | + literatura, cultura, reservas, Pance, Juanambú | `data/site.ts` → metadata `keywords` | Bajo | build |

## 3. Datos pendientes

| Dato pendiente | Estado | Archivo donde queda marcado | Impacto en la web | Qué se necesita confirmar |
|---|---|---|---|---|
| Direcciones exactas (Pance/Juanambú) | `address: null`, `notes: "Dirección pendiente de confirmar."` | `data/contact.ts` | `/contacto` muestra "Dirección pendiente de confirmar." | Dirección postal de cada sede |
| Teléfono | `phone: null` | `data/contact.ts` | Canal no mostrado | Número fijo/celular oficial |
| WhatsApp | `whatsapp: null` | `data/contact.ts` | Canal no mostrado | Número + link `wa.me` |
| Correo | `email: null` | `data/contact.ts` | Canal no mostrado | Correo(s) oficial(es) |
| Instagram | `instagram: null` | `data/contact.ts` | Canal no mostrado | Handle + URL |
| Google Maps | `maps: null`, `mapsUrl: null` | `data/contact.ts` | Sin mapa/enlace de ubicación | URL de Maps por sede |
| Horarios | (no existe campo, no se inventó) | `data/contact.ts` (statusNotes) | No se muestran horarios | Horarios por sede |
| Menú real | descripciones generales, sin platos ni precios | `data/menu.ts` | `/menu` muestra líneas, no carta | Carta por categoría |
| Precios | ausentes por diseño | `data/menu.ts`, `data/spaces.ts` | No se muestran precios | Lista de precios |
| Agenda real | `featuredEvents: []` | `data/events.ts` | `/agenda` muestra estado vacío | Eventos con fechas |
| Fechas de eventos | ausentes | `data/events.ts` | No se muestran fechas | Calendario cultural |
| Aforos | `status: 'pending'` | `data/spaces.ts` | No se muestran aforos | Capacidad por espacio/sede |
| Tarifas de salones | ausentes | `data/spaces.ts` | No se muestran tarifas | Condiciones/tarifas |
| Políticas de reserva | texto "por contacto" | `/reservas` | Reserva vía `/contacto` | Política oficial |
| Inventario Librería La Maga | ausente | `data/library.ts` | Solo categorías, sin catálogo | Curaduría/catálogo inicial |
| Dominio real | `siteUrl: null` | `data/site.ts` | Canonical/OG usan `NEXT_PUBLIC_SITE_URL` o localhost | Dominio de producción |
| Razón social / fundación | `legalName: null`, `foundedLabel: null` | `data/site.ts` | No se muestran | Datos legales + año |

## 4. Archivos modificados

| Archivo | Cambio | Motivo | Riesgo | Validación |
|---|---|---|---|---|
| `data/site.ts` | Concepto ampliado, tagline/description/keywords actualizados, `statusNotes` | Reflejar marca/concepto/sedes confirmados | Bajo | `tsc`, build |
| `data/contact.ts` | Tipo `ContactLocation` ampliado (`city`, `address`, `mapsUrl`, `status`, `notes`); sedes Pance/Juanambú con dirección `null` | Incorporar sedes confirmadas sin dirección inventada | Bajo (rompía `/contacto`, ya corregido) | `tsc`, render |
| `data/events.ts` | Categoría "Clubes de lectura"; `emptyStateTitle`/`emptyStateMessage`; `statusNotes` | Categorías reales + textos de estado sobrios | Bajo | render `/agenda` |
| `data/menu.ts` | Descripciones generales por línea (sin precios/platos) | Menú menos genérico, veraz | Bajo | render `/menu` |
| `data/spaces.ts` | 4º tipo (Reuniones), descripciones, `sedes: ['Pance','Juanambú']` | Tipos de uso + sedes confirmadas | Bajo | render `/espacios`,`/reservas` |
| `data/library.ts` | `name: 'Librería La Maga'`, `statusNotes` ampliado | Confirmar La Maga como línea | Bajo | build |
| `content/home.ts` | Highlights (Sedes: Pance y Juanambú; Librería: La Maga); descripción de espacios menciona sedes | Alinear home con datos reales | Bajo | render `/` |
| `app/contacto/page.tsx` | Render de sedes usa `city` + `address ?? notes` (por cambio de tipo) | Adaptar a nuevo `ContactLocation` | Bajo | `tsc`, render |
| `app/espacios/page.tsx` | Eyebrow "Espacios · Pance y Juanambú"; descripción e outline mencionan sedes | Menos genérico, veraz | Bajo | render |
| `app/reservas/page.tsx` | Eyebrow y descripción mencionan Pance y Juanambú | Menos genérico, veraz | Bajo | render |

Nota: `app/page.tsx`, `app/agenda/page.tsx`, `app/menu/page.tsx` y
`app/libreria/page.tsx` estaban entre los archivos permitidos pero **no
requirieron edición directa**: sus mejoras de contenido fluyen a través
de `content/home.ts` y de los archivos de `data/` que ya importan.

## 5. Veracidad comercial

Confirmado por grep sobre los 10 archivos modificados — no se inventaron:
direcciones, teléfonos, WhatsApp, correos, Instagram, Maps, horarios,
precios, fechas, aforos, tarifas, inventario, testimonios, año de
fundación ni links externos. Verificaciones adicionales: cero
coincidencias de patrones de teléfono colombiano/`+57`, precios
(`$`/`COP`/`.000`/`mil`), correos, links de `wa.me`/`instagram.com`/
`maps.google`, ni de "2008"/"16 años"/"desde 20…". Las sedes Pance y
Juanambú aparecen siempre con `address: null` y texto visible "Dirección
pendiente de confirmar.".

## 6. Qué NO se hizo en este GOAL

- No se tocó Supabase.
- No se tocó middleware.
- No se tocó auth.
- No se tocó dashboard/perfil/admin.
- No se instalaron paquetes.
- No se crearon rutas nuevas.
- No se agregaron rutas al middleware.
- No se agregaron links a `/login` ni `/register`.
- No se completaron datos no confirmados (quedan `null`/`pending`/texto).
- No se inventaron datos comerciales.
- No se tocó `lib/seo.ts` (los cambios en `siteConfig` no lo exigieron).

## 7. Impacto visible en la web

Para el usuario cambia lo siguiente: el home ahora destaca las **sedes
Pance y Juanambú** y la **Librería La Maga** en el bloque de highlights;
la descripción de marca (home, footer, SEO) menciona explícitamente Cali,
las dos sedes y La Maga. `/espacios` y `/reservas` dejan claro que hay dos
sedes (Pance y Juanambú) y que los detalles operativos se confirman por
contacto. `/contacto` lista ambas sedes con "Dirección pendiente de
confirmar." en lugar de un estado vacío genérico. `/menu` muestra una
breve descripción por línea gastronómica (sin precios). El resto de datos
operativos sigue mostrándose como pendiente, de forma sobria y honesta.

## 8. Checklist de datos que debe entregar el negocio (Fase 2)

1. Teléfono/WhatsApp oficial.
2. Instagram oficial.
3. Correos oficiales.
4. Direcciones exactas de Pance y Juanambú.
5. Links de Google Maps.
6. Horarios actuales (por sede).
7. Menú real por categorías.
8. Precios.
9. Agenda cultural real.
10. Eventos con fechas.
11. Políticas de reserva.
12. Salones/espacios con capacidades reales.
13. Tarifas o condiciones de uso.
14. Catálogo o curaduría inicial de Librería La Maga.
15. Dominio definitivo de producción.

## 9. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El equipo confunda las descripciones generales de menú/espacios con contenido definitivo | Media | Medio | `statusNotes` en cada `data/*.ts` aclara qué es general y qué falta; §3 y §8 listan lo pendiente |
| Se publique en producción sin `NEXT_PUBLIC_SITE_URL` y canonical/sitemap apunten a localhost | Media | Alto | Ya documentado desde GOAL 12; `siteUrl: null` fuerza el uso de la variable de entorno |
| Cambio de tipo `ContactLocation` (`addressLabel`→`address`+`notes`) rompa algún consumidor no detectado | Baja | Medio | Único consumidor era `/contacto`, ya actualizado; `tsc` pasa sin errores |
| Sedes mencionadas generen expectativa de direcciones/horarios ya publicados | Media | Bajo | Texto visible "pendiente de confirmar" en cada punto donde falta el dato |

## 10. Checklist para GOAL 16

Tres opciones evaluadas:

- **A — Datos reales Fase 2**: completar contacto, sedes, horarios, menú,
  agenda y reservas cuando el negocio entregue los datos de §8.
- **B — Pulido visual editorial**: ritmo de secciones, assets reales,
  fotografías, microinteracciones.
- **C — Navegación/comunidad**: acceso discreto a `/login` y `/register`.

**Recomendación**: depende de la disponibilidad de datos. Si el negocio
**ya tiene** algo de la lista de §8 (aunque sea teléfono/WhatsApp/
Instagram y horarios), conviene la **Opción A (Fase 2)**, porque
desbloquea el valor comercial real de la web (que un cliente pueda
contactar y ubicar el café). Si los datos **aún no están listos**, la
**Opción B (pulido visual editorial)** es la más productiva mientras
tanto: el chasis técnico y la veracidad ya están sólidos, y falta
principalmente refinar el ritmo visual y preparar el terreno para
fotografías reales. La Opción C sigue sin bloquear nada y puede esperar.

## 11. Recomendación final

El proyecto está listo para avanzar a GOAL 16 bajo estas condiciones:

- Las validaciones de este GOAL (`lint`, `build`, `tsc`) deben pasar sin
  errores nuevos antes de autorizar el commit (ya verificado).
- La elección entre Opción A y B debe hacerse según lo que el negocio
  pueda entregar de la checklist de §8; no tiene sentido abrir Fase 2 sin
  datos nuevos confirmados.
- Cualquier dato que llegue en Fase 2 debe entrar por `data/`/`content/`
  con el mismo criterio de veracidad de este GOAL (nada aproximado).
