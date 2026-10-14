// Open-slot generation for /book/. Pure functions: no I/O, so they run under `node --test`.
// Hours: Mon–Fri 8:00–18:00 America/Los_Angeles (Mike, 2026-10-13). A slot is a 15-minute call; slots start
// every 30 minutes, which gives the 15-minute buffer without any overlap logic.

export const BOOKING_RULES = {
  timeZone: "America/Los_Angeles",
  weekdays: [1, 2, 3, 4, 5], // 0 = Sunday
  startMinute: 8 * 60,
  endMinute: 18 * 60,
  stepMinutes: 30,
  callMinutes: 15,
  horizonDays: 14,
  minNoticeMinutes: 120,
} as const;

export type Slot = { start: string; day: string; localMinute: number };

const MINUTE_MS = 60_000;

/** YYYY-MM-DD of `instant` as seen in `timeZone`. */
export const dayKeyIn = (instant: Date, timeZone: string): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(instant);

/** Calendar arithmetic on YYYY-MM-DD keys (UTC-based, so no local-time parsing). */
export const addDays = (dayKey: string, days: number): string => {
  const d = new Date(`${dayKey}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const weekdayOf = (dayKey: string): number => new Date(`${dayKey}T12:00:00Z`).getUTCDay();

/**
 * UTC offset of `timeZone` in minutes (e.g. -420 for PDT) for the given day, read at 12:00 UTC. That is
 * 04:00–05:00 Pacific, after the 02:00 DST switch, so it is the offset in force during business hours.
 */
export const offsetMinutes = (dayKey: string, timeZone: string): number => {
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
      .formatToParts(new Date(`${dayKey}T12:00:00Z`))
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(name);
  if (!m) return 0;
  const minutes = Number(m[2]) * 60 + Number(m[3]);
  return m[1] === "-" ? -minutes : minutes;
};

/** UTC instant of `localMinute` minutes after local midnight on `dayKey` in `timeZone`. */
export const localToUtc = (dayKey: string, localMinute: number, timeZone: string): Date =>
  new Date(Date.parse(`${dayKey}T00:00:00Z`) + (localMinute - offsetMinutes(dayKey, timeZone)) * MINUTE_MS);

export function openSlots(
  now: Date,
  booked: ReadonlySet<string>,
  blackoutDays: ReadonlySet<string>,
  rules = BOOKING_RULES,
): Slot[] {
  const earliest = now.getTime() + rules.minNoticeMinutes * MINUTE_MS;
  const today = dayKeyIn(now, rules.timeZone);
  const slots: Slot[] = [];
  for (let i = 0; i < rules.horizonDays; i++) {
    const day = addDays(today, i);
    if (!(rules.weekdays as readonly number[]).includes(weekdayOf(day)) || blackoutDays.has(day)) continue;
    for (let m = rules.startMinute; m + rules.callMinutes <= rules.endMinute; m += rules.stepMinutes) {
      const start = localToUtc(day, m, rules.timeZone);
      if (start.getTime() < earliest) continue;
      const iso = start.toISOString();
      if (booked.has(iso)) continue;
      slots.push({ start: iso, day, localMinute: m });
    }
  }
  return slots;
}
