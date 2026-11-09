import InView from "@/components/InView";
import ReplayInView from "@/components/ReplayInView";

// Infografía animada de cada tratamiento (debajo de "¿Qué es?") + franja de datos clave.
// Las ilustraciones se eligen por el slug del tratamiento; los textos vienen de lib/treatments.ts.

export type ArtLabel = { t: string; s: string };
export type FactIcon = "anest" | "titanium" | "fixed" | "crown" | "xray" | "home" | "tag" | "plan" | "follow" | "scar" | "time" | "band" | "people";
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
    <svg className="tx-svg" viewBox="0 56 374 240" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
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
    <svg className="tx-svg" viewBox="0 56 374 240" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
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
    <svg className="tx-svg" viewBox="0 50 374 250" role="img" aria-label={labels.map((l) => `${l.t} ${l.s}`).join(", ")}>
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

// ───────── Cirugía estética facial ─────────
const PROFILE_TOP =
  "M90 122 C 84 134, 70 144, 64 152 C 62 156, 70 160, 78 160 C 76 166, 70 170, 72 176 C 74 180, 78 182, 76 186 C 72 190, 70 194, 74 198 C 80 202, 84 206, 80 214";
const CHIN_BEFORE = " C 76 232, 92 254, 118 258 C 132 260, 138 272, 140 310";
const CHIN_AFTER = " C 80 226, 90 232, 106 234 C 122 236, 134 238, 140 246 L 142 310";
const BACK = " L 232 310 L 232 110 L 92 110 Z";

function SkinDefs() {
  return (
    <>
      <linearGradient id="txSkinH" x1="0" x2="1">
        <stop offset="0" stopColor="#f6ede1" />
        <stop offset="0.75" stopColor="#f3e8da" stopOpacity="0.8" />
        <stop offset="1" stopColor="#f3e8da" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="txZone2">
        <stop offset="0" stopColor="rgba(190,157,97,0.55)" />
        <stop offset="1" stopColor="rgba(190,157,97,0)" />
      </radialGradient>
    </>
  );
}

const aria = (labels: ArtLabel[]) => labels.map((l) => `${l.t} ${l.s}`).join(", ");

// Lipopapada: la papada (contorno lleno) pasa a un perfil definido; queda la silueta anterior punteada.
function DoubleChinDiagram({ labels }: { labels: ArtLabel[] }) {
  return (
    <svg className="tx-svg" viewBox="0 110 374 200" role="img" aria-label={aria(labels)}>
      <defs>
        <SkinDefs />
      </defs>
      <g className="tx-in" style={css({ "--d": 0 })}>
        <g className="tx-out" style={css({ "--d": 2.2 })}>
          <path d={PROFILE_TOP + CHIN_BEFORE + BACK} fill="url(#txSkinH)" />
          <path d={PROFILE_TOP + CHIN_BEFORE} fill="none" stroke="#253035" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>
      <g className="tx-show" style={css({ "--d": 2.2 })}>
        <path d={PROFILE_TOP + CHIN_AFTER + BACK} fill="url(#txSkinH)" />
        <path d={"M80 214" + CHIN_BEFORE} fill="none" stroke="#be9d61" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={PROFILE_TOP + CHIN_AFTER} fill="none" stroke="#253035" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <g className="tx-zone" style={css({ "--d": 0.9 })}>
        <g className="tx-out" style={css({ "--d": 2.1 })}>
          <circle cx="108" cy="246" r="24" fill="url(#txZone2)" />
        </g>
      </g>
      <path className="tx-draw" pathLength={1} style={css({ "--d": 2.9 })} d="M84 214 C 112 232, 152 228, 178 192" fill="none" stroke="#be9d61" strokeWidth="2" strokeLinecap="round" />
      <path className="tx-show" style={css({ "--d": 2.6 })} d="M86 228 l 10 3" stroke="#be9d61" strokeWidth="3" strokeLinecap="round" />
      <Labels
        labels={labels}
        items={[
          { d: "M110 250 L 200 266 H226", x: 110, y: 250, ly: 266, t: 1.0 },
          { d: "M91 230 L 200 216 H226", x: 91, y: 230, ly: 216, t: 2.6 },
          { d: "M150 226 L 200 166 H226", x: 150, y: 226, ly: 166, t: 3.0 },
        ]}
      />
    </svg>
  );
}

