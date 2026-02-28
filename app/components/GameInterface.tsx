'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Choice, LogEntry } from '../types/game';
import { PHASES } from '../types/game';
import ChoiceButton from './ChoiceButton';
import LogPanel from './LogPanel';
import GameProgress from './GameProgress';
import GameEndScreen from './GameEndScreen';
import DiceRoller from './DiceRoller';
import HealthBar from './HealthBar';
import { calculateHealthAfterRoll, INITIAL_HEALTH_STATE, getHealthColor } from '../utils/healthUtils';

interface GameInterfaceProps {
  currentPhase: number;
  phases: typeof PHASES;
  logs: LogEntry[];
  choices: Choice[];
  chaosLevel: number;
  gameState: 'loading' | 'scenario' | 'playing' | 'ended';
  isLoading: boolean;
  onChoiceSelect: (choice: Choice) => void;
  onResetGame: () => void;
  onHealthDepleted: () => void;
}

export default function GameInterface({
  currentPhase,
  phases,
  logs,
  choices,
  chaosLevel,
  gameState,
  isLoading,
  onChoiceSelect,
  onResetGame,
  onHealthDepleted
}: GameInterfaceProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [healthState, setHealthState] = useState(INITIAL_HEALTH_STATE);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [diceRollResult, setDiceRollResult] = useState<{ success: boolean; rollValue: number } | null>(null);
  const [logsState, setLogsState] = useState<LogEntry[]>(logs);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);

  // Sync logs prop to state when game starts
  useEffect(() => {
    setLogsState(logs);
  }, [logs]);

  // Scroll to bottom of logs when new entries are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logsState]);

  const getThreshold = (chaos: number): number => {
    if (chaos <= 30) return 5;
    if (chaos <= 70) return 4;
    return 2;
  };

  const calculateDamage = (chaos: number, combo: number): number => {
    let baseDamage: number;
    if (chaos <= 30) {
      baseDamage = 15 + (chaos / 30) * 5;
    } else if (chaos <= 70) {
      baseDamage = 20 + ((chaos - 30) / 40) * 10;
    } else {
      baseDamage = 30 + ((chaos - 70) / 30) * 10;
    }
    baseDamage = Math.ceil(baseDamage);
    const comboReduction = Math.min(combo * 5, 15);
    return Math.max(5, baseDamage - comboReduction);
  };

  const handleDiceRollComplete = (success: boolean, rollValue: number, choice: Choice) => {
    setDiceRollResult({ success, rollValue });

    if (success) {
      // Success - heal slightly, increase combo
      setHealthState(prev => ({
        ...prev,
        comboStreak: prev.comboStreak + 1,
        maxComboStreak: Math.max(prev.maxComboStreak, prev.comboStreak + 1),
        currentHealth: Math.min(100, prev.currentHealth + 5),
        healthHistory: [...prev.healthHistory, Math.min(100, prev.currentHealth + 5)]
      }));

      // Add to logs only on success
      const newLog: LogEntry = {
        phase: phases[currentPhase],
        choice: choice.text,
        outcome: choice.outcome,
        chaos: choice.chaos,
        diceRoll: rollValue,
        diceSuccess: true
      };

      setLogsState(prev => [...prev, newLog]);
    } else {
      // Failure - apply damage, reset combo
      // Do NOT add to logs on failure
      setHealthState(prev => {
        const result = calculateHealthAfterRoll(prev.currentHealth, choice.chaos, prev.comboStreak, false);
        return {
          ...prev,
          comboStreak: 0,
          currentHealth: result.newHealth,
          healthHistory: [...prev.healthHistory, result.newHealth]
        };
      });
    }
  };

  const resetDiceState = () => {
    setIsDiceRolling(false);
    setSelectedChoice(null);
    setDiceRollResult(null);
    setHasMadeChoice(false);
  };

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setIsDiceRolling(true);
    setDiceRollResult(null);
    setHasMadeChoice(true);
  };

  // Move to next phase after dice roll completes
  useEffect(() => {
    if (diceRollResult !== null && !isLoading && hasMadeChoice && selectedChoice && gameState !== 'ended') {
      // Wait a moment for the user to see the result, then advance
      const timer = setTimeout(() => {
        const currentChoice = selectedChoice;
        resetDiceState();

        // Move to next phase if available, otherwise end game
        if (currentPhase < phases.length - 1) {
          onChoiceSelect(currentChoice);
        } else {
          // At last phase - call onChoiceSelect to trigger game end via handleChoice
          onChoiceSelect(currentChoice);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [diceRollResult, isLoading, hasMadeChoice, currentPhase, phases.length, onChoiceSelect, selectedChoice, gameState]);

  // Clear dice state when game ends or health depleted
  useEffect(() => {
    if (gameState === 'ended' || healthState.currentHealth <= 0) {
      resetDiceState();
      setHasMadeChoice(false);
    }
  }, [gameState, healthState.currentHealth, resetDiceState]);

  return (
    <motion.div
      key="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow flex flex-col"
    >
      {/* Phase Header */}
      <GameProgress currentPhase={currentPhase} phases={phases} />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-grow overflow-hidden">
        {/* Left Panel - Health & Dice (mobile first) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:gap-6">
          {/* Health Panel */}
          <div className={`rounded-lg border-2 p-4 ${getHealthColor(healthState.currentHealth)} transition-colors duration-500`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">SYSTEM INTEGRITY</h3>
              <span className="font-mono font-bold">{healthState.currentHealth}/{healthState.maxHealth}</span>
            </div>
            <HealthBar health={healthState.currentHealth} maxHealth={healthState.maxHealth} />

            <div className="mt-3 flex justify-between items-center text-sm">
              <div className="flex flex-col">
                <span className="text-xs opacity-70">COMBO STREAK</span>
                <span className="font-bold text-lg">
                  {healthState.comboStreak}x {healthState.comboStreak > 0 && <span className="text-orange-500 animate-pulse">🔥</span>}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs opacity-70 block">MAX COMBO</span>
                <span className="font-mono">{healthState.maxComboStreak}x</span>
              </div>
            </div>
          </div>

          {/* Dice Roller */}
          <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 lg:p-6">
            {selectedChoice ? (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-wider text-gray-400">Selected Choice</span>
                  <p className="text-sm md:text-base mt-1 text-cyan-300">{selectedChoice.text}</p>
                </div>
                <DiceRoller
                  chaosLevel={selectedChoice?.chaos || chaosLevel}
                  onRollComplete={(success, rollValue) => handleDiceRollComplete(success, rollValue, selectedChoice)}
                  isRolling={isDiceRolling}
                />
                {diceRollResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                  >
                    <div className="text-sm">
                      Rolled: <span className="font-bold text-cyan-400">{diceRollResult.rollValue}</span>
                    </div>
                    <div className={`text-sm font-bold ${diceRollResult.success ? 'text-green-400' : 'text-red-400'}`}>
                      {diceRollResult.success ? 'SUCCESS - Damage Reduced!' : 'FAILURE - Full Damage Applied'}
                    </div>
                    {diceRollResult.success && (
                      <p className="text-xs text-green-500 animate-pulse">Advancing to next phase...</p>
                    )}
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="h-48 lg:h-64 flex flex-col items-center justify-center text-center opacity-60">
                <div className="text-sm md:text-base mb-2">Select a choice to test your odds</div>
                <div className="text-xs text-gray-500">Risk level: {chaosLevel}%</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Log & Choices */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {/* Log Panel */}
          <div className="flex-grow lg:flex-grow-0">
            <LogPanel logs={logsState} logContainerRef={logContainerRef} />
          </div>

          {/* Choices Panel */}
          <div className="lg:h-1/3 min-h-[200px]">
            <h3 className="text-xl font-bold mb-2 neon-text">EXECUTION OPTIONS</h3>

            {gameState === 'ended' || healthState.currentHealth <= 0 ? (
              <GameEndScreen
                chaosLevel={chaosLevel}
                health={healthState.currentHealth}
                onResetGame={onResetGame}
              />
            ) : isLoading ? (
              <div className="flex items-center justify-center min-h-[200px] lg:h-64">
                <div className="text-lg lg:text-xl animate-pulse">GENERATING EVIL CHOICES...</div>
              </div>
            ) : (
              <div className="space-y-3 lg:space-y-4">
                {choices.map((choice, index) => (
                  <ChoiceButton
                    key={index}
                    choice={choice}
                    onSelect={() => handleChoiceSelect(choice)}
                    disabled={isDiceRolling || diceRollResult !== null || healthState.currentHealth <= 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
