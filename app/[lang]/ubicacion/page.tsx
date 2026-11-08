import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import { Arrow, Clock, Mail, Phone, Pin, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { locales, site, waLink, type Locale } from "@/lib/site";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  if (!t) return {};
  return {
    title: t.location.metaTitle,
    description: t.location.metaDesc,
    alternates: {
      canonical: `${site.url}/${lang}/ubicacion`,
      languages: { es: `${site.url}/es/ubicacion`, en: `${site.url}/en/ubicacion` },
    },
  };
}

// Mapa ilustrado (no a escala): costa, calles, parque, supermercados y el pin del centro
function MapArt() {
  return (
    <svg className="loc-map__art" viewBox="0 0 360 220" aria-hidden="true">
      <defs>
        <linearGradient id="locSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe0df" />
          <stop offset="1" stopColor="#e6eeec" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill="#f3efe7" />
      <path d="M0 0h360v46c-40 10-70 2-110 8s-70 18-120 10S30 50 0 58z" fill="url(#locSea)" />
      <path className="loc-wave" d="M20 30c20-6 40 6 60 0s40-6 60 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path className="loc-wave loc-wave--2" d="M200 24c20-6 40 6 60 0s40-6 60 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Calles */}
      <g className="loc-roads" stroke="#fff" strokeLinecap="round" fill="none">
        <path pathLength={1} d="M-10 120 C 80 112, 160 128, 370 116" strokeWidth="14" />
        <path pathLength={1} d="M150 230 C 152 180, 170 140, 176 64" strokeWidth="10" />
        <path pathLength={1} d="M250 230 C 248 190, 262 150, 300 118" strokeWidth="8" />
      </g>
      {/* Parque */}
      <g className="loc-poi" style={{ "--p": 0 } as React.CSSProperties}>
        <rect x="196" y="138" width="54" height="36" rx="8" fill="#cfdccb" />
        <circle cx="210" cy="152" r="7" fill="#a9c3a3" />
        <circle cx="228" cy="160" r="8" fill="#a9c3a3" />
        <circle cx="241" cy="148" r="6" fill="#a9c3a3" />
      </g>
      {/* Supermercados */}
      <g className="loc-poi" style={{ "--p": 1 } as React.CSSProperties}>
        <rect x="64" y="74" width="40" height="28" rx="6" fill="#e3dccf" />
        <path d="M74 84h20l-3 9H77z" fill="none" stroke="#be9d61" strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      <g className="loc-poi" style={{ "--p": 2 } as React.CSSProperties}>
        <rect x="276" y="62" width="40" height="28" rx="6" fill="#e3dccf" />
        <path d="M286 72h20l-3 9h-14z" fill="none" stroke="#be9d61" strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      {/* Pin */}
      <g className="loc-pin">
        <ellipse className="loc-pin__ring" cx="178" cy="150" rx="16" ry="6" fill="none" stroke="#be9d61" strokeWidth="2" />
        <ellipse className="loc-pin__ring loc-pin__ring--2" cx="178" cy="150" rx="16" ry="6" fill="none" stroke="#be9d61" strokeWidth="2" />
        <g className="loc-pin__drop">
          <path d="M178 150c-12-16-20-26-20-36a20 20 0 1 1 40 0c0 10-8 20-20 36z" fill="#253035" />
          <circle cx="178" cy="114" r="8" fill="#d8c39b" />
        </g>
      </g>
    </svg>
  );
}

function RefIcon({ k }: { k: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {k === "park" && (
        <>
          <circle cx="8" cy="9" r="4" />
          <circle cx="16" cy="8" r="3.4" />
          <path d="M8 13v7M16 11.4V20M4 20h16" />
        </>
      )}
      {k === "shop" && (
        <>
          <path d="M3 5h2.4l2.2 10h10.2L20 8H6.4" />
          <circle cx="9" cy="19" r="1.4" />
          <circle cx="17" cy="19" r="1.4" />
        </>
      )}
      {k === "car" && (
        <>
          <path d="M4 15.5V12l2-5h12l2 5v3.5" />
          <path d="M3 15.5h18v2.5H3z" />
          <circle cx="7.5" cy="18" r="1.6" />
          <circle cx="16.5" cy="18" r="1.6" />
        </>
      )}
    </svg>
  );
}

