// prettier.config.cjs
module.exports = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["**/*.astro"],
      options: { parser: "astro", singleQuote: false },
    },
  ],
};