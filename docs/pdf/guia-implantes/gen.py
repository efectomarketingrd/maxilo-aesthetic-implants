# Genera la guía de implantes (ES/EN) en HTML para imprimir a PDF con Playwright.
import qrcode, qrcode.image.svg, io, os

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = "/home/claude/maxilo-web"
F = f"file://{WEB}/node_modules/@fontsource"
SITE = "https://maxiloaestheticimplants.com"


def qr_svg(url, name):
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=1)
    p = os.path.join(HERE, name)
    img.save(p)
    return name


def ico(d, w=1.6):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"><path d="{d}"/></svg>'


I = {
    "anest": "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4",
    "ti": "M8 3h8l-1 3.5H9z M12 6.5V21 M8.5 9.5h7 M9 12.5h6 M9.5 15.5h5 M10.2 18.5h3.6",
    "fixed": "M7 11V8a5 5 0 0 1 10 0v3 M5 11h14v10H5z M12 15v2",
    "tooth": "M8 4.5c-2.3 0-3.8 1.7-3.8 4.2 0 2.1.9 3.6 1.3 6.2.3 2.1.6 5.1 2.1 5.1 1.3 0 1.5-3 2.1-4.6.3-.8.7-1.3 1.3-1.3h1.6c.6 0 1 .5 1.3 1.3.6 1.6.8 4.6 2.1 4.6 1.5 0 1.8-3 2.1-5.1.4-2.6 1.3-4.1 1.3-6.2 0-2.5-1.5-4.2-3.8-4.2-1.7 0-2.4 1-4 1s-2.3-1-4-1z",
    "xray": "M3 6h18v12H3z M6 12c1.5-2.5 3-3 4-1.5s1.5 1.5 2 0 2.5-1 3 .5 1.5 2 3 0 M7.5 15h1.5 M11 15h2 M15 15h1.5",
    "search": "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z M15.5 15.5 20 20",
    "bone": "M12 4l9 5-9 5-9-5z M3 14l9 5 9-5",
    "crown": "M6.5 4h11l3.5 5-9 11L3 9z M3 9h18 M9.5 4 8 9l4 11 4-11-1.5-5",
    "time": "M3 20h5v-5h5v-5h5V5h3",
    "teeth": "M4 9c0-2 1-3 2.5-3S8 7 8 9s-.6 7-1.6 7S5.5 13 5 13 4 11 4 9z M10 8c0-2 1-3 2-3s2 1 2 3-.5 8-1.5 8-1-3-1.5-3-1 3-1.5 3S10 10 10 8z M16 9c0-2 1-3 2.5-3S20 7 20 9s-1 4-1 4-.5 3-1.4 3S16 11 16 9z",
    "leaf": "M5 19c0-8 5-13 14-14 0 9-5 14-13 14z M5 19l8-8",
    "pill": "M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z M7 7l7 7",
    "bowl": "M3 11h18a9 9 0 0 1-18 0z M8.5 7.5c0-1.5 1-2 1-3.5 M12.5 7.5c0-1.5 1-2 1-3.5 M16.5 7.5c0-1.5 1-2 1-3.5",
    "brush": "M3.5 20.5 13 11 M12 8.5h8.5v3.5H12z M14 8.5V5.5 M17 8.5V5.5 M20 8.5V5.5",
    "cal": "M4 6h16v14H4z M4 10h16 M8 4v4 M16 4v4 M9 15l2 2 4-4",
    "pin": "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
    "phone": "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
    "clip": "M8 5h8v3H8z M6 6.5H5v14h14v-14h-1 M8.5 13l2 2 4.5-4.5",
    "plane": "M2.5 13.5l19-8-6 15-3.5-6.5z M12 14l9.5-8.5",
    "check": "M5 12.5l4.5 4.5L19 7.5",
    "star": "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z",
}

