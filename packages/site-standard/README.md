# @leverageai/site-standard

Shared SEO/schema/head standard for LEVERAGEAI Astro properties
(**leverageai.network**, **oregonsmbdirectory.com**). One maintained package →
both sites inherit the same canonical policy, JSON-LD graphs, social cards,
host redirects, and CI guards.

Closes audit findings: **N1** (schema homepage-only), **N2** (leaked drafting
language), **N3** (www duplicate host), **N4** (canonical→307 contradiction),
**N5** (no OG/Twitter cards) — and enforces the directory's
ARCHITECTURE-INVARIANT CI guards.

## Install (per repo)

```jsonc
// package.json
"dependencies": { "@leverageai/site-standard": "workspace:*" }  // monorepo
// or: "github:mikeschlottig/site-standard#v1.0.0"
```

## Astro config alignment (required — closes N4)

```ts
// astro.config.ts — BOTH repos
export default defineConfig({
  site: 'https://leverageai.network',   // apex, no trailing slash
  trailingSlash: 'always',
  build: { format: 'directory' },
});
```

Internal links must use trailing slashes. The canonical guard fails the build
if any rendered canonical disagrees with `SITE_URL + route + '/'`; the internal-link
guard fails if a rendered page link omits the slash or points at a route absent from `dist/`.

## Usage

```ts
// src/site.ts — one per repo
import { defineSiteIdentity } from '@leverageai/site-standard';

export const IDENTITY = defineSiteIdentity({
  url: 'https://leverageai.network',
  name: 'Leverage AI',
  legalName: 'Leverage AI LLC',
  description: 'Local demand systems for Oregon service businesses.',
  logoUrl: 'https://leverageai.network/images/logo.png',
  defaultOgImageUrl: 'https://leverageai.network/images/og-default.jpg',
  email: 'mike@leverageai.network',
  address: { addressLocality: 'Grants Pass', addressRegion: 'OR', addressCountry: 'US' },
  founder: {
    name: 'Mike Schlottig',
    jobTitle: 'Founder & Systems Strategist',
    imageUrl: 'https://leverageai.network/images/founder/mike-schlottig.jpg',
    sameAs: ['https://github.com/mikeschlottig'],
  },
  sameAs: ['https://github.com/mikeschlottig'],
  areaServed: ['Grants Pass', 'Medford', 'Bend', 'Eugene', 'Salem', 'Portland'],
});
```

```astro
---
// src/layouts/Base.astro
import SeoHead from '@leverageai/site-standard/components/SeoHead.astro';
import SchemaGraph from '@leverageai/site-standard/components/SchemaGraph.astro';
import { IDENTITY } from '../site';
import type { PageMeta } from '@leverageai/site-standard';

interface Props { readonly page: PageMeta }
const { page } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <SeoHead identity={IDENTITY} page={page} />
    <SchemaGraph identity={IDENTITY} page={page} />
  </head>
  <body><slot /></body>
</html>
```

```astro
---
// a service page
const page = {
  type: 'service',
  title: 'Local Visibility Systems | Leverage AI',
  description: 'Build the local search, map-pack, and entity signals…',
  path: '/services/local-visibility/',
  breadcrumbs: [
    { name: 'Home', url: 'https://leverageai.network/' },
    { name: 'Services', url: 'https://leverageai.network/services/' },
    { name: 'Local Visibility Systems' },
  ],
  serviceName: 'Local Visibility Systems',
  faqs: [{ question: 'Is this just local SEO…?', answer: 'No. …' }],
} satisfies PageMeta;
---
<Base page={page}>…</Base>
```

Directory pages use `type: 'listing'` (+ `listItems`) and `type: 'business'`
(+ `businessName/Address/Geo/Rating…`) — the graph builder handles `ItemList`
and `LocalBusiness` per the invariant.

## Host redirects (closes N3 + directory R2)

Upload `redirects/leverageai-host-redirects.csv` as a Cloudflare **Bulk
Redirect List** (Account → Bulk Redirects), then enable it in a Bulk Redirect
Rule. Format per Cloudflare's official CSV spec (no header row):
`SOURCE,TARGET,STATUS,PRESERVE_QUERY_STRING,INCLUDE_SUBDOMAINS,SUBPATH_MATCHING,PRESERVE_PATH_SUFFIX`.
Both rows: 301, query preserved, subpath matching + path suffix ON — so
`www.x/any/path?q=1` → `apex/any/path?q=1`.

## CI guards

`ci/site-standard.yml` builds, then runs the four guards against `dist/`:

| Guard | Fails when | Closes |
|---|---|---|
| `lint-banned-phrases` | drafting language ("the reference pages", "per the brief", TODO/lorem) in rendered HTML | N2 |
| `validate-canonicals` | canonical missing, on www, or not exactly `SITE_URL + route + '/'` | N4 / invariant #2 |
| `validate-schema` | any indexable page with no parseable JSON-LD containing an Organization node | N1 |
| `validate-internal-links` | an internal page link omits its trailing slash or points at a route absent from `dist/` | Route integrity |

Run locally: `SITE_URL=https://leverageai.network node scripts/validate-canonicals.mjs dist`.

## Non-goals

Astro's sitemap integration, robots.txt, and the directory's route/dedup
guards stay in each repo — this package standardizes what's identical, not
what's property-specific.
