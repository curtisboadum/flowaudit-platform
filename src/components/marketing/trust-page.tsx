"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
const details = [
  {
    title: c("Evidence and integration limits", "Evidencia y límites de integración"),
    body: c(
      "The public dental recording demonstrates an enquiry, appointment choices and Google Calendar booking. It does not establish compatibility with your CRM, practice-management or field-service system. Assess permissions, source-of-truth rules and failure cases for every proposed connection.",
      "La grabación dental pública demuestra una consulta, opciones de cita y una reserva en Google Calendar. No acredita compatibilidad con tu CRM, sistema de gestión clínica o de campo. Evalúa permisos, reglas de los registros de referencia y casos de fallo para cada conexión propuesta.",
    ),
  },
  {
    title: c("Access and responsibility", "Acceso y responsabilidad"),
    body: c(
      "Identify the minimum access required, who grants it, which actions need approval and how access is removed. Confirm human handoff, fallback and ownership before activation. No certification or security audit is claimed here.",
      "Identifica el acceso mínimo necesario, quién lo concede, qué acciones necesitan aprobación y cómo se retira el acceso. Confirma traspasos a personas, alternativas y responsables antes de activar. Aquí no se afirma ninguna certificación ni auditoría de seguridad.",
    ),
  },
  {
    title: c("Recording and privacy", "Grabación y privacidad"),
    body: c(
      "Assess AI disclosure, recording permissions, retention, data locations and provider responsibilities for your workflow and callers’ jurisdictions. USA and UK requirements require review for the specific setup. Do not treat this page as a claim of blanket legal compliance.",
      "Evalúa la identificación de la IA, permisos de grabación, conservación, ubicación de datos y responsabilidades del proveedor según tu proceso y las jurisdicciones de quienes llaman. Los requisitos de EE. UU. y Reino Unido requieren revisión para la configuración concreta. Esta página no afirma cumplimiento legal general.",
    ),
  },
  {
    title: c("Testing, activation and support", "Pruebas, activación y soporte"),
    body: c(
      "Run representative calls, interruptions, unavailable systems and unexpected requests. Review outcomes with your team and approve the setup before activation. Agree monitoring, support and change responsibilities privately.",
      "Prueba llamadas representativas, interrupciones, sistemas no disponibles y solicitudes inesperadas. Revisa los resultados con tu equipo y aprueba la configuración antes de activar. Acuerda en privado las responsabilidades de supervisión, soporte y cambios.",
    ),
  },
  {
    title: c("Website measurement", "Medición del sitio web"),
    body: c(
      "Optional page, video and booking-link measurement stays off until consent. We use approved event fields, not your booking-form answers, as analytics. A calendar opening is not a confirmed booking. Confirmation requires a genuine supported provider event.",
      "La medición opcional de páginas, vídeos y enlaces de reserva permanece desactivada hasta recibir consentimiento. La analítica usa campos de eventos aprobados, no tus respuestas de reserva. Abrir el calendario no equivale a una reserva confirmada. La confirmación requiere un evento real compatible del proveedor.",
    ),
  },
  {
    title: c("Demonstrations and outcomes", "Demostraciones y resultados"),
    body: c(
      "Recordings are demonstrations, not paying-customer testimonials. Editorial privacy edits must be disclosed. No revenue, savings, guaranteed availability, clinical triage or emergency-transfer outcome is inferred.",
      "Las grabaciones son demostraciones, no testimonios de clientes de pago. Hay que indicar las ediciones de privacidad. No se infieren ingresos, ahorros, disponibilidad garantizada, triaje clínico ni transferencias de emergencia.",
    ),
  },
];
export function TrustPage() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <p className="fa-eyebrow">
          {text(
            locale,
            c("Trust & technical considerations", "Confianza y consideraciones técnicas"),
          )}
        </p>
        <h1>
          {text(
            locale,
            c(
              "Know what is demonstrated.\nAgree what comes next.",
              "Comprende qué está demostrado.\nAcuerda el siguiente paso.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "A dependable workflow begins with explicit boundaries, tested access and a responsible owner.",
              "Un proceso fiable empieza con límites explícitos, acceso probado y un responsable.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section fa-sector-grid">
        {details.map(({ title, body }) => (
          <article key={title.en} className="fa-call-proof">
            <h2 className="mb-4 text-2xl">{text(locale, title)}</h2>
            <p>{text(locale, body)}</p>
          </article>
        ))}
      </section>
      <section className="fa-container fa-section">
        <Link className="fa-button" href="/book?service=phone-agent">
          {text(locale, c("Discuss your requirements", "Comentar tus requisitos"))} ↗
        </Link>
        <p className="mt-6">
          <Link className="underline" href="/privacy">
            {text(locale, c("Website privacy policy", "Política de privacidad del sitio"))}
          </Link>
        </p>
      </section>
    </>
  );
}
