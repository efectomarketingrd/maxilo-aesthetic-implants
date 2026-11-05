import Link from "next/link";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/site";

export default function PageHero({ t, lang, eyebrow, title, text, crumb }: { t: Dict; lang: Locale; eyebrow: string; title: string; text?: string; crumb: string }) {
  return (
    <section className="page-hero page-hero--simple">
      <div className="container">
        <nav className="crumbs" aria-label="breadcrumb">
          <Link href={`/${lang}`}>{t.nav.home}</Link> / <span>{crumb}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}
