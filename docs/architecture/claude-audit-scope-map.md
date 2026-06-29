# Claude Audit Scope Map

This document maps the advice in `Claude-leverage-ai-Site-audit-continued.md` onto the current rebuild state and the direction already established in this repo.

## What This Asset Is Good For

The audit is useful as a pressure test against public-facing incompleteness.

Its strongest value is not product strategy discovery. We already have that in:

- [site-ontology.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/site-ontology.md)
- [link-cluster-map.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/link-cluster-map.md)
- [asset-ingestion-map.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/docs/architecture/asset-ingestion-map.md)

What this audit adds is a sharper answer to a different question:

- Which public pages still look visibly unfinished right now?

That matters because the site is being treated as a premium brand surface first. Visible placeholders and development-note copy now have higher urgency than deeper secondary refinements.

## High-Level Read

The audit is a mixed-freshness asset.

- Some findings are still exactly right and should affect the immediate queue.
- Some are directionally right but need reframing because the repo already moved forward.
- Some are already superseded by newer work in this rebuild.

## Task-By-Task Mapping

| Audit task | Current status in repo | Scope decision | Notes |
| --- | --- | --- | --- |
| About page placeholder | Still true | Pull forward | [about.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/about.astro) is still a stub and weakens trust. |
| Local demand systems article empty | Still true | Pull forward | [local-demand-systems.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/local-demand-systems.md) still has only a one-paragraph seed. |
| Astro field guide placeholder and exposed local path | Still true | Pull forward | [astro-cloudflare-workers-field-guide.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/astro-cloudflare-workers-field-guide.md) still exposes a local path and needs full conversion. |
| Gemini execution guide placeholder and exposed local path | Still true | Pull forward | [gemini-programmatic-execution-guidelines.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/gemini-programmatic-execution-guidelines.md) is still a placeholder. |
| Web agents report placeholder and exposed local path | Still true | Pull forward | [web-agents-intelligence-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/web-agents-intelligence-report.md) is still a placeholder report shell. |
| Blog post body thin and blog hub under-framed | Still true | Pull forward | [why-speed-to-lead-is-a-website-problem.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/blog/why-speed-to-lead-is-a-website-problem.md) is still a seed; [blog/index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/blog/index.astro) still lacks framing copy. |
| Service-page FAQ and proof gaps | Mostly superseded | Keep concept, drop exact finding | The three service content files now have populated `proofPoints` and `faqs`; the audit caught an older state. |
| Contact backend not connected | Partially stale | Reframe | [worker/contact.ts](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/worker/contact.ts) exists, but the public page still exposes scaffolding language and the form still lacks visible loading, success, and error states. |
| Locations not in primary nav | Still true | Pull forward | `SITE.nav` in [site.ts](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/lib/site.ts) still omits `/locations`. |
| Homepage system copy still sounds like a build note | Still true | Pull forward | [index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/index.astro) still says the site structure "is being rebuilt". |

## What Changes In The Priority Order

Before this audit, the strongest next pass from the asset library was service-detail deepening from the strategy and schema references.

After checking the current repo, that priority should be temporarily reshuffled.

### Immediate queue now

1. Remove public-facing placeholder and development-note language.
2. Finish the highest-visibility trust surfaces that still read unfinished.
3. Surface the strongest existing cluster more clearly in navigation.
4. Only then return to deeper enrichment of already-functional service pages.

This keeps the site aligned with the confirmed direction:

- grounded
- premium
- outcome-led
- brand surface first

## Recommended Translation Into The Current Build Scope

### Priority 1: Public unfinished-state cleanup

These are the pages most likely to break trust if someone lands on the site now:

- [about.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/about.astro)
- [local-demand-systems.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/local-demand-systems.md)
- [astro-cloudflare-workers-field-guide.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/astro-cloudflare-workers-field-guide.md)
- [gemini-programmatic-execution-guidelines.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/knowledge-base/gemini-programmatic-execution-guidelines.md)
- [web-agents-intelligence-report.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/reports/web-agents-intelligence-report.md)
- [why-speed-to-lead-is-a-website-problem.md](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/content/blog/why-speed-to-lead-is-a-website-problem.md)

Why this comes first:

- these are public trust liabilities, not merely missed opportunities
- several of them visibly expose local file paths or build-phase language
- they undercut the premium surface more than missing secondary enhancements do

### Priority 2: Structural surfacing and buyer-facing polish

These are quick, high-leverage fixes once the placeholder content is gone:

- add `/locations` to primary nav in [site.ts](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/lib/site.ts)
- update the homepage system paragraph in [index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/index.astro)
- add a proper intro to [blog/index.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/blog/index.astro)

Why this comes second:

- the route architecture is already strong
- these changes make the strength more visible to buyers and crawlers
- they reinforce Oregon specificity and systematic linking

### Priority 3: Contact flow polish, not first-pass architecture

The audit is helpful here, but the exact problem statement should be corrected.

What is already present:

- `POST /api/contact` logic exists in [worker/contact.ts](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/worker/contact.ts)
- honeypot and required-field handling already exist

What still belongs in scope:

- remove scaffolding note from [contact.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/pages/contact.astro)
- add clear frontend loading, success, and error states in [ContactForm.astro](C:/Users/mikes/Documents/Astro-leverage-ai-site-rebuild/src/components/contact/ContactForm.astro)
- verify the Worker/email-binding path against real deployment assumptions

Why this is not Priority 1:

- it is partly implemented already
- the bigger current brand risk is visibly unfinished content, not missing backend shape

### Priority 4: Return to service-detail enrichment

The audit should not override the earlier conclusion that these assets still matter:

- `leverageai-strategy-playbook.html`
- `leverageai-network-schema-package.html`
- `oregon-infrastructure-intel.pdf`
- `diagnosing-oregons-local-service-markets.md`

But the audit does suggest when to use them:

- after the site stops showing obvious unfinished-state cues

## Recommended Next Implementation Sequence

If we follow the current scope honestly, the best next build order is:

1. Finish `/about`.
2. Finish `local-demand-systems`.
3. Convert the two technical knowledge-base placeholders.
4. Convert the web agents report placeholder.
5. Finish the speed-to-lead blog article and improve the blog hub intro.
6. Add `/locations` to the primary nav and footer path.
7. Replace the homepage "rebuild" note with finalized buyer-facing system copy.
8. Polish contact states and remove public scaffolding language.
9. Resume deeper service-page enrichment and broader content-cluster buildout.

## Bottom Line

This audit should change the queue, but not the strategy.

It reinforces the existing direction:

- keep the darker premium trust surface
- keep the systematic cluster logic
- keep the Oregon market grounding
- keep the brand-first public posture

What it changes is the order of execution:

- visible placeholder cleanup now outranks deeper enrichment work
