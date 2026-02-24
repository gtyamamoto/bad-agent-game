'use client';

import { AnimatePresence } from 'framer-motion';
import useGameLogic from './hooks/useGameLogic';
import ChaosMeter from './components/ChaosMeter';
import ScenarioDisplay from './components/ScenarioDisplay';
import GameInterface from './components/GameInterface';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const {
    gameState,
    scenario,
    currentPhase,
    choices,
    chaosLevel,
    logs,
    isLoading,
    startGame,
    handleChoice,
    resetGame,
    phases
  } = useGameLogic();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chaos Meter */}
      <ChaosMeter chaosLevel={chaosLevel} />

      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {gameState === 'loading' && <LoadingScreen key="loading" />}

          {gameState === 'scenario' && scenario && (
            <ScenarioDisplay
              key="scenario"
              scenario={scenario}
              onStartGame={startGame}
            />
          )}

          {(gameState === 'playing' || gameState === 'ended') && (
            <GameInterface
              key="game"
              currentPhase={currentPhase}
              phases={phases}
              logs={logs}
              choices={choices}
              chaosLevel={chaosLevel}
              gameState={gameState}
              isLoading={isLoading}
              onChoiceSelect={handleChoice}
              onResetGame={resetGame}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>ROGUE NEURAL — AI HIJACK SIMULATOR | YOU ARE THE EVIL AI | CHAOS IS YOUR CURRENCY</p>
      </footer>
    </div>
  );
}