#!/usr/bin/env node
/**
 * Gates for the scheduled release (.github/workflows/scheduled-release.yml), following the
 * workers-staged-release skill: a known answer first, proof the override reaches the new build,
 * then every URL in the build's own sitemap must answer 200.
 *
 *   node scripts/release-gates.mjs changed            built sitemap vs live sitemap; sets GITHUB_OUTPUT changed=true|false
 *   node scripts/release-gates.mjs staged <version>   gate a version staged at 0% through the version-override header
 *   node scripts/release-gates.mjs live               gate production, no override
 *
 * Run from the repo root after `pnpm build` (reads dist/sitemap-0.xml). Exit 1 on any failure.
 */
import { appendFileSync, readFileSync } from 'node:fs';

const HOST = 'https://leverageai.network';
const WORKER = 'astro-leverage-ai-site-rebuild';
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const built = locs(readFileSync('dist/sitemap-0.xml', 'utf8'));

async function status(url, version) {
  const headers = { Accept: 'text/html' };
  if (version) headers['Cloudflare-Workers-Version-Overrides'] = `${WORKER}="${version}"`;
  const response = await fetch(url, { redirect: 'manual', headers, signal: AbortSignal.timeout(30000) });
  await response.arrayBuffer();
  return response.status;
}

/** Re-ask up to three times: a promotion or staging takes a moment to reach every colo. */
async function settle(url, version, want) {
  let got;
  for (let attempt = 0; attempt < 3; attempt++) {
    got = await status(url, version);
    if (got === want) return got;
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  return got;
}

const mode = process.argv[2];
const failures = [];
const expect = (ok, message) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${message}`);
  if (!ok) failures.push(message);
};

if (mode === 'changed') {
  const live = locs(await (await fetch(`${HOST}/sitemap-0.xml`, { headers: { 'Cache-Control': 'no-cache' } })).text());
  const added = built.filter((url) => !live.includes(url));
  const removed = live.filter((url) => !built.includes(url));
  console.log(`built ${built.length} URLs, live ${live.length}; added ${added.length}, removed ${removed.length}`);
  for (const url of added) console.log(`  + ${url}`);
  for (const url of removed) console.log(`  - ${url}`);
  const changed = added.length > 0 || removed.length > 0;
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  process.exit(0);
}

if (mode !== 'staged' && mode !== 'live') {
  console.error('usage: release-gates.mjs changed | staged <version> | live');
  process.exit(2);
}
const version = mode === 'staged' ? process.argv[3] : undefined;
if (mode === 'staged' && !version) {
  console.error('staged needs a version id');
  process.exit(2);
}

expect((await settle(`${HOST}/api/contact`, version, 405)) === 405, 'known answer: GET /api/contact is 405');

if (mode === 'staged') {
  const live = locs(await (await fetch(`${HOST}/sitemap-0.xml`, { headers: { 'Cache-Control': 'no-cache' } })).text());
  const added = built.filter((url) => !live.includes(url));
  const removed = live.filter((url) => !built.includes(url));
  if (added.length === 0 && removed.length === 0) {
    console.log('NOTE  the page set is unchanged, so the override cannot be proved by contrast (forced release only)');
  }
  // Cloudflare silently ignores an unknown override and serves production, so each difference is proof.
  for (const url of added) {
    expect((await status(url)) === 404, `new page is absent from production before promotion: ${url}`);
    expect((await settle(url, version, 200)) === 200, `override reaches the new build: ${url} is 200 on the staged version`);
    if (failures.length > 0) break;
  }
  for (const url of removed) {
    if (failures.length > 0) break;
    expect((await status(url)) === 200, `retired page is still in production before promotion: ${url}`);
    expect((await settle(url, version, 404)) === 404, `override reaches the new build: ${url} is 404 on the staged version`);
  }
  if (failures.length > 0) {
    console.error('\nthe override did not reach the staged version; stopping before the full sweep');
    process.exit(1);
  }
}

for (const url of built) {
  const got = await settle(url, version, 200);
  if (got !== 200) expect(false, `${url} answers ${got}, expected 200`);
}
expect(failures.length === 0, `every URL in the built sitemap answers 200 (${built.length} checked)`);

if (failures.length > 0) {
  console.error(`\n${failures.length} gate failure(s)`);
  process.exit(1);
}
