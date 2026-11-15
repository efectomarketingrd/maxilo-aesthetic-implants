import InView from "./InView";
import type { CareIcon } from "@/lib/treatments";

// "Su recuperación": qué es normal (curva que baja) + cuidados con ✓.
const ICONS: Record<CareIcon, string> = {
  pill: "M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z M7 7l7 7",
  bowl: "M3 11h18a9 9 0 0 1-18 0z M8.5 7.5c0-1.5 1-2 1-3.5 M12.5 7.5c0-1.5 1-2 1-3.5 M16.5 7.5c0-1.5 1-2 1-3.5",
  brush: "M3.5 20.5 13 11 M12 8.5h8.5v3.5H12z M14 8.5V5.5 M17 8.5V5.5 M20 8.5V5.5",
  calendar: "M4 6h16v14H4z M4 10h16 M8 4v4 M16 4v4 M9 15l2 2 4-4",
};
const CURVE = "M16 20 C 62 22, 86 74, 134 88 S 222 102, 248 103";

export default function RecoveryCard({ title, c, k }: { title: string; c: { normal: string; items: { ic: CareIcon; t: string; s: string }[] }; k: { recNormal: string; recCurve: string[]; recCare: string } }) {
  return (
    <section className="sv-sec sv-sec--white">
      <div className="container sv-wrap">
        <h2 className="loc-h2">{title}</h2>
        <InView className="rc">
          <div className="rc-normal">
            <p className="rc-label">{k.recNormal}</p>
            <div className="rc-chart">
              <span className="rc-y">{k.recCurve[0]}</span>
              <svg viewBox="0 0 264 116" role="img" aria-label={c.normal}>
                <defs>
                  <linearGradient id="rc-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#be9d61" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#be9d61" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M16 108H252" stroke="#d9cfbf" strokeWidth="1.2" />
                <path d="M16 10V108" stroke="#d9cfbf" strokeWidth="1.2" />
                <path className="rc-area" d={`${CURVE} L248 108 L16 108 Z`} fill="url(#rc-fill)" />
                <path className="rc-curve" pathLength={1} d={CURVE} fill="none" stroke="#be9d61" strokeWidth="3" strokeLinecap="round" />
                <circle className="rc-start" cx="16" cy="20" r="5" fill="#fff" stroke="#be9d61" strokeWidth="2.5" />
                <circle className="rc-end" cx="248" cy="103" r="5" fill="#be9d61" />
              </svg>
              <div className="rc-x">
                <span>{k.recCurve[1]}</span>
                <span>{k.recCurve[2]}</span>
              </div>
            </div>
            <p className="rc-text">{c.normal}</p>
          </div>
          <div className="rc-care">
            <p className="rc-label">{k.recCare}</p>
            <ul>
              {c.items.map((it, i) => (
                <li key={it.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="rc-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ICONS[it.ic]} />
                    </svg>
                  </span>
                  <span className="rc-txt">
                    <strong>{it.t}</strong>
                    <small>{it.s}</small>
                  </span>
                  <span className="rc-tick" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </InView>
      </div>
    </section>
  );
}