// Platismoplastia: las bandas del cuello se juntan en el centro y el músculo se une.
function NeckBandsDiagram({ labels }: { labels: ArtLabel[] }) {
  return (
    <svg className="tx-svg" viewBox="0 100 374 210" role="img" aria-label={aria(labels)}>
      <defs>
        <linearGradient id="txNeck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ede1" />
          <stop offset="1" stopColor="#efe3d2" />
        </linearGradient>
      </defs>
      <g className="tx-in" style={css({ "--d": 0 })}>
        <path d="M40 110 C 52 170, 88 200, 120 202 C 152 200, 188 170, 200 110 Z" fill="url(#txNeck)" />
        <path d="M74 186 C 78 230, 76 268, 66 310 L 174 310 C 164 268, 162 230, 166 186 Z" fill="url(#txNeck)" />
      </g>
      <path className="tx-draw" pathLength={1} style={css({ "--d": 0.2 })} d="M40 110 C 52 170, 88 200, 120 202 C 152 200, 188 170, 200 110" fill="none" stroke="#253035" strokeWidth="2.2" strokeLinecap="round" />
      <g className="tx-in" style={css({ "--d": 0.3 })} fill="none" stroke="#253035" strokeWidth="1.8" strokeLinecap="round">
        <path d="M100 140 C 108 134, 114 136, 120 139 C 126 136, 132 134, 140 140" />
        <path d="M100 140 C 110 152, 130 152, 140 140" />
        <path d="M114 170 q 6 3 12 0" stroke="#c9b48c" />
      </g>
      <path className="tx-draw" pathLength={1} style={css({ "--d": 0.4 })} d="M74 186 C 78 230, 76 268, 66 310" fill="none" stroke="#253035" strokeWidth="2" strokeLinecap="round" />
      <path className="tx-draw" pathLength={1} style={css({ "--d": 0.4 })} d="M166 186 C 162 230, 164 268, 174 310" fill="none" stroke="#253035" strokeWidth="2" strokeLinecap="round" />
      {/* bandas */}
      <g className="tx-band-l">
        <path className="tx-draw" pathLength={1} style={css({ "--d": 0.8 })} d="M104 206 C 100 236, 98 266, 94 306" fill="none" stroke="#c79a85" strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <g className="tx-band-r">
        <path className="tx-draw" pathLength={1} style={css({ "--d": 0.8 })} d="M136 206 C 140 236, 142 266, 146 306" fill="none" stroke="#c79a85" strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <g className="tx-show" style={css({ "--d": 3.0 })} fill="none" stroke="#be9d61" strokeWidth="1.3" strokeDasharray="3 4" opacity="0.6">
        <path d="M104 206 C 100 236, 98 266, 94 306" />
        <path d="M136 206 C 140 236, 142 266, 146 306" />
      </g>
      {/* unión central */}
      <path className="tx-draw" pathLength={1} style={css({ "--d": 2.8 })} d="M120 208 L 120 306" stroke="#be9d61" strokeWidth="2.4" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} className="tx-show" style={css({ "--d": 3.1 + k * 0.1 })} d={`M114 ${222 + k * 19} L126 ${222 + k * 19}`} stroke="#be9d61" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <path className="tx-show" style={css({ "--d": 2.5 })} d="M106 212 C 114 216, 126 216, 134 212" fill="none" stroke="#be9d61" strokeWidth="2.6" strokeLinecap="round" />
      <Labels
        labels={labels}
        items={[
          { d: "M145 288 L 200 286 H226", x: 145, y: 288, ly: 286, t: 1.3 },
          { d: "M120 250 L 200 236 H226", x: 120, y: 250, ly: 236, t: 3.1 },
          { d: "M132 214 L 200 178 H226", x: 132, y: 214, ly: 178, t: 2.6 },
        ]}
      />
    </svg>
  );
}

