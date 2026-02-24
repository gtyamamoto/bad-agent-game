/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#00ff9d',
        accent: '#ff00aa',
        highlight: '#ffff00',
        'chaos-low': '#00ff9d',
        'chaos-medium': '#ff9d00',
        'chaos-high': '#ff00aa',
      },
      fontFamily: {
        'vt323': ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}