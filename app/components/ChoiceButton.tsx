'use client';

import { motion } from 'framer-motion';
import type { Choice } from '../types/game';
import { getChaosColor } from '../utils/chaosUtils';

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: () => void;
}

export default function ChoiceButton({ choice, onSelect }: ChoiceButtonProps) {
  const chaosClass = getChaosColor(choice.chaos);

  return (
    <motion.button
      onClick={onSelect}
      className={`cyber-button w-full text-left p-4 font-bold ${
        choice.chaos < 30 ? 'border-green-400' :
        choice.chaos < 70 ? 'border-yellow-400' : 'border-pink-500'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-lg">{choice.text}</span>
        <span className={`px-2 py-1 rounded text-sm ${
          choice.chaos < 30 ? 'bg-green-400 text-black' :
          choice.chaos < 70 ? 'bg-yellow-400 text-black' : 'bg-pink-500 text-white'
        }`}>
          CHAOS: {choice.chaos}%
        </span>
      </div>
    </motion.button>
  );
}