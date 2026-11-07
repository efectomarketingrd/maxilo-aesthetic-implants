"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { bookingImg } from "@/lib/images";
import type { Dict } from "@/lib/content";
import { agenda, formatTime, isOpenDay, rd, slotsFor, toKey, usd, type SlotType } from "@/lib/agenda";
import { site, waLink, type Locale } from "@/lib/site";
import { Arrow, Chevron, Lock, Mail, WaIcon } from "./Icons";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

type Step = 0 | 1 | 2 | 3;

// Horas que se ofrecen cuando el paciente pide otro día u horario:
// de 3:00 a 5:00 p. m., cada media hora
const halfHours = (from: number, to: number) =>
  Array.from({ length: (to - from) * 2 + 1 }, (_, i) => {
    const m = from * 60 + i * 30;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${m % 60 ? "30" : "00"}`;
  });
const SPECIAL_HOURS = halfHours(15, 17).filter(
  (h) => !agenda.slots.some((s) => !s.alt && s.time === h), // nunca dentro del horario normal
);

// Botón para copiar un dato al portapapeles
function CopyBtn({ text, label, done }: { text: string; label: string; done: string }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setOk(true);
    setTimeout(() => setOk(false), 1800);
  }
  return (
    <button type="button" className={`bk2-copy ${ok ? "is-ok" : ""}`} onClick={copy} aria-live="polite">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {ok ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></>}
      </svg>
      {ok ? done : label}
    </button>
  );
}

// Monto en pesos con su equivalente aproximado en dólares debajo
function Amt({ n, plus }: { n: number; plus?: boolean }) {
  return (
    <span className="amt">
      {plus ? "+ " : ""}
      {rd(n)}
      <small>≈ {usd(n)}</small>
    </span>
  );
}

// Interruptor de dos opciones con píldora que se desliza
function Seg<T extends string>({
  label,
  options,
  value,
  onChange,
  names,
  locked,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  names: Record<T, string>;
  locked?: T[];
}) {
  const pos = options.indexOf(value);
  return (
    <div className="bk2-seg" role="radiogroup" aria-label={label} style={{ "--pos": pos } as React.CSSProperties}>
      <span className="bk2-seg__pill" aria-hidden="true" />
      {options.map((o) => (
        <button
          type="button"
          role="radio"
          aria-checked={value === o}
          key={o}
          className={value === o ? "is-on" : ""}
          disabled={locked?.includes(o)}
          onClick={() => onChange(o)}
        >
          {names[o]}
        </button>
      ))}
    </div>
  );
}

export default function BookingWizard({ t, lang }: { t: Dict; lang: Locale }) {
  const b = t.booking;
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.minDaysAhead), [today]);
  const maxDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.maxDaysAhead), [today]);

  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [reached, setReached] = useState<Step>(0);
  const [nudge, setNudge] = useState(0);

  const [service, setService] = useState<string | null>(null);
  const [subs, setSubs] = useState<string[]>([]);
  const [molars, setMolars] = useState<string | null>(null);
  const [cols, setCols] = useState(2);

  // Columnas de la cuadrícula de servicios (para abrir el panel justo debajo de la fila elegida)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 720px)");
    const set = () => setCols(mq.matches ? 3 : 2);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const [type, setType] = useState<SlotType>("consulta");
  const [mode, setMode] = useState<"presencial" | "online">("presencial");
  const effMode = type === "procedimiento" ? "presencial" : mode;
  const [cursor, setCursor] = useState(() => new Date(minDate.getFullYear(), minDate.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [special, setSpecial] = useState(false);
  const [specialTime, setSpecialTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "", notes: "" });

  const top = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Al cambiar de paso, llevar la vista al inicio de la agenda
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const locale = lang === "es" ? "es-DO" : "en-US";
  const monthLabel = cursor.toLocaleDateString(locale, { month: "long", year: "numeric" });

  // Calendario: semana empieza en lunes
  const cells = useMemo(() => {
    const f = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (f.getDay() + 6) % 7;
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (out.length % 7) out.push(null);
    return out;
  }, [cursor]);

  const inRange = (d: Date) => d >= minDate && d <= maxDate;
  const selectable = (d: Date) => {
    if (!inRange(d)) return false;
    if (agenda.closedDates.includes(toKey(d))) return false;
    return special ? true : isOpenDay(d);
  };

  const canPrev = new Date(cursor.getFullYear(), cursor.getMonth(), 0) >= minDate;
  const canNext = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1) <= maxDate;

  const daySlots = date && !special ? slotsFor(date).filter((s) => s.type === type) : [];
  const weekHeads = [1, 2, 3, 4, 5, 6, 0].map((i) => b.days[i]);

  const svcName = b.services.find((s) => s.id === service)?.name ?? "";

  // Opciones dentro de cada servicio (tomadas de las páginas de servicios)
  const procs = (slug: string) => t.services.items.find((x) => x.slug === slug)?.procedures.map((p) => p.name) ?? [];
  const subOptions: Record<string, string[]> = {
    implantes: b.implantNeeds,
    paquete: b.implantNeeds,
    "cirugia-oral": procs("implantes-cirugia-oral").slice(1),
    "estetica-facial": procs("cirugia-estetica-facial"),
    "medicina-estetica": procs("medicina-estetica"),
    reconstructiva: procs("cirugia-reconstructiva"),
  };
  const subList = service ? [...(subOptions[service] ?? []), b.unsure] : [];
  // Extracción de cordales: el paciente indica cuántas
  const molarOpt = procs("implantes-cirugia-oral")[1] ?? "";
  const needMolars = service === "cirugia-oral" && subs.includes(molarOpt);
  const molarText = molars ? (molars === "?" ? b.molarsTbd : `${molars} ${molars === "1" ? b.molarsOne : b.molarsMany}`) : "";
  const subsText = subs.map((x) => (x === molarOpt && molars ? `${x} (${molarText})` : x)).join(", ");
  const svcFull = subs.length ? `${svcName} — ${subsText}` : svcName;

  function toggleSub(o: string) {
    setSubs((cur) => {
      if (o === b.unsure) return cur.includes(o) ? [] : [o];
      const rest = cur.filter((x) => x !== b.unsure);
      return rest.includes(o) ? rest.filter((x) => x !== o) : [...rest, o];
    });
  }

  function pickService(id: string) {
    if (id === service) return;
    setService(id);
    setSubs([]);
    setMolars(null);
  }
  const dateLabel = date ? date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const timeLabel = special ? (specialTime ? formatTime(specialTime, lang) : "") : time ? formatTime(time, lang) : "";
  const slotInfo = !special && time ? agenda.slots.find((s) => s.time === time && s.type === type) : undefined;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
  const filled = (Object.keys(form) as (keyof typeof form)[]).every((k) => form[k].trim());
  const okStep = [Boolean(service && subs.length && (!needMolars || molars)), Boolean(date && timeLabel), filled && emailOk, true];

  // Costo estimado
  const isProc = type === "procedimiento";
  const base = isProc ? 0 : agenda.prices[effMode];
  // Cordales: RD$10,000 c/u; las 4 a RD$8,000 c/u
  const molarN = needMolars && molars && molars !== "?" ? Number(molars) : 0;
  const molarUnit = molarN === 4 ? agenda.molarPriceAll4 : agenda.molarPrice;
  const molarCost = molarN * molarUnit;
  const otherProcs = subs.some((x) => x !== molarOpt && x !== b.unsure);
  const procTbd = isProc && (!molarN || otherProcs || subs.includes(b.unsure));
  const total = isProc ? molarCost : base;
  const money = (n: number) => `${rd(n)} (≈ ${usd(n)})`;
  const costLine = isProc
    ? molarN
      ? `${money(total)}${procTbd ? ` ${b.cost.plusTbd}` : ""}`
      : b.cost.toConfirm
    : money(total);
  const valid = okStep[0] && okStep[1] && okStep[2];

  function go(n: Step) {
    if (n === step) return;
    setDir(n > step ? "fwd" : "back");
    setStep(n);
    setNudge(0);
    if (n > reached) setReached(n);
  }

  function next() {
    if (!okStep[step]) {
      setNudge((k) => k + 1);
      return;
    }
    if (step < 3) go((step + 1) as Step);
  }

  function message() {
    const lines = [
      b.msgTitle,
      "",
      `${b.service}: ${svcFull}`,
      `${b.type}: ${b.types[type]}`,
      `${b.mode}: ${b.modes[effMode]}`,
      `${b.date}: ${dateLabel}`,
      `${b.time}: ${timeLabel}${slotInfo?.alt ? ` (${b.alt})` : ""}`,
      special ? b.msgSpecial : "",
      `${b.cost.msg}: ${costLine}`,
      "",
      `${b.name}: ${form.name.trim()}`,
      `${b.phone}: ${form.phone.trim()}`,
      form.email.trim() ? `${b.email}: ${form.email.trim()}` : "",
      form.country.trim() ? `${b.country}: ${form.country.trim()}` : "",
      form.notes.trim() ? `${b.notes}: ${form.notes.trim()}` : "",
    ];
    return lines.filter((l, i) => l !== "" || (i > 0 && lines[i - 1] !== "")).join("\n").trim();
  }

  function sendWa() {
    if (!valid) return;
    window.open(waLink(message()), "_blank", "noopener");
  }

  function sendMail() {
    if (!valid) return;
    const subject = `${b.mailSubject} — ${svcName} — ${date ? toKey(date) : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
  }

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const titles = [b.step1, b.step2, b.step3, b.step4];

  return (
    <div className="bk2" ref={top} id="reservar">
      {/* Barra de progreso */}
      <ol className="bk2-prog" style={{ "--p": step / 3 } as React.CSSProperties}>
        <span className="bk2-prog__track" aria-hidden="true">
          <span className="bk2-prog__fill" />
        </span>
        {b.stepNames.map((n, i) => {
          const state = i === step ? "is-now" : i < step || i <= reached ? "is-done" : "";
          const canJump = i <= reached && i !== step;
          return (
            <li key={n} className={state}>
              <button type="button" disabled={!canJump} onClick={() => go(i as Step)} aria-current={i === step ? "step" : undefined}>
                <span className="bk2-prog__dot">
                  <span className="bk2-prog__num">{i + 1}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                  </svg>
                </span>
                <span className="bk2-prog__name">{n}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="bk2-card">
        <div key={step} className={`bk2-panel bk2-panel--${dir}`}>
          <p className="bk2-kicker">{b.stepOf.replace("{n}", String(step + 1))}</p>
          <h2 className="bk2-title">{titles[step]}</h2>

          {/* PASO 1 · SERVICIO */}
          {step === 0 && (
            <>
              <p className="bk2-help">{b.step1Text}</p>
              <div className="bk2-svc" role="radiogroup" aria-label={b.step1}>
                {b.services.map((s, i) => {
                  const on = service === s.id;
                  const tile = (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={on}
                      key={s.id}
                      className={`bk2-svc__item ${on ? "is-on" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                      onClick={() => pickService(s.id)}
                    >
                      <span className="bk2-svc__img">
                        <Image src={bookingImg[s.id]} alt="" fill sizes="(min-width: 900px) 260px, 45vw" />
                      </span>
                      <span className="bk2-svc__name">{s.name}</span>
                      <span className="bk2-svc__tick" aria-hidden="true">
                        <svg viewBox="0 0 20 20">
                          <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                        </svg>
                      </span>
                    </button>
                  );
                  const sel = b.services.findIndex((x) => x.id === service);
                  const after = sel < 0 ? -1 : Math.min(b.services.length - 1, Math.floor(sel / cols) * cols + cols - 1);
                  return (
                    <Fragment key={s.id}>
                      {tile}
                      {i === after && (
                        <div className="bk2-sub" key={`sub-${service}`} style={{ "--col": sel % cols, "--cols": cols } as React.CSSProperties}>
                          <span className="bk2-sub__caret" aria-hidden="true" />
                          <p className="bk2-sub__title">
                            {b.subTitle} <span>{b.subHint}</span>
                          </p>
                          <div className="bk2-sub__chips" role="group" aria-label={b.subTitle}>
                            {subList.map((o, k) => {
                              const on = subs.includes(o);
                              return (
                                <button
                                  type="button"
                                  key={o}
                                  aria-pressed={on}
                                  className={`bk2-chip ${on ? "is-on" : ""} ${o === b.unsure ? "bk2-chip--unsure" : ""}`}
                                  style={{ "--k": k } as React.CSSProperties}
                                  onClick={() => toggleSub(o)}
                                >
                                  <span className="bk2-chip__box" aria-hidden="true">
                                    <svg viewBox="0 0 20 20">
                                      <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                                    </svg>
                                  </span>
                                  {o}
                                </button>
                              );
                            })}
                          </div>
                          {needMolars && (
                            <div className="bk2-molars">
                              <p>{b.molarsQ}</p>
                              <div role="radiogroup" aria-label={b.molarsQ}>
                                {["1", "2", "3", "4", "?"].map((n, k) => (
                                  <button
                                    type="button"
                                    role="radio"
                                    aria-checked={molars === n}
                                    key={n}
                                    className={`${molars === n ? "is-on" : ""} ${n === "?" ? "is-wide" : ""}`}
                                    style={{ "--k": k } as React.CSSProperties}
                                    onClick={() => setMolars(n)}
                                  >
                                    {n === "?" ? b.molarsUnsure : n}
                                  </button>
                                ))}
                              </div>
                              <p className="bk2-molars__price">
                                {rd(agenda.molarPrice)} {b.molarsPer} · {b.molarsAll4} {rd(agenda.molarPriceAll4)} {b.molarsEach}
                              </p>
                              {type === "consulta" && (
                                <div className="bk2-tip" role="note">
                                  <p>{b.procTip}</p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setType("procedimiento");
                                      setTime(null);
                                    }}
                                  >
                                    {b.procTipBtn} <Arrow size={13} />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>

              <div className="bk2-opts">
                <div>
                  <p className="bk2-label">{b.typeLabel}</p>
                  <Seg
                    label={b.typeLabel}
                    options={["consulta", "procedimiento"] as const}
                    value={type}
                    names={b.types}
                    onChange={(v) => {
                      setType(v);
                      setTime(null);
                    }}
                  />
                  <p className="bk2-help bk2-help--sm" key={type}>{b.typeHelp[type]}</p>
                </div>
                <div>
                  <p className="bk2-label">{b.modeLabel}</p>
                  <Seg
                    label={b.modeLabel}
                    options={["presencial", "online"] as const}
                    value={effMode}
                    names={b.modes}
                    locked={type === "procedimiento" ? ["online"] : []}
                    onChange={setMode}
                  />
                  <p className="bk2-help bk2-help--sm" key={effMode + type}>
                    {type === "procedimiento" ? b.modeOnlyPresencial : b.modeHelp[effMode]}
                  </p>
                  <p className="bk2-price" key={`p-${effMode}-${type}`}>
                    <span>{isProc ? b.cost.proc : b.cost.consult[effMode]}</span>
                    <strong>{isProc ? b.cost.toConfirm : money(base)}</strong>
                  </p>
                </div>
              </div>

              <div className="bk2-note">
                <svg className="bk2-note__ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v5h5M10 13h6M10 17h4" />
                </svg>
                <span>{b.note}</span>
              </div>
            </>
          )}

          {/* PASO 2 · DÍA Y HORA */}
          {step === 1 && (
            <div className="bk2-when">
              <div className="cal bk2-cal">
                <div className="cal__head">
                  <span className="cal__month">{monthLabel}</span>
                  <div>
                    <button type="button" aria-label="‹" disabled={!canPrev} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
                      <Chevron dir="left" />
                    </button>
                    <button type="button" aria-label="›" disabled={!canNext} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
                      <Chevron />
                    </button>
                  </div>
                </div>
                <div className="cal__grid" key={toKey(cursor)}>
                  {weekHeads.map((d) => (
                    <span className="cal__dow" key={d}>{d}</span>
                  ))}
                  {cells.map((d, i) =>
                    d ? (
                      <button
                        type="button"
                        key={i}
                        disabled={!selectable(d)}
                        style={{ "--c": i } as React.CSSProperties}
                        className={`cal__day ${date && toKey(d) === toKey(date) ? "is-on" : ""} ${selectable(d) ? "is-open" : ""}`}
                        onClick={() => {
                          setDate(d);
                          setTime(null);
                        }}
                        aria-label={d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
                      >
                        {d.getDate()}
                      </button>
                    ) : (
                      <span key={i} />
                    ),
                  )}
                </div>
                <div className="cal__legend">
                  <span><i className="dot dot--open" /> {b.legendOpen}</span>
                  <span><i className="dot dot--closed" /> {b.legendClosed}</span>
                </div>
              </div>

              <div className="bk2-times">
                {!date ? (
                  <p className="bk2-help bk2-times__empty">{b.pickDay}</p>
                ) : special ? (
                  <div className="bk2-in" key="special">
                    <p className="times__title">{b.specialTime}</p>
                    <div className="times__grid bk2-hours">
                      {SPECIAL_HOURS.map((h, i) => (
                        <button
                          type="button"
                          key={h}
                          style={{ "--i": i } as React.CSSProperties}
                          className={`time ${specialTime === h ? "is-on" : ""}`}
                          onClick={() => setSpecialTime(h)}
                          aria-pressed={specialTime === h}
                        >
                          {formatTime(h, lang)}
                        </button>
                      ))}
                    </div>
                    <p className="bk2-help bk2-help--sm">{b.specialNote}</p>
                  </div>
                ) : (
                  <div key={toKey(date)} className="bk2-in">
                    <p className="times__title">
                      {b.available} {date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    {daySlots.length ? (
                      <div className="times__grid">
                        {daySlots.map((s, i) => (
                          <button
                            type="button"
                            key={s.time}
                            style={{ "--i": i } as React.CSSProperties}
                            className={`time ${time === s.time ? "is-on" : ""} ${s.alt ? "time--alt" : ""}`}
                            onClick={() => setTime(s.time)}
                            aria-pressed={time === s.time}
                          >
                            {formatTime(s.time, lang)}
                            {(s.alt || s.oneSpot) && <small>{s.alt ? b.alt : b.oneSpot}</small>}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="bk2-help">{b.noSlots}</p>
                    )}
                  </div>
                )}

                <label className={`special bk2-special ${special ? "is-on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={special}
                    onChange={(e) => {
                      setSpecial(e.target.checked);
                      setTime(null);
                      if (!e.target.checked && date && !isOpenDay(date)) setDate(null);
                    }}
                  />
                  <span>
                    <strong>{b.special}</strong>
                    {b.specialWhy}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* PASO 3 · DATOS */}
          {step === 2 && (
            <div className="fields bk2-fields">
              {(
                [
                  { k: "name", label: b.name, auto: "name" },
                  { k: "phone", label: b.phone, auto: "tel", type: "tel" },
                  { k: "email", label: b.email, auto: "email", type: "email" },
                  { k: "country", label: b.country, auto: "country-name" },
                  { k: "notes", label: b.notes, area: true },
                ] as { k: keyof typeof form; label: string; auto?: string; type?: string; area?: boolean }[]
              ).map((f, i) => {
                const bad = nudge > 0 && (!form[f.k].trim() || (f.k === "email" && !emailOk));
                return (
                  <label key={f.k} className={`field ${f.area ? "field--full" : ""} ${bad ? "is-err" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                    <span>{f.label} *</span>
                    {f.area ? (
                      <textarea value={form[f.k]} onChange={upd(f.k)} rows={3} required />
                    ) : (
                      <input value={form[f.k]} onChange={upd(f.k)} type={f.type ?? "text"} inputMode={f.type === "tel" ? "tel" : undefined} autoComplete={f.auto} required />
                    )}
                    {bad && f.k === "email" && form.email.trim() && <small className="field__err">{b.badEmail}</small>}
                  </label>
                );
              })}
              <p className="bk2-secure" style={{ "--i": 5 } as React.CSSProperties}>
                <Lock /> {b.secure}
              </p>
            </div>
          )}

          {/* PASO 4 · CONFIRMAR */}
          {step === 3 && (
            <div className="bk2-done">
              <p className="bk2-help">{b.step4Text}</p>
              <div className="bk2-ticket">
                <span className="bk2-ticket__seal" aria-hidden="true">
                  <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="23" pathLength={1} />
                    <path d="M16 27l7 7 13-15" pathLength={1} />
                  </svg>
                </span>
                <dl>
                  {[
                    { k: b.service, v: svcFull, to: 0 as Step },
                    { k: b.type, v: `${b.types[type]} · ${b.modes[effMode]}`, to: 0 as Step },
                    { k: b.date, v: dateLabel, to: 1 as Step, cls: "summary__date" },
                    {
                      k: b.time,
                      v: `${timeLabel}${slotInfo?.alt ? ` · ${b.alt}` : ""}${special && timeLabel ? ` · ${b.alt}` : ""}`,
                      to: 1 as Step,
                    },
                    { k: b.name, v: `${form.name.trim()} · ${form.phone.trim()}`, to: 2 as Step },
                  ].map((r, i) => (
                    <div key={r.k} style={{ "--i": i } as React.CSSProperties}>
                      <dt>{r.k}</dt>
                      <dd className={r.cls}>{r.v}</dd>
                      <button type="button" className="bk2-edit" onClick={() => go(r.to)}>
                        {b.edit}
                      </button>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bk2-cost">
                <p className="bk2-cost__title">{b.cost.title}</p>
                <ul>
                  {!isProc && (
                    <li style={{ "--i": 0 } as React.CSSProperties}>
                      <span>{b.cost.consult[effMode]}</span>
                      <strong><Amt n={base} /></strong>
                    </li>
                  )}
                  {molarN > 0 && (
                    <li className={isProc ? "" : "is-ref"} style={{ "--i": 1 } as React.CSSProperties}>
                      <span>
                        {b.cost.molars}
                        <small>
                          {molarN} × {rd(molarUnit)}
                        </small>
                      </span>
                      <strong><Amt n={molarCost} /></strong>
                    </li>
                  )}
                  {procTbd && (
                    <li style={{ "--i": 2 } as React.CSSProperties}>
                      <span>{molarN ? b.cost.others : b.cost.proc}</span>
                      <strong>{b.cost.toConfirm}</strong>
                    </li>
                  )}
                </ul>
                <div className="bk2-cost__total">
                  <span>{b.cost.total}</span>
                  {isProc && !molarN ? (
                    <strong className="bk2-cost__tbd">{b.cost.toConfirm}</strong>
                  ) : (
                    <strong>
                      {rd(total)} <small>≈ {usd(total)}</small>
                      {procTbd && <em className="bk2-cost__plus">{b.cost.plusTbd}</em>}
                    </strong>
                  )}
                </div>
                {!isProc && molarN > 0 && <p className="bk2-cost__note">{b.cost.molarsRef}</p>}
                <p className="bk2-cost__note">{procTbd ? `${b.cost.procNote} ${b.cost.note}` : b.cost.note}</p>
                <div className="bk2-pay">
                  <p className="bk2-cost__title">{b.cost.payTitle}</p>
                  <ul>
                    {b.cost.pay.map((m, i) => (
                      <li key={m.k} className={m.k === "card" ? "is-minor" : ""} style={{ "--i": i } as React.CSSProperties}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          {m.k === "card" && (
                            <>
                              <rect x="3" y="6" width="18" height="13" rx="2.5" />
                              <path d="M3 10h18M7 15h4" />
                            </>
                          )}
                          {m.k === "bank" && <path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />}
                          {m.k === "cash" && (
                            <>
                              <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
                              <circle cx="12" cy="12" r="2.6" />
                              <path d="M6 9.5v5M18 9.5v5" />
                            </>
                          )}
                        </svg>
                        <span>
                          <strong>{m.name}</strong>
                          <small>{m.detail}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <details className="bk2-bank">
                  <summary>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
                    </svg>
                    {b.cost.bank.open}
                  </summary>
                  <div className="bk2-bank__body">
                    <p className="bk2-bank__when">{b.cost.bank.when}</p>
                    <dl>
                      <div>
                        <dt>{b.cost.bank.holder}</dt>
                        <dd>{site.bank.holder}</dd>
                        <CopyBtn text={site.bank.holder} label={b.cost.bank.copy} done={b.cost.bank.copied} />
                      </div>
                      <div>
                        <dt>{b.cost.bank.bank}</dt>
                        <dd>{site.bank.name}</dd>
                      </div>
                      {site.bank.accounts.map((a) => (
                        <div key={a.number}>
                          <dt>
                            {b.cost.bank.account} {b.cost.bank.cur[a.cur as "RD$" | "US$"]}
                          </dt>
                          <dd className="bk2-bank__num">{a.number}</dd>
                          <CopyBtn text={a.number} label={b.cost.bank.copy} done={b.cost.bank.copied} />
                        </div>
                      ))}
                    </dl>
                    <a className="bk2-bank__proof" href={waLink(b.cost.bank.proofMsg)} target="_blank" rel="noopener noreferrer">
                      <WaIcon size={16} /> {b.cost.bank.proof}
                    </a>
                    <p className="bk2-bank__abroad">{b.cost.bank.abroad}</p>
                    <div className="bk2-remit">
                      {site.remit.map((r) => (
                        <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
                          {r.name}
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 16L16 8M9.5 8H16v6.5" />
                          </svg>
                        </a>
                      ))}
                    </div>
                    <p className="bk2-bank__abroad">{b.cost.bank.abroadCard}</p>
                  </div>
                </details>
                <p className="bk2-cost__pay">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </svg>
                  {b.cost.payFirst}
                </p>
              </div>

              <div className="bk2-send">
                <button type="button" className="btn btn--wa btn--block h5-btn-shine" onClick={sendWa}>
                  <WaIcon /> {b.sendWa}
                </button>
                <button type="button" className="btn btn--dark btn--block" onClick={sendMail}>
                  <Mail size={18} /> {b.sendMail}
                </button>
              </div>
              <p className="bk2-confirm">{b.confirmNote}</p>
            </div>
          )}
        </div>

        {/* Navegación fija abajo */}
        {step < 3 && (
          <div className="bk2-nav">
            {nudge > 0 && !okStep[step] && (
              <p className="bk2-nav__hint" key={nudge} role="alert">
                {b.need[step]}
              </p>
            )}
            <div className="bk2-nav__row">
              {step > 0 && (
                <button type="button" className="bk2-back" onClick={() => go((step - 1) as Step)} aria-label={b.back}>
                  <Chevron dir="left" size={18} />
                </button>
              )}
              <button type="button" className={`btn btn--dark bk2-next h5-btn-shine ${okStep[step] ? "is-ready" : ""}`} onClick={next}>
                {step === 2 ? b.review : b.next} <Arrow size={15} />
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="bk2-nav bk2-nav--end">
            <button type="button" className="bk2-link" onClick={() => go(2)}>
              <Chevron dir="left" size={14} /> {b.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
