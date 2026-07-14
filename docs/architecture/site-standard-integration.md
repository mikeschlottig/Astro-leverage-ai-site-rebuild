# Site-standard integration

The executable source for the shared SEO and schema contract is vendored at
[`packages/site-standard`](../../packages/site-standard/README.md). The supplied visual specification
is preserved as [`site-standard-spec.html`](./site-standard-spec.html).

This repository adopts the package through the pnpm workspace and renders `SeoHead` and
`SchemaGraph` from the shared `BaseLayout`. Route templates provide the page type and any
type-specific metadata; the layout derives canonical URLs and visible/schema breadcrumbs from one
path. Post-build CI guards validate banned drafting phrases, canonical parity, structured-data
presence, and internal route integrity.

The Cloudflare Bulk Redirect CSV is retained in
[`packages/site-standard/redirects/leverageai-host-redirects.csv`](../../packages/site-standard/redirects/leverageai-host-redirects.csv).
Importing or enabling that account-level redirect list is intentionally separate from branch work
because it changes live traffic.
