'use client';

import { motion } from 'framer-motion';
import { getHealthColor, getHealthBarColor } from '../utils/healthUtils';

interface HealthDisplayProps {
  health: number;
  maxHealth: number;
  comboStreak: number;
  maxComboStreak: number;
}

export default function HealthDisplay({
  health,
  maxHealth,
  comboStreak,
  maxComboStreak
}: HealthDisplayProps) {
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div className="fixed top-20 right-2 md:right-4 z-40 w-48 md:w-56">
      <motion.div
        className={`rounded-lg border-2 p-3 ${getHealthColor(health)} backdrop-blur-sm`}
        animate={health < 30 ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3, repeat: health < 30 ? Infinity : 0 }}
      >
        {/* Health Header */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">System Integrity</div>
            <div className="text-2xl md:text-3xl font-bold">{health}/{maxHealth}</div>
          </div>
          {healthPercentage <= 25 && (
            <span className="text-xs font-bold animate-pulse text-red-600">CRITICAL</span>
          )}
        </div>

        {/* Health Bar */}
        <div className="relative h-3 w-full bg-black/30 rounded-full overflow-hidden border border-current border-opacity-30 mb-2">
          <motion.div
            className={`h-full ${healthPercentage <= 25 ? 'bg-red-500' : healthPercentage <= 50 ? 'bg-orange-500' : healthPercentage <= 75 ? 'bg-yellow-400' : 'bg-green-400'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${healthPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
        </div>

        {/* Combo Display */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">COMBO:</span>
            <span className={`font-bold ${comboStreak > 1 ? 'text-orange-400 animate-pulse' : 'text-gray-300'}`}>
              {comboStreak}x
              {comboStreak > 1 && <span className="ml-1">🔥</span>}
            </span>
          </div>
          <div className="text-gray-500">
            MAX: {maxComboStreak}x
          </div>
        </div>
      </motion.div>
    </div>
  );
}
