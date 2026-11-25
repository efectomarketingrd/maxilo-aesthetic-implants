"use client";

import { useEffect, useRef, useState } from "react";

// Añade la clase "is-in" cuando el bloque entra en pantalla (para animaciones de entrada).
export default function InView({ className = "", children, as = "div" }: { className?: string; children: React.ReactNode; as?: "div" | "ul" | "ol" }) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // as="ul" / "ol" cuando los hijos son <li> (accesibilidad y SEO)
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${className} ${ready ? "js-anim" : ""} ${inView ? "is-in" : ""}`}>
      {children}
    </Tag>
  );
}
