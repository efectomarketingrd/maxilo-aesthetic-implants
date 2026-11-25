"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { bookingImg } from "@/lib/images";
import type { Dict } from "@/lib/content";
import { agenda, formatTime, isOpenDay, rd, slotsFor, toKey, usd, type SlotType } from "@/lib/agenda";
import { centers, intlLocale, site, waLink, xrayCenters, type Locale } from "@/lib/site";
import { Arrow, Chevron, Lock, Mail, WaIcon } from "./Icons";
import CopyBtn from "./CopyBtn";
import { citaUrl, type Cita } from "@/lib/cita";
import { getOrigin, track } from "@/lib/track";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

type Step = 0 | 1 | 2 | 3;

// Horas que se ofrecen cuando el paciente pide otro día u horario:
// de 3:00 a 5:00 p. m., cada media hora
const halfHours = (from: number, to: number) =>
  Array.from({ length: (to - from) * 2 + 1 }, (_, i) => {
    const m = from * 60 + i * 30;
    return `${String(Math.floor(m / 60)).padStart(2, "0")}:${m % 60 ? "30" : "00"}`;
  });
const SPECIAL_HOURS = halfHours(15, 17).filter(
  (h) => !agenda.slots.some((s) => !s.alt && s.time === h), // nunca dentro del horario normal
);

// Monto en pesos con su equivalente aproximado en dólares debajo
function Amt({ n, plus }: { n: number; plus?: boolean }) {
  return (
    <span className="amt">
      {plus ? "+ " : ""}
      {rd(n)}
      <small>≈ {usd(n)}</small>
    </span>
  );
}

// Interruptor de dos opciones con píldora que se desliza
function Seg<T extends string>({
  label,
  options,
  value,
  onChange,
  names,
  locked,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  names: Record<T, string>;
  locked?: T[];
}) {
  const pos = options.indexOf(value);
  return (
    <div className="bk2-seg" role="radiogroup" aria-label={label} style={{ "--pos": pos } as React.CSSProperties}>
      <span className="bk2-seg__pill" aria-hidden="true" />
      {options.map((o) => (
        <button
          type="button"
          role="radio"
          aria-checked={value === o}
          key={o}
          className={value === o ? "is-on" : ""}
          disabled={locked?.includes(o)}
          onClick={() => onChange(o)}
        >
          {names[o]}
        </button>
      ))}
    </div>
  );
}

