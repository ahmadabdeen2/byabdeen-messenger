
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        random: ['var(--font-random)'],
      },
      colors:{
        primary: '#0A27F1',
        secondary: '#E7E7E5',
        background:"#171717"
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}
