import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Schema from "@/components/Schema";
import { dictionaries } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];

  return (
    <>
      <Schema t={t} lang={lang} />
      <Header t={t} lang={lang} />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero__ornament" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--gold">{t.hero.eyebrow}</p>
              <h1>
                {t.hero.title} <em>{t.hero.titleAccent}</em>
              </h1>
              <p className="hero__text">{t.hero.text}</p>
              <div className="hero__ctas">
                <a className="btn btn--gold" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                  <WaIcon /> {t.hero.primary}
                </a>
                <a className="btn btn--ghost" href="#servicios">
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <div className="hero__mark" aria-hidden="true">
              <div className="hero__ring" />
              <Image src="/brand/mono-light.png" alt="" width={536} height={332} priority />
            </div>
          </div>
          <div className="container">
            <ul className="trust">
              {t.trust.map((x) => (
                <li key={x.k}>
                  <span>{x.k}</span>
                  {x.v}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="section section--cream">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">{t.services.eyebrow}</p>
              <h2>{t.services.title}</h2>
              <p className="lead">{t.services.text}</p>
            </div>
            <div className="services">
              {t.services.items.map((s) => (
                <article className="service" key={s.n}>
                  <span className="service__n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <ul>
                    {s.list.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <a className="service__link" href={waLink(`${t.hero.waMsg} (${s.title})`)} target="_blank" rel="noopener">
                    {t.services.ask} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* IMPLANTES + ESTADÍA */}
        <section id="estadia" className="section section--dark tourism">
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

        {/* DOCTORA */}
        <section id="doctora" className="section section--white">
          <div className="container doctor">
            <figure className="doctor__photo">
              {/* Reemplazar por una foto profesional de la doctora: /public/brand/doctora.jpg */}
              <Image src="/brand/mono-dark.png" alt="" width={548} height={370} />
            </figure>
            <div>
              <p className="eyebrow">{t.doctor.eyebrow}</p>
              <h2>{t.doctor.title}</h2>
              <p className="doctor__role">{t.doctor.role}</p>
              {t.doctor.text.map((p) => (
                <p key={p.slice(0, 20)} className="lead">
                  {p}
                </p>
              ))}
              <a className="btn btn--dark" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                {t.doctor.cta}
              </a>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="section section--cream">
          <div className="container">
            <div className="section__head section__head--center">
              <p className="eyebrow">{t.process.eyebrow}</p>
              <h2>{t.process.title}</h2>
            </div>
            <ol className="steps">
              {t.process.steps.map((s, i) => (
                <li key={s.t}>
                  <span className="steps__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="preguntas" className="section section--white">
          <div className="container faq">
            <div className="section__head">
              <p className="eyebrow">{t.faq.eyebrow}</p>
              <h2>{t.faq.title}</h2>
            </div>
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

        {/* CONTACTO */}
        <section id="contacto" className="section section--dark">
          <div className="container contact">
            <div>
              <p className="eyebrow eyebrow--gold">{t.contact.eyebrow}</p>
              <h2>{t.contact.title}</h2>
              <p className="lead">{t.contact.text}</p>
              <dl className="contact__info">
                <div>
                  <dt>{t.contact.phonesLabel}</dt>
                  {site.phones.map((p) => (
                    <dd key={p}>
                      <a href={`tel:+1${p.replace(/\D/g, "")}`}>{p}</a>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt>{t.contact.emailLabel}</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t.contact.addressLabel}</dt>
                  <dd>{t.contact.address}</dd>
                </div>
              </dl>
            </div>
            <ContactForm t={t} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <Image src="/brand/logo-light.png" alt="Maxilo Aesthetic Implants — Dra. Celia Hernández Mauricio" width={260} height={153} />
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <a href={`/${lang === "es" ? "en" : "es"}`}>{t.footer.lang}</a>
        </div>
      </footer>

      <a className="wa-float" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener" aria-label="WhatsApp">
        <WaIcon />
      </a>
    </>
  );
}
