"use client";

import { useId } from "react";

// Rostro de frente para el armador de planes: cada tratamiento tiene sus zonas
// y solo se encienden (con número) las que el paciente marca. Las demás quedan como guía tenue.
import type { PlanKind } from "@/lib/plan";

const FACE = "M118 92 C 170 92, 192 136, 188 184 C 184 228, 162 280, 118 290 C 74 280, 52 228, 48 184 C 44 136, 66 92, 118 92 Z";
const GOLD = "#be9d61";
const LINE = "#c49a80";

type Zone = {
  glow?: [number, number, number][]; // brillo suave (x, y, radio)
  mesh?: [number, number, number, number][]; // malla de hilos (x, y, rx, ry)
  lines?: string[]; // líneas de expresión
  threads?: string[]; // hilos (dorados)
  arrows?: string[]; // flechas de elevación
  dots?: [number, number][]; // puntos de aplicación
  marks?: [number, number][]; // lesiones (verrugas)
  cracks?: string[]; // fracturas
  guides?: string[]; // guías de proporción (punteadas)
  badge: [number, number];
};

const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?)[ ,]+(-?\d+(?:\.\d+)?)/g, (_m, x: string, y: string) => `${236 - Number(x)} ${y}`);
const mirrorRel = (d: string) =>
  // trazos con coordenadas relativas (l, q): solo se refleja el punto inicial y se invierten las x relativas
  d.replace(/M(-?[\d.]+) (-?[\d.]+) l (-?[\d.]+) (-?[\d.]+)/g, (_m, x, y, dx, dy) => `M${236 - Number(x)} ${y} l ${-Number(dx)} ${dy}`);

const both = (d: string) => [d, mirror(d)];
const bothRel = (d: string) => [d, mirrorRel(d)];

const JAW_L = "M50 200 C 56 236, 76 278, 118 290";
const EAR_L = "M50 166 C 40 160, 33 170, 35 184 C 37 198, 43 207, 50 204";
// puntos sobre el cuero cabelludo (PRP capilar): se encienden más según el plan
const SCALP: [number, number][] = [[118, 100], [98, 104], [138, 104], [80, 112], [156, 112], [108, 112], [128, 112], [68, 124], [168, 124], [90, 120], [146, 120], [118, 116]];

