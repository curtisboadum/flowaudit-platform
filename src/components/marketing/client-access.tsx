"use client";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
export function ClientAccess({ available }: { available: boolean }) {
  const { locale } = useLocale();
  return (
    <section className="fa-container fa-legal">
      <p className="fa-eyebrow">Revenue Recovery Desk</p>
      <h1>{text(locale, c("Client access", "Acceso de clientes"))}</h1>
      <p>
        {text(
          locale,
          available
            ? c("Continue to your existing client workspace.", "Continúa a tu espacio de cliente.")
            : c(
                "The client workspace is temporarily unavailable. Contact support for help with your existing account.",
                "El espacio de clientes no está disponible temporalmente. Contacta con soporte para recibir ayuda con tu cuenta.",
              ),
        )}
      </p>
      {available && (
        <a href="/revenue-recovery/client" className="fa-button">
          {text(locale, c("Open client workspace", "Abrir espacio de cliente"))} ↗
        </a>
      )}
      <a
        className="fa-text-link"
        href="mailto:support@flowaudit.co.uk?subject=Revenue%20Recovery%20Desk%20access"
      >
        {text(locale, c("Contact support", "Contactar con soporte"))} ↗
      </a>
      <p className="fa-small">
        {text(
          locale,
          c(
            "Please do not send passwords, integration keys or customer records by email.",
            "No envíes contraseñas, claves ni registros de clientes por correo.",
          ),
        )}
      </p>
    </section>
  );
}
