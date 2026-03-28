import React from "react";
import { Composition } from "remotion";
import { BarChart, type BarChartProps } from "./components/BarChart";
import { Timeline, type TimelineProps } from "./components/Timeline";
import { FlowDiagram, type FlowDiagramProps } from "./components/FlowDiagram";
import { PieChart, type PieChartProps } from "./components/PieChart";
import { ComparisonTable, type ComparisonTableProps } from "./components/ComparisonTable";
import { StatCard, type StatCardProps } from "./components/StatCard";
import { RadarChart, type RadarChartProps } from "./components/RadarChart";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="BarChart"
        component={BarChart}
        durationInFrames={90}
        fps={30}
        width={800}
        height={500}
        defaultProps={{
          labels: ["A", "B", "C"],
          values: [30, 70, 50],
          title: "Comparison",
          color: "#4c6ef5",
        } satisfies BarChartProps}
      />
      <Composition
        id="Timeline"
        component={Timeline}
        durationInFrames={120}
        fps={30}
        width={900}
        height={400}
        defaultProps={{
          events: [
            { date: "2024", label: "Start" },
            { date: "2025", label: "Growth" },
            { date: "2026", label: "Scale" },
          ],
          title: "Timeline",
        } satisfies TimelineProps}
      />
      <Composition
        id="FlowDiagram"
        component={FlowDiagram}
        durationInFrames={90}
        fps={30}
        width={900}
        height={500}
        defaultProps={{
          nodes: [
            { label: "Input", description: "Data entry" },
            { label: "Process", description: "Transform" },
            { label: "Output", description: "Result" },
          ],
          edges: [[0, 1], [1, 2]],
          title: "Flow",
        } satisfies FlowDiagramProps}
      />
      <Composition
        id="PieChart"
        component={PieChart}
        durationInFrames={60}
        fps={30}
        width={600}
        height={500}
        defaultProps={{
          segments: [
            { label: "A", value: 40, color: "#4c6ef5" },
            { label: "B", value: 35, color: "#40c057" },
            { label: "C", value: 25, color: "#fab005" },
          ],
          title: "Distribution",
        } satisfies PieChartProps}
      />
      <Composition
        id="ComparisonTable"
        component={ComparisonTable}
        durationInFrames={120}
        fps={30}
        width={900}
        height={500}
        defaultProps={{
          headers: ["Feature", "Option A", "Option B"],
          rows: [
            ["Speed", "Fast", "Moderate"],
            ["Cost", "High", "Low"],
            ["Quality", "Excellent", "Good"],
          ],
          title: "Comparison",
          highlightColumn: 1,
        } satisfies ComparisonTableProps}
      />
      <Composition
        id="StatCard"
        component={StatCard}
        durationInFrames={60}
        fps={30}
        width={800}
        height={300}
        defaultProps={{
          stats: [
            { label: "Users", value: 10000, suffix: "+" },
            { label: "Growth", value: 85, suffix: "%" },
            { label: "Rating", value: 4.9, suffix: "/5" },
          ],
          title: "Key Metrics",
        } satisfies StatCardProps}
      />
      <Composition
        id="RadarChart"
        component={RadarChart}
        durationInFrames={90}
        fps={30}
        width={800}
        height={500}
        defaultProps={{
          axes: ["Speed", "Cost", "Quality", "Support", "Ecosystem"],
          datasets: [
            { label: "Option A", values: [8, 6, 9, 7, 8], color: "#4c6ef5" },
            { label: "Option B", values: [6, 9, 7, 8, 5], color: "#40c057" },
          ],
          title: "Multi-Dimensional Comparison",
          maxValue: 10,
        } satisfies RadarChartProps}
      />
    </>
  );
};
