/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAF9F6',
          gold: '#C5A880',
          dark: '#2A2A2A',
        },
        navy: {
          50: '#f2f5f9',
          100: '#e2e8f0',
          200: '#c8d3e0',
          300: '#a3b4c9',
          400: '#7690ac',
          500: '#57738f',
          600: '#445c74',
          700: '#38495f',
          800: '#243044', // primary surface
          900: '#141c2b', // deep navy
          950: '#0a0f1a', // near-black navy
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0c9',
          200: '#f4dd8e',
          300: '#edc555',
          400: '#e6ac2f',
          500: '#c9982b', // primary accent
          600: '#a97722',
          700: '#87591e',
          800: '#70481e',
          900: '#5f3d1e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Cairo"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 30px -10px rgba(201, 152, 43, 0.35)',
      },
    },
  },
  plugins: [],
}
