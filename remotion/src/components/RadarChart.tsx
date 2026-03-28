import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type RadarChartProps = {
  axes: string[];
  datasets: { label: string; values: number[]; color: string }[];
  title: string;
  maxValue: number;
};

export const RadarChart: React.FC<RadarChartProps> = ({
  axes,
  datasets,
  title,
  maxValue,
}) => {
  const frame = useCurrentFrame();
  const cx = 300;
  const cy = 250;
  const radius = 160;
  const levels = 5;
  const angleStep = (Math.PI * 2) / axes.length;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(frame, [5, 20], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getPoint = (index: number, value: number, r: number = radius) => {
    const angle = angleStep * index - Math.PI / 2;
    const dist = (value / maxValue) * r;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    };
  };

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
      }}
    >
      <h1
        style={{
          color: "#e0e0e0",
          fontSize: 28,
          fontWeight: 700,
          opacity: titleOpacity,
          margin: "15px 0 5px",
        }}
      >
        {title}
      </h1>

      <svg width={600} height={420} viewBox="0 0 600 420">
        {/* Grid rings */}
        {Array.from({ length: levels }, (_, level) => {
          const r = (radius / levels) * (level + 1);
          const points = axes
            .map((_, i) => {
              const p = getPoint(i, maxValue, r);
              return `${p.x},${p.y}`;
            })
            .join(" ");

          return (
            <polygon
              key={`grid-${level}`}
              points={points}
              fill="none"
              stroke="#333355"
              strokeWidth={1}
              opacity={gridOpacity}
            />
          );
        })}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const p = getPoint(i, maxValue);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#333355"
              strokeWidth={1}
              opacity={gridOpacity}
            />
          );
        })}

        {/* Axis labels */}
        {axes.map((label, i) => {
          const p = getPoint(i, maxValue, radius + 25);
          const labelOpacity = interpolate(
            frame,
            [15 + i * 3, 30 + i * 3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#aaaacc"
              fontSize={12}
              opacity={labelOpacity}
            >
              {label}
            </text>
          );
        })}

        {/* Data polygons */}
        {datasets.map((dataset, di) => {
          const dataProgress = interpolate(
            frame,
            [20 + di * 10, 60 + di * 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          const points = axes
            .map((_, i) => {
              const value = dataset.values[i] * dataProgress;
              const p = getPoint(i, value);
              return `${p.x},${p.y}`;
            })
            .join(" ");

          const legendOpacity = interpolate(
            frame,
            [50 + di * 10, 70 + di * 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={`data-${di}`}>
              {/* Filled area */}
              <polygon
                points={points}
                fill={dataset.color}
                opacity={0.15}
                stroke={dataset.color}
                strokeWidth={2}
              />

              {/* Data points */}
              {axes.map((_, i) => {
                const value = dataset.values[i] * dataProgress;
                const p = getPoint(i, value);
                return (
                  <circle
                    key={`point-${di}-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={dataset.color}
                    opacity={dataProgress}
                  />
                );
              })}

              {/* Legend */}
              <rect
                x={520}
                y={100 + di * 30}
                width={16}
                height={16}
                rx={3}
                fill={dataset.color}
                opacity={legendOpacity}
              />
              <text
                x={542}
                y={113 + di * 30}
                fill="#e0e0e0"
                fontSize={13}
                opacity={legendOpacity}
              >
                {dataset.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
