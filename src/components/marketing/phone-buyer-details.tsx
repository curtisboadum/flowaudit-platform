"use client";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text, type Faq } from "@/lib/marketing-copy";
import { Eyebrow, FaqSection, SectionHeading } from "./primitives";

export const operationalQuestions: Faq[] = [
  {
    q: c(
      "Can we keep our number and choose when calls are forwarded?",
      "¿Podemos conservar el número y elegir cuándo desviar llamadas?",
    ),
    a: c(
      "Bring your phone-provider details. Number ownership, forwarding options, busy-period coverage and after-hours routing must be checked with your provider and tested. Do not change forwarding until the agreed setup is approved. We do not promise that every phone service supports the same options.",
      "Trae los datos de tu proveedor telefónico. Debemos comprobar y probar la titularidad, desvíos, cobertura en horas de actividad y fuera de horario. No cambies desvíos antes de aprobar la configuración. Las opciones dependen del proveedor.",
    ),
  },
  {
    q: c(
      "What calls and appointment changes are supported?",
      "¿Qué llamadas y cambios de citas admite?",
    ),
    a: c(
      "The recording demonstrates a new-patient check-up enquiry and booking in Google Calendar. Appointment types, opening hours and calendar access are agreed for your practice. Cancellations, rescheduling, insurance questions, payments and other workflows are not established by this recording; assess and test each requested workflow before including it in scope.",
      "La grabación demuestra una consulta y reserva de revisión para un paciente nuevo en Google Calendar. Acordamos tipos de cita, horarios y acceso. Esta grabación no verifica cancelaciones, cambios, seguros, pagos ni otros procesos; cada proceso solicitado debe evaluarse y probarse antes de incluirlo.",
    ),
  },
  {
    q: c(
      "How will we judge call quality and patient experience?",
      "¿Cómo evaluaremos la calidad y la experiencia del paciente?",
    ),
    a: c(
      "Listen to the recording, then agree representative test calls with your team. Review wording, pronunciation, appointment accuracy, interruptions, unclear requests and the path to a person. Confirm language needs, AI disclosure and accessibility requirements for your setup. No satisfaction score, response-time guarantee or universal language support is established here.",
      "Escucha la grabación y acuerda llamadas de prueba con tu equipo. Revisa lenguaje, pronunciación, precisión, interrupciones, solicitudes confusas y acceso a una persona. Confirma idiomas, identificación de IA y accesibilidad. Aquí no se verifica una puntuación de satisfacción, tiempo garantizado ni soporte universal de idiomas.",
    ),
  },
  {
    q: c(
      "Who handles exceptions or a failed connection?",
      "¿Quién gestiona excepciones o una conexión fallida?",
    ),
    a: c(
      "Name the practice contact, approved handoff route and fallback for unavailable staff or scheduling systems in the written scope. Test those cases before activation. The recordings do not prove completed live transfers or uninterrupted service. Clinical decisions remain with the practice and its clinicians.",
      "Define en el alcance el contacto de la clínica, el traspaso y la alternativa si el personal o sistema no está disponible. Prueba esos casos antes de activar. Las grabaciones no verifican transferencias completadas ni servicio ininterrumpido. Las decisiones clínicas corresponden a la clínica y sus profesionales.",
    ),
  },
  {
    q: c(
      "Are calls recorded, and who can access or delete data?",
      "¿Se graban llamadas y quién puede acceder o borrar datos?",
    ),
    a: c(
      "The existence of a recorded demo does not establish a production recording policy. Resolve recording consent, data locations, suppliers, access roles, retention, deletion and any required agreements for your setup before proceeding. US HIPAA or BAA requirements need an actual vendor and contractual review; this page makes no compliance assurance. Do not submit patient data through this site.",
      "Una demostración grabada no define la política de grabación en producción. Deben resolverse consentimiento, ubicación, proveedores, acceso, conservación, borrado y acuerdos antes de continuar. Los requisitos HIPAA o BAA requieren revisar proveedores y contratos; esta página no garantiza cumplimiento. No envíes datos de pacientes aquí.",
    ),
  },
  {
    q: c(
      "How long does setup take, and what does our team approve?",
      "¿Cuánto tarda la configuración y qué aprueba nuestro equipo?",
    ),
    a: c(
      "Timing is quoted after requirements and dependencies are understood. Your team supplies approved call rules, scheduling access and escalation contacts, then reviews routine calls and exceptions. Agreement and initial payment start configuration. Activation follows successful agreed tests and practice approval. There is no fixed launch deadline or automatic activation promised here.",
      "El plazo se presupuesta tras entender requisitos y dependencias. Tu equipo aporta reglas, acceso a citas y contactos; después revisa llamadas habituales y excepciones. El acuerdo y pago inicial comienzan la configuración. La activación sigue a las pruebas acordadas y aprobación. No prometemos fecha fija ni activación automática.",
    ),
  },
  {
    q: c(
      "What will pricing, contract terms and support include?",
      "¿Qué incluirán el precio, contrato y soporte?",
    ),
    a: c(
      "The fit assessment leads to a scoped quote. Set out setup and ongoing charges, call allowances or overages, locations, connectors, testing, support hours, monitoring, change requests, contract length and cancellation or ownership terms in writing before purchase. These are items to agree, not unlimited inclusions. No trial, refund, revenue guarantee or fixed public price is offered here.",
      "La evaluación conduce a un presupuesto definido. Antes de comprar, acuerda por escrito cargos iniciales y recurrentes, llamadas o excesos, ubicaciones, conexiones, pruebas, soporte, supervisión, cambios, duración, cancelación y propiedad. No son inclusiones ilimitadas. Aquí no se ofrece prueba, reembolso, garantía de ingresos ni precio público fijo.",
    ),
  },
  {
    q: c(
      "What reporting or results should we expect?",
      "¿Qué informes o resultados podemos esperar?",
    ),
    a: c(
      "Agree the reporting you need and verify its availability in scope. A calendar booking is not an attended appointment or collected revenue. Use your own call and appointment records to establish a baseline and separate enquiries, bookings, attendance and receipts. There are no verified customer outcome statistics or production reporting dashboard demonstrated on this page.",
      "Acuerda los informes necesarios y verifica su disponibilidad. Una reserva no es una cita atendida ni un ingreso cobrado. Usa tus registros para medir consultas, reservas, asistencia y cobros por separado. Esta página no demuestra estadísticas de clientes ni un panel de informes en producción.",
    ),
  },
];

