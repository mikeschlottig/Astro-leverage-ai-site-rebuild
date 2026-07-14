#!/usr/bin/env node
/**
 * Guard: canonical == served URL (audit finding N4; directory CI guard #2).
 * For every built page, the canonical must be exactly:
 *   SITE_URL + route (trailing-slash-always convention)
 * — never the www host, never a slash-less variant that redirects.
 *
 * Usage: SITE_URL=https://example.com node scripts/validate-canonicals.mjs dist/
 */
import { collectHtmlFiles, readHtml, routeForFile, isExcludedRoute, parseArgs, fail, pass } from './lib.mjs';

const { distDir, siteUrl } = parseArgs(process.argv);
if (siteUrl === undefined) fail('SITE_URL is required for canonical validation.');
if (!/^https:\/\/[a-z0-9.-]+$/i.test(siteUrl)) {
  fail(`SITE_URL must be an https origin with no path/trailing slash. Received: "${siteUrl}"`);
}

const files = collectHtmlFiles(distDir);
if (files.length === 0) fail(`No HTML files found under "${distDir}" — did the build run?`);

const violations = [];
for (const file of files) {
  const route = routeForFile(distDir, file);
  if (isExcludedRoute(route)) continue;
  const html = readHtml(file);
  const match = html.match(/<link\s[^>]*rel=["']canonical["'][^>]*>/i);
  if (match === null) {
    violations.push({ file, problem: 'missing canonical <link>' });
    continue;
  }
  const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
  const actual = hrefMatch?.[1];
  const expected = `${siteUrl}${route}`;
  if (actual !== expected) {
    violations.push({ file, problem: `canonical is "${actual ?? '(none)'}", expected "${expected}"` });
  }
}

if (violations.length > 0) {
  for (const v of violations) console.error(`  ${v.file}\n    ${v.problem}`);
  fail(`${violations.length} canonical violation(s) in ${files.length} pages.`);
}
pass(`canonicals verified on ${files.length} pages (policy: apex + trailing slash).`);
