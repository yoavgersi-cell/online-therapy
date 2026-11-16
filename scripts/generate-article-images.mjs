#!/usr/bin/env node
// Generates article images with the OpenAI Images API and wires them into the seed.
// Usage:
//   node scripts/generate-article-images.mjs              # dry run: shows the next 5 prompts
//   node scripts/generate-article-images.mjs --apply      # generates and writes the next 5
//   node scripts/generate-article-images.mjs --apply --limit 1 --slug online-therapy-guide
// The API key is injected by the session's network proxy; this script never reads or sends it.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { findArticle, setArticleImage } from "./seed-articles.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = resolve(ROOT, "scripts/article-image-manifest.json");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const LIMIT = Number(args[args.indexOf("--limit") + 1]) || 5;
const ONLY = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
const MODEL = "gpt-image-2";
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
  // curl is used on purpose: it honours the sandbox HTTPS proxy, which Node fetch does not.
  // The proxy attaches the API key; the body goes through a temp file, not the command line.
  const dir = mkdtempSync(resolve(tmpdir(), "img-"));
  const bodyFile = resolve(dir, "body.json");
  writeFileSync(bodyFile, JSON.stringify({ model: MODEL, prompt: prompt(item), size: SIZE, quality: "medium", n: 1 }));
  const out = execFileSync("curl", ["-sS", "--max-time", "240", "-w", "\n%{http_code}", "-H", "content-type: application/json",
    "--data-binary", `@${bodyFile}`, "https://api.openai.com/v1/images/generations"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const cut = out.lastIndexOf("\n");
  const status = Number(out.slice(cut + 1)); const payload = out.slice(0, cut);
  if (status !== 200) { console.error(`API ${status} for ${item.slug}: ${payload.slice(0, 200)}`); process.exit(1); }
  const json = JSON.parse(payload);
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
