/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'Kalam': ['Kalam'],
      },
      keyframes: {
        bounce2: {
          '0%, 100%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
          '50%': { transform: 'translateY(-15%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
        },
      },
      animation: {
        bounce2: 'bounce2 0.8s infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
