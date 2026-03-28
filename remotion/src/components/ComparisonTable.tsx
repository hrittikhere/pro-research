import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type ComparisonTableProps = {
  headers: string[];
  rows: string[][];
  title: string;
  highlightColumn: number;
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  headers,
  rows,
  title,
  highlightColumn,
}) => {
  const frame = useCurrentFrame();
  const colWidth = 760 / headers.length;
  const rowHeight = 50;
  const headerHeight = 55;
  const startY = 90;
  const startX = 20;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 900,
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

      <svg width={860} height={400} viewBox="0 0 860 400">
        {/* Header row */}
        {headers.map((header, col) => {
          const headerOpacity = interpolate(
            frame,
            [5 + col * 5, 20 + col * 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const isHighlight = col === highlightColumn;
          const x = startX + col * colWidth;

          return (
            <g key={`h-${col}`} opacity={headerOpacity}>
              <rect
                x={x + 5}
                y={startY}
                width={colWidth - 10}
                height={headerHeight}
                rx={8}
                fill={isHighlight ? "#4c6ef5" : "#2a2a4a"}
              />
              <text
                x={x + colWidth / 2}
                y={startY + headerHeight / 2 + 5}
                textAnchor="middle"
                fill="#e0e0e0"
                fontSize={15}
                fontWeight={700}
              >
                {header}
              </text>
            </g>
          );
        })}

        {/* Data rows */}
        {rows.map((row, rowIdx) => {
          const rowDelay = 15 + rowIdx * 10;

          return row.map((cell, col) => {
            const cellOpacity = interpolate(
              frame,
              [rowDelay + col * 3, rowDelay + col * 3 + 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const slideX = interpolate(
              frame,
              [rowDelay + col * 3, rowDelay + col * 3 + 15],
              [-20, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );

            const isHighlight = col === highlightColumn;
            const x = startX + col * colWidth;
            const y = startY + headerHeight + 10 + rowIdx * (rowHeight + 5);

            return (
              <g
                key={`${rowIdx}-${col}`}
                opacity={cellOpacity}
                transform={`translate(${slideX}, 0)`}
              >
                <rect
                  x={x + 5}
                  y={y}
                  width={colWidth - 10}
                  height={rowHeight}
                  rx={6}
                  fill={isHighlight ? "rgba(76,110,245,0.1)" : "rgba(42,42,74,0.5)"}
                  stroke={isHighlight ? "#4c6ef5" : "#333355"}
                  strokeWidth={1}
                />
                <text
                  x={x + colWidth / 2}
                  y={y + rowHeight / 2 + 5}
                  textAnchor="middle"
                  fill={isHighlight ? "#a5b4fc" : "#ccccdd"}
                  fontSize={14}
                >
                  {cell}
                </text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
};
