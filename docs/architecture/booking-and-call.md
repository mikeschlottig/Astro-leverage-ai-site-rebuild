# Booking + click-to-call on leverageai.network

Status: SHIPPED 2026-10-13 (Worker version `61f8093f`). Written by Claude Code (Opus 5.5). Proof per task below.

## Purpose
A prospect who wants the 15-minute "Get Found, Get Chosen, Get the Lead" walkthrough either:
1. **books** a 15-minute slot on `/book/`, or
2. **calls now** from `/contact/` or `/book/`. Mike answers with video and shares his browser. If "Accept calls" is
   unchecked, or nobody answers in 20 s, the AI receptionist takes a message.

Every booking is stored in D1. It notifies Mike and the prospect by email from `notifications@leverageai.network`,
and is published as a server-sent event (SSE) that a dedicated Claude Code Haiku agent reads hourly.

## What already exists (reused, not rebuilt)
| Piece | Where | Evidence |
|---|---|---|
| Call app (widget, `/call`, `/admin` desk, receptionist, browser share) | `/home/mikes/CloudflareRealTime-Admin-App`, Worker `click-to-call`, built 09-18 (Fable session `9687e7e1`) | embed audit: `delegation/prompts/20261013-202200-*`, blockers none |
| Site Worker with the contact form + email | `worker/contact.ts` (`/api/contact`, `env.EMAIL.send`) | `worker/contact.ts:144,242` |
| Form → D1 → email pattern, sender `notifications@leverageai.network` | morningwood-firewood `src/lib/email.ts`, skill `~/.agents/skills/lead-capture-email-notifications/SKILL.md` | `morningwood-firewood/wrangler.jsonc:32` |
| Email to any recipient | Cloudflare Email Sending: a `send_email` binding with no `destination_address` = unrestricted | skill `/mnt/c/Dev/_skills/store/cloudflare-email-in-workers-app/SKILL.md:29-46` |

Gap: the site's current `EMAIL` binding is locked to `mike@leverageai.network` (`destination_address`). The
prospect confirmation needs a second, unrestricted binding.

## Design

### Pages (call widget)
- `/contact/`: an inline **"Talk with Mike now"** button in the left column, beside the form. Under it, a
  "Book a 15-minute call" link to `/book/`.
- `/book/` (new): a slot picker (next 14 days, 15-min slots in Mike's hours, shown in the visitor's timezone), then
  name / email / business / website / phone (optional) / what to cover. Confirmation on the page. The call button
  appears here too.
- The widget loads **only on these two pages**, not site-wide. The tag moves out of `BaseLayout.astro` into the two
  pages.
- Inline button: the widget mounts a floating `#c2c-btn` and binds `open()` to it (`widget.ts:68`). The page hides
  `#c2c-widget-root` and its inline button calls `document.getElementById("c2c-btn").click()`. **No change to the
  call app.** The coupling is the id `c2c-btn`. If we later want a proper `data-trigger` option, it's ~6 lines in
  `widget.ts` plus a redeploy of `click-to-call`.

### Data: existing D1 `leverageai-forms` (f6b73e1d…), bound to the site Worker as `DB`
Existing databases, read 2026-10-13 with `wrangler d1 execute --remote` (SELECT only):
| DB | Bound by | Rows | Last write |
|---|---|---|---|
| `leverageai-forms`: `contact_submissions` | old Workers `leverage-ai-astro-site`, `leverageai-network` | 4 | 2026-07-28 |
| `site-forms`: `submissions` | `form-handler` | 3 | 2026-07-23 |
| `click-to-call`: `calls`, `messages`, `scripts` | `click-to-call` | 23 calls, 9 msgs | 2026-09-29 |

**Gap found:** the live (rebuild) contact form writes to no database. It only emails (`worker/contact.ts:222`). It
will insert into `contact_submissions` before sending, per the house Speed-to-Lead rule.
Bookings go into the same database as new tables. `click-to-call` stays owned by the call app.

The hours (Mon–Fri 8–18 Pacific) are constants in `worker/booking.ts`. Slots fall every 30 minutes: a 15-minute call
plus a 15-minute buffer, so no overlap logic is needed. The UNIQUE index alone prevents double booking.
```sql
CREATE TABLE booking_blackout (day TEXT PRIMARY KEY);         -- YYYY-MM-DD Pacific; days off, editable without a deploy
CREATE TABLE booking (
  id TEXT PRIMARY KEY, slot_start TEXT NOT NULL,              -- UTC ISO
  name TEXT NOT NULL, email TEXT NOT NULL, business TEXT, website TEXT, phone TEXT, topic TEXT,
  visitor_tz TEXT, status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked','cancelled')),
  cancel_token TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE UNIQUE INDEX booking_active_slot ON booking(slot_start) WHERE status = 'booked';  -- cancelling frees the slot
CREATE TABLE booking_event (seq INTEGER PRIMARY KEY AUTOINCREMENT, booking_id TEXT NOT NULL, type TEXT NOT NULL, payload TEXT NOT NULL, created_at TEXT NOT NULL);
```

