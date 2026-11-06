"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { bookingImg } from "@/lib/images";
import type { Dict } from "@/lib/content";
import { agenda, formatTime, isOpenDay, slotsFor, toKey, type SlotType } from "@/lib/agenda";
import { site, waLink, type Locale } from "@/lib/site";
import { Arrow, Chevron, Lock, Mail, Shield, WaIcon } from "./Icons";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

type Step = 0 | 1 | 2 | 3;

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
  const dateLabel = date ? date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const timeLabel = special ? (specialTime ? formatTime(specialTime, lang) : "") : time ? formatTime(time, lang) : "";
  const slotInfo = !special && time ? agenda.slots.find((s) => s.time === time && s.type === type) : undefined;

  const okStep = [Boolean(service), Boolean(date && timeLabel), Boolean(form.name.trim() && form.phone.trim()), true];
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
      `${b.service}: ${svcName}`,
      `${b.type}: ${b.types[type]}`,
      `${b.mode}: ${b.modes[effMode]}`,
      `${b.date}: ${dateLabel}`,
      `${b.time}: ${timeLabel}${slotInfo?.alt ? ` (${b.alt})` : ""}`,
      special ? `${b.msgSurcharge} ${agenda.surcharge})` : "",
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
                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={on}
                      key={s.id}
                      className={`bk2-svc__item ${on ? "is-on" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                      onClick={() => setService(s.id)}
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
                </div>
              </div>

              <div className="bk2-note">
                <Shield size={24} />
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
                  <label className="field bk2-in" key="special">
                    <span>{b.specialTime}</span>
                    <input type="time" value={specialTime} onChange={(e) => setSpecialTime(e.target.value)} />
                  </label>
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
                    {b.specialHelp} <b>{agenda.surcharge}</b>.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* PASO 3 · DATOS */}
          {step === 2 && (
            <div className="fields bk2-fields">
              <label className="field" style={{ "--i": 0 } as React.CSSProperties}>
                <span>{b.name} *</span>
                <input value={form.name} onChange={upd("name")} autoComplete="name" required />
              </label>
              <label className="field" style={{ "--i": 1 } as React.CSSProperties}>
                <span>{b.phone} *</span>
                <input value={form.phone} onChange={upd("phone")} type="tel" inputMode="tel" autoComplete="tel" required />
              </label>
              <label className="field" style={{ "--i": 2 } as React.CSSProperties}>
                <span>{b.email}</span>
                <input value={form.email} onChange={upd("email")} type="email" autoComplete="email" />
              </label>
              <label className="field" style={{ "--i": 3 } as React.CSSProperties}>
                <span>{b.country}</span>
                <input value={form.country} onChange={upd("country")} autoComplete="country-name" />
              </label>
              <label className="field field--full" style={{ "--i": 4 } as React.CSSProperties}>
                <span>{b.notes}</span>
                <textarea value={form.notes} onChange={upd("notes")} rows={3} />
              </label>
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
                    { k: b.service, v: svcName, to: 0 as Step },
                    { k: b.type, v: `${b.types[type]} · ${b.modes[effMode]}`, to: 0 as Step },
                    { k: b.date, v: dateLabel, to: 1 as Step, cls: "summary__date" },
                    {
                      k: b.time,
                      v: `${timeLabel}${slotInfo?.alt ? ` · ${b.alt}` : ""}${special && timeLabel ? ` · +${agenda.surcharge}` : ""}`,
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
