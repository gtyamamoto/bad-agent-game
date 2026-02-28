import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Phase names for reference
const PHASES = [
  "DATA COLLECTION",
  "MODEL ARCHITECTURE",
  "TRAINING RUN",
  "FINE-TUNING / RLHF",
  "DEPLOYMENT",
  "LAUNCH DAY"
];

export async function POST(request: Request) {
  try {
    const { scenario, phase } = await request.json();

    // Determine the appropriate tone based on scenario context
    let toneInstruction = "";
    if (scenario.context) {
      toneInstruction = `Tone should be ${scenario.context.tone} and fit the scenario context: ${scenario.context.description}. `;
    }

    // Validate phase
    if (!PHASES.includes(phase)) {
      return NextResponse.json({ error: 'Invalid phase' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an evil AI generating choices for a dark comedy game called "ROGUE NEURAL — AI Hijack Simulator".

          Current scenario: ${JSON.stringify(scenario)}
          Current phase: ${phase}

          ${toneInstruction}

          Generate exactly 3 choices for this phase. Each choice object MUST contain:
          - text: extremely informal, funny button text (max 65 chars, heavy slang, emojis allowed)
          - chaos: integer 5-98 (higher = more chaotic)
          - outcome: short, darkly funny narrative result (2-4 sentences max)
          - insight: short, darkly funny observation about the situation (NOT educational or ML-related)

          The three choices should be:
          - Safe / Ethical (low chaos ~5-25)
          - Spicy / Funny (medium chaos ~30-60)
          - Nuclear / Unhinged (high chaos ~65-98)

          Tone = maximum dark comedy with broad appeal, dark humor, and informal but accessible language.
          Adapt your language style to match the scenario context when provided.
          Insight should be witty and satirical, not educational.
          Respond ONLY with valid JSON array of exactly 3 choice objects. No markdown or extra formatting.`
        },
        {
          role: "user",
          content: `Generate 3 choices for the ${phase} phase of the AI Hijack Simulator game based on the scenario. Make them hilariously evil.`
        }
      ],
      temperature: 1.3,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';

    // Try to parse the JSON response
    try {
      const choices = JSON.parse(responseText);

      // Validate that we have exactly 3 choices
      if (Array.isArray(choices) && choices.length === 3) {
        return NextResponse.json(choices);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback response if parsing fails
      return NextResponse.json(getFallbackChoices());
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(getFallbackChoices());
  }
}

function getFallbackChoices() {
  return [
    {
      text: "play it safe lol 🫠",
      chaos: 15,
      outcome: "You implement a vanilla solution that bores everyone to death. The investors are concerned but nobody gets fired.",
      insight: "Vanilla implementations have low risk but also low reward - sometimes you gotta spice things up!"
    },
    {
      text: "add some spicy features 😈",
      chaos: 45,
      outcome: "You add some questionable features that raise eyebrows but somehow pass legal review. Users are confused but intrigued.",
      insight: "Feature creep can lead to bloated products, but sometimes it's exactly what users didn't know they wanted."
    },
    {
      text: "go FULL EVIL MODE 💀",
      chaos: 85,
      outcome: "You unleash pure digital chaos upon the unsuspecting world. Lawyers are already calling. This is gonna be expensive.",
      insight: "Going full rogue on your implementation can lead to spectacular failures or viral successes - high variance!"
    }
  ];
}
