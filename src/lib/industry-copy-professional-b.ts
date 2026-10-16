import { c } from "@/lib/marketing-copy";
import type { Industry } from "@/lib/industry-content";

export const professionalIndustriesB: Record<string, Industry> = {
  consultants: {
    name: c("Consulting firms", "Consultoras"),
    metaTitle: "AI phone agents for consulting firms",
    metaDescription:
      "FlowAudit builds AI phone agents for consultancies. Enquiries captured, discovery calls booked, new-business calls answered while you deliver. Hear a recorded call first.",
    hero: c(
      "The enquiry you never heard\nis the one that costs the most.",
      "La consulta que nunca oíste\nes la que más cuesta.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent that answers while you are delivering. It captures the enquiry, books the discovery call, and keeps new-business calls from slipping through the weeks you are heads-down with clients.",
      "FlowAudit crea un agente telefónico con IA que responde mientras entregas. Registra la consulta, reserva la llamada de descubrimiento y evita que las oportunidades se pierdan en las semanas en que estás a tope con clientes.",
    ),
    painTitle: c("Delivery is the job.\nThe phone is the pipeline.", "La entrega es el trabajo.\nEl teléfono es la cartera."),
    painLead: c(
      "Prospects call between your workshops and after hours. The consultancy that answers gets the brief, and the briefs that wait go to whoever was free that evening.",
      "Los prospectos llaman entre tus talleres y fuera de horario. La consultora que contesta se lleva el brief, y los briefs que esperan se van con quien estaba libre esa tarde.",
    ),
    pain: [
      {
        title: c("The call mid-workshop", "La llamada en mitad del taller"),
        body: c(
          "You are running a session and the phone rings out. The prospect does not leave a message, and the next consultancy on their list answers on the second ring.",
          "Estás dirigiendo una sesión y el teléfono suena sin respuesta. El prospecto no deja mensaje, y la siguiente consultora de su lista contesta al segundo timbre.",
        ),
      },
      {
        title: c("The evening enquiry", "La consulta de la tarde"),
        body: c(
          "Founders and directors finally get to their own lists after 7pm. An unanswered evening call is a Monday morning apology at best.",
          "Fundadores y directivos por fin llegan a sus propias listas después de las 19:00. Una llamada sin responder por la tarde es, como mucho, una disculpa el lunes por la mañana.",
        ),
      },
      {
        title: c("The follow-up that slipped", "El seguimiento que se escapó"),
        body: c(
          "Between client work, proposals and admin, the follow-up that should have happened on Thursday happens next month, if at all.",
          "Entre trabajo de cliente, propuestas y administración, el seguimiento que debía ocurrir el jueves ocurre el mes que viene, si ocurre.",
        ),
      },
    ],
    capabilitiesTitle: c("Answered between sessions.\nBooked into the week.", "Atendida entre sesiones.\nReservada en la semana."),
    capabilitiesLead: c(
      "The agent works to your rules: what it asks, what it books and what reaches you immediately.",
      "El agente trabaja con tus reglas: qué pregunta, qué reserva y qué te llega de inmediato.",
    ),
    capabilities: [
      {
        title: c("Answers while you deliver", "Responde mientras entregas"),
        body: c(
          "It picks up mid-delivery, after hours and when the whole team is in workshops.",
          "Contesta en mitad de una entrega, fuera de horario y cuando todo el equipo está en talleres.",
        ),
        example: c(
          "A new enquiry at 6:30pm: captured, with a discovery call offered for the next day.",
          "Una consulta nueva a las 18:30: registrada, con una llamada de descubrimiento ofrecida para el día siguiente.",
        ),
      },
      {
        title: c("Captures the brief", "Registra el brief"),
        body: c(
          "What they need, by when, who decides and how to reach them. Your team walks into the first call prepared.",
          "Qué necesitan, para cuándo, quién decide y cómo contactarles. Tu equipo entra en la primera llamada preparado.",
        ),
        example: c(
          "An operations review enquiry with a quarter-end deadline: logged with the facts.",
          "Una consulta de revisión de operaciones con plazo de fin de trimestre: registrada con los hechos.",
        ),
      },
      {
        title: c("Books the discovery call", "Reserva la llamada de descubrimiento"),
        body: c(
          "It offers your available slots and confirms the call in the calendar with the brief attached.",
          "Ofrece los huecos disponibles y confirma la llamada en el calendario con el brief adjunto.",
        ),
        example: c(
          "A discovery call confirmed for Wednesday at 9am while you are mid-workshop.",
          "Una llamada de descubrimiento confirmada para el miércoles a las 9:00 mientras estás en un taller.",
        ),
      },
      {
        title: c("Routes what matters", "Deriva lo que importa"),
        body: c(
          "Anything sensitive, high-value or outside the script goes to you immediately. The agent never gives advice and never quotes.",
          "Todo lo delicado, de alto valor o fuera del guion te llega de inmediato. El agente nunca aconseja y nunca presupuesta.",
        ),
        example: c(
          "A board-level enquiry: flagged for your personal callback, with the context written down.",
          "Una consulta a nivel de consejo: marcada para tu llamada personal, con el contexto ya escrito.",
        ),
      },
    ],
    rulesTitle: c("Your voice, your rules.\nThe pipeline stays warm.", "Tu voz, tus reglas.\nLa cartera sigue caliente."),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live. The data setup is documented and agreed first, and anything sensitive routes to you. The agent captures and books. It never gives advice, never quotes and never commits you to anything. That is your work, and it stays that way.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea. La configuración de datos se documenta y se acuerda primero, y lo delicado se deriva a ti. El agente registra y reserva. Nunca aconseja, nunca presupuesta y nunca te compromete a nada. Ese es tu trabajo, y así sigue.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your firm would use: answer, capture, offer times, confirm, summarise. Your own flows are built around your services and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu consultora: atender, registrar, ofrecer horarios, confirmar y resumir. Tus propios flujos se construyen según tus servicios y se prueban contigo primero.",
    ),
    faq: [
      {
        q: c("Will it sound like us?", "¿Sonará como nosotros?"),
        a: c(
          "You approve the script, the questions and the wording before it goes live. It answers in your firm's name, with your language.",
          "Tú apruebas el guion, las preguntas y las palabras antes de activarlo. Responde con el nombre de tu firma y con tu lenguaje.",
        ),
      },
      {
        q: c("What about pricing conversations?", "¿Y las conversaciones de precios?"),
        a: c(
          "It never quotes. It captures the brief and books the call where pricing belongs.",
          "Nunca presupuesta. Registra el brief y reserva la llamada donde los precios tienen su sitio.",
        ),
      },
      {
        q: c("What happens with existing clients?", "¿Qué pasa con los clientes actuales?"),
        a: c(
          "They can reach a person during your hours, and outside them the agent takes the details and routes anything urgent.",
          "Pueden llegar a una persona en tu horario y, fuera de él, el agente toma los datos y deriva lo urgente.",
        ),
      },
      {
        q: c("Is our work too varied for a script?", "¿Es nuestro trabajo demasiado variado para un guion?"),
        a: c(
          "The script covers the common paths, and anything else is captured and routed to a person. We test the awkward cases with you before activation.",
          "El guion cubre los caminos habituales, y todo lo demás se registra y se deriva a una persona. Probamos los casos difíciles contigo antes de activar.",
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
    crossLead: c("The rest of the pipeline can follow.", "El resto de la cartera puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A firm site with case studies and a booking flow that earns the enquiry in the first place.",
          "Una web de la firma con casos de éxito y un flujo de reserva que gana la consulta desde el principio.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Proposal follow-ups, onboarding steps and project updates that run while you deliver.",
          "Seguimientos de propuestas, pasos de incorporación y actualizaciones de proyecto que funcionan mientras entregas.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Milestone invoices tracked, with every step ready for your approval.",
          "Facturas por hitos controladas, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c(
      "Bring your last week\nof missed new-business calls.",
      "Trae las llamadas perdidas\nde negocio de tu última semana.",
    ),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your firm, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu firma y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  agencies: {
    name: c("Agencies", "Agencias"),
    metaTitle: "AI phone agents for agencies",
    metaDescription:
      "FlowAudit builds AI phone agents for UK agencies. Referrals and new-business calls answered, briefs captured and calls booked while the team is heads-down. Hear a recorded call first.",
    hero: c(
      "The enquiry you never heard\nis the one that costs the most.",
      "La consulta que nunca oíste\nes la que más cuesta.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent for agencies. It answers while the team is heads-down, captures the brief, books the call and keeps referrals from going cold in an inbox.",
      "FlowAudit crea un agente telefónico con IA para agencias. Responde cuando el equipo está a tope, registra el brief, reserva la llamada y evita que las recomendaciones se enfríen en una bandeja de entrada.",
    ),
    painTitle: c("The team is heads-down.\nThe referral is ringing.", "El equipo está a tope.\nLa recomendación está llamando."),
    painLead: c(
      "Referrals and senior clients still pick up the phone, and they do it in the gaps: between meetings, after hours, when the office is quiet.",
      "Las recomendaciones y los clientes senior siguen descolgando el teléfono, y lo hacen en los huecos: entre reuniones, fuera de horario, cuando la oficina está en silencio.",
    ),
    pain: [
      {
        title: c("The referral that rang at 4pm", "La recomendación que llamó a las 16:00"),
        body: c(
          "A happy client passes your name on. The referral calls while the whole team is in a review, it rings out, and by Friday they have found another agency.",
          "Un cliente contento da tu nombre. La recomendación llama mientras todo el equipo está en una revisión, suena sin respuesta y, para el viernes, ya ha encontrado otra agencia.",
        ),
      },
      {
        title: c("The brief in the inbox pile", "El brief en el montón de la bandeja"),
        body: c(
          "New-business enquiries arrive between decks, calls and invoices. The ones that wait are the ones that move on.",
          "Las oportunidades nuevas llegan entre presentaciones, llamadas y facturas. Las que esperan son las que se van.",
        ),
      },
      {
        title: c("The after-hours decision maker", "El que decide, después de hora"),
        body: c(
          "Marketing directors do their thinking after their own day ends. An unanswered 6pm call waits until morning. Their shortlist does not.",
          "Los directores de marketing piensan cuando termina su propio día. Una llamada sin responder a las 18:00 espera a la mañana. Su lista corta, no.",
        ),
      },
    ],
    capabilitiesTitle: c("Answered while you build.\nBooked while they are warm.", "Atendida mientras produces.\nReservada mientras están calientes."),
    capabilitiesLead: c(
      "The agent works to your rules: what it asks, what it books and what goes to an account lead immediately.",
      "El agente trabaja con tus reglas: qué pregunta, qué reserva y qué pasa a un responsable de cuenta de inmediato.",
    ),
    capabilities: [
      {
        title: c("Answers in your agency's name", "Responde con el nombre de tu agencia"),
        body: c(
          "It picks up when everyone is in reviews, on shoots or done for the day.",
          "Contesta cuando todos están en revisiones, en rodajes o ya han terminado el día.",
        ),
        example: c(
          "A referral at 5:45pm: captured, with an intro call offered for the next morning.",
          "Una recomendación a las 17:45: registrada, con una llamada inicial ofrecida para la mañana siguiente.",
        ),
      },
      {
        title: c("Captures the brief", "Registra el brief"),
        body: c(
          "The goal, the timeline and who decides. Enough for the first call to start one step ahead.",
          "El objetivo, los plazos y quién decide. Suficiente para que la primera llamada empiece un paso por delante.",
        ),
        example: c(
          "A rebrand enquiry with a Q2 deadline: logged with the details.",
          "Una consulta de rebranding con plazo en el segundo trimestre: registrada con los detalles.",
        ),
      },
      {
        title: c("Books the intro call", "Reserva la llamada inicial"),
        body: c(
          "It offers your available slots and confirms the call in the calendar with the brief attached.",
          "Ofrece los huecos disponibles y confirma la llamada en el calendario con el brief adjunto.",
        ),
        example: c(
          "An intro call confirmed for Tuesday at 3pm while the team is on a shoot.",
          "Una llamada inicial confirmada para el martes a las 15:00 mientras el equipo está de rodaje.",
        ),
      },
      {
        title: c("Routes what needs a person", "Deriva lo que necesita a una persona"),
        body: c(
          "Existing clients, suppliers and anything commercial reach the right person. The agent never quotes and never commits.",
          "Clientes actuales, proveedores y todo lo comercial llegan a la persona adecuada. El agente nunca presupuesta y nunca se compromete.",
        ),
        example: c(
          "A current client asking about scope: routed to their account lead with the context.",
          "Un cliente actual preguntando por el alcance: derivado a su responsable de cuenta con el contexto.",
        ),
      },
    ],
    rulesTitle: c("Your brand on the line.\nYour rules underneath.", "Tu marca al teléfono.\nTus reglas por debajo."),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live. The data setup is documented and agreed first, and anything commercial routes to a person. The agent captures and books. It never quotes, never commits and never speaks for the work without your words.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea. La configuración de datos se documenta y se acuerda primero, y todo lo comercial se deriva a una persona. El agente registra y reserva. Nunca presupuesta, nunca se compromete y nunca habla del trabajo sin tus palabras.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your agency would use: answer, capture, offer times, confirm, summarise. Your own flows are built around your services and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu agencia: atender, registrar, ofrecer horarios, confirmar y resumir. Tus propios flujos se construyen según tus servicios y se prueban contigo primero.",
    ),
    faq: [
      {
        q: c("We live in email and Slack. Why answer calls?", "Vivimos en email y Slack. ¿Para qué atender llamadas?"),
        a: c(
          "Because referrals and senior clients still pick up the phone. The agent keeps that channel answered without pulling your team out of the work.",
          "Porque las recomendaciones y los clientes senior siguen descolgando el teléfono. El agente mantiene ese canal atendido sin sacar a tu equipo del trabajo.",
        ),
      },
      {
        q: c("What about existing clients calling their contact?", "¿Y los clientes actuales que llaman a su contacto?"),
        a: c(
          "They get through during your hours. Outside them, the request is captured and routed, never lost.",
          "Consiguen hablar en tu horario. Fuera de él, la petición se registra y se deriva, nunca se pierde.",
        ),
      },
      {
        q: c("Will it scare off good leads?", "¿Espantará a las buenas oportunidades?"),
        a: c(
          "It is clear about what it is and books the human call fast. The leads it catches today are hitting voicemail or an empty office.",
          "Deja claro lo que es y reserva rápido la llamada con una persona. Las oportunidades que hoy atrapa estaban cayendo en un buzón de voz o en una oficina vacía.",
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
        q: c("What does the setup involve?", "¿Qué implica la puesta en marcha?"),
        a: c(
          "A short fit call, then we build and test the flows against real examples, and you approve the script and rules before activation. It answers as your agency, never as a stranger.",
          "Una llamada breve, después construimos y probamos los flujos con ejemplos reales, y tú apruebas el guion y las reglas antes de activar. Responde como tu agencia, nunca como un desconocido.",
        ),
      },
    ],
    crossLead: c("The rest of the agency admin can follow.", "El resto de la administración de la agencia puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "Your own site, built to convert: work, proof and a new-business form that books itself.",
          "Vuestra propia web, construida para convertir: trabajos, prueba y un formulario de negocio que se reserva solo.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Onboarding from an approved scope, project updates and status cadences that stop living in someone's head.",
          "Incorporación desde un alcance aprobado, actualizaciones de proyecto y rutinas de estado que dejan de vivir en la cabeza de alguien.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Invoices and late payers tracked, with every step ready for approval.",
          "Facturas y pagadores lentos controlados, con cada paso listo para su aprobación.",
        ),
      },
    ],
    closingTitle: c(
      "Bring your last week\nof missed new-business calls.",
      "Trae las llamadas perdidas\nde negocio de tu última semana.",
    ),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your agency, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu agencia y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  solopreneurs: {
    name: c("Independent operators", "Profesionales independientes"),
    metaTitle: "AI phone agents for solo operators and freelancers",
    metaDescription:
      "AI phone agents for solo operators. It answers while you are with a client or off the clock, captures the enquiry and books the appointment. Hear a recorded call first.",
    hero: c("You are the business.\nThe phone can still be answered.", "Tú eres el negocio.\nEl teléfono puede seguir atendido."),
    lead: c(
      "FlowAudit builds an AI phone agent for solo operators: coaches, therapists, trainers, consultants and one-person service businesses. It answers while you are with a client or off the clock, captures the enquiry and books the appointment, so you stop losing work to voicemail.",
      "FlowAudit crea un agente telefónico con IA para profesionales independientes: coaches, terapeutas, formadores, consultores y negocios de servicios de una sola persona. Responde mientras estás con un cliente o fuera de horario, registra la consulta y reserva la cita, para que dejes de perder trabajo en el buzón de voz.",
    ),
    painTitle: c("One pair of hands.\nOne front door.", "Un par de manos.\nUna sola puerta de entrada."),
    painLead: c(
      "Every enquiry depends on you being free at that exact minute. That is a business that leaks every time you blink.",
      "Cada consulta depende de que estés libre en ese minuto exacto. Es un negocio que pierde agua cada vez que parpadeas.",
    ),
    pain: [
      {
        title: c("The call during a session", "La llamada durante una sesión"),
        body: c(
          "You cannot answer mid-session, and the caller will not wait. By the time you check the phone, they have booked with someone else.",
          "No puedes contestar a mitad de sesión, y quien llama no espera. Cuando miras el teléfono, ya ha reservado con otra persona.",
        ),
      },
      {
        title: c("The evenings that disappear", "Las tardes que desaparecen"),
        body: c(
          "Messages, reschedules and questions eat the hours that were supposed to be rest, and tomorrow starts tired.",
          "Mensajes, cambios de cita y preguntas se comen las horas que debían ser de descanso, y mañana empieza cansado.",
        ),
      },
      {
        title: c("The bottleneck looking back at you", "El cuello de botella que te mira de frente"),
        body: c(
          "You are the delivery, the sales team and the front desk at once. The front desk is the first thing that slips.",
          "Eres a la vez la entrega, el equipo de ventas y la recepción. La recepción es lo primero que se resiente.",
        ),
      },
    ],
    capabilitiesTitle: c("It holds the fort.\nYou do the work.", "El agente aguanta el fuerte.\nTú haces el trabajo."),
    capabilitiesLead: c(
      "One flow, your calendar, your rules, and support sized for a solo diary.",
      "Un flujo, tu calendario, tus reglas y un soporte a la medida de una agenda individual.",
    ),
    capabilities: [
      {
        title: c("Answers for you", "Responde por ti"),
        body: c(
          "It picks up while you are with a client, travelling or done for the day.",
          "Contesta mientras estás con un cliente, de camino o ya has terminado el día.",
        ),
        example: c(
          "An enquiry at 8pm while you are mid-session: captured, with a call booked for tomorrow.",
          "Una consulta a las 20:00 mientras estás en sesión: registrada, con una llamada reservada para mañana.",
        ),
      },
      {
        title: c("Captures what you need", "Registra lo que necesitas"),
        body: c(
          "Who called, what they need, when they need it and the best number to reach them.",
          "Quién llamó, qué necesita, para cuándo y el mejor número para contactarle.",
        ),
        example: c(
          "A new client asking about availability: logged with their preferred times.",
          "Un cliente nuevo preguntando por disponibilidad: registrado con sus horarios preferidos.",
        ),
      },
      {
        title: c("Books the appointment", "Reserva la cita"),
        body: c(
          "It offers your available slots and confirms the appointment in your calendar.",
          "Ofrece los huecos disponibles y confirma la cita en tu calendario.",
        ),
        example: c(
          "A first session confirmed for Friday at 4pm, with the details attached.",
          "Una primera sesión confirmada para el viernes a las 16:00, con los detalles adjuntos.",
        ),
      },
      {
        title: c("Routes anything that needs you", "Deriva lo que te necesita a ti"),
        body: c(
          "Anything personal, complex or outside the script goes to you. It never gives advice and never makes a promise you have not approved.",
          "Todo lo personal, complejo o fuera del guion te llega a ti. Nunca aconseja y nunca promete nada que no hayas aprobado.",
        ),
        example: c(
          "A sensitive request: flagged for your own reply, with the context written down.",
          "Una petición delicada: marcada para tu respuesta personal, con el contexto ya escrito.",
        ),
      },
    ],
    rulesTitle: c("Built for one pair of hands.", "Diseñado para un par de manos."),
    rulesBody: c(
      "You approve the script, the questions and the escalation rules before the line goes live, and the data setup is documented and agreed first. The agent captures and books. It never gives advice and never goes beyond what you have approved. You stay the only voice that speaks for your work.",
      "Tú apruebas el guion, las preguntas y las reglas de escalado antes de activar la línea, y la configuración de datos se documenta y se acuerda primero. El agente registra y reserva. Nunca aconseja y nunca va más allá de lo que has aprobado. Sigues siendo la única voz que habla por tu trabajo.",
    ),
    recordingTitle: c("Hear the mechanics, then judge the fit.", "Escucha la mecánica y juzga si encaja."),
    recordingLead: c(
      "The recording below is a booking call from a dental practice. Listen for the pattern your business would use: answer, capture, offer times, confirm, summarise. Your own flow is built around your services and tested with you first.",
      "La grabación de abajo es una llamada de reserva de una clínica dental. Escucha el patrón que usaría tu negocio: atender, registrar, ofrecer horarios, confirmar y resumir. Tu propio flujo se construye según tus servicios y se prueba contigo primero.",
    ),
    faq: [
      {
        q: c("Is this too much for a one-person business?", "¿Es demasiado para un negocio de una persona?"),
        a: c(
          "It is built for exactly that: one flow, your calendar, your rules, and support sized for a solo diary.",
          "Está hecho exactamente para eso: un flujo, tu calendario, tus reglas y un soporte a la medida de una agenda individual.",
        ),
      },
      {
        q: c("What if the caller insists on speaking to me?", "¿Y si quien llama insiste en hablar conmigo?"),
        a: c(
          "They can reach you during your hours. Outside them, the agent takes the details and books a callback. Nobody is stuck.",
          "Puede llegar a ti en tu horario. Fuera de él, el agente toma los datos y reserva una llamada de vuelta. Nadie se queda atascado.",
        ),
      },
      {
        q: c("Can it answer for different services?", "¿Puede responder para distintos servicios?"),
        a: c(
          "Yes. The agent knows your services and the right questions for each, exactly as you approve them.",
          "Sí. El agente conoce tus servicios y las preguntas adecuadas para cada uno, exactamente como tú las apruebas.",
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
        q: c("How do I know it is working?", "¿Cómo sé que funciona?"),
        a: c(
          "You get a summary after every call, and you watch bookings land in your calendar.",
          "Recibes un resumen tras cada llamada, y ves las reservas llegar a tu calendario.",
        ),
      },
      {
        q: c("How do we start?", "¿Cómo empezamos?"),
        a: c(
          "A 15-minute call: how your calls are handled now, what an agent would cover for your work, and whether it is worth doing. You hear the recording first, and you approve everything before it goes live.",
          "Una llamada de 15 minutos: cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu trabajo y si merece la pena. Escuchas la grabación antes y apruebas todo antes de activar.",
        ),
      },
    ],
    crossLead: c("The rest of the one-person admin can follow.", "El resto de la administración en solitario puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A one-page site with booking, so you are findable and bookable without a phone call.",
          "Una web de una página con reservas, para que te encuentren y reserven sin necesidad de llamar.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Reminders, follow-ups and admin that run while you work.",
          "Recordatorios, seguimientos y administración que funcionan mientras trabajas.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Unpaid invoices chased politely, with every step ready for review.",
          "Facturas impagadas reclamadas con educación, con cada paso listo para revisar.",
        ),
      },
    ],
    closingTitle: c("Bring your last week\nof missed calls.", "Trae las llamadas perdidas\nde tu última semana."),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your work, and whether it is worth it. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu trabajo y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
};
