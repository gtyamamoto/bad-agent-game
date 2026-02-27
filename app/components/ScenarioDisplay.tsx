'use client';

import { motion } from 'framer-motion';
import type { Scenario } from '../types/game';

interface ExtendedScenario extends Scenario {
  context?: {
    name: string;
    description: string;
    tone: string;
    setting: string;
    protagonistRole: string;
    objective: string;
  };
  entities?: Array<{
    name: string;
    personality: string;
    speechPattern: string;
    background: string;
  }>;
  internalMonologue?: string;
}

interface ScenarioDisplayProps {
  scenario: ExtendedScenario;
  onStartGame: () => void;
}

export default function ScenarioDisplay({ scenario, onStartGame }: ScenarioDisplayProps) {
  // Check if this is an extended scenario with additional context
  const isExtendedScenario = scenario.context && scenario.entities;

  return (
    <motion.div
      key="scenario"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow flex flex-col items-center justify-center text-center p-4"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold neon-text mb-4 md:mb-6 leading-tight">
        {scenario.title}
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
        {scenario.desc}
      </p>

      {isExtendedScenario && scenario.context && (
        <div className="bg-black border-2 border-purple-400 p-4 md:p-6 rounded-lg max-w-3xl mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 neon-accent">SCENARIO CONTEXT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
            <div>
              <p className="font-bold">Setting:</p>
              <p>{scenario.context.setting}</p>
            </div>
            <div>
              <p className="font-bold">Your Role:</p>
              <p>{scenario.context.protagonistRole}</p>
            </div>
            <div>
              <p className="font-bold">Objective:</p>
              <p>{scenario.context.objective}</p>
            </div>
          </div>
        </div>
      )}

      {isExtendedScenario && scenario.internalMonologue && (
        <div className="bg-gray-900 border-2 border-pink-500 p-3 md:p-4 rounded-lg max-w-3xl mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-bold mb-2 neon-highlight">INTERNAL MONOLOGUE</h3>
          <p className="italic text-sm md:text-base">"{scenario.internalMonologue}"</p>
        </div>
      )}

      <div className="bg-black border-2 border-green-400 p-4 md:p-6 rounded-lg max-w-3xl mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 neon-accent">STARTUP FLAVOR TEXT:</h3>
        <ul className="space-y-2 text-left">
          {scenario.flavor.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="neon-highlight mr-2 flex-shrink-0">»</span>
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {isExtendedScenario && scenario.entities && scenario.entities.length > 0 && (
        <div className="bg-black border-2 border-yellow-400 p-4 md:p-6 rounded-lg max-w-3xl mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 neon-accent">KEY ENTITIES</h3>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {scenario.entities.map((entity, index) => (
              <div key={index} className="border border-gray-700 p-3 rounded">
                <p className="font-bold">{entity.name}</p>
                <p className="text-xs md:text-sm text-gray-300">{entity.personality}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.button
        onClick={onStartGame}
        className="cyber-button text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 mt-3 md:mt-4 font-bold w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        INFILTRATE STARTUP
      </motion.button>
    </motion.div>
  );
}