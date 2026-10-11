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
const S = system.openingRebuild;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const progress = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const handset =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset = ({ scale = 1, fill = C.ink }: { scale?: number; fill?: string }) => (
  <path d={handset} fill={fill} transform={`translate(20 -28) rotate(-35) scale(${scale})`} />
);

/** One connected stage; objects keep their SVG identity through every transformation. */
export const BoldOpening: React.FC<BoldOpeningProps> = (props) => {
  const { motion: t, layout: l } = { ...defaults, ...props };
  const f = useCurrentFrame();
  const [fontHandle] = useState(() => delayRender("Load pinned local Inter"));
  useEffect(() => {
    const font = new FontFace("FlowInter", `url(${staticFile("fonts/inter.woff2")})`, {
      weight: "100 900",
    });
    font
      .load()
      .then((loaded) => {
        document.fonts.add(loaded);
        continueRender(fontHandle);
      })
      .catch(cancelRender);
  }, [fontHandle]);
  const p = (a: number, b: number) => progress(f, a, b);
  const sprung = (start: number, kind: keyof typeof S.springs) =>
    spring({ frame: Math.max(0, f - start), fps: 30, config: S.springs[kind] });
  const paperTurn = p(t.paperTurn, t.paperDock);
  const paperBack = p(t.gather, t.paperTurn);
  const paperRotation = p(t.paperTurn, t.paperTurn + l.paperRotateFrames);
  const paperExpansion = p(t.paperTurn + l.paperRotateFrames, t.paperDock);
  const firstGather = p(t.paperDock, t.shutterDock);
  const lift = p(t.shutterLift, t.queueMove);
  const shutterVertical = p(t.shutterLift, t.shutterLift + l.shutterVerticalFrames);
  const shutterAcross = p(t.shutterLift + l.shutterVerticalFrames, t.queueMove);
  const queueMove = p(t.queueMove, t.queueDock);
  const shutterDock = p(t.shutterDock, t.assemblyEnd);
  const reveal = p(t.resolve, t.resolve + l.resolveFrames);
  const release = sprung(t.gateOpen, "latch");
  const travel = p(t.gateOpen + l.travelDelay, t.arrival);
  const pullback =
    l.anticipation *
    p(t.gateOpen - l.anticipationFrames, t.gateOpen) *
    (1 - p(t.gateOpen + l.travelDelay, t.gateOpen + l.travelDelay + l.anticipationFrames));
  const ring = interpolate(f, t.ringPoseFrames, l.ringAngles, clamp) * (1 - firstGather);
  const paperLand = sprung(t.paperBlock, "paper");
  const closed = Math.min(1, sprung(t.close, "shutter"));
  const paper = {
    x: mix(l.paperX, l.mechanismX, paperTurn),
    y:
      mix(l.paperY - l.paperDrop * (1 - paperLand), l.paperDockY, paperTurn) -
      l.openingTravel * release,
    w: mix(l.paperWidth, l.boundaryHeight, paperTurn),
    h: mix(l.paperHeight, l.mechanismWidth, paperExpansion),
    angle: mix(
      mix(l.paperAngle, l.paperAnticipationAngle, paperBack),
      l.paperTurnAngle,
      paperRotation,
    ),
  };
  const shutter = {
    x: mix(mix(l.shutterX, l.shutterLiftX, shutterAcross), l.mechanismX, shutterDock),
    y:
      mix(mix(l.shutterY, l.shutterLiftY, shutterVertical), l.shutterDockY, shutterDock) +
      l.openingTravel * release,
    w: mix(mix(l.shutterWidth, l.shutterLiftWidth, shutterVertical), l.mechanismWidth, shutterDock),
    h: mix(
      mix(l.shutterHeight, l.shutterLiftHeight, shutterVertical),
      l.boundaryHeight,
      shutterDock,
    ),
  };
  const phone1 = {
    x: mix(l.deskX, l.sourceX, firstGather),
    y: mix(l.deskY, l.sourceTopY, firstGather),
    scale: mix(l.deskScale, l.originScale, firstGather),
  };
  const phone2 = {
    x: mix(l.afterX, l.sourceX, queueMove),
    y: mix(mix(l.afterY, l.phoneTransitY, lift), l.sourceBottomY, p(t.queueDock, t.assemblyEnd)),
    scale: mix(
      mix(l.afterScale, l.phoneTransitScale, lift),
      l.originScale,
      p(t.queueDock, t.assemblyEnd),
    ),
  };
  const firstImpact = interpolate(
    f,
    l.impactFrames.map((offset) => l.paperImpactFrame + offset),
    [0, -l.collisionRecoil, l.collisionRecoil / 5, 0],
    clamp,
  );
  const firstX = mix(
    mix(
      mix(l.deskX, l.firstStopX, p(t.ring, l.paperImpactFrame)) + firstImpact,
      l.firstStopX - l.collisionRecoil,
      p(t.gather, t.paperTurn),
    ),
    l.waitingX,
    firstGather,
  );
  const firstY = mix(l.routeInitialY, l.routeY, firstGather);
  const secondX = mix(
    mix(l.afterX, l.secondStopX, p(t.secondCall, t.secondCall + l.secondApproachFrames)),
    l.queuedX,
    queueMove,
  );
  const secondY = mix(
    mix(l.routeInitialY, l.queueTransitY, lift),
    l.queueY,
    p(t.queueDrop, t.queueDrop + l.queueLowerFrames),
  );
  const call1X = mix(firstX - pullback, l.destinationX, travel);
  const resolved = f >= t.arrival;
  const settle = 1 - p(t.arrival, t.arrival + l.arrivalSettleFrames);
  const clock = {
    x: mix(mix(l.clockX, l.clockLiftX, lift), l.clockDockX, queueMove),
    y: mix(
      mix(l.clockY, l.clockLiftY, lift),
      l.clockDockY,
      p(t.queueDock, t.queueDock + l.clockLowerFrames),
    ),
    r: mix(l.clockRadius, l.clockDockRadius, lift),
  };
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const line = {
    fill: "none",
    stroke: C.coral,
    strokeWidth: S.routeStroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const mechanismLeft = l.mechanismX - l.mechanismWidth / 2;
  return (
    <AbsoluteFill
      style={{ background: C.white, fontFamily: system.fonts.sans, overflow: "hidden" }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="opening-shutter">
            <rect
              x={-shutter.w / 2 + S.border / 2}
              y={-shutter.h / 2 + S.border / 2}
              width={shutter.w - S.border}
              height={shutter.h - S.border}
              rx={S.corner}
            />
          </clipPath>
        </defs>
        <rect
          x={mix(l.splitX, 0, p(t.paperTurn, t.queueDock))}
          width={1920}
          height={1080}
          fill={C.ink}
        />
        <g
          opacity={1 - p(t.gather - l.headingExitFrames, t.gather)}
          fontSize={S.headingSize}
          fontWeight="800"
        >
          <text x={l.headingLeftX} y={l.headingY} fill={C.ink}>
            {l.headingLeft}
          </text>
          <text x={l.headingRightX} y={l.headingY} fill={C.white}>
            {l.headingRight}
          </text>
        </g>
        <path
          d={`M${phone1.x} ${phone1.y + 115 * phone1.scale}V${firstY}H${mix(l.paperX - l.paperWidth / 2, mechanismLeft, firstGather)}`}
          {...line}
        />
        <path
          d={`M${phone2.x} ${phone2.y + 70 * phone2.scale}V${secondY}H${mix(l.shutterX + l.shutterWidth / 2, mechanismLeft, queueMove)}`}
          {...line}
        />
        <path
          d={`M${mechanismLeft} ${l.routeY}H${l.destinationX}`}
          fill="none"
          stroke={C.white}
          strokeWidth={S.routeStroke}
          opacity={release * reveal}
        />
        <g transform={`translate(${phone1.x} ${phone1.y}) rotate(${ring}) scale(${phone1.scale})`}>
          <rect x="-164" y="-126" width="328" height="252" rx={C.objectRadius} fill={C.blue} />
          <Handset scale={1.18} fill={C.white} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-77 + 65 * i} y="82" width="32" height="18" rx="5" fill={C.white} />
          ))}
        </g>
        <g transform={`translate(${phone2.x} ${phone2.y}) scale(${phone2.scale})`}>
          <Handset scale={1.4} fill={C.blue} />
        </g>
        <g transform={`translate(${clock.x} ${clock.y}) scale(${clock.r / l.clockRadius})`}>
          <circle r={l.clockRadius} fill={C.white} stroke={C.ink} strokeWidth={C.clockStroke} />
          <path
            d="M0-82V-70 M82 0H70 M0 82V70 M-82 0H-70"
            stroke={C.ink}
            strokeWidth={C.clockStroke}
          />
          <path
            d="M0 0V-65"
            fill="none"
            stroke={C.blue}
            strokeWidth={C.clockHandStroke}
            strokeLinecap="round"
            transform={`rotate(${mix(-50, 95, closed)})`}
          />
          <path d="M0 0H40" stroke={C.ink} strokeWidth={C.clockHandStroke} strokeLinecap="round" />
          <circle r="10" fill={C.ink} />
        </g>
        {/* The foreground paper turns bodily, then becomes the full-width upper jaw. */}
        <g transform={`translate(${paper.x} ${paper.y}) rotate(${paper.angle})`}>
          <rect
            x={-paper.w / 2 - l.paperStackOffset}
            y={-paper.h / 2 - l.paperStackOffset}
            width={paper.w}
            height={paper.h}
            rx={S.corner}
            fill={C.ink}
          />
          <rect
            x={-paper.w / 2}
            y={-paper.h / 2}
            width={paper.w}
            height={paper.h}
            rx={S.corner}
            fill={C.paper}
            stroke={C.blue}
            strokeWidth={mix(C.paperStroke, S.border, reveal)}
          />
          {Array.from({ length: l.paperPrintCount }, (_, i) => (
            <path
              key={i}
              d={`M${-paper.w * 0.31} ${-paper.h * 0.3 + i * paper.h * 0.16}H${paper.w * (i % 2 === 0 ? 0.26 : 0.13)}`}
              stroke={C.ink}
              strokeWidth={S.paperPrintStroke}
            />
          ))}
          <rect
            x={-paper.w * 0.31}
            y={paper.h * 0.34}
            width={paper.w * 0.43}
            height={C.paperTabHeight}
            rx="5"
            fill={C.blue}
          />
        </g>
        {/* The lifted shutter waits until the second caller is safely outside its docking sweep. */}
        <g transform={`translate(${shutter.x} ${shutter.y})`}>
          <rect
            x={-shutter.w / 2}
            y={-shutter.h / 2}
            width={shutter.w}
            height={shutter.h}
            rx={S.corner}
            fill={C.white}
            stroke={f < t.gather ? C.white : C.blue}
            strokeWidth={mix(C.paperStroke, S.border, reveal)}
          />
          <g clipPath="url(#opening-shutter)">
            <g transform={`translate(0 ${-shutter.h * (1 - closed)})`}>
              <rect
                x={-shutter.w / 2}
                y={-shutter.h / 2}
                width={shutter.w}
                height={shutter.h}
                fill={C.muted}
              />
              {Array.from({ length: l.slatCount }, (_, i) => (
                <path
                  key={i}
                  d={`M${-shutter.w / 2} ${-shutter.h / 2 + ((i + 0.5) * shutter.h) / l.slatCount}H${shutter.w / 2}`}
                  stroke={C.ink}
                  strokeWidth={C.slatStroke}
                />
              ))}
              <rect
                x={-C.shutterHandleWidth / 2}
                y={shutter.h / 2 - C.shutterHandleInset}
                width={C.shutterHandleWidth}
                height={C.shutterHandleHeight}
                rx="5"
                fill={C.ink}
              />
            </g>
          </g>
        </g>
        <g
          transform={`translate(${call1X} ${firstY}) scale(${Math.min(1, sprung(t.ring, "caller"))})`}
        >
          <circle r={l.callRadius} fill={resolved ? C.green : C.coral} />
          <Handset scale={l.callerIconScale} />
        </g>
        <g
          transform={`translate(${secondX} ${secondY}) scale(${Math.min(1, sprung(t.secondCall, "caller"))})`}
        >
          <rect
            x={-l.callRadius}
            y={-l.callRadius}
            width={2 * l.callRadius}
            height={2 * l.callRadius}
            rx={C.waitingCorner}
            fill={C.coral}
          />
          <Handset scale={l.callerIconScale} />
        </g>
        <circle
          cx={l.destinationX}
          cy={l.routeY}
          r={l.callRadius + l.endpointGap + l.endpointSettleDistance * settle}
          fill="none"
          stroke={resolved ? C.green : C.white}
          strokeWidth={S.endpointStroke}
          opacity={reveal}
        />
        <g transform={`translate(0 ${-l.labelTravel * (1 - sprung(t.resolve, "paper"))})`}>
          <text
            x={l.mechanismX}
            y={l.labelY}
            textAnchor="middle"
            fontSize={S.labelSize}
            fontWeight="750"
            fill={C.white}
          >
            {l.workflowLabel}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: l.markX,
          top: l.markY,
          width: l.markWidth,
          height: l.markHeight,
          transform: `translateY(${-l.markTravel * (1 - sprung(t.resolve + l.markDelay, "paper"))}px)`,
        }}
      >
        <Img src={staticFile("brand.svg")} style={{ width: "100%", height: "100%" }} />
      </div>
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
