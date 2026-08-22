# Social Metadata and OregonVoyager Link Repair

Status: implemented, deployed, and production verified  
Date: 2026-08-22  
Classification: project-specific evidence  
Canonical rules: `C:\Users\mikes\.codex\codex_memory\astro_dev_patterns\ASTRO_RULES\social-metadata-and-favicons.md`

## Executive conclusion

The visible footer link labeled `OregonVoyager Interview` did not link to OregonVoyager. It linked to `/press/oregon-voyager-interview/`, an internal Leverage AI overview page. The internal page itself already contained working links to the publication, but the footer label created a false destination expectation.

The favicon was absent because the shared layout contained no favicon or manifest links. Open Graph tags existed, but the default `og:image` pointed at a 1200×1600 founder portrait while the metadata claimed it was 1200×630. That mismatch made the social preview incomplete and unreliable.

## Root cause

### Publication link

- Defect location: `src/components/site/SiteFooter.astro`
- Before: `href="/press/oregon-voyager-interview/"`
- Production proof: the rendered footer anchor had the internal `href`, no `target`, and no `rel`.
- Why it happened: the internal press page was treated as the destination even though the visible label named the external publication.

The same ambiguity existed in the press index and About-page calls to action. The canonical URL was also duplicated inside one page instead of being shared.

### Favicon

- Defect location: `src/layouts/BaseLayout.astro`
- Before: no `rel="icon"`, Apple touch icon, shortcut icon, manifest, or `theme-color` declarations.
- Existing brand source: `public/images/leverage-ai-mark.svg`.

### Open Graph images

- Defect location: `src/lib/site.ts`
- Before: `defaultOgImageUrl` used the founder portrait's generated Astro asset URL.
- Metadata component: `packages/site-standard/src/components/SeoHead.astro` always declared 1200×630, regardless of the portrait's actual 1200×1600 geometry.
- Missing detail: image-alt tags were not emitted for Open Graph or Twitter.

## Implemented solution

1. Added `src/lib/external-links.ts` as the single source of truth for the canonical OregonVoyager URL.
2. Changed the footer link, About-page interview calls to action, and press-index primary call to action to open the actual OregonVoyager article with `rel="external noopener noreferrer"`.
3. Kept `/press/oregon-voyager-interview/` as an internal supporting page. On the press index, its heading remains an explicitly internal navigation path while the button goes to the publication.
4. Added a complete favicon set generated from the existing Leverage AI mark:
   - `public/favicon.svg`
   - `public/favicon-32x32.png`
   - `public/favicon.ico`
   - `public/apple-touch-icon.png`
   - `public/site.webmanifest`
5. Wired those assets through the shared `BaseLayout` head so all 69 routes inherit them.
6. Added two true 1200×630 social cards:
   - `public/images/og/leverage-ai-default.jpg` (64,119 bytes)
   - `public/images/og/oregon-voyager-interview.jpg` (92,626 bytes)
7. Set the brand card as the global default and the interview card as the press-page override.
8. Added `og:image:alt` and `twitter:image:alt` to the shared SEO component.
9. Added `pnpm assets:brand` for deterministic regeneration.

## Why a rebuild is required

This site uses Astro static output. The footer link and `<head>` metadata are compiled into HTML files, so publishing either change requires a build. The relevant distinction is cost: the verified build generated 69 pages in 6.06 seconds and reused all 37 cached Astro image transformations. A static rebuild is therefore expected; a full image reprocessing or full asset upload is not.

Avoiding builds for one link would require moving content into runtime storage or a CMS and fetching it dynamically. That adds latency and operational complexity to solve a six-second static compilation problem, so it would work against the lightweight-site goal.

## Verification evidence

- `astro check`: 0 errors, 0 warnings, 127 pre-existing deprecation hints.
- `astro build`: 69 pages, 6.06 seconds, 37/37 optimized images reused from cache.
- Canonical, schema, banned-phrase, and internal-link guards: passed with `SITE_URL=https://leverageai.network`.
- Local production preview footer: exact external OregonVoyager URL, `_blank`, and `external noopener noreferrer`.
- Default route: favicon links and manifest present; default OG/Twitter image resolves to `/images/og/leverage-ai-default.jpg` with 1200×630 metadata.
- Interview route: OG/Twitter image resolves to `/images/og/oregon-voyager-interview.jpg`; both image-alt tags match the page title.
- External destination: loaded successfully with title `Meet Jon Schlottig of LEVERAGE AI LLC – Oregon Voyager Magazine`.
- Cloudflare deployment: Worker version `4a4ec5de-682b-4b6e-b49d-17c79630edf1`.
- Production footer: canonical OregonVoyager URL, `_blank`, and `external noopener noreferrer` confirmed at `https://leverageai.network/portfolio/`.
- Production press route: interview-specific OG card and canonical external call to action confirmed.
- Production favicon, manifest, and both OG image URLs: HTTP 200 with the expected content types.

## Expected production result

After deployment, the footer and relevant interview calls to action will open the original OregonVoyager article. Browser tabs will use the Leverage AI monogram. Social crawlers will receive a correctly sized default card across the site and an interview-specific card for the press routes. Platforms may retain an older preview in their cache until they recrawl the URL.
