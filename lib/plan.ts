// Armador de planes: cómo se elige cada tratamiento y cuánto cuesta.
// Los textos (nombres, zonas, notas) están en lib/content.ts → plan.b.items.
import { agenda } from "./agenda";

export type PlanKind =
  | "implant" | "molar" | "oral"
  | "lipo" | "platisma" | "blefaro" | "oto" | "bichat" | "facelift" | "lobule" | "wart"
  | "botox" | "harmony" | "filler" | "rejuv" | "prpcap" | "prpfac" | "lift" | "bio"
  | "fracture" | "malform" | "recon";

export type PlanItem = { id: PlanKind; zones: number[] };

// multi: marca varias zonas · single: elige una opción · none: sin elección (todo el tratamiento)
export type PlanMode = "multi" | "single" | "none";

export const PLAN: Record<PlanKind, { mode: PlanMode; visual: "face" | "teeth"; defaults: number[] }> = {
  implant: { mode: "single", visual: "teeth", defaults: [0] },
  molar: { mode: "multi", visual: "teeth", defaults: [2, 3] },
  oral: { mode: "multi", visual: "face", defaults: [1] },
  lipo: { mode: "multi", visual: "face", defaults: [0, 1] },
  platisma: { mode: "none", visual: "face", defaults: [0] },
  blefaro: { mode: "multi", visual: "face", defaults: [0] },
  oto: { mode: "multi", visual: "face", defaults: [0, 1] },
  bichat: { mode: "none", visual: "face", defaults: [0] },
  facelift: { mode: "multi", visual: "face", defaults: [0, 1] },
  lobule: { mode: "multi", visual: "face", defaults: [0] },
  wart: { mode: "multi", visual: "face", defaults: [0] },
  botox: { mode: "multi", visual: "face", defaults: [0, 1, 2] },
  harmony: { mode: "none", visual: "face", defaults: [0] },
  filler: { mode: "multi", visual: "face", defaults: [3] },
  rejuv: { mode: "none", visual: "face", defaults: [0] },
  prpcap: { mode: "single", visual: "face", defaults: [1] },
  prpfac: { mode: "none", visual: "face", defaults: [0] },
  lift: { mode: "multi", visual: "face", defaults: [0, 1] },
  bio: { mode: "multi", visual: "face", defaults: [0] },
  fracture: { mode: "multi", visual: "face", defaults: [0] },
  malform: { mode: "none", visual: "face", defaults: [0] },
  recon: { mode: "none", visual: "face", defaults: [0] },
};

// Precio según lo marcado; null = "A confirmar en la valoración"
export function planPrice(id: PlanKind, zones: number[]): number | null {
  const n = zones.length;
  switch (id) {
    case "molar":
      return n * (n === 1 ? agenda.molarPrice : n === 4 ? agenda.molarPriceAll4 : agenda.molarPrice23);
    case "lobule":
      return n * agenda.lobulePrice;
    case "wart":
      return n * agenda.wartPrice;
    case "botox":
      return agenda.botoxPrice;
    case "filler":
      return n * (n > 1 ? agenda.fillerPriceMulti : agenda.fillerPrice);
    case "prpcap":
      return agenda.prpPlans[zones[0] ?? 0].price;
    case "prpfac":
      return agenda.prpFacialPrice;
    case "lift":
      return agenda.threadLiftPrice;
    case "bio":
      return agenda.threadBioPrice;
    default:
      return null;
  }
}

export const planTotal = (items: PlanItem[]) => items.reduce((s, i) => s + (planPrice(i.id, i.zones) ?? 0), 0);
