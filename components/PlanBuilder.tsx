"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import { rd, usd } from "@/lib/agenda";
import { waLink, type Locale } from "@/lib/site";
import PlanFace from "./PlanFace";
import PlanTeeth from "./PlanTeeth";
import { PLAN, planPrice, type PlanKind } from "@/lib/plan";
import { WaIcon } from "./Icons";

type Plan = { id: PlanKind; zones: number[] }[];

type Item = { id: PlanKind; slug: string; service: string; name: string; info: string; tag: string; note: string; zones: string[]; pick?: string };

export default function PlanBuilder({ t, lang }: { t: Dict; lang: Locale }) {
  const b = t.plan.b;
  const items = b.items as Item[];
  const services = t.services.items;
  const [tab, setTab] = useState<string>(services[0].slug);
  const [plan, setPlan] = useState<Plan>([]);
  const [f, setF] = useState({ name: "", phone: "" });
  const [nudge, setNudge] = useState(false);
  const [sent, setSent] = useState(false);
  const [sumVisible, setSumVisible] = useState(false);
  const sumRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  // ?add=botox (desde la página del tratamiento)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const add = q.get("add") as PlanKind | null;
    const rec = (t.plan.rec.plans as { id: string; items: Plan }[]).find((r) => r.id === q.get("plan"));
    if (rec) setPlan(rec.items.map((i) => ({ ...i, zones: [...i.zones] })));
    else if (add && add in PLAN) {
      setPlan([{ id: add, zones: PLAN[add].defaults }]);
      const it = items.find((i) => i.id === add);
      if (it) setTab(it.service);
    }
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
      setPlan([...plan, { id, zones: PLAN[id].defaults }]);
      setTimeout(() => document.getElementById(`plan-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };
  const toggleZone = (id: PlanKind, z: number) =>
    setPlan(
      plan.map((p) => {
        if (p.id !== id) return p;
        if (PLAN[id].mode === "single") return { ...p, zones: [z] };
        const zones = p.zones.includes(z) ? p.zones.filter((x) => x !== z) : [...p.zones, z].sort((a, c) => a - c);
        return { ...p, zones: zones.length ? zones : p.zones }; // siempre queda al menos una zona
      }),
    );

  const lines = plan.map((p) => {
    const it = items.find((i) => i.id === p.id)!;
    const mode = PLAN[p.id].mode;
    return { ...p, it, mode, price: planPrice(p.id, p.zones), zoneNames: mode === "none" ? [] : p.zones.map((z) => it.zones[z]) };
  });
  const total = lines.reduce((s, l) => s + (l.price ?? 0), 0);
  const pending = lines.filter((l) => l.price === null).length;
  const money = (n: number | null) => (n === null ? b.tbc : rd(n));
  const valid = plan.length > 0 && f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 7;

  function message() {
    return [
      b.msgTitle,
      "",
      b.msgIntro,
      ...lines.map((l) => `• ${l.it.name} — ${money(l.price)}${l.zoneNames.length ? `\n   ${l.mode === "multi" ? `${b.zones}: ` : ""}${l.zoneNames.join(", ")}` : ""}`),
      "",
      `${b.total}: ${total ? `${rd(total)} (≈ ${usd(total)})` : b.tbc}${pending && total ? ` + ${pending} ${b.tbcNote}` : ""}`,
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
        <div className="pb-tabs" role="tablist">
          {services.map((sv) => {
            const n = plan.filter((p) => items.find((i) => i.id === p.id)?.service === sv.slug).length;
            return (
              <button key={sv.slug} type="button" role="tab" aria-selected={tab === sv.slug} className={`pb-tab${tab === sv.slug ? " is-on" : ""}`} onClick={() => setTab(sv.slug)}>
                {sv.title}
                {n > 0 && <span>{n}</span>}
              </button>
            );
          })}
        </div>
        <div className="pb-pick" key={tab}>
          {items
            .filter((it) => it.service === tab)
            .map((it, k) => {
              const on = has(it.id);
              return (
                <button key={it.id} type="button" className={`pb-opt${on ? " is-on" : ""}`} style={{ "--k": k } as React.CSSProperties} aria-pressed={on} onClick={() => toggleItem(it.id)}>
                  <strong>{it.name}</strong>
                  <small>{it.tag}</small>
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
                <div className={`pb-card__body${l.mode === "none" ? " pb-card__body--solo" : ""}`}>
                  <div className="pb-face">
                    {PLAN[l.id].visual === "teeth" ? (
                      <PlanTeeth kind={l.id} on={l.zones} quiet={l.mode !== "multi"} sides={b.sides as [string, string]} label={`${l.it.name}: ${l.zoneNames.join(", ")}`} />
                    ) : (
                      <PlanFace layers={[{ kind: l.id, on: l.zones }]} quiet={l.mode !== "multi"} label={`${l.it.name}${l.zoneNames.length ? `: ${l.zoneNames.join(", ")}` : ""}`} />
                    )}
                  </div>
                  <div className="pb-zones">
                    {l.mode !== "none" && (
                      <>
                        <p className="pb-zones__q">{l.it.pick ?? (l.mode === "single" ? b.chooseOne : b.zonesQ)}</p>
                        <div className={`pb-chips${l.mode === "single" ? " pb-chips--single" : ""}`}>
                          {l.it.zones.map((z, k) => {
                            const on = l.zones.includes(k);
                            return (
                              <button key={z} type="button" className={`pb-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => toggleZone(l.id, k)}>
                                <span aria-hidden="true">{l.mode === "multi" ? k + 1 : on ? "✓" : ""}</span>
                                {z}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                    <p className="pb-note">
                      {l.it.note}
                      {l.id === "fracture" && (
                        <>
                          {" "}
                          <Link href={`/${lang}/urgencias`}>{b.urgent} →</Link>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <footer className="pb-card__foot">
                  <Link href={`/${lang}/servicios/${l.it.service}/${l.it.slug}`}>{l.it.name} →</Link>
                  <strong key={l.price ?? "tbc"} className={`pb-price${l.price === null ? " pb-price--tbc" : ""}`}>
                    {money(l.price)}
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
                    {l.zoneNames.length > 0 && <small>{l.zoneNames.join(" · ")}</small>}
                  </span>
                  <strong className={l.price === null ? "is-tbc" : ""}>{money(l.price)}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className="pb-sum__total">
            <span>{b.total}</span>
            <strong key={total}>{total || !pending ? rd(total) : b.tbc}</strong>
            {total > 0 && <small>≈ {usd(total)}</small>}
          </div>
          {pending > 0 && total > 0 && (
            <p className="pb-sum__tbc">
              + {pending} {b.tbcNote}
            </p>
          )}
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
          <Link className="pb-book" href={`/${lang}/agendar`}>
            {b.book} →
          </Link>
        </aside>
      </div>

      {/* Total flotante en el móvil */}
      {lines.length > 0 && !sumVisible && (
        <a className="pb-bar" href="#resumen">
          <strong key={total}>{total || !pending ? rd(total) : b.tbc}</strong>
          <em>{b.see}</em>
        </a>
      )}
    </div>
  );
}
