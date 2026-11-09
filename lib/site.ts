// Datos generales del centro. Cambia aquí y se actualiza en toda la web.
export const site = {
  name: "Maxilo Aesthetic Implants",
  doctor: "Dra. Celia Hernández Mauricio",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://maxiloaestheticimplants.com",
  email: "dracelia.maxiloestetica@gmail.com",
  phones: ["(829) 657-2217", "(829) 371-0276"],
  whatsapp: "18296572217",
  // Datos para transferencia bancaria (se muestran en el paso 4 de la agenda)
  bank: {
    holder: "Edelmira Celia Hernández Mauricio",
    name: "Banco Popular Dominicano",
    accounts: [
      { cur: "RD$", number: "807870399" },
      { cur: "US$", number: "813932191" },
    ],
  },
  // Apps para pagar desde el extranjero (depositan en la cuenta en pesos)
  remit: [
    { name: "Wise", url: "https://wise.com/" },
    { name: "Remitly", url: "https://remit.ly/us/en/dominican-republic/pricing" },
    { name: "Western Union", url: "https://www.westernunion.com/us/en/providers/banco-popular.html" },
  ],
  maps: "https://share.google/jq0Id5rWFLBov2GvE",
  address: {
    street: "Sector La Ceiba, próximo a los supermercados Merca Jumbo y La Sirena",
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

// Spa del segundo nivel (marca propia, reservas aparte)
export const spa = {
  name: "Terrenas Massage",
  wa: "18293710276",
  instagram: "https://www.instagram.com/terrenasmassage/",
  email: "terrenasmassagerd@gmail.com",
};

export const spaWa = (msg: string) => `https://wa.me/${spa.wa}?text=${encodeURIComponent(msg)}`;
