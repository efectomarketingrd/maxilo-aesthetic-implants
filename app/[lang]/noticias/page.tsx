import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.news.title} | ${site.name}`,
    description: t.news.text,
    alternates: { canonical: `/${lang}/noticias`, languages: { es: "/es/noticias", en: "/en/noticias" } },
  };
}

export default async function News({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <section className="page-hero page-hero--simple">
          <div className="container">
            <nav className="crumbs" aria-label="breadcrumb">
              <Link href={`/${lang}`}>{t.nav.home}</Link> / <span>{t.news.title}</span>
            </nav>
            <p className="eyebrow">{t.news.eyebrow}</p>
            <h1>{t.news.title}</h1>
            <p className="lead">{t.news.text}</p>
          </div>
        </section>
        <section className="section section--white">
          <div className="container news-grid">
            {[1, 2, 3].map((i) => (
              <article className="news-card" key={i}>
                <div className="news-card__img" />
                <span className="tag">{t.news.soon}</span>
                <h3>{t.pending}</h3>
              </article>
            ))}
          </div>
          <div className="container" style={{ textAlign: "center", marginTop: 40 }}>
            <a className="btn btn--dark" href={`/${lang}#agendar`}>
              {t.nav.cta} <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
