import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/site";
import { img } from "@/lib/images";
import InView from "./InView";
import { Arrow, Heart, Sun, Video } from "./Icons";

// Palmera dorada decorativa (las hojas se mecen)
function Palm() {
  return (
    <svg className="offer2__palm" viewBox="0 0 160 200" aria-hidden="true">
      <path className="palm-trunk" d="M92 198c-6-40-6-80 6-120" />
      <g className="palm-leaves">
        <path className="palm-leaf palm-leaf--1" d="M98 78c-18-22-48-28-76-16 26-2 50 6 76 16z" />
        <path className="palm-leaf palm-leaf--2" d="M98 78c-6-28-28-48-58-52 24 10 42 28 58 52z" />
        <path className="palm-leaf palm-leaf--3" d="M98 78c10-26 34-40 62-38-26 6-46 18-62 38z" />
        <path className="palm-leaf palm-leaf--4" d="M98 78c26-4 50 8 62 30-20-14-40-22-62-30z" />
        <path className="palm-leaf palm-leaf--5" d="M98 78c-24 6-40 24-44 50 10-22 24-38 44-50z" />
      </g>
      <circle className="palm-sun" cx="40" cy="150" r="16" />
    </svg>
  );
}

export default function OfferCard({ t, lang }: { t: Dict; lang: Locale }) {
  const k = t.pkg;
  const href = `/${lang}/paquete-implantes`;
  const icons = [Video, Sun, Heart];
  return (
    <section className="offer2-wrap">
      <div className="container">
        <InView className="offer2">
          <Link href={href} className="offer2__card">
            <span className="offer2__photo">
              <Image src={img.playa} alt="" fill sizes="(min-width: 1040px) 640px, 100vw" />
            </span>
            <span className="offer2__panel">
              <span className="offer2__tag">
                {k.tag} <span className="offer2__spark">✦</span>
              </span>
              <span className="offer2__title">
                {k.cardTitle} <em>{k.cardAccent}</em>
              </span>
              <span className="offer2__text">{k.cardText}</span>
              <span className="btn btn--gold offer2__btn h5-btn-shine">
                {k.cardCta} <Arrow size={14} />
              </span>
            </span>
            <Palm />
          </Link>
          <ul className="offer2__perks">
            {k.perks.map((p, i) => {
              const I = icons[i];
              return (
                <li key={p.t} style={{ "--d": i } as React.CSSProperties}>
                  <span className="offer2__perk-ico">
                    <I size={22} />
                  </span>
                  <span>
                    <strong>{p.t}</strong>
                    {p.d}
                  </span>
                </li>
              );
            })}
          </ul>
        </InView>
      </div>
    </section>
  );
}
