'use client';

import { motion } from 'framer-motion';
import { getChaosColor, getEndingMessage } from '../utils/chaosUtils';
import { getEndingMessage as getHealthEndingMessage } from '../utils/healthUtils';

interface GameEndScreenProps {
  chaosLevel: number;
  health: number;
  onResetGame: () => void;
}

export default function GameEndScreen({ chaosLevel, health, onResetGame }: GameEndScreenProps) {
  const chaosEnding = getEndingMessage(chaosLevel);
  const healthEnding = getHealthEndingMessage(health, chaosLevel);
  const finalEnding = health <= 0 ? healthEnding : chaosEnding;

  return (
    <div className="bg-black border-2 border-pink-500 rounded-lg p-4 md:p-6 text-center terminal-border max-w-md mx-auto">
      <h3 className="text-xl md:text-2xl font-bold neon-accent mb-3 md:mb-4">
        {health <= 0 ? 'SYSTEM FAILURE' : 'MISSION COMPLETE'}
      </h3>

      {health <= 0 ? (
        <p className="text-base md:text-xl mb-3 md:mb-4 text-red-500 font-bold">
          INTEGRITY CRITICAL: {health}% (CRASHED)
        </p>
      ) : (
        <p className="text-base md:text-xl mb-3 md:mb-4">
          FINAL CHAOS LEVEL: <span className={getChaosColor(chaosLevel)}>{chaosLevel}%</span>
        </p>
      )}

      <div>
        <p className="text-xl md:text-2xl mb-2">{finalEnding.title}</p>
        <p className="text-sm md:text-base">{finalEnding.description}</p>
      </div>

      {/* Stats Summary */}
      {health > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-900/50 p-2 rounded">
            <span className="block text-gray-400">MAX CHAOS</span>
            <span className="text-yellow-400 font-bold">{chaosLevel}%</span>
          </div>
          <div className="bg-gray-900/50 p-2 rounded">
            <span className="block text-gray-400">SYSTEM SURVIVED</span>
            <span className="text-green-400 font-bold">{health}%</span>
          </div>
        </div>
      )}

      <motion.button
        onClick={onResetGame}
        className="cyber-button text-base md:text-lg px-4 md:px-6 py-2 md:py-3 mt-4 md:mt-6 font-bold w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {health <= 0 ? 'REBOOT SYSTEM' : 'NEW VICTIM'}
      </motion.button>
    </div>
  );
}
