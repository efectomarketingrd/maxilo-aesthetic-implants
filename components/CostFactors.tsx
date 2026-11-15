import Link from "next/link";
import InView from "./InView";
import type { CostIcon } from "@/lib/treatments";

// "¿De qué depende el costo?": cada tarjeta tiene una mini escena animada en bucle:
// dientes que se encienden uno a uno, implante personalizado que brilla, prótesis con destello, escalones que se suben.
const TOOTH = "M8 4.5c-2.3 0-3.8 1.7-3.8 4.2 0 2.1.9 3.6 1.3 6.2.3 2.1.6 5.1 2.1 5.1 1.3 0 1.5-3 2.1-4.6.3-.8.7-1.3 1.3-1.3h1.6c.6 0 1 .5 1.3 1.3.6 1.6.8 4.6 2.1 4.6 1.5 0 1.8-3 2.1-5.1.4-2.6 1.3-4.1 1.3-6.2 0-2.5-1.5-4.2-3.8-4.2-1.7 0-2.4 1-4 1s-2.3-1-4-1z";
const IMPLANT = ["M8 3h8l-1 3.5H9z", "M12 6.5V21", "M8.5 9.5h7", "M9 12.5h6", "M9.5 15.5h5", "M10.2 18.5h3.6"];
const GEM = "M6.5 4h11l3.5 5-9 11L3 9z";

function Scene({ ic }: { ic: CostIcon }) {
  return (
    <svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {ic === "teeth" &&
        [0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${0.5 + i * 15.6} 17) scale(0.66)`}>
            <path className="cf-tooth" style={{ "--t": i } as React.CSSProperties} d={TOOTH} strokeWidth="2.2" />
          </g>
        ))}
      {ic === "implant" && (
        <>
          <g transform="translate(1 6) scale(1.1)" opacity="0.4" strokeWidth="1.6">
            {IMPLANT.map((d) => <path key={d} d={d} />)}
          </g>
          <circle className="cf-halo" cx="34" cy="20" r="11" fill="currentColor" stroke="none" />
          <g transform="translate(20.5 6) scale(1.1)" strokeWidth="1.6">
            {IMPLANT.map((d) => <path key={d} className="cf-d" pathLength={1} d={d} />)}
          </g>
          <g transform="translate(42 6)">
            <path className="cf-star" d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="currentColor" stroke="none" />
          </g>
        </>
      )}
      {ic === "crown" && (
        <>
          <defs>
            <clipPath id="cf-gem">
              <path d={GEM} />
            </clipPath>
          </defs>
          <g transform="translate(4.8 5) scale(1.6)" strokeWidth="1">
            <path d={GEM} fill="rgba(190,157,97,0.14)" />
            <g clipPath="url(#cf-gem)">
              <g transform="rotate(22 12 12)">
                <rect className="cf-shine" x="-8" y="-6" width="3.5" height="36" fill="#fff" stroke="none" />
              </g>
            </g>
            <path className="cf-d" pathLength={1} d={GEM} />
            <path className="cf-d" pathLength={1} d="M3 9h18" />
            <path className="cf-d" pathLength={1} d="M9.5 4 8 9l4 11 4-11-1.5-5" />
          </g>
        </>
      )}
      {ic === "time" && (
        <>
          <path className="cf-d" pathLength={1} d="M4 42h10v-9h10v-9h10v-9h10" strokeWidth="1.8" />
          <circle className="cf-dot" r="3.2" fill="currentColor" stroke="none" />
          <path className="cf-flag" d="M41 15V5l5 2.5-5 2.5" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}

// Contenido sin la sección: la página lo envuelve en <Fold>.
export default function CostFactors({ c, book, bookLabel }: { c: { title: string; intro: string; items: { ic: CostIcon; t: string; d: string }[]; closeT: string; close: string }; book: string; bookLabel: string }) {
  return (
    <>
      <p className="tr-p cf-intro">{c.intro}</p>
      <InView className="cf">
        <div className="cf-panel">
          <ul className="cf-grid">
            {c.items.map((it, k) => (
              <li key={it.t} className={`cf-row cf-row--${it.ic}`} style={{ "--k": k } as React.CSSProperties}>
                <span className="cf-ico" aria-hidden="true">
                  <Scene ic={it.ic} />
                </span>
                <span className="cf-txt">
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </span>
              </li>
            ))}
          </ul>
          <div className="cf-close">
            <span className="cf-close__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path className="cf-d" pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <div>
              <strong>{c.closeT}</strong>
              <p>{c.close}</p>
            </div>
            <Link className="btn btn--gold btn--sm h5-btn-shine" href={book}>
              {bookLabel}
            </Link>
          </div>
        </div>
      </InView>
    </>
  );
}
