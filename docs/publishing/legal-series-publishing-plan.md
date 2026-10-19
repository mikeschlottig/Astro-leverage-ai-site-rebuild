# Legal series: publishing plan

Eight posts, one every two days, from 2026-10-18 to 2026-11-01. Written 2026-10-18. Drafts live in `src/content/blog/`;
the sources are `docs/research/`.

## How publishing works

A post is **published when the build date reaches its `publishedAt` date**. Posts dated later are not built: no page, no sitemap
entry, no link, no feed of any kind (`src/lib/blog.ts`). Nothing needs flipping on the day.

Consequences you need to plan around:

1. **This is a static site, so a post goes live at the first deploy on or after its date.** Deploying once with all eight dates
   does not publish them over time. Each publish day needs a release (see the runbook), or an automated scheduled release (see Option B).
2. **`publishedAt` is a date, read as 00:00 UTC.** A post dated 2026-10-20 becomes eligible at 5:00 pm Pacific on 2026-10-19. A
   release in the morning of the date (Pacific) is the intended moment; a release the evening before publishes it a few hours early.
   The byline and the JSON-LD `datePublished` show the UTC date.
3. **Links only point backwards.** A published post may link only to posts with an earlier or equal date. Forward references are
   plain text, and later posts appear automatically under **Keep reading** through `relatedPosts` in frontmatter once they exist.
   `pnpm guard:links` fails the build if a link points at an unbuilt post, and a `relatedPosts` id that is not a post at all fails the build.
4. **Preview and gate the whole series early:** `PUBLISH_AS_OF=2026-11-02 pnpm verify` builds as if it were that day, so every gate
   (including structured data) runs on all eight posts before any of them is live. Last run 2026-10-18: green, 84 pages.

## Calendar

| # | date (UTC) | day | post | URL after publish |
|---|---|---|---|---|
| 1 | 2026-10-18 | Sun | Your Law Firm Is Losing 60% of Its Leads at Intake | `/blog/law-firm-lead-intake-leak/` |
| 2 | 2026-10-20 | Tue | AI Overviews Hit 77% of Legal Searches. Is Your Firm Cited? | `/blog/ai-overviews-legal-search-geo-visibility/` |
| 3 | 2026-10-22 | Thu | GEO for Law Firms: The Playbook to Get Recommended by ChatGPT | `/blog/geo-for-law-firms-playbook/` |
| 4 | 2026-10-24 | Sat | The $150 Click: What Paid Search Really Costs Small Law Firms | `/blog/law-firm-seo-vs-paid-search-costs/` |
| 5 | 2026-10-26 | Mon | FindLaw After the Buyout: Who Owns Your Law Firm's Website? | `/blog/findlaw-website-ownership-law-firms/` |
| 6 | 2026-10-28 | Wed | Legal Directories: Dead for Clients, Alive for AI Search | `/blog/legal-directories-ai-search-citations/` |
| 7 | 2026-10-30 | Fri | AI Marketing Compliance for Law Firms: Model Rule 7.1 in Practice | `/blog/ai-marketing-compliance-law-firms/` |
| 8 | 2026-11-01 | Sun | How Much Should a Law Firm Spend on Marketing in 2026? | `/blog/law-firm-marketing-budget-benchmarks/` |

Order is the research series order (briefs 1, 3, 4, 2, 5, 8, 6, 7). Each post links only backwards.
**Weekends:** posts 1, 4 and 8 land on a Sunday, Saturday and Sunday. The audience is managing partners; if weekday reach
matters, move 4 and 8 by changing `publishedAt` (one line each), keeping the order. The links guard will say if a move breaks a link.

## Before a post goes live (once per post, the day before)

| # | read for | why |
|---|---|---|
| 1 | the intake service-level wording; every figure against `docs/research/` | the five-minute pipeline is owner-attested; this site's own form does not yet confirm to the submitter |
| 2 | no Oregon-specific claim | the figures are U.S. legal search |
| 3 | the FAQPage JSON-LD example is valid schema.org | it is shown as code in the article |
| 4 | the 526% ROI caveat survives editing | it applies to firms spending $120,000 to $150,000 a year |
| 5 | **a lawyer's read** of statements about Internet Brands, KKR and FindLaw | reported facts and market commentary about named companies; keep the attribution |
| 6 | the "forecast, not measurement" labels | 2028 to 2031 figures are inferences |
| 7 | **a lawyer's read**; check current text of Florida 24-1, Rule 2.515, California SB 574 and *Heppner* | the most legally sensitive post; it is general information, not legal advice |
| 8 | the Tier 3 retainer line ("starting around $15,000") | the source cell is garbled; confirm or soften |

All eight are first drafts, shorter than the original briefs. Nothing in this plan assumes they are final.

## Runbook: every publish day

1. `git pull`; `SITE_URL=https://leverageai.network pnpm verify`. Confirm the new post is in `dist/blog/` and in `dist/sitemap-0.xml`, and that none of the later posts are.
2. Release with the `workers-staged-release` skill (`/mnt/c/Dev/_skills/store/workers-staged-release/SKILL.md`): note the rollback
   version, `wrangler versions upload`, stage at 0%, gate on the real hostname, promote, read the logs. Not `wrangler deploy`.
3. Gate the live URL: HTTP 200; one `Article` JSON-LD block with `author.name`, `author.sameAs` and the right `datePublished`; the byline
   shows the date; the blog index lists the post newest first; the sitemap lists it.
4. Search Console: URL Inspection, request indexing for the new URL (manual; there is a daily quota).
5. Distribute (below), then add one line to `WORKLOG.md`.
6. Every second publish day, run the Google Rich Results Test on the new post and note the result.

## Distribution

| channel | notes |
|---|---|
| LinkedIn | the primary channel; the content briefs note 40% of lawyers market there. Post 2's 12% to 77% trend is the best single graphic |
| Facebook | attorney and legal-marketing groups, post 5 especially (website ownership). Read each group's self-promotion rules first |
| Newsletter | post 8's tier table suits a newsletter; no list exists yet |
| X | **none.** The account was compromised and banned; a new account is outside this plan |

## Option A (default) and Option B

- **Option A, manual:** the runbook above, seven more times. Simplest, nothing new to build, and each release is gated by a person.
- **Option B, scheduled:** a daily workflow that runs `pnpm verify` and the staged release at about 15:00 UTC, so posts publish with no
  hands. It needs a Cloudflare API token as a CI secret and a decision about unattended production releases. **Not built.** Recommended
  only after Option A has run cleanly twice; say if you want it.

## Rollback

To pull a post: set its `publishedAt` to a later date, `pnpm verify`, and release. The page stops existing (404) and leaves the sitemap.
Remove it from other posts' `relatedPosts` only if you want it gone from their lists; an unpublished id is simply skipped.

## Decisions for Mike

1. Move posts 4 and 8 off the weekend?
2. Who does the lawyer's read of posts 5 and 7, and by when (post 5 is 2026-10-26)?
3. Option A or Option B?
4. First release: merging `dev/offer-repositioning` and releasing publishes post 1 immediately (its date is 2026-10-18).
5. `Person.sameAs` includes the Leverage AI LLC Facebook page, which identifies the company, not you. It is correct under `Organization.sameAs`; keep, or move to the organization only?
