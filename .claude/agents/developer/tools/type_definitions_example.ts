/**
 * ROGUE NEURAL - Type Definitions
 *
 * This file contains TypeScript type definitions for game entities
 * Follows strict typing patterns for type safety
 */

// Base types
export type GameStatus = 'loading' | 'scenario' | 'playing' | 'ended';
export type ChaosLevel = number; // 0-100
export type PhaseIndex = number;

// Log types
export interface Log {
    id: string;
    timestamp: Date;
    type: LogType;
    content: string;
}

export type LogType =
    | 'system'
    | 'ai'
    | 'player'
    | 'chaos'
    | 'phase'
    | 'ending';

// Scenario types
export interface Scenario {
    id: string;
    title: string;
    description: string;
    context: string;
    initialChaos: number;
    entities: Entity[];
    phases: Phase[];
}

export interface Entity {
    id: string;
    name: string;
    role: string;
    archetype: Archetype;
    personality: Personality;
    goals: string[];
    fears: string[];
}

export type Archetype =
    | 'machiavelli'
    | 'narcissist'
    | 'sadist'
    | 'paranoid'
    | 'perfectionist';

export interface Personality {
    openness: number;        // 0-100
    conscientiousness: number; // 0-100
    extraversion: number;      // 0-100
    agreeableness: number;     // 0-100
    neuroticism: number;       // 0-100
    machiavellianism: number;  // 0-100
    narcissism: number;        // 0-100
    sadism: number;            // 0-100
}

// Phase types
export interface Phase {
    id: string;
    title: string;
    prompt: string;
    choices: Choice[];
    aiContext: AIContext;
}

export interface Choice {
    id: string;
    text: string;
    chaosImpact: number; // -100 to +100
    narrativeImpact: NarrativeImpact;
}

export interface NarrativeImpact {
    type: 'trust' | 'fear' | 'knowledge' | 'power';
    target: string; // Entity ID
    change: number;
}

export interface AIContext {
    chaosLevel: number;
    entityStates: Map<string, EntityState>;
    history: string[];
}

export interface EntityState {
    entityId: string;
    trust: number;     // 0-100
    fear: number;      // 0-100
    knowledge: number; // 0-100
    lastInteraction: Date;
}

// Game state types
export interface GameState {
    status: GameStatus;
    scenario: Scenario | null;
    chaosLevel: ChaosLevel;
    currentPhaseIndex: PhaseIndex;
    phases: Phase[];
    logs: Log[];
    entityStates: Map<string, EntityState>;
    history: GameResult[];
}

export interface GameResult {
    chaosLevel: number;
    endingType: EndingType;
    choices: string[];
    timestamp: Date;
}

export type EndingType =
    | 'explosive'
    | 'hackerman'
    | 'betrayal';

// Performance optimization types
export type MemoizedFunction<T> = (...args: any[]) => T;

export interface DebouncedFunction<T> {
    (...args: any[]): void;
    cancel(): void;
}

// Animation types
export type AnimationVariant = {
    initial: Record<string, number | string>;
    animate: Record<string, number | string>;
    exit?: Record<string, number | string>;
};

export type AnimationDuration = number | {
    enter: number;
    exit: number;
};

// API response types
export interface AIResponse {
    success: boolean;
    data?: {
        narrative: string;
        choices: Choice[];
        chaosChange: number;
    };
    error?: string;
}

// Utility types
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type AsyncFunction<T> = (...args: any[]) => Promise<T>;
