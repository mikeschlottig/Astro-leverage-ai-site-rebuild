# Link Cluster Map

This document turns the current ontology and new branded assets into a systematic internal-link structure.

## Core Rule

Every index page is a hub. Every detail page belongs to at least one cluster. Every cluster must link:

- up to a hub
- sideways to adjacent support pages
- down to supporting detail pages
- forward to a conversion surface

## Primary Hubs

- `/services`
- `/portfolio`
- `/pricing`
- `/blog`
- `/reports`
- `/knowledge-base`
- `/locations`
- `/industries`
- `/contact`

## Primary Clusters

### Cluster: Local Demand And Response

Purpose:

- prove why lead speed, trust, and local visibility matter
- support Local Visibility and Lead Capture services

Hub routes:

- `/services/local-visibility`
- `/services/lead-capture-ai-follow-up`
- `/reports/why-speed-wins`

Supporting routes:

- `/portfolio/daley-organics`
- `/locations/[slug]`
- future missed-call and speed-to-lead articles

Required links:

- every location page links to both service hubs
- `/reports/why-speed-wins` links back to both services and to contact
- Daley case study links to both services and the report

### Cluster: Technical Execution And Infrastructure

Purpose:

- establish implementation authority
- support Search & Data Architecture and Custom Web Design

Hub routes:

- `/services/custom-web-design`
- `/services/search-data-architecture`
- `/knowledge-base`

Seed branded assets:

- `gemini-programmatic-execution-guidelines.html`
- `astro-7-→-cloudflare-workers-leverage-ai-field-guide.html`
- `steel-dev-awesome-web-agents-report (1).html`

Proposed route mapping:

- `/knowledge-base/gemini-programmatic-execution-guidelines`
- `/knowledge-base/astro-cloudflare-workers-field-guide`
- `/reports/web-agents-intelligence-report`

Required links:

- each technical guide links back to one or both technical service pages
- `/reports/web-agents-intelligence-report` links to at least one service page, one related guide, and contact
- service pages surface selected technical authority assets without turning into developer docs

### Cluster: Proof And Market Authority

Purpose:

- connect real outcomes, real markets, and content authority

Hub routes:

- `/portfolio`
- `/locations`
- `/industries`

Supporting routes:

- `/portfolio/daley-organics`
- `/portfolio/oregon-smb-directory`
- `/locations/[slug]`
- `/industries/local-services`

Required links:

- case studies link to relevant cities and services
- location pages link to the Oregon SMB Directory case study when locally relevant
- industry pages link to at least one case study and one service page

## Homepage Link Responsibilities

The homepage must link directly to:

- all four primary service pages
- portfolio hub
- pricing
- reports hub
- knowledge-base hub
- at least one featured case study
- at least one featured report or guide
- contact

## Footer Link Responsibilities

The footer must reinforce the hierarchy, not just repeat marketing links.

Minimum footer groups:

- Services
- Proof
- Resources
- Company
- Contact

## Nav Principles

- Top nav should reflect the hierarchy, not random popularity.
- Avoid stranded routes that are only accessible from body copy.
- If a hub exists publicly, it should be reachable from nav, footer, or both.

## Immediate Next Asset Ingestion

1. Convert the Web Agents Intelligence Report into a report route.
2. Convert the Gemini execution guidelines into a knowledge-base route.
3. Convert the Astro + Cloudflare field guide into a knowledge-base route.
4. Cross-link those three assets back to:
   - `/services/custom-web-design`
   - `/services/search-data-architecture`
   - `/contact`
