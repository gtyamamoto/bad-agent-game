'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChaosColor } from '../utils/chaosUtils';

interface DiceRollerProps {
  chaosLevel: number;
  onRollComplete: (success: boolean, rollValue: number) => void;
  isRolling: boolean;
}

// Custom dice component with cyberpunk aesthetic
function CyberDice({ value, rolling }: { value: number; rolling: boolean }) {
  // Dice face patterns
  const patterns: Record<number, string[]> = {
    1: ['center'],
    2: ['top-left', 'bottom-right'],
    3: ['top-left', 'center', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
  };

  const dots = patterns[value] || [];

  return (
    <motion.div
      className="relative w-20 h-20 md:w-24 md:h-24 bg-black border-4 border-green-500 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.5)]"
      animate={rolling ? {
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 0.9, 1.1, 1]
      } : {}}
      transition={{
        rotate: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.4, times: [1, 1.1, 0.9, 1.1, 1] }
      }}
    >
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1">
        {dots.includes('top-left') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('top-center') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('top-right') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('middle-left') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('center') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('middle-right') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('bottom-left') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('bottom-center') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
        {dots.includes('bottom-right') && (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function DiceRoller({ chaosLevel, onRollComplete, isRolling }: DiceRollerProps) {
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolled, setIsRolled] = useState(false);
  const rollTimeoutRef = useRef<number | null>(null);

  // Calculate success threshold based on chaos level
  // Low chaos (0-30): 5/6 success (easy)
  // Medium chaos (31-70): 4/6 success (moderate)
  // High chaos (71-100): 2/6 success (hard)
  const getSuccessThreshold = (chaos: number): number => {
    if (chaos <= 30) return 5;  // 5/6 chance
    if (chaos <= 70) return 4;  // 4/6 chance
    return 2;                   // 2/6 chance
  };

  const threshold = getSuccessThreshold(chaosLevel);
  const successRate = `${threshold}/6`;

  useEffect(() => {
    return () => {
      if (rollTimeoutRef.current) {
        clearTimeout(rollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRolling && !isRolled) {
      // Trigger the roll animation
      rollTimeoutRef.current = window.setTimeout(() => {
        // Generate random result
        const result = Math.floor(Math.random() * 6) + 1;
        setRollResult(result);
        setIsRolled(true);

        const success = result <= threshold;
        onRollComplete(success, result);
      }, 1000);
    }
  }, [isRolling, isRolled, threshold, onRollComplete]);

  const handleDiceRoll = () => {
    setIsRolled(false);
    setRollResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="text-center mb-4">
        <h3 className="text-sm md:text-base font-bold neon-accent mb-1 tracking-wider">
          ROLL FOR SUCCESS
        </h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs md:text-sm text-cyan-400 font-mono">
            SUCCESS THRESHOLD:
          </span>
          <span className="text-xs md:text-sm font-bold text-green-400 border border-green-500/50 px-2 py-0.5 rounded">
            ≤ {threshold}
          </span>
          <span className="text-xs md:text-sm text-gray-500">({successRate} success rate)</span>
        </div>
      </div>

      <div className="relative">
        <CyberDice value={rollResult || 1} rolling={isRolling} />

        {/* Success/Fail overlays */}
        <AnimatePresence>
          {isRolled && rollResult !== null && (
            <>
              {rollResult <= threshold ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 text-center"
                >
                  <span className="block text-green-400 font-bold text-lg animate-bounce mb-1">
                    SUCCESS!
                  </span>
                  <div className="text-[10px] text-green-400/70">Damage reduced</div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 text-center"
                >
                  <span className="block text-red-500 font-bold text-lg animate-pulse mb-1">
                    FAILURE!
                  </span>
                  <div className="text-[10px] text-red-500/70">Health penalty applied</div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={handleDiceRoll}
        disabled={isRolling}
        className="mt-8 cyber-button px-6 py-3 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isRolling ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">ROLLING...</span>
          </span>
        ) : isRolled ? (
          <span className="flex items-center gap-2">
            <span>ROLL AGAIN</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>INITIATE ROLL</span>
          </span>
        )}
      </motion.button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 font-mono">
          Roll ≤ {threshold} to reduce damage
        </p>
      </div>
    </div>
  );
}
