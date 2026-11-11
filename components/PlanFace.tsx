"use client";

import { useId } from "react";

// Rostro de frente para el armador de planes: cada tratamiento tiene sus zonas
// y solo se encienden (con número) las que el paciente marca. Las demás quedan como guía tenue.
export type PlanKind = "botox" | "filler" | "lift" | "bio";

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
  badge: [number, number];
};

const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?)[ ,]+(-?\d+(?:\.\d+)?)/g, (_m, x: string, y: string) => `${236 - Number(x)} ${y}`);
const mirrorRel = (d: string) =>
  // trazos con coordenadas relativas (l, q): solo se refleja el punto inicial y se invierten las x relativas
  d.replace(/M(-?[\d.]+) (-?[\d.]+) l (-?[\d.]+) (-?[\d.]+)/g, (_m, x, y, dx, dy) => `M${236 - Number(x)} ${y} l ${-Number(dx)} ${dy}`);

const both = (d: string) => [d, mirror(d)];
const bothRel = (d: string) => [d, mirrorRel(d)];

const ZONES: Record<PlanKind, Zone[]> = {
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

export function zoneCount(kind: PlanKind) {
  return ZONES[kind].length;
}

export default function PlanFace({ kind, on, label }: { kind: PlanKind; on: number[]; label: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const zones = ZONES[kind];
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
      {zones.map((z, k) => {
        const active = on.includes(k);
        return (
          <g key={k} className={`pf-z${active ? " is-on" : ""}`}>
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
              <path key={`l${m}`} d={d} fill="none" stroke={LINE} strokeWidth="1.8" strokeLinecap="round" />
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
            <g className="pf-b">
              <circle cx={z.badge[0]} cy={z.badge[1]} r="6.5" fill={GOLD} stroke="#fff" strokeWidth="1.2" />
              <text className="tx-num" x={z.badge[0]} y={z.badge[1] + 3}>
                {k + 1}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
