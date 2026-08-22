# Astro Rules for This Project

The canonical reusable rules are maintained at:

`C:\Users\mikes\.codex\codex_memory\astro_dev_patterns\ASTRO_RULES\README.md`

## Project enforcement

- Raw masters live locally under `.ignore/source-images/` and are excluded by `.gitignore` and `.codeintelignore`.
- Optimized delivery sources live under `src/assets/` as bounded WebP files.
- Local images use `astro:assets` with responsive widths and accurate `sizes`.
- Above-the-fold founder hero/feature images use Astro `priority`.
- Below-fold author images, case-study galleries, and iframes use native lazy loading.
- `sharp` is a required dependency; a successful build must report optimized-image generation or cache reuse without `MissingSharp`.
- Fonts are self-hosted from Fontsource packages; production HTML must not contact Google Fonts.
- Shared favicon and social-card behavior follows the canonical [social metadata and favicon rules](C:/Users/mikes/.codex/codex_memory/astro_dev_patterns/ASTRO_RULES/social-metadata-and-favicons.md).
- Publication-named links go to the canonical publication URL; internal overview pages must be labeled as internal context.
- Default social cards are 1200×630 raster files under `public/images/og/`; high-value press pages override the default through `BaseLayout`.
- `pnpm assets:brand` regenerates the favicon set and branded Open Graph images from checked-in project sources.
- Project measurements, retry history, and visual evidence are maintained in [`docs/architecture/performance-and-about-image-audit.md`](../docs/architecture/performance-and-about-image-audit.md).
- The OregonVoyager link and social-metadata incident is documented in [`docs/architecture/social-metadata-and-external-link-repair.md`](../docs/architecture/social-metadata-and-external-link-repair.md).

## Verification command

```powershell
$env:SITE_URL = "https://leverageai.network"
pnpm verify
```

Also inspect generated HTML and `dist/` payloads as described by the canonical verification rules. Passing compilation alone does not prove that images are responsive, correctly prioritized, or lightweight.
