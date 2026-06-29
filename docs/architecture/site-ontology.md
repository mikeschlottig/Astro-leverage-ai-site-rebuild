# Site Ontology

This ontology is the current source of truth for the rebuild in `C:\Users\mikes\Documents\Astro-leverage-ai-site-rebuild`.

It is synthesized from:

- `C:\Users\mikes\.codex\attachments\8979fb3c-1d91-40b2-9101-17c700e38938\pasted-text.txt`
- `C:\Users\mikes\Downloads\astro-convo.json`

## Core Product Model

- The site is a brand-led growth system for Oregon service businesses.
- The primary outcome is not "AI visibility" by itself; it is more high-intent local demand, faster response, and more booked jobs.
- The public architecture should be outcome-led, not discipline-led.
- The confirmed register is `brand`, with Workers and app logic supporting the public brand surface.

## Messaging Pillars

1. Presence: appear where local customers search.
2. Quality: communicate trust and premium execution.
3. Intent Capture: convert visits into calls, forms, and quote requests.
4. Immediate Response: follow up before intent drifts away.
5. Measurement: show what is working with real proof and sample dashboards.

## Route Families

### Primary marketing routes

- `/`
- `/about`
- `/services`
- `/pricing`
- `/portfolio`
- `/contact`

### Outcome-led service routes

- `/services/local-visibility`
- `/services/custom-web-design`
- `/services/lead-capture-ai-follow-up`
- `/services/search-data-architecture`

### Supporting route families

- `/portfolio/[slug]`
- `/locations`
- `/locations/[slug]`
- `/industries`
- `/industries/[slug]`
- `/blog`
- `/blog/[slug]`
- `/reports`
- `/reports/[slug]`
- `/knowledge-base`
- `/knowledge-base/[slug]`

## Content Types

- Service page
- Portfolio case study
- Location page
- Industry page
- Blog post
- Intelligence report
- Knowledge-base article

Each content type needs:

- SEO title and description
- Canonical URL
- Server-rendered JSON-LD
- Internal-link relationships
- A next action

## Link Graph Rules

- Service pages link to related reports, portfolio proof, and relevant locations.
- Portfolio pages link to the services used, the broader portfolio index, and related posts.
- Location pages link to Local Visibility, Custom Web Design, Lead Capture, Oregon SMB Directory, and official local sources.
- Blog and knowledge-base entries link back to at least one service page and one related hub when relevant.
- No route family should ship without an inbound and outbound link strategy.

## Required Proof Surfaces

- Daley Organics case study
- Oregon SMB Directory case study
- "Why Speed Wins" style research/report surface
- Sample dashboards for visibility and response-time monitoring

## Preserved Assets And Existing Wins

The rebuild should preserve or reincorporate:

- Hero background video / search-light visual
- Header
- Footer
- Blog posts and article inventory
- Local schema.org / JSON-LD work
- Founder photo on `/about`

The rebuild must also address:

- Standalone `/pricing`
- Better blog and long-form formatting
- `/knowledge-base`
- Better real-life imagery
- Podcast/media component repair

## Technical Shape

- Astro 6 app
- `pnpm` workspace defaults
- Node pinned in `.nvmrc`, `.node-version`, and `package.json`
- Cloudflare Workers Static Assets or hybrid Workers, not Pages-by-default
- Content collections as the main editorial system
- Static Astro by default; hydrate only where interaction is necessary
- Worker/API surface for contact and lead-routing logic when needed
- WCAG AA plus reduced motion support is the default accessibility baseline

## Proposed File Tree

```text
src/
  components/
    case-studies/
      CaseStudyHero.astro
      ResultsStrip.astro
    contact/
      ContactForm.astro
      ResponseTimeStats.astro
    locations/
      LocationHero.astro
      MarketSignals.astro
      NearbyCities.astro
    reports/
      ReportBackToTop.astro
      ReportCallout.astro
      ReportSources.astro
      ReportToc.astro
    site/
      HeroSection.astro
      SiteFooter.astro
      SiteHeader.astro
      SectionIntro.astro
  content/
    blog/
    case-studies/
    industries/
    knowledge-base/
    locations/
    reports/
    services/
  data/
    locations.ts
    navigation.ts
    services.ts
  layouts/
    BaseLayout.astro
    BlogPostLayout.astro
    CaseStudyLayout.astro
    ReportLayout.astro
  lib/
    content-links.ts
    schema.ts
    seo.ts
    site.ts
  pages/
    404.astro
    about.astro
    contact.astro
    index.astro
    pricing.astro
    services/
      index.astro
      [slug].astro
    portfolio/
      index.astro
      [slug].astro
    locations/
      index.astro
      [slug].astro
    industries/
      index.astro
      [slug].astro
    blog/
      index.astro
      [slug].astro
    reports/
      index.astro
      [slug].astro
    knowledge-base/
      index.astro
      [slug].astro
public/
  images/
  og/
  video/
worker/
  contact.ts
```

## Data Model Highlights

- `locations` collection or data file should hold the 12 Oregon city records plus derived opportunity framing.
- `case-studies` should carry business, problem, system, result, services used, and location relevance.
- `services` should support outcome-led public slugs plus secondary legacy concepts where needed.
- `reports` and `knowledge-base` should support long-form structured content, citations, callouts, and related links.

## Open Decisions Before UI Scaffolding

- Whether `/resources` should exist as a public umbrella or whether reports and knowledge base stay top-level
