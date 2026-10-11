import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  delayRender,
  continueRender,
  cancelRender,
  spring,
  interpolate,
  Easing,
} from "remotion";
import timing from "./bold-opening.json";
import { system } from "./system/sceneSystem";
import { defaults, type BoldOpeningProps } from "./scenes/bold-opening/schema";
const C = system.bold;
const S = system.openingCollage;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const progress = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const handset =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset = ({
  scale = 1,
  fill = C.ink,
  keyline = 0,
}: {
  scale?: number;
  fill?: string;
  keyline?: number;
}) => (
  <path
    d={handset}
    fill={fill}
    stroke={C.white}
    strokeWidth={keyline}
    strokeLinejoin="round"
    paintOrder="stroke fill"
    transform={`translate(20 -28) rotate(-35) scale(${scale})`}
  />
);
/** Two original cutout callers. Their clothes, hair and held receivers persist across cuts. */
const CallerPerson = ({ radius, second = false }: { radius: number; second?: boolean }) => (
  <g transform={`scale(${(radius / 80) * 0.9})`}>
    <path
      d="M-39-86H34V-76H43V-29L56-19L69 14L59 32L44 23V49L38 54V93H6V59H-8V93H-42V49L-49 42V-4L-39-27V-48H-45V-74Z"
      fill={C.ink}
      stroke={C.white}
      strokeWidth={8}
      strokeLinejoin="miter"
    />
    {second && <circle cx="-18" cy="-91" r="18" fill={C.ink} stroke={C.white} strokeWidth={6} />}
    <rect x="-37" y="-80" width="74" height="58" fill={C.ink} />
    <rect x="-29" y="-63" width="58" height="44" fill={C.paper} />
    <path
      d={
        second
          ? "M-37-80H37V-59H24V-66H-25V-54H-37Z"
          : "M-37-80H37V-61H21V-68H6V-59H-10V-66H-27V-48H-37Z"
      }
      fill={C.ink}
    />
    <rect x="-32" y="-23" width="64" height="17" fill={C.paper} />
    <path d="M-39-20H38L49-5V43H-43V-4Z" fill={second ? C.white : C.blue} />
    <path d="M-20-20L0-3L18-20" fill={C.white} />
    {second && <path d="M-42 23H45V42H-42Z" fill={C.coral} />}
    <path d="M-43-10H-28V35H-43Z" fill={second ? C.white : C.blue} />
    <rect x="-43" y="34" width="14" height="13" fill={C.paper} />
    <path d="M37-10L48-16L59 10L48 25L39 13Z" fill={second ? C.white : C.blue} />
    <rect x="48" y="-35" width="13" height="43" fill={C.paper} />
    <path
      d="M47-64H62V-51H57V-31H62V-18H47V-31H51V-51H47Z"
      fill={C.ink}
      stroke={C.white}
      strokeWidth={2}
    />
    <rect x="-34" y="43" width="27" height="43" fill={C.ink} />
    <rect x="8" y="43" width="27" height="43" fill={C.ink} />
    <rect x="-40" y="83" width="35" height="10" fill={C.ink} />
    <rect x="7" y="83" width="35" height="10" fill={C.ink} />
    <rect x="-17" y="-46" width="5" height="6" fill={C.ink} />
    <rect x="13" y="-46" width="5" height="6" fill={C.ink} />
    {second && (
      <path
        d="M-23-51H-6V-36H-23Z M6-51H23V-36H6Z M-6-44H6"
        fill="none"
        stroke={C.ink}
        strokeWidth={3}
      />
    )}
    <path d="M-8-29H8" stroke={C.ink} strokeWidth={3} />
  </g>
);

