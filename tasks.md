# tasks.md — offer repositioning (branch `dev/offer-repositioning`, base 5911377)

Plan of record: `docs/architecture/offer-repositioning-plan.html` (status block at the top).
Gate: `SITE_URL=https://leverageai.network pnpm verify` (SITE_URL is required by guard:canonicals; CI sets it in .github/workflows/site-standard.yml).

## Decisions (Mike, 2026-10-18)
- [x] D1 retainer floor: new numbers published  - [x] D2 audit credit applies with or without a retainer
- [x] D3 Specialist published (narrowed to legal; no real-estate research exists)
- [x] D4 research imported to docs/research; speed-to-lead infrastructure cited as owner-attested
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
- [ ] Attorney + compliance read of the 8 posts before publishing; extend to the briefs' word counts only where the sources support it
- [ ] Bring this site's own contact worker to parity with the described pipeline (confirmation to lead, business-URL alert, SMS option); then the intake claim is demonstrable on our own form
- [ ] Contract / ownership terms: own session
- [x] Header nav wrap at two rows: accepted by Mike
- [ ] Post-deploy: Google Rich Results Test on /, a service hub, a blog post; confirm workers.dev x-robots-tag live
- [ ] Publish the legal series: one staged release per publish day, 2026-10-20 to 2026-11-01 (docs/publishing/legal-series-publishing-plan.md); decisions listed at the end of the plan
- [ ] Lawyer read of legal posts 5 (FindLaw/Internet Brands) and 7 (compliance) before 2026-10-26 / 2026-10-30
- [ ] Push branch / merge / deploy (not requested yet)
