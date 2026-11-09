import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import ServiceIcon from "@/components/ServiceIcon";
import { bookingHref, treatmentAt } from "@/lib/treatments";
import { dictionaries } from "@/lib/content";
import { locales, site, type Locale } from "@/lib/site";
import { serviceImg } from "@/lib/images";

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
      <main className="sv">
        {/* Portada */}
        <section className="sv-hero">
          <div className="container sv-wrap">
            <nav className="sv-crumbs bk2-rise" aria-label="breadcrumb">
              <Link href={`/${lang}`}>{t.nav.home}</Link> <span>/</span> {t.nav.services}
            </nav>
            <div className="sv-hero__img bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              <Image src={serviceImg[s.slug]} alt={s.title} fill sizes="(min-width: 900px) 820px, 92vw" priority />
              <span className="sv-hero__badge">
                <ServiceIcon kind={s.icon} size={34} />
              </span>
            </div>
            <h1 className="bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{s.title}</h1>
            <p className="sv-hero__intro bk2-rise" style={{ "--d": 3 } as React.CSSProperties}>{s.intro}</p>
            <div className="sv-hero__btns bk2-rise" style={{ "--d": 4 } as React.CSSProperties}>
              <Link className="btn btn--dark h5-btn-shine" href={`/${lang}/agendar`}>
                {t.nav.cta} <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* Tratamientos */}
        <section className="sv-sec">
          <div className="container sv-wrap">
            <h2 className="loc-h2">{t.treat.treatments}</h2>
            <p className="sv-hint">{t.treat.treatmentsHint}</p>
            <InView className="sv-list">
              {s.procedures.map((p, i) => {
                const tr = treatmentAt(s.slug, i);
                const inner = (
                  <>
                    <span className="sv-item__n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sv-item__txt">
                      <strong>{p.name}</strong>
                      <span>{p.desc}</span>
                    </span>
                    <span className="sv-item__go" aria-hidden="true">
                      <Arrow size={16} />
                    </span>
                  </>
                );
                return tr ? (
                  <Link key={p.name} href={`/${lang}/servicios/${s.slug}/${tr.slug}`} className="sv-item" style={{ "--i": i } as React.CSSProperties}>
                    {inner}
                  </Link>
                ) : (
                  <Link key={p.name} href={bookingHref(lang, s.slug, i, p.name)} className="sv-item sv-item--book" style={{ "--i": i } as React.CSSProperties}>
                    {inner}
                  </Link>
                );
              })}
            </InView>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />

        {/* Otros servicios: compacto */}
        <section className="sv-sec sv-sec--others">
          <div className="container sv-wrap">
            <p className="sv-others__t">{t.treat.otherServices}</p>
            <div className="sv-others">
              {others.map((o) => (
                <Link key={o.slug} href={`/${lang}/servicios/${o.slug}`}>
                  <span className="sv-others__ico">
                    <ServiceIcon kind={o.icon} size={22} />
                  </span>
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} offer={s.slug === "implantes-cirugia-oral"} />
    </>
  );
}
