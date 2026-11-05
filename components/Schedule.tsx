import type { Dict } from "@/lib/content";
import { agenda, formatTime } from "@/lib/agenda";
import type { Locale } from "@/lib/site";

// Horario de atención, generado desde lib/agenda.ts
export default function Schedule({ t, lang, compact = false }: { t: Dict; lang: Locale; compact?: boolean }) {
  const b = t.booking;
  const label = (type: string, alt?: boolean) =>
    type === "consulta" ? (alt ? b.scheduleAltC : b.scheduleConsulta) : alt ? b.scheduleAltP : b.scheduleProc;

  const regularC = agenda.slots.filter((s) => s.type === "consulta" && !s.alt);
  const rows = [
    ...(regularC.length ? [{ times: regularC.map((s) => formatTime(s.time, lang)).join(" · "), label: label("consulta") }] : []),
    ...agenda.slots
      .filter((s) => !(s.type === "consulta" && !s.alt))
      .map((s) => ({
        times: formatTime(s.time, lang),
        label: `${label(s.type, s.alt)}${s.oneSpot ? ` (${b.oneSpot})` : ""}`,
        alt: s.alt,
      })),
  ];

  return (
    <div className={`schedule ${compact ? "schedule--compact" : ""}`}>
      <p className="schedule__days">{b.scheduleDays}</p>
      <ul>
        {rows.map((r) => (
          <li key={r.times + r.label} className={"alt" in r && r.alt ? "is-alt" : ""}>
            <strong>{r.times}</strong>
            <span>{r.label}</span>
          </li>
        ))}
      </ul>
      <p className="schedule__note">
        {b.scheduleNote} <strong>{agenda.surcharge}</strong>.
      </p>
    </div>
  );
}
