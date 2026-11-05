"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Dict } from "@/lib/content";
import { waLink, type Locale } from "@/lib/site";

// Buscador de tratamientos: filtra los procedimientos y lleva a la página del servicio.
export default function TreatmentFinder({ t, lang }: { t: Dict; lang: Locale }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      t.services.items.flatMap((s) => [
        { label: s.title, sub: t.services.eyebrow, href: `/${lang}/servicios/${s.slug}` },
        ...s.procedures.map((p) => ({ label: p.name, sub: s.title, href: `/${lang}/servicios/${s.slug}` })),
      ]),
    [t, lang],
  );

  const norm = (x: string) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const results = q.trim() ? items.filter((i) => norm(i.label).includes(norm(q.trim()))).slice(0, 6) : [];

  return (
    <div className="finder">
      <div className="finder__bar">
        <label className="finder__field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder={t.home.search}
            aria-label={t.home.search}
          />
        </label>
        <Link className="finder__btn" href={`/${lang}/agendar`} aria-label={t.nav.cta}>
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <rect x="7" y="10" width="34" height="31" rx="4" />
            <path d="M7 19h34M16 6v8M32 6v8" />
          </svg>
        </Link>
      </div>
      {open && q.trim() && (
        <ul className="finder__list" role="listbox">
          {results.length ? (
            results.map((r) => (
              <li key={r.label + r.sub}>
                <Link href={r.href}>
                  <strong>{r.label}</strong>
                  <span>{r.sub}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="finder__empty">
              <a href={waLink(`${t.hero.waMsg} (${q})`)} target="_blank" rel="noopener">
                {t.home.searchEmpty}
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
