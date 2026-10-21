"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { CalEmbed } from "@/components/booking/cal-embed";
import { c, text, offers, type ServiceId } from "@/lib/marketing-copy";
import { attribution } from "@/lib/funnel-client";
import { Eyebrow } from "./primitives";

export function BookingPage({
  initialService = "general",
  initialNotes = "",
  onBack,
}: {
  initialService?: ServiceId;
  initialNotes?: string;
  onBack?: () => void;
}) {
  const { locale } = useLocale();
  const [config, setConfig] = useState<Record<string, string> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Keep this booking session stable across query-only navigation as well as UI changes.
  // A fresh page visit starts a new session with the new offer/context.
  const [session] = useState(() => ({ service: initialService, notes: initialNotes }));
  const service = session.service;
  const offer = offers.find((item) => item.id === service);
  useEffect(() => {
    const next: Record<string, string> = { "metadata[service]": session.service };
    if (session.notes) next.notes = session.notes;
    for (const [key, value] of Object.entries(attribution())) {
      next[key === "ref" ? "metadata[ref]" : key] = value;
      next[`metadata[${key}]`] = value;
    }
    // Initialize once. Context belongs to Cal's native optional Notes field;
    // consent/UI changes must never replace an iframe with a selected slot.
    setConfig(next);
    if (session.notes) headingRef.current?.focus();
  }, [session]);
  return (
    <div className="fa-container fa-book-grid">
      <section className="fa-book-intro">
        <Eyebrow>
          {text(locale, c("Demo & fit assessment", "Demo y evaluación"))}
          <span>15 min</span>
        </Eyebrow>
        <h1 ref={headingRef} tabIndex={session.notes ? -1 : undefined}>
          {text(locale, c("Let’s talk about\nyour business.", "Hablemos de\ntu empresa."))}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Bring the calls you need help with and the way your team works. We’ll explore your setup and a practical place to start.",
              "Trae las llamadas en las que necesitas ayuda y cómo trabaja tu equipo. Exploraremos tu sistema y un punto de partida práctico.",
            ),
          )}
        </p>
        <ul className="fa-book-agenda">
          {[
            c(
              "The enquiries and interruptions you want help with.",
              "Las consultas e interrupciones en las que necesitas ayuda.",
            ),
            c(
              "Your current phone, scheduling and handoff setup.",
              "Tu sistema actual de teléfono, agenda y traspasos.",
            ),
            c(
              "Requirements, questions and a sensible next step.",
              "Requisitos, dudas y un siguiente paso útil.",
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
              "For owners, general managers and the people running daily operations. No need to watch a film or fill in a separate questionnaire first.",
              "Para propietarios, gerentes y responsables de las operaciones diarias. No necesitas ver un vídeo ni completar otro cuestionario antes.",
            ),
          )}
        </p>
        <Link className="fa-text-link" href="/demos">
          {text(locale, c("Review the recorded examples", "Ver los ejemplos grabados"))} ↗
        </Link>
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
        <p className="fa-small mb-6">
          {text(
            locale,
            c(
              "Check the timezone shown in the calendar. Cal collects your name and email once.",
              "Comprueba la zona horaria que muestra el calendario. Cal recoge tu nombre y correo una sola vez.",
            ),
          )}
        </p>
        {onBack && (
          <button className="fa-text-link fa-qualification-back" type="button" onClick={onBack}>
            {text(locale, c("← Back to questions", "← Volver a las preguntas"))}
          </button>
        )}
        <details className="fa-book-context">
          <summary>
            {text(
              locale,
              c(
                "What to add in Additional notes (optional)",
                "Qué añadir en Notas adicionales (opcional)",
              ),
            )}
          </summary>
          <p className="fa-small">
            {text(
              locale,
              c(
                "After choosing a time, you can add your industry, main call-handling problem and current phone or scheduling setup in Cal’s Additional notes field. This stays with your booking; no separate website form or calendar reload is needed.",
                "Después de elegir un horario, puedes añadir tu sector, el principal problema con las llamadas y tu sistema telefónico o de agenda en el campo Notas adicionales de Cal. Se guarda con tu reserva; no necesitas otro formulario ni recargar el calendario.",
              ),
            )}
          </p>
          <p className="fa-small">
            {text(
              locale,
              c(
                "Business context only. Do not include patient details, customer records, passwords or confidential personal information. Notes go to our booking provider, not website analytics.",
                "Solo contexto empresarial. No incluyas datos de pacientes, registros de clientes, contraseñas ni información personal confidencial. Las notas van al proveedor de reservas, no a la analítica del sitio.",
              ),
            )}
          </p>
        </details>
        {config ? (
          <CalEmbed config={config} service={service} />
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
                "Check Cal’s confirmation for your meeting link and timezone. Bring your main priority and any questions about the setup. No customer or patient records are needed.",
                "Revisa la confirmación de Cal para ver el enlace y la zona horaria. Trae tu prioridad y las dudas sobre el sistema. No necesitamos registros de clientes ni de pacientes.",
              ),
            )}
          </p>
          <Link href="/demos">
            {text(locale, c("See the demonstrations", "Ver las demostraciones"))}
          </Link>
        </div>
      </section>
    </div>
  );
}
