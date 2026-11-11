"use client";

import { useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { agenda, rd, usd } from "@/lib/agenda";
import { centers, site, waLink } from "@/lib/site";
import { WaIcon } from "./Icons";

// Formulario corto de urgencia: un solo paso, la cita es para hoy y la hora se confirma.
export default function UrgentForm({ t }: { t: Dict }) {
  const u = t.urgent;
  const [f, setF] = useState({ name: "", phone: "", what: "", referred: "" });
  const [place, setPlace] = useState<string>("maxilo");
  const [nudge, setNudge] = useState(false);
  const [sent, setSent] = useState(false);
  const honey = useRef<HTMLInputElement>(null);
  const center = centers.find((c) => c.id === place) ?? centers[0];
  const price = agenda.prices.presencial;
  const valid = f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 7 && f.what.trim().length > 2;

  const upd = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  function message() {
    return [
      u.msgTitle,
      "",
      `${u.name}: ${f.name.trim()}`,
      `${u.phone}: ${f.phone.trim()}`,
      `${u.msgWhat}: ${f.what.trim()}`,
      f.referred.trim() ? `${u.msgReferred}: ${f.referred.trim()}` : "",
      `${u.msgPlace}: ${center.name} (${center.town})`,
      "",
      `${u.msgCost}: ${rd(price)} (≈ ${usd(price)}) — ${u.payOnArrival}`,
      u.costNote,
    ]
      .filter((l, i, a) => l !== "" || (i > 0 && a[i - 1] !== ""))
      .join("\n");
  }

  function send() {
    if (!valid) {
      setNudge(true);
      return;
    }
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santo_Domingo" }).format(new Date());
    const msg = message();
    fetch("/api/solicitud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        urgent: true,
        name: f.name,
        phone: f.phone,
        email: "",
        service: `${u.service} — ${f.what.trim().slice(0, 80)}`,
        referred: f.referred,
        place: `${center.name}, ${center.town}`,
        date: today,
        time: "",
        minutes: 60,
        dateLabel: today,
        message: msg,
        website: honey.current?.value ?? "",
      }),
    }).catch(() => {});
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  }

  return (
    <div className="urg-form">
      <h2>{u.formTitle}</h2>
      <p className="urg-form__text">{u.formText}</p>

      <label className="urg-field">
        <span>{u.name} *</span>
        <input autoComplete="name" value={f.name} onChange={upd("name")} />
      </label>
      <label className="urg-field">
        <span>{u.phone} *</span>
        <input type="tel" autoComplete="tel" inputMode="tel" value={f.phone} onChange={upd("phone")} />
      </label>
      <label className="urg-field">
        <span>{u.what} *</span>
        <textarea rows={3} placeholder={u.whatPh} value={f.what} onChange={upd("what")} />
      </label>
      <label className="urg-field">
        <span>{u.referred}</span>
        <input placeholder={u.referredPh} value={f.referred} onChange={upd("referred")} />
      </label>

      <p className="urg-field__label">{u.place}</p>
      <div className="urg-places" role="radiogroup" aria-label={u.place}>
        {centers.map((c) => (
          <button key={c.id} type="button" role="radio" aria-checked={place === c.id} className={place === c.id ? "is-on" : ""} onClick={() => setPlace(c.id)}>
            <strong>{c.name}</strong>
            <small>{c.town}</small>
          </button>
        ))}
      </div>

      <div className="urg-cost">
        <p className="urg-cost__row">
          <span>{u.costConsult}</span>
          <strong>
            {rd(price)} <small>≈ {usd(price)}</small>
          </strong>
        </p>
        <p className="urg-cost__note">
          <strong>{u.payOnArrival}</strong> {u.costNote}
        </p>
      </div>

      <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="bk2-hp" />

      {nudge && !valid && (
        <p className="urg-need" role="alert">
          {u.need}
        </p>
      )}
      <button type="button" className="btn btn--wa btn--block h5-btn-shine" onClick={send}>
        <WaIcon /> {u.send}
      </button>
      <a className="btn btn--dark btn--block urg-callbtn" href={`tel:+1${site.phones[0].replace(/\D/g, "")}`}>
        {u.call} · {site.phones[0]}
      </a>
      {sent && (
        <p className="urg-sent" role="status">
          {u.sent}
        </p>
      )}
    </div>
  );
}
