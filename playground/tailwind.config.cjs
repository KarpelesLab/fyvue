/** @type {import('tailwindcss').Config} */
const tailwindColors = require('../dist/dist/fyvue.js')['helpers'][
  'tailwindColors'
];
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
