"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { Arrow } from "./primitives";
export function EvidenceArt() {
  const { locale } = useLocale();
  return (
    <Link
      href="/phone-agent#demo"
      className="fa-evidence-art"
      aria-label={text(
        locale,
        c(
          "Watch the recorded dental booking demonstration",
          "Ver la demostración grabada de reserva dental",
        ),
      )}
    >
      <div className="fa-art-heading">
        <span className="fa-eyebrow">
          {text(locale, c("A working example", "Un ejemplo en funcionamiento"))}
        </span>
        <span>01 / 04</span>
      </div>
      <div className="fa-art-grid">
        <div className="fa-art-path">
          <span className="fa-art-line" aria-hidden="true" />
          {[
            c("Enquiry", "Consulta"),
            c("Availability", "Disponibilidad"),
            c("Confirmation", "Confirmación"),
          ].map((x, i) => (
            <div key={i}>
              <span className="fa-art-dot" aria-hidden="true" />
              <span className="fa-art-number">0{i + 1}</span>
              <p>{text(locale, x)}</p>
            </div>
          ))}
          <p className="fa-art-footnote">
            Google Calendar
            <br />
            {text(locale, c("Recorded example", "Ejemplo grabado"))}
          </p>
        </div>
        <div className="fa-art-screen">
          <Image
            src="/media/routine.jpg"
            alt={text(
              locale,
              c(
                "Recorded phone conversation with its Google Calendar booking example",
                "Conversación grabada con su ejemplo de reserva en Google Calendar",
              ),
            )}
            width={1080}
            height={1920}
            priority
            sizes="(max-width: 600px) 210px, 260px"
          />
          <div className="fa-art-play">
            <span aria-hidden="true">▶</span>
            <span>1:31</span>
          </div>
        </div>
      </div>
      <div className="fa-art-bottom">
        <span>
          {text(
            locale,
            c("Hear the call. See the next step.", "Escucha la llamada. Ve el siguiente paso."),
          )}
        </span>
        <Arrow diagonal />
      </div>
    </Link>
  );
}
