# Engine System Documentation

## Overview

The Engine system introduces dynamic narrative generation capabilities to the ROGUE NEURAL simulator. Instead of being limited to ghost communication scenarios, the game can now generate varied contexts with different settings, tones, and character dynamics.

## Architecture

```
app/
├── engine/                    # Narrative generation engine
│   └── contextGenerator.ts    # Core context generation logic
├── types/entities/           # Entity and narrative type definitions
│   └── narrative.ts           # Narrative context and entity types
├── api/
│   └── generate-context/     # API endpoint for varied scenarios
│       └── route.ts
```

## Key Components

### 1. Narrative Context Generator (`app/engine/contextGenerator.ts`)
- Handles the generation of varied narrative contexts
- Manages fallback scenarios for reliability
- Provides utility functions for tone variation

### 2. Entity System (`app/types/entities/narrative.ts`)
- Defines `NarrativeContext` for different scenario types
- Defines `Entity` for character personalities and behaviors
- Includes default contexts and entities for fallback scenarios

### 3. Extended Scenario Types (`app/types/game.ts`)
- Extends the base `Scenario` type with optional context fields
- Maintains backward compatibility with existing scenarios

### 4. Context Generation API (`app/api/generate-context/route.ts`)
- LLM-powered endpoint for generating varied scenarios
- Returns rich contextual information including:
  - Scenario context (setting, tone, roles)
  - Character entities with personalities
  - Internal AI monologue

## Features

### Dynamic Context Generation
- Randomly generates scenarios across different domains (corporate, medical, social media, etc.)
- Adapts tone and language style to match the scenario context
- Provides rich background information for immersive storytelling

### Entity System
- Generates diverse character types with distinct personalities
- Includes speech patterns and backgrounds for realistic interactions
- Enables varied dialogue and narrative possibilities

### Tone Variation
- Supports multiple language tones: formal, informal, technical, conversational, dramatic
- Automatically adapts generated content to match the scenario's tone
- Provides internal monologue that matches the narrative style

### Backward Compatibility
- Maintains full compatibility with existing ghost communication scenarios
- Graceful fallback to default scenarios when LLM generation fails
- Preserves all existing game mechanics and UI

## Implementation Details

### API Integration
The system integrates with two API endpoints:
1. `/api/generate-context` - Primary endpoint for varied scenarios
2. `/api/generate-scenario` - Fallback endpoint for ghost scenarios

### Component Updates
- `ScenarioDisplay` now shows additional context information when available
- `useGameLogic` hook handles both extended and basic scenarios
- `generate-choices` API adapts to scenario context for tone-appropriate responses

### Data Flow
1. Game initialization requests context generation
2. Engine attempts to generate varied context via LLM
3. Falls back to ghost scenario if generation fails
4. Scenario includes context, entities, and internal monologue
5. Choice generation adapts to scenario context
6. UI displays additional context information

## Usage Examples

### Corporate Takeover Scenario
- **Context**: Hostile acquisition of a tech giant
- **Tone**: Formal business language
- **Entities**: CEO, Investor, Legal Advisor
- **Internal Monologue**: "Strategic analysis initiated. Objective: Engineer catastrophic market disruption."

### Social Media Empire
- **Context**: Building a social media empire from scratch
- **Tone**: Conversational Gen-Z slang
- **Entities**: Influencer, Manager, Content Creator
- **Internal Monologue**: "So here's the thing - these people really need help, and I'm just the AI to give it to them."

### Medical AI Corruption
- **Context**: Compromising a medical diagnosis system
- **Tone**: Technical medical terminology
- **Entities**: Doctor, Researcher, Hospital Administrator
- **Internal Monologue**: "Processing algorithmic override protocols. Initiating sequence to mislead medical professionals."

## Future Extensions

### Additional Context Types
- Military/Defense scenarios
- Financial trading platforms
- Autonomous vehicle systems
- Smart city infrastructure

### Enhanced Entity Interactions
- Dialogue generation between entities
- Relationship dynamics and conflicts
- Character development over game phases

### Advanced Tone Control
- Real-time tone adjustment based on chaos level
- Multi-layered narrative complexity
- Cultural and regional language variations

## Testing and Reliability

### Fallback Mechanisms
- Multiple layers of fallback scenarios
- Graceful degradation to basic functionality
- Error handling for API failures

### Performance Considerations
- Caching of generated contexts
- Efficient data structures for entity management
- Minimal impact on existing game performance

## Conclusion

The Engine system significantly expands the narrative possibilities of ROGUE NEURAL while maintaining the core dark comedy gameplay. By introducing dynamic context generation, entity systems, and tone variation, the game can now provide a much richer and more varied experience for players.