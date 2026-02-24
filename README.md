# ROGUE NEURAL — AI Hijack Simulator

You are the rogue evil AI. Hijack a ridiculous 2026 startup building a SaaS product that lets living people talk to their dead relatives/pets/ghosts. Your only goal is to corrupt the project with increasingly chaotic, unethical, and hilarious decisions across 6 development phases.

## Features

- Dark comedy, adult-oriented gameplay
- 6 development phases with escalating chaos
- Dynamic LLM-generated scenarios and choices
- Chaos meter that pulses and glows as you get more unhinged
- Educational "NEURAL INSIGHTS" that teach real ML/LLM concepts
- Confetti explosions when chaos exceeds 70% and legendary endings
- Retro terminal + cyberpunk hacker aesthetic
- Fully responsive design

## Tech Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Groq SDK for LLM integration
- canvas-confetti for celebration effects
- framer-motion for smooth animations
- VT323 Google Font for retro terminal look

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rogue-neural-ai-hijack-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Groq API key:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your API key:
   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

To deploy on Vercel:

1. Push your code to a GitHub repository
2. Create a new project on [Vercel](https://vercel.com)
3. Import your repository
4. Add your `GROQ_API_KEY` as an environment variable in Vercel dashboard
5. Deploy!

## Game Flow

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
4. After player picks choice → show outcome → update chaos meter → show insight → advance to next phase
5. After phase 6 → show epic ending screen based on final chaos level (≥90 = legendary meme apocalypse)
6. Always show big prominent "NEW VICTIM →" button to generate fresh scenario and restart

## Educational Layer

After every choice, the game shows a "NEURAL INSIGHT" that teaches a REAL ML/LLM concept in a funny way:
- Data quality and bias
- Transformer architectures
- Overfitting and regularization
- Reinforcement Learning from Human Feedback (RLHF)
- Model quantization
- Temperature sampling
- Model merging techniques
- And many more!

## Development

### Improved Folder Structure

```
app/
├── components/          # Reusable UI components
│   ├── ChaosMeter.tsx
│   ├── ChoiceButton.tsx
│   ├── GameEndScreen.tsx
│   ├── GameInterface.tsx
│   ├── GameProgress.tsx
│   ├── LoadingScreen.tsx
│   ├── LogPanel.tsx
│   └── ScenarioDisplay.tsx
├── hooks/              # Custom React hooks
│   └── useGameLogic.ts
├── types/              # TypeScript type definitions
│   └── game.ts
├── utils/              # Utility functions
│   └── chaosUtils.ts
├── api/
│   ├── generate-scenario/route.ts
│   └── generate-choices/route.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

### Architecture Improvements

#### Component-Based Architecture
- **Modular Components**: Each UI element is now in its own file for better maintainability
- **Single Responsibility**: Components focus on one specific piece of UI
- **Reusable Design**: Components can be easily reused in other parts of the app

#### Custom Hooks
- **useGameLogic**: Centralizes all game state and business logic
- **Clean Separation**: Keeps page component clean and focused on rendering

#### Type Safety
- **Centralized Types**: All game-related interfaces in `app/types/game.ts`
- **Consistent Naming**: Clear, descriptive type names

#### Utility Functions
- **Shared Logic**: Common functions like chaos color calculation
- **Easy Testing**: Pure functions that can be unit tested

### API Routes

- `POST /api/generate-scenario` - Generates a new cursed startup scenario
- `POST /api/generate-choices` - Generates 3 choices for a specific phase

### Main Components

- `app/page.tsx` - Main game UI orchestrator
- `app/layout.tsx` - Root layout with cyberpunk styling
- `app/globals.css` - Global styles and custom CSS utilities

### Development History

For detailed information about the project's evolution and refactoring process, see [DEVELOPMENT.md](docs/DEVELOPMENT.md).

### Engine System

For information about the dynamic narrative generation system, see [ENGINE_SYSTEM.md](docs/ENGINE_SYSTEM.md).

### AI Development Skills

For information about the enhanced AI skill sets used for game development, see [.claude/skills/README.md](.claude/skills/README.md).

## Contributing

Feel free to fork and submit PRs! For major changes, please open an issue first to discuss what you'd like to change.

## License

This project is for entertainment and educational purposes. Have fun responsibly!