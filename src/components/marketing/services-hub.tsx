"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text, offers } from "@/lib/marketing-copy";
import { Arrow, Closing, Eyebrow } from "./primitives";
export function ServicesHub() {
  const { locale } = useLocale();
  return (
    <>
      <section className="fa-container fa-page-intro">
        <Eyebrow>{text(locale, c("Services", "Servicios"))}</Eyebrow>
        <h1>
          {text(
            locale,
            c(
              "Start with the work\nthat needs to change.",
              "Empieza por el trabajo\nque necesita cambiar.",
            ),
          )}
        </h1>
        <p className="fa-lead">
          {text(
            locale,
            c(
              "Four focused ways to improve how your business handles calls, administration, follow-through and its online presence. Start with one clear scope.",
              "Cuatro formas concretas de mejorar llamadas, administración, seguimiento y presencia en línea. Empieza con un alcance claro.",
            ),
          )}
        </p>
      </section>
      <section className="fa-services-band">
        <div className="fa-container fa-section">
          <div className="fa-service-list">
            {offers.map((offer, i) => (
              <Link key={offer.id} href={offer.path} className="fa-service-row">
                <span className="fa-service-number">0{i + 1}</span>
                <h2>{text(locale, offer.label)}</h2>
                <p>{text(locale, offer.intro)}</p>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}
