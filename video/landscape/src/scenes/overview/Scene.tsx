import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  Img,
  staticFile,
} from "remotion";
import { system as s } from "../../system/sceneSystem";
import { Stage } from "../../system/Stage";
import { defaults, OverviewProps } from "./schema";
const a = s.editorial;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const progress = (f: number, start: number, end: number) =>
  interpolate(f, [start, Math.max(start + 1, end)], [0, 1], clamp);
const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}> = ({ x, y, children, size = a.labelSize, fill = s.ink, anchor = "start" }) => (
  <text x={x} y={y} fontFamily={s.fonts.sans} fontSize={size} fill={fill} textAnchor={anchor}>
    {children}
  </text>
);
const Tick: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <path
    d="M-20 0L-5 15L26-21"
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill="none"
    stroke={a.sage}
    strokeWidth={a.stroke + 2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);
const Phone: React.FC<{ x: number; y: number; ring: number; scale?: number }> = ({
  x,
  y,
  ring,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="82" rx="90" ry="15" fill={a.paperShadow} />
    <rect x="-53" y="-66" width="106" height="148" rx="20" fill={s.ink} />
    <rect x="-44" y="-53" width="88" height="113" rx="12" fill={s.paper} />
    <path d="M-15-15Q-23 9 13 26L25 8L9-2L1 7L-8-4L-3-14Z" fill={a.clay} />
    <rect x="-12" y="68" width="24" height="4" rx="2" fill={s.bg} />
    {[0, 1].map((i) => (
      <path
        key={i}
        d={`M${-73 - i * 19} -28Q${-96 - i * 18} 4 ${-73 - i * 19} 35M${73 + i * 19} -28Q${96 + i * 18} 4 ${73 + i * 19} 35`}
        fill="none"
        stroke={a.clay}
        strokeWidth={a.stroke}
        strokeLinecap="round"
        opacity={ring * (0.75 - i * 0.25)}
      />
    ))}
  </g>
);
const Person: React.FC<{
  x: number;
  y: number;
  patient?: boolean;
  arm: number;
  present: number;
}> = ({ x, y, patient = false, arm, present }) => (
  <g transform={`translate(${x} ${y + 80 * (1 - present)})`} opacity={present}>
    <path d="M-83 244Q-96 111-43 94L41 94Q89 112 83 244" fill={patient ? a.clay : a.sage} />
    <path d="M-39 98L0 148L39 98" fill={s.bg} />
    <rect x="-20" y="72" width="40" height="42" rx="15" fill={patient ? a.skinLight : a.skin} />
    <ellipse cx="0" cy="26" rx="50" ry="64" fill={patient ? a.skinLight : a.skin} />
    <path
      d={
        patient
          ? "M-48 20Q-66-45 4-45Q61-41 48 26L29-8Q-10 12-47-2Z"
          : "M-50 26Q-74-47-7-46Q56-48 52 15L33-16Q-2 15-47-2Z"
      }
      fill={s.ink}
    />
    <path
      d="M-35 17L-30 36M27 17L30 36M-9 64Q2 69 14 60"
      fill="none"
      stroke={s.ink}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {!patient && (
      <g>
        <path d="M-35 20Q-64 10-58 55" fill="none" stroke={s.ink} strokeWidth={a.stroke} />
        <path d="M-57 54Q-50 69-28 64" fill="none" stroke={s.ink} strokeWidth="3" />
        <rect x="-64" y="30" width="15" height="28" rx="7" fill={a.clay} />
      </g>
    )}
    <path
      d={
        patient
          ? `M-65 146Q-125 193 ${-205 + 55 * arm} ${225 - 20 * arm}`
          : `M63 146Q112 206 ${215 - 40 * arm} ${225 - 20 * arm}`
      }
      fill="none"
      stroke={patient ? a.clay : a.sage}
      strokeWidth="39"
      strokeLinecap="round"
    />
    <circle
      cx={patient ? -205 + 55 * arm : 215 - 40 * arm}
      cy={225 - 20 * arm}
      r="21"
      fill={patient ? a.skinLight : a.skin}
    />
  </g>
);
const Reception: React.FC<{ f: number; p: OverviewProps; resolved?: boolean }> = ({
  f,
  p,
  resolved = false,
}) => {
  const close = p.eventFrames[0] ?? 75;
  const dark = progress(f, close, close + p.transitionFrames);
  const split = progress(
    f,
    p.eventFrames[1] ?? 150,
    (p.eventFrames[1] ?? 150) + p.transitionFrames,
  );
  const transfer = progress(f, 0, p.transferFrames);
  const reach = Math.sin(transfer * Math.PI);
  const ring = (Math.sin(f * 0.52) + 1) / 2;
  return (
    <>
      <svg viewBox="0 0 1720 650" width="100%" height="100%">
        <defs>
          <clipPath id="room">
            <rect x="0" y="0" width="1720" height="640" rx={a.roomRadius} />
          </clipPath>
        </defs>
        <g clipPath="url(#room)">
          <rect width="1720" height="640" fill={a.claySoft} />
          <path d="M0 480L1720 400V650H0Z" fill={s.surface} />
          <rect x="84" y="70" width="340" height="348" rx="160" fill={s.bg} />
          <path d="M254 72V418M84 247H424" stroke={a.claySoft} strokeWidth="12" />
          <g opacity={1 - dark}>
            <circle cx="302" cy="145" r="43" fill={a.gold} />
            <path d="M90 342L220 265L424 350V420H90Z" fill={a.sageSoft} />
          </g>
          <rect x="0" y="0" width="1720" height="650" fill={a.night} opacity={dark} />
          <g opacity={dark}>
            <rect x="84" y="70" width="340" height="348" rx="160" fill={a.nightSoft} />
            <path d="M254 72V418M84 247H424" stroke={a.night} strokeWidth="12" />
            <path d="M315 116A45 45 0 1 0 354 183A39 39 0 0 1 315 116" fill={a.gold} />
          </g>
          <g opacity={1 - dark}>
            <path d="M690 0V55M1120 0V55" stroke={s.ink} strokeWidth="6" />
            <path d="M625 105Q690-10 755 105ZM1055 105Q1120-10 1185 105Z" fill={s.bg} />
            <Person x={620} y={110} arm={reach} present={1} />
            <Person x={1180} y={110} patient arm={reach} present={1} />
          </g>
          <ellipse cx="920" cy="612" rx="610" ry="24" fill={a.paperShadow} />
          <path d="M420 382H1430L1510 430H340Z" fill={s.paper} />
          <path d="M340 430H1510V620H340Z" fill={dark > 0.5 ? a.nightSoft : a.sage} />
          <path d="M365 455H1485" stroke={s.bg} strokeWidth="4" opacity=".35" />
          <g
            opacity={1 - dark}
            transform={`translate(${interpolate(transfer, [0, 1], [1030, 795])} ${354 - Math.sin(transfer * Math.PI) * 18}) rotate(${-9 + 18 * transfer})`}
          >
            <rect
              x="-75"
              y="-40"
              width="150"
              height="90"
              rx="5"
              fill={a.paperShadow}
              transform="translate(5 8)"
            />
            <rect
              x="-75"
              y="-40"
              width="150"
              height="90"
              rx="5"
              fill={s.paper}
              stroke={a.clay}
              strokeWidth="3"
            />
            <path d="M-45-13H40M-45 6H10M-45 25H27" stroke={a.claySoft} strokeWidth="6" />
          </g>
          <Phone
            x={p.phoneX}
            y={p.phoneY}
            ring={resolved ? (1 - progress(f, 0, p.callTravelFrames)) * ring : ring}
          />
          <g transform="translate(1510 132)">
            <circle r="62" fill={s.bg} />
            <path
              d={`M0 0L${Math.sin(dark * Math.PI) * 32} ${-36 + dark * 66}M0 0L${36 - dark * 18} ${dark * 18}`}
              stroke={s.ink}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          <Label x={70} y={590} fill={dark > 0.5 ? s.bg : s.ink}>
            {dark > 0.5 ? "After hours" : "Busy desk"}
          </Label>
        </g>
        {resolved && (
          <path
            d="M985 340H1320"
            stroke={a.sage}
            strokeWidth={a.lineWidth}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - progress(f, 0, p.callTravelFrames)}
          />
        )}
        {split > 0 && (
          <g transform={`translate(${1320 + 230 * (1 - split)} 320)`}>
            <circle
              r="102"
              fill={s.bg}
              stroke={resolved ? a.sage : a.clay}
              strokeWidth={a.stroke}
            />
            {resolved ? (
              <Tick
                x={0}
                y={0}
                scale={2 * progress(f, p.callTravelFrames - 10, p.callTravelFrames + 10)}
              />
            ) : (
              <>
                <path d="M-28-22Q-43 17 16 42L36 14L12-2L0 12L-17-6L-8-22Z" fill={a.clay} />
                <path
                  d="M-24-124Q90-150 124-43"
                  fill="none"
                  stroke={a.clay}
                  strokeWidth="5"
                  strokeDasharray="12 12"
                />
              </>
            )}
          </g>
        )}
      </svg>
    </>
  );
};
const Route: React.FC<{ f: number; p: OverviewProps }> = ({ f, p }) => {
  const journey = progress(f, 12, p.callTravelFrames + 12);
  const branch = progress(
    f,
    p.eventFrames[0] ?? 100,
    (p.eventFrames[0] ?? 100) + p.transitionFrames,
  );
  return (
    <svg viewBox="0 0 1720 650" width="100%" height="100%">
      <Label x={860} y={74} anchor="middle" size={a.smallSize}>
        EXPLANATORY WORKFLOW
      </Label>
      <path
        d="M270 340H720M1000 340H1150Q1220 340 1220 270V200H1450M1220 340V480H1450"
        fill="none"
        stroke={s.line}
        strokeWidth={a.lineWidth}
      />
      <path
        d="M270 340H720"
        fill="none"
        stroke={a.clay}
        strokeWidth={a.lineWidth}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - journey}
      />
      <Phone x={250} y={330} ring={(1 - journey) * 0.6} />
      <rect x="690" y="205" width="310" height="270" rx="135" fill={a.sageSoft} />
      <path
        d="M758 300H935M758 340H875M758 380H920"
        stroke={a.sage}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <Label x={845} y={550} anchor="middle">
        Agreed workflow
      </Label>
      <circle
        cx={270 + journey * 430}
        cy="340"
        r={18 * (1 - progress(f, p.callTravelFrames, p.callTravelFrames + 18))}
        fill={a.clay}
      />
      <g opacity={branch}>
        <path
          d="M1000 340H1150Q1220 340 1220 270V200H1450"
          fill="none"
          stroke={a.sage}
          strokeWidth={a.lineWidth}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - branch}
        />
        <rect
          x="1400"
          y="130"
          width="180"
          height="150"
          rx="16"
          fill={s.paper}
          stroke={a.sage}
          strokeWidth={a.stroke}
        />
        <path d="M1400 175H1580M1440 115V144M1540 115V144" stroke={a.sage} strokeWidth={a.stroke} />
        <Tick x={1490} y={221} />
        <Label x={1490} y={340} anchor="middle">
          Appointment
        </Label>
      </g>
      <path
        d="M1150 340H1220V480H1420"
        fill="none"
        stroke={a.clay}
        strokeWidth={a.lineWidth}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={
          1 - progress(f, p.eventFrames[1] ?? 150, (p.eventFrames[1] ?? 150) + p.transitionFrames)
        }
      />
      <g>
        <circle cx="1490" cy="459" r="35" fill={a.skin} />
        <path d="M1420 570Q1418 500 1490 500Q1562 500 1560 570" fill={a.sage} />
        <Label x={1490} y={625} anchor="middle">
          Your team
        </Label>
      </g>
    </svg>
  );
};
const Approval: React.FC<{ f: number; p: OverviewProps }> = ({ f, p }) => {
  const events = p.eventFrames;
  const phase = events.filter((v) => f >= v).length;
  const review = progress(f, events[3] ?? 60, (events[3] ?? 60) + p.callTravelFrames);
  const approve = progress(f, events[4] ?? 200, (events[4] ?? 200) + p.transitionFrames);
  return (
    <svg viewBox="0 0 1720 650" width="100%" height="100%">
      <path d="M250 320H1470" stroke={s.line} strokeWidth={a.lineWidth} />
      <g transform={`translate(${250 + review * 600} 320)`}>
        <rect
          x="-270"
          y="-210"
          width="540"
          height="430"
          rx="20"
          fill={a.paperShadow}
          transform="translate(10 15)"
        />
        <rect
          x="-270"
          y="-210"
          width="540"
          height="430"
          rx="20"
          fill={s.paper}
          stroke={s.line}
          strokeWidth="3"
        />
        <Label x={0} y={-125} anchor="middle" size={a.smallSize}>
          YOUR WORKFLOW
        </Label>
        {["Scheduling", "Forwarding", "Patient data"].map((t, i) => (
          <g key={t}>
            <circle cx="-133" cy={-45 + i * 80} r="15" fill={i < phase ? a.sage : a.claySoft} />
            <Label x={-96} y={-32 + i * 80} size={a.smallSize}>
              {t}
            </Label>
          </g>
        ))}
      </g>
      <g transform="translate(1180 320)">
        <path d="M0-220V220" stroke={a.sage} strokeWidth="12" />
        <rect x="-75" y="-40" width="150" height="80" rx="40" fill={s.bg} />
        <Tick x={0} y={0} scale={approve} />
      </g>
      <g opacity={approve}>
        <circle cx="1500" cy="320" r="90" fill={a.sageSoft} />
        <Tick x={1500} y={320} scale={2} />
      </g>
      <Label x={850} y={615} anchor="middle">
        {approve > 0.5
          ? "Activation follows approval"
          : review > 0.5
            ? "Test with your team"
            : "Assess the fit"}
      </Label>
    </svg>
  );
};
export default function OverviewScene(input: Partial<OverviewProps>) {
  const p = { ...defaults, ...input };
  const local = useCurrentFrame();
  const f = local + p.sceneOffset;
  const { fps } = useVideoConfig();
  const settle = spring({ frame: local, fps, config: s.springs.settle });
  return (
    <Stage section="">
      <div
        style={{ position: "absolute", left: a.left, top: a.top, width: a.width, height: a.height }}
      >
        {p.kind === "hook" || p.kind === "return" ? (
          <Reception f={f} p={p} resolved={p.kind === "return"} />
        ) : p.kind === "route" ? (
          <Route f={f} p={p} />
        ) : p.kind === "approval" ? (
          <Approval f={f} p={p} />
        ) : p.kind === "evidence" ? (
          <>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                fontSize: a.smallSize,
                color: s.muted,
              }}
            >
              RECORDED DEMO{p.sourceMode === "calendar" ? " · GOOGLE CALENDAR BOOKING STILL" : ""}
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 72,
                width: a.width,
                height: 500,
                overflow: "hidden",
                borderRadius: a.roomRadius,
                background: s.dark,
              }}
            >
              {p.sourceMode === "calendar" ? (
                <Img
                  src={staticFile(p.sourceStill)}
                  style={{
                    position: "absolute",
                    width: (1920 * a.width) / 630,
                    height: (580 * a.width) / 630,
                    left: (-1210 * a.width) / 630,
                    top: (-330 * a.width) / 630,
                  }}
                />
              ) : (
                <OffthreadVideo
                  muted
                  src={staticFile(p.source)}
                  startFrom={Math.round(p.sourceFrom * fps)}
                  style={{
                    position: "absolute",
                    width: (1920 * a.width) / 1000,
                    height: (580 * a.width) / 1000,
                    left: (-80 * a.width) / 1000,
                    top: (-245 * a.width) / 1000,
                  }}
                />
              )}
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 595,
                fontSize: a.smallSize,
                color: s.muted,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {p.phase < 0
                  ? "Original recording pixels"
                  : p.sourceMode === "calendar"
                    ? "Original confirmation audio"
                    : "Original call audio"}
              </span>
              <span>
                {p.label ||
                  (p.sourceMode === "calendar"
                    ? ""
                    : p.eventFrames.length === 4
                      ? f > p.eventFrames[3]
                        ? "3:00 pm ✓"
                        : p.eventFrames
                            .map((t, i) => (f >= t ? ["2:30", "3:00", "3:30", ""][i] : ""))
                            .filter(Boolean)
                            .join(" · ")
                      : p.eventFrames.length === 2
                        ? f > p.eventFrames[1]
                          ? "New-patient check-up"
                          : f > p.eventFrames[0]
                            ? "New patient"
                            : ""
                        : "")}
              </span>
            </div>
          </>
        ) : (
          <svg viewBox="0 0 1720 650" width="100%" height="100%">
            <circle cx="315" cy="290" r={160 * settle} fill={a.sageSoft} />
            <g transform={`translate(315 290) scale(${settle})`}>
              <rect
                x="-94"
                y="-96"
                width="188"
                height="190"
                rx="20"
                fill={s.paper}
                stroke={a.sage}
                strokeWidth={a.stroke}
              />
              <path d="M-94-42H94M-45-115V-78M45-115V-78" stroke={a.sage} strokeWidth={a.stroke} />
              <text
                y="50"
                textAnchor="middle"
                fontFamily={s.fonts.serif}
                fontSize="112"
                fill={s.ink}
              >
                15
              </text>
            </g>
            <text x="580" y="250" fontFamily={s.fonts.serif} fontSize={a.titleSize} fill={s.ink}>
              A useful fit?
            </text>
            <Label x={580} y={350}>
              15-minute demo &amp; fit assessment
            </Label>
            <Label x={580} y={465} fill={a.clay}>
              flowaudit.co.uk/book ↗
            </Label>
            <path
              d="M580 490H1540"
              stroke={a.clay}
              strokeWidth={a.stroke}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - progress(f, 15, p.callTravelFrames)}
            />
          </svg>
        )}
      </div>
      {p.caption && (
        <div
          style={{
            position: "absolute",
            left: (s.stage.width - p.captionWidth) / 2,
            width: p.captionWidth,
            bottom: p.captionBottom,
            minHeight: 160,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            textAlign: "center",
            fontSize: p.captionSize,
            lineHeight: 1.16,
            fontWeight: 500,
            whiteSpace: "pre-line",
            color: s.ink,
          }}
        >
          {p.caption}
        </div>
      )}
    </Stage>
  );
}
