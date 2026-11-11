import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanBuilder from "@/components/PlanBuilder";
import { dictionaries } from "@/lib/content";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const p = dictionaries[lang as Locale].plan;
  return {
    title: `${p.b.eyebrow} | ${p.metaTitle}`,
    description: p.metaDesc,
    alternates: { canonical: `/${lang}/planes/crear`, languages: { es: "/es/planes/crear", en: "/en/planes/crear" } },
  };
}

export default async function CreatePlan({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const b = t.plan.b;
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="pl">
        <section className="pl-hero pl-hero--tight">
          <div className="container pl-wrap pl-wrap--wide">
            <nav className="crumbs bk2-rise" aria-label="breadcrumb">
              <Link href={`/${lang}/planes`}>{t.plan.nav}</Link> / <span>{b.eyebrow}</span>
            </nav>
            <h1 className="bk2-rise" style={d(1)}>
              {b.title} <em>{b.titleAccent}</em>
            </h1>
            <p className="pl-hero__text bk2-rise" style={d(2)}>{b.intro}</p>
          </div>
        </section>
        <section className="pl-build">
          <div className="container pl-wrap pl-wrap--wide">
            <PlanBuilder t={t} lang={lang} />
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
