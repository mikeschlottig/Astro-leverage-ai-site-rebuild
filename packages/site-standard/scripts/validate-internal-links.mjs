#!/usr/bin/env node
/**
 * Guard: internal page links must use the trailing-slash route that Astro
 * actually serves, and the linked route must exist in the built output.
 *
 * Usage: node scripts/validate-internal-links.mjs dist/
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { collectHtmlFiles, readHtml, parseArgs, fail, pass } from './lib.mjs';

const { distDir } = parseArgs(process.argv);
const files = collectHtmlFiles(distDir);
if (files.length === 0) fail(`No HTML files found under "${distDir}" — did the build run?`);

const LINK = /<a\s[^>]*href=["']([^"']+)["'][^>]*>/gi;
const FILE_PATH = /\/[^/]+\.[a-z0-9]+$/i;
const violations = [];

for (const file of files) {
  const html = readHtml(file);

  for (const match of html.matchAll(LINK)) {
    const href = match[1];
    if (href === undefined || !href.startsWith('/') || href.startsWith('//')) continue;

    const path = href.split(/[?#]/, 1)[0] ?? '/';
    if (path.startsWith('/api/') || FILE_PATH.test(path)) continue;

    if (path !== '/' && !path.endsWith('/')) {
      violations.push({ file, href, problem: 'internal page link is missing its trailing slash' });
      continue;
    }

    const target = path === '/'
      ? join(distDir, 'index.html')
      : join(distDir, ...path.split('/').filter(Boolean), 'index.html');

    if (!existsSync(target)) {
      violations.push({ file, href, problem: 'internal page link points to a route absent from dist' });
    }
  }
}

if (violations.length > 0) {
  for (const violation of violations) {
    console.error(`  ${violation.file}\n    ${violation.href}: ${violation.problem}`);
  }
  fail(`${violations.length} internal-link violation(s) in ${files.length} pages.`);
}

pass(`internal page links verified across ${files.length} pages (trailing slash + route exists).`);
