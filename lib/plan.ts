// Precios del armador de planes (se calculan con los precios de lib/agenda.ts)
import { agenda } from "./agenda";

export type PlanKind = "botox" | "filler" | "lift" | "bio";
export type PlanItem = { id: PlanKind; zones: number[] };

export function planPrice(id: PlanKind, zones: number[]) {
  switch (id) {
    case "botox":
      return agenda.botoxPrice;
    case "filler":
      return zones.length * (zones.length > 1 ? agenda.fillerPriceMulti : agenda.fillerPrice);
    case "lift":
      return agenda.threadLiftPrice;
    case "bio":
      return agenda.threadBioPrice;
  }
}

export const planTotal = (items: PlanItem[]) => items.reduce((s, i) => s + planPrice(i.id, i.zones), 0);
