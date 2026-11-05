import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schedule from "@/components/Schedule";
import Schema from "@/components/Schema";
import { Arrow, Award, Building, Check, Globe, Heart, Pin, Star, Sun, WaIcon, serviceIcons } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { waLink, type Locale } from "@/lib/site";
import { serviceImg } from "@/lib/images";

function Divider() {
  return (
    <span className="divider" aria-hidden="true">
      <i />
    </span>
  );
}

function Head({ eyebrow, title, center = true, light = false }: { eyebrow: string; title: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`section__head ${center ? "section__head--center" : ""} ${light ? "section__head--light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <Divider />
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const a = t.about;

  return (
    <>
      <Schema t={t} lang={lang} />
      <Header t={t} lang={lang} />

      <main>
        {/* ───────── PARTE SUPERIOR: PRESENTACIÓN ───────── */}
        <section className="hero3">
          <div className="container hero3__grid">
            <div className="hero3__scene">
              <picture className="hero3__bg" aria-hidden="true">
                <source media="(min-width: 1040px)" srcSet="/brand/recepcion-h.jpg" />
                <img src="/brand/recepcion-v.jpg" alt="" />
              </picture>
              <span className="hero3__veil" aria-hidden="true" />
              <Image
                className="hero3__doctor"
                src="/brand/doctora-hd.png"
                alt={t.about.doctorName}
                width={640}
                height={1062}
                priority
                sizes="(min-width: 1040px) 380px, 62vw"
              />
              <a className="hero3__chip" href="#estadia">
                <Sun size={20} />
                <span>{t.hero.chip}</span>
              </a>
              <div className="hero3__card">
                <Image src="/brand/mono-dark.png" alt="" width={40} height={27} />
                <span>
                  <strong>{t.hero.nameTag}</strong>
                  {t.hero.roleTag}
                </span>
              </div>
            </div>

            <div className="hero3__copy">
              <p className="hero3__eyebrow"><Pin size={14} /> {t.hero.eyebrow}</p>
              <h1>
                {t.hero.title} <em>{t.hero.titleAccent}</em>
              </h1>
              <p className="hero3__text">{t.hero.text}</p>
              <div className="hero3__ctas">
                <a className="btn btn--dark" href={`/${lang}/agendar`}>
                  {t.hero.cta} <Arrow />
                </a>
                <a className="hero3__link" href="#servicios">
                  {t.hero.secondary} <Arrow size={14} />
                </a>
              </div>
              <ul className="hero3__trust">
                {t.hero.badges.map((b, i) => {
                  const I = [Award, Globe, Heart][i];
                  return (
                    <li key={b}>
                      <span className="hero3__trust-ico"><I size={22} /></span>
                      <span>{b}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── PARTE MEDIA ───────── */}
        {/* Servicios */}
        <section id="servicios" className="section section--white">
          <div className="container">
            <Head eyebrow={t.services.eyebrow} title={t.services.title} />
            <div className="svc-grid">
              {t.services.items.map((s) => {
                const Ico = serviceIcons[s.icon];
                return (
                  <Link key={s.slug} href={`/${lang}/servicios/${s.slug}`} className="svc-card svc-card--photo">
                    <span className="svc-card__img">
                      <Image src={serviceImg[s.slug]} alt="" fill sizes="(min-width: 1040px) 280px, (min-width: 720px) 45vw, 90vw" />
                      <span className="svc-card__badge"><Ico size={26} /></span>
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="svc-card__more">
                      {t.services.more} <Arrow size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sobre nosotros: el centro */}
        <section id="sobre-nosotros" className="section section--ivory">
          <div className="container about">
            <div className="about__media">
              <Image src="/brand/logo-dark.png" alt="Maxilo Aesthetic Implants" width={905} height={551} />
            </div>
            <div className="about__copy">
              <p className="eyebrow">{a.eyebrow}</p>
              <h2>{a.title}</h2>
              <Divider />
              {a.text.map((p) => (
                <p key={p.slice(0, 24)} className="lead">{p}</p>
              ))}
              <ul className="about__values">
                {a.values.map((v) => (
                  <li key={v}><Check /> {v}</li>
                ))}
              </ul>
            </div>
            <aside className="stats" aria-label={a.statsTitle}>
              <p className="stats__title">{a.statsTitle}</p>
              {a.stats.map((s) => (
                <div key={s.label} className="stats__row">
                  <strong className={s.value ? "" : "is-pending"}>{s.value ?? "—"}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
              {a.stats.some((s) => !s.value) && <p className="stats__pending">{t.pending}</p>}
            </aside>
          </div>
        </section>

        {/* Sobre nosotros: la doctora, formación, diplomas y equipo */}
        <section id="doctora" className="section section--white">
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

              <div className="doctor__blocks">
                <div className="info-block">
                  <h3><Award size={26} /> {a.trainingTitle}</h3>
                  {a.training.length ? (
                    <ul>{a.training.map((x) => <li key={x}>{x}</li>)}</ul>
                  ) : (
                    <p className="pending">{t.pending}</p>
                  )}
                </div>
                <div className="info-block">
                  <h3><Award size={26} /> {a.diplomasTitle}</h3>
                  {a.diplomas.length ? (
                    <ul>{a.diplomas.map((x) => <li key={x}>{x}</li>)}</ul>
                  ) : (
                    <p className="pending">{t.pending}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container team">
            <h3 className="team__title">{a.teamTitle}</h3>
            <div className="team__grid">
              <article className="team-card">
                <div className="team-card__img">
                  <Image src="/brand/doctora-retrato.jpg" alt={a.doctorName} width={1000} height={1473} sizes="120px" />
                </div>
                <div>
                  <strong>{a.doctorName}</strong>
                  <span>{a.doctorRole}</span>
                </div>
              </article>
              {a.team.map((m) => (
                <article className="team-card" key={m.name}>
                  <div className="team-card__img team-card__img--empty" />
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                </article>
              ))}
              {!a.team.length && (
                <article className="team-card team-card--pending">
                  <div className="team-card__img team-card__img--empty" />
                  <div>
                    <strong>{t.pending}</strong>
                    <span>{a.teamTitle}</span>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section id="preguntas" className="section section--ivory">
          <div className="container faq">
            <Head eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <div className="faq__list">
              {t.faq.items.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PARTE INFERIOR ───────── */}
        {/* Valoraciones */}
        <section id="valoraciones" className="section section--slate reviews">
          <div className="container">
            <Head eyebrow={t.reviews.eyebrow} title={t.reviews.title} light />
            <div className="reviews__grid">
              {t.reviews.items.length
                ? t.reviews.items.map((r) => (
                    <figure className="review" key={r.name}>
                      <div className="review__stars">{[1, 2, 3, 4, 5].map((i) => <Star key={i} />)}</div>
                      <blockquote>{r.text}</blockquote>
                      <figcaption>
                        <strong>{r.name}</strong> · {r.service}
                      </figcaption>
                    </figure>
                  ))
                : [1, 2, 3].map((i) => (
                    <figure className="review review--pending" key={i}>
                      <div className="review__stars">{[1, 2, 3, 4, 5].map((s) => <Star key={s} />)}</div>
                      <blockquote>{t.reviews.emptyText}</blockquote>
                      <figcaption>{t.pending}</figcaption>
                    </figure>
                  ))}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section id="marcas" className="section section--white">
          <div className="container">
            <Head eyebrow={t.brands.eyebrow} title={t.brands.title} />
            <p className="lead lead--center">{t.brands.text}</p>
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

        {/* Paquete de implantes + estadía (sin cambios) */}
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

        {/* Instituciones */}
        <section id="instituciones" className="section section--ivory section--tight">
          <div className="container">
            <Head eyebrow={t.institutions.eyebrow} title={t.institutions.title} />
            <div className="institutions">
              {(t.institutions.items.length ? t.institutions.items : [null, null, null]).map((x, i) => (
                <div className={`institution ${x ? "" : "institution--pending"}`} key={x ?? i}>
                  <Building size={34} />
                  <span>{x ?? t.pending}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda tu consulta */}
        <section id="agendar" className="section section--white">
          <div className="container book">
            <div className="book__intro">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2>{t.contact.title}</h2>
              <Divider />
              <p className="lead">{t.contact.text}</p>
              <ul className="book__perks">
                {t.contact.perks.map((p) => (
                  <li key={p}><span><Check /></span> {p}</li>
                ))}
              </ul>
            </div>
            <div className="book__form">
              <h3>{t.booking.scheduleTitle}</h3>
              <Schedule t={t} lang={lang} />
              <a className="btn btn--dark btn--block" href={`/${lang}/agendar`}>
                {t.booking.cta} <Arrow />
              </a>
              <a className="btn btn--line btn--block book__wa" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                <WaIcon /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} lang={lang} />
    </>
  );
}
