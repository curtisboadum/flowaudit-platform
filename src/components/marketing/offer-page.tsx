"use client";
import Link from "next/link";
import { useState } from "react";
import { recordEvent } from "@/lib/funnel-client";
import { useLocale } from "@/components/providers/locale-provider";
import { offers, c, text, type ServiceId } from "@/lib/marketing-copy";
import {
  Arrow,
  BookLink,
  Closing,
  Eyebrow,
  FaqSection,
  Process,
  SectionHeading,
} from "./primitives";
import { PhoneBuyerDetails } from "./phone-buyer-details";
import { MediaPlayer } from "./media-player";
import { WorkflowExplorer } from "./workflow-explorer";

export function OfferPage({ service }: { service: ServiceId }) {
  const { locale } = useLocale();
  const [seenEnough, setSeenEnough] = useState(false);
  const offer = offers.find((x) => x.id === service);
  if (!offer) return null;
  const phone = service === "phone-agent";
  return (
    <>
      {!phone && (
        <section className={`fa-container fa-hero ${phone ? "fa-phone-hero" : "fa-offer-hero"}`}>
          <div className="fa-hero-copy">
            <Eyebrow>
              <Link href="/services">{text(locale, c("Services", "Servicios"))}</Link>
              <span>/</span>
              {text(locale, offer.label)}
            </Eyebrow>
            <h1>{text(locale, offer.headline)}</h1>
            <p className="fa-lead">{text(locale, offer.intro)}</p>
            <div className="fa-hero-actions">
              <BookLink service={service}>
                {text(locale, c("Book a demo & fit assessment", "Reservar demo y evaluación"))}
              </BookLink>
              {phone && (
                <a href="#demo" className="fa-text-link">
                  {text(locale, c("See the evidence", "Ver la evidencia"))}
                  <Arrow diagonal />
                </a>
              )}
            </div>
            <p className="fa-small">{text(locale, offer.note)}</p>
          </div>
          {!phone && (
            <div className="fa-offer-index">
              <span className="fa-eyebrow">FlowAudit / {text(locale, offer.label)}</span>
              <h2>
                {text(
                  locale,
                  service === "web-design"
                    ? c(
                        "Structure.\nExperience.\nLaunch.",
                        "Estructura.\nExperiencia.\nLanzamiento.",
                      )
                    : service === "revenue-recovery"
                      ? c(
                          "Review.\nApprove.\nFollow through.",
                          "Revisar.\nAprobar.\nDar seguimiento.",
                        )
                      : c("Enquiry.\nAction.\nVisibility.", "Consulta.\nAcción.\nVisibilidad."),
                )}
              </h2>
              <p>
                {text(
                  locale,
                  c(
                    "The scope follows the business need. The next step stays clear.",
                    "El alcance sigue la necesidad de la empresa. El siguiente paso permanece claro.",
                  ),
                )}
              </p>
              <Arrow diagonal />
            </div>
          )}
        </section>
      )}
      {phone && (
        <>
          <section className="fa-container fa-vsl-top" id="demo">
            <div className="fa-vsl-heading">
              <Eyebrow>
                {text(
                  locale,
                  c(
                    "AI phone agents for dental practices",
                    "Agentes telefónicos para clínicas dentales",
                  ),
                )}
              </Eyebrow>
              <h1>
                {text(
                  locale,
                  c(
                    "Support your team. Keep the next step clear.",
                    "Apoya a tu equipo. Aclara el siguiente paso.",
                  ),
                )}
              </h1>
            </div>
            <MediaPlayer
              film="overview"
              compact
              onPositionChange={(seconds, active) => {
                if (active === "overview" && seconds >= 30) setSeenEnough(true);
              }}
              afterPlayer={
                <div className="fa-seen-enough-slot">
                  {seenEnough && (
                    <Link
                      href="/book?service=phone-agent&entry=vsl"
                      className="fa-button fa-seen-enough"
                      data-cta="phone-agent"
                      onClick={() =>
                        recordEvent("cta_click", { service: "phone-agent", mediaId: "overview" })
                      }
                    >
                      Seen enough <Arrow />
                    </Link>
                  )}
                </div>
              }
            />
            <p className="fa-vsl-intro">{text(locale, offer.intro)}</p>
            <p className="fa-small">{text(locale, offer.note)}</p>
            <div className="fa-vsl-actions">
              <BookLink service="phone-agent">
                {text(locale, c("Book a demo & fit assessment", "Reservar demo y evaluación"))}
              </BookLink>
            </div>
          </section>
          <section className="fa-container fa-section" id="booking-recording">
            <SectionHeading
              number="02"
              label={c("The genuine recording", "La grabación real")}
              title={c(
                "Hear the call.\nExamine the booking.",
                "Escucha la llamada.\nExamina la reserva.",
              )}
              body={c(
                "The complete recorded routine demonstration: a new-patient enquiry, appointment choices and a Google Calendar booking. Privacy beeps and edited labels are retained. This is product evidence, not a customer result.",
                "La demostración habitual completa: una consulta de paciente nuevo, horarios disponibles y una reserva en Google Calendar. Se conservan los pitidos de privacidad y las etiquetas editadas. Es evidencia del producto, no un resultado de cliente.",
              )}
            />
            <MediaPlayer film="routine" compact />
            <div className="fa-media-cta">
              <BookLink service="phone-agent" />
            </div>
            <details
              className="fa-transcript"
              onToggle={(event) => {
                if (!event.currentTarget.open)
                  event.currentTarget.querySelectorAll("video").forEach((video) => video.pause());
              }}
            >
              <summary>
                {text(
                  locale,
                  c(
                    "More detail: walkthrough and executive overview",
                    "Más detalles: explicación completa y resumen ejecutivo",
                  ),
                )}
              </summary>
              <MediaPlayer film="main" switchable compact choices={["main", "summary"]} />
            </details>
          </section>
          <section className="fa-container fa-section">
            <SectionHeading
              number="03"
              label={c("Follow the call", "Seguir la llamada")}
              title={c(
                "A visible path\nfrom enquiry to confirmation.",
                "Un recorrido visible\nde consulta a confirmación.",
              )}
            />
            <WorkflowExplorer />
          </section>
          <section className="fa-container fa-section fa-audiences">
            <div>
              <Eyebrow>
                {text(locale, c("For practice owners", "Para propietarios de clínicas"))}
              </Eyebrow>
              <h2>
                {text(
                  locale,
                  c(
                    "Support the front desk.\nKeep the practice involved.",
                    "Apoya a recepción.\nMantén a la clínica involucrada.",
                  ),
                )}
              </h2>
              <p>
                {text(
                  locale,
                  c(
                    "Discuss busy periods, closed hours and the routine calls your team wants help with. Start with a scope you can assess directly.",
                    "Comenta periodos de actividad, horas de cierre y llamadas habituales donde necesitas apoyo. Empieza con un alcance que puedas evaluar directamente.",
                  ),
                )}
              </p>
            </div>
            <div>
              <Eyebrow>{text(locale, c("For groups and DSOs", "Para grupos y DSOs"))}</Eyebrow>
              <h2>
                {text(
                  locale,
                  c(
                    "Agree the location rules\nbefore discussing scale.",
                    "Acordar reglas por ubicación\nantes de ampliar.",
                  ),
                )}
              </h2>
              <p>
                {text(
                  locale,
                  c(
                    "Bring operations, systems and purchasing stakeholders into the conversation. A wider rollout needs verified compatibility, location-specific instructions and a clear approval owner.",
                    "Incluye responsables de operaciones, sistemas y compras. Ampliar requiere compatibilidad verificada, instrucciones por ubicación y un responsable de aprobación.",
                  ),
                )}
              </p>
            </div>
          </section>
        </>
      )}
      <section className="fa-container fa-section">
        <SectionHeading
          number={phone ? "04" : "01"}
          label={c("What the engagement involves", "Qué implica el trabajo")}
          title={c(
            "A defined scope.\nAn accountable next step.",
            "Un alcance definido.\nUn siguiente paso con responsable.",
          )}
        />
        <div className="fa-offer-steps">
          {offer.steps.map((s, i) => (
            <article key={i}>
              <span className="fa-step-number">0{i + 1}</span>
              <h3>{text(locale, s.title)}</h3>
              <p>{text(locale, s.body)}</p>
            </article>
          ))}
        </div>
        {service === "revenue-recovery" && (
          <div className="fa-client-access">
            <span>
              {text(
                locale,
                c(
                  "Already working with Revenue Recovery Desk?",
                  "¿Ya trabajas con Revenue Recovery Desk?",
                ),
              )}
            </span>
            <Link href="/revenue-recovery/access">
              {text(locale, c("Open client access", "Acceso de clientes"))}
              <Arrow diagonal />
            </Link>
            <Link href="/revenue-recovery/terms">
              {text(locale, c("Service terms", "Condiciones del servicio"))}
            </Link>
          </div>
        )}
      </section>
      {!phone && (
        <section className="fa-container fa-section fa-related-offers">
          <Eyebrow>{text(locale, c("Connected services", "Servicios relacionados"))}</Eyebrow>
          {offers
            .filter((x) => x.id !== service)
            .map((x) => (
              <Link key={x.id} href={x.path}>
                {text(locale, x.label)}
                <Arrow diagonal />
              </Link>
            ))}
        </section>
      )}
      {phone && <PhoneBuyerDetails />}
      <Process compact number={phone ? "06" : "03"} />
      <FaqSection items={offer.faq} />
      <Closing service={service} />
    </>
  );
}
