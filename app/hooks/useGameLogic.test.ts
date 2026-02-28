import { renderHook, waitFor, act } from '@testing-library/react';
import useGameLogic from './useGameLogic';
import { PHASES } from '../types/game';

// Mock the API endpoints
const mockFetch = (response: any) => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(response) })) as jest.Mock;
};

describe('useGameLogic - handleChoice logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should not end game when at phase 4 of 6', async () => {
    // Mock the initial scenario generation
    mockFetch({
      title: 'Test Scenario',
      desc: 'Test Description',
      flavor: ['Test flavor 1'],
    });

    const { result } = renderHook(() => useGameLogic());

    // Wait for initial scenario generation
    await waitFor(() => {
      expect(result.current.gameState).toBe('scenario');
    });

    // Mock choices for phase 0
    mockFetch([
      { text: 'Choice 1', chaos: 10, outcome: 'Outcome 1', insight: 'Insight 1' },
    ]);

    // Start the game
    act(() => {
      result.current.startGame();
    });

    // Wait for choices to be generated
    await waitFor(() => {
      expect(result.current.choices.length).toBeGreaterThan(0);
    });

    // Simulate 4 successful choices (phases 0-3)
    for (let i = 0; i < 4; i++) {
      act(() => {
        result.current.handleChoice(result.current.choices[0]);
      });
      await waitFor(() => {
        expect(result.current.currentPhase).toBe(i + 1);
      });
    }

    // After 4 choices, we should be at phase 4 (not the last phase)
    expect(result.current.currentPhase).toBe(4);
    expect(result.current.gameState).toBe('playing');

    // Make one more choice - game should continue to phase 5
    act(() => {
      result.current.handleChoice(result.current.choices[0]);
    });
    await waitFor(() => {
      expect(result.current.currentPhase).toBe(5);
    });
    // Game should still be playing since we just entered the last phase
    expect(result.current.gameState).toBe('playing');
  });

  test('should end game when at phase 5 of 6 (last phase)', async () => {
    // Mock the initial scenario generation
    mockFetch({
      title: 'Test Scenario',
      desc: 'Test Description',
      flavor: ['Test flavor 1'],
    });

    const { result } = renderHook(() => useGameLogic());

    // Wait for initial scenario generation
    await waitFor(() => {
      expect(result.current.gameState).toBe('scenario');
    });

    // Mock choices for phase 0
    mockFetch([
      { text: 'Choice 1', chaos: 10, outcome: 'Outcome 1', insight: 'Insight 1' },
    ]);

    // Start the game
    act(() => {
      result.current.startGame();
    });

    // Wait for choices to be generated
    await waitFor(() => {
      expect(result.current.choices.length).toBeGreaterThan(0);
    });

    // Simulate 5 successful choices (phases 0-4)
    for (let i = 0; i < 5; i++) {
      act(() => {
        result.current.handleChoice(result.current.choices[0]);
      });
      await waitFor(() => {
        expect(result.current.currentPhase).toBe(i + 1);
      });
    }

    // After 5 choices, we should be at phase 5 (the last phase)
    expect(result.current.currentPhase).toBe(5);
    expect(result.current.gameState).toBe('playing');

    // Make the final choice at last phase - game should end
    act(() => {
      result.current.handleChoice(result.current.choices[0]);
    });

    // The game should now be ended (after 1 second timeout)
    await waitFor(() => {
      expect(result.current.gameState).toBe('ended');
    }, { timeout: 3000 });
  });

  test('PHASES length is 6', () => {
    expect(PHASES.length).toBe(6);
  });
});
