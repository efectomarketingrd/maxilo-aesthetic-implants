import InView from "@/components/InView";

// Infografía animada de cada tratamiento (debajo de "¿Qué es?") + franja de datos clave.
// Las ilustraciones se eligen por el slug del tratamiento; los textos vienen de lib/treatments.ts.

export type ArtLabel = { t: string; s: string };
export type FactIcon = "anest" | "titanium" | "fixed" | "crown" | "xray" | "home" | "tag" | "plan" | "follow";
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


// Leyenda reutilizable: línea (recta o en codo) + punto + nombre y detalle
function Labels({ items, labels }: { items: { d: string; x: number; y: number; ly: number; t: number }[]; labels: ArtLabel[] }) {
  return (
    <>
      {items.map((l, i) => (
        <g key={i} style={css({ "--d": l.t })}>
          <path className="tx-lead" pathLength={1} d={l.d} stroke="#be9d61" strokeWidth="1.3" strokeDasharray="1" fill="none" />
          <circle className="tx-lab" cx={l.x} cy={l.y} r="3" fill="#be9d61" />
          <text className="tx-lab" x="234" y={l.ly - 3}>
            <tspan className="tx-t">{labels[i]?.t}</tspan>
            <tspan className="tx-s" x="234" dy="15">
              {labels[i]?.s}
            </tspan>
          </text>
        </g>
      ))}
    </>
  );
}

// Molar con dos raíces (origen arriba a la izquierda, 44 de ancho)
const MOLAR =
  "M0 18 C0 4 8 0 14 4 C 18 0 26 0 30 4 C 36 0 44 4 44 18 C 44 30 40 36 36 36 L 34 36 L 34 82 Q 30 90 26 82 L 24 44 L 20 44 L 18 82 Q 14 90 10 82 L 10 36 L 8 36 C 4 36 0 30 0 18 Z";

// Cordal retenida: la muela del juicio inclinada empuja al molar vecino; luego se retira y queda el espacio libre.
function WisdomDiagram({ labels }: { labels: ArtLabel[] }) {
  return (
    <svg className="tx-svg" viewBox="0 56 340 240" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
      <defs>
        <linearGradient id="txBone2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e7d6" />
          <stop offset="1" stopColor="#e8dbc4" />
        </linearGradient>
        <linearGradient id="txTooth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1e9da" />
        </linearGradient>
        <clipPath id="txBoneClip2">
          <rect x="10" y="150" width="220" height="140" rx="20" />
        </clipPath>
      </defs>

      <g className="tx-in" style={css({ "--d": 0 })}>
        <rect x="10" y="150" width="220" height="140" rx="20" fill="url(#txBone2)" />
        <g clipPath="url(#txBoneClip2)" fill="#e0cfb2">
          {[[28, 270], [60, 284], [170, 262], [204, 238], [208, 278], [120, 286], [196, 196]].map(([x, y], k) => (
            <ellipse key={k} cx={x} cy={y} rx="7" ry="4.5" />
          ))}
        </g>
      </g>

      {/* molares */}
      <g className="tx-in" style={css({ "--d": 0.2 })}>
        <path d={MOLAR} transform="translate(18 104) scale(1.1)" fill="url(#txTooth)" stroke="#d6cdbd" strokeWidth="1.8" opacity="0.7" />
        <path d={MOLAR} transform="translate(72 104) scale(1.1)" fill="url(#txTooth)" stroke="#d8c39b" strokeWidth="1.8" />
      </g>

      {/* encía */}
      <path className="tx-in" style={css({ "--d": 0.3 })} d="M10 144 C 30 136, 50 136, 68 144 C 86 136, 104 136, 122 144 C 160 132, 200 132, 230 146 L 230 160 L 10 160 Z" fill="#edd3c7" opacity="0.92" />

      {/* espacio libre tras la extracción */}
      <g transform="translate(152 182) rotate(-42) translate(-22 -18)">
        <path className="tx-ghost" d={MOLAR} fill="none" stroke="#be9d61" strokeWidth="1.6" strokeDasharray="4 4" />
      </g>

      {/* cordal */}
      <g transform="translate(152 182) rotate(-42) translate(-22 -18)">
        <g className="tx-wisdom">
          <path d={MOLAR} fill="url(#txTooth)" stroke="#c79a85" strokeWidth="2" />
        </g>
      </g>

      {/* presión sobre el molar vecino */}
      <g className="tx-press">
        <circle cx="126" cy="166" r="7" fill="none" stroke="#c0846a" strokeWidth="2" />
        <circle cx="126" cy="166" r="7" fill="none" stroke="#c0846a" strokeWidth="2" style={css({ animationDelay: "2.35s" })} />
      </g>

      {/* listo */}
      <g className="tx-ok">
        <circle cx="152" cy="182" r="13" fill="#253035" />
        <path d="M146 182 l4.5 4.5 8 -9" fill="none" stroke="#d8c39b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <Labels
        labels={labels}
        items={[
          { d: "M104 112 H226", x: 104, y: 112, ly: 96, t: 0.6 },
          { d: "M126 166 L 150 140 H226", x: 126, y: 166, ly: 140, t: 1.6 },
          { d: "M174 200 L 198 192 H226", x: 174, y: 200, ly: 192, t: 1.0 },
          { d: "M150 268 H226", x: 150, y: 268, ly: 254, t: 0.4 },
        ]}
      />
    </svg>
  );
}

