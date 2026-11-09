import InView from "@/components/InView";

// Infografía animada de cada tratamiento (debajo de "¿Qué es?") + franja de datos clave.
// Las ilustraciones se eligen por el slug del tratamiento; los textos vienen de lib/treatments.ts.

export type ArtLabel = { t: string; s: string };
export type FactIcon = "anest" | "titanium" | "fixed" | "crown";
export type Fact = { i: FactIcon; t: string; s: string };

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

// Implante dental: hueso y encía → el implante entra → se integra → pilar → corona. Cada parte con su nombre.
function ImplantDiagram({ labels }: { labels: ArtLabel[] }) {
  const L = [
    { y: 98, x1: 150, d: 3.0 }, // corona
    { y: 152, x1: 132, d: 2.3 }, // pilar
    { y: 208, x1: 138, d: 1.3 }, // implante
    { y: 258, x1: 150, d: 0.5 }, // hueso
  ];
  const dots = [
    [98, 190], [142, 186], [100, 222], [140, 230], [104, 254], [136, 258], [112, 280], [128, 282],
  ];
  return (
    <svg className="tx-svg" viewBox="0 56 340 240" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
      <defs>
        <linearGradient id="txTi" x1="0" x2="1">
          <stop offset="0" stopColor="#8f9ca1" />
          <stop offset="0.5" stopColor="#e9eef0" />
          <stop offset="1" stopColor="#7f8d92" />
        </linearGradient>
        <linearGradient id="txCrown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#efe6d6" />
        </linearGradient>
        <linearGradient id="txBone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e7d6" />
          <stop offset="1" stopColor="#e8dbc4" />
        </linearGradient>
        <clipPath id="txBoneClip">
          <rect x="10" y="162" width="220" height="130" rx="20" />
        </clipPath>
      </defs>

      {/* hueso */}
      <g className="tx-in" style={css({ "--d": 0 })}>
        <rect x="10" y="162" width="220" height="130" rx="20" fill="url(#txBone)" />
        <g clipPath="url(#txBoneClip)" fill="#e0cfb2">
          {[[30, 190], [60, 214], [36, 246], [70, 270], [180, 196], [206, 226], [176, 252], [210, 276], [150, 290], [90, 292]].map(([x, y], k) => (
            <ellipse key={k} cx={x} cy={y} rx="7" ry="4.5" />
          ))}
        </g>
        <path d="M10 170 H230" stroke="#d8c39b" strokeWidth="2" />
      </g>

      {/* diente vecino */}
      <g className="tx-in" style={css({ "--d": 0.25 })} opacity="0.6">
        <path d="M30 146 L 36 236 Q 49 254 62 236 L 68 146" fill="#fbf8f2" stroke="#d6cdbd" strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 112 C 22 88, 34 80, 49 84 C 64 80, 76 88, 76 112 C 76 134, 68 150, 49 152 C 30 150, 22 134, 22 112 Z" fill="#fff" stroke="#d6cdbd" strokeWidth="2" />
      </g>

      {/* encía */}
      <path className="tx-in" style={css({ "--d": 0.15 })} d="M10 158 C 40 140, 70 142, 96 152 L 144 152 C 170 142, 200 140, 230 158 L 230 172 L 10 172 Z" fill="#edd3c7" />

      {/* implante (tornillo) */}
      <g className="tx-screw">
        <path d="M103 172 H137 L131 262 Q120 278 109 262 Z" fill="url(#txTi)" />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <path key={k} d={`M${101 + k * 0.9} ${180 + k * 12.5} L${139 - k * 0.9} ${175 + k * 12.5}`} stroke="#66757a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <rect x="104" y="166" width="32" height="8" rx="2" fill="#9aa7ac" />
      </g>

      {/* integración con el hueso */}
      <g className="tx-osseo" fill="#be9d61">
        {dots.map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r="3.2" style={css({ "--k": k })} />
        ))}
      </g>

      {/* pilar */}
      <path className="tx-pilar" d="M110 136 H130 L134 170 H106 Z" fill="url(#txTi)" stroke="#8f9ca1" strokeWidth="1" />

      {/* corona */}
      <g className="tx-crown">
        <path d="M90 104 C 90 80, 103 70, 120 75 C 137 70, 150 80, 150 104 C 150 126, 140 140, 120 140 C 100 140, 90 126, 90 104 Z" fill="url(#txCrown)" stroke="#d8c39b" strokeWidth="2" />
        <path d="M102 92 C 106 87, 112 87, 115 91" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
      </g>
      <path className="tx-spark" d="M160 64 l3 7.5 7.5 3 -7.5 3 -3 7.5 -3 -7.5 -7.5 -3 7.5 -3z" fill="#be9d61" />

      {/* nombres de las partes */}
      {L.map((l, i) => (
        <g key={i} style={css({ "--d": l.d })}>
          <path className="tx-lead" pathLength={1} d={`M${l.x1} ${l.y} H226`} stroke="#be9d61" strokeWidth="1.3" strokeDasharray="1" fill="none" />
          <circle className="tx-lab" cx={l.x1} cy={l.y} r="3" fill="#be9d61" />
          <text className="tx-lab" x="234" y={l.y - 3}>
            <tspan className="tx-t">{labels[i]?.t}</tspan>
            <tspan className="tx-s" x="234" dy="15">
              {labels[i]?.s}
            </tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

const arts: Record<string, (p: { labels: ArtLabel[] }) => React.ReactElement> = {
  "implantes-dentales": ImplantDiagram,
};

const factIcons: Record<FactIcon, React.ReactNode> = {
  anest: <path d="M9 3h6M10 3v3h4V3M8 6h8v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM8 11h8M12 21v1" />,
  titanium: <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4zM12 2.8V12m0 0 8-4.6M12 12l-8-4.6M12 12v9.2" />,
  fixed: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2.5" />,
  crown: <path d="M7 3.5c2-.8 3.5-.2 5 .8 1.5-1 3-1.6 5-.8 2.3 1 2.7 4 1.8 7.3L17 19c-.4 1.6-2.4 1.6-2.7 0L13 13.5c-.3-1.2-1.7-1.2-2 0L9.7 19c-.3 1.6-2.3 1.6-2.7 0l-1.8-8.2C4.3 7.5 4.7 4.5 7 3.5z" />,
};

export function hasVisual(slug: string) {
  return slug in arts;
}

export default function TreatmentVisual({ slug, labels, facts, caption }: { slug: string; labels?: ArtLabel[]; facts?: Fact[]; caption?: string }) {
  const Art = arts[slug];
  if (!Art && !facts?.length) return null;
  return (
    <div className="tx">
      {Art && labels && (
        <InView className="tx-art">
          <Art labels={labels} />
          {caption && <p className="tx-cap">{caption}</p>}
        </InView>
      )}
      {facts && facts.length > 0 && (
        <InView className="tx-facts">
          {facts.map((f, i) => (
            <li key={f.t} style={css({ "--i": i })}>
              <span className="tx-facts__ico">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {factIcons[f.i]}
                </svg>
              </span>
              <strong>{f.t}</strong>
              <span>{f.s}</span>
            </li>
          ))}
        </InView>
      )}
    </div>
  );
}
