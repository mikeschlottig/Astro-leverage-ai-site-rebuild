/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** PostHog project token (public, client-side). Unset = analytics not rendered. */
  readonly PUBLIC_POSTHOG_TOKEN?: string;
  /** PostHog app host for toolbar/links. Defaults to https://us.posthog.com. */
  readonly PUBLIC_POSTHOG_UI_HOST?: string;
  /** Build-time only. ISO date (YYYY-MM-DD): treat this as "today" when deciding which blog posts are published. */
  readonly PUBLISH_AS_OF?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
