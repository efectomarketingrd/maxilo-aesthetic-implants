"use client";

import { useEffect, useId, useState } from "react";

// Sección desplegable para las páginas de tratamiento: en el móvil se muestra como una barra
// que se toca para abrir (menos desplazamiento); en escritorio (≥ 900 px) siempre está abierta.
// El contenido está siempre en el HTML (bueno para Google). Al abrir se vuelve a montar,
// para que sus animaciones de entrada se vean.
export default function Fold({ title, hint, white = false, className = "", after, children }: { title: string; hint?: string; white?: boolean; className?: string; after?: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  useEffect(() => {
    if (window.matchMedia("(min-width: 900px)").matches) setOpen(true);
  }, []);
  return (
    <section className={`sv-sec fold${white ? " sv-sec--white" : ""}${open ? " is-open" : ""} ${className}`}>
      <div className="container sv-wrap">
        <h2 className="loc-h2 fold__h">
          <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
            <span className="fold__t">{title}</span>
            {hint && <small className="fold__hint">{hint}</small>}
            <span className="fold__chev" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
        </h2>
        <div id={id} className="fold__panel">
          <div className="fold__in" key={open ? "o" : "c"}>
            {children}
          </div>
        </div>
        {after /* siempre visible, también con la sección cerrada (p. ej. avisos de urgencias) */}
      </div>
    </section>
  );
}
