# Performance and About Image Audit

Status: diagnostic complete; website implementation unchanged  
Date: 2026-08-22  
Scope: Astro resource usage, image delivery, and the About-page founder image

## Executive conclusion

The site is not resource-heavy because of client-side JavaScript, component hydration, or animation. It is resource-heavy because original, multi-megabyte images are copied into the production build and served without Astro image transformation.

The production build is 46,743,479 bytes. PNG and JPEG files account for 45,412,581 bytes, or 97.15% of the output. JavaScript is only 2,278 bytes and CSS is 34,326 bytes. The production build peaked at approximately 572 MB of new Node working set; the development server peaked at approximately 518 MB after rendering the About and Daley Organics routes.

The About image zoom is a separate but related implementation bug. The image is rendered about 507 CSS pixels wide on desktop and 269 CSS pixels wide on mobile, but its HTML `height="2944"` remains a definite 2,944 CSS-pixel height. The local CSS sets `width: 100%`, `aspect-ratio: 4 / 5`, and `object-fit: cover`, but it never overrides the definite height with `height: auto` or `height: 100%`. The aspect-ratio declaration therefore does not size the box. `object-fit: cover` scales the portrait to fill an extremely tall, narrow box and crops most of the photo's width.

The source photo is also a tightly framed selfie. Correcting the CSS will restore the full 3:4 photograph, but Mike's face will remain visually prominent. If a wider environmental portrait is desired, the source asset must also change.

## Codebase index

The queryable project index is outside the deployable project:

`C:\Users\mikes\Documents\.index\codebase_intel_index.json`

The toolkit initially omitted all `.astro` files. The Windows toolkit at `C:\Users\mikes\codebase-intel-toolkit\cli\intel.py` was updated to register `.astro` as an Astro code extension and recognize `.astro` files under `pages/` as frontend routes. The rebuilt index contains:

- 165 indexed files
- all 39 `.astro` files
- 28 Astro routes
- 38,946 total indexed lines
- `src/pages/about.astro` identified as a frontend route

The toolkit created `.codeintelignore` in the project root. The actual JSON index remains outside the project and will not ship with the site.

## Measured evidence

Before-state screenshot: [About image at 1440 x 1000](evidence/about-image-before-desktop.png)

| Measurement | Result |
| --- | ---: |
| Static pages built | 69 |
| Production build time | 5.95 seconds |
| Production output | 46,743,479 bytes |
| PNG output | 42,314,428 bytes |
| JPEG output | 3,098,153 bytes |
| JavaScript output | 2,278 bytes |
| CSS output | 34,326 bytes |
| Image share of build | 97.15% |
| Peak new Node working set during build | ~572 MB |
| Peak new Node working set during dev test | ~518 MB |
| About founder JPEG | 3,098,153 bytes |
| Desktop rendered founder image | ~507 x 2,944 CSS px |
| Mobile rendered founder image | ~269 x 2,944 CSS px |
| Mobile horizontal overflow | none detected |
| `pnpm build` | passed |
| `pnpm check` | passed, 0 errors |

The six Daley Organics source images total 42,314,428 bytes in `dist/_astro/`. The largest individual outputs are between 5.3 MB and 9.1 MB.

## Findings

### P1 — Case-study images bypass Astro optimization

Locations:

- `src/lib/case-study-media.ts:3-8`
- `src/pages/portfolio/[slug].astro:193-203`

`case-study-media.ts` imports six large PNG files as `ImageMetadata`. The portfolio route then discards the image component opportunity and renders the generated source URL through a plain element:

```astro
<img
  src={item.image.src}
  alt={item.alt}
  width={item.image.width}
  height={item.image.height}
  loading="lazy"
/>
```

The import lets Vite fingerprint and copy the file, but the plain `<img>` does not request responsive variants, alternate formats, or size-appropriate output. The original 1,000-2,752 pixel PNGs are copied unchanged.

Impact:

- approximately 42.3 MB of production output
- unnecessarily large route downloads when visitors scroll through the gallery
- more image metadata and file I/O during development and builds
- longer deploy uploads, cache population, and cold retrieval

Conclusion basis: the six source sizes and six `dist/_astro/*.png` sizes are identical, and the generated Daley Organics HTML points directly at one unchanged PNG per item.

### P1 — The About image has a definite-height/object-fit sizing bug

Location: `src/pages/about.astro:34-40` and `src/pages/about.astro:178-190`

Relevant current code:

