import type { Locale } from "@/lib/i18n";

export interface Copy {
  en: string;
  es: string;
}
export const c = (en: string, es: string): Copy => ({ en, es });
export const text = (locale: Locale, copy: Copy): string => copy[locale];
export const SERVICES = [
  "general",
  "phone-agent",
  "automation",
  "revenue-recovery",
  "web-design",
] as const;
export type ServiceId = (typeof SERVICES)[number];
export function serviceId(value: unknown): ServiceId {
  return typeof value === "string" && SERVICES.includes(value as ServiceId)
    ? (value as ServiceId)
    : "general";
}
export const bookHref = (service: ServiceId = "general") => `/book?service=${service}`;
export interface Faq {
  q: Copy;
  a: Copy;
}
export interface Offer {
  id: ServiceId;
  path: string;
  label: Copy;
  headline: Copy;
  intro: Copy;
  note: Copy;
  steps: { title: Copy; body: Copy }[];
  faq: Faq[];
}
export const offers: Offer[] = [
  {
    id: "phone-agent",
    path: "/phone-agent",
    label: c("AI receptionist", "Recepcionista IA"),
    headline: c(
      "When patients call, give them a clear next step.",
      "Cuando un paciente llama, ofrece un siguiente paso claro.",
    ),
    intro: c(
      "See a recorded appointment-booking conversation. Then explore how a phone-handling system could fit your practice, your team and your appointment rules.",
      "Mira una conversación grabada de reserva de cita. Después explora cómo adaptar la atención telefónica a tu clínica, tu equipo y tus reglas de citas.",
    ),
    note: c(
      "For dental practices, multi-location groups and DSOs. US first, with UK and Canada enquiries welcome.",
      "Para clínicas dentales, grupos y DSOs. Prioridad en EE. UU.; también recibimos consultas del Reino Unido y Canadá.",
    ),
    steps: [
      {
        title: c("Define the calls", "Definir las llamadas"),
        body: c(
          "Agree the appointment types, opening hours, forwarding route and situations that need your team.",
          "Acordar tipos de cita, horarios, desvíos y situaciones que requieren a tu equipo.",
        ),
      },
      {
        title: c("Configure and test", "Configurar y probar"),
        body: c(
          "Test your approved instructions and the agreed calendar connection with representative calls before activation.",
          "Probar las instrucciones aprobadas y la conexión de calendario acordada antes de activar.",
        ),
      },
      {
        title: c("Approve the setup", "Aprobar la configuración"),
        body: c(
          "Your practice reviews the behaviour, limits and handoff arrangements. Activation follows your approval.",
          "Tu clínica revisa el comportamiento, los límites y los traspasos. La activación sigue a tu aprobación.",
        ),
      },
    ],
    faq: [
      {
        q: c(
          "Will it work with our scheduling system?",
          "¿Funcionará con nuestro sistema de citas?",
        ),
        a: c(
          "The recording shows a Google Calendar booking example. Compatibility with your actual scheduling or practice-management system must be assessed and tested. We do not claim universal integration.",
          "La grabación muestra una reserva en Google Calendar. La compatibilidad con tu sistema de citas o gestión debe evaluarse y probarse. No prometemos integración universal.",
        ),
      },
      {
        q: c("Does this replace our reception team?", "¿Sustituye al equipo de recepción?"),
        a: c(
          "The scope is designed around your team. We discuss which calls it could handle and which should remain with a person, including how exceptions are passed on.",
          "El alcance se diseña alrededor de tu equipo. Definimos qué llamadas podría atender y cuáles requieren una persona, incluyendo las excepciones.",
        ),
      },
      {
        q: c(
          "What happens with an urgent or unusual call?",
          "¿Qué pasa con una llamada urgente o inusual?",
        ),
        a: c(
          "We agree practice-approved instructions and escalation arrangements during configuration. The demonstration is not evidence of validated clinical triage, medical advice or a completed emergency handoff.",
          "Acordamos instrucciones y procedimientos de escalado aprobados por la clínica. La demostración no acredita triaje clínico validado, consejo médico ni un traspaso de emergencia completado.",
        ),
      },
      {
        q: c(
          "How do configuration and payment work?",
          "¿Cómo funcionan la configuración y el pago?",
        ),
        a: c(
          "The fit assessment leads to an agreed scope and quote. Agreement and initial payment start configuration. The system is tested and approved by your practice before patient-facing activation.",
          "La evaluación lleva a un alcance y presupuesto acordados. El acuerdo y pago inicial comienzan la configuración. Tu clínica prueba y aprueba el sistema antes de la activación para pacientes.",
        ),
      },
      {
        q: c("Can a group start with one location?", "¿Puede un grupo empezar con una ubicación?"),
        a: c(
          "We can scope an initial location before discussing a wider rollout. Each location’s rules, systems and approvals are assessed. Group procurement may require further technical and commercial meetings.",
          "Podemos definir una ubicación inicial antes de ampliar. Se evalúan reglas, sistemas y aprobaciones de cada ubicación. La contratación de grupos puede requerir más reuniones técnicas y comerciales.",
        ),
      },
      {
        q: c(
          "How are patient-data requirements handled?",
          "¿Cómo se gestionan los datos de pacientes?",
        ),
        a: c(
          "Data access, suppliers, retention and contractual requirements need review for the actual setup. Do not send patient details through this website or its booking notes. We do not advertise unverified compliance certifications.",
          "El acceso, proveedores, conservación y requisitos contractuales deben revisarse para la configuración real. No envíes datos de pacientes por este sitio ni en las notas de reserva. No anunciamos certificaciones sin verificar.",
        ),
      },
    ],
  },
  {
    id: "automation",
    path: "/solutions",
    label: c("Operations automation", "Automatización operativa"),
    headline: c("Less work between the work.", "Menos tareas entre las tareas."),
    intro: c(
      "Connect the repetitive steps between enquiries, scheduling, administration and follow-up. Start with one clearly scoped process and a result your team can review.",
      "Conecta los pasos repetitivos entre consultas, agenda, administración y seguimiento. Empieza con un proceso definido y un resultado que tu equipo pueda revisar.",
    ),
    note: c(
      "A focused improvement, built around the tools and permissions you actually have.",
      "Una mejora concreta, adaptada a las herramientas y permisos que realmente tienes.",
    ),
    steps: [
      {
        title: c("Map the handoff", "Mapear el traspaso"),
        body: c(
          "Trace a real example. Identify its source, the missing information and the person responsible for the next action.",
          "Revisar un ejemplo real. Identificar su origen, la información que falta y quién es responsable de la siguiente acción.",
        ),
      },
      {
        title: c("Build the connection", "Crear la conexión"),
        body: c(
          "Scope the required inputs, supported system access, review points and response when information is incomplete.",
          "Definir entradas, acceso disponible a sistemas, puntos de revisión y respuesta cuando falta información.",
        ),
      },
      {
        title: c("Make it usable", "Hacerlo útil"),
        body: c(
          "Test normal and difficult cases, document the process and agree who maintains it after handover.",
          "Probar casos habituales y difíciles, documentar el proceso y acordar quién lo mantiene después de la entrega.",
        ),
      },
    ],
    faq: [
      {
        q: c("Where should we start?", "¿Por dónde empezamos?"),
        a: c(
          "Choose a recurring task with clear inputs, an identifiable owner and a useful output. The fit assessment helps distinguish an automation opportunity from a process that first needs clearer rules.",
          "Elige una tarea recurrente con entradas claras, un responsable y una salida útil. La evaluación distingue oportunidades de automatización de procesos que necesitan reglas más claras.",
        ),
      },
      {
        q: c("Can you connect our existing tools?", "¿Podéis conectar nuestras herramientas?"),
        a: c(
          "We assess supported APIs, permissions and available connectors before quoting. We will explain limitations rather than promise compatibility with every system.",
          "Evaluamos APIs, permisos y conectores disponibles antes de presupuestar. Explicamos los límites en vez de prometer compatibilidad con cualquier sistema.",
        ),
      },
      {
        q: c(
          "Will we keep control of important decisions?",
          "¿Mantendremos el control de decisiones importantes?",
        ),
        a: c(
          "The scope defines what the system prepares, what it can execute and where a person must approve. These boundaries are tested before activation.",
          "El alcance define qué prepara el sistema, qué puede ejecutar y dónde debe aprobar una persona. Estos límites se prueban antes de activar.",
        ),
      },
    ],
  },
  {
    id: "revenue-recovery",
    path: "/revenue-recovery",
    label: c("Revenue recovery", "Recuperación de ingresos"),
    headline: c(
      "Give overdue accounts a clear next action.",
      "Da a las cuentas vencidas una siguiente acción clara.",
    ),
    intro: c(
      "Bring invoice context, draft follow-ups and approval steps into a more organised process. Revenue Recovery Desk supports your team’s accounts-receivable work.",
      "Organiza el contexto de facturas, borradores de seguimiento y aprobaciones. Revenue Recovery Desk apoya el trabajo de cuentas por cobrar de tu equipo.",
    ),
    note: c(
      "Operational support with client-approved actions. No recovered-revenue guarantee.",
      "Apoyo operativo con acciones aprobadas por el cliente. Sin garantía de ingresos recuperados.",
    ),
    steps: [
      {
        title: c("Review the account", "Revisar la cuenta"),
        body: c(
          "Identify eligible overdue records, disputes and information needed before follow-up.",
          "Identificar registros vencidos elegibles, disputas e información necesaria antes del seguimiento.",
        ),
      },
      {
        title: c("Prepare the next step", "Preparar el siguiente paso"),
        body: c(
          "Prepare communications and review queues within the agreed policy. Keep sensitive actions with the authorised reviewer.",
          "Preparar comunicaciones y colas de revisión según la política acordada. Mantener acciones sensibles con el revisor autorizado.",
        ),
      },
      {
        title: c("Track and hand over", "Registrar y entregar"),
        body: c(
          "Keep the action, approval and account context together. Your team owns commercial decisions and customer relationships.",
          "Mantener acción, aprobación y contexto juntos. Tu equipo controla las decisiones comerciales y relaciones con clientes.",
        ),
      },
    ],
    faq: [
      {
        q: c("Is this a debt-collection service?", "¿Es un servicio de cobro de deudas?"),
        a: c(
          "Revenue Recovery Desk is operational support, not a collections agency, law firm or regulated debt-collection substitute. Your team remains responsible for commercial decisions and lawful communications.",
          "Revenue Recovery Desk es apoyo operativo, no una agencia de cobros, despacho jurídico ni sustituto de cobro regulado. Tu equipo sigue siendo responsable de decisiones y comunicaciones legales.",
        ),
      },
      {
        q: c("Who approves communications?", "¿Quién aprueba las comunicaciones?"),
        a: c(
          "The agreed policy defines approval requirements. Sensitive outreach, settlement offers and escalation steps stay subject to the client’s authorised approval process.",
          "La política acordada define las aprobaciones. Contactos sensibles, ofertas de acuerdo y escalados siguen sujetos al proceso de aprobación autorizado del cliente.",
        ),
      },
      {
        q: c("What does it cost?", "¿Cuánto cuesta?"),
        a: c(
          "We quote the scope, system access, review arrangements and any third-party usage separately. Fees are agreed in your proposal, not inferred from hypothetical recovered revenue.",
          "Presupuestamos alcance, acceso a sistemas, revisión y uso de terceros por separado. Las tarifas se acuerdan en la propuesta, no se deducen de ingresos recuperados hipotéticos.",
        ),
      },
    ],
  },
  {
    id: "web-design",
    path: "/web-design",
    label: c("Web design", "Diseño web"),
    headline: c(
      "A better first impression. A clearer next step.",
      "Una mejor primera impresión. Un siguiente paso más claro.",
    ),
    intro: c(
      "A considered website built around what your business offers and how customers decide. See a bounded custom demonstration before committing to the build.",
      "Un sitio cuidado, centrado en tu oferta y en cómo deciden tus clientes. Mira una demostración personalizada de alcance limitado antes de comprometerte.",
    ),
    note: c(
      "Custom demonstration before payment. A 12-month managed arrangement, with cancellation available after that term.",
      "Demostración personalizada antes del pago. Gestión durante 12 meses, con cancelación disponible después de ese periodo.",
    ),
    steps: [
      {
        title: c("Define the experience", "Definir la experiencia"),
        body: c(
          "Agree the audience, priority offer, pages and enquiry journey before design starts.",
          "Acordar público, oferta principal, páginas y recorrido de consultas antes de diseñar.",
        ),
      },
      {
        title: c("See the demonstration", "Ver la demostración"),
        body: c(
          "Review a bounded custom concept. It is a demonstration of direction, not an unpaid finished website.",
          "Revisar un concepto personalizado limitado. Demuestra la dirección; no es un sitio completo sin pago.",
        ),
      },
      {
        title: c("Approve, then build", "Aprobar y construir"),
        body: c(
          "Approve the scope and demonstration before payment. The proposal defines the build, support and 12-month arrangement.",
          "Aprobar alcance y demostración antes del pago. La propuesta define construcción, soporte y gestión durante 12 meses.",
        ),
      },
    ],
    faq: [
      {
        q: c("Do we pay before seeing a design?", "¿Pagamos antes de ver un diseño?"),
        a: c(
          "No. The website offer includes a bounded custom demonstration before payment. Once you approve it and the scope, we move into the agreed paid build.",
          "No. La oferta incluye una demostración personalizada limitada antes del pago. Tras aprobarla y acordar el alcance, comienza la construcción pagada.",
        ),
      },
      {
        q: c("What is included?", "¿Qué incluye?"),
        a: c(
          "The proposal specifies pages, content responsibilities, booking or enquiry connections, hosting and support. Additional business tools are scoped individually rather than promised as an unlimited bundle.",
          "La propuesta define páginas, responsabilidades de contenido, conexiones de reservas o consultas, alojamiento y soporte. Las herramientas adicionales se definen individualmente, no como un paquete ilimitado.",
        ),
      },
      {
        q: c("How long is the arrangement?", "¿Cuánto dura el acuerdo?"),
        a: c(
          "The existing managed website offer has a 12-month term, with cancellation available after that term. Your proposal sets out billing, changes, handover and any additional services.",
          "La oferta actual de gestión web tiene un periodo de 12 meses, con cancelación disponible después. La propuesta detalla facturación, cambios, entrega y servicios adicionales.",
        ),
      },
    ],
  },
];
export const generalFaq: Faq[] = [
  {
    q: c("What happens in the 15-minute call?", "¿Qué pasa en la llamada de 15 minutos?"),
    a: c(
      "We discuss the problem, show a relevant example and assess requirements. If there is a fit, we explain the scope, investment and next step. Complex projects may need a separate discovery session.",
      "Hablamos del problema, mostramos un ejemplo relevante y evaluamos requisitos. Si encaja, explicamos alcance, inversión y siguiente paso. Proyectos complejos pueden necesitar otra sesión.",
    ),
  },
  {
    q: c("How do you price the work?", "¿Cómo se fija el precio?"),
    a: c(
      "We quote a defined scope. Complexity, system access, usage, implementation and ongoing support affect the price. We agree the commercial terms before paid work begins.",
      "Presupuestamos un alcance definido. Complejidad, acceso a sistemas, uso, implementación y soporte influyen en el precio. Acordamos términos antes del trabajo pagado.",
    ),
  },
  {
    q: c("Can we see an example first?", "¿Podemos ver un ejemplo primero?"),
    a: c(
      "Yes. The dental recording is available without a form. Custom website demonstrations precede payment; bespoke phone configuration begins after agreement and initial payment. Activation follows testing and approval.",
      "Sí. La grabación dental está disponible sin formulario. Las demostraciones web personalizadas preceden al pago; la configuración telefónica empieza tras acuerdo y pago inicial. La activación sigue a pruebas y aprobación.",
    ),
  },
];
