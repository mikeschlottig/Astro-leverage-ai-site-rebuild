---
title: "GEO for Law Firms: The Playbook to Get Recommended by ChatGPT"
description: A step-by-step GEO playbook for law firms. Entity authority, directory signals, Q&A schema, NAP cleanup, attorney review and AI share-of-voice tracking.
publishedAt: 2026-10-18
category: Legal Marketing
tags:
  - law-firms
  - geo
  - playbook
relatedServices:
  - ai-search-optimization
  - search-data-architecture
---

> **TL;DR:** Baseline your AI visibility with a cross-LLM audit (two to three weeks). Build entity authority in the places assistants read. Rewrite practice pages as question-and-answer pages with matching FAQPage schema. Fix name, address and phone fragmentation (two to four weeks for multi-office firms). Run an attorney-review workflow that does not bottleneck. Track AI share of voice monthly.

Most GEO writing is theory. This is the sequence, in order, with the timelines leading firms report, adapted for legal practice. Nothing here guarantees a citation; assistants choose their own sources. The steps raise the chance of an accurate one. For why this matters now, read [AI Overviews hit 77% of legal searches](/blog/ai-overviews-legal-search-geo-visibility/).

## Step 1: Baseline AI visibility

Run a cross-LLM audit before changing anything. Ask a fixed set of client questions in ChatGPT, Perplexity, Google AI Overviews, Gemini and Bing Copilot, for example "who is a good divorce lawyer in Medford" or "what should I do after a car accident in Grants Pass". Record which firms are named, which sources are cited and what each assistant says about yours. Alongside it, run Core Web Vitals and an indexability crawl so a technical block does not hide the work you do next.

Plan on two to three weeks for a careful baseline. Repeat the same questions monthly so you can compare like with like.

## Step 2: Build entity authority

Assistants decide who exists and who is credible from external signals, not from your own site alone. Work through the entity sources:

- a claimed, complete Google Business Profile and, where earned, a Google Knowledge Panel
- up-to-date Martindale-Hubbell and Avvo profiles
- state bar directory and court record listings that match your name and credentials
- Google Scholar profiles for attorneys who publish
- Wikipedia entries only for named partners at major firms, where notability exists

Every profile should carry the same name, address, phone number and website, described the same way.

## Step 3: Turn practice pages into Q&A repositories

Brochure pages ("We are an experienced personal injury firm") give an assistant nothing to quote. Rewrite each practice page around the real questions clients ask, drawn from Google's People Also Ask and from the prompts Perplexity suggests. Answer in the first two sentences, then add detail. Keep it jurisdiction-specific.

Wrap each answer in FAQPage schema that matches the visible text exactly. A minimal example:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How long do I have to file a personal injury claim?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The text here must be identical to the answer shown on the page."
    }
  }]
}
```

Markup that describes content a visitor cannot see is worse than none. Validate it against schema.org's validator and Google's documentation rather than by eye.

## Step 4: Fix name, address and phone fragmentation

Multi-office firms often have a different suite number, phone line or firm-name variant on each directory. Conflicting entity data can lead engines to discount all of it. Plan a two-to-four-week remediation sprint: choose one canonical form of each fact, then correct every listing to match, with a spreadsheet showing before and after. The research calls the standard NAP+W: name, address, phone and website URL, held at 100% consistency.

## Step 5: Attorney E-E-A-T without bottlenecks

Experience, expertise, authoritativeness and trust come from real attorneys. The workflow that works avoids asking busy partners to write. Interview the billing attorney for fifteen minutes, draft from the transcript, and return it for sign-off. The attorney verifies every factual claim, case result and statute citation before publication; under ABA Model Rule 7.1 and Formal Opinion 512 that duty cannot be delegated. See [AI Marketing Compliance for Law Firms](/blog/ai-marketing-compliance-law-firms/).

## Step 6: Track AI share of voice monthly

Re-run the Step 1 questions each month and count how often your firm is named or cited, by assistant. Plot it next to calls and booked consultations. Read the trend, not a single month.

## The directory tier system

AI models weight external citations in a hierarchy:

| Tier | Signal | Examples |
| --- | --- | --- |
| 1 | Highest | Earned third-party media, court records, government and bar registries that cannot be self-published |
| 2 | Strong | Authoritative legal directories: Martindale-Hubbell, Avvo, FindLaw, Justia, Super Lawyers, Best Lawyers |
| 3 | Baseline | General business listings |

Directories are therefore worth keeping accurate even if you no longer buy a vendor's website. We explain the distinction in [Legal Directories: Dead for Clients, Alive for AI Search](/blog/legal-directories-ai-search-citations/).

## Common GEO mistakes law firms make

- Reporting Domain Authority, keyword density and ranking tables as the result.
- Leaving brochure-style practice pages that offer nothing to quote.
- Letting listings drift, so assistants see three versions of the firm.
- Publishing AI-drafted copy without attorney verification.
- Measuring clicks instead of signed retainers.

## Where to start

The [AI Search Optimization](/services/ai-search-optimization/) service covers these steps, and the [diagnostic audit](/pricing/) delivers Step 1 and an entity check at a fixed price credited toward later work. This is a living guide; AI platforms change, so we review it quarterly.

## Sources

2026 GEO execution research and legal citation-source studies compiled in the October 2026 *US Legal Marketing Industry Breakdown* prepared for Leverage AI; ABA Model Rule 7.1 and Formal Opinion 512 (July 2024); schema.org vocabulary.
