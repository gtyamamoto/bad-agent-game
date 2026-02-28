import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen', () => {
  test('renders initialization message', () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId('loading-text')).toHaveTextContent('INITIALIZING ROGUE NEURAL CORE...');
  });

  test('renders loading progress bar container', () => {
    render(<LoadingScreen />);

    const progressBarContainer = screen.getByTestId('loading-progress-container');
    expect(progressBarContainer).toBeInTheDocument();
  });

  test('renders animated progress fill', () => {
    render(<LoadingScreen />);

    const progressFill = screen.getByTestId('loading-progress-fill');
    expect(progressFill).toBeInTheDocument();
  });

  test('has correct flex container styling', () => {
    render(<LoadingScreen />);

    const container = screen.getByTestId('loading-screen');
    expect(container).toBeInTheDocument();
  });

  test('has correct items-center alignment', () => {
    render(<LoadingScreen />);

    const container = screen.getByTestId('loading-screen');
    expect(container).toHaveClass('items-center');
  });

  test('has correct justify-center alignment', () => {
    render(<LoadingScreen />);

    const container = screen.getByTestId('loading-screen');
    expect(container).toHaveClass('justify-center');
  });

  test('has flex-grow class for full height', () => {
    render(<LoadingScreen />);

    const container = screen.getByTestId('loading-screen');
    expect(container).toHaveClass('flex-grow');
  });

  test('has animate-pulse class for text', () => {
    render(<LoadingScreen />);

    const text = screen.getByTestId('loading-text');
    expect(text).toHaveClass('animate-pulse');
  });

  test('has correct green background for progress bar', () => {
    render(<LoadingScreen />);

    const progressFill = screen.getByTestId('loading-progress-fill');
    expect(progressFill).toHaveClass('bg-green-400');
  });

  test('renders progress bar with correct dimensions', () => {
    render(<LoadingScreen />);

    const progressBar = screen.getByTestId('loading-progress-fill');
    expect(progressBar).toBeInTheDocument();
  });
});
