import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";
import { Arrow, Clock, WaIcon } from "@/components/Icons";
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
          <div className="container bk-hero__grid bk-hero__grid--single">
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

      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
