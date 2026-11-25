import { NextResponse, type NextRequest } from "next/server";

// Dirección principal "/" (como en la web del spa):
// - el verificador de Search Console y el lector de íconos de Google leen la portada sin seguir la redirección: se les muestra /es directamente;
// - los visitantes van al idioma de su teléfono (español, francés; cualquier otro, inglés).
export function proxy(req: NextRequest) {
  if (/Google-Site-Verification|Google-Favicon|GoogleOther/i.test(req.headers.get("user-agent") || "")) {
    return NextResponse.rewrite(new URL("/es", req.url));
  }
  const first = (req.headers.get("accept-language") || "").split(",")[0]?.trim().toLowerCase() || "";
  const lang = first.startsWith("es") ? "es" : first.startsWith("fr") ? "fr" : first ? "en" : "es";
  return NextResponse.redirect(new URL(`/${lang}`, req.url), 307);
}

export const config = { matcher: ["/"] };
