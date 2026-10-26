/** Source of truth for review-build media, evidence scope and stable identities.
 * Displayed names are source-derived; smart-street remains a compatibility key.
 * review-build is availability locally, not owner acceptance or live publication. */
export type DemoId = "routine" | "urgent" | "roof-leak" | "smart-street" | "agile-tech";
type Copy = { en: string; es: string };
export interface DemoRecord {
  id: DemoId;
  title: Copy;
  industry: "dental" | "home-services" | "it-services";
  status: "review-build";
  service: "phone-agent";
  durationSeconds: number;
  language: "en";
  src: string;
  poster: string;
  captions: string;
  transcript: string;
  captionsBurnedIn: true;
  legacyPath: string;
  outcome: Copy;
  limitations: Copy;
  privacy: Copy;
  created: string;
}
const shared = {
  status: "review-build",
  service: "phone-agent",
  language: "en",
  captionsBurnedIn: true,
  created: "2026-10-23T00:00:00Z",
  privacy: {
    en: "Original screen recording and dialogue. Personal details are obscured visually and muted in the audio; call timing is retained. English captions are on screen.",
    es: "Grabación y diálogo originales. Los datos personales se ocultan y silencian; se conserva el tiempo de la llamada. Subtítulos visibles en inglés.",
  },
} as const;
function record(
  data: Omit<DemoRecord, keyof typeof shared | "src" | "poster" | "captions" | "transcript">,
): DemoRecord {
  const base = `/media/demos/${data.id}`;
  return {
    ...shared,
    ...data,
    src: `${base}.mp4`,
    poster: `${base}-poster.jpg`,
    captions: `${base}.vtt`,
    transcript: `${base}-transcript.txt`,
  };
}
export const demos: readonly DemoRecord[] = [
  record({
    id: "routine",
    title: { en: "Routine dental booking", es: "Reserva dental habitual" },
    industry: "dental",
    durationSeconds: 85.901678,
    legacyPath: "/demo/showcase/dental/checkup",
    outcome: {
      en: "A new-patient enquiry, appointment choices and an original Google Calendar event for the selected time.",
      es: "Consulta de paciente nuevo, opciones de cita y evento original en Google Calendar para el horario elegido.",
    },
    limitations: {
      en: "A demonstration booking, not attendance or a customer result. Your scheduling rules and access still need assessment and testing.",
      es: "Reserva de demostración, no asistencia ni resultado de cliente. Tu agenda, reglas y acceso requieren evaluación y pruebas.",
    },
  }),
  record({
    id: "urgent",
    title: { en: "Urgent dental enquiry", es: "Consulta dental urgente" },
    industry: "dental",
    durationSeconds: 155.009433,
    legacyPath: "/demo/showcase/dental/urgent",
    outcome: {
      en: "The caller accepts an urgent assessment time after an emergency surcharge is disclosed. A demo calendar event is shown; both surcharge passages remain.",
      es: "El cliente acepta una evaluación urgente tras indicarse un recargo. Se muestra un evento de demostración; se conservan ambos avisos del recargo.",
    },
    limitations: {
      en: "The recording does not establish clinical triage, emergency transfer or a clinical outcome. The surcharge belongs to this scenario, not FlowAudit agency pricing.",
      es: "No acredita triaje clínico, traslado de emergencia ni resultado clínico. El recargo pertenece al escenario; no es una tarifa de la agencia.",
    },
  }),
  record({
    id: "roof-leak",
    title: { en: "Roof-leak enquiry", es: "Consulta por gotera" },
    industry: "home-services",
    durationSeconds: 152.5,
    legacyPath: "/demo/showcase/trades",
    outcome: {
      en: "The agent clarifies a roof leak, collects details and agrees an inspection. The original calendar event is visible.",
      es: "El agente aclara una gotera, recoge datos y acuerda una inspección. Se ve el evento original de la agenda.",
    },
    limitations: {
      en: "Source defect retained: speech and appointment detail say inspection; the calendar title says repair. The visible GMT+01 calendar and US property context do not establish a correct local appointment time. Configuration must be corrected and retested before rollout.",
      es: "Defecto conservado: diálogo y detalle indican inspección; el título dice reparación. Agenda GMT+01 y propiedad en EE. UU. no acreditan un horario local correcto. Hay que corregir y probar la configuración antes de activar.",
    },
  }),
  record({
    id: "smart-street",
    title: { en: "Street Smart walkthrough", es: "Demostración de Street Smart" },
    industry: "home-services",
    durationSeconds: 229.1,
    legacyPath: "/demo/showcase/walkthrough",
    outcome: {
      en: "Cleaning and painting requirements lead to two displayed demo confirmations, at 09:00 and 13:00, with calendar-added indicators.",
      es: "Los requisitos de limpieza y pintura llevan a dos confirmaciones de demostración, a las 09:00 y 13:00, con indicadores de incorporación a la agenda.",
    },
    limitations: {
      en: "The source UI reports confirmations; service attendance is not shown. The four-hour interval runs from the start of cleaning. The location display is hidden for privacy; this is not a live video-agent product demonstration.",
      es: "La interfaz indica confirmaciones; no se muestra asistencia. El intervalo de cuatro horas comienza al iniciar la limpieza. Se oculta la ubicación por privacidad; no es una demostración del agente de vídeo.",
    },
  }),
  record({
    id: "agile-tech",
    title: { en: "Agile Tech website enquiry", es: "Consulta web de Agile Tech" },
    industry: "it-services",
    durationSeconds: 209.855873,
    legacyPath: "/demo/showcase/agile-tech",
    outcome: {
      en: "Website requirements are captured and a callback time is selected. The original partial-intake and offered-time states remain visible.",
      es: "Se recogen requisitos de una web y se elige una hora de devolución de llamada. Se conservan los estados originales de recepción parcial y horarios ofrecidos.",
    },
    limitations: {
      en: "Completed booking, ticket creation and team delivery are not shown. The source says intake partial, verification not attempted, support ticket not created and team delivery not sent. A continuation through confirmation and a verified backend record is needed to prove delivery.",
      es: "No se muestra reserva completada, ticket creado ni entrega al equipo. El origen indica recepción parcial, verificación no intentada, ticket no creado y entrega no enviada. Se necesita la continuación y un registro verificado para acreditar la entrega.",
    },
  }),
];
export function demoId(value: unknown): DemoId | undefined {
  return demos.find((d) => d.id === value)?.id;
}
export function getDemo(id: DemoId): DemoRecord {
  return demos.find((d) => d.id === id)!;
}
export function demoVideoObject(id: DemoId) {
  const d = getDemo(id);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: d.title.en,
    description: `${d.outcome.en} ${d.limitations.en}`,
    thumbnailUrl: `https://flowaudit.co.uk${d.poster}`,
    contentUrl: `https://flowaudit.co.uk${d.src}`,
    uploadDate: d.created,
    duration: `PT${d.durationSeconds.toFixed(3)}S`,
    inLanguage: d.language,
  };
}
