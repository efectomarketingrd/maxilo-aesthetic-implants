import Image from "next/image";
import type { Dict } from "@/lib/content";
import { spa, spaWa } from "@/lib/site";
import InView from "./InView";
import { WaIcon } from "./Icons";

// Tarjeta del spa Terrenas Massage (marca hermana del segundo nivel).
// Usa la identidad del spa (turquesa #219ebc, marfil frío #f4f6fc, azul noche #050a30, Open Sans), no la de la clínica.
export default function SpaCard({ t, compact = false }: { t: Dict; compact?: boolean }) {
  const c = t.spa;
  return (
    <section className={compact ? "spa spa--compact" : "spa"} aria-label={spa.name}>
      <div className="container">
        <InView className="spa__card">
          <svg className="spa__waves" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
            <path className="spa__wave spa__wave--1" d="M0 70 C 60 50, 120 90, 200 70 S 340 50, 400 70 L 400 120 L 0 120 Z" />
            <path className="spa__wave spa__wave--2" d="M0 86 C 70 70, 130 104, 210 86 S 350 70, 400 88 L 400 120 L 0 120 Z" />
          </svg>
          <span className="spa__ripple" aria-hidden="true" />
          <span className="spa__ripple spa__ripple--2" aria-hidden="true" />
          <p className="spa__eyebrow">{c.eyebrow}</p>
          <Image className="spa__logo" src="/brand/spa/terrenas-massage-blanco.png" alt={`${spa.name} · Relax your body`} width={824} height={180} sizes="280px" />
          <p className="spa__text">{compact ? c.locText : c.text}</p>
          {!compact && (
            <ul className="spa__chips">
              {c.chips.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
          <div className="spa__btns">
            <a className="spa__btn" href={spaWa(c.waMsg)} target="_blank" rel="noopener noreferrer">
              <WaIcon size={18} /> {c.wa}
            </a>
            <a className="spa__btn spa__btn--ghost" href={spa.instagram} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
              {c.ig}
            </a>
          </div>
          <p className="spa__note">{c.note}</p>
        </InView>
      </div>
    </section>
  );
}
