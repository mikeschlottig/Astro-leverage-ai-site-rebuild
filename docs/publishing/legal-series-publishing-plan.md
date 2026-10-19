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

## Runbook: every publish day (manual fallback)

1. (Manual fallback; the scheduled workflow does steps 1 to 3 itself.) `git pull`; `SITE_URL=https://leverageai.network pnpm verify`. Confirm the new post is in `dist/blog/` and in `dist/sitemap-0.xml`, and that none of the later posts are.
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

## Automatic release (chosen by Mike, 2026-10-19)

`.github/workflows/scheduled-release.yml` runs every day at **15:00 UTC (8:00 am Pacific)** and on demand
(Actions, "scheduled-release", optional `force`). It checks out `main`, runs `pnpm verify`, then compares the built sitemap with the live one
(`scripts/release-gates.mjs changed`). If a post has become eligible (or one was pulled) it releases through the staged path from the
`workers-staged-release` skill: note the rollback version, `wrangler versions upload`, stage at 0%, gate on the real hostname through the
version-override header, promote, gate production, and **roll back automatically on any failed gate**. If nothing changed it stops after the compare.
A failed run emails the repo owner through GitHub's normal Actions notifications.

- **`main` is the release candidate.** Whatever is on `main` at 15:00 UTC is released the first morning a post becomes eligible. Keep unfinished work off `main`.
- **Gates:** the known answer (`GET /api/contact` is 405); proof the override reaches the new build, by contrast (each added page is 404 in production and 200 staged, each retired page the reverse); then every URL in the build's own sitemap answers 200, staged and again in production. A staged run with no page-set change cannot prove the override and says so; that only happens on a forced run.
- **Credential:** a dedicated token `astro-site-release-20261019b` (Workers Scripts Write and Account Settings Read, nothing else; **expires 2027-10-19**) held in keyring project `astro-site-release` and in the GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Verified: it lists deployments, and R2 is refused (code 10000). Rotate before it expires.
- **Not automated:** Search Console "request indexing", distribution (LinkedIn, Facebook), and the Rich Results Test remain manual.
- **Manual fallback:** the runbook above still works if the workflow is disabled.

## Rollback

To pull a post: set its `publishedAt` to a later date, `pnpm verify`, and release. The page stops existing (404) and leaves the sitemap.
Remove it from other posts' `relatedPosts` only if you want it gone from their lists; an unpublished id is simply skipped.

## Decisions (Mike, 2026-10-19)

1. Weekend posts (4 and 8) stay as dated.
2. Automatic release, built (above).
3. `Person.sameAs` keeps the Leverage AI LLC Facebook page: Mike is the company.
4. Merged and released: `main` at `f1c8573`, Worker version `8697aa1f`, live 2026-10-19 05:38 UTC. Post 1 is live; posts 2 to 8 publish on their dates.

**Still open:** who does the lawyer's read of posts 5 and 7, and by when. Post 5 publishes 2026-10-26 and nothing in the workflow waits for that read.
