import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Building } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.institutions.eyebrow} | ${site.name}`,
    description: t.institutions.title,
    alternates: { canonical: `/${lang}/instituciones`, languages: { es: "/es/instituciones", en: "/en/instituciones" } },
  };
}

export default async function Institutions({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const items = t.institutions.items.length ? t.institutions.items : [null, null, null];
  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <PageHero t={t} lang={lang} eyebrow={t.institutions.eyebrow} title={t.institutions.title} crumb={t.nav.institutions} />
        <section className="h5-sec h5-sec--white">
          <div className="container">
            <div className="institutions">
              {items.map((x, i) => (
                <div className={`institution ${x ? "" : "institution--pending"}`} key={x ?? i}>
                  <Building size={34} />
                  <span>{x ?? t.pending}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
