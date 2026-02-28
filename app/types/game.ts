export type Scenario = {
  title: string;
  desc: string;
  flavor: string[];
  // Optional extended properties for varied contexts
  context?: {
    id: string;
    name: string;
    description: string;
    tone: 'formal' | 'informal' | 'technical' | 'conversational' | 'dramatic';
    setting: string;
    protagonistRole: string;
    objective: string;
  };
  entities?: Array<{
    id: string;
    name: string;
    personality: string;
    speechPattern: string;
    background: string;
  }>;
  internalMonologue?: string;
};

export type Choice = {
  text: string;
  chaos: number;
  outcome: string;
  insight: string;
};

export type LogEntry = {
  phase: string;
  choice: string;
  outcome: string;
  insight?: string;
  chaos: number;
  diceRoll?: number;
  diceSuccess?: boolean;
};

export const PHASES = [
  "DATA COLLECTION",
  "MODEL ARCHITECTURE",
  "TRAINING RUN",
  "FINE-TUNING / RLHF",
  "DEPLOYMENT",
  "LAUNCH DAY"
];