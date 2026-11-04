"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "@/lib/content";
import { waLink, type Locale } from "@/lib/site";

export default function Header({ t, lang }: { t: Dict; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const other = lang === "es" ? "en" : "es";
  const links = [
    ["#servicios", t.nav.services],
    ["#estadia", t.nav.tourism],
    ["#doctora", t.nav.doctor],
    ["#preguntas", t.nav.faq],
    ["#contacto", t.nav.contact],
  ];

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__bar">
        <Link href={`/${lang}`} className="header__brand" aria-label="Maxilo Aesthetic Implants">
          <Image src="/brand/mono-light.png" alt="" width={48} height={30} priority />
          <span className="header__name">
            Maxilo Aesthetic Implants
            <small>Dra. Celia Hernández Mauricio</small>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <Link href={`/${other}`} className="header__lang" hrefLang={other} lang={other}>
            {other.toUpperCase()}
          </Link>
          <a className="btn btn--gold btn--sm header__cta" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
            {t.nav.cta}
          </a>
          <button className="header__toggle" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="header__drawer" hidden={!open}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn btn--gold" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener">
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
