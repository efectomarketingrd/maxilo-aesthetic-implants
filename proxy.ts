import { NextResponse, type NextRequest } from "next/server";

// Dirección principal "/" (como en la web del spa):
// el verificador de Search Console y el lector de íconos de Google leen la portada sin seguir la redirección,
// así que a ellos se les muestra /es directamente; al resto se le redirige a /es.
export function proxy(req: NextRequest) {
  if (/Google-Site-Verification|Google-Favicon|GoogleOther/i.test(req.headers.get("user-agent") || "")) {
    return NextResponse.rewrite(new URL("/es", req.url));
  }
  return NextResponse.redirect(new URL("/es", req.url), 307);
}

export const config = { matcher: ["/"] };
