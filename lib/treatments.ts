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
  // ───────── CIRUGÍA ESTÉTICA FACIAL ─────────
  {
    service: "cirugia-estetica-facial",
    index: 0,
    slug: "lipopapada-perfilamiento-mandibular",
    booking: { s: "estetica-facial", withOption: true },
    es: {
      summary: "Reduzca la grasa bajo el mentón y defina el contorno de la mandíbula para un perfil más armónico.",
      what: "La lipopapada es una liposucción localizada que retira la grasa acumulada bajo el mentón a través de incisiones muy pequeñas. Se puede combinar con el perfilamiento mandibular, que trabaja la grasa del borde de la mandíbula para marcar mejor el ángulo entre el cuello y la cara. El objetivo es un perfil más definido sin perder la naturalidad del rostro.",
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
