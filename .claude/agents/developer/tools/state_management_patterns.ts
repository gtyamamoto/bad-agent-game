/**
 * ROGUE NEURAL - State Management Patterns
 *
 * This file documents the state management approach for ROGUE NEURAL
 *
 * Options considered:
 * - Context API: Simple, built-in, good for medium complexity
 * - Zustand: Minimal boilerplate, good devtools, recommended
 * - Jotai: Atomic, fine-grained control, more verbose
 *
 * Decision: Use Context API for game state, with potential migration to Zustand
 * if complexity grows significantly.
 */

/**
 * Context API Pattern (Current Implementation)
 *
 * Directory: app/contexts/
 *
 * Structure:
 * - GameContext: Main game state provider
 * - ScenarioContext: Scenario-specific data
 * - UIContext: UI state (modals, loading, etc.)
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Type definitions
interface GameState {
    gameState: 'loading' | 'scenario' | 'playing' | 'ended';
    chaosLevel: number;
    currentPhaseIndex: number;
    logs: Log[];
    isPlaying: boolean;
}

interface GameContextType {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}

// Initial state
const initialState: GameState = {
    gameState: 'loading',
    chaosLevel: 0,
    currentPhaseIndex: 0,
    logs: [],
    isPlaying: false,
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'SET_GAME_STATE':
            return { ...state, gameState: action.payload };
        case 'UPDATE_CHAOS':
            return { ...state, chaosLevel: Math.max(0, Math.min(100, action.payload)) };
        case 'SET_PLAYING':
            return { ...state, isPlaying: action.payload };
        case 'ADD_LOG':
            return { ...state, logs: [...state.logs, action.payload] };
        case 'NEXT_PHASE':
            return { ...state, currentPhaseIndex: state.currentPhaseIndex + 1 };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

// Actions
type GameAction =
    | { type: 'SET_GAME_STATE'; payload: GameState['gameState'] }
    | { type: 'UPDATE_CHAOS'; payload: number }
    | { type: 'SET_PLAYING'; payload: boolean }
    | { type: 'ADD_LOG'; payload: Log }
    | { type: 'NEXT_PHASE' }
    | { type: 'RESET' };

// Context creation
const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export function GameProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

// Custom hook for using game context
export function useGameContext() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
}

/**
 * Alternative: Zustand Pattern (For potential migration)
 *
 * Install: npm install zustand
 *
 * Pros:
 * - Less boilerplate than Context API
 * - Built-in devtools support
 * - Fine-grained reactivity
 * - No provider needed
 *
 * Cons:
 * - External dependency
 * - Learning curve for team
 *
 * Implementation:
 */

/* eslint-disable */
// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// interface GameStore {
//     gameState: GameState;
//     chaosLevel: number;
//     currentPhaseIndex: number;
//     logs: Log[];
//
//     // Actions
//     setGameState: (state: GameState['gameState']) => void;
//     updateChaos: (amount: number) => void;
//     addLog: (log: Log) => void;
//     nextPhase: () => void;
//     reset: () => void;
// }
//
// export const useGameStore = create<GameStore>()(
//     devtools(
//         persist(
//             (set) => ({
//                 gameState: 'loading',
//                 chaosLevel: 0,
//                 currentPhaseIndex: 0,
//                 logs: [],
//
//                 setGameState: (gameState) => set({ gameState }),
//                 updateChaos: (amount) => set((state) => ({
//                     chaosLevel: Math.max(0, Math.min(100, state.chaosLevel + amount)),
//                 })),
//                 addLog: (log) => set((state) => ({
//                     logs: [...state.logs, log],
//                 })),
//                 nextPhase: () => set((state) => ({
//                     currentPhaseIndex: state.currentPhaseIndex + 1,
//                 })),
//                 reset: () => set({
//                     gameState: 'loading',
//                     chaosLevel: 0,
//                     currentPhaseIndex: 0,
//                     logs: [],
//                 }),
//             }),
//             {
//                 name: 'game-storage', // localStorage key
//             }
//         )
//     )
// );
/* eslint-enable */

/**
 * Pattern Selection Guide
 *
 * Use Context API when:
 * - State is shared across few components
 * - State updates are infrequent
 * - You want to avoid external dependencies
 * - Components are in close proximity
 *
 * Use Zustand when:
 * - State is shared across many components
 * - You need fine-grained reactivity
 * - You want devtools integration
 * - State needs persistence
 * - Components are far apart in the tree
 */

/**
 * Performance Considerations
 *
 * 1. Context Performance
 *    - Use multiple contexts for unrelated state
 *    - Memoize values passed to Context.Provider
 *    - Consider Context.Consumer for read-only access
 *
 * 2. State Normalization
 *    - Normalize nested state for better updates
 *    - Use IDs for entity references
 *
 * 3. Batch Updates
 *    - React 18 batches updates automatically
 *    - Use flushSync for immediate updates (rarely needed)
 */
