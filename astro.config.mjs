import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import linkPreview from 'astro-link-preview';



// https://astro.build/config
export default defineConfig({
  site: 'https://bio-silas.vercel.app/',
  integrations: [tailwind(), sitemap(), linkPreview()],
});