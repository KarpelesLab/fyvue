/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fv-primary': {
          50: '#f8fafb',
          100: '#ebf0fc',
          200: '#d5d6fa',
          300: '#b3b0f1',
          400: '#9987e7',
          500: '#8161e0',
          600: '#6a45d0',
          700: '#5a00b0',
          800: '#37247f',
          900: '#1e174d',
        },
        'fv-neutral': colors.neutral,
        /*
        'fv-neutral': {
          50: '#f8faf9',
          100: '#edf1f7',
          200: '#d7dcee',
          300: '#b1b9d7',
          400: '#8791ba',
          500: '#696881',
          600: '#565381',
          700: '#423e62',
          800: '#2d2a43',
          900: '#1a1a29',
        },
        */
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
