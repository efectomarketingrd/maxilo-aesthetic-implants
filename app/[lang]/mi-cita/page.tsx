import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CopyBtn from "@/components/CopyBtn";
import { WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { rd, usd } from "@/lib/agenda";
import { readCita } from "@/lib/cita";
import { site, waLink, xrayCenters, type Locale } from "@/lib/site";

// "Mi cita": página personal (enlace con los datos de la solicitud) con el resumen y cómo pagar.
// No se indexa: es de cada paciente.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: dictionaries[lang as Locale].booking.cita.metaTitle, robots: { index: false, follow: false } };
}

const Amt = ({ n }: { n: number }) => (
  <span className="amt">
    {rd(n)}
    <small>≈ {usd(n)}</small>
  </span>
);

export default async function MiCita({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ c?: string }> }) {
  const { lang: l } = await params;
  const lang = l as Locale;
  const t = dictionaries[lang];
  const b = t.booking;
  const k = b.cita;
  const c = readCita((await searchParams).c);

  const [y, mo, d] = (c?.d ?? "2000-01-01").split("-").map(Number);
  const dateLabel = new Date(Date.UTC(y, mo - 1, d, 12)).toLocaleDateString(lang === "es" ? "es-DO" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Google Calendar
  const pad = (n: number) => String(n).padStart(2, "0");
  let calHref = "";
  if (c) {
    const ymd = `${y}${pad(mo)}${pad(d)}`;
    let dates: string;
    if (c.hm) {
      const [h, m] = c.hm.split(":").map(Number);
      const end = h * 60 + m + (c.k === "procedimiento" ? 60 : 30);
      dates = `${ymd}T${pad(h)}${pad(m)}00/${ymd}T${pad(Math.floor(end / 60))}${pad(end % 60)}00`;
    } else {
      const n = new Date(Date.UTC(y, mo - 1, d + 1));
      dates = `${ymd}/${n.getUTCFullYear()}${pad(n.getUTCMonth() + 1)}${pad(n.getUTCDate())}`;
    }
    const q = new URLSearchParams({
      action: "TEMPLATE",
      text: b.calTitle,
      dates,
      details: `${c.s}${c.r ? `\n${b.pano.cal}` : ""}\n${site.phones[0]} · ${site.email}`,
      location: c.p,
      ctz: "America/Santo_Domingo",
    });
    calHref = `https://calendar.google.com/calendar/render?${q.toString()}`;
  }

  const ext = c?.x === 1;
  const consultAtCenter = c && c.k === "consulta" && c.m === "presencial" && !ext;
  const proof = waLink(k.proofMsg.replace("{svc}", c?.s ?? "").replace("{date}", dateLabel));

  return (
    <>
      <Header lang={lang} t={t} />
      <main className="mc">
        <div className="container mc-wrap">
          {!c ? (
            <div className="mc-card mc-empty">
              <p>{k.invalid}</p>
              <a className="btn btn--wa" href={waLink("")} target="_blank" rel="noopener">
                <WaIcon /> WhatsApp
              </a>
            </div>
          ) : (
            <>
              <p className="eyebrow mc-eyebrow">{site.name}</p>
              <h1 className="mc-h1">{k.hello.replace("{name}", c.n.split(/\s+/)[0] || "")}</h1>
              <p className="mc-intro">{k.intro}</p>

              {/* Resumen */}
              <div className="mc-card mc-ticket">
                <span className={`mc-status${ext ? " is-ext" : ""}`}>
                  <i aria-hidden="true" />
                  {ext ? k.statusExt : k.status}
                </span>
                <div className="mc-date">
                  <span className="mc-date__sheet" aria-hidden="true">
                    <small>{new Date(Date.UTC(y, mo - 1, d, 12)).toLocaleDateString(lang === "es" ? "es-DO" : "en-US", { month: "short", timeZone: "UTC" }).replace(".", "")}</small>
                    <strong>{d}</strong>
                  </span>
                  <div>
                    <strong className="mc-date__day">{dateLabel}</strong>
                    <span>{c.h || b.timeTbd}</span>
                  </div>
                </div>
                <dl>
                  <div>
                    <dt>{b.service}</dt>
                    <dd>{c.s}</dd>
                  </div>
                  <div>
                    <dt>{b.type}</dt>
                    <dd>
                      {b.types[c.k]} · {b.modes[c.m]}
                    </dd>
                  </div>
                  {c.m === "presencial" && (
                    <div>
                      <dt>{b.place}</dt>
                      <dd>{c.p}</dd>
                    </div>
                  )}
                </dl>
                {calHref && (
                  <a className="mc-cal" href={calHref} target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
                      <path d="M3.5 10h17M8 3v4M16 3v4" />
                    </svg>
                    {k.cal}
                  </a>
                )}
              </div>

              {c.r === 1 && (
                <div className="bk2-remind mc-remind" role="note">
                  <span className="bk2-remind__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z M10 20.5a2 2 0 0 0 4 0" />
                    </svg>
                  </span>
                  <span>
                    <strong>{b.pano.reminderT}</strong>
                    {b.pano.reminder}
                    <small className="bk2-remind__where">
                      {b.pano.where}: {xrayCenters.map((x) => `${x.name} (${x.area}) ${x.phone ?? ""}`.trim()).join(" · ")}
                    </small>
                  </span>
                </div>
              )}

              {/* Pago */}
              <div className="mc-card mc-pay">
                <h2>{k.payT}</h2>
                <div className={`mc-when${ext ? " is-ext" : ""}`}>
                  <strong>{ext ? k.extT : k.waitT}</strong>
                  <p>{ext ? k.ext : k.wait}</p>
                </div>
                <ul className="mc-lines">
                  <li>
                    <span>{k.total}</span>
                    <strong>{c.t < 0 ? b.cost.toConfirm : <Amt n={c.t} />}</strong>
                  </li>
                  {c.pf > 0 && (
                    <li className="is-due">
                      <span>{k.duePlan}</span>
                      <strong>
                        <Amt n={c.pf} />
                      </strong>
                    </li>
                  )}
                  {(c.dep > 0 || c.dt === 1) && (
                    <li className="is-due">
                      <span>
                        {k.dueDeposit}
                        <small>{ext ? k.dueExtPct : k.dueDepositPct}</small>
                      </span>
                      <strong>{c.dep > 0 ? <Amt n={c.dep} /> : k.dueTbd}</strong>
                    </li>
                  )}
                  {ext && c.t > 0 && c.dep > 0 && (
                    <li>
                      <span>{k.rest}</span>
                      <strong>
                        <Amt n={c.t - c.dep} />
                      </strong>
                    </li>
                  )}
                </ul>
                {consultAtCenter && <p className="mc-note">{k.dueAtCenter}</p>}
                {c.k === "consulta" && c.m === "online" && <p className="mc-note">{k.dueOnline}</p>}

                <div className="bk2-bank mc-bank">
                <div className="bk2-bank__body">
                  <p className="mc-bank__t">{b.cost.bank.title}</p>
                  <dl>
                    <div>
                      <dt>{b.cost.bank.holder}</dt>
                      <dd>{site.bank.holder}</dd>
                      <CopyBtn text={site.bank.holder} label={b.cost.bank.copy} done={b.cost.bank.copied} />
                    </div>
                    <div>
                      <dt>{b.cost.bank.bank}</dt>
                      <dd>{site.bank.name}</dd>
                    </div>
                    {site.bank.accounts.map((a) => (
                      <div key={a.number}>
                        <dt>
                          {b.cost.bank.account} {b.cost.bank.cur[a.cur as "RD$" | "US$"]}
                        </dt>
                        <dd className="bk2-bank__num">{a.number}</dd>
                        <CopyBtn text={a.number} label={b.cost.bank.copy} done={b.cost.bank.copied} />
                      </div>
                    ))}
                  </dl>
                  <a className="bk2-bank__proof" href={proof} target="_blank" rel="noopener noreferrer">
                    <WaIcon size={16} /> {b.cost.bank.proof}
                  </a>
                  <p className="bk2-bank__abroad">{b.cost.bank.abroad}</p>
                  <div className="bk2-remit">
                    {site.remit.map((r) => (
                      <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer">
                        {r.name}
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 16L16 8M9.5 8H16v6.5" />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <p className="bk2-bank__abroad">{b.cost.bank.abroadCard}</p>
                </div>
                </div>
                <p className="mc-note">{b.cost.payFirst}</p>
                {ext && <p className="mc-note">{b.cost.cancel}</p>}
              </div>

              <div className="mc-foot">
                <a className="btn btn--wa" href={waLink("")} target="_blank" rel="noopener">
                  <WaIcon /> WhatsApp {site.phones[0]}
                </a>
                <Link className="mc-new" href={`/${lang}/agendar`}>
                  {k.newBooking} →
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