export function PhoneBuyerDetails() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-section">
        <SectionHeading
          number="05"
          label={c("Built around your decision", "En torno a tu decisión")}
          title={c(
            "The right questions,\nfor the people doing the work.",
            "Las preguntas adecuadas,\npara quienes hacen el trabajo.",
          )}
        />
        <div className="fa-buyer-grid">
          {[
            [
              c("Owners & partners", "Propietarios y socios"),
              c(
                "Assess a paid, configured service against your own call records and capacity. Understand the scope, recurring costs and approval conditions before deciding.",
                "Evalúa un servicio de pago configurado según tus llamadas y capacidad. Entiende alcance, costes recurrentes y condiciones de aprobación antes de decidir.",
              ),
            ],
            [
              c("Practice managers", "Responsables de clínica"),
              c(
                "Review what your team supplies, what stays with a person and how exceptions reach the practice. Bring the questions from your front desk and the person who approves the purchase.",
                "Revisa qué aporta tu equipo, qué requiere una persona y cómo llegan las excepciones. Trae las preguntas de recepción y a quien aprueba la compra.",
              ),
            ],
            [
              c("Operations, groups & DSOs", "Operaciones, grupos y DSOs"),
              c(
                "Start with one defined workflow and location scope. Identify systems, security, clinical governance and purchasing owners before planning a wider rollout.",
                "Empieza con un proceso y ubicaciones definidos. Identifica responsables de sistemas, seguridad, gobierno clínico y compras antes de ampliar.",
              ),
            ],
          ].map(([title, body]) => (
            <article key={title?.en}>
              <h3>{title && text(locale, title)}</h3>
              <p>{body && text(locale, body)}</p>
            </article>
          ))}
        </div>
        <details className="fa-transcript mt-8">
          <summary>
            {text(
              locale,
              c("Group and DSO rollout: what needs agreeing", "Grupos y DSOs: qué debe acordarse"),
            )}
          </summary>
          <div>
            <Eyebrow>
              {text(
                locale,
                c(
                  "A scoped rollout, with named approvers",
                  "Un despliegue definido, con responsables",
                ),
              )}
            </Eyebrow>
            <p>
              {text(
                locale,
                c(
                  "Identify the initial locations, central versus local call rules, systems and access permissions, reporting needs, data requirements, support ownership and rollout acceptance tests. Any wider deployment follows verified compatibility and location-specific approval. We do not claim centralised multi-location routing, enterprise integrations or group reporting from the single-calendar example.",
                  "Identifica ubicaciones iniciales, reglas centrales y locales, sistemas y permisos, informes, datos, soporte y pruebas de aceptación. La ampliación requiere compatibilidad verificada y aprobación por ubicación. El ejemplo de un calendario no acredita enrutamiento centralizado, integraciones empresariales ni informes de grupo.",
                ),
              )}
            </p>
            <p>
              {text(
                locale,
                c(
                  "The first 15 minutes can identify fit, unresolved requirements and the next decision. Security, procurement and clinical-governance reviews may need additional meetings before a purchase can proceed.",
                  "Los primeros 15 minutos permiten identificar encaje, requisitos pendientes y siguiente decisión. Las revisiones de seguridad, compras y gobierno clínico pueden requerir reuniones adicionales antes de comprar.",
                ),
              )}
            </p>
          </div>
        </details>
      </section>
      <FaqSection
        items={operationalQuestions}
        id="operational-questions"
        title={c("The operational details.", "Los detalles operativos.")}
      />
    </>
  );
}
