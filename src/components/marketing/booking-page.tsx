"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { CalEmbed } from "@/components/booking/cal-embed";
import { c, text, offers, serviceId, type ServiceId } from "@/lib/marketing-copy";
import { analyticsAllowed, attribution, recordEvent } from "@/lib/funnel-client";
import { Eyebrow } from "./primitives";

export function BookingPage({ initialService = "general" }: { initialService?: ServiceId }) {
  const { locale } = useLocale();
  const [service, setService] = useState(initialService);
  const [ready, setReady] = useState(false);
  const [config, setConfig] = useState<Record<string, string>>({});
  const [revision, setRevision] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const offer = offers.find((x) => x.id === service);
  const phone = service === "phone-agent";
  const metadata = useMemo(() => ({ "metadata[service]": service }), [service]);
  const continueToCalendar = (notes: string) => {
    const params = attribution();
    const next: Record<string, string> = { ...metadata };
    if (notes) next.notes = notes;
    for (const [key, value] of Object.entries(params)) {
      next[key === "ref" ? "metadata[ref]" : key] = value;
      next[`metadata[${key}]`] = value;
    }
    if (analyticsAllowed()) {
      try {
        const journey = sessionStorage.getItem("fa-journey");
        if (journey) next["metadata[journeyId]"] = journey;
      } catch {
        /* Calendar works with storage disabled. */
      }
    }
    setConfig(next);
    setRevision(revision + 1);
    setReady(true);
    recordEvent(notes ? "qualification_complete" : "calendar_ready", { service });
  };
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
                  "See the relevant workflow, discuss your scheduling setup and understand configuration, scope and investment.",
                  "Mira el proceso relevante, comenta tu sistema de citas y comprende configuración, alcance e inversión.",
                )
              : c(
                  "Bring one process or priority. We’ll explore what is possible, what depends on your systems and whether there is a useful fit.",
                  "Trae un proceso o prioridad. Exploraremos posibilidades, dependencias de tus sistemas y si hay un encaje útil.",
                ),
          )}
        </p>
        <ul className="fa-book-agenda">
          {[
            c(
              "Understand the problem and your decision process.",
              "Entender el problema y tu proceso de decisión.",
            ),
            c(
              "Show a relevant example and assess requirements.",
              "Mostrar un ejemplo relevante y evaluar requisitos.",
            ),
            c(
              "Discuss scope, investment and the next decision.",
              "Comentar alcance, inversión y siguiente decisión.",
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
              "Bring an owner or authorised decision-maker. Groups may need further technical or procurement meetings. Your confirmation includes a Cal Video link.",
              "Invita al propietario o a quien pueda decidir. Los grupos pueden necesitar más reuniones técnicas o de compras. La confirmación incluye un enlace de Cal Video.",
            ),
          )}
        </p>
        {phone && (
          <Link className="fa-text-link" href="/phone-agent#demo">
            {text(locale, c("Watch the demonstration first", "Ver primero la demostración"))} ↗
          </Link>
        )}
        <p className="fa-small">
          {text(locale, c("Prefer email?", "¿Prefieres correo?"))}{" "}
          <a className="underline" href="mailto:support@flowaudit.co.uk">
            support@flowaudit.co.uk
          </a>
        </p>
      </section>
      <section className="fa-book-card">
        {!ready ? (
          <>
            <h2>{text(locale, c("A little context helps.", "Un poco de contexto ayuda."))}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                setDraft(
                  Object.fromEntries(
                    [...form.entries()].map(([key, value]) => [key, String(value)]),
                  ),
                );
                const note = [
                  `Service: ${service}`,
                  `Business: ${String(form.get("business") ?? "").trim()}`,
                  `Website: ${String(form.get("website") ?? "").trim()}`,
                  `Role: ${String(form.get("role") ?? "")}`,
                  `Priority: ${String(form.get("priority") ?? "").trim()}`,
                  phone
                    ? `Locations: ${String(form.get("locations") ?? "")}; call volume: ${String(form.get("volume") ?? "")}`
                    : "",
                ]
                  .filter(Boolean)
                  .join("\n");
                continueToCalendar(note);
              }}
            >
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
              <label className="fa-field">
                {text(locale, c("Business or practice name", "Nombre de empresa o clínica"))}
                <input
                  name="business"
                  defaultValue={draft.business}
                  required
                  maxLength={120}
                  autoComplete="organization"
                />
              </label>
              <label className="fa-field">
                {text(locale, c("Website (optional)", "Sitio web (opcional)"))}
                <input
                  name="website"
                  defaultValue={draft.website}
                  type="url"
                  maxLength={200}
                  placeholder="https://"
                  inputMode="url"
                  autoComplete="url"
                />
              </label>
              <label className="fa-field">
                {text(locale, c("Your role", "Tu función"))}
                <select name="role" required defaultValue={draft.role ?? ""}>
                  <option value="" disabled>
                    {text(locale, c("Select your role", "Elige tu función"))}
                  </option>
                  {[
                    "Owner / partner",
                    "Operations leader",
                    "Group executive",
                    "Team member / other",
                  ].map((role) => (
                    <option key={role} value={role}>
                      {text(
                        locale,
                        role === "Owner / partner"
                          ? c(role, "Propietario / socio")
                          : role === "Operations leader"
                            ? c(role, "Responsable de operaciones")
                            : role === "Group executive"
                              ? c(role, "Directivo de grupo")
                              : c(role, "Miembro del equipo / otro"),
                      )}
                    </option>
                  ))}
                </select>
              </label>
              <label className="fa-field">
                {text(locale, c("What would you like to improve?", "¿Qué te gustaría mejorar?"))}
                <textarea name="priority" defaultValue={draft.priority} required maxLength={500} />
              </label>
              {phone && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="fa-field">
                    {text(locale, c("Locations (optional)", "Ubicaciones (opcional)"))}
                    <select name="locations" defaultValue={draft.locations ?? ""}>
                      <option value="">{text(locale, c("Select", "Elegir"))}</option>
                      {["1", "2–5", "6–20", "21+"].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </label>
                  <label className="fa-field">
                    {text(locale, c("Calls per day (optional)", "Llamadas al día (opcional)"))}
                    <select name="volume" defaultValue={draft.volume ?? ""}>
                      <option value="">{text(locale, c("Select", "Elegir"))}</option>
                      {["Under 25", "25–100", "100+", "Not sure"].map((x) => (
                        <option key={x} value={x}>
                          {text(
                            locale,
                            x === "Under 25"
                              ? c(x, "Menos de 25")
                              : x === "Not sure"
                                ? c(x, "No lo sé")
                                : c(x, x),
                          )}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              <p className="fa-small mb-5">
                {text(
                  locale,
                  c(
                    "Business context only. Do not include patient or confidential personal details. Continuing shares this context with our Cal.com booking provider.",
                    "Solo contexto empresarial. No incluyas datos de pacientes ni personales confidenciales. Continuar comparte este contexto con Cal.com, nuestro proveedor de reservas.",
                  ),
                )}
              </p>
              <button className="fa-button" type="submit">
                {text(locale, c("Continue to available times", "Continuar a horarios disponibles"))}
                <span aria-hidden="true">→</span>
              </button>
            </form>
            <button className="fa-text-link mt-4" onClick={() => continueToCalendar("")}>
              {text(locale, c("Or go straight to the calendar", "O ir directamente al calendario"))}{" "}
              ↗
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <h2>{text(locale, c("Choose your time", "Elige tu horario"))}</h2>
              <button className="fa-text-link" onClick={() => setReady(false)}>
                {text(locale, c("Edit context", "Editar contexto"))}
              </button>
            </div>
            <p className="fa-small mb-6">
              {text(locale, offer?.label ?? c("General fit assessment", "Evaluación general"))} · 15
              min · Cal Video
            </p>
            <CalEmbed key={revision} config={config} />
            <div className="fa-calendar-ready">
              <h3 className="font-medium">
                {text(locale, c("After you book", "Después de reservar"))}
              </h3>
              <p>
                {text(
                  locale,
                  c(
                    "Check your confirmation for the meeting link. Invite other decision-makers and review the relevant demonstration before the call.",
                    "Revisa el enlace de reunión en la confirmación. Invita a otros responsables y mira la demostración relevante antes de la llamada.",
                  ),
                )}
              </p>
              <Link href={phone ? "/phone-agent#demo" : "/demos"}>
                {text(locale, c("See the demonstrations", "Ver las demostraciones"))}
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
