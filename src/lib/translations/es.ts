import type { Translations } from "./en";

export const es: Translations = {
  // Nav
  nav: {
    webDesign: "Diseño Web",
    solutions: "Soluciones",
    howItWorks: "Cómo Funciona",
    pricing: "Precios",
    calculator: "Calculadora",
    about: "Nosotros",
    bookCall: "Agenda una Llamada",
    careers: "Empleo",
  },

  // Home — Hero
  hero: {
    headline: "Tu Papeleo, Hecho Automáticamente",
    subtext:
      "FlowAudit se encarga del trabajo administrativo que odias — presupuestos, seguimientos, facturación — para que tu equipo se enfoque en lo que genera dinero.",
    ctaPrimary: "Calcula Tu Ahorro de Tiempo",
    ctaSecondary: "Mira Cómo Funciona",
    ctaNote: "Llamada de estrategia gratuita — sin compromiso, sin presión.",
  },

  // Home — Hero tabs
  heroTabs: {
    tab1Title: "Seguimiento de Cotización",
    tab1Desc:
      "Seguimiento automático de cada cotización que envías — no más negocios perdidos.",
    tab2Title: "Trabajo Terminado → Factura",
    tab2Desc:
      "Terminas un trabajo, la factura se envía sola. No más perseguir pagos semanas después.",
    tab3Title: "Resumen Semanal de Flujo de Caja",
    tab3Desc:
      "Ve qué está entrando, qué está vencido y qué necesita seguimiento — cada lunes por la mañana.",
  },

  // Home — Bento / Who This Is For
  bento: {
    badge: "Para Quién Es",
    headline: "Si Repites el Mismo Trabajo Cada Semana — Esto Es Para Ti",
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
      { label: "Cotizaciones y estimaciones", hours: "6 hrs/semana" },
      { label: "Facturación y cobros", hours: "5 hrs/semana" },
      { label: "Agenda y coordinación", hours: "4 hrs/semana" },
      { label: "Seguimiento a clientes", hours: "3 hrs/semana" },
    ],
    impactTitle: "El Impacto",
    impactSubtext: "Los equipos usando FlowAudit ven resultados en la primera semana.",
    impactHours: "20+",
    impactHoursLabel: "horas ahorradas por semana, en promedio",
    impactDays: "10 días",
    impactDaysLabel: "para estar en línea",
    impactRoi: "5x",
    impactRoiLabel: "ROI típico",
  },

  // Pricing
  pricing: {
    badge: "Precios",
    headline: "Precios Simples de Implementación",
    subtext: "Pago único de configuración. Sin suscripciones mensuales. Sin cargos sorpresa.",
    guarantee:
      "Garantía de satisfacción 100%. Paga una vez, es tuyo para siempre. Paquetes de soporte opcionales disponibles.",
    notSure: "¿No estás seguro cuál paquete? Comienza con una llamada de estrategia gratuita →",
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
      "Agenda una llamada de estrategia gratuita. Te mostraremos exactamente qué partes de tu semana se pueden automatizar — y cuánto vas a ahorrar.",
    button: "Agenda una Llamada de Estrategia Gratuita",
    note: "Llamada de 30 minutos. Sin compromiso. Sin tecnicismos.",
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
    headline: "Agenda una Llamada de Estrategia Gratuita",
    subtext:
      "Descubre cómo la automatización puede manejar tu administración. 30 minutos. Sin tecnicismos. Sin presión.",
    scheduleTitle: "Agenda Tu Llamada de Estrategia Gratuita",
    scheduleSubtext:
      "Envíanos un email a hello@flowaudit.co y encontraremos un horario que te funcione. O llámanos directamente.",
    emailButton: "Envíanos un Email",
    responseNote: "Respondemos todas las consultas dentro de 24 horas.",
    expectTitle: "Qué Esperar",
    step1Title: "Conversación Rápida Sobre Tu Negocio",
    step1Desc:
      "Te preguntaremos sobre tu semana típica — qué te consume tiempo, qué se te escapa.",
    step2Title: "Identificar las Oportunidades Rápidas",
    step2Desc:
      "Encontraremos 2-3 cosas que se pueden automatizar de inmediato — generalmente cotizaciones, facturación o seguimientos.",
    step3Title: "Obtener un Plan Claro",
    step3Desc:
      "Recibirás una propuesta en lenguaje simple mostrando qué construiremos, cuánto cuesta y cuánto tiempo vas a ahorrar.",
  },

  // Web Design page
  webDesign: {
    heroHeadline: "Sitios Web Personalizados y Herramientas con IA Para Tu Negocio",
    heroSubtext:
      "Diseñamos, construimos y mantenemos tu presencia online completa — sitio web, chatbot con IA, sistema de reservas, facturación — todo lo que tu negocio necesita para verse profesional y capturar cada cliente potencial.",
    heroCta: "Agenda una Llamada Gratuita",
    heroCtaSecondary: "Ver Nuestros Productos",
    heroNote: "Sin plantillas. Cada sitio es único para tu negocio.",

    howItWorksTitle: "Cómo Funciona",
    step1Title: "Investigamos Tu Negocio",
    step1Desc:
      "Estudiamos tu industria, competidores y clientes para entender qué necesita lograr tu sitio web.",
    step2Title: "Construimos Tu Sitio",
    step2Desc:
      "Nuestro equipo diseña y construye un sitio web personalizado para tu negocio — antes de que pagues nada.",
    step3Title: "Tú Revisas y Apruebas",
    step3Desc:
      "Ve tu sitio demo en vivo. Solicita cambios. Solo paga cuando estés completamente satisfecho.",
    step4Title: "Nosotros Nos Encargamos de Todo",
    step4Desc:
      "Hosting, actualizaciones, seguridad, soporte — todo incluido. Tú enfócate en tu negocio.",

    productsTitle: "Todo Lo Que Tu Negocio Necesita Online",
    productsSubtext:
      "Empieza con un sitio web. Agrega herramientas a medida que tu negocio crece. Cancela en cualquier momento después de tu plazo de 12 meses.",
    everythingLabel: "Todo Incluido",
    everythingPrice: "£712/mes",
    everythingDesc: "Los 8 productos incluidos",
    priceNote:
      "Contratos de 12 meses. 15% de descuento por lealtad en la renovación. Todos los precios excluyen IVA.",

    product1: "Sitio Web Personalizado",
    product1Price: "£149/mes",
    product1Desc:
      "Diseño único, optimizado para móviles, acceso CMS, hosting y SSL incluidos.",
    product2: "Chatbot con IA",
    product2Price: "£129/mes",
    product2Desc:
      "Asistente de IA 24/7 entrenado en tu negocio. Captura clientes mientras duermes.",
    product3: "IA Fuera de Horario",
    product3Price: "£99/mes",
    product3Desc:
      "Maneja llamadas y mensajes fuera de tu horario laboral. Nunca pierdas un cliente potencial.",
    product4: "Respuesta Automática a Llamadas Perdidas",
    product4Price: "£89/mes",
    product4Desc:
      "Envía un mensaje automático a los clientes en segundos cuando pierdes su llamada.",
    product5: "Sistema de Reservas",
    product5Price: "£79/mes",
    product5Desc:
      "Deja que los clientes reserven citas online. Envía recordatorios automáticamente.",
    product6: "Facturación Automatizada",
    product6Price: "£69/mes",
    product6Desc:
      "Envía facturas profesionales por mensaje. Rastrea pagos. Cobra vencidos automáticamente.",
    product7: "Sistema de Solicitud de Cotización",
    product7Price: "£49/mes",
    product7Desc:
      "Captura solicitudes de cotización desde tu sitio web. Recibe notificaciones al instante.",
    product8: "Recolector de Testimonios",
    product8Price: "£49/mes",
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
      "Sí, ofrecemos opciones de compra única. Agenda una llamada para discutir precios.",
    faq3Q: "¿Cuánto tiempo toma construir mi sitio web?",
    faq3A:
      "La mayoría de los sitios web están listos en 5-10 días hábiles. Las herramientas adicionales se configuran dentro de 48 horas después de que tu sitio esté en línea.",
    faq4Q: "¿Necesito proporcionar contenido?",
    faq4A:
      "Nosotros nos encargamos de todo — textos, imágenes, diseño. Solo necesitamos los detalles de tu negocio y hacemos el resto.",
    faq5Q: "¿Puedo hacer cambios en mi sitio web?",
    faq5A:
      "Sí, tienes acceso CMS para actualizar texto, imágenes y contenido básico en cualquier momento. Para cambios de diseño, nuestro equipo se encarga.",
    faq6Q: "¿Qué pasa si solo quiero un sitio web sin los complementos?",
    faq6A:
      "Por supuesto. El sitio web a £149/mes es un producto independiente. Agrega herramientas cuando estés listo.",

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
    headline: "De Manual a Automatizado en 10 Días",
    subtext: "Nosotros hacemos el trabajo pesado — tú solo asistes a una llamada de 30 minutos.",
    step1: "Llamada de Flujo de Trabajo de 30 Minutos",
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
  },

  // Testimonials
  testimonials: {
    badge: "Resultados",
    headline: "Lo Que Dicen Los Operadores",
  },

  // Security
  security: {
    badge: "Seguridad",
    headline: "Tus Datos Están Seguros Con Nosotros",
    subtext: "Simple y claro — así es como protegemos tu negocio.",
  },

  // Careers page
  careers: {
    headline: "Construye el Futuro de la Automatización Empresarial",
    subtext:
      "Somos un equipo pequeño con grandes ambiciones. Si eres talentoso, ingenioso y quieres trabajar en problemas que importan — nos encantaría saber de ti.",

    valuesTitle: "Nuestros Valores",
    value1Title: "Muévete Rápido, Lanza Seguido",
    value1Desc:
      "Creemos en la iteración sobre la perfección. Ponlo en línea, obtén feedback, mejora.",
    value2Title: "Sé Dueño de Tu Trabajo",
    value2Desc:
      "Sin micromanagement. Tendrás propiedad real sobre productos reales que usan negocios reales.",
    value3Title: "Piensa Como Fundador",
    value3Desc:
      "Queremos personas que vean el panorama completo — no solo su lista de tareas.",
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
