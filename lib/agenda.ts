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
    { time: "11:30", type: "consulta" },
    { time: "12:00", type: "consulta" },
    { time: "12:30", type: "procedimiento", oneSpot: true },
    // Tarde: sujetos a disponibilidad
    { time: "15:00", type: "consulta", alt: true },
    { time: "15:30", type: "consulta", alt: true },
    { time: "16:00", type: "consulta", alt: true },
    { time: "16:30", type: "consulta", alt: true },
    { time: "17:00", type: "consulta", alt: true },
    { time: "17:30", type: "consulta", alt: true },
    { time: "18:00", type: "consulta", alt: true },
    { time: "15:00", type: "procedimiento", alt: true },
    { time: "15:30", type: "procedimiento", alt: true },
    { time: "16:00", type: "procedimiento", alt: true },
    { time: "16:30", type: "procedimiento", alt: true },
    { time: "17:00", type: "procedimiento", alt: true },
    { time: "17:30", type: "procedimiento", alt: true },
    { time: "18:00", type: "procedimiento", alt: true },
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

  // Recargo por atención fuera del horario establecido
  surcharge: "RD$1,000",
};

// ───────── utilidades (no hace falta modificarlas) ─────────

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
