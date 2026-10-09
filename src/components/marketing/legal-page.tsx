"use client";
import { useLocale } from "@/components/providers/locale-provider";
import copy from "@/lib/legal-copy.json";
import { legalSpanish } from "@/lib/legal-spanish";
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { locale } = useLocale();
  const sections = locale === "es" ? legalSpanish[kind] : copy[kind];
  return (
    <article className="fa-container fa-legal">
      <p className="fa-eyebrow">
        FlowAudit / {locale === "es" ? "Información de servicio" : "Service information"}
      </p>
      <h1>
        {kind === "privacy"
          ? locale === "es"
            ? "Política de privacidad"
            : "Privacy policy"
          : locale === "es"
            ? "Condiciones del servicio"
            : "Terms of service"}
      </h1>
      <p className="fa-small">
        {locale === "es" ? "Actualizado: 9 de octubre de 2026" : "Updated: 9 October 2026"}
      </p>
      <p>
        {locale === "es"
          ? "Esta página cubre los servicios de FlowAudit y Revenue Recovery Desk. Las condiciones de cada proyecto se acuerdan por escrito."
          : "This page covers FlowAudit services and Revenue Recovery Desk. Individual project terms are agreed in writing."}
      </p>
      {sections.map((section, i) => (
        <section key={i}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </section>
      ))}
      <p>
        <a className="fa-text-link" href="mailto:support@flowaudit.co.uk">
          support@flowaudit.co.uk ↗
        </a>
      </p>
    </article>
  );
}