### API (same site Worker, same origin as the pages, no CORS)
| Route | Does |
|---|---|
| `GET /api/booking/slots?from=&days=14` | open slots = availability − blackouts − existing bookings − past/min-notice |
| `POST /api/booking` | validate + honeypot → `INSERT booking` (a UNIQUE conflict returns 409 "slot just taken") → `INSERT booking_event` → emails. D1 is written before email (house Speed-to-Lead rule). |
| `GET /api/booking/:id.ics?t=` | calendar file for the prospect |
| `POST /api/booking/:id/cancel?t=` | cancel by token → event + emails |
| `GET /api/booking/events` | **SSE**, bearer token. Replays `booking_event` rows with `seq > Last-Event-ID` (header or `?since=`), then holds open ~60 s with heartbeats and closes. Clients reconnect with `Last-Event-ID`, so no event is missed. |

### Notifications
- To Mike: from `notifications@leverageai.network`, the booking details, `.ics`, the `/admin` desk link.
- To the prospect: confirmation, time in their timezone, `.ics`, cancel link, and the instruction "at your time, open
  leverageai.network/book/ and press Talk with Mike".
- New binding `NOTIFY` (unrestricted Email Sending, sender `notifications@leverageai.network`). The existing `EMAIL`
  binding is untouched.

### Hourly Haiku watcher (Claude Code side)
- Agent definition: `/home/mikes/booking-watch/agents.json` (`booking-watcher`, `claude-haiku-5-5`, effort medium),
  passed with `--agents`, so nothing is added to the global agent list.
- Runner: `/home/mikes/booking-watch/booking-watch.sh`:
  1. `curl` the SSE endpoint with `Last-Event-ID` from `~/.local/state/booking-watch/last-seq`.
  2. **No events → exit without starting Claude (zero tokens).**
  3. Events → `claude -p --agent booking-watcher` with the events on stdin, then store the new last seq.
- Clock: Windows Task Scheduler, hourly, `wsl.exe -d Ubuntu-24.04 -u mikes -- /home/mikes/booking-watch/booking-watch.sh`
  (`register-task.ps1`). WSL timers only fire while the VM is up (memory: windows-is-the-clock-for-wsl-jobs).
- The brief is emailed through the site Worker (`POST /api/booking/:id/brief`, bearer token), so the runner needs no
  email credentials.
- Token: `EVENTS_TOKEN` is a Worker secret and in `keyring -p leverageai-site`.
- What the agent does with each event: **see open question 2.**

### Why SSE + an hourly poll is fine
SSE is a push stream and the watcher only connects hourly. Replaying from `Last-Event-ID` (rows in D1) makes the
hourly read lossless. Email is the instant channel. The SSE feed is for the agent, and anything live later (for
example the `/admin` desk) can use the same stream.

## Release
- `pnpm verify` (check + build + site-standard guards).
- Upload a version with `wrangler versions upload` and test it on its preview URL. Then deploy, per skill
  `workers-staged-release`.
- Real-browser test: book a slot, get both emails, `.ics` opens, SSE replay returns the event, the watcher runs once
  by hand. Then a call from `/contact/` answered with video plus a browser share, and an away-mode call to the
  receptionist. Chromium with fake media devices, never Claude in Chrome.

## Decisions (Mike, 2026-10-13)
1. Hours: **Mon–Fri 8:00–18:00 America/Los_Angeles.** 15-min slots, 15-min buffer after each booking, 2 h minimum
   notice, 14 days ahead. The buffer, notice and horizon were proposed with the hours option Mike picked.
2. Watcher: **prep brief + email.** For each new booking it takes a quick public look at the prospect's business (a
   Get Found / Get Chosen / Get the Lead snapshot), saves it as markdown, and emails it to Mike before the call.
3. Alerts: **both** `ceo@leverageai.network` and `mike@leverageai.network`.

## UI component
`cally@0.9.2` (`WickyNilliams/cally`, MIT, web components, no framework, "less than 9KB min/gzip"). Used for date
picking only. The time slots are our own buttons. Survey: `delegation/prompts/20261013-204500-booking-oss-survey.md`.
Back end: nothing fits as a drop-in (Cal.com/Rallly need Postgres + Node, Easy!Appointments needs PHP + MySQL, and
`CCCrafts/punctual` is a separate pre-1.0 app needing DO/KV/R2/Queues), so it is built as a few D1 queries.
Risks to test: the DST change on Nov 1 2026; `new Date("YYYY-MM-DD")` parsing as UTC; keyboard and screen-reader
use of the date picker.

