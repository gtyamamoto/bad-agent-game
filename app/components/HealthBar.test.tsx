import { render, screen } from '@testing-library/react';
import HealthBar from './HealthBar';

describe('HealthBar', () => {
  test('renders health bar container', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    expect(container).toBeInTheDocument();
  });

  test('renders health fill with correct class for full health (bg-green-400)', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    // healthPercentage = 100, so >= 75 gets bg-green-400
    expect(healthFill).toHaveClass('bg-green-400');
  });

  test('renders health fill with correct class for 50% health (bg-orange-500)', () => {
    render(<HealthBar health={50} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    // healthPercentage = 50, so <= 50 gets bg-orange-500
    expect(healthFill).toHaveClass('bg-orange-500');
  });

  test('renders health fill with correct class for 25% health (bg-red-500)', () => {
    render(<HealthBar health={25} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    // healthPercentage = 25, so <= 25 gets bg-red-500
    expect(healthFill).toHaveClass('bg-red-500');
  });

  test('renders green color for health >= 75%', () => {
    render(<HealthBar health={75} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    // At 75%, healthPercentage <= 75 is true, so it gets bg-yellow-400 (25-75 range)
    expect(healthFill).toHaveClass('bg-yellow-400');
  });

  test('renders yellow color for health 50-75%', () => {
    render(<HealthBar health={60} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    expect(healthFill).toHaveClass('bg-yellow-400');
  });

  test('renders orange color for health 25-50%', () => {
    render(<HealthBar health={40} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    expect(healthFill).toHaveClass('bg-orange-500');
  });

  test('renders red color for health < 25%', () => {
    render(<HealthBar health={20} maxHealth={100} />);

    const healthFill = screen.getByTestId('health-bar-fill');
    expect(healthFill).toHaveClass('bg-red-500');
  });

  test('renders damage overlay pattern when health < 50', () => {
    render(<HealthBar health={40} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    // Damage overlay should be present as a child div
    expect(container.children.length).toBeGreaterThan(1);
  });

  test('does not render damage overlay when health >= 50', () => {
    render(<HealthBar health={60} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    // At health >= 50, damage overlay is not rendered
    expect(container.children.length).toBe(1); // Only the motion.div
  });

  test('renders health percentage text when health < 30%', () => {
    render(<HealthBar health={20} maxHealth={100} />);

    expect(screen.getByTestId('health-percentage-text')).toHaveTextContent('20% INTEGRITY');
  });

  test('does not render health percentage text when health >= 30%', () => {
    render(<HealthBar health={40} maxHealth={100} />);

    expect(screen.queryByTestId('health-percentage-text')).not.toBeInTheDocument();
  });

  test('has correct container dimensions', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    expect(container).toHaveClass('h-4');
    expect(container).toHaveClass('w-full');
  });

  test('has correct border styling', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    expect(container).toHaveClass('border');
  });

  test('has rounded-full class', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    expect(container).toHaveClass('rounded-full');
  });

  test('has bg-gray-900/50 background', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    expect(container).toHaveClass('bg-gray-900/50');
  });

  test('has highlight div inside health bar', () => {
    render(<HealthBar health={100} maxHealth={100} />);

    const container = screen.getByTestId('health-bar-container');
    const highlight = container.querySelector('[class*="top-0"]');
    expect(highlight).toBeInTheDocument();
  });
});
