import React from "react";
import {
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  Img,
  staticFile,
} from "remotion";
import { system as s } from "../../system/sceneSystem";
import { Stage } from "../../system/Stage";
import { defaults, OverviewProps } from "./schema";
const a = s.sales;
const Person: React.FC<{ x: number; y: number; patient?: boolean }> = ({
  x,
  y,
  patient = false,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <circle
      cx="0"
      cy="0"
      r="29"
      fill={patient ? s.bg : a.avatarFill}
      stroke={s.ink}
      strokeWidth={a.lineWidth}
    />
    <path
      d="M-55 126 L-48 70 Q-43 38 0 38 Q43 38 48 70 L55 126"
      fill={patient ? s.bg : a.avatarFill}
      stroke={s.ink}
      strokeWidth={a.lineWidth}
    />
  </g>
);
const Clinic: React.FC<{ closed?: boolean; progress: number }> = ({ closed = false, progress }) => (
  <svg viewBox="0 0 800 330" width="100%" height="100%" aria-hidden="true">
    {closed ? (
      <g>
        <rect
          x="100"
          y="35"
          width="340"
          height="265"
          rx="2"
          fill={s.surface}
          stroke={s.ink}
          strokeWidth={a.lineWidth}
        />
        <path d="M270 35V300M100 115H440" fill="none" stroke={s.line} strokeWidth={a.lineWidth} />
        <circle cx="298" cy="181" r="7" fill={s.ink} />
        <rect x="160" y="130" width="220" height="70" fill={s.bg} />
        <text
          x="270"
          y="177"
          textAnchor="middle"
          fontSize={a.labelSize}
          fill={s.ink}
          fontFamily={s.fonts.sans}
        >
          Closed
        </text>
        <path
          d="M630 55A60 60 0 1 0 695 120A51 51 0 0 1 630 55"
          fill={a.accentSoft}
          stroke={a.accent}
          strokeWidth={a.lineWidth}
        />
      </g>
    ) : (
      <g>
        <Person x={220} y={85} />
        <Person x={460} y={100} patient />
        <path d="M100 220H540V300H100Z" fill={s.surface} stroke={s.ink} strokeWidth={a.lineWidth} />
        <path d="M262 192L340 175L370 209" fill="none" stroke={s.ink} strokeWidth={a.lineWidth} />
        <path d="M500 174L450 200L370 209" fill="none" stroke={s.ink} strokeWidth={a.lineWidth} />
        <rect
          x="130"
          y="148"
          width="58"
          height="52"
          fill={s.bg}
          stroke={s.ink}
          strokeWidth={a.lineWidth}
        />
      </g>
    )}
    <g transform="translate(640 245)">
      <rect
        x="-49"
        y="-74"
        width="98"
        height="148"
        rx="17"
        fill={s.bg}
        stroke={a.accent}
        strokeWidth={a.lineWidth}
      />
      <path d="M-15 -15Q-28 10 10 30L22 12L8 2L0 10L-9 -1L-5 -10Z" fill={a.accent} />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          r={65 + i * 17}
          fill="none"
          stroke={a.accent}
          strokeWidth={a.lineWidth / 2}
          opacity={Math.max(0, progress - i * 0.22) * (0.4 - i * 0.08)}
        />
      ))}
    </g>
  </svg>
);
export default function OverviewScene(input: Partial<OverviewProps>) {
  const p = { ...defaults, ...input };
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = (delay = 0) =>
    spring({ frame: f - p.enterFrames - delay, fps, config: s.springs.settle });
  const motion = (delay = 0): React.CSSProperties => ({
    transform: `translateY(${(1 - enter(delay)) * a.entryDistance}px)`,
    opacity: enter(delay),
  });
  const reveal = (start = 0, end = start + 30) =>
    interpolate(f, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phase = p.eventFrames.filter((t) => f >= t).length;
  const label: React.CSSProperties = {
    fontSize: a.labelSize,
    lineHeight: a.labelLineHeight,
    color: s.muted,
  };
  const title: React.CSSProperties = {
    fontFamily: s.fonts.serif,
    fontSize: a.titleSize,
    fontWeight: s.type.headlineWeight,
    lineHeight: a.titleLineHeight,
    margin: 0,
  };
  const isHook = p.kind === "hook";
  return (
    <Stage section="">
      <div
        style={{
          position: "absolute",
          left: a.left,
          top: a.top,
          fontSize: a.smallSize,
          letterSpacing: ".08em",
          color: s.muted,
        }}
      >
        {p.kicker}
      </div>
      {isHook ? (
        <>
          <h1
            style={{
              ...title,
              position: "absolute",
              left: a.left,
              top: 260,
              fontSize: a.largeTitleSize,
              ...motion(),
            }}
          >
            {p.titles[Math.min(phase, p.titles.length - 1)]}
          </h1>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 430,
              width: a.panelWidth,
              height: 340,
              ...motion(),
            }}
          >
            <div style={label}>{p.items[0]}</div>
            <Clinic progress={reveal(8, 35)} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 1000,
              top: 430,
              width: a.panelWidth,
              height: 340,
              ...motion(p.eventFrames[0] ?? 60),
            }}
          >
            <div style={label}>{p.items[1]}</div>
            <Clinic
              closed
              progress={reveal(p.eventFrames[0] ?? 60, (p.eventFrames[0] ?? 60) + 30)}
            />
          </div>
        </>
      ) : p.kind === "promise" ? (
        <>
          <h1
            style={{
              ...title,
              fontSize: a.largeTitleSize,
              position: "absolute",
              left: a.left,
              top: 290,
              width: a.width,
              ...motion(),
            }}
          >
            {p.headline}
          </h1>
          <svg
            viewBox="0 0 1720 220"
            style={{ position: "absolute", left: a.left, top: 550, width: a.width, height: 220 }}
          >
            <path d="M10 100H1700" stroke={s.line} strokeWidth={a.lineWidth} />
            <path
              d="M10 100H1700"
              stroke={a.accent}
              strokeWidth={a.lineWidth}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal(8, p.eventFrames[0] ?? 90)}
            />
            {p.items.map((t, i) => (
              <g key={t} opacity={enter(i * p.staggerFrames)}>
                <circle cx={30 + i * 810} cy="100" r="12" fill={a.accent} />
                <text
                  x={i * 810}
                  y="180"
                  fontFamily={s.fonts.sans}
                  fontSize={a.bodySize}
                  fill={s.ink}
                >
                  {t}
                </text>
              </g>
            ))}
          </svg>
        </>
      ) : p.kind === "agent" || p.kind === "routing" ? (
        <>
          <h1 style={{ ...title, position: "absolute", left: a.left, top: 265, ...motion() }}>
            {p.headline}
          </h1>
          <svg
            viewBox="0 0 1720 350"
            style={{ position: "absolute", left: a.left, top: 425, width: a.width, height: 350 }}
          >
            <path
              d="M370 90H630V175H730M370 260H630V175M1020 175H1160V90H1260M1160 175V260H1260"
              fill="none"
              stroke={s.line}
              strokeWidth={a.lineWidth}
            />
            <path
              d="M370 90H630V175H730M370 260H630V175M1020 175H1160V90H1260M1160 175V260H1260"
              fill="none"
              stroke={a.accent}
              strokeWidth={a.lineWidth}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal(10, p.eventFrames[0] ?? 110)}
            />
            <circle
              cx="875"
              cy="175"
              r="128"
              fill={a.accentSoft}
              stroke={a.accent}
              strokeWidth={a.lineWidth}
            />
            <text
              x="875"
              y="164"
              textAnchor="middle"
              fontSize={a.bodySize}
              fontFamily={s.fonts.serif}
              fill={s.ink}
            >
              AI phone
            </text>
            <text
              x="875"
              y="222"
              textAnchor="middle"
              fontSize={a.bodySize}
              fontFamily={s.fonts.serif}
              fill={s.ink}
            >
              agent
            </text>
            {["Desk busy", "After hours", "Routine booking", "Your team"].map((t, i) => (
              <g key={t} opacity={enter(i * p.staggerFrames)}>
                <text
                  x={i < 2 ? 0 : 1290}
                  y={i % 2 === 0 ? 105 : 275}
                  fontSize={a.bodySize}
                  fontFamily={s.fonts.sans}
                  fill={s.ink}
                >
                  {t}
                </text>
              </g>
            ))}
          </svg>
          <div
            style={{
              ...label,
              position: "absolute",
              left: a.left,
              top: 790,
              ...motion(p.eventFrames[1] ?? 60),
            }}
          >
            {p.items[Math.min(phase, p.items.length - 1)] ??
              "Agreed workflows. Practice-approved handoffs."}
          </div>
        </>
      ) : p.kind === "demo" || p.kind === "calendar" ? (
        <>
          <h1 style={{ ...title, position: "absolute", left: a.left, top: 260, ...motion() }}>
            {p.headline}
          </h1>
          {p.kind === "calendar" ? (
            <div
              style={{
                position: "absolute",
                left: a.left,
                top: 425,
                width: a.width,
                height: 330,
                overflow: "hidden",
                borderRadius: s.radius.card,
              }}
            >
              <Img
                src={staticFile(p.sourceStill)}
                style={{
                  position: "absolute",
                  width: (a.width * 1920) / 630,
                  height: (580 * a.width) / 630,
                  left: (-1210 * a.width) / 630,
                  top: (-365 * a.width) / 630,
                }}
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  left: a.left,
                  top: 415,
                  width: 560,
                  height: 340,
                  overflow: "hidden",
                  borderRadius: s.radius.card,
                  background: s.dark,
                }}
              >
                <OffthreadVideo
                  muted
                  src={staticFile(p.source)}
                  startFrom={Math.round(p.sourceFrom * fps)}
                  style={{ position: "absolute", width: 1920, height: 580, left: -220, top: -220 }}
                />
              </div>
              <div style={{ position: "absolute", left: 760, top: 440, width: 1050 }}>
                {p.items.map((t, i) => (
                  <div
                    key={t}
                    style={{
                      fontFamily: s.fonts.serif,
                      fontSize: a.ctaSize,
                      lineHeight: 1.15,
                      marginBottom: 24,
                      color: phase >= 4 && i === 1 ? a.teal : s.ink,
                      ...motion(
                        p.eventFrames.length === 4 ? p.eventFrames[i] : i * p.staggerFrames,
                      ),
                    }}
                  >
                    {t}
                    {phase >= 4 && i === 1 ? " ✓" : ""}
                  </div>
                ))}
              </div>
            </>
          )}
          {p.kind === "calendar" ? (
            <div
              style={{
                position: "absolute",
                left: a.left,
                top: 375,
                fontSize: a.labelSize,
                color: a.teal,
                ...motion(),
              }}
            >
              {p.items[Math.min(phase, p.items.length - 1)]}
              <svg width={a.width} height="8" style={{ display: "block", marginTop: 18 }}>
                <path
                  d="M0 4H1720"
                  stroke={a.teal}
                  strokeWidth={a.lineWidth}
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - reveal(10, p.duration - 15)}
                />
              </svg>
            </div>
          ) : null}
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 790,
              fontSize: a.smallSize,
              color: s.muted,
            }}
          >
            Recorded demo ·{" "}
            {p.crop === "confirmation"
              ? "booking still + original call audio"
              : p.kind === "calendar"
                ? "Google Calendar booking"
                : "appointment conversation"}
          </div>
        </>
      ) : p.kind === "value" ? (
        <>
          <h1
            style={{
              ...title,
              position: "absolute",
              left: a.left,
              top: 270,
              width: a.width,
              ...motion(),
            }}
          >
            {p.headline}
          </h1>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 440,
              width: 760,
              height: 240,
              ...motion(),
            }}
          >
            <Clinic progress={reveal(p.eventFrames[0] ?? 0, (p.eventFrames[0] ?? 0) + 30)} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 1000,
              top: 440,
              width: 760,
              height: 240,
              ...motion(p.eventFrames[1] ?? p.staggerFrames),
            }}
          >
            <Clinic
              closed
              progress={reveal(p.eventFrames[1] ?? 30, (p.eventFrames[1] ?? 30) + 30)}
            />
          </div>
          <svg
            viewBox="0 0 1720 100"
            style={{ position: "absolute", left: a.left, top: 685, width: a.width, height: 100 }}
          >
            <path d="M30 50H1690" fill="none" stroke={s.line} strokeWidth={a.lineWidth} />
            <path
              d="M30 50H1690"
              fill="none"
              stroke={a.teal}
              strokeWidth={a.lineWidth}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal(15, p.eventFrames[2] ?? 180)}
            />
            <circle
              cx="1690"
              cy="50"
              r={12 * reveal(p.eventFrames[2] ?? 180, (p.eventFrames[2] ?? 180) + 25)}
              fill={a.teal}
            />
          </svg>
          <svg
            viewBox="0 0 1720 100"
            style={{ position: "absolute", left: a.left, top: 685, width: a.width, height: 100 }}
          >
            <path d="M30 50H1690" fill="none" stroke={s.line} strokeWidth={a.lineWidth} />
            <path
              d="M30 50H1690"
              fill="none"
              stroke={a.teal}
              strokeWidth={a.lineWidth}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - reveal(15, p.eventFrames[2] ?? 180)}
            />
            <circle
              cx="1690"
              cy="50"
              r={12 * reveal(p.eventFrames[2] ?? 180, (p.eventFrames[2] ?? 180) + 25)}
              fill={a.teal}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 790,
              width: a.width,
              display: "flex",
              justifyContent: "space-between",
              fontSize: a.labelSize,
              color: a.teal,
            }}
          >
            {p.items.map((t, i) => (
              <span key={t} style={motion(i * p.staggerFrames)}>
                {t}
              </span>
            ))}
          </div>
        </>
      ) : p.kind === "assess" ? (
        <>
          <h1
            style={{
              ...title,
              fontSize: a.largeTitleSize,
              position: "absolute",
              left: a.left,
              top: 290,
              width: 1250,
              ...motion(),
            }}
          >
            {p.headline}
          </h1>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 590,
              width: a.width,
              borderTop: `${a.lineWidth}px solid ${s.line}`,
              paddingTop: 40,
              display: "flex",
              gap: 100,
            }}
          >
            {p.items.map((t, i) => (
              <div key={t} style={{ fontSize: a.bodySize, ...motion(i * p.staggerFrames) }}>
                <span style={{ color: a.accent, fontSize: a.smallSize }}>0{i + 1}</span>
                <br />
                {t}
              </div>
            ))}
          </div>
        </>
      ) : p.kind === "fit" ? (
        <>
          <h1
            style={{
              ...title,
              position: "absolute",
              left: a.left,
              top: 270,
              width: a.width,
              ...motion(),
            }}
          >
            {phase === 0
              ? p.headline
              : phase === 1
                ? "Clinical judgment stays with your team."
                : "Agree. Configure. Test. Approve."}
          </h1>
          {phase < 2 ? (
            <div
              style={{
                position: "absolute",
                left: a.left,
                top: 495,
                width: a.width,
                display: "flex",
                gap: 85,
              }}
            >
              {p.items.map((t, i) => (
                <div
                  key={t}
                  style={{
                    width: 500,
                    borderTop: `${a.lineWidth}px solid ${a.accent}`,
                    paddingTop: 35,
                    fontSize: a.bodySize,
                    ...motion(i * p.staggerFrames),
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: "absolute", left: a.left, top: 480, width: a.width }}>
              <svg width="1720" height="80">
                <path d="M20 40H1690" stroke={s.line} strokeWidth={a.lineWidth} />
                <path
                  d="M20 40H1690"
                  stroke={a.teal}
                  strokeWidth={a.lineWidth}
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={1 - reveal(p.eventFrames[1], p.duration - 25)}
                />
              </svg>
              <div
                style={{ display: "flex", justifyContent: "space-between", fontSize: a.bodySize }}
              >
                {["Scope & investment", "Initial payment", "Team testing", "Approval"].map(
                  (t, i) => (
                    <div
                      key={t}
                      style={{
                        width: 370,
                        ...motion(p.eventFrames[i + 1] ?? p.eventFrames[1] + i * p.staggerFrames),
                      }}
                    >
                      {t}
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1
            style={{
              ...title,
              fontSize: a.largeTitleSize,
              position: "absolute",
              left: a.left,
              top: 280,
              width: 1550,
              ...motion(),
            }}
          >
            {p.headline}
          </h1>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: a.ctaTop,
              fontSize: a.ctaSize,
              fontFamily: s.fonts.serif,
              ...motion(p.staggerFrames),
            }}
          >
            15-minute demo &amp; fit assessment
          </div>
          <div
            style={{
              position: "absolute",
              left: a.left,
              top: 700,
              fontSize: a.ctaSize,
              color: a.accent,
              ...motion(p.staggerFrames * 2),
            }}
          >
            flowaudit.co.uk/book ↗
            <div
              style={{
                height: a.lineWidth,
                width: `${reveal(20, p.duration - 20) * 100}%`,
                background: a.accent,
              }}
            />
          </div>
        </>
      )}
      {p.caption ? (
        <div
          style={{
            position: "absolute",
            left: (s.stage.width - p.captionWidth) / 2,
            width: p.captionWidth,
            bottom: p.captionBottom,
            minHeight: a.captionHeight,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            textAlign: "center",
            fontSize: p.captionSize,
            lineHeight: s.overview.captionLineHeight,
            fontWeight: s.overview.captionWeight,
            whiteSpace: "pre-line",
            color: s.ink,
          }}
        >
          {p.caption}
        </div>
      ) : null}
    </Stage>
  );
}
