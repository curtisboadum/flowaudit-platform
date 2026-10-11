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
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
const handset =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = C.ink,
}: {
  x?: number;
  y?: number;
  scale?: number;
  fill?: string;
}) => (
  <path d={handset} fill={fill} transform={`translate(${x} ${y}) rotate(-35) scale(${scale})`} />
);

/** Every pose is a function of the absolute composition frame. Objects never swap identities. */
export const BoldOpening: React.FC<BoldOpeningProps> = (props) => {
  const { motion: t, layout: l } = { ...defaults, ...props };
  const f = useCurrentFrame();
  const [fontHandle] = useState(() => delayRender("Load the pinned local Inter font"));
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
  const weight = (start: number) =>
    spring({ frame: Math.max(0, f - start), fps: 30, config: C.springs.weight });
  const snap = (start: number) =>
    spring({ frame: Math.max(0, f - start), fps: 30, config: C.springs.snap });
  const gather = ease(f, t.gather, t.gather + l.gatherFrames);
  const paperGather = ease(f, t.gather, t.gather + l.gatherFrames - l.gatherStagger);
  const shutterGather = ease(f, t.gather + l.gatherStagger, t.gather + l.gatherFrames);
  const resolve = ease(f, t.resolve, t.resolve + l.resolveFrames);
  const open = weight(t.gateOpen);
  const travel = ease(f, t.gateOpen + l.travelDelay, t.arrival);
  const anticipation =
    l.anticipation *
    ease(f, t.gateOpen - l.anticipationFrames, t.gateOpen) *
    (1 - ease(f, t.gateOpen + l.travelDelay, t.gateOpen + l.travelDelay + l.anticipationFrames));
  const firstEntry = Math.min(1, snap(t.ring));
  const secondEntry = Math.min(1, snap(t.secondCall));
  const firstApproach = ease(f, t.ring, t.paperBlock + l.approachFrames);
  const secondApproach = ease(f, t.secondCall, t.secondCall + l.approachFrames);
  const paperLand = weight(t.paperBlock);
  const shutterClose = Math.min(1, weight(t.close));
  const ring = interpolate(f, t.ringPoseFrames, l.ringAngles, clamp);
  const impact = interpolate(
    f,
    [t.paperBlock + 10, t.paperBlock + 14, t.paperBlock + 20, t.paperBlock + 28],
    [0, -l.impactRecoil, l.impactRecoil / 4, 0],
    clamp,
  );
  const routeY = mix(l.initialRouteY, l.routeY, gather);
  const phone1 = {
    x: l.sourceX,
    y: mix(l.deskY, l.sourceTopY, gather),
    scale: mix(1, l.originScale, gather),
  };
  const paper = {
    x: mix(l.paperX, l.mechanismX, paperGather),
    y:
      mix(
        l.paperY - l.dropDistance * (1 - paperLand),
        l.routeY - l.boundaryHeight / 2,
        paperGather,
      ) -
      l.openingTravel * open,
    w: mix(l.paperWidth, l.mechanismWidth, paperGather),
    h: mix(l.paperHeight, l.boundaryHeight, paperGather),
  };
  const shutterLift = ease(f, t.gather, t.gather + l.shutterLiftFrames);
  const shutterDock = ease(f, t.gather + l.shutterDockDelay, t.gather + l.gatherFrames);
  const queueMove = ease(
    f,
    t.gather + l.queueMoveDelay,
    t.gather + l.queueMoveDelay + l.queueMoveFrames,
  );
  const phone2 = {
    x: mix(l.afterSourceX, l.sourceX, queueMove),
    y: mix(mix(l.afterY, l.originTravelY, shutterLift), l.sourceBottomY, shutterDock),
    scale: mix(1, l.originScale, shutterLift),
  };
  const shutter = {
    x: mix(l.shutterX, l.mechanismX, shutterGather),
    y:
      mix(
        mix(l.shutterY, l.shutterLiftY, shutterLift),
        l.routeY + l.boundaryHeight / 2,
        shutterDock,
      ) +
      l.openingTravel * open,
    w: mix(l.shutterWidth, l.mechanismWidth, shutterDock),
    h: mix(mix(l.shutterHeight, l.shutterLiftHeight, shutterLift), l.boundaryHeight, shutterDock),
  };
  const first = {
    x: mix(
      mix(l.sourceX, l.paperX - l.paperWidth / 2 - l.callRadius - l.collisionGap, firstApproach) +
        impact,
      l.waitingX,
      gather,
    ),
    y: routeY,
  };
  const second = {
    x: mix(
      mix(
        l.afterSourceX,
        l.shutterX + l.shutterWidth / 2 + l.callRadius + l.collisionGap,
        secondApproach,
      ),
      l.queuedX,
      queueMove,
    ),
    y: mix(l.initialRouteY, l.queueY, shutterLift),
  };
  const firstX = mix(first.x - anticipation, l.destinationX, travel);
  const end = ease(f, t.arrival, t.arrival + l.endpointSettleFrames);
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const clockX = mix(l.clockX, l.originClockX, queueMove);
  const clockY = mix(mix(l.clockY, l.clockTravelY, shutterLift), l.originClockY, shutterDock);
  const clockR = mix(l.clockRadius, l.originClockRadius, shutterLift);
  const firstRoute = `M${phone1.x} ${phone1.y + 95 * phone1.scale} V${routeY} H${mix(l.paperX - l.paperWidth / 2, l.mechanismX - l.mechanismWidth / 2, gather)}`;
  const secondRoute = `M${phone2.x} ${phone2.y + 70 * phone2.scale} V${second.y} H${mix(l.shutterX + l.shutterWidth / 2, l.mechanismX - l.mechanismWidth / 2, gather)}`;
  const routeStyle = {
    fill: "none",
    stroke: C.coral,
    strokeWidth: C.openingRouteWidth,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  };
  return (
    <AbsoluteFill
      style={{ background: C.white, fontFamily: system.fonts.sans, overflow: "hidden" }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="opening-shutter">
            <rect
              x={-shutter.w / 2 + C.boundaryStroke}
              y={-shutter.h / 2 + C.boundaryStroke}
              width={shutter.w - C.boundaryStroke * 2}
              height={shutter.h - C.boundaryStroke * 2}
              rx={C.objectRadius / 2}
            />
          </clipPath>
        </defs>
        {/* The night field recedes; it is not substituted for the original obstructions. */}
        <rect x={mix(960, 1920, gather)} width={960} height={1080} fill={C.ink} />
        <g opacity={1 - ease(f, t.gather - l.headingExitFrames, t.gather)}>
          <text x="80" y="118" fontSize={C.openingHeadingSize} fontWeight="750" fill={C.ink}>
            BUSY DESK
          </text>
          <text x="1030" y="118" fontSize={C.openingHeadingSize} fontWeight="750" fill={C.white}>
            AFTER HOURS
          </text>
        </g>
        <path d={firstRoute} {...routeStyle} />
        <path d={secondRoute} {...routeStyle} />
        {/* A single approved corridor, revealed only as the real boundaries separate. */}
        <path
          d={`M${l.mechanismX - l.mechanismWidth / 2} ${l.routeY} H${l.destinationX}`}
          fill="none"
          stroke={C.blue}
          strokeWidth={C.openingRouteWidth}
          opacity={open * resolve}
        />
        <g
          transform={`translate(${phone1.x} ${phone1.y}) rotate(${ring * (1 - gather)}) scale(${phone1.scale})`}
        >
          <rect x="-170" y="-130" width="340" height="260" rx={C.objectRadius} fill={C.blue} />
          <Handset x={20} y={-28} scale={1.18} fill={C.white} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-75 + 65 * i} y="80" width="32" height="18" rx="5" fill={C.white} />
          ))}
        </g>
        <g transform={`translate(${phone2.x} ${phone2.y}) scale(${phone2.scale})`}>
          <Handset x={20} y={-28} scale={1.18} fill={C.blue} />
        </g>
        <g transform={`translate(${clockX} ${clockY}) scale(${clockR / l.clockRadius})`}>
          <circle r={l.clockRadius} fill={C.white} stroke={C.ink} strokeWidth={C.clockStroke} />
          <path
            d="M0-82V-70 M82 0H70 M0 82V70 M-82 0H-70"
            stroke={C.ink}
            strokeWidth={C.clockStroke}
          />
          <path
            d="M0 0V-65"
            stroke={C.blue}
            strokeWidth={C.clockHandStroke}
            strokeLinecap="round"
            transform={`rotate(${mix(-50, 95, shutterClose)})`}
          />
          <path d="M0 0H40" stroke={C.ink} strokeWidth={C.clockHandStroke} strokeLinecap="round" />
          <circle r="10" fill={C.ink} />
        </g>
        {/* The paper itself stretches into the upper boundary. Printed marks stay attached. */}
        <g
          transform={`translate(${paper.x} ${paper.y}) rotate(${mix(l.paperAngle, 0, paperGather)})`}
        >
          <g
            transform={`translate(${-l.paperStackOffset * (1 - paperGather)} ${-l.paperStackOffset * (1 - paperGather)}) rotate(${l.paperStackAngle * (1 - paperGather)})`}
          >
            <rect
              x={-paper.w / 2}
              y={-paper.h / 2}
              width={paper.w}
              height={paper.h}
              rx={C.objectRadius / 2}
              fill={C.ink}
            />
          </g>
          <rect
            x={-paper.w / 2}
            y={-paper.h / 2}
            width={paper.w}
            height={paper.h}
            rx={C.objectRadius / 2}
            fill={C.paper}
            stroke={C.blue}
            strokeWidth={mix(C.paperStroke, C.boundaryStroke, resolve)}
          />
          <path
            d={`M${-paper.w * 0.3} ${-paper.h * 0.29}H${paper.w * 0.25} M${-paper.w * 0.3} ${-paper.h * 0.08}H${paper.w * 0.3} M${-paper.w * 0.3} ${paper.h * 0.13}H${paper.w * 0.05}`}
            stroke={C.ink}
            strokeWidth={C.paperPrintStroke}
          />
          <rect
            x={-paper.w * 0.3}
            y={paper.h * 0.3}
            width={paper.w * 0.38}
            height={C.paperTabHeight}
            rx="5"
            fill={C.blue}
          />
        </g>
        {/* The original slats become the lower boundary, and never retract out of view. */}
        <g transform={`translate(${shutter.x} ${shutter.y})`}>
          <rect
            x={-shutter.w / 2}
            y={-shutter.h / 2}
            width={shutter.w}
            height={shutter.h}
            rx={C.objectRadius / 2}
            fill={C.white}
            stroke={gather < 0.5 ? C.white : C.blue}
            strokeWidth={mix(C.paperStroke, C.boundaryStroke, resolve)}
          />
          <g clipPath="url(#opening-shutter)">
            <g transform={`translate(0 ${-shutter.h * (1 - shutterClose)})`}>
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
        {/* Circle and square are durable identities, not transient state decorations. */}
        <g transform={`translate(${firstX} ${first.y}) scale(${firstEntry})`}>
          <circle r={l.callRadius} fill={travel >= 1 ? C.green : C.coral} />
          <Handset x={4} y={-8} scale={l.callerIconScale} />
        </g>
        <g transform={`translate(${second.x} ${second.y}) scale(${secondEntry})`}>
          <rect
            x={-l.callRadius}
            y={-l.callRadius}
            width={l.callRadius * 2}
            height={l.callRadius * 2}
            rx={C.waitingCorner}
            fill={C.coral}
          />
          <Handset x={4} y={-8} scale={l.callerIconScale} />
        </g>
        <circle
          cx={l.destinationX}
          cy={l.routeY}
          r={mix(l.callRadius + l.endpointInset, l.callRadius + l.endpointGap, end)}
          fill="none"
          stroke={travel >= 1 ? C.green : C.blue}
          strokeWidth={C.endpointStroke}
          opacity={resolve}
        />
        <g transform={`translate(0 ${-l.labelTravel * (1 - snap(t.resolve))})`}>
          <text
            x={l.mechanismX}
            y={l.labelY}
            textAnchor="middle"
            fontSize={C.openingWorkflowSize}
            fontWeight="650"
            fill={C.blue}
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
          transform: `translateY(${-l.markTravel * (1 - snap(t.resolve + l.markDelay))}px)`,
        }}
      >
        <Img src={staticFile("brand.svg")} style={{ width: "100%", height: "100%" }} />
      </div>
      {cue && (
        <div
          style={{
            position: "absolute",
            left: C.captionInset,
            right: C.captionInset,
            bottom: C.captionBottom,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: C.ink,
              color: C.white,
              padding: C.captionPadding,
              borderRadius: C.captionRadius,
              fontSize: C.captionSize,
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
