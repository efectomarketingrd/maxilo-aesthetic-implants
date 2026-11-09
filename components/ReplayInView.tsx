"use client";

import { useEffect, useRef, useState } from "react";

// Como InView, pero la animación se repite: se queda completa un rato, se desvanece y vuelve a empezar.
// Solo corre mientras está en pantalla; al salir se reinicia. Con "reducir movimiento" no se repite.
export default function ReplayInView({ className = "", every = 11000, children }: { className?: string; every?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [fading, setFading] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    setReady(true);
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (!e.isIntersecting) {
          setFading(false);
          setRound((r) => r + 1); // al volver a verse, empieza desde el principio
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t2: ReturnType<typeof setTimeout>;
    const t1 = setTimeout(() => {
      setFading(true);
      t2 = setTimeout(() => {
        setFading(false);
        setRound((r) => r + 1);
      }, 500);
    }, every);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, round, every]);

  return (
    <div ref={ref} className={`${className} ${ready ? "js-anim" : ""} ${inView ? "is-in" : ""} ${fading ? "is-fading" : ""}`}>
      <div key={round} className="tx-round">
        {children}
      </div>
    </div>
  );
}
