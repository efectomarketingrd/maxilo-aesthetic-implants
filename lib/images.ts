// Imágenes de referencia de la web (generadas con Higgsfield).
// Para usar fotos propias, cambie la dirección por una ruta local, por ejemplo "/fotos/implantes.jpg".
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3LZ8my4o5R9prXx0ZTCU28u6qVU";

export const img = {
  implantes: `${CDN}/hf_20261105_011842_e234406d-19f3-4c20-a787-6dab8df597a3.png`,
  cirugiaOral: `${CDN}/hf_20261105_011901_3200f1f9-6701-43b3-bc28-48a887945222.png`,
  estetica: `${CDN}/hf_20261105_011842_fbb34633-e3bf-4ad6-8f72-d598243ecfa2.png`,
  medicina: `${CDN}/hf_20261105_011931_d8262b2e-9f19-40ea-ab25-37aaa07333c7.png`,
  reconstructiva: `${CDN}/hf_20261105_005424_4220a9e3-2041-4e24-ab79-4281a11cc151.png`,
  playa: `${CDN}/hf_20261105_005423_72f2b32a-9023-4c96-aa30-0495fb6e9daa.png`,
};

// Imagen de cada área de servicio (páginas y tarjetas)
export const serviceImg: Record<string, string> = {
  "implantes-cirugia-oral": img.implantes,
  "cirugia-estetica-facial": img.estetica,
  "medicina-estetica": img.medicina,
  "cirugia-reconstructiva": img.reconstructiva,
};

// Imagen de cada opción en la agenda
export const bookingImg: Record<string, string> = {
  implantes: img.implantes,
  "cirugia-oral": img.cirugiaOral,
  "estetica-facial": img.estetica,
  "medicina-estetica": img.medicina,
  reconstructiva: img.reconstructiva,
  paquete: img.playa,
};
