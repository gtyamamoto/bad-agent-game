'use client';

import { motion } from 'framer-motion';
import { getChaosColor, getEndingMessage } from '../utils/chaosUtils';

interface GameEndScreenProps {
  chaosLevel: number;
  onResetGame: () => void;
}

export default function GameEndScreen({ chaosLevel, onResetGame }: GameEndScreenProps) {
  const ending = getEndingMessage(chaosLevel);

  return (
    <div className="bg-black border-2 border-pink-500 rounded-lg p-4 md:p-6 text-center terminal-border max-w-md mx-auto">
      <h3 className="text-xl md:text-2xl font-bold neon-accent mb-3 md:mb-4">MISSION COMPLETE</h3>
      <p className="text-base md:text-xl mb-3 md:mb-4">
        FINAL CHAOS LEVEL: <span className={getChaosColor(chaosLevel)}>{chaosLevel}%</span>
      </p>

      <div>
        <p className="text-xl md:text-2xl mb-2">{ending.title}</p>
        <p className="text-sm md:text-base">{ending.description}</p>
      </div>

      <motion.button
        onClick={onResetGame}
        className="cyber-button text-base md:text-lg px-4 md:px-6 py-2 md:py-3 mt-4 md:mt-6 font-bold w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        NEW VICTIM
      </motion.button>
    </div>
  );
}