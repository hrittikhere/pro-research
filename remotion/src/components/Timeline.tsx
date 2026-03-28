import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type TimelineProps = {
  events: { date: string; label: string }[];
  title: string;
};

export const Timeline: React.FC<TimelineProps> = ({ events, title }) => {
  const frame = useCurrentFrame();
  const lineY = 200;
  const margin = 100;
  const usableWidth = 900 - margin * 2;
  const spacing = events.length > 1 ? usableWidth / (events.length - 1) : 0;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lineProgress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 900,
        height: 400,
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
          margin: "20px 0",
        }}
      >
        {title}
      </h1>

      <svg width={900} height={320} viewBox="0 0 900 320">
        {/* Main timeline line */}
        <line
          x1={margin}
          y1={lineY}
          x2={margin + usableWidth * lineProgress}
          y2={lineY}
          stroke="#4c6ef5"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {events.map((event, i) => {
          const x = margin + i * spacing;
          const entryDelay = 20 + i * 15;

          const dotScale = interpolate(
            frame,
            [entryDelay, entryDelay + 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(2)),
            }
          );

          const textOpacity = interpolate(
            frame,
            [entryDelay + 5, entryDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const textY = interpolate(
            frame,
            [entryDelay + 5, entryDelay + 20],
            [10, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          const isAbove = i % 2 === 0;

          return (
            <g key={i}>
              {/* Connector line */}
              <line
                x1={x}
                y1={lineY}
                x2={x}
                y2={isAbove ? lineY - 40 : lineY + 40}
                stroke="#4c6ef5"
                strokeWidth={1.5}
                opacity={dotScale * 0.5}
                strokeDasharray="3,3"
              />

              {/* Dot */}
              <circle
                cx={x}
                cy={lineY}
                r={8 * dotScale}
                fill="#4c6ef5"
              />
              <circle
                cx={x}
                cy={lineY}
                r={4 * dotScale}
                fill="#1a1a2e"
              />

              {/* Date */}
              <text
                x={x}
                y={isAbove ? lineY - 55 + textY : lineY + 65 + textY}
                textAnchor="middle"
                fill="#4c6ef5"
                fontSize={14}
                fontWeight={700}
                opacity={textOpacity}
              >
                {event.date}
              </text>

              {/* Label */}
              <text
                x={x}
                y={isAbove ? lineY - 75 + textY : lineY + 85 + textY}
                textAnchor="middle"
                fill="#e0e0e0"
                fontSize={13}
                opacity={textOpacity}
              >
                {event.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
