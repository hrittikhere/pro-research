import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export type FlowDiagramProps = {
  nodes: { label: string; description: string }[];
  edges: [number, number][];
  title: string;
};

const NODE_COLORS = ["#4c6ef5", "#40c057", "#fab005", "#f06595", "#845ef7", "#22b8cf"];

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  edges,
  title,
}) => {
  const frame = useCurrentFrame();
  const nodeWidth = 150;
  const nodeHeight = 70;
  const horizontalGap = 60;
  const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * horizontalGap;
  const startX = (900 - totalWidth) / 2;
  const nodeY = 200;

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
          margin: "20px 0",
        }}
      >
        {title}
      </h1>

      <svg width={900} height={420} viewBox="0 0 900 420">
        {/* Edges (arrows) */}
        {edges.map(([from, to], i) => {
          const x1 = startX + from * (nodeWidth + horizontalGap) + nodeWidth;
          const x2 = startX + to * (nodeWidth + horizontalGap);
          const y = nodeY + nodeHeight / 2;
          const edgeDelay = 15 + Math.max(from, to) * 12;

          const progress = interpolate(
            frame,
            [edgeDelay, edgeDelay + 15],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          const arrowX = x1 + (x2 - x1) * progress;

          return (
            <g key={`edge-${i}`}>
              <line
                x1={x1}
                y1={y}
                x2={arrowX}
                y2={y}
                stroke="#555577"
                strokeWidth={2}
              />
              {progress > 0.9 && (
                <polygon
                  points={`${x2},${y} ${x2 - 10},${y - 6} ${x2 - 10},${y + 6}`}
                  fill="#555577"
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const x = startX + i * (nodeWidth + horizontalGap);
          const entryDelay = 5 + i * 10;
          const color = NODE_COLORS[i % NODE_COLORS.length];

          const scale = interpolate(
            frame,
            [entryDelay, entryDelay + 12],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            }
          );

          const textOpacity = interpolate(
            frame,
            [entryDelay + 8, entryDelay + 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g
              key={i}
              transform={`translate(${x + nodeWidth / 2}, ${nodeY + nodeHeight / 2}) scale(${scale}) translate(${-(nodeWidth / 2)}, ${-(nodeHeight / 2)})`}
            >
              <rect
                x={0}
                y={0}
                width={nodeWidth}
                height={nodeHeight}
                rx={12}
                fill={color}
                opacity={0.15}
                stroke={color}
                strokeWidth={2}
              />
              <text
                x={nodeWidth / 2}
                y={28}
                textAnchor="middle"
                fill={color}
                fontSize={16}
                fontWeight={700}
                opacity={textOpacity}
              >
                {node.label}
              </text>
              <text
                x={nodeWidth / 2}
                y={50}
                textAnchor="middle"
                fill="#aaaacc"
                fontSize={11}
                opacity={textOpacity}
              >
                {node.description}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
