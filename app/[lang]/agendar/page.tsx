import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";
import { Arrow, Award, Calendar, Check, Clock, Heart, Person, Shield, Video, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { agenda, formatTime } from "@/lib/agenda";
import { site, waLink, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const b = dictionaries[lang as Locale].booking;
  return {
    title: b.metaTitle,
    description: b.metaDesc,
    alternates: { canonical: `/${lang}/agendar`, languages: { es: "/es/agendar", en: "/en/agendar" } },
  };
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function Booking({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const b = t.booking;
  const featureIcons = [Calendar, Person, Shield, Heart];

  const times = agenda.slots.map((s) => s.time).sort();
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${site.url}/#clinic`,
    name: site.name,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: agenda.weekdays.map((d) => `https://schema.org/${dayNames[d]}`),
        opens: times[0],
        closes: "17:00",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main className="booking-page">
        <section className="bk-hero">
          <div className="container bk-hero__grid">
            <div className="bk-hero__copy">
              <p className="tag">{b.eyebrow}</p>
              <h1>
                {b.title} <em>{b.titleAccent}</em>
              </h1>
              <p className="hero__text">{b.text}</p>
              <div className="hero__ctas">
                <a className="btn btn--dark" href="#reservar">
                  {b.start} <Arrow />
                </a>
                <a className="btn btn--line" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
                  <WaIcon /> WhatsApp
                </a>
              </div>
              <ul className="bk-hero__badges">
                {b.badges.map((x, i) => {
                  const I = [Shield, Award, Heart][i];
                  return (
                    <li key={x}>
                      <span className="bk-hero__badge-ico"><I size={24} /></span>
                      <span>{x}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bk-hero__visual">
              <div className="bk-hero__circle" aria-hidden="true" />
              <div className="bk-hero__photo">
                <Image src="/brand/doctora.jpg" alt={t.about.doctorName} width={1000} height={1473} priority sizes="(min-width: 1040px) 420px, 75vw" />
              </div>
              <div className="bk-chip bk-chip--top">
                <Calendar size={22} />
                <span>
                  <strong>{b.scheduleDays}</strong>
                  {b.chipHours}
                </span>
              </div>
              <div className="bk-chip bk-chip--bottom">
                <Video size={22} />
                <span>
                  <strong>{b.chipModesTitle}</strong>
                  {b.chipModes}
                </span>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="bk-strip">
              <p className="bk-strip__title"><Clock /> {b.scheduleTitle} · <span>{b.scheduleDays}</span></p>
              <ul>
                {agenda.slots.map((sl) => (
                  <li key={sl.time + sl.type} className={sl.alt ? "is-alt" : ""}>
                    <strong>{formatTime(sl.time, lang)}</strong>
                    <span>
                      {sl.type === "consulta" ? (sl.alt ? b.scheduleAltC : b.scheduleConsulta.replace(/s$/, "")) : sl.alt ? b.scheduleAltP : b.scheduleProc}
                      {sl.oneSpot ? ` · ${b.oneSpot}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="bk-strip__note">
                * {b.alt}. {b.specialHelp} <strong>{agenda.surcharge}</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="bk-main">
          <div className="container">
            <BookingWizard t={t} lang={lang} />
          </div>
        </section>

        <section className="bk-features">
          <div className="container bk-features__grid">
            {b.features.map((f, i) => {
              const I = featureIcons[i];
              return (
                <div className="bk-feature" key={f.t}>
                  <I size={36} />
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bk-meet">
          <div className="container">
            <div className="bk-meet__card">
              <div className="bk-meet__photo">
                <Image src="/brand/doctora.jpg" alt="" width={1000} height={1473} sizes="140px" />
              </div>
              <div className="bk-meet__text">
                <p className="bk-meet__eyebrow">{b.meet}</p>
                <strong>{t.about.doctorName}</strong>
                <span>{t.about.doctorRole}</span>
                <p>{b.meetText}</p>
              </div>
              <ul className="bk-meet__list">
                {t.about.values.slice(0, 3).map((v) => (
                  <li key={v}><Check /> {v}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
