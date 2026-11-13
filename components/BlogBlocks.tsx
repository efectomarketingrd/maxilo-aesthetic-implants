import InView from "./InView";
import RecFace from "./RecFace";

// Bloques animados del blog (ver tipos en lib/blog.ts). Las animaciones arrancan al entrar en pantalla.

type Pair = { t: string; d: string };

export function BlogMap({ zones, caption }: { zones: string[]; caption: string }) {
  return (
    <figure className="bb-map">
      <div className="bb-map__face">
        <RecFace items={[{ id: "botox", zones: zones.map((_, k) => k) }]} label={caption} />
      </div>
      <InView className="bb-map__legend">
        <ol>
          {zones.map((z, k) => (
            <li key={z} style={{ "--k": k } as React.CSSProperties}>
              <span>{k + 1}</span>
              {z}
            </li>
          ))}
        </ol>
        <figcaption>{caption}</figcaption>
      </InView>
    </figure>
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

export function BlogPoints({ points }: { points: Pair[] }) {
  return (
    <InView className="bb-pts">
      {points.map((p, k) => (
        <div key={p.t} className="bb-pts__card" style={{ "--k": k } as React.CSSProperties}>
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
