"use client";
import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { Eyebrow } from "./primitives";
const steps = [
  {
    title: c("Enquiry", "Consulta"),
    subtitle: c("A new patient asks for an appointment.", "Un nuevo paciente solicita cita."),
    input: c("A routine check-up request", "Solicitud de revisión habitual"),
    output: c(
      "The appointment type and preferred time are discussed.",
      "Se conversa sobre el tipo de cita y horario preferido.",
    ),
    boundary: c(
      "Your practice defines the supported appointment types.",
      "Tu clínica define los tipos de cita admitidos.",
    ),
  },
  {
    title: c("Availability", "Disponibilidad"),
    subtitle: c("The recording offers a choice of times.", "La grabación ofrece varios horarios."),
    input: c("Requested day and appointment type", "Día solicitado y tipo de cita"),
    output: c(
      "The caller selects from the offered times.",
      "La persona elige uno de los horarios ofrecidos.",
    ),
    boundary: c(
      "Your actual scheduling connection must be assessed and tested.",
      "Tu conexión real de agenda debe evaluarse y probarse.",
    ),
  },
  {
    title: c("Confirmation", "Confirmación"),
    subtitle: c("A Google Calendar booking appears.", "Aparece una reserva en Google Calendar."),
    input: c("Selected time and caller details", "Horario elegido y datos de contacto"),
    output: c(
      "The recording shows a booking record and a spoken confirmation.",
      "La grabación muestra un registro de reserva y una confirmación hablada.",
    ),
    boundary: c(
      "This is recorded behaviour, not evidence of a live practice deployment.",
      "Es un comportamiento grabado, no evidencia de implementación en una clínica real.",
    ),
  },
];
export function WorkflowExplorer() {
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];
  if (!step) return null;
  return (
    <div className="fa-workflow">
      <div className="fa-workflow-top">
        <Eyebrow>{text(locale, c("The recorded sequence", "La secuencia grabada"))}</Eyebrow>
        <span className="fa-small">
          {text(locale, c("Explanation of the recording", "Explicación de la grabación"))}
        </span>
      </div>
      <div
        className="fa-workflow-tabs"
        role="tablist"
        aria-label={text(locale, c("Booking sequence", "Secuencia de reserva"))}
      >
        {steps.map((s, i) => (
          <button
            key={i}
            role="tab"
            id={`workflow-tab-${i}`}
            aria-selected={active === i}
            aria-controls="workflow-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (i + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
                setActive(next);
                document.getElementById(`workflow-tab-${next}`)?.focus();
              }
            }}
          >
            <span>0{i + 1}</span>
            {text(locale, s.title)}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div
        className="fa-workflow-panel"
        id="workflow-panel"
        role="tabpanel"
        aria-labelledby={`workflow-tab-${active}`}
      >
        <h3>{text(locale, step.subtitle)}</h3>
        <dl>
          <div>
            <dt>{text(locale, c("Starts with", "Empieza con"))}</dt>
            <dd>{text(locale, step.input)}</dd>
          </div>
          <div>
            <dt>{text(locale, c("Shown in the recording", "Mostrado en la grabación"))}</dt>
            <dd>{text(locale, step.output)}</dd>
          </div>
        </dl>
        <p className="fa-workflow-boundary">{text(locale, step.boundary)}</p>
      </div>
    </div>
  );
}
