/**
 * @file es.ts
 * @description Spanish translation dictionary (structurally matches en.ts).
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Translations } from "./en";

export const es: Translations = {
  // Nav
  nav: {
    webDesign: "Diseño Web",
    revenueRecovery: "Recuperación de Ingresos",
    solutions: "Soluciones",
    howItWorks: "Cómo Funciona",
    phoneAgent: "Agente Telefónico IA",
    about: "Nosotros",
    bookCall: "Agenda una Llamada",
    careers: "Empleo",
  },

  // Home. Hero
  hero: {
    headline: "Tu Papeleo, Hecho Automáticamente",
    subtext:
      "FlowAudit se encarga del trabajo administrativo que odias. presupuestos, seguimientos, facturación. para que tu equipo se enfoque en lo que genera dinero.",
    ctaPrimary: "Calcula Tu Ahorro de Tiempo",
    ctaSecondary: "Mira Cómo Funciona",
    ctaNote: "Llamada de estrategia gratuita. sin compromiso, sin presión.",
  },

  // Home. Hero tabs
  heroTabs: {
    tab1Title: "Seguimiento de Cotización",
    tab1Desc:
      "Seguimiento automático de cada cotización que envías. no más negocios perdidos.",
    tab2Title: "Trabajo Terminado → Factura",
    tab2Desc:
      "Terminas un trabajo, la factura se envía sola. No más perseguir pagos semanas después.",
    tab3Title: "Resumen Semanal de Flujo de Caja",
    tab3Desc:
      "Ve qué está entrando, qué está vencido y qué necesita seguimiento. cada lunes por la mañana.",
  },

  // Home. Bento / Who This Is For
  bento: {
    badge: "Para Quién Es",
    headline: "Si Repites el Mismo Trabajo Cada Semana. Esto Es Para Ti",
    subtext:
      "Hecho para profesionales, contratistas y dueños de pequeños negocios cansados de hacer la misma administración cada semana.",
    signalsTitle: "Señales Comunes",
    signalsSubtext:
      "Si alguna de estas te suena familiar, estás dejando tiempo y dinero sobre la mesa.",
    signals: [
      "Escribiendo los mismos detalles de cotización en 3 apps diferentes",
      "Olvidando dar seguimiento a una cotización de $5,000",
      "Pasando el domingo por la noche haciendo facturas",
      "Perdiendo el rastro de qué trabajos están pagados",
      "Perdiendo llamadas porque estás en un trabajo",
      "Persiguiendo al mismo cliente por un pago 3 veces",
      "Deseando tener un gerente de oficina que puedas pagar",
    ],
    industriesTitle: "Funciona en Todas las Industrias",
    industriesSubtext:
      "Cualquier equipo con flujos de trabajo repetitivos puede beneficiarse.",
    industries: [
      { name: "Oficios y Contratistas", desc: "Plomeros, electricistas, construcción" },
      { name: "Emprendedores", desc: "Operadores individuales y equipos pequeños" },
      { name: "Seguros", desc: "Corredores y servicios financieros" },
      { name: "Agencias", desc: "Equipos de marketing y creativos" },
      { name: "Consultores", desc: "Firmas de asesoría y estrategia" },
      { name: "Contabilidad", desc: "Firmas contables y bookkeepers" },
    ],
    hiddenCostTitle: "El Costo Oculto",
    hiddenCostSubtext:
      "Cada hora en administración es una hora que no inviertes en crecer.",
    hiddenCostItems: [
      { label: "Cotizaciones y estimaciones", hours: "Gestionadas" },
      { label: "Facturación y cobros", hours: "Cobrados" },
      { label: "Agenda y coordinación", hours: "Coordinada" },
      { label: "Seguimiento a clientes", hours: "Seguido" },
    ],
    impactTitle: "Lo Que Cambia",
    impactSubtext: "El asistente te quita el trabajo repetitivo y registra cada acción.",
    impactHours: "24/7",
    impactHoursLabel: "el asistente no duerme ni pide vacaciones",
    impactDays: "Humano",
    impactDaysLabel: "aprobación donde importa",
    impactRoi: "Registrado",
    impactRoiLabel: "cada acción queda registrada con un resumen",
  },

  // FAQ
  faq: {
    badge: "FAQ",
    headline: "Preguntas Frecuentes",
  },

  // CTA
  cta: {
    headline: "Deja de Hacer Trabajo Que una Máquina Podría Manejar",
    subtext:
      "Agenda una llamada de estrategia gratuita. Te mostraremos exactamente qué partes de tu semana se pueden automatizar. y cuánto vas a ahorrar.",
    button: "Agenda una Llamada de Estrategia Gratuita",
    note: "Llamada de 15 minutos. Sin compromiso. Sin tecnicismos.",
  },

  // Footer
  footer: {
    tagline:
      "Asistentes de operaciones con IA para equipos ahogados en trabajo repetitivo.",
    copyright: `© ${new Date().getFullYear()} FlowAudit. Todos los derechos reservados.`,
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    solutionsTitle: "Soluciones",
    companyTitle: "Empresa",
    resourcesTitle: "Recursos",
  },

  // Book page
  book: {
    headline: "Agenda una llamada",
    subtext:
      "Elige un horario y tu confirmación incluye un enlace de Cal Video. 15 minutos, sin tecnicismos, sin presión.",
    scheduleTitle: "Elige un horario",
    scheduleSubtext:
      "Reserva un hueco en el calendario. ¿Prefieres email? Escribe a support@flowaudit.co.uk y te responderemos con horarios.",
    responseNote: "Tu confirmación de reserva incluye un enlace de Cal Video.",
    expectTitle: "Qué Esperar",
    step1Title: "Conversación Rápida Sobre Tu Negocio",
    step1Desc:
      "Te preguntaremos sobre tu semana típica: qué te consume tiempo y qué se te escapa.",
    step2Title: "Detectar las Oportunidades Rápidas",
    step2Desc:
      "Encontraremos 2-3 cosas que se pueden automatizar de inmediato, normalmente cotizaciones, facturación o seguimientos.",
    step3Title: "Obtener un Plan Claro",
    step3Desc:
      "Recibirás un plan en lenguaje sencillo con lo que construiremos y cómo funcionará.",
  },

  // Phone Agent page
  phoneAgent: {
    hero: {
      badge: "Para clínicas dentales",
      headline: "Cada llamada contestada. Cada paciente agendado.",
      subtext:
        "El agente telefónico con IA de FlowAudit contesta el teléfono de tu clínica, hace las preguntas correctas, maneja los casos urgentes con cuidado y agenda la cita directamente en el calendario que tu equipo ya usa.",
      ctaPrimary: "Ver la llamada de demostración",
      ctaSecondary: "Agendar una sesión de 15 minutos",
      note: "Mira la llamada completa, desde el primer tono hasta la cita reservada.",
    },
    leak: {
      badge: "La fuga",
      headline: "Las llamadas de las que nunca te enteras",
      subtext:
        "La mayoría de quienes llegan al buzón de voz no dejan mensaje. Simplemente llaman a la siguiente clínica.",
      moments: [
        {
          title: "Mientras el equipo atiende",
          desc: "Un paciente llama durante un empaste. El teléfono suena y nadie contesta. Esa persona no espera.",
        },
        {
          title: "En la comida y en la salida del colegio",
          desc: "Las horas de más llamadas coinciden justo con los momentos de más trabajo en recepción.",
        },
        {
          title: "Después del cierre",
          desc: "El dolor de noche y las urgencias de fin de semana también llaman. El buzón de voz no resuelve ninguna.",
        },
      ],
      stat: "En una revisión de MGMA, algunas clínicas tenían más de la mitad de sus llamadas entrantes cayendo al buzón de voz. Cada una de esas personas tuvo que ir a otro sitio.",
      statSource: "MGMA, marzo de 2026",
    },
    handles: {
      badge: "Qué resuelve",
      headline: "Una recepción que nunca pierde una llamada",
      items: [
        {
          title: "Contesta en unos dos tonos",
          desc: "Todas las llamadas, de día y de noche, incluidos los fines de semana. Sin música en espera, sin buzón de voz.",
        },
        {
          title: "Cualifica a quien llama",
          desc: "Paciente nuevo o existente, motivo de la visita, urgencia y los datos de contacto correctos.",
        },
        {
          title: "Clasifica urgencias con seguridad",
          desc: "Hinchazón, sangrado, traumatismo o dificultad para respirar se revisan primero y se escalan según tus reglas.",
        },
        {
          title: "Reserva la cita",
          desc: "Disponibilidad real de tu calendario, ofrecida en la llamada y confirmada en voz alta.",
        },
        {
          title: "Te envía un resumen",
          desc: "Una nota breve y la transcripción después de cada llamada, para que el equipo sepa exactamente qué pasó.",
        },
        {
          title: "Deriva cuando corresponde",
          desc: "Las preguntas complejas o clínicas pasan a tu equipo con un resumen completo, no con una llamada perdida.",
        },
      ],
    },
    demo: {
      badge: "La demostración",
      headline: "Mira una llamada real, de principio a fin",
      subtext:
        "Una madre llama por su hijo con dolor de muelas. Mira al agente clasificar, revisar el calendario, ofrecer un hueco de urgencia y confirmar la reserva. El número de teléfono está oculto en esta grabación.",
      note: "2 minutos 41 segundos, grabado desde la consola real del producto.",
    },
    how: {
      badge: "Cómo funciona",
      headline: "Se configura contigo y entra en marcha",
      steps: [
        {
          title: "Cuéntanos sobre la clínica",
          desc: "Servicios, horarios, ubicaciones y las preguntas que realmente hacen quienes llaman.",
        },
        {
          title: "Configuramos el agente",
          desc: "Tu saludo, tu voz y tus reglas para llamadas urgentes y derivaciones.",
        },
        {
          title: "Conecta tu calendario",
          desc: "El agente solo reserva huecos reales del calendario que ya usas.",
        },
        {
          title: "Llamadas de prueba y en marcha",
          desc: "Escuchas llamadas reales, las apruebas y el agente empieza a contestar.",
        },
      ],
    },
    guardrails: {
      badge: "Límites",
      headline: "Lo que el agente nunca hace",
      items: [
        "Nunca inventa disponibilidad ni reserva un hueco que no es real",
        "Nunca cotiza precios ni estima costes de tratamiento",
        "Nunca da consejo clínico ni un diagnóstico",
        "Nunca dice que es humano cuando se lo preguntan",
        "Nunca deja una urgencia sin una ruta de escalado",
        "Nunca empieza a operar en un número que no estés listo para desviar",
      ],
    },
    audience: {
      badge: "Para quién es",
      headline: "Hecho para equipos dentales",
      items: [
        {
          title: "Clínicas de una sola sede",
          desc: "Cubre la comida, los momentos de más trabajo y todas las llamadas después del cierre.",
        },
        {
          title: "Grupos con varias sedes y DSOs",
          desc: "Un número o muchos, cada uno con sus propias reglas y calendario.",
        },
        {
          title: "Clínicas de ortodoncia, implantes y urgencias",
          desc: "Las llamadas de alto valor y las urgentes se contestan primero, con las preguntas correctas.",
        },
      ],
      markets: "Ajustado para clínicas de Estados Unidos, Reino Unido y Canadá.",
    },
    faqItems: [
      {
        q: "¿Los pacientes notarán que hablan con una IA?",
        a: "Escucha la llamada de demostración y decide por ti mismo. Si un paciente lo pregunta directamente, el agente dice con claridad que es un asistente de IA de la clínica, y puede pedir hablar con una persona.",
      },
      {
        q: "¿Qué pasa con las urgencias?",
        a: "Los síntomas urgentes se revisan primero, siguiendo las reglas de clasificación de la propia clínica. El agente puede ofrecer huecos de urgencia, aplicar el recargo de urgencia que use tu clínica y avisar a tu equipo de inmediato.",
      },
      {
        q: "¿Funciona con nuestro número y nuestro equipo actuales?",
        a: "Sí. Contesta junto a tu número y tu recepción actuales. Tú eliges cuándo entra: desbordamiento, fuera de horario o todas las llamadas.",
      },
      {
        q: "¿Dónde caen las reservas?",
        a: "En el calendario que ya usas. El agente ve la disponibilidad real, reserva el hueco y confirma los detalles en voz alta durante la llamada.",
      },
      {
        q: "¿Cómo se gestiona la grabación de llamadas?",
        a: "La grabación y el consentimiento se configuran según la política de la clínica y las normas locales, incluido cualquier aviso que exija tu jurisdicción.",
      },
      {
        q: "¿Cuánto tarda la puesta en marcha?",
        a: "La mayor parte del trabajo es configuración, no código. Construimos el flujo de llamada, conectamos el calendario, hacemos llamadas de prueba contigo y salimos en vivo cuando lo apruebas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "El precio se trata en la llamada de presentación, donde podemos ajustar la configuración a la clínica. No publicamos una lista de tarifas.",
      },
    ],
    cta: {
      headline: "Escúchalo en las llamadas de tu propia clínica",
      subtext:
        "Agenda una sesión de 15 minutos. Te mostraremos la consola real, responderemos tus preguntas y veremos cómo sería la puesta en marcha en tu clínica.",
      button: "Agendar una sesión de 15 minutos",
      note: "Tu confirmación de reserva incluye un enlace de Cal Video.",
    },
  },

  // Web Design page
  webDesign: {
    heroHeadline: "Sitios Web Personalizados y Herramientas con IA Para Tu Negocio",
    heroSubtext:
      "Diseñamos, construimos y mantenemos tu presencia online completa. sitio web, chatbot con IA, sistema de reservas, facturación. todo lo que tu negocio necesita para verse profesional y capturar cada cliente potencial.",
    heroCta: "Agenda una Llamada Gratuita",
    heroCtaSecondary: "Ver Nuestros Productos",
    heroNote: "Sin plantillas. Cada sitio es único para tu negocio.",

    howItWorksTitle: "Cómo Funciona",
    step1Title: "Investigamos Tu Negocio",
    step1Desc:
      "Estudiamos tu industria, competidores y clientes para entender qué necesita lograr tu sitio web.",
    step2Title: "Construimos Tu Sitio",
    step2Desc:
      "Nuestro equipo diseña y construye un sitio web personalizado para tu negocio. antes de que pagues nada.",
    step3Title: "Tú Revisas y Apruebas",
    step3Desc:
      "Ve tu sitio demo en vivo. Solicita cambios. Solo paga cuando estés completamente satisfecho.",
    step4Title: "Nosotros Nos Encargamos de Todo",
    step4Desc:
      "Hosting, actualizaciones, seguridad, soporte. todo incluido. Tú enfócate en tu negocio.",

    productsTitle: "Todo Lo Que Tu Negocio Necesita Online",
    productsSubtext:
      "Empieza con un sitio web. Agrega herramientas a medida que tu negocio crece. Cancela en cualquier momento después de tu plazo de 12 meses.",
    everythingLabel: "Todo Incluido",
    everythingDesc: "Las 8 herramientas incluidas",

    product1: "Sitio Web Personalizado",
    product1Desc:
      "Diseño único, optimizado para móviles, acceso CMS, hosting y SSL incluidos.",
    product2: "Chatbot con IA",
    product2Desc:
      "Asistente de IA 24/7 entrenado en tu negocio. Captura clientes mientras duermes.",
    product3: "IA Fuera de Horario",
    product3Desc:
      "Maneja llamadas y mensajes fuera de tu horario laboral. Nunca pierdas un cliente potencial.",
    product4: "Respuesta Automática a Llamadas Perdidas",
    product4Desc:
      "Envía un mensaje automático a los clientes en segundos cuando pierdes su llamada.",
    product5: "Sistema de Reservas",
    product5Desc:
      "Deja que los clientes reserven citas online. Envía recordatorios automáticamente.",
    product6: "Facturación Automatizada",
    product6Desc:
      "Envía facturas profesionales por mensaje. Rastrea pagos. Cobra vencidos automáticamente.",
    product7: "Sistema de Solicitud de Cotización",
    product7Desc:
      "Captura solicitudes de cotización desde tu sitio web. Recibe notificaciones al instante.",
    product8: "Recolector de Testimonios",
    product8Desc:
      "Recopila automáticamente reseñas de clientes satisfechos y muéstralas en tu sitio.",

    whyUsTitle: "Por Qué Elegirnos",
    why1Title: "Sin Plantillas",
    why1Desc:
      "Cada sitio web que construimos está diseñado a medida para tu negocio. Nunca verás otro sitio que se vea como el tuyo.",
    why2Title: "No Te Preocupes por Nada",
    why2Desc:
      "Nosotros manejamos hosting, seguridad, actualizaciones y soporte. Si algo se rompe, lo arreglamos.",
    why3Title: "IA Que Realmente Funciona",
    why3Desc:
      "Nuestras herramientas de IA no son trucos. Capturan clientes reales, envían facturas reales y ahorran horas reales cada semana.",
    why4Title: "Vélo Antes de Pagar",
    why4Desc:
      "Construimos tu sitio demo antes de que te comprometas. Solo pagas cuando te encanta lo que ves.",

    faq1Q: "¿Qué pasa si cancelo?",
    faq1A:
      "Después de tu plazo de 12 meses, puedes cancelar en cualquier momento con 30 días de aviso. Si cancelas, tu sitio web y todas las herramientas se desconectan ya que funcionan en nuestra infraestructura.",
    faq2Q: "¿Puedo comprar mi sitio web definitivamente?",
    faq2A:
      "Revisamos juntos las opciones de propiedad en una llamada y ponemos por escrito el alcance recomendado antes de empezar.",
    faq3Q: "¿Cuánto tiempo toma construir mi sitio web?",
    faq3A:
      "La mayoría de los sitios web están listos en 5-10 días hábiles. Las herramientas adicionales se configuran dentro de 48 horas después de que tu sitio esté en línea.",
    faq4Q: "¿Necesito proporcionar contenido?",
    faq4A:
      "Nosotros nos encargamos de todo. textos, imágenes, diseño. Solo necesitamos los detalles de tu negocio y hacemos el resto.",
    faq5Q: "¿Puedo hacer cambios en mi sitio web?",
    faq5A:
      "Sí, tienes acceso CMS para actualizar texto, imágenes y contenido básico en cualquier momento. Para cambios de diseño, nuestro equipo se encarga.",
    faq6Q: "¿Qué pasa si solo quiero un sitio web sin los complementos?",
    faq6A:
      "Por supuesto. El sitio web es un producto independiente. Agrega herramientas cuando estés listo.",

    ctaHeadline: "¿Listo Para Ver Cómo Podría Verse Tu Sitio Web?",
    ctaSubtext:
      "Agenda una llamada de estrategia gratuita. Discutiremos tu negocio y te mostraremos lo que es posible.",
    ctaButton: "Agenda una Llamada Gratuita",
  },

  // Problem section
  problem: {
    badge: "El Problema",
    headline: "El Trabajo Manual Está Matando Tu Margen Silenciosamente",
    subtext: "Lo que empieza como \"lo hago esta noche\" se convierte en la razón por la que no puedes aceptar más trabajos.",
    chartManual: "Horas de Tareas Manuales",
    chartAI: "Con Asistente de IA",
    chartSavings: "Ahorro de Tiempo",
    chartYears: ["Ahora", "6 meses", "1 año", "18 meses", "2 años", "30 meses", "3 años"],
    keyPoints: [
      { title: "Las Tareas se Acumulan", desc: "Cada nuevo cliente significa más cotizaciones, facturas, cobranzas" },
      { title: "Lo Manual Escala", desc: "Más trabajos = más papeleo, las mismas horas en el día" },
      { title: "Contratar Cuesta", desc: "Un gerente de oficina cuesta $30K+ antes de ahorrarte un centavo" },
      { title: "La Admin Roba Tiempo", desc: "Cada hora en administración es una hora sin trabajo pagado" },
      { title: "Aumenta el Agotamiento", desc: "Trabajando noches y fines de semana solo para mantenerte al día" },
    ],
  },


  // Calculator section
  calc: {
    badge: "Calculadora",
    headline: "¿Cuánto Vale Realmente Tu Tiempo?",
    subtext: "Descubre exactamente cuánto le cuesta a tu negocio el trabajo repetitivo.",
    note: "Toma 30 segundos. Sin email requerido.",
    slider1: "Horas por semana en tareas repetitivas",
    slider2: "Valor promedio por hora de tu tiempo",
    slider3: "Miembros del equipo afectados",
    result1: "Valor Mensual de Tiempo Recuperado",
    result2: "Valor Anual Recuperado",
    result3: "Contrataciones Evitadas",
    result4: "Tiempo de Retorno",
    cta: "Obtener Análisis Detallado de ROI",
    disclaimer: "*Basado en estimaciones conservadoras.",
    week: "semana",
    weeks: "semanas",
    hrs: "hrs",
    people: "personas",
  },

  // Process section
  process: {
    badge: "Cómo Funciona",
    headline: "Del Trabajo Manual al Automatizado",
    subtext: "Nosotros hacemos el trabajo pesado. tú solo asistes a una llamada de 15 minutos.",
    step1: "Llamada de Flujo de Trabajo de 15 Minutos",
    step1Desc: "Mapeamos tus flujos de trabajo actuales e identificamos los mayores consumidores de tiempo.",
    step2: "Identificar Tareas Repetitivas",
    step2Desc: "Señalamos exactamente qué tareas se pueden automatizar para el máximo impacto.",
    step3: "Construir Tu Asistente de IA",
    step3Desc: "Configuramos y entrenamos tu asistente de operaciones de IA personalizado.",
    step4: "Probar con Datos Reales",
    step4Desc: "Validamos que el asistente funciona correctamente con tus flujos de trabajo reales.",
    step5: "En Vivo",
    step5Desc: "Tu asistente comienza a manejar tareas. Empiezas a ahorrar tiempo de inmediato.",
  },

  // Comparison section
  comparison: {
    badge: "Comparar",
    headline: "¿Qué Pasa Si No Haces Nada?",
    subtext: "El trabajo manual crece con tu negocio. Aquí está la comparación a 3 años.",
    manualHeader: "Camino Manual",
    autoHeader: "Con FlowAudit",
    rows: [
      { category: "Carga administrativa", manual: "Crece con los ingresos", automated: "Se mantiene estable" },
      { category: "Velocidad de cotización", manual: "Horas para preparar", automated: "Minutos" },
      { category: "Cotizaciones perdidas", manual: "Negocios se pierden", automated: "Cada cotización recibe seguimiento" },
      { category: "Velocidad de seguimiento", manual: "Días (si te acuerdas)", automated: "El mismo día, automático" },
      { category: "Trabajo en noches/fines de semana", manual: "Haciendo facturas a las 10pm", automated: "Listo en horario laboral" },
      { category: "Dinero sobre la mesa", manual: "Trabajos facturados tarde, cotizaciones olvidadas", automated: "Todo rastreado y cobrado" },
      { category: "Aceptar más trabajo", manual: "No puedes crecer sin más personal", automated: "Maneja más con el mismo equipo" },
    ],
  },

  // FAQ items
  faqItems: [
    { q: "¿En qué se diferencia de contratar un asistente virtual?", a: "Un asistente virtual es otra persona que gestionar, formar y cubrir. Nuestro sistema funciona 24/7, sigue tu proceso exactamente y se encarga del trabajo repetitivo para que tú (o tu equipo) se concentren en el trabajo de verdad." },
    { q: "¿Con qué industrias trabajan?", a: "Principalmente oficios (plomeros, electricistas, constructores), contratistas y pequeñas empresas de servicios con 1-30 personas. Si estás copiando información entre apps o persiguiendo facturas, podemos ayudarte." },
    { q: "Soy un operador individual. ¿vale la pena?", a: "Absolutamente. Ya seas solo o tengas un equipo pequeño, las mayores ganancias vienen de eliminar la administración que consume tu día. Ahorrar 10-15 horas por semana significa más trabajos o recuperar tus noches." },
    { q: "No soy experto en tecnología. ¿podré usar esto?", a: "Sí. Nosotros manejamos toda la configuración técnica. Tu asistente funciona a través de herramientas que ya usas. email, mensajes de texto, tu software contable." },
    { q: "¿Cuánto tiempo toma la configuración?", a: "La configuración es sobre todo ajuste, no código. Empezamos con una llamada para mapear el trabajo, construimos y probamos con tus datos reales, y salimos en vivo cuando lo apruebas." },
    { q: "¿Qué incluye el piloto?", a: "El piloto es una prueba corta de una automatización. La construimos, la ejecutamos con tus datos reales y te mostramos exactamente qué hizo. Solo sigues adelante si se gana su lugar." },
    { q: "¿Mis datos están seguros?", a: "Configuramos controles de acceso y guardamos un registro de lo que hace el asistente. Tus datos no se venden ni se comparten, y son tuyos." },
    { q: "¿Qué pasa si no sé qué flujos de trabajo automatizar?", a: "Para eso es la primera llamada. Revisaremos tu día a día juntos, encontraremos los mayores consumidores de tiempo y recomendaremos por dónde empezar." },
    { q: "¿Cómo obtengo un precio?", a: "Agenda una llamada gratuita y definimos el alcance contigo, luego ponemos por escrito el alcance completo y la cifra antes de empezar. Cada proyecto es distinto, así que no publicamos una lista de tarifas." },
    { q: "¿Necesito conocimiento técnico?", a: "Para nada. Nosotros manejamos toda la configuración. Interactúas con tu asistente a través de herramientas que ya usas." },
    { q: "¿Cómo miden si funciona?", a: "Acordamos qué queremos mover antes de empezar, y el asistente registra lo que hace para que el cambio sea visible. No prometemos ingresos, horas ni posiciones." },
  ],

  // Hero visual demos
  heroVisuals: {
    liveWorkflow: {
      title: "Flujo de Trabajo en Vivo",
      tasks: [
        { label: "Cotización Enviada al Cliente", status: "Completado" },
        { label: "Seguimiento: Remodelación Cocina Smith", status: "Completado" },
        { label: "Factura: Trabajo en 42 Maple Drive", status: "En curso" },
        { label: "Nuevo Prospecto: Remodelación de Baño", status: "En cola" },
        { label: "Resumen Semanal de Flujo de Caja", status: "En cola" },
      ],
    },
    revenueProtection: {
      title: "Protección de Ingresos",
      items: [
        { label: "Seguimiento: Johnson HVAC", due: "Enviado hace 3 días", amount: "$2,800" },
        { label: "Seguimiento: Smith Electric", due: "Enviado hace 2 días", amount: "$6,500" },
        { label: "Factura: Martínez Plomería", due: "Vencida 5 días", amount: "$1,850" },
        { label: "Nueva Cotización: Davis Construcción", due: "Solicitada hoy", amount: "$4,200" },
      ],
    },
    weeklySummary: {
      title: "Resumen Semanal. Generado Automáticamente",
      stats: [
        { label: "Trabajos Facturados", value: "47" },
        { label: "Horas Ahorradas", value: "12.5" },
        { label: "Cotizaciones Seguidas", value: "23" },
        { label: "Ingresos Protegidos", value: "$27K" },
      ],
      riskTitle: "Alerta de Riesgo",
      riskDesc: "2 cotizaciones con más de 7 días sin respuesta",
    },
  },

  // Features section
  features: {
    badge: "Lo Que Hacemos",
    headline: "Te Construimos un Asistente de Operaciones con IA",
    subtext: "Tu asistente maneja el trabajo que repites cada semana para que te enfoques en lo que importa.",
    feature1Title: "Automatización de Tareas",
    feature1Subtitle: "Elimina el trabajo repetitivo",
    feature1Desc: "Mueve datos entre sistemas, envía recordatorios automáticamente, actualiza clientes, rastrea renovaciones y da seguimiento a prospectos. sin esfuerzo manual.",
    feature1Items: ["Sincronización de CRM", "Recordatorios automáticos", "Actualizaciones de clientes", "Rastreo de renovaciones", "Seguimiento de prospectos"],
    feature2Title: "Protección de Ingresos",
    feature2Subtitle: "Asegura que nada se pierda",
    feature2Desc: "Monitorea plazos, activa recordatorios de pago, señala vencidos y mantiene tu pipeline en movimiento para que los ingresos no se escapen.",
    feature2Items: ["Activadores de pago", "Alertas de vencimiento", "Monitoreo de pipeline", "Seguimiento de cotizaciones", "Recordatorios de upsell"],
    feature3Title: "Visibilidad Operacional",
    feature3Subtitle: "Claridad sin reportes manuales",
    feature3Desc: "Genera resúmenes semanales, señala riesgos operacionales, crea dashboards de estado y mantiene a tu equipo informado automáticamente.",
    feature3Items: ["Resúmenes semanales", "Alertas de riesgo", "Dashboards de estado", "Notificaciones al equipo", "Seguimiento de rendimiento"],
  },

  // Pilot section
  pilot: {
    badge: "Inicio Sin Riesgo",
    headline: "Prueba Un Flujo de Trabajo Primero",
    subtext: "¿No estás seguro si la automatización es para ti? Empieza pequeño. Valida con un flujo de trabajo antes de comprometerte.",
    items: ["Piloto corto", "Una automatización", "Reporte claro", "Decide después de validar"],
    disclaimer: "Sin tarjeta de crédito. Sin compromiso.",
    button: "Comienza con un Piloto",
  },




  // Security
  security: {
    badge: "Seguridad",
    headline: "Tus Datos Están Seguros Con Nosotros",
    subtext: "Simple y claro. así es como protegemos tu negocio.",
    items: [
      { title: "Solo Tú Ves Tus Datos", description: "Configuramos permisos para que solo las personas correctas accedan a tu información." },
      { title: "Segura Por Defecto", description: "Usamos conexiones cifradas y proveedores de hosting establecidos." },
      { title: "Transparencia Total", description: "Puedes ver exactamente qué ha hecho tu asistente. cada email enviado, cada factura creada." },
      { title: "Tus Datos Son Tuyos", description: "Nunca vendemos tus datos, los compartimos con nadie, ni los usamos para nada más que ejecutar tus automatizaciones." },
      { title: "Eres Dueño de Todo", description: "Todas tus automatizaciones, configuraciones y datos te pertenecen. Siempre." },
    ],
  },

  // Careers page
  careers: {
    headline: "Construye el Futuro de la Automatización Empresarial",
    subtext:
      "Somos un equipo pequeño con grandes ambiciones. Si eres talentoso, ingenioso y quieres trabajar en problemas que importan. nos encantaría saber de ti.",

    valuesTitle: "Nuestros Valores",
    value1Title: "Muévete Rápido, Lanza Seguido",
    value1Desc:
      "Creemos en la iteración sobre la perfección. Ponlo en línea, obtén feedback, mejora.",
    value2Title: "Sé Dueño de Tu Trabajo",
    value2Desc:
      "Sin micromanagement. Tendrás propiedad real sobre productos reales que usan negocios reales.",
    value3Title: "Piensa Como Fundador",
    value3Desc:
      "Queremos personas que vean el panorama completo. no solo su lista de tareas.",
    value4Title: "Remoto Primero",
    value4Desc:
      "Trabaja desde cualquier lugar. Nos importan los resultados, no las horas.",

    openingsTitle: "Posiciones Abiertas",
    noOpenings:
      "No tenemos vacantes específicas en este momento, pero siempre nos interesa escuchar de personas excepcionales.",
    sendCv: "Envíanos Tu CV",

    ctaHeadline: "¿Conoces a alguien que sería ideal?",
    ctaSubtext: "Comparte esta página con ellos.",
  },
};
