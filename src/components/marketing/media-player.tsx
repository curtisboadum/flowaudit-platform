"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { mediaTranscripts } from "@/lib/media-transcripts";
import {
  attribution,
  recordEventOnce,
  resetWatchBaseline,
  watchedCoverage,
} from "@/lib/funnel-client";

// Only this existing, privacy-edited dental demonstration is published.
// Retired films and their exact transcripts are preserved outside the public repo.
export type Film = "routine";
export function MediaPlayer({
  film = "routine",
  compact = false,
  priority = false,
  streamlined = false,
}: {
  film?: Film;
  compact?: boolean;
  priority?: boolean;
  streamlined?: boolean;
}) {
  const { locale } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const fullscreenButton = useRef<HTMLButtonElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [slow, setSlow] = useState(false);
  const [nearViewport, setNearViewport] = useState(priority);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [bookingHref, setBookingHref] = useState("/book?service=phone-agent");
  const posterUrl = "/media/routine-poster.webp?v=20261021";

  useEffect(() => {
    if (!buffering) {
      setSlow(false);
      return;
    }
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [buffering]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || priority) return;
    if (!("IntersectionObserver" in window)) {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const query = new URLSearchParams({ service: "phone-agent", ...attribution() });
    setBookingHref(`/book?${query}`);
    setFullscreenSupported(
      Boolean(document.fullscreenEnabled && frameRef.current?.requestFullscreen),
    );
    const changed = () => {
      setFullscreen(document.fullscreenElement === frameRef.current);
      if (!document.fullscreenElement) fullscreenButton.current?.focus();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.fullscreenElement === frameRef.current) {
        event.preventDefault();
        void document.exitFullscreen().catch(() => setFullscreenError(true));
      }
    };
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("fullscreenchange", changed);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await frameRef.current?.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  };
  const mediaError = () => {
    setError(true);
    setBuffering(false);
  };

  return (
    <div
      className={`fa-media-shell ${compact ? "fa-media-compact" : ""} ${streamlined ? "fa-media-streamlined" : ""}`}
    >
      <div className="fa-media-layout">
        <div
          ref={frameRef}
          className={`fa-player-frame fa-media-frame ${fullscreen ? "fa-player-expanded" : ""}`}
        >
          {priority && <link rel="preload" as="image" href={posterUrl} fetchPriority="high" />}
          <video
            ref={videoRef}
            width={1920}
            height={1080}
            controls
            playsInline
            preload="none"
            poster={priority || nearViewport ? posterUrl : undefined}
            aria-label={`${text(locale, c("Booking demonstration", "Demostración de reserva"))} · 1:31`}
            data-media-id={film}
            onError={mediaError}
            onWaiting={() => setBuffering(true)}
            onStalled={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onPlay={(event) => {
              setStarted(true);
              document.querySelectorAll("video").forEach((other) => {
                if (other !== event.currentTarget) other.pause();
              });
              resetWatchBaseline(event.currentTarget);
              recordEventOnce("video_start", { mediaId: film, service: "phone-agent" });
            }}
            onPause={(event) => resetWatchBaseline(event.currentTarget)}
            onSeeking={(event) => resetWatchBaseline(event.currentTarget)}
            onSeeked={(event) => resetWatchBaseline(event.currentTarget)}
            onTimeUpdate={(event) => watchedCoverage(event.currentTarget, film, "phone-agent")}
          >
            <source
              src="/media/routine.mp4?v=landscape-20261009"
              type="video/mp4"
              onError={mediaError}
            />
            {text(
              locale,
              c(
                "Your browser cannot play this video. Use the download link.",
                "Tu navegador no reproduce este vídeo. Usa el enlace de descarga.",
              ),
            )}
          </video>
          {!started && (
            <div className="fa-recording-title" aria-hidden="true">
              <strong>{text(locale, c("Dental booking call", "Llamada de reserva dental"))}</strong>
              <span>
                {text(locale, c("1:31 · Recorded demonstration", "1:31 · Demostración grabada"))}
              </span>
            </div>
          )}
          {fullscreenSupported && (
            <div className="fa-player-actions">
              <button
                ref={fullscreenButton}
                type="button"
                aria-label={text(
                  locale,
                  fullscreen
                    ? c("Exit fullscreen", "Salir de pantalla completa")
                    : c("Fullscreen player", "Reproductor a pantalla completa"),
                )}
                onClick={() => void toggleFullscreen()}
              >
                {fullscreen ? "↙" : "⛶"}
              </button>
            </div>
          )}
        </div>
        <p className="fa-small fa-player-caption-hint">
          {text(
            locale,
            c(
              "Dental demonstration, not customer evidence. Privacy edits disclosed; English captions on screen.",
              "Demostración dental, no prueba de clientes. Ediciones de privacidad; subtítulos visibles en inglés.",
            ),
          )}
        </p>
        {fullscreenError && (
          <p role="status">
            {text(
              locale,
              c(
                "Fullscreen is unavailable. You can keep watching here.",
                "Pantalla completa no disponible. Puedes seguir viendo aquí.",
              ),
            )}
          </p>
        )}
        {slow && !error && (
          <p role="status">
            {text(
              locale,
              c(
                "Video loading slowly. You can open Evidence details for the transcript or book while it loads.",
                "El vídeo tarda en cargar. Puedes abrir Detalles de la evidencia para leer la transcripción o reservar mientras carga.",
              ),
            )}
          </p>
        )}
        {error && (
          <p role="alert">
            {text(
              locale,
              c(
                "Video unavailable. Open Evidence details for the direct video and transcript.",
                "Vídeo no disponible. Abre Detalles de la evidencia para el vídeo directo y la transcripción.",
              ),
            )}
          </p>
        )}
        <div className="fa-media-next-step">
          <Link
            className="fa-button fa-proof-booking"
            href={bookingHref}
            data-cta="phone-agent"
            onClick={() => videoRef.current?.pause()}
          >
            {text(locale, c("Book a 15-minute call", "Reservar 15 minutos"))} ↗
          </Link>
        </div>
        <details className="fa-evidence-details fa-media-transcript">
          <summary>
            {text(
              locale,
              c(
                "Evidence details · transcript, downloads & privacy edits",
                "Detalles de la evidencia · transcripción, descargas y privacidad",
              ),
            )}
          </summary>
          <div className="fa-media-context">
            <p className="fa-eyebrow">
              {text(locale, c("Recorded evidence", "Evidencia grabada"))} <span>1:31</span>
            </p>
            <p>
              {text(
                locale,
                c(
                  "The routine example shows a conversation, offered appointment times and a Google Calendar booking. It is a demonstration, not a customer result. Privacy beeps and edited labels are retained.",
                  "El ejemplo habitual muestra una conversación, horarios disponibles y una reserva en Google Calendar. Es una demostración, no un resultado de cliente. Se conservan los pitidos de privacidad y las etiquetas editadas.",
                ),
              )}
            </p>
            <div className="fa-media-links">
              <a href="/media/routine.mp4">{text(locale, c("Open video", "Abrir vídeo"))}</a>
              <a href="/media/routine.mp4" download>
                {text(locale, c("Download video", "Descargar vídeo"))}
              </a>
              <a href="/media/routine.vtt" download>
                {text(locale, c("Download captions", "Descargar subtítulos"))}
              </a>
              <a href="/media/routine-transcript.txt" download>
                {text(
                  locale,
                  c("Download transcript (English)", "Descargar transcripción (inglés)"),
                )}
              </a>
            </div>
            <details className="fa-transcript">
              <summary>
                {text(
                  locale,
                  c(
                    "Read the full transcript (English)",
                    "Leer la transcripción completa (inglés)",
                  ),
                )}
              </summary>
              <div lang="en">{mediaTranscripts.routine}</div>
            </details>
          </div>
        </details>
      </div>
    </div>
  );
}
