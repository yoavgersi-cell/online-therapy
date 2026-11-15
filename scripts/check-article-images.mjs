#!/usr/bin/env node
// Build gate: every article must have an image. Legacy articles in the manifest
// marked "backlog" are allowed until their image is generated; any other article
// without an image fails the build, so new articles cannot go live without one.
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
import { seedFiles } from "./seed-articles.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "scripts/article-image-manifest.json"), "utf8"));
const backlog = new Map(manifest.items.map((i) => [i.slug, i]));

const slugs = new Set();
for (const f of seedFiles()) {
  const text = readFileSync(f, "utf8");
  for (const m of text.matchAll(/(?:slug: "([a-z0-9-]+)"|"slug": "([a-z0-9-]+)")/g)) slugs.add(m[1] || m[2]);
}
// keep only real article slugs: those with a heroColor line in their block (excludes nothing else in the seed)
const failures = [], warnings = [];
for (const slug of slugs) {
  const { findArticle } = await import("./seed-articles.mjs");
  const a = findArticle(slug);
  if (!a || !/heroColor/.test(a.block)) continue;
  if (a.hasImage) {
    const img = (a.block.match(/"?image"?:\s*"([^"]+)"/) || [])[1];
    if (img && img.startsWith("/") && !existsSync(resolve(ROOT, "public" + img))) failures.push(`${slug}: image file public${img} is missing`);
    continue;
  }
  const item = backlog.get(slug);
  if (item?.backlog) warnings.push(`${slug}: no image yet (backlog, queued)`);
  else failures.push(`${slug}: article has no image. Add an entry to scripts/article-image-manifest.json and run node scripts/generate-article-images.mjs --apply --slug ${slug}`);
}
for (const w of warnings) console.log("warn:", w);
if (failures.length) { console.error(failures.map((f) => "FAIL: " + f).join("\n")); process.exit(1); }
console.log(`article images ok: ${slugs.size} articles checked, ${warnings.length} in backlog`);
