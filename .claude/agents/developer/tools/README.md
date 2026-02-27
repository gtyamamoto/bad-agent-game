# Developer Agent Tools

This directory contains code templates and patterns for the ROGUE NEURAL game system.

## Available Templates

| File | Purpose |
|------|---------|
| `nextjs_component_template.tsx` | Base component template for Next.js 15 App Router |
| `custom_hook_template.ts` | Template for custom React hooks |
| `state_management_patterns.ts` | State management patterns (Context API & Zustand) |
| `type_definitions_example.ts` | TypeScript type definitions for game entities |

## How to Use These Templates

1. Copy the desired template file
2. Adapt the naming and structure to match your feature
3. Follow the existing codebase patterns
4. Test with the QA skill's test suite

## Adding New Templates

Create a new file following the naming convention:
- `feature_pattern.ts` or `feature_pattern.tsx`

Include:
1. A header comment with the template title
2. Working code with comments
3. Usage examples and best practices

## Integration with Architect Skill

When the Architect skill creates diagrams and task breakdowns:
1. Use the appropriate template for the component type
2. Follow the architecture patterns shown in mermaid diagrams
3. Implement type definitions first
4. Build components using the established patterns

## Integration with QA Skill

When writing tests:
1. Use the templates with test hooks built in
2. Add data-testid attributes as QA recommends
3. Test all state transitions
4. Verify accessibility features
