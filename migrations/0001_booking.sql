-- Booking tables for /book/ on leverageai.network.
-- Target: existing D1 `leverageai-forms` (also holds contact_submissions from the earlier site).
-- Design: docs/architecture/booking-and-call.md

-- Days off (YYYY-MM-DD, Pacific). Add rows with `wrangler d1 execute` to close a day without a deploy.
CREATE TABLE IF NOT EXISTS booking_blackout (
  day TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS booking (
  id           TEXT PRIMARY KEY,
  slot_start   TEXT NOT NULL,                 -- UTC ISO 8601
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  business     TEXT,
  website      TEXT,
  phone        TEXT,
  topic        TEXT,
  visitor_tz   TEXT,
  status       TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled')),
  cancel_token TEXT NOT NULL,
  created_at   TEXT NOT NULL
);

-- One active booking per slot; cancelling frees the slot.
CREATE UNIQUE INDEX IF NOT EXISTS booking_active_slot ON booking (slot_start) WHERE status = 'booked';
CREATE INDEX IF NOT EXISTS booking_slot_start ON booking (slot_start);

-- Append-only feed behind the SSE endpoint; seq is the SSE event id (Last-Event-ID replay).
CREATE TABLE IF NOT EXISTS booking_event (
  seq        INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id TEXT NOT NULL,
  type       TEXT NOT NULL,
  payload    TEXT NOT NULL,
  created_at TEXT NOT NULL
);
