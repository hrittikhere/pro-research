import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type BarChartProps = {
  labels: string[];
  values: number[];
  title: string;
  color: string;
};

export const BarChart: React.FC<BarChartProps> = ({
  labels,
  values,
  title,
  color,
}) => {
  const frame = useCurrentFrame();
  const maxValue = Math.max(...values);
  const barAreaHeight = 300;
  const barWidth = Math.min(80, 600 / labels.length);
  const gap = Math.min(40, 200 / labels.length);
  const totalWidth = labels.length * (barWidth + gap) - gap;
  const startX = (800 - totalWidth) / 2;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 800,
        height: 500,
        backgroundColor: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: 20,
      }}
    >
      <h1
        style={{
          color: "#e0e0e0",
          fontSize: 28,
          fontWeight: 700,
          opacity: titleOpacity,
          margin: "10px 0 30px",
        }}
      >
        {title}
      </h1>

      <svg width={760} height={380} viewBox="0 0 760 380">
        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((pct, i) => (
          <line
            key={i}
            x1={startX - 10}
            y1={barAreaHeight - pct * barAreaHeight + 20}
            x2={startX + totalWidth + 10}
            y2={barAreaHeight - pct * barAreaHeight + 20}
            stroke="#333355"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}

        {/* Baseline */}
        <line
          x1={startX - 10}
          y1={barAreaHeight + 20}
          x2={startX + totalWidth + 10}
          y2={barAreaHeight + 20}
          stroke="#555577"
          strokeWidth={2}
        />

        {labels.map((label, i) => {
          const barHeight =
            (values[i] / maxValue) * barAreaHeight *
            interpolate(frame, [5 + i * 5, 40 + i * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });

          const x = startX + i * (barWidth + gap);
          const y = barAreaHeight - barHeight + 20;

          const labelOpacity = interpolate(
            frame,
            [30 + i * 5, 50 + i * 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const valueOpacity = interpolate(
            frame,
            [40 + i * 5, 60 + i * 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={color}
                opacity={0.9}
              />
              {/* Glow effect */}
              <rect
                x={x + 2}
                y={y + 2}
                width={barWidth - 4}
                height={Math.max(0, barHeight - 4)}
                rx={3}
                fill={color}
                opacity={0.3}
                filter="url(#glow)"
              />
              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fill="#e0e0e0"
                fontSize={14}
                fontWeight={600}
                opacity={valueOpacity}
              >
                {values[i]}
              </text>
              {/* Category label */}
              <text
                x={x + barWidth / 2}
                y={barAreaHeight + 45}
                textAnchor="middle"
                fill="#aaaacc"
                fontSize={13}
                opacity={labelOpacity}
              >
                {label}
              </text>
            </g>
          );
        })}

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};
