// Iconos de servicios en dos tonos (pizarra + dorado), preparados para animarse.
// .ic-draw = trazos que se dibujan al aparecer · .ic-act = parte que hace el gesto propio de cada icono
type Kind = "tooth" | "profile" | "syringe" | "shield";

const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function ServiceIcon({ kind, size = 36 }: { kind: Kind; size?: number }) {
  if (kind === "tooth")
    return (
      <svg {...common} width={size} height={size} className="sicon sicon--implant">
        <g className="ic-line" strokeWidth="2">
          <path className="ic-draw" pathLength={1} d="M14 7c-4 0-6.5 3-6.5 7.2 0 3.2 1.6 5.4 2.6 7.8h27.8c1-2.4 2.6-4.6 2.6-7.8C40.5 10 38 7 34 7c-2.8 0-4.4 1.4-6.2 1.4h-7.6C18.4 8.4 16.8 7 14 7z" />
          <path className="ic-draw" pathLength={1} d="M19 22v4h10v-4" />
        </g>
        <g className="ic-act ic-gold" strokeWidth="2">
          <path className="ic-draw" pathLength={1} d="M20 26h8l-1.6 15.5a2 2 0 0 1-2 1.5h-.8a2 2 0 0 1-2-1.5z" />
          <path className="ic-draw" pathLength={1} d="M18.6 30.5h10.8M19.2 35h9.6M20 39.5h8" />
        </g>
      </svg>
    );

  if (kind === "profile")
    return (
      <svg {...common} width={size} height={size} className="sicon sicon--profile">
        <g className="ic-line" strokeWidth="2">
          <path
            className="ic-draw"
            pathLength={1}
            d="M17 43v-6.5c0-4-3-6.5-4.4-10.6C10.4 19.5 12.8 9.8 21 6.6 28.4 3.8 36 7.6 37.4 15c.4 2.3 0 4 1.5 6.3l2.3 3.4-3 1.3.8 3.4-2.2 1 .9 2.8c.5 2.4-1.2 4-3.8 3.6l-3.4-.5V43"
          />
        </g>
        <g className="ic-act ic-gold" strokeWidth="2.2">
          <path className="ic-draw" pathLength={1} d="M29.5 17.5c2.4 2.6 3 6.4 1.4 9.6-1.1 2.2-3.2 3.6-5.6 4" />
          <path className="ic-spark" d="M37 6.5v4M35 8.5h4" strokeWidth="1.8" />
        </g>
      </svg>
    );

  if (kind === "syringe")
    return (
      <svg {...common} width={size} height={size} className="sicon sicon--syringe">
        <g className="ic-line" strokeWidth="2">
          <path className="ic-draw" pathLength={1} d="M18 4h12M24 4v6" />
          <path className="ic-draw" pathLength={1} d="M17 10h14M19 10v19a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10" />
          <path className="ic-draw" pathLength={1} d="M24 31v7" />
          <path d="M21.5 15h2.5M21.5 19h2.5" strokeWidth="1.6" />
        </g>
        <rect className="ic-fill" x="20.4" y="21.5" width="7.2" height="8" rx="1.2" />
        <path className="ic-act ic-drop" d="M24 39.5c-1.9 2.4-2.6 3.6-2.6 4.6a2.6 2.6 0 0 0 5.2 0c0-1-.7-2.2-2.6-4.6z" />
      </svg>
    );

  return (
    <svg {...common} width={size} height={size} className="sicon sicon--jaw">
      <g className="ic-line" strokeWidth="2">
        <path className="ic-draw" pathLength={1} d="M8 9v6c0 11.5 6.8 21.3 16 24 9.2-2.7 16-12.5 16-24V9" />
        <path className="ic-draw" pathLength={1} d="M14 22.5l1.5-2.5M19.5 26l1-2.6M28.5 23.4l-1 2.6M34 20l-1.5 2.5" />
      </g>
      <g className="ic-gold" strokeWidth="2.2">
        <path className="ic-draw ic-act" pathLength={1} d="M13.5 29.5c3.5 4 7 5.5 10.5 5.5s7-1.5 10.5-5.5" />
        <circle className="ic-screwdot" cx="18" cy="33" r="1.3" />
        <circle className="ic-screwdot" cx="30" cy="33" r="1.3" />
      </g>
    </svg>
  );
}
