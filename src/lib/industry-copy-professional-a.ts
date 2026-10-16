import { c } from "@/lib/marketing-copy";
import type { Industry } from "@/lib/industry-content";

export const professionalIndustriesA: Record<string, Industry> = {
  accounting: {
    name: c("Accounting teams", "Equipos contables"),
    metaTitle: "AI phone agents for accountants and bookkeepers",
    metaDescription:
      "FlowAudit builds AI phone agents for UK accounting firms. Every call answered, enquiries captured, consultations booked, sensitive matters routed to you. Hear a recorded call first.",
    hero: c(
      "The enquiry you never heard\nis the one that costs the most.",
      "La consulta que nunca oíste\nes la que más cuesta.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent that answers while you are in client work. It captures the enquiry, books the consultation, handles routine questions, and passes anything sensitive to a person. Your firm keeps the advice and the relationships.",
      "FlowAudit crea un agente telefónico con IA que responde mientras trabajas para tus clientes. Registra la consulta, reserva la reunión, responde preguntas habituales y pasa lo delicado a una persona. Tu despacho conserva el asesoramiento y las relaciones.",
    ),
    painTitle: c("Busy season does not answer the phone.", "La temporada alta no atiende el teléfono."),
    painLead: c(
      "New client calls arrive in the gaps: lunchtime, after 5:30, and the weeks when everyone is head-down on returns. The firm that answers is the firm that gets the meeting.",
      "Las llamadas de clientes nuevos llegan en los huecos: a mediodía, después de las 17:30 y las semanas en que todos están a tope con las declaraciones. El despacho que contesta es el que consigue la reunión.",
    ),
    pain: [
      {
        title: c("The call during deep work", "La llamada en pleno trabajo"),
        body: c(
          "A client query or a fresh enquiry lands in the middle of a set of accounts. Answering costs twenty minutes of concentration. Not answering costs the client.",
          "Una consulta de un cliente o una oportunidad nueva llega en mitad de unas cuentas. Contestar cuesta veinte minutos de concentración. No contestar cuesta el cliente.",
        ),
      },
      {
        title: c("The answerphone at lunch", "El contestador a mediodía"),
        body: c(
          "Phones go quiet from 1pm and after 5:30, exactly when working people make their calls. Those callers dial the next firm before your office opens again.",
          "Los teléfonos enmudecen a la 13:00 y después de las 17:30, justo cuando la gente que trabaja hace sus llamadas. Esos llamadores marcan el siguiente despacho antes de que tu oficina vuelva a abrir.",
        ),
      },
      {
        title: c("The enquiry that went to a competitor", "La consulta que se fue a la competencia"),
        body: c(
          "A serious prospect rings three firms, gets two voicemails, and books the one that picked up. The other two never learn the meeting happened.",
          "Un cliente potencial serio llama a tres despachos, recibe dos buzones y reserva con el que contestó. Los otros dos nunca llegan a saber que esa reunión existió.",
        ),
      },
    ],
    capabilitiesTitle: c("Intake that answers.\nA diary that books.", "Recepción que contesta.\nUna agenda que reserva."),
    capabilitiesLead: c(
      "The agent works with your firm's rules and a script you approve. Nothing client-facing goes live until you have heard it and signed it off.",
      "El agente trabaja con las reglas de tu despacho y un guion que tú apruebas. Nada de cara al cliente se activa hasta que lo hayas escuchado y dado el visto bueno.",
    ),
    capabilities: [
      {
        title: c("Answers every call", "Contesta cada llamada"),
        body: c(
          "It picks up when the team is deep in work, through lunch and outside office hours.",
          "Contesta cuando el equipo está a tope, a mediodía y fuera del horario de oficina.",
        ),
        example: c(
          "A new client enquiry at 6pm: captured, with a consultation offered for the next working day.",
          "Una consulta de cliente nuevo a las 18:00: registrada, con una reunión ofrecida para el siguiente día laborable.",
        ),
      },
      {
        title: c("Captures the enquiry", "Registra la consulta"),
        body: c(
          "The caller, the matter, the company and the deadline. The details your team wants before a first conversation.",
          "Quién llama, el asunto, la empresa y el plazo. Los datos que tu equipo quiere antes de una primera conversación.",
        ),
        example: c(
          "A sole trader needing self assessment help before the January deadline: logged with the facts.",
          "Un autónomo que necesita ayuda con su declaración antes del plazo de enero: registrado con los hechos.",
        ),
      },
      {
        title: c("Books the consultation", "Reserva la reunión"),
        body: c(
          "It offers your available slots and puts the meeting straight into the calendar with the details attached.",
          "Ofrece los huecos disponibles y pone la reunión directamente en el calendario con los datos adjuntos.",
        ),
        example: c(
          "A bookkeeping review confirmed for Monday at 10am while you are on another call.",
          "Una revisión de contabilidad confirmada para el lunes a las 10:00 mientras atiendes otra llamada.",
        ),
      },
      {
        title: c("Routes what matters", "Deriva lo que importa"),
        body: c(
          "Anything sensitive, urgent or outside the routine goes to a named person immediately. The agent never gives tax or financial advice.",
          "Todo lo delicado, urgente o fuera de lo rutinario llega de inmediato a una persona con nombre. El agente nunca da asesoramiento fiscal ni financiero.",
        ),
        example: c(
          "An HMRC letter panic: flagged for a same-day callback from the right person.",
          "Un susto con una carta de Hacienda: marcado para que la persona adecuada devuelva la llamada ese mismo día.",
        ),
      },
    ],
    rulesTitle: c(
      "Your judgement stays yours.\nThe admin stops eating the day.",
      "Tu criterio sigue siendo tuyo.\nLa administración deja de comerse el día.",
    ),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live. The data setup is documented and agreed with you first, and anything sensitive routes to a person. The agent captures and books. It never gives tax advice, never gives financial advice and never takes instructions. That is your work, and it stays that way.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea. La configuración de datos se documenta y se acuerda contigo primero, y todo lo delicado se deriva a una persona. El agente registra y reserva. Nunca da asesoramiento fiscal, nunca da asesoramiento financiero y nunca acepta instrucciones. Ese es tu trabajo, y así sigue.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your firm would use: answer, capture, offer times, confirm, summarise. Your own flows are built around your services and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu despacho: atender, registrar, ofrecer horarios, confirmar y resumir. Tus propios flujos se construyen según tus servicios y se prueban contigo primero.",
    ),
    faq: [
      {
        q: c("Will it handle confidential information?", "¿Manejará información confidencial?"),
        a: c(
          "The agent captures an enquiry, not a case. The data setup is documented and agreed before activation, and anything sensitive routes straight to a person. Confidentiality works the way it always has: the right detail, with the right people.",
          "El agente registra una consulta, no un caso. La configuración de datos se documenta y se acuerda antes de activar, y todo lo delicado va directo a una persona. La confidencialidad funciona como siempre: cada detalle con las personas adecuadas.",
        ),
      },
      {
        q: c("Could it give advice by mistake?", "¿Podría dar asesoramiento por error?"),
        a: c(
          "It is built not to. It captures, books and answers only the routine questions you approve. Anything that needs judgement goes to your team.",
          "Está diseñado para no hacerlo. Registra, reserva y responde solo las preguntas rutinarias que apruebas. Todo lo que necesita criterio pasa a tu equipo.",
        ),
      },
      {
        q: c("We encourage clients to email. Why answer more calls?", "Preferimos que los clientes escriban. ¿Para qué más llamadas?"),
        a: c(
          "The agent filters rather than invites. It takes the detail, books what deserves your time and queues the rest for review. Your focused hours stay focused.",
          "El agente filtra en lugar de invitar. Toma los datos, reserva lo que merece tu tiempo y pone en cola el resto para revisión. Tus horas de concentración siguen siendo de concentración.",
        ),
      },
      {
        q: c("We already have a receptionist.", "Ya tenemos recepcionista."),
        a: c(
          "Then this covers their lunch, their holidays and the afternoons when they are with someone. It is cover, not a replacement.",
          "Entonces esto cubre su hora de comer, sus vacaciones y las tardes en que está con alguien. Es cobertura, no un reemplazo.",
        ),
      },
      {
        q: c("How is it priced?", "¿Cómo se fija el precio?"),
        a: c(
          "By scope: what the agent covers, how your calls are set up and the support you need. We quote after the 15-minute call, and you approve everything before work starts.",
          "Según el alcance: lo que cubre el agente, cómo se configuran tus llamadas y el soporte que necesitas. Presupuestamos después de la llamada de 15 minutos y tú apruebas todo antes de empezar.",
        ),
      },
      {
        q: c("How do we start?", "¿Cómo empezamos?"),
        a: c(
          "A 15-minute call: how your phones are handled now, the call types you would hand over first, and whether it is worth doing. You hear the recording first, and you approve everything before it goes live.",
          "Una llamada de 15 minutos: cómo se gestionan hoy tus teléfonos, qué tipos de llamada cederías primero y si merece la pena. Escuchas la grabación antes y apruebas todo antes de activar.",
        ),
      },
    ],
    crossLead: c(
      "The rest of the practice admin can follow.",
      "El resto de la administración del despacho puede ir después.",
    ),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A firm site with consultation booking and clear service pages, built for the clients you want next.",
          "Una web del despacho con reserva de reuniones y páginas claras de servicios, pensada para los clientes que quieres atraer.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Onboarding checklists, document chasing and deadline reminders that run without a nudge from you.",
          "Listas de incorporación, reclamación de documentos y recordatorios de plazos que funcionan sin que tú tengas que empujar.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Overdue fee invoices and payment plans tracked, with every step ready for your approval.",
          "Facturas de honorarios vencidas y planes de pago controlados, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c(
      "Bring your last week\nof missed client calls.",
      "Trae las llamadas perdidas\nde tu última semana.",
    ),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your firm, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu despacho y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  legal: {
    name: c("Legal teams", "Equipos jurídicos"),
    metaTitle: "AI phone agents for law firms",
    metaDescription:
      "AI phone agents for UK law firms. Every call answered, enquiries captured, consultations booked, confidential matters kept with your fee earners. Hear a recorded call first.",
    hero: c(
      "The enquiry you never heard\nis the one that costs the most.",
      "La consulta que nunca oíste\nes la que más cuesta.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent that answers for your firm, captures the enquiry, books the consultation and routes anything confidential straight to a person. Intake stops leaking, and your fee earners stay with the work that bills.",
      "FlowAudit crea un agente telefónico con IA que responde por tu despacho, registra la consulta, reserva la cita y deriva lo confidencial directamente a una persona. La recepción deja de perder agua, y tus abogados siguen con el trabajo que factura.",
    ),
    painTitle: c(
      "Intake is where good firms\nquietly lose work.",
      "La recepción es donde los buenos despachos\npierden trabajo en silencio.",
    ),
    painLead: c(
      "New enquiries arrive during client meetings, at 5:45pm and in the weeks everything lands at once. The caller rarely tries twice, and nobody ever finds out the firm was in the running.",
      "Las consultas nuevas llegan en reuniones con clientes, a las 17:45 y en las semanas en que todo cae a la vez. Quien llama rara vez lo intenta dos veces, y nadie llega a saber que el despacho estaba en la lista.",
    ),
    pain: [
      {
        title: c("The call during a client meeting", "La llamada durante una reunión"),
        body: c(
          "You are with a client and the phone is on silent. The caller does not leave a message. They ring the next firm, and your intake never knows it happened.",
          "Estás con un cliente y el teléfono está en silencio. Quien llama no deja mensaje. Llama al siguiente despacho, y tu recepción nunca se entera.",
        ),
      },
      {
        title: c("The 5:45pm enquiry", "La consulta de las 17:45"),
        body: c(
          "Someone finally gets a moment to sort out their matter after work and calls just after your lines close. That call is tomorrow's new client, for whoever answers it.",
          "Alguien encuentra por fin un momento para resolver su asunto después del trabajo y llama justo cuando tus líneas se cierran. Esa llamada es el cliente nuevo de mañana, para quien la conteste.",
        ),
      },
      {
        title: c("The calls that need care", "Las llamadas que requieren cuidado"),
        body: c(
          "Confidentiality starts with the first call. A generic answering service reading a script is the last thing a firm wants anywhere near client matters.",
          "La confidencialidad empieza en la primera llamada. Un servicio genérico leyendo un guion es lo último que un despacho quiere cerca de los asuntos de sus clientes.",
        ),
      },
    ],
    capabilitiesTitle: c("Answered with care.\nBooked without friction.", "Atendida con cuidado.\nReservada sin fricción."),
    capabilitiesLead: c(
      "The agent works inside boundaries you set: what it asks, what it never asks and who gets anything sensitive.",
      "El agente trabaja dentro de los límites que defines: qué pregunta, qué no pregunta nunca y quién recibe lo delicado.",
    ),
    capabilities: [
      {
        title: c("Answers for the firm", "Responde por el despacho"),
        body: c(
          "It picks up during meetings, during court time and outside office hours, and greets callers in the firm's name.",
          "Contesta durante reuniones, vistas y fuera del horario de oficina, y saluda en nombre del despacho.",
        ),
        example: c(
          "An enquiry at 6pm about a lease dispute: captured, with a consultation offered the next morning.",
          "Una consulta a las 18:00 sobre un conflicto de arrendamiento: registrada, con una cita ofrecida para la mañana siguiente.",
        ),
      },
      {
        title: c("Captures the enquiry", "Registra la consulta"),
        body: c(
          "The caller, the matter type, the basics and the urgency. Enough for your team to prepare, nothing that should wait for a lawyer.",
          "Quién llama, el tipo de asunto, lo básico y la urgencia. Suficiente para que tu equipo se prepare, nada que deba esperar a un abogado.",
        ),
        example: c(
          "A new business formation enquiry: logged with the company details and the timeline.",
          "Una consulta sobre constituir una sociedad: registrada con los datos de la empresa y el plazo.",
        ),
      },
      {
        title: c("Books the consultation", "Reserva la cita"),
        body: c(
          "It offers your available slots and confirms the appointment in the calendar, with the details attached for the fee earner.",
          "Ofrece los huecos disponibles y confirma la cita en el calendario, con los datos adjuntos para el abogado.",
        ),
        example: c(
          "A family matter consultation confirmed for Thursday at 2pm.",
          "Una cita sobre un asunto de familia confirmada para el jueves a las 14:00.",
        ),
      },
      {
        title: c("Routes sensitive matters", "Deriva los asuntos delicados"),
        body: c(
          "Anything urgent, delicate or outside the script goes to a named person immediately. The agent never gives legal advice and never accepts instructions.",
          "Todo lo urgente, delicado o fuera del guion llega de inmediato a una persona con nombre. El agente nunca da asesoramiento jurídico ni acepta instrucciones.",
        ),
        example: c(
          "A matter needing same-day attention: flagged for the right fee earner straight away.",
          "Un asunto que requiere atención el mismo día: marcado para el abogado adecuado de inmediato.",
        ),
      },
    ],
    rulesTitle: c("Confidential by design.\nClear by default.", "Confidencial por diseño.\nClaro por defecto."),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live. The data setup is documented and agreed first, and everything the agent captures stays inside the boundaries you set. It never gives legal advice, never takes instructions and never discusses case detail. That is the firm's work, and it stays that way.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea. La configuración de datos se documenta y se acuerda primero, y todo lo que registra el agente permanece dentro de los límites que fijas. Nunca da asesoramiento jurídico, nunca acepta instrucciones y nunca entra en detalles del caso. Ese es el trabajo del despacho, y así sigue.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your firm would use: answer, capture, offer times, confirm, summarise. Your own flows are built around your practice areas and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu despacho: atender, registrar, ofrecer horarios, confirmar y resumir. Tus propios flujos se construyen según tus áreas de práctica y se prueban contigo primero.",
    ),
    faq: [
      {
        q: c("What about client confidentiality?", "¿Y la confidencialidad de los clientes?"),
        a: c(
          "The agent captures contact details and matter basics, not privileged case detail. The data setup is documented and agreed before activation, and sensitive conversations route to a person.",
          "El agente registra datos de contacto y lo básico del asunto, no detalles privilegiados del caso. La configuración de datos se documenta y se acuerda antes de activar, y las conversaciones delicadas se derivan a una persona.",
        ),
      },
      {
        q: c("Could it give legal advice?", "¿Podría dar asesoramiento jurídico?"),
        a: c(
          "Never. It captures the enquiry and books the consultation. Advice and case decisions stay with your fee earners.",
          "Nunca. Registra la consulta y reserva la cita. El asesoramiento y las decisiones del caso siguen con tus abogados.",
        ),
      },
      {
        q: c("What about conflicts?", "¿Y los conflictos de interés?"),
        a: c(
          "It never accepts a matter. It captures the enquiry and routes it so your team can run conflicts and decide the next step.",
          "Nunca acepta un asunto. Registra la consulta y la deriva para que tu equipo pueda comprobar conflictos y decidir el siguiente paso.",
        ),
      },
      {
        q: c("Will clients object to an assistant?", "¿Les molestará a los clientes hablar con un asistente?"),
        a: c(
          "Mostly they want a fast, professional first contact, and the agent is clear about what it is. A person is always available during your hours.",
          "En general quieren un primer contacto rápido y profesional, y el agente deja claro lo que es. En tu horario siempre hay una persona disponible.",
        ),
      },
      {
        q: c("How is it priced?", "¿Cómo se fija el precio?"),
        a: c(
          "By scope: what the agent covers, how your calls are set up and the support you need. We quote after the 15-minute call, and you approve everything before work starts.",
          "Según el alcance: lo que cubre el agente, cómo se configuran tus llamadas y el soporte que necesitas. Presupuestamos después de la llamada de 15 minutos y tú apruebas todo antes de empezar.",
        ),
      },
      {
        q: c("How do we start?", "¿Cómo empezamos?"),
        a: c(
          "A 15-minute call: how your phones are handled now, the call types you would hand over first, and whether it is worth doing. You hear the recording first, and you approve everything before it goes live.",
          "Una llamada de 15 minutos: cómo se gestionan hoy tus teléfonos, qué tipos de llamada cederías primero y si merece la pena. Escuchas la grabación antes y apruebas todo antes de activar.",
        ),
      },
    ],
    crossLead: c("The rest of the firm's admin can follow.", "El resto de la administración del despacho puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A firm site with consultation booking and clear practice-area pages, found by the clients you want next.",
          "Una web del despacho con reserva de citas y páginas claras por áreas de práctica, para que la encuentren los clientes que quieres atraer.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Onboarding, document chasing and matter updates that run without a nudge from you.",
          "Incorporación de clientes, reclamación de documentos y actualizaciones de asuntos que funcionan sin que tú tengas que empujar.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Unpaid invoices and disbursements tracked, with every step ready for your approval.",
          "Facturas y suplidos impagados controlados, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c("Bring your last week\nof missed enquiries.", "Trae las consultas perdidas\nde tu última semana."),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your firm, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu despacho y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  insurance: {
    name: c("Insurance teams", "Equipos de seguros"),
    metaTitle: "AI phone agents for insurance brokers and advisers",
    metaDescription:
      "AI phone agents for UK insurance brokers and advisers. Every call answered, details captured, reviews booked, advice kept with your qualified people. Hear a recorded call first.",
    hero: c(
      "The enquiry you never heard\nis the one that costs the most.",
      "La consulta que nunca oíste\nes la que más cuesta.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent for brokers and advisers. It answers every client and prospect call, captures the details, books the review into your diary, and routes advice to your qualified people. Nothing regulated ever rests with the agent.",
      "FlowAudit crea un agente telefónico con IA para corredores y asesores. Atiende cada llamada de clientes y prospectos, registra los datos, reserva la revisión en tu agenda y deriva el asesoramiento a tus personas cualificadas. Nada regulado queda en manos del agente.",
    ),
    painTitle: c("Protection enquiries move fast.\nVoicemail does not.", "Las consultas de protección van rápido.\nEl buzón de voz no."),
    painLead: c(
      "People call about cover between their own meetings and after work. The adviser who answers first gets the relationship, and the rest get a missed-call note nobody ever sees.",
      "La gente llama por su seguro entre sus propias reuniones y después del trabajo. El asesor que contesta primero se queda con la relación, y los demás con una nota de llamada perdida que nadie llega a ver.",
    ),
    pain: [
      {
        title: c("The quote that cooled", "El presupuesto que se enfrió"),
        body: c(
          "A client asks about cover for a new mortgage and rings at lunchtime. By the time the call gets returned, the interest has cooled and the comparison site has moved in.",
          "Un cliente pregunta por un seguro para su nueva hipoteca y llama a mediodía. Cuando se devuelve la llamada, el interés se ha enfriado y el comparador ya ha entrado en juego.",
        ),
      },
      {
        title: c("The renewal window", "La ventana de renovaciones"),
        body: c(
          "Renewal questions pile up in the weeks everyone calls at once, and the calls that wait are the ones that move to another broker.",
          "Las preguntas de renovación se acumulan en las semanas en que todos llaman a la vez, y las llamadas que esperan son las que se van a otro corredor.",
        ),
      },
      {
        title: c("Calls between appointments", "Llamadas entre citas"),
        body: c(
          "You are with a client, the phone rings, and a straightforward enquiry turns into days of phone tag.",
          "Estás con un cliente, suena el teléfono y una consulta sencilla se convierte en días de llamadas cruzadas.",
        ),
      },
    ],
    capabilitiesTitle: c(
      "Answered, captured\nand booked for review.",
      "Atendida, registrada\ny reservada para revisión.",
    ),
    capabilitiesLead: c(
      "The agent works to your firm's rules, with a script you approve and escalation paths your compliance instincts will recognise.",
      "El agente trabaja con las reglas de tu firma, con un guion que apruebas y rutas de escalado que tu instinto de cumplimiento reconocerá.",
    ),
    capabilities: [
      {
        title: c("Answers in your firm's name", "Responde con el nombre de tu firma"),
        body: c(
          "It picks up when advisers are with clients and outside office hours, and greets callers the way your team would.",
          "Contesta cuando los asesores están con clientes y fuera del horario de oficina, y saluda como lo haría tu equipo.",
        ),
        example: c(
          "A life cover enquiry at 7pm: captured, with a review offered for the next day.",
          "Una consulta de seguro de vida a las 19:00: registrada, con una revisión ofrecida para el día siguiente.",
        ),
      },
      {
        title: c("Captures the details", "Registra los datos"),
        body: c(
          "The caller, the product area, the timing and anything that needs a qualified eye before the meeting.",
          "Quién llama, el área de producto, los plazos y todo lo que necesita una mirada cualificada antes de la reunión.",
        ),
        example: c(
          "A small business owner asking about key person cover: logged with the basics.",
          "Un dueño de negocio preguntando por un seguro de personas clave: registrado con lo esencial.",
        ),
      },
      {
        title: c("Books the review", "Reserva la revisión"),
        body: c(
          "It offers your available slots and puts the appointment straight into the diary with the details attached.",
          "Ofrece los huecos disponibles y pone la cita directamente en la agenda con los datos adjuntos.",
        ),
        example: c(
          "A protection review confirmed for Tuesday at 11am.",
          "Una revisión de protección confirmada para el martes a las 11:00.",
        ),
      },
      {
        title: c("Routes anything regulated", "Deriva todo lo regulado"),
        body: c(
          "Eligibility questions, recommendations and anything that needs a qualified view go to your advisers. The agent never gives advice and never quotes cover.",
          "Preguntas de elegibilidad, recomendaciones y todo lo que necesita una opinión cualificada llegan a tus asesores. El agente nunca asesora ni presupuesta coberturas.",
        ),
        example: c(
          "A claim question: passed straight to the person who handles claims.",
          "Una pregunta sobre un siniestro: pasada directamente a quien gestiona los siniestros.",
        ),
      },
    ],
    rulesTitle: c(
      "Advice stays with your advisers.\nThe phone finally keeps up.",
      "El asesoramiento se queda con tus asesores.\nEl teléfono por fin da abasto.",
    ),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live, and the data setup is documented and agreed first. Recording arrangements for your setup are part of that agreement. The agent captures and books. It never gives advice, never quotes cover and never touches a claim decision. Those stay with your qualified people, exactly as they should.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea, y la configuración de datos se documenta y se acuerda primero. Las condiciones de grabación de tu configuración forman parte de ese acuerdo. El agente registra y reserva. Nunca asesora, nunca presupuesta coberturas y nunca toca una decisión de siniestro. Eso se queda con tus personas cualificadas, como debe ser.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your firm would use: answer, capture, offer times, confirm, summarise. Your own flows are built around your product areas and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu firma: atender, registrar, ofrecer horarios, confirmar y resumir. Tus propios flujos se construyen según tus áreas de producto y se prueban contigo primero.",
    ),
    faq: [
      {
        q: c("What about regulated advice?", "¿Y el asesoramiento regulado?"),
        a: c(
          "It never gives it. Eligibility questions, recommendations and anything that needs a qualified view route to your advisers.",
          "Nunca lo da. Las preguntas de elegibilidad, las recomendaciones y todo lo que necesita una opinión cualificada se derivan a tus asesores.",
        ),
      },
      {
        q: c("Do calls need to be recorded?", "¿Hay que grabar las llamadas?"),
        a: c(
          "Where recording rules apply to your business, that is part of the setup agreed with you before activation. The agent captures a written summary of every call either way.",
          "Cuando las normas de grabación aplican a tu negocio, eso forma parte de la configuración acordada contigo antes de activar. En cualquier caso, el agente registra un resumen escrito de cada llamada.",
        ),
      },
      {
        q: c("Will clients think it is a call centre?", "¿Pensarán los clientes que es un centro de llamadas?"),
        a: c(
          "It answers in your firm's name, says what it is, and a person is available during your hours. The callers it catches today are getting voicemail.",
          "Responde con el nombre de tu firma, dice lo que es, y en tu horario hay una persona disponible. Las llamadas que hoy atrapa estarían cayendo en un buzón de voz.",
        ),
      },
      {
        q: c("Can it handle claims calls?", "¿Puede gestionar llamadas de siniestros?"),
        a: c(
          "It captures and routes. Anything urgent goes straight through to your people, and decisions stay with them.",
          "Registra y deriva. Todo lo urgente pasa directamente a tu gente, y las decisiones se quedan con ellos.",
        ),
      },
      {
        q: c("How is it priced?", "¿Cómo se fija el precio?"),
        a: c(
          "By scope: what the agent covers, how your calls are set up and the support you need. We quote after the 15-minute call, and you approve everything before work starts.",
          "Según el alcance: lo que cubre el agente, cómo se configuran tus llamadas y el soporte que necesitas. Presupuestamos después de la llamada de 15 minutos y tú apruebas todo antes de empezar.",
        ),
      },
      {
        q: c("How do we start?", "¿Cómo empezamos?"),
        a: c(
          "A 15-minute call: how your phones are handled now, the call types you would hand over first, and whether it is worth doing. You hear the recording first, and you approve everything before it goes live.",
          "Una llamada de 15 minutos: cómo se gestionan hoy tus teléfonos, qué tipos de llamada cederías primero y si merece la pena. Escuchas la grabación antes y apruebas todo antes de activar.",
        ),
      },
    ],
    crossLead: c("The rest of the back office can follow.", "El resto del back office puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A firm site with clear product pages and a review booking flow, built for the clients you want next.",
          "Una web de la firma con páginas claras de productos y un flujo de reserva de revisiones, pensada para los clientes que quieres atraer.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Renewal reminders, document chasing and client updates that run without a nudge from you.",
          "Recordatorios de renovación, reclamación de documentos y actualizaciones a clientes que funcionan sin que tú tengas que empujar.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Overdue fee invoices tracked, with every step ready for your approval.",
          "Facturas de honorarios vencidas controladas, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c("Bring your last week\nof missed client calls.", "Trae las llamadas perdidas\nde tu última semana."),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your firm, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu firma y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
};
