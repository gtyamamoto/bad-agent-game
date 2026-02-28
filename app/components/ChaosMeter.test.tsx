import { render, screen } from '@testing-library/react';
import ChaosMeter from './ChaosMeter';

// Mock the getChaosColor utility
jest.mock('../utils/chaosUtils', () => ({
  getChaosColor: jest.fn(),
}));

describe('ChaosMeter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders chaos level display with low chaos', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-low');

    render(<ChaosMeter chaosLevel={25} />);

    expect(screen.getByTestId('chaos-meter')).toBeInTheDocument();
    expect(screen.getByTestId('chaos-meter-display')).toHaveTextContent('CHAOS: 25%');
  });

  test('renders chaos level display with medium chaos', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-medium');

    render(<ChaosMeter chaosLevel={50} />);

    expect(screen.getByTestId('chaos-meter-display')).toHaveTextContent('CHAOS: 50%');
  });

  test('renders chaos level display with high chaos', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-high');

    render(<ChaosMeter chaosLevel={85} />);

    expect(screen.getByTestId('chaos-meter-display')).toHaveTextContent('CHAOS: 85%');
  });

  test('applies scale animation for high chaos level', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-high');

    render(<ChaosMeter chaosLevel={90} />);

    const element = screen.getByTestId('chaos-meter-display');
    expect(element).toBeInTheDocument();
  });

  test('applies correct min-width for mobile', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-low');

    render(<ChaosMeter chaosLevel={10} />);

    const element = screen.getByTestId('chaos-meter-display');
    expect(element).toHaveClass('min-w-[120px]');
  });

  test('applies correct min-width for desktop', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-low');

    render(<ChaosMeter chaosLevel={10} />);

    const element = screen.getByTestId('chaos-meter-display');
    expect(element).toHaveClass('md:min-w-[140px]');
  });

  test('has correct position fixed styling', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-low');

    render(<ChaosMeter chaosLevel={10} />);

    const container = screen.getByTestId('chaos-meter');
    expect(container).toHaveClass('fixed');
  });

  test('has correct top and right positioning', () => {
    (jest.mocked(require('../utils/chaosUtils').getChaosColor) as jest.Mock).mockReturnValue('chaos-meter-low');

    render(<ChaosMeter chaosLevel={10} />);

    const container = screen.getByTestId('chaos-meter');
    expect(container).toHaveClass('top-2');
    expect(container).toHaveClass('right-2');
  });
});
