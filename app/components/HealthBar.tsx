'use client';

import { motion } from 'framer-motion';

interface HealthBarProps {
  health: number;
  maxHealth: number;
}

export default function HealthBar({ health, maxHealth }: HealthBarProps) {
  const healthPercentage = (health / maxHealth) * 100;

  // Determine damage effects based on health percentage
  const getDamageStyle = (percent: number) => {
    if (percent <= 25) return 'animate-pulse';
    if (percent <= 50) return 'animate-pulse';
    if (percent <= 75) return '';
    return '';
  };

  const damageAnimation = getDamageStyle(healthPercentage);

  return (
    <div data-testid="health-bar-container" className="relative h-4 md:h-6 w-full bg-gray-900/50 rounded-full overflow-hidden border border-current border-opacity-30">
      {/* Damage overlay pattern */}
      {health < 50 && (
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(220,38,38,0.1)_25%,transparent_25%,transparent_50%,rgba(220,38,38,0.1)_50%,rgba(220,38,38,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-50"></div>
      )}

      {/* Health fill */}
      <motion.div
        data-testid="health-bar-fill"
        className={`h-full ${healthPercentage <= 25 ? 'bg-red-500' : healthPercentage <= 50 ? 'bg-orange-500' : healthPercentage <= 75 ? 'bg-yellow-400' : 'bg-green-400'}`}
        initial={{ width: '0%' }}
        animate={{ width: `${healthPercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Health bar highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
      </motion.div>

      {/* Health number inside bar if low */}
      {healthPercentage < 30 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span data-testid="health-percentage-text" className="text-[10px] md:text-xs font-bold text-white drop-shadow-md">
            {health}% INTEGRITY
          </span>
        </div>
      )}
    </div>
  );
}
