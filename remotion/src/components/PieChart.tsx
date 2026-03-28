import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type PieChartProps = {
  segments: { label: string; value: number; color: string }[];
  title: string;
};

export const PieChart: React.FC<PieChartProps> = ({ segments, title }) => {
  const frame = useCurrentFrame();
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const cx = 250;
  const cy = 250;
  const radius = 140;
  const innerRadius = 70;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const sweepProgress = interpolate(frame, [5, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  let currentAngle = -Math.PI / 2;

  const describeArc = (
    startAngle: number,
    endAngle: number,
    outerR: number,
    innerR: number
  ) => {
    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <div
      style={{
        width: 600,
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

      <svg width={500} height={420} viewBox="0 0 500 420">
        {segments.map((segment, i) => {
          const segmentAngle = (segment.value / total) * Math.PI * 2;
          const startAngle = currentAngle;
          const endAngle = startAngle + segmentAngle * sweepProgress;
          currentAngle += segmentAngle;

          const midAngle = startAngle + (segmentAngle * sweepProgress) / 2;
          const labelR = radius + 25;
          const labelX = cx + labelR * Math.cos(midAngle);
          const labelY = cy + labelR * Math.sin(midAngle);

          const labelOpacity = interpolate(
            frame,
            [35 + i * 3, 50 + i * 3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={i}>
              <path
                d={describeArc(startAngle, endAngle, radius, innerRadius)}
                fill={segment.color}
                opacity={0.85}
              />
              {sweepProgress > 0.8 && (
                <>
                  <text
                    x={labelX}
                    y={labelY - 6}
                    textAnchor="middle"
                    fill="#e0e0e0"
                    fontSize={13}
                    fontWeight={600}
                    opacity={labelOpacity}
                  >
                    {segment.label}
                  </text>
                  <text
                    x={labelX}
                    y={labelY + 12}
                    textAnchor="middle"
                    fill="#aaaacc"
                    fontSize={11}
                    opacity={labelOpacity}
                  >
                    {Math.round((segment.value / total) * 100)}%
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          fill="#e0e0e0"
          fontSize={20}
          fontWeight={700}
          opacity={interpolate(frame, [40, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          {total}
        </text>
      </svg>
    </div>
  );
};
