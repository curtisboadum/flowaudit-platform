"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { CalEmbed } from "@/components/booking/cal-embed";
import { c, text, offers, serviceId, type ServiceId } from "@/lib/marketing-copy";
import { analyticsAllowed, attribution, recordEventOnce } from "@/lib/funnel-client";
import { Eyebrow } from "./primitives";

export function BookingPage({ initialService = "general" }: { initialService?: ServiceId }) {
  const { locale } = useLocale();
  const [service, setService] = useState(initialService);
  const [config, setConfig] = useState<Record<string, string> | null>(null);
  const [revision, setRevision] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [status, setStatus] = useState(false);
  const contextRef = useRef<HTMLDetailsElement>(null);
  const phone = service === "phone-agent";
  const offer = offers.find((x) => x.id === service);
  const bookingConfig = (notes: string) => {
    const next: Record<string, string> = { "metadata[service]": service };
    if (notes) next.notes = notes;
    for (const [key, value] of Object.entries(attribution())) {
      next[key === "ref" ? "metadata[ref]" : key] = value;
      next[`metadata[${key}]`] = value;
    }
    if (analyticsAllowed()) {
      try {
        const journey = sessionStorage.getItem("fa-journey");
        if (journey) next["metadata[journeyId]"] = journey;
      } catch {
        /* Booking works with unavailable storage. */
      }
    }
    return next;
  };
  useEffect(() => {
    setConfig(bookingConfig(""));
    setStatus(false);
    const refreshConsent = () => {
      setConfig((prior) => bookingConfig(prior?.notes ?? ""));
      setRevision((value) => value + 1);
    };
    window.addEventListener("fa-consent-change", refreshConsent);
    return () => window.removeEventListener("fa-consent-change", refreshConsent);
    // A service change intentionally starts a new calendar, without form answers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);
  const groups = ["Practice manager", "Operations leader", "Group executive"].includes(
    draft.role ?? "",
  );
  return (
    <div className="fa-container fa-book-grid">
      <section className="fa-book-intro">
        <Eyebrow>
          {text(locale, c("Demo & fit assessment", "Demo y evaluación"))}
          <span>15 min</span>
        </Eyebrow>
        <h1>
          {text(
            locale,
            phone
              ? c("Let’s talk about\nyour practice.", "Hablemos de\ntu clínica.")
              : c(
                  "A clearer\nnext step starts here.",
                  "Un siguiente paso\nmás claro empieza aquí.",
                ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            phone
              ? c(
                  "Bring your remaining questions. We’ll assess your setup and discuss scope, implementation and investment. You can book without watching the film.",
                  "Trae tus dudas. Evaluaremos tu sistema y comentaremos alcance, implementación e inversión. Puedes reservar sin ver el vídeo.",
                )
              : c(
                  "Bring one process or priority. We’ll explore your requirements, scope and whether there is a useful fit.",
                  "Trae un proceso o prioridad. Exploraremos requisitos, alcance y si hay un encaje útil.",
                ),
          )}
        </p>
        <ul className="fa-book-agenda">
          {[
            c("Your priority and remaining questions.", "Tu prioridad y dudas pendientes."),
            c(
              "Requirements, compatibility and approval owners.",
              "Requisitos, compatibilidad y responsables de aprobación.",
            ),
            c(
              "Scope, investment and a buying decision or agreed next step.",
              "Alcance, inversión y una decisión de compra o siguiente paso acordado.",
            ),
          ].map((copy, i) => (
            <li key={i}>
              <span>0{i + 1}</span>
              {text(locale, copy)}
            </li>
          ))}
        </ul>
        <p className="fa-small">
          {text(
            locale,
            c(
              "Invite an owner or someone authorised to purchase. A practice manager can bring the operational questions and invite the relevant approver. Groups may need further systems, security or procurement review.",
              "Invita al propietario o a alguien autorizado a comprar. La persona responsable de la clínica puede aportar las preguntas operativas e invitar a quien aprueba. Los grupos pueden necesitar revisión de sistemas, seguridad o compras.",
            ),
          )}
        </p>
        {phone && (
          <Link className="fa-text-link" href="/phone-agent#demo">
            {text(locale, c("Review the demonstration", "Revisar la demostración"))} ↗
          </Link>
        )}
        <p className="fa-small">
          {text(locale, c("Prefer email?", "¿Prefieres correo?"))}{" "}
          <a className="underline" href="mailto:support@flowaudit.co.uk">
            support@flowaudit.co.uk
          </a>
        </p>
      </section>
      <section className="fa-book-card" id="booking-calendar">
        <h2>{text(locale, c("Choose your time", "Elige tu horario"))}</h2>
        <p className="fa-small mb-6">
          {text(locale, offer?.label ?? c("General fit assessment", "Evaluación general"))} · 15 min
          · Cal Video
        </p>
        <details ref={contextRef} className="fa-book-context">
          <summary>
            {text(
              locale,
              c(
                "Add context for the call (optional)",
                "Añadir contexto para la llamada (opcional)",
              ),
            )}
          </summary>
          <p className="fa-small">
            {text(
              locale,
              c(
                "Book directly below, or add context first. Applying context reloads the calendar, so choose your time afterwards. Name and email are collected once by Cal.",
                "Reserva abajo o añade contexto primero. Aplicarlo recarga el calendario; elige tu horario después. Cal solicita nombre y correo una sola vez.",
              ),
            )}
          </p>
          <form
            onChange={() => recordEventOnce("qualification_start", { service })}
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const values = Object.fromEntries(
                [...form.entries()].map(([key, value]) => [key, String(value).trim()]),
              );
              setDraft(values);
              const notes = Object.entries(values)
                .filter(([key, value]) => key !== "service" && value)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n");
              setConfig(bookingConfig(notes));
              setRevision((v) => v + 1);
              setStatus(Boolean(notes));
              if (notes) recordEventOnce("qualification_complete", { service });
              if (contextRef.current) contextRef.current.open = false;
            }}
          >
            {!phone && (
              <label className="fa-field">
                {text(locale, c("I’m interested in", "Me interesa"))}
                <select
                  name="service"
                  value={service}
                  onChange={(e) => setService(serviceId(e.target.value))}
                >
                  <option value="general">
                    {text(locale, c("Explore the fit", "Explorar si encaja"))}
                  </option>
                  {offers.map((o) => (
                    <option key={o.id} value={o.id}>
                      {text(locale, o.label)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="fa-field">
              {text(
                locale,
                c("Business or practice name (optional)", "Nombre de empresa o clínica (opcional)"),
              )}
              <input
                name="practice"
                value={draft.practice ?? ""}
                onChange={(e) => setDraft({ ...draft, practice: e.target.value })}
                maxLength={120}
                autoComplete="organization"
              />
            </label>
            <label className="fa-field">
              {text(locale, c("Your role (optional)", "Tu función (opcional)"))}
              <select
                name="role"
                value={draft.role ?? ""}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              >
                <option value="">
                  {text(locale, c("Select if useful", "Elige si lo deseas"))}
                </option>
                {[
                  ["Owner / partner", "Propietario / socio"],
                  ["Practice manager", "Responsable de clínica"],
                  ["Operations leader", "Responsable de operaciones"],
                  ["Group executive", "Directivo de grupo"],
                  ["Team member / other", "Miembro del equipo / otro"],
                ].map(([en, es]) => (
                  <option key={en} value={en}>
                    {locale === "es" ? es : en}
                  </option>
                ))}
              </select>
            </label>
            {phone && (
              <label className="fa-field">
                {text(locale, c("Scheduling system (optional)", "Sistema de citas (opcional)"))}
                <input
                  name="scheduling"
                  value={draft.scheduling ?? ""}
                  onChange={(e) => setDraft({ ...draft, scheduling: e.target.value })}
                  maxLength={120}
                  placeholder={text(
                    locale,
                    c("System name, or not sure", "Nombre del sistema, o no lo sé"),
                  )}
                />
              </label>
            )}
            <label className="fa-field">
              {text(
                locale,
                c(
                  "What would you like to improve? (optional)",
                  "¿Qué te gustaría mejorar? (opcional)",
                ),
              )}
              <textarea
                name="priority"
                value={draft.priority ?? ""}
                onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
                maxLength={500}
              />
            </label>
            {phone && groups && (
              <label className="fa-field">
                {text(locale, c("Locations (optional)", "Ubicaciones (opcional)"))}
                <select
                  name="locations"
                  value={draft.locations ?? ""}
                  onChange={(e) => setDraft({ ...draft, locations: e.target.value })}
                >
                  <option value="">
                    {text(locale, c("Select if known", "Elige si lo sabes"))}
                  </option>
                  {["1", "2–5", "6–20", "21+", "Not sure"].map((v) => (
                    <option key={v} value={v}>
                      {v === "Not sure" ? text(locale, c(v, "No lo sé")) : v}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <p className="fa-small mb-5">
              {text(
                locale,
                c(
                  "Business context only. Do not include patient or confidential personal details. Applying context shares it with our Cal.com booking provider, not website analytics.",
                  "Solo contexto empresarial. No incluyas datos de pacientes ni personales confidenciales. Aplicarlo comparte el contexto con Cal.com, no con la analítica del sitio.",
                ),
              )}
            </p>
            <button className="fa-button" type="submit">
              {text(locale, c("Use this context", "Usar este contexto"))}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </details>
        {status && (
          <p role="status" className="fa-small fa-context-status">
            {text(
              locale,
              c(
                "Context applied. Choose a time below. You can reopen the form to edit or clear it.",
                "Contexto aplicado. Elige un horario abajo. Puedes volver a abrir el formulario para editarlo o borrarlo.",
              ),
            )}
          </p>
        )}
        {config ? (
          <CalEmbed key={`${service}-${revision}`} config={config} service={service} />
        ) : (
          <p role="status">
            {text(locale, c("Loading the booking calendar…", "Cargando calendario…"))}
          </p>
        )}
        <div className="fa-calendar-ready">
          <h3 className="font-medium">
            {text(locale, c("Prepare for your call", "Prepara tu llamada"))}
          </h3>
          <p>
            {text(
              locale,
              c(
                "After booking, check Cal’s confirmation for your meeting link and timezone. Bring your scheduling-system name, your main call-handling priority and any relevant approvers. No patient information is needed.",
                "Después de reservar, revisa en la confirmación de Cal el enlace y la zona horaria. Trae el nombre del sistema de citas, tu prioridad y los responsables pertinentes. No necesitamos datos de pacientes.",
              ),
            )}
          </p>
          {phone && (
            <p>
              {text(
                locale,
                c(
                  "If scope and deliverability are clear and you choose to proceed, agreement and initial payment start configuration. Testing and practice approval come before activation.",
                  "Si el alcance y la viabilidad están claros y decides continuar, el acuerdo y el pago inicial comienzan la configuración. Las pruebas y la aprobación de la clínica preceden a la activación.",
                ),
              )}
            </p>
          )}
          <Link href={phone ? "/phone-agent#demo" : "/demos"}>
            {text(locale, c("See the demonstrations", "Ver las demostraciones"))}
          </Link>
        </div>
      </section>
    </div>
  );
}
