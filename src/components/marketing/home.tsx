"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text, offers, generalFaq } from "@/lib/marketing-copy";
import {
  Arrow,
  BookLink,
  Closing,
  Eyebrow,
  FaqSection,
  Process,
  SectionHeading,
} from "./primitives";
import { EvidenceArt } from "./evidence-art";

export function Home() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-hero">
        <div className="fa-hero-copy">
          <Eyebrow>
            <span className="fa-status-dot" aria-hidden="true" />
            {text(
              locale,
              c(
                "AI systems for established service businesses",
                "Sistemas IA para empresas de servicios consolidadas",
              ),
            )}
          </Eyebrow>
          <h1>
            {text(
              locale,
              c(
                "Handle the calls.\nConnect the work.",
                "Atiende las llamadas.\nConecta el trabajo.",
              ),
            )}
            <em>{text(locale, c("Keep control.", "Mantén el control."))}</em>
          </h1>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "Phone handling, operations automation, revenue recovery and websites. Built around the way your business works, with a clear scope and your approval before activation.",
                "Atención telefónica, automatización, recuperación de ingresos y sitios web. Adaptados a tu empresa, con alcance claro y tu aprobación antes de activar.",
              ),
            )}
          </p>
          <div className="fa-hero-actions">
            <BookLink />
            <Link className="fa-text-link" href="/phone-agent#demo">
              {text(locale, c("See the dental demo", "Ver la demo dental"))}
              <Arrow diagonal />
            </Link>
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
        <EvidenceArt />
      </section>
      <div className="fa-container fa-position-strip">
        <span>
          {text(
            locale,
            c("Built for people who run the business.", "Para quienes dirigen la empresa."),
          )}
        </span>
        <span>
          {text(
            locale,
            c(
              "Owners / Operations teams / Group leaders",
              "Propietarios / Equipos operativos / Directivos de grupos",
            ),
          )}
        </span>
      </div>
      <section className="fa-container fa-section">
        <SectionHeading
          number="01"
          label={c("Where work slows down", "Dónde se frena el trabajo")}
          title={c(
            "The gaps are often\nbetween the systems.",
            "Las brechas suelen estar\nentre los sistemas.",
          )}
          body={c(
            "An enquiry arrives. Someone needs to respond, find the context and move it forward. When those steps rely on memory, the whole team feels it.",
            "Llega una consulta. Alguien debe responder, encontrar el contexto y avanzar. Cuando los pasos dependen de la memoria, todo el equipo lo nota.",
          )}
        />
        <div className="fa-problem-grid">
          {[
            [
              c("The call that interrupts everything", "La llamada que interrumpe todo"),
              c(
                "The front desk is helping someone. Another call arrives. Your team needs a clear way to handle both.",
                "Recepción está atendiendo a alguien. Llega otra llamada. El equipo necesita una forma clara de gestionar ambas.",
              ),
            ],
            [
              c("The follow-up nobody owns", "El seguimiento sin responsable"),
              c(
                "An enquiry or invoice sits between inboxes, notes and systems. The next action is unclear.",
                "Una consulta o factura queda entre bandejas, notas y sistemas. La siguiente acción no está clara.",
              ),
            ],
            [
              c("The admin that keeps returning", "La administración que se repite"),
              c(
                "Your team re-enters the same details, checks the same records and repeats the same handoffs.",
                "El equipo vuelve a introducir datos, revisar registros y repetir traspasos.",
              ),
            ],
          ].map(([title, body], i) => (
            <article key={i}>
              <span className="fa-problem-index">0{i + 1}</span>
              <h3>{title && text(locale, title)}</h3>
              <p>{body && text(locale, body)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="fa-services-band" id="services">
        <div className="fa-container fa-section">
          <SectionHeading
            number="02"
            label={c("What we build", "Lo que creamos")}
            title={c(
              "Start with the work\nthat matters most.",
              "Empieza por el trabajo\nque más importa.",
            )}
          />
          <div className="fa-service-list">
            {offers.map((offer, i) => (
              <Link href={offer.path} className="fa-service-row" key={offer.id}>
                <span className="fa-service-index">0{i + 1}</span>
                <div>
                  <span className="fa-service-label">
                    {text(locale, offer.label)}
                    {i === 0 && (
                      <span className="fa-featured-label">
                        {text(locale, c("Dental focus", "Enfoque dental"))}
                      </span>
                    )}
                  </span>
                  <h3>{text(locale, offer.headline)}</h3>
                </div>
                <p>{text(locale, offer.intro)}</p>
                <span className="fa-service-arrow">
                  <Arrow diagonal />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="fa-container fa-section fa-dental-feature">
        <div>
          <Eyebrow>
            {text(locale, c("The flagship demonstration", "La demostración principal"))}
          </Eyebrow>
          <h2>
            {text(
              locale,
              c("One call.\nA clear next step.", "Una llamada.\nUn siguiente paso claro."),
            )}
          </h2>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "Hear a new-patient enquiry move through availability and into a Google Calendar booking. Then discuss what your own practice would need.",
                "Escucha una consulta de nuevo paciente avanzar por disponibilidad hasta una reserva en Google Calendar. Después comenta qué necesitaría tu clínica.",
              ),
            )}
          </p>
          <Link className="fa-button" href="/phone-agent#demo">
            {text(locale, c("Watch the recorded call", "Ver la llamada grabada"))}
            <Arrow />
          </Link>
          <p className="fa-small">
            {text(
              locale,
              c(
                "Recorded demonstration. Privacy edits disclosed. Not customer proof.",
                "Demostración grabada. Ediciones de privacidad indicadas. No es prueba de clientes.",
              ),
            )}
          </p>
        </div>
        <div className="fa-dental-note">
          <span className="fa-eyebrow">
            {text(locale, c("The practice stays involved", "La clínica participa"))}
          </span>
          <h3>
            {text(
              locale,
              c(
                "Your rules.\nYour team.\nYour approval.",
                "Tus reglas.\nTu equipo.\nTu aprobación.",
              ),
            )}
          </h3>
          <p>
            {text(
              locale,
              c(
                "We assess scheduling access, appointment rules and escalation requirements before agreeing a setup.",
                "Evaluamos acceso a agenda, reglas de cita y escalado antes de acordar una configuración.",
              ),
            )}
          </p>
          <Link href="/phone-agent" className="fa-text-link">
            {text(locale, c("Explore the dental offer", "Explorar la oferta dental"))}
            <Arrow diagonal />
          </Link>
        </div>
      </section>
      <Process />
      <section className="fa-container fa-section fa-trust" id="security">
        <div>
          <Eyebrow>
            {text(locale, c("Clarity before commitment", "Claridad antes de comprometerse"))}
          </Eyebrow>
          <h2>
            {text(
              locale,
              c(
                "A working example\nis the beginning.",
                "Un ejemplo en funcionamiento\nes el principio.",
              ),
            )}
          </h2>
        </div>
        <div>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "A polished demonstration is useful. A dependable setup also needs defined access, tested exceptions, a responsible owner and clear support arrangements.",
                "Una demostración cuidada es útil. Una configuración fiable también necesita acceso definido, excepciones probadas, un responsable y soporte claro.",
              ),
            )}
          </p>
          <p>
            {text(
              locale,
              c(
                "We explain what is demonstrated, what still needs configuring and what depends on your systems. Our examples are not testimonials or guaranteed business outcomes.",
                "Explicamos qué está demostrado, qué necesita configuración y qué depende de tus sistemas. Los ejemplos no son testimonios ni resultados empresariales garantizados.",
              ),
            )}
          </p>
          <Link href="/about" className="fa-text-link">
            {text(locale, c("Meet the founders", "Conocer a los fundadores"))}
            <Arrow diagonal />
          </Link>
        </div>
      </section>
      <FaqSection items={generalFaq} />
      <Closing />
    </>
  );
}
