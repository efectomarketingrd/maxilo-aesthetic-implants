"use client";

import { useEffect, useState } from "react";
import { WaIcon } from "./Icons";

// Botones para compartir un artículo. Cada enlace lleva utm_source para saber de qué canal vienen las visitas.
type S = { title: string; label: string; copy: string; copied: string; more: string };

export default function ShareBar({ url, title, s, variant = "top" }: { url: string; title: string; s: S; variant?: "top" | "end" }) {
  const [copied, setCopied] = useState(false);
  const [native, setNative] = useState(false);
  useEffect(() => setNative(typeof navigator !== "undefined" && "share" in navigator), []);

  const tag = (src: string) => `${url}?utm_source=${src}&utm_medium=share&utm_campaign=blog`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title}\n${tag("whatsapp")}`)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tag("facebook"))}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(tag("copy"));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  async function shareNative() {
    try {
      await navigator.share({ title, url: tag("share") });
    } catch {
      /* cancelado */
    }
  }

  return (
    <div className={`share share--${variant}`}>
      {variant === "end" && <p className="share__title">{s.title}</p>}
      <div className="share__row">
        {variant === "top" && <span className="share__label">{s.label}</span>}
        <a className="share__btn share__btn--wa" href={wa} target="_blank" rel="noopener" aria-label={`${s.label}: WhatsApp`}>
          <WaIcon />
          <span>WhatsApp</span>
        </a>
        <a className="share__btn" href={fb} target="_blank" rel="noopener" aria-label={`${s.label}: Facebook`}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
          </svg>
          <span>Facebook</span>
        </a>
        <button type="button" className={`share__btn${copied ? " is-done" : ""}`} onClick={copy} title={s.copy}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {copied ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />}
          </svg>
          <span aria-live="polite">{copied ? s.copied : s.copy}</span>
        </button>
        {native && (
          <button type="button" className="share__btn" onClick={shareNative} title={s.more}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 15V3 M7.5 7.5L12 3l4.5 4.5 M5 12v8h14v-8" />
            </svg>
            <span>{s.more}</span>
          </button>
        )}
      </div>
    </div>
  );
}
