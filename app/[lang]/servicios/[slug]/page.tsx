import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow, WaIcon, serviceIcons } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { locales, site, waLink, type Locale } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) => dictionaries[lang].services.items.map((s) => ({ lang, slug: s.slug })));
}

function find(lang: string, slug: string) {
  const t = dictionaries[lang as Locale];
  return { t, s: t?.services.items.find((x) => x.slug === slug) };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const { s } = find(lang, slug);
  if (!s) return {};
  const title = `${s.title} en Las Terrenas | ${site.name}`;
  return {
    title: lang === "en" ? `${s.title} in Las Terrenas | ${site.name}` : title,
    description: s.intro,
    alternates: {
      canonical: `/${lang}/servicios/${slug}`,
      languages: { es: `/es/servicios/${slug}`, en: `/en/servicios/${slug}` },
    },
    openGraph: { title: s.title, description: s.intro, url: `/${lang}/servicios/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const { t, s } = find(lang, slug);
  if (!s) notFound();
  const Ico = serviceIcons[s.icon];
  const others = t.services.items.filter((x) => x.slug !== slug);
  const url = `${site.url}/${lang}/servicios/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: s.title,
        description: s.intro,
        inLanguage: lang,
        about: s.procedures.map((p) => ({ "@type": "MedicalProcedure", name: p.name, description: p.desc })),
        provider: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: t.nav.services, item: `${site.url}/${lang}#servicios` },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main>
        <section className="page-hero">
          <div className="container page-hero__grid">
            <div>
              <nav className="crumbs" aria-label="breadcrumb">
                <Link href={`/${lang}`}>{t.nav.home}</Link> / <a href={`/${lang}#servicios`}>{t.nav.services}</a> / <span>{s.title}</span>
              </nav>
              <span className="page-hero__ico"><Ico size={54} /></span>
              <h1>{s.title}</h1>
              <p className="lead">{s.intro}</p>
              <div className="hero__ctas">
                <a className="btn btn--dark" href={`/${lang}#agendar`}>
                  {t.nav.cta} <Arrow />
                </a>
                <a className="btn btn--line" href={waLink(`${t.hero.waMsg} (${s.title})`)} target="_blank" rel="noopener">
                  <WaIcon /> WhatsApp
                </a>
              </div>
            </div>
            <div className="page-hero__photo">
              <Image src="/brand/doctora.jpg" alt={t.about.doctorName} width={1000} height={1473} sizes="(min-width: 1040px) 340px, 60vw" priority />
            </div>
          </div>
        </section>

        <section className="section section--white">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">{t.services.procedures}</p>
              <h2>{s.title}</h2>
            </div>
            <div className="proc-grid">
              {s.procedures.map((p, i) => (
                <article className="proc" key={p.name}>
                  <span className="proc__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <a href={waLink(`${t.hero.waMsg} (${p.name})`)} target="_blank" rel="noopener" className="svc-card__more">
                    {t.services.ask} <Arrow size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--slate section--tight">
          <div className="container cta-band">
            <div>
              <h2>{t.services.ctaTitle}</h2>
              <p className="lead">{t.services.ctaText}</p>
            </div>
            <a className="btn btn--gold" href={waLink(`${t.hero.waMsg} (${s.title})`)} target="_blank" rel="noopener">
              <WaIcon /> {t.services.ask}
            </a>
          </div>
        </section>

        <section className="section section--ivory">
          <div className="container">
            <div className="section__head section__head--center">
              <p className="eyebrow">{t.services.otherServices}</p>
            </div>
            <div className="svc-grid svc-grid--3">
              {others.map((o) => {
                const OI = serviceIcons[o.icon];
                return (
                  <Link key={o.slug} href={`/${lang}/servicios/${o.slug}`} className="svc-card">
                    <span className="svc-card__ico"><OI size={40} /></span>
                    <h3>{o.title}</h3>
                    <p>{o.short}</p>
                    <span className="svc-card__more">{t.services.more} <Arrow size={14} /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
