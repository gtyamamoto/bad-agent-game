'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { Choice, LogEntry } from '../types/game';
import ChoiceButton from './ChoiceButton';
import LogPanel from './LogPanel';
import GameProgress from './GameProgress';
import GameEndScreen from './GameEndScreen';

interface GameInterfaceProps {
  currentPhase: number;
  phases: string[];
  logs: LogEntry[];
  choices: Choice[];
  chaosLevel: number;
  gameState: 'playing' | 'ended';
  isLoading: boolean;
  onChoiceSelect: (choice: Choice) => void;
  onResetGame: () => void;
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
  onResetGame
}: GameInterfaceProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of logs when new entries are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      key="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow flex flex-col"
    >
      {/* Phase Header */}
      <GameProgress currentPhase={currentPhase} phases={phases} />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-grow">
        {/* Log Panel - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2">
          <LogPanel logs={logs} logContainerRef={logContainerRef} />
        </div>

        {/* Choices Panel - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-xl font-bold mb-2 neon-text">EXECUTION OPTIONS</h3>

          {gameState === 'ended' ? (
            <GameEndScreen
              chaosLevel={chaosLevel}
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
                  onSelect={() => onChoiceSelect(choice)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}