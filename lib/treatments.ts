// DETALLE DE CADA TRATAMIENTO (páginas /servicios/[servicio]/[tratamiento]).
// Cada tratamiento está ligado al procedimiento de su servicio por la posición (index) en `procedures`.
// Textos generales redactados para revisión de la doctora.

import type { ServiceSlug } from "./content";
import type { Locale } from "./site";

export type TreatmentDetail = {
  summary: string;
  what: string;
  forWho: string[];
  steps: { t: string; d: string }[];
  recovery: string;
  price?: { lines: { label: string; value: string }[]; note?: string };
  faqs: { q: string; a: string }[];
};

export type Treatment = {
  service: ServiceSlug;
  index: number; // posición en services.items[].procedures
  slug: string;
  booking: { s: string; withOption: boolean }; // servicio de la agenda y si se marca el tratamiento
  pkgLink?: boolean; // muestra el enlace al paquete implantes + estadía
  es: TreatmentDetail;
  en: TreatmentDetail;
};

export const treatments: Treatment[] = [
  // ───────── IMPLANTES Y CIRUGÍA ORAL ─────────
  {
    service: "implantes-cirugia-oral",
    index: 0,
    slug: "implantes-dentales",
    booking: { s: "implantes", withOption: false },
    pkgLink: true,
    es: {
      summary: "Reemplace uno o varios dientes con una solución fija que se ve, se siente y funciona como un diente natural.",
      what: "Un implante dental es una pequeña pieza de titanio, compatible con el cuerpo, que se coloca en el hueso del maxilar y cumple la función de la raíz del diente. Una vez integrado al hueso, sobre él se fija una corona o una prótesis. Es la opción más estable para reponer dientes perdidos, porque no depende de los dientes vecinos ni se mueve al comer o hablar.",
      forWho: [
        "Personas a las que les falta uno o varios dientes.",
        "Quienes usan dentadura removible y desean algo fijo y cómodo.",
        "Quienes prefieren no desgastar los dientes vecinos para colocar un puente.",
        "Pacientes con buena salud general y hueso suficiente, o que puedan prepararse para ello (se evalúa en la valoración).",
      ],
      steps: [
        { t: "Valoración y estudios", d: "La doctora revisa su boca y su historia clínica, y con radiografías o tomografía mide el hueso disponible para planificar cada implante." },
        { t: "Colocación del implante", d: "En una cirugía con anestesia local se coloca el implante en el hueso. Es un procedimiento preciso y, por lo general, de corta duración." },
        { t: "Integración con el hueso", d: "Durante las semanas siguientes, el hueso se une al implante. Es la etapa que le da estabilidad a largo plazo." },
        { t: "Corona definitiva", d: "Una vez integrado, se coloca la corona o prótesis final, diseñada para verse como sus dientes naturales." },
      ],
      recovery: "Las molestias suelen ser leves y se controlan con los medicamentos que indique la doctora. Es normal algo de inflamación los primeros días. Se recomienda dieta blanda, buena higiene y asistir a los controles.",
      faqs: [
        { q: "¿La colocación duele?", a: "Se realiza con anestesia local, por lo que durante el procedimiento no debe sentir dolor. Después puede haber molestias leves que se controlan con medicamentos." },
        { q: "¿Cuánto dura un implante?", a: "Con buena higiene, controles periódicos y hábitos saludables, un implante puede durar muchos años." },
        { q: "¿Qué pasa si no tengo suficiente hueso?", a: "La doctora lo evalúa en la valoración y le explicará las opciones disponibles para su caso." },
        { q: "¿Puedo hacerme el tratamiento si vengo del extranjero?", a: "Sí. Coordinamos las citas para aprovechar su estadía. También ofrecemos un paquete de implantes con hospedaje." },
      ],
    },
    en: {
      summary: "Replace one or more teeth with a fixed solution that looks, feels and works like a natural tooth.",
      what: "A dental implant is a small, biocompatible titanium post placed in the jawbone that works as the root of a tooth. Once it has bonded with the bone, a crown or prosthesis is fixed on top. It is the most stable way to replace missing teeth, because it does not rely on neighboring teeth and does not move when you eat or speak.",
      forWho: [
        "People missing one or more teeth.",
        "Those who wear removable dentures and want something fixed and comfortable.",
        "Those who prefer not to grind down neighboring teeth for a bridge.",
        "Patients in good general health with enough bone, or who can be prepared for it (assessed at the consultation).",
      ],
      steps: [
        { t: "Assessment and imaging", d: "The doctor examines your mouth and medical history and uses X-rays or a CT scan to measure the available bone and plan each implant." },
        { t: "Implant placement", d: "The implant is placed in the bone under local anesthesia. It is a precise and usually short procedure." },
        { t: "Bonding with the bone", d: "Over the following weeks, the bone fuses with the implant. This stage gives it long-term stability." },
        { t: "Final crown", d: "Once integrated, the final crown or prosthesis is placed, designed to look like your natural teeth." },
      ],
      recovery: "Discomfort is usually mild and controlled with the medication the doctor prescribes. Some swelling during the first days is normal. A soft diet, good hygiene and attending follow-ups are recommended.",
      faqs: [
        { q: "Does placement hurt?", a: "It is done under local anesthesia, so you should not feel pain during the procedure. Mild discomfort afterwards is controlled with medication." },
        { q: "How long does an implant last?", a: "With good hygiene, regular check-ups and healthy habits, an implant can last many years." },
        { q: "What if I don't have enough bone?", a: "The doctor assesses this at the consultation and will explain the options available for your case." },
        { q: "Can I have treatment if I'm visiting from abroad?", a: "Yes. We schedule appointments to make the most of your stay, and we also offer an implants package with accommodation." },
      ],
    },
  },
  {
    service: "implantes-cirugia-oral",
    index: 1,
    slug: "extraccion-cordales",
    booking: { s: "cirugia-oral", withOption: true },
    es: {
      summary: "Retiro seguro de las cordales o muelas del juicio que causan dolor, infecciones o falta de espacio.",
      what: "Los terceros molares, conocidos como cordales o muelas del juicio, son los últimos dientes en salir, generalmente entre los 17 y los 25 años. Con frecuencia no tienen espacio suficiente y quedan atrapados en el hueso o salen torcidos, lo que puede causar dolor, inflamación, infecciones o daños en el molar vecino. La extracción quirúrgica los retira de forma controlada.",
      forWho: [
        "Dolor o presión en el fondo de la boca.",
        "Inflamación o infecciones repetidas de la encía alrededor de la cordal.",
        "Cordales que no tienen espacio para salir o que salen torcidas.",
        "Caries o daño en el molar de al lado.",
        "Indicación de su odontólogo u ortodoncista.",
      ],
      steps: [
        { t: "Valoración y radiografía", d: "La doctora revisa la posición de cada cordal con una radiografía para planificar la extracción." },
        { t: "Extracción", d: "Se realiza con anestesia local. Según la posición de la cordal, puede ser una extracción simple o quirúrgica." },
        { t: "Indicaciones y control", d: "Se le explican los cuidados en casa y se programa un control para revisar la cicatrización." },
      ],
      recovery: "Es normal tener inflamación y molestias durante 2 o 3 días. Ayudan el frío local las primeras horas, la dieta blanda, el reposo relativo y seguir las indicaciones de la doctora. La mayoría de las personas retoma sus actividades en pocos días.",
      price: {
        lines: [
          { label: "Por cordal", value: "RD$10,000" },
          { label: "Las 4 cordales", value: "RD$8,000 c/u (RD$32,000)" },
        ],
        note: "Si ya le indicaron la extracción, puede agendar directamente como procedimiento: no paga consulta.",
      },
      faqs: [
        { q: "¿Se pueden sacar las 4 cordales a la vez?", a: "En muchos casos sí. La doctora lo decide en la valoración según la posición de cada una y su salud general." },
        { q: "¿Cuánto tiempo de reposo necesito?", a: "Por lo general, 2 o 3 días de cuidados en casa. Depende de cuántas cordales se extraigan y de su posición." },
        { q: "¿Es obligatorio sacarlas si no duelen?", a: "No siempre. Si están bien posicionadas y no causan problemas, pueden quedarse. La valoración lo determina." },
      ],
    },
    en: {
      summary: "Safe removal of wisdom teeth that cause pain, infection or crowding.",
      what: "Third molars, known as wisdom teeth, are the last teeth to come in, usually between ages 17 and 25. They often lack space and stay trapped in the bone or grow in crooked, which can cause pain, swelling, infection or damage to the neighboring molar. Surgical extraction removes them in a controlled way.",
      forWho: [
        "Pain or pressure at the back of the mouth.",
        "Repeated swelling or infection of the gum around the wisdom tooth.",
        "Wisdom teeth with no room to come in, or coming in crooked.",
        "Decay or damage to the neighboring molar.",
        "Recommendation from your dentist or orthodontist.",
      ],
      steps: [
        { t: "Assessment and X-ray", d: "The doctor checks the position of each wisdom tooth with an X-ray to plan the extraction." },
        { t: "Extraction", d: "Done under local anesthesia. Depending on the position, it may be a simple or surgical extraction." },
        { t: "Instructions and follow-up", d: "You receive home-care instructions and a follow-up visit is scheduled to check healing." },
      ],
      recovery: "Swelling and discomfort for 2 or 3 days are normal. Cold compresses in the first hours, a soft diet, relative rest and following the doctor's instructions help. Most people return to their activities within a few days.",
      price: {
        lines: [
          { label: "Per wisdom tooth", value: "RD$10,000" },
          { label: "All 4 wisdom teeth", value: "RD$8,000 each (RD$32,000)" },
        ],
        note: "If the extraction has already been recommended, you can book it directly as a procedure: no consultation fee.",
      },
      faqs: [
        { q: "Can all 4 wisdom teeth be removed at once?", a: "In many cases, yes. The doctor decides at the assessment based on each tooth's position and your general health." },
        { q: "How much rest will I need?", a: "Usually 2 or 3 days of home care, depending on how many teeth are removed and their position." },
        { q: "Do they have to come out if they don't hurt?", a: "Not always. If they are well positioned and cause no problems, they can stay. The assessment determines this." },
      ],
    },
  },
  {
    service: "implantes-cirugia-oral",
    index: 2,
    slug: "cirugia-oral-maxilofacial",
    booking: { s: "cirugia-oral", withOption: true },
    es: {
      summary: "Tratamiento quirúrgico de problemas de la boca, los maxilares y la cara, realizado por una cirujana especialista.",
      what: "La cirugía oral y maxilofacial es la especialidad que trata quirúrgicamente las enfermedades, lesiones y alteraciones de la boca, los maxilares y la cara. Incluye procedimientos como la extracción de dientes retenidos (por ejemplo, caninos), el tratamiento de quistes y lesiones de la boca, la corrección de frenillos, la preparación del hueso para prótesis o implantes, y la valoración de alteraciones de la mordida, entre otros.",
      forWho: [
        "Pacientes referidos por su odontólogo para un procedimiento quirúrgico.",
        "Dientes retenidos que no han salido, como los caninos.",
        "Lesiones, quistes o bultos en la boca o los maxilares.",
        "Frenillos que dificultan el habla, la higiene o el uso de prótesis.",
        "Alteraciones de la mordida o de los maxilares que requieren valoración.",
      ],
      steps: [
        { t: "Valoración especializada", d: "La doctora evalúa su caso, revisa los estudios necesarios y le explica las opciones de tratamiento." },
        { t: "Plan quirúrgico", d: "Se define el procedimiento, el tipo de anestesia y los cuidados previos, adaptados a su caso." },
        { t: "Procedimiento", d: "Se realiza en el centro con las medidas de seguridad y comodidad adecuadas." },
        { t: "Seguimiento", d: "Controles posteriores para asegurar una buena recuperación." },
      ],
      recovery: "La recuperación depende del procedimiento. La doctora le indicará los cuidados, la medicación y el tiempo estimado de reposo para su caso.",
      faqs: [
        { q: "¿Necesito una referencia de mi odontólogo?", a: "No es obligatorio. Puede agendar una consulta directamente y la doctora evaluará su caso." },
        { q: "¿Cuánto cuesta?", a: "Depende del procedimiento. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Surgical treatment of problems of the mouth, jaws and face, performed by a specialist surgeon.",
      what: "Oral and maxillofacial surgery is the specialty that surgically treats diseases, injuries and conditions of the mouth, jaws and face. It includes procedures such as removing impacted teeth (for example, canines), treating cysts and lesions of the mouth, correcting frenulums, preparing the bone for prostheses or implants, and assessing bite problems, among others.",
      forWho: [
        "Patients referred by their dentist for a surgical procedure.",
        "Impacted teeth that have not come in, such as canines.",
        "Lesions, cysts or lumps in the mouth or jaws.",
        "Frenulums that affect speech, hygiene or the use of prostheses.",
        "Bite or jaw problems that need assessment.",
      ],
      steps: [
        { t: "Specialist assessment", d: "The doctor evaluates your case, reviews the necessary studies and explains the treatment options." },
        { t: "Surgical plan", d: "The procedure, type of anesthesia and preparation are defined for your case." },
        { t: "Procedure", d: "Performed at the clinic with appropriate safety and comfort measures." },
        { t: "Follow-up", d: "Follow-up visits to ensure a good recovery." },
      ],
      recovery: "Recovery depends on the procedure. The doctor will tell you the care, medication and estimated rest time for your case.",
      faqs: [
        { q: "Do I need a referral from my dentist?", a: "It is not required. You can book a consultation directly and the doctor will assess your case." },
        { q: "How much does it cost?", a: "It depends on the procedure. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
];

export function treatmentsFor(service: string) {
  return treatments.filter((t) => t.service === service);
}

export function findTreatment(service: string, slug: string) {
  return treatments.find((t) => t.service === service && t.slug === slug);
}

export function treatmentAt(service: string, index: number) {
  return treatments.find((t) => t.service === service && t.index === index);
}

// Enlace a la agenda con el servicio (y el tratamiento) ya marcados
const bookingIds: Record<string, string> = {
  "cirugia-estetica-facial": "estetica-facial",
  "medicina-estetica": "medicina-estetica",
  "cirugia-reconstructiva": "reconstructiva",
};

export function bookingHref(lang: Locale, service: string, index: number, option: string) {
  let s = bookingIds[service] ?? "cirugia-oral";
  let withOption = true;
  if (service === "implantes-cirugia-oral" && index === 0) {
    s = "implantes";
    withOption = false;
  }
  const q = new URLSearchParams({ s });
  if (withOption) q.set("o", option);
  return `/${lang}/agendar?${q.toString()}`;
}
