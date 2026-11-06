import type { Dict } from "@/lib/content";
import { site, type Locale } from "@/lib/site";

// Datos estructurados (Schema.org) para que Google entienda el centro, la doctora, los servicios y las preguntas frecuentes.
export default function Schema({ t, lang, faq = true }: { t: Dict; lang: Locale; faq?: boolean }) {
  const url = `${site.url}/${lang}`;
  const clinicId = `${site.url}/#clinic`;
  const doctorId = `${site.url}/#doctor`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["MedicalClinic", "Dentist"],
      "@id": clinicId,
      name: site.name,
      url,
      logo: `${site.url}/brand/logo-dark.png`,
      image: [`${site.url}/brand/og.png`, `${site.url}/brand/doctora-retrato.jpg`],
      description: t.meta.description,
      email: site.email,
      telephone: ["+1-829-657-2217", "+1-829-371-0276"],
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      hasMap: site.maps,
      areaServed: ["Las Terrenas", "Samaná", "República Dominicana"],
      medicalSpecialty: ["Dentistry", "PlasticSurgery", "Dermatology"],
      employee: { "@id": doctorId },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: t.services.title,
        itemListElement: t.services.items.map((group) => ({
          "@type": "OfferCatalog",
          name: group.title,
          url: `${url}/servicios/${group.slug}`,
          itemListElement: group.procedures.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "MedicalProcedure", name: p.name, description: p.desc },
          })),
        })),
      },
    },
    {
      "@type": "Physician",
      "@id": doctorId,
      name: site.doctor,
      jobTitle: t.about.doctorRole,
      image: `${site.url}/brand/doctora-retrato.jpg`,
      worksFor: { "@id": clinicId },
      address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressCountry: site.address.country },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: lang },
  ];

  if (faq) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
