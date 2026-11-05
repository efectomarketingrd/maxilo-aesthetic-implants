import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { formatDate, postsFor } from "@/lib/blog";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.news.title} | ${site.name}`,
    description: t.news.text,
    alternates: { canonical: `/${lang}/blog`, languages: { es: "/es/blog", en: "/en/blog" } },
  };
}

export default async function Blog({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const list = postsFor(lang);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Blog`,
    url: `${site.url}/${lang}/blog`,
    inLanguage: lang,
    publisher: { "@id": `${site.url}/#clinic` },
    blogPost: list.map((p) => ({
      "@type": "BlogPosting",
      headline: p.v.title,
      url: `${site.url}/${lang}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main>
        <section className="page-hero page-hero--simple">
          <div className="container">
            <nav className="crumbs" aria-label="breadcrumb">
              <Link href={`/${lang}`}>{t.nav.home}</Link> / <span>{t.nav.news}</span>
            </nav>
            <p className="eyebrow">{t.news.eyebrow}</p>
            <h1>{t.news.title}</h1>
            <p className="lead">{t.news.text}</p>
          </div>
        </section>

        <section className="section section--white">
          <div className="container news-grid">
            {list.length
              ? list.map((p) => (
                  <Link className="news-card news-card--link" href={`/${lang}/blog/${p.slug}`} key={p.slug}>
                    <div className="news-card__img">
                      {p.cover ? (
                        <Image src={p.cover} alt="" fill sizes="(min-width: 720px) 33vw, 100vw" />
                      ) : (
                        <Image className="news-card__mono" src="/brand/mono-dark.png" alt="" width={120} height={80} />
                      )}
                    </div>
                    <span className="tag">{p.v.category}</span>
                    <h3>{p.v.title}</h3>
                    <p className="news-card__excerpt">{p.v.excerpt}</p>
                    <p className="news-card__meta">
                      {formatDate(p.date, lang)} · {p.readMinutes} min
                    </p>
                    <span className="svc-card__more news-card__more">
                      {t.news.read} <Arrow size={14} />
                    </span>
                  </Link>
                ))
              : [1, 2, 3].map((i) => (
                  <article className="news-card news-card--pending" key={i}>
                    <div className="news-card__img">
                      <Image className="news-card__mono" src="/brand/mono-dark.png" alt="" width={120} height={80} />
                    </div>
                    <span className="tag">{t.news.soon}</span>
                    <h3>{t.news.empty}</h3>
                  </article>
                ))}
          </div>
          <div className="container" style={{ textAlign: "center", marginTop: 48 }}>
            <a className="btn btn--dark" href={`/${lang}/agendar`}>
              {t.nav.cta} <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
