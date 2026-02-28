'use client';

import { motion } from 'framer-motion';
import type { Choice } from '../types/game';
import { getChaosColor } from '../utils/chaosUtils';

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: () => void;
  disabled?: boolean;
}

export default function ChoiceButton({ choice, onSelect, disabled = false }: ChoiceButtonProps) {
  const chaosClass = getChaosColor(choice.chaos);

  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled}
      className={`cyber-button w-full text-left p-3 md:p-4 font-bold touch-manipulation transition-opacity ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${
        choice.chaos < 30 ? 'border-green-400' :
        choice.chaos < 70 ? 'border-yellow-400' : 'border-pink-500'
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex justify-between items-center flex-wrap gap-2">
        <span className="text-base md:text-lg flex-grow truncate pr-2">{choice.text}</span>
        <span className={`px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap ${
          choice.chaos < 30 ? 'bg-green-400 text-black' :
          choice.chaos < 70 ? 'bg-yellow-400 text-black' : 'bg-pink-500 text-white'
        }`}>
          CHAOS: {choice.chaos}%
        </span>
      </div>
    </motion.button>
  );
}
