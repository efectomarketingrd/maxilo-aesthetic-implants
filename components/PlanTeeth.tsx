"use client";

import type { PlanKind } from "@/lib/plan";

// Arcadas vistas desde arriba (superior e inferior) para implantes y cordales.
// La derecha del paciente queda a la izquierda de quien mira, como en una radiografía.
const GOLD = "#be9d61";
const CX = 118;
const RX = 82;
const RY = 66;
const UP_Y = 108; // centro de la arcada superior (se dibuja hacia arriba)
const LO_Y = 168; // centro de la arcada inferior (se dibuja hacia abajo)

type Tooth = { x: number; y: number; r: number };

// 16 dientes por arcada, del 0 (a la izquierda de la imagen) al 15
function arch(upper: boolean): Tooth[] {
  return Array.from({ length: 16 }, (_, i) => {
    const deg = upper ? 186 + (i * 168) / 15 : 174 - (i * 168) / 15;
    const a = (deg * Math.PI) / 180;
    const edge = Math.min(i, 15 - i); // 0 = cordal … 7 = incisivo central
    const r = edge <= 2 ? 8 : edge <= 4 ? 7 : edge === 5 ? 6.5 : 5.5;
    return { x: CX + RX * Math.cos(a), y: (upper ? UP_Y : LO_Y) + RY * Math.sin(a), r };
  });
}
const UP = arch(true);
const LO = arch(false);

// Qué dientes resalta cada zona/opción: [arcada, índice]
const MARK: Partial<Record<PlanKind, [("u" | "l"), number][][]>> = {
  molar: [[["u", 0]], [["u", 15]], [["l", 0]], [["l", 15]]],
  implant: [
    [["u", 11]],
    [["l", 11], ["l", 12]],
    [["u", 3], ["u", 5], ["l", 10], ["l", 12]],
    Array.from({ length: 14 }, (_, i) => ["u", i + 1] as ["u", number]),
  ],
};

const arc = (y: number, upper: boolean) => {
  const [a, b] = upper ? [186, 354] : [174, 6];
  const p = (d: number) => [CX + RX * Math.cos((d * Math.PI) / 180), y + RY * Math.sin((d * Math.PI) / 180)].map((n) => n.toFixed(1)).join(" ");
  return `M${p(a)} A ${RX} ${RY} 0 0 ${upper ? 1 : 0} ${p(b)}`;
};

export default function PlanTeeth({ kind, on, label, quiet = false, sides }: { kind: PlanKind; on: number[]; label: string; quiet?: boolean; sides: [string, string] }) {
  const marks = MARK[kind] ?? [];
  const tooth = (arcade: "u" | "l", i: number) => (arcade === "u" ? UP : LO)[i];
  return (
    <svg className="pf-svg pf-svg--teeth" viewBox="18 24 200 230" role="img" aria-label={label}>
      {/* encías */}
      <path d={arc(UP_Y, true)} fill="none" stroke="#efc9c3" strokeWidth="26" strokeLinecap="round" />
      <path d={arc(LO_Y, false)} fill="none" stroke="#efc9c3" strokeWidth="26" strokeLinecap="round" />
      {/* dientes */}
      {[...UP, ...LO].map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill="#fbf8f2" stroke="#c9bfae" strokeWidth="1.2" />
      ))}
      <text className="pf-side" x="24" y="141">{sides[0]}</text>
      <text className="pf-side" x="212" y="141" textAnchor="end">{sides[1]}</text>
      {/* zonas */}
      {marks.map((teeth, k) => {
        const active = on.includes(k);
        if (quiet && !active) return null;
        const first = tooth(...teeth[0]);
        const out = first.x < CX ? -1 : 1;
        const isUp = teeth[0][0] === "u";
        return (
          <g key={k} className={`pf-z${active ? " is-on" : ""}`}>
            {teeth.map(([a, i], m) => {
              const t = tooth(a, i);
              return (
                <g key={m} className="pf-pop">
                  <circle cx={t.x} cy={t.y} r={t.r + 6} fill="rgba(190,157,97,0.25)" />
                  <circle cx={t.x} cy={t.y} r={t.r} fill="#f3e6cc" stroke={GOLD} strokeWidth="1.8" />
                  {kind === "implant" && <circle cx={t.x} cy={t.y} r="2.4" fill="none" stroke={GOLD} strokeWidth="1.4" />}
                </g>
              );
            })}
            {!quiet && (
              <g className="pf-b">
                <circle cx={first.x + out * 2} cy={first.y + (isUp ? -18 : 18)} r="6.5" fill={GOLD} stroke="#fff" strokeWidth="1.2" />
                <text className="tx-num" x={first.x + out * 2} y={first.y + (isUp ? -15 : 21)}>
                  {k + 1}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
