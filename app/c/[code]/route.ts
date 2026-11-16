import { NextResponse } from "next/server";
import { citaLang } from "@/lib/cita";

// Enlace corto de "Mi cita": /c/<código> → /<idioma>/mi-cita?c=<código>
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const lang = citaLang(code) ?? "es";
  return NextResponse.redirect(new URL(`/${lang}/mi-cita?c=${encodeURIComponent(code)}`, req.url), 307);
}
