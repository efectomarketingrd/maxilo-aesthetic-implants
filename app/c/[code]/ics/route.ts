import { citaLang, readCita } from "@/lib/cita";
import { citaEvent, icsText } from "@/lib/cita-cal";
import { site } from "@/lib/site";

// Archivo .ics de "Mi cita" (Apple Calendar, Outlook…): /c/<código>/ics
export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = readCita(code);
  if (!c) return new Response("Not found", { status: 404 });
  const lang = citaLang(code) ?? "es";
  const ev = citaEvent(c, lang, `${site.url}/c/${code}`);
  return new Response(icsText(ev, code.slice(-24)), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="cita-maxilo.ics"',
      "Cache-Control": "no-store",
    },
  });
}