## Tasks
- [x] 0. OSS survey (house no-hand-roll rule): cally for the UI, the back end is built on D1. 3/3 spot-checks upheld.
- [x] 1. Mike's decisions recorded above.
- [x] 2. Widget only on `/contact/` + `/book/` (`src/components/call/CallNow.astro`). Proof: the live homepage has
      no widget; `/contact/` and `/book/` have it; gate log "floating widget button hidden: true".
- [x] 3. `migrations/0001_booking.sql` applied to `leverageai-forms` (remote). `DB` + `NOTIFY` (upload shows
      "unrestricted") + `EVENTS_TOKEN` (Worker secret + `keyring -p leverageai-site`).
- [x] 3b. Contact form → `contact_submissions` first. Proof: row 5 with `copy_sent=1` and `mail_error` null.
- [x] 4. `worker/booking.ts` + `worker/booking-slots.ts`. `node --test worker/booking-slots.test.ts`: 8/8, including
      the PDT/PST switch on 2026-11-01. API proof: create 200, same slot 409, `.ics` DTSTART correct, wrong token 404,
      GET cancel only confirms, POST cancel frees the slot, SSE replay + `Last-Event-ID`, no token 401.
- [x] 5. `/book/` with `cally@0.9.2`. Browser gate desktop + 390 px: 0 console errors, no horizontal overflow,
      weekends closed. A gate caught `.stack` overriding `[hidden]` (form and confirmation showing before any
      choice); it was fixed, and the gate now fails on that.
- [x] 6. Emails via `NOTIFY` from `notifications@leverageai.network`: `emailed: true` on create (2 owners + guest).
- [x] 7. Staged release (`versions upload` → 0% → override-header gates → promote). The call gate on `/contact/`:
      "Accept with video" → every `<video>` live on both sides after 10 s. The away gate: the receptionist answers.
      Live: `61f8093f`. Rollback: `8510dcb8` (booking without the brief endpoint), `cc629544` (before booking).
- [x] 8. `/home/mikes/booking-watch/`: agent `booking-watcher` (`claude-haiku-5-5`), runner, Windows task
      "LeverageAI booking watcher (hourly)". Proof: seq 7 → brief (589 words, $0.055, emailed `sent: 2`); seq 8 cancel
      logged with no model; a quiet run exits; `Start-ScheduledTask` LastTaskResult 0.
- [x] 9. Commit + push (this commit).

## Hypotheses: results
| # | Prediction | Result |
|---|---|---|
| H1 | The widget works on leverageai.network unchanged | **Right.** Embed audit: no blockers. A two-way video call from `/contact/` passed. |
| H2 | The camera prompt names leverageai.network (permission delegated through iframe `allow=`) | **Untested.** The gate runs with `--use-fake-ui-for-media-stream`, which suppresses the prompt. Check on a real device. |
| H3 | Page weight grows only by `widget.js` | **Partly wrong.** `/book/` also loads cally (<9 KB gz stated). Other pages are unchanged. |
| H4 | The floating button may overlap the mobile footer | **Moot.** The floating button is hidden; the inline button sits in the page flow. 390 px has no overflow. |
| H5 (new) | The `haiku` alias means Haiku 5.5 | **Wrong for headless `claude -p`.** CLI 2.1.299 resolved `--model haiku` to `claude-haiku-4-5-20251001`. In-session Agent-tool subagents were already `claude-haiku-5-5` (read from their transcripts). Fixed with `ANTHROPIC_DEFAULT_HAIKU_MODEL=claude-haiku-5-5` (settings.json) and an explicit `--model claude-haiku-5-5` in the watcher. |
- [x] After ship: `leverage-ai-astro-site` made private 2026-10-13. API `private=true`, authenticated `gh repo clone` ok (HEAD `1d5e0d0`), anonymous `git ls-remote` refused. Its active workflow "Deploy to Cloudflare Workers" still runs on push (relevant to the token audit).
- [ ] Next (Mike's order): token: how it leaked, which apps
  use it, replacement tokens swapped into each → Mike revokes.
- Last (Mike, 2026-10-13): get the deployed Cloudflare email clients (inbox Workers) working, and assign them to Mike
  and to Claude. Then plan email addresses for the other agents, operated through the built-in MCP.

## Gotchas recorded for the next build (Claude, 2026-10-13)
- `pnpm add x` in this repo fails with `ERR_PNPM_ADDING_TO_ROOT` (it has `pnpm-workspace.yaml`). Use `pnpm add -w x@<version>`.
- `wrangler secret put` deploys the current code immediately. `wrangler versions secret put NAME` creates an
  undeployed version, which is how `EVENTS_TOKEN` was added (version `eb08d076`, staged at 0%). Secrets carry into
  later `wrangler versions upload`s: SSE returned 200 on `2051eef6` without re-adding it.
- The canonical guard needs `SITE_URL=https://leverageai.network` locally (CI sets it).
