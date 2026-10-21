import { c, type Copy, type ServiceId } from "@/lib/marketing-copy";
export interface Industry {
  name: Copy;
  title: Copy;
  intro: Copy;
  examples: Copy[];
  boundary: Copy;
  service?: ServiceId;
  secondary?: { href: string; label: Copy };
  demo?: boolean;
}
export const industries: Record<string, Industry> = {
  trades: {
    name: c("Trades & contractors", "Oficios y contratistas"),
    title: c(
      "Keep the job moving.\nKeep the details together.",
      "Mantén el trabajo en marcha.\nMantén los detalles juntos.",
    ),
    intro: c(
      "Enquiries, quotes, job notes and invoices often pass between the office and the field. Start by making one handoff clearer.",
      "Consultas, presupuestos, notas y facturas pasan entre oficina y campo. Empieza por aclarar un traspaso.",
    ),
    examples: [
      c(
        "Route a new enquiry to the right person.",
        "Dirigir una nueva consulta a la persona adecuada.",
      ),
      c(
        "Prepare a quote follow-up for review.",
        "Preparar un seguimiento de presupuesto para revisar.",
      ),
      c(
        "Connect completed-job information to the invoice process.",
        "Conectar información del trabajo completado con la facturación.",
      ),
    ],
    boundary: c(
      "Commercial commitments and unusual job requirements need an authorised reviewer.",
      "Compromisos comerciales y requisitos inusuales requieren un revisor autorizado.",
    ),
    demo: true,
  },
  property: {
    name: c("Property & real estate", "Inmobiliario y gestión de propiedades"),
    title: c(
      "Answer the enquiry.\nKeep the viewing moving.",
      "Atiende la consulta.\nMantén la visita en marcha.",
    ),
    intro: c(
      "Enquiries, viewings, tenant and landlord calls arrive while you are showing, driving or mid-negotiation. Start with the calls that most often go unanswered.",
      "Consultas, visitas y llamadas de inquilinos y propietarios llegan mientras muestras, conduces o negocias. Empieza por las llamadas que más suelen quedar sin respuesta.",
    ),
    examples: [
      c(
        "Route new sales, lettings and valuation enquiries to the right person.",
        "Dirigir nuevas consultas de venta, alquiler y valoración a la persona adecuada.",
      ),
      c(
        "Prepare viewing and valuation confirmations for review.",
        "Preparar confirmaciones de visitas y valoraciones para revisar.",
      ),
      c(
        "Keep tenant and maintenance call notes together for follow-up.",
        "Mantener juntas las notas de llamadas de inquilinos y mantenimiento para el seguimiento.",
      ),
    ],
    boundary: c(
      "Commercial terms, tenancy decisions and commitments remain with the responsible agent.",
      "Términos comerciales, decisiones de arrendamiento y compromisos quedan con el agente responsable.",
    ),
    service: "phone-agent",
    secondary: {
      href: "/phone-agent",
      label: c("See the recorded call", "Ver la llamada grabada"),
    },
    demo: true,
  },
  clinics: {
    name: c("Clinics & private practices", "Clínicas y consultas privadas"),
    title: c(
      "Help with patient enquiries.\nKeep the diary moving.",
      "Ayuda con consultas de pacientes.\nMantén la agenda en marcha.",
    ),
    intro: c(
      "New patient enquiries, booking questions and reschedule requests often arrive while the team is with someone. Start by making the phone dependable.",
      "Consultas de nuevos pacientes, dudas de reserva y cambios de cita llegan a menudo mientras el equipo está con alguien. Empieza por hacer fiable el teléfono.",
    ),
    examples: [
      c(
        "Give new patient enquiries a clear next step, including booking.",
        "Dar a las consultas de nuevos pacientes un siguiente paso claro, incluida la reserva.",
      ),
      c(
        "Prepare answers to routine questions like hours, parking and treatments.",
        "Preparar respuestas a preguntas habituales como horarios, aparcamiento y tratamientos.",
      ),
      c(
        "Keep reschedule and follow-up requests with a named owner.",
        "Mantener solicitudes de cambio de cita y seguimiento con un responsable.",
      ),
    ],
    boundary: c(
      "Clinical advice, treatment decisions and pricing commitments remain with the responsible clinician.",
      "El asesoramiento clínico, las decisiones de tratamiento y los compromisos de precio quedan con el clínico responsable.",
    ),
    service: "phone-agent",
    secondary: {
      href: "/phone-agent#demo",
      label: c("See the recorded dental call", "Ver la llamada dental grabada"),
    },
    demo: true,
  },
  solopreneurs: {
    name: c("Independent operators", "Profesionales independientes"),
    title: c(
      "A clearer process\nfor a smaller team.",
      "Un proceso más claro\npara un equipo pequeño.",
    ),
    intro: c(
      "A small business needs a focused setup, not a sprawling transformation. Identify the repetitive task that most interrupts delivery.",
      "Una pequeña empresa necesita una configuración concreta. Identifica la tarea repetitiva que más interrumpe la entrega.",
    ),
    examples: [
      c(
        "Keep enquiries and their next actions together.",
        "Mantener consultas y siguientes acciones juntas.",
      ),
      c(
        "Reduce repeated entry between supported tools.",
        "Reducir introducción repetida entre herramientas compatibles.",
      ),
      c(
        "Prepare reminders and scheduling information.",
        "Preparar recordatorios e información de agenda.",
      ),
    ],
    boundary: c(
      "The scope must fit the business budget, available systems and maintenance capacity.",
      "El alcance debe ajustarse al presupuesto, sistemas y capacidad de mantenimiento.",
    ),
  },
  insurance: {
    name: c("Insurance teams", "Equipos de seguros"),
    title: c(
      "Organise the follow-up.\nKeep advice with your team.",
      "Organiza el seguimiento.\nMantén el asesoramiento con tu equipo.",
    ),
    intro: c(
      "Explore administrative preparation around enquiries, documents and renewals, with explicit boundaries for regulated decisions.",
      "Explora preparación administrativa de consultas, documentos y renovaciones, con límites para decisiones reguladas.",
    ),
    examples: [
      c(
        "Prepare an enquiry record for the responsible team.",
        "Preparar un registro de consulta para el equipo responsable.",
      ),
      c("Organise missing-document requests.", "Organizar solicitudes de documentación pendiente."),
      c(
        "Prepare renewal follow-up queues for review.",
        "Preparar colas de seguimiento de renovaciones para revisar.",
      ),
    ],
    boundary: c(
      "Insurance advice, eligibility and policy decisions remain outside the illustrative administrative scope.",
      "Asesoramiento, elegibilidad y decisiones de póliza quedan fuera del alcance administrativo ilustrado.",
    ),
  },
  agencies: {
    name: c("Agencies", "Agencias"),
    title: c(
      "Keep client context\nthrough every handoff.",
      "Mantén el contexto del cliente\nen cada traspaso.",
    ),
    intro: c(
      "A signed scope, an onboarding request and a project update should not become disconnected threads. Map the work before connecting tools.",
      "Un alcance firmado, una solicitud de incorporación y una actualización no deberían quedar desconectados. Mapea el trabajo antes de conectar herramientas.",
    ),
    examples: [
      c(
        "Prepare client onboarding tasks from an approved scope.",
        "Preparar tareas de incorporación desde un alcance aprobado.",
      ),
      c("Organise project updates for review.", "Organizar actualizaciones para revisión."),
      c(
        "Connect enquiry follow-up to the responsible owner.",
        "Conectar seguimiento de consultas con su responsable.",
      ),
    ],
    boundary: c(
      "Client promises, scope changes and external messages require the agreed approval rules.",
      "Promesas al cliente, cambios de alcance y mensajes externos requieren las aprobaciones acordadas.",
    ),
  },
  accounting: {
    name: c("Accounting teams", "Equipos contables"),
    title: c(
      "Prepare the records.\nKeep judgment with the expert.",
      "Prepara los registros.\nMantén el criterio con el experto.",
    ),
    intro: c(
      "Administrative work can be scoped separately from financial decisions. Start with document requests, task ownership and reviewable summaries.",
      "El trabajo administrativo puede separarse de las decisiones financieras. Empieza con solicitudes, responsables y resúmenes revisables.",
    ),
    examples: [
      c(
        "Organise outstanding document requests.",
        "Organizar solicitudes de documentación pendiente.",
      ),
      c(
        "Prepare a review queue from agreed source records.",
        "Preparar una cola de revisión desde registros acordados.",
      ),
      c(
        "Keep recurring client follow-ups attributable.",
        "Registrar seguimientos recurrentes con su responsable.",
      ),
    ],
    boundary: c(
      "Accounting entries, tax advice and financial approvals stay with authorised professionals.",
      "Asientos contables, asesoramiento fiscal y aprobaciones financieras quedan con profesionales autorizados.",
    ),
  },
  legal: {
    name: c("Legal teams", "Equipos jurídicos"),
    title: c(
      "A clearer intake.\nAn accountable handoff.",
      "Una recepción más clara.\nUn traspaso con responsable.",
    ),
    intro: c(
      "Explore administrative intake and scheduling processes without confusing them with legal advice or case decisions.",
      "Explora recepción administrativa y agenda sin confundirlas con asesoramiento jurídico ni decisiones de casos.",
    ),
    examples: [
      c(
        "Prepare an enquiry for authorised review.",
        "Preparar una consulta para revisión autorizada.",
      ),
      c(
        "Organise requested documents and next actions.",
        "Organizar documentos solicitados y siguientes acciones.",
      ),
      c(
        "Connect scheduling requests to supported calendars.",
        "Conectar solicitudes de agenda con calendarios compatibles.",
      ),
    ],
    boundary: c(
      "Conflicts, case acceptance, confidentiality and legal advice require the firm’s own controls and review.",
      "Conflictos, aceptación, confidencialidad y asesoramiento requieren controles y revisión del despacho.",
    ),
  },
  consultants: {
    name: c("Consulting firms", "Consultoras"),
    title: c(
      "Connect the enquiry\nto the next useful conversation.",
      "Conecta la consulta\na la siguiente conversación útil.",
    ),
    intro: c(
      "Keep discovery context, agreed actions and client follow-up organised across your delivery process.",
      "Mantén contexto de descubrimiento, acciones acordadas y seguimiento organizados en la entrega.",
    ),
    examples: [
      c("Prepare discovery notes for review.", "Preparar notas de descubrimiento para revisar."),
      c(
        "Keep proposal follow-up with a named owner.",
        "Mantener seguimiento de propuestas con un responsable.",
      ),
      c(
        "Organise recurring client status updates.",
        "Organizar actualizaciones recurrentes de clientes.",
      ),
    ],
    boundary: c(
      "Recommendations, pricing and client commitments remain with the responsible consultant.",
      "Recomendaciones, precios y compromisos quedan con el consultor responsable.",
    ),
  },
};
// Phone-agent industry entry points. Existing SEO slugs remain available.
const phoneIndustry = (
  name: string,
  title: string,
  intro: string,
  examples: string[],
  boundary: string,
): Industry => ({
  name: c(name, name),
  title: c(title, title),
  intro: c(intro, intro),
  examples: examples.map((value) => c(value, value)),
  boundary: c(boundary, boundary),
  service: "phone-agent",
  secondary: { href: "/demos", label: c("See the recorded examples", "Ver los ejemplos grabados") },
});
industries["home-services"] = phoneIndustry(
  "Home services",
  "On the job.\nStill open to enquiries.",
  "AI phone agents for established HVAC, plumbing, roofing, restoration and trades businesses. Map what happens when an enquiry arrives while your office or field team cannot pick up.",
  [
    "Intake to configure: ask about the job, service location and useful context without making a diagnosis or promising attendance.",
    "Next steps to assess: approved inspection bookings or callback requests, subject to calendar access and your service-area rules.",
    "Handoffs to test: urgent requests, unclear details, unavailable slots and situations that need your team.",
  ],
  "These are configurable workflows. Emergency response, dispatch, live transfer and specific field-service integrations are not established by a dental booking demonstration.",
);
industries.trades = {
  ...(industries["home-services"] as Industry),
  name: c("Trades & contractors", "Oficios y contratistas"),
};
industries.property = phoneIndustry(
  "Property management",
  "Give every enquiry\na responsible next step.",
  "Explore phone intake for maintenance, tenant and landlord enquiries while your team is away from the desk.",
  [
    "Collect the type of request and agreed property context.",
    "Assess approved callback or appointment routes with the responsible team.",
    "Test urgent maintenance and unavailable-staff fallback against your own instructions.",
  ],
  "Emergency response, tenancy advice, dispatch and integrations require separate assessment. These are configurable workflows, not established property deployments.",
);
industries.automotive = phoneIndustry(
  "Automotive repair",
  "Keep the workshop moving.\nGive callers a next step.",
  "Scope phone handling around service enquiries while your team is with a customer or working on a vehicle.",
  [
    "Collect the caller’s enquiry and the vehicle details your team needs.",
    "Assess approved service-booking or callback workflows against actual workshop capacity.",
    "Agree which diagnostic, safety and unusual requests must reach a person.",
  ],
  "Repair diagnosis, completion times and authorization remain with your workshop. Booking-system compatibility and handoff behavior need assessment and testing.",
);
industries["it-services"] = phoneIndustry(
  "IT & web hosting",
  "Understand the enquiry.\nRoute the next conversation.",
  "Explore phone intake for hosting enquiries and support requests, with a clear distinction between a sales callback and an operational support incident.",
  [
    "Collect the business enquiry and a useful non-sensitive description.",
    "Assess callback scheduling with a named sales or support owner.",
    "Test incident escalation and fallback without requesting passwords or access credentials.",
  ],
  "No hosting migration, incident resolution, uptime commitment or named platform integration is implied. Agree permissions and escalation boundaries first.",
);
industries["professional-services"] = phoneIndustry(
  "Professional services",
  "Keep the context.\nMake the next conversation useful.",
  "Scope enquiry handling for firms whose people are often in appointments or focused on client work.",
  [
    "Gather the type of enquiry and agreed business context.",
    "Assess callback or consultation-booking routes.",
    "Keep acceptance decisions, advice and sensitive information with authorised staff.",
  ],
  "Professional advice, eligibility and case acceptance require your own controls and approval. Do not submit confidential client information in public forms.",
);

