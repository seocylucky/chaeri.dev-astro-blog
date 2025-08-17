// @ts-check
import { defineConfig } from "astro/config";

import solid from "@astrojs/solid-js";

import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  site: "https://chaeri-dev.netlify.app/",
  trailingSlash: "ignore",
  integrations: [solid()],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
