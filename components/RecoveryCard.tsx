import InView from "./InView";
import type { CareIcon, ExpectIcon } from "@/lib/treatments";

// "Su recuperación": lo que puede esperar (camino en 3 momentos, en tono tranquilo) + cuidados con ✓.
const ICONS: Record<CareIcon, string> = {
  pill: "M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z M7 7l7 7",
  bowl: "M3 11h18a9 9 0 0 1-18 0z M8.5 7.5c0-1.5 1-2 1-3.5 M12.5 7.5c0-1.5 1-2 1-3.5 M16.5 7.5c0-1.5 1-2 1-3.5",
  brush: "M3.5 20.5 13 11 M12 8.5h8.5v3.5H12z M14 8.5V5.5 M17 8.5V5.5 M20 8.5V5.5",
  calendar: "M4 6h16v14H4z M4 10h16 M8 4v4 M16 4v4 M9 15l2 2 4-4",
};
const EXPECT: Record<ExpectIcon, string> = {
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4",
  leaf: "M5 19c0-8 5-13 14-14 0 9-5 14-13 14z M5 19l8-8",
  crown: "M8 4.5c-2.3 0-3.8 1.7-3.8 4.2 0 2.1.9 3.6 1.3 6.2.3 2.1.6 5.1 2.1 5.1 1.3 0 1.5-3 2.1-4.6.3-.8.7-1.3 1.3-1.3h1.6c.6 0 1 .5 1.3 1.3.6 1.6.8 4.6 2.1 4.6 1.5 0 1.8-3 2.1-5.1.4-2.6 1.3-4.1 1.3-6.2 0-2.5-1.5-4.2-3.8-4.2-1.7 0-2.4 1-4 1s-2.3-1-4-1z",
};

export default function RecoveryCard({ title, c, k, after }: { title: string; c: { expect: { ic: ExpectIcon; t: string; s: string }[]; items: { ic: CareIcon; t: string; s: string }[] }; k: { recNormal: string; recCare: string }; after?: React.ReactNode }) {
  return (
    <section className="sv-sec sv-sec--white">
      <div className="container sv-wrap">
        <h2 className="loc-h2">{title}</h2>
        <InView className="rc">
          <div className="rc-normal">
            <p className="rc-label">{k.recNormal}</p>
            <ol className="rc-path">
              {c.expect.map((e, i) => (
                <li key={e.t} style={{ "--i": i } as React.CSSProperties}>
                  <span className="rc-path__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={EXPECT[e.ic]} />
                    </svg>
                  </span>
                  <span className="rc-txt">
                    <strong>{e.t}</strong>
                    <small>{e.s}</small>
                  </span>
                </li>
              ))}
            </ol>
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
        {after}
      </div>
    </section>
  );
}
