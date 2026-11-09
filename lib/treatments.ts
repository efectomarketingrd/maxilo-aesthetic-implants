// DETALLE DE CADA TRATAMIENTO (páginas /servicios/[servicio]/[tratamiento]).
// Cada tratamiento está ligado al procedimiento de su servicio por la posición (index) en `procedures`.
// Textos generales redactados para revisión de la doctora.

import type { ServiceSlug } from "./content";
import type { Locale } from "./site";
import type { ArtLabel, Fact } from "@/components/TreatmentVisual";

export type TreatmentDetail = {
  summary: string;
  what: string;
  forWho: string[];
  alert?: string; // aviso destacado (por ejemplo, urgencias)
  art?: { labels: ArtLabel[]; caption?: string }; // infografía animada (components/TreatmentVisual)
  facts?: Fact[]; // datos clave bajo "¿Qué es?"
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
      art: {
        labels: [
          { t: "Corona", s: "hecha a medida" },
          { t: "Pilar", s: "une corona e implante" },
          { t: "Implante", s: "de titanio" },
          { t: "Hueso", s: "se une al implante" },
        ],
        caption: "El implante cumple la función de la raíz: el hueso lo abraza y sobre él se fija la corona.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "Sin dolor durante el procedimiento" },
        { i: "titanium", t: "Titanio", s: "Material compatible con el cuerpo" },
        { i: "fixed", t: "Fijo", s: "No se mueve al comer ni al hablar" },
        { i: "crown", t: "Corona a medida", s: "Del color de sus dientes" },
      ],
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
      art: {
        labels: [
          { t: "Crown", s: "custom-made" },
          { t: "Abutment", s: "joins crown and implant" },
          { t: "Implant", s: "titanium" },
          { t: "Bone", s: "bonds to the implant" },
        ],
        caption: "The implant works as the root: the bone grows around it and the crown is fixed on top.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "No pain during the procedure" },
        { i: "titanium", t: "Titanium", s: "A biocompatible material" },
        { i: "fixed", t: "Fixed", s: "Does not move when eating or speaking" },
        { i: "crown", t: "Custom crown", s: "Matched to your teeth" },
      ],
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
      art: {
        labels: [
          { t: "Segundo molar", s: "el diente vecino" },
          { t: "Presión", s: "dolor e inflamación" },
          { t: "Cordal", s: "atrapada, sin espacio" },
          { t: "Hueso", s: "la sostiene inclinada" },
        ],
        caption: "Cuando la cordal no tiene espacio, empuja al molar vecino. Al retirarla, desaparece la presión.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "Sin dolor durante la extracción" },
        { i: "xray", t: "Radiografía previa", s: "Para planificar cada cordal" },
        { i: "home", t: "Ambulatorio", s: "Se va a casa el mismo día" },
        { i: "tag", t: "Desde RD$7,000", s: "Por cordal, si se extraen las 4" },
      ],
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
          { label: "1 cordal", value: "RD$10,000" },
          { label: "2 o 3 cordales", value: "RD$8,500 c/u" },
          { label: "Las 4 cordales", value: "RD$7,000 c/u (RD$28,000)" },
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
      art: {
        labels: [
          { t: "Second molar", s: "the neighboring tooth" },
          { t: "Pressure", s: "pain and swelling" },
          { t: "Wisdom tooth", s: "trapped, no room" },
          { t: "Bone", s: "holds it at an angle" },
        ],
        caption: "When a wisdom tooth has no room, it pushes on the neighboring molar. Removing it relieves the pressure.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "No pain during the extraction" },
        { i: "xray", t: "X-ray first", s: "To plan each tooth" },
        { i: "home", t: "Outpatient", s: "You go home the same day" },
        { i: "tag", t: "From RD$7,000", s: "Per tooth, when all 4 are removed" },
      ],
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
          { label: "1 wisdom tooth", value: "RD$10,000" },
          { label: "2 or 3 wisdom teeth", value: "RD$8,500 each" },
          { label: "All 4 wisdom teeth", value: "RD$7,000 each (RD$28,000)" },
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
      art: {
        labels: [
          { t: "Articulación", s: "abrir y cerrar la boca" },
          { t: "Maxilar", s: "hueso superior" },
          { t: "Boca y encías", s: "quistes, lesiones, frenillos" },
          { t: "Mandíbula", s: "hueso inferior y mordida" },
        ],
        caption: "Una sola especialista para la boca, los maxilares y la cara.",
      },
      facts: [
        { i: "xray", t: "Estudios", s: "Radiografía o tomografía según el caso" },
        { i: "plan", t: "Plan claro", s: "Le explicamos opciones y tiempos" },
        { i: "anest", t: "Anestesia", s: "Adecuada a cada procedimiento" },
        { i: "follow", t: "Seguimiento", s: "Controles hasta su recuperación" },
      ],
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
      art: {
        labels: [
          { t: "Jaw joint", s: "opening and closing" },
          { t: "Upper jaw", s: "maxilla" },
          { t: "Mouth and gums", s: "cysts, lesions, frenulum" },
          { t: "Lower jaw", s: "mandible and bite" },
        ],
        caption: "One specialist for the mouth, the jaws and the face.",
      },
      facts: [
        { i: "xray", t: "Imaging", s: "X-ray or CT scan as needed" },
        { i: "plan", t: "Clear plan", s: "We explain options and timing" },
        { i: "anest", t: "Anesthesia", s: "Suited to each procedure" },
        { i: "follow", t: "Follow-up", s: "Check-ups until you recover" },
      ],
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
  // ───────── CIRUGÍA ESTÉTICA FACIAL ─────────
  {
    service: "cirugia-estetica-facial",
    index: 0,
    slug: "lipopapada-perfilamiento-mandibular",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Reduzca la grasa bajo el mentón y defina el contorno de la mandíbula para un perfil más armónico.",
      what: "La lipopapada es una liposucción localizada que retira la grasa acumulada bajo el mentón a través de incisiones muy pequeñas. Se puede combinar con el perfilamiento mandibular, que trabaja la grasa del borde de la mandíbula para marcar mejor el ángulo entre el cuello y la cara. El objetivo es un perfil más definido sin perder la naturalidad del rostro.",
      art: {
        labels: [
          { t: "Papada", s: "grasa bajo el mentón" },
          { t: "Incisión", s: "mínima, bajo el mentón" },
          { t: "Mandíbula", s: "contorno más definido" },
        ],
        caption: "Se retira la grasa bajo el mentón para un perfil más definido.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "Con o sin sedación, según el caso" },
        { i: "scar", t: "Incisiones mínimas", s: "Casi imperceptibles" },
        { i: "band", t: "Mentonera", s: "Por lo general 1 a 2 semanas" },
        { i: "follow", t: "Resultado final", s: "Cuando baja la inflamación" },
      ],
      forWho: [
        "Personas con grasa acumulada bajo el mentón que no disminuye con dieta ni ejercicio.",
        "Quienes desean un contorno de mandíbula más definido.",
        "Pacientes con buena elasticidad de la piel (si hay mucha flacidez, la doctora puede sugerir combinarla con otro procedimiento).",
        "Personas con buena salud general y expectativas realistas.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa la cantidad de grasa, la calidad de la piel y las proporciones de su rostro para definir el plan." },
        { t: "Procedimiento", d: "A través de pequeñas incisiones, casi imperceptibles, se aspira la grasa bajo el mentón y en el borde de la mandíbula. Se realiza con anestesia local, con o sin sedación según el caso." },
        { t: "Vendaje o mentonera", d: "Al terminar se coloca una prenda de compresión que ayuda a que la piel se adapte al nuevo contorno." },
        { t: "Controles", d: "La doctora revisa la evolución en las citas de seguimiento hasta ver el resultado final." },
      ],
      recovery: "Es normal tener inflamación y algunos moretones durante los primeros días. La mentonera se usa el tiempo que indique la doctora, por lo general una a dos semanas. La mayoría de las personas retoma sus actividades en pocos días, y el contorno final se aprecia a medida que baja la inflamación, en las semanas y meses siguientes.",
      faqs: [
        { q: "¿Deja cicatrices?", a: "Las incisiones son muy pequeñas y se ubican en zonas discretas, como debajo del mentón, por lo que suelen ser poco visibles." },
        { q: "¿El resultado es permanente?", a: "Las células de grasa retiradas no vuelven a formarse. Mantener un peso estable ayuda a conservar el resultado." },
        { q: "¿Cuándo veré el resultado?", a: "Se nota un cambio desde las primeras semanas, pero el contorno final se aprecia cuando baja por completo la inflamación." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Reduce fat under the chin and define the jawline for a more balanced profile.",
      what: "Double-chin liposuction removes fat stored under the chin through very small incisions. It can be combined with jawline contouring, which treats the fat along the edge of the jaw to better define the angle between the neck and the face. The goal is a sharper profile that still looks natural.",
      art: {
        labels: [
          { t: "Double chin", s: "fat under the chin" },
          { t: "Incision", s: "tiny, under the chin" },
          { t: "Jawline", s: "sharper contour" },
        ],
        caption: "Fat under the chin is removed for a sharper profile.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "With or without sedation" },
        { i: "scar", t: "Tiny incisions", s: "Barely visible" },
        { i: "band", t: "Chin strap", s: "Usually 1 to 2 weeks" },
        { i: "follow", t: "Final result", s: "Once the swelling goes down" },
      ],
      forWho: [
        "People with fat under the chin that does not go away with diet or exercise.",
        "Those who want a more defined jawline.",
        "Patients with good skin elasticity (if there is a lot of sagging, the doctor may suggest combining it with another procedure).",
        "People in good general health with realistic expectations.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates the amount of fat, skin quality and your facial proportions to define the plan." },
        { t: "Procedure", d: "Through tiny, barely visible incisions, fat is suctioned from under the chin and along the jawline. It is done under local anesthesia, with or without sedation depending on the case." },
        { t: "Bandage or chin strap", d: "A compression garment is placed at the end to help the skin adapt to the new contour." },
        { t: "Follow-up", d: "The doctor checks your progress at follow-up visits until the final result." },
      ],
      recovery: "Swelling and some bruising during the first days are normal. The chin strap is worn as long as the doctor indicates, usually one to two weeks. Most people return to their activities within a few days, and the final contour shows as swelling goes down over the following weeks and months.",
      faqs: [
        { q: "Does it leave scars?", a: "The incisions are very small and placed in discreet areas, such as under the chin, so they are usually barely visible." },
        { q: "Is the result permanent?", a: "The fat cells removed do not grow back. Keeping a stable weight helps maintain the result." },
        { q: "When will I see the result?", a: "A change is noticeable within the first weeks, but the final contour shows once the swelling has fully gone down." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 1,
    slug: "platismoplastia",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Corrija las bandas verticales del cuello y defina el ángulo entre el cuello y la mandíbula.",
      what: "El platisma es un músculo delgado que cubre la parte delantera del cuello. Con los años, sus bordes se separan y se marcan como bandas verticales, y el cuello pierde definición. La platismoplastia une y tensa este músculo, por lo general a través de una pequeña incisión bajo el mentón, para devolverle al cuello un contorno más firme y joven.",
      art: {
        labels: [
          { t: "Bandas", s: "músculo separado" },
          { t: "Unión central", s: "el músculo se tensa" },
          { t: "Incisión", s: "discreta, bajo el mentón" },
        ],
        caption: "Se unen los bordes del músculo para un cuello más firme y definido.",
      },
      facts: [
        { i: "scar", t: "Incisión discreta", s: "Bajo el mentón" },
        { i: "plan", t: "Combinable", s: "Con lipopapada o lifting" },
        { i: "band", t: "Vendaje", s: "Los primeros días" },
        { i: "follow", t: "Controles", s: "Hasta el resultado final" },
      ],
      forWho: [
        "Personas con bandas verticales visibles en el cuello.",
        "Quienes notan pérdida de definición entre el cuello y la mandíbula.",
        "Pacientes que desean mejorar el cuello sin un lifting completo (la doctora valora si es suficiente o conviene combinarlo).",
        "Personas con buena salud general.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora examina el músculo, la piel y la grasa del cuello para decidir la técnica más adecuada." },
        { t: "Procedimiento", d: "A través de una incisión discreta bajo el mentón se unen y tensan los bordes del músculo. Puede combinarse con lipopapada. La anestesia se define según el caso." },
        { t: "Vendaje", d: "Se coloca una prenda de compresión para proteger la zona y ayudar a que el cuello se adapte." },
        { t: "Controles", d: "Se retiran los puntos y se revisa la evolución en las citas de seguimiento." },
      ],
      recovery: "Durante los primeros días puede haber inflamación, sensación de tirantez y algunos moretones. Se recomienda mantener la cabeza elevada al dormir y evitar esfuerzos durante el tiempo que indique la doctora. El resultado se va definiendo a medida que baja la inflamación.",
      faqs: [
        { q: "¿Es lo mismo que un lifting de cuello?", a: "No exactamente. La platismoplastia trabaja el músculo; el lifting también retira y reposiciona la piel. En la valoración la doctora le dirá qué necesita su caso." },
        { q: "¿Se nota la cicatriz?", a: "La incisión se ubica bajo el mentón, una zona poco visible, y con el tiempo suele quedar muy discreta." },
        { q: "¿Se puede combinar con otros procedimientos?", a: "Sí. Con frecuencia se combina con lipopapada o con lifting facial y de cuello." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Correct vertical neck bands and define the angle between the neck and the jaw.",
      what: "The platysma is a thin muscle covering the front of the neck. Over the years its edges separate and show as vertical bands, and the neck loses definition. Platysmaplasty joins and tightens this muscle, usually through a small incision under the chin, to give the neck a firmer, younger contour.",
      art: {
        labels: [
          { t: "Neck bands", s: "separated muscle" },
          { t: "Central repair", s: "muscle is tightened" },
          { t: "Incision", s: "discreet, under the chin" },
        ],
        caption: "The muscle edges are joined for a firmer, more defined neck.",
      },
      facts: [
        { i: "scar", t: "Discreet incision", s: "Under the chin" },
        { i: "plan", t: "Can be combined", s: "With chin liposuction or a lift" },
        { i: "band", t: "Bandage", s: "For the first days" },
        { i: "follow", t: "Follow-up", s: "Until the final result" },
      ],
      forWho: [
        "People with visible vertical bands on the neck.",
        "Those who notice a loss of definition between the neck and the jaw.",
        "Patients who want to improve the neck without a full lift (the doctor assesses whether it is enough or should be combined).",
        "People in good general health.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor examines the muscle, skin and fat of the neck to choose the most suitable technique." },
        { t: "Procedure", d: "Through a discreet incision under the chin, the edges of the muscle are joined and tightened. It can be combined with double-chin liposuction. Anesthesia is decided case by case." },
        { t: "Bandage", d: "A compression garment protects the area and helps the neck adapt." },
        { t: "Follow-up", d: "Stitches are removed and progress is checked at follow-up visits." },
      ],
      recovery: "During the first days there may be swelling, a feeling of tightness and some bruising. Keeping your head elevated while sleeping and avoiding strain for as long as the doctor indicates is recommended. The result becomes clearer as swelling goes down.",
      faqs: [
        { q: "Is it the same as a neck lift?", a: "Not exactly. Platysmaplasty works on the muscle; a lift also removes and repositions skin. At the assessment the doctor will tell you what your case needs." },
        { q: "Is the scar visible?", a: "The incision is under the chin, a barely visible area, and it usually becomes very discreet over time." },
        { q: "Can it be combined with other procedures?", a: "Yes. It is often combined with double-chin liposuction or a face and neck lift." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 2,
    slug: "blefaroplastia",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Retire el exceso de piel o las bolsas de los párpados para una mirada más descansada.",
      what: "La blefaroplastia es la cirugía de los párpados. En el párpado superior retira el exceso de piel que hace ver la mirada cansada y que, en algunos casos, llega a molestar la visión. En el párpado inferior corrige las bolsas. Las incisiones siguen los pliegues naturales del ojo, por lo que la cicatriz queda muy disimulada.",
      art: {
        labels: [
          { t: "Pliegue", s: "aquí queda la cicatriz" },
          { t: "Exceso de piel", s: "se retira" },
          { t: "Bolsas", s: "se corrigen" },
        ],
        caption: "Se retira la piel sobrante y la cicatriz queda en el pliegue natural del párpado.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "Con o sin sedación" },
        { i: "scar", t: "Cicatriz oculta", s: "En el pliegue del párpado" },
        { i: "time", t: "Puntos", s: "Se retiran en pocos días" },
        { i: "follow", t: "1 a 2 semanas", s: "De inflamación y moretones" },
      ],
      forWho: [
        "Personas con piel sobrante en los párpados superiores.",
        "Quienes tienen bolsas marcadas bajo los ojos.",
        "Quienes sienten que su mirada se ve cansada aunque hayan descansado.",
        "Personas sin enfermedades oculares activas (se revisa en la valoración).",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa los párpados, la piel y las bolsas, y revisa su historia de salud ocular." },
        { t: "Procedimiento", d: "Se realiza con anestesia local, con o sin sedación. Se retira el exceso de piel y, si es necesario, se corrigen las bolsas a través de incisiones en los pliegues naturales." },
        { t: "Retiro de puntos", d: "Los puntos se retiran pocos días después, según indique la doctora." },
        { t: "Controles", d: "Se revisa la cicatrización y la evolución hasta el resultado final." },
      ],
      recovery: "Es normal tener inflamación y moretones alrededor de los ojos durante la primera o segunda semana. Ayudan las compresas frías, dormir con la cabeza elevada y evitar el esfuerzo. Se recomienda no usar lentes de contacto ni maquillaje en la zona hasta que la doctora lo indique.",
      faqs: [
        { q: "¿Se ven las cicatrices?", a: "Las incisiones siguen el pliegue natural del párpado o se ubican junto a las pestañas, por lo que con el tiempo quedan muy disimuladas." },
        { q: "¿Cuándo puedo volver a mis actividades?", a: "Muchas personas retoman las actividades tranquilas en pocos días. La doctora le indicará cuándo volver al ejercicio." },
        { q: "¿Puedo hacerme los párpados superiores e inferiores juntos?", a: "Sí, se pueden tratar en el mismo procedimiento si su caso lo requiere." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Remove excess skin or bags from the eyelids for a more rested look.",
      what: "Blepharoplasty is eyelid surgery. On the upper eyelid it removes the excess skin that makes the eyes look tired and, in some cases, can even get in the way of vision. On the lower eyelid it corrects under-eye bags. The incisions follow the natural folds of the eye, so the scar is very well hidden.",
      art: {
        labels: [
          { t: "Eyelid crease", s: "where the scar hides" },
          { t: "Excess skin", s: "removed" },
          { t: "Bags", s: "corrected" },
        ],
        caption: "Excess skin is removed and the scar sits in the natural eyelid crease.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "With or without sedation" },
        { i: "scar", t: "Hidden scar", s: "In the eyelid crease" },
        { i: "time", t: "Stitches", s: "Removed within a few days" },
        { i: "follow", t: "1 to 2 weeks", s: "Of swelling and bruising" },
      ],
      forWho: [
        "People with excess skin on the upper eyelids.",
        "Those with noticeable bags under the eyes.",
        "Those who feel their eyes look tired even when rested.",
        "People without active eye disease (checked at the assessment).",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates the eyelids, skin and bags, and reviews your eye health history." },
        { t: "Procedure", d: "It is done under local anesthesia, with or without sedation. Excess skin is removed and, if needed, the bags are corrected through incisions in the natural folds." },
        { t: "Stitch removal", d: "Stitches are removed a few days later, as the doctor indicates." },
        { t: "Follow-up", d: "Healing and progress are checked until the final result." },
      ],
      recovery: "Swelling and bruising around the eyes during the first one or two weeks are normal. Cold compresses, sleeping with your head elevated and avoiding strain help. Avoid contact lenses and makeup in the area until the doctor says otherwise.",
      faqs: [
        { q: "Are the scars visible?", a: "The incisions follow the natural eyelid crease or sit just below the lashes, so over time they become very discreet." },
        { q: "When can I return to my activities?", a: "Many people return to light activities within a few days. The doctor will tell you when you can exercise again." },
        { q: "Can I have upper and lower eyelids done together?", a: "Yes, both can be treated in the same procedure if your case requires it." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 3,
    slug: "otoplastia",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Corrija las orejas prominentes y llévelas a una posición más armónica con el rostro.",
      what: "La otoplastia remodela el cartílago de la oreja para acercarla a la cabeza o corregir su forma. Es una de las cirugías más agradecidas, porque con un cambio pequeño se logra mucha armonía en el rostro. La incisión se hace por detrás de la oreja, donde la cicatriz queda oculta.",
      art: {
        labels: [
          { t: "Prominente", s: "posición anterior" },
          { t: "Nueva posición", s: "más cerca de la cabeza" },
          { t: "Incisión", s: "oculta tras la oreja" },
        ],
        caption: "El cartílago se remodela para que la oreja quede más cerca de la cabeza.",
      },
      facts: [
        { i: "scar", t: "Cicatriz oculta", s: "Detrás de la oreja" },
        { i: "band", t: "Banda elástica", s: "Para dormir, las primeras semanas" },
        { i: "people", t: "Niños y adultos", s: "Desde la edad que indique la doctora" },
        { i: "follow", t: "Resultado duradero", s: "En la gran mayoría de los casos" },
      ],
      forWho: [
        "Niños, a partir de la edad que indique la doctora, y adultos con orejas separadas o prominentes.",
        "Personas con orejas de forma o tamaño diferente entre sí.",
        "Quienes se sienten incómodos con la forma de sus orejas.",
        "Personas con buena salud general.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora analiza la forma del cartílago y la posición de las orejas y le explica el resultado esperado." },
        { t: "Procedimiento", d: "A través de una incisión por detrás de la oreja se remodela el cartílago y se fija en su nueva posición. El tipo de anestesia depende de la edad y del caso." },
        { t: "Vendaje", d: "Se coloca un vendaje en la cabeza los primeros días y luego una banda elástica, sobre todo para dormir." },
        { t: "Controles", d: "Se retiran los puntos y se revisa la evolución hasta el resultado final." },
      ],
      recovery: "Las primeras noches puede haber molestias y sensibilidad, que se controlan con los medicamentos indicados. La banda elástica protege las orejas mientras cicatrizan, por el tiempo que indique la doctora. Se recomienda evitar golpes y deportes de contacto durante las primeras semanas.",
      faqs: [
        { q: "¿Desde qué edad se puede hacer?", a: "Se puede realizar en niños cuando la oreja ha alcanzado casi su tamaño adulto. La doctora le orientará según la edad y el caso." },
        { q: "¿Se ve la cicatriz?", a: "Queda por detrás de la oreja, en el pliegue con la cabeza, por lo que normalmente no se ve." },
        { q: "¿El resultado es permanente?", a: "Sí, en la gran mayoría de los casos el resultado se mantiene en el tiempo." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Correct prominent ears and bring them into a more balanced position with the face.",
      what: "Otoplasty reshapes the ear cartilage to bring the ear closer to the head or correct its shape. It is one of the most rewarding surgeries, because a small change brings a lot of harmony to the face. The incision is made behind the ear, where the scar stays hidden.",
      art: {
        labels: [
          { t: "Prominent", s: "previous position" },
          { t: "New position", s: "closer to the head" },
          { t: "Incision", s: "hidden behind the ear" },
        ],
        caption: "The cartilage is reshaped so the ear sits closer to the head.",
      },
      facts: [
        { i: "scar", t: "Hidden scar", s: "Behind the ear" },
        { i: "band", t: "Headband", s: "For sleeping, first weeks" },
        { i: "people", t: "Children and adults", s: "From the age the doctor advises" },
        { i: "follow", t: "Lasting result", s: "In the vast majority of cases" },
      ],
      forWho: [
        "Children, from the age the doctor recommends, and adults with protruding or prominent ears.",
        "People whose ears differ in shape or size.",
        "Those who feel uncomfortable with the shape of their ears.",
        "People in good general health.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor analyzes the cartilage shape and ear position and explains the expected result." },
        { t: "Procedure", d: "Through an incision behind the ear, the cartilage is reshaped and fixed in its new position. The type of anesthesia depends on age and the case." },
        { t: "Bandage", d: "A head bandage is worn for the first days, followed by an elastic headband, mainly for sleeping." },
        { t: "Follow-up", d: "Stitches are removed and progress is checked until the final result." },
      ],
      recovery: "The first nights may bring some discomfort and tenderness, controlled with the prescribed medication. The headband protects the ears while they heal, for as long as the doctor indicates. Avoid knocks and contact sports during the first weeks.",
      faqs: [
        { q: "From what age can it be done?", a: "It can be done in children once the ear has nearly reached its adult size. The doctor will advise you based on age and the case." },
        { q: "Is the scar visible?", a: "It sits behind the ear, in the fold with the head, so it is normally not visible." },
        { q: "Is the result permanent?", a: "Yes, in the vast majority of cases the result lasts over time." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 4,
    slug: "bichectomia",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Afine las mejillas y estilice el rostro retirando las bolsas de Bichat, sin cicatrices visibles.",
      what: "Las bolsas de Bichat son depósitos de grasa ubicados en la parte baja de las mejillas. Cuando son grandes, dan un aspecto de cara redonda o de mejillas muy llenas. La bichectomía retira parte de esa grasa a través de una pequeña incisión por dentro de la boca, por lo que no deja cicatrices en la piel.",
      art: {
        labels: [
          { t: "Contorno", s: "rostro más estilizado" },
          { t: "Bichat", s: "grasa de la mejilla" },
          { t: "Incisión", s: "por dentro de la boca" },
        ],
        caption: "Se reduce la grasa de las mejillas desde dentro de la boca, sin cicatrices en la piel.",
      },
      facts: [
        { i: "scar", t: "Sin cicatriz visible", s: "La incisión es dentro de la boca" },
        { i: "anest", t: "Anestesia local", s: "Procedimiento corto" },
        { i: "plan", t: "Valoración cuidadosa", s: "No todos los rostros lo necesitan" },
        { i: "follow", t: "Resultado progresivo", s: "Se afina en los meses siguientes" },
      ],
      forWho: [
        "Personas con mejillas muy llenas o rostro redondeado por las bolsas de Bichat.",
        "Quienes desean un rostro más estilizado y pómulos más marcados.",
        "Personas que se muerden con frecuencia la parte interna de las mejillas.",
        "Pacientes en los que la doctora confirme que la grasa de Bichat es la causa del volumen (no todos los rostros redondos lo son).",
      ],
      steps: [
        { t: "Valoración", d: "La doctora analiza la estructura de su rostro para confirmar si la bichectomía le favorece, pensando también en cómo envejecerá su cara." },
        { t: "Procedimiento", d: "Con anestesia local, se hace una pequeña incisión dentro de la boca y se retira la cantidad adecuada de grasa. Es un procedimiento corto." },
        { t: "Cuidados", d: "Se indica dieta blanda, higiene oral cuidadosa y los medicamentos necesarios." },
        { t: "Controles", d: "Se revisa la cicatrización de la boca y la evolución del contorno." },
      ],
      recovery: "La inflamación de las mejillas es normal durante los primeros días o semanas. Se recomienda dieta blanda y enjuagues según las indicaciones. El rostro se va afinando de forma progresiva y el resultado final se aprecia en los meses siguientes.",
      faqs: [
        { q: "¿Deja cicatriz?", a: "No en la piel. La incisión es por dentro de la boca y cicatriza sin marcas visibles." },
        { q: "¿Es para todo el mundo?", a: "No. En algunos rostros retirar esta grasa no es conveniente. Por eso la doctora lo evalúa con cuidado en la valoración." },
        { q: "¿Cuándo veré el resultado?", a: "El cambio es progresivo: se nota en las primeras semanas y el contorno final aparece en los meses siguientes." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Slim the cheeks and refine the face by removing the buccal fat pads, with no visible scars.",
      what: "The buccal fat pads (Bichat's fat pads) are fat deposits in the lower cheeks. When they are large, they give a round face or very full cheeks. Buccal fat removal takes out part of this fat through a small incision inside the mouth, so it leaves no scars on the skin.",
      art: {
        labels: [
          { t: "Contour", s: "slimmer face" },
          { t: "Buccal fat", s: "cheek fat pad" },
          { t: "Incision", s: "inside the mouth" },
        ],
        caption: "Cheek fat is reduced from inside the mouth, with no scars on the skin.",
      },
      facts: [
        { i: "scar", t: "No visible scar", s: "The incision is inside the mouth" },
        { i: "anest", t: "Local anesthesia", s: "A short procedure" },
        { i: "plan", t: "Careful assessment", s: "Not every face needs it" },
        { i: "follow", t: "Gradual result", s: "Refines over the following months" },
      ],
      forWho: [
        "People with very full cheeks or a round face due to buccal fat.",
        "Those who want a more sculpted face and more defined cheekbones.",
        "People who often bite the inside of their cheeks.",
        "Patients in whom the doctor confirms that buccal fat is the cause of the volume (not every round face is).",
      ],
      steps: [
        { t: "Assessment", d: "The doctor analyzes your facial structure to confirm whether buccal fat removal suits you, also considering how your face will age." },
        { t: "Procedure", d: "Under local anesthesia, a small incision is made inside the mouth and the right amount of fat is removed. It is a short procedure." },
        { t: "Care", d: "A soft diet, careful oral hygiene and the necessary medication are prescribed." },
        { t: "Follow-up", d: "Healing inside the mouth and the evolution of the contour are checked." },
      ],
      recovery: "Cheek swelling is normal during the first days or weeks. A soft diet and rinses as instructed are recommended. The face slims gradually and the final result shows over the following months.",
      faqs: [
        { q: "Does it leave a scar?", a: "Not on the skin. The incision is inside the mouth and heals without visible marks." },
        { q: "Is it for everyone?", a: "No. For some faces removing this fat is not advisable, which is why the doctor assesses it carefully." },
        { q: "When will I see the result?", a: "The change is gradual: noticeable in the first weeks, with the final contour over the following months." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 5,
    slug: "lifting-facial-cuello",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Trate la flacidez del rostro y el cuello reposicionando los tejidos, con un resultado natural.",
      what: "Con el paso del tiempo, la piel y los tejidos de la cara pierden firmeza y descienden: se marcan los surcos, se pierde la línea de la mandíbula y aparece flacidez en el cuello. El lifting facial y de cuello reposiciona los tejidos profundos y retira el exceso de piel. Las incisiones se ubican alrededor de la oreja y en la línea del cabello, donde quedan disimuladas. El objetivo es verse descansado y más joven, no diferente.",
      art: {
        labels: [
          { t: "Reposición", s: "tejidos hacia arriba" },
          { t: "Incisión", s: "alrededor de la oreja" },
          { t: "Cuello", s: "contorno más firme" },
        ],
        caption: "Los tejidos se reposicionan hacia arriba y atrás para un resultado natural.",
      },
      facts: [
        { i: "plan", t: "Plan a medida", s: "Rostro, cuello o ambos" },
        { i: "scar", t: "Incisiones ocultas", s: "Alrededor de la oreja y el cabello" },
        { i: "time", t: "Recuperación", s: "Vida social en unas semanas" },
        { i: "follow", t: "Resultado natural", s: "Descansado, no diferente" },
      ],
      forWho: [
        "Personas con flacidez moderada o marcada en el rostro y el cuello.",
        "Quienes han perdido la definición de la línea de la mandíbula.",
        "Pacientes en los que los tratamientos sin cirugía ya no dan el resultado deseado.",
        "Personas con buena salud general. Se recomienda no fumar antes ni después de la cirugía.",
      ],
      steps: [
        { t: "Valoración y estudios", d: "La doctora evalúa su rostro, su piel y su salud general, y solicita los estudios necesarios para operar con seguridad." },
        { t: "Planificación", d: "Se define qué zonas tratar (rostro, cuello o ambas) y si conviene combinarlo con otros procedimientos, como blefaroplastia o lipopapada." },
        { t: "Cirugía", d: "Se reposicionan los tejidos y se retira la piel sobrante. El tipo de anestesia se decide según el caso." },
        { t: "Recuperación y controles", d: "Se colocan vendajes y se dan las indicaciones de cuidado. La doctora revisa la evolución en cada control." },
      ],
      recovery: "Es la cirugía de este grupo con la recuperación más larga. Es normal la inflamación, los moretones y la sensación de tirantez durante las primeras semanas. Se recomienda reposo relativo, dormir con la cabeza elevada y seguir al pie de la letra las indicaciones. La mayoría de las personas se siente lista para su vida social en unas semanas, y el resultado se sigue afinando durante los meses siguientes.",
      faqs: [
        { q: "¿Voy a quedar con la cara estirada?", a: "No es el objetivo. La técnica reposiciona los tejidos profundos en lugar de solo tensar la piel, para lograr un resultado natural." },
        { q: "¿Cuánto dura el resultado?", a: "El lifting no detiene el envejecimiento, pero el rostro sigue viéndose más joven de lo que se vería sin la cirugía durante muchos años." },
        { q: "¿Necesito quedarme varios días si vengo de fuera?", a: "Sí, conviene planificar su estadía para asistir a los primeros controles. El centro le ayuda a coordinar las fechas." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la valoración, el centro le confirmará el costo de su tratamiento." },
      ],
    },
    en: {
      summary: "Treat sagging of the face and neck by repositioning the tissues, with a natural result.",
      what: "Over time, the skin and tissues of the face lose firmness and descend: folds deepen, the jawline loses definition and the neck sags. A face and neck lift repositions the deeper tissues and removes excess skin. The incisions are placed around the ear and along the hairline, where they stay hidden. The goal is to look rested and younger, not different.",
      art: {
        labels: [
          { t: "Lift", s: "tissues moved upward" },
          { t: "Incision", s: "around the ear" },
          { t: "Neck", s: "firmer contour" },
        ],
        caption: "The tissues are repositioned upward and back for a natural result.",
      },
      facts: [
        { i: "plan", t: "Tailored plan", s: "Face, neck or both" },
        { i: "scar", t: "Hidden incisions", s: "Around the ear and hairline" },
        { i: "time", t: "Recovery", s: "Social life within a few weeks" },
        { i: "follow", t: "Natural result", s: "Rested, not different" },
      ],
      forWho: [
        "People with moderate or marked sagging of the face and neck.",
        "Those who have lost definition along the jawline.",
        "Patients for whom non-surgical treatments no longer give the desired result.",
        "People in good general health. Not smoking before and after surgery is recommended.",
      ],
      steps: [
        { t: "Assessment and tests", d: "The doctor evaluates your face, skin and general health, and orders the tests needed to operate safely." },
        { t: "Planning", d: "Together you define which areas to treat (face, neck or both) and whether to combine it with other procedures, such as blepharoplasty or double-chin liposuction." },
        { t: "Surgery", d: "The tissues are repositioned and excess skin is removed. The type of anesthesia is decided case by case." },
        { t: "Recovery and follow-up", d: "Bandages are placed and care instructions given. The doctor checks your progress at each follow-up." },
      ],
      recovery: "This is the procedure in this group with the longest recovery. Swelling, bruising and a feeling of tightness during the first weeks are normal. Relative rest, sleeping with your head elevated and following the instructions closely are recommended. Most people feel ready for social life within a few weeks, and the result keeps refining over the following months.",
      faqs: [
        { q: "Will my face look pulled?", a: "That is not the goal. The technique repositions the deeper tissues instead of just tightening the skin, for a natural result." },
        { q: "How long does the result last?", a: "A lift does not stop aging, but your face keeps looking younger than it would have without surgery for many years." },
        { q: "Do I need to stay several days if I'm visiting?", a: "Yes, it is best to plan your stay so you can attend the first follow-ups. The clinic will help you coordinate the dates." },
        { q: "How much does it cost?", a: "It depends on each case. After the assessment, the clinic will confirm the cost of your treatment." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 6,
    slug: "lobuloplastia",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Repare el lóbulo de la oreja rasgado o estirado por el uso de aretes, en un procedimiento corto.",
      what: "El uso de aretes pesados, un tirón accidental o las expansiones pueden rasgar o alargar el agujero del lóbulo. La lobuloplastia cierra y remodela el lóbulo para devolverle una forma natural. Es un procedimiento sencillo, con anestesia local, que se realiza en el consultorio.",
      art: {
        labels: [
          { t: "Perforación", s: "lejos de la cicatriz" },
          { t: "Cierre", s: "con puntos finos" },
          { t: "Lóbulo rasgado", s: "por aretes pesados" },
        ],
        caption: "El lóbulo se cierra con puntos finos y, al cicatrizar, se puede volver a perforar.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "En el consultorio" },
        { i: "home", t: "Mismo día", s: "Vuelve a sus actividades" },
        { i: "time", t: "Puntos", s: "Se retiran en una semana" },
        { i: "tag", t: "RD$10,000", s: "Por oreja" },
      ],
      forWho: [
        "Personas con el lóbulo rasgado total o parcialmente.",
        "Quienes tienen el agujero del arete muy alargado.",
        "Personas que usaron expansiones y desean cerrar el lóbulo.",
        "Quienes desean volver a usar aretes (se puede volver a perforar después de cicatrizar).",
      ],
      steps: [
        { t: "Valoración", d: "La doctora revisa el lóbulo y le explica cómo quedará. Si ya le indicaron el procedimiento, puede agendarlo directamente." },
        { t: "Procedimiento", d: "Con anestesia local, se cierra el lóbulo con puntos finos. Dura poco tiempo y se va a casa el mismo día." },
        { t: "Retiro de puntos", d: "Los puntos se retiran alrededor de una semana después." },
        { t: "Nueva perforación", d: "Si desea usar aretes, la doctora le indicará cuándo y dónde volver a perforar, fuera de la cicatriz." },
      ],
      recovery: "La recuperación es rápida. Puede volver a sus actividades el mismo día. Se recomienda mantener la herida limpia, no usar aretes en esa oreja hasta que la doctora lo indique y evitar tirones o golpes en la zona.",
      price: {
        lines: [{ label: "Por oreja", value: "RD$10,000" }],
        note: "Si ya le indicaron el procedimiento, puede agendarlo directamente: no paga consulta.",
      },
      faqs: [
        { q: "¿Duele?", a: "Se aplica anestesia local, así que no debe sentir dolor durante el procedimiento. Después puede haber una molestia leve." },
        { q: "¿Puedo volver a usar aretes?", a: "Sí. Una vez cicatrizado, se puede perforar de nuevo en una zona distinta a la cicatriz. La doctora le indicará el momento adecuado." },
        { q: "¿Se pueden hacer las dos orejas el mismo día?", a: "Sí. El costo es por oreja." },
      ],
    },
    en: {
      summary: "Repair an earlobe torn or stretched by earrings in a short procedure.",
      what: "Heavy earrings, an accidental tug or ear gauges can tear or stretch the earlobe hole. Lobuloplasty closes and reshapes the earlobe to restore a natural shape. It is a simple procedure, under local anesthesia, done in the office.",
      art: {
        labels: [
          { t: "Piercing", s: "away from the scar" },
          { t: "Closure", s: "with fine stitches" },
          { t: "Torn earlobe", s: "from heavy earrings" },
        ],
        caption: "The earlobe is closed with fine stitches and, once healed, can be pierced again.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "In the office" },
        { i: "home", t: "Same day", s: "Back to your activities" },
        { i: "time", t: "Stitches", s: "Removed in about a week" },
        { i: "tag", t: "RD$10,000", s: "Per ear" },
      ],
      forWho: [
        "People with a fully or partially torn earlobe.",
        "Those with a very stretched earring hole.",
        "People who used ear gauges and want to close the earlobe.",
        "Those who want to wear earrings again (the ear can be re-pierced after healing).",
      ],
      steps: [
        { t: "Assessment", d: "The doctor examines the earlobe and explains how it will look. If the procedure has already been recommended, you can book it directly." },
        { t: "Procedure", d: "Under local anesthesia, the earlobe is closed with fine stitches. It is quick and you go home the same day." },
        { t: "Stitch removal", d: "Stitches are removed about a week later." },
        { t: "New piercing", d: "If you want to wear earrings, the doctor will tell you when and where to re-pierce, away from the scar." },
      ],
      recovery: "Recovery is quick. You can return to your activities the same day. Keep the wound clean, do not wear earrings on that ear until the doctor says so, and avoid pulling or knocking the area.",
      price: {
        lines: [{ label: "Per ear", value: "RD$10,000" }],
        note: "If the procedure has already been recommended, you can book it directly: no consultation fee.",
      },
      faqs: [
        { q: "Does it hurt?", a: "Local anesthesia is applied, so you should not feel pain during the procedure. Mild discomfort afterwards is possible." },
        { q: "Can I wear earrings again?", a: "Yes. Once healed, the ear can be pierced again in a spot away from the scar. The doctor will tell you when." },
        { q: "Can both ears be done on the same day?", a: "Yes. The price is per ear." },
      ],
    },
  },
  {
    service: "cirugia-estetica-facial",
    index: 7,
    slug: "eliminacion-verrugas",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Retire verrugas y pequeñas lesiones benignas de la piel del rostro y el cuerpo de forma segura.",
      what: "Las verrugas y otras lesiones benignas de la piel, como los fibromas o \"acrocordones\", pueden ser molestas, rozar con la ropa o simplemente no gustar. La doctora las retira con la técnica más adecuada para cada lesión, cuidando que la piel cicatrice de la forma más discreta posible. Se cobra por área, de modo que una sola sesión puede incluir varias lesiones pequeñas agrupadas.",
      art: {
        labels: [
          { t: "Un área", s: "lesiones agrupadas" },
          { t: "Lesiones", s: "verrugas o fibromas" },
          { t: "Piel lisa", s: "la marca se aclara" },
        ],
        caption: "Las lesiones de un área se retiran en una sola sesión y la piel cicatriza de forma discreta.",
      },
      facts: [
        { i: "anest", t: "Anestesia local", s: "Procedimiento rápido" },
        { i: "tag", t: "RD$8,000", s: "Por área" },
        { i: "time", t: "1 a 2 semanas", s: "Para cicatrizar" },
        { i: "plan", t: "Estudio si hace falta", s: "La lesión se envía a análisis" },
      ],
      forWho: [
        "Personas con verrugas en el rostro, el cuello o el cuerpo.",
        "Quienes tienen pequeñas lesiones agrupadas, por ejemplo en el cuello o las axilas.",
        "Lesiones que se irritan, sangran al rozar o molestan con la ropa o las joyas.",
        "Cualquier lesión que haya cambiado de forma, color o tamaño debe valorarse antes de retirarla.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora examina las lesiones, confirma que son aptas para retirarse y define la técnica. Si alguna lo requiere, se envía a estudio." },
        { t: "Procedimiento", d: "Con anestesia local, se retiran las lesiones del área tratada. Es rápido y se va a casa el mismo día." },
        { t: "Cuidados", d: "Se indican los cuidados de la piel y la protección solar para una buena cicatrización." },
        { t: "Control", d: "La doctora revisa la zona y la cicatrización." },
      ],
      recovery: "La piel suele cicatrizar en una a dos semanas, según el tamaño y la zona. Se recomienda mantener la zona limpia, no retirar las costras y usar protector solar para que la marca quede lo más discreta posible.",
      price: {
        lines: [{ label: "Por área", value: "RD$8,000" }],
        note: "Un área es una zona del rostro o del cuerpo (por ejemplo, el cuello). La doctora confirma las áreas en la valoración.",
      },
      faqs: [
        { q: "¿Qué cuenta como un área?", a: "Una zona concreta del rostro o del cuerpo, como el cuello, una mejilla o una axila. Si tiene varias lesiones pequeñas en esa zona, se tratan juntas." },
        { q: "¿Pueden volver a salir?", a: "Algunas verrugas son causadas por un virus y pueden reaparecer. La doctora le explicará cómo reducir ese riesgo." },
        { q: "¿Queda marca?", a: "Puede quedar una marca pequeña que se va aclarando con el tiempo, sobre todo si se protege del sol." },
      ],
    },
    en: {
      summary: "Safely remove warts and small benign skin lesions from the face and body.",
      what: "Warts and other benign skin lesions, such as skin tags, can be bothersome, rub against clothing or simply be unwanted. The doctor removes them with the most suitable technique for each lesion, taking care that the skin heals as discreetly as possible. The price is per area, so one session can include several small clustered lesions.",
      art: {
        labels: [
          { t: "One area", s: "clustered lesions" },
          { t: "Lesions", s: "warts or skin tags" },
          { t: "Smooth skin", s: "the mark fades" },
        ],
        caption: "Lesions in one area are removed in a single session and the skin heals discreetly.",
      },
      facts: [
        { i: "anest", t: "Local anesthesia", s: "A quick procedure" },
        { i: "tag", t: "RD$8,000", s: "Per area" },
        { i: "time", t: "1 to 2 weeks", s: "To heal" },
        { i: "plan", t: "Analysis if needed", s: "The lesion is sent to the lab" },
      ],
      forWho: [
        "People with warts on the face, neck or body.",
        "Those with small clustered lesions, for example on the neck or underarms.",
        "Lesions that get irritated, bleed when rubbed or bother you with clothing or jewelry.",
        "Any lesion that has changed in shape, color or size should be assessed before removal.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor examines the lesions, confirms they are suitable for removal and chooses the technique. If any needs it, it is sent for analysis." },
        { t: "Procedure", d: "Under local anesthesia, the lesions in the treated area are removed. It is quick and you go home the same day." },
        { t: "Care", d: "Skin care and sun protection instructions are given for good healing." },
        { t: "Follow-up", d: "The doctor checks the area and the healing." },
      ],
      recovery: "The skin usually heals in one to two weeks, depending on size and area. Keep the area clean, do not pick at scabs and use sunscreen so the mark stays as discreet as possible.",
      price: {
        lines: [{ label: "Per area", value: "RD$8,000" }],
        note: "An area is one zone of the face or body (for example, the neck). The doctor confirms the areas at the assessment.",
      },
      faqs: [
        { q: "What counts as an area?", a: "One specific zone of the face or body, such as the neck, a cheek or an underarm. Several small lesions in that zone are treated together." },
        { q: "Can they come back?", a: "Some warts are caused by a virus and can reappear. The doctor will explain how to reduce that risk." },
        { q: "Will there be a mark?", a: "There may be a small mark that fades over time, especially if protected from the sun." },
      ],
    },
  },
  // ───────── MEDICINA ESTÉTICA ─────────
  {
    service: "medicina-estetica",
    index: 0,
    slug: "botox",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Suavice las líneas de expresión de la frente, el entrecejo y el contorno de los ojos, y levante las comisuras de la boca, con un resultado natural.",
      what: "La toxina botulínica, conocida como bótox, relaja de forma temporal los músculos que forman las arrugas de expresión al gesticular. Así la piel se ve más lisa y el rostro más descansado, sin perder la expresión. En la parte baja del rostro, relaja el músculo que tira de las comisuras de la boca hacia abajo: las comisuras dejan de caer y el rostro deja de verse triste o cansado. También suaviza las líneas finas alrededor de los labios. Se aplica con microinyecciones en puntos precisos, en una sesión corta y sin cirugía.",
      art: {
        labels: [
          { t: "Frente", s: "líneas horizontales" },
          { t: "Entrecejo", s: "líneas verticales" },
          { t: "Patas de gallo", s: "contorno de los ojos" },
          { t: "Comisuras", s: "expresión menos triste" },
        ],
        caption: "Microinyecciones en puntos precisos relajan el músculo: las líneas se suavizan y las comisuras dejan de caer.",
      },
      facts: [
        { i: "tag", t: "RD$28,000", s: "Incluye el retoque" },
        { i: "time", t: "Efecto en días", s: "Completo a las 2 semanas" },
        { i: "home", t: "Sin reposo", s: "Vuelve a sus actividades" },
        { i: "follow", t: "3 a 4 meses", s: "Duración habitual del efecto" },
      ],
      forWho: [
        "Personas con líneas en la frente, el entrecejo o las \"patas de gallo\".",
        "Comisuras de la boca caídas que dan una expresión triste o cansada, y líneas finas alrededor de los labios.",
        "Quienes desean prevenir que las líneas de expresión se marquen más.",
        "Quienes buscan un resultado natural, sin perder la expresión del rostro.",
        "No se recomienda durante el embarazo o la lactancia (se revisa en la valoración).",
      ],
      steps: [
        { t: "Valoración", d: "La doctora observa cómo se mueve su rostro al gesticular y define los puntos y la dosis para su caso." },
        { t: "Aplicación", d: "Con agujas muy finas se aplican pequeñas cantidades en los músculos seleccionados. Toma pocos minutos." },
        { t: "Efecto", d: "El resultado empieza a notarse a los pocos días y se completa alrededor de las dos semanas." },
        { t: "Retoque", d: "A las 2 semanas se revisa el resultado y, si hace falta, se hace un retoque. Está incluido en el precio." },
      ],
      recovery: "Puede volver a sus actividades enseguida. Pueden aparecer pequeñas marcas en los puntos de aplicación, que desaparecen en horas. Las primeras horas se recomienda no acostarse, no masajear la zona y evitar el ejercicio intenso, según las indicaciones de la doctora.",
      price: {
        lines: [{ label: "Tratamiento con bótox", value: "RD$28,000" }],
        note: "Incluye la aplicación y un retoque a las 2 semanas. El precio es el mismo si se tratan también las comisuras y el contorno de los labios.",
      },
      faqs: [
        { q: "¿Voy a quedar con la cara congelada?", a: "No es el objetivo. La dosis se ajusta para suavizar las líneas manteniendo una expresión natural." },
        { q: "¿Cuánto dura el efecto?", a: "Suele durar entre 3 y 4 meses, aunque varía según cada persona. Con aplicaciones regulares, muchas personas notan que el efecto se mantiene más tiempo." },
        { q: "¿Duele?", a: "Las agujas son muy finas y la molestia es mínima. La aplicación dura pocos minutos." },
        { q: "¿El bótox sirve para los surcos que van de la nariz a la boca?", a: "Esos surcos se deben sobre todo a la pérdida de volumen y se tratan con ácido hialurónico. El bótox en las comisuras puede ayudar como complemento. La doctora le indicará la mejor combinación para su caso." },
      ],
    },
    en: {
      summary: "Soften expression lines on the forehead, between the brows and around the eyes, and lift the corners of the mouth, with a natural result.",
      what: "Botulinum toxin, known as Botox, temporarily relaxes the muscles that create expression lines when you make facial movements. The skin looks smoother and the face more rested, without losing your expression. In the lower face, it relaxes the muscle that pulls the corners of the mouth down: the corners stop drooping and the face no longer looks sad or tired. It also softens fine lines around the lips. It is applied with micro-injections at precise points, in a short session with no surgery.",
      art: {
        labels: [
          { t: "Forehead", s: "horizontal lines" },
          { t: "Frown lines", s: "between the brows" },
          { t: "Crow's feet", s: "around the eyes" },
          { t: "Mouth corners", s: "a less sad expression" },
        ],
        caption: "Micro-injections at precise points relax the muscle: lines soften and the mouth corners stop drooping.",
      },
      facts: [
        { i: "tag", t: "RD$28,000", s: "Touch-up included" },
        { i: "time", t: "Effect in days", s: "Complete at 2 weeks" },
        { i: "home", t: "No downtime", s: "Back to your activities" },
        { i: "follow", t: "3 to 4 months", s: "Usual duration of the effect" },
      ],
      forWho: [
        "People with lines on the forehead, between the brows or crow's feet.",
        "Drooping mouth corners that give a sad or tired look, and fine lines around the lips.",
        "Those who want to prevent expression lines from deepening.",
        "Those looking for a natural result that keeps their expression.",
        "Not recommended during pregnancy or breastfeeding (checked at the assessment).",
      ],
      steps: [
        { t: "Assessment", d: "The doctor observes how your face moves and defines the points and dose for your case." },
        { t: "Application", d: "Small amounts are applied to the selected muscles with very fine needles. It takes a few minutes." },
        { t: "Effect", d: "The result starts to show within a few days and is complete at about two weeks." },
        { t: "Touch-up", d: "At 2 weeks the result is reviewed and, if needed, touched up. This is included in the price." },
      ],
      recovery: "You can return to your activities right away. Small marks may appear at the injection points and disappear within hours. For the first hours, avoid lying down, massaging the area and intense exercise, as the doctor indicates.",
      price: {
        lines: [{ label: "Botox treatment", value: "RD$28,000" }],
        note: "Includes the application and a touch-up after 2 weeks. The price is the same if the mouth corners and lip lines are also treated.",
      },
      faqs: [
        { q: "Will my face look frozen?", a: "That is not the goal. The dose is adjusted to soften lines while keeping a natural expression." },
        { q: "How long does it last?", a: "It usually lasts 3 to 4 months, though it varies by person. With regular treatments, many people find the effect lasts longer." },
        { q: "Does it hurt?", a: "The needles are very fine and discomfort is minimal. The application takes a few minutes." },
        { q: "Does Botox help the folds from the nose to the mouth?", a: "Those folds are mainly caused by volume loss and are treated with hyaluronic acid. Botox in the mouth corners can help as a complement. The doctor will recommend the best combination for your case." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 1,
    slug: "armonizacion-facial",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Un plan que combina tratamientos para equilibrar las proporciones de su rostro, sin cirugía.",
      what: "La armonización facial no es un solo tratamiento, sino un plan. La doctora analiza las proporciones de su rostro (frente, pómulos, nariz, labios, mentón y mandíbula) y combina técnicas como el bótox, el ácido hialurónico y los hilos para equilibrarlas. Por su formación en cirugía maxilofacial, conoce en detalle la estructura del rostro, lo que permite planificar cambios sutiles y naturales.",
      art: {
        labels: [
          { t: "Proporciones", s: "tercios del rostro" },
          { t: "Pómulos", s: "volumen y soporte" },
          { t: "Mentón", s: "perfil equilibrado" },
        ],
        caption: "Se analizan las proporciones del rostro y se combinan tratamientos para equilibrarlas.",
      },
      facts: [
        { i: "plan", t: "Plan a medida", s: "Según sus proporciones" },
        { i: "follow", t: "Por etapas", s: "En una o varias citas" },
        { i: "home", t: "Sin cirugía", s: "Vuelve a sus actividades" },
        { i: "sparkle", t: "Resultado natural", s: "Se ve como usted, más armónico" },
      ],
      forWho: [
        "Personas que sienten que algún rasgo no está en equilibrio con el resto del rostro.",
        "Quienes desean un cambio global y natural, no un solo detalle.",
        "Quienes prefieren tratamientos sin cirugía y con recuperación rápida.",
        "No se recomienda durante el embarazo o la lactancia.",
      ],
      steps: [
        { t: "Análisis del rostro", d: "La doctora estudia sus proporciones y escucha lo que usted desea mejorar." },
        { t: "Plan personalizado", d: "Se define qué tratamientos combinar, en qué orden y en cuántas sesiones." },
        { t: "Tratamiento", d: "Se aplican los tratamientos del plan, en una o varias citas según el caso." },
        { t: "Revisión", d: "Se evalúa el resultado y se hacen los ajustes necesarios." },
      ],
      recovery: "Depende de los tratamientos que incluya el plan. En general, puede volver a sus actividades el mismo día. Es normal algo de inflamación o pequeños moretones durante unos días.",
      faqs: [
        { q: "¿Cuánto cuesta?", a: "Depende de los tratamientos que incluya su plan. Después de la valoración, el centro le confirmará el costo." },
        { q: "¿Voy a verme diferente?", a: "La idea es verse como usted, pero más armónico y descansado. Los cambios se planifican para que sean naturales." },
        { q: "¿Se hace todo en una sola cita?", a: "A veces sí, pero muchas veces conviene repartirlo en varias citas para ir viendo la evolución." },
      ],
    },
    en: {
      summary: "A plan that combines treatments to balance your facial proportions, without surgery.",
      what: "Facial harmonization is not a single treatment but a plan. The doctor analyzes your facial proportions (forehead, cheekbones, nose, lips, chin and jaw) and combines techniques such as Botox, hyaluronic acid and threads to balance them. Her training in maxillofacial surgery gives her detailed knowledge of the facial structure, which allows subtle, natural changes to be planned.",
      art: {
        labels: [
          { t: "Proportions", s: "facial thirds" },
          { t: "Cheekbones", s: "volume and support" },
          { t: "Chin", s: "balanced profile" },
        ],
        caption: "Your facial proportions are analyzed and treatments are combined to balance them.",
      },
      facts: [
        { i: "plan", t: "Tailored plan", s: "Based on your proportions" },
        { i: "follow", t: "In stages", s: "One or several visits" },
        { i: "home", t: "No surgery", s: "Back to your activities" },
        { i: "sparkle", t: "Natural result", s: "You, more balanced" },
      ],
      forWho: [
        "People who feel a feature is out of balance with the rest of the face.",
        "Those who want an overall, natural change rather than a single detail.",
        "Those who prefer non-surgical treatments with quick recovery.",
        "Not recommended during pregnancy or breastfeeding.",
      ],
      steps: [
        { t: "Facial analysis", d: "The doctor studies your proportions and listens to what you want to improve." },
        { t: "Personalized plan", d: "Together you define which treatments to combine, in what order and over how many sessions." },
        { t: "Treatment", d: "The treatments in the plan are applied, in one or several visits depending on the case." },
        { t: "Review", d: "The result is evaluated and any necessary adjustments are made." },
      ],
      recovery: "It depends on the treatments in the plan. In general, you can return to your activities the same day. Some swelling or small bruises for a few days are normal.",
      faqs: [
        { q: "How much does it cost?", a: "It depends on the treatments in your plan. After the assessment, the clinic will confirm the cost." },
        { q: "Will I look different?", a: "The idea is to look like yourself, but more balanced and rested. Changes are planned to be natural." },
        { q: "Is everything done in one visit?", a: "Sometimes, but it is often better to spread it over several visits to follow the progress." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 2,
    slug: "acido-hialuronico-rellenos",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Devuelva volumen e hidratación a labios, pómulos, mentón y surcos con un resultado inmediato y natural.",
      what: "El ácido hialurónico es una sustancia que el cuerpo produce de forma natural y que retiene agua en la piel. Con los años disminuye, y el rostro pierde volumen. Los rellenos de ácido hialurónico se aplican en zonas concretas para devolver volumen, perfilar o suavizar surcos. El producto que usamos incluye anestésico (lidocaína) para que la aplicación sea más cómoda. El precio es por área tratada.",
      art: {
        labels: [
          { t: "Surcos", s: "se suavizan" },
          { t: "Labios", s: "volumen natural" },
          { t: "Hialurónico", s: "con anestésico incluido" },
        ],
        caption: "El ácido hialurónico devuelve volumen e hidratación donde el rostro lo ha perdido.",
      },
      facts: [
        { i: "tag", t: "RD$30,000", s: "Por área" },
        { i: "sparkle", t: "Resultado inmediato", s: "Se ve al terminar" },
        { i: "anest", t: "Con lidocaína", s: "Aplicación más cómoda" },
        { i: "plan", t: "Varias áreas", s: "Labios, pómulos, surcos y más" },
      ],
      forWho: [
        "Pómulos que han perdido volumen.",
        "Labios que desea perfilar o hidratar.",
        "Surcos nasogenianos (de la nariz a la boca) y líneas de marioneta.",
        "Perfilamiento de la mandíbula y ojeras hundidas.",
        "No se recomienda durante el embarazo o la lactancia.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora analiza su rostro y define en qué áreas y con qué cantidad conviene trabajar." },
        { t: "Preparación", d: "Se limpia la zona y, si hace falta, se aplica crema anestésica." },
        { t: "Aplicación", d: "Con aguja fina o cánula se aplica el producto en las áreas elegidas, modelando el resultado." },
        { t: "Revisión", d: "En el control se revisa el resultado una vez que baja la inflamación." },
      ],
      recovery: "El resultado se ve de inmediato, aunque las primeras horas o días puede haber algo de inflamación o pequeños moretones. Se recomienda evitar el ejercicio intenso, el calor fuerte y los masajes en la zona durante los primeros días.",
      price: {
        lines: [{ label: "Por área", value: "RD$30,000" }],
        note: "Áreas: pómulos, labios, perfilamiento mandibular, ojeras, surcos nasogenianos y líneas de marioneta. Puede tratar varias.",
      },
      faqs: [
        { q: "¿Cuánto dura el relleno?", a: "Depende del área y de cada persona. En general, el resultado se mantiene varios meses y se va absorbiendo de forma natural." },
        { q: "¿Se ve natural?", a: "Sí. La cantidad se ajusta a sus proporciones para lograr un resultado armónico, sin exagerar." },
        { q: "¿Qué cuenta como un área?", a: "Cada zona de la lista es un área: por ejemplo, labios o pómulos. Si trata dos zonas, son dos áreas." },
      ],
    },
    en: {
      summary: "Restore volume and hydration to lips, cheeks, chin and folds with an immediate, natural result.",
      what: "Hyaluronic acid is a substance the body produces naturally that holds water in the skin. It decreases with age, and the face loses volume. Hyaluronic acid fillers are applied to specific areas to restore volume, contour or soften folds. The product we use contains an anesthetic (lidocaine) for a more comfortable application. The price is per area treated.",
      art: {
        labels: [
          { t: "Folds", s: "softened" },
          { t: "Lips", s: "natural volume" },
          { t: "Hyaluronic", s: "with anesthetic" },
        ],
        caption: "Hyaluronic acid restores volume and hydration where the face has lost it.",
      },
      facts: [
        { i: "tag", t: "RD$30,000", s: "Per area" },
        { i: "sparkle", t: "Immediate result", s: "Visible right away" },
        { i: "anest", t: "With lidocaine", s: "A more comfortable application" },
        { i: "plan", t: "Several areas", s: "Lips, cheeks, folds and more" },
      ],
      forWho: [
        "Cheekbones that have lost volume.",
        "Lips you want to contour or hydrate.",
        "Nasolabial folds (nose to mouth) and marionette lines.",
        "Jawline contouring and hollow under-eyes.",
        "Not recommended during pregnancy or breastfeeding.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor analyzes your face and defines which areas to treat and how much product to use." },
        { t: "Preparation", d: "The area is cleaned and, if needed, numbing cream is applied." },
        { t: "Application", d: "The product is applied with a fine needle or cannula to the chosen areas, shaping the result." },
        { t: "Review", d: "At the follow-up, the result is checked once the swelling has gone down." },
      ],
      recovery: "The result is visible right away, though there may be some swelling or small bruises in the first hours or days. Avoid intense exercise, strong heat and massaging the area for the first days.",
      price: {
        lines: [{ label: "Per area", value: "RD$30,000" }],
        note: "Areas: cheekbones, lips, jawline contouring, under-eyes, nasolabial folds and marionette lines. You can treat several.",
      },
      faqs: [
        { q: "How long does a filler last?", a: "It depends on the area and the person. In general, the result lasts several months and is gradually absorbed naturally." },
        { q: "Does it look natural?", a: "Yes. The amount is adjusted to your proportions for a balanced result, without overdoing it." },
        { q: "What counts as an area?", a: "Each zone on the list is one area, for example lips or cheekbones. Two zones are two areas." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 3,
    slug: "rejuvenecimiento-facial",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Protocolos para mejorar la textura, la firmeza y la luminosidad de la piel, adaptados a su tipo de piel.",
      what: "Con el tiempo, el sol y el estrés, la piel pierde luminosidad, firmeza y uniformidad. El rejuvenecimiento facial reúne tratamientos que trabajan la calidad de la piel desde distintos ángulos. La doctora diseña el protocolo según su tipo de piel y lo que desea mejorar, y lo complementa con productos profesionales para el cuidado en casa.",
      art: {
        labels: [
          { t: "Textura", s: "más uniforme" },
          { t: "Luminosidad", s: "brillo natural" },
          { t: "Firmeza", s: "líneas finas suavizadas" },
        ],
        caption: "Un protocolo a medida mejora la textura, la firmeza y la luminosidad de la piel.",
      },
      facts: [
        { i: "plan", t: "Protocolo a medida", s: "Según su tipo de piel" },
        { i: "time", t: "Por sesiones", s: "La doctora indica la frecuencia" },
        { i: "home", t: "Sin reposo", s: "Vuelve a sus actividades" },
        { i: "sun", t: "Protector solar", s: "Todos los días" },
      ],
      forWho: [
        "Personas con piel opaca, cansada o con textura irregular.",
        "Quienes notan pérdida de firmeza o líneas finas.",
        "Quienes desean mantener su piel cuidada de forma regular.",
        "Como complemento de otros tratamientos, como el bótox o los rellenos.",
      ],
      steps: [
        { t: "Valoración de la piel", d: "La doctora evalúa su tipo de piel, sus necesidades y sus hábitos de cuidado." },
        { t: "Protocolo personalizado", d: "Se define qué tratamientos incluir y con qué frecuencia." },
        { t: "Sesiones", d: "Se realizan las sesiones del protocolo en el centro." },
        { t: "Cuidado en casa", d: "Se recomiendan los productos adecuados para mantener y potenciar el resultado." },
      ],
      recovery: "En la mayoría de los protocolos puede volver a sus actividades el mismo día. Es importante usar protector solar a diario y seguir las indicaciones de cuidado.",
      faqs: [
        { q: "¿Cuánto cuesta?", a: "Depende del protocolo que necesite su piel. Después de la valoración, el centro le confirmará el costo." },
        { q: "¿Cuántas sesiones necesito?", a: "Depende de su piel y del objetivo. La doctora le indicará el número de sesiones y la frecuencia." },
        { q: "¿Se puede combinar con otros tratamientos?", a: "Sí. Con frecuencia se combina con bótox, rellenos o PRP facial para un resultado más completo." },
      ],
    },
    en: {
      summary: "Protocols to improve skin texture, firmness and radiance, adapted to your skin type.",
      what: "Over time, sun and stress make the skin lose radiance, firmness and evenness. Facial rejuvenation brings together treatments that work on skin quality from different angles. The doctor designs the protocol around your skin type and what you want to improve, and complements it with professional products for home care.",
      art: {
        labels: [
          { t: "Texture", s: "more even" },
          { t: "Radiance", s: "natural glow" },
          { t: "Firmness", s: "fine lines softened" },
        ],
        caption: "A tailored protocol improves skin texture, firmness and radiance.",
      },
      facts: [
        { i: "plan", t: "Tailored protocol", s: "Based on your skin type" },
        { i: "time", t: "In sessions", s: "The doctor sets the frequency" },
        { i: "home", t: "No downtime", s: "Back to your activities" },
        { i: "sun", t: "Sunscreen", s: "Every day" },
      ],
      forWho: [
        "People with dull, tired or uneven skin.",
        "Those noticing a loss of firmness or fine lines.",
        "Those who want to care for their skin on a regular basis.",
        "As a complement to other treatments, such as Botox or fillers.",
      ],
      steps: [
        { t: "Skin assessment", d: "The doctor evaluates your skin type, needs and skincare habits." },
        { t: "Personalized protocol", d: "Together you define which treatments to include and how often." },
        { t: "Sessions", d: "The protocol sessions are carried out at the clinic." },
        { t: "Home care", d: "The right products are recommended to maintain and enhance the result." },
      ],
      recovery: "With most protocols you can return to your activities the same day. Using sunscreen daily and following the care instructions is important.",
      faqs: [
        { q: "How much does it cost?", a: "It depends on the protocol your skin needs. After the assessment, the clinic will confirm the cost." },
        { q: "How many sessions do I need?", a: "It depends on your skin and your goal. The doctor will tell you the number of sessions and how often." },
        { q: "Can it be combined with other treatments?", a: "Yes. It is often combined with Botox, fillers or facial PRP for a more complete result." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 4,
    slug: "prp-capilar",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Frene la caída y estimule el crecimiento del cabello con plasma de su propia sangre, en un programa planificado.",
      what: "El PRP (plasma rico en plaquetas) se obtiene de una pequeña muestra de su propia sangre, que se procesa para concentrar las plaquetas y sus factores de crecimiento. Aplicado en el cuero cabelludo, ayuda a fortalecer el folículo, reducir la caída y mejorar la densidad del cabello. Como es de su propia sangre, es un tratamiento seguro y bien tolerado. El mejor resultado se logra con un programa: una fase inicial de sesiones mensuales y luego sesiones de mantenimiento.",
      art: {
        labels: [
          { t: "Su plasma", s: "de su propia sangre" },
          { t: "Folículo", s: "se fortalece" },
          { t: "Cabello", s: "más denso" },
        ],
        caption: "El plasma de su propia sangre estimula los folículos para frenar la caída y ganar densidad.",
      },
      facts: [
        { i: "drop", t: "Su propia sangre", s: "Seguro y bien tolerado" },
        { i: "plan", t: "Programa 12 meses", s: "6 sesiones · RD$45,000" },
        { i: "time", t: "Primeros cambios", s: "Desde el 2.º o 3.er mes" },
        { i: "home", t: "Sin reposo", s: "Vuelve a sus actividades" },
      ],
      forWho: [
        "Personas con caída del cabello o pérdida de densidad.",
        "Cabello que se ve más fino, sobre todo en la coronilla o las entradas.",
        "Hombres y mujeres en las primeras etapas de la alopecia.",
        "Como complemento de otros tratamientos capilares que indique la doctora.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa su cuero cabelludo y el tipo de caída para confirmar si el PRP es adecuado para usted." },
        { t: "Extracción y preparación", d: "Se toma una pequeña muestra de sangre y se procesa en el momento para obtener el plasma rico en plaquetas." },
        { t: "Aplicación", d: "El plasma se aplica en las zonas del cuero cabelludo que lo necesitan, con agujas muy finas." },
        { t: "Programa", d: "En el programa de 12 meses: 4 sesiones mensuales y mantenimiento en los meses 8 y 12, en total 6 sesiones." },
      ],
      recovery: "Puede volver a sus actividades el mismo día. Puede haber sensibilidad leve en el cuero cabelludo durante unas horas. Se recomienda no lavar el cabello ni usar productos en la zona hasta el día siguiente. Los primeros cambios suelen verse a partir del segundo o tercer mes, con más densidad entre los 3 y 6 meses y un resultado más completo entre los 6 y 12 meses.",
      price: {
        lines: [
          { label: "Sesión individual", value: "RD$10,000" },
          { label: "Plan inicial 3 meses (3 sesiones)", value: "RD$25,000" },
          { label: "Programa capilar 12 meses (6 sesiones)", value: "RD$45,000" },
          { label: "Mantenimiento (por sesión)", value: "RD$8,000" },
        ],
        note: "Los planes se pagan completos al inicio. El mantenimiento es para pacientes que completaron un plan.",
      },
      faqs: [
        { q: "¿Por qué 6 sesiones y no una cada mes durante todo el año?", a: "Las guías y los estudios recomiendan una fase inicial de 3 a 5 sesiones mensuales y luego mantenimiento cada 4 a 6 meses. No hay evidencia de que hacer sesiones todos los meses mejore el resultado." },
        { q: "¿Cuándo veré resultados?", a: "Los primeros cambios suelen notarse a partir del segundo o tercer mes. El resultado más completo se aprecia entre los 6 y 12 meses." },
        { q: "¿Duele?", a: "Puede haber una molestia leve durante la aplicación. Las agujas son muy finas y la sesión es corta." },
        { q: "¿El resultado es permanente?", a: "El PRP ayuda a mantener el cabello, pero la caída puede continuar con el tiempo. Por eso se recomiendan sesiones de mantenimiento." },
      ],
    },
    en: {
      summary: "Reduce hair loss and stimulate growth with plasma from your own blood, in a planned program.",
      what: "PRP (platelet-rich plasma) is obtained from a small sample of your own blood, processed to concentrate the platelets and their growth factors. Applied to the scalp, it helps strengthen the follicles, reduce hair loss and improve hair density. Because it comes from your own blood, it is safe and well tolerated. The best result comes from a program: an initial phase of monthly sessions followed by maintenance sessions.",
      art: {
        labels: [
          { t: "Your plasma", s: "from your own blood" },
          { t: "Follicle", s: "strengthened" },
          { t: "Hair", s: "denser" },
        ],
        caption: "Plasma from your own blood stimulates the follicles to reduce hair loss and gain density.",
      },
      facts: [
        { i: "drop", t: "Your own blood", s: "Safe and well tolerated" },
        { i: "plan", t: "12-month program", s: "6 sessions · RD$45,000" },
        { i: "time", t: "First changes", s: "From month 2 or 3" },
        { i: "home", t: "No downtime", s: "Back to your activities" },
      ],
      forWho: [
        "People with hair loss or loss of density.",
        "Hair that looks thinner, especially at the crown or hairline.",
        "Men and women in the early stages of hair loss.",
        "As a complement to other hair treatments the doctor recommends.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates your scalp and type of hair loss to confirm whether PRP is right for you." },
        { t: "Blood draw and preparation", d: "A small blood sample is taken and processed on the spot to obtain the platelet-rich plasma." },
        { t: "Application", d: "The plasma is applied to the areas of the scalp that need it, with very fine needles." },
        { t: "Program", d: "In the 12-month program: 4 monthly sessions plus maintenance in months 8 and 12, 6 sessions in total." },
      ],
      recovery: "You can return to your activities the same day. There may be mild scalp tenderness for a few hours. Avoid washing your hair or using products on the area until the next day. First changes are usually seen from the second or third month, with more density between months 3 and 6 and a fuller result between months 6 and 12.",
      price: {
        lines: [
          { label: "Single session", value: "RD$10,000" },
          { label: "3-month starter plan (3 sessions)", value: "RD$25,000" },
          { label: "12-month hair program (6 sessions)", value: "RD$45,000" },
          { label: "Maintenance (per session)", value: "RD$8,000" },
        ],
        note: "Plans are paid in full at the start. Maintenance is for patients who completed a plan.",
      },
      faqs: [
        { q: "Why 6 sessions instead of one every month all year?", a: "Guidelines and studies recommend an initial phase of 3 to 5 monthly sessions followed by maintenance every 4 to 6 months. There is no evidence that monthly sessions all year improve the result." },
        { q: "When will I see results?", a: "First changes are usually noticeable from the second or third month. The fullest result shows between months 6 and 12." },
        { q: "Does it hurt?", a: "There may be mild discomfort during the application. The needles are very fine and the session is short." },
        { q: "Is the result permanent?", a: "PRP helps preserve your hair, but hair loss can continue over time. That is why maintenance sessions are recommended." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 5,
    slug: "prp-facial",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Estimule la regeneración de la piel del rostro con los componentes de su propia sangre.",
      what: "El PRP facial utiliza plasma rico en plaquetas obtenido de una pequeña muestra de su propia sangre. Aplicado en la piel del rostro, sus factores de crecimiento estimulan la producción de colágeno y la renovación de la piel. Ayuda a mejorar la textura, la luminosidad y la firmeza de forma progresiva y natural. La doctora tiene experiencia en el uso de derivados plaquetarios, tema de su tesis de especialidad.",
      art: {
        labels: [
          { t: "Su plasma", s: "factores de crecimiento" },
          { t: "Aplicación", s: "microinyecciones" },
          { t: "Luminosidad", s: "piel renovada" },
        ],
        caption: "Los factores de crecimiento de su plasma estimulan el colágeno y renuevan la piel.",
      },
      facts: [
        { i: "drop", t: "Su propia sangre", s: "Riesgo muy bajo de reacciones" },
        { i: "tag", t: "RD$10,000", s: "Por sesión" },
        { i: "time", t: "Por sesiones", s: "La doctora indica cuántas" },
        { i: "sparkle", t: "Cambio progresivo", s: "En las semanas siguientes" },
      ],
      forWho: [
        "Piel opaca, cansada o con textura irregular.",
        "Líneas finas y pérdida de firmeza.",
        "Quienes prefieren un tratamiento a partir de su propia sangre.",
        "Como complemento de otros tratamientos de rejuvenecimiento.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa su piel y le indica cuántas sesiones conviene hacer." },
        { t: "Extracción y preparación", d: "Se toma una pequeña muestra de sangre y se procesa en el momento para obtener el plasma." },
        { t: "Aplicación", d: "El plasma se aplica en la piel del rostro con microinyecciones o técnicas que favorecen su absorción." },
        { t: "Seguimiento", d: "Se revisa la evolución de la piel entre sesiones." },
      ],
      recovery: "Es normal un enrojecimiento leve o pequeñas marcas durante unas horas o un día. Se recomienda no maquillarse el mismo día, evitar el sol y usar protector solar. Los cambios en la piel se van notando de forma progresiva en las semanas siguientes.",
      price: {
        lines: [{ label: "Por sesión", value: "RD$10,000" }],
        note: "La doctora le indicará cuántas sesiones necesita su piel.",
      },
      faqs: [
        { q: "¿Es seguro?", a: "Sí. Como se usa plasma de su propia sangre, el riesgo de reacciones es muy bajo." },
        { q: "¿Cuántas sesiones necesito?", a: "Depende de su piel y del objetivo. Por lo general se recomienda una serie de sesiones; la doctora le indicará cuántas." },
        { q: "¿Se puede combinar con otros tratamientos?", a: "Sí. Se combina bien con bótox, rellenos y protocolos de rejuvenecimiento." },
      ],
    },
    en: {
      summary: "Stimulate skin regeneration on the face with components from your own blood.",
      what: "Facial PRP uses platelet-rich plasma obtained from a small sample of your own blood. Applied to the facial skin, its growth factors stimulate collagen production and skin renewal. It helps improve texture, radiance and firmness gradually and naturally. The doctor is experienced in the use of platelet concentrates, the subject of her specialty thesis.",
      art: {
        labels: [
          { t: "Your plasma", s: "growth factors" },
          { t: "Application", s: "micro-injections" },
          { t: "Radiance", s: "renewed skin" },
        ],
        caption: "The growth factors in your plasma stimulate collagen and renew the skin.",
      },
      facts: [
        { i: "drop", t: "Your own blood", s: "Very low risk of reactions" },
        { i: "tag", t: "RD$10,000", s: "Per session" },
        { i: "time", t: "In sessions", s: "The doctor says how many" },
        { i: "sparkle", t: "Gradual change", s: "Over the following weeks" },
      ],
      forWho: [
        "Dull, tired or uneven skin.",
        "Fine lines and loss of firmness.",
        "Those who prefer a treatment made from their own blood.",
        "As a complement to other rejuvenation treatments.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates your skin and recommends how many sessions to do." },
        { t: "Blood draw and preparation", d: "A small blood sample is taken and processed on the spot to obtain the plasma." },
        { t: "Application", d: "The plasma is applied to the facial skin with micro-injections or techniques that help absorption." },
        { t: "Follow-up", d: "Skin progress is checked between sessions." },
      ],
      recovery: "Mild redness or small marks for a few hours or a day are normal. Avoid makeup the same day, avoid the sun and use sunscreen. Changes in the skin show gradually over the following weeks.",
      price: {
        lines: [{ label: "Per session", value: "RD$10,000" }],
        note: "The doctor will tell you how many sessions your skin needs.",
      },
      faqs: [
        { q: "Is it safe?", a: "Yes. Because it uses plasma from your own blood, the risk of reactions is very low." },
        { q: "How many sessions do I need?", a: "It depends on your skin and your goal. A series of sessions is usually recommended; the doctor will tell you how many." },
        { q: "Can it be combined with other treatments?", a: "Yes. It combines well with Botox, fillers and rejuvenation protocols." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 6,
    slug: "lifting-hilos-tensores",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Reposicione y tense los tejidos del rostro con hilos reabsorbibles, para un efecto lifting sin cirugía.",
      what: "Los hilos tensores son hilos médicos reabsorbibles que se colocan bajo la piel con una aguja o cánula fina. Tienen pequeñas espículas que sujetan los tejidos y permiten reposicionarlos, por ejemplo para levantar el tercio medio del rostro o definir el óvalo facial. Con el tiempo el hilo se reabsorbe, y en el proceso estimula la formación de colágeno.",
      art: {
        labels: [
          { t: "Hilos", s: "reabsorbibles" },
          { t: "Sostén", s: "eleva los tejidos" },
          { t: "Óvalo", s: "contorno definido" },
        ],
        caption: "Los hilos sostienen y elevan los tejidos; al reabsorberse, estimulan colágeno.",
      },
      facts: [
        { i: "tag", t: "RD$31,000", s: "Precio del tratamiento" },
        { i: "anest", t: "Anestesia local", s: "Sin cirugía" },
        { i: "time", t: "Recuperación rápida", s: "Pocos días de inflamación" },
        { i: "sparkle", t: "Colágeno", s: "El hilo lo estimula al reabsorberse" },
      ],
      forWho: [
        "Personas con flacidez leve a moderada en el rostro.",
        "Quienes desean definir el óvalo facial o elevar las mejillas.",
        "Quienes buscan un efecto lifting sin cirugía y con recuperación rápida.",
        "Si la flacidez es marcada, la doctora puede recomendar el lifting quirúrgico.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa la flacidez y define las zonas, la dirección y el número de hilos." },
        { t: "Preparación", d: "Se marca el recorrido de los hilos y se aplica anestesia local." },
        { t: "Colocación", d: "Los hilos se introducen bajo la piel y se ajustan para reposicionar los tejidos." },
        { t: "Revisión", d: "En el control se revisa el resultado y la evolución." },
      ],
      recovery: "Puede haber inflamación, pequeños moretones o sensación de tirantez durante los primeros días. Se recomienda evitar gestos exagerados, masajes faciales, el ejercicio intenso y dormir boca abajo durante el tiempo que indique la doctora.",
      price: {
        lines: [{ label: "Lifting con hilos tensores", value: "RD$31,000" }],
      },
      faqs: [
        { q: "¿Cuánto dura el resultado?", a: "El efecto de sostén dura varios meses, y el colágeno que se forma ayuda a prolongarlo. La duración varía según cada persona." },
        { q: "¿Es lo mismo que un lifting quirúrgico?", a: "No. Los hilos dan un efecto más sutil y temporal, sin cirugía. Para flacidez marcada, el lifting quirúrgico da un resultado mayor." },
        { q: "¿Se notan los hilos?", a: "No. Quedan bajo la piel y no se ven ni se palpan una vez que baja la inflamación." },
      ],
    },
    en: {
      summary: "Reposition and tighten facial tissues with absorbable threads for a lifting effect without surgery.",
      what: "Tensor threads are absorbable medical threads placed under the skin with a fine needle or cannula. They have small barbs that hold the tissues and allow them to be repositioned, for example to lift the midface or define the facial oval. Over time the thread is absorbed, stimulating collagen formation in the process.",
      art: {
        labels: [
          { t: "Threads", s: "absorbable" },
          { t: "Support", s: "lifts the tissues" },
          { t: "Oval", s: "defined contour" },
        ],
        caption: "The threads support and lift the tissues; as they absorb, they stimulate collagen.",
      },
      facts: [
        { i: "tag", t: "RD$31,000", s: "Treatment price" },
        { i: "anest", t: "Local anesthesia", s: "No surgery" },
        { i: "time", t: "Quick recovery", s: "A few days of swelling" },
        { i: "sparkle", t: "Collagen", s: "Stimulated as the thread absorbs" },
      ],
      forWho: [
        "People with mild to moderate facial sagging.",
        "Those who want to define the facial oval or lift the cheeks.",
        "Those looking for a lifting effect without surgery and with quick recovery.",
        "If sagging is marked, the doctor may recommend a surgical lift.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates the sagging and defines the areas, direction and number of threads." },
        { t: "Preparation", d: "The path of the threads is marked and local anesthesia is applied." },
        { t: "Placement", d: "The threads are inserted under the skin and adjusted to reposition the tissues." },
        { t: "Review", d: "The result and progress are checked at the follow-up." },
      ],
      recovery: "There may be swelling, small bruises or a feeling of tightness during the first days. Avoid exaggerated facial movements, facial massage, intense exercise and sleeping face down for as long as the doctor indicates.",
      price: {
        lines: [{ label: "Thread lift", value: "RD$31,000" }],
      },
      faqs: [
        { q: "How long does the result last?", a: "The lifting effect lasts several months, and the collagen formed helps extend it. Duration varies from person to person." },
        { q: "Is it the same as a surgical lift?", a: "No. Threads give a subtler, temporary effect without surgery. For marked sagging, a surgical lift gives a greater result." },
        { q: "Can the threads be seen?", a: "No. They sit under the skin and cannot be seen or felt once the swelling goes down." },
      ],
    },
  },
  {
    service: "medicina-estetica",
    index: 7,
    slug: "bioestimulacion-colageno-hilos",
    booking: { s: "medicina-estetica", withOption: true },
    es: {
      summary: "Mejore la firmeza y la calidad de la piel estimulando su propio colágeno con hilos finos.",
      what: "La bioestimulación con hilos utiliza hilos muy finos y reabsorbibles, sin espículas, que se colocan bajo la piel formando una malla. A diferencia de los hilos tensores, su función no es levantar, sino estimular la producción de colágeno. El resultado es una piel más firme, más densa y de mejor calidad, que mejora de forma progresiva.",
      art: {
        labels: [
          { t: "Hilos finos", s: "en forma de malla" },
          { t: "Colágeno", s: "se forma de nuevo" },
          { t: "Piel", s: "más firme y densa" },
        ],
        caption: "La malla de hilos estimula colágeno nuevo y la piel gana firmeza poco a poco.",
      },
      facts: [
        { i: "tag", t: "RD$24,500", s: "Precio del tratamiento" },
        { i: "plan", t: "Combinable", s: "Con hilos tensores" },
        { i: "time", t: "Progresivo", s: "Mejora en semanas y meses" },
        { i: "home", t: "Pocos días", s: "De inflamación leve" },
      ],
      forWho: [
        "Piel con pérdida de firmeza o aspecto flácido leve.",
        "Zonas como las mejillas, el cuello o el contorno de la boca.",
        "Quienes desean mejorar la calidad de la piel de forma gradual y natural.",
        "Como complemento del lifting con hilos tensores o de otros tratamientos.",
      ],
      steps: [
        { t: "Valoración", d: "La doctora evalúa la piel y define las zonas a tratar." },
        { t: "Preparación", d: "Se limpia la zona y se aplica anestesia local o crema anestésica." },
        { t: "Colocación", d: "Los hilos finos se colocan bajo la piel formando una malla en la zona tratada." },
        { t: "Evolución", d: "El colágeno se va formando en las semanas siguientes y la piel mejora de forma progresiva." },
      ],
      recovery: "Es normal algo de inflamación o pequeños moretones durante unos días. Puede volver a sus actividades en poco tiempo. Se recomienda evitar masajes y el ejercicio intenso los primeros días.",
      price: {
        lines: [{ label: "Bioestimulación de colágeno con hilos", value: "RD$24,500" }],
      },
      faqs: [
        { q: "¿Cuál es la diferencia con los hilos tensores?", a: "Los hilos tensores levantan y reposicionan los tejidos. Los de bioestimulación no levantan; mejoran la firmeza y la calidad de la piel al estimular colágeno." },
        { q: "¿Cuándo veré el resultado?", a: "El cambio es progresivo: se va notando en las semanas y meses siguientes, a medida que se forma el nuevo colágeno." },
        { q: "¿Se pueden combinar ambos tipos de hilos?", a: "Sí. Con frecuencia se combinan para levantar y, a la vez, mejorar la calidad de la piel." },
      ],
    },
    en: {
      summary: "Improve skin firmness and quality by stimulating your own collagen with fine threads.",
      what: "Thread biostimulation uses very fine, absorbable, smooth threads placed under the skin in a mesh pattern. Unlike tensor threads, their purpose is not to lift but to stimulate collagen production. The result is firmer, denser, better-quality skin that improves gradually.",
      art: {
        labels: [
          { t: "Fine threads", s: "in a mesh" },
          { t: "Collagen", s: "new collagen forms" },
          { t: "Skin", s: "firmer and denser" },
        ],
        caption: "The thread mesh stimulates new collagen and the skin gradually gains firmness.",
      },
      facts: [
        { i: "tag", t: "RD$24,500", s: "Treatment price" },
        { i: "plan", t: "Can be combined", s: "With tensor threads" },
        { i: "time", t: "Gradual", s: "Improves over weeks and months" },
        { i: "home", t: "A few days", s: "Of mild swelling" },
      ],
      forWho: [
        "Skin with loss of firmness or mild sagging.",
        "Areas such as the cheeks, neck or around the mouth.",
        "Those who want to improve skin quality gradually and naturally.",
        "As a complement to a thread lift or other treatments.",
      ],
      steps: [
        { t: "Assessment", d: "The doctor evaluates the skin and defines the areas to treat." },
        { t: "Preparation", d: "The area is cleaned and local anesthesia or numbing cream is applied." },
        { t: "Placement", d: "The fine threads are placed under the skin in a mesh across the treated area." },
        { t: "Progress", d: "Collagen forms over the following weeks and the skin improves gradually." },
      ],
      recovery: "Some swelling or small bruises for a few days are normal. You can return to your activities quickly. Avoid massage and intense exercise for the first days.",
      price: {
        lines: [{ label: "Collagen biostimulation with threads", value: "RD$24,500" }],
      },
      faqs: [
        { q: "What is the difference from tensor threads?", a: "Tensor threads lift and reposition tissues. Biostimulation threads do not lift; they improve firmness and skin quality by stimulating collagen." },
        { q: "When will I see the result?", a: "The change is gradual: it shows over the following weeks and months as new collagen forms." },
        { q: "Can both types of threads be combined?", a: "Yes. They are often combined to lift and, at the same time, improve skin quality." },
      ],
    },
  },
  // ───────── CIRUGÍA RECONSTRUCTIVA ─────────
  {
    service: "cirugia-reconstructiva",
    index: 0,
    slug: "fracturas-traumatismos-faciales",
    booking: { s: "reconstructiva", withOption: true },
    es: {
      summary: "Tratamiento de fracturas de la mandíbula, los pómulos, la nariz y otras lesiones de la cara, cuidando la función y la estética.",
      what: "Un golpe, una caída, un accidente de tránsito o una práctica deportiva pueden fracturar los huesos de la cara o lesionar sus tejidos. El tratamiento busca devolver los huesos a su posición, recuperar la mordida, la respiración y la movilidad, y lograr que el rostro conserve su forma. La doctora se formó como cirujana maxilofacial con residencia en el Hospital Dr. Darío Contreras, centro de referencia en traumatología del país.",
      art: {
        labels: [
          { t: "Fractura", s: "el hueso se desplaza" },
          { t: "Placa", s: "titanio, fija el hueso" },
          { t: "Consolidación", s: "el hueso se une" },
        ],
        caption: "El hueso vuelve a su posición y se fija con placas de titanio mientras consolida.",
      },
      facts: [
        { i: "xray", t: "Diagnóstico preciso", s: "Radiografía o tomografía" },
        { i: "titanium", t: "Placas de titanio", s: "Pueden quedarse de por vida" },
        { i: "time", t: "Consolidación", s: "El hueso tarda varias semanas" },
        { i: "follow", t: "Controles", s: "Hasta recuperar la función" },
      ],
      forWho: [
        "Fracturas de mandíbula, maxilar, pómulos, nariz o del contorno de los ojos.",
        "Dientes que ya no encajan como antes después de un golpe.",
        "Heridas en la cara que requieren reparación cuidadosa.",
        "Secuelas de fracturas antiguas que no consolidaron bien.",
      ],
      alert: "Ante un golpe reciente con sangrado, dificultad para respirar, pérdida de conocimiento o problemas de visión, acuda primero a emergencias.",
      steps: [
        { t: "Evaluación", d: "La doctora examina la lesión y solicita radiografías o tomografía para conocer con precisión el tipo de fractura." },
        { t: "Plan de tratamiento", d: "Según la fractura, se decide entre un tratamiento conservador o una cirugía para reposicionar y fijar los huesos." },
        { t: "Tratamiento", d: "Cuando hace falta cirugía, los huesos se reposicionan y se fijan con placas y tornillos de titanio, buscando incisiones discretas." },
        { t: "Seguimiento", d: "Se controla la consolidación del hueso, la mordida y la cicatrización hasta recuperar la función." },
      ],
      recovery: "Depende del tipo de fractura. En las primeras semanas suele indicarse dieta blanda o líquida, reposo relativo, buena higiene oral y los medicamentos necesarios. El hueso tarda varias semanas en consolidar, por lo que es importante asistir a todos los controles.",
      faqs: [
        { q: "¿Debo ir a emergencias o venir al centro?", a: "Si el golpe es reciente y hay sangrado abundante, dificultad para respirar, pérdida de conocimiento o problemas de visión, acuda primero a emergencias. Después, la doctora puede encargarse del tratamiento maxilofacial." },
        { q: "¿Las placas se retiran?", a: "En la mayoría de los casos las placas de titanio pueden quedarse de forma permanente sin causar molestias. La doctora le indicará si su caso requiere retirarlas." },
        { q: "¿Se puede corregir una fractura antigua?", a: "En muchos casos sí. La doctora evalúa la secuela y le explica las opciones para mejorar la función y la forma." },
        { q: "¿Cuánto cuesta?", a: "Depende del tipo de lesión y del tratamiento. Después de la evaluación, el centro le confirmará el costo." },
      ],
    },
    en: {
      summary: "Treatment of fractures of the jaw, cheekbones, nose and other facial injuries, caring for both function and appearance.",
      what: "A blow, a fall, a traffic accident or a sports injury can fracture the facial bones or damage the facial tissues. Treatment aims to return the bones to their position, restore the bite, breathing and movement, and preserve the shape of the face. The doctor trained as a maxillofacial surgeon with a residency at Hospital Dr. Darío Contreras, the country's reference center for trauma.",
      art: {
        labels: [
          { t: "Fracture", s: "displaced bone" },
          { t: "Plate", s: "titanium fixation" },
          { t: "Healing", s: "the bone knits" },
        ],
        caption: "The bone is returned to its position and fixed with titanium plates while it heals.",
      },
      facts: [
        { i: "xray", t: "Precise diagnosis", s: "X-ray or CT scan" },
        { i: "titanium", t: "Titanium plates", s: "Can stay for life" },
        { i: "time", t: "Bone healing", s: "Takes several weeks" },
        { i: "follow", t: "Follow-up", s: "Until function is restored" },
      ],
      forWho: [
        "Fractures of the jaw, upper jaw, cheekbones, nose or around the eyes.",
        "Teeth that no longer fit together as before after a blow.",
        "Facial wounds that need careful repair.",
        "After-effects of old fractures that did not heal properly.",
      ],
      alert: "After a recent blow with bleeding, difficulty breathing, loss of consciousness or vision problems, go to the emergency room first.",
      steps: [
        { t: "Evaluation", d: "The doctor examines the injury and orders X-rays or a CT scan to know the exact type of fracture." },
        { t: "Treatment plan", d: "Depending on the fracture, either conservative treatment or surgery to reposition and fix the bones is chosen." },
        { t: "Treatment", d: "When surgery is needed, the bones are repositioned and fixed with titanium plates and screws, using discreet incisions." },
        { t: "Follow-up", d: "Bone healing, bite and scarring are monitored until function is restored." },
      ],
      recovery: "It depends on the type of fracture. During the first weeks, a soft or liquid diet, relative rest, good oral hygiene and the necessary medication are usually prescribed. Bone takes several weeks to heal, so attending every follow-up is important.",
      faqs: [
        { q: "Should I go to the ER or come to the clinic?", a: "If the injury is recent and there is heavy bleeding, difficulty breathing, loss of consciousness or vision problems, go to the emergency room first. The doctor can then take care of the maxillofacial treatment." },
        { q: "Are the plates removed?", a: "In most cases titanium plates can stay permanently without causing problems. The doctor will tell you if your case requires removal." },
        { q: "Can an old fracture be corrected?", a: "In many cases, yes. The doctor assesses the after-effects and explains the options to improve function and shape." },
        { q: "How much does it cost?", a: "It depends on the injury and the treatment. After the evaluation, the clinic will confirm the cost." },
      ],
    },
  },
  {
    service: "cirugia-reconstructiva",
    index: 1,
    slug: "malformaciones-faciales",
    booking: { s: "reconstructiva", withOption: true },
    es: {
      summary: "Corrección de alteraciones en el desarrollo de los maxilares y la cara para mejorar la mordida, la función y la armonía del rostro.",
      what: "Algunas personas nacen o crecen con los maxilares en una posición o tamaño que no corresponde: la mandíbula muy adelantada o atrasada, una mordida abierta o un rostro asimétrico. Estas alteraciones pueden afectar la masticación, la respiración, el habla y la apariencia. La cirugía de los maxilares (cirugía ortognática) los reposiciona para que la mordida y el rostro queden en equilibrio. Por lo general se planifica junto con el ortodoncista.",
      art: {
        labels: [
          { t: "Mandíbula", s: "adelantada" },
          { t: "Nueva posición", s: "mordida equilibrada" },
          { t: "Perfil", s: "más armónico" },
        ],
        caption: "La cirugía reposiciona los maxilares para que la mordida y el perfil queden en equilibrio.",
      },
      facts: [
        { i: "plan", t: "Con ortodoncia", s: "Antes y después de la cirugía" },
        { i: "xray", t: "Planificación digital", s: "Con estudios y tomografía" },
        { i: "scar", t: "Sin cicatriz visible", s: "Incisiones dentro de la boca" },
        { i: "follow", t: "Función y armonía", s: "Masticar, respirar y hablar mejor" },
      ],
      forWho: [
        "Mandíbula muy adelantada (prognatismo) o muy atrasada (retrognatismo).",
        "Mordida abierta o dientes que no encajan aunque se haya hecho ortodoncia.",
        "Asimetrías del rostro o de la mandíbula.",
        "Dificultad para masticar, respirar o hablar relacionada con la posición de los maxilares.",
        "Personas que ya terminaron su crecimiento (la edad se evalúa en cada caso).",
      ],
      steps: [
        { t: "Evaluación", d: "La doctora analiza su rostro, su mordida y sus estudios (fotos, modelos, tomografía) para entender la causa." },
        { t: "Planificación conjunta", d: "Con el ortodoncista se define el plan completo: la preparación con ortodoncia y la cirugía, planificada de forma digital." },
        { t: "Cirugía", d: "Los maxilares se reposicionan y se fijan con placas de titanio, por lo general a través de incisiones por dentro de la boca." },
        { t: "Recuperación y ortodoncia final", d: "Tras la cirugía, se controla la cicatrización y se completa el ajuste final de la mordida." },
      ],
      recovery: "Es una cirugía mayor que requiere una recuperación planificada. Las primeras semanas se indica dieta líquida o blanda y reposo relativo, y la inflamación disminuye de forma progresiva. La doctora le acompañará en cada etapa con controles frecuentes.",
      faqs: [
        { q: "¿Necesito ortodoncia?", a: "En la mayoría de los casos sí. La ortodoncia prepara los dientes antes de la cirugía y ajusta la mordida al final." },
        { q: "¿Las cicatrices se ven?", a: "Por lo general las incisiones se hacen por dentro de la boca, por lo que no quedan cicatrices visibles en la cara." },
        { q: "¿El cambio es solo estético?", a: "No. El objetivo principal es mejorar la función (masticar, respirar, hablar), y como resultado el rostro también gana armonía." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la evaluación y los estudios, el centro le confirmará el costo." },
      ],
    },
    en: {
      summary: "Correction of developmental changes of the jaws and face to improve the bite, function and facial harmony.",
      what: "Some people are born with or develop jaws in a position or size that does not match: a jaw that sits too far forward or back, an open bite or an asymmetric face. These conditions can affect chewing, breathing, speech and appearance. Jaw surgery (orthognathic surgery) repositions the jaws so the bite and the face are in balance. It is usually planned together with the orthodontist.",
      art: {
        labels: [
          { t: "Lower jaw", s: "too far forward" },
          { t: "New position", s: "balanced bite" },
          { t: "Profile", s: "more harmonious" },
        ],
        caption: "Surgery repositions the jaws so the bite and the profile are in balance.",
      },
      facts: [
        { i: "plan", t: "With orthodontics", s: "Before and after surgery" },
        { i: "xray", t: "Digital planning", s: "With records and CT scan" },
        { i: "scar", t: "No visible scar", s: "Incisions inside the mouth" },
        { i: "follow", t: "Function and harmony", s: "Chew, breathe and speak better" },
      ],
      forWho: [
        "A lower jaw too far forward (prognathism) or too far back (retrognathism).",
        "An open bite, or teeth that do not fit together even after orthodontics.",
        "Asymmetry of the face or jaw.",
        "Difficulty chewing, breathing or speaking related to jaw position.",
        "People who have finished growing (age is assessed case by case).",
      ],
      steps: [
        { t: "Evaluation", d: "The doctor analyzes your face, bite and records (photos, models, CT scan) to understand the cause." },
        { t: "Joint planning", d: "Together with the orthodontist, the full plan is defined: orthodontic preparation and digitally planned surgery." },
        { t: "Surgery", d: "The jaws are repositioned and fixed with titanium plates, usually through incisions inside the mouth." },
        { t: "Recovery and final orthodontics", d: "After surgery, healing is monitored and the final bite adjustment is completed." },
      ],
      recovery: "This is major surgery that requires a planned recovery. For the first weeks a liquid or soft diet and relative rest are prescribed, and swelling decreases gradually. The doctor will accompany you at every stage with frequent follow-ups.",
      faqs: [
        { q: "Do I need orthodontics?", a: "In most cases, yes. Orthodontics prepares the teeth before surgery and adjusts the bite at the end." },
        { q: "Are the scars visible?", a: "The incisions are usually made inside the mouth, so there are no visible scars on the face." },
        { q: "Is the change only cosmetic?", a: "No. The main goal is to improve function (chewing, breathing, speaking), and as a result the face also gains harmony." },
        { q: "How much does it cost?", a: "It depends on each case. After the evaluation and records, the clinic will confirm the cost." },
      ],
    },
  },
  {
    service: "cirugia-reconstructiva",
    index: 2,
    slug: "reconstruccion-maxilofacial",
    booking: { s: "reconstructiva", withOption: true },
    es: {
      summary: "Recupere la forma y la función de los maxilares y el rostro después de una lesión, una enfermedad o la pérdida de hueso.",
      what: "La reconstrucción maxilofacial restaura estructuras de la cara y los maxilares que se han perdido o dañado: hueso que desapareció tras perder dientes, defectos que quedan después de retirar quistes o lesiones, o secuelas de traumatismos. Para ello se utilizan injertos de hueso, materiales de regeneración y, cuando conviene, derivados de la propia sangre del paciente que favorecen la cicatrización. El objetivo es devolver la función y preparar el terreno, por ejemplo, para colocar implantes.",
      art: {
        labels: [
          { t: "Defecto", s: "hueso perdido" },
          { t: "Injerto", s: "rellena el espacio" },
          { t: "Hueso nuevo", s: "listo para implantes" },
        ],
        caption: "El injerto rellena el hueso perdido y, al integrarse, permite colocar implantes.",
      },
      facts: [
        { i: "xray", t: "Tomografía", s: "Para medir el defecto" },
        { i: "plan", t: "Injerto a medida", s: "Hueso propio o material aprobado" },
        { i: "time", t: "Integración", s: "Varios meses" },
        { i: "titanium", t: "Implantes después", s: "Si el plan lo incluye" },
      ],
      forWho: [
        "Pérdida de hueso en los maxilares que impide colocar implantes.",
        "Defectos después de retirar quistes, tumores benignos u otras lesiones.",
        "Secuelas de traumatismos o cirugías anteriores.",
        "Personas que desean recuperar la función y la forma de una zona del rostro.",
      ],
      steps: [
        { t: "Evaluación y estudios", d: "Con tomografía y otros estudios, la doctora mide el defecto y planifica la reconstrucción." },
        { t: "Plan personalizado", d: "Se elige la técnica y el material más adecuado: injerto de hueso, regeneración guiada u otras opciones." },
        { t: "Cirugía", d: "Se realiza la reconstrucción con la anestesia adecuada para el caso." },
        { t: "Integración y siguiente paso", d: "Se controla la cicatrización y la integración del injerto. Si el plan lo incluye, después se colocan los implantes." },
      ],
      recovery: "Depende del tipo de reconstrucción. Es habitual indicar dieta blanda, buena higiene y medicamentos durante los primeros días. Los injertos de hueso necesitan varios meses para integrarse antes del siguiente paso del tratamiento.",
      faqs: [
        { q: "¿De dónde se obtiene el hueso para el injerto?", a: "Puede ser del propio paciente o de materiales de injerto seguros y aprobados. La doctora le explicará la mejor opción para su caso." },
        { q: "¿Podré ponerme implantes después?", a: "En muchos casos, sí. Uno de los objetivos de la reconstrucción es justamente crear el hueso necesario para colocarlos." },
        { q: "¿Cuánto tiempo dura todo el proceso?", a: "Depende del defecto y del plan. Si se coloca un injerto, se espera a que se integre antes del siguiente paso, lo que suele tomar varios meses." },
        { q: "¿Cuánto cuesta?", a: "Depende de cada caso. Después de la evaluación y los estudios, el centro le confirmará el costo." },
      ],
    },
    en: {
      summary: "Restore the form and function of the jaws and face after an injury, a disease or bone loss.",
      what: "Maxillofacial reconstruction restores facial and jaw structures that have been lost or damaged: bone that disappeared after losing teeth, defects left after removing cysts or lesions, or after-effects of trauma. Bone grafts, regenerative materials and, when appropriate, concentrates from the patient's own blood that support healing are used. The goal is to restore function and prepare the ground, for example, for dental implants.",
      art: {
        labels: [
          { t: "Defect", s: "lost bone" },
          { t: "Graft", s: "fills the space" },
          { t: "New bone", s: "ready for implants" },
        ],
        caption: "The graft fills the lost bone and, once integrated, allows implants to be placed.",
      },
      facts: [
        { i: "xray", t: "CT scan", s: "To measure the defect" },
        { i: "plan", t: "Tailored graft", s: "Your own bone or approved material" },
        { i: "time", t: "Integration", s: "Several months" },
        { i: "titanium", t: "Implants later", s: "If the plan includes them" },
      ],
      forWho: [
        "Bone loss in the jaws that prevents placing implants.",
        "Defects after removing cysts, benign tumors or other lesions.",
        "After-effects of trauma or previous surgery.",
        "People who want to restore the function and shape of an area of the face.",
      ],
      steps: [
        { t: "Evaluation and imaging", d: "Using a CT scan and other tests, the doctor measures the defect and plans the reconstruction." },
        { t: "Personalized plan", d: "The most suitable technique and material are chosen: bone graft, guided regeneration or other options." },
        { t: "Surgery", d: "The reconstruction is performed with the anesthesia appropriate for the case." },
        { t: "Integration and next step", d: "Healing and graft integration are monitored. If the plan includes it, implants are placed afterwards." },
      ],
      recovery: "It depends on the type of reconstruction. A soft diet, good hygiene and medication are usually prescribed for the first days. Bone grafts need several months to integrate before the next step of treatment.",
      faqs: [
        { q: "Where does the graft bone come from?", a: "It can come from the patient or from safe, approved graft materials. The doctor will explain the best option for your case." },
        { q: "Will I be able to get implants afterwards?", a: "In many cases, yes. One goal of reconstruction is precisely to build the bone needed to place them." },
        { q: "How long does the whole process take?", a: "It depends on the defect and the plan. If a graft is placed, it must integrate before the next step, which usually takes several months." },
        { q: "How much does it cost?", a: "It depends on each case. After the evaluation and imaging, the clinic will confirm the cost." },
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
