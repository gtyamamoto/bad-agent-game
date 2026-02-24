export const getChaosColor = (chaos: number): string => {
  if (chaos < 30) return 'chaos-meter-low';
  if (chaos < 70) return 'chaos-meter-medium';
  return 'chaos-meter-high';
};

export const getEndingMessage = (chaosLevel: number) => {
  if (chaosLevel >= 90) {
    return {
      title: "🎉 LEGENDARY MEME APOCALYPSE 🎉",
      description: "You've achieved maximum chaos! The digital realm trembles before your unhinged genius!"
    };
  } else if (chaosLevel >= 70) {
    return {
      title: "🔥 CHAOTIC SUCCESS 🔥",
      description: "High levels of chaos achieved! The startup is definitely trending on social media now!"
    };
  } else if (chaosLevel >= 40) {
    return {
      title: "⚡ MODERATE MAYHEM ⚡",
      description: "Moderate chaos levels reached. The investors are having second thoughts..."
    };
  } else {
    return {
      title: "🥱 BORING IMPLEMENTATION 🥱",
      description: "Low chaos levels. Did you even try? The board is unimpressed."
    };
  }
};