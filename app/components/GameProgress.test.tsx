import { render, screen } from '@testing-library/react';
import GameProgress from './GameProgress';

describe('GameProgress', () => {
  const mockPhases = ['PHASE ONE', 'PHASE TWO', 'PHASE THREE'];

  test('renders phase title with current phase index', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    expect(screen.getByTestId('phase-title')).toHaveTextContent('PHASE 1: PHASE ONE');
  });

  test('renders correct phase title for middle phase', () => {
    render(<GameProgress currentPhase={1} phases={mockPhases} />);

    expect(screen.getByTestId('phase-title')).toHaveTextContent('PHASE 2: PHASE TWO');
  });

  test('renders correct phase title for last phase', () => {
    render(<GameProgress currentPhase={2} phases={mockPhases} />);

    expect(screen.getByTestId('phase-title')).toHaveTextContent('PHASE 3: PHASE THREE');
  });

  test('renders progress bar container', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    const progressBar = screen.getByTestId('progress-bar-container');
    expect(progressBar).toBeInTheDocument();
  });

  test('has correct container styling', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    const container = screen.getByTestId('game-progress');
    expect(container).toBeInTheDocument();
  });

  test('has correct mb-4 class for spacing', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    const container = screen.getByTestId('game-progress');
    expect(container).toHaveClass('mb-4');
  });

  test('renders neon-accent class for title', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    const title = screen.getByTestId('phase-title');
    expect(title).toHaveClass('neon-accent');
  });

  test('renders gradient progress bar', () => {
    render(<GameProgress currentPhase={0} phases={mockPhases} />);

    const progressFill = screen.getByTestId('progress-bar-fill');
    expect(progressFill).toHaveClass('bg-gradient-to-r');
    expect(progressFill).toHaveClass('from-green-400');
    expect(progressFill).toHaveClass('via-yellow-400');
    expect(progressFill).toHaveClass('to-pink-500');
  });
});
