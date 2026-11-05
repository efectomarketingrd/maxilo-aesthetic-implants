import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import TreatmentFinder from "@/components/TreatmentFinder";
import Greeting from "@/components/Greeting";
import InView from "@/components/InView";
import CtaCard from "@/components/CtaCard";
import ServiceIcon from "@/components/ServiceIcon";
import { Arrow, Check, Star, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { waLink, type Locale } from "@/lib/site";

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className={`h5-head ${light ? "h5-head--light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function CalendarArt() {
  return (
    <svg className="h5-book__art" viewBox="0 0 120 110" aria-hidden="true">
      <circle className="cal-halo" cx="70" cy="60" r="48" fill="rgba(255,255,255,0.06)" />
      <g className="cal-float">
        <rect x="22" y="22" width="78" height="70" rx="12" fill="#f8f6f2" />
        <rect x="22" y="22" width="78" height="20" rx="12" fill="#d8c39b" />
        <rect x="22" y="34" width="78" height="8" fill="#d8c39b" />
        <rect x="40" y="14" width="6" height="16" rx="3" fill="#be9d61" />
        <rect x="76" y="14" width="6" height="16" rx="3" fill="#be9d61" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) =>
            r === 1 && c === 2 ? (
              <rect key={`${r}${c}`} className="cal-day" x={32 + c * 16} y={50 + r * 13} width="10" height="8" rx="2" fill="#be9d61" />
            ) : (
              <rect key={`${r}${c}`} x={32 + c * 16} y={50 + r * 13} width="10" height="8" rx="2" fill="#e3dccf" />
            ),
          ),
        )}
        <g className="cal-check">
          <circle cx="96" cy="86" r="14" fill="#be9d61" />
          <path className="cal-check__path" d="M89 86l5 5 9-10" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const h = t.home;

  return (
    <>
      <Schema t={t} lang={lang} faq={false} />
      <Header t={t} lang={lang} />

      <main className="home5">
        {/* ───────── PORTADA ───────── */}
        <section className="h5-hero">
          <div className="container h5-hero__grid">
            <div className="h5-hero__intro">
              <p className="h5-hero__greet">
                <Greeting fallback={h.greet} {...h.greetings} />
              </p>
              <h1>
                {h.h1a} <em>{h.h1b}</em>
              </h1>
              <p className="h5-hero__doc">
                <strong>{h.doctorLine}</strong>
                <span>{h.doctorRole}</span>
              </p>
            </div>

            <div className="h5-hero__photo">
              <span className="h5-hero__circle" aria-hidden="true" />
              <span className="h5-hero__clip">
                <Image src="/brand/doctora-hd.png" alt={h.doctorLine} width={640} height={1062} priority sizes="(min-width: 1040px) 380px, 42vw" />
              </span>
            </div>

            <div className="h5-hero__search">
              <TreatmentFinder t={t} lang={lang} />
            </div>

            <Link className="h5-book" href={`/${lang}/agendar`}>
              <span className="h5-book__copy">
                <strong>{h.bookTitle}</strong>
                <span>{h.bookText}</span>
                <span className="h5-book__btn">
                  {h.bookCta} <Arrow size={14} />
                </span>
              </span>
              <CalendarArt />
            </Link>
          </div>
        </section>

        {/* ───────── SERVICIOS (láminas desplegables) ───────── */}
        <section id="servicios" className="h5-sec h5-sec--white">
          <div className="container">
            <div className="h5-head h5-head--row">
              <div>
                <p className="eyebrow">{h.svcEyebrow}</p>
                <h2>{h.svcTitle}</h2>
              </div>
              <p className="h5-head__hint">{h.svcHint}</p>
            </div>

            <InView className="h5-svc">
              {t.services.items.map((s, si) => (
                <details className="h5-svc__item" key={s.slug} style={{ "--si": si } as React.CSSProperties}>
                  <summary>
                    <span className="h5-svc__ico">
                      <ServiceIcon kind={s.icon} />
                    </span>
                    <span className="h5-svc__txt">
                      <strong>{s.title}</strong>
                      <span>{s.short}</span>
                    </span>
                    <span className="h5-svc__chev" aria-hidden="true" />
                  </summary>
                  <div className="h5-svc__body">
                    <ul>
                      {s.procedures.map((p, pi) => (
                        <li key={p.name} style={{ "--i": pi } as React.CSSProperties}>
                          <Check size={14} /> {p.name}
                        </li>
                      ))}
                    </ul>
                    <div className="h5-svc__btns" style={{ "--i": s.procedures.length } as React.CSSProperties}>
                      <Link className="btn btn--dark btn--sm h5-btn-shine" href={`/${lang}/servicios/${s.slug}`}>
                        {h.svcMore} <Arrow size={14} />
                      </Link>
                      <Link className="btn btn--line btn--sm h5-btn-fill" href={`/${lang}/agendar`}>
                        <span>{h.svcBook}</span>
                      </Link>
                    </div>
                  </div>
                </details>
              ))}
            </InView>
          </div>
        </section>

        {/* ───────── LA DOCTORA ───────── */}
        <section id="doctora" className="h5-sec h5-sec--ivory">
          <div className="container">
            <InView className="h6-doc">
              <div className="h6-doc__photo">
                <svg className="h6-doc__ring" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="48.5" pathLength={1} />
                </svg>
                <span className="h6-doc__disc" aria-hidden="true" />
                <span className="h6-doc__clip">
                  <Image src="/brand/doctora-hd.png" alt={t.about.doctorName} width={640} height={1062} sizes="(min-width: 1040px) 320px, 62vw" />
                </span>
              </div>
              <div className="h6-doc__body">
                <p className="eyebrow h6-up" style={{ "--d": 1 } as React.CSSProperties}>{h.docEyebrow}</p>
                <h2 className="h6-doc__name h6-up" style={{ "--d": 2 } as React.CSSProperties}>
                  {t.about.doctorName}
                  <svg className="h6-doc__sign" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 8 C 40 2, 80 11, 120 6 S 180 3, 198 7" pathLength={1} />
                  </svg>
                </h2>
                <p className="h6-doc__role h6-up" style={{ "--d": 3 } as React.CSSProperties}>{t.about.doctorRole}</p>
                <ul className="h6-doc__tags">
                  {h.docTags.map((tag, i) => (
                    <li key={tag} className="h6-up" style={{ "--d": 4 + i * 0.5 } as React.CSSProperties}>{tag}</li>
                  ))}
                </ul>
                <blockquote className="h6-doc__quote h6-up" style={{ "--d": 6 } as React.CSSProperties}>“{h.docQuote}”</blockquote>
                <p className="h6-doc__text h6-up" style={{ "--d": 7 } as React.CSSProperties}>{h.docText}</p>
                <div className="h6-doc__btns h6-up" style={{ "--d": 8 } as React.CSSProperties}>
                  <Link className="btn btn--dark h5-btn-shine" href={`/${lang}/agendar`}>
                    {h.docCta} <Arrow />
                  </Link>
                  <Link className="h5-link" href={`/${lang}/sobre-nosotros`}>
                    {h.docMore} <Arrow size={14} />
                  </Link>
                </div>
              </div>
            </InView>
          </div>
        </section>

        {/* ───────── PREGUNTAS FRECUENTES ───────── */}
        <section id="preguntas" className="h5-sec h5-sec--white">
          <div className="container h5-faq">
            <Head eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <div className="h5-faq__list">
              {t.faq.items.slice(0, 4).map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <Link className="h5-link h5-faq__all" href={`/${lang}/preguntas`}>
              {h.faqAll} <Arrow size={14} />
            </Link>
          </div>
        </section>

        {/* ───────── VALORACIONES ───────── */}
        <section id="valoraciones" className="h5-sec h5-sec--ivory">
          <div className="container">
            <Head eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
          </div>
          <div className="h5-reviews">
            {(t.reviews.items.length ? t.reviews.items : [null, null, null]).map((r, i) => (
              <figure className={`h5-review ${r ? "" : "h5-review--pending"}`} key={r?.name ?? i}>
                <div className="h5-review__stars">
                  {[1, 2, 3, 4, 5].map((k) => (
                    <Star key={k} />
                  ))}
                </div>
                <blockquote>{r ? r.text : t.reviews.emptyText}</blockquote>
                <figcaption>{r ? `${r.name} · ${r.service}` : t.pending}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───────── CIERRE ───────── */}
        <CtaCard t={t} lang={lang} />
      </main>

      <Footer t={t} lang={lang} />
    </>
  );
}
