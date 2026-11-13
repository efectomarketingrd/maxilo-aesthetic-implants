"use client";

import { Children, useEffect, useRef, useState } from "react";

// Filtros por objetivo de los planes recomendados.
// Móvil: desplegable que baja con todas las opciones. Escritorio: botones en fila.
export default function RecFilter({ label, filters, tags, children }: { label: string; filters: { id: string; label: string }[]; tags: string[][]; children: React.ReactNode }) {
  const [on, setOn] = useState("todos");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);
  const count = (id: string) => (id === "todos" ? tags.length : tags.filter((t) => t.includes(id)).length);
  const list = filters.filter((f) => count(f.id) > 0);
  const current = list.find((f) => f.id === on) ?? list[0];

  // cerrar al tocar fuera o con Escape
  useEffect(() => {
    if (!open) return;
    const out = (e: Event) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", out);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const pick = (id: string) => {
    setOn(id);
    setOpen(false);
  };

  return (
    <>
      {/* Móvil */}
      <div className={`rc-drop${open ? " is-open" : ""}`} ref={box}>
        <button type="button" className="rc-drop__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="rc-drop__lbl">{label}</span>
          <strong>{current.label}</strong>
          <span className="rc-drop__n">{count(current.id)}</span>
          <svg className="rc-drop__chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <ul className="rc-drop__list" role="listbox" aria-label={label} hidden={!open}>
          {list.map((f, k) => (
            <li key={f.id} role="option" aria-selected={on === f.id} style={{ "--k": k } as React.CSSProperties}>
              <button type="button" className={on === f.id ? "is-on" : ""} onClick={() => pick(f.id)}>
                <span className="rc-drop__check" aria-hidden="true">
                  {on === f.id && (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  )}
                </span>
                {f.label}
                <span className="rc-drop__n">{count(f.id)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Escritorio */}
      <div className="rc-filters" role="group" aria-label={label}>
        {list.map((f) => (
          <button key={f.id} type="button" aria-pressed={on === f.id} className={`pb-tab${on === f.id ? " is-on" : ""}`} onClick={() => setOn(f.id)}>
            {f.label}
            <span>{count(f.id)}</span>
          </button>
        ))}
      </div>

      <div className="rc-grid">
        {cards.map((c, k) => (
          <div key={k} className="rc-slot" hidden={on !== "todos" && !tags[k]?.includes(on)}>
            {c}
          </div>
        ))}
      </div>
    </>
  );
}