// Blefaroplastia: la piel sobrante del párpado se retira y aparece el pliegue natural; las bolsas se suavizan.
function EyelidDiagram({ labels }: { labels: ArtLabel[] }) {
  const EYE = "M40 192 C 80 152, 160 152, 200 192 C 160 224, 80 224, 40 192 Z";
  return (
    <svg className="tx-svg" viewBox="0 90 374 180" role="img" aria-label={aria(labels)}>
      <defs>
        <radialGradient id="txFace">
          <stop offset="0" stopColor="#f6ede1" />
          <stop offset="0.8" stopColor="#f3e8da" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f3e8da" stopOpacity="0" />
        </radialGradient>
        <clipPath id="txEyeClip">
          <path d={EYE} />
        </clipPath>
      </defs>
      <g className="tx-in" style={css({ "--d": 0 })}>
        <ellipse cx="120" cy="180" rx="118" ry="88" fill="url(#txFace)" />
        <path d="M36 124 C 80 100, 150 98, 206 118" fill="none" stroke="#5a4c42" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="tx-in" style={css({ "--d": 0.2 })}>
        <path d={EYE} fill="#fff" />
        <g clipPath="url(#txEyeClip)">
          <circle cx="120" cy="190" r="25" fill="#4d5d63" />
          <circle cx="120" cy="190" r="10" fill="#1c2529" />
          <circle cx="129" cy="181" r="4.5" fill="#fff" />
        </g>
        <path d={EYE} fill="none" stroke="#253035" strokeWidth="2.4" />
      </g>
      {/* piel sobrante */}
      <g className="tx-in" style={css({ "--d": 0.4 })}>
        <g className="tx-lift" style={css({ "--d": 2.3 })}>
          <path d="M36 188 C 66 138, 174 134, 204 186 C 172 170, 70 172, 36 188 Z" fill="#ead8c4" stroke="#d2b896" strokeWidth="1.6" />
        </g>
      </g>
      <path className="tx-draw" pathLength={1} style={css({ "--d": 2.8 })} d="M52 170 C 88 144, 152 142, 190 166" fill="none" stroke="#be9d61" strokeWidth="2" strokeLinecap="round" />
      {/* bolsas */}
      <g className="tx-in" style={css({ "--d": 0.5 })}>
        <g className="tx-out" style={css({ "--d": 2.6 })}>
          <path d="M58 214 C 84 246, 156 246, 182 214 C 150 232, 90 232, 58 214 Z" fill="rgba(160,120,90,0.16)" />
          <path d="M58 214 C 84 246, 156 246, 182 214" fill="none" stroke="#c9a98d" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </g>
      <path className="tx-draw" pathLength={1} style={css({ "--d": 3.0 })} d="M62 218 C 92 230, 148 230, 178 218" fill="none" stroke="#d6bea2" strokeWidth="1.8" strokeLinecap="round" />
      <Labels
        labels={labels}
        items={[
          { d: "M176 156 L 206 130 H226", x: 176, y: 156, ly: 130, t: 3.0 },
          { d: "M150 166 L 206 182 H226", x: 150, y: 166, ly: 182, t: 1.0 },
          { d: "M150 236 H226", x: 150, y: 236, ly: 236, t: 1.4 },
        ]}
      />
    </svg>
  );
}

