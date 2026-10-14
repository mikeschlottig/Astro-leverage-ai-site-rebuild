// Booking API for /book/ (design: docs/architecture/booking-and-call.md).
// Routes: GET /api/booking/slots · POST /api/booking · GET /api/booking/:id.ics?t= ·
//         GET|POST /api/booking/:id/cancel?t= · GET /api/booking/events (SSE, bearer token) ·
//         POST /api/booking/:id/brief (bearer token; emails the watcher's prep brief to the owners)
// Order on create: D1 first (booking + event in one batch), then email (house Speed-to-Lead rule).
import { createEvent } from "ics";
import { BOOKING_RULES, openSlots } from "./booking-slots";

type D1Result<T> = { results: T[] };
type D1Prepared = {
  bind: (...values: unknown[]) => D1Prepared;
  all: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  run: () => Promise<unknown>;
};
export type D1Database = {
  prepare: (sql: string) => D1Prepared;
  batch: (statements: D1Prepared[]) => Promise<unknown[]>;
};

type EmailBinding = {
  send: (message: {
    to: string;
    from: string | { email: string; name?: string };
    subject: string;
    text?: string;
    replyTo?: string;
  }) => Promise<{ messageId: string }>;
};

export type BookingEnv = {
  DB?: D1Database;
  NOTIFY?: EmailBinding;
  NOTIFY_FROM_EMAIL?: string;
  BOOKING_ALERT_EMAILS?: string;
  BOOKING_PUBLIC_ORIGIN?: string;
  CALL_DESK_URL?: string;
  EVENTS_TOKEN?: string;
};

type BookingRow = {
  id: string;
  slot_start: string;
  name: string;
  email: string;
  business: string | null;
  website: string | null;
  phone: string | null;
  topic: string | null;
  visitor_tz: string | null;
  status: "booked" | "cancelled";
  cancel_token: string;
  created_at: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });
const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
const randomHex = (bytes: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, "0")).join("");

const formatIn = (iso: string, timeZone: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short",
    }).format(new Date(iso));
  } catch {
    return formatIn(iso, BOOKING_RULES.timeZone);
  }
};

