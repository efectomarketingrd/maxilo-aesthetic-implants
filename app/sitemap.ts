import type { MetadataRoute } from "next";
import { dictionaries } from "@/lib/content";
import { posts } from "@/lib/blog";
import { treatments } from "@/lib/treatments";
import { locales, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/agendar", "/paquete-implantes", "/blog", "/sobre-nosotros", "/preguntas", "/ubicacion", "/urgencias", "/planes", "/planes/crear", "/planes/recomendados", "/marcas", "/privacidad", ...(dictionaries.es.institutions.items.length ? ["/instituciones"] : []), ...dictionaries.es.services.items.map((s) => `/servicios/${s.slug}`), ...treatments.map((tr) => `/servicios/${tr.service}/${tr.slug}`)];
  const articles = posts.flatMap((p) =>
    locales
      .filter((l) => p[l])
      .map((l) => ({ url: `${site.url}/${l}/blog/${p.slug}`, lastModified: new Date(`${p.date}T12:00:00`), priority: 0.6 })),
  );
  return [...articles, ...paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
      alternates: { languages: { ...Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])), "x-default": `${site.url}/es${p}` } },
    })),
  )];
}
