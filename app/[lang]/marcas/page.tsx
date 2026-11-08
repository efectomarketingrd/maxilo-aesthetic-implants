import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import { Arrow, Check } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.brands.eyebrow} | ${site.name}`,
    description: t.brands.metaDesc,
    alternates: { canonical: `/${lang}/marcas`, languages: { es: "/es/marcas", en: "/en/marcas" } },
  };
}

export default async function Brands({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const b = t.brands;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="br">
        {/* Portada */}
        <section className="bk2-hero">
          <div className="container br-wrap">
            <p className="eyebrow bk2-rise">{b.eyebrow}</p>
            <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              {b.title} <em>{b.titleAccent}</em>
            </h1>
            <p className="bk2-hero__text bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{b.text}</p>
          </div>
        </section>

        {/* Implantes */}
        <section className="ab-sec">
          <div className="container br-wrap">
            <h2 className="loc-h2">{b.implantsTitle}</h2>
            <p className="tr-p br-lead">{b.implantsText}</p>
            <InView className="br-cards">
              {b.implants.map((m, i) => (
                <article key={m.maker} className="br-card" style={{ "--i": i } as React.CSSProperties}>
                  <span className="br-card__logo">
                    <Image src={m.logo} alt={m.maker} width={640} height={310} sizes="220px" />
                  </span>
                  <p className="br-card__maker">
                    <strong>{m.maker}</strong>
                    <span>{m.origin}</span>
                  </p>
                  <p className="br-card__product">{m.product}</p>
                  <ul>
                    {m.points.map((pt) => (
                      <li key={pt}>
                        <Check size={13} /> {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </InView>
            <Link className="h5-link br-more" href={`/${lang}/servicios/implantes-cirugia-oral/implantes-dentales`}>
              {t.services.items[0].procedures[0].name} <Arrow size={14} />
            </Link>
          </div>
        </section>

        {/* Por qué importa */}
        <section className="ab-sec ab-sec--white">
          <div className="container br-wrap">
            <h2 className="loc-h2">{b.whyTitle}</h2>
            <InView className="br-why">
              {b.why.map((w, i) => (
                <li key={w.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="br-why__n">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{w.t}</strong>
                  <span>{w.d}</span>
                </li>
              ))}
            </InView>
          </div>
        </section>

        {/* Medicina estética y piel */}
        <section className="ab-sec">
          <div className="container br-wrap br-two">
            <div className="tr-card">
              <p className="tr-card__t">{b.aestheticTitle}</p>
              <p className="tr-p">{b.aestheticText}</p>
            </div>
            <div className="tr-card tr-card--dark">
              <p className="tr-card__t">{b.skinTitle}</p>
              <p className="br-skin">{b.skin.name}</p>
              <p className="tr-price__note br-skin__t">{b.skin.text}</p>
            </div>
          </div>
          <div className="container br-wrap">
            <p className="tr-review br-legal">{b.legal}</p>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
