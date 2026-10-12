import { c, type Copy } from "@/lib/marketing-copy";
export interface Industry {
  name: Copy;
  title: Copy;
  intro: Copy;
  examples: Copy[];
  boundary: Copy;
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
