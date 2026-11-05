"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { bookingImg } from "@/lib/images";
import type { Dict } from "@/lib/content";
import { agenda, formatTime, isOpenDay, slotsFor, toKey, type SlotType } from "@/lib/agenda";
import { site, waLink, type Locale } from "@/lib/site";
import { Chevron, Lock, Mail, Shield, WaIcon } from "./Icons";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function BookingWizard({ t, lang }: { t: Dict; lang: Locale }) {
  const b = t.booking;
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.minDaysAhead), [today]);
  const maxDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.maxDaysAhead), [today]);

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
  const [tried, setTried] = useState(false);

  const locale = lang === "es" ? "es-DO" : "en-US";
  const monthLabel = cursor.toLocaleDateString(locale, { month: "long", year: "numeric" });

  // Calendario: semana empieza en lunes
  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
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

  const valid = Boolean(service && date && timeLabel && form.name.trim() && form.phone.trim());

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
    setTried(true);
    if (!valid) return;
    window.open(waLink(message()), "_blank", "noopener");
  }

  function sendMail() {
    setTried(true);
    if (!valid) return;
    const subject = `${b.mailSubject} — ${svcName} — ${date ? toKey(date) : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
  }

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="booker">
      {/* PASO 1 */}
      <section className="booker__card" id="reservar">
        <h2 className="booker__step"><span>1.</span> {b.step1}</h2>
        <p className="booker__help">{b.step1Text}</p>

        <div className="svc-pick" role="radiogroup" aria-label={b.step1}>
          {b.services.map((s) => {
            const on = service === s.id;
            return (
              <button
                type="button"
                role="radio"
                aria-checked={on}
                key={s.id}
                className={`svc-pick__item ${on ? "is-on" : ""}`}
                onClick={() => setService(s.id)}
              >
                <span className="svc-pick__img">
                  <Image src={bookingImg[s.id]} alt="" fill sizes="72px" />
                </span>
                <span className="svc-pick__name">{s.name}</span>
                <span className="svc-pick__radio" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <p className="booker__label">{b.typeLabel}</p>
        <div className="seg" role="radiogroup" aria-label={b.typeLabel}>
          {(["consulta", "procedimiento"] as SlotType[]).map((ty) => (
            <button
              type="button"
              role="radio"
              aria-checked={type === ty}
              key={ty}
              className={type === ty ? "is-on" : ""}
              onClick={() => {
                setType(ty);
                setTime(null);
              }}
            >
              {b.types[ty]}
            </button>
          ))}
        </div>
        <p className="booker__help booker__help--small">{b.typeHelp[type]}</p>

        <p className="booker__label">{b.modeLabel}</p>
        <div className={`seg ${type === "procedimiento" ? "is-locked" : ""}`} role="radiogroup" aria-label={b.modeLabel}>
          {(["presencial", "online"] as const).map((m) => (
            <button
              type="button"
              role="radio"
              aria-checked={effMode === m}
              key={m}
              className={effMode === m ? "is-on" : ""}
              disabled={type === "procedimiento" && m === "online"}
              onClick={() => setMode(m)}
            >
              {b.modes[m]}
            </button>
          ))}
        </div>
        <p className="booker__help booker__help--small">
          {type === "procedimiento" ? b.modeOnlyPresencial : b.modeHelp[effMode]}
        </p>

        <div className="booker__note">
          <Shield size={26} />
          <span>{b.note}</span>
        </div>
      </section>

      {/* PASO 2 */}
      <section className="booker__card">
        <h2 className="booker__step"><span>2.</span> {b.step2}</h2>

        <div className="cal">
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
          <div className="cal__grid">
            {weekHeads.map((d) => (
              <span className="cal__dow" key={d}>{d}</span>
            ))}
            {cells.map((d, i) =>
              d ? (
                <button
                  type="button"
                  key={i}
                  disabled={!selectable(d)}
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

        <div className="times">
          {!date ? (
            <p className="booker__help">{b.pickDay}</p>
          ) : special ? (
            <label className="field">
              <span>{b.specialTime}</span>
              <input type="time" value={specialTime} onChange={(e) => setSpecialTime(e.target.value)} />
            </label>
          ) : (
            <>
              <p className="times__title">
                {b.available} {date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
              </p>
              {daySlots.length ? (
                <div className="times__grid">
                  {daySlots.map((s) => (
                    <button
                      type="button"
                      key={s.time}
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
                <p className="booker__help">{b.noSlots}</p>
              )}
            </>
          )}
        </div>

        <label className="special">
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
      </section>

      {/* PASO 3 */}
      <section className="booker__card booker__card--wide">
        <div className="booker__details">
          <div>
            <h2 className="booker__step"><span>3.</span> {b.step3}</h2>
            <div className="fields">
              <label className="field">
                <span>{b.name} *</span>
                <input value={form.name} onChange={upd("name")} autoComplete="name" required />
              </label>
              <label className="field">
                <span>{b.phone} *</span>
                <input value={form.phone} onChange={upd("phone")} type="tel" autoComplete="tel" required />
              </label>
              <label className="field">
                <span>{b.email}</span>
                <input value={form.email} onChange={upd("email")} type="email" autoComplete="email" />
              </label>
              <label className="field">
                <span>{b.country}</span>
                <input value={form.country} onChange={upd("country")} autoComplete="country-name" />
              </label>
              <label className="field field--full">
                <span>{b.notes}</span>
                <textarea value={form.notes} onChange={upd("notes")} rows={3} />
              </label>
            </div>
          </div>

          <aside className="summary">
            <p className="summary__title">{b.summary}</p>
            <dl>
              <div><dt>{b.service}</dt><dd>{svcName || "—"}</dd></div>
              <div><dt>{b.type}</dt><dd>{b.types[type]}</dd></div>
              <div><dt>{b.mode}</dt><dd>{b.modes[effMode]}</dd></div>
              <div><dt>{b.date}</dt><dd className="summary__date">{dateLabel || "—"}</dd></div>
              <div>
                <dt>{b.time}</dt>
                <dd>
                  {timeLabel || "—"}
                  {slotInfo?.alt && <small> · {b.alt}</small>}
                  {special && timeLabel && <small> · +{agenda.surcharge}</small>}
                </dd>
              </div>
            </dl>

            {tried && !valid && <p className="summary__error" role="alert">{b.missing}</p>}

            <div className="summary__btns">
              <button type="button" className="btn btn--wa btn--block" onClick={sendWa}>
                <WaIcon /> {b.sendWa}
              </button>
              <button type="button" className="btn btn--dark btn--block" onClick={sendMail}>
                <Mail size={18} /> {b.sendMail}
              </button>
            </div>
            <p className="summary__note">{b.confirmNote}</p>
            <p className="summary__secure"><Lock /> {b.secure}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
