# Pro-Research: Multi-Agent Research Orchestrator

A Claude Code skill that orchestrates parallel research agents to produce deep, evidence-backed reports and blog posts with rich visualizations.

## Features

- **Parallel agent dispatch** -- up to 3 research agents running simultaneously (web, GitHub, document reader)
- **Excalidraw diagrams** -- auto-generated architecture, comparison, and workflow diagrams
- **Remotion animated GIFs** -- bar charts, timelines, flow diagrams, pie charts, stat cards, comparison tables
- **Evidence-based synthesis** -- structured evidence cards with confidence scoring and citation tracking
- **Checkpoint recovery** -- saves research state for session interruption recovery
- **Multiple output formats** -- report, blog post, or both

## Quick Start

1. Clone this repo and open it in Claude Code
2. Run `/pro-research "Your research topic here"`

### Options

```
/pro-research <topic>
  --goal "what you want to learn or decide"
  --audience "who the output targets"
  --output report|blog|both
  --no-confirm          skip intake confirmation
```

## Architecture

```
User invokes /pro-research
       |
   [Intake & Planning]
       |
   [Fan-out: 3 parallel agents]
   /        |        \
Web      GitHub    Document
Research  Analysis  Reader
   \        |        /
   [Fan-in: evidence aggregation]
       |
   [Validation & confidence scoring]
       |
   [Fan-out: parallel visualization]
   /                    \
Excalidraw            Remotion
Diagrams              GIF Renders
   \                    /
   [Synthesis: report/blog with embedded visuals]
       |
   [Output delivery]
```

## Remotion Visualizations

Pre-built animated components:

| Component | Use Case | Duration |
|-----------|----------|----------|
| BarChart | Comparing values | 3s |
| Timeline | Chronological events | 4s |
| FlowDiagram | Architecture/process | 3s |
| PieChart | Proportional data | 2s |
| ComparisonTable | Side-by-side features | 4s |
| StatCard | Key metrics | 2s |

## Project Structure

```
.claude/commands/pro-research.md   # Orchestrator skill
remotion/                          # Remotion GIF project
  src/components/                  # 6 visualization components
templates/                         # Output & diagram templates
  excalidraw/                      # Excalidraw JSON skeletons
```
