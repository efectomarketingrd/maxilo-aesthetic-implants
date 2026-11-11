import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UrgentForm from "@/components/UrgentForm";
import { dictionaries } from "@/lib/content";
import { type Locale } from "@/lib/site";

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
            <p className="urg-ref bk2-rise" style={{ "--d": 2.2 } as React.CSSProperties}>
              {u.referralNote}
              <Link href={`/${lang}/agendar`}>{u.referralLink}</Link>.
            </p>
            <p className="urg-hero__day bk2-rise" style={{ "--d": 2.5 } as React.CSSProperties}>
              <span className="urg-dot" aria-hidden="true" />
              {u.anyDay}
            </p>
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
