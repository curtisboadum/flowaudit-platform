"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { recordEventOnce } from "@/lib/funnel-client";
import {
  qualificationOptions,
  qualificationStorageKey,
  sanitizeAnswers,
  stepValid,
  qualificationValid,
  qualificationNotes,
  type QualificationAnswers,
} from "@/lib/vsl-qualification";
import { BookingPage } from "./booking-page";
let memoryAnswers: QualificationAnswers = {};
let memoryCompleted = false;
const steps = ["context", "need", "readiness", "calendar"];
const labels = [
  c("What kind of practice?", "¿Qué tipo de clínica?"),
  c("Where would support help most?", "¿Dónde necesitas más apoyo?"),
  c("How are you approaching this decision?", "¿Cómo estás abordando esta decisión?"),
];
const keys = ["practiceType", "supportNeed", "readiness"] as const;
const spanish: Record<string, string> = {
  "Independent practice": "Clínica independiente",
  "Multi-location group or DSO": "Grupo con varias ubicaciones o DSO",
  Other: "Otro",
  "Busy periods": "Periodos de actividad",
  "After hours": "Fuera de horario",
  Both: "Ambos",
  "Exploring the fit": "Explorar si encaja",
  "I can approve the project": "Puedo aprobar el proyecto",
  "Evaluating with an approver": "Lo evalúo con quien aprueba",
  "Early research": "Investigación inicial",
};
export function VslBooking() {
  const { locale } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [answers, setAnswers] = useState<QualificationAnswers>({});
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const requested = Math.max(0, steps.indexOf(params.get("step") ?? "context"));
  const [step, setStep] = useState(0);
  const answersRef = useRef<QualificationAnswers>({});
  const completedRef = useRef(false);
  useEffect(() => {
    if (!loaded) return;
    const missing = [0, 1, 2].find((s) => !stepValid(answersRef.current, s)) ?? 3;
    const safeStep = Math.min(requested, missing, completedRef.current ? 3 : 2);
    setStep(safeStep);
    if (safeStep !== requested) {
      const url = new URL(window.location.href);
      url.searchParams.set("step", steps[safeStep]!);
      router.replace(url.pathname + url.search, { scroll: false });
    }
  }, [requested, loaded, router]);
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(qualificationStorageKey) ?? "{}");
      const safe = sanitizeAnswers(stored?.answers ?? stored);
      answersRef.current = safe;
      completedRef.current =
        stored?.version === 2 && stored?.completed === true && qualificationValid(safe);
      setAnswers(safe);
      setCompleted(completedRef.current);
    } catch {
      answersRef.current = memoryAnswers;
      completedRef.current = memoryCompleted && qualificationValid(memoryAnswers);
      setAnswers(memoryAnswers);
      setCompleted(completedRef.current);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      heading.current?.focus();
      setError("");
    }
  }, [step, loaded]);
  function save(next: QualificationAnswers, done = false) {
    memoryAnswers = next;
    memoryCompleted = done;
    answersRef.current = next;
    completedRef.current = done;
    setAnswers(next);
    setCompleted(done);
    try {
      sessionStorage.setItem(
        qualificationStorageKey,
        JSON.stringify({ version: 2, answers: next, completed: done }),
      );
    } catch {
      /* Keep in-memory answers. */
    }
  }
  function navigate(next: number) {
    const url = new URL(window.location.href);
    url.searchParams.set("step", steps[next]!);
    router.push(url.pathname + url.search, { scroll: true });
  }
  function change(key: keyof QualificationAnswers, value: string) {
    save({ ...answers, [key]: value });
    setError("");
    recordEventOnce("qualification_start", { service: "phone-agent", mediaId: "overview" });
  }
  if (!loaded)
    return (
      <p className="fa-container" role="status">
        {text(locale, c("Loading your next step…", "Cargando el siguiente paso…"))}
      </p>
    );
  if (step === 3 && completed && qualificationValid(answers))
    return (
      <BookingPage
        initialService="phone-agent"
        initialNotes={qualificationNotes(answers)}
        onBack={() => navigate(2)}
      />
    );
  const key = keys[step]!;
  return (
    <section className="fa-container fa-qualification">
      <p className="fa-eyebrow">
        {text(locale, c("15-minute demo & fit assessment", "Demo y evaluación de 15 minutos"))}
      </p>
      <p className="fa-qualification-progress">
        {text(
          locale,
          c(
            `Question ${step + 1} of 3 · Then choose your time`,
            `Pregunta ${step + 1} de 3 · Después elige tu horario`,
          ),
        )}
      </p>
      <progress
        max={3}
        value={step + 1}
        aria-label={text(locale, c("Question progress", "Progreso de preguntas"))}
      />
      <h1 ref={heading} tabIndex={-1}>
        {text(locale, labels[step]!)}
      </h1>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!stepValid(answers, step)) {
            setError(
              text(
                locale,
                c(
                  answers.practiceType === "Other" && step === 0
                    ? "Briefly describe your practice to continue."
                    : "Choose an option to continue.",
                  answers.practiceType === "Other" && step === 0
                    ? "Describe brevemente tu clínica para continuar."
                    : "Elige una opción para continuar.",
                ),
              ),
            );
            return;
          }
          if (step === 2) {
            save(answers, true);
            recordEventOnce("qualification_complete", {
              service: "phone-agent",
              mediaId: "overview",
            });
          }
          navigate(step + 1);
        }}
      >
        <fieldset aria-describedby={error ? "qualification-error" : undefined}>
          <legend className="sr-only">{text(locale, labels[step]!)}</legend>
          {qualificationOptions[key].map((option) => (
            <label className="fa-radio-option" key={option}>
              <input
                type="radio"
                name={key}
                value={option}
                checked={answers[key] === option}
                onChange={() => change(key, option)}
              />
              <span>{locale === "es" ? spanish[option] : option}</span>
            </label>
          ))}
        </fieldset>
        {step === 0 && answers.practiceType === "Other" && (
          <label className="fa-field">
            {text(locale, c("Briefly describe your practice", "Describe brevemente tu clínica"))}
            <input
              name="practiceDetail"
              maxLength={120}
              value={answers.practiceDetail ?? ""}
              onChange={(e) => change("practiceDetail", e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "qualification-error" : undefined}
            />
          </label>
        )}
        {step === 2 && (
          <label className="fa-field">
            {text(
              locale,
              c(
                "Anything else we should know? (optional)",
                "¿Algo más que debamos saber? (opcional)",
              ),
            )}
            <textarea
              name="context"
              rows={2}
              maxLength={240}
              value={answers.context ?? ""}
              onChange={(e) => change("context", e.target.value)}
            />
          </label>
        )}
        {error && (
          <p id="qualification-error" className="fa-form-error" role="alert">
            {error}
          </p>
        )}
        <p className="fa-small">
          {text(
            locale,
            c(
              "Business context only. No patient details. Your answers accompany your booking; Cal collects your name and email once.",
              "Solo contexto empresarial. Sin datos de pacientes. Tus respuestas acompañan la reserva; Cal solicita nombre y correo una sola vez.",
            ),
          )}
        </p>
        <div className="fa-qualification-actions">
          {step > 0 ? (
            <button className="fa-text-link" type="button" onClick={() => navigate(step - 1)}>
              {text(locale, c("← Back", "← Atrás"))}
            </button>
          ) : (
            <a className="fa-text-link" href="/phone-agent#demo">
              {text(locale, c("← Back to film", "← Volver al vídeo"))}
            </a>
          )}
          <button type="submit" className="fa-button">
            {text(
              locale,
              step === 2 ? c("Choose a time", "Elegir horario") : c("Continue", "Continuar"),
            )}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}
