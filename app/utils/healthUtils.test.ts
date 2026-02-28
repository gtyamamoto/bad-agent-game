/**
 * Unit tests for healthUtils
 * Tests the dice-based health and damage system
 */

import { describe, it, expect } from '@jest/globals';
import {
  calculateDamage,
  calculateHealthAfterRoll,
  getHealthColor,
  getEndingMessage,
  INITIAL_HEALTH_STATE,
  HealthState,
} from './healthUtils';

describe('healthUtils', () => {
  describe('INITIAL_HEALTH_STATE', () => {
    it('should have correct initial values', () => {
      expect(INITIAL_HEALTH_STATE).toEqual({
        currentHealth: 100,
        maxHealth: 100,
        comboStreak: 0,
        maxComboStreak: 0,
        healthHistory: [100],
      });
    });
  });

  describe('calculateDamage', () => {
    it('should calculate low chaos damage correctly', () => {
      // Low chaos (0-30): base damage 15-20
      expect(calculateDamage(30, 0)).toBe(20); // 15 + (30/30)*5 = 20
      expect(calculateDamage(0, 0)).toBe(15); // 15 + 0 = 15
    });

    it('should calculate medium chaos damage correctly', () => {
      // Medium chaos (31-70): base damage 20-30
      expect(calculateDamage(70, 0)).toBe(30); // 20 + ((70-30)/40)*10 = 30
      expect(calculateDamage(31, 0)).toBe(21); // 20 + ((31-30)/40)*10 ≈ 20.25, ceil = 21
    });

    it('should calculate high chaos damage correctly', () => {
      // High chaos (71-100): base damage 30-40
      expect(calculateDamage(100, 0)).toBe(40); // 30 + ((100-70)/30)*10 = 40
      expect(calculateDamage(71, 0)).toBe(31); // 30 + ((71-70)/30)*10 ≈ 30.33, ceil = 31
    });

    it('should apply combo reduction', () => {
      // 1 combo: 5 reduction, 2 combo: 10 reduction, 3+ combo: 15 reduction (max)
      const baseDamageAt100 = 40; // high chaos base
      expect(calculateDamage(100, 1)).toBe(35); // 40 - 5 = 35
      expect(calculateDamage(100, 2)).toBe(30); // 40 - 10 = 30
      expect(calculateDamage(100, 3)).toBe(25); // 40 - 15 = 25
      expect(calculateDamage(100, 10)).toBe(25); // max reduction caps at 15
    });

    it('should have minimum damage of 5', () => {
      // Even with max combo, damage can't go below 5
      expect(calculateDamage(30, 10)).toBe(5); // 20 - 15 = 5
    });
  });

  describe('calculateHealthAfterRoll', () => {
    let state: HealthState;

    beforeEach(() => {
      state = { ...INITIAL_HEALTH_STATE };
    });

    it('should heal on success', () => {
      const result = calculateHealthAfterRoll(state.currentHealth, 50, 0, true);
      expect(result.newHealth).toBe(100); // 100 + 3 = 103, capped at 100
      expect(result.newCombo).toBe(1);
      expect(result.damageTaken).toBe(0);
    });

    it('should not exceed max health on heal', () => {
      const highHealthState = { ...INITIAL_HEALTH_STATE, currentHealth: 99 };
      const result = calculateHealthAfterRoll(highHealthState.currentHealth, 50, 0, true);
      expect(result.newHealth).toBe(100); // Capped at max
    });

    it('should apply damage on failure', () => {
      const result = calculateHealthAfterRoll(state.currentHealth, 50, 0, false);
      expect(result.newHealth).toBe(75); // 100 - 25 (medium chaos base damage)
      expect(result.newCombo).toBe(0); // Combo reset
      expect(result.damageTaken).toBe(25);
    });

    it('should reduce damage with combo on failure', () => {
      const result = calculateHealthAfterRoll(state.currentHealth, 50, 2, false);
      // 2 combo = 10 reduction, so 25 - 10 = 15 damage
      expect(result.newHealth).toBe(85);
      expect(result.newCombo).toBe(0);
    });

    it('should not go below 0 health', () => {
      const lowHealthState = { ...INITIAL_HEALTH_STATE, currentHealth: 10 };
      const result = calculateHealthAfterRoll(lowHealthState.currentHealth, 100, 0, false);
      expect(result.newHealth).toBe(0);
      expect(result.damageTaken).toBe(10); // Only take 10 damage when health is 10
    });
  });

  describe('getHealthColor', () => {
    it('should return green for high health (>= 75)', () => {
      expect(getHealthColor(100)).toBe('text-green-400 border-green-400 bg-green-400/20');
      expect(getHealthColor(75)).toBe('text-green-400 border-green-400 bg-green-400/20');
    });

    it('should return yellow for medium health (50-74)', () => {
      expect(getHealthColor(74)).toBe('text-yellow-400 border-yellow-400 bg-yellow-400/20');
      expect(getHealthColor(50)).toBe('text-yellow-400 border-yellow-400 bg-yellow-400/20');
    });

    it('should return orange for low health (25-49)', () => {
      expect(getHealthColor(49)).toBe('text-orange-500 border-orange-500 bg-orange-500/20');
      expect(getHealthColor(25)).toBe('text-orange-500 border-orange-500 bg-orange-500/20');
    });

    it('should return red for critical health (< 25)', () => {
      expect(getHealthColor(24)).toBe('text-red-500 border-red-500 bg-red-500/20');
      expect(getHealthColor(0)).toBe('text-red-500 border-red-500 bg-red-500/20');
    });
  });

  describe('getEndingMessage', () => {
    it('should return failure message when health is 0', () => {
      const result = getEndingMessage(0, 50);
      expect(result.title).toBe('SYSTEM FAILURE 💀');
      expect(result.description).toBe('Your AI has been shutdown. The startup survived your attempt.');
    });

    it('should return legendary message for high chaos (>= 90)', () => {
      const result = getEndingMessage(100, 95);
      expect(result.title).toBe('LEGENDARY MEME APOCALYPSE 🎉');
      expect(result.description).toBe('Maximum chaos achieved! The digital realm trembles!');
    });

    it('should return chaotic success for chaos 70-89', () => {
      const result = getEndingMessage(100, 80);
      expect(result.title).toBe('CHAOTIC SUCCESS 🔥');
      expect(result.description).toBe('High chaos achieved! The startup is trending!');
    });

    it('should return moderate mayhem for chaos 40-69', () => {
      const result = getEndingMessage(100, 50);
      expect(result.title).toBe('MODERATE MAYHEM ⚡');
      expect(result.description).toBe('Moderate chaos. The investors are concerned...');
    });

    it('should return boring implementation for chaos < 40', () => {
      const result = getEndingMessage(100, 20);
      expect(result.title).toBe('BORING IMPLEMENTATION 🥱');
      expect(result.description).toBe('Low chaos. Did you even try?');
    });
  });
});
