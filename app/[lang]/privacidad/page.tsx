import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";

// Política de privacidad (25 nov 2026, requisito para medir anuncios con cookies)
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const c = dictionaries[lang as Locale].privacy;
  return pageMeta({ lang: lang as Locale, path: "/privacidad", title: c.metaTitle, description: c.metaDesc });
}

type Sec = { t: string; p?: string[]; li?: string[]; p2?: string[] };

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const c = t.privacy;
  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <PageHero t={t} lang={lang} eyebrow={c.eyebrow} title={c.title} crumb={c.crumb} />
        <section className="h5-sec h5-sec--white">
          <div className="container pv">
            <p className="pv__date">{c.updated}</p>
            {(c.sections as Sec[]).map((s, i) => (
              <section key={s.t} className="pv__sec">
                <h2>
                  <span>{i + 1}</span> {s.t}
                </h2>
                {s.p?.map((x) => <p key={x}>{x}</p>)}
                {s.li && (
                  <ul>
                    {s.li.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
                {s.p2?.map((x) => <p key={x}>{x}</p>)}
              </section>
            ))}
            <div className="pv__contact">
              <p className="pv__ct">{c.contactTitle}</p>
              <a className="btn btn--dark" href={waLink(c.waMsg)} target="_blank" rel="noopener noreferrer">
                <WaIcon /> {c.wa}
              </a>
              <a className="pv__mail" href={`mailto:${site.email}`}>
                <Mail /> {site.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
