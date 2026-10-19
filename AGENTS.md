# astro-leverage-ai-site-rebuild — leverageai.network: Astro 6 static site plus a Cloudflare Worker

## Where the intel lives

<!-- projectstd:begin id=pointer v=1 -->
**How to navigate this repo**

1. **Follow the pointers.** `/home/mikes/.claude/ROOT-POINTER.md` → taxonomy → store index → the unit.
2. **Progressive disclosure.** Index before file, section before document, symbol before source.
3. **Context comes from the CLIs.** `doc-intel section <title> --body` returns a section; `intel show <symbol> --body` returns a definition. Invocations: `/home/mikes/.claude/OVERLAY-WSL.md`.
4. **Locate across projects with Manticore.** `uv run --no-project --python 3.13 python /home/mikes/house-index/house.py search "<terms>" --dir <path>` (`files "<terms>"` for one row per file). Connection refused → start steps in the `house-search` skill. What *happened* in a past session is the `ai-session-history` skill (`aisu`), not Manticore.
5. **`ROADMAP.md` is not canonical.** `rmap` is: `rmap status` for the company, `rmap status --project <dir>` for one project.
6. **grep is a temporary fallback.** Use `command grep` — bare `grep` here is `ugrep --ignore-files` and returns a silent null for gitignored paths.

| store | index | what it answers |
|---|---|---|
| **root** | `/home/mikes/.claude/ROOT-POINTER.md` | which store to ask, and how the chain works |
| manticore (CONTENT, files) | `/home/mikes/house-index/README.md` | see ROOT-POINTER |
| aisu (CONTENT, conversations) | `/home/mikes/ai-sessions-unified/USERGUIDE.md` | see ROOT-POINTER |
| doc-intel | `/home/mikes/doc-intel/indexes` | see ROOT-POINTER |
| session-audit | `/home/mikes/session-audit/INDEX.md` | see ROOT-POINTER |
| codebase-intel | `/home/mikes/codebase-intel-toolkit/INDEX.md` | see ROOT-POINTER |
<!-- projectstd:end id=pointer -->

## CLI toolkit

<!-- projectstd:begin id=toolkit v=1 -->
**Taxonomy — one word per store. Full version: `/home/mikes/.claude/HOUSE-TOOLKIT-TAXONOMY.md`.**

| word | system | holds |
|---|---|---|
| **CONTENT** | `Manticore `house` + `aisu`` | words — files on the drive; every AI conversation |
| **CODE** | `codebase-intel-toolkit` | structure — symbols, files, deps |
| **DOCS** | `doc-intel` | sections — one document set, queried by title |
| **CONDUCT** | `session-audit` | what agents did — findings, lessons |
| **WORK** | `roadmap` | planned, in progress, done |
| **SCRATCH** | `context-mode` | ephemeral sandbox, nothing durable |
| **LAYOUT** | `projectstd` | the shape every project root must have |

The same stores answer the same questions in every project.

| when you need | run |
|---|---|
| What is in the corpus? | `uv run --no-project --python 3.13 python /home/mikes/house-index/house.py search "<terms>"` |
| What did we say or decide in a past session? | `uv run --project /home/mikes/ai-sessions-unified aisu search "<words>"` |
| Where does this symbol live? | `uv run --project /home/mikes/codebase-intel-toolkit intel show <symbol> --body` |
| How is this codebase laid out? | `uv run --project /home/mikes/codebase-intel-toolkit intel map <dir>` |
| What does this document say? | `uv run --project /home/mikes/doc-intel doc-intel query '<terms>' --db <db>` |
| What went wrong in past sessions? | `uv run --project /home/mikes/session-audit sessaudit query findings --rule <RULE>` |
| What should I work on? | `uv run --project /home/mikes/roadmap rmap next` |
| Analyse a big output without reading it | context-mode MCP — `ctx_execute`, `ctx_batch_execute`, `ctx_search` |

Python runs through `uv`, never a bare interpreter: `uv run --project <dir>` for a project with a `pyproject.toml`, `uv run --no-project python <file.py>` for a loose script.

**Where output goes:** store output stays in the store (Manticore tables, `codebase-intel-toolkit/indexes/<project>`, `session-audit/data`); this project's own output stays here, in `index/` and `dist/`. A tool never writes its index into the tree it indexed.
<!-- projectstd:end id=toolkit -->

