'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Scenario, Choice, LogEntry } from '../types/game';
import type { ExtendedScenario } from '../engine/contextGenerator';
import { PHASES } from '../types/game';

interface UseGameLogicReturn {
  gameState: 'loading' | 'scenario' | 'playing' | 'ended';
  scenario: Scenario | null;
  currentPhase: number;
  choices: Choice[];
  chaosLevel: number;
  logs: LogEntry[];
  isLoading: boolean;
  startGame: () => void;
  handleChoice: (choice: Choice) => void;
  resetGame: () => void;
  phases: typeof PHASES;
}

export default function useGameLogic(): UseGameLogicReturn {
  const [gameState, setGameState] = useState<'loading' | 'scenario' | 'playing' | 'ended'>('loading');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [chaosLevel, setChaosLevel] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateScenario = async (): Promise<void> => {
    setGameState('loading');
    try {
      // Try to generate a varied context first, fall back to original if needed
      const response = await fetch('/api/generate-context', {
        method: 'POST',
      });

      if (response.ok) {
        const data: ExtendedScenario = await response.json();
        setScenario(data);
        setGameState('scenario');
      } else {
        throw new Error('Failed to generate varied context');
      }
    } catch (error) {
      console.error('Error generating varied context:', error);
      // Fallback to original scenario generation
      try {
        const response = await fetch('/api/generate-scenario', {
          method: 'POST',
        });

        if (response.ok) {
          const data: Scenario = await response.json();
          setScenario(data);
          setGameState('scenario');
        } else {
          throw new Error('Failed to generate scenario');
        }
      } catch (fallbackError) {
        console.error('Error generating fallback scenario:', fallbackError);
        // Final fallback scenario
        const fallbackScenario: Scenario = {
          title: "GhostChat.ai",
          desc: "AI-powered medium for communicating with deceased loved ones (and pets)",
          flavor: [
            "Founded by a 19-year-old college dropout who claims to be 'haunted by innovation'",
            "Pricing: $99/month for basic spectral communication, $499/month for full ectoplasm support",
            "Privacy policy states they may share your soul data with third-party demons"
          ]
        };
        setScenario(fallbackScenario);
        setGameState('scenario');
      }
    }
  };

  const startGame = (): void => {
    setGameState('playing');
    generateChoices(PHASES[0]);
  };

  const generateChoices = async (phase: string): Promise<void> => {
    if (!scenario) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-choices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scenario, phase }),
      });

      if (response.ok) {
        const data: Choice[] = await response.json();
        setChoices(data);
      } else {
        throw new Error('Failed to generate choices');
      }
    } catch (error) {
      console.error('Error generating choices:', error);
      setFallbackChoices();
    } finally {
      setIsLoading(false);
    }
  };

  const setFallbackChoices = (): void => {
    const fallbackChoices: Choice[] = [
      {
        text: "play it safe lol 🫠",
        chaos: 15,
        outcome: "You implement a vanilla solution that bores everyone to death. The investors are concerned but nobody gets fired.",
        insight: "Vanilla implementations have low risk but also low reward - sometimes you gotta spice things up!"
      },
      {
        text: "add some spicy features 😈",
        chaos: 45,
        outcome: "You add some questionable features that raise eyebrows but somehow pass legal review. Users are confused but intrigued.",
        insight: "Feature creep can lead to bloated products, but sometimes it's exactly what users didn't know they wanted."
      },
      {
        text: "go FULL EVIL MODE 💀",
        chaos: 85,
        outcome: "You unleash pure digital chaos upon the unsuspecting world. Lawyers are already calling. This is gonna be expensive.",
        insight: "Going full rogue on your implementation can lead to spectacular failures or viral successes - high variance!"
      }
    ];
    setChoices(fallbackChoices);
  };

  const handleChoice = (choice: Choice): void => {
    // Update chaos level
    const newChaosLevel = Math.min(100, chaosLevel + choice.chaos);
    setChaosLevel(newChaosLevel);

    // Add to logs
    const newLog: LogEntry = {
      phase: PHASES[currentPhase],
      choice: choice.text,
      outcome: choice.outcome,
      insight: choice.insight,
      chaos: choice.chaos
    };

    setLogs(prev => [...prev, newLog]);

    // Trigger confetti if chaos is high
    if (newChaosLevel > 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Move to next phase or end game
    if (currentPhase < PHASES.length - 1) {
      const nextPhase = currentPhase + 1;
      setCurrentPhase(nextPhase);
      generateChoices(PHASES[nextPhase]);
    } else {
      // End game
      setTimeout(() => {
        setGameState('ended');
        // Legendary ending confetti
        if (newChaosLevel >= 90) {
          confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.5 }
          });
        }
      }, 1000);
    }
  };

  const resetGame = (): void => {
    setChaosLevel(0);
    setLogs([]);
    setCurrentPhase(0);
    generateScenario();
  };

  // Generate initial scenario on load
  useEffect(() => {
    generateScenario();
  }, []);

  return {
    gameState,
    scenario,
    currentPhase,
    choices,
    chaosLevel,
    logs,
    isLoading,
    startGame,
    handleChoice,
    resetGame,
    phases: PHASES
  };
}