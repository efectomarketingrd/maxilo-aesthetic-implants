import type { Metadata, Viewport } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import Analytics from "@/components/Analytics";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
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
    ...pageMeta({ lang: lang as Locale, path: "", title: t.meta.title, description: t.meta.description, rawTitle: true }),
    verification: site.googleVerification ? { google: site.googleVerification } : undefined,
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
        <Analytics c={{ ...dictionaries[lang as Locale].consent, href: `/${lang}/privacidad` }} />
      </body>
    </html>
  );
}
