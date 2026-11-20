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
//   { tip: "Texto destacado", img? } → recuadro de consejo (img: foto opcional, p. ej. "/brand/doctora-retrato.jpg")
// Bloques animados:
//   { map: "botox", caption }      → rostro con las zonas que se encienden (usa las zonas del armador de planes)
//   { timeline: [{ t, d }] }       → línea de tiempo animada
//   { compare: { yes, no } }       → dos columnas: sí / no
//   { points: [{ t, d, ic? }] }    → tarjetas numeradas (ic: anatomy | needle | face | shield → ícono animado)
//   { faq: [{ q, a }] }            → preguntas frecuentes (también van al schema FAQPage)
//   { refs: [{ t, url }] }         → fuentes
//   { doc: { eyebrow, name, role, text, chips, book, more, service, slug } } → tarjeta de la doctora con botones
//   { checklist: { items: [{ ic, t, d }], done } } → lista de verificación animada (ic: person | box | clipboard | clinic | tag | calendar)

type Pair = { t: string; d: string };
export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] }
  | { tip: string; img?: string }
  | { map: "botox"; caption: string; phases?: [string, string] }
  | { timeline: Pair[] }
  | { compare: { yes: { t: string; items: string[] }; no: { t: string; items: string[] } } }
  | { points: (Pair & { ic?: "anatomy" | "needle" | "face" | "shield" })[] }
  | { faq: { q: string; a: string }[] }
  | { refs: { t: string; url: string }[] }
  | { checklist: { items: (Pair & { ic: CheckIcon })[]; done: string } }
  | { doc: { eyebrow: string; name: string; role: string; text: string; chips: string[]; book: string; more: string; service: ServiceSlug; slug: string } };

