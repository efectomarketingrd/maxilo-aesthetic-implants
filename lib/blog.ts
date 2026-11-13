import type { Locale } from "./site";
import type { ServiceSlug } from "./content";
import { img } from "./images";

// ARTÍCULOS DEL BLOG
// Para publicar un artículo nuevo, agrega un objeto a la lista `posts`.
// Cada artículo tiene su versión en español (es) y, si se desea, en inglés (en).
// Si un artículo no tiene versión en inglés, solo aparece en el blog en español.
//
// Bloques del contenido:
//   { h: "Subtítulo" }            → subtítulo
//   { p: "Párrafo de texto" }     → párrafo
//   { ul: ["punto 1", "punto 2"] } → lista
//   { tip: "Texto destacado" }    → recuadro de consejo
// Bloques animados:
//   { map: "botox", caption }      → rostro con las zonas que se encienden (usa las zonas del armador de planes)
//   { timeline: [{ t, d }] }       → línea de tiempo animada
//   { compare: { yes, no } }       → dos columnas: sí / no
//   { points: [{ t, d, ic? }] }    → tarjetas numeradas (ic: anatomy | needle | face | shield → ícono animado)
//   { faq: [{ q, a }] }            → preguntas frecuentes (también van al schema FAQPage)
//   { refs: [{ t, url }] }         → fuentes

type Pair = { t: string; d: string };
export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { tip: string }
  | { map: "botox"; caption: string }
  | { timeline: Pair[] }
  | { compare: { yes: { t: string; items: string[] }; no: { t: string; items: string[] } } }
  | { points: (Pair & { ic?: "anatomy" | "needle" | "face" | "shield" })[] }
  | { faq: { q: string; a: string }[] }
  | { refs: { t: string; url: string }[] };

type PostVersion = {
  title: string;
  excerpt: string;
  category: string;
  body: Block[];
};

export type Post = {
  slug: string;
  date: string; // AAAA-MM-DD
  cover?: string; // ruta de la imagen en /public ("/blog/implantes.jpg") o URL de lib/images.ts
  service?: ServiceSlug; // servicio relacionado (muestra un botón hacia esa página)
  readMinutes: number;
  es: PostVersion;
  en?: PostVersion;
};

