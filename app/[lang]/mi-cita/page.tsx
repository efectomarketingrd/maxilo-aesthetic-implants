import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CopyBtn from "@/components/CopyBtn";
import AddCal from "@/components/AddCal";
import { citaEvent, googleCalHref } from "@/lib/cita-cal";
import { WaIcon } from "@/components/Icons";
import { dictionaries } from "@/lib/content";
import { rd, usd, formatTime } from "@/lib/agenda";
import { readCita } from "@/lib/cita";
import { centers, intlLocale, site, waLink, xrayCenters, type Locale } from "@/lib/site";

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
  const code = (await searchParams).c ?? "";
  const raw = readCita(code);
  // los textos se reconstruyen con el diccionario del idioma
  const c = raw
    ? (() => {
        const svc = b.services[raw.sv]?.name ?? "";
        const ctr = centers.find((x) => x.id === raw.pl);
        return {
          ...raw,
          s: [svc, raw.sub].filter(Boolean).join(" — "),
          p: raw.m === "online" || !ctr ? b.modes.online : `${ctr.name} · ${ctr.town}`,
          h: raw.hm ? formatTime(raw.hm, lang) : raw.x ? b.timeTbd : "",
        };
      })()
    : null;

  const [y, mo, d] = (c?.d ?? "2000-01-01").split("-").map(Number);
  const dateLabel = new Date(Date.UTC(y, mo - 1, d, 12)).toLocaleDateString(intlLocale(lang), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Calendario: solo en el enlace de la confirmación (no tiene sentido guardar una cita aún por confirmar)
  const ok = c?.ok === 1;
  const ev = c && ok ? citaEvent(c, lang, `${site.url}/c/${code}`) : null;

  const ext = c?.x === 1;
  const ctr = c ? centers.find((x) => x.id === c.pl) : undefined;
  const isMain = !!ctr && ctr.main && c?.m === "presencial";
  const loc = intlLocale(lang);
  const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  const dd = new Date(Date.UTC(y, mo - 1, d, 12));
  const weekday = cap(dd.toLocaleDateString(loc, { weekday: "long", timeZone: "UTC" }));
  const dayLong = dd.toLocaleDateString(loc, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const consultAtCenter = c && c.k === "consulta" && c.m === "presencial" && !ext;
  // el comprobante llega a la clínica: en la versión francesa, en español
  const proofTpl = lang === "fr" ? dictionaries.es.booking.cita.proofMsg : k.proofMsg;
  const proof = waLink(proofTpl.replace("{svc}", c?.s ?? "").replace("{date}", dateLabel));

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
              <p className="mc-intro">{ok ? k.introOk : k.intro}</p>

              {/* Resumen */}
              <div className="mc-card mc-ticket">
                <div className="mc-ticket__top">
                  <span className={`mc-status${ext ? " is-ext" : ""}${ok && !ext ? " is-ok" : ""}`}>
                    <i aria-hidden="true" />
                    {ext ? (ok ? k.statusExtOk : k.statusExt) : ok ? k.statusOk : k.status}
                  </span>
                  <div className="mc-when2">
                    <span className="bk2-addcal__sheet mc-sheet" aria-hidden="true">
                      <span className="bk2-addcal__rings">
                        <i />
                        <i />
                      </span>
                      <span className="bk2-addcal__month">{new Date(Date.UTC(y, mo - 1, d, 12)).toLocaleDateString(intlLocale(lang), { month: "short", timeZone: "UTC" }).replace(".", "")}</span>
                      <strong className="bk2-addcal__day">{d}</strong>
                    </span>
                    <div className="mc-when2__txt">
                      <small>{weekday}</small>
                      <strong>{dayLong}</strong>
                      <span className="mc-time">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="8.5" />
                          <path d="M12 7.5V12l3 2" />
                        </svg>
                        {c.h || b.timeTbd}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="mc-info">
                  <li>
                    <span className="mc-info__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" /></svg>
                    </span>
                    <div>
                      <small>{k.patient}</small>
                      <strong>{c.n}</strong>
                    </div>
                  </li>
                  <li>
                    <span className="mc-info__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M12 3.5l1.9 4.6 4.9.4-3.7 3.2 1.1 4.8L12 14l-4.2 2.5 1.1-4.8-3.7-3.2 4.9-.4z" /></svg>
                    </span>
                    <div>
                      <small>{b.service}</small>
                      <strong>{c.s}</strong>
                      <span>
                        {b.types[c.k]} · {b.modes[c.m]}
                      </span>
                    </div>
                  </li>
                  <li>
                    <span className="mc-info__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M9 4.5v4a3 3 0 0 0 6 0v-4M12 11.5v3.5a4 4 0 0 0 8 0v-1.5" /><circle cx="20" cy="12" r="1.6" /></svg>
                    </span>
                    <div>
                      <small>{k.doctor}</small>
                      <strong>{t.about.doctorName}</strong>
                    </div>
                  </li>
                  <li>
                    <span className="mc-info__ico" aria-hidden="true">
                      {c.m === "online" ? (
                        <svg viewBox="0 0 24 24"><rect x="3" y="6.5" width="12.5" height="11" rx="2.5" /><path d="M15.5 10.5l5-3v9l-5-3" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
                      )}
                    </span>
                    <div>
                      <small>{c.m === "online" ? b.modes.online : b.place}</small>
                      {c.m === "online" ? (
                        <span>{k.online}</span>
                      ) : (
                        <>
                          <strong>{ctr?.name ?? c.p}</strong>
                          <span>{isMain ? `${site.address.street}, ${site.address.locality}` : ctr?.town}</span>
                          {isMain && (
                            <a className="mc-info__link" href={site.maps} target="_blank" rel="noopener noreferrer">
                              {k.directions} →
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                </ul>
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
                {!ok && !ext && <p className="mc-pending">{k.pendingNote}</p>}
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
                  <a className="bk2-bank__proof" href={proof} target="_blank" rel="noopener noreferrer" data-track="proof_whatsapp">
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

              {ev && (
                <AddCal
                  month={new Date(Date.UTC(y, mo - 1, d, 12)).toLocaleDateString(intlLocale(lang), { month: "short", timeZone: "UTC" }).replace(".", "")}
                  day={d}
                  time={c.h}
                  title={k.calT}
                  note={k.calNote}
                  google={googleCalHref(ev)}
                  ics={`/c/${code}/ics`}
                  icsLabel={b.addCalIcs}
                  saved={b.calSaved}
                />
              )}

              <div className="mc-foot">
                <p>{k.newT}</p>
                <Link className="btn btn--line mc-new" href={`/${lang}/agendar`}>
                  {b.cita.newBooking}
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
