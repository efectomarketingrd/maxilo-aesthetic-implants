"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import { agenda, rd, usd } from "@/lib/agenda";
import { waLink, type Locale } from "@/lib/site";
import PlanFace, { type PlanKind } from "./PlanFace";
import { WaIcon } from "./Icons";

type Plan = { id: PlanKind; zones: number[] }[];

// Zonas marcadas al añadir cada tratamiento (el paciente las cambia)
const DEFAULTS: Record<PlanKind, number[]> = { botox: [0, 1, 2], filler: [3], lift: [0, 1], bio: [0] };

// Precio de cada tratamiento según las zonas marcadas
export function planPrice(id: PlanKind, zones: number[]) {
  switch (id) {
    case "botox":
      return agenda.botoxPrice;
    case "filler":
      return zones.length * (zones.length > 1 ? agenda.fillerPriceMulti : agenda.fillerPrice);
    case "lift":
      return agenda.threadLiftPrice;
    case "bio":
      return agenda.threadBioPrice;
  }
}

const fromPrice: Record<PlanKind, number> = {
  botox: agenda.botoxPrice,
  filler: agenda.fillerPriceMulti,
  lift: agenda.threadLiftPrice,
  bio: agenda.threadBioPrice,
};

export default function PlanBuilder({ t, lang }: { t: Dict; lang: Locale }) {
  const b = t.plan.b;
  const items = b.items as { id: PlanKind; slug: string; name: string; info: string; note: string; zones: string[] }[];
  const [plan, setPlan] = useState<Plan>([]);
  const [f, setF] = useState({ name: "", phone: "" });
  const [nudge, setNudge] = useState(false);
  const [sent, setSent] = useState(false);
  const [sumVisible, setSumVisible] = useState(false);
  const sumRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  // ?add=botox (desde la página del tratamiento)
  useEffect(() => {
    const add = new URLSearchParams(window.location.search).get("add") as PlanKind | null;
    if (add && add in DEFAULTS) setPlan([{ id: add, zones: DEFAULTS[add] }]);
  }, []);

  // la barra del total (móvil) se oculta cuando el resumen ya está en pantalla
  useEffect(() => {
    const el = sumRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSumVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const has = (id: PlanKind) => plan.some((p) => p.id === id);
  const toggleItem = (id: PlanKind) => {
    if (has(id)) setPlan(plan.filter((p) => p.id !== id));
    else {
      setPlan([...plan, { id, zones: DEFAULTS[id] }]);
      setTimeout(() => document.getElementById(`plan-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };
  const toggleZone = (id: PlanKind, z: number) =>
    setPlan(
      plan.map((p) => {
        if (p.id !== id) return p;
        const zones = p.zones.includes(z) ? p.zones.filter((x) => x !== z) : [...p.zones, z].sort((a, c) => a - c);
        return { ...p, zones: zones.length ? zones : p.zones }; // siempre queda al menos una zona
      }),
    );

  const lines = plan.map((p) => {
    const it = items.find((i) => i.id === p.id)!;
    return { ...p, it, price: planPrice(p.id, p.zones), zoneNames: p.zones.map((z) => it.zones[z]) };
  });
  const total = lines.reduce((s, l) => s + l.price, 0);
  const valid = plan.length > 0 && f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 7;

  function message() {
    return [
      b.msgTitle,
      "",
      b.msgIntro,
      ...lines.map((l) => `• ${l.it.name} — ${rd(l.price)}\n   ${b.zones}: ${l.zoneNames.join(", ")}`),
      "",
      `${b.total}: ${rd(total)} (≈ ${usd(total)})`,
      b.estimateNote,
      "",
      `${b.name}: ${f.name.trim()}`,
      `${b.phone}: ${f.phone.trim()}`,
    ].join("\n");
  }

  function send() {
    if (!valid) {
      setNudge(true);
      return;
    }
    window.open(waLink(message()), "_blank", "noopener");
    setSent(true);
  }

  return (
    <div className="pb">
      {/* 1. Elegir tratamientos */}
      <section className="pb-sec">
        <h2 className="pb-h">
          <span>1</span>
          {b.step1}
        </h2>
        <div className="pb-pick">
          {items.map((it) => {
            const on = has(it.id);
            return (
              <button key={it.id} type="button" className={`pb-opt${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => toggleItem(it.id)}>
                <strong>{it.name}</strong>
                <small>
                  {b.from} {rd(fromPrice[it.id])}
                </small>
                <span className="pb-opt__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    {on ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M12 5v14M5 12h14" />}
                  </svg>
                </span>
                <span className="pb-opt__state">{on ? b.added : b.add}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="pb-grid">
        {/* 2. Su plan */}
        <section className="pb-sec" ref={planRef}>
          <h2 className="pb-h">
            <span>2</span>
            {b.step2}
          </h2>
          {lines.length === 0 && <p className="pb-empty">{b.empty}</p>}
          <div className="pb-cards">
            {lines.map((l) => (
              <article key={l.id} id={`plan-${l.id}`} className="pb-card">
                <header className="pb-card__head">
                  <div>
                    <h3>{l.it.name}</h3>
                    <p>{l.it.info}</p>
                  </div>
                  <button type="button" className="pb-x" onClick={() => toggleItem(l.id)} aria-label={`${b.remove}: ${l.it.name}`}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </header>
                <div className="pb-card__body">
                  <div className="pb-face">
                    <PlanFace kind={l.id} on={l.zones} label={`${l.it.name}: ${l.zoneNames.join(", ")}`} />
                  </div>
                  <div className="pb-zones">
                    <p className="pb-zones__q">{b.zonesQ}</p>
                    <div className="pb-chips">
                      {l.it.zones.map((z, k) => {
                        const on = l.zones.includes(k);
                        return (
                          <button key={z} type="button" className={`pb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => toggleZone(l.id, k)}>
                            <span aria-hidden="true">{k + 1}</span>
                            {z}
                          </button>
                        );
                      })}
                    </div>
                    <p className="pb-note">{l.it.note}</p>
                  </div>
                </div>
                <footer className="pb-card__foot">
                  <Link href={`/${lang}/servicios/medicina-estetica/${l.it.slug}`}>{l.it.name} →</Link>
                  <strong key={l.price} className="pb-price">
                    {rd(l.price)}
                  </strong>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* Resumen */}
        <aside className="pb-sum" ref={sumRef} id="resumen">
          <h2>{b.summary}</h2>
          {lines.length === 0 ? (
            <p className="pb-sum__empty">{b.empty}</p>
          ) : (
            <ul>
              {lines.map((l) => (
                <li key={l.id}>
                  <span>
                    {l.it.name}
                    <small>{l.zoneNames.join(" · ")}</small>
                  </span>
                  <strong>{rd(l.price)}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className="pb-sum__total">
            <span>{b.total}</span>
            <strong key={total}>{rd(total)}</strong>
            {total > 0 && <small>≈ {usd(total)}</small>}
          </div>
          <p className="pb-sum__note">{b.estimateNote}</p>
          <p className="pb-sum__note">{b.consultNote}</p>

          <label className="urg-field pb-field">
            <span>{b.name} *</span>
            <input autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          </label>
          <label className="urg-field pb-field">
            <span>{b.phone} *</span>
            <input type="tel" autoComplete="tel" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
          </label>
          {nudge && !valid && <p className="pb-need">{b.need}</p>}
          <button type="button" className="btn btn--wa pb-send" onClick={send}>
            <WaIcon /> {b.send}
          </button>
          {sent && <p className="pb-sent">{b.sent}</p>}
          <Link className="pb-book" href={`/${lang}/agendar?s=medicina-estetica`}>
            {b.book} →
          </Link>
        </aside>
      </div>

      {/* Total flotante en el móvil */}
      {lines.length > 0 && !sumVisible && (
        <a className="pb-bar" href="#resumen">
          <strong key={total}>{rd(total)}</strong>
          <em>{b.see}</em>
        </a>
      )}
    </div>
  );
}
