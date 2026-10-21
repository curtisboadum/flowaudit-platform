"use client";
import Link from "next/link";
import filmMetadata from "@/lib/film-metadata.json";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { c, text } from "@/lib/marketing-copy";
import { mediaTranscripts } from "@/lib/media-transcripts";
import {
  attribution,
  recordEvent,
  recordEventOnce,
  resetWatchBaseline,
  watchedCoverage,
} from "@/lib/funnel-client";

const overviewChapters = [
  [0, c("Busy desk and after hours", "Recepción ocupada y fuera de horario")],
  [filmMetadata.demo, c("Recorded demo", "Demo grabada")],
  [filmMetadata.setup, c("Setup and your next step", "Configuración y siguiente paso")],
] as const;
const films = {
  overview: {
    label: c("The FlowAudit overview", "Resumen de FlowAudit"),
    duration: filmMetadata.durationLabel,
  },
  routine: { label: c("Booking demonstration", "Demostración de reserva"), duration: "1:31" },
  urgent: {
    label: c("A call about a child’s toothache", "Una llamada sobre dolor de muelas infantil"),
    duration: "2:42",
  },
  summary: { label: c("Executive overview", "Resumen ejecutivo"), duration: "1:08" },
  teaser: { label: c("A quick introduction", "Una introducción breve"), duration: "0:30" },
};
export type Film = keyof typeof films;
export function MediaPlayer({
  film = "routine",
  switchable = false,
  compact = false,
  choices,
  onPositionChange,
  qualificationCta = false,
  priority = false,
}: {
  film?: Film;
  switchable?: boolean;
  compact?: boolean;
  choices?: Film[];
  qualificationCta?: boolean;
  priority?: boolean;
  onPositionChange?: (seconds: number, film: Film) => void;
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(priority);
  const posterUrl =
    active === "routine"
      ? "/media/routine-poster.webp?v=20261021"
      : `/media/${active}.jpg?v=${active === "overview" ? filmMetadata.version : "landscape-20261009"}`;
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
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
  }, []);
  const fullscreenButton = useRef<HTMLButtonElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupported, setFullscreenSupported] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [ctaUnlocked, setCtaUnlocked] = useState(false);
  const [bookingHref, setBookingHref] = useState("/book?service=phone-agent&entry=vsl");
  const playbackKey = `fa-playback:${active}:${filmMetadata.version}`;
  const savePosition = (video: HTMLVideoElement) => {
    if (!Number.isFinite(video.currentTime)) return;
    try {
      sessionStorage.setItem(
        playbackKey,
        JSON.stringify({
          position: video.currentTime,
          unlocked: ctaUnlocked || video.currentTime >= filmMetadata.opening,
        }),
      );
    } catch {
      /* Playback still works. */
    }
  };
  useEffect(() => {
    if (!qualificationCta) return;
    try {
      const saved = JSON.parse(sessionStorage.getItem(playbackKey) ?? "{}");
      if (
        typeof saved.position === "number" &&
        Number.isFinite(saved.position) &&
        saved.position > 0
      ) {
        // Restore the paused timeline on return without requiring a play gesture.
        videoRef.current?.load();
      }
    } catch {
      /* Invalid or unavailable storage does not prevent playback. */
    }
  }, [playbackKey, qualificationCta]);
  useEffect(() => {
    const query = new URLSearchParams({ service: "phone-agent", entry: "vsl", ...attribution() });
    setBookingHref(`/book?${query}`);
    setFullscreenSupported(
      Boolean(document.fullscreenEnabled && frameRef.current?.requestFullscreen),
    );
    const changed = () => {
      setFullscreen(document.fullscreenElement === frameRef.current);
      fullscreenButton.current?.focus();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.fullscreenElement === frameRef.current) {
        event.preventDefault();
        void document.exitFullscreen().catch(() => {});
      }
    };
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("fullscreenchange", changed);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const leavePlayer = () => {
    const video = videoRef.current;
    if (video) {
      savePosition(video);
      video.pause();
    }
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await frameRef.current?.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  };
  const ChapterHeading = qualificationCta ? "h2" : "h3";
  const keys = choices ?? (Object.keys(films) as Film[]);
  const chapters = active === "overview" ? overviewChapters : [];
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
        <div
          ref={frameRef}
          className={`fa-player-frame ${active === "overview" ? "fa-overview-frame" : ""}`}
        >
          {(priority || (qualificationCta && active === "overview")) && (
            <link rel="preload" as="image" href={posterUrl} fetchPriority="high" />
          )}
          <video
            ref={videoRef}
            width={1920}
            height={1080}
            key={active}
            controls
            controlsList={qualificationCta ? "nofullscreen" : undefined}
            playsInline
            preload="none"
            poster={priority || active === "overview" || nearViewport ? posterUrl : undefined}
            aria-label={`${text(locale, current.label)} · ${current.duration}`}
            data-media-id={active}
            onLoadedMetadata={(event) => {
              if (!qualificationCta) return;
              try {
                const saved = JSON.parse(sessionStorage.getItem(playbackKey) ?? "{}");
                if (
                  typeof saved.position === "number" &&
                  saved.position > 0 &&
                  Number.isFinite(saved.position)
                ) {
                  const value = Math.min(
                    saved.position,
                    Math.max(0, event.currentTarget.duration - 0.1),
                  );
                  event.currentTarget.currentTime = value;
                  setPosition(value);
                }
                setCtaUnlocked(saved.unlocked === true);
              } catch {
                /* Ignore invalid storage. */
              }
            }}
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
            onPause={(e) => {
              resetWatchBaseline(e.currentTarget);
              if (qualificationCta) savePosition(e.currentTarget);
            }}
            onSeeking={(e) => resetWatchBaseline(e.currentTarget)}
            onSeeked={(e) => {
              resetWatchBaseline(e.currentTarget);
              onPositionChange?.(e.currentTarget.currentTime, active);
            }}
            onTimeUpdate={(event) => {
              setPosition(event.currentTarget.currentTime);
              if (qualificationCta) {
                if (event.currentTarget.currentTime >= filmMetadata.opening) setCtaUnlocked(true);
                savePosition(event.currentTarget);
              }
              onPositionChange?.(event.currentTarget.currentTime, active);
              watchedCoverage(event.currentTarget, active, "phone-agent");
            }}
          >
            <source
              src={`/media/${active}.mp4?v=${active === "overview" ? filmMetadata.version : "landscape-20261009"}`}
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
          {qualificationCta && (
            <div className="fa-player-actions">
              {fullscreenSupported && (
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
              )}
              {(ctaUnlocked || position >= filmMetadata.opening) && (
                <Link
                  className="fa-player-cta"
                  href={bookingHref}
                  onClick={() => {
                    leavePlayer();
                    recordEvent("cta_click", { service: "phone-agent", mediaId: active });
                  }}
                >
                  {text(locale, c("Seen enough?", "¿Ya lo tienes claro?"))}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              )}
            </div>
          )}
          {qualificationCta &&
            position >= filmMetadata.demoHint &&
            position < filmMetadata.demoHint + 5 && (
              <a className="fa-player-demo-link" href="#full-demonstrations" onClick={leavePlayer}>
                {text(locale, c("Both full demos below ↓", "Las dos demos completas abajo ↓"))}
              </a>
            )}
        </div>
        {qualificationCta && (!fullscreenSupported || fullscreenError) && (
          <p className="fa-small">
            {text(locale, c("Keep watching here, or", "Sigue viendo aquí, o"))}{" "}
            <Link href={bookingHref} onClick={leavePlayer}>
              {text(locale, c("book a demo", "reserva una demo"))}
            </Link>
            .
          </p>
        )}
        <div className="fa-media-context">
          <p className="fa-eyebrow">
            {text(
              locale,
              active === "overview"
                ? c("The offer and recorded evidence", "La oferta y evidencia grabada")
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
                  ? "See how agreed call workflows can support your team during busy periods and after hours. Watch both full recorded demonstrations below."
                  : active === "urgent"
                    ? "The complete second recorded call concerns a child’s toothache. It shows the recorded conversation, not evidence of validated clinical triage or a completed emergency handoff."
                    : "The routine example shows a conversation, offered appointment times and a Google Calendar booking. It is a demonstration, not a customer result.",
                active === "overview"
                  ? "Descubre cómo los flujos de llamadas acordados pueden apoyar a tu equipo en horas de mucho trabajo y fuera de horario. Mira las dos demostraciones completas abajo."
                  : active === "urgent"
                    ? "La segunda llamada completa trata sobre dolor de muelas infantil. No acredita triaje clínico validado ni un traspaso de emergencia completado."
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
              <ChapterHeading>
                {text(locale, c("Jump to a chapter", "Ir a un capítulo"))}
              </ChapterHeading>
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
              <Link href="/industries/dental#full-demonstrations">
                {text(
                  locale,
                  c("Watch both full demonstrations", "Ver las dos demostraciones completas"),
                )}
              </Link>
            ) : active === "routine" ? (
              <Link href="/industries/dental#demo">
                {text(locale, c("See the dental overview", "Ver el resumen dental"))}
              </Link>
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