CENTERS = [
    ("Odontohealth Consultorio Dental", "Las Terrenas", "(809) 240-9530", "https://share.google/QjD7Ie7LHTCKke4iL"),
    ("Odontium", "Samaná", "(809) 538-0011", "https://share.google/HK1KFFnEGyZBAyTjd"),
    ("Aponte Radio 3D Imágenes Diagnósticas", "Nagua", "(809) 723-6855", "https://share.google/jSlqxcOdyoZlGj5eF"),
]

T = {
    "es": dict(
        lang="es", file="Implantes dentales - Guía para pacientes",
        tag="Guía para pacientes", svc="Implantes y cirugía oral",
        eyebrow="Tratamiento", h1="Implantes dentales", accent="Una sonrisa fija, que se ve y se siente natural",
        lead="Reemplace uno o varios dientes con una solución fija que se ve, se siente y funciona como un diente natural.",
        welcome="Esta guía reúne lo esencial para que conozca el tratamiento con calma y lo comparta con su familia. Cualquier duda, escríbanos.",
        drName="Dra. Celia Hernández Mauricio", drRole="Cirujana oral y maxilofacial",
        whatT="¿Qué es un implante?",
        what1="Un <strong>implante dental</strong> es una pequeña pieza de titanio, compatible con el cuerpo, que se coloca en el hueso del maxilar y cumple la función de la raíz del diente.",
        what2="Una vez integrado al hueso, sobre él se fija una <strong>corona o prótesis</strong>. Es la opción más estable para reponer dientes perdidos: no depende de los dientes vecinos ni se mueve al comer o hablar.",
        cap="El implante cumple la función de la raíz: el hueso lo abraza y sobre él se fija la corona.",
        facts=[("anest", "Anestesia local", "Sin dolor durante el procedimiento"), ("ti", "Titanio", "Material compatible con el cuerpo"), ("fixed", "Fijo", "No se mueve al comer ni al hablar"), ("tooth", "Corona a medida", "Del color de sus dientes")],
        forT="¿Es para usted?",
        forCap="Uno, varios o todos los dientes: cada implante se planifica a la medida de su caso.",
        forW=["Le falta uno o varios dientes.", "Usa dentadura removible y desea algo fijo y cómodo.", "Prefiere no desgastar los dientes vecinos para colocar un puente.", "Tiene buena salud general y hueso suficiente, o puede prepararse para ello. Se evalúa en la valoración."],
        stepsT="¿Cómo es el proceso?",
        steps=[("search", "Valoración y estudios", "Con su radiografía panorámica, la doctora evalúa su caso y su historia clínica y mide el hueso disponible para planificar cada implante."),
               ("ti", "Colocación", "En una cirugía con anestesia local se coloca el implante en el hueso. Es un procedimiento preciso y, por lo general, de corta duración."),
               ("bone", "Integración", "Durante las semanas siguientes, el hueso se une al implante. Es la etapa que le da estabilidad a largo plazo."),
               ("tooth", "Corona definitiva", "Una vez integrado, se coloca la corona o prótesis final, diseñada para verse como sus dientes naturales.")],
        beforeT="Antes de su consulta",
        xrayT="Radiografía panorámica",
        xray="Hágase una radiografía panorámica antes de su consulta y tráigala ese día. Así la doctora puede evaluar su caso con detalle.",
        whereT="Dónde hacérsela", mapL="Ver en el mapa",
        bringT="Traiga también",
        bring=["Su radiografía panorámica", "Otros estudios que tenga", "La lista de medicamentos que toma"],
        costT="¿De qué depende el costo?",
        costIntro="Cada caso es diferente. Estos son los factores que definen su presupuesto:",
        cost=[("teeth", "Cuántos dientes", "Un solo implante, varios o la rehabilitación de toda la boca."),
              ("ti", "Tipo de implante", "Hay implantes convencionales y otros personalizados."),
              ("crown", "Material de la prótesis", "El material del diente o la prótesis que se confecciona sobre el implante."),
              ("time", "Tiempo del tratamiento", "Por etapas o en un solo paso, según lo que usted prefiera.")],
        chooseT="Usted elige",
        choose="En la valoración, la doctora le explica todas las opciones con su costo y usted decide la que mejor se adapta a su presupuesto.",
        recT="Su recuperación",
        expectT="Lo que puede esperar",
        expect=[("anest", "Durante el procedimiento", "Con anestesia local, no debe sentir dolor."),
                ("leaf", "Primeros días", "Molestias leves y algo de inflamación, que se controlan con los medicamentos indicados."),
                ("tooth", "Con el tiempo", "El hueso se une al implante y se coloca su corona definitiva.")],
        careT="Sus cuidados",
        care=[("pill", "Medicamentos", "Los que indique la doctora"), ("bowl", "Dieta blanda", "Alimentos suaves"), ("brush", "Buena higiene", "Para cuidar la zona"), ("cal", "Controles", "Asista a sus revisiones")],
        faqT="Preguntas frecuentes",
        faq=[("¿La colocación duele?", "No durante el procedimiento, porque se realiza con anestesia local. Después puede haber molestias leves, que se controlan con medicamentos."),
             ("¿Cuánto dura un implante?", "Con buena higiene, controles periódicos y hábitos saludables, un implante puede durar muchos años."),
             ("¿Qué pasa si no tengo suficiente hueso?", "La doctora lo evalúa en la valoración y le explicará las opciones disponibles para su caso."),
             ("¿Cuánto cuesta un implante?", "Depende de su caso. En la valoración, la doctora le presenta las opciones con su costo y usted elige la que mejor se adapte a su presupuesto.")],
        abroadT="¿Viene del extranjero?",
        abroad="Coordinamos las citas para aprovechar su estadía. También ofrecemos un paquete de implantes con hospedaje.",
        abroadL="Ver el paquete", abroadUrl=f"{SITE}/es/paquete-implantes",
        ctaT="Agende su valoración", cta="Escanee el código o toque los botones para agendar en línea o escribirnos por WhatsApp.",
        ctaUrl=f"{SITE}/es/agendar?s=implantes&utm_source=pdf&utm_campaign=guia-implantes",
        webL="Ver más en la web", webUrl=f"{SITE}/es/servicios/implantes-cirugia-oral/implantes-dentales?utm_source=pdf&utm_campaign=guia-implantes",
        labWa="WhatsApp", labTel="Teléfonos", labMail="Correo", labAddr="Dirección",
        addr="Sector La Ceiba, próximo a los supermercados Merca Jumbo y La Sirena, Las Terrenas, Samaná",
        note="Información orientativa. La doctora confirmará el tratamiento adecuado en su valoración.",
        waMsg="Hola, leí la guía de implantes dentales y tengo una consulta.",
    ),
    "en": dict(
        lang="en", file="Dental implants - Patient guide",
        tag="Patient guide", svc="Implants and oral surgery",
        eyebrow="Treatment", h1="Dental implants", accent="A fixed smile that looks and feels natural",
        lead="Replace one or more teeth with a fixed solution that looks, feels and works like a natural tooth.",
        welcome="This guide gathers the essentials so you can learn about the treatment calmly and share it with your family. If you have any questions, message us.",
        drName="Dr. Celia Hernández Mauricio", drRole="Oral and maxillofacial surgeon",
        whatT="What is an implant?",
        what1="A <strong>dental implant</strong> is a small, biocompatible titanium post placed in the jawbone that works as the root of a tooth.",
        what2="Once it has bonded with the bone, a <strong>crown or prosthesis</strong> is fixed on top. It is the most stable way to replace missing teeth: it does not rely on neighboring teeth and does not move when you eat or speak.",
        cap="The implant works as the root: the bone grows around it and the crown is fixed on top.",
        facts=[("anest", "Local anesthesia", "No pain during the procedure"), ("ti", "Titanium", "A biocompatible material"), ("fixed", "Fixed", "Does not move when eating or speaking"), ("tooth", "Custom crown", "Matched to your teeth")],
        forT="Is it right for you?",
        forCap="One, several or all teeth: each implant is planned around your case.",
        forW=["You are missing one or more teeth.", "You wear removable dentures and want something fixed and comfortable.", "You prefer not to grind down neighboring teeth for a bridge.", "You are in good general health with enough bone, or can be prepared for it. This is assessed at the consultation."],
        stepsT="What is the process?",
        steps=[("search", "Assessment", "With your panoramic X-ray, the doctor assesses your case and medical history and measures the available bone to plan each implant."),
               ("ti", "Placement", "The implant is placed in the bone under local anesthesia. It is a precise and usually short procedure."),
               ("bone", "Bonding", "Over the following weeks, the bone fuses with the implant. This stage gives it long-term stability."),
               ("tooth", "Final crown", "Once integrated, the final crown or prosthesis is placed, designed to look like your natural teeth.")],
        beforeT="Before your consultation",
        xrayT="Panoramic X-ray",
        xray="Have a panoramic X-ray taken before your consultation and bring it that day. This lets the doctor assess your case in detail.",
        whereT="Where to get it", mapL="View on map",
        bringT="Also bring",
        bring=["Your panoramic X-ray", "Any other studies you have", "A list of the medications you take"],
        costT="What determines the cost?",
        costIntro="Every case is different. These are the factors that shape your budget:",
        cost=[("teeth", "How many teeth", "A single implant, several, or a full-mouth restoration."),
              ("ti", "Type of implant", "There are conventional implants and custom ones."),
              ("crown", "Prosthesis material", "The material of the tooth or prosthesis made to sit on the implant."),
              ("time", "Treatment timing", "In stages or in a single step, depending on what you prefer.")],
        chooseT="You choose",
        choose="At the consultation, the doctor explains every option and its cost, and you decide which one best fits your budget.",
        recT="Your recovery",
        expectT="What to expect",
        expect=[("anest", "During the procedure", "With local anesthesia, you should not feel pain."),
                ("leaf", "First days", "Mild discomfort and some swelling, controlled with the prescribed medication."),
                ("tooth", "Over time", "The bone bonds with the implant and your final crown is placed.")],
        careT="Your care",
        care=[("pill", "Medication", "As prescribed by the doctor"), ("bowl", "Soft diet", "Gentle foods"), ("brush", "Good hygiene", "To care for the area"), ("cal", "Follow-ups", "Attend your check-ups")],
        faqT="Frequently asked questions",
        faq=[("Does placement hurt?", "Not during the procedure, because it is done under local anesthesia. Afterwards there may be mild discomfort, controlled with medication."),
             ("How long does an implant last?", "With good hygiene, regular check-ups and healthy habits, an implant can last many years."),
             ("What if I don't have enough bone?", "The doctor assesses this at the consultation and will explain the options available for your case."),
             ("How much does an implant cost?", "It depends on your case. At the consultation, the doctor presents the options and their cost, and you choose the one that best fits your budget.")],
        abroadT="Visiting from abroad?",
        abroad="We schedule appointments to make the most of your stay, and we also offer an implants package with accommodation.",
        abroadL="See the package", abroadUrl=f"{SITE}/en/paquete-implantes",
        ctaT="Book your assessment", cta="Scan the code or tap the buttons to book online or message us on WhatsApp.",
        ctaUrl=f"{SITE}/en/agendar?s=implantes&utm_source=pdf&utm_campaign=guia-implantes",
        webL="More on the website", webUrl=f"{SITE}/en/servicios/implantes-cirugia-oral/implantes-dentales?utm_source=pdf&utm_campaign=guia-implantes",
        labWa="WhatsApp", labTel="Phones", labMail="Email", labAddr="Address",
        addr="Sector La Ceiba, near the Merca Jumbo and La Sirena supermarkets, Las Terrenas, Samaná",
        note="General information. The doctor will confirm the right treatment at your assessment.",
        waMsg="Hello, I read the dental implants guide and I have a question.",
    ),
}

