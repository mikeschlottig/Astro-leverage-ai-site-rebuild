# hypothesis.md — offer repositioning

Format: prediction written BEFORE the run -> reality -> diff -> why. Reality column stays empty until measured.

| # | Prediction (2026-10-18) | Reality | Diff / why |
|---|---|---|---|
| H1 | Setting `ai-search-optimization.md` to `kind: hub` while `internet-marketing-services.md` still exists builds clean (no phrase collision, slugs differ). Removing the old hub without retargeting `lead-capture` / `social` parents fails with a ServiceTreeError. | | |
| H2 | After the hub move, `pnpm guard:links` fails on every `/services/internet-marketing-services/...` link (43 lines, 26 files at 5911377) until rewritten; a worker redirect alone does not satisfy it. | | |
| H3 | `slugifyPhrase("Automation and AI Systems")` = `automation-and-ai-systems`; keeping the file `software-development.md` fails `assertPhraseSync` (services.ts:41-60). | | |
| H4 | Live homepage description equals repo `index.astro:21` (confirmed 2026-10-18 by fetch: identical). The "stale meta" defect is positioning, not drift. | CONFIRMED | live == repo |
| H5 | `*.workers.dev` serves a 200 duplicate with canonical -> leverageai.network and no robots meta. | CONFIRMED | fetch 2026-10-18, no x-robots-tag, no robots meta |
| H6 | Raising the audit range touches 4 known sites of truth (pricing.astro:7,85; guides/website-redesign-cost-for-local-business.md:29; locations/[slug].astro:264). Missing one leaves two prices live. | | |
