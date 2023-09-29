/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      primary: colors.slate,
    },
    fontFamily: {
      sans: ["'Saira'", 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
