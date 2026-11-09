# Maxilo Aesthetic Implants — sitio web

Cliente: **Dra. Celia Hernández Mauricio** · Maxilo Aesthetic Implants · Las Terrenas, Samaná, R.D.
Agencia: **Efecto Marketing** (Omar) · efectomarketingrd@gmail.com

- Repositorio: https://github.com/efectomarketingrd/maxilo-aesthetic-implants (rama `main`)
- Producción: https://maxilo-aesthetic-implants.vercel.app (Vercel despliega solo al hacer push a `main`)
- Stack: Next.js 16 (App Router), TypeScript, CSS propio en `app/globals.css`, sin librerías de UI.

## Cómo trabajar

```bash
npm install
npm run dev            # desarrollo
npm run build && npx next start -p 3100   # comprobar versión final
```

Commits con autor `Efecto Marketing <efectomarketingrd@gmail.com>` y `git push origin main`.
Cada push publica la web en Vercel en ~1 minuto.

## Identidad visual

- Colores: pizarra `#253035` / `#2e3b41` / `#1c2529`, marfil `#f8f6f2`, oro `#be9d61`, oro suave `#d8c39b`.
- Fuentes (self-hosted con @fontsource): **Cinzel** (títulos), **Cormorant Garamond** itálica (acentos), **Montserrat** (texto).
- Logos y fotos en `public/brand/` (logo-dark/light, mono-dark/light, doctora-hd.png recortada, doctora-retrato.jpg, og.png).
- Imágenes de servicios generadas con Higgsfield, URLs en `lib/images.ts`.

## Decisiones de diseño (aprobadas por el cliente)

- **Mobile first**: la mayoría de visitas son por móvil. Probar en iPhone 13, iPhone SE y Pixel 7, sin scroll horizontal.
- Estilo de la home = diseño tipo app ("home5"). Rechazados: portada con foto de recepción, portada con fondo de marca.
- Animaciones sutiles y elegantes (componente `InView` + clases `js-anim`/`is-in`), siempre con alternativa `prefers-reduced-motion`.
- Al proponer cambios, ofrecer opciones con recomendación.
- Orden de la home: Portada (saludo según hora, H1, doctora, buscador de tratamientos, tarjeta Agendar animada) → Servicios (acordeón con iconos) → La doctora → Preguntas frecuentes (4) → Valoraciones → Tarjeta "Su nueva sonrisa empieza aquí" → Tarjeta del paquete (con flor animada) → Footer oscuro.
- "Sobre nosotros" no va en la home; Marcas e Instituciones tienen páginas propias.
- El blog sustituye a "Noticias" (`/noticias` redirige a `/blog`).
- Cambio de idioma con enlace `<a>` (recarga completa) para que abra arriba de la página.
- Botón flotante de WhatsApp con animación de pulso.

## Estructura

- `lib/site.ts` — datos de contacto, teléfonos (829) 657-2217 y (829) 371-0276, WhatsApp 18296572217, `waLink()`.
- `lib/content.ts` — **todos los textos ES/EN**. Para cambiar un texto, se cambia aquí.
- `lib/agenda.ts` — días de consulta (mar–vie), horario 11:30 a. m.–1:00 p. m., horario especial 3:00–5:00 p. m. (sujeto a disponibilidad, sin recargo), precios (consulta RD$3,000 presencial / RD$1,500 online; cordales 1: RD$10,000 · 2–3: RD$8,500 c/u · 4: RD$7,000 c/u; Bótox RD$28,000 con retoque; rellenos RD$30,000 por área; PRP facial RD$10,000; lifting con hilos tensores RD$31,000 (≈US$500); bioestimulación con hilos RD$24,500 (≈US$400); lobuloplastia RD$10,000 por oreja; verrugas RD$8,000 por área; procedimientos con 1 semana de anticipación y anticipo 50% (planes PRP: pago completo); PRP capilar: sesión RD$10,000, plan 3 meses RD$25,000, programa 12 meses (6 sesiones) RD$45,000, mantenimiento RD$8,000; planes pagados completos al inicio) y tasa US$. Pendiente: protocolo de rejuvenecimiento en cabina (qué incluye y precio; no prometer "2 años más joven").
- `lib/blog.ts` — artículos del blog (vacío por ahora).
- `app/[lang]/` — páginas: inicio, agendar, servicios/[slug], paquete-implantes, blog, sobre-nosotros, preguntas, marcas, instituciones.
- `components/` — Header, Footer, OfferCard, CtaCard, BookingWizard, TreatmentFinder, Schema (JSON-LD), etc.
- SEO: JSON-LD (MedicalClinic/Dentist, Physician, FAQPage, MedicalWebPage, Blog, Offer), `app/sitemap.ts`, `app/robots.ts`.

