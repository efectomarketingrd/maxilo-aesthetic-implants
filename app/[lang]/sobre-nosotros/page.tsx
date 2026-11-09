import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaCard from "@/components/CtaCard";
import InView from "@/components/InView";
import { Arrow, Check } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[lang as Locale];
  const p = t.about.page;
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: `/${lang}/sobre-nosotros`, languages: { es: "/es/sobre-nosotros", en: "/en/sobre-nosotros" } },
    openGraph: { title: p.metaTitle, description: p.metaDesc, images: ["/brand/dra-escritorio.jpg"] },
  };
}

const gallery = ["/brand/dra-valoracion.jpg", "/brand/dra-procedimiento.jpg", "/brand/dra-consultorio.jpg", "/brand/dra-recepcion.jpg"];

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const a = t.about;
  const p = a.page;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.url}/#doctor`,
    name: site.doctor,
    image: `${site.url}/brand/dra-escritorio.jpg`,
    jobTitle: p.role,
    medicalSpecialty: ["Dentistry", "PlasticSurgery"],
    knowsLanguage: ["es", "en"],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad Central del Este (UCE)" },
      { "@type": "CollegeOrUniversity", name: "Universidad Autónoma de Santo Domingo (UASD)" },
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Doctor en Odontología (Cum Laude)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Specialty", name: "Especialidad en Cirugía Bucomaxilofacial" },
    ],
    memberOf: p.members.map((m) => ({ "@type": "Organization", name: m.n })),
    worksFor: { "@id": `${site.url}/#clinic` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header t={t} lang={lang} />
      <main className="ab">
        {/* Portada */}
        <section className="ab-hero">
          <div className="ab-hero__img">
            <Image src="/brand/dra-escritorio.jpg" alt={site.doctor} fill priority sizes="100vw" />
          </div>
          <div className="container ab-hero__body">
            <p className="eyebrow bk2-rise">{a.eyebrow}</p>
            <h1 className="bk2-rise" style={{ "--d": 1 } as React.CSSProperties}>
              {a.doctorName}
              <svg className="h6-doc__sign ab-sign" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C 40 2, 80 11, 120 6 S 180 3, 198 7" pathLength={1} />
              </svg>
            </h1>
            <p className="ab-hero__role bk2-rise" style={{ "--d": 2 } as React.CSSProperties}>{p.role}</p>
            <p className="ab-hero__intro bk2-rise" style={{ "--d": 3 } as React.CSSProperties}>{p.intro}</p>
            <ul className="ab-chips">
              {p.chips.map((c, i) => (
                <li key={c} className="bk2-rise" style={{ "--d": 4 + i * 0.5 } as React.CSSProperties}>
                  <Check size={13} /> {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cifras */}
        <section className="ab-sec ab-sec--tight">
          <div className="container ab-wrap">
            <InView className="ab-stats">
              {p.stats.map((s, i) => (
                <div key={s.l} style={{ "--i": i } as React.CSSProperties}>
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </InView>
          </div>
        </section>

        {/* Historia */}
        <section className="ab-sec">
          <div className="container ab-wrap ab-story">
            <div className="ab-story__img">
              <Image src="/brand/dra-retrato-v.jpg" alt={site.doctor} width={900} height={1348} sizes="(min-width: 900px) 340px, 70vw" />
            </div>
            <div>
              <h2 className="loc-h2">{p.storyTitle}</h2>
              {[...a.doctorText, ...a.text].map((x) => (
                <p key={x.slice(0, 20)} className="tr-p ab-p">{x}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Formación */}
        <section className="ab-sec ab-sec--white">
          <div className="container ab-wrap">
            <h2 className="loc-h2">{p.timelineTitle}</h2>
            <InView className="ab-tl">
              {p.timeline.map((e, i) => (
                <li key={e.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="ab-tl__dot" aria-hidden="true">
                    <Check size={12} />
                  </span>
                  <span className="ab-tl__y">{e.y}</span>
                  <strong>{e.t}</strong>
                  <span className="ab-tl__d">{e.d}</span>
                </li>
              ))}
            </InView>
          </div>
        </section>

        {/* Investigación */}
        <section className="ab-sec">
          <div className="container ab-wrap">
            <InView className="ab-research">
              <span className="ab-research__ico" aria-hidden="true">
                <svg viewBox="0 0 48 48">
                  <path className="ic-draw" pathLength={1} d="M18 6h12M20 6v12L9 38a4 4 0 0 0 3.5 6h23a4 4 0 0 0 3.5-6L28 18V6" />
                  <path className="ic-draw" pathLength={1} d="M14 30h20" />
                  <circle cx="21" cy="36" r="2" />
                  <circle cx="28" cy="34" r="1.5" />
                </svg>
              </span>
              <p className="ab-research__eyebrow">{p.researchEyebrow}</p>
              <h2>{p.researchTitle}</h2>
              <p>{p.researchText}</p>
              <p className="ab-research__meta">{p.researchMeta}</p>
              <div className="ab-research__links">
                <Link href={`/${lang}/servicios/implantes-cirugia-oral/extraccion-cordales`}>
                  {t.services.items[0].procedures[1].name} <Arrow size={13} />
                </Link>
                <Link href={`/${lang}/servicios/medicina-estetica/prp-facial`}>
                  PRP <Arrow size={13} />
                </Link>
              </div>
            </InView>
          </div>
        </section>

        {/* Miembro de */}
        <section className="ab-sec ab-sec--white ab-sec--tight">
          <div className="container ab-wrap">
            <p className="sv-others__t">{p.membersTitle}</p>
            <ul className="ab-members">
              {p.members.map((m) => (
                <li key={m.s}>
                  <span className="ab-members__s">{m.s}</span>
                  <span>{m.n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Galería */}
        <section className="ab-sec">
          <div className="container ab-wrap">
            <h2 className="loc-h2">{p.galleryTitle}</h2>
            <InView className="ab-gallery">
              {gallery.map((src, i) => (
                <figure key={src} style={{ "--i": i } as React.CSSProperties}>
                  <Image src={src} alt={p.gallery[i]} width={1200} height={800} sizes="(min-width: 900px) 420px, 46vw" />
                  <figcaption>{p.gallery[i]}</figcaption>
                </figure>
              ))}
            </InView>
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section className="ab-sec ab-sec--white">
          <div className="container ab-wrap">
            <h2 className="loc-h2">{p.valuesTitle}</h2>
            <ul className="ab-values">
              {a.values.map((v, i) => (
                <li key={v}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaCard t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
