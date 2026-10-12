"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text, generalFaq } from "@/lib/marketing-copy";
import { BookLink, Closing, Eyebrow, FaqSection, Process, SectionHeading } from "./primitives";
import { MediaPlayer } from "./media-player";
export function DemosPage() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>
          {text(locale, c("Evidence before expectations", "Evidencia antes de expectativas"))}
        </Eyebrow>
        <h1>
          {text(
            locale,
            c("See the work.\nUnderstand the limits.", "Ve el trabajo.\nComprende los límites."),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Start with a genuine recorded booking conversation. The supporting films explain the offer, requirements and activation process.",
              "Empieza con una conversación de reserva grabada. Los vídeos adicionales explican oferta, requisitos y proceso de activación.",
            ),
          )}
        </p>
      </section>
      <section className="fa-services-band">
        <div className="fa-container fa-section">
          <MediaPlayer switchable />
        </div>
      </section>
      <section className="fa-container fa-section fa-trust">
        <div>
          <Eyebrow>{text(locale, c("What this establishes", "Qué acredita"))}</Eyebrow>
          <h2>
            {text(
              locale,
              c(
                "A recorded example.\nA useful starting point.",
                "Un ejemplo grabado.\nUn punto de partida útil.",
              ),
            )}
          </h2>
        </div>
        <div>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "The recording shows a routine enquiry, appointment choices and a Google Calendar booking. It contains privacy beeps and edited labels.",
                "La grabación muestra una consulta habitual, opciones de cita y una reserva en Google Calendar. Contiene pitidos de privacidad y etiquetas editadas.",
              ),
            )}
          </p>
          <p>
            {text(
              locale,
              c(
                "It does not establish customer outcomes, universal integrations, production reliability or clinical validation. Your own setup requires discovery, configuration, testing and approval.",
                "No acredita resultados de clientes, integraciones universales, fiabilidad de producción ni validación clínica. Tu configuración necesita análisis, configuración, pruebas y aprobación.",
              ),
            )}
          </p>
          <BookLink service="phone-agent" />
        </div>
      </section>
      <Closing service="phone-agent" />
    </>
  );
}
export function ApproachPage() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, c("Our approach", "Nuestro enfoque"))}</Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "From a useful example\nto a setup you approve.",
              "De un ejemplo útil\na una configuración que apruebas.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "A demonstration makes the idea tangible. A scoped engagement defines what gets built, how it is tested and who takes responsibility.",
              "Una demostración hace tangible la idea. Un trabajo definido determina qué se crea, cómo se prueba y quién asume la responsabilidad.",
            ),
          )}
        </p>
      </section>
      <Process />
      <section className="fa-container fa-section">
        <SectionHeading
          number="04"
          label={c("Commercial clarity", "Claridad comercial")}
          title={c(
            "Different services.\nExplicit starting points.",
            "Servicios distintos.\nPuntos de partida explícitos.",
          )}
        />
        <div className="fa-offer-steps">
          {[
            [
              c("Phone configuration", "Configuración telefónica"),
              c(
                "Agreement and initial payment start the agreed configuration. Practice testing and approval precede activation.",
                "El acuerdo y pago inicial comienzan la configuración. Las pruebas y aprobación de la clínica preceden a la activación.",
              ),
            ],
            [
              c("Website demonstration", "Demostración web"),
              c(
                "Review a bounded custom demonstration before payment. Approve the scope before the paid build and existing 12-month managed arrangement.",
                "Revisa una demostración personalizada limitada antes del pago. Aprueba el alcance antes de la construcción y gestión de 12 meses.",
              ),
            ],
            [
              c("Operations and recovery", "Operaciones y recuperación"),
              c(
                "A proposal specifies deliverables, permissions, approvals, support and payment milestones. No blanket free pilot or result guarantee.",
                "Una propuesta define entregables, permisos, aprobaciones, soporte e hitos de pago. Sin piloto gratuito genérico ni garantía de resultados.",
              ),
            ],
          ].map(([title, body], i) => (
            <article key={i}>
              <h3>{title && text(locale, title)}</h3>
              <p>{body && text(locale, body)}</p>
            </article>
          ))}
        </div>
      </section>
      <FaqSection items={generalFaq} />
      <Closing />
    </>
  );
}
export function AboutPage() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>
          {text(locale, c("The people behind FlowAudit", "Las personas detrás de FlowAudit"))}
        </Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "Close to the business.\nClose to the build.",
              "Cerca de la empresa.\nCerca de la construcción.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "FlowAudit is building a practical agency around phone handling, operational systems, revenue recovery and websites. We want the work and its limits to be understandable before you commit.",
              "FlowAudit desarrolla una agencia práctica de atención telefónica, sistemas operativos, recuperación de ingresos y sitios web. Queremos que comprendas el trabajo y sus límites antes de comprometerte.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section fa-team">
        {[
          {
            name: "Curtis Kusi Boadum",
            role: c("Co-founder · Technical direction", "Cofundador · Dirección técnica"),
            image: "/team/curtis.jpg",
            body: c(
              "Responsible for the technical direction, system design and delivery approach.",
              "Responsable de dirección técnica, diseño de sistemas y enfoque de entrega.",
            ),
          },
          {
            name: "Ephraim (Kofi) Owusu",
            role: c("Co-founder · Business & operations", "Cofundador · Negocio y operaciones"),
            image: "/team/kofi.jpg",
            body: c(
              "Responsible for the business and operations side of the agency and its client relationships.",
              "Responsable de negocio, operaciones y relaciones con clientes.",
            ),
          },
        ].map((p) => (
          <article key={p.name}>
            <Image
              src={p.image}
              alt={p.name}
              width={800}
              height={900}
              sizes="(max-width:600px) 100vw, 50vw"
            />
            <h3>{p.name}</h3>
            <p className="fa-small">{text(locale, p.role)}</p>
            <p className="mt-4">{text(locale, p.body)}</p>
          </article>
        ))}
      </section>
      <section className="fa-container fa-section fa-trust">
        <div>
          <Eyebrow>
            {text(locale, c("How we earn the conversation", "Cómo ganamos la conversación"))}
          </Eyebrow>
          <h2>
            {text(
              locale,
              c(
                "Show what exists.\nExplain what comes next.",
                "Mostrar lo que existe.\nExplicar qué viene después.",
              ),
            )}
          </h2>
        </div>
        <div>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "We are developing our customer evidence. We do not replace it with invented testimonials, borrowed credentials or forecasts presented as results.",
                "Estamos desarrollando evidencia de clientes. No la sustituimos por testimonios inventados, credenciales ajenas ni previsiones presentadas como resultados.",
              ),
            )}
          </p>
          <p>
            {text(
              locale,
              c(
                "Explore the recorded demonstration, ask about the actual setup and expect a proposal that makes scope and responsibilities explicit.",
                "Explora la demostración grabada, pregunta por la configuración real y espera una propuesta con alcance y responsabilidades explícitos.",
              ),
            )}
          </p>
          <Link className="fa-text-link" href="/demos">
            {text(locale, c("Explore the evidence", "Explorar la evidencia"))} →
          </Link>
        </div>
      </section>
      <Closing />
    </>
  );
}
export function CareersPage() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, c("Work with FlowAudit", "Colabora con FlowAudit"))}</Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "Care about the details.\nUnderstand the business.",
              "Cuida los detalles.\nComprende la empresa.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Interested in collaborating on thoughtful automation, phone systems or website delivery? Tell us what you do and share relevant work.",
              "¿Quieres colaborar en automatización, sistemas telefónicos o sitios web? Cuéntanos qué haces y comparte trabajos relevantes.",
            ),
          )}
        </p>
        <p className="fa-small mt-6">
          {text(
            locale,
            c(
              "This is an expression of interest, not an advertised vacancy or employment offer.",
              "Es una manifestación de interés, no una vacante anunciada ni oferta de empleo.",
            ),
          )}
        </p>
        <a
          className="fa-button mt-8"
          href="mailto:support@flowaudit.co.uk?subject=FlowAudit%20collaboration"
        >
          {text(locale, c("Introduce yourself", "Preséntate"))} →
        </a>
      </section>
      <Closing />
    </>
  );
}
