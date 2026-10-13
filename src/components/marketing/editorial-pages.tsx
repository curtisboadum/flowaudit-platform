"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { industries, posts } from "@/lib/editorial-copy";
import { c, text, offers } from "@/lib/marketing-copy";
import { Arrow, BookLink, Closing, Eyebrow, FaqSection, SectionHeading } from "./primitives";
import { EvidenceArt } from "./evidence-art";
import { MediaPlayer } from "./media-player";
import { StickyCta } from "./sticky-cta";

const BOOK_SERVICE = "phone-agent" as const;

export function IndustryPage({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const data = industries[slug];
  if (!data) return null;
  const steps = [
    [
      c("The 15-minute call", "La llamada de 15 minutos"),
      c(
        "We look at how your calls are handled now and what a first flow would cover.",
        "Vemos cómo se gestionan hoy tus llamadas y qué cubriría un primer flujo.",
      ),
    ],
    [
      c("We build and test", "Lo construimos y probamos"),
      c(
        "Your flow is built around your call types and tested against real examples before anyone hears it.",
        "Tu flujo se construye según tus tipos de llamada y se prueba con ejemplos reales antes de que lo oiga nadie.",
      ),
    ],
    [
      c("You approve, then live", "Tú apruebas, y se activa"),
      c(
        "You sign off the script and rules. It answers on your number, and you get a summary after every call.",
        "Das el visto bueno al guion y a las reglas. Responde en tu número y recibes un resumen tras cada llamada.",
      ),
    ],
  ] as const;
  return (
    <>
      <section className="fa-container fa-hero">
        <div className="fa-hero-copy">
          <Eyebrow>{text(locale, data.name)}</Eyebrow>
          <h1>{text(locale, data.hero)}</h1>
          <p className="fa-lead">{text(locale, data.lead)}</p>
          <div className="fa-hero-actions">
            <BookLink service={BOOK_SERVICE} />
            <a href="#recording" className="fa-text-link">
              {text(locale, c("Hear the recorded call (1:31)", "Escuchar la llamada grabada (1:31)"))}
              <Arrow diagonal />
            </a>
          </div>
          <p className="fa-small">
            {text(
              locale,
              c(
                "See an example first. Discuss the fit. Agree the next step.",
                "Mira un ejemplo. Valora si encaja. Acuerda el siguiente paso.",
              ),
            )}
          </p>
        </div>
        <EvidenceArt href="#recording" />
      </section>
      <div className="fa-container fa-trust-strip">
        <span>{text(locale, c("Built and supported in the UK", "Creado y con soporte en el Reino Unido"))}</span>
        <span>
          {text(
            locale,
            c(
              "You approve the script and the rules before it goes live",
              "Tú apruebas el guion y las reglas antes de activarlo",
            ),
          )}
        </span>
        <span>{text(locale, c("One summary after every call", "Un resumen tras cada llamada"))}</span>
      </div>
      <section className="fa-container fa-section">
        <SectionHeading
          number="01"
          label={c("The cost of a missed call", "El coste de una llamada perdida")}
          title={data.painTitle}
          body={data.painLead}
        />
        <div className="fa-problem-grid">
          {data.pain.map((p, i) => (
            <article key={i}>
              <span className="fa-problem-index">0{i + 1}</span>
              <h3>{text(locale, p.title)}</h3>
              <p>{text(locale, p.body)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="fa-services-band" id="what-it-does">
        <div className="fa-container fa-section">
          <SectionHeading
            number="02"
            label={c("What you get", "Lo que obtienes")}
            title={data.capabilitiesTitle}
            body={data.capabilitiesLead}
          />
          <div className="fa-capability-grid">
            {data.capabilities.map((cap, i) => (
              <article key={i}>
                <span className="fa-step-number">0{i + 1}</span>
                <h3>{text(locale, cap.title)}</h3>
                <p>
                  {text(locale, cap.body)}
                  <span className="fa-capability-example">{text(locale, cap.example)}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="fa-container fa-section" id="recording">
        <SectionHeading
          number="03"
          label={c("The recorded example", "El ejemplo grabado")}
          title={data.recordingTitle}
          body={data.recordingLead}
        />
        <MediaPlayer film="routine" compact standalone />
        <p className="fa-small fa-recording-note">
          {text(
            locale,
            c(
              "Privacy beeps and edited labels are disclosed. It is a demonstration, not a customer result.",
              "Se indican los pitidos de privacidad y las etiquetas editadas. Es una demostración, no un resultado de cliente.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section fa-trust">
        <div>
          <Eyebrow>{text(locale, c("Your rules, your approval", "Tus reglas, tu aprobación"))}</Eyebrow>
          <h2>{text(locale, data.rulesTitle)}</h2>
        </div>
        <div>
          <p className="fa-lead">{text(locale, data.rulesBody)}</p>
        </div>
      </section>
      <section className="fa-container fa-section">
        <SectionHeading
          number="04"
          label={c("How it starts", "Cómo empieza")}
          title={c("From a call to a tested flow.", "De una llamada a un flujo probado.")}
          body={c(
            "No long onboarding and no blind go-live. The first flow is small, tested and yours.",
            "Sin incorporaciones largas y sin activar a ciegas. El primer flujo es pequeño, probado y tuyo.",
          )}
        />
        <ol className="fa-process fa-process-3">
          {steps.map(([title, body], i) => (
            <li key={i}>
              <span className="fa-step-number">0{i + 1}</span>
              <h3>{text(locale, title)}</h3>
              <p>{text(locale, body)}</p>
            </li>
          ))}
        </ol>
      </section>
      <FaqSection items={data.faq} />
      <section className="fa-container fa-section fa-cross-sell">
        <Eyebrow>{text(locale, c("Beyond the phone", "Más allá del teléfono"))}</Eyebrow>
        <p className="fa-lead">{text(locale, data.crossLead)}</p>
        <div className="fa-cross-list">
          {data.cross.map((item) => {
            const offer = offers.find((o) => o.path === item.href);
            if (!offer) return null;
            return (
              <Link key={item.href} href={item.href} className="fa-cross-row">
                <span className="fa-cross-label">{text(locale, offer.label)}</span>
                <p>{text(locale, item.line)}</p>
                <Arrow diagonal />
              </Link>
            );
          })}
        </div>
      </section>
      <Closing service={BOOK_SERVICE} title={data.closingTitle} body={data.closingBody} />
      <StickyCta />
    </>
  );
}
export function BlogIndex() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, c("Field notes", "Notas prácticas"))}</Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "Think clearly\nabout the next improvement.",
              "Piensa con claridad\nen la siguiente mejora.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Practical frameworks for scoping work, comparing options and measuring what a system actually changes.",
              "Marcos prácticos para definir trabajo, comparar opciones y medir qué cambia realmente un sistema.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section fa-note-list">
        {Object.entries(posts).map(([slug, p]) => (
          <Link href={`/blog/${slug}`} key={slug}>
            <div>
              <h2>{text(locale, p.title)}</h2>
              <p>{text(locale, p.intro)}</p>
            </div>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
      <Closing />
    </>
  );
}
export function BlogArticle({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const post = posts[slug];
  if (!post) return null;
  return (
    <>
      <article className="fa-container fa-article">
        <Link href="/blog" className="fa-text-link mb-8">
          ← {text(locale, c("All field notes", "Todas las notas"))}
        </Link>
        <Eyebrow>
          FlowAudit /{" "}
          {text(locale, c("Updated 9 October 2026", "Actualizado el 9 de octubre de 2026"))}
        </Eyebrow>
        <h1>{text(locale, post.title)}</h1>
        <p>{text(locale, post.intro)}</p>
        {post.sections.map((s, i) => (
          <section key={i}>
            <h2>{text(locale, s.title)}</h2>
            <p>{text(locale, s.body)}</p>
          </section>
        ))}
        <div className="mt-10">
          <BookLink service="automation" />
        </div>
      </article>
      <Closing service="automation" />
    </>
  );
}
