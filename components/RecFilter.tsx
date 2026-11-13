"use client";

import { Children, useState } from "react";

// Filtros por objetivo de los planes recomendados: oculta las tarjetas que no corresponden.
export default function RecFilter({ filters, tags, children }: { filters: { id: string; label: string }[]; tags: string[][]; children: React.ReactNode }) {
  const [on, setOn] = useState("todos");
  const cards = Children.toArray(children);
  const count = (id: string) => (id === "todos" ? tags.length : tags.filter((t) => t.includes(id)).length);
  return (
    <>
      <div className="rc-filters" role="group">
        {filters
          .filter((f) => count(f.id) > 0)
          .map((f) => (
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