CSS = open(os.path.join(HERE, "guide.css")).read().replace("{F}", F)


def build(t):
    import urllib.parse
    qr = qr_svg(t["ctaUrl"], f"qr-{t['lang']}.svg")
    wa = "https://wa.me/18296572217?text=" + urllib.parse.quote(t["waMsg"])
    tel = lambda p: "tel:+1" + "".join(c for c in p if c.isdigit())
    top = lambda second, small=False: f'''
  <div class="top">
    <img src="file://{WEB}/public/brand/logo-dark.png" alt="Maxilo Aesthetic Implants" {'style="height:0.5in"' if small else ''}>
    <div class="tag">{second[0]}<span>{second[1]}</span></div>
  </div>'''
    h = []
    # ---------- Página 1
    h.append(f'''
<section class="page">
  {top((t["tag"], t["svc"]))}
  <div class="hero">
    <div class="hero__txt">
      <p class="eyebrow">{t["eyebrow"]}</p>
      <h1>{t["h1"]}</h1>
      <p class="accent">{t["accent"]}</p>
      <p class="lead">{t["lead"]}</p>
      <p class="welcome">{t["welcome"]}</p>
      <p class="sig"><b>{t["drName"]}</b><span>{t["drRole"]}</span></p>
    </div>
    <div class="hero__dr"><span class="halo"></span><img src="dr.png" alt="{t["drName"]}"></div>
  </div>
  <div class="pad fill p1">
    <div class="sec">
      <h2>{t["whatT"]}</h2>
      <div class="what">
        <figure class="diagram"><img src="diagram-{t["lang"]}.jpg" alt=""><figcaption>{t["cap"]}</figcaption></figure>
        <div><p>{t["what1"]}</p><p style="margin-top:9px">{t["what2"]}</p></div>
      </div>
    </div>
    <div class="facts">
      {''.join(f'<div class="fact"><span class="fi">{ico(I[i])}</span><strong>{a}</strong><span>{b}</span></div>' for i,a,b in t["facts"])}
    </div>
  </div>
  <div class="pnum">1 / 5</div>
</section>''')
    # ---------- Página 2
    h.append(f'''
<section class="page">
  {top((t["h1"], t["tag"]), True)}
  <div class="pad fill">
    <div class="sec first">
      <h2>{t["forT"]}</h2>
      <div class="forw">
        <ul class="check big">{''.join(f"<li>{x}</li>" for x in t["forW"])}</ul>
        <figure class="arches"><img src="teeth-{t["lang"]}.jpg" alt=""><figcaption>{t["forCap"]}</figcaption></figure>
      </div>
    </div>
    <div class="sec">
      <h2>{t["stepsT"]}</h2>
      <div class="steps">
        {''.join(f'<div class="step"><span class="si">{ico(I[ic])}</span><b>{k+1}</b><strong>{a}</strong><p>{b}</p></div>' for k,(ic,a,b) in enumerate(t["steps"]))}
      </div>
    </div>
  </div>
  <div class="pnum">2 / 5</div>
</section>''')
    # ---------- Página 3
    h.append(f'''
<section class="page">
  {top((t["h1"], t["tag"]), True)}
  <div class="pad fill">
    <div class="sec first">
      <h2>{t["beforeT"]}</h2>
      <div class="xray">
        <div class="xray__main">
          <div class="xray__head"><span class="xi">{ico(I["xray"])}</span><strong>{t["xrayT"]}</strong></div>
          <p>{t["xray"]}</p>
          <p class="lbl">{t["bringT"]}</p>
          <ul class="bring">{''.join(f"<li>{ico(I['check'],2.4)}{x}</li>" for x in t["bring"])}</ul>
        </div>
        <div class="xray__where">
          <p class="lbl">{t["whereT"]}</p>
          {''.join(f'<div class="ctr"><strong>{n}</strong><span class="town">{ico(I["pin"])}{a}</span><span class="links"><a href="{tel(p)}">{ico(I["phone"])}{p}</a><a href="{m}">{t["mapL"]} →</a></span></div>' for n,a,p,m in CENTERS)}
        </div>
      </div>
    </div>
    <div class="sec">
      <h2>{t["costT"]}</h2>
      <p class="intro">{t["costIntro"]}</p>
      <div class="cost">
        {''.join(f'<div class="cf"><span class="ci">{ico(I[ic])}</span><div><strong>{a}</strong><p>{b}</p></div></div>' for ic,a,b in t["cost"])}
      </div>
      <div class="choose"><span class="ok">{ico(I["check"],2.4)}</span><div><strong>{t["chooseT"]}</strong><p>{t["choose"]}</p></div></div>
    </div>
  </div>
  <div class="pnum">3 / 5</div>
</section>''')
    # ---------- Página 4
    h.append(f'''
<section class="page">
  {top((t["h1"], t["tag"]), True)}
  <div class="pad fill">
    <div class="sec first">
      <h2>{t["recT"]}</h2>
      <div class="rec2">
        <div class="box">
          <p class="lbl">{t["expectT"]}</p>
          <ol class="path">{''.join(f'<li><span class="pi">{ico(I[ic])}</span><div><strong>{a}</strong><p>{b}</p></div></li>' for ic,a,b in t["expect"])}</ol>
        </div>
        <div class="box">
          <p class="lbl">{t["careT"]}</p>
          <ul class="care">{''.join(f'<li><span class="ki">{ico(I[ic])}</span><div><strong>{a}</strong><p>{b}</p></div><span class="tick">{ico(I["check"],3)}</span></li>' for ic,a,b in t["care"])}</ul>
        </div>
      </div>
    </div>
    <div class="sec">
      <h2>{t["faqT"]}</h2>
      <div class="faq">{''.join(f'<div><span class="qi">{ico(I[ic])}</span><span><strong>{q}</strong><p>{a}</p></span></div>' for ic,(q,a) in zip(["anest","cal","bone","search"], t["faq"]))}</div>
    </div>
  </div>
  <div class="pnum">4 / 5</div>
</section>''')
    # ---------- Página 5 (contraportada)
    h.append(f'''
<section class="page back">
  <div class="back__in">
    <img class="back__logo" src="file://{WEB}/public/brand/logo-light.png" alt="Maxilo Aesthetic Implants">
    <p class="eyebrow">{t["h1"]}</p>
    <h2 class="back__h">{t["ctaT"]}</h2>
    <p class="back__p">{t["cta"]}</p>
    <a class="qrbig" href="{t["ctaUrl"]}"><img src="{qr}" alt="QR"></a>
    <div class="back__btns">
      <a class="btn" href="{t["ctaUrl"]}">{t["ctaT"]} →</a>
      <a class="btn btn--wa" href="{wa}">WhatsApp (829) 657-2217</a>
    </div>
    <a class="web" href="{t["webUrl"]}">{t["webL"]} →</a>
    <a class="abroad abroad--dark" href="{t["abroadUrl"]}"><span class="ai">{ico(I["plane"])}</span><span><strong>{t["abroadT"]}</strong> {t["abroad"]} <em>{t["abroadL"]} →</em></span></a>
  </div>
  <div class="back__foot">
    <div class="back__dr"><img src="file://{WEB}/public/brand/doctora-cara.jpg" alt=""></div>
    <div>
      <h3>{t["drName"]}</h3>
      <p class="role">{t["drRole"]}</p>
      <div class="c">
        <b>{t["labTel"]}</b> <a href="tel:+18296572217">(829) 657-2217</a> · <a href="tel:+18293710276">(829) 371-0276</a> · <b>{t["labMail"]}</b> <a href="mailto:dracelia.maxiloestetica@gmail.com">dracelia.maxiloestetica@gmail.com</a><br>
        <b>{t["labAddr"]}</b> <a href="https://share.google/jq0Id5rWFLBov2GvE">{t["addr"]}</a> · <a href="{SITE}">maxiloaestheticimplants.com</a>
      </div>
      <p class="note">{t["note"]}</p>
    </div>
  </div>
  <div class="pnum pnum--dark">5 / 5</div>
</section>''')
    return f'<!doctype html><html lang="{t["lang"]}"><head><meta charset="utf-8"><title>{t["file"]}</title><style>{CSS}</style></head><body>{"".join(h)}</body></html>'


for k, t in T.items():
    open(os.path.join(HERE, f"guia-{k}.html"), "w").write(build(t))
print("ok")
