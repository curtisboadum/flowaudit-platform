"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { bookHref, c, text, type Copy, type Faq, type ServiceId } from "@/lib/marketing-copy";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function BookLink({
  service = "general",
  children,
  light = false,
}: {
  service?: ServiceId;
  children?: React.ReactNode;
  light?: boolean;
}) {
  const { locale } = useLocale();
  return (
    <Link
      className={`fa-button ${light ? "fa-button-light" : ""}`}
      href={bookHref(service)}
      data-cta={service}
    >
      {children ?? text(locale, c("Book a 15-minute call", "Reservar 15 minutos"))}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="fa-eyebrow">{children}</p>;
}
export function SectionHeading({
  number,
  label,
  title,
  body,
}: {
  number: string;
  label: Copy;
  title: Copy;
  body?: Copy;
}) {
  const { locale } = useLocale();
  return (
    <div className="fa-section-heading">
      <Eyebrow>
        <span>{number}</span>
        {text(locale, label)}
      </Eyebrow>
      <div>
        <h2>{text(locale, title)}</h2>
        {body && <p className="fa-lead">{text(locale, body)}</p>}
      </div>
    </div>
  );
}
export function FaqSection({ items, id = "faq" }: { items: Faq[]; id?: string }) {
  const { locale } = useLocale();
  return (
    <section className="fa-container fa-section fa-faq" id={id}>
      <div>
        <Eyebrow>{text(locale, c("Before we talk", "Antes de hablar"))}</Eyebrow>
        <h2>
          {text(
            locale,
            c("Good questions.\nClear answers.", "Buenas preguntas.\nRespuestas claras."),
          )}
        </h2>
        <p>
          {text(
            locale,
            c(
              "Something specific to your business? Bring it to the call.",
              "¿Algo específico de tu empresa? Coméntalo en la llamada.",
            ),
          )}
        </p>
      </div>
      <div>
        {items.map((item, i) => (
          <details className="fa-faq-item" key={i}>
            <summary>
              {text(locale, item.q)}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{text(locale, item.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Process({ compact = false }: { compact?: boolean }) {
  const { locale } = useLocale();
  const steps = [
    [
      c("Scope", "Alcance"),
      c(
        "Agree the problem, requirements and commercial terms.",
        "Acordar problema, requisitos y términos comerciales.",
      ),
    ],
    [
      c("Configure & test", "Configurar y probar"),
      c(
        "Build the agreed setup. Test everyday cases and exceptions.",
        "Crear la configuración acordada. Probar casos habituales y excepciones.",
      ),
    ],
    [
      c("Approve", "Aprobar"),
      c(
        "Review the behaviour, responsibilities and limits together.",
        "Revisar juntos comportamiento, responsabilidades y límites.",
      ),
    ],
    [
      c("Activate & support", "Activar y apoyar"),
      c(
        "Release after approval, with a named owner and support scope.",
        "Activar tras aprobación, con un responsable y soporte definido.",
      ),
    ],
  ];
  return (
    <section
      className={`fa-container fa-section ${compact ? "fa-process-compact" : ""}`}
      id="how-it-works"
    >
      <SectionHeading
        number="03"
        label={c("The working relationship", "La forma de trabajar")}
        title={c(
          "See it work. Approve it.\nThen activate it.",
          "Verlo funcionar. Aprobarlo.\nDespués activarlo.",
        )}
        body={c(
          "A clear path from an example to an agreed, tested setup. Payment starts scoped work; activation follows approval.",
          "Un camino claro desde un ejemplo hasta una configuración acordada y probada. El pago inicia el trabajo definido; la activación sigue a la aprobación.",
        )}
      />
      <ol className="fa-process">
        {steps.map(([title, body], i) => (
          <li key={i}>
            <span className="fa-step-number">0{i + 1}</span>
            <h3>{title && text(locale, title)}</h3>
            <p>{body && text(locale, body)}</p>
          </li>
        ))}
      </ol>
      <Link className="fa-text-link" href="/how-it-works">
        {text(locale, c("Understand the process", "Conocer el proceso"))}
        <Arrow />
      </Link>
    </section>
  );
}
export function Closing({ service = "general" }: { service?: ServiceId }) {
  const { locale } = useLocale();
  return (
    <section className="fa-closing">
      <div className="fa-container">
        <Eyebrow>{text(locale, c("A focused conversation", "Una conversación concreta"))}</Eyebrow>
        <div>
          <h2>
            {text(
              locale,
              c("Show us where\nthe work gets stuck.", "Muéstranos dónde\nse atasca el trabajo."),
            )}
          </h2>
          <aside>
            <p>
              {text(
                locale,
                c(
                  "15 minutes to explore the problem, see a relevant example and agree whether there is a useful next step.",
                  "15 minutos para explorar el problema, ver un ejemplo relevante y acordar si hay un siguiente paso útil.",
                ),
              )}
            </p>
            <BookLink service={service} light />
            <p className="fa-small">
              {text(
                locale,
                c(
                  "Clear scope. Considered decisions. No pressure.",
                  "Alcance claro. Decisiones cuidadas. Sin presión.",
                ),
              )}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
