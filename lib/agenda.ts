// ─────────────────────────────────────────────────────────────
// AGENDA DEL CENTRO — aquí se controlan los días y horarios disponibles.
// Cualquier cambio en este archivo se publica en la web al subirlo a GitHub.
// ─────────────────────────────────────────────────────────────

export type SlotType = "consulta" | "procedimiento";

export type Slot = {
  time: string; // formato 24 h, "HH:MM"
  type: SlotType;
  alt?: boolean; // horario alternativo (sujeto a disponibilidad)
  oneSpot?: boolean; // un solo cupo
};

export const agenda = {
  // Días de atención: 0 = domingo, 1 = lunes, 2 = martes … 6 = sábado
  weekdays: [2, 3, 4, 5], // martes a viernes

  // Horarios establecidos
  slots: [
    // Horario en que la doctora está en el centro (consultas y procedimientos)
    { time: "11:30", type: "consulta" },
    { time: "12:00", type: "consulta" },
    { time: "12:30", type: "consulta" },
    { time: "13:00", type: "consulta" },
    { time: "11:30", type: "procedimiento" },
    { time: "12:00", type: "procedimiento" },
    { time: "12:30", type: "procedimiento" },
    { time: "13:00", type: "procedimiento" },
  ] as Slot[],

  // Días CERRADOS (feriados, vacaciones, congresos…). Formato "AAAA-MM-DD".
  // Ejemplo: ["2026-12-24", "2026-12-25", "2026-12-31"]
  closedDates: [] as string[],

  // Horarios OCUPADOS o bloqueados en un día concreto.
  // Ejemplo: { "2026-11-13": ["12:30"], "2026-11-14": ["11:30", "12:00"] }
  blockedSlots: {} as Record<string, string[]>,

  // Días EXTRA abiertos fuera de martes a viernes (por ejemplo, un sábado especial).
  // Ejemplo: ["2026-11-22"]
  extraDates: [] as string[],

  // Hasta cuántos días hacia adelante se puede agendar
  maxDaysAhead: 60,

  // Días mínimos de anticipación (1 = desde mañana)
  minDaysAhead: 1,

  // Procedimientos: días mínimos de anticipación y anticipo mínimo (%)
  procMinDaysAhead: 7,
  procDeposit: 50,


  // Costo de la consulta (en pesos). Los procedimientos se cotizan después de la valoración.
  prices: { presencial: 3000, online: 1500 },

  // Extracción de cordales (terceros molares): precio por cordal; si son las 4, precio especial por cordal
  // precio por cordal según cuántas se extraen
  molarPrice: 10000, // 1 cordal
  molarPrice23: 8500, // 2 o 3 cordales, c/u
  molarPriceAll4: 7000, // las 4, c/u

  // Bótox: incluye la aplicación y un retoque a las 2 semanas
  botoxPrice: 28000,

  // Rellenos de ácido hialurónico: precio por área
  fillerPrice: 30000, // 1 área
  fillerPriceMulti: 25000, // desde 2 áreas, cada una (7 áreas en total)
  // PRP facial: por sesión
  prpFacialPrice: 10000,
  // Hilos (fijados en pesos; equivalen a US$500 y US$400)
  threadLiftPrice: 31000,
  threadBioPrice: 24500,
  // Lobuloplastia: por oreja · Eliminación de verrugas: por área
  lobulePrice: 10000,
  wartPrice: 8000,

  // PRP capilar: precio por sesión y planes (los planes se pagan completos al inicio)
  prpPrice: 10000,
  prpPlans: [
    { id: "1", sessions: 1, price: 10000 },
    { id: "3m", sessions: 3, price: 25000 },
    { id: "1y", sessions: 6, price: 45000 },
    { id: "mant", sessions: 1, price: 8000 },
  ],

  // Tasa aproximada para mostrar el equivalente en dólares (RD$ por US$1)
  usdRate: 61.5,
};

// ───────── utilidades (no hace falta modificarlas) ─────────

export function rd(n: number) {
  return `RD$${n.toLocaleString("en-US")}`;
}

// Equivalente aproximado en dólares, redondeado a múltiplos de 5
export function usd(n: number) {
  return `US$${Math.max(5, Math.round(n / agenda.usdRate / 5) * 5).toLocaleString("en-US")}`;
}

export function toKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function isOpenDay(d: Date) {
  const key = toKey(d);
  if (agenda.closedDates.includes(key)) return false;
  if (agenda.extraDates.includes(key)) return true;
  return agenda.weekdays.includes(d.getDay());
}

export function slotsFor(d: Date) {
  const blocked = agenda.blockedSlots[toKey(d)] ?? [];
  return agenda.slots.filter((s) => !blocked.includes(s.time));
}

export function formatTime(time: string, lang: "es" | "en") {
  const [h, m] = time.split(":").map(Number);
  const suffix = lang === "es" ? (h < 12 ? "a. m." : "p. m.") : h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}
