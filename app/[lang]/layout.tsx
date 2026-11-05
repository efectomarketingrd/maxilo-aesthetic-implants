import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "../globals.css";
import { dictionaries } from "@/lib/content";
import { locales, site, type Locale } from "@/lib/site";
import ScrollTop from "@/components/ScrollTop";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#253035" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};
  const t = dictionaries[lang as Locale];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "es" ? "es_DO" : "en_US",
      url: `/${lang}`,
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.name }],
    },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  return (
    <html lang={lang}>
      <body>
        <ScrollTop />
        {children}
      </body>
    </html>
  );
}
