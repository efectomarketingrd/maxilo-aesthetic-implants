import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.brands.eyebrow} | ${site.name}`,
    description: t.brands.text,
    alternates: { canonical: `/${lang}/marcas`, languages: { es: "/es/marcas", en: "/en/marcas" } },
  };
}

export default async function Brands({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <PageHero t={t} lang={lang} eyebrow={t.brands.eyebrow} title={t.brands.title} text={t.brands.text} crumb={t.nav.brands} />
        <section className="h5-sec h5-sec--white">
          <div className="container">
            <div className="brands">
              {t.brands.items.map((b) => (
                <div className={`brand ${b.name ? "" : "brand--pending"}`} key={b.category}>
                  <strong>{b.name ?? t.pending}</strong>
                  <span>{b.category}</span>
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
