# Publish Roadmap

This roadmap starts from the current rebuild state as of the Oregon location and pricing pass.

## Current State

What is already in place:

- Astro 6 site scaffold with content collections and Cloudflare Worker contact surface
- primary route families scaffolded
- canonical case-study layout implemented
- Oregon market report integrated as a real report route
- location cluster upgraded from placeholders to tiered market pages
- pricing reframed around diagnostic audit, implementation, and ongoing adaptation
- internal-link cluster logic documented in `link-cluster-map.md`

What is still between the current state and a confident public launch:

- homepage polish and proof density
- service-page depth
- long-form content ingestion
- visual/media refinement
- contact and conversion proof
- crawl/index/release hardening

## Phase 1: Make The Core Buyer Journey Publishable

Goal:

- Ensure a serious buyer can understand the offer, trust the operator, see proof, and contact without hitting unfinished surfaces.

Required work:

1. Tighten the homepage into the true brand-led front door.
   - Restore the hero video/search-light concept.
   - Pull the strongest proof architecture up onto the homepage.
   - Feature one report, one case study, one location cluster, and pricing entry points.
2. Upgrade all four primary service pages from seed copy into real outcome pages.
   - Add stronger problem framing, implementation clarity, proof references, and next actions.
   - Ensure every service page links to at least one report, one case study, and one relevant location path.
3. Complete `/about` as a trust page.
   - Restore founder image and operator-led credibility.
   - Explain why the business is structured against generic-agency dependency.
4. Refine `/contact`.
   - Make the diagnostic-audit CTA explicit.
   - Clarify what happens after inquiry and expected response behavior.

Definition of done:

- Homepage, services, pricing, portfolio, about, and contact all feel intentional and mutually reinforcing.

## Phase 2: Fill The Proof And Authority Layer

Goal:

- Make the site feel proven, not merely well-designed.

Required work:

1. Expand proof surfaces.
   - Add at least 2 to 4 more case studies in the canonical portfolio format.
   - Add one sample dashboard or reporting surface with honest labeling.
2. Ingest the branded long-form assets already supplied.
   - Turn `gemini-programmatic-execution-guidelines.html` into a knowledge-base route.
   - Turn `astro-7-→-cloudflare-workers-leverage-ai-field-guide.html` into a knowledge-base route.
   - Turn `steel-dev-awesome-web-agents-report (1).html` into a report route.
3. Strengthen report and knowledge-base hubs.
   - Improve intros, categorization, and featured-asset selection.
   - Ensure each long-form page links back into one or more services, proof pages, and contact.

Definition of done:

- A buyer or crawler can move from claim to evidence without dead ends.

## Phase 3: Build Out Cluster Depth

Goal:

- Make the architecture broad enough to earn topical authority and local relevance.

Required work:

1. Expand the location cluster intentionally.
   - Add city-specific supporting blocks such as official local sources, market notes, and relevant case-study links.
   - Decide whether to add second-ring Oregon markets or deepen the current 12 first.
2. Launch industry pages.
   - Start with industries that already have proof or natural service alignment.
   - Keep them tied to services, reports, and portfolio proof.
3. Build the first editorial cluster sets.
   - Speed-to-lead cluster
   - local visibility / map-pack cluster
   - trust / website conversion cluster
   - measurement / reporting cluster

Definition of done:

- The site has enough clustered depth that authority starts to feel systematic rather than aspirational.

## Phase 4: Visual And Media Hardening

Goal:

- Close the trust gap between good structure and premium execution.

Required work:

1. Reintroduce missing brand assets.
   - hero video
   - founder photo
   - real-world imagery
   - repaired media or podcast component if it remains part of the original site logic
2. Review every public page for visual consistency.
   - spacing rhythm
   - card language
   - section introductions
   - CTA hierarchy
3. Check WCAG AA and reduced-motion behavior across real pages, not just the baseline CSS.

Definition of done:

- The site looks premium, grounded, and complete rather than cleverly scaffolded.

## Phase 5: Search, Schema, And Release Hardening

Goal:

- Make the site technically ready to publish and index.

Required work:

1. Verify metadata and schema across all public route families.
   - title and description quality
   - canonicals
   - JSON-LD coverage
   - crawl-visible long-form HTML
2. Finalize technical release details.
   - sitemap and robots behavior
   - 404 and fallback behavior
   - Worker contact flow validation
   - deploy path aligned to Cloudflare Workers, not Pages
3. Run a pre-publish QA pass.
   - mobile and desktop layout review
   - internal-link audit
   - Lighthouse/performance spot checks
   - contact-form smoke test

Definition of done:

- The site is visually complete, internally coherent, and technically safe to launch.

## Recommended Immediate Order

1. Homepage refinement
2. service-page expansion
3. about/contact trust pass
4. branded long-form asset ingestion
5. first industry pages
6. technical publish hardening

## What To Avoid

- Publishing broad hubs while their child pages still read like placeholders
- Adding large volumes of blog content before services, proof, and report hubs are strong
- Treating the location cluster like an SEO annex instead of a conversion-supporting system
- Letting pricing drift back into package theater instead of diagnostic clarity
