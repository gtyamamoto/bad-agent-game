'use client';

import { motion } from 'framer-motion';
import type { LogEntry } from '../types/game';
import { getChaosColor } from '../utils/chaosUtils';
import type { RefObject } from 'react';

interface LogPanelProps {
  logs: LogEntry[];
  logContainerRef: RefObject<HTMLDivElement>;
}

export default function LogPanel({ logs, logContainerRef }: LogPanelProps) {
  return (
    <div className="flex-grow lg:w-1/2">
      <h3 className="text-xl font-bold mb-2 neon-text">ACTION LOG</h3>
      <div
        ref={logContainerRef}
        className="bg-black border-2 border-green-400 rounded-lg p-4 h-64 overflow-y-auto terminal-border"
      >
        {logs.length === 0 ? (
          <p className="text-gray-500 italic">No actions yet. Make your first move!</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="log-entry border-l-2 border-green-400 pl-3 py-1"
              >
                <div className="font-bold text-sm neon-accent">{log.phase}</div>
                <div className="text-sm">CHOICE: {log.choice}</div>
                <div className="mt-1">{log.outcome}</div>
                <div className="mt-1 text-xs italic neon-highlight">NEURAL INSIGHT: {log.insight}</div>
                <div className="text-xs mt-1">
                  Chaos Increase: <span className={getChaosColor(log.chaos)}>+{log.chaos}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}