// Cirugía oral y maxilofacial: perfil del rostro; se iluminan las zonas que trata.
function FaceZonesDiagram({ labels }: { labels: ArtLabel[] }) {
  const zones = [
    { x: 168, y: 172, t: 1.5 }, // articulación
    { x: 112, y: 164, t: 2.1 }, // maxilar
    { x: 80, y: 188, t: 2.7 }, // boca
    { x: 120, y: 232, t: 3.3 }, // mandíbula
  ];
  return (
    <svg className="tx-svg" viewBox="0 50 340 250" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
      <defs>
        <radialGradient id="txZone">
          <stop offset="0" stopColor="rgba(190,157,97,0.55)" />
          <stop offset="1" stopColor="rgba(190,157,97,0)" />
        </radialGradient>
        <linearGradient id="txSkin" x1="0" x2="1">
          <stop offset="0" stopColor="#f6eee3" />
          <stop offset="1" stopColor="#efe4d4" />
        </linearGradient>
      </defs>

      {/* silueta */}
      <path
        className="tx-in"
        style={css({ "--d": 0.6 })}
        d="M128 58 C 104 64, 94 84, 96 104 C 96 112, 92 116, 90 122 C 84 134, 70 144, 64 152 C 62 156, 70 160, 78 160 C 76 166, 70 170, 72 176 C 74 180, 78 182, 76 186 C 72 190, 70 194, 74 198 C 80 202, 84 206, 80 214 C 78 222, 82 230, 96 236 C 112 242, 128 244, 136 252 L 140 300 L 214 300 C 206 270, 204 246, 210 220 C 220 180, 216 120, 196 92 C 180 68, 154 54, 128 58 Z"
        fill="url(#txSkin)"
      />
      <path
        className="tx-draw"
        pathLength={1}
        d="M128 58 C 104 64, 94 84, 96 104 C 96 112, 92 116, 90 122 C 84 134, 70 144, 64 152 C 62 156, 70 160, 78 160 C 76 166, 70 170, 72 176 C 74 180, 78 182, 76 186 C 72 190, 70 194, 74 198 C 80 202, 84 206, 80 214 C 78 222, 82 230, 96 236 C 112 242, 128 244, 136 252 L 140 300"
        fill="none"
        stroke="#253035"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* oreja, maxilar y mandíbula (guías) */}
      <path className="tx-draw" pathLength={1} style={css({ "--d": 0.5 })} d="M168 146 C 178 136, 190 146, 186 162 C 184 172, 176 174, 174 182" fill="none" stroke="#253035" strokeWidth="1.8" strokeLinecap="round" />
      <path className="tx-draw" pathLength={1} style={css({ "--d": 0.9 })} d="M82 214 C 98 232, 132 234, 152 222 C 162 214, 166 196, 168 178" fill="none" stroke="#c9b48c" strokeWidth="1.6" />

      {/* zonas */}
      {zones.map((z, i) => (
        <g key={i} className="tx-zone" style={css({ "--d": z.t })}>
          <circle cx={z.x} cy={z.y} r="22" fill="url(#txZone)" />
          <circle cx={z.x} cy={z.y} r="4" fill="#be9d61" />
        </g>
      ))}

      <Labels
        labels={labels}
        items={[
          { d: "M168 172 L 206 116 H226", x: 168, y: 172, ly: 116, t: 1.5 },
          { d: "M112 164 L 200 158 H226", x: 112, y: 164, ly: 160, t: 2.1 },
          { d: "M80 188 L 200 206 H226", x: 80, y: 188, ly: 206, t: 2.7 },
          { d: "M120 232 L 200 252 H226", x: 120, y: 232, ly: 252, t: 3.3 },
        ]}
      />
    </svg>
  );
}

const arts: Record<string, (p: { labels: ArtLabel[] }) => React.ReactElement> = {
  "implantes-dentales": ImplantDiagram,
  "extraccion-cordales": WisdomDiagram,
  "cirugia-oral-maxilofacial": FaceZonesDiagram,
};

const factIcons: Record<FactIcon, React.ReactNode> = {
  anest: <path d="M9 3h6M10 3v3h4V3M8 6h8v13a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM8 11h8M12 21v1" />,
  titanium: <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4zM12 2.8V12m0 0 8-4.6M12 12l-8-4.6M12 12v9.2" />,
  fixed: <path d="M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5zM12 15v2.5" />,
  xray: <path d="M4 5h16v14H4zM9 9c0-1 1-1.6 3-1.6S15 8 15 9v2c0 2-1 4-3 4s-3-2-3-4zM9.5 15.5 9 17M14.5 15.5 15 17" />,
  home: <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />,
  tag: <path d="M3.5 12.5 12 4h7.5v7.5L11 20zM16 8h.01" />,
  plan: <path d="M8 4h8v3H8zM6 5.5H5v15h14v-15h-1M8.5 12l2 2 4-4M8.5 17h7" />,
  follow: <path d="M5 6h14v14H5zM5 10h14M9 4v4M15 4v4M9 14l2 2 4-4" />,
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
