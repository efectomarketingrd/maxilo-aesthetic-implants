"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Al cambiar de página, empezar siempre arriba (salvo enlaces a una sección con #).
export default function ScrollTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}
