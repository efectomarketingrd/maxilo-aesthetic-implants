import type { MetadataRoute } from "next";
import { dictionaries } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/noticias", ...dictionaries.es.services.items.map((s) => `/servicios/${s.slug}`)];
  return paths.flatMap((p) =>
    (["es", "en"] as const).map((l) => ({
      url: `${site.url}/${l}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
      alternates: { languages: { es: `${site.url}/es${p}`, en: `${site.url}/en${p}` } },
    })),
  );
}
