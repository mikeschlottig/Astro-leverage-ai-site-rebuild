#!/usr/bin/env node
/**
 * Guard: every indexable page's structured data validates against the schema.org
 * vocabulary AND Google's documented Rich Results requirements.
 *
 * It composes two maintained libraries and defines no rules of its own:
 *   @marbec/web-auto-extractor      pulls JSON-LD / microdata / RDFa out of the built HTML
 *   @adobe/structured-data-validator checks it against schema.org and Google Rich Results
 *
 * The schema.org vocabulary is pinned to SCHEMA_ORG_VERSION and cached under node_modules/.cache.
 * Bump the version deliberately; the release list is https://schema.org/docs/releases.html.
 *
 * Usage: node scripts/validate-structured-data.mjs dist/
 * Exit 1 on any ERROR or WARNING on an indexable page.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import WebAutoExtractor from '@marbec/web-auto-extractor';
import Validator from '@adobe/structured-data-validator';
import {
  collectHtmlFiles,
  readHtml,
  routeForFile,
  isExcludedRoute,
  parseArgs,
  fail,
  pass,
} from '../packages/site-standard/scripts/lib.mjs';

const SCHEMA_ORG_VERSION = '30.1';
const VOCAB_URL = `https://schema.org/version/${SCHEMA_ORG_VERSION}/schemaorg-all-https.jsonld`;
const CACHE = join(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', '.cache');
const CACHE_FILE = join(CACHE, `schemaorg-${SCHEMA_ORG_VERSION}-all-https.jsonld`);

async function loadVocabulary() {
  if (!existsSync(CACHE_FILE)) {
    const response = await fetch(VOCAB_URL);
    if (!response.ok) fail(`Cannot download schema.org ${SCHEMA_ORG_VERSION} vocabulary: HTTP ${response.status} ${VOCAB_URL}`);
    mkdirSync(CACHE, { recursive: true });
    writeFileSync(CACHE_FILE, Buffer.from(await response.arrayBuffer()));
  }
  return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
}

const { distDir } = parseArgs(process.argv);
const files = collectHtmlFiles(distDir);
if (files.length === 0) fail(`No HTML files found under "${distDir}" — did the build run?`);

const validator = new Validator(await loadVocabulary());
const extractor = new WebAutoExtractor({ addLocation: true, embedSource: ['rdfa', 'microdata'] });
const NOINDEX = /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i;

const findings = [];
let checked = 0;
for (const file of files) {
  const route = routeForFile(distDir, file);
  const html = readHtml(file);
  if (isExcludedRoute(route) || NOINDEX.test(html)) continue;
  checked++;
  const issues = await validator.validate(extractor.parse(html));
  for (const issue of issues) findings.push({ route, ...issue });
}

if (findings.length > 0) {
  const byMessage = new Map();
  for (const f of findings) {
    const key = `${f.severity}: ${f.issueMessage} [${(f.fieldNames ?? []).join(', ')}] @ ${f.path?.map((p) => p.type ?? p).join('>')}`;
    const entry = byMessage.get(key) ?? { routes: [], count: 0 };
    entry.count++;
    if (entry.routes.length < 3) entry.routes.push(f.route);
    byMessage.set(key, entry);
  }
  for (const [key, entry] of byMessage) console.error(`  ${key}\n    ${entry.count} page(s), e.g. ${entry.routes.join(' ')}`);
  fail(`${findings.length} structured-data issue(s) across ${checked} indexable pages (schema.org ${SCHEMA_ORG_VERSION} + Google Rich Results).`);
}
pass(`structured data valid on ${checked} indexable pages (schema.org ${SCHEMA_ORG_VERSION} + Google Rich Results, zero errors or warnings).`);
