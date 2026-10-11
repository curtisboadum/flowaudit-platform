"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { industries } from "@/lib/editorial-copy";
import { offers, c, text } from "@/lib/marketing-copy";

export function SiteFooter() {
  const { locale } = useLocale();
  return (
    <footer className="fa-footer fa-container">
      <div className="fa-footer-top">
        <div>
          <Link href="/" className="fa-wordmark">
            FlowAudit<span>.</span>
          </Link>
          <p>
            {text(
              locale,
              c(
                "Better systems. Clearer next steps.",
                "Mejores sistemas. Siguientes pasos más claros.",
              ),
            )}
          </p>
          <a href="mailto:support@flowaudit.co.uk">support@flowaudit.co.uk</a>
        </div>
        <nav aria-label={text(locale, c("Services", "Servicios"))}>
          {offers.map((o) => (
            <Link key={o.id} href={o.path}>
              {text(locale, o.label)}
            </Link>
          ))}
        </nav>
        <nav aria-label={text(locale, c("Company", "Empresa"))}>
          {[
            ["/about", c("About", "Nosotros")],
            ["/demos", c("Demonstrations", "Demostraciones")],
            ["/blog", c("Field notes", "Notas prácticas")],
            ["/careers", c("Careers", "Colaboraciones")],
            ["/book", c("Book a call", "Reservar llamada")],
          ].map(([href, label], i) => (
            <Link key={i} href={typeof href === "string" ? href : "/"}>
              {typeof label === "object" ? text(locale, label) : label}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="fa-footer-industries" aria-label={text(locale, c("Industries", "Sectores"))}>
        {Object.entries(industries).map(([slug, industry]) => (
          <Link key={slug} href={`/industries/${slug}`}>
            {text(locale, industry.name)}
          </Link>
        ))}
      </nav>
      <div className="fa-footer-bottom">
        <span>© {new Date().getFullYear()} FlowAudit</span>
        <span>{text(locale, c("Built around the work.", "Creado alrededor del trabajo."))}</span>
        <div>
          <Link href="/privacy">{text(locale, c("Privacy", "Privacidad"))}</Link>
          <Link href="/terms">{text(locale, c("Terms", "Condiciones"))}</Link>
          <button onClick={() => window.dispatchEvent(new Event("fa-privacy-open"))}>
            {text(locale, c("Privacy choices", "Opciones de privacidad"))}
          </button>
        </div>
      </div>
    </footer>
  );
}
