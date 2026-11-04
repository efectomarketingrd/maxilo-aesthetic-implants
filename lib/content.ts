import type { Locale } from "./site";

// TEXTOS DE LA WEB (español e inglés).
// Los campos marcados como `null` o con `pending: true` son datos que aún faltan:
// la web muestra un espacio "Por completar" hasta que se llenen.

export type ServiceSlug = "implantes-cirugia-oral" | "cirugia-estetica-facial" | "medicina-estetica" | "cirugia-reconstructiva";

type Procedure = { name: string; desc: string };
type Service = {
  slug: ServiceSlug;
  icon: "tooth" | "profile" | "syringe" | "shield";
  title: string;
  short: string;
  intro: string;
  procedures: Procedure[];
};

const es = {
  meta: {
    title: "Maxilo Aesthetic Implants | Implantes dentales y cirugía maxilofacial en Las Terrenas",
    description:
      "Centro de cirugía oral, implantes dentales, cirugía estética facial y medicina estética de la Dra. Celia Hernández Mauricio en Las Terrenas, Samaná, República Dominicana.",
  },
  nav: {
    home: "Inicio",
    about: "Sobre nosotros",
    services: "Servicios",
    allServices: "Ver todos los servicios",
    faq: "Preguntas frecuentes",
    brands: "Nuestras marcas",
    news: "Blog",
    contact: "Contacto",
    cta: "Agenda tu consulta",
  },
  pending: "Por completar",
  hero: {
    eyebrow: "Cirugía maxilofacial · Implantes · Estética facial",
    title: "Su sonrisa y su rostro,",
    titleAccent: "en manos de una especialista.",
    text: "Bienvenido a Maxilo Aesthetic Implants. En Las Terrenas le acompañamos con atención cercana, precisión quirúrgica y un plan hecho a su medida, sea que viva aquí o venga desde el extranjero.",
    cta: "Agenda tu consulta",
    secondary: "Ver servicios",
    badges: ["Cirujana maxilofacial especialista", "Pacientes locales y del extranjero", "Atención personalizada"],
    waMsg: "Hola, me gustaría agendar una consulta en Maxilo Aesthetic Implants.",
    nameTag: "Dra. Celia Hernández Mauricio",
    roleTag: "Cirugía oral y maxilofacial",
  },
  services: {
    eyebrow: "Nuestros servicios",
    title: "Atención integral para su rostro y su sonrisa",
    more: "Ver más",
    ask: "Consultar este servicio",
    procedures: "Procedimientos",
    back: "Volver al inicio",
    otherServices: "Otros servicios",
    ctaTitle: "¿Tiene dudas sobre este tratamiento?",
    ctaText: "Escríbanos y la doctora le orientará sobre la mejor opción para su caso.",
    items: [
      {
        slug: "implantes-cirugia-oral",
        icon: "tooth",
        title: "Implantes y cirugía oral",
        short: "Implantes dentales, extracción de cordales y cirugía oral y maxilofacial.",
        intro:
          "Reponemos dientes perdidos y resolvemos problemas de la boca y los maxilares con técnicas quirúrgicas precisas, siempre después de una valoración completa de su caso.",
        procedures: [
          { name: "Implantes dentales", desc: "Raíces artificiales que se colocan en el hueso para sostener coronas o prótesis fijas, con un resultado estable y natural." },
          { name: "Extracción de terceros molares", desc: "Retiro de cordales o muelas del juicio que causan dolor, infecciones o falta de espacio." },
          { name: "Cirugía oral y maxilofacial", desc: "Procedimientos quirúrgicos en la boca, los maxilares y la cara, desde lesiones hasta correcciones de la mordida." },
        ],
      },
      {
        slug: "cirugia-estetica-facial",
        icon: "profile",
        title: "Cirugía estética facial",
        short: "Lipopapada, perfilamiento mandibular, blefaroplastia, otoplastia y lifting.",
        intro:
          "Procedimientos quirúrgicos que realzan los rasgos del rostro buscando armonía y naturalidad, planificados según sus proporciones y lo que usted desea lograr.",
        procedures: [
          { name: "Lipopapada y perfilamiento mandibular", desc: "Reduce la grasa bajo el mentón y define el contorno de la mandíbula." },
          { name: "Blefaroplastia", desc: "Corrige el exceso de piel o bolsas en los párpados para una mirada más descansada." },
          { name: "Otoplastia", desc: "Remodela y acerca las orejas prominentes a una posición más armónica." },
          { name: "Bichectomía", desc: "Retiro de las bolsas de Bichat para afinar las mejillas y estilizar el rostro." },
          { name: "Lifting facial y de cuello", desc: "Reposiciona los tejidos del rostro y el cuello para tratar la flacidez." },
        ],
      },
      {
        slug: "medicina-estetica",
        icon: "syringe",
        title: "Medicina estética",
        short: "Bótox, ácido hialurónico, armonización facial, rejuvenecimiento y PRP.",
        intro:
          "Tratamientos sin cirugía para suavizar arrugas, recuperar volumen y mejorar la calidad de la piel, con resultados naturales y una recuperación rápida.",
        procedures: [
          { name: "Bótox", desc: "Suaviza las líneas de expresión de la frente, el entrecejo y el contorno de los ojos." },
          { name: "Armonización facial", desc: "Combinación de tratamientos para equilibrar las proporciones del rostro." },
          { name: "Ácido hialurónico y rellenos", desc: "Devuelve volumen e hidratación a labios, pómulos, mentón y surcos." },
          { name: "Rejuvenecimiento facial", desc: "Protocolos para mejorar la textura, la firmeza y la luminosidad de la piel." },
          { name: "Plasma rico en plaquetas (PRP)", desc: "Utiliza componentes de su propia sangre para estimular la regeneración de la piel." },
        ],
      },
      {
        slug: "cirugia-reconstructiva",
        icon: "shield",
        title: "Cirugía reconstructiva",
        short: "Fracturas y traumatismos faciales, malformaciones y reconstrucción maxilofacial.",
        intro:
          "Restauramos la forma y la función del rostro después de un accidente, una lesión o una condición de nacimiento, con un enfoque que cuida también la estética.",
        procedures: [
          { name: "Fracturas y traumatismos faciales", desc: "Tratamiento de fracturas de mandíbula, pómulos, nariz y otras lesiones de la cara." },
          { name: "Malformaciones faciales", desc: "Corrección de alteraciones del desarrollo de los maxilares y la cara." },
          { name: "Reconstrucción maxilofacial", desc: "Recuperación de estructuras del rostro y los maxilares afectadas por lesiones o enfermedades." },
        ],
      },
    ] as Service[],
  },
  about: {
    eyebrow: "Sobre nosotros",
    title: "Un centro creado para cuidar de usted",
    text: [
      "Maxilo Aesthetic Implants es un centro de cirugía maxilofacial, implantes y estética facial ubicado en Las Terrenas, Samaná. Atendemos a residentes de la zona y a pacientes que viajan desde otros países para tratarse con nosotros.",
      "Cada caso empieza con una valoración detallada y un plan claro: le explicamos las opciones, los tiempos y los cuidados para que tome su decisión con tranquilidad.",
    ],
    values: ["Valoración personalizada", "Técnicas quirúrgicas precisas", "Resultados naturales", "Seguimiento cercano"],
    statsTitle: "Casos atendidos",
    stats: [
      { label: "Implantes dentales", value: null as string | null },
      { label: "Cirugía oral", value: null as string | null },
      { label: "Estética facial", value: null as string | null },
      { label: "Medicina estética", value: null as string | null },
    ],
    doctorEyebrow: "La doctora",
    doctorName: "Dra. Celia Hernández Mauricio",
    doctorRole: "Cirujana oral y maxilofacial",
    doctorText: [
      "Al frente del centro está la Dra. Celia Hernández Mauricio, especialista en cirugía oral y maxilofacial.",
      "Su enfoque une la precisión quirúrgica con una mirada estética: cada tratamiento busca que usted recupere la función, se sienta seguro y se vea natural.",
    ],
    trainingTitle: "Especialidades y formación",
    training: [] as string[],
    diplomasTitle: "Diplomas y certificaciones",
    diplomas: [] as string[],
    teamTitle: "Nuestro equipo",
    team: [] as { name: string; role: string }[],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Resolvemos sus dudas",
    items: [
      { q: "¿Dónde está ubicado el centro?", a: "Estamos en Las Terrenas, provincia Samaná, República Dominicana." },
      { q: "¿Atienden a pacientes que vienen del extranjero?", a: "Sí. Recibimos pacientes que viven en Las Terrenas y también a quienes viajan desde otros países para su tratamiento. Para implantes dentales ofrecemos la opción de coordinar la estadía en hotel." },
      { q: "¿Cómo agendo una consulta?", a: "Escríbanos por WhatsApp o llámenos al (829) 657-2217 o al (829) 371-0276. También puede dejar sus datos en el formulario de esta página." },
      { q: "¿Qué tratamientos estéticos ofrecen?", a: "Ofrecemos cirugía estética facial (como blefaroplastia, otoplastia, bichectomía o lifting) y medicina estética (bótox, ácido hialurónico, armonización facial, rejuvenecimiento y PRP)." },
      { q: "¿Venden productos para el cuidado de la piel?", a: "Sí, en el centro encontrará productos de la marca Germaine de Capuccini." },
    ],
  },
  reviews: {
    eyebrow: "Valoraciones",
    title: "Lo que dicen nuestros pacientes",
    items: [] as { name: string; text: string; service: string }[],
    emptyText: "Aquí se mostrarán las reseñas reales de los pacientes.",
  },
  brands: {
    eyebrow: "Nuestras marcas",
    title: "Trabajamos con marcas de confianza",
    text: "Usamos materiales y productos de laboratorios reconocidos en implantología, medicina estética y cuidado de la piel.",
    items: [
      { name: "Germaine de Capuccini", category: "Cuidado de la piel" },
      { name: null, category: "Implantes dentales" },
      { name: null, category: "Toxina botulínica" },
      { name: null, category: "Ácido hialurónico" },
    ] as { name: string | null; category: string }[],
  },
  tourism: {
    eyebrow: "Para pacientes que viajan",
    title: "Implantes dentales + estadía en el Caribe",
    text: "Venga a Las Terrenas para su tratamiento de implantes y recupérese con calma. Coordinamos su cirugía junto con el hospedaje en hotel durante y después del procedimiento.",
    steps: [
      { t: "Valoración a distancia", d: "Nos envía sus estudios o radiografías y preparamos un plan preliminar." },
      { t: "Llegada y cirugía", d: "Consulta presencial, confirmación del plan y colocación de los implantes." },
      { t: "Recuperación en hotel", d: "Descanso cerca del centro, con controles durante su estadía." },
      { t: "Seguimiento", d: "Le acompañamos después del viaje hasta la fase final del tratamiento." },
    ],
    cta: "Solicitar información del paquete",
    waMsg: "Hola, me interesa el paquete de implantes dentales con estadía en hotel. ¿Me pueden dar información?",
    note: "Pregunte por las condiciones y fechas disponibles.",
  },
  institutions: {
    eyebrow: "Instituciones",
    title: "Sociedades e instituciones a las que pertenecemos",
    items: [] as string[],
  },
  contact: {
    eyebrow: "Agenda tu consulta",
    title: "Estamos aquí para usted",
    text: "Déjenos sus datos y le escribimos por WhatsApp para coordinar su cita.",
    perks: ["Respuesta rápida por WhatsApp", "Valoración personalizada", "Seguimiento después del tratamiento"],
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    interest: "Servicio de interés",
    interestOptions: ["Implantes dentales", "Cirugía oral", "Cirugía estética facial", "Medicina estética", "Cirugía reconstructiva", "Paquete implantes + estadía", "Otro"],
    message: "Su consulta (opcional)",
    send: "Agendar por WhatsApp",
    privacy: "Usamos sus datos solo para responderle y enviarle información del centro.",
    waIntro: "Hola, quiero agendar una consulta.",
  },
  news: {
    eyebrow: "Blog",
    title: "Blog: noticias y consejos",
    text: "Artículos de la Dra. Celia Hernández y su equipo sobre implantes dentales, cirugía maxilofacial, cuidados después de una cirugía y tratamientos estéticos.",
    soon: "Próximamente",
    empty: "Muy pronto publicaremos nuestros primeros artículos.",
    read: "Leer artículo",
    back: "Volver al blog",
    by: "Por",
    related: "Más artículos",
    ctaTitle: "¿Quiere saber si este tratamiento es para usted?",
  },
  footer: {
    tagline: "Cirugía maxilofacial, implantes y estética facial en Las Terrenas.",
    quick: "Enlaces",
    services: "Servicios",
    hours: "Horario",
    hoursValue: null as string | null,
    contact: "Contacto",
    address: "Las Terrenas, Samaná, R.D. 32000",
    rights: "Todos los derechos reservados.",
    lang: "English",
  },
};

