import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import ServiceIcon from "@/components/ServiceIcon";
import TreatmentVisual, { hasVisual } from "@/components/TreatmentVisual";
import { Arrow, Check } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { locales, site, type Locale } from "@/lib/site";
import { serviceImg, treatmentImg } from "@/lib/images";
import { bookingHref, findTreatment, treatments, treatmentsFor } from "@/lib/treatments";

type Params = Promise<{ lang: string; slug: string; treatment: string }>;

export function generateStaticParams() {
  return locales.flatMap((lang) => treatments.map((tr) => ({ lang, slug: tr.service, treatment: tr.slug })));
}

function load(lang: string, slug: string, treatment: string) {
  const t = dictionaries[lang as Locale];
  const tr = findTreatment(slug, treatment);
  const s = t?.services.items.find((x) => x.slug === slug);
  if (!t || !tr || !s) return null;
  const proc = s.procedures[tr.index];
  return { t, tr, s, proc, d: tr[lang as Locale] };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug, treatment } = await params;
  const x = load(lang, slug, treatment);
  if (!x) return {};
  const path = `/servicios/${slug}/${treatment}`;
  const title = lang === "en" ? `${x.proc.name} in Las Terrenas | ${site.name}` : `${x.proc.name} en Las Terrenas | ${site.name}`;
  return {
    title,
    description: x.d.summary,
    alternates: { canonical: `/${lang}${path}`, languages: { es: `/es${path}`, en: `/en${path}` } },
    openGraph: { title: x.proc.name, description: x.d.summary, url: `/${lang}${path}` },
  };
}

