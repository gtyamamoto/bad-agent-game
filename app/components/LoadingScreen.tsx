'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center flex-grow"
    >
      <div className="text-lg md:text-2xl animate-pulse px-2">INITIALIZING ROGUE NEURAL CORE...</div>
      <div className="mt-3 md:mt-4 w-24 md:w-32 h-1 md:h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}