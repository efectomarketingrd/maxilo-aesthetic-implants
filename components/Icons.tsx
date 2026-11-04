// Iconos de línea en el estilo de la marca (trazo fino, se colorean con `currentColor`).
type P = { size?: number };
const base = (size = 40) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Tooth = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M16 7c-5 0-8 4-8 9 0 4 2 6 3 9 1 4 1 9 2 13 .6 2.4 3.6 2.4 4.2 0 .8-3.6 1.6-9 4.8-9s4 5.4 4.8 9c.6 2.4 3.6 2.4 4.2 0 1-4 1-9 2-13 1-3 3-5 3-9 0-5-3-9-8-9-3 0-4 1.6-6 1.6S19 7 16 7z" />
    <path d="M18 14c2 1.2 4 1.2 6 0" />
  </svg>
);

export const Profile = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M27 5c-8 0-14 6-14 14 0 4 1.6 7 2 9l-3 6 4 1v4c0 2 1.6 3 3.6 3H24v3" />
    <path d="M27 5c7 0 11 5 11 12 0 5-2 8-5 11v15" />
    <path d="M22 20h.01M18 30c1.4.8 3 .8 4.4 0" />
  </svg>
);

export const Syringe = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M30 6l12 12M36 12l-4 4M33 9L14 28l6 6 19-19" />
    <path d="M14 28l-5 5 6 6 5-5M9 39l-3 3M22 26l3 3M26 22l3 3" />
  </svg>
);

export const Shield = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M24 5l15 6v11c0 10-7 18-15 21C16 40 9 32 9 22V11l15-6z" />
    <path d="M24 16v14M17 23h14" />
  </svg>
);

export const Check = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <path d="M10 25l9 9 19-20" />
  </svg>
);

export const Star = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7L12 2z" />
  </svg>
);

export const Award = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="24" cy="18" r="11" />
    <path d="M17 27l-4 15 11-6 11 6-4-15" />
    <path d="M20 18l3 3 6-6" />
  </svg>
);

export const Building = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 42h36M10 42V18l14-10 14 10v24M16 42V26h16v16M24 8v0" />
    <path d="M20 18h8" />
  </svg>
);

export const Pin = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}>
    <path d="M24 44s14-12 14-24a14 14 0 1 0-28 0c0 12 14 24 14 24z" />
    <circle cx="24" cy="20" r="5" />
  </svg>
);

export const Phone = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}>
    <path d="M14 6l6 10-4 4c2 5 6 9 11 11l4-4 10 6-3 7C23 40 8 25 7 9l7-3z" />
  </svg>
);

export const Mail = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}>
    <rect x="6" y="11" width="36" height="26" rx="2" />
    <path d="M6 13l18 13 18-13" />
  </svg>
);

export const Clock = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}>
    <circle cx="24" cy="24" r="18" />
    <path d="M24 14v10l7 5" />
  </svg>
);

export const Arrow = ({ size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2.6}>
    <path d="M8 24h32M28 12l12 12-12 12" />
  </svg>
);

export const WaIcon = ({ size = 20 }: P) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
);

export const serviceIcons = { tooth: Tooth, profile: Profile, syringe: Syringe, shield: Shield };
