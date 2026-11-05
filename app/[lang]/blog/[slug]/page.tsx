import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { findPost, formatDate, posts, postsFor, type Block } from "@/lib/blog";
import { locales, site, waLink, type Locale } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.filter((p) => p[lang]).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = findPost(lang as Locale, slug);
  if (!p) return {};
  const languages: Record<string, string> = {};
  for (const l of locales) if (p[l]) languages[l] = `/${l}/blog/${slug}`;
  return {
    title: `${p.v.title} | ${site.name}`,
    description: p.v.excerpt,
    alternates: { canonical: `/${lang}/blog/${slug}`, languages },
    openGraph: {
      type: "article",
      title: p.v.title,
      description: p.v.excerpt,
      publishedTime: p.date,
      images: [p.cover ?? "/brand/og.png"],
    },
  };
}

function Render({ b }: { b: Block }) {
  if ("h" in b) return <h2>{b.h}</h2>;
  if ("ul" in b) return <ul>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
  if ("tip" in b) return <aside className="post__tip">{b.tip}</aside>;
  return <p>{b.p}</p>;
}

export default async function PostPage({ params }: { params: Params }) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const p = findPost(lang, slug);
  if (!p) notFound();
  const service = p.service ? t.services.items.find((s) => s.slug === p.service) : undefined;
  const related = postsFor(lang).filter((x) => x.slug !== slug).slice(0, 3);
  const url = `${site.url}/${lang}/blog/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.v.title,
        description: p.v.excerpt,
        datePublished: p.date,
        inLanguage: lang,
        url,
        image: `${site.url}${p.cover ?? "/brand/og.png"}`,
        author: { "@id": `${site.url}/#doctor` },
        publisher: { "@id": `${site.url}/#clinic` },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: t.nav.news, item: `${site.url}/${lang}/blog` },
          { "@type": "ListItem", position: 3, name: p.v.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main>
        <article>
          <header className="page-hero page-hero--simple">
            <div className="container post__head">
              <nav className="crumbs" aria-label="breadcrumb">
                <Link href={`/${lang}`}>{t.nav.home}</Link> / <Link href={`/${lang}/blog`}>{t.nav.news}</Link> / <span>{p.v.category}</span>
              </nav>
              <span className="tag">{p.v.category}</span>
              <h1>{p.v.title}</h1>
              <p className="lead">{p.v.excerpt}</p>
              <div className="post__author">
                <Image src="/brand/doctora-retrato.jpg" alt="" width={56} height={56} />
                <span>
                  {t.news.by} <strong>{site.doctor}</strong>
                  <small>{formatDate(p.date, lang)} · {p.readMinutes} min</small>
                </span>
              </div>
            </div>
          </header>

          {p.cover && (
            <div className="container post__cover">
              <Image src={p.cover} alt={p.v.title} width={1200} height={630} priority />
            </div>
          )}

          <div className="container post__body">
            {p.v.body.map((b, i) => (
              <Render b={b} key={i} />
            ))}

            <div className="post__cta">
              <h3>{t.news.ctaTitle}</h3>
              <div className="hero__ctas">
                <a className="btn btn--dark" href={`/${lang}/agendar`}>
                  {t.nav.cta} <Arrow />
                </a>
                {service ? (
                  <Link className="btn btn--line" href={`/${lang}/servicios/${service.slug}`}>
                    {service.title}
                  </Link>
                ) : (
                  <a className="btn btn--line" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                    <WaIcon /> WhatsApp
                  </a>
                )}
              </div>
            </div>

            <Link href={`/${lang}/blog`} className="svc-card__more">
              ← {t.news.back}
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="section section--ivory">
            <div className="container">
              <div className="section__head section__head--center">
                <p className="eyebrow">{t.news.related}</p>
              </div>
              <div className="news-grid">
                {related.map((r) => (
                  <Link className="news-card news-card--link" href={`/${lang}/blog/${r.slug}`} key={r.slug}>
                    <div className="news-card__img">
                      {r.cover ? (
                        <Image src={r.cover} alt="" fill sizes="33vw" />
                      ) : (
                        <Image className="news-card__mono" src="/brand/mono-dark.png" alt="" width={120} height={80} />
                      )}
                    </div>
                    <span className="tag">{r.v.category}</span>
                    <h3>{r.v.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