export type CheckIcon = "person" | "box" | "clipboard" | "clinic" | "tag" | "calendar";

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
    slug: "implantes-dentales-republica-dominicana-que-especialista-debe-colocarlos",
    date: "2026-11-20",
    service: "implantes-cirugia-oral",
    readMinutes: 6,
    es: {
      title: "Implantes dentales en República Dominicana: ¿qué especialista debe colocarlos?",
      excerpt: "Qué es un implante, cuánto dura, quién está capacitado para colocarlo, las señales de alerta y por qué un cirujano maxilofacial es una opción segura.",
      category: "Implantes y cirugía oral",
      body: [
        { p: "Cada vez más personas eligen los implantes para reponer los dientes que les faltan, y en República Dominicana también llegan muchos pacientes del extranjero con ese fin. Un implante bien hecho puede acompañarle por muchos años. Por eso, antes de comparar precios, conviene hacerse una pregunta: ¿quién va a colocarlo?" },
        { h: "¿Qué es un implante dental?" },
        { p: "Es una pequeña pieza de titanio que se coloca en el hueso del maxilar y cumple la función de la raíz del diente. Con las semanas, el hueso se une al implante y, sobre él, se fija una corona o una prótesis hecha a medida. No depende de los dientes vecinos y no se mueve al comer ni al hablar." },
        { p: "Bien planificados y bien cuidados, los implantes tienen resultados muy estables: una revisión científica de 2019 calculó que entre el 93% y el 96% siguen funcionando a los 10 años." },
        { h: "Qué incluye un tratamiento con implantes" },
        {
          timeline: [
            { t: "Valoración", d: "Con su historia clínica y una radiografía panorámica (o una tomografía, si hace falta) se mide el hueso y se planifica cada implante." },
            { t: "Cirugía", d: "El implante se coloca en el hueso con anestesia local." },
            { t: "Integración", d: "Durante las semanas siguientes, el hueso se une al implante." },
            { t: "Corona definitiva", d: "Se coloca la corona o la prótesis final, y siguen los controles." },
          ],
        },
        { h: "¿Quién puede colocar implantes dentales?" },
        { p: "Colocar un implante es una cirugía. Exige conocer bien el hueso, los nervios y los senos maxilares, planificar con estudios de imagen y saber resolver una complicación. Por eso debe hacerlo un profesional de la odontología con especialidad o formación específica en implantes, y con experiencia en cirugía." },
        {
          compare: {
            yes: { t: "Profesionales capacitados", items: ["Cirujanos orales y maxilofaciales", "Periodoncistas", "Prostodoncistas y rehabilitadores orales con formación quirúrgica", "Odontólogos con formación específica en implantología"] },
            no: { t: "Señales de alerta", items: ["Le proponen operar sin radiografía ni estudios previos", "Le prometen dientes fijos el mismo día sin evaluar su hueso", "No le dicen la marca del implante que le van a colocar", "Un precio muy por debajo de lo habitual", "Nadie le habla de los controles después de la cirugía"] },
          },
        },
        { h: "¿Por qué un cirujano maxilofacial?" },
        { p: "El cirujano oral y maxilofacial es el especialista en la cirugía de la boca, los maxilares y la cara. Los implantes forman parte de su formación quirúrgica, igual que los injertos de hueso y el manejo de casos complejos." },
        {
          points: [
            { ic: "anatomy", t: "Hueso, nervios y senos maxilares", d: "Conoce a fondo las estructuras que hay que respetar al colocar un implante, porque opera en ellas todos los días." },
            { ic: "needle", t: "Cirugía e injertos de hueso", d: "Si falta hueso, puede valorar y realizar los injertos que su caso necesite antes o durante la colocación." },
            { ic: "face", t: "Su sonrisa dentro de su rostro", d: "Planifica pensando en la función, la encía y la armonía de la cara, no solo en el hueco del diente." },
            { ic: "shield", t: "Casos complejos y complicaciones", d: "Está preparado para atender pacientes con condiciones médicas y para resolver a tiempo cualquier complicación." },
          ],
        },
        { tip: "Un implante no es solo el tornillo: es un tratamiento completo. Pregunte quién hará la cirugía, quién hará la corona y cómo serán los controles." },
        { h: "Cómo elegir dónde ponerse implantes en República Dominicana" },
        {
          checklist: {
            items: [
              { ic: "person", t: "¿Quién lo coloca?", d: "Pregunte su nombre y su especialidad." },
              { ic: "clipboard", t: "Estudios antes de operar", d: "Radiografía panorámica y, si hace falta, tomografía." },
              { ic: "box", t: "Un implante identificado", d: "Que le digan la marca del implante y le entreguen sus datos." },
              { ic: "clinic", t: "Un lugar adecuado", d: "Un consultorio o centro con condiciones quirúrgicas y esterilización." },
              { ic: "tag", t: "Un presupuesto claro", d: "Que diga qué incluye: implante, pilar, corona y controles." },
              { ic: "calendar", t: "Seguimiento", d: "Pregunte cuándo serán las revisiones después de la cirugía." },
            ],
            done: "6 de 6: listo para elegir con seguridad",
          },
        },
        {
          doc: {
            eyebrow: "Dónde ponerse implantes en Las Terrenas",
            name: "Dra. Celia Hernández Mauricio",
            role: "Cirujana maxilofacial · Maxilo Aesthetic Implants",
            text: "Planifica cada implante con sus estudios de imagen, realiza la cirugía y le acompaña en los controles hasta su corona definitiva.",
            chips: ["Cirujana maxilofacial", "Valoración con radiografía panorámica", "Anestesia local", "Paquete con hospedaje"],
            book: "Agendar mi valoración",
            more: "Ver el tratamiento",
            service: "implantes-cirugia-oral",
            slug: "implantes-dentales",
          },
        },
        { h: "Preguntas frecuentes" },
        {
          faq: [
            { q: "¿Cualquier dentista puede colocar implantes?", a: "Colocar implantes no es una especialidad aparte, sino una cirugía que exige formación específica y experiencia. Antes de decidir, pregunte por la formación de quien lo hará y cuántos casos como el suyo atiende." },
            { q: "¿Cuánto dura un implante dental?", a: "Con buena planificación, buena higiene y controles, la mayoría siguen funcionando después de 10 años. Fumar, la diabetes sin control y la enfermedad de las encías aumentan el riesgo de que falle." },
            { q: "¿La colocación duele?", a: "No durante el procedimiento, porque se realiza con anestesia local. Después puede haber molestias leves y algo de inflamación, que se controlan con los medicamentos indicados." },
            { q: "¿Qué pasa si no tengo suficiente hueso?", a: "En muchos casos se puede preparar el hueso con un injerto. Es justamente una de las áreas de la cirugía maxilofacial. La doctora lo evalúa con sus estudios en la valoración." },
            { q: "¿Cuánto cuesta un implante en Las Terrenas?", a: "Depende de cuántos dientes se reponen, el tipo de implante, el material de la corona y el tiempo del tratamiento. En la valoración, la doctora le presenta las opciones con su costo. Desconfíe de un precio muy bajo que no explique qué incluye." },
          ],
        },
        {
          refs: [
            { t: "Long-term (10-year) dental implant survival: A systematic review and sensitivity meta-analysis. J Dent, 2019.", url: "https://pubmed.ncbi.nlm.nih.gov/30904559/" },
            { t: "Position Statement: Dental Implants. American College of Prosthodontists.", url: "https://prosthodontics.org/about-acp/position-statement-dental-implants" },
            { t: "Dental Implants. American Association of Oral and Maxillofacial Surgeons (AAOMS).", url: "https://aaoms.org/wp-content/uploads/2024/05/Dental_Implant_1.pdf" },
          ],
        },
      ],
    },
    en: {
      title: "Dental implants in the Dominican Republic: which specialist should place them?",
      excerpt: "What an implant is, how long it lasts, who is qualified to place it, the warning signs and why a maxillofacial surgeon is a safe choice.",
      category: "Implants and oral surgery",
      body: [
        { p: "More and more people choose implants to replace missing teeth, and many patients also travel to the Dominican Republic for this. A well-placed implant can stay with you for many years. That is why, before comparing prices, it is worth asking one question: who is going to place it?" },
        { h: "What is a dental implant?" },
        { p: "It is a small titanium post placed in the jawbone that works as the root of a tooth. Over the following weeks, the bone bonds with the implant and a custom crown or prosthesis is fixed on top. It does not rely on neighboring teeth and does not move when you eat or speak." },
        { p: "When well planned and well cared for, implants have very stable results: a 2019 scientific review estimated that between 93% and 96% are still working after 10 years." },
        { h: "What an implant treatment includes" },
        {
          timeline: [
            { t: "Assessment", d: "With your medical history and a panoramic X-ray (or a CT scan if needed), the bone is measured and each implant is planned." },
            { t: "Surgery", d: "The implant is placed in the bone under local anesthesia." },
            { t: "Integration", d: "Over the following weeks, the bone bonds with the implant." },
            { t: "Final crown", d: "The final crown or prosthesis is placed, followed by check-ups." },
          ],
        },
        { h: "Who can place dental implants?" },
        { p: "Placing an implant is surgery. It requires solid knowledge of the bone, nerves and maxillary sinuses, planning with imaging and knowing how to handle a complication. That is why it should be done by a dental professional with a specialty or specific implant training, and with surgical experience." },
        {
          compare: {
            yes: { t: "Qualified professionals", items: ["Oral and maxillofacial surgeons", "Periodontists", "Prosthodontists and restorative dentists with surgical training", "Dentists with specific implant training"] },
            no: { t: "Warning signs", items: ["They offer surgery without an X-ray or prior imaging", "They promise fixed teeth the same day without assessing your bone", "They will not tell you the brand of the implant", "A price far below the usual", "Nobody mentions check-ups after surgery"] },
          },
        },
        { h: "Why a maxillofacial surgeon?" },
        { p: "The oral and maxillofacial surgeon specializes in surgery of the mouth, jaws and face. Implants are part of their surgical training, as are bone grafts and the management of complex cases." },
        {
          points: [
            { ic: "anatomy", t: "Bone, nerves and sinuses", d: "They know in depth the structures that must be protected when placing an implant, because they operate on them every day." },
            { ic: "needle", t: "Surgery and bone grafts", d: "If bone is missing, they can assess and perform the grafts your case needs before or during placement." },
            { ic: "face", t: "Your smile within your face", d: "They plan for function, gums and facial balance, not just the gap in your teeth." },
            { ic: "shield", t: "Complex cases and complications", d: "They are prepared to treat patients with medical conditions and to resolve any complication early." },
          ],
        },
        { tip: "An implant is not just the screw: it is a complete treatment. Ask who will do the surgery, who will make the crown and how the check-ups will work." },
        { h: "How to choose where to get implants in the Dominican Republic" },
        {
          checklist: {
            items: [
              { ic: "person", t: "Who places it?", d: "Ask for their name and specialty." },
              { ic: "clipboard", t: "Imaging before surgery", d: "A panoramic X-ray and, if needed, a CT scan." },
              { ic: "box", t: "An identified implant", d: "They should tell you the implant brand and give you its details." },
              { ic: "clinic", t: "The right place", d: "An office or clinic with surgical conditions and sterilization." },
              { ic: "tag", t: "A clear quote", d: "It should state what is included: implant, abutment, crown and check-ups." },
              { ic: "calendar", t: "Follow-up", d: "Ask when the reviews after surgery will be." },
            ],
            done: "6 of 6: ready to choose safely",
          },
        },
        {
          doc: {
            eyebrow: "Where to get implants in Las Terrenas",
            name: "Dr. Celia Hernández Mauricio",
            role: "Maxillofacial surgeon · Maxilo Aesthetic Implants",
            text: "She plans each implant with your imaging, performs the surgery and follows you through your check-ups until your final crown.",
            chips: ["Maxillofacial surgeon", "Assessment with a panoramic X-ray", "Local anesthesia", "Package with accommodation"],
            book: "Book my assessment",
            more: "See the treatment",
            service: "implantes-cirugia-oral",
            slug: "implantes-dentales",
          },
        },
        { h: "Frequently asked questions" },
        {
          faq: [
            { q: "Can any dentist place implants?", a: "Implant placement is not a separate specialty but a surgery that requires specific training and experience. Before deciding, ask about the training of the person who will do it and how many cases like yours they treat." },
            { q: "How long does a dental implant last?", a: "With good planning, good hygiene and check-ups, most are still working after 10 years. Smoking, uncontrolled diabetes and gum disease increase the risk of failure." },
            { q: "Does placement hurt?", a: "Not during the procedure, because it is done under local anesthesia. Afterwards there may be mild discomfort and some swelling, controlled with the prescribed medication." },
            { q: "What if I do not have enough bone?", a: "In many cases the bone can be prepared with a graft. This is precisely one of the areas of maxillofacial surgery. The doctor assesses it with your imaging at the consultation." },
            { q: "How much does an implant cost in Las Terrenas?", a: "It depends on how many teeth are replaced, the type of implant, the crown material and the treatment time. At the assessment, the doctor presents the options with their cost. Be wary of a very low price that does not explain what is included." },
          ],
        },
        {
          refs: [
            { t: "Long-term (10-year) dental implant survival: A systematic review and sensitivity meta-analysis. J Dent, 2019.", url: "https://pubmed.ncbi.nlm.nih.gov/30904559/" },
            { t: "Position Statement: Dental Implants. American College of Prosthodontists.", url: "https://prosthodontics.org/about-acp/position-statement-dental-implants" },
            { t: "Dental Implants. American Association of Oral and Maxillofacial Surgeons (AAOMS).", url: "https://aaoms.org/wp-content/uploads/2024/05/Dental_Implant_1.pdf" },
          ],
        },
      ],
    },
  },
  {
    slug: "botox-republica-dominicana-que-especialista-debe-aplicarlo",
    date: "2026-11-13",
    cover: "/blog/botox-republica-dominicana.jpg",
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
        { map: "botox", caption: "Zonas del rostro que más se tratan con bótox.", phases: ["Líneas de expresión", "Músculo relajado, piel más lisa"] },
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
          checklist: {
            items: [
              { ic: "person", t: "¿Quién lo aplica?", d: "Pregunte su nombre y su especialidad." },
              { ic: "box", t: "El producto, a la vista", d: "Marca, lote, registro sanitario y fecha de vencimiento." },
              { ic: "clipboard", t: "Valoración previa", d: "Con su historia clínica, antes de aplicar." },
              { ic: "clinic", t: "Un lugar adecuado", d: "Un consultorio o centro médico, no un salón." },
              { ic: "tag", t: "Un precio razonable", d: "Desconfíe de precios muy por debajo de lo habitual." },
              { ic: "calendar", t: "Control y retoque", d: "Pregunte si incluye la revisión a las 2 semanas." },
            ],
            done: "6 de 6: lista para elegir con seguridad",
          },
        },
        {
          doc: {
            eyebrow: "Dónde aplicarse bótox en Las Terrenas",
            name: "Dra. Celia Hernández Mauricio",
            role: "Cirujana maxilofacial · Maxilo Aesthetic Implants",
            text: "Aplica toxina botulínica tipo A después de una valoración, en un entorno clínico y con seguimiento de su resultado.",
            chips: ["Neuronox · Medytox, Corea del Sur", "Valoración previa", "Retoque a las 2 semanas incluido", "RD$28,000"],
            book: "Agendar mi valoración",
            more: "Ver el tratamiento",
            service: "medicina-estetica",
            slug: "botox",
          },
        },
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
        { map: "botox", caption: "The areas of the face most often treated with Botox.", phases: ["Expression lines", "Relaxed muscle, smoother skin"] },
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
          checklist: {
            items: [
              { ic: "person", t: "Who applies it?", d: "Ask for their name and specialty." },
              { ic: "box", t: "The product, in plain view", d: "Brand, batch, sanitary registration and expiry date." },
              { ic: "clipboard", t: "A prior assessment", d: "With your medical history, before the injection." },
              { ic: "clinic", t: "The right place", d: "A medical office or clinic, not a salon." },
              { ic: "tag", t: "A reasonable price", d: "Be wary of prices far below the usual." },
              { ic: "calendar", t: "Check-up and touch-up", d: "Ask whether the 2-week review is included." },
            ],
            done: "6 of 6: ready to choose safely",
          },
        },
        {
          doc: {
            eyebrow: "Where to get Botox in Las Terrenas",
            name: "Dr. Celia Hernández Mauricio",
            role: "Maxillofacial surgeon · Maxilo Aesthetic Implants",
            text: "She applies botulinum toxin type A after an assessment, in a clinical setting and with follow-up of your result.",
            chips: ["Neuronox · Medytox, South Korea", "Prior assessment", "Touch-up at 2 weeks included", "RD$28,000"],
            book: "Book my assessment",
            more: "See the treatment",
            service: "medicina-estetica",
            slug: "botox",
          },
        },
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
