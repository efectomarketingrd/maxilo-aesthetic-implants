"use client";

import { track as vercelTrack } from "@vercel/analytics";
import { tracking } from "./site";

/* Medición de acciones (solicitud de cita enviada, WhatsApp, llamada, guía, pago) y origen de la visita.
   Copiado de la web del spa (Terrenas Massage) y adaptado. */

type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

// Acciones que cuentan como conversión en Google Ads y Meta
const BOOKING = ["booking_whatsapp", "booking_email", "urgent_whatsapp", "urgent_email"];
const CONTACT = ["whatsapp_click", "call_click", "email_click"];

export function track(name: string, params: Record<string, string> = {}) {
  try {
    vercelTrack(name, params);
  } catch {}
  const w = window as W;
  w.gtag?.("event", name, params);
  if (tracking.googleAds) {
    const label = BOOKING.includes(name) ? tracking.adsLabels.booking : CONTACT.includes(name) ? tracking.adsLabels.contact : "";
    if (label) w.gtag?.("event", "conversion", { send_to: `${tracking.googleAds}/${label}` });
  }
  if (BOOKING.includes(name)) w.fbq?.("track", "Lead");
  else if (CONTACT.includes(name)) w.fbq?.("track", "Contact");
}

const KEY = "mx_origin";
const DAYS = 30;

/** Guarda de dónde llegó el visitante (utm, clic de Google Ads o de Meta) durante 30 días. */
export function saveOrigin() {
  try {
    const q = new URLSearchParams(window.location.search);
    const src = q.get("utm_source");
    const gclid = q.get("gclid") || q.get("gbraid") || q.get("wbraid");
    const fbclid = q.get("fbclid");
    if (!src && !gclid && !fbclid) return;
    const parts = [
      gclid && !src ? "Google Ads" : "",
      fbclid && !src ? "Facebook / Instagram" : "",
      src ? [src, q.get("utm_medium")].filter(Boolean).join(" / ") : "",
      q.get("utm_campaign") ? `· ${q.get("utm_campaign")}` : "",
    ];
    const label = parts.filter(Boolean).join(" ").trim();
    localStorage.setItem(KEY, JSON.stringify({ label, at: Date.now() }));
  } catch {}
}

/** Texto corto del origen para el mensaje de la reserva ("" si llegó directo). */
export function getOrigin(): string {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "";
    const o = JSON.parse(raw) as { label: string; at: number };
    if (Date.now() - o.at > DAYS * 864e5) return "";
    return o.label;
  } catch {
    return "";
  }
}

/** Nombre de la acción según el enlace pulsado (o su atributo data-track). */
export function actionFor(a: HTMLAnchorElement): string {
  const own = a.dataset.track;
  if (own) return own;
  const h = a.getAttribute("href") || "";
  if (h.includes("wa.me/")) return "whatsapp_click";
  if (h.startsWith("tel:")) return "call_click";
  if (h.startsWith("mailto:")) return "email_click";
  if (/(wise\.com|remit\.ly|westernunion\.com)/.test(h)) return "pay_click";
  if (/\.pdf(\?|$)/.test(h)) return "guide_download";
  if (/\/agendar(\?|$)/.test(h)) return "book_click";
  if (/\/urgencias(\?|$)/.test(h)) return "urgent_click";
  return "";
}