/** Fixed irregular edge, no random or frame-dependent noise. */
const stock = (w: number, h: number, seed = 0) => {
  const pts: number[][] = [];
  const n = 12;
  for (let i = 0; i <= n; i++)
    pts.push([-w / 2 + (w * i) / n, -h / 2 + ((((i * 7 + seed) % 5) - 2) * S.tear) / 3]);
  for (let i = 1; i <= n; i++)
    pts.push([w / 2 + ((((i * 3 + seed) % 5) - 2) * S.tear) / 3, -h / 2 + (h * i) / n]);
  for (let i = 1; i <= n; i++)
    pts.push([w / 2 - (w * i) / n, h / 2 + ((((i * 11 + seed) % 5) - 2) * S.tear) / 3]);
  for (let i = 1; i < n; i++)
    pts.push([-w / 2 + ((((i * 13 + seed) % 5) - 2) * S.tear) / 3, h / 2 - (h * i) / n]);
  return "M" + pts.map((p) => p.join(" ")).join("L") + "Z";
};
const cutCircle = (r: number) =>
  "M" +
  Array.from({ length: 48 }, (_, i) => {
    const a = (i * Math.PI) / 24;
    const d = r + ((((i * 7) % 5) - 2) * S.tear) / 4;
    return `${Math.cos(a) * d} ${Math.sin(a) * d}`;
  }).join("L") +
  "Z";
const CutWord = ({
  text,
  x,
  y,
  size,
  frame,
  start,
  stagger,
}: {
  text: string;
  x: number;
  y: number;
  size: number;
  frame: number;
  start: number;
  stagger: number;
}) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from(text).map((char, i) => {
      if (char === " " || frame < start + i * stagger) return null;
      const land = spring({ frame: frame - start - i * stagger, fps: 30, config: S.springs.stamp });
      const scale = mix(1.45, 1, land);
      const dark = i % 3 === 0,
        blue = i % 3 === 2;
      return (
        <g
          key={i}
          transform={`translate(${i * size * S.tileWidth} ${i % 2 === 0 ? 0 : size * 0.035}) rotate(${S.letterRotations[i % S.letterRotations.length]}) scale(${scale})`}
        >
          <path
            d={stock(size * S.tileWidth, size * S.tileHeight, i)}
            transform={`translate(${(size * S.tileWidth) / 2} ${(size * S.tileHeight) / 2})`}
            fill={blue ? C.blue : dark ? C.ink : C.white}
            stroke={C.white}
            strokeWidth={3}
          />
          <text
            x={(size * S.tileWidth) / 2}
            y={size * S.tileBaseline}
            textAnchor="middle"
            fontFamily={i % 2 === 0 ? S.fonts.serif : S.fonts.sans}
            fontSize={size}
            fontWeight={i % 2 === 0 ? 400 : 900}
            fill={dark || blue ? C.white : C.ink}
          >
            {char}
          </text>
        </g>
      );
    })}
  </g>
);

