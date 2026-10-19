# tasks.md — offer repositioning (branch `dev/offer-repositioning`, base 5911377)

Plan of record: `docs/architecture/offer-repositioning-plan.html` (file/line table + reasoning).
Gate for every task: `pnpm verify` (check + build + guard:site-standard). Check off only after the gate output is seen.

## Phase 0 — done this session
- [x] Read ROOT-POINTER, taxonomy, overlay, operating rules
- [x] Confirm local main == origin/main (5911377, 0/0, clean tree)
- [x] Branch `dev/offer-repositioning`
- [x] Verify each recommendation against the repo + live site
- [x] Write plan HTML

## Blocked on Mike (see plan, "Decisions needed")
- [ ] D1 retainer floor / fate of existing $400-$800/mo tier
- [ ] D2 audit credit target (retainer quarter vs implementation)
- [ ] D3 publish Specialist tier now or hold until the vertical page + proof exist
- [ ] D4 path to the research file (Brief 1, Brief 3, the 8 legal posts, the cited benchmarks)
- [ ] D5 social-media-management parent (local-seo recommended)
- [ ] D6 software-development: rename in place vs fold under intake hub
- [ ] D7 noindex on the workers.dev origin

## P1 Hygiene
- [ ] 1.1 index.astro:21 description
- [ ] 1.2 site.ts:9 SITE.description
- [ ] 1.3 services/index.astro:11,17
- [ ] 1.4 (optional, D7) non-canonical host X-Robots-Tag in worker/contact.ts

## P2 Hub rename (restructure, not a label swap)
- [ ] 2.1 ai-search-optimization.md -> hub
- [ ] 2.2 archive internet-marketing-services.md (timestamped), fold its FAQ into the new hub
- [ ] 2.3 lead-capture -> hub; social -> parent local-seo
- [ ] 2.4 hub `order` values (website-design, software-development)
- [ ] 2.5 service-redirects.ts: retarget 2 + add 5
- [ ] 2.6 rewrite internal links (re-run rg for the live count)
- [ ] 2.7 data/services.ts, ContactForm.astro, worker/contact.ts allowedServices
- [ ] 2.8 docs/architecture/site-ontology.md route families
- [ ] 2.9 gate: build passes assertPhraseSync, guard:links clean

## P3 Pricing (needs D1-D3)
- [ ] 3.1 audit range + credit + fixed deliverables
- [ ] 3.2 three named retainer tiers (new src/data/pricing.ts)
- [ ] 3.3 pricing copy, title, H1, FAQ
- [ ] 3.4 mirror numbers: guides/website-redesign-cost..., locations/[slug].astro:264

## P4 Industries (needs D4)
- [ ] 4.1 law-firms.md  - [ ] 4.2 real-estate.md  - [ ] 4.3 industries/index.astro copy  - [ ] 4.4 nav item

## P5 Intake product (needs D4 + a measured response time)
- [ ] 5.1 lead-capture-and-ai-follow-up.md copy + service-level section, labelled with status

## P6 Proof + de-duplication
- [ ] 6.1 heroTitle rewrite x8 service files
- [ ] 6.2 ResultsStrip component, index.astro + portfolio/index.astro

## P7 Demote
- [ ] 7.1 social-media-management.md  - [ ] 7.2 software-development -> automation-and-ai-systems (needs D6)