## Layout

<!-- projectstd:begin id=layout v=1 -->
```
/home/mikes/Astro-leverage-ai-site-rebuild  (node)
  ASTRO RULES/
  dist/         built output — regenerated, not edited
  docs/         written documentation
  migrations/
  packages/
  public/
  reference/
  scripts/      one-off and operational scripts
  src/          source
  worker/

Entry points: `src/assets/`, `src/components/`, `src/content/`, `src/data/`
```
<!-- projectstd:end id=layout -->

## Run and verify

<!-- projectstd:begin id=run v=1 -->
Run it:

- dev — `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run dev`
- build — `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run build`
- preview — `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run preview`

Verify it:

- check — `cd /home/mikes/Astro-leverage-ai-site-rebuild && npm run check`
<!-- projectstd:end id=run -->

## Rules

Project invariants and what cost time to learn. Detail lives in `docs/architecture/`.

**Operating index and planning artifacts**

- Use `C:\Users\mikes\.codex\codex_memory\INDEX.md` as the durable operating index (Codex account).
- Keep this file short; put detail in `docs/architecture/`. Primary planning artifacts:
  `site-ontology.md` (route and service hierarchy), `offer-repositioning-plan.html` (2026-10-18 plan and status),
  `structured-data-validation.md` (the JSON-LD gate), `astro-convo-mapping.md` and `astro-convo-map.json`.
- Before dispatching any subagent, apply the scoped prompt hook in
  `C:\Users\mikes\.codex\codex_memory\dev_best_practices\README.md`.

**Run and verify**

- The package manager is **pnpm** (`packageManager` in `package.json`). The generated run block above says `npm`; it is wrong for this repo.
- The gate is `SITE_URL=https://leverageai.network pnpm verify` (check, build, then every guard). `guard:canonicals` fails without `SITE_URL`; CI sets it.
- `worker/*.test.ts` run with `node --test worker/<file>.test.ts` (Node 24 strips types).

**Services and URLs**

- A service's slug must equal the slugified `phrase` in its frontmatter, and its title and H1 must contain that phrase. `src/lib/services.ts` fails the build otherwise.
- A moved or renamed service needs an entry in `src/data/service-redirects.ts` (served as a 301 by `worker/contact.ts`), a link rewrite across `src/`, and an old value kept in `allowedServices` in `worker/contact.ts` so cached forms still submit. `guard:links` checks the links.

**Structured data**

- JSON-LD comes from `packages/site-standard` and is gated by `scripts/validate-structured-data.mjs`: the official schema.org vocabulary (pinned) plus Google Rich Results rules. Read `docs/architecture/structured-data-validation.md` for what it covers and what it does not. Do not write a home-grown validator; compose official ones.
- `packages/site-standard` is shared with other properties and stays dependency-free.

**Blog publishing**

- A blog post is published when the build date reaches its `publishedAt`; later posts are not built (`src/lib/blog.ts`). A published post links only to earlier-dated posts; forward references go in `relatedPosts` frontmatter. `PUBLISH_AS_OF=YYYY-MM-DD pnpm verify` builds as of that day. Plan and runbook: `docs/publishing/legal-series-publishing-plan.md`.
- Every post shows a byline (`ArticleByline.astro`) and the author box; `Article.author` in JSON-LD carries `name` and `sameAs`.
- No X link anywhere: the account was compromised and banned (2026-10-18). Do not re-add one until Mike gives the new handle.

**Copy**

- Never argue against retainers. The position is for retainers and against lock-in: when a contract period ends the client owns the code and digital assets. Contract terms are not published.
- Every number on a page carries its source. Research lives in `docs/research/`. Say what a figure covers (legal sector, one study); do not generalise it.
- `guard:phrases` fails the build on drafting language such as "as an AI" or "per the brief".
- The intake service level is owner-attested. This site's own contact worker saves to D1 and emails the owner only; it does not confirm to the submitter (checked 2026-10-18).

**Working in this repo**

- Stage files by explicit path, not `git add -A`: other people and agents change `docs/` at the same time.
- `*.workers.dev` returns `X-Robots-Tag: noindex` (`worker/noindex.ts`); the public domain is `leverageai.network`.
