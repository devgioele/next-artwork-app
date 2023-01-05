/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'artic-red': {
          dark: '#9d1432',
          DEFAULT: '#b50938',
          light: '#cb314a',
        },
      },
    },
  },
  plugins: [],
};
