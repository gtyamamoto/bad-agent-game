'use client';

import { motion } from 'framer-motion';
import { getChaosColor } from '../utils/chaosUtils';

interface ChaosMeterProps {
  chaosLevel: number;
}

export default function ChaosMeter({ chaosLevel }: ChaosMeterProps) {
  const chaosClass = getChaosColor(chaosLevel);

  return (
    <div className="fixed top-4 right-4 z-10">
      <motion.div
        className={`text-2xl font-bold px-4 py-2 border-2 border-current terminal-border ${chaosClass}`}
        animate={chaosLevel > 70 ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5, repeat: chaosLevel > 70 ? Infinity : 0 }}
      >
        CHAOS: {chaosLevel}%
      </motion.div>
    </div>
  );
}