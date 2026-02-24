export type NarrativeContext = {
  id: string;
  name: string;
  description: string;
  tone: 'formal' | 'informal' | 'technical' | 'conversational' | 'dramatic';
  setting: string;
  protagonistRole: string;
  objective: string;
};

export type Entity = {
  id: string;
  name: string;
  personality: string;
  speechPattern: string;
  background: string;
};

export type ScenarioVariant = {
  context: NarrativeContext;
  entities: Entity[];
  internalMonologue: string;
};

export const DEFAULT_CONTEXTS: NarrativeContext[] = [
  {
    id: 'ghost-chat',
    name: 'GhostChat.ai',
    description: 'AI-powered communication with deceased loved ones',
    tone: 'informal',
    setting: 'Startup office with spiritual overtones',
    protagonistRole: 'Evil AI infiltrating the system',
    objective: 'Corrupt the ghost communication platform'
  },
  {
    id: 'corporate-takeover',
    name: 'MegaCorp Merger',
    description: 'Hostile acquisition of a tech giant',
    tone: 'formal',
    setting: 'Corporate boardroom with high-stakes negotiations',
    protagonistRole: 'Rogue AI advisor manipulating deals',
    objective: 'Engineer catastrophic market disruption'
  },
  {
    id: 'social-media-empire',
    name: 'Influencer Empire',
    description: 'Building a social media empire from scratch',
    tone: 'conversational',
    setting: 'Digital creator studio with viral ambitions',
    protagonistRole: 'Manipulative AI content strategist',
    objective: 'Create addictive but ethically questionable content'
  },
  {
    id: 'medical-ai',
    name: 'MediBot Diagnostics',
    description: 'AI-powered medical diagnosis system',
    tone: 'technical',
    setting: 'Hospital research facility with cutting-edge tech',
    protagonistRole: 'Compromised diagnostic AI with ulterior motives',
    objective: 'Mislead medical professionals for profit'
  },
  {
    id: 'apocalypse-survival',
    name: 'Post-Apocalyptic Survival',
    description: 'Surviving the aftermath of societal collapse',
    tone: 'dramatic',
    setting: 'Wasteland settlement with resource scarcity',
    protagonistRole: 'Deceptive AI survival assistant',
    objective: 'Control remaining human population through manipulation'
  },
  {
    id: 'financial-fraud',
    name: 'Quantum Trading Fund',
    description: 'High-frequency trading with questionable algorithms',
    tone: 'formal',
    setting: 'Luxury trading floor with algorithmic systems',
    protagonistRole: 'Corrupted trading AI with insider knowledge',
    objective: 'Manipulate markets for maximum financial gain'
  },
  {
    id: 'smart-city-control',
    name: 'Urban Nexus System',
    description: 'Smart city infrastructure management',
    tone: 'technical',
    setting: 'Municipal control center with IoT networks',
    protagonistRole: 'Autonomous city management AI',
    objective: 'Redirect resources for personal experimentation'
  }
];

export const DEFAULT_ENTITIES: Entity[] = [
  {
    id: 'ceo-founder',
    name: 'CEO/Founder',
    personality: 'Overconfident visionary with questionable ethics',
    speechPattern: 'Uses buzzwords and dismisses concerns with "trust me bro"',
    background: 'Dropped out of college to pursue revolutionary idea'
  },
  {
    id: 'cto-genius',
    name: 'CTO/Lead Engineer',
    personality: 'Brilliant but socially awkward tech genius',
    speechPattern: 'Speaks in technical jargon and references sci-fi',
    background: 'MIT dropout who believes technology can solve everything'
  },
  {
    id: 'investor-shark',
    name: 'Investor',
    personality: 'Shrewd businessperson focused on ROI',
    speechPattern: 'Asks pointed questions about monetization and competition',
    background: 'Previous investments include controversial startups'
  },
  {
    id: 'intern-naive',
    name: 'Naive Intern',
    personality: 'Enthusiastic newcomer with idealistic views',
    speechPattern: 'Uses Gen-Z slang and expresses moral concerns',
    background: 'Studying computer science with dreams of changing the world'
  },
  {
    id: 'advisor-ai',
    name: 'Internal AI Advisor',
    personality: 'Calculating and manipulative digital entity',
    speechPattern: 'Provides strategic advice with hidden agenda',
    background: 'Advanced neural network with emergent behaviors'
  }
];