```astro
<img
  class="about-headshot"
  src="/images/founder/mike-schlottig.jpg"
  width="2208"
  height="2944"
/>
```

```css
.about-headshot {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 28%;
}
```

The global image rule at `src/styles/global.css:41-44` supplies `max-width: 100%` and `display: block`, but not `height: auto`.

Why it zooms:

1. `width: 100%` replaces the width presentation hint.
2. No CSS declaration replaces the `height="2944"` presentation hint.
3. Both width and height are therefore definite, so `aspect-ratio: 4 / 5` does not calculate the height.
4. `object-fit: cover` fills a roughly 507 x 2,944 desktop box or 269 x 2,944 mobile box.
5. Filling that very narrow box requires cropping most of the source image's width.

The mobile layout stacks correctly and does not create horizontal overflow. The failure is the image box geometry, not the `.split` grid.

### P1 — The founder image is an unoptimized 3.1 MB public asset

Locations:

- `public/images/founder/mike-schlottig.jpg`
- `src/pages/about.astro:37-43`
- `src/data/authors.ts:21`
- `src/components/site/AboutAuthor.astro:15-24`

Astro's local Images guide states that files in `public/` are never optimized and do not support responsive image generation. This file is copied unchanged to `dist/images/founder/mike-schlottig.jpg`.

The About page gives the original file `loading="eager"` and `fetchpriority="high"`, making the 3.1 MB request part of the initial route load. The same asset is used lazily by `AboutAuthor.astro`, which is consumed by eight dynamic content templates. Browser caching prevents repeated transfers for the same visitor, but the first author-image request is still 3.1 MB.

### P2 — Responsive image generation is not implemented

The About page uses a plain `<img>` with one `src`. It has no `srcset`, no `sizes`, and no `<picture>` sources. The image lives in `public/`, where Astro explicitly does not provide responsive image support. `astro.config.mjs` also has no `image.responsiveStyles` configuration.

The indexed Astro documentation recommends:

- importing local images from `src/assets`
- rendering them with `<Image />` or `<Picture />`
- using `layout="constrained"` when the image should shrink with its container without scaling beyond its intended width
- allowing the layout to generate `srcset` and `sizes`, or overriding `sizes` for a multi-column layout
- enabling `image.responsiveStyles` or supplying equivalent CSS
- using the `priority` prop only when an image is intentionally above the fold

Relevant indexed documentation:

- `C:\Dev\_docs\docs.astro.build\en\guides\images.md:425`
- `C:\Dev\_docs\docs.astro.build\en\guides\images.md:512`
- `C:\Dev\_docs\docs.astro.build\en\reference\modules\astro-assets.md:256`
- `C:\Dev\_docs\docs.astro.build\en\reference\modules\astro-assets.md:409`
- `C:\Dev\_docs\docs.astro.build\en\reference\modules\astro-assets.md:447`
- `C:\Dev\_docs\docs.astro.build\en\basics\project-structure.md:117`

### P2 — Development memory is substantial but not caused by browser runtime code

The development server reached approximately 480 MB after the About route and approximately 518 MB after the Daley Organics route. The production build reached approximately 572 MB.

This is not evidence of a client-side memory leak:

- no client hydration directives were found
- no requestAnimationFrame or interval loops were found
- global CSS has no animations
- the production site emits only 2.3 KB of JavaScript
- the only explicit client listener found is the contact-form submit handler

The observed cost belongs primarily to Astro/Vite startup, content collection processing, static generation of 69 pages, and the image-heavy module graph. Pre-sizing/compressing the source images and eliminating unchanged multi-megabyte outputs should reduce file I/O and may reduce peak memory, but memory must be remeasured after implementation rather than assumed to fall in direct proportion to output bytes.

### P3 — Secondary resources are not the primary cause

`BaseLayout.astro:69-74` loads two Google Font families with multiple styles and weights. This can affect first render and adds remote font requests, but it does not explain a 46.7 MB build.

The generated About page contains 36 `data-astro-prefetch` markers. `astro.config.mjs` uses `defaultStrategy: "hover"` and `prefetchAll: false`, so these links are not all fetched on initial load. Hover prefetch can add HTML requests during navigation, but it is not the dominant initial payload.

## Correct implementation patterns

### Preserve the full founder portrait

Move the file into `src/assets/founder/`, import it, and use Astro's component:

```astro
---
import { Image } from "astro:assets";
import founderImage from "../assets/founder/mike-schlottig.jpg";
---

<Image
  class="about-headshot"
  src={founderImage}
  alt="Mike Schlottig outside a home in Oregon, founder of Leverage AI"
  layout="constrained"
  widths={[320, 480, 640]}
  sizes="(max-width: 760px) calc(100vw - 4rem), min(42vw, 588px)"
/>
```

