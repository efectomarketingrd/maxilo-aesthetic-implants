// Calendario de "Mi cita" (solo cuando la cita está confirmada): Google Calendar y archivo .ics.
import { dictionaries } from "./content";
import { centers, site, xrayCenters, type Locale } from "./site";
import type { Cita } from "./cita";

const pad = (n: number) => String(n).padStart(2, "0");

export function citaEvent(c: Cita, lang: Locale, link: string) {
  const b = dictionaries[lang].booking;
  const svc = [b.services[c.sv]?.name ?? "", c.sub].filter(Boolean).join(" — ");
  const ctr = centers.find((x) => x.id === c.pl);
  const location = c.m === "online" || !ctr ? b.modes.online : `${ctr.name}, ${ctr.town}`;
  const [y, mo, d] = c.d.split("-").map(Number);
  const ymd = `${y}${pad(mo)}${pad(d)}`;
  let start = "";
  let end = "";
  let allDay = true;
  if (c.hm) {
    allDay = false;
    const [h, m] = c.hm.split(":").map(Number);
    const e = h * 60 + m + (c.k === "procedimiento" ? 60 : 30);
    start = `${ymd}T${pad(h)}${pad(m)}00`;
    end = `${ymd}T${pad(Math.floor(e / 60))}${pad(e % 60)}00`;
  } else {
    const n = new Date(Date.UTC(y, mo - 1, d + 1));
    start = ymd;
    end = `${n.getUTCFullYear()}${pad(n.getUTCMonth() + 1)}${pad(n.getUTCDate())}`;
  }
  const pano = c.r ? `\n${b.pano.cal}\n${b.pano.where}: ${xrayCenters.map((x) => `${x.name} (${x.area}) ${x.phone ?? ""}`.trim()).join(" · ")}` : "";
  const details = `${svc}${pano}\n${b.cita.msgLink}: ${link}\n${site.phones[0]} · ${site.email}`;
  return { title: b.cita.calTitle, details, location, start, end, allDay };
}

export function googleCalHref(ev: ReturnType<typeof citaEvent>) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${ev.start}/${ev.end}`,
    details: ev.details,
    location: ev.location,
    ctz: "America/Santo_Domingo",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export function icsText(ev: ReturnType<typeof citaEvent>, uid: string) {
  const esc = (x: string) => x.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
  // República Dominicana: UTC-4 todo el año (sin horario de verano)
  const utc = (s: string) => {
    const u = new Date(Date.UTC(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8), +s.slice(9, 11) + 4, +s.slice(11, 13)));
    return `${u.getUTCFullYear()}${pad(u.getUTCMonth() + 1)}${pad(u.getUTCDate())}T${pad(u.getUTCHours())}${pad(u.getUTCMinutes())}00Z`;
  };
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maxilo Aesthetic Implants//Mi cita//ES",
    "BEGIN:VEVENT",
    `UID:${uid}@maxiloaestheticimplants.com`,
    `DTSTAMP:${stamp}`,
    ev.allDay ? `DTSTART;VALUE=DATE:${ev.start}` : `DTSTART:${utc(ev.start)}`,
    ev.allDay ? `DTEND;VALUE=DATE:${ev.end}` : `DTEND:${utc(ev.end)}`,
    `SUMMARY:${esc(ev.title)}`,
    `DESCRIPTION:${esc(ev.details)}`,
    `LOCATION:${esc(ev.location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(ev.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
