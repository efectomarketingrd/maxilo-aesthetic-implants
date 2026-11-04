import type { Locale } from "./site";
import type { ServiceSlug } from "./content";

// ARTÍCULOS DEL BLOG
// Para publicar un artículo nuevo, agrega un objeto a la lista `posts`.
// Cada artículo tiene su versión en español (es) y, si se desea, en inglés (en).
// Si un artículo no tiene versión en inglés, solo aparece en el blog en español.
//
// Bloques del contenido:
//   { h: "Subtítulo" }            → subtítulo
//   { p: "Párrafo de texto" }     → párrafo
//   { ul: ["punto 1", "punto 2"] } → lista
//   { tip: "Texto destacado" }    → recuadro de consejo

export type Block = { h: string } | { p: string } | { ul: string[] } | { tip: string };

type PostVersion = {
  title: string;
  excerpt: string;
  category: string;
  body: Block[];
};

export type Post = {
  slug: string;
  date: string; // AAAA-MM-DD
  cover?: string; // ruta de la imagen en /public, por ejemplo "/blog/implantes.jpg"
  service?: ServiceSlug; // servicio relacionado (muestra un botón hacia esa página)
  readMinutes: number;
  es: PostVersion;
  en?: PostVersion;
};

export const posts: Post[] = [];

export function postsFor(lang: Locale) {
  return posts
    .filter((p) => p[lang])
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({ ...p, v: p[lang] as PostVersion }));
}

export function findPost(lang: Locale, slug: string) {
  const p = posts.find((x) => x.slug === slug);
  if (!p || !p[lang]) return null;
  return { ...p, v: p[lang] as PostVersion };
}

export function formatDate(date: string, lang: Locale) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(lang === "es" ? "es-DO" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
