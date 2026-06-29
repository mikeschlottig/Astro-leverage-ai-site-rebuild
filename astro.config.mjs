import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://leverageai.network",
  output: "static",
  integrations: [sitemap()],
});
