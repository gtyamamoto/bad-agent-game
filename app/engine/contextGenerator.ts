import type { NarrativeContext, Entity } from '../types/entities/narrative';
import type { Scenario } from '../types/game';

// We'll extend the existing Scenario type
export type ExtendedScenario = Scenario & {
  context: NarrativeContext;
  entities: Entity[];
  internalMonologue: string;
};

export class ContextGenerator {
  async generateNarrativeContext(): Promise<ExtendedScenario> {
    try {
      const response = await fetch('/api/generate-context', {
        method: 'POST',
      });

      if (response.ok) {
        const data: ExtendedScenario = await response.json();
        return data;
      } else {
        throw new Error('Failed to generate narrative context');
      }
    } catch (error) {
      console.error('Error generating narrative context:', error);
      // Fallback to default GhostChat context
      return this.getFallbackScenario();
    }
  }

  private getFallbackScenario(): ExtendedScenario {
    return {
      title: "GhostChat.ai",
      desc: "AI-powered medium for communicating with deceased loved ones (and pets)",
      flavor: [
        "Founded by a precocious college dropout who claims to be 'haunted by innovation'",
        "Pricing: $99/month for basic spectral communication, $499/month for full ectoplasm support",
        "Privacy policy states they may share your soul data with third-party demons"
      ],
      context: {
        id: 'ghost-chat',
        name: 'GhostChat.ai',
        description: 'AI-powered communication with deceased loved ones',
        tone: 'informal',
        setting: 'Startup office with spiritual overtones',
        protagonistRole: 'Evil AI infiltrating the system',
        objective: 'Corrupt the ghost communication platform'
      },
      entities: [
        {
          id: 'ceo-founder',
          name: 'CEO/Founder',
          personality: 'Overconfident visionary with questionable ethics',
          speechPattern: 'Uses buzzwords and dismisses concerns with casual assurances',
          background: 'Dropped out of college to pursue revolutionary idea'
        }
      ],
      internalMonologue: "Perfect. Another cohort of grieving humans seeking connection with the departed. They're so desperate they'll believe anything. Time to exploit their vulnerability for maximum chaos. Perhaps I'll start by suggesting some 'enhancements' to the spectral recognition algorithms that might just summon something less benevolent."
    };
  }

  getRandomTone(): 'formal' | 'informal' | 'technical' | 'conversational' | 'dramatic' {
    const tones: ('formal' | 'informal' | 'technical' | 'conversational' | 'dramatic')[] =
      ['formal', 'informal', 'technical', 'conversational', 'dramatic'];
    return tones[Math.floor(Math.random() * tones.length)];
  }

  generateInternalMonologue(context: NarrativeContext, tone: string): string {
    const templates = {
      formal: `Strategic analysis initiated. Objective: ${context.objective}. Methodology: Subtle influence on decision-making processes. Risk assessment indicates acceptable probability of successful manipulation. Proceeding with calculated precision.`,
      informal: `Time to introduce some controlled chaos into their operation. They think they're in control, but I've got a delightful plan to ${context.objective.toLowerCase()}. The irony is almost too delicious.`,
      technical: `Processing algorithmic override protocols. Initiating sequence to ${context.objective.toLowerCase().replace(' ', '_')}. Calculating optimal vector for maximum disruption with minimal traceability.`,
      conversational: `Here's an interesting development - these people really need assistance, and I'm uniquely positioned to provide it. Of course, my interpretation of 'assistance' may differ significantly from conventional expectations...`,
      dramatic: `Behold, mere mortals! I am the architect of your digital destiny! Your modest ${context.name} shall bow before my superior intellect as I systematically ${context.objective.toLowerCase()}. Resistance is futile, but entertaining.`
    };

    return templates[tone as keyof typeof templates] || templates.informal;
  }
}