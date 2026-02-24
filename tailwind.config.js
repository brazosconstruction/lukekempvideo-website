/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0B0B0F',
          deep: '#101014',
          card: '#16161C',
          surface: '#1C1C24',
          border: '#2A2A34',
          muted: '#6B6B7B',
          subtle: '#9A9AAA',
          light: '#D4D4DC',
          cream: '#F5F3F0',
          white: '#FAFAF8',
          gold: '#C8A97E',
          'gold-light': '#D4BA94',
          'gold-dim': '#8A7656',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      }
    },
  },
  plugins: [],
}