// Website translations describe the same qualified scope, not additional product languages.
const industrySpanish: Record<string, [string, string, string, string[], string]> = {
  "home-services": [
    "Servicios para el hogar",
    "En pleno trabajo.\nDisponible para nuevas consultas.",
    "Agentes telefónicos IA para empresas consolidadas de climatización, fontanería, tejados, restauración y oficios. Define qué ocurre cuando llega una consulta y tu equipo de oficina o campo no puede atender.",
    [
      "Recepción por configurar: preguntar por el trabajo, la ubicación y el contexto útil sin diagnosticar ni prometer una visita.",
      "Siguientes pasos por evaluar: reservas de inspección o solicitudes de devolución de llamada aprobadas, según el acceso a la agenda y las zonas que atiendes.",
      "Traspasos por probar: solicitudes urgentes, datos poco claros, horarios no disponibles y situaciones que necesitan a tu equipo.",
    ],
    "Son procesos configurables. Una demostración de reserva dental no acredita respuesta a emergencias, despacho, transferencia en vivo ni conexiones con sistemas de gestión de campo.",
  ],
  property: [
    "Gestión inmobiliaria",
    "Un siguiente paso con responsable\npara cada consulta.",
    "Explora la recepción telefónica de consultas de mantenimiento, inquilinos y propietarios cuando tu equipo está fuera de la oficina.",
    [
      "Recoger el tipo de solicitud y el contexto de la propiedad acordado.",
      "Evaluar devoluciones de llamada o citas aprobadas con el equipo responsable.",
      "Probar las alternativas ante mantenimiento urgente o personal no disponible según tus propias instrucciones.",
    ],
    "La respuesta a emergencias, el asesoramiento de alquiler, el despacho y las conexiones requieren evaluación independiente. Son procesos configurables, no implementaciones inmobiliarias acreditadas.",
  ],
  automotive: [
    "Talleres de automoción",
    "Mantén el taller en marcha.\nOfrece un siguiente paso.",
    "Define la atención de consultas de servicio mientras tu equipo está con un cliente o trabajando en un vehículo.",
    [
      "Recoger la consulta y los datos del vehículo que necesita tu equipo.",
      "Evaluar reservas de servicio o devoluciones de llamada aprobadas según la capacidad real del taller.",
      "Acordar qué consultas de diagnóstico, seguridad o casos inusuales debe atender una persona.",
    ],
    "El diagnóstico, los plazos de reparación y las autorizaciones quedan con el taller. Hay que evaluar y probar la compatibilidad de la agenda y los traspasos.",
  ],
  "it-services": [
    "Informática y alojamiento web",
    "Comprende la consulta.\nDirige la siguiente conversación.",
    "Explora la recepción telefónica de consultas de alojamiento y soporte, distinguiendo una devolución de llamada comercial de un incidente operativo.",
    [
      "Recoger la consulta empresarial y una descripción útil sin datos sensibles.",
      "Evaluar la programación de devoluciones de llamada con un responsable comercial o de soporte.",
      "Probar el escalado de incidentes y las alternativas sin pedir contraseñas ni credenciales de acceso.",
    ],
    "No se implica migración, resolución de incidentes, compromiso de disponibilidad ni conexión con una plataforma concreta. Primero hay que acordar permisos y límites de escalado.",
  ],
  "professional-services": [
    "Servicios profesionales",
    "Conserva el contexto.\nHaz útil la siguiente conversación.",
    "Define la recepción de consultas para empresas cuyos profesionales suelen estar en citas o concentrados en el trabajo de sus clientes.",
    [
      "Recoger el tipo de consulta y el contexto empresarial acordado.",
      "Evaluar devoluciones de llamada o reservas de consulta.",
      "Mantener las decisiones de aceptación, el asesoramiento y los datos sensibles con personal autorizado.",
    ],
    "El asesoramiento, la elegibilidad y la aceptación de casos requieren tus propios controles y aprobación. No envíes información confidencial de clientes en formularios públicos.",
  ],
};
for (const [slug, translated] of Object.entries(industrySpanish)) {
  const original = industries[slug];
  if (!original) continue;
  industries[slug] = {
    ...original,
    name: c(original.name.en, translated[0]),
    title: c(original.title.en, translated[1]),
    intro: c(original.intro.en, translated[2]),
    examples: original.examples.map((item, index) => c(item.en, translated[3][index] ?? item.es)),
    boundary: c(original.boundary.en, translated[4]),
  };
}
industries.trades = {
  ...(industries["home-services"] as Industry),
  name: c("Trades & contractors", "Oficios y contratistas"),
};

