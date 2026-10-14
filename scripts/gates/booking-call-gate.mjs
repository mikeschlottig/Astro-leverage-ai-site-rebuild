// Browser release gate for /book/ and the click-to-call button on /contact/.
// Uses the installed Playwright + Chromium with fake camera/mic. Never Claude in Chrome.
//
//   keyring exec -p click-to-call -- node scripts/gates/booking-call-gate.mjs <book|call|away> [versionId]
//
// versionId (optional) pins every leverageai.network request to a staged Worker version via
// Cloudflare-Workers-Version-Overrides (see skill workers-staged-release). The desk's "Accept calls"
// state is restored to whatever it was before the run. Screenshots go to $GATE_OUT (default: os tmpdir).
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

const require = createRequire(process.env.PLAYWRIGHT_FROM ?? "/home/mikes/spreadsheetx/package.json");
const { chromium } = require("playwright");

const SITE = "https://leverageai.network";
const DESK = "https://call.leverageai.network/admin";
const phase = process.argv[2] ?? "book";
const version = process.argv[3];
const OUT = process.env.GATE_OUT ?? os.tmpdir();
const shot = (name) => path.join(OUT, `gate-${name}.png`);
const log = (...a) => console.log(`[${phase}]`, ...a);

if (phase !== "book" && !process.env.ADMIN_PASSWORD) {
  console.error("ADMIN_PASSWORD required: run under `keyring exec -p click-to-call --`");
  process.exit(2);
}

const browser = await chromium.launch({
  args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", "--autoplay-policy=no-user-gesture-required"],
});
const pinSite = async (ctx) => {
  if (!version) return;
  const header = { "Cloudflare-Workers-Version-Overrides": `astro-leverage-ai-site-rebuild="${version}"` };
  await ctx.route(/^https:\/\/leverageai\.network\//, (route) => route.continue({ headers: { ...route.request().headers(), ...header } }));
};

async function desk(available) {
  const ctx = await browser.newContext({ permissions: ["camera", "microphone"], viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();
  await open(page, DESK);
  // A sub-resource can also die on ERR_NETWORK_CHANGED, leaving the SPA blank: reload until the form renders.
  for (let attempt = 1; !(await page.locator('input[type="password"]').isVisible({ timeout: 10000 }).catch(() => false)); attempt++) {
    if (attempt >= 4) throw new Error("desk sign-in form never rendered");
    log(`desk blank, reload ${attempt}`);
    await page.reload().catch(() => undefined);
    await page.locator('input[type="password"]').waitFor({ timeout: 10000 }).catch(() => undefined);
  }
  await page.fill('input[type="password"]', process.env.ADMIN_PASSWORD);
  await page.click('button:has-text("Sign in")');
  const box = page.locator('label:has-text("Accept calls") input[type="checkbox"]');
  await box.waitFor({ timeout: 15000 });
  await page.locator("header").getByText(/^(Available|Away)$/).waitFor({ timeout: 15000 }); // presence socket is up
  const initial = await box.isChecked();
  await setAvailable(page, box, available);
  log(`desk signed in · Accept calls was ${initial}, now ${await box.isChecked()}`);
  return { ctx, page, box, initial };
}

async function setAvailable(page, box, value) {
  await box.setChecked(value);
  await page.locator("header").getByText(value ? "Available" : "Away", { exact: true }).waitFor({ timeout: 10000 });
}

async function restore(owner) {
  await setAvailable(owner.page, owner.box, owner.initial);
  log("desk restored · Accept calls =", await owner.box.isChecked());
}

async function visitorOnContact() {
  const ctx = await browser.newContext({ permissions: ["camera", "microphone"], viewport: { width: 1280, height: 900 } });
  await pinSite(ctx);
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && log("visitor console error:", m.text().slice(0, 160)));
  await open(page, `${SITE}/contact/`);
  await page.waitForFunction(() => !!document.getElementById("c2c-btn"), null, { timeout: 15000 });
  log("floating widget button hidden:", await page.evaluate(() => getComputedStyle(document.getElementById("c2c-widget-root")).display === "none"));
  await page.click("[data-call-now]");
  const frame = page.frameLocator("#c2c-panel iframe");
  await frame.locator("input").first().fill("TEST visitor (Claude gate)");
  await frame.locator('button:has-text("Start video call")').click();
  return { ctx, page };
}

// WSL mirrored networking makes Chromium throw ERR_NETWORK_CHANGED now and then; retry only that error.
async function open(page, url) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await page.goto(url);
    } catch (error) {
      if (attempt >= 4 || !String(error).includes("ERR_NETWORK_CHANGED")) throw error;
      log(`goto retry ${attempt} after ERR_NETWORK_CHANGED: ${url}`);
      await page.waitForTimeout(1500);
    }
  }
}