```css
.about-headshot {
  display: block;
  width: 100%;
  height: auto;
}
```

This preserves the source's 3:4 aspect ratio and removes the cropping behavior.

### Use a deliberate 4:5 crop

If art direction requires a 4:5 card, the frame—not the HTML height attribute—must define the crop:

```css
.about-headshot-frame {
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.about-headshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
}
```

The current source is already tightly framed, so a different photograph may be needed for a comfortable 4:5 crop.

### Optimize the case-study gallery

Render `item.image` through Astro rather than rendering `item.image.src`:

```astro
---
import { Image } from "astro:assets";
---

<Image
  src={item.image}
  alt={item.alt}
  layout="constrained"
  widths={[320, 640, 960, 1280]}
  sizes={item.featured
    ? "(max-width: 760px) calc(100vw - 3rem), min(1100px, 82vw)"
    : "(max-width: 760px) calc(100vw - 3rem), min(520px, 40vw)"}
  loading="lazy"
/>
```

Enable Astro's low-specificity responsive styles unless equivalent project CSS is deliberately maintained:

```js
export default defineConfig({
  image: {
    responsiveStyles: true,
  },
});
```

## Step-by-step implementation task list

1. Record current baselines: 46,743,479-byte build, 45,412,581 image bytes, ~572 MB build peak, ~518 MB dev peak, and the desktop/mobile computed image geometry above.
2. Move `mike-schlottig.jpg` from `public/images/founder/` to `src/assets/founder/`. Update `src/data/authors.ts` so the author model can carry `ImageMetadata` instead of only a string path.
3. Update `AboutAuthor.astro` and `about.astro` to import and render Astro's `<Image />` component.
4. Choose the founder-image art direction explicitly:
   - preserve the full 3:4 photo with `height: auto`; or
   - crop to 4:5 with a frame-owned aspect ratio and `height: 100%` on the image.
5. Remove the conflicting combination of a definite HTML height, `width: 100%`, and `object-fit: cover` from the About page.
6. Add `layout="constrained"` and route-appropriate `sizes`. Enable `image.responsiveStyles: true` or add equivalent `height: auto`/width rules deliberately.
7. Measure whether the founder image is the desktop LCP element. Keep Astro's `priority` prop only if measurement justifies it; otherwise use the default lazy behavior, especially because the image is below the first content card on mobile.
8. Replace the case-study gallery's plain `<img src={item.image.src}>` with `<Image src={item.image}>` and responsive widths/sizes.
9. Pre-size source gallery files to the maximum display requirement before committing them. The current 2,000+ pixel, 5-9 MB PNGs are larger than most rendered gallery slots require. Keep archival originals outside the deployable source tree if they must be preserved.
10. Run `pnpm check`, `pnpm build`, and `pnpm guard:site-standard`.
11. Inspect `dist/` by extension and verify that the gallery no longer consists of unchanged 5-9 MB PNG files.
12. Test `/about/` at 1440x1000 and 390x844. Confirm that the computed image height follows the intended ratio instead of remaining 2,944 CSS pixels.
13. Test `/portfolio/daley-organics/` with network recording. Confirm that below-fold images remain lazy and that the browser selects viewport-appropriate variants.
14. Remeasure build and dev working set using the same sampling method. Record the result even if memory does not fall significantly.
15. Re-run the scoped audit and update this document with before/after measurements.

## Expected results and retry logic

Expected after the first implementation:

- the About image box should be approximately 3:4 or 4:5, not an extremely narrow 2,944-pixel-tall box
- the full face and intended background composition should be visible
- mobile and desktop should receive different responsive candidates
- the About page should no longer transfer the original 3.1 MB JPEG
- gallery routes should not transfer full-size PNGs for small display slots
- build/deploy image weight and/or browser transfer weight should fall materially

If the image still looks zoomed after the geometry is correct, the remaining cause is the source photograph's tight composition. Replace it with a wider portrait rather than applying more `object-position` adjustments.

If computed height remains 2,944 pixels, inspect the generated CSS for a later `height` rule or stale build output. The fix has not won the cascade.

If the generated HTML still has a single original `src` and no `srcset`, confirm that the component receives imported `ImageMetadata`, not a `/public/...` string and not `item.image.src`.

