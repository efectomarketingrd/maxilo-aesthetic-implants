// Enlace personal "Mi cita": los datos de la solicitud viajan dentro del enlace (sin base de datos).
// Solo lo necesario para mostrar el resumen y el pago: nunca teléfono ni correo.
// Formato corto (16 nov 2026): campos separados por "~", en UTF-8 y base64url → https://dominio/c/<código>
// (app/c/[code] redirige a /<idioma>/mi-cita?c=<código>). El idioma, el servicio y el lugar viajan como
// códigos; los textos se reconstruyen en la página con el diccionario del idioma.
import { site, type Locale } from "./site";

export type Cita = {
  n: string; // nombre (solo el primero)
  sv: number; // índice del servicio en booking.services (-1 = sin servicio)
  sub: string; // opciones elegidas (texto)
  d: string; // fecha AAAA-MM-DD
  hm: string; // hora HH:MM ("" = a confirmar)
  pl: string; // id del centro, o "o" = online
  k: "consulta" | "procedimiento";
  m: "presencial" | "online";
  x: 0 | 1; // otro centro (anticipo para confirmar)
  t: number; // total estimado (-1 = a confirmar)
  dep: number; // anticipo (0 = no aplica o a confirmar)
  dt: 0 | 1; // anticipo a confirmar
  pf: number; // pago completo de plan PRP
  r: 0 | 1; // traer radiografía panorámica
};

const toB64Url = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromB64Url = (s: string) => {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

const n36 = (n: number) => (n < 0 ? "-" : n ? n.toString(36) : "");
const p36 = (s: string) => (s === "-" ? -1 : s ? parseInt(s, 36) || 0 : 0);
const clean = (s: string) => s.replace(/~/g, "-").trim();

export function citaUrl(lang: Locale, c: Cita) {
  const flags = (c.k === "procedimiento" ? 1 : 0) | (c.m === "online" ? 2 : 0) | (c.x ? 4 : 0) | (c.dt ? 8 : 0) | (c.r ? 16 : 0);
  const parts = [
    lang === "en" ? "e" : "s",
    clean(c.n.split(/\s+/)[0] ?? ""),
    c.sv < 0 ? "" : c.sv.toString(36),
    clean(c.sub),
    c.d.slice(2).replace(/-/g, ""),
    c.hm.replace(":", ""),
    c.pl,
    flags.toString(36),
    n36(c.t),
    n36(c.dep),
    n36(c.pf),
  ];
  return `${site.url}/c/${toB64Url(parts.join("~"))}`;
}

export function citaLang(raw: string): Locale | null {
  try {
    const f = fromB64Url(raw)[0];
    return f === "e" ? "en" : f === "s" ? "es" : null;
  } catch {
    return null;
  }
}

export function readCita(raw: string | undefined): Cita | null {
  if (!raw) return null;
  try {
    const p = fromB64Url(raw).split("~");
    if (p.length !== 11 || !/^\d{6}$/.test(p[4])) return null;
    const f = parseInt(p[7], 36) || 0;
    const ymd = p[4];
    return {
      n: p[1],
      sv: p[2] ? parseInt(p[2], 36) : -1,
      sub: p[3],
      d: `20${ymd.slice(0, 2)}-${ymd.slice(2, 4)}-${ymd.slice(4, 6)}`,
      hm: /^\d{4}$/.test(p[5]) ? `${p[5].slice(0, 2)}:${p[5].slice(2)}` : "",
      pl: p[6],
      k: f & 1 ? "procedimiento" : "consulta",
      m: f & 2 ? "online" : "presencial",
      x: f & 4 ? 1 : 0,
      dt: f & 8 ? 1 : 0,
      r: f & 16 ? 1 : 0,
      t: p36(p[8]),
      dep: p36(p[9]),
      pf: p36(p[10]),
    };
  } catch {
    return null;
  }
}
