# Asset Source Manifest

This is the tracked source-of-truth index for externally supplied assets now staged under:

- `C:\Users\mikes\Documents\Astro-leverage-ai-site-rebuild\reference\source-assets\raw`

Use this file to answer two questions quickly:

1. What assets do we have?
2. Which parts of the Astro site already use them?

## Status Key

- `Ingested`: the asset has already been converted into one or more live site routes or architectural docs.
- `Partially ingested`: the asset influenced the site, but still has recoverable value for additional pages or stronger copy.
- `Queued`: the asset is staged locally but has not yet been fully mapped into a public route or reusable component pattern.

## Foundational Inputs

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `astro-convo.json` | `reference/source-assets/raw/conversation/astro-convo.json` | conversation-derived architecture and messaging source | Ingested | [astro-convo-map.json](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/astro-convo-map.json), [astro-convo-mapping.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/astro-convo-mapping.md), [site-ontology.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/site-ontology.md) |
| `site-layout-source.txt` | `reference/source-assets/raw/layout-source/site-layout-source.txt` | original site tree and layout grammar source | Ingested | [site-ontology.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/site-ontology.md), route family scaffold in [src/pages](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages) |
| `geo-optimized-content-skill.txt` | `reference/source-assets/raw/skills/geo-optimized-content-skill.txt` | GEO and local-AI-search content method | Ingested | [how-to-create-geo-optimized-content-for-ai-search-and-local-seo.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-to-create-geo-optimized-content-for-ai-search-and-local-seo.md) |

## Design And Structural References

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `leverageai-rebuild.zip` | `reference/source-assets/raw/zip/leverageai-rebuild.zip` | upgraded layout, spacing, and page-grammar reference | Partially ingested | current premium dark/amber surface across [src/pages/index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/index.astro), [src/pages/pricing.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/pricing.astro), and shared components |
| `leverage-ai-case-studies.html` | `reference/source-assets/raw/case-studies/leverage-ai-case-studies.html` | proof architecture and case-study sequencing reference | Partially ingested | canonical portfolio content pattern in [daley-organics.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/case-studies/daley-organics.md), [oregon-smb-directory.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/case-studies/oregon-smb-directory.md), and [src/pages/portfolio/[slug].astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/portfolio/[slug].astro) |
| `leverageai-strategy-playbook.html` | `reference/source-assets/raw/reference-html/leverageai-strategy-playbook.html` | pricing and authority component reference | Partially ingested | service-page and pricing direction, with additional extraction still queued |
| `leverageai-network-schema-package.html` | `reference/source-assets/raw/reference-html/leverageai-network-schema-package.html` | authority, snippets, and structured-network reference | Partially ingested | service proof/FAQ direction and schema-aware content posture |

## Technical Authority Assets

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `gemini-programmatic-execution-guidelines.html` | `reference/source-assets/raw/reference-html/gemini-programmatic-execution-guidelines.html` | technical authority article for execution rigor | Ingested | [gemini-programmatic-execution-guidelines.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/gemini-programmatic-execution-guidelines.md) |
| `astro-cloudflare-workers-field-guide.html` | `reference/source-assets/raw/reference-html/astro-cloudflare-workers-field-guide.html` | deployment and architecture field guide | Ingested | [astro-cloudflare-workers-field-guide.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/astro-cloudflare-workers-field-guide.md) |
| `steel-dev-awesome-web-agents-report.html` | `reference/source-assets/raw/reference-html/steel-dev-awesome-web-agents-report.html` | report-style technical authority asset | Ingested | [web-agents-intelligence-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/web-agents-intelligence-report.md) |
| `intel-seo.md` | `reference/source-assets/raw/strategy/intel-seo.md` | search-intelligence source material | Ingested | [competitive-search-intelligence-with-google-trends-and-search-operators.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/competitive-search-intelligence-with-google-trends-and-search-operators.md), [how-to-use-google-trends-and-search-operators-for-local-competitive-research.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-to-use-google-trends-and-search-operators-for-local-competitive-research.md) |

