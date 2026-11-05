import type { MetadataRoute } from "next";
import { dictionaries } from "@/lib/content";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/agendar", "/blog", "/sobre-nosotros", "/preguntas", "/marcas", "/instituciones", ...dictionaries.es.services.items.map((s) => `/servicios/${s.slug}`)];
  const articles = posts.flatMap((p) =>
    (["es", "en"] as const)
      .filter((l) => p[l])
      .map((l) => ({ url: `${site.url}/${l}/blog/${p.slug}`, lastModified: new Date(`${p.date}T12:00:00`), priority: 0.6 })),
  );
  return [...articles, ...paths.flatMap((p) =>
    (["es", "en"] as const).map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
      alternates: { languages: { es: `${site.url}/es${p}`, en: `${site.url}/en${p}` } },
    })),
  )];
}
