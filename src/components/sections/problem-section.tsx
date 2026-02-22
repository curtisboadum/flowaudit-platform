"use client";

import { useCallback, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/providers/locale-provider";

function ProblemSection() {
  const { t } = useLocale();
  return (
    <section className="flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-4 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="#37322F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            text={t.problem.badge}
          />
          <h2 className="max-w-[600px] text-center font-sans text-2xl leading-tight font-semibold tracking-tight text-[#49423D] sm:text-3xl lg:text-5xl">
            {t.problem.headline}
          </h2>
          <p className="max-w-[500px] text-center font-sans text-sm leading-7 text-[#605A57] sm:text-base">
            {t.problem.subtext}
          </p>
        </div>

        {/* Growth Curve Chart */}
        <div className="mx-auto w-full max-w-[800px]">
          <GrowthCurveChart />
        </div>

        {/* Key Points */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5">
          {t.problem.keyPoints.map((point) => (
            <div key={point.title} className="px-2 text-center">
              <div className="font-sans text-sm font-semibold text-[#37322F]">{point.title}</div>
              <div className="mt-1 font-sans text-xs leading-relaxed text-[#605A57]">
                {point.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface HoverState {
  visible: boolean;
  dataX: number;
  manualY: number;
  automatedY: number;
  svgX: number;
  svgManualY: number;
  svgAutomatedY: number;
}

function interpolateY(dataX: number, path: { x: number; y: number }[]): number {
  if (dataX <= 0) return path[0]?.y ?? 0;
  if (dataX >= 6) return path[6]?.y ?? 0;
  const i = Math.floor(dataX);
  const t = dataX - i;
  const p0 = path[i];
  const p1 = path[i + 1];
  if (!p0 || !p1) return 0;
  return p0.y + t * (p1.y - p0.y);
}

function GrowthCurveChart() {
  const { t } = useLocale();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<HoverState>({
    visible: false,
    dataX: 0,
    manualY: 0,
    automatedY: 0,
    svgX: 0,
    svgManualY: 0,
    svgAutomatedY: 0,
  });

  const manualPath = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 55 },
    { x: 4, y: 80 },
    { x: 5, y: 110 },
    { x: 6, y: 150 },
  ];
  const automatedPath = [
    { x: 0, y: 10 },
    { x: 1, y: 15 },
    { x: 2, y: 18 },
    { x: 3, y: 20 },
    { x: 4, y: 21 },
    { x: 5, y: 22 },
    { x: 6, y: 22 },
  ];

  const width = 700;
  const height = 300;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const toX = (val: number) => padding.left + (val / 6) * chartW;
  const toY = (val: number) => padding.top + chartH - (val / 160) * chartH;

  const manualLine = manualPath.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ");
  const automatedLine = automatedPath.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ");

  const years = t.problem.chartYears;

  const updateHover = useCallback(
    (clientX: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const relX = clientX - rect.left;
      const svgScaleX = width / rect.width;
      const svgXPos = relX * svgScaleX;
      const dataX = Math.max(0, Math.min(6, ((svgXPos - padding.left) / chartW) * 6));

      const manualY = interpolateY(dataX, manualPath);
      const automatedY = interpolateY(dataX, automatedPath);

      setHover({
        visible: true,
        dataX,
        manualY,
        automatedY,
        svgX: toX(dataX),
        svgManualY: toY(manualY),
        svgAutomatedY: toY(automatedY),
      });
    },
    // Data paths and chart dimensions are stable across renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chartW],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      updateHover(e.clientX);
    },
    [updateHover],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const touch = e.touches[0];
      if (touch) updateHover(touch.clientX);
    },
    [updateHover],
  );

  const handlePointerLeave = useCallback(() => {
    setHover((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="w-full rounded-xl border border-[rgba(55,50,47,0.08)] bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-3 bg-[#37322F]" />
          <span className="font-sans text-xs text-[#605A57]">{t.problem.chartManual}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-3 bg-emerald-500" />
          <span className="font-sans text-xs text-[#605A57]">{t.problem.chartAI}</span>
        </div>
      </div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handlePointerLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerLeave}
      >
        {/* Grid lines */}
        {[0, 40, 80, 120, 160].map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={toY(val)}
              x2={width - padding.right}
              y2={toY(val)}
              stroke="rgba(55,50,47,0.06)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={toY(val) + 4}
              textAnchor="end"
              className="fill-[#605A57] text-[10px]"
              fontFamily="Inter, sans-serif"
            >
              {val}h
            </text>
          </g>
        ))}
        {/* X axis labels */}
        {years.map((label, i) => (
          <text
            key={label}
            x={toX(i)}
            y={height - 10}
            textAnchor="middle"
            className="fill-[#605A57] text-[10px]"
            fontFamily="Inter, sans-serif"
          >
            {label}
          </text>
        ))}
        {/* Manual path (fills up) */}
        <polyline
          points={manualLine}
          fill="none"
          stroke="#37322F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Automated path (stays flat) */}
        <polyline
          points={automatedLine}
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Area between (showing savings) */}
        <polygon
          points={`${manualLine} ${automatedPath
            .slice()
            .reverse()
            .map((p) => `${toX(p.x)},${toY(p.y)}`)
            .join(" ")}`}
          fill="rgba(55,50,47,0.04)"
        />
        {/* Label */}
        <text
          x={toX(5)}
          y={toY(65)}
          textAnchor="middle"
          className="fill-[#605A57] text-[11px] font-medium"
          fontFamily="Inter, sans-serif"
        >
          {t.problem.chartSavings}
        </text>

        {/* Interactive hover overlay */}
        {hover.visible && (
          <g>
            {/* Dashed vertical guide line */}
            <line
              x1={hover.svgX}
              y1={padding.top}
              x2={hover.svgX}
              y2={padding.top + chartH}
              stroke="rgba(55,50,47,0.2)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* Dot on manual (dark) line */}
            <circle cx={hover.svgX} cy={hover.svgManualY} r="4" fill="#37322F" />
            {/* Dot on automated (green) line */}
            <circle cx={hover.svgX} cy={hover.svgAutomatedY} r="4" fill="#10B981" />
            {/* Manual tooltip */}
            <g transform={`translate(${hover.svgX + 8}, ${hover.svgManualY - 8})`}>
              <rect x="-2" y="-12" width="46" height="16" rx="3" fill="#37322F" />
              <text
                x="0"
                y="0"
                className="text-[9px]"
                fill="white"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {Math.round(hover.manualY)}h/wk
              </text>
            </g>
            {/* Automated tooltip */}
            <g transform={`translate(${hover.svgX + 8}, ${hover.svgAutomatedY + 16})`}>
              <rect x="-2" y="-12" width="46" height="16" rx="3" fill="#10B981" />
              <text
                x="0"
                y="0"
                className="text-[9px]"
                fill="white"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {Math.round(hover.automatedY)}h/wk
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

export { ProblemSection };
