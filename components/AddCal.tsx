"use client";
import { useState } from "react";

// Tarjeta "Guárdela en su calendario" (Mi cita, solo con la cita confirmada)
export default function AddCal({ month, day, time, title, note, google, ics, icsLabel, saved }: { month: string; day: number; time: string; title: string; note: string; google: string; ics: string; icsLabel: string; saved: string }) {
  const [done, setDone] = useState<"" | "g" | "i">("");
  return (
    <div className="bk2-addcal mc-addcal">
      <div className="bk2-addcal__sheet" aria-hidden="true">
        <span className="bk2-addcal__rings">
          <i />
          <i />
        </span>
        <span className="bk2-addcal__month">{month}</span>
        <strong className="bk2-addcal__day">{day}</strong>
        <span className="bk2-addcal__time">{time}</span>
      </div>
      <div className="bk2-addcal__body">
        <p className="bk2-addcal__title">{title}</p>
        <p className="bk2-addcal__note">{note}</p>
        <div className="bk2-addcal__btns">
          <a className={`bk2-addcal__btn ${done === "g" ? "is-saved" : ""}`} href={google} target="_blank" rel="noopener noreferrer" onClick={() => setDone("g")}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
              <path className="bk2-addcal__mark" d="M9 15l2 2 4-4.5" />
            </svg>
            <span>{done === "g" ? saved : "Google Calendar"}</span>
          </a>
          <a className={`bk2-addcal__btn ${done === "i" ? "is-saved" : ""}`} href={ics} onClick={() => setDone("i")}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
              <path d="M6.5 7h11M10.5 19h3" />
              <path className="bk2-addcal__mark" d="M9.5 13l1.8 1.8 3.4-3.8" />
            </svg>
            <span>{done === "i" ? saved : icsLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
