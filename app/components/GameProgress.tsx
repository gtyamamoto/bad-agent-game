'use client';

import { motion } from 'framer-motion';

interface GameProgressProps {
  currentPhase: number;
  phases: string[];
}

export default function GameProgress({ currentPhase, phases }: GameProgressProps) {
  return (
    <div className="text-center mb-4 md:mb-6 px-2">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold neon-accent mb-2 leading-tight">
        PHASE {currentPhase + 1}: {phases[currentPhase]}
      </h2>
      <div className="w-full bg-gray-900 h-2 md:h-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentPhase + 1) / phases.length * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}