---
title: "Who Sets Your Ceiling? Structural Dependence Disguised as Safety"
description: "Why a website built on a proprietary builder carries more risk than it appears to, what Webflow's own pricing and export rules show, and what owning your site actually means."
heroTitle: "Who Sets Your Ceiling?"
publishedAt: 2026-10-10
updatedAt: 2026-10-10
tldr:
  - A site built inside a proprietary builder is a set of tenant improvements. Webflow's own export leaves the CMS, forms, search and user accounts behind.
  - The terms change on the platform's calendar. In May 2026 Webflow halved included bandwidth for Business sites and cut their app allowance from 10 million to 2 million requests a month.
  - Webflow now runs Astro and Next.js apps on Cloudflare's edge, the same stack we build on. The real question is whether you rent that architecture or own it.
  - A website that ranks, converts and gets cited by AI is an appreciating asset. Owning it outright is what keeps that value yours.
  - Measured on October 10, 2026, the median homepage from Webflow's featured Certified Partners shipped 19 times the JavaScript of our median build and took three times as long to paint its main content.
research:
  type: original
  scope: Homepages of the eleven agencies featured on webflow.com/certified-partners on October 10, 2026, plus one additional certified Webflow partner studio, compared with every public marketing site Leverage AI serves on a custom domain.
  collectionPeriod: Measured October 10, 2026.
  methodology: Each homepage was fetched once to confirm its platform from Webflow's own markers (the data-wf-site attribute or website-files.com assets), then tested three times with Google Lighthouse 12.8.2 on its default mobile profile, one run at a time from a single location. Each site's figure is the median of its runs, and each group's figure is the median of its sites, so every site counts once. The pricing and platform facts in this report come from Webflow's help center and developer documentation, Cloudflare's documentation, and third-party purchase data, cited in the footnotes.
  limitations: "Lab data from one location, not field data from real visitors. Homepages differ in content and ambition, so platform is not the only variable; part of each Webflow page's weight comes from the designer's own choices. Two of the eleven featured agencies showed no Webflow markers on their own homepages and are excluded from the Webflow group. One of our sites completed two runs instead of three. Our group includes every public site we serve, including our slowest."
  sourceCount: 7
  downloadUrl: /data/webflow-partners-vs-leverage-benchmark-2026-10-10.csv
  downloadLabel: Download the anonymized benchmark data
  revisionNotes:
    - October 10, 2026 — Initial publication with the 18-site benchmark.
relatedServices:
  - custom-web-design
  - search-data-architecture
  - local-visibility
relatedReports:
  - why-speed-wins
---

Most website decisions start with the wrong question: "Who has the best portfolio?" The question that decides the next five years is a different one: **when the platform under my website changes, who decides what happens next?**

On a proprietary builder (Webflow, Wix, Squarespace and their enterprise tiers) the platform does. That is no knock on the designers who build there. Many are excellent. It is the structure of the arrangement, and it carries far more risk than it appears to.

## You are making tenant improvements

When a business builds out leased space, most of that build-out stays with the building when the lease ends. A builder site works the same way.

Webflow's own help center lists what stays behind when you export your site's code: CMS collections and their content, ecommerce, user accounts, form processing, site search, and every language but your first.[^export] Your content leaves as spreadsheets. The working system does not leave at all.

## The lease gets rewritten on someone else's calendar

In May 2026, Webflow folded its CMS and Business plans into a single Premium plan.[^pricing] For sites on the old Business plan:

| What changed | Before | After |
| --- | --- | --- |
| Included bandwidth | 100 GB | 50 GB |
| Webflow Cloud app requests | 10 million / month | 2 million / month |
| Webflow's own example, same 150 GB of traffic | $59 / month | $65 / month |

Some changes helped customers. CMS item limits went up tenfold. That is exactly the point: you did not decide either one. At the top of the market the stakes are larger. The median Webflow Enterprise contract runs about $47,000 a year.[^vendr]

## Training wheels

Visual builders were the web's training wheels. They let people without engineering depth ride without falling, and at five years old that is an asset. At eight, it is what holds you back.

A studio whose entire business is one platform cannot take the training wheels off for you. The training wheels are the business.

## The platform leader agrees with us

Webflow now offers Webflow Cloud: Astro and Next.js applications running on Cloudflare's edge network, with a SQLite database underneath.[^cloud] That is, nearly line for line, the stack we build on.

Look at how it is wired, though. The Astro app runs beside the Webflow site, not inside the visual editor. The Designer can place only React components, and only adjust their settings.[^components] The serious work lives in code, at the edge, on a real database. The only question left is whether you rent that architecture through someone else's layer and plan limits, or own it directly.

## Measured, not claimed

