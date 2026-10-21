"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { MediaPlayer } from "./media-player";
import { BookLink, Closing } from "./primitives";
export function DemoLibrary() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <p className="fa-eyebrow">
          {text(locale, c("Recorded demonstrations", "Demostraciones grabadas"))}
        </p>
        <h1>
          {text(
            locale,
            c("Hear the need.\nSee the next step.", "Escucha la necesidad.\nVe el siguiente paso."),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Start with a complete, privacy-edited dental booking conversation. Every example is a demonstration, not evidence of a paying customer or a promised outcome for your business.",
              "Empieza con una conversación dental completa y editada por privacidad. Cada ejemplo es una demostración, no prueba de clientes de pago ni un resultado prometido.",
            ),
          )}
        </p>
        <p className="fa-small">
          {text(
            locale,
            c(
              "No form required. Watching is optional before booking.",
              "Sin formulario. No necesitas ver el vídeo para reservar.",
            ),
          )}
        </p>
      </section>
      <section className="fa-container fa-section" id="routine">
        <MediaPlayer film="routine" compact priority />
        <div className="fa-focus-heading mt-8">
          <div>
            <h2>
              {text(
                locale,
                c(
                  "A new-patient enquiry.\nA calendar booking.",
                  "Una consulta de paciente.\nUna reserva en agenda.",
                ),
              )}
            </h2>
          </div>
          <p>
            {text(
              locale,
              c(
                "Listen for the caller’s request, the agent’s clarification, available times and the selected booking in Google Calendar. Privacy beeps and edited labels are disclosed. This does not prove compatibility with your scheduling system.",
                "Escucha la solicitud, aclaración, horarios y reserva en Google Calendar. Incluye pitidos y etiquetas editadas. No demuestra compatibilidad con tu agenda.",
              ),
            )}
          </p>
        </div>
        <BookLink service="phone-agent" />
      </section>
      <section className="fa-services-band">
        <div className="fa-container fa-section">
          <h2>
            {text(
              locale,
              c("Choose the context that matters to you.", "Elige el contexto que te importa."),
            )}
          </h2>
          <p className="fa-lead mt-6 mb-8">
            {text(
              locale,
              c(
                "Additional recordings are being reviewed for public use and privacy. We do not present unreviewed material or imply a workflow has been verified for your business.",
                "Otras grabaciones están en revisión de privacidad y uso público. No presentamos material sin revisar ni damos por verificado tu proceso.",
              ),
            )}
          </p>
          <div className="fa-sector-grid">
            {[
              {
                title: c(
                  "Home services: roof-leak enquiry",
                  "Servicios para el hogar: consulta por gotera",
                ),
                body: c(
                  "Review in progress. The recording needs privacy edits and a verified transcript before public release.",
                  "En revisión. La grabación necesita ediciones de privacidad y una transcripción verificada antes de publicarse.",
                ),
                href: "/industries/home-services",
              },
              {
                title: c(
                  "Home services: live walkthrough",
                  "Servicios para el hogar: demostración en vivo",
                ),
                body: c(
                  "Review in progress. The complete call and visible calendar details need public-use clearance.",
                  "En revisión. La llamada completa y los datos visibles de la agenda necesitan autorización de uso público.",
                ),
                href: "/industries/home-services",
              },
              {
                title: c(
                  "IT & hosting: enquiry and callback",
                  "Informática y alojamiento: consulta y devolución de llamada",
                ),
                body: c(
                  "Review in progress. Caller details, editorial claims and the demonstrated next step need verification.",
                  "En revisión. Hay que verificar los datos de quien llama, las afirmaciones editoriales y el siguiente paso demostrado.",
                ),
                href: "/industries/it-services",
              },
              {
                title: c("Dental: urgent appointment enquiry", "Dental: consulta por cita urgente"),
                body: c(
                  "The scope includes clinical and privacy considerations. This example is not evidence of validated triage or an emergency transfer.",
                  "El alcance incluye consideraciones clínicas y de privacidad. Este ejemplo no acredita un triaje validado ni una transferencia de emergencia.",
                ),
                href: "/industries/dental",
              },
            ].map(({ title, body, href }) => (
              <article className="fa-call-proof" key={href + title.en}>
                <h3 className="mb-4 text-2xl">{text(locale, title)}</h3>
                <p className="mb-6">{text(locale, body)}</p>
                <Link className="fa-text-link" href={href}>
                  {text(locale, c("Explore the workflow", "Explorar el proceso"))} ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Closing service="phone-agent" />
    </>
  );
}
