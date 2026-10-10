import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  spring,
  interpolate,
  Easing,
} from "remotion";
import timing from "./bold-opening.json";
import { system } from "./system/sceneSystem";

const C = system.bold;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const lerp = (a: number, b: number, v: number) => a + (b - a) * v;
const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const settle = (f: number, a: number, heavy = false) =>
  spring({ frame: Math.max(0, f - a), fps: 30, config: heavy ? C.springs.weight : C.springs.snap });
const phone =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset: React.FC<{ x: number; y: number; s: number; r?: number; fill?: string }> = ({
  x,
  y,
  s,
  r = -35,
  fill = C.ink,
}) => <path d={phone} fill={fill} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />;
const Call: React.FC<{ x: number; y: number; scale?: number; fill?: string }> = ({
  x,
  y,
  scale = 1,
  fill = C.coral,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle r={C.tokenRadius} fill={fill} />
    <Handset x={0} y={-7} s={0.19} fill={C.ink} />
  </g>
);
const Label: React.FC<{
  x: number;
  y: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
}> = ({ x, y, fill = C.white, anchor = "start", children }) => (
  <text x={x} y={y} fill={fill} textAnchor={anchor} fontSize={C.labelSize} fontWeight={650}>
    {children}
  </text>
);

/** One continuous absolute-frame mechanism; neither call is replaced during a transition. */
export const BoldOpening: React.FC = () => {
  const f = useCurrentFrame(),
    t = timing.motion;
  const gather = ease(f, t.gather, t.gather + 76),
    resolve = ease(f, t.resolve, t.resolve + 78);
  const context = 1 - ease(f, 219, 300),
    gateOpen = settle(f, t.gateOpen, true);
  const cam = ease(f, t.zoom, t.zoom + 63) * (1 - ease(f, t.resolve, t.resolve + 70));
  const ring = interpolate(
    f,
    [t.ring - 5, t.ring, t.ring + 4, t.ring + 9, t.ring + 15, t.ring + 23, t.ring + 30],
    [0, -4, 8, -6, 4, -2, 0],
    clamp,
  );
  const paper = settle(f, t.paperBlock, true),
    close = settle(f, t.close, true);
  const leftX = lerp(250, 310, gather),
    leftY = lerp(610, 400, gather);
  const rightX = lerp(1670, 310, gather),
    rightY = lerp(610, 585, gather);
  const bx = lerp(615, 910, gather),
    by = lerp(350 + 207 * paper, 460, gather);
  const sx = lerp(1325, 1010, gather),
    sy = lerp(466, 460, gather);
  const token1 = ease(f, t.ring + 5, t.ring + 27);
  const token2 = ease(f, t.secondCall, t.secondCall + 29);
  const firstX = lerp(lerp(260, 529, token1), 780, gather),
    firstY = lerp(610, 460, gather);
  const secondX = lerp(lerp(1670, 1438, token2), 655, gather),
    secondY = lerp(610, 585, gather);
  const pass = ease(f, t.gateOpen + 16, t.arrival),
    queued = ease(f, 396, 422);
  const arrive = settle(f, t.arrival);
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const boundary = settle(f, 358, true),
    branch = ease(f, 395, 420),
    logo = settle(f, 364);
  const routeRight = lerp(1480, 1560, resolve);
  const firstPath = `M${leftX} ${leftY} H${lerp(548, 710, gather)} Q${lerp(566, 740, gather)} ${leftY} ${lerp(566, 740, gather)} ${lerp(590, 460, gather)} V460 H${lerp(566, 850, gather)}`;
  const secondPath = `M${rightX} ${rightY} H${lerp(1400, 625, gather)} Q${lerp(1380, 685, gather)} ${rightY} ${lerp(1380, 685, gather)} ${lerp(590, 525, gather)} V${lerp(590, 500, gather)} Q${lerp(1380, 685, gather)} 460 ${lerp(1380, 740, gather)} 460 H${lerp(1380, 850, gather)}`;
  return (
    <AbsoluteFill
      style={{ background: C.white, fontFamily: system.fonts.sans, overflow: "hidden" }}
    >
      <style>{`@font-face{font-family:FlowInter;src:url('${staticFile("fonts/inter.woff2")}');font-weight:100 900;}`}</style>
      <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="busy-window">
            <rect x="65" y="155" width="815" height="635" rx="25" />
          </clipPath>
          <clipPath id="night-window">
            <rect x="1040" y="155" width="815" height="635" rx="25" />
          </clipPath>
          <clipPath id="scope">
            <rect x="865" y="310" width="195" height="300" rx="8" />
          </clipPath>
        </defs>
        {/* The division retracts with the obstructions, rather than wiping to a new scene. */}
        <rect x={lerp(960, 1920, resolve)} y="0" width="1920" height="1080" fill={C.ink} />
        <rect x="0" y="0" width={1920 * resolve} height="1080" fill={C.blue} />
        <g transform={`translate(830 460) scale(${1 + 0.2 * cam}) translate(-830 -460)`}>
          <g opacity={context}>
            <text x="105" y="112" fontSize="49" fontWeight="700" letterSpacing="4" fill={C.ink}>
              BUSY DESK
            </text>
            <text x="1065" y="112" fontSize="49" fontWeight="700" letterSpacing="4" fill={C.white}>
              AFTER HOURS
            </text>
            <g clipPath="url(#busy-window)">
              <path d="M100 745H830" stroke={C.ink} strokeWidth="13" />
              <g
                transform={`translate(${250 - 200 * gather} ${310 - 40 * gather}) rotate(${-11 + ring})`}
              >
                <rect x="-130" y="-112" width="290" height="205" rx="44" fill={C.blue} />
                <Handset x={15} y={-39} s={0.92} fill={C.white} />
                {[0, 1, 2].map((i) => (
                  <rect
                    key={i}
                    x={-52 + i * 52}
                    y="44"
                    width="23"
                    height="13"
                    rx="4"
                    fill={C.white}
                  />
                ))}
              </g>
              <path d="M265 410V610" stroke={C.ink} strokeWidth="18" fill="none" />
              <g transform={`translate(${440 - 250 * gather} ${330 + 160 * gather}) rotate(-14)`}>
                <rect x="-84" y="-108" width="168" height="216" rx="8" fill={C.paper} />
                <path d="M-48-54H45 M-48-12H45 M-48 30H16" stroke={C.blue} strokeWidth="12" />
              </g>
            </g>
            <g clipPath="url(#night-window)" transform={`translate(${220 * gather} 0)`}>
              <circle cx="1680" cy="282" r="110" fill={C.white} />
              <path
                d="M1680 192V205 M1770 282H1757 M1680 372V359 M1590 282H1603"
                stroke={C.ink}
                strokeWidth="11"
              />
              <path
                d="M1680 282V215"
                stroke={C.blue}
                strokeWidth="14"
                strokeLinecap="round"
                transform={`rotate(${lerp(-60, 90, Math.min(1, close))} 1680 282)`}
              />
              <path d="M1680 282H1720" stroke={C.ink} strokeWidth="14" strokeLinecap="round" />
              <circle cx="1680" cy="282" r="11" fill={C.ink} />
              <Handset x={1670} y={465} s={0.96} fill={C.white} />
              <path d="M1670 540V610" stroke={C.white} strokeWidth="18" />
              <path d="M1100 745H1810" stroke={C.white} strokeWidth="13" />
            </g>
          </g>
          {/* Existing connections remain visible while their endpoints and bends reorganise. */}
          <path
            d={firstPath}
            stroke={resolve > 0.9 ? C.white : C.coral}
            strokeWidth={C.routeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={secondPath}
            stroke={resolve > 0.9 ? C.white : C.coral}
            strokeWidth={C.routeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Outgoing route is revealed only after the scope boundary takes shape. */}
          <path
            d={`M850 460H${routeRight}`}
            stroke={C.white}
            strokeWidth={C.routeWidth}
            fill="none"
            opacity={resolve}
          />
          <g opacity={resolve}>
            <rect
              x={lerp(865, 835, boundary)}
              y={lerp(300, 280, boundary)}
              width={lerp(220, 805, boundary)}
              height={lerp(320, 370, boundary)}
              rx="32"
              fill="none"
              stroke={C.white}
              strokeWidth="7"
              strokeDasharray="18 15"
            />
            <g transform={`translate(0 ${-22 * (1 - boundary)})`} opacity={Math.min(1, boundary)}>
              <Label x={1235} y={222} anchor="middle">
                Agreed workflow
              </Label>
            </g>
            <path
              d="M1110 460V718H1400"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - branch}
              stroke={C.white}
              strokeWidth="17"
              strokeLinecap="round"
              fill="none"
            />
            <g transform={`translate(1400 718) scale(${settle(f, 414)})`}>
              <circle r="37" fill={C.blue} stroke={C.white} strokeWidth="8" />
              <path d="M-13 0H13 M0-13V13" stroke={C.white} strokeWidth="7" />
            </g>
            <g opacity={branch}>
              <Label x={1200} y={805}>
                Staff support
              </Label>
            </g>
          </g>
          {/* Paper and shutter retain identity as they become the two leaves of the scope gate. */}
          <g clipPath={resolve > 0.98 ? "url(#scope)" : undefined}>
            <g transform={`translate(${bx} ${by - 220 * gateOpen}) rotate(${lerp(-9, 0, gather)})`}>
              <rect
                x={-lerp(125, 42, gather)}
                y={-lerp(180, 146, gather)}
                width={lerp(250, 84, gather)}
                height={lerp(360, 292, gather)}
                rx={lerp(12, 8, gather)}
                fill={resolve > 0.6 ? C.white : C.paper}
              />
              <g opacity={1 - gather} transform={`translate(0 ${-85 + 85 * paper})`}>
                <path d="M-78-100H55 M-78-53H78 M-78-6H50" stroke={C.ink} strokeWidth="15" />
                <rect x="-78" y="84" width="95" height="29" rx="4" fill={C.blue} />
              </g>
            </g>
          </g>
          <g clipPath={resolve > 0.98 ? "url(#scope)" : undefined}>
            <g transform={`translate(${sx} ${sy + 220 * gateOpen})`}>
              <rect
                x={-lerp(120, 42, gather)}
                y={-lerp(215, 146, gather)}
                width={lerp(240, 84, gather)}
                height={lerp(430, 292, gather)}
                rx="8"
                fill={C.shade}
              />
              <g opacity={1 - gather}>
                <rect x="-105" y="-198" width="210" height="396" fill={C.white} />
                <svg
                  x="-105"
                  y="-198"
                  width="210"
                  height="396"
                  viewBox="0 0 210 396"
                  overflow="hidden"
                >
                  <g transform={`translate(0 ${-400 + 400 * close})`}>
                    <rect width="210" height="400" fill={C.muted} />
                    {Array.from({ length: 8 }, (_, i) => (
                      <path key={i} d={`M0 ${i * 51 + 20}H210`} stroke={C.ink} strokeWidth="10" />
                    ))}
                    <rect x="70" y="366" width="70" height="12" rx="4" fill={C.ink} />
                  </g>
                </svg>
              </g>
              <rect
                x="-42"
                y="-146"
                width="84"
                height="292"
                rx="8"
                fill={C.white}
                opacity={resolve}
              />
            </g>
          </g>
          {/* The two origins become compact handset anchors, never anonymous replacement dots. */}
          <g opacity={gather}>
            <Handset x={leftX - 90} y={leftY - 6} s={0.49} fill={resolve > 0.6 ? C.white : C.ink} />
            <Handset
              x={rightX - 90}
              y={rightY - 6}
              s={0.49}
              fill={resolve > 0.6 ? C.white : C.ink}
            />
          </g>
          <Call
            x={lerp(firstX, 1530, pass)}
            y={firstY}
            scale={token1 * (1 + 0.13 * (settle(f, 77) - 1))}
            fill={pass >= 1 ? C.green : C.coral}
          />
          <Call x={lerp(secondX, 700, queued)} y={lerp(secondY, 460, queued)} scale={token2} />
          <g opacity={resolve}>
            <circle
              cx="1530"
              cy="460"
              r={lerp(47, 58, arrive)}
              fill="none"
              stroke={pass >= 1 ? C.green : C.white}
              strokeWidth="9"
            />
            <g
              transform={`translate(0 ${18 * (1 - settle(f, 381))})`}
              opacity={Math.min(1, settle(f, 381))}
            >
              <Label x={860} y={805} anchor="middle">
                Agreed scope
              </Label>
            </g>
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 70,
          width: 465,
          height: 140,
          transform: `translateX(${-650 * (1 - logo)}px)`,
        }}
      >
        <Img src={staticFile("brand.svg")} style={{ width: "100%", height: "100%" }} />
      </div>
      {cue && (
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: C.captionBottom,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: C.ink,
              color: C.white,
              padding: "16px 28px",
              borderRadius: 10,
              fontSize: C.captionSize,
              fontWeight: 570,
              lineHeight: 1.17,
              textAlign: "center",
              maxWidth: 1760,
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
