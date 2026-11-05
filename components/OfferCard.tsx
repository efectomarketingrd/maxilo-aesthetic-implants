import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/site";
import { img } from "@/lib/images";
import InView from "./InView";
import { Arrow } from "./Icons";

const PETAL = "M0 0 C -24 -8, -34 -46, -12 -64 C -2 -72, 14 -70, 22 -60 C 38 -40, 22 -10, 0 0 Z";

function Hibiscus({ className, scale = 1 }: { className: string; scale?: number }) {
  return (
    <g className={className}>
      <g transform={`scale(${scale})`}>
        <g className="fl-petals">
          {[0, 72, 144, 216, 288].map((r) => (
            <g key={r} transform={`rotate(${r})`}>
              <path d={PETAL} fill="url(#flPetal)" stroke="rgba(160,110,60,0.35)" strokeWidth="0.8" />
              <path d="M0 0 C -4 -20, -2 -40, 4 -56" stroke="rgba(150,90,50,0.35)" strokeWidth="0.9" fill="none" />
            </g>
          ))}
        </g>
        <circle r="9" fill="url(#flHeart)" />
        <g className="fl-stamen">
          <path d="M0 0 C 8 -14, 18 -26, 30 -36" stroke="#9c6b3d" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[[30, -36], [34, -32], [27, -40], [33, -39], [29, -31]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.4" fill="#f3d9a4" />
          ))}
        </g>
      </g>
    </g>
  );
}

// Flor tropical que sobresale de la tarjeta
function Flower() {
  return (
    <svg className="offer2__flower" viewBox="0 0 240 220" aria-hidden="true">
      <defs>
        <radialGradient id="flPetal" cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#b8643f" />
          <stop offset="0.35" stopColor="#e2a066" />
          <stop offset="1" stopColor="#f6dcae" />
        </radialGradient>
        <radialGradient id="flHeart">
          <stop offset="0" stopColor="#7d3a24" />
          <stop offset="1" stopColor="#b8643f" />
        </radialGradient>
        <linearGradient id="flLeaf" x1="0" x2="1">
          <stop offset="0" stopColor="#2b433d" />
          <stop offset="1" stopColor="#4d6e63" />
        </linearGradient>
      </defs>

      <g className="fl-leaf fl-leaf--1">
        <path d="M120 120 C 150 80, 200 70, 236 86 C 204 112, 160 126, 120 120 Z" fill="url(#flLeaf)" />
        <path d="M120 120 C 160 104, 196 94, 232 88" stroke="#be9d61" strokeWidth="1.2" fill="none" />
      </g>
      <g className="fl-leaf fl-leaf--2">
        <path d="M118 124 C 90 160, 96 200, 120 218 C 136 186, 136 150, 118 124 Z" fill="url(#flLeaf)" />
        <path d="M118 124 C 122 156, 122 186, 120 214" stroke="#be9d61" strokeWidth="1.2" fill="none" />
      </g>
      <g className="fl-leaf fl-leaf--3">
        <path d="M116 118 C 76 104, 36 116, 10 146 C 50 150, 88 140, 116 118 Z" fill="url(#flLeaf)" opacity="0.9" />
        <path d="M116 118 C 80 126, 44 136, 14 146" stroke="#be9d61" strokeWidth="1" fill="none" />
      </g>

      <g transform="translate(64 158)">
        <Hibiscus className="fl-bud" scale={0.5} />
      </g>
      <g transform="translate(130 96)">
        <Hibiscus className="fl-main" />
      </g>

      <g className="fl-pollen">
        <circle cx="168" cy="54" r="2" />
        <circle cx="150" cy="40" r="1.6" />
        <circle cx="178" cy="70" r="1.4" />
      </g>
    </svg>
  );
}

export default function OfferCard({ t, lang }: { t: Dict; lang: Locale }) {
  const k = t.pkg;
  const href = `/${lang}/paquete-implantes`;
  return (
    <section className="offer2-wrap">
      <div className="container">
        <InView className="offer2">
          <Link href={href} className="offer2__card">
            <span className="offer2__photo">
              <Image src={img.playa} alt="" fill sizes="(min-width: 1040px) 640px, 100vw" />
              <span className="offer2__glint" aria-hidden="true" />
            </span>
            <span className="offer2__panel">
              <span className="offer2__dots" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="offer2__tag">
                {k.tag} <span className="offer2__spark">✦</span>
              </span>
              <span className="offer2__title">
                <span className="offer2__line">{k.cardTitle}</span> <em className="offer2__line">{k.cardAccent}</em>
              </span>
              <span className="offer2__text">{k.cardText}</span>
              <span className="btn btn--gold offer2__btn h5-btn-shine">
                {k.cardCta} <Arrow size={14} />
              </span>
            </span>
          </Link>
          <Flower />
        </InView>
      </div>
    </section>
  );
}
