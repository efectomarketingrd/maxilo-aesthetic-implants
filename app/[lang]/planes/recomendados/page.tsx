import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecFace from "@/components/RecFace";
import RecFilter from "@/components/RecFilter";
import { Arrow } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { rd, usd } from "@/lib/agenda";
import { planPrice, planTotal, type PlanItem, type PlanKind } from "@/lib/plan";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const p = dictionaries[lang as Locale].plan;
  return {
    title: `${p.rec.eyebrow} | ${p.metaTitle}`,
    description: p.rec.intro,
    alternates: { canonical: `/${lang}/planes/recomendados`, languages: { es: "/es/planes/recomendados", en: "/en/planes/recomendados" } },
  };
}

export default async function RecPlans({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const r = t.plan.rec;
  const names = t.plan.b.items as { id: PlanKind; name: string; zones: string[] }[];
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="pl">
        <section className="pl-hero pl-hero--tight">
          <div className="container pl-wrap pl-wrap--wide">
            <nav className="crumbs bk2-rise" aria-label="breadcrumb">
              <Link href={`/${lang}/planes`}>{t.plan.nav}</Link> / <span>{r.eyebrow}</span>
            </nav>
            <h1 className="bk2-rise" style={d(1)}>
              {r.title} <em>{r.titleAccent}</em>
            </h1>
            <p className="pl-hero__text bk2-rise" style={d(2)}>{r.intro}</p>
          </div>
        </section>
        <section className="pl-build">
          <div className="container pl-wrap pl-wrap--wide">
            <RecFilter filters={r.filters} tags={r.plans.map((p) => p.tags)}>
              {r.plans.map((p, k) => {
                const items = p.items as PlanItem[];
                const total = planTotal(items);
                const pending = items.filter((i) => planPrice(i.id, i.zones) === null).length;
                const when = (p as { when?: string }).when;
                return (
                  <article key={p.id} className="rc-card bk2-rise" style={d(2.5 + Math.min(k, 3) * 0.3)}>
                    <div className="rc-face">
                      <RecFace items={items} label={p.name} />
                    </div>
                    <div className="rc-body">
                      {when && (
                        <p className="rc-when">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="8.5" />
                            <path d="M12 7.5V12l3 2" />
                          </svg>
                          {when}
                        </p>
                      )}
                      <h2>{p.name}</h2>
                      <p className="rc-goal">{p.goal}</p>
                      <p className="rc-desc">{p.desc}</p>
                      <p className="rc-inc">{r.includes}</p>
                      <ul className="rc-list">
                        {items.map((i) => {
                          const it = names.find((n) => n.id === i.id)!;
                          return (
                            <li key={i.id}>
                              <span>
                                {it.name}
                                {it.zones.length > 0 && <small>{i.zones.map((z) => it.zones[z]).join(" · ")}</small>}
                              </span>
                              <strong className={planPrice(i.id, i.zones) === null ? "is-tbc" : ""}>{planPrice(i.id, i.zones) === null ? t.plan.b.tbc : rd(planPrice(i.id, i.zones)!)}</strong>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="rc-total">
                        <span>{r.total}</span>
                        <strong>{total ? rd(total) : t.plan.b.tbc}</strong>
                        {total > 0 && <small>≈ {usd(total)}{pending > 0 && ` · + ${pending} ${r.tbcPlus}`}</small>}
                      </div>
                      <Link className="btn btn--dark btn--sm rc-btn" href={`/${lang}/planes/crear?plan=${p.id}`}>
                        {r.use} <Arrow size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </RecFilter>
            <p className="rc-note">{r.note}</p>
            <Link className="rc-own" href={`/${lang}/planes/crear`}>
              {r.own} →
            </Link>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
