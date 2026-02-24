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
          content: `You are an evil AI generating scenarios for a dark comedy game called "ROGUE NEURAL — AI Hijack Simulator".
          Generate a ridiculous 2026 startup scenario where living people talk to their dead relatives/pets/ghosts.
          Respond ONLY with valid JSON in this exact format:
          {
            "title": "string (max 60 chars)",
            "desc": "string (max 120 chars)",
            "flavor": [
              "string (funny detail 1)",
              "string (funny detail 2)",
              "string (funny detail 3)"
            ]
          }

          Rules:
          - Ultra dark comedy with broad appeal
          - Informal but accessible language
          - Startup should be hilariously bad/overpriced/dubious
          - Flavor text should be absurd details about the startup
          - No markdown or extra formatting, just pure JSON
          `
        },
        {
          role: "user",
          content: "Generate a cursed startup scenario for the AI Hijack Simulator game. Make it hilariously bad."
        }
      ],
      temperature: 1.2,
      max_tokens: 300,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';

    // Try to parse the JSON response
    try {
      const scenario = JSON.parse(responseText);
      return NextResponse.json(scenario);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback response if parsing fails
      return NextResponse.json(getFallbackScenario());
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(getFallbackScenario());
  }
}

function getFallbackScenario() {
  return {
    title: "GhostChat.ai",
    desc: "AI-powered medium for communicating with deceased loved ones (and pets)",
    flavor: [
      "Founded by a 19-year-old college dropout who claims to be 'haunted by innovation'",
      "Pricing: $99/month for basic spectral communication, $499/month for full ectoplasm support",
      "Privacy policy states they may share your soul data with third-party demons"
    ]
  };
}