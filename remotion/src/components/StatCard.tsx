import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type StatCardProps = {
  stats: { label: string; value: number; suffix: string }[];
  title: string;
};

export const StatCard: React.FC<StatCardProps> = ({ stats, title }) => {
  const frame = useCurrentFrame();
  const cardWidth = Math.min(220, (800 - 40 - (stats.length - 1) * 20) / stats.length);
  const totalWidth = stats.length * cardWidth + (stats.length - 1) * 20;
  const startX = (800 - totalWidth) / 2;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 800,
        height: 300,
        backgroundColor: "#1a1a2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#e0e0e0",
          fontSize: 24,
          fontWeight: 700,
          opacity: titleOpacity,
          margin: "0 0 25px",
        }}
      >
        {title}
      </h1>

      <div style={{ display: "flex", gap: 20 }}>
        {stats.map((stat, i) => {
          const entryDelay = 5 + i * 8;

          const cardScale = interpolate(
            frame,
            [entryDelay, entryDelay + 10],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            }
          );

          const cardOpacity = interpolate(
            frame,
            [entryDelay, entryDelay + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const countProgress = interpolate(
            frame,
            [entryDelay + 5, entryDelay + 35],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          const displayValue = Number.isInteger(stat.value)
            ? Math.round(stat.value * countProgress)
            : (stat.value * countProgress).toFixed(1);

          const colors = ["#4c6ef5", "#40c057", "#fab005", "#f06595", "#845ef7"];
          const color = colors[i % colors.length];

          return (
            <div
              key={i}
              style={{
                width: cardWidth,
                padding: "25px 15px",
                backgroundColor: "rgba(42,42,74,0.6)",
                borderRadius: 16,
                border: `1px solid ${color}33`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
              }}
            >
              <div
                style={{
                  color,
                  fontSize: 36,
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {displayValue}
                <span style={{ fontSize: 18, opacity: 0.8 }}>
                  {stat.suffix}
                </span>
              </div>
              <div
                style={{
                  color: "#aaaacc",
                  fontSize: 13,
                  marginTop: 8,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
