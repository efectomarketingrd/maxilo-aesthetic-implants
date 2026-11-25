import type { Metadata } from "next";
import { locales, site, type Locale } from "./site";

/*
 * Metadatos de cada página (SEO, 25 nov 2026):
 * - Título de pestaña de 60 caracteres como máximo cuando se puede: nombre completo de la marca si cabe,
 *   si no "| Maxilo", y si tampoco cabe, solo el título.
 * - Descripción de 160 caracteres como máximo (se corta en una palabra).
 * - Canónica, versiones ES/EN y x-default (español).
 * - Imagen para compartir SIEMPRE (por defecto /brand/og.png): una página que define openGraph
 *   reemplaza el de la plantilla, así que aquí se completa todo.
 */
const BRAND = ` | ${site.name}`;
const SHORT = " | Maxilo";

export function shortTitle(raw: string) {
  const base = raw.replace(/\s*[|·]\s*Maxilo Aesthetic Implants\s*$/i, "").trim();
  if ((base + BRAND).length <= 60) return base + BRAND;
  if ((base + SHORT).length <= 60) return base + SHORT;
  return base;
}

export function shortDesc(d: string, max = 160) {
  const s = d.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

type Opts = {
  lang: Locale;
  path: string; // sin idioma, p. ej. "/agendar" ("" = inicio)
  title: string;
  description: string;
  image?: string;
  ogTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
  langs?: Locale[]; // idiomas en que existe la página (por defecto es y en)
  rawTitle?: boolean; // no tocar el título
};

export function pageMeta(o: Opts): Metadata {
  const langs = o.langs ?? ([...locales] as Locale[]);
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = `/${l}${o.path}`;
  languages["x-default"] = `/${langs.includes("es") ? "es" : langs[0]}${o.path}`;
  const title = o.rawTitle ? o.title : shortTitle(o.title);
  const description = shortDesc(o.description);
  const image = o.image ?? "/brand/og.png";
  return {
    title,
    description,
    alternates: { canonical: `/${o.lang}${o.path}`, languages },
    openGraph: {
      type: o.type ?? "website",
      siteName: site.name,
      locale: o.lang === "es" ? "es_DO" : o.lang === "fr" ? "fr_FR" : "en_US",
      title: o.ogTitle ?? title.replace(BRAND, "").replace(SHORT, ""),
      description,
      url: `/${o.lang}${o.path}`,
      images: [image === "/brand/og.png" ? { url: image, width: 1200, height: 630, alt: site.name } : { url: image, alt: o.ogTitle ?? title }],
      ...(o.publishedTime ? { publishedTime: o.publishedTime } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}
