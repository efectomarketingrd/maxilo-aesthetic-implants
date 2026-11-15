import Link from "next/link";
import InView from "./InView";
import type { CostIcon } from "@/lib/treatments";

// "¿De qué depende el costo?": tarjetas con icono que se dibuja al aparecer + cierre "Usted elige".
const ICONS: Record<CostIcon, string[]> = {
  teeth: ["M8 4.5c-2.3 0-3.8 1.7-3.8 4.2 0 2.1.9 3.6 1.3 6.2.3 2.1.6 5.1 2.1 5.1 1.3 0 1.5-3 2.1-4.6.3-.8.7-1.3 1.3-1.3h1.6c.6 0 1 .5 1.3 1.3.6 1.6.8 4.6 2.1 4.6 1.5 0 1.8-3 2.1-5.1.4-2.6 1.3-4.1 1.3-6.2 0-2.5-1.5-4.2-3.8-4.2-1.7 0-2.4 1-4 1s-2.3-1-4-1z"],
  implant: ["M8 3h8l-1 3.5H9z", "M12 6.5V21", "M8.5 9.5h7", "M9 12.5h6", "M9.5 15.5h5", "M10.2 18.5h3.6"],
  crown: ["M6.5 4h11l3.5 5-9 11L3 9z", "M3 9h18", "M9.5 4 8 9l4 11 4-11-1.5-5"],
  time: ["M3 20h5v-5h5v-5h5V5h3", "M17.5 3.5 21 5l-1.5 3.5"],
};

export default function CostFactors({ c, book, bookLabel }: { c: { title: string; intro: string; items: { ic: CostIcon; t: string; d: string }[]; closeT: string; close: string }; book: string; bookLabel: string }) {
  return (
    <section className="sv-sec">
      <div className="container sv-wrap">
        <h2 className="loc-h2">{c.title}</h2>
        <p className="tr-p cf-intro">{c.intro}</p>
        <InView className="cf">
          <ul className="cf-grid">
            {c.items.map((it, k) => (
              <li key={it.t} className="cf-card" style={{ "--k": k } as React.CSSProperties}>
                <span className="cf-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[it.ic].map((d) => (
                      <path key={d} className="cf-d" pathLength={1} d={d} />
                    ))}
                  </svg>
                </span>
                <b className="cf-n">{String(k + 1).padStart(2, "0")}</b>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
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
        </InView>
      </div>
    </section>
  );
}