const videoSizes = (target) =>
  target.evaluate(() => [...document.querySelectorAll("video")].map((x) => `${x.videoWidth}x${x.videoHeight}`));

try {
  if (phase === "book") {
    for (const vp of [{ width: 1280, height: 900, tag: "desktop" }, { width: 390, height: 844, tag: "mobile" }]) {
      const ctx = await browser.newContext({ viewport: vp, timezoneId: "America/New_York" });
      await pinSite(ctx);
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await open(page, `${SITE}/book/`);
      await page.locator(".slot").first().waitFor({ timeout: 15000 });
      const n = await page.locator(".slot").count();
      const first = await page.locator(".slot").first().getAttribute("aria-label");
      const satClosed = await page.evaluate(() => document.querySelector("calendar-date").isDateDisallowed(new Date("2026-10-17T00:00:00Z")));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const formShown = await page.locator("[data-booking-form]").isVisible();
      const confirmShown = await page.locator("[data-confirmation]").isVisible();
      log(`${vp.tag}: ${n} slots on first day · first "${first}" · Sat 10-17 closed ${satClosed} · horizontal overflow ${overflow} · console errors ${errors.length}`);
      log(`${vp.tag}: before choosing a slot · form visible ${formShown} · confirmation visible ${confirmShown} (both must be false)`);
      if (formShown || confirmShown) process.exitCode = 1;
      await page.screenshot({ path: shot(`book-${vp.tag}`), fullPage: true });
      if (vp.tag === "desktop" && process.env.GATE_SUBMIT === "1") {
        await page.locator(".slot").nth(n - 1).click();
        await page.fill('input[name="name"]', "TEST - Claude UI gate");
        await page.fill('input[name="email"]', "ceo@leverageai.network");
        await page.fill('input[name="business"]', "Leverage AI (test)");
        await page.click("[data-book-button]");
        await page.waitForFunction(() => !!document.querySelector("[data-confirmation-text]")?.textContent?.trim(), null, { timeout: 15000 });
        log("UI booking confirmed:", (await page.locator("[data-confirmation-text]").textContent())?.trim(), "· ics", await page.locator("[data-ics]").getAttribute("href"));
        await page.screenshot({ path: shot("book-confirmed"), fullPage: true });
      }
      await ctx.close();
    }
  }

  if (phase === "call") {
    const owner = await desk(true);
    try {
      const v = await visitorOnContact();
      await owner.page.locator('button:has-text("Accept with video")').click({ timeout: 20000 });
      log("owner accepted with video");
      const visitorFrame = v.page.frames().find((f) => f.url().includes("/call"));
      // Pass = every <video> on both sides is rendering frames (remote and self view).
      const started = Date.now();
      let bothLive = false;
      while (Date.now() - started < 30000 && !bothLive) {
        await owner.page.waitForTimeout(2000);
        const sizes = [...(await videoSizes(owner.page)), ...(await videoSizes(visitorFrame))];
        bothLive = sizes.length >= 4 && sizes.every((s) => s !== "0x0");
      }
      log(`all video elements live: ${bothLive} after ${Math.round((Date.now() - started) / 1000)}s`);
      if (!bothLive) process.exitCode = 1;
      log("owner <video> sizes:", JSON.stringify(await videoSizes(owner.page)));
      log("visitor <video> sizes:", JSON.stringify(await videoSizes(visitorFrame)));
      await owner.page.screenshot({ path: shot("call-owner") });
      await v.page.screenshot({ path: shot("call-visitor") });
    } finally {
      await restore(owner);
    }
  }

  if (phase === "away") {
    const owner = await desk(false);
    try {
      const v = await visitorOnContact();
      await v.page.waitForTimeout(6000);
      const visitorFrame = v.page.frames().find((f) => f.url().includes("/call"));
      log("visitor sees:", (await visitorFrame.locator("body").innerText()).replace(/\s+/g, " ").slice(0, 300));
      await v.page.screenshot({ path: shot("away-visitor") });
    } finally {
      await restore(owner);
    }
  }
} catch (error) {
  process.exitCode = 1;
  console.error(`[${phase}] FAILED:`, String(error).split("\n")[0]);
  let i = 0;
  for (const ctx of browser.contexts()) for (const p of ctx.pages()) {
    const file = shot(`${phase}-failure-${i++}`);
    await p.screenshot({ path: file }).catch(() => undefined);
    console.error(`[${phase}] failure screenshot: ${file} · url ${p.url()}`);
  }
} finally {
  await browser.close();
}