## Market And Location Assets

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `oregon-infrastructure-intel.pdf` | `reference/source-assets/raw/pdfs/oregon-infrastructure-intel.pdf` | Oregon opportunity matrix and market framing | Partially ingested | [locations/index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/locations/index.astro), [pricing.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/pricing.astro), [oregon-market-intel-infrastructure-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/oregon-market-intel-infrastructure-report.md), [rogue-valley-local-service-visibility-benchmark.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/rogue-valley-local-service-visibility-benchmark.md) |
| `diagnosing-oregons-local-service-markets.md` | `reference/source-assets/raw/reports/diagnosing-oregons-local-service-markets.md` | diagnostic-audit framing and regional market variation source | Partially ingested | [what-the-diagnostic-audit-includes.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-the-diagnostic-audit-includes.md), [how-oregon-markets-differ-for-local-service-businesses.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/how-oregon-markets-differ-for-local-service-businesses.md), [what-a-comprehensive-entity-audit-reviews.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-a-comprehensive-entity-audit-reviews.md), [rogue-valley-local-service-visibility-benchmark.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/rogue-valley-local-service-visibility-benchmark.md) |
| `the-semantic-sync-local-search-report.txt` | `reference/source-assets/raw/reports/the-semantic-sync-local-search-report.txt` | Google Business Profile and website alignment source for local search authority | Partially ingested | [semantic-sync-for-local-search.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/semantic-sync-for-local-search.md), [semantic-sync-content-pack.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/semantic-sync-content-pack.md), [what-a-comprehensive-entity-audit-reviews.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-a-comprehensive-entity-audit-reviews.md), [how-review-response-patterns-affect-local-trust.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-review-response-patterns-affect-local-trust.md) |
| `leveraging-technology-in-underserved-markets.txt` | `reference/source-assets/raw/reports/leveraging-technology-in-underserved-markets.txt` | underserved-market positioning and high-touch/high-tech founder-model source | Partially ingested | [what-the-diagnostic-audit-includes.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-the-diagnostic-audit-includes.md), [why-high-touch-still-matters-in-underserved-service-markets.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/blog/why-high-touch-still-matters-in-underserved-service-markets.md), [southern-oregon-technology-gaps-and-local-growth-opportunity.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/southern-oregon-technology-gaps-and-local-growth-opportunity.md), [rogue-valley-local-service-visibility-benchmark.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/rogue-valley-local-service-visibility-benchmark.md), [entity-audit-and-underserved-markets-pack.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/entity-audit-and-underserved-markets-pack.md) |
| `seo-geo-non-metropolitan-service-businesses-2026.txt` | `reference/source-assets/raw/reports/seo-geo-non-metropolitan-service-businesses-2026.txt` | 360-degree entity-strength, local SEO, and GEO source for non-metro service businesses | Partially ingested | [entity-strength-and-ai-search-visibility-for-local-service-businesses.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/entity-strength-and-ai-search-visibility-for-local-service-businesses.md), [what-the-diagnostic-audit-includes.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-the-diagnostic-audit-includes.md), [what-a-strong-google-business-profile-needs.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-a-strong-google-business-profile-needs.md), [how-category-sync-works-across-google-bing-yelp-and-facebook.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-category-sync-works-across-google-bing-yelp-and-facebook.md), [why-generic-service-area-pages-fail.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/why-generic-service-area-pages-fail.md), [what-a-comprehensive-entity-audit-reviews.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/what-a-comprehensive-entity-audit-reviews.md), [how-review-response-patterns-affect-local-trust.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/how-review-response-patterns-affect-local-trust.md), [rogue-valley-local-service-visibility-benchmark.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/rogue-valley-local-service-visibility-benchmark.md), [entity-audit-and-underserved-markets-pack.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/entity-audit-and-underserved-markets-pack.md) |

## Founder And Brand Assets

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `me-house-fresh-cu.jpg` | `reference/source-assets/raw/images/me-house-fresh-cu.jpg` | founder portrait and trust-surface imagery | Ingested | [about.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/about.astro), [public/images/founder/mike-schlottig.jpg](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/public/images/founder/mike-schlottig.jpg) |

## Audit And Planning Assets

| Asset | Local library copy | Source role | Status | Current site outputs |
| --- | --- | --- | --- | --- |
| `claude-site-audit-continued.md` | `reference/source-assets/raw/strategy/claude-site-audit-continued.md` | current-state audit and backlog pressure-test | Ingested | [claude-audit-scope-map.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/claude-audit-scope-map.md) |

## Immediate Reuse Priority

These assets still have the highest remaining leverage for the next content pass:

1. `leverageai-strategy-playbook.html`
2. `leverageai-network-schema-package.html`
3. `oregon-infrastructure-intel.pdf`
4. `diagnosing-oregons-local-service-markets.md`
5. `the-semantic-sync-local-search-report.txt`
6. `seo-geo-non-metropolitan-service-businesses-2026.txt`
7. `leveraging-technology-in-underserved-markets.txt`
8. `leverage-ai-case-studies.html`

Those are the best sources for expanding service detail pages, pricing proof, location depth, and additional portfolio pages without changing the site's established brand system.