export default async function LocationPage({ params }: { params: Params }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  if (!t) notFound();
  const c = t.location;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: `${site.url}/${lang}/ubicacion`,
        name: c.metaTitle,
        description: c.metaDesc,
        inLanguage: lang,
        about: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: c.nav, item: `${site.url}/${lang}/ubicacion` },
        ],
      },
    ],
  };

  const photos = [
    { src: "/brand/ubicacion-entrada.jpg", w: 1599, h: 899 },
    { src: "/brand/ubicacion-recepcion.jpg", w: 899, h: 1599 },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main className="loc">
        {/* Portada */}
        <section className="bk2-hero loc-hero">
          <div className="container">
            <p className="eyebrow bk2-rise" style={{ "--d": 0 } as React.CSSProperties}>{c.eyebrow}</p>
            <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              {c.title} <em>{c.titleAccent}</em>
            </h1>
            <p className="bk2-hero__text bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{c.text}</p>
            <ul className="bk2-chips">
              {c.chips.map((chip, i) => (
                <li key={chip} className="bk2-rise" style={{ "--d": 3 + i * 0.5 } as React.CSSProperties}>
                  {i === 0 ? <Pin size={16} /> : i === 1 ? <RefIcon k="car" /> : <Clock size={16} />}
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mapa */}
        <section className="loc-sec">
          <div className="container loc-wrap">
            <a className="loc-map bk2-rise" style={{ "--d": 4 } as React.CSSProperties} href={site.maps} target="_blank" rel="noopener noreferrer">
              <MapArt />
              <span className="loc-map__card">
                <strong>{c.mapTitle}</strong>
                <span>{c.mapText}</span>
                <span className="btn btn--dark btn--sm h5-btn-shine loc-map__btn">
                  {c.mapBtn} <Arrow size={14} />
                </span>
              </span>
            </a>

            {/* Referencias */}
            <InView className="loc-refs">
              <h2 className="loc-h2">{c.refsTitle}</h2>
              <ul>
                {c.refs.map((r, i) => (
                  <li key={r.k} style={{ "--i": i } as React.CSSProperties}>
                    <span className="loc-refs__ico">
                      <RefIcon k={r.k} />
                    </span>
                    <span>
                      <strong>{r.t}</strong>
                      <span>{r.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </InView>
          </div>
        </section>

        {/* Al llegar: fotos */}
        <section className="loc-sec loc-sec--white">
          <div className="container loc-wrap">
            <h2 className="loc-h2">{c.arriveTitle}</h2>
            <InView className="loc-arrive">
              {c.arrive.map((a, i) => (
                <figure key={a.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className={`loc-arrive__img ${i === 1 ? "loc-arrive__img--tall" : ""}`}>
                    <Image src={photos[i].src} alt={a.t} width={photos[i].w} height={photos[i].h} sizes="(min-width: 900px) 420px, 92vw" />
                    <span className="loc-arrive__n">{i + 1}</span>
                  </span>
                  <figcaption>
                    <strong>{a.t}</strong>
                    <span>{a.d}</span>
                  </figcaption>
                </figure>
              ))}
            </InView>
          </div>
        </section>

        {/* Cómo llegar + horario + contacto */}
        <section className="loc-sec">
          <div className="container loc-wrap">
            <InView className="loc-routes">
              <h2 className="loc-h2">{c.routesTitle}</h2>
              <ol>
                {c.routes.map((r, i) => (
                  <li key={r.from} style={{ "--i": i } as React.CSSProperties}>
                    <span className="loc-routes__dot" aria-hidden="true" />
                    <span className="loc-routes__from">
                      <strong>{r.from}</strong>
                      {"note" in r && r.note && <small>{r.note}</small>}
                    </span>
                    <span className="loc-routes__time">{r.time}</span>
                  </li>
                ))}
                <li className="loc-routes__end" style={{ "--i": c.routes.length } as React.CSSProperties}>
                  <span className="loc-routes__dot loc-routes__dot--end" aria-hidden="true" />
                  <span className="loc-routes__from">
                    <strong>{site.name}</strong>
                    <small>{c.mapTitle}</small>
                  </span>
                </li>
              </ol>
              <p className="loc-note">{c.routesNote}</p>
            </InView>

            <div className="loc-info">
              <div className="loc-hours">
                <span className="loc-hours__ico">
                  <Clock size={22} />
                </span>
                <div>
                  <p className="loc-hours__t">{c.centerTitle}</p>
                  {c.center.map((h) => (
                    <p className="loc-hours__h" key={h}>{h}</p>
                  ))}
                  <span className="loc-hours__sep" aria-hidden="true" />
                  <p className="loc-hours__t">{c.hoursTitle}</p>
                  <p className="loc-hours__h">{c.hours}</p>
                  <p className="loc-hours__s">{c.hoursSpecial}</p>
                </div>
              </div>
              <div className="loc-help">
                <p className="loc-help__t">{c.contactTitle}</p>
                <p className="loc-help__d">{c.contactText}</p>
                <div className="loc-help__btns">
                  <a className="faq-chip faq-chip--wa" href={waLink(c.waMsg)} target="_blank" rel="noopener noreferrer">
                    <WaIcon size={16} /> WhatsApp
                  </a>
                  <a className="faq-chip" href={`tel:+1${site.phones[0].replace(/\D/g, "")}`}>
                    <Phone size={15} /> {c.call}
                  </a>
                  <a className="faq-chip" href={`mailto:${site.email}`}>
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
