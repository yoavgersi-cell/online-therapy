#!/usr/bin/env node
// Checks the length of every page title and meta description written as a
// string literal in the content seeds, so a change that would be cut off in
// Google results is caught before it ships.
//
//   node scripts/check-meta-lengths.mjs            report only (exit 0)
//   node scripts/check-meta-lengths.mjs --strict   exit 1 if anything is over
//
// Limits: titles 60 characters, descriptions 160. These are the widths Google
// usually shows before truncating. Template strings with ${...} (for example
// the state-page template) are checked in their rendered form by the audit
// instead, so they are skipped here.

import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEED_DIR = join(ROOT, "src", "lib", "seeds");
const TITLE_MAX = 60;
const DESC_MAX = 160;
const strict = process.argv.includes("--strict");

const FIELD = /\b(title|description|seoTitle|seoDescription)\s*:\s*(["'])((?:\\.|(?!\2)[^\\\n])*)\2/g;

const violations = [];
let checked = 0;

for (const file of readdirSync(SEED_DIR).filter((f) => f.endsWith(".ts"))) {
  const path = join(SEED_DIR, file);
  const source = readFileSync(path, "utf8");
  // FIELD's \s* also spans newlines, so values on the line after the key are caught too.
  const hits = [...source.matchAll(FIELD)];
  for (const m of hits) {
    const [, key, , raw] = m;
    const value = raw.replace(/\\(.)/g, "$1");
    if (!value) continue;
    const isTitle = key === "title" || key === "seoTitle";
    const max = isTitle ? TITLE_MAX : DESC_MAX;
    checked++;
    if (value.length > max) {
      const line = source.slice(0, m.index).split("\n").length;
      violations.push({ file: `src/lib/seeds/${file}:${line}`, key, length: value.length, max, value });
    }
  }
}

if (violations.length === 0) {
  console.log(`OK: ${checked} titles and descriptions within limits.`);
} else {
  console.log(`${violations.length} of ${checked} over the limit:\n`);
  for (const v of violations) {
    console.log(`  ${v.file}  ${v.key}  ${v.length}/${v.max}`);
    console.log(`    ${v.value}`);
  }
}

if (strict && violations.length > 0) process.exit(1);
