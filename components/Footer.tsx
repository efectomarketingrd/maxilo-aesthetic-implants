import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";
import { Clock, Mail, Phone, Pin, WaIcon } from "./Icons";

export default function Footer({ t, lang }: { t: Dict; lang: Locale }) {
  const home = `/${lang}`;
  return (
    <>
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/brand/logo-light.png" alt="Maxilo Aesthetic Implants — Dra. Celia Hernández Mauricio" width={220} height={130} />
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h4>{t.footer.quick}</h4>
            <ul>
              <li><Link href={home}>{t.nav.home}</Link></li>
              <li><a href={`${home}#sobre-nosotros`}>{t.nav.about}</a></li>
              <li><a href={`${home}#preguntas`}>{t.nav.faq}</a></li>
              <li><a href={`${home}#marcas`}>{t.nav.brands}</a></li>
              <li><Link href={`${home}/blog`}>{t.nav.news}</Link></li>
              <li><a href={`${home}#agendar`}>{t.nav.cta}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.services}</h4>
            <ul>
              {t.services.items.map((s) => (
                <li key={s.slug}>
                  <Link href={`${home}/servicios/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footer.hours}</h4>
            <p className="footer__line">
              <Clock /> {t.footer.hoursValue ?? <span className="pending-inline">{t.pending}</span>}
            </p>
          </div>
          <div id="contacto">
            <h4>{t.footer.contact}</h4>
            <p className="footer__line"><Pin /> {t.footer.address}</p>
            {site.phones.map((p) => (
              <p className="footer__line" key={p}>
                <Phone /> <a href={`tel:+1${p.replace(/\D/g, "")}`}>{p}</a>
              </p>
            ))}
            <p className="footer__line"><Mail /> <a href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</span>
          <Link href={lang === "es" ? "/en" : "/es"}>{t.footer.lang}</Link>
        </div>
      </footer>

      <a className="wa-float" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener" aria-label="WhatsApp">
        <WaIcon size={30} />
      </a>
    </>
  );
}