const ZONES: Partial<Record<PlanKind, Zone[]>> = {
  oral: [
    { glow: [[118, 222, 20]], badge: [148, 214] },
    { threads: both("M58 236 C 70 268, 92 286, 118 289"), badge: [66, 262] },
    { glow: [[118, 244, 14]], badge: [140, 262] },
    { glow: [[54, 192, 9], [182, 192, 9]], dots: [[54, 192], [182, 192]], badge: [182, 210] },
  ],
  lipo: [
    { glow: [[118, 294, 16]], threads: ["M98 290 C 106 299, 130 299, 138 290"], badge: [150, 298] },
    { threads: both(JAW_L), badge: [60, 250] },
  ],
  platisma: [{ glow: [[118, 306, 14]], threads: ["M108 291 L 105 322", "M128 291 L 131 322", "M110 287 Q 118 292, 126 287"], badge: [150, 306] }],
  blefaro: [
    { glow: [[92, 163, 10], [144, 163, 10]], threads: both("M82 165 Q 92 158, 102 165"), badge: [70, 160] },
    { glow: [[92, 181, 10], [144, 181, 10]], threads: both("M83 179 Q 92 186, 101 179"), badge: [166, 188] },
  ],
  oto: [
    { glow: [[42, 186, 14]], threads: [EAR_L], arrows: ["M34 180 L 39 185 L 34 190"], badge: [42, 220] },
    { glow: [[194, 186, 14]], threads: [mirror(EAR_L)], arrows: ["M202 180 L 197 185 L 202 190"], badge: [194, 220] },
  ],
  bichat: [{ glow: [[82, 226, 13], [154, 226, 13]], arrows: both("M66 220 L 72 226 L 66 232"), badge: [160, 246] }],
  facelift: [
    { glow: [[76, 204, 16], [160, 204, 16]], threads: both("M92 222 L 66 182"), arrows: both("M62 190 L 65 181 L 74 184"), badge: [178, 218] },
    { glow: [[118, 306, 15]], threads: both("M108 320 L 100 298"), arrows: both("M96 305 L 99 297 L 106 300"), badge: [152, 310] },
  ],
  lobule: [
    { glow: [[45, 203, 8]], dots: [[45, 203]], badge: [44, 222] },
    { glow: [[191, 203, 8]], dots: [[191, 203]], badge: [192, 222] },
  ],
  wart: [
    { marks: [[104, 136], [130, 142], [118, 128]], badge: [84, 138] },
    { marks: [[90, 164], [148, 165]], badge: [166, 158] },
    { marks: [[74, 212], [82, 222], [160, 214]], badge: [62, 226] },
    { marks: [[123, 197]], badge: [138, 196] },
    { marks: [[111, 272], [125, 278]], badge: [144, 276] },
    { marks: [[108, 304], [130, 311], [118, 318]], badge: [152, 306] },
  ],
  harmony: [{ glow: [[72, 204, 15], [164, 204, 15], [118, 278, 12]], guides: ["M50 158 H 186", "M50 210 H 186", "M60 288 H 176", "M118 128 V 296"], badge: [0, 0] }],
  rejuv: [{ glow: [[118, 140, 18], [76, 208, 17], [160, 208, 17], [118, 274, 13]], dots: [[96, 140], [140, 140], [74, 206], [162, 206], [118, 270]], badge: [0, 0] }],
  prpcap: [
    { dots: SCALP.slice(0, 3), badge: [0, 0] },
    { dots: SCALP.slice(0, 7), badge: [0, 0] },
    { dots: SCALP, badge: [0, 0] },
    { dots: SCALP.slice(0, 2), badge: [0, 0] },
  ],
  prpfac: [{ glow: [[118, 138, 18], [76, 208, 16], [160, 208, 16], [118, 272, 12]], dots: [[100, 136], [118, 132], [136, 136], [72, 200], [80, 216], [164, 200], [156, 216], [110, 270], [126, 270]], badge: [0, 0] }],
  fracture: [
    { glow: [[82, 274, 12]], cracks: ["M78 266 l 5 5 l -3 4 l 5 5"], badge: [62, 262] },
    { glow: [[110, 220, 12]], cracks: ["M100 214 l 6 3 l -2 4 l 6 3"], badge: [90, 210] },
    { glow: [[160, 202, 12]], cracks: ["M154 194 l 5 4 l -4 4 l 5 4"], badge: [178, 196] },
    { glow: [[118, 190, 9]], cracks: ["M118 181 l 3 5 l -3 4 l 3 5"], badge: [134, 184] },
    { glow: [[92, 172, 16]], threads: ["M76 172 A 16 12 0 1 1 108 172 A 16 12 0 1 1 76 172"], badge: [70, 188] },
  ],
  malform: [{ glow: [[118, 284, 14]], threads: both(JAW_L), arrows: ["M112 300 L 118 306 L 124 300"], badge: [0, 0] }],
  recon: [{ glow: [[88, 264, 15]], threads: ["M54 214 C 58 240, 70 262, 92 278"], dots: [[84, 258], [93, 264], [86, 270]], badge: [0, 0] }],
  botox: [
    { lines: ["M96 133 C 108 130, 128 130, 140 133", "M92 141 C 106 138, 130 138, 144 141", "M100 148 C 110 146, 126 146, 136 148"], dots: [[100, 137], [118, 135], [136, 137]], badge: [84, 136] },
    { lines: ["M114 152 l 1 10", "M122 152 l -1 10"], dots: [[118, 157]], badge: [118, 170] },
    { lines: [...bothRel("M74 165 l -9 -4"), ...bothRel("M73 172 l -10 0"), ...bothRel("M74 179 l -9 4")], dots: [[60, 172], [176, 172]], badge: [60, 188] },
    { lines: bothRel("M98 241 l -4 8"), dots: [[94, 249], [142, 249]], badge: [150, 256] },
    { lines: ["M108 224 l 1 5", "M114 223 l 0 5", "M122 223 l 0 5", "M128 224 l -1 5", "M110 256 l 1 -4", "M126 256 l -1 -4"], dots: [[111, 226], [125, 226]], badge: [84, 228] },
  ],
  filler: [
    { glow: [[92, 184, 11], [144, 184, 11]], threads: ["M83 181 q 9 6 18 0", "M135 181 q 9 6 18 0"], badge: [80, 192] },
    { glow: [[70, 206, 17], [166, 206, 17]], badge: [166, 206] },
    { threads: both("M108 210 C 100 218, 96 228, 98 237"), badge: [89, 222] },
    { glow: [[118, 242, 15]], badge: [118, 226] },
    { threads: both("M99 243 C 97 252, 97 260, 101 268"), badge: [148, 260] },
    { glow: [[118, 276, 13]], badge: [118, 278] },
    { threads: both("M48 184 C 52 228, 74 280, 118 290"), badge: [66, 250] },
  ],
  lift: [
    { glow: [[76, 200, 16], [160, 200, 16]], threads: [...both("M64 160 C 70 182, 80 198, 96 212"), ...both("M58 170 C 64 190, 72 204, 86 220")], arrows: [...both("M59 167 L 63 158 L 71 162"), ...both("M53 177 L 57 168 L 65 172")], badge: [194, 212] },
    { glow: [[78, 262, 14], [158, 262, 14]], threads: [...both("M54 196 C 60 224, 70 244, 92 264"), ...both("M52 210 C 58 236, 70 256, 98 276")], arrows: [...both("M49 203 L 53 194 L 61 197"), ...both("M47 217 L 51 208 L 59 211")], badge: [42, 236] },
  ],
  bio: [
    { mesh: [[74, 206, 18, 16], [162, 206, 18, 16]], badge: [162, 228] },
    { mesh: [[118, 306, 16, 12]], badge: [148, 306] },
    { mesh: [[118, 222, 20, 6], [118, 262, 20, 7]], badge: [86, 248] },
  ],
};

