"use client";

import { useEffect, useRef, useState } from "react";
import PlanFace from "./PlanFace";
import type { PlanItem } from "@/lib/plan";

// Rostro de un plan recomendado: al entrar en pantalla, sus zonas se encienden una tras otra.
export default function RecFace({ items, label }: { items: PlanItem[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`pf-rec${lit ? " is-lit" : ""}`}>
      <PlanFace layers={items.map((i) => ({ kind: i.id, on: i.zones }))} label={label} combined />
    </div>
  );
}
