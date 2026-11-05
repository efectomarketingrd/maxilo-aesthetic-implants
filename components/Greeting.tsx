"use client";

import { useEffect, useState } from "react";

// Saludo según la hora de quien visita la web.
export default function Greeting({ fallback, morning, afternoon, evening }: { fallback: string; morning: string; afternoon: string; evening: string }) {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    const h = new Date().getHours();
    setText(h >= 5 && h < 12 ? morning : h >= 12 && h < 19 ? afternoon : evening);
  }, [morning, afternoon, evening]);
  return <>{text}</>;
}
