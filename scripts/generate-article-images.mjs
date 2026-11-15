#!/usr/bin/env node
// Generates article images with the OpenAI Images API and wires them into the seed.
// Usage:
//   node scripts/generate-article-images.mjs              # dry run: shows the next 5 prompts
//   node scripts/generate-article-images.mjs --apply      # generates and writes the next 5
//   node scripts/generate-article-images.mjs --apply --limit 1 --slug online-therapy-guide
// The API key is injected by the session's network proxy; this script never reads or sends it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { findArticle, setArticleImage } from "./seed-articles.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = resolve(ROOT, "scripts/article-image-manifest.json");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || 5;
const ONLY = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
const MODEL = "gpt-image-1";
const SIZE = "1536x1024";

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const todo = manifest.items
  .filter((i) => i.status !== "done" && (!ONLY || i.slug === ONLY))
  .filter((i) => { const a = findArticle(i.slug); return a && !a.hasImage; })
  .sort((a, b) => a.priority - b.priority)
  .slice(0, LIMIT);

if (todo.length === 0) { console.log("Nothing to do: every queued article already has an image."); process.exit(0); }

const prompt = (item) => `${manifest.style}\n\nScene: ${item.scene}`;

for (const item of todo) {
  console.log(`\n[${item.slug}] ${APPLY ? "generating" : "dry run"}\n${prompt(item)}\nalt: ${item.alt}`);
  if (!APPLY) continue;
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt: prompt(item), size: SIZE, quality: "medium", n: 1 }),
  });
  if (!res.ok) { console.error(`API ${res.status} for ${item.slug}: ${(await res.text()).slice(0, 200)}`); process.exit(1); }
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) { console.error(`no image data for ${item.slug}`); process.exit(1); }
  mkdirSync(resolve(ROOT, "public/article-images"), { recursive: true });
  const rel = `/article-images/${item.slug}.png`;
  writeFileSync(resolve(ROOT, "public" + rel), Buffer.from(b64, "base64"));
  setArticleImage(item.slug, rel, item.alt);
  item.status = "done";
  item.generatedAt = new Date().toISOString().slice(0, 10);
  console.log(`wrote public${rel} and set image + imageAlt in the seed`);
}
if (APPLY) writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
