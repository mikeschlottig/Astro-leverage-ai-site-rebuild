// Run: node --test worker/noindex.test.ts   (Node 24 strips TypeScript types natively)
import { test } from "node:test";
import assert from "node:assert/strict";
import { isNonCanonicalHost, withNoindex } from "./noindex.ts";

const ok = () => new Response("<html></html>", { status: 200, headers: { "content-type": "text/html" } });

test("workers.dev hosts are non-canonical, the public domain is not", () => {
  assert.equal(isNonCanonicalHost("astro-leverage-ai-site-rebuild.ceo-a53.workers.dev"), true);
  assert.equal(isNonCanonicalHost("leverageai.network"), false);
  assert.equal(isNonCanonicalHost("workers.dev.example.com"), false);
});

test("workers.dev responses gain x-robots-tag and keep status, body and headers", async () => {
  const res = withNoindex(new Request("https://x.ceo-a53.workers.dev/pricing/"), ok());
  assert.equal(res.headers.get("x-robots-tag"), "noindex");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "text/html");
  assert.equal(await res.text(), "<html></html>");
});

test("redirects on workers.dev are also tagged and keep their location", () => {
  const redirect = new Response(null, { status: 301, headers: { location: "/services/" } });
  const res = withNoindex(new Request("https://x.ceo-a53.workers.dev/services/old/"), redirect);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "/services/");
  assert.equal(res.headers.get("x-robots-tag"), "noindex");
});

test("the public domain is returned untouched", () => {
  const original = ok();
  const res = withNoindex(new Request("https://leverageai.network/pricing/"), original);
  assert.equal(res, original);
  assert.equal(res.headers.get("x-robots-tag"), null);
});