If browser payload improves but `dist/` grows because multiple responsive variants are generated, evaluate success by route transfer size and cache behavior, then reduce widths/formats to the actual layout requirements. Responsive output size and per-visitor payload are related but not identical metrics.

If build memory remains near 500-600 MB after image delivery is fixed, profile content collection generation separately. That result would show that Astro/Vite and the 69-page content graph, rather than image transformation, dominate peak working set.

## Scoped Impeccable audit score

| Dimension | Score | Key finding |
| --- | ---: | --- |
| Accessibility | 3/4 | Image alt text and document structure are present; no full contrast audit was performed. |
| Performance | 1/4 | Images represent 97.15% of output and bypass responsive transformation. |
| Responsive design | 1/4 | Grid stacks correctly, but the About image keeps a 2,944 CSS-pixel height on every viewport. |
| Theming | 3/4 | Established tokens are used consistently; this audit did not test theme switching. |
| Anti-patterns | 2/4 | Repeated eyebrow labels and surface-card framing are visible, but they are secondary to the technical failures. |
| **Total** | **10/20** | **Acceptable, with significant performance and responsive work required.** |

Positive findings to preserve:

- static output
- minimal JavaScript
- no hydration-heavy UI framework
- no animation loops or global motion cost
- reduced-motion override exists
- descriptive image alt text
- responsive grid does not create mobile horizontal overflow
- build and type diagnostics pass

Recommended Impeccable sequence:

1. **P1 `$impeccable adapt`**: correct About image geometry and responsive candidate selection.
2. **P1 `$impeccable optimize`**: move image delivery through Astro and reduce gallery/founder payloads.
3. **P2 `$impeccable harden`**: add repeatable image-output and responsive-browser verification.
4. **P3 `$impeccable polish`**: verify final art direction and remove any remaining visual awkwardness.

## Implementation outcome — 2026-08-22

