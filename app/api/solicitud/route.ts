// Recibe la solicitud de la agenda y la reenvía al Apps Script del centro (evento en Google Calendar + correo).
// Variables en Vercel: BOOKING_HOOK_URL (URL de la aplicación web de Apps Script) y BOOKING_HOOK_TOKEN (clave privada).
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const LIMIT = 5; // solicitudes por IP
const WINDOW = 10 * 60 * 1000; // en 10 minutos

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const url = process.env.BOOKING_HOOK_URL;
  const token = process.env.BOOKING_HOOK_TOKEN;
  if (!url || !token) return NextResponse.json({ ok: true, skipped: true });

  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Anti-spam: campo oculto que solo rellenan los robots
  if (str(d.website)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const payload = {
    token,
    name: str(d.name, 120),
    phone: str(d.phone, 40),
    email: str(d.email, 160),
    service: str(d.service, 200),
    place: str(d.place, 200),
    date: str(d.date, 10),
    time: str(d.time, 5),
    minutes: Number(d.minutes) === 60 ? 60 : 30,
    dateLabel: str(d.dateLabel, 80),
    message: str(d.message, 4000),
  };
  if (!payload.name || !payload.phone || !/^\d{4}-\d{2}-\d{2}$/.test(payload.date)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const text = await r.text();
    const ok = r.ok && /"ok"\s*:\s*true/.test(text);
    return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