const page = (title: string, body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title>
<style>:root{color-scheme:dark}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;background:#11131a;color:#f1ede5;font-family:system-ui,sans-serif}main{width:min(100%,36rem);padding:2rem;border:1px solid #2a303e;border-radius:.45rem;background:#171b25}p{color:#beb6a8;line-height:1.6}button,a.b{display:inline-flex;margin-top:1rem;border:0;color:#101216;background:#d7a449;padding:.8rem 1rem;border-radius:.2rem;font-weight:700;text-decoration:none;cursor:pointer}</style></head><body><main><h1>${title}</h1>${body}</main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );

async function loadTaken(db: D1Database, fromIso: string) {
  const [booked, blackout] = await Promise.all([
    db.prepare("SELECT slot_start FROM booking WHERE status = 'booked' AND slot_start >= ?").bind(fromIso).all<{ slot_start: string }>(),
    db.prepare("SELECT day FROM booking_blackout").all<{ day: string }>(),
  ]);
  return {
    booked: new Set(booked.results.map((r) => r.slot_start)),
    blackout: new Set(blackout.results.map((r) => r.day)),
  };
}

async function currentSlots(db: D1Database) {
  const now = new Date();
  const { booked, blackout } = await loadTaken(db, now.toISOString());
  return openSlots(now, booked, blackout);
}

const eventPayload = (b: BookingRow, origin: string) => ({
  id: b.id,
  status: b.status,
  slot_start: b.slot_start,
  slot_pacific: formatIn(b.slot_start, BOOKING_RULES.timeZone),
  name: b.name,
  email: b.email,
  business: b.business,
  website: b.website,
  phone: b.phone,
  topic: b.topic,
  visitor_tz: b.visitor_tz,
  created_at: b.created_at,
  ics_url: `${origin}/api/booking/${b.id}.ics?t=${b.cancel_token}`,
});

async function notify(env: BookingEnv, b: BookingRow, kind: "created" | "cancelled", origin: string) {
  if (!env.NOTIFY || !env.NOTIFY_FROM_EMAIL) return { sent: 0, failed: ["NOTIFY binding not configured"] };
  const from = { email: env.NOTIFY_FROM_EMAIL, name: "Leverage AI" };
  const pacific = formatIn(b.slot_start, BOOKING_RULES.timeZone);
  const local = formatIn(b.slot_start, b.visitor_tz || BOOKING_RULES.timeZone);
  const icsUrl = `${origin}/api/booking/${b.id}.ics?t=${b.cancel_token}`;
  const cancelUrl = `${origin}/api/booking/${b.id}/cancel?t=${b.cancel_token}`;
  const owners = (env.BOOKING_ALERT_EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean);

  const ownerText = [
    kind === "created" ? "New 15-minute call booked." : "A booked call was cancelled.",
    "",
    `When: ${pacific}`,
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Business: ${b.business || "Not provided"}`,
    `Website: ${b.website || "Not provided"}`,
    `Phone: ${b.phone || "Not provided"}`,
    `Visitor time zone: ${b.visitor_tz || "Not provided"}`,
    "",
    `What to cover: ${b.topic || "Not provided"}`,
    "",
    `Calendar file: ${icsUrl}`,
    env.CALL_DESK_URL ? `Call desk (have "Accept calls" checked at the time): ${env.CALL_DESK_URL}` : "",
  ].filter((line) => line !== undefined).join("\n");

  const guestText =
    kind === "created"
      ? [
          `Hi ${b.name},`,
          "",
          `You're booked for a 15-minute call with Mike Schlottig at Leverage AI: ${local}.`,
          "",
          "We will walk through how your business gets found, gets chosen, and gets the lead.",
          "",
          `At the time of the call, open ${origin}/book/ and press "Talk with Mike now". It runs in your browser with video or audio, so there is nothing to install.`,
          "",
          `Add it to your calendar: ${icsUrl}`,
          `Need to cancel? ${cancelUrl}`,
          "",
          "Mike",
          "Leverage AI · leverageai.network",
        ].join("\n")
      : [`Hi ${b.name},`, "", `Your call on ${local} is cancelled. Book another time any time at ${origin}/book/.`, "", "Mike"].join("\n");

  const subjectOwner = kind === "created" ? `Booked: ${b.name} · ${pacific}` : `Cancelled: ${b.name} · ${pacific}`;
  const subjectGuest = kind === "created" ? `Your call with Mike · ${local}` : `Cancelled: your call with Mike · ${local}`;

  const sends = [
    ...owners.map((to) => env.NOTIFY!.send({ to, from, subject: subjectOwner, text: ownerText, replyTo: b.email })),
    env.NOTIFY.send({ to: b.email, from, subject: subjectGuest, text: guestText, replyTo: owners[0] }),
  ];
  const results = await Promise.allSettled(sends);
  const failed = results.flatMap((r) => (r.status === "rejected" ? [String(r.reason)] : []));
  if (failed.length) console.error("booking email failures", { booking: b.id, kind, failed });
  return { sent: results.length - failed.length, failed };
}

async function createBooking(request: Request, env: BookingEnv & { DB: D1Database }, origin: string) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
  if (clip(body.company_site, 200)) return json({ ok: true, id: "ignored" }); // honeypot

  const slotStart = clip(body.slot_start, 40);
  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  if (!slotStart || !name || !emailPattern.test(email)) {
    return json({ ok: false, error: "Please choose a time and enter your name and a valid email." }, 400);
  }
  const open = await currentSlots(env.DB);
  if (!open.some((s) => s.start === slotStart)) {
    return json({ ok: false, error: "That time is no longer available. Please pick another." }, 409);
  }

  const visitorTz = clip(body.visitor_tz, 64);
  const b: BookingRow = {
    id: crypto.randomUUID(),
    slot_start: slotStart,
    name,
    email,
    business: clip(body.business, 200) || null,
    website: clip(body.website, 300) || null,
    phone: clip(body.phone, 40) || null,
    topic: clip(body.topic, 2000) || null,
    visitor_tz: visitorTz && Intl.supportedValuesOf("timeZone").includes(visitorTz) ? visitorTz : null,
    status: "booked",
    cancel_token: randomHex(16),
    created_at: new Date().toISOString(),
  };

  try {
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO booking (id, slot_start, name, email, business, website, phone, topic, visitor_tz, status, cancel_token, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'booked', ?, ?)`,
      ).bind(b.id, b.slot_start, b.name, b.email, b.business, b.website, b.phone, b.topic, b.visitor_tz, b.cancel_token, b.created_at),
      env.DB.prepare("INSERT INTO booking_event (booking_id, type, payload, created_at) VALUES (?, 'booking.created', ?, ?)")
        .bind(b.id, JSON.stringify(eventPayload(b, origin)), b.created_at),
    ]);
  } catch (error) {
    if (String(error).includes("UNIQUE")) {
      return json({ ok: false, error: "Someone just booked that time. Please pick another." }, 409);
    }
    console.error("booking insert failed", error);
    return json({ ok: false, error: "The booking could not be saved. Please try again." }, 500);
  }

  const mail = await notify(env, b, "created", origin);
  return json({
    ok: true,
    id: b.id,
    slot_start: b.slot_start,
    ics_url: `/api/booking/${b.id}.ics?t=${b.cancel_token}`,
    emailed: mail.failed.length === 0,
  });
}

async function findBooking(db: D1Database, id: string, token: string) {
  if (!id || !token) return null;
  const b = await db.prepare("SELECT * FROM booking WHERE id = ?").bind(id).first<BookingRow>();
  return b && b.cancel_token === token ? b : null;
}

function icsFor(b: BookingRow, origin: string) {
  const { error, value } = createEvent({
    uid: `${b.id}@leverageai.network`,
    start: Date.parse(b.slot_start),
    startInputType: "utc",
    startOutputType: "utc",
    duration: { minutes: BOOKING_RULES.callMinutes },
    title: "15-minute call with Mike (Leverage AI)",
    description: `At the time of the call, open ${origin}/book/ and press "Talk with Mike now".`,
    url: `${origin}/book/`,
    organizer: { name: "Mike Schlottig", email: "mike@leverageai.network" },
    status: b.status === "cancelled" ? "CANCELLED" : "CONFIRMED",
  });
  return error || !value ? null : value;
}

/** Bearer EVENTS_TOKEN (or ?token= for EventSource, which cannot set headers), compared in constant time. */
async function authorized(request: Request, env: BookingEnv, url: URL) {
  const auth = request.headers.get("authorization") ?? "";
  const presented = auth.startsWith("Bearer ") ? auth.slice(7) : url.searchParams.get("token") ?? "";
  const expected = env.EVENTS_TOKEN ?? "";
  if (!expected || !presented) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all(
    [presented, expected].map(async (s) => new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)))),
  );
  const subtle = crypto.subtle as SubtleCrypto & { timingSafeEqual?: (x: ArrayBufferView, y: ArrayBufferView) => boolean };
  return subtle.timingSafeEqual ? subtle.timingSafeEqual(a, b) : a.every((v, i) => v === b[i]);
}

/** POST /api/booking/:id/brief: the hourly watcher hands in its prep brief; it is emailed to the owners. */
async function emailBrief(request: Request, env: BookingEnv & { DB: D1Database }, id: string) {
  const body = (await request.json().catch(() => null)) as { markdown?: string } | null;
  const markdown = String(body?.markdown ?? "").trim();
  if (markdown.length < 40) return json({ ok: false, error: "brief too short" }, 400);
  const b = await env.DB.prepare("SELECT * FROM booking WHERE id = ?").bind(id).first<BookingRow>();
  if (!b) return json({ ok: false, error: "unknown booking" }, 404);
  if (!env.NOTIFY || !env.NOTIFY_FROM_EMAIL) return json({ ok: false, error: "NOTIFY not configured" }, 503);
  const owners = (env.BOOKING_ALERT_EMAILS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const subject = `Prep brief: ${b.name}${b.business ? ` (${b.business})` : ""} · ${formatIn(b.slot_start, BOOKING_RULES.timeZone)}`;
  const results = await Promise.allSettled(
    owners.map((to) =>
      env.NOTIFY!.send({ to, from: { email: env.NOTIFY_FROM_EMAIL!, name: "Leverage AI booking watcher" }, subject, text: markdown.slice(0, 60_000), replyTo: b.email }),
    ),
  );
  const failed = results.flatMap((r) => (r.status === "rejected" ? [String(r.reason)] : []));
  if (failed.length) console.error("brief email failures", { booking: id, failed });
  return json({ ok: failed.length === 0, sent: results.length - failed.length, failed });
}

async function eventsStream(request: Request, env: BookingEnv & { DB: D1Database }, url: URL) {
  if (!(await authorized(request, env, url))) return new Response("Unauthorized", { status: 401 });
  const enc = new TextEncoder();

  let last = Number(request.headers.get("last-event-id") ?? url.searchParams.get("since") ?? 0) || 0;
  const once = url.searchParams.has("once");
  const db = env.DB;
  const stream = new ReadableStream({
    async start(controller) {
      const flush = async () => {
        const { results } = await db
          .prepare("SELECT seq, type, payload FROM booking_event WHERE seq > ? ORDER BY seq LIMIT 500")
          .bind(last)
          .all<{ seq: number; type: string; payload: string }>();
        for (const r of results) {
          controller.enqueue(enc.encode(`id: ${r.seq}\nevent: ${r.type}\ndata: ${r.payload}\n\n`));
          last = r.seq;
        }
      };
      controller.enqueue(enc.encode("retry: 10000\n\n"));
      await flush();
      if (!once) {
        const end = Date.now() + 55_000;
        while (Date.now() < end) {
          await new Promise((resolve) => setTimeout(resolve, 5_000));
          controller.enqueue(enc.encode(": ping\n\n"));
          await flush();
        }
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" },
  });
}

/** Returns a Response for /api/booking/* routes, or null when the path is not a booking route. */
export async function handleBooking(request: Request, env: BookingEnv, url: URL): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/booking")) return null;
  if (!env.DB) return json({ ok: false, error: "Booking is not configured." }, 503);
  const e = env as BookingEnv & { DB: D1Database };
  const origin = env.BOOKING_PUBLIC_ORIGIN ?? url.origin;
  const path = url.pathname.replace(/\/+$/, "");

  if (path === "/api/booking/slots" && request.method === "GET") {
    const slots = await currentSlots(e.DB);
    return json({ ok: true, timeZone: BOOKING_RULES.timeZone, callMinutes: BOOKING_RULES.callMinutes, slots });
  }

  if (path === "/api/booking" && request.method === "POST") {
    const requestOrigin = request.headers.get("origin");
    if (requestOrigin && requestOrigin !== url.origin && requestOrigin !== origin) {
      return json({ ok: false, error: "Invalid request origin." }, 403);
    }
    return createBooking(request, e, origin);
  }

  if (path === "/api/booking/events" && request.method === "GET") return eventsStream(request, e, url);

  const brief = /^\/api\/booking\/([0-9a-f-]{36})\/brief$/.exec(path);
  if (brief && request.method === "POST") {
    if (!(await authorized(request, e, url))) return new Response("Unauthorized", { status: 401 });
    return emailBrief(request, e, brief[1]);
  }

  const ics = /^\/api\/booking\/([0-9a-f-]{36})\.ics$/.exec(path);
  if (ics && request.method === "GET") {
    const b = await findBooking(e.DB, ics[1], url.searchParams.get("t") ?? "");
    const body = b && icsFor(b, origin);
    if (!body) return new Response("Not found", { status: 404 });
    return new Response(body, {
      headers: { "content-type": "text/calendar; charset=utf-8", "content-disposition": 'attachment; filename="call-with-mike.ics"' },
    });
  }

  const cancel = /^\/api\/booking\/([0-9a-f-]{36})\/cancel$/.exec(path);
  if (cancel) {
    const token = url.searchParams.get("t") ?? "";
    const b = await findBooking(e.DB, cancel[1], token);
    if (!b) return page("Booking not found", "<p>This link is not valid. If you need help, email mike@leverageai.network.</p>", 404);
    const when = formatIn(b.slot_start, b.visitor_tz || BOOKING_RULES.timeZone);
    if (b.status === "cancelled") return page("Already cancelled", `<p>Your call on ${when} is already cancelled.</p><a class="b" href="${origin}/book/">Book another time</a>`);
    // GET only confirms (mail scanners prefetch links); the POST cancels.
    if (request.method === "GET") {
      return page("Cancel your call?", `<p>${when}</p><form method="POST"><button type="submit">Cancel this call</button></form>`);
    }
    if (request.method === "POST") {
      const at = new Date().toISOString();
      const updated: BookingRow = { ...b, status: "cancelled" };
      await e.DB.batch([
        e.DB.prepare("UPDATE booking SET status = 'cancelled' WHERE id = ? AND status = 'booked'").bind(b.id),
        e.DB.prepare("INSERT INTO booking_event (booking_id, type, payload, created_at) VALUES (?, 'booking.cancelled', ?, ?)")
          .bind(b.id, JSON.stringify(eventPayload(updated, origin)), at),
      ]);
      await notify(e, updated, "cancelled", origin);
      return page("Cancelled", `<p>Your call on ${when} is cancelled.</p><a class="b" href="${origin}/book/">Book another time</a>`);
    }
  }

  return json({ ok: false, error: "Not found." }, 404);
}