// Otoplastia: la oreja prominente se acerca a la cabeza; queda su posición anterior punteada.
const EAR = "M0 -26 C 14 -34, 30 -24, 28 -4 C 26 12, 16 18, 10 28 C 6 34, 0 32, 0 26 Z";
const EAR_IN = "M6 -16 C 16 -20, 22 -12, 20 -2 C 18 8, 12 10, 9 16";
function EarDiagram({ labels }: { labels: ArtLabel[] }) {
  return (
    <svg className="tx-svg" viewBox="0 80 374 225" role="img" aria-label={aria(labels)}>
      <defs>
        <linearGradient id="txHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ede1" />
          <stop offset="1" stopColor="#efe3d2" />
        </linearGradient>
      </defs>
      <g className="tx-in" style={css({ "--d": 0 })}>
        <path d="M98 244 L 96 304 M142 244 L 144 304" stroke="#253035" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="120" cy="174" rx="56" ry="76" fill="url(#txHead)" stroke="#253035" strokeWidth="2.2" />
        <path d="M64 168 C 60 112, 90 98, 120 98 C 150 98, 180 112, 176 168 C 168 132, 150 120, 120 120 C 90 120, 72 132, 64 168 Z" fill="#2e3b41" />
        <g fill="none" stroke="#253035" strokeWidth="1.8" strokeLinecap="round">
          <path d="M96 176 q 8 6 16 0 M128 176 q 8 6 16 0 M120 184 l -4 16 h 8 M108 216 q 12 8 24 0" />
        </g>
      </g>
      {/* oreja izquierda (normal) */}
      <g className="tx-in" style={css({ "--d": 0.2 })}>
        <g transform="translate(65 172) scale(-0.8 1)">
          <path d={EAR} fill="url(#txHead)" stroke="#253035" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={EAR_IN} fill="none" stroke="#253035" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
      {/* posición anterior */}
      <g className="tx-show" style={css({ "--d": 2.4 })}>
        <g transform="translate(175 172) scale(1.5 1)">
          <path d={EAR} fill="none" stroke="#be9d61" strokeWidth="1.3" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
      {/* oreja derecha */}
      <g transform="translate(175 172)">
        <g className="tx-ear">
          <path d={EAR} fill="url(#txHead)" stroke="#253035" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d={EAR_IN} fill="none" stroke="#253035" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
      <path className="tx-show" style={css({ "--d": 3.0 })} d="M177 150 L 177 196" stroke="#be9d61" strokeWidth="2.4" strokeDasharray="3 4" strokeLinecap="round" />
      <Labels
        labels={labels}
        items={[
          { d: "M214 160 L 220 132 H226", x: 214, y: 160, ly: 132, t: 0.9 },
          { d: "M196 176 H226", x: 196, y: 176, ly: 182, t: 2.8 },
          { d: "M177 196 L 206 232 H226", x: 177, y: 196, ly: 232, t: 3.2 },
        ]}
      />
    </svg>
  );
}

const arts: Record<string, (p: { labels: ArtLabel[] }) => React.ReactElement> = {
  "implantes-dentales": ImplantDiagram,
  "extraccion-cordales": WisdomDiagram,
  "cirugia-oral-maxilofacial": FaceZonesDiagram,
  "lipopapada-perfilamiento-mandibular": DoubleChinDiagram,
  platismoplastia: NeckBandsDiagram,
  blefaroplastia: EyelidDiagram,
  otoplastia: EarDiagram,
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
  scar: <path d="M4 12h16M7.5 9l1 6M11.5 9l1 6M15.5 9l1 6" />,
  time: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2" />,
  band: <path d="M3.5 9.5h17v5h-17zM8 9.5v5M16 9.5v5M11 12h2" />,
  people: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M16.5 11a2.5 2.5 0 1 0 0-5M16 14.2c2.6.4 4.5 2.6 4.5 5.3" />,
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
        <ReplayInView className="tx-art">
          <Art labels={labels} />
          {caption && <p className="tx-cap">{caption}</p>}
        </ReplayInView>
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