export default async function TreatmentPage({ params }: { params: Params }) {
  const { lang: l, slug, treatment } = await params;
  const lang = l as Locale;
  const x = load(lang, slug, treatment);
  if (!x) notFound();
  const { t, tr, s, proc, d } = x;
  const k = t.treat;
  const url = `${site.url}/${lang}/servicios/${slug}/${treatment}`;
  const book = bookingHref(lang, slug, tr.index, proc.name);
  const planItem = t.plan.b.items.find((i) => i.slug === tr.slug);
  const siblings = s.procedures
    .map((p, i) => ({ p, i, tr: treatmentsFor(slug).find((z) => z.index === i) }))
    .filter((z) => z.i !== tr.index);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: proc.name,
        description: d.summary,
        inLanguage: lang,
        about: { "@type": "MedicalProcedure", name: proc.name, description: d.what },
        provider: { "@id": `${site.url}/#clinic` },
      },
      {
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: s.title, item: `${site.url}/${lang}/servicios/${slug}` },
          { "@type": "ListItem", position: 3, name: proc.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main className="sv tr">
        {/* Portada */}
        <section className="sv-hero tr-hero">
          <div className="container sv-wrap">
            <nav className="sv-crumbs bk2-rise" aria-label="breadcrumb">
              <Link href={`/${lang}`}>{t.nav.home}</Link> <span>/</span>{" "}
              <Link href={`/${lang}/servicios/${slug}`}>{s.title}</Link>
            </nav>
            <p className="eyebrow bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              <span className="tr-eyebrow-ico">
                <ServiceIcon kind={s.icon} size={20} />
              </span>
              {s.title}
            </p>
            <h1 className="bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{proc.name}</h1>
            <p className="sv-hero__intro bk2-rise" style={{ "--d": 3 } as React.CSSProperties}>{d.summary}</p>
            <div className="sv-hero__btns bk2-rise" style={{ "--d": 4 } as React.CSSProperties}>
              <Link className="btn btn--dark h5-btn-shine" href={book}>
                {k.book} <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ¿Qué es? */}
        <section className="sv-sec">
          <div className="container sv-wrap">
            {/* Con infografía animada no se muestra la foto, para no recargar la página */}
            <div className={hasVisual(treatment) ? "tr-what tr-what--solo" : "tr-what"}>
              {!hasVisual(treatment) && (
                <span className="tr-what__img">
                  <Image src={treatmentImg[treatment] ?? serviceImg[s.slug]} alt="" fill sizes="(min-width: 900px) 320px, 92vw" />
                </span>
              )}
              <div>
                <h2 className="loc-h2">{k.what}</h2>
                <p className="tr-p">{d.what}</p>
              </div>
            </div>
            <TreatmentVisual slug={treatment} labels={d.art?.labels} caption={d.art?.caption} facts={d.facts} />
          </div>
        </section>

        {/* ¿Para quién es? */}
        <section className="sv-sec sv-sec--white">
          <div className="container sv-wrap">
            <h2 className="loc-h2">{k.forWho}</h2>
            <InView className="tr-for">
              {d.forWho.map((f, i) => (
                <li key={f} style={{ "--i": i } as React.CSSProperties}>
                  <span className="tr-for__ico">
                    <Check size={14} />
                  </span>
                  {f}
                </li>
              ))}
            </InView>
            {d.alert && (
              <p className="tr-alert" role="note">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3 2.5 20h19zM12 10v4.5M12 17.2v.3" />
                </svg>
                <span>
                  {d.alert}
                  {treatment === "fracturas-traumatismos-faciales" && (
                    <a className="tr-alert__link" href={`/${lang}/urgencias`}>
                      {t.urgent.fractureLink} →
                    </a>
                  )}
                </span>
              </p>
            )}
          </div>
        </section>

        {/* Pasos */}
        <section className="sv-sec">
          <div className="container sv-wrap">
            <h2 className="loc-h2">{k.steps}</h2>
            <InView className="tr-steps">
              {d.steps.map((st, i) => (
                <li key={st.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="tr-steps__n">{i + 1}</span>
                  <span className="tr-steps__txt">
                    <strong>{st.t}</strong>
                    <span>{st.d}</span>
                  </span>
                </li>
              ))}
            </InView>
          </div>
        </section>

        {/* Recuperación + precio */}
        <section className="sv-sec sv-sec--white">
          <div className="container sv-wrap tr-grid">
            <div className="tr-card">
              <p className="tr-card__t">{k.recovery}</p>
              <p className="tr-p">{d.recovery}</p>
            </div>
            {d.price && (
              <div className="tr-card tr-card--dark">
                <p className="tr-card__t">{k.price}</p>
                <ul className="tr-price">
                  {d.price.lines.map((ln) => (
                    <li key={ln.label}>
                      <span>{ln.label}</span>
                      <strong>{ln.value}</strong>
                    </li>
                  ))}
                </ul>
                {d.price.note && <p className="tr-price__note">{d.price.note}</p>}
                <Link className="btn btn--gold btn--sm h5-btn-shine tr-price__btn" href={book}>
                  {k.book} <Arrow size={14} />
                </Link>
                {planItem && (
                  <Link className="tr-plan" href={`/${lang}/planes/crear?add=${planItem.id}`}>
                    <span aria-hidden="true">+</span> {t.plan.b.fromLink}
                  </Link>
                )}
              </div>
            )}
          </div>
          {tr.pkgLink && (
            <div className="container sv-wrap">
              <Link className="tr-pkg" href={`/${lang}/paquete-implantes`}>
                <span>✦</span> {k.pkg} <Arrow size={14} />
              </Link>
            </div>
          )}
        </section>

        {/* Preguntas */}
        <section className="sv-sec">
          <div className="container sv-wrap">
            <h2 className="loc-h2">{k.faqs}</h2>
            <InView className="h5-faq__list faq-anim">
              {d.faqs.map((f, i) => (
                <details key={f.q} style={{ "--fi": i } as React.CSSProperties}>
                  <summary>
                    <span className="faq-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q">{f.q}</span>
                  </summary>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </InView>
            <p className="tr-review">{k.reviewNote}</p>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />

        {/* Otros tratamientos del mismo servicio */}
        {siblings.length > 0 && (
          <section className="sv-sec sv-sec--others">
            <div className="container sv-wrap">
              <p className="sv-others__t">
                {k.more} {s.title}
              </p>
              <div className="sv-others">
                {siblings.map(({ p, i, tr: z }) => (
                  <Link key={p.name} href={z ? `/${lang}/servicios/${slug}/${z.slug}` : bookingHref(lang, slug, i, p.name)}>
                    {p.name}
                    <Arrow size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer t={t} lang={lang} offer={treatment === "implantes-dentales"} />
    </>
  );
}
