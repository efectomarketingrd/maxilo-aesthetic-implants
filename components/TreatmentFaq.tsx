import InView from "./InView";
import type { FaqViz } from "@/lib/treatments";

// Preguntas frecuentes con icono según el tema y, si hay, un mini gráfico bajo la respuesta.
const ICONS: [RegExp, string][] = [
  [/cuest|cost|precio|price|pago|pay/i, "M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z M8 8.5h.01"],
  [/duel|hurt|dolor|pain|anest/i, "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4"],
  [/dura|last|tiempo|long|cuándo|when|semana|week/i, "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2"],
  [/hueso|bone/i, "M12 4l9 5-9 5-9-5z M3 14l9 5 9-5"],
  [/extranjer|abroad|viaj|travel/i, "M2.5 13.5l19-8-6 15-3.5-6.5z M12 14l9.5-8.5"],
  [/necesit|need|llevar|bring|primera consulta|first consultation/i, "M8 5h8v3H8z M6 6.5H5v14h14v-14h-1 M8.5 13l2 2 4.5-4.5"],
  [/riesg|risk|segur|safe|complic/i, "M12 3 2.5 20h19z M12 10v4.5 M12 17.2v.3"],
];
const DEFAULT = "M4 5h16v11H9l-5 4z M8.5 10.5h.01 M12 10.5h.01 M15.5 10.5h.01";

export default function TreatmentFaq({ items }: { items: { q: string; a: string; viz?: FaqViz }[] }) {
  return (
    <InView className="h5-faq__list faq-anim faqx">
      {items.map((f, i) => {
        const ic = ICONS.find(([r]) => r.test(f.q))?.[1] ?? DEFAULT;
        return (
          <details key={f.q} style={{ "--fi": i } as React.CSSProperties}>
            <summary>
              <span className="faqx-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ic} />
                </svg>
              </span>
              <span className="faq-q">{f.q}</span>
            </summary>
            <div className="faq-a">
              <p>{f.a}</p>
              {f.viz && (
                <div className={`faqx-viz faqx-viz--${f.viz.kind}`}>
                  {f.viz.items.map((v, k) => (
                    <span key={v.t} className="faqx-v" style={{ "--v": k } as React.CSSProperties}>
                      {f.viz!.kind === "flow" && <b>{k + 1}</b>}
                      <span>
                        <strong>{v.t}</strong>
                        {v.s && <small>{v.s}</small>}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </details>
        );
      })}
    </InView>
  );
}
