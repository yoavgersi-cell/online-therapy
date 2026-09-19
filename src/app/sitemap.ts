import type { MetadataRoute } from "next";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, latestUpdate, NOINDEX_ARTICLE_SLUGS } from "@/lib/config";
import { STATES } from "@/lib/states";

const SITE_URL = "https://www.toponlinetherapy.io";
const FALLBACK_DATE = new Date(CONTENT_LAST_UPDATED);
const flooredLastModified = (updatedAt?: string) => new Date(latestUpdate(updatedAt));

// Single-vertical online-therapy sitemap. All content comes from the code seed.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cfg = await getConfig();

  const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/reviews", priority: 0.9, changeFrequency: "weekly" },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" },
    { path: "/online-therapy", priority: 0.8, changeFrequency: "weekly" },
    { path: "/find-your-match", priority: 0.7, changeFrequency: "monthly" },
    { path: "/how-we-rank", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.3, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.3, changeFrequency: "monthly" },
    { path: "/disclaimer", priority: 0.2, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: FALLBACK_DATE,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Provider reviews
  for (const r of cfg.reviews ?? []) {
    entries.push({
      url: `${SITE_URL}/reviews/${r.slug}`,
      lastModified: flooredLastModified(r.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Head-to-head battle pages (served at the root)
  for (const b of cfg.battles ?? []) {
    entries.push({
      url: `${SITE_URL}/${b.slug}`,
      lastModified: flooredLastModified(b.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Segment / "best online therapy for X" landing pages (served at the root)
  for (const lp of cfg.landingPages ?? []) {
    entries.push({
      url: `${SITE_URL}/${lp.slug}`,
      lastModified: flooredLastModified(lp.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Programmatic per-state pages
  for (const s of STATES) {
    entries.push({
      url: `${SITE_URL}/online-therapy/${s.slug}`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Articles / guides
  for (const a of cfg.articles ?? []) {
    if (NOINDEX_ARTICLE_SLUGS.includes(a.slug)) continue;
    entries.push({
      url: `${SITE_URL}/articles/${a.slug}`,
      lastModified: flooredLastModified(a.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
