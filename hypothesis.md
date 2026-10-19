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

## Outcomes (2026-10-18)

| # | Reality | Diff / why |
|---|---|---|
| H1 | Promoting `ai-search-optimization` to hub, archiving the old hub, and re-parenting social + lead-capture in the same commit built clean (75 pages). The orphan-failure half was not run. | UNTESTED half: I re-parented before removing, so the failure path never triggered. |
| H2 | `guard:links` never failed: links were rewritten before the first build. The 43-line/26-file count was right at 5911377 (25 files + the redirects file). | Prediction untested, not disproved. |
| H3 | Confirmed by construction: the file was renamed with the phrase (`automation-and-ai-systems.md`); the build passes `assertPhraseSync`. | Did not run the failing case. |
| H4, H5 | Confirmed (see above). Plus: `workers.dev` now returns `x-robots-tag: noindex` in a unit test; not yet observed on the deployed host. | Needs a post-deploy fetch. |
| H6 | Four sites changed; `rg '\$500|\$1,200|\$400|\$800' src` is empty afterward. | Held. |
| H7 (new) | Prediction: adding a tenth nav item and five hubs breaks layout. Reality: hub cards clipped ("Optimization" overflowed) until `.hub-card` wrapped it; nav wraps to two rows. | Found only in a real browser, not by `pnpm verify`. |
| H8 (new) | Prediction: the briefs' numbers match the report. Reality: figures matched, but three briefs overstated: "KKR buyout" (Internet Brands, backed by KKR and Warburg Pincus, bought FindLaw), "bankrupting" (unsupported), and 526% ROI (applies to firms spending $120-150K a year on SEO). | Corrected in the posts. |
