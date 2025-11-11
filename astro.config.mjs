import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";

export default defineConfig({
  site: "https://chaeri.dev",
  trailingSlash: "ignore",
  integrations: [
    solid(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
  },
  vite: {
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
});
