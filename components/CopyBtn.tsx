"use client";

import { useState } from "react";

// Botón para copiar un dato al portapapeles
export default function CopyBtn({ text, label, done }: { text: string; label: string; done: string }) {
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

