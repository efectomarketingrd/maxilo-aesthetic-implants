// Datos generales del centro. Cambia aquí y se actualiza en toda la web.
export const site = {
  name: "Maxilo Aesthetic Implants",
  doctor: "Dra. Celia Hernández Mauricio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://maxiloaestheticimplants.com",
  email: "dracelia.maxiloestetica@gmail.com",
  phones: ["(829) 657-2217", "(829) 371-0276"],
  whatsapp: "18296572217",
  maps: "https://share.google/jq0Id5rWFLBov2GvE",
  address: {
    street: "Sector La Ceiba, frente al parque del letrero de bienvenida",
    locality: "Las Terrenas",
    region: "Samaná",
    postalCode: "32000",
    country: "DO",
  },
};

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
