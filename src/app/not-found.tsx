"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
export default function NotFound() {
  const { locale } = useLocale();
  return (
    <section className="fa-container fa-page-intro">
      <p className="fa-eyebrow">
        404 / {text(locale, c("Page not found", "Página no encontrada"))}
      </p>
      <h1>{text(locale, c("Let’s get you back to the work.", "Volvamos al trabajo."))}</h1>
      <p className="fa-lead">
        {text(
          locale,
          c(
            "This address is unavailable. Explore the services or book a fit assessment.",
            "Esta dirección no está disponible. Explora los servicios o reserva una evaluación.",
          ),
        )}
      </p>
      <div className="fa-hero-actions">
        <Link href="/solutions" className="fa-button">
          {text(locale, c("Explore services", "Explorar servicios"))} →
        </Link>
        <Link href="/book" className="fa-text-link">
          {text(locale, c("Book a call", "Reservar llamada"))} ↗
        </Link>
      </div>
    </section>
  );
}