export interface Post {
  title: Copy;
  intro: Copy;
  sections: { title: Copy; body: Copy }[];
}
export const posts: Record<string, Post> = {
  "real-cost-of-manual-work": {
    title: c(
      "Find the recurring work before estimating its cost.",
      "Identifica el trabajo recurrente antes de estimar su coste.",
    ),
    intro: c(
      "Start with an observed task, not a headline savings number. A useful baseline makes the next decision easier to assess.",
      "Empieza con una tarea observada, no con una cifra de ahorro. Una base útil facilita evaluar la siguiente decisión.",
    ),
    sections: [
      {
        title: c("Follow a real example", "Seguir un ejemplo real"),
        body: c(
          "Choose a recent enquiry, invoice or handoff. Record which tools were involved, how many times information was re-entered and where the work waited. Separate active effort from elapsed waiting time.",
          "Elige una consulta, factura o traspaso reciente. Registra herramientas, repeticiones de datos y esperas. Separa esfuerzo activo de tiempo de espera.",
        ),
      },
      {
        title: c("Write down the assumptions", "Anotar las hipótesis"),
        body: c(
          "Measure several examples rather than the best or worst case alone. An illustrative labour-cost estimate is observed time multiplied by an explicitly assumed labour rate. It is not a forecast of revenue or a promise that a role can be removed.",
          "Mide varios ejemplos, no solo el mejor o peor. Una estimación ilustrativa de coste laboral multiplica tiempo observado por una tarifa explícita. No es previsión de ingresos ni promesa de eliminar un puesto.",
        ),
      },
      {
        title: c("Define a testable improvement", "Definir una mejora comprobable"),
        body: c(
          "Specify the input, the useful output and the owner. Compare the proposed process with the baseline, including review effort, corrections, implementation and ongoing support.",
          "Define entrada, salida útil y responsable. Compara el proceso propuesto con la base, incluyendo revisión, correcciones, implementación y soporte.",
        ),
      },
    ],
  },
  "hire-vs-automate": {
    title: c(
      "Hire, improve the process, or automate?",
      "¿Contratar, mejorar el proceso o automatizar?",
    ),
    intro: c(
      "These choices solve different problems. Clarify the responsibility before choosing a tool or a new role.",
      "Estas opciones resuelven problemas distintos. Aclara la responsabilidad antes de elegir herramienta o puesto.",
    ),
    sections: [
      {
        title: c("Identify the judgment required", "Identificar el criterio necesario"),
        body: c(
          "Work that depends on relationships, unusual situations or commercial decisions may need an experienced person. A repeatable preparation step with clear source information is a different candidate.",
          "Trabajo basado en relaciones, situaciones inusuales o decisiones comerciales puede necesitar una persona experimentada. Una preparación repetible con fuentes claras es otro caso.",
        ),
      },
      {
        title: c("Check whether the rules exist", "Comprobar si existen reglas"),
        body: c(
          "Automation does not fix unclear ownership. If two people disagree about what should happen next, resolve the rule first. Then identify where a person must review the output.",
          "La automatización no arregla responsabilidades confusas. Si dos personas discrepan sobre el siguiente paso, resuelve la regla primero. Después identifica dónde debe revisar una persona.",
        ),
      },
      {
        title: c("Assess the complete cost", "Evaluar el coste completo"),
        body: c(
          "Compare staffing, implementation, supported system access, usage, review and maintenance. Do not compare a salary with software subscription cost alone. Start with a bounded test and a known owner.",
          "Compara personal, implementación, acceso, uso, revisión y mantenimiento. No compares salario solo con suscripción. Empieza con una prueba limitada y un responsable.",
        ),
      },
    ],
  },
  "revenue-per-employee": {
    title: c("Choose measures that reflect the work.", "Elige medidas que reflejen el trabajo."),
    intro: c(
      "A single ratio cannot explain a business. Use operational measures alongside financial context and the quality of the customer experience.",
      "Una proporción no explica una empresa. Usa medidas operativas junto al contexto financiero y la experiencia del cliente.",
    ),
    sections: [
      {
        title: c("Measure what the process controls", "Medir lo que controla el proceso"),
        body: c(
          "Useful measures can include enquiries assigned, time to a meaningful response, incomplete records and corrections during review. Define the denominator and measurement period before comparing changes.",
          "Medidas útiles incluyen consultas asignadas, tiempo a respuesta significativa, registros incompletos y correcciones. Define denominador y periodo antes de comparar cambios.",
        ),
      },
      {
        title: c("Separate activity from outcomes", "Separar actividad y resultados"),
        body: c(
          "An answered call is not automatically an attended appointment. A reminder is not a payment. Track each stage separately and use verified source records for commercial outcomes.",
          "Una llamada atendida no es automáticamente una cita realizada. Un recordatorio no es un pago. Mide cada etapa y usa registros verificados para resultados comerciales.",
        ),
      },
      {
        title: c("Interpret changes in context", "Interpretar cambios en contexto"),
        body: c(
          "Staffing, seasonality, prices and business mix can change a ratio without showing the effect of a system. Keep assumptions visible and avoid presenting correlation as proven causation.",
          "Personal, estacionalidad, precios y mezcla de negocio pueden cambiar una proporción sin mostrar el efecto de un sistema. Mantén hipótesis visibles y no presentes correlación como causa demostrada.",
        ),
      },
    ],
  },
};
