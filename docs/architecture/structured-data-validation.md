# Structured data validation

Last verified: 2026-10-18 against schema.org **30.1** and the Google Search Central documentation fetched that day.

## What the gate is

`pnpm guard:structured-data` runs `scripts/validate-structured-data.mjs` over `dist/`. It is part of
`pnpm guard:site-standard`, so `pnpm verify` and CI (`.github/workflows/site-standard.yml`) both run it.

It composes two maintained libraries and defines no rules of its own:

| piece | role |
|---|---|
| `@marbec/web-auto-extractor` 2.2.1 | extracts JSON-LD, microdata and RDFa from each built page |
| `@adobe/structured-data-validator` 1.7.0 | validates the extracted data against schema.org and Google Rich Results requirements |
| schema.org `schemaorg-all-https.jsonld` v30.1 | the vocabulary, downloaded once to `node_modules/.cache/` and pinned by `SCHEMA_ORG_VERSION` in the script |

Every indexable page is checked (pages with `noindex` and `404.html` are skipped). Any error **or warning** fails the build.
Bump the vocabulary deliberately; releases are listed at https://schema.org/docs/releases.html.

The older `packages/site-standard/scripts/validate-schema.mjs` stays: it proves a block exists, parses, and contains an Organization node.

## What each layer covers, measured

| layer | catches | does not catch |
|---|---|---|
| schema.org vocabulary (Adobe validator, global handler) | unknown types, unknown properties, wrong value types | Google-specific requirements |
| Google rules inside the Adobe validator | `BreadcrumbList` and `ListItem` (at least two items, `item`, `position`, `name`), `Organization`, `Person` (name), `ImageObject`, `Product`, `Review`, `Recipe`, `JobPosting`, `VideoObject` and related | **`Article`, `FAQPage`, `LocalBusiness` / `ProfessionalService`, `WebSite`, `Service`** (no handler for these types) |
| validator.schema.org (official, run by hand) | the same vocabulary rules, from schema.org itself | Google requirements |
| Google Rich Results Test | Google's own eligibility | cannot be automated; there is no public API |

Negative controls, run 2026-10-18:

- The Adobe gate rejected a page with an `Article` author missing `name`, a one-item `BreadcrumbList`, and an invalid type. It **passed** a `Question` with no `acceptedAnswer` and a non-date `datePublished`, which is the coverage gap in the table.
- validator.schema.org returned 3 errors on a page with an unknown type and an unknown property (`INVALID_ITEMTYPE`, `INVALID_PREDICATE`, `INVALID_OBJECT`), so it is not vacuous.

## Results, 2026-10-18

- `pnpm verify`: exit 0; structured data valid on 82 indexable pages with zero errors or warnings.
- validator.schema.org, one page per node-type signature (`/`, a service hub, a location, a blog post, a guide with FAQ, `/pricing/`, `/industries/law-firms/`, `/services/`): **0 errors, 0 warnings** on all eight.

## Google requirements for the types the gate does not cover

Checked by hand against Google's documentation, fetched 2026-10-18 (saved copies are not committed):

| type we emit | Google requirement | status |
|---|---|---|
| `LocalBusiness` subtype (`ProfessionalService`, home page) | required: `address`, `name`; recommended includes `telephone`, `url`, `image` | met. No street address or postal code is published (service-area business) and none is invented |
| `Article` | no required properties; recommended `author`, `author.name`, `author.url` or `sameAs`, `datePublished`, `dateModified`, `headline`, `image` | met except `dateModified`, which is only added when a real modified date exists |
| `WebSite` (site names) | `name` and `url` on the home page | met |
| `Organization` | no required properties; recommended `name`, `url`, `logo`, `address`, `contactPoint`, `sameAs` | met; the logo is an SVG |
| `FAQPage` | **Google removed the FAQ rich result feature and its documentation in May 2026** (Search Central changelog) | markup is valid schema.org and matches visible text; it earns no Google rich result |
| `Service` | no Google rich result | valid schema.org only |

## Manual step that cannot be automated

After a deploy, run the Google Rich Results Test (https://search.google.com/test/rich-results) on `/`, a service hub
and one blog post, and Search Console's Enhancements reports. Record the result in `WORKLOG.md`.

## Changes made to the generator on 2026-10-18

- `Article.author` now carries `name` and `sameAs` inline, not only an `@id` reference (the gate failed 39 pages on this).
- `Article.headline` is the title without the " | Leverage AI" suffix (new optional `PageMeta.headline`, set in `BaseLayout.astro`).
- `BreadcrumbList` is emitted only with two or more items, so the home page no longer carries a one-item list.
- `ProfessionalService` gained `image`.

These live in `packages/site-standard`, which other properties share; they fix defects, not preferences.

## Sitemap and robots

`@astrojs/sitemap` generates `sitemap-index.xml` and `sitemap-0.xml`. `astro.config.mjs` filters out `/contact/thanks/`
(a `noindex` page). Checked 2026-10-18: every indexable built page is listed, no listed URL lacks a built page, no
`noindex` page is listed, no retired hub URL is listed. There is no `lastmod`. `public/robots.txt` allows all and names the sitemap index;
`noindex` pages are not disallowed, because a crawler must be able to fetch a page to see its `noindex`.
