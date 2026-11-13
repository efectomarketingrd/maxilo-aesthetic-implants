import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import PlanFace from "@/components/PlanFace";
import { rd } from "@/lib/agenda";
import { planTotal, type PlanItem } from "@/lib/plan";
import { dictionaries } from "@/lib/content";
import type { Locale } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const p = dictionaries[lang as Locale].plan;
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: `/${lang}/planes`, languages: { es: "/es/planes", en: "/en/planes" } },
  };
}

export default async function Plans({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const p = t.plan;
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;
  const names = p.b.items;
  const nameOf = (id: string) => names.find((n) => n.id === id)!.name;
  const buildChips = [nameOf("botox"), nameOf("filler").split(" (")[0]];
  const demoTotal = planTotal([{ id: "botox", zones: [0, 2] }, { id: "filler", zones: [1, 3, 5] }]);

  return (
    <>
      <Header t={t} lang={lang} />
      <main className="pl">
        <section className="pl-hero">
          <div className="container pl-wrap">
            <p className="eyebrow bk2-rise">{p.eyebrow}</p>
            <h1 className="bk2-rise" style={d(1)}>
              {p.title} <em>{p.titleAccent}</em>
            </h1>
            <p className="pl-hero__text bk2-rise" style={d(2)}>{p.intro}</p>
            <div className="pl-choices">
              <Link className="pl-choice pl-choice--main bk2-rise" style={d(3)} href={`/${lang}/planes/crear`}>
                <div className="pl-stage pl-stage--build" aria-hidden="true">
                  <div className="pl-stage__face">
                    <PlanFace layers={[{ kind: "botox", on: [0, 2] }, { kind: "filler", on: [1, 3, 5] }]} label="" combined />
                  </div>
                  <ul className="pl-steps">
                    {buildChips.map((c, k) => (
                      <li key={c} style={{ "--k": k } as React.CSSProperties}>
                        <span>✓</span>
                        {c}
                      </li>
                    ))}
                    <li className="pl-steps__total" style={{ "--k": buildChips.length } as React.CSSProperties}>
                      <small>{p.b.total}</small>
                      <strong>{rd(demoTotal)}</strong>
                    </li>
                  </ul>
                </div>
                <div className="pl-choice__txt">
                  <strong>{p.createT}</strong>
                  <small>{p.createD}</small>
                </div>
                <span className="pl-choice__go">
                  <Arrow size={16} />
                </span>
              </Link>
              <Link className="pl-choice pl-choice--rec bk2-rise" style={d(3.5)} href={`/${lang}/planes/recomendados`}>
                <div className="pl-stage pl-stage--rec" aria-hidden="true">
                  {p.rec.plans.slice(0, 3).map((r, k) => (
                    <div key={r.id} className="pl-mini" style={{ "--k": k } as React.CSSProperties}>
                      <span className="pl-mini__dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <strong>{r.name}</strong>
                      <small>{rd(planTotal(r.items as PlanItem[]))}</small>
                    </div>
                  ))}
                </div>
                <div className="pl-choice__txt">
                  <strong>{p.readyT}</strong>
                  <small>{p.readyD}</small>
                </div>
                <span className="pl-choice__go pl-choice__go--light">
                  <Arrow size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
