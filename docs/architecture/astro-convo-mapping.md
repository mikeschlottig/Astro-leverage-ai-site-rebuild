# Astro Convo Mapping

This file maps `C:\Users\mikes\Downloads\astro-convo.json` onto the rebuild ontology in [site-ontology.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/site-ontology.md).

## What The Convo Contributes

### Positioning

- Result-first messaging: high-intent local customers, faster response, and booked jobs.
- Anti-slop constraint: avoid fake proof, vague AI jargon, and generic agency language.
- Oregon/local grounding: the site should sound like it understands actual markets, not generic SEO templates.

### Route Architecture

The convo repeatedly supports these route families:

- `/services/*`
- `/portfolio/*`
- `/locations/*`
- `/industries/*`
- `/blog/*`
- `/reports/*`
- `/pricing`
- `/contact`

### Service Model

The convo converges on four primary outcome-led services:

1. Local Visibility Systems
2. Custom Web Design
3. Lead Capture & AI Follow-Up
4. Search & Data Architecture

It also preserves older service concepts as likely secondary or supporting concepts:

- AI Search Optimization
- Brand Architecture
- Data Analytics
- Design Strategy

### Case Studies And Proof

- Daley Organics is a real proof asset and should use real metrics only.
- Oregon SMB Directory is both a case study and a local authority engine.
- Dashboards may be used as sample UI surfaces, but should be clearly labeled illustrative unless backed by real data.

### Programmatic Local Content

The convo includes 12 researched Oregon cities and repeatedly treats them as a deployable location-page system, not ad hoc copy:

- Albany
- Ashland
- Bend
- Corvallis
- Eugene
- Grants Pass
- Klamath Falls
- Medford
- Portland
- Roseburg
- Salem
- Springfield

The location-page ontology should capture:

- City facts and nearby towns
- Economic drivers
- Local culture and market nuance
- Competition level
- Opportunity framing
- Internal links to services, proof, and reports

### Conversion Workflow

The convo strongly prefers:

- Cloudflare Workers over third-party automation middlemen
- A contact flow that validates input, uses a honeypot, and routes leads quickly
- A response-time story that matches the service offer

### Long-Form Content

The convo treats blog posts, reports, and knowledge-base content as first-class:

- blog posts build topical authority
- reports carry research and citations
- knowledge base supports durable educational content
- all long-form content should render as crawler-visible HTML

## Mapping By Ontology Node

| Ontology node | Astro-convo contribution | Implementation target |
| --- | --- | --- |
| Homepage | Result-first hero, urgency, local service business framing | `src/pages/index.astro` plus homepage sections |
| Services | Outcome-led primary services and supporting sub-services | `src/content/services/*` and `src/pages/services/[slug].astro` |
| Portfolio | Daley + Oregon SMB Directory as initial proof set | `src/content/case-studies/*` and `src/pages/portfolio/[slug].astro` |
| Locations | 12-city deployable system with `getStaticPaths()` logic | `src/data/locations.ts` and `src/pages/locations/[slug].astro` |
| Industries | Industry hubs after proof is established | `src/content/industries/*` and `src/pages/industries/[slug].astro` |
| Reports | Research-backed long-form "intelligence" surfaces | `src/content/reports/*` and `src/layouts/ReportLayout.astro` |
| Blog | Authority-building editorial inventory | `src/content/blog/*` and `src/layouts/BlogPostLayout.astro` |
| Knowledge base | Durable explainers and educational support | `src/content/knowledge-base/*` and `src/pages/knowledge-base/[slug].astro` |
| Contact flow | Workers-based form routing and validation | `worker/contact.ts` plus `src/components/contact/ContactForm.astro` |
| Schema | Entity-rich JSON-LD across services, articles, and local business | `src/lib/schema.ts` |

## Locked vs Open

### Locked

- Keep the hero background concept.
- Keep the three-tier pricing concept, but move it to a standalone `/pricing`.
- Keep the Oregon/local market strategy.
- Keep content collections and programmatic route thinking.
- Keep Cloudflare Workers in the architecture.

### Open

- Exact final public nav labels
- Whether `/resources` becomes a real top-level route or stays split across `/reports` and `/knowledge-base`
- Exact visual register, reference sites, and accessibility targets for `PRODUCT.md` / `DESIGN.md`
