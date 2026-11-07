import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InView from "@/components/InView";
import { Arrow, Check, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { img } from "@/lib/images";
import { site, waLink, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const k = dictionaries[lang as Locale].pkg;
  return {
    title: k.metaTitle,
    description: k.metaDesc,
    alternates: { canonical: `/${lang}/paquete-implantes`, languages: { es: "/es/paquete-implantes", en: "/en/paquete-implantes" } },
    openGraph: { title: k.metaTitle, description: k.metaDesc, images: [img.playa] },
  };
}

export default async function Package({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const k = t.pkg;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${k.title} ${k.titleAccent}`,
    description: k.metaDesc,
    url: `${site.url}/${lang}/paquete-implantes`,
    offeredBy: { "@id": `${site.url}/#clinic` },
    itemOffered: { "@type": "MedicalProcedure", name: lang === "es" ? "Implantes dentales" : "Dental implants" },
    areaServed: "Las Terrenas, Samaná, República Dominicana",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main>
        <section className="pk-hero">
          <Image className="pk-hero__bg" src={img.playa} alt="" fill priority sizes="100vw" />
          <span className="pk-hero__shade" aria-hidden="true" />
          <div className="container pk-hero__inner">
            <nav className="crumbs crumbs--light" aria-label="breadcrumb">
              <Link href={`/${lang}`}>{t.nav.home}</Link> / <span>{k.nav}</span>
            </nav>
            <p className="offer2__tag">{k.eyebrow}</p>
            <h1>
              {k.title} <em>{k.titleAccent}</em>
            </h1>
            <p className="pk-hero__text">{k.intro}</p>
            <div className="pk-hero__ctas">
              <a className="btn btn--gold h5-btn-shine" href={waLink(t.tourism.waMsg)} target="_blank" rel="noopener">
                <WaIcon /> {k.ctaWa}
              </a>
              <Link className="btn pk-btn-light" href={`/${lang}/agendar`}>
                {k.ctaBook} <Arrow size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="h5-sec h5-sec--white">
          <div className="container">
            <div className="h5-head">
              <p className="eyebrow">{k.nav}</p>
              <h2>{k.includesTitle}</h2>
            </div>
            <InView className="pk-includes">
              {k.includes.map((x, i) => (
                <article key={x.t} className="pk-include" style={{ "--d": i } as React.CSSProperties}>
                  <span className="pk-include__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </article>
              ))}
            </InView>
          </div>
        </section>

        <section className="section section--slate tourism">
          <div className="container tourism__grid">
            <div>
              <p className="eyebrow eyebrow--gold">{k.stepsTitle}</p>
              <h2>{k.whyTitle}</h2>
              <p className="lead">{k.why}</p>
              <p className="tourism__note">{k.note}</p>
            </div>
            <ol className="timeline">
              {t.tourism.steps.map((s, i) => (
                <li key={s.t}>
                  <span className="timeline__dot">{i + 1}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="h5-cta h5-cta--light">
          <div className="container">
            <div className="h5-cta__card">
              <h2>{t.home.ctaTitle}</h2>
              <p>{k.note}</p>
              <div className="h5-cta__btns">
                <a className="btn btn--gold" href={waLink(t.tourism.waMsg)} target="_blank" rel="noopener">
                  <WaIcon /> {k.ctaWa}
                </a>
                <Link className="btn h5-cta__wa" href={`/${lang}/agendar`}>
                  <Check size={16} /> {t.nav.cta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
