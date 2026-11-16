// Enlace personal "Mi cita": los datos de la solicitud viajan dentro del enlace (sin base de datos).
// Solo lo necesario para mostrar el resumen y el pago: nunca teléfono ni correo.
import { site, type Locale } from "./site";

export type Cita = {
  n: string; // nombre
  s: string; // servicio y opciones
  d: string; // fecha AAAA-MM-DD
  h: string; // hora para mostrar ("" = a confirmar)
  hm: string; // hora HH:MM para el calendario ("" = a confirmar)
  p: string; // lugar o modalidad
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

export function citaUrl(lang: Locale, c: Cita) {
  return `${site.url}/${lang}/mi-cita?c=${toB64Url(JSON.stringify(c))}`;
}

export function readCita(raw: string | undefined): Cita | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(fromB64Url(raw)) as Cita;
    if (!c || typeof c.s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(c.d)) return null;
    return c;
  } catch {
    return null;
  }
}
