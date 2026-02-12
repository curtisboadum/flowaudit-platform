"use client";

import { Badge } from "@/components/ui/badge";

function ProblemSection() {
  return (
    <section className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1060px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 sm:mb-16">
          <Badge
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="#37322F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            text="The Problem"
          />
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight font-sans tracking-tight max-w-[600px]">
            Manual Work Is Quietly Killing Your Margin
          </h2>
          <p className="text-center text-[#605A57] text-sm sm:text-base leading-7 font-sans max-w-[500px]">
            Repetitive tasks compound over time. What starts as &ldquo;just 30 minutes&rdquo;
            becomes a full-time role nobody planned for.
          </p>
        </div>

        {/* Growth Curve Chart */}
        <div className="w-full max-w-[800px] mx-auto">
          <GrowthCurveChart />
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 sm:mt-16">
          {[
            { title: "Tasks Compound", desc: "Repetitive tasks grow with your business" },
            { title: "Manual Scales Up", desc: "Manual duplication scales with growth" },
            { title: "Hiring Adds Cost", desc: "Hiring permanently increases overhead" },
            { title: "Admin Steals Time", desc: "Admin steals revenue-generating hours" },
            { title: "Burnout Rises", desc: "Burnout increases operational risk" },
          ].map((point) => (
            <div key={point.title} className="text-center sm:text-left">
              <div className="text-sm text-[#37322F] font-semibold font-sans">{point.title}</div>
              <div className="text-xs text-[#605A57] font-sans mt-1">{point.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrowthCurveChart() {
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

  const years = ["Now", "6 mo", "1 yr", "18 mo", "2 yr", "30 mo", "3 yr"];

  return (
    <div className="w-full bg-white rounded-xl border border-[rgba(55,50,47,0.08)] p-6 sm:p-8">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#37322F]" />
          <span className="text-xs text-[#605A57] font-sans">Manual Task Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-emerald-500" />
          <span className="text-xs text-[#605A57] font-sans">With AI Assistant</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
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
              className="text-[10px] fill-[#605A57]"
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
            className="text-[10px] fill-[#605A57]"
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
          className="text-[11px] fill-[#605A57] font-medium"
          fontFamily="Inter, sans-serif"
        >
          Time Savings
        </text>
      </svg>
    </div>
  );
}

export { ProblemSection };