type Dict = typeof es;

const en: Dict = {
  meta: {
    title: "Maxilo Aesthetic Implants | Dental implants & maxillofacial surgery in Las Terrenas",
    description:
      "Oral surgery, dental implants, facial aesthetic surgery and aesthetic medicine by Dr. Celia Hernández Mauricio in Las Terrenas, Samaná, Dominican Republic.",
  },
  nav: {
    home: "Home",
    about: "About us",
    services: "Services",
    allServices: "View all services",
    faq: "FAQ",
    brands: "Our brands",
    news: "Blog",
    contact: "Contact",
    cta: "Book Appointment",
  },
  pending: "To be completed",
  hero: {
    eyebrow: "Maxillofacial surgery · Implants · Facial aesthetics",
    title: "Your smile and your face,",
    titleAccent: "in a specialist's hands.",
    text: "Welcome to Maxilo Aesthetic Implants. In Las Terrenas we care for you with a personal touch, surgical precision and a plan made for you, whether you live here or travel from abroad.",
    cta: "Book Appointment",
    secondary: "View services",
    badges: ["Specialist maxillofacial surgeon", "Local & international patients", "Personalized care"],
    waMsg: "Hello, I would like to book an appointment at Maxilo Aesthetic Implants.",
    nameTag: "Dr. Celia Hernández Mauricio",
    roleTag: "Oral & maxillofacial surgery",
  },
  services: {
    eyebrow: "Our services",
    title: "Complete care for your face and smile",
    more: "Learn more",
    ask: "Ask about this service",
    procedures: "Procedures",
    back: "Back to home",
    otherServices: "Other services",
    ctaTitle: "Questions about this treatment?",
    ctaText: "Message us and the doctor will guide you to the best option for your case.",
    items: [
      {
        slug: "implantes-cirugia-oral",
        icon: "tooth",
        title: "Implants & oral surgery",
        short: "Dental implants, wisdom tooth extraction and oral & maxillofacial surgery.",
        intro: "We replace missing teeth and treat problems of the mouth and jaws with precise surgical techniques, always after a complete assessment of your case.",
        procedures: [
          { name: "Dental implants", desc: "Artificial roots placed in the bone to support crowns or fixed prostheses, for a stable, natural result." },
          { name: "Wisdom tooth extraction", desc: "Removal of wisdom teeth that cause pain, infection or crowding." },
          { name: "Oral & maxillofacial surgery", desc: "Surgical procedures of the mouth, jaws and face, from lesions to bite corrections." },
        ],
      },
      {
        slug: "cirugia-estetica-facial",
        icon: "profile",
        title: "Facial aesthetic surgery",
        short: "Double-chin liposuction, jawline contouring, blepharoplasty, otoplasty and face lifts.",
        intro: "Surgical procedures that enhance your facial features with harmony and a natural look, planned around your proportions and your goals.",
        procedures: [
          { name: "Double-chin liposuction & jawline contouring", desc: "Reduces fat under the chin and defines the jawline." },
          { name: "Blepharoplasty", desc: "Corrects excess skin or bags on the eyelids for a more rested look." },
          { name: "Otoplasty", desc: "Reshapes prominent ears into a more balanced position." },
          { name: "Buccal fat removal", desc: "Removes the buccal fat pads to slim the cheeks and refine the face." },
          { name: "Face & neck lift", desc: "Repositions facial and neck tissues to treat sagging." },
        ],
      },
      {
        slug: "medicina-estetica",
        icon: "syringe",
        title: "Aesthetic medicine",
        short: "Botox, hyaluronic acid, facial harmonization, rejuvenation and PRP.",
        intro: "Non-surgical treatments to soften wrinkles, restore volume and improve skin quality, with natural results and quick recovery.",
        procedures: [
          { name: "Botox", desc: "Softens expression lines on the forehead, between the brows and around the eyes." },
          { name: "Facial harmonization", desc: "A combination of treatments to balance facial proportions." },
          { name: "Hyaluronic acid & fillers", desc: "Restores volume and hydration to lips, cheeks, chin and folds." },
          { name: "Facial rejuvenation", desc: "Protocols to improve skin texture, firmness and radiance." },
          { name: "Platelet-rich plasma (PRP)", desc: "Uses components of your own blood to stimulate skin regeneration." },
        ],
      },
      {
        slug: "cirugia-reconstructiva",
        icon: "shield",
        title: "Reconstructive surgery",
        short: "Facial fractures and trauma, malformations and maxillofacial reconstruction.",
        intro: "We restore the form and function of the face after an accident, injury or congenital condition, with an approach that also cares about aesthetics.",
        procedures: [
          { name: "Facial fractures & trauma", desc: "Treatment of fractures of the jaw, cheekbones, nose and other facial injuries." },
          { name: "Facial malformations", desc: "Correction of developmental changes of the jaws and face." },
          { name: "Maxillofacial reconstruction", desc: "Restoring facial and jaw structures affected by injury or disease." },
        ],
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "A center created to care for you",
    text: [
      "Maxilo Aesthetic Implants is a maxillofacial surgery, implant and facial aesthetics center in Las Terrenas, Samaná. We care for local residents and for patients who travel from other countries for treatment.",
      "Every case begins with a thorough assessment and a clear plan: we explain your options, timing and care so you can decide with peace of mind.",
    ],
    values: ["Personalized assessment", "Precise surgical techniques", "Natural results", "Close follow-up"],
    statsTitle: "Cases treated",
    stats: [
      { label: "Dental implants", value: null },
      { label: "Oral surgery", value: null },
      { label: "Facial aesthetics", value: null },
      { label: "Aesthetic medicine", value: null },
    ],
    doctorEyebrow: "The doctor",
    doctorName: "Dr. Celia Hernández Mauricio",
    doctorRole: "Oral & maxillofacial surgeon",
    doctorText: [
      "The center is led by Dr. Celia Hernández Mauricio, a specialist in oral and maxillofacial surgery.",
      "Her approach combines surgical precision with an aesthetic eye: every treatment aims to restore function, confidence and a natural look.",
    ],
    trainingTitle: "Specialties & training",
    training: [],
    diplomasTitle: "Diplomas & certifications",
    diplomas: [],
    teamTitle: "Our team",
    team: [],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Your questions, answered",
    items: [
      { q: "Where is the clinic located?", a: "We are in Las Terrenas, Samaná province, Dominican Republic." },
      { q: "Do you treat patients traveling from abroad?", a: "Yes. We see patients who live in Las Terrenas as well as those who travel from other countries for treatment. For dental implants we can coordinate your hotel stay." },
      { q: "How do I book an appointment?", a: "Message us on WhatsApp or call +1 (829) 657-2217 or +1 (829) 371-0276. You can also leave your details in the form on this page." },
      { q: "Which aesthetic treatments do you offer?", a: "We offer facial aesthetic surgery (such as blepharoplasty, otoplasty, buccal fat removal or face lifts) and aesthetic medicine (Botox, hyaluronic acid, facial harmonization, rejuvenation and PRP)." },
      { q: "Do you sell skincare products?", a: "Yes, Germaine de Capuccini products are available at the clinic." },
    ],
  },
  reviews: {
    eyebrow: "Reviews",
    title: "What our patients say",
    items: [],
    emptyText: "Real patient reviews will be shown here.",
  },
  brands: {
    eyebrow: "Our brands",
    title: "We work with trusted brands",
    text: "We use materials and products from recognized laboratories in implantology, aesthetic medicine and skincare.",
    items: [
      { name: "Germaine de Capuccini", category: "Skincare" },
      { name: null, category: "Dental implants" },
      { name: null, category: "Botulinum toxin" },
      { name: null, category: "Hyaluronic acid" },
    ],
  },
  tourism: {
    eyebrow: "For traveling patients",
    title: "Dental implants + a Caribbean stay",
    text: "Come to Las Terrenas for your implant treatment and recover at your own pace. We coordinate your surgery together with hotel accommodation during and after the procedure.",
    steps: [
      { t: "Remote assessment", d: "Send us your scans or X-rays and we prepare a preliminary plan." },
      { t: "Arrival & surgery", d: "In-person consultation, plan confirmation and implant placement." },
      { t: "Hotel recovery", d: "Rest close to the clinic, with check-ups during your stay." },
      { t: "Follow-up", d: "We stay with you after your trip through the final stage of treatment." },
    ],
    cta: "Request package details",
    waMsg: "Hello, I'm interested in the dental implant package with hotel stay. Could you send me details?",
    note: "Ask about conditions and available dates.",
  },
  institutions: {
    eyebrow: "Institutions",
    title: "Societies and institutions we belong to",
    items: [],
  },
  contact: {
    eyebrow: "Book Appointment",
    title: "We're here for you",
    text: "Leave your details and we'll message you on WhatsApp to arrange your appointment.",
    perks: ["Quick reply on WhatsApp", "Personalized assessment", "Follow-up after treatment"],
    name: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    interest: "Service of interest",
    interestOptions: ["Dental implants", "Oral surgery", "Facial aesthetic surgery", "Aesthetic medicine", "Reconstructive surgery", "Implants + stay package", "Other"],
    message: "Your question (optional)",
    send: "Book via WhatsApp",
    privacy: "We only use your details to reply and to send you clinic information.",
    waIntro: "Hello, I'd like to book an appointment.",
  },
  news: {
    eyebrow: "Blog",
    title: "Blog: news & advice",
    text: "Articles by Dr. Celia Hernández and her team about dental implants, maxillofacial surgery, post-surgery care and aesthetic treatments.",
    soon: "Coming soon",
    empty: "Our first articles are coming soon.",
    read: "Read article",
    back: "Back to the blog",
    by: "By",
    related: "More articles",
    ctaTitle: "Want to know if this treatment is right for you?",
  },
  footer: {
    tagline: "Maxillofacial surgery, implants and facial aesthetics in Las Terrenas.",
    quick: "Links",
    services: "Services",
    hours: "Hours",
    hoursValue: null,
    contact: "Contact",
    address: "Las Terrenas, Samaná, Dominican Republic 32000",
    rights: "All rights reserved.",
    lang: "Español",
  },
};

export const dictionaries: Record<Locale, Dict> = { es, en };
export type { Dict, Service };
