import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";
import { Calendar, Video, WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { agenda } from "@/lib/agenda";
import { site, type Locale } from "@/lib/site";

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
        closes: "13:30",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main className="bk2-page">
        <section className="bk2-hero">
          <div className="container">
            <p className="eyebrow bk2-rise" style={{ "--d": 0 } as React.CSSProperties}>{b.eyebrow}</p>
            <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              {b.title} <em>{b.titleAccent}</em>
            </h1>
            <p className="bk2-hero__text bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{b.heroText}</p>
            <ul className="bk2-chips">
              {b.heroChips.map((c, i) => {
                const Ico = [Calendar, Video, WaIcon][i];
                return (
                  <li key={c} className="bk2-rise" style={{ "--d": 3 + i * 0.5 } as React.CSSProperties}>
                    <Ico size={16} /> {c}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="bk2-main">
          <div className="container">
            <BookingWizard t={t} lang={lang} />
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
