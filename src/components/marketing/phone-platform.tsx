"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { Closing, FaqSection, Process } from "./primitives";

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
      "Published recordings show only the connections used in those examples. Your scheduling, CRM, forwarding and other connections need individual assessment and testing.",
      "Las grabaciones publicadas muestran solo las conexiones de esos ejemplos. Agenda, CRM, desvíos y otras conexiones requieren evaluación y pruebas individuales.",
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
          {home && (
            <p className="fa-small fa-hero-audience">
              {text(
                locale,
                c(
                  "For service businesses · Home services first",
                  "Para empresas de servicios · Empezando por servicios para el hogar",
                ),
              )}
            </p>
          )}
          <h1>
            {text(
              locale,
              c(
                home
                  ? "An AI receptionist for the calls you can’t take."
                  : "Your calls. Your workflow. Your AI phone agent.",
                home
                  ? "Un recepcionista IA para las llamadas que no puedes atender."
                  : "Tus llamadas. Tu proceso. Tu agente telefónico IA.",
              ),
            )}
          </h1>
          <p className="fa-lead">
            {text(
              locale,
              c(
                home
                  ? "Help with common enquiries, collect the details your team needs and arrange an approved next step while your people get on with their work."
                  : "Choose the enquiries it handles, the questions it asks and when your team takes over. We configure and test bookings, callbacks and handoffs around your existing setup.",
                home
                  ? "Ayuda con consultas habituales, recoge los datos que necesita tu equipo y organiza un siguiente paso aprobado mientras tu gente sigue trabajando."
                  : "Define qué consultas atiende, qué pregunta y cuándo interviene tu equipo. Configuramos y probamos reservas, devoluciones de llamada y traspasos para tu sistema.",
              ),
            )}
          </p>
          <div className="fa-hero-actions">
            <Link
              className="fa-button"
              href={home ? "/demos#industry-recordings" : "#call-workflow"}
            >
              {text(
                locale,
                home
                  ? c("See the recordings", "Ver las grabaciones")
                  : c("Explore the call workflow", "Explorar el proceso de llamadas"),
              )}
              <span aria-hidden="true">↗</span>
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
        <aside
          className="fa-call-flow"
          aria-label={text(
            locale,
            c("Illustrative call workflow", "Proceso de llamada ilustrativo"),
          )}
        >
          <p className="fa-eyebrow">
            {text(locale, c("Built around your business", "Adaptado a tu empresa"))}
          </p>
          <h2>
            {text(
              locale,
              c(
                "A call comes in.\nYour team keeps moving.",
                "Entra una llamada.\nTu equipo sigue trabajando.",
              ),
            )}
          </h2>
          <ol>
            {[
              [
                c("Understand the enquiry", "Entender la consulta"),
                c(
                  "The reason for calling and the service needed.",
                  "El motivo de la llamada y el servicio necesario.",
                ),
              ],
              [
                c("Collect the useful details", "Recoger los datos útiles"),
                c(
                  "The information your team needs to follow up.",
                  "La información que necesita tu equipo para el seguimiento.",
                ),
              ],
              [
                c("Arrange an approved next step", "Organizar un siguiente paso aprobado"),
                c(
                  "A booking, callback or handoff where configured and tested.",
                  "Una reserva, devolución de llamada o traspaso configurado y probado.",
                ),
              ],
            ].map(([title, body], i) => (
              <li key={i}>
                <span aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3>{title && text(locale, title)}</h3>
                  <p>{body && text(locale, body)}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fa-small">
            {text(
              locale,
              c(
                "Illustrative workflow. Configuration and testing required. This is not a recorded demonstration.",
                "Proceso ilustrativo. Requiere configuración y pruebas. No es una demostración grabada.",
              ),
            )}
          </p>
          <Link className="fa-text-link" href="/industries/home-services">
            {text(locale, c("Explore home services", "Explorar servicios para el hogar"))} ↗
          </Link>
        </aside>
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
      {home ? (
        <>
          <section className="fa-container fa-section">
            <div className="fa-focus-heading">
              <h2>
                {text(
                  locale,
                  c(
                    home
                      ? "Keep the work moving. Keep your team in control."
                      : "What your agent should know, ask and do.",
                    home
                      ? "Mantén el trabajo en marcha. Mantén el control."
                      : "Qué debe saber, preguntar y hacer tu agente.",
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
                  {text(
                    locale,
                    c("Start with home services", "Empieza con servicios para el hogar"),
                  )}
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
        </>
      ) : (
        <ProductWorkflow />
      )}
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

function ProductWorkflow() {
  const { locale } = useLocale();
  const steps = [
    [
      c("01 · Understand the enquiry", "01 · Entender la consulta"),
      c(
        "Start with the caller’s reason for calling. Your services, service area and common questions define the information the agent can use.",
        "Empieza por el motivo de la llamada. Tus servicios, zona y preguntas habituales definen la información que puede usar el agente.",
      ),
    ],
    [
      c("02 · Collect useful details", "02 · Recoger datos útiles"),
      c(
        "Choose the details your team needs to follow up: the request, location and callback information. Test how the agent clarifies incomplete answers.",
        "Elige los datos necesarios para el seguimiento: solicitud, ubicación y contacto. Prueba cómo aclara respuestas incompletas.",
      ),
    ],
    [
      c("03 · Confirm the next step", "03 · Confirmar el siguiente paso"),
      c(
        "Decide when to offer an appointment, arrange a callback or pass the enquiry to your team. Booking requires tested access to your scheduling system.",
        "Decide cuándo ofrecer una cita, organizar una devolución de llamada o pasar la consulta a tu equipo. Las reservas requieren acceso probado a tu agenda.",
      ),
    ],
    [
      c("04 · Know when a person takes over", "04 · Saber cuándo interviene una persona"),
      c(
        "Define exceptions, urgent-call instructions and a fallback if a connection is unavailable. A callback request and a live transfer are different workflows; verify the one you need.",
        "Define excepciones, instrucciones para urgencias y una alternativa si falla una conexión. Una solicitud de devolución y una transferencia en vivo son procesos distintos; verifica el que necesitas.",
      ),
    ],
  ];
  return (
    <>
      <section className="fa-container fa-section" id="call-workflow">
        <div className="fa-focus-heading">
          <h2>
            {text(
              locale,
              c(
                "From the first question to the next action.",
                "De la primera pregunta a la siguiente acción.",
              ),
            )}
          </h2>
          <p>
            {text(
              locale,
              c(
                "A configuration map for your business, not a claim that every connection is already supported.",
                "Un mapa de configuración para tu empresa, sin afirmar que todas las conexiones ya estén disponibles.",
              ),
            )}
          </p>
        </div>
        <div className="fa-lifecycle-grid">
          {steps.map(([title, body]) => (
            <article key={title?.en}>
              <h3>{title && text(locale, title)}</h3>
              <p>{body && text(locale, body)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="fa-services-band">
        <div className="fa-container fa-section fa-trust">
          <h2>
            {text(
              locale,
              c(
                "Check the connections before the first live call.",
                "Comprueba las conexiones antes de la primera llamada real.",
              ),
            )}
          </h2>
          <div>
            <p className="fa-lead">
              {text(
                locale,
                c(
                  "We assess number routing, scheduling access and where enquiry details should go. Your existing provider, permissions and tools determine what can be configured.",
                  "Evaluamos desvíos, acceso a agenda y destino de las consultas. Tu proveedor, permisos y herramientas determinan qué se puede configurar.",
                ),
              )}
            </p>
            <ul className="fa-product-checks">
              <li>
                {text(
                  locale,
                  c(
                    "Routing: when the agent answers and what happens if it cannot.",
                    "Desvíos: cuándo responde el agente y qué sucede si no puede.",
                  ),
                )}
              </li>
              <li>
                {text(
                  locale,
                  c(
                    "Scheduling: availability, timezone, booking rules and failed requests.",
                    "Agenda: disponibilidad, zona horaria, reglas y solicitudes fallidas.",
                  ),
                )}
              </li>
              <li>
                {text(
                  locale,
                  c(
                    "Handoffs: which details reach which person, through a tested route.",
                    "Traspasos: qué datos llegan a qué persona, por una vía probada.",
                  ),
                )}
              </li>
            </ul>
            <Link className="fa-text-link" href="/trust">
              {text(
                locale,
                c(
                  "Technical and privacy considerations",
                  "Consideraciones técnicas y de privacidad",
                ),
              )}{" "}
              ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
