import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/lib/content";
import { site, waLink, type Locale } from "@/lib/site";
import { Mail, Phone, Pin, WaIcon } from "./Icons";
import OfferCard from "./OfferCard";

export default function Footer({ t, lang, offer = false }: { t: Dict; lang: Locale; offer?: boolean }) {
  const home = `/${lang}`;
  return (
    <>
      {offer && <OfferCard t={t} lang={lang} />}

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/brand/logo-light.png" alt="Maxilo Aesthetic Implants — Dra. Celia Hernández Mauricio" width={220} height={130} />
          </div>
          <div>
            <h4>{t.footer.quick}</h4>
            <ul>
              <li><Link href={home}>{t.nav.home}</Link></li>
              <li><Link href={`${home}/sobre-nosotros`}>{t.nav.about}</Link></li>
              <li><Link href={`${home}/preguntas`}>{t.nav.faq}</Link></li>
              <li><Link href={`${home}/marcas`}>{t.nav.brands}</Link></li>
              <li><Link href={`${home}/instituciones`}>{t.nav.institutions}</Link></li>
              <li><Link href={`${home}/paquete-implantes`}>{t.pkg.nav}</Link></li>
              <li><Link href={`${home}/blog`}>{t.nav.news}</Link></li>
              <li><a href={`${home}/agendar`}>{t.nav.cta}</a></li>
            </ul>
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
          <a href={lang === "es" ? "/en" : "/es"} hrefLang={lang === "es" ? "en" : "es"}>{t.footer.lang}</a>
        </div>
      </footer>

      <a className="wa-float" href={waLink(t.hero.waMsg)} target="_blank" rel="noopener" aria-label="WhatsApp">
        <WaIcon size={30} />
      </a>
    </>
  );
}
