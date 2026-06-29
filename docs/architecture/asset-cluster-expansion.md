# Asset Cluster Expansion

This document maps future assets and report types onto the current site architecture so new content strengthens the hierarchy instead of diluting it.

## Core Rule

Every new asset should answer three questions before it is added:

1. Which hub does it support?
2. Which adjacent pages should it link to?
3. Which conversion surface should it move the reader toward?

## Source-Link Rule

When an asset makes a specific claim, benchmark-style statement, or references outside research, it should include source links either:

1. inline, when the claim is concrete and the proof improves trust immediately
2. in a bottom section such as `Sources And Further Reading`, when the page benefits from lighter citation styling

The goal is not academic citation density. The goal is buyer-facing trust and traceability.

## Highest-Value Asset Types By Cluster

### Cluster: Local Demand And Response

Primary routes:

- `/services/local-visibility`
- `/services/lead-capture-ai-follow-up`
- `/reports/why-speed-wins`
- `/locations/*`

Best next asset types:

1. Speed-to-lead research briefs
   - missed-call cost breakdowns
   - after-hours form response studies
   - "first responder wins" explainers for service businesses
2. Local search teardown reports
   - map-pack audits by city
   - service-area page breakdowns
   - Google Business Profile trust-signal audits
3. Call-flow and intake assets
   - lead-routing diagrams
   - inquiry-to-booking workflow explainers
   - response-playbook checklists
4. Local proof mini-assets
   - before/after local visibility snapshots
   - response-time improvement case notes
   - city-specific trust-gap analyses

Best route targets:

- `/reports/*` for research-heavy pieces
- `/knowledge-base/*` for practical explainers and checklists
- `/portfolio/*` for proof with real outcomes

Required link behavior:

- every asset links to at least one service page
- city-relevant assets link to one or more `/locations/*` pages
- response assets link to `/pricing` and `/contact`

### Cluster: Technical Execution And Infrastructure

Primary routes:

- `/services/custom-web-design`
- `/services/search-data-architecture`
- `/knowledge-base/*`
- `/reports/web-agents-intelligence-report`

Best next asset types:

1. Execution standards and field guides
   - Astro + Cloudflare implementation notes
   - schema and entity architecture explainers
   - site-speed and performance diagnostic guides
2. Technical authority reports
   - web-agent or automation infrastructure reports
   - AI workflow architecture breakdowns
   - search measurement and observability reports
3. Build pattern explainers
   - when to use Workers instead of third-party glue
   - how to keep long-form content crawl-visible
   - response-system infrastructure diagrams

Best route targets:

- supplied HTML field guides should become `/knowledge-base/*`
- bigger synthesis pieces should become `/reports/*`

Required link behavior:

- every technical asset links back to at least one service page
- reports should link to proof or pricing so they do not become developer-only dead ends
- knowledge-base pages should still include a buyer-facing next action

### Cluster: Proof And Market Authority

Primary routes:

- `/portfolio`
- `/portfolio/*`
- `/locations`
- `/industries`

Best next asset types:

1. Structured case studies
   - problem
   - why it mattered
   - what was done
   - result
2. Market opportunity reports
   - city or region comparison matrices
   - underserved-category opportunity scans
   - local competitive landscape summaries
3. Authority-building assets
   - regional directories
   - citation/reference resources
   - partnership or ecosystem maps

Best route targets:

- outcome narratives go to `/portfolio/*`
- broader market framing goes to `/reports/*`
- category- or niche-specific summaries can support `/industries/*`

Required link behavior:

- every case study links to at least two services
- every case study links to one or more locations when geography matters
- market reports link back to pricing or contact once they establish the diagnosis

### Cluster: Pricing And Conversion

Primary routes:

- `/pricing`
- `/contact`
- `/about`

Best next asset types:

1. Diagnostic-audit primers
   - what an audit covers
   - what the buyer receives
   - when to skip a bigger build and fix only one layer
2. Buying-decision explainers
   - when visibility is the problem vs when trust is the problem
   - when response-time fixes outrank website redesign
   - how implementation scope changes by market tier
3. Conversion reassurance assets
   - response expectation pagelets
   - audit FAQ sections
   - operator-led process explanation

Best route targets:

- FAQ-like durable content can live in `/knowledge-base/*`
- deeper buying logic can live in `/reports/*` or `/blog/*`
- short-form trust content may belong directly on `/pricing`, `/about`, or `/contact`

Required link behavior:

- every conversion-supporting asset should point to `/pricing` or `/contact`
- pricing-support assets should also point back to the reports or services that justify the decision

## Highest-Value Specific Assets To Add Next

1. A "What The Diagnostic Audit Includes" knowledge-base page
   - supports `/pricing`
   - links to `/contact`, `/services/local-visibility`, `/services/search-data-architecture`
2. A "Missed Calls And Slow Replies Cost More Than You Think" report
   - supports `/services/lead-capture-ai-follow-up`
   - links to `/reports/why-speed-wins`, `/pricing`, `/contact`
3. A "How Oregon Markets Differ For Local Service Businesses" report
   - supports `/locations`
   - links to the tier 1, tier 2, and tier 3 city pages plus pricing
4. A "What Strong Local Trust Signals Look Like" knowledge-base page
   - supports `/services/custom-web-design`
   - links to `/portfolio/daley-organics`, `/about`, `/pricing`
5. A "Service-Area Architecture For Oregon Businesses" knowledge-base page
   - supports `/services/local-visibility`
   - links to `/locations`, `/portfolio/oregon-smb-directory`, `/contact`
6. A "Sample Visibility And Response Dashboard" proof asset
   - supports `/services/search-data-architecture`
   - links to reports, pricing, and contact

## Best Use Of The Current Supplied Assets

### `gemini-programmatic-execution-guidelines.html`

Best fit:

- `/knowledge-base/gemini-programmatic-execution-guidelines`

Role:

- technical authority asset
- supports search/data architecture and custom web design credibility

### `astro-7-→-cloudflare-workers-leverage-ai-field-guide.html`

Best fit:

- `/knowledge-base/astro-cloudflare-workers-field-guide`

Role:

- implementation authority asset
- supports the Workers-first and performance-first build story

### `steel-dev-awesome-web-agents-report (1).html`

Best fit:

- `/reports/web-agents-intelligence-report`

Role:

- report-level technical authority piece
- supports brand depth without taking over the homepage messaging

### `Oregon_Infrastructure_Intel.pdf`

Best fit:

- already mapped into `/reports/oregon-market-intel-infrastructure-report`
- continue feeding `/locations/*` and `/pricing`

### `leverage-ai-case-studies.html`

Best fit:

- structural source for future portfolio pages

Role:

- case-study information architecture reference
- not palette reference

## Asset Intake Priority

1. Finish the supplied branded HTML assets already on disk
2. Add one diagnostic-audit explainer
3. Add one missed-call / response-time report
4. Add one sample dashboard proof surface
5. Add first 2 to 3 industry pages once they can inherit proof and links cleanly

## Anti-Patterns

- Do not add content that only links back to its own hub.
- Do not publish technical assets with no buyer-facing bridge back to services or contact.
- Do not create city or industry pages without proof, report, or pricing relationships.
- Do not let `/blog` absorb assets that should be stronger as reports or knowledge-base entries.
