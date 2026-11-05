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
    title: `${t.faq.eyebrow} | ${site.name}`,
    description: t.faq.items.map((f) => f.q).join(" "),
    alternates: { canonical: `/${lang}/preguntas`, languages: { es: "/es/preguntas", en: "/en/preguntas" } },
  };
}

export default async function Faq({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main>
        <PageHero t={t} lang={lang} eyebrow={t.faq.eyebrow} title={t.faq.title} crumb={t.nav.faq} />
        <section className="h5-sec h5-sec--white">
          <div className="container h5-faq">
            <div className="h5-faq__list">
              {t.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
