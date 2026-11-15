// Shared helpers: find article blocks across the seed files (both the TS-literal
// and JSON-style key formats) and set image fields on them.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const SEED_DIR = new URL("../src/lib/seeds/", import.meta.url).pathname;

export function seedFiles() {
  return readdirSync(SEED_DIR).filter((f) => f.endsWith(".ts") && /article/.test(f)).map((f) => join(SEED_DIR, f));
}

// Returns { file, text, start, end, hasImage } for an article slug, or null.
export function findArticle(slug) {
  for (const file of seedFiles()) {
    const text = readFileSync(file, "utf8");
    const re = new RegExp(`(slug: "${slug}"|"slug": "${slug}")`);
    const m = re.exec(text);
    if (!m) continue;
    // block = from the nearest preceding "{" line to the matching closing brace line
    const start = text.lastIndexOf("{", m.index);
    let depth = 0, end = -1;
    for (let i = start; i < text.length; i++) {
      if (text[i] === "{") depth++;
      else if (text[i] === "}") { depth--; if (depth === 0) { end = i; break; } }
    }
    const block = text.slice(start, end + 1);
    return { file, text, start, end, block, hasImage: /(^|\n)\s*"?image"?:/m.test(block) };
  }
  return null;
}

// Inserts image + imageAlt after the heroColor line of the article block.
export function setArticleImage(slug, imagePath, alt) {
  const found = findArticle(slug);
  if (!found) throw new Error(`article ${slug} not found in seed files`);
  const { file, text, block, start, end } = found;
  const json = /"slug":/.test(block);
  const quote = (s) => JSON.stringify(s);
  const hm = /\n([ \t]*)("?heroColor"?:[^\n]*\n)/.exec(block);
  if (!hm) throw new Error(`no heroColor line in ${slug}`);
  const ind = hm[1];
  const lines = json
    ? `${ind}"image": ${quote(imagePath)},\n${ind}"imageAlt": ${quote(alt)},`
    : `${ind}image: ${quote(imagePath)},\n${ind}imageAlt: ${quote(alt)},`;
  const insertAt = start + hm.index + hm[0].length;
  const updated = text.slice(0, insertAt) + lines + "\n" + text.slice(insertAt);
  writeFileSync(file, updated);
  return file;
}
