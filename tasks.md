# tasks.md — offer repositioning (branch `dev/offer-repositioning`, base 5911377)

Plan of record: `docs/architecture/offer-repositioning-plan.html` (status block at the top).
Gate: `SITE_URL=https://leverageai.network pnpm verify` (SITE_URL is required by guard:canonicals; CI sets it in .github/workflows/site-standard.yml).

## Decisions (Mike, 2026-10-18)
- [x] D1 retainer floor: new numbers published  - [x] D2 audit credit applies with or without a retainer
- [x] D3 Specialist published (narrowed to legal; no real-estate research exists)
- [x] D4 research imported to docs/research; speed-to-lead pipeline confirmed working by Mike (2026-10-19)
- [x] D5 social parent local-seo  - [x] D6 software renamed in place  - [x] D7 workers.dev noindex

## Done
- [x] P1 meta x3, workers.dev X-Robots-Tag (worker/noindex.ts + test)
- [x] P2 AI Search Optimization + Lead Capture promoted to hubs; old hub archived; 12 redirects; links, form values, ontology
- [x] P3 pricing.ts + pricing.astro (audit $750-$1,500, Foundation/Growth/Specialist), mirrors, ownership language
- [x] P4 law-firms industry page; industries index copy; Industries nav item
- [x] P5 lead-capture service-level section
- [x] P6 hero titles x5 (+2 rewritten with their pages); ResultsStrip on home + portfolio
- [x] P7 social add-on framing; software -> automation-and-ai-systems
- [x] 8 legal posts (drafts)
- [x] Structured-data gate (schema.org 30.1 + Google Rich Results via Adobe validator), generator fixes, sitemap noindex filter, AGENTS/README/CLAUDE/WORKLOG to projectstd standard
- [x] Legal posts dated 2 days apart with build-time date gate; ArticleByline; relatedPosts "Keep reading"; X account removed everywhere; Article.author sameAs verified on 11 blog pages; publishing plan written

## Open
- [ ] Real-estate industry page: own session, needs research first (none in docs/research)
- [x] Legal posts read and approved by Mike (2026-10-19); all eight stay on the release schedule
- [ ] Optional: extend the posts toward the briefs' word counts only where the sources support it
- [ ] Contract / ownership terms: own session
- [x] Header nav wrap at two rows: accepted by Mike
- [ ] Post-deploy: Google Rich Results Test on /, a service hub, a blog post; confirm workers.dev x-robots-tag live
- [x] Publish the legal series: automated daily; decisions recorded in the plan
- [x] Merged to main, pushed, released (version 8697aa1f; later 9ebc0122 via the forced workflow run), 2026-10-19
- [x] Automatic release: .github/workflows/scheduled-release.yml + scripts/release-gates.mjs; forced run green end to end
- [ ] Confirm the first automatic publish: 2026-10-20 15:00 UTC should release post 2 (gate log should show the override proved by contrast)
- [ ] A year from now: rotate the release token (astro-site-release, valid 365 days from 2026-10-19) and update the GitHub secret CLOUDFLARE_API_TOKEN
