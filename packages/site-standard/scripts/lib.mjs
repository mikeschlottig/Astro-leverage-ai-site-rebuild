/**
 * Shared helpers for post-build guards. Node built-ins only — zero deps.
 */
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/** Recursively collect .html files under a dist directory. */
export function collectHtmlFiles(distDir) {
  const results = [];
  const stack = [distDir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = readdirSync(current);
    } catch (error) {
      fail(`Cannot read directory "${current}": ${error instanceof Error ? error.message : String(error)}`);
    }
    for (const entry of entries) {
      const full = join(current, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) stack.push(full);
      else if (entry.endsWith('.html')) results.push(full);
    }
  }
  return results.sort();
}

export function readHtml(filePath) {
  return readFileSync(filePath, 'utf8');
}

/** dist/foo/bar/index.html -> "/foo/bar/", dist/404.html -> "/404.html" */
export function routeForFile(distDir, filePath) {
  const rel = relative(distDir, filePath).split('\\').join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

/** Pages excluded from indexability guards. */
export function isExcludedRoute(route) {
  return route === '/404.html' || route === '/500.html';
}

export function parseArgs(argv) {
  const distDir = argv[2];
  const siteUrl = process.env['SITE_URL'] ?? argv[3];
  if (distDir === undefined) {
    fail('Usage: node <script> <distDir> [siteUrl]   (siteUrl also read from SITE_URL env)');
  }
  return { distDir, siteUrl };
}

export function fail(message) {
  console.error(`\u001b[31m✖ ${message}\u001b[0m`);
  process.exit(1);
}

export function pass(message) {
  console.log(`\u001b[32m✔ ${message}\u001b[0m`);
}
