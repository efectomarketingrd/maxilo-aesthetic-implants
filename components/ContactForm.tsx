"use client";

import { useState } from "react";
import type { Dict } from "@/lib/content";
import { waLink } from "@/lib/site";

// El formulario arma un mensaje y lo abre en WhatsApp.
// Más adelante se puede conectar a un correo o a una base de datos para guardar los contactos.
export default function ContactForm({ t }: { t: Dict }) {
  const c = t.contact;
  const [interest, setInterest] = useState(c.interestOptions[0]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      c.waIntro,
      `${c.name}: ${f.get("name")}`,
      `${c.email}: ${f.get("email")}`,
      `${c.phone}: ${f.get("phone")}`,
      `${c.interest} ${interest}`,
      f.get("message") ? `${c.message}: ${f.get("message")}` : "",
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        <span>{c.name}</span>
        <input name="name" required autoComplete="name" />
      </label>
      <div className="form__row">
        <label>
          <span>{c.email}</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>{c.phone}</span>
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
      </div>
      <fieldset>
        <legend>{c.interest}</legend>
        <div className="chips">
          {c.interestOptions.map((o) => (
            <button type="button" key={o} className={`chip ${o === interest ? "is-on" : ""}`} aria-pressed={o === interest} onClick={() => setInterest(o)}>
              {o}
            </button>
          ))}
        </div>
      </fieldset>
      <label>
        <span>{c.message}</span>
        <textarea name="message" rows={3} />
      </label>
      <button className="btn btn--gold btn--block" type="submit">
        {c.send}
      </button>
      <p className="form__note">{c.privacy}</p>
    </form>
  );
}