We tested the homepages of the agencies Webflow itself features as Certified Partners against every public site we build and serve. On a simulated phone, the median Webflow partner homepage shipped 1.1 MB of JavaScript and took 13.4 seconds to paint its main content. Our median build shipped 58 KB and painted in 4.5 seconds.[^bench1]

These are the people Webflow puts forward as its best. The [full benchmark](#benchmark-webflow-certified-partners-vs-our-builds) is below, including the one measure where Webflow came out ahead.

## What owning it means

1. Your code lives in a repository in your name.[^contract]
2. Your data lives in standard formats: SQLite or Postgres that exports to a single `.sql` file, and files in S3-compatible storage.
3. Your logic is written to web standards, so it runs on more than one host.
4. It is served from Cloudflare's edge, within 50 ms of 95% of the world's internet users.[^edge]

If your developer disappears, any competent JavaScript developer can pick up where they left off. If your platform rewrites its terms, nobody can rewrite them back.

## An appreciating asset, that you control

A raw domain is worth what someone will pay for a name. The same domain carrying a site that ranks, that Google trusts, that turns searches into customers, and that ChatGPT, Perplexity and Gemini cite by name sells for a multiple of what it earns. Established content sites trade at roughly 28 to 42 times monthly profit.[^multiples]

Every page you publish and every citation you earn compounds. The only question is whether what is compounding is yours to keep, move and build on.

## When a builder is the right call

If you run a marketing team that redesigns pages every week without a developer, and the site never needs to connect to anything, a good Webflow designer will serve you well.

The case for ownership starts the moment your site has to do work: route leads, talk to your systems, show up in AI search, hold data you cannot afford to lose. For most service businesses (law firms, contractors, clinics) the site changes a few times a year. The work it does every day matters far more than a visual editor.

That is what leverage means: **the ceiling is yours to raise.**

## Benchmark: Webflow Certified Partners vs our builds

On October 10, 2026 we ran Google's Lighthouse against two groups of homepages, three runs each on a simulated phone:

- **Webflow Certified Partners:** every agency featured on Webflow's Certified Partners page that day, plus one more certified partner studio. We confirmed each one runs on Webflow before counting it. Ten qualified.
- **Our builds:** every public marketing site we serve on a custom domain. Eight sites, including our slowest.

| Measure (median site) | Webflow partners (10) | Our builds (8) |
| --- | --- | --- |
| Lighthouse performance score | 55 | 80 |
| Largest contentful paint | 13.4 s | 4.5 s |
| First contentful paint | 5.2 s | 2.4 s |
| Total blocking time | 419 ms | 31 ms |
| JavaScript transferred | 1,128 KB | 58 KB |
| Total page weight | 9,088 KB | 1,005 KB |
| Requests | 104 | 15 |
| Server response time | 17 ms | 43 ms |

**What it shows.** The median partner homepage shipped 19 times the JavaScript and nine times the total weight of our median build, and took three times as long to paint its main content. Seven of our eight sites shipped less JavaScript than the lightest Webflow partner homepage in the test.

**Where Webflow came out ahead.** Server response time. Webflow serves cached pages straight from its CDN in about 17 ms. Our pages pass through a Worker first, which adds roughly 25 ms and lets us run logic before a page is served. Both figures are well under a tenth of a second. Everything after that first response is where the difference opens up.

**Read it carefully.** These are lab measurements from one location, not data from real visitors. The homepages differ in content and ambition, and part of each partner page's weight is its designer's choice, not the platform's. Two of the eleven agencies Webflow featured showed none of Webflow's markers on their own homepages, so they are excluded from the Webflow group. The anonymized per-site data is available to download from the research notes on this page.

## Related reading

- [Why less time inside a platform is the advantage](/blog/why-less-time-inside-a-platform-is-the-advantage/): the founder's case on experience, primitives and portability.
- [Why Speed Wins](/reports/why-speed-wins/): what slow response costs a service business.

[^export]: Webflow Help Center, "How do I export my Webflow site code?" Collections can be exported separately as CSV files.
[^pricing]: Webflow Help Center, "Updated pricing and simplified plans for May 2026." Changes apply to existing sites at renewal from June 29 or November 16, 2026.
[^vendr]: Vendr marketplace data, 114 purchases. Webflow does not publish enterprise pricing.
[^cloud]: Webflow developer documentation, "Webflow Cloud" and "SQLite storage."
[^components]: Webflow developer documentation, "Code components." Components are imported from a React codebase and configured on the canvas through props, slots and variants.
[^bench1]: Lighthouse 12.8.2, mobile profile, three runs per site, October 10, 2026. Group figures are the median of per-site medians. Lab data from one location; see the methodology in the research notes on this page.
[^contract]: Subject to terms of a mutually agreed-upon contract.
[^edge]: Cloudflare network figure. Page response time depends on what the page does.
[^multiples]: Empire Flippers sold listings, 2026. Multiples vary by niche and by how stable the profit is.
