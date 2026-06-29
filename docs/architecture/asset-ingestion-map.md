# Asset Ingestion Map

This file maps the staged source library onto the current site architecture so we can keep building content step by step without re-deciding where things belong.

## Core Rule

Every asset should do at least one of these jobs:

- strengthen a service page
- deepen a proof page
- widen a report or knowledge-base cluster
- feed location relevance
- improve a conversion surface

## Already Landed

### Architectural foundation

- `astro-convo.json`
  - mapped into [site-ontology.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/site-ontology.md)
  - mapped into [astro-convo-mapping.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/astro-convo-mapping.md)
- `site-layout-source.txt`
  - established route families, file-tree intent, and brand-first structure

### Technical authority cluster

- `gemini-programmatic-execution-guidelines.html`
  - now lives at [gemini-programmatic-execution-guidelines.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/gemini-programmatic-execution-guidelines.md)
  - links into `/services/custom-web-design` and `/services/search-data-architecture`
- `astro-cloudflare-workers-field-guide.html`
  - now lives at [astro-cloudflare-workers-field-guide.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/astro-cloudflare-workers-field-guide.md)
  - supports the implementation-authority cluster
- `steel-dev-awesome-web-agents-report.html`
  - now lives at [web-agents-intelligence-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/web-agents-intelligence-report.md)
  - strengthens the technical report surface

### Search and GEO cluster

- `intel-seo.md`
  - became [competitive-search-intelligence-with-google-trends-and-search-operators.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/competitive-search-intelligence-with-google-trends-and-search-operators.md)
  - also became [how-to-use-google-trends-and-search-operators-for-local-competitive-research.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-to-use-google-trends-and-search-operators-for-local-competitive-research.md)
- `geo-optimized-content-skill.txt`
  - became [how-to-create-geo-optimized-content-for-ai-search-and-local-seo.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-to-create-geo-optimized-content-for-ai-search-and-local-seo.md)

### Proof and market cluster

- `leverage-ai-case-studies.html`
  - informed the canonical structure behind [daley-organics.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/case-studies/daley-organics.md) and [oregon-smb-directory.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/case-studies/oregon-smb-directory.md)
- `oregon-infrastructure-intel.pdf`
  - influenced [pricing.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/pricing.astro)
  - influenced [locations/index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/locations/index.astro)
  - fed [oregon-market-intel-infrastructure-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/oregon-market-intel-infrastructure-report.md)
- `diagnosing-oregons-local-service-markets.md`
  - fed [what-the-diagnostic-audit-includes.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-the-diagnostic-audit-includes.md)
  - fed [how-oregon-markets-differ-for-local-service-businesses.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/how-oregon-markets-differ-for-local-service-businesses.md)

## Best Next Build Sequence

### 1. Service detail deepening

Primary source assets:

- `leverageai-strategy-playbook.html`
- `leverageai-network-schema-package.html`
- `diagnosing-oregons-local-service-markets.md`

Target routes:

- `/services/local-visibility`
- `/services/custom-web-design`
- `/services/lead-capture-ai-follow-up`
- `/services/search-data-architecture`

What to extract:

- authority-link blocks
- FAQ and proof modules
- stronger diagnostic language
- clearer service-to-outcome framing

Definition of done:

- every service page has stronger proof density
- every service page points to at least one report, one knowledge-base article, and one relevant conversion surface

### 2. Pricing proof upgrade

Primary source assets:

- `oregon-infrastructure-intel.pdf`
- `diagnosing-oregons-local-service-markets.md`
- `leverageai-strategy-playbook.html`

Target route:

- `/pricing`

What to extract:

- why a diagnostic comes first
- audit deliverable framing
- differences between one-time implementation and ongoing adaptation
- stronger language around market complexity, lost demand, and prioritization

Definition of done:

- pricing reads like a serious advisory surface instead of a generic package table

### 3. Location cluster deepening

Primary source assets:

- `oregon-infrastructure-intel.pdf`
- `diagnosing-oregons-local-service-markets.md`
- `astro-convo.json`

Target routes:

- `/locations`
- `/locations/[slug]`

What to extract:

- city-level opportunity distinctions
- market-pressure framing
- supporting official-source ideas
- internal links to relevant services and proof pages

Definition of done:

- each city page feels locally differentiated rather than templated

### 4. Portfolio expansion

Primary source assets:

- `leverage-ai-case-studies.html`
- `leverageai-strategy-playbook.html`
- future pitch decks and operator notes when available

Target routes:

- `/portfolio/[slug]`
- `/portfolio`

What to extract:

- tighter problem and result framing
- better stat-band usage
- cleaner business-language proof blocks

Suggested next content candidates:

- another service-business case study with measured operational impact
- a system-build case study around response speed or market coverage

### 5. Authority-supporting service chrome

Primary source assets:

- `leverageai-network-schema-package.html`
- `leverageai-strategy-playbook.html`

Target implementation areas:

- [src/pages/services/[slug].astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/services/[slug].astro)
- shared service-page support components

What to extract:

- lightweight authority strips
- FAQ/proof modules
- snippet-ready answer structures
- support-link groupings to reports, knowledge base, and locations

Definition of done:

- service pages feel like the center of a real content graph rather than isolated landing pages

## Route-Level Queue

| Source asset | Best next route or component | Priority | Notes |
| --- | --- | --- | --- |
| `leverageai-strategy-playbook.html` | service support blocks and `/pricing` refinements | High | strongest remaining reusable public-page value |
| `leverageai-network-schema-package.html` | service authority modules and possible KB explainer on search entity architecture | High | best used to improve trust and snippet readiness |
| `oregon-infrastructure-intel.pdf` | deeper city-page blocks and pricing diagnostic proof | High | strongest location-cluster fuel still on the table |
| `diagnosing-oregons-local-service-markets.md` | service audit sections and location differentiation copy | High | pairs naturally with pricing and location pages |
| `leverage-ai-case-studies.html` | additional `/portfolio/[slug]` entries | Medium | layout logic already harvested, content logic still valuable |
| `leverageai-rebuild.zip` | selective component polish only | Medium | keep layout grammar, not the old palette grammar |

## Working Principle From Here

We should keep treating the current Astro build as the premium brand system and use these staged assets as content fuel. The safest pattern is:

1. extract the information architecture or proof logic
2. rewrite into the dark/amber trust surface
3. attach it to the existing link clusters
4. avoid importing mismatched palette, cadence, or generic slogans

## Audit-Driven Reprioritization

The staged audit asset at `reference/source-assets/raw/strategy/claude-site-audit-continued.md` slightly changes the next build order.

It does not change the strategy. It changes the urgency of public unfinished-state cleanup.

Near-term order:

1. finish visible placeholder pages and remove exposed local file paths
2. surface `/locations` in nav and replace homepage build-note copy
3. polish contact success/error states and remove scaffolding language
4. return to deeper service-detail enrichment from the strategy and schema references

See [claude-audit-scope-map.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/claude-audit-scope-map.md) for the task-by-task classification.
