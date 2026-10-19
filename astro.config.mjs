import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://leverageai.network",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  image: {
    responsiveStyles: true,
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: false,
  },
  integrations: [
    sitemap({
      // Noindex pages must not be advertised to crawlers.
      filter: (page) => !page.includes("/contact/thanks/"),
    }),
  ],
});
