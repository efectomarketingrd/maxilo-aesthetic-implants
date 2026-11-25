"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { tracking } from "@/lib/site";
import { actionFor, saveOrigin, track } from "@/lib/track";

type Texts = { text: string; accept: string; reject: string; more: string; href: string };

const KEY = "mx_consent";
const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/**
 * Medición del sitio:
 * - Vercel Web Analytics (sin cookies, siempre activo).
 * - Google Analytics 4 / Google Ads y píxel de Meta, solo si hay códigos en `tracking` (lib/site.ts).
 *   Google usa Consent Mode: sin permiso no guarda cookies; el píxel de Meta solo se carga con permiso.
 * - Cuenta los clics en WhatsApp, llamar, correo, reservar y pagar, y guarda el origen de la visita.
 */
export default function Analytics({ c }: { c: Texts }) {
  const google = tracking.ga4 || tracking.googleAds;
  const any = google || tracking.metaPixel;
  const [consent, setConsent] = useState<string | null>("pending");

  useEffect(() => {
    saveOrigin();
    setConsent(read());
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const name = actionFor(a);
      if (name) track(name);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const choose = (v: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setConsent(v);
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    const s = v === "yes" ? "granted" : "denied";
    w.gtag?.("consent", "update", { ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s });
  };

  const ids = [tracking.ga4, tracking.googleAds].filter(Boolean);

  return (
    <>
      <VercelAnalytics />
      {google && (
        <>
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('${KEY}')}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
if(c==='yes')gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
gtag('js',new Date());${ids.map((id) => `gtag('config','${id}');`).join("")}`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`} strategy="afterInteractive" />
        </>
      )}
      {tracking.metaPixel && consent === "yes" && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${tracking.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}
      {any && consent === null && (
        <div className="ck" role="dialog" aria-live="polite" aria-label={c.text}>
          <p>
            {c.text} <a href={c.href}>{c.more}</a>
          </p>
          <div className="ck__btns">
            <button type="button" className="btn btn--dark" onClick={() => choose("yes")}>
              {c.accept}
            </button>
            <button type="button" className="btn btn--line" onClick={() => choose("no")}>
              {c.reject}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
