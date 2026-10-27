"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalEmbed } from "@/components/booking/cal-embed";
import { recordEventOnce } from "@/lib/funnel-client";
import { Eyebrow } from "./primitives";

type Answers = {
  callHandling?: string;
  urgency?: string;
  authority?: string;
};

const QUESTIONS = [
  {
    key: "callHandling" as const,
    title: "How do you handle calls after hours or when the team is busy?",
    options: [
      "Someone answers all calls",
      "Voicemail or answering service",
      "Calls go unanswered",
      "Not sure",
    ],
  },
  {
    key: "urgency" as const,
    title: "Are you actively looking to fix that?",
    options: ["Yes, now", "Next quarter", "Researching", "No"],
  },
  {
    key: "authority" as const,
    title: "Who approves the spend?",
    options: [
      "I do",
      "I co-approve, and the approver will be on the call",
      "Someone else",
      "Not sure",
    ],
  },
];

const PRICE = {
  pilot: "$1,500",
  setup: "$2,500–$3,800",
  monthly: "$950",
};

function isQualified(answers: Answers) {
  return (
    answers.callHandling !== "Someone answers all calls" &&
    (answers.urgency === "Yes, now" || answers.urgency === "Next quarter") &&
    (answers.authority === "I do" ||
      answers.authority === "I co-approve, and the approver will be on the call")
  );
}

function notesFor(answers: Answers) {
  return [
    `Call handling: ${answers.callHandling}`,
    `Urgency: ${answers.urgency}`,
    `Authority: ${answers.authority}`,
  ].join("\n");
}

function Quote() {
  return (
    <div className="fa-book-quote">
      <p className="fa-quote-line">
        <strong>{PRICE.pilot}</strong> pilot plus usage
      </p>
      <p className="fa-quote-line">
        <strong>{PRICE.setup}</strong> full install setup, then{" "}
        <strong>{PRICE.monthly} a month</strong> plus usage
      </p>
      <p className="fa-quote-small">
        Thirty days to prove it: if it has not booked enough work to cover its
        monthly fee, that month is free. Measured on the appointments it booked,
        at the job value you confirm at scope.
      </p>
    </div>
  );
}

export function EmailBooking({ leadRef = "" }: { leadRef?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  const question = QUESTIONS[step] ?? QUESTIONS[0]!;
  const qualified = useMemo(() => isQualified(answers), [answers]);

  const config = useMemo(() => {
    const next: Record<string, string> = {
      "metadata[service]": "phone-agent",
      "metadata[entry]": "email",
      "metadata[call_handling]": answers.callHandling ?? "",
      "metadata[urgency]": answers.urgency ?? "",
      "metadata[authority]": answers.authority ?? "",
      notes: notesFor(answers),
    };
    if (leadRef) next["metadata[ref]"] = leadRef;
    return next;
  }, [answers, leadRef]);

  function choose(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
    recordEventOnce("qualification_start", { service: "phone-agent" });
  }

  function back() {
    setError("");
    if (finished) {
      setFinished(false);
      return;
    }
    if (step > 0) setStep((current) => current - 1);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answers[question.key]) {
      setError("Choose an option to continue.");
      return;
    }
    if (step < 2) {
      setStep((current) => current + 1);
      return;
    }
    recordEventOnce("qualification_complete", { service: "phone-agent" });
    setFinished(true);
  }

  if (finished && qualified) {
    return (
      <div className="fa-container fa-book-grid">
        <section className="fa-book-intro">
          <Eyebrow>
            15-minute install call<span>15 min</span>
          </Eyebrow>
          <h1>Let&rsquo;s scope the install.</h1>
          <p className="fa-lead">
            You have seen the demo. Here is the ballpark and the next step.
          </p>
          <Quote />
          <ul className="fa-book-agenda">
            <li>
              <span>01</span>
              Your call flow and after-hours rules.
            </li>
            <li>
              <span>02</span>
              The calendar or CRM it has to connect to.
            </li>
            <li>
              <span>03</span>
              Scope, go-live date and the exact price.
            </li>
          </ul>
          <button className="fa-text-link" type="button" onClick={back}>
            ← Back to questions
          </button>
        </section>
        <section className="fa-book-card" id="booking-calendar">
          <h2>Choose your time</h2>
          <p className="fa-small mb-6">15-minute install call · Cal Video</p>
          <CalEmbed config={config} service="phone-agent" />
        </section>
      </div>
    );
  }

  if (finished && !qualified) {
    return (
      <section className="fa-container fa-qualification">
        <Eyebrow>
          15-minute install call<span>15 min</span>
        </Eyebrow>
        <h1>Not the right time yet.</h1>
        <p className="fa-lead">
          You told us you are {answers.urgency?.toLowerCase() ?? "still assessing"} and
          that the decision sits with {answers.authority?.toLowerCase() ?? "someone else"}.
          We are not going to put a call on the calendar until the timing and the
          approver are clear.
        </p>
        <Quote />
        <p className="fa-small">
          If the phones become the bottleneck, reply to the email and I will send
          the one-page scope. No calendar until it is a fit.
        </p>
        <p>
          <a className="fa-text-link" href="mailto:curtis@hiflowaudit.com">
            Email Curtis
          </a>
        </p>
        <button className="fa-text-link" type="button" onClick={back}>
          ← Change my answers
        </button>
      </section>
    );
  }

  return (
    <section className="fa-container fa-qualification">
      <Eyebrow>
        15-minute install call<span>15 min</span>
      </Eyebrow>
      <p className="fa-qualification-progress">
        Question {step + 1} of 3 · Then choose your time
      </p>
      <progress max={3} value={step + 1} aria-label="Question progress" />
      <h1>{question.title}</h1>
      <form noValidate onSubmit={submit}>
        <fieldset aria-describedby={error ? "qualification-error" : undefined}>
          <legend className="sr-only">{question.title}</legend>
          {question.options.map((option) => (
            <label className="fa-radio-option" key={option}>
              <input
                type="radio"
                name={question.key}
                value={option}
                checked={answers[question.key] === option}
                onChange={() => choose(question.key, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
        {error && (
          <p id="qualification-error" className="fa-form-error" role="alert">
            {error}
          </p>
        )}
        <p className="fa-small">
          Business context only. Your answers accompany the booking; Cal collects
          your name and email once.
        </p>
        <div className="fa-qualification-actions">
          {step > 0 ? (
            <button className="fa-text-link" type="button" onClick={back}>
              ← Back
            </button>
          ) : (
            <Link className="fa-text-link" href="/phone-agent#demo">
              ← Back to demo
            </Link>
          )}
          <button type="submit" className="fa-button">
            {step === 2 ? "See the install call" : "Continue"}{" "}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  );
}
