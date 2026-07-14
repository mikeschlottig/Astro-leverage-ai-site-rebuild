#!/usr/bin/env node
/**
 * Guard: leaked-drafting-language lint (audit finding N2).
 * Scans built HTML for phrases that address source documents, briefs, or the
 * generation process instead of the reader. Any hit fails the build.
 *
 * Usage: node scripts/lint-banned-phrases.mjs dist/
 */
import { collectHtmlFiles, readHtml, parseArgs, fail, pass } from './lib.mjs';

const BANNED = [
  /\bthe reference (?:page|pages|doc|docs|document|documents)\b/i,
  /\bschema package reference\b/i,
  /\bthe provided (?:content|copy|text|material)\b/i,
  /\bper the (?:brief|spec|prompt|instructions)\b/i,
  /\bas an ai\b/i,
  /\bthe source (?:document|material)s?\b/i,
  /\b(?:lorem ipsum|placeholder text|TODO:|TKTK)\b/i,
];

const { distDir } = parseArgs(process.argv);
const files = collectHtmlFiles(distDir);
if (files.length === 0) fail(`No HTML files found under "${distDir}" — did the build run?`);

const violations = [];
for (const file of files) {
  // Strip script/style so JSON-LD and JS strings can't false-positive.
  const html = readHtml(file).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ');
  for (const pattern of BANNED) {
    const match = html.match(pattern);
    if (match !== null) violations.push({ file, phrase: match[0] });
  }
}

if (violations.length > 0) {
  for (const v of violations) console.error(`  ${v.file}\n    banned phrase: "${v.phrase}"`);
  fail(`${violations.length} banned-phrase violation(s) in ${files.length} pages.`);
}
pass(`banned-phrase lint clean across ${files.length} pages.`);
