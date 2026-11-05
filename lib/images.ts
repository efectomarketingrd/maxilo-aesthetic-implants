// Imágenes de referencia de la web (generadas con Higgsfield).
// Para usar fotos propias, cambie la dirección por una ruta local, por ejemplo "/fotos/implantes.jpg".
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3LZ8my4o5R9prXx0ZTCU28u6qVU";

export const img = {
  implantes: `${CDN}/hf_20261105_005554_e61f3608-f5f8-421c-b16a-3604b61fb3ca.png`,
  cirugiaOral: `${CDN}/hf_20261105_005423_2e977576-9c4e-4960-8734-0d968cdafa74.png`,
  estetica: `${CDN}/hf_20261105_005423_5aa04142-e6dd-4a71-95cd-e805069d450b.png`,
  medicina: `${CDN}/hf_20261105_005612_93b83380-8ea5-44c8-b4b3-48e138eee936.png`,
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
