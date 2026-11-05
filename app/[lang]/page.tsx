import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import TreatmentFinder from "@/components/TreatmentFinder";
import { Arrow, Check, Star, WaIcon, serviceIcons } from "@/components/Icons";
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
      <circle cx="70" cy="60" r="48" fill="rgba(255,255,255,0.06)" />
      <rect x="22" y="22" width="78" height="70" rx="12" fill="#f8f6f2" />
      <rect x="22" y="22" width="78" height="20" rx="12" fill="#d8c39b" />
      <rect x="22" y="34" width="78" height="8" fill="#d8c39b" />
      <rect x="40" y="14" width="6" height="16" rx="3" fill="#be9d61" />
      <rect x="76" y="14" width="6" height="16" rx="3" fill="#be9d61" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}${c}`} x={32 + c * 16} y={50 + r * 13} width="10" height="8" rx="2" fill={r === 1 && c === 2 ? "#be9d61" : "#e3dccf"} />
        )),
      )}
      <circle cx="96" cy="86" r="14" fill="#be9d61" />
      <path d="M89 86l5 5 9-10" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
              <p className="h5-hero__greet">{h.greet}</p>
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

            <div className="h5-svc">
              {t.services.items.map((s) => {
                const Ico = serviceIcons[s.icon];
                return (
                  <details className="h5-svc__item" key={s.slug}>
                    <summary>
                      <span className="h5-svc__ico"><Ico size={26} /></span>
                      <span className="h5-svc__txt">
                        <strong>{s.title}</strong>
                        <span>{s.short}</span>
                      </span>
                      <span className="h5-svc__chev" aria-hidden="true" />
                    </summary>
                    <div className="h5-svc__body">
                      <ul>
                        {s.procedures.map((p) => (
                          <li key={p.name}>
                            <Check size={14} /> {p.name}
                          </li>
                        ))}
                      </ul>
                      <div className="h5-svc__btns">
                        <Link className="btn btn--dark btn--sm" href={`/${lang}/servicios/${s.slug}`}>
                          {h.svcMore} <Arrow size={14} />
                        </Link>
                        <Link className="btn btn--line btn--sm" href={`/${lang}/agendar`}>
                          {h.svcBook}
                        </Link>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── LA DOCTORA ───────── */}
        <section id="doctora" className="h5-sec h5-sec--ivory">
          <div className="container">
            <div className="h5-doc">
              <div className="h5-doc__photo">
                <Image src="/brand/doctora-retrato.jpg" alt={t.about.doctorName} width={1000} height={1473} sizes="(min-width: 1040px) 380px, 40vw" />
              </div>
              <div className="h5-doc__body">
                <p className="eyebrow">{h.docEyebrow}</p>
                <h2>{t.about.doctorName}</h2>
                <p className="h5-doc__role">
                  {t.about.doctorRole} <span className="h5-badge">{h.docBadge}</span>
                </p>
              </div>
              <div className="h5-doc__more">
                <p className="h5-doc__text">{h.docText}</p>
                <div className="h5-doc__btns">
                  <Link className="btn btn--dark" href={`/${lang}/agendar`}>
                    {h.docCta} <Arrow />
                  </Link>
                  <Link className="h5-link" href={`/${lang}/sobre-nosotros`}>
                    {h.docMore} <Arrow size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── PAQUETE IMPLANTES + ESTADÍA ───────── */}
        <section id="estadia" className="section section--slate tourism">
          <div className="container tourism__grid">
            <div>
              <p className="eyebrow eyebrow--gold">{t.tourism.eyebrow}</p>
              <h2>{t.tourism.title}</h2>
              <p className="lead">{t.tourism.text}</p>
              <a className="btn btn--gold" href={waLink(t.tourism.waMsg)} target="_blank" rel="noopener">
                <WaIcon /> {t.tourism.cta}
              </a>
              <p className="tourism__note">{t.tourism.note}</p>
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

        {/* ───────── VALORACIONES ───────── */}
        <section id="valoraciones" className="h5-sec h5-sec--white">
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

        {/* ───────── PREGUNTAS FRECUENTES ───────── */}
        <section id="preguntas" className="h5-sec h5-sec--ivory">
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

        {/* ───────── CIERRE ───────── */}
        <section className="h5-cta">
          <div className="container">
            <div className="h5-cta__card">
              <h2>{h.ctaTitle}</h2>
              <p>{h.ctaText}</p>
              <div className="h5-cta__btns">
                <Link className="btn btn--gold" href={`/${lang}/agendar`}>
                  {t.nav.cta} <Arrow />
                </Link>
                <a className="btn h5-cta__wa" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                  <WaIcon /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} lang={lang} offer={false} />
    </>
  );
}
