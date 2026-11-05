import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import { waLink, type Locale } from "@/lib/site";
import InView from "./InView";
import { Arrow, WaIcon } from "./Icons";

const stepIcons = [
  // servicio (lista)
  <path key="a" d="M15 14h22M15 24h22M15 34h14M9 14h.01M9 24h.01M9 34h.01" />,
  // calendario
  <g key="b"><rect x="8" y="11" width="32" height="29" rx="4" /><path d="M8 19h32M16 7v8M32 7v8M17 28h4M27 28h4" /></g>,
  // confirmación
  <g key="c"><circle cx="24" cy="24" r="16" /><path d="M16 24l6 6 11-12" /></g>,
];

export default function CtaCard({ t, lang }: { t: Dict; lang: Locale }) {
  const h = t.home;
  return (
    <section className="h5-cta">
      <div className="container">
        <InView className="cta2">
          <span className="cta2__border" aria-hidden="true" />
          <span className="cta2__halo" aria-hidden="true" />
          <span className="cta2__arc cta2__arc--tl" aria-hidden="true" />
          <span className="cta2__arc cta2__arc--br" aria-hidden="true" />
          <Image className="cta2__mark" src="/brand/mono-dark.png" alt="" width={548} height={370} aria-hidden="true" />

          <h2 className="cta2__title cta2-up" style={{ "--d": 1 } as React.CSSProperties}>{h.ctaTitle}</h2>
          <p className="cta2__text cta2-up" style={{ "--d": 2 } as React.CSSProperties}>{h.ctaText}</p>

          <ol className="cta2__steps cta2-up" style={{ "--d": 3 } as React.CSSProperties}>
            {h.ctaSteps.map((s, i) => (
              <li key={s} style={{ "--s": i } as React.CSSProperties}>
                <span className="cta2__step-ico">
                  <svg viewBox="0 0 48 48" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {stepIcons[i]}
                  </svg>
                </span>
                <span className="cta2__step-txt">
                  <b>{i + 1}</b> {s}
                </span>
              </li>
            ))}
          </ol>

          <div className="cta2__btns cta2-up" style={{ "--d": 4 } as React.CSSProperties}>
            <Link className="btn btn--gold h5-btn-shine cta2__book" href={`/${lang}/agendar`}>
              <svg viewBox="0 0 48 48" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <rect x="7" y="10" width="34" height="31" rx="4" />
                <path d="M7 19h34M16 6v8M32 6v8" />
              </svg>
              {t.nav.cta} <Arrow size={14} />
            </Link>
            <a className="btn cta2__wa" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
              <span className="cta2__wa-ico"><WaIcon /></span> WhatsApp
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}