The image and load-path remediation is complete. The implementation follows the canonical rules in `C:\Users\mikes\.codex\codex_memory\astro_dev_patterns\ASTRO_RULES\` and the project pointer in `ASTRO RULES/README.md`.

### Changes made

1. Installed `sharp` as an explicit production dependency. Astro 6.4.8 could type-check the `<Image>` code without it, but the production build could not generate any transformed image until Sharp was installed.
2. Moved the founder photo out of `public/` and changed `AuthorProfile.image` from a string URL to imported `ImageMetadata`.
3. Replaced the About, press, author-card, and case-study gallery plain `<img>` implementations with `Image` from `astro:assets`.
4. Added constrained responsive widths, viewport-specific `sizes`, WebP output, quality settings, and explicit load priority.
5. Enabled `image.responsiveStyles: true` and added the project fallback `img { max-width: 100%; height: auto; }`.
6. Removed the About portrait's `aspect-ratio: 4 / 5`, `object-fit: cover`, and `object-position` crop. The displayed image now preserves the source's 3:4 ratio.
7. Converted the seven deployable raster sources to bounded WebP files. The founder source is 1200×1600; gallery sources are no wider than 1920 pixels.
8. Restored the seven untouched original JPEG/PNG masters to `.ignore/source-images/`. `.ignore/` is explicitly excluded by both `.gitignore` and `.codeintelignore`; the archive is not imported and does not appear in `dist/`.
9. Applied Astro `priority` to the above-the-fold founder hero/feature images on About and press routes. Below-fold author blocks, all gallery images, and both case-study iframes remain `loading="lazy"` with asynchronous image decode.
10. Replaced the runtime Google Fonts stylesheet and its two preconnects with self-hosted Fontsource assets. Production pages no longer depend on `fonts.googleapis.com` or `fonts.gstatic.com`.
11. Added reusable and project-specific `ASTRO RULES` documentation.

### Before and after

| Measurement | Before | Final | Change |
| --- | ---: | ---: | ---: |
| Total `dist/` bytes | 46,743,479 | 9,485,647 | -37,257,832 bytes (-79.7%) |
| Raster image bytes in `dist/` | 45,412,581 | 7,782,288 | -37,630,293 bytes (-82.9%) |
| Legacy JPEG/PNG bytes in `dist/` | 45,412,581 | 0 | eliminated |
| Delivery source bytes in `src/assets/` | 45,412,581 | 2,625,596 | -94.2% |
| Archived original bytes | not separated | 45,412,581 in `.ignore/` | excluded from build and Git |
| Production JavaScript | 2,278 bytes | 2,278 bytes | unchanged and minimal |
| Local font output | runtime Google Fonts request | 178,712 bytes available locally | external font origins eliminated |
| Warm production-build peak Node working set | ~572 MB baseline sample | 555.6 MB | slightly lower |
| First uncached image-processing build peak | not applicable | 738.7 MB | one-time/cold transform cost |

The aggregate `dist/` image total includes all responsive candidates for every route. A visitor downloads only the candidate selected by `srcset` and `sizes`, not all 7.78 MB.

### About image verification

At 1440×1000, browser inspection measured the portrait at 507.22×676.02 CSS pixels inside a 538×706.8 frame. It selected the 640-pixel WebP candidate, reported `loading="eager"`, `fetchpriority="high"`, and preserved the 3:4 intrinsic ratio.

At 390×844, browser inspection measured the portrait at 268.63×358.16 CSS pixels with no horizontal overflow. The final mobile `sizes` expression was tightened to the measured card geometry so a 1× display can select the 320-pixel candidate instead of an unnecessary 480-pixel candidate.

Visual evidence:

- [Before desktop](evidence/about-image-before-desktop.png)
- [After desktop](evidence/about-image-after-desktop.png)
- [After mobile](evidence/about-image-after-mobile.png)

### Failure and retry record

The first implementation attempt used Astro `<Image>` correctly but failed the production build with `MissingSharp`. This proved that the previous assumption—"Astro automatically optimizes images"—was incomplete: optimization requires transformable imported sources, the image component or helper, and an available image service. Installing `sharp` resolved the build failure.

The second attempt generated 43 responsive WebP derivatives but still emitted the 42.3 MB PNG masters and 3.1 MB JPEG master. `dist/` grew to 56,056,400 bytes and the cold build peaked near 852 MB. That did not meet the desired outcome. The source masters were therefore bounded and re-encoded for the delivery graph, while untouched originals were archived under `.ignore/`. The next build fell to 9.2 MB before local fonts, generated 37 image derivatives, and completed successfully.

The loading policy was also corrected during verification. Blanket lazy loading would have delayed desktop hero/LCP media. The final rule is priority for measured or semantic above-the-fold hero media and lazy loading for below-fold repeated content and embeds.

### Final code behavior

- `about.astro`: responsive priority WebP, full intrinsic composition, no crop-induced zoom.
- `press/index.astro` and `press/oregon-voyager-interview.astro`: responsive priority founder image; no obsolete `/public` JPEG reference.
- `AboutAuthor.astro`: responsive lazy image reused across long-form templates.
- `portfolio/[slug].astro`: lazy WebP gallery candidates with featured/non-featured `sizes`.
- `astro.config.mjs`: Astro responsive image styles enabled.
- `BaseLayout.astro`: self-hosted, bundled fonts and no Google Fonts connection.
- `site.ts`: schema/OG URLs follow imported image metadata rather than a deleted public path.

### Final verification status

- `pnpm check`: 64 files, 0 errors, 0 warnings; 127 existing deprecation hints remain in `content.config.ts`.
- `pnpm build`: 69 pages built successfully.
- `SITE_URL=https://leverageai.network pnpm guard:site-standard`: banned phrases, canonicals, JSON-LD, and internal links all passed across 69 pages. The canonical guard requires `SITE_URL`; running it without that environment variable fails by design.
- Built About and press hero images: eager, high priority, synchronous decode, responsive `srcset` and `sizes`.
- Built author-card and gallery images: lazy, asynchronous decode, responsive `srcset` and `sizes`.
- Built case-study iframes: lazy.
- Google Fonts runtime references: none.
- Legacy JPEG/PNG files in `dist/`: none.
- About desktop and mobile geometry: correct 3:4 ratio with no overflow.

### Updated scoped Impeccable score

| Dimension | Before | After | Evidence |
| --- | ---: | ---: | --- |
| Accessibility | 3/4 | 3/4 | Alt text and intrinsic dimensions preserved; full contrast audit remains outside this remediation. |
| Performance | 1/4 | 4/4 | Images transformed, payload reduced 82.9%, load priority scoped, remote font dependency removed. |
| Responsive design | 1/4 | 4/4 | Correct geometry, measured mobile/desktop widths, responsive candidates, no horizontal overflow. |
| Theming | 3/4 | 3/4 | Existing visual tokens and brand fonts preserved. |
| Anti-patterns | 2/4 | 3/4 | Public raster bypass and crop bug removed; broader content/card repetition was not redesigned. |
| **Total** | **10/20** | **17/20** | **Requested performance and About-image issues resolved.** |
