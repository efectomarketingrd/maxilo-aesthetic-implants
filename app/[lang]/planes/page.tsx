import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const p = dictionaries[lang as Locale].plan;
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: `/${lang}/planes`, languages: { es: "/es/planes", en: "/en/planes" } },
  };
}

export default async function Plans({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const p = t.plan;
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="pl">
        <section className="pl-hero">
          <div className="container pl-wrap">
            <p className="eyebrow bk2-rise">{p.eyebrow}</p>
            <h1 className="bk2-rise" style={d(1)}>
              {p.title} <em>{p.titleAccent}</em>
            </h1>
            <p className="pl-hero__text bk2-rise" style={d(2)}>{p.intro}</p>
            <div className="pl-choices">
              <Link className="pl-choice pl-choice--main bk2-rise" style={d(3)} href={`/${lang}/planes/crear`}>
                <span className="pl-choice__ico" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M24 6c9 0 14 7 13 15-1 9-6 18-13 20-7-2-12-11-13-20C10 13 15 6 24 6z" />
                    <circle className="pl-dot" cx="18" cy="24" r="2.4" fill="currentColor" />
                    <circle className="pl-dot" cx="30" cy="24" r="2.4" fill="currentColor" style={{ animationDelay: ".4s" }} />
                    <circle className="pl-dot" cx="24" cy="33" r="2.4" fill="currentColor" style={{ animationDelay: ".8s" }} />
                  </svg>
                </span>
                <strong>{p.createT}</strong>
                <small>{p.createD}</small>
                <span className="pl-choice__go">
                  <Arrow size={16} />
                </span>
              </Link>
              <div className="pl-choice pl-choice--soon bk2-rise" style={d(3.5)} aria-disabled="true">
                <span className="pl-choice__ico" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="8" width="30" height="34" rx="5" />
                    <path d="M16 18h16M16 25h16M16 32h10" />
                  </svg>
                </span>
                <span className="pl-soon">{p.soon}</span>
                <strong>{p.readyT}</strong>
                <small>{p.readyD}</small>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
