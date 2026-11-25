"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";
import { langNames, locales, type Locale } from "@/lib/site";
import ServiceIcon from "./ServiceIcon";

export default function Header({ t, lang }: { t: Dict; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDrop(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const home = `/${lang}`;
  // los otros dos idiomas (ES · EN · FR)
  const others = locales.filter((l) => l !== lang);
  const pathFor = (l: Locale) => (pathname ? pathname.replace(/^\/(es|en|fr)/, `/${l}`) : `/${l}`);
  const svc = t.services.items.map((s) => ({ href: `${home}/servicios/${s.slug}`, label: s.title }));
  const links = [
    { href: `${home}/sobre-nosotros`, label: t.nav.about },
    { href: `${home}/preguntas`, label: t.nav.faq },
    { href: `${home}/marcas`, label: t.nav.brands },
    { href: `${home}/blog`, label: t.nav.news },
    { href: `${home}/ubicacion`, label: t.location.nav },
  ];
  const drawerLinks = [...links, { href: `${home}/urgencias`, label: t.urgent.nav }];
  const isHome = pathname === home;
  const close = () => {
    setOpen(false);
    setDrop(false);
    setSvcOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__bar">
        <Link href={home} className="header__brand" aria-label="Maxilo Aesthetic Implants" onClick={close}>
          <Image src="/brand/mono-dark.png" alt="" width={50} height={34} priority />
          <span className="header__name">
            Maxilo Aesthetic Implants
            <small>Dra. Celia Hernández Mauricio</small>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Principal">
          <Link href={home} className={isHome ? "is-active" : ""} onClick={close}>
            {t.nav.home}
          </Link>
          <a href={links[0].href} onClick={close}>
            {links[0].label}
          </a>
          <div className={`dropdown ${drop ? "is-open" : ""}`} ref={dropRef}>
            <button type="button" aria-expanded={drop} onClick={() => setDrop(!drop)}>
              {t.nav.services}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" />
              </svg>
            </button>
            <div className="dropdown__menu">
              {svc.map((s) => (
                <Link key={s.href} href={s.href} onClick={close}>
                  {s.label}
                </Link>
              ))}
              <Link href={`${home}/planes`} className="dropdown__plan" onClick={close}>
                <span aria-hidden="true">✦</span>
                {t.plan.nav}
              </Link>
              <a href={`${home}#servicios`} className="dropdown__all" onClick={close}>
                {t.nav.allServices}
              </a>
            </div>
          </div>
          {links.slice(1).map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          {/* Enlace normal (no Link): el cambio de idioma recarga la página y empieza arriba */}
          {/* Idioma: en el móvil, un botón con el idioma actual que despliega los otros dos; en pantallas anchas, los dos a la vista */}
          <span className={`header__langs ${langOpen ? "is-open" : ""}`} ref={langRef}>
            <button type="button" className="header__lang header__lang-btn" aria-expanded={langOpen} aria-label={langNames[lang]} onClick={() => setLangOpen(!langOpen)}>
              {lang.toUpperCase()}
              <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.6" />
              </svg>
            </button>
            <span className="header__lang-list">
              {others.map((l) => (
                <a key={l} href={pathFor(l)} className="header__lang" hrefLang={l} lang={l} aria-label={langNames[l]}>
                  {l.toUpperCase()}
                </a>
              ))}
            </span>
          </span>
          <a className="btn btn--dark btn--sm header__cta" href={`${home}/agendar`}>
            {t.nav.cta}
          </a>
          <button className="header__toggle" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="header__drawer">
          <Link href={home} onClick={close}>
            {t.nav.home}
          </Link>
          <a href={links[0].href} onClick={close}>
            {links[0].label}
          </a>
          {/* Servicios: se despliega al tocar y se cierra al volver a tocar */}
          <button
            type="button"
            className={`header__drawer-toggle ${svcOpen ? "is-open" : ""}`}
            aria-expanded={svcOpen}
            aria-controls="drawer-services"
            onClick={() => setSvcOpen(!svcOpen)}
          >
            {t.nav.services}
            <svg width="14" height="14" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.3" />
            </svg>
          </button>
          <div id="drawer-services" className={`header__drawer-svc ${svcOpen ? "is-open" : ""}`}>
            <div>
              {t.services.items.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`${home}/servicios/${s.slug}`}
                  className="header__drawer-sub"
                  style={{ "--i": i } as React.CSSProperties}
                  tabIndex={svcOpen ? 0 : -1}
                  onClick={close}
                >
                  <span className="header__drawer-ico">
                    <ServiceIcon kind={s.icon} />
                  </span>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <a href={`${home}/planes`} onClick={close}>
            {t.plan.nav}
          </a>
          {drawerLinks.slice(1).map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--dark" href={`${home}/agendar`} onClick={close}>
            {t.nav.cta}
          </a>
        </div>
      )}
    </header>
  );
}
