import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import { Arrow, Check } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.brands.eyebrow} | ${site.name}`,
    description: t.brands.metaDesc,
    alternates: { canonical: `/${lang}/marcas`, languages: { es: "/es/marcas", en: "/en/marcas" } },
  };
}

// Ilustración animada: el implante se dibuja, la corona baja y encaja, y aparece un brillo
function ImplantArt() {
  return (
    <svg className="br-art" viewBox="0 0 200 220">
      <defs>
        <linearGradient id="brTi" x1="0" x2="1">
          <stop offset="0" stopColor="#9aa6ab" />
          <stop offset="0.5" stopColor="#e7ecee" />
          <stop offset="1" stopColor="#8a979c" />
        </linearGradient>
        <linearGradient id="brCrown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#efe7d8" />
        </linearGradient>
        <linearGradient id="brGum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e6dc" />
          <stop offset="0.7" stopColor="#f1e6dc" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f1e6dc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="brHalo">
          <stop offset="0" stopColor="rgba(190,157,97,0.28)" />
          <stop offset="1" stopColor="rgba(190,157,97,0)" />
        </radialGradient>
      </defs>
      <circle className="br-art__halo" cx="100" cy="110" r="96" fill="url(#brHalo)" />
      <circle className="br-art__ring" cx="100" cy="110" r="84" fill="none" stroke="#be9d61" strokeWidth="1" strokeDasharray="2 6" />
      {/* encía / hueso */}
      <path className="br-art__gum" d="M30 128 C 60 118, 140 118, 170 128 C 172 160, 160 200, 100 212 C 40 200, 28 160, 30 128 Z" fill="url(#brGum)" />
      <path d="M30 128 C 60 118, 140 118, 170 128" fill="none" stroke="#e2c9b8" strokeWidth="3" />
      {/* tornillo */}
      <g className="br-art__screw">
        <path d="M84 120 h32 l-3 70 q-13 14 -26 0 z" fill="url(#brTi)" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <path key={k} className="br-art__thread" pathLength={1} d={`M80 ${130 + k * 11} L120 ${125 + k * 11}`} stroke="#6f7c81" strokeWidth="3.2" strokeLinecap="round" style={{ "--t": k } as React.CSSProperties} />
        ))}
        <rect x="90" y="104" width="20" height="18" rx="3" fill="url(#brTi)" />
      </g>
      {/* corona */}
      <g className="br-art__crown">
        <path d="M70 72 C 70 50, 86 44, 100 50 C 114 44, 130 50, 130 72 C 130 90, 122 104, 100 106 C 78 104, 70 90, 70 72 Z" fill="url(#brCrown)" stroke="#d8c39b" strokeWidth="2" />
        <path d="M84 62 C 88 58, 94 58, 96 62" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      </g>
      {/* brillo */}
      <g className="br-art__spark" fill="#be9d61">
        <path d="M146 54 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" />
        <circle cx="58" cy="70" r="2.5" />
        <circle cx="150" cy="96" r="2" />
      </g>
    </svg>
  );
}

// Ilustración: el líquido sube en la jeringa, cae una gota y hace ondas
function SyringeArt() {
  return (
    <svg className="br-syr" viewBox="0 0 220 200">
      <defs>
        <linearGradient id="syrLiquid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d8c39b" />
          <stop offset="1" stopColor="#be9d61" />
        </linearGradient>
        <radialGradient id="syrHalo">
          <stop offset="0" stopColor="rgba(190,157,97,0.25)" />
          <stop offset="1" stopColor="rgba(190,157,97,0)" />
        </radialGradient>
        <clipPath id="syrBarrel">
          <rect x="54" y="62" width="104" height="30" rx="6" />
        </clipPath>
      </defs>
      <circle className="br-syr__halo" cx="110" cy="100" r="92" fill="url(#syrHalo)" />
      {/* vial */}
      <g className="br-syr__vial">
        <rect x="150" y="112" width="40" height="58" rx="8" fill="#ffffff" stroke="#c9d3d6" strokeWidth="2" />
        <rect x="156" y="102" width="28" height="12" rx="3" fill="#9aa6ab" />
        <rect x="150" y="140" width="40" height="30" rx="0" fill="url(#syrLiquid)" opacity="0.35" />
        <rect x="156" y="124" width="28" height="10" rx="2" fill="#253035" opacity="0.15" />
      </g>
      {/* jeringa */}
      <g className="br-syr__body">
        <rect x="54" y="62" width="104" height="30" rx="6" fill="#ffffff" stroke="#253035" strokeWidth="2.4" />
        <g clipPath="url(#syrBarrel)">
          <rect className="br-syr__fill" x="54" y="62" width="104" height="30" fill="url(#syrLiquid)" />
        </g>
        {[0, 1, 2, 3, 4].map((k) => (
          <line key={k} x1={72 + k * 18} y1="62" x2={72 + k * 18} y2="70" stroke="#253035" strokeWidth="1.6" />
        ))}
        <rect x="158" y="72" width="16" height="10" rx="2" fill="#253035" />
        <line x1="174" y1="77" x2="200" y2="77" stroke="#9aa6ab" strokeWidth="2.4" strokeLinecap="round" />
        <g className="br-syr__plunger">
          <rect x="24" y="72" width="34" height="10" rx="2" fill="#253035" />
          <rect x="16" y="60" width="8" height="34" rx="3" fill="#253035" />
        </g>
      </g>
      {/* gota y ondas */}
      <path className="br-syr__drop" d="M201 86 c 4 6, 6 9, 6 12 a 6 6 0 0 1 -12 0 c 0 -3, 2 -6, 6 -12z" fill="#be9d61" />
      <ellipse className="br-syr__ripple" cx="201" cy="186" rx="14" ry="4" fill="none" stroke="#be9d61" strokeWidth="1.6" />
      <ellipse className="br-syr__ripple br-syr__ripple--2" cx="201" cy="186" rx="14" ry="4" fill="none" stroke="#be9d61" strokeWidth="1.6" />
      <g className="br-art__spark" fill="#be9d61">
        <path d="M40 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" />
        <circle cx="120" cy="30" r="2.5" />
      </g>
    </svg>
  );
}

export default async function Brands({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const b = t.brands;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="br">
        {/* Portada */}
        <section className="bk2-hero br-hero">
          <div className="container br-wrap br-hero__grid">
            <div className="br-hero__art" aria-hidden="true">
              <ImplantArt />
            </div>
            <div>
              <p className="eyebrow bk2-rise">{b.eyebrow}</p>
              <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
                {b.title} <em>{b.titleAccent}</em>
              </h1>
              <p className="bk2-hero__text bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{b.text}</p>
              <ul className="br-seals">
                {b.seals.map((x, i) => (
                  <li key={x} className="bk2-rise" style={{ "--d": 3 + i * 0.6 } as React.CSSProperties}>
                    <span className="br-seals__ico">
                      <svg viewBox="0 0 24 24">
                        {i === 0 && <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM8.5 12l2.5 2.5 4.5-5" />}
                        {i === 1 && (
                          <>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3 12h18M12 3c2.5 2.7 3.6 5.6 3.6 9s-1.1 6.3-3.6 9c-2.5-2.7-3.6-5.6-3.6-9S9.5 5.7 12 3z" />
                          </>
                        )}
                        {i === 2 && <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 14l2 2 4-4" />}
                      </svg>
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Implantes */}
        <section className="ab-sec">
          <div className="container br-wrap">
            <h2 className="loc-h2">{b.implantsTitle}</h2>
            <p className="tr-p br-lead">{b.implantsText}</p>
            <InView className="br-cards">
              {b.implants.map((m, i) => (
                <article key={m.maker} className="br-card" style={{ "--i": i } as React.CSSProperties}>
                  <span className="br-card__logo">
                    <Image src={m.logo} alt={m.maker} width={640} height={310} sizes="220px" />
                  </span>
                  <p className="br-card__maker">
                    <strong>{m.maker}</strong>
                    <span>{m.origin}</span>
                  </p>
                  <p className="br-card__product">{m.product}</p>
                  <ul>
                    {m.points.map((pt) => (
                      <li key={pt}>
                        <Check size={13} /> {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </InView>
            <Link className="h5-link br-more" href={`/${lang}/servicios/implantes-cirugia-oral/implantes-dentales`}>
              {t.services.items[0].procedures[0].name} <Arrow size={14} />
            </Link>
          </div>
        </section>

        {/* Por qué importa */}
        <section className="ab-sec ab-sec--white">
          <div className="container br-wrap">
            <h2 className="loc-h2">{b.whyTitle}</h2>
            <InView className="br-why">
              {b.why.map((w, i) => (
                <li key={w.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="br-why__n">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{w.t}</strong>
                  <span>{w.d}</span>
                </li>
              ))}
            </InView>
          </div>
        </section>

        {/* Medicina estética */}
        <section className="ab-sec ab-sec--white">
          <div className="container br-wrap">
            <div className="br-med">
              <InView className="br-med__art">
                <SyringeArt />
              </InView>
              <div>
                <h2 className="loc-h2">{b.aestheticTitle}</h2>
                <p className="tr-p">{b.aestheticLead}</p>
              </div>
            </div>
            <InView className="br-cards br-cards--med">
              {b.aesthetic.map((m, i) => (
                <article key={m.name} className="br-card br-card--med" style={{ "--i": i } as React.CSSProperties}>
                  <span className="br-card__logo br-card__logo--med">
                    <Image src={m.logo} alt={m.name} width={640} height={m.k === "toxin" ? 512 : 258} sizes="220px" />
                  </span>
                  <span className={`br-chip br-chip--${m.k}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {m.k === "toxin" ? (
                        <path d="M9 3h6M10 3v3h4V3M8 6h8v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM8 11h8" />
                      ) : (
                        <path d="M12 3c3.5 4.2 6 7.6 6 10.6A6 6 0 0 1 6 13.6C6 10.6 8.5 7.2 12 3z" />
                      )}
                    </svg>
                    {m.cat}
                  </span>
                  <p className="br-med__name">{m.name}</p>
                  <p className="br-med__maker">{m.maker}</p>
                  <p className="br-med__d">{m.d}</p>
                </article>
              ))}
            </InView>
            <p className="tr-review">{b.aestheticNote}</p>
            <Link className="h5-link br-more" href={`/${lang}/servicios/medicina-estetica`}>
              {b.aestheticTitle} <Arrow size={14} />
            </Link>
          </div>
        </section>

        {/* Cuidado de la piel */}
        <section className="ab-sec">
          <div className="container br-wrap">
            <div className="tr-card tr-card--dark">
              <p className="tr-card__t">{b.skinTitle}</p>
              <p className="br-skin">{b.skin.name}</p>
              <p className="tr-price__note br-skin__t">{b.skin.text}</p>
            </div>
            <p className="tr-review br-legal">{b.legal}</p>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
