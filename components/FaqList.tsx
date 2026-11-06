import Link from "next/link";
import type { Dict } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";
import InView from "./InView";
import ServiceIcon from "./ServiceIcon";
import { Arrow, Calendar, Phone, Pin, WaIcon } from "./Icons";

type Item = Dict["faq"]["items"][number];

// Botones que acompañan a ciertas respuestas
function Extras({ f, t, lang }: { f: Item; t: Dict; lang: Locale }) {
  const a = t.faq.act;
  if (f.kind === "location")
    return (
      <div className="faq-x faq-x--map">
        <a className="faq-map" href={site.maps} target="_blank" rel="noopener noreferrer">
          <span className="faq-map__pin" aria-hidden="true">
            <Pin size={20} />
            <i />
          </span>
          <span className="faq-map__txt">
            <strong>{t.faq.where}</strong>
            <span>
              {site.address.locality}, {site.address.region} · {a.place}
            </span>
          </span>
          <span className="faq-map__go">
            {a.map} <Arrow size={14} />
          </span>
        </a>
      </div>
    );
  if (f.kind === "book")
    return (
      <div className="faq-x">
        <a className="faq-chip faq-chip--wa" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener noreferrer">
          <WaIcon size={16} /> {a.wa}
        </a>
        <a className="faq-chip" href="tel:+18296572217">
          <Phone size={15} /> {a.call}
        </a>
        <Link className="faq-chip faq-chip--dark" href={`/${lang}/agendar`}>
          <Calendar size={15} /> {a.book}
        </Link>
      </div>
    );
  if (f.kind === "abroad")
    return (
      <div className="faq-x">
        <Link className="faq-chip" href={`/${lang}/paquete-implantes`}>
          {a.pkg} <Arrow size={14} />
        </Link>
      </div>
    );
  if (f.kind === "services")
    return (
      <div className="faq-x faq-x--svc">
        {t.services.items.map((s, i) => (
          <Link key={s.slug} className="faq-svc" href={`/${lang}/servicios/${s.slug}`} style={{ "--k": i } as React.CSSProperties}>
            <span className="faq-svc__ico">
              <ServiceIcon kind={s.icon} />
            </span>
            <span className="faq-svc__name">
              <strong>{s.title}</strong>
              <span>{s.short}</span>
            </span>
            <Arrow size={13} />
          </Link>
        ))}
      </div>
    );
  return null;
}

export default function FaqList({ t, lang, limit }: { t: Dict; lang: Locale; limit?: number }) {
  const items = limit ? t.faq.items.slice(0, limit) : t.faq.items;
  return (
    <InView className="h5-faq__list faq-anim">
      {items.map((f, i) => (
        <details key={f.q} style={{ "--fi": i } as React.CSSProperties}>
          <summary>
            <span className="faq-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="faq-q">{f.q}</span>
          </summary>
          <div className="faq-a">
            <p>{f.kind === "services" ? t.faq.svcLead : f.a}</p>
            <Extras f={f} t={t} lang={lang} />
          </div>
        </details>
      ))}
    </InView>
  );
}
