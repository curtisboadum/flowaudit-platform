import { c, type Copy, type ServiceId } from "@/lib/marketing-copy";
import type { Industry } from "@/lib/industry-content";
import { professionalIndustriesA } from "@/lib/industry-copy-professional-a";
import { professionalIndustriesB } from "@/lib/industry-copy-professional-b";

export type { Industry } from "@/lib/industry-content";

const campaignIndustries: Record<string, Industry> = {
  trades: {
    name: c("Trades & contractors", "Oficios y contratistas"),
    metaTitle: "AI phone agents for trades and contractors",
    metaDescription:
      "FlowAudit builds AI phone agents for UK trades. It answers while you work, takes the job details, books the visit and sends you the summary. Hear a recorded call first.",
    hero: c(
      "A missed call is a quote\nyou never got to give.",
      "Una llamada perdida es un presupuesto\nque nunca llegaste a dar.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent that answers for you while you are on the tools. It takes the job, the address and the urgency, books the visit, and sends you a summary. Hear it handle a real call before you decide anything.",
      "FlowAudit crea un agente telefónico con IA que responde por ti mientras trabajas. Toma el trabajo, la dirección y la urgencia, reserva la visita y te envía un resumen. Escúchalo atender una llamada real antes de decidir nada.",
    ),
    painTitle: c("The work does not stop.\nNeither do the calls.", "El trabajo no se detiene.\nLas llamadas tampoco."),
    painLead: c(
      "Callers today work down the list until someone answers, and the job goes to whoever picked up.",
      "Hoy quien llama recorre la lista hasta que alguien contesta, y el trabajo se lo queda quien respondió.",
    ),
    pain: [
      {
        title: c("The burst pipe at 4:30pm", "La tubería rota a las 16:30"),
        body: c(
          "Water is coming through a ceiling and the caller needs someone now. It rings out while you are under a sink, so they ring the next firm. By the time you are back in the van, the job is gone.",
          "Hay agua cayendo del techo y quien llama necesita a alguien ya. Suena mientras estás debajo de un fregadero, así que llama a la siguiente empresa. Cuando vuelves a la furgoneta, el trabajo ya no está.",
        ),
      },
      {
        title: c("The quote that never happened", "El presupuesto que nunca existió"),
        body: c(
          "A homeowner is collecting three prices for a new bathroom. The firm that answers first books the survey. The other two never find out the job existed.",
          "Un propietario pide tres presupuestos para un baño nuevo. La empresa que contesta primero reserva la visita. Las otras dos nunca llegan a saber que el trabajo existía.",
        ),
      },
      {
        title: c("The calls that break the day", "Las llamadas que rompen el día"),
        body: c(
          "Suppliers, existing customers and new enquiries, all on one number, all while you are mid-job. Every call pulls you off the work for minutes you do not have.",
          "Proveedores, clientes habituales y consultas nuevas, todos en un mismo número y justo mientras trabajas. Cada llamada te saca del trabajo unos minutos que no tienes.",
        ),
      },
    ],
    capabilitiesTitle: c("It answers. It books.\nIt sends you the details.", "Responde. Reserva.\nTe envía los detalles."),
    capabilitiesLead: c(
      "The agent runs on a number you control, with rules you set and approve before it goes live.",
      "El agente funciona en un número que tú controlas, con reglas que defines y apruebas antes de activarlo.",
    ),
    capabilities: [
      {
        title: c("Answers in your business name", "Responde con el nombre de tu negocio"),
        body: c(
          "It picks up when you cannot, greets the caller the way you would, and says plainly that it is your automated assistant.",
          "Contesta cuando tú no puedes, saluda como lo harías tú y dice claramente que es tu asistente automatizado.",
        ),
        example: c(
          "A 7pm call about a leaking radiator: it takes the address, the problem and the best number to reach you on.",
          "Una llamada a las 19:00 por un radiador que gotea: toma la dirección, el problema y el mejor número para localizarte.",
        ),
      },
      {
        title: c("Captures the job properly", "Registra el trabajo como es debido"),
        body: c(
          "What the job is, where it is, how urgent it is, and how to reach the caller. No half-messages and no missing postcodes.",
          "Qué trabajo es, dónde está, con qué urgencia y cómo contactar a quien llama. Sin mensajes a medias ni códigos postales perdidos.",
        ),
        example: c(
          "Boiler, no heat at all, two young children in the house, full postcode, mobile number.",
          "Caldera, sin calefacción, dos niños pequeños en casa, código postal completo, móvil.",
        ),
      },
      {
        title: c("Books it into your diary", "Lo reserva en tu agenda"),
        body: c(
          "It offers the slots you allow and books the visit, the survey or the callback straight into your calendar.",
          "Ofrece los huecos que permites y reserva la visita, el presupuesto o la llamada directamente en tu calendario.",
        ),
        example: c(
          "A quote visit confirmed for Thursday at 10am while you are still on site.",
          "Una visita de presupuesto confirmada para el jueves a las 10:00 mientras sigues en el tajo.",
        ),
      },
      {
        title: c("Escalates what matters", "Escala lo que importa"),
        body: c(
          "Anything your rules mark as urgent goes straight to you or your on-call number, with the details already written down.",
          "Todo lo que tus reglas marcan como urgente llega directo a ti o a tu número de guardia, con los detalles ya escritos.",
        ),
        example: c(
          "The caller gets your instructions; you get the address and the problem straight away.",
          "Quien llama recibe tus instrucciones; tú recibes la dirección y el problema al momento.",
        ),
      },
    ],
    rulesTitle: c(
      "Your rules decide.\nYou approve before it goes live.",
      "Tus reglas deciden.\nTú apruebas antes de activarlo.",
    ),
    rulesBody: c(
      "You choose which calls it takes, what it offers, what it screens out and when a person takes over. You read the script, hear it answer and test it with real calls before activation. It never quotes, diagnoses or gives advice. That stays with you, where it belongs.",
      "Tú eliges qué llamadas atiende, qué ofrece, qué filtra y cuándo pasa a una persona. Lees el guion, lo escuchas responder y lo pruebas con llamadas reales antes de activarlo. Nunca presupuesta, diagnostica ni aconseja. Eso se queda contigo, donde debe estar.",
    ),
    recordingTitle: c("Hear it handle a real call.", "Escúchalo atender una llamada real."),
    recordingLead: c(
      "Below is a recorded booking call from a dental practice. The mechanics are exactly what yours would do: answer, take the details, offer times, confirm the booking. Your flows get built around your trade and tested with you before anything goes live.",
      "Abajo hay una llamada grabada de reserva de una clínica dental. La mecánica es exactamente la que tendrías: atender, tomar los datos, ofrecer horarios y confirmar la reserva. Tus flujos se construyen alrededor de tu oficio y se prueban contigo antes de activar nada.",
    ),
    faq: [
      {
        q: c("Will it answer on my number?", "¿Atenderá en mi número?"),
        a: c(
          "Yes. The agent answers on a number you control, usually the one on your van. We check how your phone setup can forward calls on the 15-minute call and agree the approach before anything changes.",
          "Sí. El agente atiende en un número que tú controlas, normalmente el de tu furgoneta. En la llamada de 15 minutos revisamos cómo puede desviar llamadas tu configuración y acordamos el enfoque antes de cambiar nada.",
        ),
      },
      {
        q: c("Can it quote jobs for me?", "¿Puede presupuestar trabajos?"),
        a: c(
          "No, and we would not let it try. It captures the job, books the visit and leaves the pricing to you. That is how your margins stay yours.",
          "No, y no dejaríamos que lo intentara. Registra el trabajo, reserva la visita y te deja el precio a ti. Así los márgenes siguen siendo tuyos.",
        ),
      },
      {
        q: c("What if the caller wants a person?", "¿Y si quien llama quiere una persona?"),
        a: c(
          "The agent offers a person during your hours, and a fast callback outside them. Callers always have a route to you.",
          "El agente ofrece una persona en tu horario y una llamada de vuelta rápida fuera de él. Quien llama siempre tiene una vía hacia ti.",
        ),
      },
      {
        q: c("What about the spam callers?", "¿Y las llamadas de spam?"),
        a: c(
          "Your rules decide what it screens. Trades get hit by sales calls all day, so the agent can filter known patterns and let real customers through.",
          "Tus reglas deciden qué filtra. Los oficios reciben llamadas comerciales todo el día, así que el agente puede filtrar patrones conocidos y dejar pasar a clientes reales.",
        ),
      },
      {
        q: c("How do I know what it said?", "¿Cómo sé lo que dijo?"),
        a: c(
          "You get a summary after every call with the caller details and what was booked. Call handling rules, including what is recorded, are agreed with you first.",
          "Recibes un resumen tras cada llamada con los datos de quien llamó y lo que se reservó. Las reglas de gestión, incluido qué se graba, se acuerdan contigo primero.",
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
        q: c("How long does setup take?", "¿Cuánto tarda la puesta en marcha?"),
        a: c(
          "We agree the order of work on the call. What matters is that nothing goes live until you have heard it answer and approved it.",
          "Acordamos el orden del trabajo en la llamada. Lo importante es que nada se active hasta que lo hayas escuchado responder y lo hayas aprobado.",
        ),
      },
    ],
    crossLead: c(
      "Once the phone is handled, the rest of the admin is next.",
      "Cuando el teléfono está resuelto, lo siguiente es el resto de la administración.",
    ),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A site with a quote form and booking, so customers who look you up can reach you without calling.",
          "Una web con formulario de presupuesto y reservas, para que quien te busque pueda contactarte sin llamar.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Quote follow-ups, job reminders and review requests that go out without you remembering.",
          "Seguimientos de presupuestos, recordatorios de trabajos y peticiones de reseñas que salen sin que tengas que acordarte.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Overdue invoices chased politely, with every step ready for your approval.",
          "Facturas vencidas reclamadas con educación, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c("Bring your last week\nof missed calls.", "Trae las llamadas perdidas\nde tu última semana."),
    closingBody: c(
      "Fifteen minutes. We look at how your calls are handled now, what an agent would cover for your trade, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos. Vemos cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu oficio y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  property: {
    name: c("Property & real estate", "Inmobiliario y gestión de propiedades"),
    metaTitle: "AI phone agents for estate and letting agents",
    metaDescription:
      "AI phone agents for UK property businesses. Every enquiry answered, viewings and valuations booked, offers and emergencies routed to a person. Hear a recorded call first.",
    hero: c("Enquiries do not wait\nfor Monday.", "Las consultas no esperan\nal lunes."),
    lead: c(
      "FlowAudit builds an AI phone agent that answers in your agency's name when the office is closed, when you are showing and when everyone is already on a call. It qualifies the caller, books viewings and valuations into your diary, and passes offers and genuine emergencies to a person, straight away.",
      "FlowAudit crea un agente telefónico con IA que responde con el nombre de tu agencia cuando la oficina está cerrada, cuando estás enseñando una propiedad y cuando todos están al teléfono. Cualifica a quien llama, reserva visitas y valoraciones en tu agenda y pasa ofertas y emergencias reales a una persona, al momento.",
    ),
    painTitle: c(
      "The phone rings while you are showing.\nThe buyer rings the next agent.",
      "El teléfono suena mientras enseñas.\nEl comprador llama al siguiente agente.",
    ),
    painLead: c(
      "Property moves at the speed of the first reply. The enquiry that hits voicemail at 7pm is on another agent's viewing list by 9.",
      "El sector inmobiliario va a la velocidad de la primera respuesta. La consulta que cae en el buzón a las 19:00 está en la lista de visitas de otro agente a las 21:00.",
    ),
    pain: [
      {
        title: c("The 9pm portal enquiry", "La consulta del portal a las 21:00"),
        body: c(
          "A buyer sees the listing after dinner and calls the number on the sheet. If it rings out, they tap the next listing before you have even seen the notification.",
          "Un comprador ve el anuncio después de cenar y llama al número de la ficha. Si no contestan, toca el siguiente anuncio antes de que tú hayas visto siquiera la notificación.",
        ),
      },
      {
        title: c("The viewing missed while showing", "La visita perdida mientras enseñas"),
        body: c(
          "You are mid-viewing with another buyer. The call goes to voicemail, and a valuation or a lettings enquiry quietly disappears from the day.",
          "Estás en una visita con otro comprador. La llamada se va al buzón y una valoración o una consulta de alquiler desaparece del día sin ruido.",
        ),
      },
      {
        title: c("The call at the wrong hour", "La llamada a la hora equivocada"),
        body: c(
          "A tenant with a leak, a landlord with a question, a contractor confirming access. All of it lands on the one mobile number that never stops.",
          "Un inquilino con una fuga, un propietario con una duda, un contratista confirmando acceso. Todo cae en el único móvil que no para nunca.",
        ),
      },
    ],
    capabilitiesTitle: c("Answered, qualified\nand in the diary.", "Atendida, cualificada\ny en la agenda."),
    capabilitiesLead: c(
      "The agent works to your rules: what it asks, what it books and what goes to a person immediately.",
      "El agente trabaja con tus reglas: qué pregunta, qué reserva y qué pasa a una persona de inmediato.",
    ),
    capabilities: [
      {
        title: c("Answers in your agency's name", "Responde con el nombre de tu agencia"),
        body: c(
          "It picks up when the office is closed, when you are showing and when the team is already on calls.",
          "Contesta cuando la oficina está cerrada, cuando estás enseñando y cuando el equipo ya está al teléfono.",
        ),
        example: c(
          "A 9pm sales enquiry: it captures the property, the buyer's position and offers a viewing.",
          "Una consulta de venta a las 21:00: registra la propiedad, la situación del comprador y ofrece una visita.",
        ),
      },
      {
        title: c("Qualifies the caller", "Cualifica a quien llama"),
        body: c(
          "Sales, lettings, valuations or maintenance. The agent works out which one it is and takes the details your team needs.",
          "Venta, alquiler, valoración o mantenimiento. El agente distingue de qué se trata y toma los datos que tu equipo necesita.",
        ),
        example: c(
          "A landlord asking about management: captured, tagged and ready for the morning.",
          "Un propietario preguntando por gestión: registrado, etiquetado y listo para la mañana.",
        ),
      },
      {
        title: c("Books viewings and valuations", "Reserva visitas y valoraciones"),
        body: c(
          "It offers your available slots and puts the appointment straight into the diary.",
          "Ofrece los huecos disponibles y pone la cita directamente en la agenda.",
        ),
        example: c(
          "A valuation confirmed for Tuesday at 2pm, with the address and vendor details attached.",
          "Una valoración confirmada para el martes a las 14:00, con la dirección y los datos del vendedor adjuntos.",
        ),
      },
      {
        title: c("Escalates offers and emergencies", "Escala ofertas y emergencias"),
        body: c(
          "Anything about an offer, a genuine emergency or a safety issue goes to a named person immediately, with a written record.",
          "Todo lo relacionado con una oferta, una emergencia real o un problema de seguridad llega de inmediato a una persona con nombre, con registro escrito.",
        ),
        example: c(
          "An offer on a listing: logged with the figures and passed to the negotiator on duty.",
          "Una oferta sobre un inmueble: registrada con las cifras y pasada al negociador de guardia.",
        ),
      },
    ],
    rulesTitle: c(
      "You set the triage.\nNothing sensitive waits.",
      "Tú defines el triaje.\nNada delicado se queda esperando.",
    ),
    rulesBody: c(
      "You approve the scripts, the questions, the viewing slots and the escalation rules before the line goes live. Offers, client money and anything you mark as urgent route straight to a human, with a written record. The agent handles the routine so your team handles the relationships.",
      "Tú apruebas los guiones, las preguntas, los huecos de visitas y las reglas de escalado antes de activar la línea. Ofertas, dinero de clientes y todo lo que marques como urgente va directo a una persona, con registro escrito. El agente se ocupa de lo rutinario para que tu equipo se ocupe de las relaciones.",
    ),
    recordingTitle: c("Hear the mechanics of a booking call.", "Escucha la mecánica de una llamada de reserva."),
    recordingLead: c(
      "The recording below is a dental booking, but listen for the pattern: answer, qualify, offer times, confirm, summarise. That is what it does for your viewing slots and valuation diary, built around your rules.",
      "La grabación de abajo es una reserva dental, pero escucha el patrón: atender, cualificar, ofrecer horarios, confirmar y resumir. Eso es lo que hará con tus huecos de visitas y tu agenda de valoraciones, según tus reglas.",
    ),
    faq: [
      {
        q: c("Will it work with our existing phone system?", "¿Funcionará con nuestro sistema telefónico actual?"),
        a: c(
          "We check your setup on the call. The agent can answer on a number you control with forwarding rules you approve, and we tell you plainly what your current provider supports before anything changes.",
          "Revisamos tu configuración en la llamada. El agente puede atender en un número que tú controlas con reglas de desvío que apruebas, y te decimos con claridad qué permite tu proveedor actual antes de cambiar nada.",
        ),
      },
      {
        q: c("What happens with offers?", "¿Qué pasa con las ofertas?"),
        a: c(
          "Offers go to a named human immediately and are logged with the details, so your obligations are handled the same day. The agent never discusses figures or terms.",
          "Las ofertas llegan de inmediato a una persona con nombre y quedan registradas con los detalles, para que tus obligaciones se gestionen el mismo día. El agente nunca comenta cifras ni condiciones.",
        ),
      },
      {
        q: c("What about client money questions?", "¿Y las preguntas sobre dinero de clientes?"),
        a: c(
          "It never talks about deposits, rent adjustments or refunds. Those conversations route straight to the right person.",
          "Nunca habla de fianzas, ajustes de renta ni devoluciones. Esas conversaciones van directas a la persona adecuada.",
        ),
      },
      {
        q: c("Will tenants get stuck talking to a bot?", "¿Se quedarán los inquilinos atrapados con un bot?"),
        a: c(
          "They can reach a person during your hours. Outside them, the agent takes the details and escalates genuine emergencies straight away, and routine issues are queued for the morning.",
          "Pueden llegar a una persona en tu horario. Fuera de él, el agente toma los datos y escala las emergencias reales de inmediato, y lo rutinario queda en cola para la mañana.",
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
    crossLead: c("The rest of the property admin can follow.", "El resto de la administración inmobiliaria puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A listing-ready site with viewing requests, so portal traffic has somewhere to land.",
          "Una web lista para anuncios con solicitudes de visita, para que el tráfico de los portales tenga dónde llegar.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Maintenance logging, landlord updates and follow-ups that stop living on someone's phone.",
          "Registro de mantenimiento, actualizaciones a propietarios y seguimientos que dejan de vivir en el móvil de alguien.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Rent arrears and fee invoices tracked, with every step ready for your approval.",
          "Impagos de renta y facturas de honorarios controlados, con cada paso listo para tu aprobación.",
        ),
      },
    ],
    closingTitle: c("Bring your last week\nof missed enquiries.", "Trae las consultas perdidas\nde tu última semana."),
    closingBody: c(
      "Fifteen minutes on how your calls are handled now, what an agent would cover for your agency, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre cómo se gestionan hoy tus llamadas, qué cubriría un agente en tu agencia y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
  clinics: {
    name: c("Clinics & private practices", "Clínicas y consultas privadas"),
    metaTitle: "AI phone agents for dental and private clinics",
    metaDescription:
      "AI phone agents for UK private clinics. It answers when your team is with patients, books into your diary and routes anything clinical to your team. Hear a recorded call first.",
    hero: c(
      "Your team is with patients.\nThe phone can still be answered.",
      "Tu equipo está con pacientes.\nEl teléfono puede seguir atendido.",
    ),
    lead: c(
      "FlowAudit builds an AI phone agent for private clinics and practices. It answers the calls your team cannot reach, books patients into your diary, handles routine questions with your approved answers, and passes anything clinical or urgent to your team straight away.",
      "FlowAudit crea un agente telefónico con IA para clínicas y consultas privadas. Atiende las llamadas que tu equipo no puede coger, reserva pacientes en tu agenda, responde preguntas habituales con tus respuestas aprobadas y pasa cualquier asunto clínico o urgente a tu equipo de inmediato.",
    ),
    painTitle: c("The quietest leak in the practice.", "La fuga más silenciosa de la clínica."),
    painLead: c(
      "People call at lunchtime, during treatments and after closing. A missed call is not a message waiting. It is a patient trying the next clinic on the list.",
      "La gente llama a mediodía, durante los tratamientos y después de cerrar. Una llamada perdida no es un mensaje esperando. Es un paciente probando con la siguiente clínica de la lista.",
    ),
    pain: [
      {
        title: c("The call during treatment", "La llamada durante el tratamiento"),
        body: c(
          "Reception is helping someone standing in front of them when the phone rings. One of the two waits. It is usually the phone, and that caller books elsewhere.",
          "Recepción está atendiendo a alguien que tiene delante cuando suena el teléfono. Uno de los dos espera. Normalmente espera el teléfono, y quien llamaba reserva en otro sitio.",
        ),
      },
      {
        title: c("The Monday backlog", "El atasco del lunes"),
        body: c(
          "The practice closes for the weekend and Monday opens with a list of voicemails. Every one of them waited, and some of them booked somewhere else on Sunday night.",
          "La clínica cierra el fin de semana y el lunes abre con una lista de mensajes. Todos esperaron, y algunos reservaron en otro sitio el domingo por la noche.",
        ),
      },
      {
        title: c("The calls that follow you home", "Las llamadas que te siguen a casa"),
        body: c(
          "The clinic number diverts to a mobile, and evenings disappear into reschedules, questions and bookings that should have been handled hours earlier.",
          "El número de la clínica se desvía a un móvil, y las tardes desaparecen entre cambios de cita, preguntas y reservas que deberían haberse gestionado horas antes.",
        ),
      },
    ],
    capabilitiesTitle: c(
      "Answered, booked\nand routed to the right person.",
      "Atendida, reservada\ny derivada a la persona correcta.",
    ),
    capabilitiesLead: c(
      "Your practice approves every answer, appointment type and escalation rule before the line goes live.",
      "Tu clínica aprueba cada respuesta, tipo de cita y regla de escalado antes de activar la línea.",
    ),
    capabilities: [
      {
        title: c("Answers every call", "Atiende cada llamada"),
        body: c(
          "When the desk is busy, through lunch and after hours, the agent picks up and greets callers the way your team would.",
          "Cuando recepción está ocupada, a mediodía y fuera de horario, el agente contesta y saluda como lo haría tu equipo.",
        ),
        example: c(
          "A new patient enquiry at 8pm: captured, with a check-up booked into the first suitable slot.",
          "Una consulta de paciente nuevo a las 20:00: registrada, con una revisión reservada en el primer hueco que encaja.",
        ),
      },
      {
        title: c("Books into your diary", "Reserva en tu agenda"),
        body: c(
          "It offers the appointment types and times you allow and puts the booking straight into your calendar.",
          "Ofrece los tipos de cita y horarios que permites y pone la reserva directamente en tu calendario.",
        ),
        example: c(
          "A hygiene visit booked for Wednesday at 3pm, with contact details attached.",
          "Una visita de higiene reservada para el miércoles a las 15:00, con los datos de contacto adjuntos.",
        ),
      },
      {
        title: c("Handles the routine questions", "Responde las preguntas habituales"),
        body: c(
          "Opening hours, parking, directions, treatment basics and preparation questions, answered in your practice's own words.",
          "Horarios, aparcamiento, cómo llegar, nociones básicas de tratamientos y preguntas de preparación, respondidas con las palabras de tu propia clínica.",
        ),
        example: c(
          "What to expect on a first visit, exactly how your practice explains it.",
          "Qué esperar en una primera visita, exactamente como lo explica tu clínica.",
        ),
      },
      {
        title: c("Hands over what needs a human", "Deriva lo que necesita a una persona"),
        body: c(
          "Clinical questions, urgent calls and anything you mark as sensitive go to your team immediately. The agent never gives clinical advice.",
          "Preguntas clínicas, llamadas urgentes y todo lo que marques como delicado llegan a tu equipo de inmediato. El agente nunca da consejo clínico.",
        ),
        example: c(
          "A patient in pain: routed to your urgent line and flagged for the team now.",
          "Un paciente con dolor: derivado a tu línea urgente y avisado al equipo ahora.",
        ),
      },
    ],
    rulesTitle: c(
      "Clinical care stays clinical.\nThe admin gets handled.",
      "La atención clínica sigue siendo clínica.\nLa administración queda resuelta.",
    ),
    rulesBody: c(
      "Your practice approves the scripts, the appointment types, the questions and the escalation rules before the line goes live. The data setup is documented and agreed with you first: what is captured, where it lives and how long it is kept. The agent books, captures and routes. It never gives clinical advice, and your team keeps the final word.",
      "Tu clínica aprueba los guiones, los tipos de cita, las preguntas y las reglas de escalado antes de activar la línea. La configuración de datos se documenta y se acuerda contigo primero: qué se registra, dónde vive y cuánto tiempo se conserva. El agente reserva, registra y deriva. Nunca da consejo clínico, y tu equipo tiene la última palabra.",
    ),
    recordingTitle: c("Hear a patient booking, start to finish.", "Escucha una reserva de paciente, de principio a fin."),
    recordingLead: c(
      "This short recording is a real booking call: the clinic answered, took the details, offered times and confirmed the appointment in the calendar. That same routine is what your practice would get, built around your appointment types and rules.",
      "Esta breve grabación es una llamada de reserva real: la clínica atendió, tomó los datos, ofreció horarios y confirmó la cita en el calendario. Esa misma rutina es la que tendría tu clínica, construida según tus tipos de cita y tus reglas.",
    ),
    faq: [
      {
        q: c("Will patients be comfortable with it?", "¿Estarán los pacientes cómodos con esto?"),
        a: c(
          "The agent says plainly that it is the practice's automated assistant, and during your hours a person is always a word away. Callers who just want an appointment get one instead of a voicemail.",
          "El agente dice claramente que es el asistente automatizado de la clínica, y en tu horario una persona está siempre a una palabra de distancia. Quien solo quiere una cita la consigue, en vez de un buzón de voz.",
        ),
      },
      {
        q: c("Does it give clinical advice?", "¿Da consejo clínico?"),
        a: c(
          "Never. It books, answers the routine questions you approve, and routes anything clinical to your team. The clinical line is exactly where you draw it.",
          "Nunca. Reserva, responde las preguntas habituales que apruebas y deriva lo clínico a tu equipo. La línea clínica está exactamente donde tú la pongas.",
        ),
      },
      {
        q: c("What happens with patient data?", "¿Qué pasa con los datos de pacientes?"),
        a: c(
          "The data setup is documented and agreed before activation: what is captured, where it is stored and how long it is kept. Nothing goes live until your practice is satisfied with it, and patient details never pass through this website.",
          "La configuración de datos se documenta y se acuerda antes de activar: qué se registra, dónde se almacena y cuánto tiempo se conserva. Nada se activa hasta que tu clínica esté conforme, y los datos de pacientes nunca pasan por este sitio web.",
        ),
      },
      {
        q: c("We already have online booking.", "Ya tenemos reserva online."),
        a: c(
          "Online booking catches the people who go looking. The phone still rings when the desk is full, and those callers rarely try twice.",
          "La reserva online atrapa a quien va buscando. El teléfono sigue sonando cuando recepción está llena, y quienes llaman rara vez lo intentan dos veces.",
        ),
      },
      {
        q: c("Will it work with our practice software?", "¿Funcionará con nuestro software de clínica?"),
        a: c(
          "We assess the calendar and systems you use on the fit call and give you a straight answer about what connects and what is handled another way.",
          "Evaluamos el calendario y los sistemas que usas en la llamada inicial y te damos una respuesta clara sobre qué se conecta y qué se gestiona de otra forma.",
        ),
      },
      {
        q: c("How is it priced?", "¿Cómo se fija el precio?"),
        a: c(
          "By scope: what the agent covers, how your calls are set up and the support you need. We quote after the 15-minute call, and you approve everything before work starts.",
          "Según el alcance: lo que cubre el agente, cómo se configuran tus llamadas y el soporte que necesitas. Presupuestamos tras la llamada de 15 minutos y apruebas todo antes de empezar.",
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
    crossLead: c("The rest of the practice admin can follow.", "El resto de la administración de la clínica puede ir después."),
    cross: [
      {
        href: "/web-design",
        line: c(
          "A practice site with online booking and clear treatment pages, built to be found by new patients.",
          "Una web para la clínica con reserva online y páginas claras de tratamientos, pensada para que la encuentren pacientes nuevos.",
        ),
      },
      {
        href: "/solutions",
        line: c(
          "Reminders and follow-ups that cut no-shows and keep patients in the loop.",
          "Recordatorios y seguimientos que reducen las ausencias y mantienen informados a los pacientes.",
        ),
      },
      {
        href: "/revenue-recovery",
        line: c(
          "Outstanding treatment balances chased with your approval at every step.",
          "Saldos de tratamientos pendientes reclamados con tu aprobación en cada paso.",
        ),
      },
    ],
    closingTitle: c("Bring your busiest day's call list.", "Trae la lista de llamadas de tu día más ajetreado."),
    closingBody: c(
      "Fifteen minutes on your phone setup, the call types you would hand over first, and whether it is worth doing. No pitch if it is not.",
      "Quince minutos sobre tu configuración telefónica, los tipos de llamada que cederías primero y si merece la pena. Sin discurso si no lo merece.",
    ),
  },
};

export const industries: Record<string, Industry> = {
  trades: campaignIndustries.trades,
  property: campaignIndustries.property,
  clinics: campaignIndustries.clinics,
  ...professionalIndustriesA,
  ...professionalIndustriesB,
} as Record<string, Industry>;

export type IndustrySlug = keyof typeof industries;

export const industryBookService: ServiceId = "phone-agent";

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
