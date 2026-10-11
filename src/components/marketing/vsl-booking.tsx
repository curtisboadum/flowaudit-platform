"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { recordEventOnce } from "@/lib/funnel-client";
import { BookingPage } from "./booking-page";

const questions = [
  {
    name: "practiceType",
    label: c("Practice type", "Tipo de clínica"),
    options: [
      c("Independent practice", "Clínica independiente"),
      c("Multi-location group or DSO", "Grupo con varias ubicaciones o DSO"),
      c("Other", "Otro"),
    ],
  },
  {
    name: "supportNeed",
    label: c("Main support need", "Principal necesidad de apoyo"),
    options: [
      c("Busy periods", "Periodos de actividad"),
      c("After hours", "Fuera de horario"),
      c("Both", "Ambos"),
      c("Exploring the fit", "Explorar si encaja"),
    ],
  },
] as const;
const storageKey = "fa-vsl-qualification";
type Answers = Record<string, string>;
function valid(answers: Answers) {
  return questions.every((q) => q.options.some((option) => option.en === answers[q.name]));
}

export function VslBooking() {
  const { locale } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [answers, setAnswers] = useState<Answers>({});
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const calendar = params.get("step") === "calendar";
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) ?? "{}");
      const saved = stored.answers ?? stored;
      if (saved && typeof saved === "object") {
        const safe: Answers = {};
        for (const q of questions) {
          if (q.options.some((option) => option.en === saved[q.name])) safe[q.name] = saved[q.name];
        }
        setAnswers(safe);
        setCompleted(stored.completed === true && valid(safe));
      }
    } catch {
      /* Functional form state does not depend on browser storage. */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) heading.current?.focus();
  }, [calendar, loaded]);
  const navigate = (next: boolean) => {
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("step", "calendar");
    else url.searchParams.delete("step");
    router.push(url.pathname + url.search, { scroll: true });
  };
  if (!loaded)
    return (
      <p className="fa-container" role="status">
        {text(locale, c("Loading your next step…", "Cargando el siguiente paso…"))}
      </p>
    );
  if (calendar && completed && valid(answers)) {
    const notes = `Practice type: ${answers.practiceType}\nMain support need: ${answers.supportNeed}`;
    return (
      <BookingPage
        initialService="phone-agent"
        initialNotes={notes}
        onBack={() => navigate(false)}
      />
    );
  }
  return (
    <section className="fa-container fa-qualification">
      <p className="fa-eyebrow">
        {text(locale, c("15-minute demo & fit assessment", "Demo y evaluación de 15 minutos"))}
      </p>
      <h1 ref={heading} tabIndex={-1}>
        {text(locale, c("Tell us what you need.", "Cuéntanos qué necesitas."))}
      </h1>
      <p>
        {text(
          locale,
          c(
            "Two quick questions, then choose your time.",
            "Dos preguntas breves, después elige tu horario.",
          ),
        )}
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!valid(answers)) return;
          recordEventOnce("qualification_complete", {
            service: "phone-agent",
            mediaId: "overview",
          });
          setCompleted(true);
          try {
            sessionStorage.setItem(storageKey, JSON.stringify({ answers, completed: true }));
          } catch {
            /* In-memory completion still works. */
          }
          navigate(true);
        }}
      >
        {questions.map((q) => (
          <fieldset key={q.name}>
            <legend>{text(locale, q.label)}</legend>
            {q.options.map((option) => (
              <label className="fa-radio-option" key={option.en}>
                <input
                  type="radio"
                  name={q.name}
                  value={option.en}
                  required
                  checked={answers[q.name] === option.en}
                  onChange={() => {
                    const next = { ...answers, [q.name]: option.en };
                    setAnswers(next);
                    try {
                      sessionStorage.setItem(
                        storageKey,
                        JSON.stringify({ answers: next, completed: false }),
                      );
                    } catch {
                      /* In-memory answers remain usable. */
                    }
                    recordEventOnce("qualification_start", {
                      service: "phone-agent",
                      mediaId: "overview",
                    });
                  }}
                />
                <span>{text(locale, option)}</span>
              </label>
            ))}
          </fieldset>
        ))}
        <p className="fa-small">
          {text(
            locale,
            c(
              "Your answers accompany the booking through Cal.com. No patient information is needed.",
              "Tus respuestas acompañan la reserva a través de Cal.com. No necesitamos datos de pacientes.",
            ),
          )}
        </p>
        <button type="submit" className="fa-button">
          {text(locale, c("Continue", "Continuar"))} <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}
