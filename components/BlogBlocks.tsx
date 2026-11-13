import InView from "./InView";
import PlanFace from "./PlanFace";

// Bloques animados del blog (ver tipos en lib/blog.ts). Las animaciones arrancan al entrar en pantalla.

type Pair = { t: string; d: string };

// Mapa del bótox: ciclo de ~12 s que se repite mientras está en pantalla:
// líneas marcadas → puntos de aplicación zona por zona (y la leyenda se resalta) → líneas suavizadas.
export function BlogMap({ zones, caption, phases }: { zones: string[]; caption: string; phases?: [string, string] }) {
  return (
    <InView className="bb-map">
      <div className="bb-map__face">
        {phases && (
          <div className="bb-map__phase" aria-hidden="true">
            <span>{phases[0]}</span>
            <span>{phases[1]}</span>
          </div>
        )}
        <div className="pf-story">
          <PlanFace layers={[{ kind: "botox", on: zones.map((_, k) => k) }]} label={caption} combined />
        </div>
      </div>
      <div className="bb-map__legend">
        <ol>
          {zones.map((z, k) => (
            <li key={z} style={{ "--k": k } as React.CSSProperties}>
              <span>{k + 1}</span>
              {z}
            </li>
          ))}
        </ol>
        <figcaption>{caption}</figcaption>
      </div>
    </InView>
  );
}

export function BlogTimeline({ steps }: { steps: Pair[] }) {
  return (
    <InView className="bb-time">
      <ol>
        {steps.map((s, k) => (
          <li key={s.t} style={{ "--k": k } as React.CSSProperties}>
            <span className="bb-time__dot" aria-hidden="true" />
            <strong>{s.t}</strong>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </InView>
  );
}

export function BlogCompare({ yes, no }: { yes: { t: string; items: string[] }; no: { t: string; items: string[] } }) {
  const col = (c: { t: string; items: string[] }, ok: boolean) => (
    <div className={`bb-cmp__col ${ok ? "is-yes" : "is-no"}`}>
      <h3>{c.t}</h3>
      <ul>
        {c.items.map((x, k) => (
          <li key={x} style={{ "--k": k } as React.CSSProperties}>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                {ok ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M7 7l10 10M17 7L7 17" />}
              </svg>
            </span>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <InView className="bb-cmp">
      {col(yes, true)}
      {col(no, false)}
    </InView>
  );
}

const FACE = "M24 5 C33 5 38 12 37 21 C36 31 31 41 24 43 C17 41 12 31 11 21 C10 12 15 5 24 5 Z";

// Íconos de las tarjetas: se dibujan al aparecer y luego tienen un movimiento suave en bucle
function PointIcon({ ic }: { ic: "anatomy" | "needle" | "face" | "shield" }) {
  const d = (path: string, extra = "") => <path className={`bi-d ${extra}`} pathLength={1} d={path} />;
  return (
    <span className="bb-pts__ico" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ic === "anatomy" && (
          <>
            {d(FACE)}
            {d("M17 14 Q24 11 31 14")}
            {d("M15 23 Q19 28 21 34")}
            {d("M33 23 Q29 28 27 34")}
            {d("M11 27 L17 26 L21 21 M17 26 L20 31", "bi-nerve")}
            <circle className="bi-pulse" cx="21" cy="21" r="1.8" fill="currentColor" stroke="none" />
            <circle className="bi-pulse bi-pulse--b" cx="20" cy="31" r="1.8" fill="currentColor" stroke="none" />
          </>
        )}
        {ic === "needle" && (
          <>
            <g className="bi-push">
              {d("M30 10 L38 18 L22 34 L14 26 Z")}
              {d("M36 4 L44 12 M40 8 L34 14")}
              {d("M19 23 L23 27 M23 19 L27 23 M27 15 L31 19")}
              {d("M18 30 L9 39")}
            </g>
            <circle className="bi-pulse" cx="7" cy="41" r="2.2" fill="currentColor" stroke="none" />
            <circle className="bi-ring" cx="7" cy="41" r="4.5" />
          </>
        )}
        {ic === "face" && (
          <>
            {d(FACE)}
            <g strokeDasharray="2 2.5" opacity="0.7">
              <path d="M6 16 H42 M6 27 H42 M6 37 H42 M24 3 V45" />
            </g>
            <path className="bi-scan" d="M9 9 H39" strokeWidth="2.2" />
          </>
        )}
        {ic === "shield" && (
          <>
            {d("M24 5 L38 10 V22 C38 32 32 39 24 43 C16 39 10 32 10 22 V10 Z")}
            <path className="bi-beat" pathLength={1} d="M14 25 H19 L21 19 L25 31 L28 23 H34" />
          </>
        )}
      </svg>
    </span>
  );
}

export function BlogPoints({ points }: { points: (Pair & { ic?: "anatomy" | "needle" | "face" | "shield" })[] }) {
  return (
    <InView className="bb-pts">
      {points.map((p, k) => (
        <div key={p.t} className="bb-pts__card" style={{ "--k": k } as React.CSSProperties}>
          {p.ic && <PointIcon ic={p.ic} />}
          <b>{String(k + 1).padStart(2, "0")}</b>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
        </div>
      ))}
    </InView>
  );
}

export function BlogFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="bb-faq">
      {items.map((f, k) => (
        <details key={f.q} open={k === 0}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function BlogRefs({ title, refs }: { title: string; refs: { t: string; url: string }[] }) {
  return (
    <div className="bb-refs">
      <p>{title}</p>
      <ol>
        {refs.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener nofollow">
              {r.t}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
