"use client";

import { useEffect, useRef, useState } from "react";

type Tab = { id: string; label: string; icon: React.ReactNode; panel: React.ReactNode };

// Pestañas de la página de marcas: implantes, medicina estética y cuidado de la piel.
// Se puede entrar directo a una pestaña con #implantes, #estetica o #piel.
export default function BrandTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.id}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  function pick(i: number) {
    if (i === active) return;
    setActive(i);
    history.replaceState(null, "", `#${tabs[i].id}`);
    const el = bar.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="br-tabs">
      <div className="br-tabs__bar" ref={bar}>
        <div className="container br-wrap">
          <div className="br-tabs__list" role="tablist" aria-label={label} style={{ "--pos": active, "--n": tabs.length } as React.CSSProperties}>
            <span className="br-tabs__pill" aria-hidden="true" />
            {tabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                className={i === active ? "is-on" : ""}
                onClick={() => pick(i)}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div key={tabs[active].id} id={`panel-${tabs[active].id}`} role="tabpanel" aria-labelledby={`tab-${tabs[active].id}`} className="br-tabs__panel">
        {tabs[active].panel}
      </div>
    </div>
  );
}
