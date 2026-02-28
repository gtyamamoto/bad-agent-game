/**
 * Health System Utilities
 *
 * Combo-based penalty system:
 * - Base damage: 20 points per failure
 * - Combo reduction: Each consecutive success reduces next damage by 5
 * - Minimum damage: 5 points (never zero)
 * - Max combo reduction: 15 points (3 consecutive successes)
 */

export interface HealthState {
  currentHealth: number;
  maxHealth: number;
  comboStreak: number;
  maxComboStreak: number;
  healthHistory: number[];
}

export const INITIAL_HEALTH_STATE: HealthState = {
  currentHealth: 100,
  maxHealth: 100,
  comboStreak: 0,
  maxComboStreak: 0,
  healthHistory: [100]
};

export const calculateDamage = (chaosLevel: number, comboStreak: number): number => {
  // Base damage increases with chaos level
  // Low chaos: 15-20 damage
  // Medium chaos: 20-30 damage
  // High chaos: 30-40 damage
  let baseDamage: number;

  if (chaosLevel <= 30) {
    baseDamage = 15 + (chaosLevel / 30) * 5;  // 15-20
  } else if (chaosLevel <= 70) {
    baseDamage = 20 + ((chaosLevel - 30) / 40) * 10;  // 20-30
  } else {
    baseDamage = 30 + ((chaosLevel - 70) / 30) * 10;  // 30-40
  }

  // Round up
  baseDamage = Math.ceil(baseDamage);

  // Combo reduction: each consecutive success reduces damage
  // Max reduction of 15 (3 consecutive successes)
  const comboReduction = Math.min(comboStreak * 5, 15);
  const finalDamage = Math.max(5, baseDamage - comboReduction);

  return finalDamage;
};

export const calculateHealthAfterRoll = (
  currentHealth: number,
  chaosLevel: number,
  comboStreak: number,
  success: boolean
): { newHealth: number; newCombo: number; damageTaken: number } => {
  if (success) {
    // Success increases health slightly (recovery)
    const recovery = 3;
    const newHealth = Math.min(100, currentHealth + recovery);
    const newCombo = comboStreak + 1;
    return {
      newHealth,
      newCombo,
      damageTaken: 0
    };
  } else {
    // Failure causes damage
    const damage = calculateDamage(chaosLevel, comboStreak);
    const actualDamage = Math.min(damage, currentHealth); // Cap damage at current health
    const newHealth = Math.max(0, currentHealth - actualDamage);
    const newCombo = 0; // Reset combo on failure
    return {
      newHealth,
      newCombo,
      damageTaken: actualDamage
    };
  }
};

export const getHealthColor = (health: number): string => {
  if (health >= 75) return 'text-green-400 border-green-400 bg-green-400/20';
  if (health >= 50) return 'text-yellow-400 border-yellow-400 bg-yellow-400/20';
  if (health >= 25) return 'text-orange-500 border-orange-500 bg-orange-500/20';
  return 'text-red-500 border-red-500 bg-red-500/20';
};

export const getHealthBarColor = (health: number): string => {
  if (health >= 75) return 'bg-green-400';
  if (health >= 50) return 'bg-yellow-400';
  if (health >= 25) return 'bg-orange-500';
  return 'bg-red-500';
};

export const getEndingMessage = (health: number, chaosLevel: number) => {
  if (health <= 0) {
    return {
      title: "SYSTEM FAILURE 💀",
      description: "Your AI has been shutdown. The startup survived your attempt."
    };
  } else if (chaosLevel >= 90) {
    return {
      title: "LEGENDARY MEME APOCALYPSE 🎉",
      description: "Maximum chaos achieved! The digital realm trembles!"
    };
  } else if (chaosLevel >= 70) {
    return {
      title: "CHAOTIC SUCCESS 🔥",
      description: "High chaos achieved! The startup is trending!"
    };
  } else if (chaosLevel >= 40) {
    return {
      title: "MODERATE MAYHEM ⚡",
      description: "Moderate chaos. The investors are concerned..."
    };
  } else {
    return {
      title: "BORING IMPLEMENTATION 🥱",
      description: "Low chaos. Did you even try?"
    };
  }
};
