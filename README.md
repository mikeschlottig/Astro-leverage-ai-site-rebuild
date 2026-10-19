# Astro Leverage AI Site Rebuild

<!-- projectstd:begin id=facts v=1 -->
| | |
|---|---|
| Kind | node |
| Run (dev) | `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run dev` |
| Run (build) | `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run build` |
| Verify (check) | `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run check` |
| Agent contract | [`AGENTS.md`](AGENTS.md) |
<!-- projectstd:end id=facts -->

The source for **leverageai.network**, the site of Leverage AI LLC in Grants Pass, Oregon. It is an Astro 6 static site served by a Cloudflare Worker (`astro-leverage-ai-site-rebuild`) that also handles the contact form, booking, the PostHog relay, service-URL redirects and a `noindex` header on `*.workers.dev`.

The offer, as the site presents it: AI search optimization and local SEO to be found, lead capture and AI follow-up to answer every inquiry, website design, and automation and AI systems as the engine behind them. Prices are published on `/pricing/`; a legal vertical lives under `/industries/law-firms/` and the legal blog series.

## Quick start

Use **pnpm** (the repo pins `pnpm@11.2.2`; Node 22.13 or newer). The facts block above says `npm`; that is generated and wrong for this repo.

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # static site into dist/
pnpm preview    # serve dist/ locally
pnpm verify     # check + build + every guard (needs SITE_URL, see Verification)
```

## Files and layout

| path | what it holds |
|---|---|
| `src/pages/` | routes: home, services, industries, portfolio, pricing, blog, reports, guides, knowledge base, locations, legal pages |
| `src/content/` | Markdown collections: `services` (hubs, subhubs, spokes), `industries`, `blog`, `case-studies`, `guides`, `knowledge-base`, `reports` |
| `src/data/` | `pricing.ts` (published prices), `service-redirects.ts`, `locations.ts`, `authors.ts`, `navigation.ts` |
| `src/lib/` | `site.ts` (identity, nav, descriptions), `services.ts` (service tree and its build-time rules) |
| `src/components/`, `src/layouts/` | UI; `BaseLayout.astro` builds each page's SEO head and JSON-LD |
| `packages/site-standard/` | shared SEO, canonical and JSON-LD generator plus the post-build guards; used by other properties, kept dependency-free |
| `worker/` | the Cloudflare Worker: `contact.ts` (entry, contact form, redirects), `booking.ts`, `posthog-relay.ts`, `noindex.ts` |
| `scripts/` | `validate-structured-data.mjs` (the JSON-LD gate), `release-gates.mjs` (gates for the scheduled release), `generate-brand-assets.mjs` |
| `migrations/` | D1 migrations (booking tables) |
| `docs/architecture/` | design and audit documents, see below |
| `docs/research/` | source research for the legal vertical (imported 2026-10-18, unchanged) |
| `docs/publishing/` | publishing plans and runbooks |
| `dist/` | build output, regenerated |

## Verification

```bash
SITE_URL=https://leverageai.network pnpm verify
```

`verify` runs `astro check`, `astro build`, then `guard:site-standard`:

| guard | proves |
|---|---|
| `guard:phrases` | no drafting language in rendered HTML |
| `guard:canonicals` | every canonical is the apex domain with a trailing slash (needs `SITE_URL`; CI sets it) |
| `guard:schema` | every indexable page has a parseable JSON-LD block with an Organization node |
| `guard:structured-data` | every indexable page's structured data validates against schema.org 30.1 and Google Rich Results rules, with zero errors or warnings; coverage and gaps are in `docs/architecture/structured-data-validation.md` |
| `guard:links` | every internal link points at a built route with a trailing slash |

Worker tests: `node --test worker/noindex.test.ts worker/booking-slots.test.ts`.

**Last run, 2026-10-19:** all of the above exit 0 twice: built as of today (77 pages, one legal post live) and with `PUBLISH_AS_OF=2026-11-02` (84 pages, 82 indexable, structured data valid on all). 12 worker tests pass. validator.schema.org returned 0 errors and 0 warnings on one page per page type. Not yet run: the Google Rich Results Test (no public API; a manual step after deploy). Page counts depend on the build date because scheduled blog posts are not built until their date.

## Documentation

- `AGENTS.md` — agent contract and project rules
- `PRODUCT.md` — product, audience, brand and accessibility context
- `WORKLOG.md` — what changed and what is next, newest first
- `tasks.md`, `hypothesis.md` — the current plan and its predictions versus outcomes
- `docs/architecture/offer-repositioning-plan.html` — the 2026-10-18 offer plan, with a status table
- `docs/architecture/structured-data-validation.md` — the JSON-LD gate, what it covers, results
- `docs/publishing/legal-series-publishing-plan.md` — calendar, runbook and checks for the eight-post legal series
- `docs/architecture/site-ontology.md` — site hierarchy and service route families
- `docs/architecture/contact-flow-deployment-hardening.md`, `booking-and-call.md` — the Worker's contact and booking flows
- `docs/architecture/performance-and-about-image-audit.md` — measured performance findings
- `docs/architecture/astro-convo-mapping.md` — Astro conversation and source mapping

## Open items

See `tasks.md`. The contract and ownership terms and the real-estate page are each their own piece of work.
