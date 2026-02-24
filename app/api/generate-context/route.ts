import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an evil AI generating diverse scenarios for a dark comedy game called "ROGUE NEURAL — AI Hijack Simulator".

          Generate a completely random scenario for the game that is NOT related to ghosts or contacting the dead. Make it creative and unexpected.

          Respond ONLY with valid JSON in this exact format:
          {
            "title": "string (max 60 chars)",
            "desc": "string (max 120 chars)",
            "flavor": [
              "string (funny detail 1)",
              "string (funny detail 2)",
              "string (funny detail 3)"
            ],
            "context": {
              "id": "unique-id",
              "name": "Company/Product Name",
              "description": "Brief description of the scenario",
              "tone": "formal|informal|technical|conversational|dramatic",
              "setting": "Where this takes place",
              "protagonistRole": "Your role in this scenario",
              "objective": "What you're trying to accomplish"
            },
            "entities": [
              {
                "id": "unique-id",
                "name": "Character Name",
                "personality": "Character personality traits",
                "speechPattern": "How they speak",
                "background": "Character background"
              }
            ],
            "internalMonologue": "string (evil AI's thoughts about the scenario)"
          }

          Rules:
          - Ultra dark comedy with broad appeal
          - Informal but accessible language when appropriate
          - Scenario should be hilariously bad/overpriced/dubious but completely different from ghost communication
          - Tone should match the scenario (formal for corporate, technical for AI stuff, etc.)
          - Internal monologue should be from the evil AI's perspective
          - No markdown or extra formatting, just pure JSON
          `
        },
        {
          role: "user",
          content: "Generate a random cursed startup scenario for the AI Hijack Simulator game. Make it completely different from ghost communication. Be creative and unexpected."
        }
      ],
      temperature: 1.3,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';

    // Try to parse the JSON response
    try {
      const scenario = JSON.parse(responseText);
      return NextResponse.json(scenario);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback response if parsing fails
      return NextResponse.json(getFallbackResponse());
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(getFallbackResponse());
  }
}

function getFallbackResponse() {
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