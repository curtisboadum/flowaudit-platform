"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { Closing, FaqSection, Process } from "./primitives";
import { MediaPlayer } from "./media-player";

export const phoneFaq = [
  {
    q: c("What can the agent handle?", "¿Qué puede atender el agente?"),
    a: c(
      "We agree which enquiries it should handle, which details to collect and when your team should take over. Bookings and callbacks depend on your approved workflow and tested system access.",
      "Acordamos consultas, datos y cuándo interviene tu equipo. Reservas y devoluciones de llamada dependen del proceso aprobado y del acceso probado.",
    ),
  },
  {
    q: c("Will it connect to our tools?", "¿Conectará con nuestras herramientas?"),
    a: c(
      "The public dental recording demonstrates Google Calendar booking. Your scheduling, CRM, forwarding and other connections need individual assessment and testing. A demonstration does not establish compatibility with every system.",
      "La grabación dental demuestra reservas en Google Calendar. Agenda, CRM, desvíos y otras conexiones requieren evaluación y pruebas individuales.",
    ),
  },
  {
    q: c("Can it handle urgent calls?", "¿Puede atender llamadas urgentes?"),
    a: c(
      "Define urgent-call instructions, escalation and fallback with your team before activation. An enquiry agent is not an emergency service or a substitute for professional judgment. No completed emergency transfer is established by the current recordings.",
      "Define instrucciones, escalado y alternativas antes de activar. El agente no es un servicio de emergencias ni sustituye el criterio profesional.",
    ),
  },
  {
    q: c("What happens before activation?", "¿Qué sucede antes de activar?"),
    a: c(
      "Discovery and workflow mapping establish the scope. We assess integrations, configure the agreed behavior, run representative test calls and review exceptions with you. Activation follows approval; responsibilities and support are agreed privately.",
      "Definimos alcance, evaluamos conexiones, configuramos y probamos llamadas y excepciones. La activación sigue a tu aprobación; responsabilidades y soporte se acuerdan en privado.",
    ),
  },
];
const sectors = [
  [
    "home-services",
    "Home services",
    "Servicios para el hogar",
    "HVAC, plumbing, roofing and restoration",
    "Climatización, fontanería, tejados y restauración",
  ],
  [
    "automotive",
    "Automotive repair",
    "Talleres de automoción",
    "Service enquiries and workshop callbacks",
    "Consultas y devoluciones de llamada",
  ],
  [
    "property",
    "Property management",
    "Gestión inmobiliaria",
    "Maintenance enquiries and team handoffs",
    "Consultas de mantenimiento y traspasos",
  ],
  [
    "it-services",
    "IT & web hosting",
    "Informática y alojamiento web",
    "New enquiries and support intake",
    "Nuevas consultas y recepción de soporte",
  ],
] as const;
export function IndustryLinks() {
  const { locale } = useLocale();
  return (
    <section className="fa-container fa-section">
      <div className="fa-focus-heading">
        <h2>
          {text(
            locale,
            c(
              "Built around the calls your business receives.",
              "Adaptado a las llamadas de tu empresa.",
            ),
          )}
        </h2>
        <p>
          {text(
            locale,
            c(
              "Start with your industry. Agree the details of your own workflow.",
              "Empieza con tu sector. Acuerda los detalles de tu proceso.",
            ),
          )}
        </p>
      </div>
      <div className="fa-sector-grid">
        {sectors.map(([slug, en, es, desc, descEs]) => (
          <Link key={slug} href={`/industries/${slug}`}>
            <h3>{locale === "es" ? es : en}</h3>
            <p>{locale === "es" ? descEs : desc}</p>
            <span>{text(locale, c("Explore the workflow", "Explorar el proceso"))} ↗</span>
          </Link>
        ))}
      </div>
      <p className="fa-small mt-6">
        {text(
          locale,
          c(
            "Also explore professional services and suitable healthcare workflows. Each requires its own scope and review.",
            "También exploramos servicios profesionales y procesos sanitarios adecuados. Cada uno requiere alcance y revisión propios.",
          ),
        )}{" "}
        <Link className="underline" href="/industries/dental">
          {text(locale, c("Dental example", "Ejemplo dental"))}
        </Link>
      </p>
    </section>
  );
}
export function PhonePlatform({ home = false }: { home?: boolean }) {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-hero fa-call-first-hero">
        <div className="fa-hero-copy">
          <p className="fa-eyebrow">
            {text(
              locale,
              c(
                "AI phone agents & voice automation",
                "Agentes telefónicos IA y automatización de voz",
              ),
            )}
          </p>
          <h1>
            {text(
              locale,
              c(
                "When your team can’t pick up, give callers a next step.",
                "Cuando tu equipo no puede atender, ofrece un siguiente paso.",
              ),
            )}
          </h1>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "Handle inbound enquiries, collect the useful details and move the conversation toward an approved booking, callback or team handoff. Configured around your business and tested with your team.",
                "Atiende consultas, recoge los datos útiles y avanza hacia una reserva, devolución de llamada o traspaso aprobado. Configurado para tu empresa y probado con tu equipo.",
              ),
            )}
          </p>
          <div className="fa-hero-actions">
            <Link className="fa-button" href="/demos">
              {text(locale, c("See the recordings", "Ver las grabaciones"))}
              <span aria-hidden="true">▶</span>
            </Link>
            <Link className="fa-text-link" data-cta="phone-agent" href="/book?service=phone-agent">
              {text(locale, c("Book a 15-minute call", "Reservar 15 minutos"))} ↗
            </Link>
          </div>
          <p className="fa-small">
            {text(
              locale,
              c(
                "See it work. Approve it. Then activate it.",
                "Míralo funcionar. Apruébalo. Después actívalo.",
              ),
            )}
          </p>
        </div>
        <div className="fa-call-proof" id="demo">
          <div className="fa-proof-label">
            {text(
              locale,
              c("Hear a real recorded demonstration", "Escucha una demostración grabada real"),
            )}
          </div>
          <MediaPlayer film="routine" compact />
          <p className="fa-small">
            {text(
              locale,
              c(
                "Dental booking example. Privacy edits disclosed. A demonstration, not paying-customer evidence.",
                "Ejemplo de reserva dental. Ediciones de privacidad indicadas. Demostración, no prueba de clientes de pago.",
              ),
            )}
          </p>
          <Link className="fa-text-link" href="/demos">
            {text(locale, c("Explore the demo library", "Explorar la biblioteca de demos"))} ↗
          </Link>
        </div>
      </section>
      <div className="fa-container fa-position-strip">
        <span>
          {text(
            locale,
            c(
              "For owners and the people running operations.",
              "Para propietarios y responsables de operaciones.",
            ),
          )}
        </span>
        <span>
          {text(
            locale,
            c("USA primary · UK supported", "Prioridad EE. UU. · Reino Unido disponible"),
          )}
        </span>
      </div>
      <section className="fa-container fa-section">
        <div className="fa-focus-heading">
          <h2>
            {text(
              locale,
              c(
                "Keep the work moving. Keep your team in control.",
                "Mantén el trabajo en marcha. Mantén el control.",
              ),
            )}
          </h2>
          <p>
            {text(
              locale,
              c(
                "A missed call creates friction. The right next step depends on what the caller needs and what your team has approved.",
                "Una llamada sin atender crea fricción. El siguiente paso depende de la consulta y de lo aprobado por tu equipo.",
              ),
            )}
          </p>
        </div>
        <div className="fa-problem-grid">
          {[
            [
              c("While you’re on the job", "Mientras estás trabajando"),
              c(
                "Scope cover for busy periods, on-site work or agreed after-hours windows. Check number routing and fallback before activation.",
                "Define cobertura para horas ocupadas, trabajo en campo o fuera de horario. Comprueba desvíos y alternativas antes de activar.",
              ),
            ],
            [
              c("The details your team needs", "Los datos que necesita tu equipo"),
              c(
                "Agree the questions that matter: caller need, service location, useful context and the next action. Collect only what the workflow needs.",
                "Acuerda las preguntas: necesidad, ubicación, contexto y siguiente acción. Recoge solo los datos necesarios.",
              ),
            ],
            [
              c("A next step you approve", "Un siguiente paso aprobado"),
              c(
                "Assess booking access, callback ownership and handoff rules. Test the everyday cases and the exceptions with your team.",
                "Evalúa acceso a reservas, responsables y reglas de traspaso. Prueba los casos habituales y las excepciones.",
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
      <section className="fa-services-band">
        <div className="fa-container fa-section fa-trust">
          <div>
            <p className="fa-eyebrow">
              {text(locale, c("Start with home services", "Empieza con servicios para el hogar"))}
            </p>
            <h2>
              {text(
                locale,
                c(
                  "Your hands are full. The phone still rings.",
                  "Tienes las manos ocupadas. El teléfono sigue sonando.",
                ),
              )}
            </h2>
          </div>
          <div>
            <p className="fa-lead">
              {text(
                locale,
                c(
                  "For established HVAC, plumbing, roofing, restoration and trades businesses. Map how new enquiries should reach your office and field team, from the first question to the agreed next step.",
                  "Para empresas consolidadas de climatización, fontanería, tejados, restauración y oficios. Define cómo llegan las consultas a oficina y campo.",
                ),
              )}
            </p>
            <Link className="fa-button" href="/industries/home-services">
              {text(locale, c("Explore home services", "Explorar servicios para el hogar"))} ↗
            </Link>
            <p className="fa-small mt-6">
              {text(
                locale,
                c(
                  "Workflow examples require configuration and testing. Dispatch, live transfer and specific integrations are not assumed.",
                  "Los ejemplos requieren configuración y pruebas. No se asumen despacho, transferencia en vivo ni conexiones específicas.",
                ),
              )}
            </p>
          </div>
        </div>
      </section>
      <IndustryLinks />
      <Process />
      <section className="fa-container fa-section fa-trust">
        <h2>
          {text(locale, c("Clear evidence. Clear boundaries.", "Evidencia clara. Límites claros."))}
        </h2>
        <div>
          <p className="fa-lead">
            {text(
              locale,
              c(
                "A recorded demonstration shows what happened in that example. Your business needs its own tested instructions, access permissions, handoff route and responsible owner.",
                "Una demostración muestra lo ocurrido en ese ejemplo. Tu empresa necesita instrucciones, permisos, traspasos y responsables propios y probados.",
              ),
            )}
          </p>
          <Link className="fa-text-link" href="/trust">
            {text(
              locale,
              c(
                "Read the technical and privacy considerations",
                "Consultar información técnica y de privacidad",
              ),
            )}{" "}
            ↗
          </Link>
        </div>
      </section>
      <FaqSection items={phoneFaq} />
      {home && (
        <section className="fa-container fa-section fa-secondary-services">
          <h2>
            {text(
              locale,
              c("Other work we can help connect.", "Otros procesos que podemos conectar."),
            )}
          </h2>
          <p>
            {text(
              locale,
              c(
                "Operations automation, revenue recovery and considered websites remain available as separately scoped services.",
                "Automatización operativa, recuperación de ingresos y sitios web siguen disponibles con alcance propio.",
              ),
            )}
          </p>
          <Link className="fa-text-link" href="/services">
            {text(locale, c("Explore other services", "Explorar otros servicios"))} ↗
          </Link>
        </section>
      )}
      <Closing service="phone-agent" />
    </>
  );
}
