# Astro Leverage AI Site Rebuild

Astro 6 static marketing site for Leverage AI, with project-specific schema, content collections, local-market content, case studies, and a Cloudflare contact Worker.

## Common commands

```powershell
pnpm dev
pnpm check
pnpm build
pnpm verify
```

## Project documentation

- `PRODUCT.md` — product, audience, brand, and accessibility context
- `AGENTS.md` — project operating instructions
- `docs/architecture/site-ontology.md` — site hierarchy and content relationships
- `docs/architecture/astro-convo-mapping.md` — Astro conversation/source mapping
- `docs/architecture/performance-and-about-image-audit.md` — measured performance and About-image findings plus the remediation task list

## Local codebase index

The queryable codebase-intel-toolkit index is intentionally stored outside the project so it is not shipped:

`C:\Users\mikes\Documents\.index\codebase_intel_index.json`

Rebuild it from the Windows toolkit with:

```powershell
uv run python C:\Users\mikes\codebase-intel-toolkit\cli\intel.py index `
  C:\Users\mikes\Documents\Astro-leverage-ai-site-rebuild `
  --output C:\Users\mikes\Documents\.index
```

