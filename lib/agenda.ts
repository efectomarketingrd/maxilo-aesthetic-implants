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


  // Costo de la consulta (en pesos). Los procedimientos se cotizan después de la valoración.
  prices: { presencial: 3000, online: 1500 },

  // Tasa aproximada para mostrar el equivalente en dólares (RD$ por US$1)
  usdRate: 61.5,
};

// ───────── utilidades (no hace falta modificarlas) ─────────

export function rd(n: number) {
  return `RD$${n.toLocaleString("en-US")}`;
}

// Equivalente aproximado en dólares, redondeado a múltiplos de 5
export function usd(n: number) {
  return `US$${Math.max(5, Math.round(n / agenda.usdRate / 5) * 5)}`;
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