export const posts: Post[] = [
  {
    slug: "botox-republica-dominicana-que-especialista-debe-aplicarlo",
    date: "2026-11-13",
    cover: img.medicina,
    service: "medicina-estetica",
    readMinutes: 6,
    es: {
      title: "Bótox en República Dominicana: ¿qué especialista debe aplicarlo?",
      excerpt: "Qué es el bótox, cuánto dura, quién está capacitado para aplicarlo en República Dominicana y por qué un cirujano maxilofacial es una opción segura.",
      category: "Medicina estética",
      body: [
        { p: "El bótox es uno de los tratamientos estéticos más solicitados en República Dominicana. También es de los que más se aplican en lugares que no son adecuados, como salones o gimnasios. Antes de decidir dónde hacerlo, la pregunta más importante es quién lo aplica." },
        { h: "¿Qué es el bótox y cómo actúa?" },
        { p: "El bótox es la toxina botulínica tipo A, un medicamento que se inyecta en cantidades muy pequeñas para relajar de forma temporal los músculos que forman las arrugas de expresión. No rellena: relaja. Por eso la piel se ve más lisa sin perder la expresión del rostro." },
        { p: "En Estados Unidos, la FDA aprobó su uso estético en el entrecejo en 2002, en las patas de gallo en 2013, en la frente en 2017 y en las bandas del cuello en 2024." },
        { map: "botox", caption: "Zonas del rostro que más se tratan con bótox." },
        { h: "Qué esperar después de la aplicación" },
        {
          timeline: [
            { t: "Día 0", d: "La aplicación dura pocos minutos y puede volver a sus actividades." },
            { t: "Días 2 y 3", d: "El efecto empieza a notarse." },
            { t: "Semana 2", d: "Efecto completo. Es el momento del control y del retoque, si hace falta." },
            { t: "3 a 4 meses", d: "Duración habitual. Varía según la persona y la zona." },
          ],
        },
        { h: "¿Quién puede aplicar bótox?" },
        { p: "Aunque la aplicación es rápida, el bótox es un medicamento de uso profesional. Inyectarlo bien exige conocer con precisión los músculos, los vasos y los nervios del rostro, calcular la dosis y saber qué hacer ante una reacción. Por eso debe aplicarlo un profesional de la salud con especialidad y formación específica." },
        {
          compare: {
            yes: { t: "Profesionales capacitados", items: ["Cirujanos orales y maxilofaciales", "Dermatólogos", "Cirujanos plásticos", "Médicos con formación en medicina estética"] },
            no: { t: "Señales de alerta", items: ["Salones de belleza, spas o gimnasios", "Personal sin formación clínica", "No le muestran el producto ni su registro", "Aplicaciones a domicilio sin condiciones sanitarias"] },
          },
        },
        { h: "¿Por qué un cirujano maxilofacial?" },
        { p: "El cirujano oral y maxilofacial es el especialista en la cirugía de la cara, la boca y los maxilares. Trabaja todos los días en las mismas zonas donde se aplica el bótox, y eso se nota en la seguridad y en el resultado." },
        {
          points: [
            { ic: "anatomy", t: "Anatomía facial a fondo", d: "Conoce los músculos de la expresión y de la masticación, y el recorrido de vasos y nervios, porque opera en esas zonas." },
            { ic: "needle", t: "Precisión con la aguja", d: "Está entrenado en técnicas de anestesia e infiltración en el rostro y la boca." },
            { ic: "face", t: "Visión del rostro completo", d: "Evalúa huesos, músculos y sonrisa en conjunto, para un resultado armónico y no solo para borrar una arruga." },
            { ic: "shield", t: "Manejo de complicaciones", d: "Como cirujano, sabe reconocer y tratar a tiempo una reacción o una complicación." },
          ],
        },
        { p: "Por su formación, el maxilofacial también conoce los usos de la toxina en los músculos de la masticación, por ejemplo en el bruxismo (apretar o rechinar los dientes). Si es su caso, coméntelo en la valoración." },
        { h: "Cómo elegir dónde aplicarse bótox en República Dominicana" },
        {
          ul: [
            "Pregunte quién lo aplica y cuál es su especialidad.",
            "Pida ver el producto: marca, lote, registro sanitario y fecha de vencimiento.",
            "Exija una valoración previa con su historia clínica.",
            "Elija un consultorio o centro médico, no un salón.",
            "Desconfíe de precios muy por debajo de lo habitual.",
            "Pregunte si incluye control y retoque a las 2 semanas.",
          ],
        },
        { tip: "En Maxilo Aesthetic Implants, en Las Terrenas, la Dra. Celia Hernández Mauricio, cirujana maxilofacial, aplica toxina botulínica tipo A (Neuronox, de Medytox, Corea del Sur) con valoración previa y retoque a las 2 semanas incluido." },
        { h: "Preguntas frecuentes" },
        {
          faq: [
            { q: "¿El bótox es seguro?", a: "Aplicado por un profesional capacitado, con un producto registrado y en la dosis adecuada, es uno de los tratamientos estéticos más estudiados. Sus efectos son temporales. Pueden aparecer molestias leves, como pequeños moretones o dolor de cabeza pasajero." },
            { q: "¿Quién no debe aplicarse bótox?", a: "No se recomienda durante el embarazo o la lactancia, ni en personas con ciertas enfermedades neuromusculares. Por eso la valoración previa es importante." },
            { q: "¿Cuánto dura el efecto?", a: "Suele durar entre 3 y 4 meses. Varía según la persona, la zona y la dosis." },
            { q: "¿Cuánto cuesta el bótox en Las Terrenas?", a: "En Maxilo Aesthetic Implants cuesta RD$28,000, con el retoque a las 2 semanas incluido, y es el mismo precio para las zonas que se traten. Un precio muy bajo puede ser una señal de alerta sobre el producto o quien lo aplica." },
            { q: "¿Voy a quedar con la cara congelada?", a: "No es el objetivo. La dosis se ajusta para suavizar las líneas y mantener una expresión natural." },
          ],
        },
        {
          refs: [
            { t: "Onset and Duration of AbobotulinumtoxinA for Aesthetic Use in the Upper Face: A Systematic Literature Review. J Clin Aesthet Dermatol, 2020.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7819591" },
            { t: "Historial de aprobaciones de Botox Cosmetic por la FDA (Drugs.com).", url: "https://www.drugs.com/history/botox-cosmetic.html" },
            { t: "Los riesgos de aplicar la medicina estética en República Dominicana. Listín Diario, 2024.", url: "https://listindiario.com/la-republica/20240316/riesgos-aplicar-medicina-estetica-republica-dominicana_800193.html" },
          ],
        },
      ],
    },
    en: {
      title: "Botox in the Dominican Republic: which specialist should do it?",
      excerpt: "What Botox is, how long it lasts, who is qualified to apply it in the Dominican Republic and why a maxillofacial surgeon is a safe choice.",
      category: "Aesthetic medicine",
      body: [
        { p: "Botox is one of the most requested aesthetic treatments in the Dominican Republic. It is also one of the most often applied in unsuitable places, such as salons or gyms. Before deciding where to get it, the most important question is who applies it." },
        { h: "What is Botox and how does it work?" },
        { p: "Botox is botulinum toxin type A, a medicine injected in very small amounts to temporarily relax the muscles that create expression lines. It does not fill: it relaxes. That is why the skin looks smoother without losing facial expression." },
        { p: "In the United States, the FDA approved its aesthetic use between the brows in 2002, for crow's feet in 2013, on the forehead in 2017 and for neck bands in 2024." },
        { map: "botox", caption: "The areas of the face most often treated with Botox." },
        { h: "What to expect after treatment" },
        {
          timeline: [
            { t: "Day 0", d: "The application takes a few minutes and you can go back to your activities." },
            { t: "Days 2 and 3", d: "The effect starts to show." },
            { t: "Week 2", d: "Full effect. Time for the check-up and a touch-up if needed." },
            { t: "3 to 4 months", d: "Usual duration. It varies by person and area." },
          ],
        },
        { h: "Who can apply Botox?" },
        { p: "Although the application is quick, Botox is a professional-use medicine. Injecting it well requires precise knowledge of the facial muscles, vessels and nerves, the right dose and knowing what to do if there is a reaction. That is why it should be applied by a health professional with a specialty and specific training." },
        {
          compare: {
            yes: { t: "Qualified professionals", items: ["Oral and maxillofacial surgeons", "Dermatologists", "Plastic surgeons", "Physicians trained in aesthetic medicine"] },
            no: { t: "Warning signs", items: ["Beauty salons, spas or gyms", "Staff without clinical training", "They do not show you the product or its registration", "Home applications without sanitary conditions"] },
          },
        },
        { h: "Why a maxillofacial surgeon?" },
        { p: "The oral and maxillofacial surgeon specializes in surgery of the face, mouth and jaws. They work every day in the same areas where Botox is applied, and that shows in both safety and results." },
        {
          points: [
            { ic: "anatomy", t: "In-depth facial anatomy", d: "They know the muscles of expression and chewing, and the path of vessels and nerves, because they operate in those areas." },
            { ic: "needle", t: "Precision with the needle", d: "They are trained in anesthesia and infiltration techniques in the face and mouth." },
            { ic: "face", t: "A view of the whole face", d: "They assess bones, muscles and smile together, for a balanced result rather than just erasing a line." },
            { ic: "shield", t: "Managing complications", d: "As surgeons, they know how to recognize and treat a reaction or complication early." },
          ],
        },
        { p: "Thanks to their training, maxillofacial surgeons also know the uses of the toxin in the chewing muscles, for example for bruxism (clenching or grinding the teeth). If that is your case, mention it at your assessment." },
        { h: "How to choose where to get Botox in the Dominican Republic" },
        {
          ul: [
            "Ask who applies it and what their specialty is.",
            "Ask to see the product: brand, batch, sanitary registration and expiry date.",
            "Expect a prior assessment with your medical history.",
            "Choose a medical office or clinic, not a salon.",
            "Be wary of prices far below the usual.",
            "Ask whether a check-up and touch-up at 2 weeks are included.",
          ],
        },
        { tip: "At Maxilo Aesthetic Implants in Las Terrenas, Dr. Celia Hernández Mauricio, maxillofacial surgeon, applies botulinum toxin type A (Neuronox, by Medytox, South Korea) with a prior assessment and a touch-up at 2 weeks included." },
        { h: "Frequently asked questions" },
        {
          faq: [
            { q: "Is Botox safe?", a: "Applied by a trained professional, with a registered product and the right dose, it is one of the most studied aesthetic treatments. Its effects are temporary. Mild discomfort may appear, such as small bruises or a passing headache." },
            { q: "Who should not get Botox?", a: "It is not recommended during pregnancy or breastfeeding, or for people with certain neuromuscular diseases. That is why the prior assessment matters." },
            { q: "How long does it last?", a: "It usually lasts 3 to 4 months. It varies by person, area and dose." },
            { q: "How much does Botox cost in Las Terrenas?", a: "At Maxilo Aesthetic Implants it costs RD$28,000, with the 2-week touch-up included, and it is the same price for the areas treated. A very low price can be a warning sign about the product or who applies it." },
            { q: "Will my face look frozen?", a: "That is not the goal. The dose is adjusted to soften lines and keep a natural expression." },
          ],
        },
        {
          refs: [
            { t: "Onset and Duration of AbobotulinumtoxinA for Aesthetic Use in the Upper Face: A Systematic Literature Review. J Clin Aesthet Dermatol, 2020.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7819591" },
            { t: "Botox Cosmetic FDA approval history (Drugs.com).", url: "https://www.drugs.com/history/botox-cosmetic.html" },
            { t: "Los riesgos de aplicar la medicina estética en República Dominicana. Listín Diario, 2024 (Spanish).", url: "https://listindiario.com/la-republica/20240316/riesgos-aplicar-medicina-estetica-republica-dominicana_800193.html" },
          ],
        },
      ],
    },
  },
];

export function postsFor(lang: Locale) {
  return posts
    .filter((p) => p[lang])
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({ ...p, v: p[lang] as PostVersion }));
}

export function findPost(lang: Locale, slug: string) {
  const p = posts.find((x) => x.slug === slug);
  if (!p || !p[lang]) return null;
  return { ...p, v: p[lang] as PostVersion };
}

export function formatDate(date: string, lang: Locale) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(lang === "es" ? "es-DO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