/** Editorial scale cuts on a persistent paper world, not a node-diagram transition. */
export const BoldOpening: React.FC<BoldOpeningProps> = (props) => {
  const { motion: t, layout: l } = { ...defaults, ...props };
  const f = useCurrentFrame();
  const q = Math.floor(f / l.poseFrames) * l.poseFrames;
  const p = (a: number, b: number) => progress(q, a, b);
  const sprung = (a: number, kind: keyof typeof S.springs) =>
    spring({ frame: Math.max(0, q - a), fps: 30, config: S.springs[kind] });
  const [fontHandle] = useState(() => delayRender("Load pinned collage fonts"));
  useEffect(() => {
    Promise.all(
      [
        new FontFace(S.fonts.sans, `url(${staticFile("fonts/inter.woff2")})`, {
          weight: "100 900",
        }),
        new FontFace(S.fonts.serif, `url(${staticFile("fonts/instrument-serif.woff2")})`),
      ].map((font) => font.load()),
    )
      .then((fonts) => {
        fonts.forEach((font) => document.fonts.add(font));
        continueRender(fontHandle);
      })
      .catch(cancelRender);
  }, [fontHandle]);
  const pair = f >= t.pairCut;
  const mechanism = f >= t.resolve;
  const firstMove = p(l.firstMove, l.firstDock);
  const secondMove = p(l.secondMove, l.secondDock);
  const paperTurn = p(t.paperTurn, t.paperRotated);
  const expansion = p(t.paperRotated, t.paperDock);
  const docking = p(t.shutterDock, t.assemblyEnd);
  const release = sprung(t.gateOpen, "latch");
  const travel = progress(f, t.travel, t.arrival);
  const pullback =
    l.anticipation *
    progress(f, t.anticipate, t.gateOpen) *
    (1 - progress(f, t.travel, t.travel + l.anticipationFrames));
  const foreground = p(t.foreground, t.foreground + l.foregroundFrames);
  const paperLand = sprung(t.paperBlock, "impact");
  const closed = Math.min(1, sprung(t.close, "impact"));
  const recoil = interpolate(
    q,
    l.recoilFrames.map((n) => t.paperImpact + n),
    [0, -l.recoil, l.recoil / 6, 0],
    clamp,
  );
  const paper = pair
    ? {
        x: mix(l.pairPaperX, l.mechanismX, expansion),
        y: mix(l.pairPaperY, l.upperY, expansion) - l.openingTravel * release,
        w: mix(l.pairPaperWidth, l.upperHeight, expansion),
        h: mix(l.pairPaperHeight, l.mechanismWidth, expansion),
        angle: mix(l.paperAngle, l.paperTurnAngle, paperTurn),
      }
    : {
        x: l.paperX,
        y: l.paperY - l.paperDrop * (1 - paperLand),
        w: l.paperWidth,
        h: l.paperHeight,
        angle: l.paperAngle,
      };
  const shutter = pair
    ? {
        x: mix(l.pairShutterX, l.mechanismX, docking),
        y: mix(l.pairShutterY, l.lowerY, docking) + l.openingTravel * release,
        w: mix(l.pairShutterWidth, l.mechanismWidth, docking),
        h: mix(l.pairShutterHeight, l.lowerHeight, docking),
      }
    : { x: l.shutterX, y: l.shutterY, w: l.shutterWidth, h: l.shutterHeight };
  const phone1 = pair
    ? {
        x: mix(l.pairDeskX, l.sourceX, firstMove),
        y: mix(l.pairDeskY, l.sourceY, firstMove),
        scale: mix(l.pairDeskScale, l.sourceScale, firstMove),
      }
    : { x: l.deskX, y: l.deskY, scale: l.deskScale };
  const phone2 = pair
    ? {
        x: mix(l.pairPhoneX, l.nightX, p(t.pairCut, t.phoneCross)),
        y: mix(l.pairPhoneY, l.nightY, p(l.phoneLower, l.phoneLowerEnd)),
        scale: mix(l.pairPhoneScale, l.nightScale, p(l.phoneLower, l.phoneLowerEnd)),
      }
    : { x: l.afterX, y: l.afterY, scale: l.afterScale };
  const clock = pair
    ? {
        x: mix(l.pairClockX, l.nightClockX, p(t.pairCut, l.clockAcrossEnd)),
        y: mix(
          mix(l.pairClockY, l.clockTransitY, p(t.pairCut, l.clockLiftEnd)),
          l.nightClockY,
          p(l.clockLower, l.clockLowerEnd),
        ),
        r: mix(l.pairClockRadius, l.nightClockRadius, p(t.pairCut, l.clockAcrossEnd)),
      }
    : { x: l.clockX, y: l.clockY, r: l.clockRadius };
  const first = pair
    ? {
        x: mix(l.pairFirstX, l.waitingX, firstMove),
        y: mix(l.pairY, l.routeY, firstMove),
        r: mix(l.pairRadius, l.callerRadius, firstMove),
      }
    : {
        x: mix(
          mix(l.deskX, l.firstStop, p(t.ring, t.paperImpact)) + recoil,
          l.foregroundX,
          foreground,
        ),
        y: mix(l.firstY, l.foregroundY, foreground),
        r: l.callerRadius * mix(1, l.foregroundScale, foreground),
      };
  const second = pair
    ? {
        x: mix(l.pairSecondX, l.waitingX, secondMove),
        y: mix(l.pairY, l.waitingY, secondMove),
        r: mix(l.pairRadius, l.callerRadius, secondMove),
      }
    : {
        x: mix(l.afterX, l.secondStop, p(t.secondCall, t.secondCall + l.approachFrames)),
        y: l.secondY,
        r: l.callerRadius,
      };
  const callerX = mix(first.x - pullback, l.destinationX, travel);
  const resolved = f >= t.arrival;
  const ring = pair ? 0 : interpolate(q, l.ringFrames, l.ringAngles, clamp);
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const route = {
    fill: "none",
    stroke: C.coral,
    strokeWidth: S.routeStroke,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
  };
  return (
    <AbsoluteFill style={{ background: C.blue, fontFamily: S.fonts.sans, overflow: "hidden" }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute" }}>
        <defs>
          <pattern id="collage-grid" width={S.grid} height={S.grid} patternUnits="userSpaceOnUse">
            <path d={`M${S.grid} 0H0V${S.grid}`} fill="none" stroke={C.blue} strokeWidth="1.5" />
          </pattern>
          <pattern
            id="collage-major"
            width={S.majorGrid}
            height={S.majorGrid}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M${S.majorGrid} 0H0V${S.majorGrid}`}
              fill="none"
              stroke={C.ink}
              strokeWidth="1.3"
            />
          </pattern>
          <pattern id="collage-dots" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" fill={C.ink} />
            <circle cx="9" cy="10" r=".7" fill={C.ink} />
          </pattern>
          <clipPath id="collage-shutter">
            <path d={stock(shutter.w, shutter.h, 2)} />
          </clipPath>
        </defs>
        {!mechanism && (
          <g>
            <path d={stock(1830, 950, 1)} transform="translate(960 525)" fill={C.white} />
            <rect
              x="45"
              y="50"
              width="1830"
              height="950"
              fill="url(#collage-grid)"
              opacity={S.gridOpacity}
            />
            <rect
              x="45"
              y="50"
              width="1830"
              height="950"
              fill="url(#collage-major)"
              opacity={S.gridOpacity}
            />
            <rect
              x="45"
              y="50"
              width="1830"
              height="950"
              fill="url(#collage-dots)"
              opacity={S.grainOpacity}
            />

            {!pair && (
              <path
                d="M1000 0L1015 64L994 112L1008 190L991 255L1006 330L993 410L1008 490L993 565L1006 635L993 715L1008 800L996 880L1007 990L995 1080H1920V0Z"
                fill={C.ink}
              />
            )}
          </g>
        )}
        {mechanism && (
          <>
            <rect width="1920" height="1080" fill={C.blue} />
            <rect width="1920" height="1080" fill="url(#collage-dots)" opacity={S.grainOpacity} />
          </>
        )}
        <g
          transform={
            mechanism
              ? `translate(${l.cameraX} ${l.cameraY}) translate(${l.cameraOriginX} ${l.cameraOriginY}) scale(${l.cameraScale}) translate(${-l.cameraOriginX} ${-l.cameraOriginY})`
              : undefined
          }
        >
          {!pair && (
            <>
              <CutWord
                text={l.busyText}
                x={l.busyX}
                y={l.busyY}
                size={l.busySize}
                frame={q}
                start={0}
                stagger={l.textStagger}
              />
              <CutWord
                text={l.afterText}
                x={l.afterTextX}
                y={l.afterTextY}
                size={l.afterSize}
                frame={q}
                start={l.afterTextDelay}
                stagger={l.textStagger}
              />
            </>
          )}
          <path
            d={`M${phone1.x} ${phone1.y + 115 * phone1.scale}V${first.y}H${pair ? l.waitingX : first.x}`}
            {...route}
          />
          <path
            d={`M${phone2.x} ${phone2.y + 70 * phone2.scale}V${second.y}H${pair ? l.waitingX : second.x}`}
            {...route}
          />
          {f >= t.gateOpen && (
            <path
              d={`M${l.waitingX} ${l.routeY}H${mix(l.waitingX, l.destinationX, p(t.gateOpen, t.gateOpen + l.routeRevealFrames))}`}
              stroke={C.white}
              strokeWidth={S.routeStroke}
              fill="none"
            />
          )}
          <g
            transform={`translate(${phone1.x} ${phone1.y}) rotate(${ring}) scale(${phone1.scale})`}
          >
            <path
              d={stock(328, 252, 3)}
              transform={`translate(${S.offset} ${S.offset})`}
              fill={C.coral}
            />
            <path d={stock(328, 252, 3)} fill={C.blue} stroke={C.white} strokeWidth={S.keyline} />
            <path d={stock(328, 252, 3)} fill="url(#collage-dots)" opacity={S.grainOpacity} />
            <Handset scale={1.18} fill={C.white} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={-77 + 65 * i} y="82" width="32" height="18" fill={C.white} />
            ))}
          </g>
          <g transform={`translate(${phone2.x} ${phone2.y}) scale(${phone2.scale})`}>
            <Handset scale={1.4} fill={C.blue} keyline={S.keyline} />
          </g>
          <g transform={`translate(${paper.x} ${paper.y}) rotate(${paper.angle})`}>
            <path
              d={stock(paper.w, paper.h, 1)}
              transform={`translate(${-l.paperStackOffset} ${-l.paperStackOffset}) rotate(2)`}
              fill={C.ink}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <path
              d={stock(paper.w, paper.h, 2)}
              transform={`translate(${S.offset} ${S.offset})`}
              fill={C.coral}
            />
            <path
              d={stock(paper.w, paper.h, 0)}
              fill={C.white}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <path
              d={stock(paper.w, paper.h, 0)}
              fill="url(#collage-grid)"
              opacity={S.gridOpacity}
            />
            <path d={stock(paper.w, paper.h, 0)} fill="none" stroke={C.ink} strokeWidth={2} />
            {Array.from({ length: l.paperPrintCount }, (_, i) => (
              <path
                key={i}
                d={`M${-paper.w * 0.32} ${-paper.h * 0.31 + i * paper.h * 0.13}H${paper.w * (i % 2 === 0 ? 0.3 : 0.13)}`}
                stroke={C.ink}
                strokeWidth={S.printStroke}
                opacity={mechanism ? 0.2 : 1}
              />
            ))}
            <rect
              x={-paper.w * 0.32}
              y={paper.h * 0.34}
              width={paper.w * 0.44}
              height="28"
              fill={C.blue}
            />
          </g>
          <g transform={`translate(${shutter.x} ${shutter.y})`}>
            <path
              d={stock(shutter.w, shutter.h, 2)}
              transform={`translate(${S.offset} ${S.offset})`}
              fill={C.coral}
            />
            <path
              d={stock(shutter.w, shutter.h, 2)}
              fill={C.white}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <g clipPath="url(#collage-shutter)">
              <g transform={`translate(0 ${-shutter.h * (1 - closed)})`}>
                <rect
                  x={-shutter.w / 2}
                  y={-shutter.h / 2}
                  width={shutter.w}
                  height={shutter.h}
                  fill={C.ink}
                />
                {Array.from({ length: l.slatCount }, (_, i) => (
                  <rect
                    key={i}
                    x={-shutter.w / 2}
                    y={-shutter.h / 2 + (i * shutter.h) / l.slatCount + 4}
                    width={shutter.w}
                    height={shutter.h / l.slatCount - 9}
                    fill={i % 2 === 0 ? C.paper : C.muted}
                  />
                ))}
                <rect
                  x={-C.shutterHandleWidth / 2}
                  y={shutter.h / 2 - C.shutterHandleInset}
                  width={C.shutterHandleWidth}
                  height={C.shutterHandleHeight}
                  fill={C.ink}
                />
                <rect
                  x={-shutter.w / 2}
                  y={-shutter.h / 2}
                  width={shutter.w}
                  height={shutter.h}
                  fill="url(#collage-dots)"
                  opacity={S.grainOpacity}
                />
              </g>
            </g>
          </g>
          {pair && f < t.typeTakeover && (
            <CutWord
              text={l.nextText}
              x={l.nextX}
              y={l.nextY}
              size={l.nextSize}
              frame={q}
              start={t.pairCut}
              stagger={l.textStagger}
            />
          )}
          {/* Clock stays a foreground cutout: recognisable even while it crosses the paper. */}
          <g transform={`translate(${clock.x} ${clock.y}) scale(${clock.r / l.clockRadius})`}>
            <path
              d={cutCircle(l.clockRadius)}
              fill={C.white}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <path
              d={cutCircle(l.clockRadius)}
              fill="none"
              stroke={C.ink}
              strokeWidth={C.clockStroke / 2}
            />
            <path
              d="M0-75V-65 M75 0H65 M0 75V65 M-75 0H-65"
              stroke={C.ink}
              strokeWidth={C.clockStroke}
            />
            <path
              d="M0 0V-55"
              stroke={C.blue}
              strokeWidth={C.clockHandStroke}
              strokeLinecap="square"
              transform={`rotate(${mix(-50, 95, closed)})`}
            />
            <path d="M0 0H35" stroke={C.ink} strokeWidth={C.clockHandStroke} />
            <circle r="8" fill={C.ink} />
          </g>
          {mechanism && (
            <g transform={`translate(0 ${-l.openingTravel * release})`}>
              <CutWord
                text={l.agreedText}
                x={l.agreedX}
                y={l.agreedY}
                size={l.agreedSize}
                frame={q}
                start={t.resolve}
                stagger={l.textStagger}
              />
            </g>
          )}
          <g
            transform={`translate(${callerX} ${first.y}) scale(${Math.min(1, sprung(t.ring, "stamp"))})`}
          >
            <path
              d={cutCircle(first.r)}
              transform={`translate(${S.offset} ${S.offset})`}
              fill={C.ink}
            />
            <path
              d={cutCircle(first.r)}
              fill={resolved ? C.green : C.coral}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <path d={cutCircle(first.r)} fill="url(#collage-dots)" opacity={S.grainOpacity} />
            <CallerPerson radius={first.r} />
          </g>
          <g
            transform={`translate(${second.x} ${second.y}) scale(${Math.min(1, sprung(t.secondCall, "stamp"))})`}
          >
            <path
              d={stock(second.r * 2, second.r * 2, 4)}
              transform={`translate(${S.offset} ${S.offset})`}
              fill={C.ink}
            />
            <path
              d={stock(second.r * 2, second.r * 2, 4)}
              fill={C.coral}
              stroke={C.white}
              strokeWidth={S.keyline}
            />
            <path
              d={stock(second.r * 2, second.r * 2, 4)}
              fill="url(#collage-dots)"
              opacity={S.grainOpacity}
            />
            <CallerPerson radius={second.r} second />
          </g>
          {mechanism && (
            <circle
              cx={l.destinationX}
              cy={l.routeY}
              r={l.endpointRadius + l.endpointSettle * (1 - progress(f, t.arrival, t.hold))}
              fill="none"
              stroke={resolved ? C.green : C.white}
              strokeWidth={C.endpointStroke}
            />
          )}
        </g>
      </svg>
      {mechanism && (
        <div
          style={{
            position: "absolute",
            left: l.markX,
            top: l.markY,
            width: l.markWidth,
            height: l.markHeight,
          }}
        >
          <Img src={staticFile("brand.svg")} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      {cue && (
        <div
          style={{
            position: "absolute",
            left: S.captionInset,
            right: S.captionInset,
            bottom: S.captionBottom,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: C.ink,
              color: C.white,
              padding: S.captionPadding,
              borderRadius: S.captionRadius,
              fontSize: S.captionSize,
              fontWeight: 570,
              lineHeight: 1.17,
              textAlign: "center",
              maxWidth: C.captionWidth,
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
