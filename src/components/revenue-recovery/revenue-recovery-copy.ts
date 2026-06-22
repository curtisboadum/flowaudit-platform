/**
 * @file revenue-recovery-copy.ts
 * @description Self-contained bilingual copy for the /revenue-recovery landing
 *   page. Kept local (not in the global Translations type) so adding this page
 *   never risks en/es structural drift across the rest of the site.
 * @status Stable.
 * @issues None.
 * @todo None.
 */
import type { Locale } from "@/lib/i18n";

interface Stat {
  value: string;
  label: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface AudienceCard {
  title: string;
  description: string;
}

interface QA {
  q: string;
  a: string;
}

export interface RevenueRecoveryCopy {
  badge: string;
  headlineTop: string;
  headlineAccent: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Stat[];
  problem: {
    eyebrow: string;
    headline: string;
    intro: string;
    bullets: string[];
    calloutValue: string;
    calloutLabel: string;
    closing: string;
  };
  steps: {
    eyebrow: string;
    headline: string;
    subtext: string;
    items: Step[];
  };
  audience: {
    eyebrow: string;
    headline: string;
    subtext: string;
    cards: AudienceCard[];
  };
  alignment: {
    eyebrow: string;
    headline: string;
    subtext: string;
    points: { title: string; description: string }[];
    contrast: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    headline: string;
    items: QA[];
  };
  finalCta: {
    headline: string;
    subtext: string;
    button: string;
    note: string;
  };
}

const en: RevenueRecoveryCopy = {
  badge: "AI-Powered Revenue Recovery",
  headlineTop: "Your clients owe you.",
  headlineAccent: "We collect — without you lifting a finger.",
  subtext:
    "We install a Revenue Recovery Desk inside your business. It finds overdue invoices, follows up automatically, escalates disputes, and sends you a weekly cash-recovered report. No collections-agency aggression. No new hires.",
  ctaPrimary: "Book Your Free Revenue Audit",
  ctaSecondary: "See how it works",
  stats: [
    { value: "30–90 days", label: "Full AR clean-up timeline" },
    { value: "Zero", label: "Additional headcount required" },
    { value: "100%", label: "Human-reviewed before it sends" },
  ],
  problem: {
    eyebrow: "The Problem",
    headline: "You're leaving money on the table. Every week.",
    intro:
      "Unpaid invoices pile up. Your team is too busy doing the actual work to chase payments. You can't justify hiring admin just to send follow-up emails. And a collections agency is too aggressive — it burns relationships you spent years building.",
    bullets: [
      "Your cash flow is strained by money you've already earned",
      "Your team hates sending awkward follow-up emails",
      "Collections agencies damage relationships and charge 25–50%",
      "Every week an invoice ages, the odds of collection drop",
    ],
    calloutValue: "60 → 90 days",
    calloutLabel: "the window where recovery odds fall sharply",
    closing: "There's a better way. We're it.",
  },
  steps: {
    eyebrow: "How It Works",
    headline: "Four steps to cash in the bank",
    subtext:
      "Done-for-you. AI-assisted. Human-reviewed before anything goes out under your name.",
    items: [
      {
        number: "01",
        title: "Audit",
        description:
          "We review all your overdue invoices and build a custom recovery roadmap.",
      },
      {
        number: "02",
        title: "Follow-Up",
        description:
          "AI sends polite, professional reminders on your behalf — nothing without your approval.",
      },
      {
        number: "03",
        title: "Escalate",
        description:
          "Disputes and non-responses are flagged for human review, handled carefully.",
      },
      {
        number: "04",
        title: "Report",
        description:
          "You get a weekly cash-recovered summary. No chasing. No surprises.",
      },
    ],
  },
  audience: {
    eyebrow: "Who It's For",
    headline: "Built for B2B service businesses",
    subtext:
      "Niches where late payments hurt cash flow most — and where preserving the relationship matters.",
    cards: [
      {
        title: "Staffing Agencies",
        description:
          "Payroll doesn't wait. Your clients pay net-60. We close the gap without you chasing.",
      },
      {
        title: "Cleaning Companies",
        description:
          "Recurring contracts, recurring late payers. Your team cleans — we collect.",
      },
      {
        title: "MSPs & IT Firms",
        description:
          "Monthly retainers, aging invoices. We work with your existing PSA and CRM.",
      },
      {
        title: "Security Companies",
        description:
          "Admin-heavy, messy payment cycles. Professional follow-up without the awkwardness.",
      },
      {
        title: "Logistics Firms",
        description:
          "Invoice chaos you don't have time to fix. Recover what's already owed.",
      },
      {
        title: "Maintenance Companies",
        description:
          "Old unpaid balances piling up. Systematic recovery, relationship intact.",
      },
    ],
  },
  alignment: {
    eyebrow: "Pricing",
    headline: "Simple. Aligned. No surprises.",
    subtext:
      "You pay for the service. We earn when you get paid. That's the only incentive structure that works.",
    points: [
      {
        title: "Aligned success fee",
        description:
          "We're rewarded when cash actually hits your account — not before.",
      },
      {
        title: "A fraction of an agency",
        description:
          "Traditional collections agencies charge 25–50% of what they recover. We don't.",
      },
      {
        title: "No threatening letters",
        description:
          "Every message is professional and on-brand. Your relationships stay intact.",
      },
    ],
    contrast:
      "Collections agencies charge 25–50% and damage the relationship. We keep your clients — and your reputation.",
    cta: "Book Your Free Revenue Audit",
  },
  faq: {
    eyebrow: "FAQ",
    headline: "Questions before you book",
    items: [
      {
        q: "How is this different from a collections agency?",
        a: "Agencies are adversarial — they escalate fast, charge 25–50%, and burn the relationship. We follow up the way you would: polite, professional, on-brand. Everything is human-reviewed before it sends.",
      },
      {
        q: "What if a client gets upset at the follow-up?",
        a: "They won't. Reminders are courteous and sent in your voice. Anything sensitive — a dispute or a non-response — is flagged for a human to handle carefully, not auto-escalated.",
      },
      {
        q: "How quickly will I see results?",
        a: "Most businesses see recovered cash within the first few weeks, with a full AR clean-up over 30–90 days depending on how aged the invoices are.",
      },
      {
        q: "What software or tools do I need?",
        a: "None new. We work with your existing accounting, CRM, and PSA tools. We set up the desk around what you already use.",
      },
      {
        q: "What does it cost?",
        a: "We scope it to your situation on a free call. The model is aligned: we earn when you get paid — a fraction of what a collections agency would take. No threatening letters, no relationship damage.",
      },
    ],
  },
  finalCta: {
    headline: "Let's recover what's yours.",
    subtext:
      "Book a free 30-minute Revenue Recovery Audit. No commitment, no contract — just a clear picture of exactly what's recoverable.",
    button: "Book My Free Revenue Audit",
    note: "30-minute call. We'll show you exactly what's recoverable.",
  },
};

const es: RevenueRecoveryCopy = {
  badge: "Recuperación de Ingresos con IA",
  headlineTop: "Tus clientes te deben.",
  headlineAccent: "Nosotros cobramos — sin que muevas un dedo.",
  subtext:
    "Instalamos una Mesa de Recuperación de Ingresos dentro de tu negocio. Encuentra facturas vencidas, hace seguimiento automático, escala disputas y te envía un reporte semanal de lo recuperado. Sin la agresividad de una agencia de cobranza. Sin nuevas contrataciones.",
  ctaPrimary: "Agenda tu Auditoría Gratuita",
  ctaSecondary: "Cómo funciona",
  stats: [
    { value: "30–90 días", label: "Para limpiar toda tu cartera vencida" },
    { value: "Cero", label: "Personal adicional necesario" },
    { value: "100%", label: "Revisado por humanos antes de enviarse" },
  ],
  problem: {
    eyebrow: "El Problema",
    headline: "Estás dejando dinero sobre la mesa. Cada semana.",
    intro:
      "Las facturas sin pagar se acumulan. Tu equipo está demasiado ocupado con el trabajo real como para perseguir pagos. No puedes justificar contratar a alguien solo para enviar correos de seguimiento. Y una agencia de cobranza es demasiado agresiva — quema relaciones que tardaste años en construir.",
    bullets: [
      "Tu flujo de caja sufre por dinero que ya ganaste",
      "Tu equipo odia enviar correos de seguimiento incómodos",
      "Las agencias dañan relaciones y cobran 25–50%",
      "Cada semana que envejece una factura, baja la probabilidad de cobro",
    ],
    calloutValue: "60 → 90 días",
    calloutLabel: "la ventana donde la probabilidad de cobro cae en picado",
    closing: "Hay una mejor manera. Somos nosotros.",
  },
  steps: {
    eyebrow: "Cómo Funciona",
    headline: "Cuatro pasos al dinero en el banco",
    subtext:
      "Hecho por nosotros. Asistido por IA. Revisado por humanos antes de salir a tu nombre.",
    items: [
      {
        number: "01",
        title: "Auditoría",
        description:
          "Revisamos todas tus facturas vencidas y construimos una hoja de ruta de recuperación a medida.",
      },
      {
        number: "02",
        title: "Seguimiento",
        description:
          "La IA envía recordatorios amables y profesionales en tu nombre — nada sin tu aprobación.",
      },
      {
        number: "03",
        title: "Escalamiento",
        description:
          "Las disputas y la falta de respuesta se marcan para revisión humana, gestionadas con cuidado.",
      },
      {
        number: "04",
        title: "Reporte",
        description:
          "Recibes un resumen semanal de lo recuperado. Sin perseguir. Sin sorpresas.",
      },
    ],
  },
  audience: {
    eyebrow: "Para Quién Es",
    headline: "Diseñado para negocios de servicios B2B",
    subtext:
      "Sectores donde los pagos tardíos más golpean el flujo de caja — y donde preservar la relación importa.",
    cards: [
      {
        title: "Agencias de Personal",
        description:
          "La nómina no espera. Tus clientes pagan a 60 días. Cerramos la brecha sin que persigas a nadie.",
      },
      {
        title: "Empresas de Limpieza",
        description:
          "Contratos recurrentes, morosos recurrentes. Tu equipo limpia — nosotros cobramos.",
      },
      {
        title: "MSP y Empresas de TI",
        description:
          "Retainers mensuales, facturas que envejecen. Trabajamos con tu PSA y CRM actuales.",
      },
      {
        title: "Empresas de Seguridad",
        description:
          "Ciclos de pago caóticos y cargados de administración. Seguimiento profesional sin lo incómodo.",
      },
      {
        title: "Empresas de Logística",
        description:
          "Caos de facturación que no tienes tiempo de arreglar. Recupera lo que ya te deben.",
      },
      {
        title: "Empresas de Mantenimiento",
        description:
          "Saldos antiguos sin pagar acumulándose. Recuperación sistemática, relación intacta.",
      },
    ],
  },
  alignment: {
    eyebrow: "Precios",
    headline: "Simple. Alineado. Sin sorpresas.",
    subtext:
      "Pagas por el servicio. Ganamos cuando te pagan. Es la única estructura de incentivos que funciona.",
    points: [
      {
        title: "Comisión de éxito alineada",
        description:
          "Nos pagan cuando el dinero realmente llega a tu cuenta — no antes.",
      },
      {
        title: "Una fracción de una agencia",
        description:
          "Las agencias de cobranza tradicionales cobran 25–50% de lo que recuperan. Nosotros no.",
      },
      {
        title: "Sin cartas amenazantes",
        description:
          "Cada mensaje es profesional y acorde a tu marca. Tus relaciones quedan intactas.",
      },
    ],
    contrast:
      "Las agencias cobran 25–50% y dañan la relación. Nosotros conservamos a tus clientes — y tu reputación.",
    cta: "Agenda tu Auditoría Gratuita",
  },
  faq: {
    eyebrow: "Preguntas Frecuentes",
    headline: "Preguntas antes de agendar",
    items: [
      {
        q: "¿En qué se diferencia de una agencia de cobranza?",
        a: "Las agencias son adversariales — escalan rápido, cobran 25–50% y queman la relación. Nosotros hacemos seguimiento como lo harías tú: amable, profesional, acorde a tu marca. Todo se revisa por un humano antes de enviarse.",
      },
      {
        q: "¿Y si un cliente se molesta por el seguimiento?",
        a: "No lo hará. Los recordatorios son corteses y enviados con tu voz. Cualquier cosa delicada — una disputa o falta de respuesta — se marca para que un humano la gestione con cuidado, no se auto-escala.",
      },
      {
        q: "¿Qué tan rápido veré resultados?",
        a: "La mayoría de los negocios ve dinero recuperado en las primeras semanas, con una limpieza completa de cartera en 30–90 días según la antigüedad de las facturas.",
      },
      {
        q: "¿Qué software o herramientas necesito?",
        a: "Ninguna nueva. Trabajamos con tu contabilidad, CRM y PSA actuales. Montamos la mesa alrededor de lo que ya usas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Lo definimos para tu caso en una llamada gratuita. El modelo está alineado: ganamos cuando te pagan — una fracción de lo que tomaría una agencia de cobranza. Sin cartas amenazantes, sin dañar relaciones.",
      },
    ],
  },
  finalCta: {
    headline: "Recuperemos lo que es tuyo.",
    subtext:
      "Agenda una Auditoría de Recuperación de Ingresos gratuita de 30 minutos. Sin compromiso, sin contrato — solo una imagen clara de exactamente qué es recuperable.",
    button: "Agenda mi Auditoría Gratuita",
    note: "Llamada de 30 minutos. Te mostramos exactamente qué es recuperable.",
  },
};

const COPY: Record<Locale, RevenueRecoveryCopy> = { en, es };

export function getRevenueRecoveryCopy(locale: Locale): RevenueRecoveryCopy {
  return COPY[locale] ?? COPY.en;
}
