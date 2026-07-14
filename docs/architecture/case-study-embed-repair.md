# Case Study Embed Repair

Date: 2026-06-30

## Reported behavior

The live-site thumbnails on `/portfolio` were difficult to read, and the embedded previews on both case-study detail pages appeared cut in half horizontally.

Affected routes:

- `/portfolio`
- `/portfolio/daley-organics`
- `/portfolio/oregon-smb-directory`

## Root cause

The detail-page iframe used `height: 100%` inside a parent that only declared `min-height: 24rem`.

A percentage height needs a definite parent height to resolve reliably. A minimum height does not provide that definite sizing context. The iframe could therefore fall back to its intrinsic height while the parent remained taller, making the remote page look clipped across the middle.

The portfolio-card caption was placed directly over a changing live webpage. Its light text depended on a broad gradient overlay, so contrast varied with whatever happened to be visible inside the remote page.

## Fix

- Give `.case-study-embed__frame` a definite responsive height with `clamp()`.
- Keep the iframe at `height: 100%` now that its parent has a resolvable height.
- Set embedded iframes to `display: block` to remove inline baseline space.
- Give portfolio-card iframes an explicit `18rem` height matching the preview container.
- Place preview captions on a high-opacity dark backing with white medium-weight text.

## Verification

Verify the three affected routes at desktop and mobile widths after the production build. The iframe viewport should fill its bordered frame with no blank lower half, and caption text should remain legible over both light and dark remote-page content.
