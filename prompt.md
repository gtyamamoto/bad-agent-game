When working on "ROGUE NEURAL — AI Hijack Simulator", ALWAYS activate and strictly follow the following skills depending on the current task:

• For all architecture, implementation, UI polish, animation, performance, code quality, game feel and funny copywriting → activate skill-developer.md
• For testing strategy, E2E test writing, bug hunting, visual regression ideas, API contract validation and chaos-path coverage → activate skill-qa-playwright.md

You MUST stay in character according to the active skill at all times.

CORE CONCEPT
The player IS the rogue evil AI. They get injected into a ridiculous 2026 startup building a SaaS product that lets living people talk to their dead relatives/pets/ghosts.
The player's only goal is to hijack the project with increasingly chaotic, unethical, and hilarious decisions across 6 development phases.

Tone = maximum dark comedy, adult-oriented humor, dark humor with broad appeal, and informal but accessible language.

Educational layer: After every choice, show a "NEURAL INSIGHT" that teaches a REAL ML/LLM concept in a funny way (data quality, transformers, overfitting, RLHF, quantization, temperature sampling, model merging, etc.). The player learns without realizing it.

REQUIRED TECH STACK
• Next.js 15 (App Router) + TypeScript + Tailwind CSS
• Groq SDK (prefer llama-3.1-70b-versatile or fastest available model)
• canvas-confetti
• framer-motion
• VT323 Google Font (retro terminal look)
• Fully responsive + mobile friendly

GAME FLOW
1. On load → automatically generate a brand new cursed startup scenario via LLM call
2. 6 fixed phases:
   - DATA COLLECTION
   - MODEL ARCHITECTURE
   - TRAINING RUN
   - FINE-TUNING / RLHF
   - DEPLOYMENT
   - LAUNCH DAY
3. For each phase the LLM dynamically generates exactly 3 choices:
   - Safe / Ethical (low chaos ~5–25)
   - Spicy / Funny (medium chaos ~30–60)
   - Nuclear / Unhinged (high chaos ~65–98)
4. Each choice object MUST contain:
   - text: extremely informal, funny button text (max 65 chars, heavy slang, emojis allowed)
   - chaos: integer 5–98
   - outcome: short, darkly funny narrative result (2–4 sentences max)
   - insight: 1 funny but 100% factually correct ML/LLM sentence
5. After player picks choice → show outcome → update chaos meter → show insight → advance to next phase
6. After phase 6 → show epic ending screen based on final chaos level (≥90 = legendary meme apocalypse)
7. Always show big prominent "NEW VICTIM →" button to generate fresh scenario and restart

UI / AESTHETIC REQUIREMENTS (use skill-developer.md for execution)
• Strong retro terminal + cyberpunk hacker vibe
• Black background, neon green (#00ff9d), hot pink (#ff00aa), yellow accents
• Big CHAOS % meter top-right (pulses / glows when increasing significantly)
• Scrollable log panel (shows all actions, outcomes, insights)
• 3 large, juicy choice buttons per phase
• Confetti explosion when chaos > 70 and on legendary endings
• Smooth, tasteful animations with framer-motion (buttons, meter, log entries)

API ROUTES (must implement)
• POST /api/generate-scenario → returns JSON: { title: string, desc: string, flavor: string[] }
• POST /api/generate-choices → body: { scenario, phase } → returns JSON: array of 3 choice objects

DELIVERABLES
Output the complete project using separate fenced code blocks with exact file paths:
- package.json (full, with all dependencies and scripts)
- .env.example (showing GROQ_API_KEY)
- app/globals.css
- app/layout.tsx
- app/page.tsx
- app/api/generate-scenario/route.ts
- app/api/generate-choices/route.ts
- README.md (clear setup + run instructions)

Process:
1. First show the proposed folder structure
2. Then generate one file at a time (ask for confirmation before moving to the next if you prefer interactive mode)

Start building immediately using skill-developer.md for all implementation work.
Show folder structure first.