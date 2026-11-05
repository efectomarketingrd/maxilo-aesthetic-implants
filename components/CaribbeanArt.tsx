// Ilustración del Caribe (atardecer, mar y palmas) en los colores de la marca.
// Se puede reemplazar por una foto real de Las Terrenas cuando la tengan.
export default function CaribbeanArt() {
  return (
    <svg className="caribbean" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e3b41" />
          <stop offset="0.45" stopColor="#8c7a5c" />
          <stop offset="0.7" stopColor="#d8c39b" />
          <stop offset="1" stopColor="#f1e4c8" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f7f86" />
          <stop offset="1" stopColor="#253035" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6e7c5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f6e7c5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9d8b4" />
          <stop offset="1" stopColor="#c9ab76" />
        </linearGradient>
      </defs>

      <rect width="640" height="360" fill="url(#sky)" />
      <circle cx="400" cy="214" r="120" fill="url(#sunGlow)" />
      <circle cx="400" cy="214" r="38" fill="#f6e7c5" />

      {/* nubes */}
      <g fill="#f8f6f2" opacity="0.35">
        <ellipse cx="150" cy="90" rx="70" ry="9" />
        <ellipse cx="200" cy="104" rx="46" ry="6" />
        <ellipse cx="520" cy="70" rx="60" ry="7" />
      </g>

      {/* mar */}
      <rect y="214" width="640" height="146" fill="url(#sea)" />
      <g stroke="#f6e7c5" strokeLinecap="round" opacity="0.55">
        <path d="M352 226h96" strokeWidth="3" />
        <path d="M368 238h64" strokeWidth="2.5" />
        <path d="M380 250h40" strokeWidth="2" />
        <path d="M390 262h20" strokeWidth="1.6" />
      </g>
      <g stroke="#f8f6f2" strokeLinecap="round" opacity="0.18" strokeWidth="1.5">
        <path d="M40 240h60M150 252h80M500 244h70M560 270h50M90 280h90" />
      </g>

      {/* montaña lejana */}
      <path d="M0 214c40-18 80-30 120-26s70 18 110 26z" fill="#3d4c52" opacity="0.8" />

      {/* playa */}
      <path d="M0 300c120-30 260-34 400-14s180 40 240 44v30H0z" fill="url(#sand)" />
      <path d="M0 300c120-30 260-34 400-14s180 40 240 44" fill="none" stroke="#f8f6f2" strokeWidth="3" opacity="0.6" />

      {/* palmas */}
      <g fill="#1c2529">
        <path d="M112 330c4-60 14-118 36-168l6 3c-20 50-28 106-30 166z" />
        <path d="M150 162c-30-14-66-12-92 6 30-6 62-2 92 4zM150 162c-10-30-36-48-66-52 26 12 48 30 66 52zM152 160c14-28 42-42 72-40-28 8-52 22-72 40zM152 162c32-6 64 4 86 26-28-14-58-20-86-26zM150 164c-22 16-36 40-38 68 8-26 22-48 38-68z" />
        <path d="M548 336c-2-50-12-96-34-136l5-3c22 40 34 86 36 138z" />
        <path d="M516 200c26-14 56-12 78 4-26-6-52-4-78-4zM516 200c8-26 30-42 56-46-22 10-40 26-56 46zM514 200c-12-24-36-36-62-34 24 6 44 18 62 34zM514 202c-28-4-54 6-72 26 24-12 48-18 72-26z" />
      </g>
    </svg>
  );
}
