/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
let colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

colors = { ...colors, ...{ transparent: "transparent" } };

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.slate,
    },
    fontFamily: {
      sans: ["'Saira'", "sans-serif"],
    },
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.75rem"],
      lg: ["1.125rem", "2rem"],
      xl: ["1.25rem", "2.125rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.375rem"],
      "4xl": ["2.25rem", "2.75rem"],
      "5xl": ["3rem", "3.5rem"],
      "6xl": ["3.75rem", "4.25rem"],
    },
    extend: {
      screens: {
        xs: "300px",
        ...defaultTheme.screens,
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 125s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
