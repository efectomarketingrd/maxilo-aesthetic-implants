import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Arrow, Award, Check } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  return {
    title: `${t.nav.about} | ${site.name}`,
    description: t.about.text[0],
    alternates: { canonical: `/${lang}/sobre-nosotros`, languages: { es: "/es/sobre-nosotros", en: "/en/sobre-nosotros" } },
  };
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const a = t.about;
  const hasStats = a.stats.some((s) => s.value);

  return (
    <>
      <Header t={t} lang={lang} />
      <main>
        <PageHero t={t} lang={lang} eyebrow={a.eyebrow} title={a.title} crumb={t.nav.about} />

        <section className="section section--white">
          <div className="container about about--page">
            <div className="about__media">
              <Image src="/brand/logo-dark.png" alt={site.name} width={905} height={551} />
            </div>
            <div className="about__copy">
              {a.text.map((p) => (
                <p key={p.slice(0, 24)} className="lead">{p}</p>
              ))}
              <ul className="about__values">
                {a.values.map((v) => (
                  <li key={v}><Check /> {v}</li>
                ))}
              </ul>
            </div>
            {hasStats && (
              <aside className="stats" aria-label={a.statsTitle}>
                <p className="stats__title">{a.statsTitle}</p>
                {a.stats.filter((s) => s.value).map((s) => (
                  <div key={s.label} className="stats__row">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </aside>
            )}
          </div>
        </section>

        <section id="doctora" className="section section--ivory">
          <div className="container doctor">
            <div className="doctor__photo">
              <Image src="/brand/doctora-retrato.jpg" alt={a.doctorName} width={1000} height={1473} sizes="(min-width: 1040px) 420px, 90vw" />
            </div>
            <div>
              <p className="eyebrow">{a.doctorEyebrow}</p>
              <h2>{a.doctorName}</h2>
              <p className="doctor__role">{a.doctorRole}</p>
              {a.doctorText.map((p) => (
                <p key={p.slice(0, 24)} className="lead">{p}</p>
              ))}
              {(a.training.length > 0 || a.diplomas.length > 0) && (
                <div className="doctor__blocks">
                  {a.training.length > 0 && (
                    <div className="info-block">
                      <h3><Award size={26} /> {a.trainingTitle}</h3>
                      <ul>{a.training.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  )}
                  {a.diplomas.length > 0 && (
                    <div className="info-block">
                      <h3><Award size={26} /> {a.diplomasTitle}</h3>
                      <ul>{a.diplomas.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}
              <Link className="btn btn--dark" href={`/${lang}/agendar`} style={{ marginTop: 20 }}>
                {t.home.docCta} <Arrow />
              </Link>
            </div>
          </div>

          {a.team.length > 0 && (
            <div className="container team">
              <h3 className="team__title">{a.teamTitle}</h3>
              <div className="team__grid">
                {a.team.map((m) => (
                  <article className="team-card" key={m.name}>
                    <div className="team-card__img team-card__img--empty" />
                    <div>
                      <strong>{m.name}</strong>
                      <span>{m.role}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
