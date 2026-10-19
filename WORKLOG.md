# Worklog — astro-leverage-ai-site-rebuild

**Newest first. Append; never edit an older entry.** `AGENTS.md` says how to operate this project. This says what
state the work is in and what happens next, which a fresh agent cannot derive from the tree.

## 2026-10-19 — blog dates, byline, X removed, publishing plan

**What:** The eight legal posts are dated two days apart (2026-10-18 to 2026-11-01) and only posts whose date has arrived are built
(`src/lib/blog.ts`; `PUBLISH_AS_OF=YYYY-MM-DD` builds as of another day). Seven forward links became plain text; later posts appear under
"Keep reading" through `relatedPosts`. Added `ArticleByline.astro` (written by, role, place, date, reading time). Blog index sorted newest
first with dates. Removed the X account from `site.ts` and `authors.ts`; it is gone from every built file and from `Organization.sameAs`,
`Person.sameAs` and `Article.author.sameAs`. Wrote `docs/publishing/legal-series-publishing-plan.md`.
**Evidence:** `pnpm verify` green twice: as of today (77 pages, one legal post live) and `PUBLISH_AS_OF=2026-11-02` (84 pages, all eight,
structured data valid on 82). Across 11 blog pages: `author` has `name` and four `sameAs` URLs, matches the `Person` node, and
`datePublished` equals the byline date. The owner email from the 21:44 PDT contact-form test arrived (Mike); whether the submitter also
received one is unconfirmed.
**Next:** merge and release (staged) to publish post 1; then one release per publish day (plan runbook). Pending decisions are at the end of the plan.

## 2026-10-18 — structured-data gate, sitemap fix, docs brought current

**What:** Added `scripts/validate-structured-data.mjs` (official schema.org 30.1 vocabulary plus Google Rich Results rules via
`@adobe/structured-data-validator`) and wired it into `pnpm guard:site-standard`. It failed 39 pages on `Article.author`
having no inline `name` and 1 page on a one-item `BreadcrumbList`; fixed in `packages/site-standard`. `Article.headline` no
longer carries the site suffix; `author` gained `sameAs`; `ProfessionalService` gained `image`. The sitemap no longer lists
`/contact/thanks/` (a `noindex` page). `AGENTS.md`, `README.md` and `CLAUDE.md` brought to the `projectstd` standard
(`projectstd check` passes); this worklog created.
**Evidence:** `pnpm verify` exit 0 with 84 pages built; structured data valid on 82 indexable pages; validator.schema.org 0 errors
and 0 warnings on 8 pages (one per type) with a negative control that returned 3 errors; 82 sitemap URLs, none `noindex`.
**Why it is not finished:** the Adobe validator has no Google rules for `Article`, `FAQPage`, `LocalBusiness`, `WebSite` or `Service`
(measured with a negative control), so those were checked by hand against Google's docs (see
`docs/architecture/structured-data-validation.md`). Google removed the FAQ rich result in May 2026, so FAQPage earns no rich
result. The Google Rich Results Test cannot be automated and has not been run.
**Next:** after deploy, run the Rich Results Test on `/`, a service hub and a blog post and record it here; check the
`workers.dev` `X-Robots-Tag` on the live host.

## 2026-10-18 — offer repositioning on `dev/offer-repositioning`

**What:** Five commits over base `5911377`. P1 meta and `workers.dev` noindex (`63937a7`); P2 AI Search Optimization and Lead
Capture promoted to hubs, Internet Marketing hub archived to `/home/mikes/_archive/internet-marketing-services.md.20261018-213400`,
12 one-hop redirects (`c95d042`); P3 published audit price and three retainer tiers, P7 software renamed Automation and AI Systems
and social made an add-on (`d227731`); P4-P6 law-firms page, intake service-level section, results strip, eight legal blog drafts
(`14171eb`). Plan and status: `docs/architecture/offer-repositioning-plan.html`.
**Why:** Mike's recommendations, checked against the code. Several rested on wrong premises (pricing already existed; a rename would
have collided with an existing page); each is recorded in `hypothesis.md`.
**Next:** see `tasks.md`. Open: real-estate page (needs research first), contract and ownership terms (own session), a compliance
read of the eight legal posts, bringing this site's contact worker to parity with the described confirmation pipeline (it saves to
D1 and emails the owner only), push and deploy. Note: `14171eb` swept in a stray `docs/gp-daley-rar-biz-frame.png` that someone then
moved to `docs/image-assets/`; the move is uncommitted and was left alone.
