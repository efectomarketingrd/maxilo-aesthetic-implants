import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UrgentForm from "@/components/UrgentForm";
import { WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const u = dictionaries[lang as Locale].urgent;
  return {
    title: u.metaTitle,
    description: u.metaDesc,
    alternates: { canonical: `/${lang}/urgencias`, languages: { es: "/es/urgencias", en: "/en/urgencias" } },
  };
}

export default async function Urgent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const u = t.urgent;
  const tel = `tel:+1${site.phones[0].replace(/\D/g, "")}`;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="urg">
        <section className="urg-hero">
          <div className="container urg-wrap">
            <p className="eyebrow bk2-rise">{u.eyebrow}</p>
            <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              {u.title} <em>{u.titleAccent}</em>
            </h1>
            <p className="urg-hero__text bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{u.intro}</p>
            <p className="urg-hero__day bk2-rise" style={{ "--d": 2.5 } as React.CSSProperties}>
              <span className="urg-dot" aria-hidden="true" />
              {u.anyDay}
            </p>
            <div className="urg-quick bk2-rise" style={{ "--d": 3 } as React.CSSProperties}>
              <a className="btn btn--dark" href={tel}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z" />
                </svg>
                {u.call}
              </a>
              <a className="btn btn--wa" href={waLink(u.waQuick)} target="_blank" rel="noopener noreferrer">
                <WaIcon /> {u.wa}
              </a>
            </div>
            <p className="tr-alert urg-alert bk2-rise" role="note" style={{ "--d": 3.5 } as React.CSSProperties}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 2.5 20h19zM12 10v4.5M12 17.2v.3" />
              </svg>
              <span>{u.emergency}</span>
            </p>
          </div>
        </section>

        <section className="urg-sec">
          <div className="container urg-wrap">
            <ol className="urg-steps">
              {u.steps.map((s, i) => (
                <li key={s.t} className="bk2-rise" style={{ "--d": 4 + i * 0.4 } as React.CSSProperties}>
                  <span>{i + 1}</span>
                  <strong>{s.t}</strong>
                  <small>{s.d}</small>
                </li>
              ))}
            </ol>
            <UrgentForm t={t} />
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