// msgT: textos del mensaje que recibe la clínica. En la versión francesa llega en español (la clínica no lee francés),
// igual que en la web del spa; el paciente sigue viendo todo en francés y su enlace «Mi cita» abre en francés.
export default function BookingWizard({ t, lang, msgT }: { t: Dict; lang: Locale; msgT?: Dict }) {
  const b = t.booking;
  const mb = (msgT ?? t).booking;
  const mLang: Locale = msgT ? "es" : lang;
  // traducción de las opciones elegidas (texto del paciente → español) recorriendo los dos diccionarios en paralelo
  const toMsg = useMemo(() => {
    const map = new Map<string, string>();
    const walk = (x: unknown, y: unknown) => {
      if (typeof x === "string" && typeof y === "string") map.set(x, y);
      else if (Array.isArray(x) && Array.isArray(y)) x.forEach((v, i) => walk(v, y[i]));
      else if (x && y && typeof x === "object" && typeof y === "object") for (const k of Object.keys(x)) walk((x as Record<string, unknown>)[k], (y as Record<string, unknown>)[k]);
    };
    if (msgT) {
      walk(t.booking, msgT.booking);
      walk(t.services, msgT.services);
    }
    return (v: string) => (msgT ? (map.get(v) ?? v) : v);
  }, [t, msgT]);
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.minDaysAhead), [today]);
  const maxDate = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.maxDaysAhead), [today]);

  const [step, setStep] = useState<Step>(0);
  const honey = useRef<HTMLInputElement>(null);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [reached, setReached] = useState<Step>(0);
  const [nudge, setNudge] = useState(0);

  const [service, setService] = useState<string | null>(null);
  const [subs, setSubs] = useState<string[]>([]);
  const [molars, setMolars] = useState<string | null>(null);
  const [prp, setPrp] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]); // rellenos
  const [ears, setEars] = useState<string | null>(null); // lobuloplastia
  const [fren, setFren] = useState<string[]>([]); // frenilectomía: labial superior, inferior y/o lingual (o "no lo sé")
  const [warts, setWarts] = useState<string | null>(null); // verrugas
  const [cols, setCols] = useState(2);

  // Columnas de la cuadrícula de servicios (para abrir el panel justo debajo de la fila elegida)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 720px)");
    const set = () => setCols(mq.matches ? 3 : 2);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const [type, setType] = useState<SlotType>("consulta");
  const [mode, setMode] = useState<"presencial" | "online">("presencial");
  const effMode = type === "procedimiento" ? "presencial" : mode;
  // Lugar: centro principal (agenda propia) u otro centro (por cita: se elige el día y se confirma la hora)
  const [place, setPlace] = useState<string>("maxilo");
  const ext = effMode === "presencial" && place !== "maxilo";
  const center = centers.find((c) => c.id === place) ?? centers[0];
  const [cursor, setCursor] = useState(() => new Date(minDate.getFullYear(), minDate.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [special, setSpecial] = useState(false);
  const [specialTime, setSpecialTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", country: "", notes: "" });

  const top = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Al cambiar de paso, llevar la vista al inicio de la agenda
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const locale = intlLocale(lang);
  const monthLabel = cursor.toLocaleDateString(locale, { month: "long", year: "numeric" });

  // Calendario: semana empieza en lunes
  const cells = useMemo(() => {
    const f = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = (f.getDay() + 6) % 7;
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (out.length % 7) out.push(null);
    return out;
  }, [cursor]);

  // Procedimientos: una semana de anticipación, salvo que marque "otro día u horario" (sujeto a confirmación)
  const procMin = new Date(today.getFullYear(), today.getMonth(), today.getDate() + agenda.procMinDaysAhead);
  const firstDate = type === "procedimiento" && !special ? procMin : minDate;
  const inRange = (d: Date) => d >= firstDate && d <= maxDate;
  // Citas para hoy: solo las horas que aún no han pasado (con un margen de agenda.todayLeadMinutes)
  const isToday = (d: Date) => toKey(d) === toKey(today);
  const notPast = (d: Date, hhmm: string) => {
    if (!isToday(d)) return true;
    const [h, m] = hhmm.split(":").map(Number);
    const now = new Date();
    return h * 60 + m >= now.getHours() * 60 + now.getMinutes() + agenda.todayLeadMinutes;
  };
  const selectable = (d: Date) => {
    if (!inRange(d)) return false;
    if (agenda.closedDates.includes(toKey(d))) return false;
    if (ext) return d.getDay() !== 0;
    if (special) return d.getDay() !== 0 && (!isToday(d) || SPECIAL_HOURS.some((h) => notPast(d, h)));
    return isOpenDay(d) && (!isToday(d) || slotsFor(d).some((s) => s.type === type && notPast(d, s.time)));
  };

  const canPrev = new Date(cursor.getFullYear(), cursor.getMonth(), 0) >= firstDate;

  // Si cambia el tipo de cita y la fecha elegida queda fuera de rango, se borra y el calendario salta al primer mes válido
  const firstKey = toKey(firstDate);
  useEffect(() => {
    if (date && date < firstDate) {
      setDate(null);
      setTime(null);
    }
    const lastOfCursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    if (lastOfCursor < firstDate) setCursor(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstKey]);
  const canNext = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1) <= maxDate;

  const daySlots = date && !special && !ext ? slotsFor(date).filter((s) => s.type === type && notPast(date, s.time)) : [];
  const weekHeads = [1, 2, 3, 4, 5, 6, 0].map((i) => b.days[i]);

  const svcName = b.services.find((s) => s.id === service)?.name ?? "";

  // Opciones dentro de cada servicio (tomadas de las páginas de servicios)
  const procs = (slug: string) => t.services.items.find((x) => x.slug === slug)?.procedures.map((p) => p.name) ?? [];
  const subOptions: Record<string, string[]> = {
    implantes: b.implantNeeds,
    paquete: b.implantNeeds,
    // las dos frenilectomías se agendan como una sola opción y luego se elige el frenillo
    "cirugia-oral": [...procs("implantes-cirugia-oral").slice(1, 3), b.frenChip, ...procs("implantes-cirugia-oral").slice(5)],
    "estetica-facial": procs("cirugia-estetica-facial"),
    "medicina-estetica": procs("medicina-estetica"),
    reconstructiva: procs("cirugia-reconstructiva"),
  };
  const subList = service ? [...(subOptions[service] ?? []), b.unsure] : [];
  // Extracción de cordales: el paciente indica cuántas
  const molarOpt = procs("implantes-cirugia-oral")[1] ?? "";
  // Frenilectomía (una sola opción): labial superior / inferior (RD$15,000 c/u) y/o lingual (RD$25,000), o "no lo sé"
  const frenLabOpt = procs("implantes-cirugia-oral")[3] ?? "";
  const frenLingOpt = procs("implantes-cirugia-oral")[4] ?? "";
  const needFren = service === "cirugia-oral" && subs.includes(b.frenChip);
  const frenKnown = needFren && fren.length > 0 && !fren.includes(b.frenUnsure);
  const frenN = frenKnown ? fren.filter((x) => x === b.frenOpts[0] || x === b.frenOpts[1]).length : 0;
  const hasFrenLing = frenKnown && fren.includes(b.frenOpts[2]);
  const needMolars = service === "cirugia-oral" && subs.includes(molarOpt);
  const molarText = molars ? (molars === "?" ? b.molarsTbd : `${molars} ${molars === "1" ? b.molarsOne : b.molarsMany}`) : "";
  // PRP: 1 sesión o paquete de 3
  const prpOpt = procs("medicina-estetica").find((x) => x.includes("PRP")) ?? ""; // PRP capilar (el primero)
  const needPrp = service === "medicina-estetica" && subs.includes(prpOpt);
  const prpPlan = agenda.prpPlans.find((x) => x.id === prp);
  const prpName = prpPlan ? b.prpPlans[prpPlan.id as keyof typeof b.prpPlans] : null;
  const prpText = prpName ? `${prpName.name}: ${prpName.note}` : "";
  // Medicina estética y cirugía estética: tratamientos con precio (por posición en la lista)
  const med = procs("medicina-estetica");
  const est = procs("cirugia-estetica-facial");
  const fillerOpt = med[2] ?? "";
  const prpFacialOpt = med[5] ?? "";
  const liftOpt = med[6] ?? "";
  const bioOpt = med[7] ?? "";
  const lobuleOpt = est[6] ?? "";
  const wartOpt = est[7] ?? "";
  // El costo de la consulta se descuenta solo en tratamientos que pueden hacerse el mismo día:
  // medicina estética, los procedimientos menores de estética facial (lobuloplastia, verrugas) y la extracción de cordales.
  // No aplica a implantes, cirugía oral, cirugías estéticas, reconstructiva ni paquete (requieren estudios y planificación).
  const sameDay =
    (service === "medicina-estetica" && subs.some((x) => med.includes(x))) ||
    (service === "estetica-facial" && subs.some((x) => x === lobuleOpt || x === wartOpt)) ||
    (service === "cirugia-oral" && subs.some((x) => x === molarOpt || x === b.frenChip)); // cordales y frenillos: confirmados por la doctora
  // en cirugía oral, si solo se eligen frenillos no se pide radiografía
  const onlyFren = service === "cirugia-oral" && subs.length > 0 && subs.every((x) => x === b.frenChip);
  const xray = ["implantes", "cirugia-oral", "reconstructiva", "paquete"].includes(service ?? "") && !onlyFren;
  // implantes, cordales y lesiones de la boca: radiografía panorámica (indicación de la doctora)
  const pano = ["implantes", "cirugia-oral", "paquete"].includes(service ?? "") && !onlyFren;
  const inMed = service === "medicina-estetica";
  const inEst = service === "estetica-facial";
  const needAreas = inMed && subs.includes(fillerOpt);
  const needEars = inEst && subs.includes(lobuleOpt);
  const needWarts = inEst && subs.includes(wartOpt);
  const countText = (n: string, one: string, many: string) => (n === "?" ? b.molarsTbd : `${n} ${n === "1" ? one : many}`);
  // texto de las opciones elegidas en el idioma indicado (pantalla: idioma del paciente; mensaje: español si es francés)
  const subsWith = (bk: typeof b, tr: (v: string) => string) =>
    subs
      .map((x) => {
        const X = tr(x);
        const cnt = (n: string, one: string, many: string) => (n === "?" ? bk.molarsTbd : `${n} ${n === "1" ? one : many}`);
        if (x === molarOpt && molars) return `${X} (${cnt(molars, bk.molarsOne, bk.molarsMany)})`;
        if (x === prpOpt && prp) {
          const pn = prpPlan ? bk.prpPlans[prpPlan.id as keyof typeof bk.prpPlans] : null;
          return pn ? `${X} (${pn.name}: ${pn.note})` : X;
        }
        if (x === fillerOpt && needAreas && areas.length) return `${X} (${areas.map(tr).join(", ")})`;
        if (x === lobuleOpt && ears) return `${X} (${cnt(ears, bk.earWord, bk.earsWord)})`;
        if (x === b.frenChip && fren.length) return `${X} (${fren.map(tr).join(", ")})`;
        if (x === wartOpt && warts) return `${X} (${cnt(warts, bk.areaWord, bk.areasWord)})`;
        return X;
      })
      .join(", ");
  const subsText = subsWith(b, (v) => v);
  const svcFull = subs.length ? `${svcName} — ${subsText}` : svcName;
  const svcNameM = mb.services.find((x) => x.id === service)?.name ?? "";
  const svcFullM = subs.length ? `${svcNameM} — ${subsWith(mb, toMsg)}` : svcNameM;

  function toggleSub(o: string) {
    setSubs((cur) => {
      if (o === b.unsure) return cur.includes(o) ? [] : [o];
      const rest = cur.filter((x) => x !== b.unsure);
      return rest.includes(o) ? rest.filter((x) => x !== o) : [...rest, o];
    });
  }

  // Si se llega desde la página de un tratamiento (?s=servicio&o=opción), dejarlo ya marcado
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const sId = q.get("s");
    if (!sId || !b.services.some((x) => x.id === sId)) return;
    setService(sId);
    const o = q.get("o");
    if (o && (subOptions[sId] ?? []).includes(o)) setSubs([o]);
    else if (sId === "cirugia-oral" && (o === frenLabOpt || o === frenLingOpt)) {
      setSubs([b.frenChip]);
      if (o === frenLingOpt) setFren([b.frenOpts[2]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickService(id: string) {
    if (id === service) return;
    setService(id);
    setSubs([]);
    setMolars(null);
    setPrp(null);
    setAreas([]);
    setEars(null);
    setFren([]);
    setWarts(null);
  }
  const dateLabel = date ? date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const timeLabel = ext ? (date ? b.timeTbd : "") : special ? (specialTime ? formatTime(specialTime, lang) : "") : time ? formatTime(time, lang) : "";
  const dateLabelM = date ? date.toLocaleDateString(intlLocale(mLang), { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const timeLabelM = ext ? (date ? mb.timeTbd : "") : special ? (specialTime ? formatTime(specialTime, mLang) : "") : time ? formatTime(time, mLang) : "";
  const slotInfo = !special && time ? agenda.slots.find((s) => s.time === time && s.type === type) : undefined;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
  const filled = (Object.keys(form) as (keyof typeof form)[]).every((k) => form[k].trim());
  const okStep = [Boolean(service && subs.length && (!needMolars || molars) && (!needPrp || prp) && (!needAreas || areas.length) && (!needEars || ears) && (!needFren || fren.length) && (!needWarts || warts)), Boolean(date && timeLabel), filled && emailOk, true];

  // Costo estimado
  const isProc = type === "procedimiento";
  const base = isProc ? 0 : agenda.prices[effMode];
  // Tratamientos con precio conocido
  const molarN = needMolars && molars && molars !== "?" ? Number(molars) : 0;
  const molarUnit = molarN === 4 ? agenda.molarPriceAll4 : molarN >= 2 ? agenda.molarPrice23 : agenda.molarPrice;
  const earN = needEars && ears && ears !== "?" ? Number(ears) : 0;
  const wartN = needWarts && warts && warts !== "?" ? Number(warts) : 0;
  const botoxOpt = procs("medicina-estetica")[0] ?? "";
  const hasBotox = service === "medicina-estetica" && subs.includes(botoxOpt);
  const priced: { label: string; detail: string; amount: number }[] = [
    ...(molarN ? [{ label: b.cost.molars, detail: `${molarN} × ${rd(molarUnit)}`, amount: molarN * molarUnit }] : []),
    ...(hasBotox ? [{ label: botoxOpt, detail: b.cost.botoxIncl, amount: agenda.botoxPrice }] : []),
    ...(needAreas && areas.length ? [{ label: fillerOpt, detail: `${areas.length} × ${rd(areas.length > 1 ? agenda.fillerPriceMulti : agenda.fillerPrice)} · ${areas.join(", ")}`, amount: areas.length * (areas.length > 1 ? agenda.fillerPriceMulti : agenda.fillerPrice) }] : []),
    ...(inMed && subs.includes(prpFacialOpt) ? [{ label: prpFacialOpt, detail: `1 × ${rd(agenda.prpFacialPrice)}`, amount: agenda.prpFacialPrice }] : []),
    ...(inMed && subs.includes(liftOpt) ? [{ label: liftOpt, detail: "", amount: agenda.threadLiftPrice }] : []),
    ...(inMed && subs.includes(bioOpt) ? [{ label: bioOpt, detail: "", amount: agenda.threadBioPrice }] : []),
    ...(earN ? [{ label: lobuleOpt, detail: `${earN} × ${rd(agenda.lobulePrice)}`, amount: earN * agenda.lobulePrice }] : []),
    ...(frenN ? [{ label: frenLabOpt, detail: `${frenN} × ${rd(agenda.frenLabPrice)} · ${fren.filter((x) => x !== b.frenOpts[2]).join(", ")}`, amount: frenN * agenda.frenLabPrice }] : []),
    ...(hasFrenLing ? [{ label: frenLingOpt, detail: "", amount: agenda.frenLingPrice }] : []),
    ...(wartN ? [{ label: wartOpt, detail: `${wartN} × ${rd(agenda.wartPrice)}`, amount: wartN * agenda.wartPrice }] : []),
    ...(needPrp && prpPlan ? [{ label: prpOpt, detail: prpPlan.sessions > 1 ? `${prpText} · ${b.cost.prpPaid}` : prpText, amount: prpPlan.price }] : []),
  ];
  const pricedSum = priced.reduce((a, x) => a + x.amount, 0);
  const isPriced = (x: string) =>
    (x === molarOpt && molarN > 0) ||
    (x === botoxOpt && hasBotox) ||
    (x === prpOpt && needPrp && !!prp) ||
    (inMed && x === fillerOpt && areas.length > 0) ||
    (inMed && (x === prpFacialOpt || x === liftOpt || x === bioOpt)) ||
    (x === lobuleOpt && earN > 0) ||
    (x === b.frenChip && frenKnown) ||
    (x === wartOpt && wartN > 0);
  const unpriced = subs.some((x) => x !== b.unsure && !isPriced(x)) || subs.includes(b.unsure);
  const procTbd = isProc && (!priced.length || unpriced);
  const total = isProc ? pricedSum : base;
  const money = (n: number) => `${rd(n)} (≈ ${usd(n)})`;
  const costLine = isProc
    ? priced.length
      ? `${money(total)}${procTbd ? ` ${b.cost.plusTbd}` : ""}`
      : b.cost.toConfirm
    : money(total);
  const costLineM = isProc ? (priced.length ? `${money(total)}${procTbd ? ` ${mb.cost.plusTbd}` : ""}` : mb.cost.toConfirm) : money(total);
  // Planes de PRP (más de 1 sesión): pago completo; lo demás: anticipo del 50%
  const planFull = isProc && needPrp && prpPlan && prpPlan.sessions > 1 ? prpPlan.price : 0;
  const depositBase = pricedSum - planFull;
  // Consulta en otros centros: anticipo del 50% para confirmar (el resto, el día de la cita)
  const extDeposit = ext && !isProc;
  const deposit = isProc && depositBase > 0 ? Math.ceil((depositBase * agenda.procDeposit) / 100) : extDeposit ? Math.ceil(base / 2) : 0;
  const showDeposit = (isProc && (deposit > 0 || procTbd)) || extDeposit;
  const valid = okStep[0] && okStep[1] && okStep[2];

  function go(n: Step) {
    if (n === step) return;
    setDir(n > step ? "fwd" : "back");
    setStep(n);
    setNudge(0);
    if (n > reached) setReached(n);
  }

  function next() {
    if (!okStep[step]) {
      setNudge((k) => k + 1);
      return;
    }
    if (step < 3) go((step + 1) as Step);
  }

  // Enlace personal "Mi cita" (resumen + cómo pagar), para no tener que repetir la reserva al confirmar
  const citaData: Cita | null = date
    ? {
        n: form.name.trim(),
        sv: b.services.findIndex((s) => s.id === service),
        sub: subs.length ? subsText : "",
        d: toKey(date),
        hm: ext ? "" : special ? specialTime : (time ?? ""),
        pl: effMode === "presencial" ? center.id : "o",
        k: isProc ? "procedimiento" : "consulta",
        m: effMode,
        x: extDeposit ? 1 : 0,
        t: isProc && !priced.length ? -1 : total,
        dep: deposit,
        dt: showDeposit && !deposit ? 1 : 0,
        pf: planFull,
        r: pano ? (1 as const) : (0 as const),
      }
    : null;
  const myCita = citaData ? citaUrl(lang, citaData) : "";
  // el enlace de la respuesta de confirmación muestra "Cita confirmada" y los botones del calendario
  const myCitaOk = citaData ? citaUrl(lang, { ...citaData, ok: 1 }) : "";
  const firstName = form.name.trim().split(/\s+/)[0] ?? "";
  const staffReply = () =>
    (extDeposit ? b.cita.replyExt : b.cita.reply)
      .replace("{name}", firstName)
      .replace("{date}", dateLabel)
      .replace("{time}", rawTimeLabel())
      .replace("{url}", myCitaOk);
  function rawTimeLabel() {
    return !ext && timeLabel ? `${b.cita.at}${timeLabel}` : "";
  }

  function message() {
    const lines = [
      mb.msgTitle,
      msgT ? mb.frClient : "",
      "",
      `${mb.service}: ${svcFullM}`,
      `${mb.type}: ${mb.types[type]}`,
      `${mb.mode}: ${mb.modes[effMode]}`,
      effMode === "presencial" ? `${mb.place}: ${center.name} (${center.town})` : "",
      `${mb.date}: ${dateLabelM}`,
      `${mb.time}: ${timeLabelM}${slotInfo?.alt ? ` (${mb.alt})` : ""}`,
      special && !ext ? mb.msgSpecial : "",
      `${mb.cost.msg}: ${costLineM}`,
      planFull ? `${mb.cost.msgPlanFull} (${money(planFull)})` : "",
      showDeposit && !extDeposit ? `${mb.cost.msgDeposit}: ${deposit ? money(deposit) : mb.cost.depositTbd}` : "",
      extDeposit ? `${mb.cost.msgDepositExt}: ${money(deposit)} — ${mb.cost.msgPending}` : "",
      extDeposit ? `${mb.cost.msgRest}: ${money(base - deposit)}` : "",
      ext ? mb.cost.cancel : "",
      myCita ? `${mb.cita.msgLink}: ${myCita}` : "",
      "",
      `${mb.name}: ${form.name.trim()}`,
      `${mb.phone}: ${form.phone.trim()}`,
      form.email.trim() ? `${mb.email}: ${form.email.trim()}` : "",
      form.country.trim() ? `${mb.country}: ${form.country.trim()}` : "",
      form.notes.trim() ? `${mb.notes}: ${form.notes.trim()}` : "",
      getOrigin() ? `${mb.origin}: ${getOrigin()}` : "",
    ];
    return lines.filter((l, i) => l !== "" || (i > 0 && lines[i - 1] !== "")).join("\n").trim();
  }

  // Datos de la cita para el calendario (centro y paciente)
  const rawTime = ext ? "" : special ? specialTime : time ?? "";
  const minutes = isProc ? 60 : 30;
  const placeText = effMode === "presencial" ? `${center.name}, ${center.town}` : mb.modes.online;

  // Aviso al centro: evento "Por confirmar" en su Google Calendar + correo (vía /api/solicitud)
  const lastSent = useRef("");
  function notifyCenter() {
    if (!date) return;
    const data = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: svcFullM,
      place: placeText,
      date: toKey(date),
      time: rawTime,
      minutes,
      dateLabel: dateLabelM,
      message: `${message()}\n\n${mb.cita.replyT}\n${staffReply()}`,
      website: honey.current?.value ?? "",
    };
    const json = JSON.stringify(data);
    if (json === lastSent.current) return;
    lastSent.current = json;
    fetch("/api/solicitud", { method: "POST", headers: { "Content-Type": "application/json" }, body: json, keepalive: true }).catch(() => {});
  }

  function sendWa() {
    if (!valid) return;
    notifyCenter();
    track("booking_whatsapp", { service: svcName });
    window.open(waLink(message()), "_blank", "noopener");
  }

  function sendMail() {
    if (!valid) return;
    notifyCenter();
    track("booking_email", { service: svcName });
    const subject = `${mb.mailSubject} — ${svcNameM} — ${date ? toKey(date) : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
  }

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const titles = [b.step1, b.step2, b.step3, b.step4];

  return (
    <div className="bk2" ref={top} id="reservar">
      {/* Barra de progreso */}
      <ol className="bk2-prog" style={{ "--p": step / 3 } as React.CSSProperties}>
        <span className="bk2-prog__track" aria-hidden="true">
          <span className="bk2-prog__fill" />
        </span>
        {b.stepNames.map((n, i) => {
          const state = i === step ? "is-now" : i < step || i <= reached ? "is-done" : "";
          const canJump = i <= reached && i !== step;
          return (
            <li key={n} className={state}>
              <button type="button" disabled={!canJump} onClick={() => go(i as Step)} aria-current={i === step ? "step" : undefined}>
                <span className="bk2-prog__dot">
                  <span className="bk2-prog__num">{i + 1}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                  </svg>
                </span>
                <span className="bk2-prog__name">{n}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="bk2-card">
        <div key={step} className={`bk2-panel bk2-panel--${dir}`}>
          <p className="bk2-kicker">{b.stepOf.replace("{n}", String(step + 1))}</p>
          <h2 className="bk2-title">{titles[step]}</h2>

          {/* PASO 1 · SERVICIO */}
          {step === 0 && (
            <>
              <p className="bk2-help">{b.step1Text}</p>
              <div className="bk2-svc" role="radiogroup" aria-label={b.step1}>
                {b.services.map((s, i) => {
                  const on = service === s.id;
                  const tile = (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={on}
                      key={s.id}
                      className={`bk2-svc__item ${on ? "is-on" : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                      onClick={() => pickService(s.id)}
                    >
                      <span className="bk2-svc__img">
                        <Image src={bookingImg[s.id]} alt="" fill sizes="(min-width: 900px) 260px, 45vw" />
                      </span>
                      <span className="bk2-svc__name">{s.name}</span>
                      <span className="bk2-svc__tick" aria-hidden="true">
                        <svg viewBox="0 0 20 20">
                          <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                        </svg>
                      </span>
                    </button>
                  );
                  const sel = b.services.findIndex((x) => x.id === service);
                  const after = sel < 0 ? -1 : Math.min(b.services.length - 1, Math.floor(sel / cols) * cols + cols - 1);
                  return (
                    <Fragment key={s.id}>
                      {tile}
                      {i === after && (
                        <div className="bk2-sub" key={`sub-${service}`} style={{ "--col": sel % cols, "--cols": cols } as React.CSSProperties}>
                          <span className="bk2-sub__caret" aria-hidden="true" />
                          <p className="bk2-sub__title">
                            {b.subTitle} <span>{b.subHint}</span>
                          </p>
                          <div className="bk2-sub__chips" role="group" aria-label={b.subTitle}>
                            {subList.map((o, k) => {
                              const on = subs.includes(o);
                              return (
                                <button
                                  type="button"
                                  key={o}
                                  aria-pressed={on}
                                  className={`bk2-chip ${on ? "is-on" : ""} ${o === b.unsure ? "bk2-chip--unsure" : ""}`}
                                  style={{ "--k": k } as React.CSSProperties}
                                  onClick={() => toggleSub(o)}
                                >
                                  <span className="bk2-chip__box" aria-hidden="true">
                                    <svg viewBox="0 0 20 20">
                                      <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                                    </svg>
                                  </span>
                                  {o}
                                </button>
                              );
                            })}
                          </div>
                          {needMolars && (
                            <div className="bk2-molars">
                              <p>{b.molarsQ}</p>
                              <div role="radiogroup" aria-label={b.molarsQ}>
                                {["1", "2", "3", "4", "?"].map((n, k) => (
                                  <button
                                    type="button"
                                    role="radio"
                                    aria-checked={molars === n}
                                    key={n}
                                    className={`${molars === n ? "is-on" : ""} ${n === "?" ? "is-wide" : ""}`}
                                    style={{ "--k": k } as React.CSSProperties}
                                    onClick={() => setMolars(n)}
                                  >
                                    {n === "?" ? b.molarsUnsure : n}
                                  </button>
                                ))}
                              </div>
                              <p className="bk2-molars__price">
                                {b.molarsPrices}
                              </p>
                            </div>
                          )}
                          {needPrp && (
                            <div className="bk2-plan">
                              <p>{b.prpQ}</p>
                              <div role="radiogroup" aria-label={b.prpQ}>
                                {agenda.prpPlans.map((pl, k) => {
                                  const nm = b.prpPlans[pl.id as keyof typeof b.prpPlans];
                                  const save = agenda.prpPrice * pl.sessions - pl.price;
                                  return (
                                    <button
                                      type="button"
                                      role="radio"
                                      aria-checked={prp === pl.id}
                                      key={pl.id}
                                      className={`${prp === pl.id ? "is-on" : ""} ${pl.id === "1y" ? "is-best" : ""}`}
                                      style={{ "--k": k } as React.CSSProperties}
                                      onClick={() => setPrp(pl.id)}
                                    >
                                      {pl.id === "1y" ? (
                                        <span className="bk2-plan__save">{b.prpBest}</span>
                                      ) : (
                                        save > 0 && (
                                          <span className="bk2-plan__save bk2-plan__save--soft">
                                            {b.prpSave} {rd(save)}
                                          </span>
                                        )
                                      )}
                                      <strong>{nm.name}</strong>
                                      <span className="bk2-plan__price">{rd(pl.price)}</span>
                                      <small>{nm.note}</small>
                                      {pl.id === "1y" && save > 0 && (
                                        <small className="bk2-plan__savetxt">
                                          {b.prpSave} {rd(save)}
                                        </small>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="bk2-plan__note">{b.prpPayNote}</p>
                            </div>
                          )}
                          {needAreas && (
                            <div className="bk2-plan bk2-areas">
                              <p>{b.fillerQ}</p>
                              <div className="bk2-sub__chips" role="group" aria-label={b.fillerQ}>
                                {b.fillerAreas.map((a, k) => {
                                  const on = areas.includes(a);
                                  return (
                                    <button
                                      type="button"
                                      key={a}
                                      aria-pressed={on}
                                      className={`bk2-chip ${on ? "is-on" : ""}`}
                                      style={{ "--k": k } as React.CSSProperties}
                                      onClick={() => setAreas((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]))}
                                    >
                                      <span className="bk2-chip__box" aria-hidden="true">
                                        <svg viewBox="0 0 20 20">
                                          <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                                        </svg>
                                      </span>
                                      {a}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="bk2-plan__note">{b.fillerInfo}</p>
                            </div>
                          )}
                          {[
                            { on: needEars, q: b.lobuleQ, info: b.lobuleInfo, val: ears, set: setEars, opts: ["1", "2"] },
                            { on: needWarts, q: b.wartQ, info: b.wartInfo, val: warts, set: setWarts, opts: ["1", "2", "3", "4", "?"] },
                          ]
                            .filter((x) => x.on)
                            .map((x) => (
                              <div className="bk2-molars" key={x.q}>
                                <p>{x.q}</p>
                                <div role="radiogroup" aria-label={x.q}>
                                  {x.opts.map((n, k) => (
                                    <button
                                      type="button"
                                      role="radio"
                                      aria-checked={x.val === n}
                                      key={n}
                                      className={`${x.val === n ? "is-on" : ""} ${n === "?" || n.length > 2 ? "is-wide" : ""}`}
                                      style={{ "--k": k } as React.CSSProperties}
                                      onClick={() => x.set(n)}
                                    >
                                      {n === "?" ? b.countUnsure : n}
                                    </button>
                                  ))}
                                </div>
                                <p className="bk2-molars__price">{x.info}</p>
                              </div>
                            ))}
                          {needFren && (
                            <div className="bk2-plan bk2-areas">
                              <p>{b.frenQ}</p>
                              <div className="bk2-sub__chips" role="group" aria-label={b.frenQ}>
                                {[...b.frenOpts, b.frenUnsure].map((a, k) => {
                                  const on = fren.includes(a);
                                  return (
                                    <button
                                      type="button"
                                      key={a}
                                      aria-pressed={on}
                                      className={`bk2-chip ${on ? "is-on" : ""}`}
                                      style={{ "--k": k } as React.CSSProperties}
                                      onClick={() =>
                                        setFren((cur) =>
                                          a === b.frenUnsure
                                            ? cur.includes(a) ? [] : [a]
                                            : cur.includes(a) ? cur.filter((x) => x !== a) : [...cur.filter((x) => x !== b.frenUnsure), a],
                                        )
                                      }
                                    >
                                      <span className="bk2-chip__box" aria-hidden="true">
                                        <svg viewBox="0 0 20 20">
                                          <path d="M5 10.5l3.2 3.2L15 7" pathLength={1} />
                                        </svg>
                                      </span>
                                      {a}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="bk2-plan__note">{b.frenInfo}</p>
                            </div>
                          )}
                          {hasBotox && (
                            <p className="bk2-pricenote">
                              <strong>
                                {botoxOpt}: {rd(agenda.botoxPrice)}
                              </strong>
                              {" · "}
                              {b.botoxInfo}
                            </p>
                          )}
                          {type === "consulta" && priced.length > 0 && (
                            <div className="bk2-tip" role="note">
                              <p>{b.procTip}</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setType("procedimiento");
                                  setTime(null);
                                }}
                              >
                                {b.procTipBtn} <Arrow size={13} />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>

              <div className="bk2-opts">
                <div>
                  <p className="bk2-label">{b.typeLabel}</p>
                  <Seg
                    label={b.typeLabel}
                    options={["consulta", "procedimiento"] as const}
                    value={type}
                    names={b.types}
                    onChange={(v) => {
                      setType(v);
                      setTime(null);
                    }}
                  />
                  <p className="bk2-help bk2-help--sm" key={type}>{b.typeHelp[type]}</p>
                </div>
                <div>
                  <p className="bk2-label">{b.modeLabel}</p>
                  <Seg
                    label={b.modeLabel}
                    options={["presencial", "online"] as const}
                    value={effMode}
                    names={b.modes}
                    locked={type === "procedimiento" ? ["online"] : []}
                    onChange={setMode}
                  />
                  <p className="bk2-help bk2-help--sm" key={effMode + type}>
                    {type === "procedimiento" ? b.modeOnlyPresencial : b.modeHelp[effMode]}
                  </p>
                  {effMode === "presencial" && (
                    <div className="bk2-place bk2-in" role="radiogroup" aria-label={b.placeLabel}>
                      <p className="bk2-label">{b.placeLabel}</p>
                      <div className="bk2-place__list">
                        {centers.map((c, i) => (
                          <button
                            type="button"
                            role="radio"
                            key={c.id}
                            aria-checked={place === c.id}
                            style={{ "--i": i } as React.CSSProperties}
                            className={`bk2-place__opt ${place === c.id ? "is-on" : ""}`}
                            onClick={() => {
                              if (c.id === place) return;
                              setPlace(c.id);
                              setDate(null);
                              setTime(null);
                              setSpecial(false);
                            }}
                          >
                            <span className="bk2-place__pin" aria-hidden="true">
                              <svg viewBox="0 0 24 24">
                                <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
                                <circle cx="12" cy="10" r="2.4" />
                              </svg>
                            </span>
                            <span className="bk2-place__txt">
                              <strong>{c.name}</strong>
                              <small>
                                {c.town}
                                {c.main && <em>{b.placeMain}</em>}
                              </small>
                            </span>
                          </button>
                        ))}
                      </div>
                      {ext && (
                        <p className="bk2-help bk2-help--sm" key={`x-${place}-${type}`}>
                          {type === "procedimiento" ? `${b.placeExt} ${b.placeProc}` : b.placeExt}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="bk2-price" key={`p-${effMode}-${type}`}>
                    <span>{isProc ? b.cost.proc : b.cost.consult[effMode]}</span>
                    <strong>{isProc ? b.cost.toConfirm : money(base)}</strong>
                  </p>
                </div>
              </div>

              {/* Implantes, cordales y lesiones de la boca: radiografía panorámica, dónde hacérsela y envío por WhatsApp */}
              {pano ? (
                <div className="bk2-pano" key="pano">
                  <div className="bk2-pano__head">
                    <span className="bk2-pano__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18v12H3z" />
                        <path d="M6 12c1.5-2.5 3-3 4-1.5s1.5 1.5 2 0 2.5-1 3 .5 1.5 2 3 0" />
                        <path d="M7.5 15h1.5M11 15h2M15 15h1.5" />
                      </svg>
                    </span>
                    <strong>{b.pano.title}</strong>
                  </div>
                  <p>{b.pano.text}</p>
                  {xrayCenters.length > 0 && (
                    <div className="bk2-pano__where">
                      <p className="bk2-pano__label">{b.pano.where}</p>
                      <ul>
                        {xrayCenters.map((x) => (
                          <li key={x.name}>
                            <strong>{x.name}</strong>
                            <small>{x.area}</small>
                            <span className="bk2-pano__links">
                              {x.phone && <a href={`tel:+1${x.phone.replace(/\D/g, "")}`}>{x.phone}</a>}
                              {x.wa && (
                                <a href={`https://wa.me/${x.wa}`} target="_blank" rel="noopener">
                                  WhatsApp
                                </a>
                              )}
                              {x.email && <a href={`mailto:${x.email}`}>{x.email}</a>}
                              {x.maps && (
                                <a href={x.maps} target="_blank" rel="noopener">
                                  {b.pano.map}
                                </a>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
              <div className={`bk2-note${xray ? " bk2-note--xray" : ""}`} key={xray ? "x" : "n"}>
                <svg className="bk2-note__ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v5h5M10 13h6M10 17h4" />
                </svg>
                <span>{xray ? b.noteXray : b.note}</span>
              </div>
              )}
            </>
          )}

          {/* PASO 2 · DÍA Y HORA */}
          {step === 1 && (
            <div className="bk2-when">
              <div className="cal bk2-cal">
                <div className="cal__head">
                  <span className="cal__month">{monthLabel}</span>
                  <div>
                    <button type="button" aria-label="‹" disabled={!canPrev} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
                      <Chevron dir="left" />
                    </button>
                    <button type="button" aria-label="›" disabled={!canNext} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
                      <Chevron />
                    </button>
                  </div>
                </div>
                <div className="cal__grid" key={toKey(cursor)}>
                  {weekHeads.map((d) => (
                    <span className="cal__dow" key={d}>{d}</span>
                  ))}
                  {cells.map((d, i) =>
                    d ? (
                      <button
                        type="button"
                        key={i}
                        disabled={!selectable(d)}
                        style={{ "--c": i } as React.CSSProperties}
                        className={`cal__day ${date && toKey(d) === toKey(date) ? "is-on" : ""} ${selectable(d) ? "is-open" : ""}`}
                        onClick={() => {
                          setDate(d);
                          setTime(null);
                        }}
                        aria-label={d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
                      >
                        {d.getDate()}
                      </button>
                    ) : (
                      <span key={i} />
                    ),
                  )}
                </div>
                <div className="cal__legend">
                  <span><i className="dot dot--open" /> {b.legendOpen}</span>
                  <span><i className="dot dot--closed" /> {b.legendClosed}</span>
                </div>
              </div>

              <div className="bk2-times">
                {!date ? (
                  <p className="bk2-help bk2-times__empty">{b.pickDay}</p>
                ) : ext ? (
                  <div className="bk2-in bk2-ext" key={`ext-${toKey(date)}`}>
                    <p className="times__title">
                      {center.name} · {date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    <p className="bk2-help">{b.extTime}</p>
                  </div>
                ) : special ? (
                  <div className="bk2-in" key="special">
                    <p className="times__title">{b.specialTime}</p>
                    <div className="times__grid bk2-hours">
                      {SPECIAL_HOURS.filter((h) => notPast(date, h)).map((h, i) => (
                        <button
                          type="button"
                          key={h}
                          style={{ "--i": i } as React.CSSProperties}
                          className={`time ${specialTime === h ? "is-on" : ""}`}
                          onClick={() => setSpecialTime(h)}
                          aria-pressed={specialTime === h}
                        >
                          {formatTime(h, lang)}
                        </button>
                      ))}
                    </div>
                    <p className="bk2-help bk2-help--sm">{b.specialNote}</p>
                  </div>
                ) : (
                  <div key={toKey(date)} className="bk2-in">
                    <p className="times__title">
                      {b.available} {date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    {daySlots.length ? (
                      <div className="times__grid">
                        {daySlots.map((s, i) => (
                          <button
                            type="button"
                            key={s.time}
                            style={{ "--i": i } as React.CSSProperties}
                            className={`time ${time === s.time ? "is-on" : ""} ${s.alt ? "time--alt" : ""}`}
                            onClick={() => setTime(s.time)}
                            aria-pressed={time === s.time}
                          >
                            {formatTime(s.time, lang)}
                            {(s.alt || s.oneSpot) && <small>{s.alt ? b.alt : b.oneSpot}</small>}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="bk2-help">{b.noSlots}</p>
                    )}
                  </div>
                )}

                {type === "procedimiento" && <p className="bk2-procweek">{b.procWeek}</p>}

                {!ext && <label className={`special bk2-special ${special ? "is-on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={special}
                    onChange={(e) => {
                      setSpecial(e.target.checked);
                      setTime(null);
                      if (!e.target.checked && date && !isOpenDay(date)) setDate(null);
                    }}
                  />
                  <span>
                    <strong>{b.special}</strong>
                    {b.specialWhy}
                  </span>
                </label>}
              </div>
            </div>
          )}

          {/* PASO 3 · DATOS */}
          {step === 2 && (
            <div className="fields bk2-fields">
              {(
                [
                  { k: "name", label: b.name, auto: "name" },
                  { k: "phone", label: b.phone, auto: "tel", type: "tel" },
                  { k: "email", label: b.email, auto: "email", type: "email" },
                  { k: "country", label: b.country, auto: "country-name" },
                  { k: "notes", label: b.notes, area: true },
                ] as { k: keyof typeof form; label: string; auto?: string; type?: string; area?: boolean }[]
              ).map((f, i) => {
                const bad = nudge > 0 && (!form[f.k].trim() || (f.k === "email" && !emailOk));
                return (
                  <label key={f.k} className={`field ${f.area ? "field--full" : ""} ${bad ? "is-err" : ""}`} style={{ "--i": i } as React.CSSProperties}>
                    <span>{f.label} *</span>
                    {f.area ? (
                      <textarea value={form[f.k]} onChange={upd(f.k)} rows={3} required />
                    ) : (
                      <input value={form[f.k]} onChange={upd(f.k)} type={f.type ?? "text"} inputMode={f.type === "tel" ? "tel" : undefined} autoComplete={f.auto} required />
                    )}
                    {bad && f.k === "email" && form.email.trim() && <small className="field__err">{b.badEmail}</small>}
                  </label>
                );
              })}
              <p className="bk2-secure" style={{ "--i": 5 } as React.CSSProperties}>
                <Lock /> {b.secure}
              </p>
            </div>
          )}

          {/* PASO 4 · CONFIRMAR */}
          {step === 3 && (
            <div className="bk2-done">
              <p className="bk2-help">{b.step4Text}</p>
              <div className="bk2-ticket">
                <span className="bk2-ticket__seal" aria-hidden="true">
                  <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="23" pathLength={1} />
                    <path d="M16 27l7 7 13-15" pathLength={1} />
                  </svg>
                </span>
                <dl>
                  {[
                    { k: b.service, v: svcFull, to: 0 as Step },
                    { k: b.type, v: `${b.types[type]} · ${b.modes[effMode]}`, to: 0 as Step },
                    ...(effMode === "presencial" ? [{ k: b.place, v: `${center.name} · ${center.town}`, to: 0 as Step }] : []),
                    { k: b.date, v: dateLabel, to: 1 as Step, cls: "summary__date" },
                    {
                      k: b.time,
                      v: `${timeLabel}${slotInfo?.alt ? ` · ${b.alt}` : ""}${special && !ext && timeLabel ? ` · ${b.alt}` : ""}`,
                      to: 1 as Step,
                    },
                    { k: b.name, v: `${form.name.trim()} · ${form.phone.trim()}`, to: 2 as Step },
                  ].map((r, i) => (
                    <div key={r.k} style={{ "--i": i } as React.CSSProperties}>
                      <dt>{r.k}</dt>
                      <dd className={r.cls}>{r.v}</dd>
                      <button type="button" className="bk2-edit" onClick={() => go(r.to)}>
                        {b.edit}
                      </button>
                    </div>
                  ))}
                </dl>
              </div>
              {pano && (
                <div className="bk2-remind" role="note">
                  <span className="bk2-remind__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z M10 20.5a2 2 0 0 0 4 0" />
                    </svg>
                  </span>
                  <span>
                    <strong>{b.pano.reminderT}</strong>
                    {b.pano.reminder}
                    {xrayCenters.length > 0 && (
                      <small className="bk2-remind__where">
                        {b.pano.where}: {xrayCenters.map((x) => `${x.name} (${x.area})`).join(" · ")}
                      </small>
                    )}
                  </span>
                </div>
              )}

              <div className="bk2-cost">
                <p className="bk2-cost__title">{b.cost.title}</p>
                <ul>
                  {!isProc && (
                    <li style={{ "--i": 0 } as React.CSSProperties}>
                      <span>{b.cost.consult[effMode]}</span>
                      <strong><Amt n={base} /></strong>
                    </li>
                  )}
                  {priced.map((x, k) => (
                    <li key={x.label} className={isProc ? "" : "is-ref"} style={{ "--i": 1 + k } as React.CSSProperties}>
                      <span>
                        {x.label}
                        <small>{x.detail}</small>
                      </span>
                      <strong><Amt n={x.amount} /></strong>
                    </li>
                  ))}
                  {procTbd && (
                    <li style={{ "--i": 2 } as React.CSSProperties}>
                      <span>{priced.length ? b.cost.others : b.cost.proc}</span>
                      <strong>{b.cost.toConfirm}</strong>
                    </li>
                  )}
                </ul>
                {!isProc && effMode === "presencial" && sameDay && <p className="bk2-cost__credit">{b.cost.consultCredit}</p>}
                <div className="bk2-cost__total">
                  <span>{b.cost.total}</span>
                  {isProc && !priced.length ? (
                    <strong className="bk2-cost__tbd">{b.cost.toConfirm}</strong>
                  ) : (
                    <strong>
                      {rd(total)} <small>≈ {usd(total)}</small>
                      {procTbd && <em className="bk2-cost__plus">{b.cost.plusTbd}</em>}
                    </strong>
                  )}
                </div>
                {!isProc && priced.length > 0 && <p className="bk2-cost__note">{b.cost.molarsRef}</p>}
                <p className="bk2-cost__note">{procTbd ? `${b.cost.procNote} ${b.cost.note}` : b.cost.note}</p>
                {planFull > 0 && (
                  <div className="bk2-deposit">
                    <div>
                      <span>{b.cost.planFull}</span>
                      <strong><Amt n={planFull} /></strong>
                    </div>
                    <p>{b.cost.planFullWhy}</p>
                  </div>
                )}
                {showDeposit && (
                  <div className="bk2-deposit">
                    <div>
                      <span>
                        {b.cost.deposit}
                        <small>{extDeposit ? b.cost.extDepositPct : b.cost.depositPct}</small>
                      </span>
                      <strong>{deposit ? <Amt n={deposit} /> : b.cost.depositTbd}</strong>
                    </div>
                    <p>{extDeposit ? b.cost.extDepositWhy.replace("{rest}", rd(base - deposit)).replace("{phone}", site.phones[0]) : b.cost.depositWhy}</p>
                    {ext && <p className="bk2-deposit__cancel">{b.cost.cancel}</p>}
                  </div>
                )}
                <div className="bk2-pay">
                  <p className="bk2-cost__title">{b.cost.payTitle}</p>
                  <ul>
                    {b.cost.pay.map((m, i) => (
                      <li key={m.k} className={m.k === "card" ? "is-minor" : ""} style={{ "--i": i } as React.CSSProperties}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          {m.k === "card" && (
                            <>
                              <rect x="3" y="6" width="18" height="13" rx="2.5" />
                              <path d="M3 10h18M7 15h4" />
                            </>
                          )}
                          {m.k === "bank" && <path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />}
                          {m.k === "cash" && (
                            <>
                              <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
                              <circle cx="12" cy="12" r="2.6" />
                              <path d="M6 9.5v5M18 9.5v5" />
                            </>
                          )}
                        </svg>
                        <span>
                          <strong>{m.name}</strong>
                          <small>{m.detail}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {extDeposit && (
                <details className="bk2-bank" open>
                  <summary>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
                    </svg>
                    {b.cost.bank.open}
                  </summary>
                  <div className="bk2-bank__body">
                    <p className="bk2-bank__when">{ext ? b.cost.bankWhenExt.replace("{phone}", site.phones[0]) : b.cost.bank.when}</p>
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
                    <a className="bk2-bank__proof" href={waLink(b.cost.bank.proofMsg)} target="_blank" rel="noopener noreferrer">
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
                </details>
                )}
                <p className="bk2-cost__pay">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 2" />
                  </svg>
                  {b.cost.payFirst}
                </p>
              </div>

              {myCita && (
                <div className={`bk2-mycita${extDeposit ? " is-ext" : ""}`}>
                  <span className="bk2-mycita__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {extDeposit ? <path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" /> : <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2" />}
                    </svg>
                  </span>
                  <div>
                    <strong>{extDeposit ? b.cost.extDepositPct : b.cita.doneT}</strong>
                    <p>{extDeposit ? b.cita.doneExt : b.cita.done}</p>
                  </div>
                </div>
              )}

              <div className="bk2-send">
                <button type="button" className="btn btn--wa btn--block h5-btn-shine" onClick={sendWa}>
                  <WaIcon /> {b.sendWa}
                </button>
                <button type="button" className="btn btn--dark btn--block" onClick={sendMail}>
                  <Mail size={18} /> {b.sendMail}
                </button>
              </div>
              <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="bk2-hp" />
              <p className="bk2-confirm">{b.confirmNote}</p>
            </div>
          )}
        </div>

        {/* Navegación fija abajo */}
        {step < 3 && (
          <div className="bk2-nav">
            {nudge > 0 && !okStep[step] && (
              <p className="bk2-nav__hint" key={nudge} role="alert">
                {b.need[step]}
              </p>
            )}
            <div className="bk2-nav__row">
              {step > 0 && (
                <button type="button" className="bk2-back" onClick={() => go((step - 1) as Step)} aria-label={b.back}>
                  <Chevron dir="left" size={18} />
                </button>
              )}
              <button type="button" className={`btn btn--dark bk2-next h5-btn-shine ${okStep[step] ? "is-ready" : ""}`} onClick={next}>
                {step === 2 ? b.review : b.next} <Arrow size={15} />
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="bk2-nav bk2-nav--end">
            <button type="button" className="bk2-link" onClick={() => go(2)}>
              <Chevron dir="left" size={14} /> {b.back}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
