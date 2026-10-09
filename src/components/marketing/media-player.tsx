"use client";
import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { mediaTranscripts } from "@/lib/media-transcripts";
import { recordEvent, watchedCoverage } from "@/lib/funnel-client";

const films = {
  routine: { label: c("Booking demonstration", "Demostración de reserva"), duration: "1:31" },
  main: { label: c("The full walkthrough", "La explicación completa"), duration: "5:00" },
  summary: { label: c("Executive overview", "Resumen ejecutivo"), duration: "1:08" },
  teaser: { label: c("A quick introduction", "Una introducción breve"), duration: "0:30" },
};
export type Film = keyof typeof films;
export function MediaPlayer({
  film = "routine",
  switchable = false,
}: {
  film?: Film;
  switchable?: boolean;
}) {
  const { locale } = useLocale();
  const [active, setActive] = useState<Film>(film);
  const [error, setError] = useState(false);
  const current = films[active];
  return (
    <div className="fa-media-shell">
      {switchable && (
        <div
          className="fa-media-tabs"
          role="tablist"
          aria-label={text(locale, c("Choose a film", "Elegir un vídeo"))}
        >
          {(Object.keys(films) as Film[]).map((key, i) => (
            <button
              id={`tab-${key}`}
              role="tab"
              aria-selected={active === key}
              aria-controls="film-panel"
              tabIndex={active === key ? 0 : -1}
              key={key}
              onClick={() => {
                setActive(key);
                setError(false);
                recordEvent("media_select", { mediaId: key, service: "phone-agent" });
              }}
              onKeyDown={(e) => {
                const keys = Object.keys(films) as Film[];
                if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? keys.length - 1
                        : (i + (e.key === "ArrowRight" ? 1 : -1) + keys.length) % keys.length;
                  const key = keys[next];
                  if (key) {
                    setActive(key);
                    setError(false);
                    document.getElementById(`tab-${key}`)?.focus();
                  }
                }
              }}
            >
              {text(locale, films[key].label)}
              <span>{films[key].duration}</span>
            </button>
          ))}
        </div>
      )}
      <div
        className="fa-media-layout"
        role={switchable ? "tabpanel" : undefined}
        id={switchable ? "film-panel" : undefined}
        aria-labelledby={switchable ? `tab-${active}` : undefined}
      >
        <div className="fa-player-frame">
          <video
            key={active}
            controls
            playsInline
            preload="none"
            poster={`/media/${active}.jpg`}
            aria-label={`${text(locale, current.label)} · ${current.duration}`}
            data-media-id={active}
            onError={() => setError(true)}
            onPlay={() => recordEvent("video_start", { mediaId: active, service: "phone-agent" })}
            onTimeUpdate={(event) => watchedCoverage(event.currentTarget, active, "phone-agent")}
          >
            <source src={`/media/${active}.mp4`} type="video/mp4" />
            {text(
              locale,
              c(
                "Your browser cannot play this video. Use the download link.",
                "Tu navegador no reproduce este vídeo. Usa el enlace de descarga.",
              ),
            )}
          </video>
        </div>
        <div className="fa-media-context">
          <p className="fa-eyebrow">
            {text(locale, c("Recorded evidence", "Evidencia grabada"))}{" "}
            <span>{current.duration}</span>
          </p>
          <h3>
            {text(
              locale,
              active === "routine"
                ? c("From an enquiry\nto a booking.", "De una consulta\na una reserva.")
                : c("Understand the offer.\nThen decide.", "Entiende la oferta.\nDespués decide."),
            )}
          </h3>
          <p>
            {text(
              locale,
              c(
                "The routine example shows a conversation, offered appointment times and a Google Calendar booking. It is a demonstration, not a customer result.",
                "El ejemplo habitual muestra una conversación, horarios disponibles y una reserva en Google Calendar. Es una demostración, no un resultado de cliente.",
              ),
            )}
          </p>
          <p className="fa-small">
            {text(
              locale,
              c(
                "Privacy beeps and edited labels are disclosed. The urgent excerpt in the full film does not establish clinical validation or a completed emergency handoff.",
                "Se incluyen pitidos de privacidad y etiquetas editadas. El extracto urgente del vídeo completo no acredita validación clínica ni un traspaso de emergencia completado.",
              ),
            )}
          </p>
          <div className="fa-media-links">
            <a href={`/media/${active}.mp4`}>{text(locale, c("Open video", "Abrir vídeo"))}</a>
            <a href={`/media/${active}.vtt`} download>
              {text(locale, c("Download captions", "Descargar subtítulos"))}
            </a>
          </div>
          <p className="fa-small">
            {text(
              locale,
              c(
                "English captions are already visible in the films. Transcripts are provided below.",
                "Los vídeos ya incluyen subtítulos visibles en inglés. Las transcripciones están debajo.",
              ),
            )}
          </p>
          {error && (
            <p role="alert">
              {text(
                locale,
                c(
                  "Video unavailable. Open the video directly or read the transcript.",
                  "Vídeo no disponible. Ábrelo directamente o lee la transcripción.",
                ),
              )}
            </p>
          )}
          <details className="fa-transcript">
            <summary>
              {text(
                locale,
                c("Read the full transcript (English)", "Leer la transcripción completa (inglés)"),
              )}
            </summary>
            <div lang="en">{mediaTranscripts[active]}</div>
          </details>
        </div>
      </div>
    </div>
  );
}
