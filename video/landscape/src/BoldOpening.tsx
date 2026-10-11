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
const settle = (f: number, start: number, heavy = false) =>
  spring({
    frame: Math.max(0, f - start),
    fps: 30,
    config: heavy ? C.springs.weight : C.springs.snap,
  });
const handset =
  "M-132-24 Q-126-66-91-74 L-58-70 Q-45-68-45-51 L-50-16 Q-52-4-70 0 L-83 3 Q-47 65 26 75 L34 60 Q41 46 54 50 L89 63 Q101 67 99 81 L93 110 Q88 133 63 134 Q-79 119-128 9 Q-139-13-132-24Z";
const Handset = ({
  x,
  y,
  scale = 1,
  rotation = -35,
  fill = C.ink,
}: {
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  fill?: string;
}) => (
  <path
    d={handset}
    fill={fill}
    transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
  />
);

/** Persistent objects change function; no wall-clock animation or simulated product UI. */
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
  const gather = ease(f, t.gather, t.gather + l.gatherFrames);
  const resolve = ease(f, t.resolve, t.resolve + 65);
  const open = settle(f, t.gateOpen, true);
  const travel = ease(f, t.gateOpen + 8, t.arrival);
  const anticipation =
    22 * ease(f, t.gateOpen - 7, t.gateOpen + 1) * (1 - ease(f, t.gateOpen + 6, t.gateOpen + 15));
  const paperDrop = settle(f, t.paperBlock, true);
  const close = settle(f, t.close, true);
  const ring = interpolate(f, [44, 50, 54, 59, 64, 70, 78], [0, -5, 7, -5, 3, -1, 0], clamp);
  const callOne = ease(f, t.ring, t.ring + 28);
  const callTwo = ease(f, t.secondCall, t.secondCall + 30);
  const camera = mix(1, l.cameraScale, ease(f, t.zoom, t.zoom + 68));
  const phone1 = { x: l.sourceX, y: mix(300, l.sourceTopY, gather) };
  const phone2 = { x: mix(1685, l.sourceX, gather), y: mix(440, l.sourceBottomY, gather) };
  const px = mix(l.paperX, l.gateX, gather);
  const py = mix(l.paperY - 160 * (1 - paperDrop), 360, gather) - l.openingTravel * open;
  const sx = mix(l.shutterX, l.gateX, gather);
  const sy = mix(l.shutterY, 670, gather) + l.openingTravel * open;
  const first = { x: mix(mix(260, 485, callOne), l.waitingX, gather), y: l.routeY };
  const second = {
    x: mix(mix(1670, 1515, callTwo), l.queuedX, gather),
    y: mix(l.routeY, 660, gather),
  };
  const shell = {
    x: mix(960, 800, gather),
    y: mix(0, 220, gather),
    w: mix(960, 980, gather),
    h: mix(1080, 560, gather),
    r: mix(0, 80, gather),
  };
  const cue = timing.captions.find((c) => f >= c.from && f < c.to);
  const path1 = `M${phone1.x} ${phone1.y + 120} V${l.routeY} H${mix(l.paperX, l.gateX, gather)}`;
  const path2 = `M${phone2.x} ${phone2.y + 80} V${second.y} H${mix(1310, 660, gather)} Q${mix(1310, 755, gather)} ${second.y} ${mix(1310, 755, gather)} ${mix(l.routeY, 590, gather)} V${l.routeY} H${mix(l.shutterX, l.gateX, gather)}`;
  return (
    <AbsoluteFill
      style={{ background: C.white, fontFamily: system.fonts.sans, overflow: "hidden" }}
    >
      <style>{`@font-face{font-family:FlowInter;src:url('${staticFile("fonts/inter.woff2")}');font-weight:100 900;}`}</style>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="workflow-shell">
            <rect x={shell.x} y={shell.y} width={shell.w} height={shell.h} rx={shell.r} />
          </clipPath>
          <clipPath id="paper-aperture">
            <rect x="800" y="245" width="325" height="535" rx="25" />
          </clipPath>
        </defs>
        {/* The after-hours field contracts into the physical workflow housing. */}
        <rect x={shell.x} y={shell.y} width={shell.w} height={shell.h} rx={shell.r} fill={C.ink} />
        <rect
          x={shell.x}
          y={shell.y}
          width={shell.w}
          height={shell.h}
          rx={shell.r}
          fill={C.blue}
          opacity={resolve}
        />
        <g opacity={1 - gather}>
          <text x="95" y="118" fontSize={C.openingHeadingSize} fontWeight="750" fill={C.ink}>
            BUSY DESK
          </text>
          <text x="1055" y="118" fontSize={C.openingHeadingSize} fontWeight="750" fill={C.white}>
            AFTER HOURS
          </text>
        </g>
        <g transform={`translate(980 500) scale(${camera}) translate(-980 -500)`}>
          {/* Both original connections remain; the shell clips the interior to white. */}
          <path
            d={path1}
            stroke={C.coral}
            strokeWidth={C.openingRouteWidth}
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={path2}
            stroke={C.coral}
            strokeWidth={C.openingRouteWidth}
            strokeLinejoin="round"
            fill="none"
          />
          <g clipPath="url(#workflow-shell)">
            <path
              d={path1}
              stroke={C.white}
              strokeWidth={C.openingRouteWidth}
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d={path2}
              stroke={C.white}
              strokeWidth={C.openingRouteWidth}
              strokeLinejoin="round"
              fill="none"
            />
          </g>
          <path
            d={`M${l.gateX} ${l.routeY} H${l.destinationX}`}
            stroke={C.white}
            strokeWidth={C.openingRouteWidth}
            opacity={resolve}
            fill="none"
          />
          <g opacity={1 - gather}>
            <path d="M95 740H825 M1095 740H1825" stroke={C.muted} strokeWidth="10" />
          </g>
          {/* Desk telephone stays substantial; its casing folds away around its handset. */}
          <g transform={`translate(${phone1.x} ${phone1.y}) rotate(${ring * (1 - gather)})`}>
            <rect
              x={-170 * (1 - gather)}
              y={-130 * (1 - gather)}
              width={340 * (1 - gather)}
              height={260 * (1 - gather)}
              rx="45"
              fill={C.blue}
            />
            <Handset
              x={20}
              y={-28}
              scale={mix(1.18, 0.78, gather)}
              fill={gather > 0.85 ? C.ink : C.white}
            />
            <g opacity={1 - gather}>
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={-75 + 65 * i}
                  y="80"
                  width="32"
                  height="18"
                  rx="5"
                  fill={C.white}
                />
              ))}
            </g>
          </g>
          <Handset
            x={phone2.x}
            y={phone2.y}
            scale={mix(1.05, 0.78, gather)}
            fill={gather > 0.84 ? C.ink : C.white}
          />
          {/* Paperwork keeps its printed marks; shutter keeps its slats, even in the mechanism. */}
          <g clipPath={gather > 0.99 ? "url(#paper-aperture)" : undefined}>
            <g transform={`translate(${px} ${py}) rotate(${mix(-8, 0, gather)})`}>
              <g
                transform={`translate(${-28 * (1 - gather)} ${-28 * (1 - gather)}) rotate(${-9 * (1 - gather)})`}
              >
                <rect x="-124" y="-168" width="248" height="336" rx="15" fill={C.ink} />
                <path d="M-74-102H65 M-74-53H74" stroke={C.white} strokeWidth="12" />
              </g>
              <g
                transform={`translate(${-13 * (1 - gather)} ${-12 * (1 - gather)}) rotate(${6 * (1 - gather)})`}
              >
                <rect x="-124" y="-168" width="248" height="336" rx="15" fill={C.blue} />
              </g>
              <rect x="-124" y="-168" width="248" height="336" rx="15" fill={C.paper} />
              <path d="M-74-102H65 M-74-53H74 M-74-4H35" stroke={C.ink} strokeWidth="17" />
              <rect x="-74" y="85" width="108" height="34" rx="5" fill={C.blue} />
            </g>
            <g transform={`translate(${sx} ${sy})`}>
              <rect x="-124" y="-168" width="248" height="336" rx="15" fill={C.white} />
              <svg
                x="-111"
                y="-155"
                width="222"
                height="310"
                viewBox="0 0 222 310"
                overflow="hidden"
              >
                <g transform={`translate(0 ${-315 + 315 * close})`}>
                  <rect width="222" height="315" fill={C.muted} />
                  {Array.from({ length: 6 }, (_, i) => (
                    <path key={i} d={`M0 ${i * 50 + 18}H222`} stroke={C.ink} strokeWidth="12" />
                  ))}
                  <rect x="78" y="280" width="66" height="12" rx="4" fill={C.ink} />
                </g>
              </svg>
            </g>
          </g>
          <g opacity={1 - gather} transform="translate(1700 265)">
            <circle r="110" fill={C.white} />
            <path d="M0-82V-70 M82 0H70 M0 82V70 M-82 0H-70" stroke={C.ink} strokeWidth="10" />
            <path
              d="M0 0V-65"
              stroke={C.blue}
              strokeWidth="14"
              strokeLinecap="round"
              transform={`rotate(${mix(-50, 95, Math.min(1, close))})`}
            />
            <path d="M0 0H40" stroke={C.ink} strokeWidth="14" strokeLinecap="round" />
            <circle r="10" fill={C.ink} />
          </g>
          <g
            transform={`translate(${mix(first.x - anticipation, l.destinationX, travel)} ${first.y}) scale(${callOne})`}
          >
            <circle r={l.callRadius} fill={travel >= 1 ? C.green : C.coral} />
            <Handset x={4} y={-8} scale={0.38} />
          </g>
          <g transform={`translate(${second.x} ${second.y}) scale(${callTwo})`}>
            <circle r={l.callRadius} fill={C.coral} />
            <Handset x={4} y={-8} scale={0.38} />
          </g>
          <g opacity={resolve}>
            <circle
              cx={l.destinationX}
              cy={l.routeY}
              r="104"
              fill="none"
              stroke={travel >= 1 ? C.green : C.white}
              strokeWidth="12"
            />
            <text
              x="1390"
              y="315"
              textAnchor="middle"
              fontSize={C.openingWorkflowSize}
              fontWeight="650"
              fill={C.white}
            >
              Agreed workflow
            </text>
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 55,
          width: 460,
          height: 130,
          transform: `translateY(${-230 * (1 - settle(f, t.resolve + 6))}px)`,
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
