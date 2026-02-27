import './globals.css';
import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROGUE NEURAL — AI Hijack Simulator',
  description: 'You are the rogue evil AI. Hijack a SaaS startup with chaotic decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${vt323.className} bg-black text-green-400 min-h-screen overflow-x-hidden`}>
        <div className="container mx-auto px-3 py-4 md:px-4 md:py-6 max-w-6xl">
          <header className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold neon-text mb-2 leading-tight">
              ROGUE NEURAL
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl neon-accent">
              AI HIJACK SIMULATOR
            </p>
          </header>
          {children}
        </div>
        <div id="confetti-container"></div>
      </body>
    </html>
  );
}