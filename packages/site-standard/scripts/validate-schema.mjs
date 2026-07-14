#!/usr/bin/env node
/**
 * Guard: structured-data presence (audit finding N1).
 * Every indexable page must ship >= 1 parseable application/ld+json block
 * whose @graph (or root) includes an Organization node — proof the shared
 * SchemaGraph component actually rendered.
 *
 * Usage: node scripts/validate-schema.mjs dist/
 */
import { collectHtmlFiles, readHtml, routeForFile, isExcludedRoute, parseArgs, fail, pass } from './lib.mjs';

const { distDir } = parseArgs(process.argv);
const files = collectHtmlFiles(distDir);
if (files.length === 0) fail(`No HTML files found under "${distDir}" — did the build run?`);

const LD_JSON = /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi;

function nodesOf(parsed) {
  if (Array.isArray(parsed)) return parsed;
  if (parsed !== null && typeof parsed === 'object' && Array.isArray(parsed['@graph'])) return parsed['@graph'];
  return [parsed];
}

const violations = [];
for (const file of files) {
  const route = routeForFile(distDir, file);
  if (isExcludedRoute(route)) continue;
  const html = readHtml(file);
  const blocks = [...html.matchAll(LD_JSON)];
  if (blocks.length === 0) {
    violations.push({ file, problem: 'no application/ld+json block' });
    continue;
  }
  let hasOrganization = false;
  let parseError = null;
  for (const block of blocks) {
    const raw = (block[1] ?? '')
      .replace(/\\u003c/g, '<')
      .replace(/\\u003e/g, '>')
      .replace(/\\u0026/g, '&');
    try {
      const parsed = JSON.parse(raw);
      for (const node of nodesOf(parsed)) {
        const type = node !== null && typeof node === 'object' ? node['@type'] : undefined;
        const types = Array.isArray(type) ? type : [type];
        if (types.includes('Organization')) hasOrganization = true;
      }
    } catch (error) {
      parseError = error instanceof Error ? error.message : String(error);
    }
  }
  if (parseError !== null) violations.push({ file, problem: `unparseable JSON-LD: ${parseError}` });
  else if (!hasOrganization) violations.push({ file, problem: 'JSON-LD present but no Organization node' });
}

if (violations.length > 0) {
  for (const v of violations) console.error(`  ${v.file}\n    ${v.problem}`);
  fail(`${violations.length} schema violation(s) in ${files.length} pages.`);
}
pass(`JSON-LD verified on ${files.length} pages (>=1 block, parseable, Organization present).`);