## Agenda

Citas Presencial / Online. Se envían por WhatsApp o por correo (dracelia.maxiloestetica@gmail.com).
Horario especial sujeto a disponibilidad, sin costo adicional (no se cobra recargo por pagar con tarjeta: Ley 358-05, art. 87). Datos de transferencia (Banco Popular) y apps para pagar desde el extranjero en `lib/site.ts`.

## Pendientes (los aporta la doctora / el cliente)

- Sobre nosotros ya tiene formación (UCE 2012 Cum Laude, exequátur 2013, especialidad UASD 2013–2017 con residencia en Hospital Dr. Darío Contreras, tesis PRF 2017, cursos prácticos avanzados (no mencionar "cadáver") con Faces Team y Maxilofacial Dexeus) y membresías CDO, SDIO, SODOCIBUMAX (activa) y SECOM CyC. Pendiente confirmar: AO Foundation (miembro o curso, año). Omar no quiere aparecer en la web (ni como equipo ni como crédito).
- Reseñas reales de pacientes.
- Marcas (solo está Germaine de Capuccini) e instituciones.
- Precios, hoteles y duración del paquete de implantes + estadía.
- Aprobar la frase "Cada rostro merece un plan pensado solo para él." y la descripción de Platismoplastia.
- Dominio propio → configurar `NEXT_PUBLIC_SITE_URL` en Vercel. Pasar a Vercel Pro antes del lanzamiento comercial.
- Pedir permiso a Wise, Remitly y Western Union para usar sus logos (por ahora solo botones con nombre y enlace).
- **Recordar a Omar:** sección "¿Cómo es el proceso?" en las páginas de servicios (Valoración → Plan personalizado → Tratamiento → Seguimiento). Aprobada como idea; se hará más adelante y el texto lo revisa la doctora.
- **Para contenidos (blog y página de Medicina estética), aún no trabajar:** explicación del PRP capilar — fase inicial de 3–5 sesiones mensuales (usamos 4) + mantenimiento cada 4–6 meses (meses 8 y 12) = 6 sesiones en 12 meses; cambios desde el mes 2–3, más densidad a los 3–6 meses, resultado más lleno a los 6–12 meses; no hay evidencia de que 12 sesiones mensuales mejoren el resultado. Fuentes: J Cutan Med Surg 2023 (pubmed 37533146), revisión PMC8664169.
- Páginas de tratamiento (`lib/treatments.ts`): Implantes y cirugía oral (3) y Cirugía estética facial (8) , Medicina estética (8) y Cirugía reconstructiva (3) listas (22 en total), textos para revisión de la doctora. Fotos propias por tratamiento en `treatmentImg` (`lib/images.ts`); Cirugía estética facial usa la foto del servicio hasta tener fotos de la doctora. Higgsfield está en plan gratuito (el modelo anterior no está disponible).
- Infografía animada + datos clave bajo "¿Qué es?" (`components/TreatmentVisual.tsx`, campos `art` y `facts` en `lib/treatments.ts`): hecha en los 3 tratamientos de Implantes y cirugía oral (opción C aprobada). Con infografía no se muestra la foto del tratamiento. La infografía se repite cada ~11 s mientras está en pantalla (`components/ReplayInView.tsx`); los datos clave no se repiten. Siguen los demás servicios.
- Posible siguiente trabajo: dar el estilo nuevo a la página de agendar y a las páginas de servicios.
