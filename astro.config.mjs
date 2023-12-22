import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import linkPreview from "astro-link-preview";
/* import compress from "astro-compress"; */

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://bio-silas.vercel.app/",
  integrations: [
    tailwind(),
    sitemap(),
    linkPreview(),
/*     compress({
      SVG: false,
      Exclude: [(File) => File.match(/\/assets\/.*\.svg$/)],
    }), */
  ],
  output: "server",
  adapter: vercel(),
});