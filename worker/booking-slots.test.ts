// Run: node --test worker/booking-slots.test.ts   (Node 24 strips TypeScript types natively)
import { test } from "node:test";
import assert from "node:assert/strict";
import { openSlots, localToUtc, offsetMinutes, dayKeyIn, BOOKING_RULES } from "./booking-slots.ts";

const TZ = BOOKING_RULES.timeZone;
const none = new Set<string>();

test("PDT and PST offsets on either side of the 2026-11-01 switch", () => {
  assert.equal(offsetMinutes("2026-10-30", TZ), -420);
  assert.equal(offsetMinutes("2026-11-01", TZ), -480);
  assert.equal(offsetMinutes("2026-11-02", TZ), -480);
});

test("8:00 Pacific maps to the right UTC instant in PDT and in PST", () => {
  assert.equal(localToUtc("2026-10-30", 480, TZ).toISOString(), "2026-10-30T15:00:00.000Z");
  assert.equal(localToUtc("2026-11-02", 480, TZ).toISOString(), "2026-11-02T16:00:00.000Z");
});

test("a weekday has 20 slots, 8:00 through 17:30 Pacific", () => {
  // Sunday evening Pacific, so Monday 2026-10-19 is fully in range.
  const now = new Date("2026-10-19T02:00:00Z");
  const monday = openSlots(now, none, none).filter((s) => s.day === "2026-10-19");
  assert.equal(monday.length, 20);
  assert.equal(monday[0].start, "2026-10-19T15:00:00.000Z"); // 08:00 PDT
  assert.equal(monday.at(-1)!.start, "2026-10-20T00:30:00.000Z"); // 17:30 PDT
});

test("weekends are closed", () => {
  const now = new Date("2026-10-16T02:00:00Z");
  const days = new Set(openSlots(now, none, none).map((s) => s.day));
  assert.ok(!days.has("2026-10-17") && !days.has("2026-10-18"));
});

test("2-hour minimum notice", () => {
  const now = new Date("2026-10-19T16:10:00Z"); // 09:10 PDT
  const first = openSlots(now, none, none)[0];
  assert.equal(first.start, "2026-10-19T18:30:00.000Z"); // 11:30 PDT is the first slot at or after 11:10
});

test("booked slots and blackout days are excluded", () => {
  const now = new Date("2026-10-19T02:00:00Z");
  const booked = new Set(["2026-10-19T15:00:00.000Z"]);
  const slots = openSlots(now, booked, new Set(["2026-10-20"]));
  assert.ok(!slots.some((s) => s.start === "2026-10-19T15:00:00.000Z"));
  assert.ok(!slots.some((s) => s.day === "2026-10-20"));
});

test("horizon is 14 calendar days", () => {
  const now = new Date("2026-10-19T02:00:00Z");
  const last = openSlots(now, none, none).at(-1)!;
  assert.equal(last.day, "2026-10-30"); // today 10-18 + 13 days = 10-31 (Sat) → last weekday 10-30
});

test("dayKeyIn uses Pacific, not UTC", () => {
  assert.equal(dayKeyIn(new Date("2026-10-20T03:00:00Z"), TZ), "2026-10-19");
});
