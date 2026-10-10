import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import timing from "./bold-opening.json";

// All positions are functions of the absolute frame. Seeking never changes the result.
const C = { ink: "#101827", white: "#F9FAFC", blue: "#234BFF", coral: "#FF6B5D", green: "#8CE0B2" };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const p = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const handset =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset: React.FC<{
  x: number;
  y: number;
  scale?: number;
  angle?: number;
  fill?: string;
}> = ({ x, y, scale = 1, angle = 0, fill = C.ink }) => (
  <path
    d={handset}
    fill={fill}
    transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
  />
);
const Paper: React.FC<{ x: number; y: number; r: number; fill: string }> = ({ x, y, r, fill }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x="-114" y="-145" width="228" height="290" rx="10" fill={fill} />
    <path
      d="M-72-74H61 M-72-30H72 M-72 14H35"
      fill="none"
      stroke={C.ink}
      strokeWidth="13"
      opacity=".55"
    />
    <rect x="-72" y="75" width="75" height="26" rx="3" fill={C.blue} />
  </g>
);

export const BoldOpening: React.FC = () => {
  const f = useCurrentFrame();
  const t = timing.motion;
  const gather = p(f, t.gather, t.gather + 52),
    zoom = p(f, t.zoom, t.zoom + 72),
    resolve = p(f, t.resolve, t.resolve + 85);
  const clear = 1 - p(f, t.gather - 5, t.gather + 38);
  const close = p(f, t.close, t.close + 27);
  const call1 = p(f, t.ring - 8, t.ring + 27),
    call2 = p(f, t.secondCall - 4, t.secondCall + 25);
  const jitter = Math.sin(f * 1.7) * 4 * (f > t.ring && f < t.ring + 32 ? 1 : 0);
  const x1 = mix(635, 810, gather),
    x2 = mix(1140, 1110, gather);
  const y1 = mix(525, 425, gather),
    y2 = mix(555, 425, gather);
  const bend = mix(mix(760, 425, gather), 590, resolve);
  const cables = [
    `M${x1} ${y1} C${x1} ${bend} ${mix(860, 900, resolve)} ${bend} ${mix(860, 900, resolve)} 425`,
    `M${x2} ${y2} C${x2} ${bend} ${mix(1060, 1020, resolve)} ${bend} ${mix(1060, 1020, resolve)} 425`,
  ];
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const blueReveal = p(f, t.resolve - 8, t.resolve + 55);
  const cameraScale = 1 + 1.15 * zoom - 1.15 * resolve;
  const label = p(f, t.resolve + 58, t.resolve + 78);
  return (
    <AbsoluteFill
      style={{ background: C.white, fontFamily: "FlowInter, sans-serif", overflow: "hidden" }}
    >
      <style>{`@font-face{font-family:FlowInter;src:url('${staticFile("fonts/inter.woff2")}');font-weight:100 900;}`}</style>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="night">
            <rect x="960" width="960" height="810" />
          </clipPath>
          <clipPath id="shutter">
            <rect x="1265" y="245" width="410" height="390" rx="10" />
          </clipPath>
        </defs>
        <rect x="960" width="960" height="1080" fill={C.ink} />
        <circle cx="960" cy="425" r={1600 * blueReveal} fill={C.blue} />
        <g transform={`translate(960 425) scale(${cameraScale}) translate(-960 -425)`}>
          <g opacity={clear}>
            <text x="105" y="115" fill={C.ink} fontSize="43" fontWeight="650" letterSpacing="4">
              BUSY DESK
            </text>
            <text x="1065" y="115" fill={C.white} fontSize="43" fontWeight="650" letterSpacing="4">
              AFTER HOURS
            </text>
            <Paper x={300 + 12 * Math.sin(f * 0.03)} y={370} r={-14} fill="#D4DEFF" />
            <Paper x={390 - 16 * p(f, 10, 45)} y={425 + 18 * p(f, 10, 45)} r={10} fill="#FFFFFF" />
            <path d="M100 625H780" stroke={C.ink} strokeWidth="20" />
            <Handset x={650} y={375} angle={-38 + jitter} scale={1.12} />
            <g transform="translate(1135 320)">
              <circle r="102" fill={C.white} />
              <path d="M0-74V-62 M74 0H62 M0 74V62 M-74 0H-62" stroke={C.ink} strokeWidth="12" />
              <path
                d="M0 0V-60"
                stroke={C.blue}
                strokeWidth="13"
                strokeLinecap="round"
                transform={`rotate(${mix(0, 160, close)})`}
              />
              <path d="M0 0H43" stroke={C.ink} strokeWidth="14" strokeLinecap="round" />
              <circle r="10" fill={C.ink} />
            </g>
            <rect x="1265" y="245" width="410" height="390" rx="10" fill="#F9FAFC" />
            <g clipPath="url(#shutter)">
              <g transform={`translate(0 ${-420 + 420 * close})`}>
                <rect x="1265" y="245" width="410" height="420" fill="#62718C" />
                {Array.from({ length: 8 }, (_, i) => (
                  <path key={i} d={`M1265 ${270 + i * 49}H1675`} stroke={C.ink} strokeWidth="9" />
                ))}
                <rect x="1435" y="605" width="70" height="12" rx="5" fill={C.white} />
              </g>
            </g>
            <Handset x={1140} y={470} angle={-38} scale={0.67} fill={C.white} />
            <path d="M1245 645H1695" stroke={C.white} strokeWidth="16" />
          </g>
          {/* The two interrupted call paths remain the same objects through the transformation. */}
          <g opacity={mix(1, 0, p(f, t.resolve + 70, t.resolve + 95))}>
            {cables.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={resolve > 0.6 ? C.white : C.coral}
                strokeWidth="24"
                strokeLinecap="round"
                strokeDasharray="1100"
                strokeDashoffset={1100 * (1 - (i === 0 ? call1 : call2))}
              />
            ))}
            <circle cx={x1} cy={y1} r={mix(38, 48, gather)} fill={C.coral} opacity={call1} />
            <circle cx={x2} cy={y2} r={mix(38, 48, gather)} fill={C.coral} opacity={call2} />
            <path
              d={`M${mix(860, 900, resolve)} 400V450 M${mix(1060, 1020, resolve)} 400V450`}
              stroke={C.coral}
              strokeWidth="18"
              strokeLinecap="round"
              opacity={1 - resolve}
            />
          </g>
          <g opacity={clear}>
            {[0, 1].map((i) => (
              <path
                key={i}
                d={`M${710 + i * 28} 270 Q${760 + i * 26} 320 ${730 + i * 28} 360`}
                stroke={C.coral}
                strokeWidth="13"
                fill="none"
                opacity={call1 * (0.65 + 0.35 * Math.sin(f * 0.5 + i))}
              />
            ))}
            <path
              d="M1135 575H1200"
              stroke={C.coral}
              strokeWidth="18"
              strokeLinecap="round"
              opacity={call2}
            />
          </g>
          {/* The gap becomes an agreed aperture; the open branch stays available for staff support. */}
          <rect
            x={mix(900, 350, resolve)}
            y={mix(365, 250, resolve)}
            width={mix(120, 1220, resolve)}
            height={mix(120, 415, resolve)}
            rx={mix(60, 208, resolve)}
            fill="none"
            stroke={C.white}
            strokeWidth="19"
            opacity={p(f, t.resolve, t.resolve + 18)}
          />
          <path
            d="M960 650V750H1330"
            fill="none"
            stroke={C.white}
            strokeWidth="14"
            strokeLinecap="round"
            opacity={p(f, t.resolve + 52, t.resolve + 76)}
          />
          <circle
            cx={1330}
            cy={750}
            r="22"
            fill={C.white}
            opacity={p(f, t.resolve + 66, t.resolve + 82)}
          />
          <g opacity={resolve}>
            <circle cx={480} cy={458} r={mix(48, 67, resolve)} fill={C.white} />
            <circle cx={1440} cy={458} r="67" fill={C.green} />
            <path
              d="M1411 456L1433 478L1471 435"
              fill="none"
              stroke={C.ink}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={p(f, t.resolve + 66, t.resolve + 85)}
            />
            <circle
              cx={mix(480, 1440, p(f, t.resolve + 25, t.resolve + 71))}
              cy="458"
              r="29"
              fill={C.green}
              opacity={1 - p(f, t.resolve + 70, t.resolve + 78)}
            />
          </g>
          <text x="1088" y="807" fontSize="44" fill={C.white} opacity={label}>
            Staff support
          </text>
          <text
            x="960"
            y="629"
            textAnchor="middle"
            fontSize="43"
            fill={C.white}
            fontWeight="600"
            opacity={label}
          >
            Agreed workflow
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 710,
          top: 321,
          width: 500,
          height: 150,
          opacity: label,
          transform: `translateY(${14 * (1 - label)}px)`,
        }}
      >
        <Img src={staticFile("brand.svg")} style={{ width: "100%", height: "100%" }} />
      </div>
      {cue && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 76,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: C.ink,
              color: "white",
              padding: "17px 28px",
              borderRadius: 12,
              fontSize: 64,
              fontWeight: 570,
              lineHeight: 1.17,
              textAlign: "center",
              whiteSpace: "pre-line",
              maxWidth: 1700,
            }}
          >
            {cue.text}
          </div>
        </div>
      )}
      {timing.audio.map((c) => (
        <Sequence key={c.src} from={c.from} durationInFrames={c.frames}>
          <Audio src={staticFile(c.src)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
