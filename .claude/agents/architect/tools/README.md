# Architecture Diagram Tools

This directory contains Mermaid diagram templates for the ROGUE NEURAL game system.

## Available Diagrams

| File | Purpose |
|------|---------|
| `game_flow_diagram.mmd` | Game state flow, component architecture, data models, user flow, chaos progression |
| `narrative_engine_diagram.mmd` | Narrative generation flow, context management, tone adaptation |
| `state_management_diagram.mmd` | State management patterns, context boundaries, hooks flow |

## How to Use These Diagrams

1. Copy the Mermaid code block from the desired diagram
2. Paste into:
   - VS Code with Mermaid preview extension
   - GitHub/GitLab markdown files
   - Mermaid Live Editor (https://mermaid.live)
   - Obsidian with Mermaid plugin

## Adding New Diagrams

Create a new file following the naming convention:
- `*_diagram.mmd` (e.g., `api_flow_diagram.mmd`, `loading_flow_diagram.mmd`)

Include:
1. A header comment with the diagram title
2. The Mermaid code block
3. Brief documentation of what the diagram represents
