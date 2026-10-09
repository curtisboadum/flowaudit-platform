"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { mediaTranscripts } from "@/lib/media-transcripts";
import {
  recordEvent,
  recordEventOnce,
  resetWatchBaseline,
  watchedCoverage,
} from "@/lib/funnel-client";

const detailedChapters = [
  [0, c("The offer", "La oferta")],
  [51.533333, c("Illustrative value", "Valor ilustrativo")],
  [92, c("Recorded booking", "Reserva grabada")],
  [182.833333, c("Compatibility limits", "Límites de compatibilidad")],
  [200.333333, c("Urgent-call boundaries", "Límites ante urgencias")],
  [244.5, c("Payment, testing and approval", "Pago, pruebas y aprobación")],
  [267.133333, c("Your 15-minute call", "Tu llamada de 15 minutos")],
] as const;

const overviewChapters = [
  [0, c("Offer and evidence", "Oferta y evidencia")],
  [38, c("Requirements and boundaries", "Requisitos y límites")],
  [64, c("Setup and your next step", "Configuración y siguiente paso")],
] as const;
const films = {
  overview: { label: c("The 90-second overview", "Resumen de 90 segundos"), duration: "1:30" },
  routine: { label: c("Booking demonstration", "Demostración de reserva"), duration: "1:31" },
  main: { label: c("The full walkthrough", "La explicación completa"), duration: "5:00" },
  summary: { label: c("Executive overview", "Resumen ejecutivo"), duration: "1:08" },
  teaser: { label: c("A quick introduction", "Una introducción breve"), duration: "0:30" },
};
export type Film = keyof typeof films;
export function MediaPlayer({
  film = "routine",
  switchable = false,
  compact = false,
  choices,
}: {
  film?: Film;
  switchable?: boolean;
  compact?: boolean;
  choices?: Film[];
}) {
  const { locale } = useLocale();
  const playerId = useId().replace(/:/g, "");
  const [active, setActive] = useState<Film>(film);
  const [position, setPosition] = useState(0);
  const [error, setError] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!buffering) {
      setSlow(false);
      return;
    }
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [buffering]);
  const current = films[active];
  const videoRef = useRef<HTMLVideoElement>(null);
  const keys = choices ?? (Object.keys(films) as Film[]);
  const chapters =
    active === "overview" ? overviewChapters : active === "main" ? detailedChapters : [];
  return (
    <div className={`fa-media-shell ${compact ? "fa-media-compact" : ""}`}>
      {switchable && (
        <div
          className="fa-media-tabs"
          role="tablist"
          aria-label={text(locale, c("Choose a film", "Elegir un vídeo"))}
        >
          {keys.map((key, i) => (
            <button
              id={`${playerId}-tab-${key}`}
              role="tab"
              aria-selected={active === key}
              aria-controls={`${playerId}-film-panel`}
              tabIndex={active === key ? 0 : -1}
              key={key}
              onClick={() => {
                setActive(key);
                setPosition(0);
                setError(false);
                setBuffering(false);
                recordEvent("media_select", { mediaId: key, service: "phone-agent" });
              }}
              onKeyDown={(e) => {
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
                    setPosition(0);
                    setError(false);
                    setBuffering(false);
                    document.getElementById(`${playerId}-tab-${key}`)?.focus();
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
        id={switchable ? `${playerId}-film-panel` : undefined}
        aria-labelledby={switchable ? `${playerId}-tab-${active}` : undefined}
      >
        <div className={`fa-player-frame ${active === "overview" ? "fa-overview-frame" : ""}`}>
          <video
            ref={videoRef}
            width={1920}
            height={1080}
            key={active}
            controls
            playsInline
            preload="none"
            poster={`/media/${active}.jpg?v=landscape-20261009`}
            aria-label={`${text(locale, current.label)} · ${current.duration}`}
            data-media-id={active}
            onError={() => {
              setError(true);
              setBuffering(false);
            }}
            onWaiting={() => setBuffering(true)}
            onStalled={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onPlay={(e) => {
              document.querySelectorAll("video").forEach((other) => {
                if (other !== e.currentTarget) other.pause();
              });
              resetWatchBaseline(e.currentTarget);
              recordEventOnce("video_start", { mediaId: active, service: "phone-agent" });
            }}
            onPause={(e) => resetWatchBaseline(e.currentTarget)}
            onSeeking={(e) => resetWatchBaseline(e.currentTarget)}
            onSeeked={(e) => resetWatchBaseline(e.currentTarget)}
            onTimeUpdate={(event) => {
              setPosition(event.currentTarget.currentTime);
              watchedCoverage(event.currentTarget, active, "phone-agent");
            }}
          >
            <source
              src={`/media/${active}.mp4`}
              type="video/mp4"
              onError={() => {
                setError(true);
                setBuffering(false);
              }}
            />
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
            {text(
              locale,
              active === "overview"
                ? c("The offer in 90 seconds", "La oferta en 90 segundos")
                : c("Recorded evidence", "Evidencia grabada"),
            )}{" "}
            <span>{current.duration}</span>
          </p>
          {!compact && (
            <h3>
              {text(
                locale,
                active === "routine"
                  ? c("From an enquiry\nto a booking.", "De una consulta\na una reserva.")
                  : c(
                      "Understand the offer.\nThen decide.",
                      "Entiende la oferta.\nDespués decide.",
                    ),
              )}
            </h3>
          )}
          <p>
            {text(
              locale,
              c(
                active === "overview"
                  ? "The offer, evidence limits, requirements and buying decision. Examine the genuine booking in the separate recording below."
                  : "The routine example shows a conversation, offered appointment times and a Google Calendar booking. It is a demonstration, not a customer result.",
                active === "overview"
                  ? "La oferta, los límites de la evidencia, los requisitos y la decisión de compra. Examina la reserva real en la grabación separada de abajo."
                  : "El ejemplo habitual muestra una conversación, horarios disponibles y una reserva en Google Calendar. Es una demostración, no un resultado de cliente.",
              ),
            )}
          </p>
          {!compact && (
            <p className="fa-small">
              {text(
                locale,
                c(
                  "Privacy beeps and edited labels are disclosed. The urgent excerpt in the full film does not establish clinical validation or a completed emergency handoff.",
                  "Se incluyen pitidos de privacidad y etiquetas editadas. El extracto urgente del vídeo completo no acredita validación clínica ni un traspaso de emergencia completado.",
                ),
              )}
            </p>
          )}
          <div className="fa-media-links">
            <a href={`/media/${active}.mp4`}>{text(locale, c("Open video", "Abrir vídeo"))}</a>
            <a href={`/media/${active}.mp4`} download>
              {text(locale, c("Download video", "Descargar vídeo"))}
            </a>
            <a href={`/media/${active}.vtt`} download>
              {text(locale, c("Download captions", "Descargar subtítulos"))}
            </a>
            {active === "overview" && (
              <a href="/media/overview.srt" download>
                {text(locale, c("Captions (SRT)", "Subtítulos (SRT)"))}
              </a>
            )}
          </div>
          <p className="fa-small">
            {text(
              locale,
              c(
                "English captions are already visible in the films. Use fullscreen for a larger view. Transcripts are provided below.",
                "Los vídeos ya incluyen subtítulos visibles en inglés. Usa la pantalla completa para ampliar la vista. Las transcripciones están debajo.",
              ),
            )}
          </p>
          {slow && !error && (
            <p role="status">
              {text(
                locale,
                c(
                  "Video loading slowly. You can read the transcript or book while it loads.",
                  "El vídeo tarda en cargar. Puedes leer la transcripción o reservar mientras carga.",
                ),
              )}
            </p>
          )}
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
          {chapters.length > 0 && (
            <nav
              className="fa-chapters"
              aria-label={text(locale, c("Film chapters", "Capítulos del vídeo"))}
            >
              <h3>{text(locale, c("Jump to a chapter", "Ir a un capítulo"))}</h3>
              <p className="fa-small">
                {text(
                  locale,
                  c(
                    "Choose the topic you care about. Watching is optional.",
                    "Elige el tema que te interesa. Ver el vídeo es opcional.",
                  ),
                )}
              </p>
              <ol>
                {chapters.map(([seconds, label], index) => (
                  <li key={String(seconds)}>
                    <button
                      type="button"
                      aria-current={
                        position >= seconds && position < (chapters[index + 1]?.[0] ?? Infinity)
                          ? "true"
                          : undefined
                      }
                      onClick={() => {
                        const video = videoRef.current;
                        if (video) {
                          resetWatchBaseline(video);
                          video.currentTime = Number(seconds);
                          setPosition(Number(seconds));
                          resetWatchBaseline(video);
                          video.focus();
                        }
                      }}
                    >
                      <span>
                        {Math.floor(Number(seconds) / 60)}:
                        {String(Math.floor(Number(seconds) % 60)).padStart(2, "0")}
                      </span>
                      {text(locale, label as ReturnType<typeof c>)}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="fa-media-links">
            {active === "overview" ? (
              <a href="/phone-agent#booking-recording">
                {text(
                  locale,
                  c("Watch the genuine booking recording", "Ver la grabación real de la reserva"),
                )}
              </a>
            ) : active === "routine" ? (
              <a href="/phone-agent#demo">
                {text(
                  locale,
                  c("Back to the 90-second overview", "Volver al resumen de 90 segundos"),
                )}
              </a>
            ) : null}
            <a href={`/media/${active}-transcript.txt`} download>
              {text(locale, c("Download transcript (English)", "Descargar transcripción (inglés)"))}
            </a>
          </div>
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