// layers: uno o varios tratamientos con sus zonas marcadas.
// combined: modo resumen (planes recomendados): sin números y sin las zonas apagadas.
// quiet: tratamientos de una sola opción o sin elección: sin números y sin zonas apagadas.
export default function PlanFace({ layers, label, combined = false, quiet = false }: { layers: { kind: PlanKind; on: number[] }[]; label: string; combined?: boolean; quiet?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  let seq = 0;
  return (
    <svg className="pf-svg" viewBox="34 84 168 240" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ede1" />
          <stop offset="1" stopColor="#efe3d2" />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="rgba(190,157,97,0.6)" />
          <stop offset="1" stopColor="rgba(190,157,97,0)" />
        </radialGradient>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9958a" />
          <stop offset="1" stopColor="#c47c72" />
        </linearGradient>
        <pattern id={`${id}m`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V6 M0 0 H6" stroke={GOLD} strokeWidth="0.9" />
        </pattern>
      </defs>
      {/* rostro base */}
      <path d="M98 284 L 96 324 M138 284 L 140 324" stroke="#253035" strokeWidth="2" strokeLinecap="round" />
      <g fill={`url(#${id}f)`} stroke="#253035" strokeWidth="1.8">
        <path d={`${EAR_L} Z`} />
        <path d={`${mirror(EAR_L)} Z`} />
      </g>
      <path d="M45 174 C 40 176, 40 188, 44 196 M191 174 C 196 176, 196 188, 192 196" fill="none" stroke="#c9b48c" strokeWidth="1.3" strokeLinecap="round" />
      <path d={FACE} fill={`url(#${id}f)`} stroke="#253035" strokeWidth="2" />
      <path d="M48 184 C 40 120, 80 88, 118 88 C 156 88, 196 120, 188 184 C 182 140, 160 122, 118 122 C 76 122, 54 140, 48 184 Z" fill="#2e3b41" />
      <g fill="none" stroke="#253035" strokeWidth="1.8" strokeLinecap="round">
        <path d="M80 158 q 12 -6 24 0 M132 158 q 12 -6 24 0" />
        <path d="M82 171 q 10 7 20 0 M134 171 q 10 7 20 0" />
      </g>
      <path d="M114 178 C 112 194, 106 202, 110 208 C 114 212, 122 212, 126 208 C 130 202, 124 194, 122 178" fill="none" stroke="#c9b48c" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M98 238 C 106 232, 112 230, 118 234 C 124 230, 130 232, 138 238 C 130 240, 124 241, 118 240 C 112 241, 106 240, 98 238 Z" fill={`url(#${id}l)`} />
      <path d="M99 239 C 106 242, 112 243, 118 243 C 124 243, 130 242, 137 239 C 132 250, 124 253, 118 253 C 112 253, 104 250, 99 239 Z" fill={`url(#${id}l)`} />

      {/* zonas */}
      {layers.flatMap(({ kind, on }) =>
        (ZONES[kind] ?? []).map((z, k) => {
        const active = on.includes(k);
        if ((combined || quiet) && !active) return null;
        const order = active ? seq++ : 0;
        return (
          <g key={`${kind}${k}`} className={`pf-z${active ? " is-on" : ""}`} style={combined ? ({ "--o": order } as React.CSSProperties) : undefined}>
            {z.glow?.map(([x, y, r], m) => (
              <circle key={`g${m}`} className="pf-pop" cx={x} cy={y} r={r} fill={`url(#${id}g)`} />
            ))}
            {z.mesh?.map(([x, y, rx, ry], m) => (
              <g key={`m${m}`} className="pf-pop">
                <ellipse cx={x} cy={y} rx={rx + 4} ry={ry + 4} fill={`url(#${id}g)`} />
                <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id}m)`} />
              </g>
            ))}
            {z.lines?.map((d, m) => (
              <path key={`l${m}`} className="pf-line" d={d} fill="none" stroke={LINE} strokeWidth="1.8" strokeLinecap="round" />
            ))}
            {z.threads?.map((d, m) => (
              <path key={`t${m}`} className="pf-draw" pathLength={1} d={d} fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
            ))}
            {z.arrows?.map((d, m) => (
              <path key={`a${m}`} d={d} fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {z.dots?.map(([x, y], m) => (
              <g key={`d${m}`} className="pf-pop">
                <circle cx={x} cy={y} r="5.5" fill="rgba(190,157,97,0.28)" />
                <circle cx={x} cy={y} r="2.3" fill={GOLD} />
              </g>
            ))}
            {z.guides?.map((d, m) => (
              <path key={`u${m}`} d={d} fill="none" stroke={GOLD} strokeWidth="1.1" strokeDasharray="3 3" opacity="0.8" />
            ))}
            {z.cracks?.map((d, m) => (
              <path key={`c${m}`} d={d} fill="none" stroke="#b25c46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {z.marks?.map(([x, y], m) => (
              <g key={`k${m}`} className="pf-pop">
                <circle cx={x} cy={y} r="5" fill="none" stroke={GOLD} strokeWidth="1" />
                <circle cx={x} cy={y} r="2.4" fill="#8a6a52" />
              </g>
            ))}
            {!combined && !quiet && (
              <g className="pf-b">
                <circle cx={z.badge[0]} cy={z.badge[1]} r="6.5" fill={GOLD} stroke="#fff" strokeWidth="1.2" />
                <text className="tx-num" x={z.badge[0]} y={z.badge[1] + 3}>
                  {k + 1}
                </text>
              </g>
            )}
          </g>
        );
      }))}
    </svg>
  );
}
