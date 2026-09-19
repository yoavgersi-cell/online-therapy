import { DEFAULT_VERTICAL } from "./config";

// ─────────────────────────────────────────────────────────────────────────────
// Site context (single-vertical build)
//
// This site is a single standalone vertical served at the domain root
// (toponlinetherapy.io), so there is no hub prefix and no per-vertical branding.
// The SiteContext shape and the helper exports are kept intact so the shared
// page components compile unchanged - every context is just the one root site.
// ─────────────────────────────────────────────────────────────────────────────

const ORIGIN = "https://www.toponlinetherapy.io";

// Retained for import compatibility; always true on this single-site build.
export const WEIGHT_LOSS_MIGRATED = true;

export interface SiteContext {
  vertical: string;
  /** Prefix for internal (relative) links. Always "" on this single-site build. */
  prefix: string;
  /** Absolute origin used for canonical / OpenGraph / schema URLs. */
  origin: string;
  /** Path prefix inside the canonical origin. Always "" here. */
  canonicalPrefix: string;
  /** Bare domain for schema Organization names. */
  brandDomain: string;
  /** Display name for schema author/publisher. */
  brandTeam: string;
  /** When true, pages in this context are kept out of the index. Always false here. */
  noindex: boolean;
}

export const ROOT_CONTEXT: SiteContext = {
  vertical: DEFAULT_VERTICAL,
  prefix: "",
  origin: ORIGIN,
  canonicalPrefix: "",
  brandDomain: "toponlinetherapy.io",
  brandTeam: "Top Online Therapy Team",
  noindex: false,
};

// Single-site build: every context is the root context (no hub verticals).
export function hubContext(_vertical: string): SiteContext {
  return ROOT_CONTEXT;
}

// Absolute canonical URL for an internal path.
export function canonicalUrl(ctx: SiteContext, path: string): string {
  const tail = path === "/" ? "" : path;
  return `${ctx.origin}${ctx.canonicalPrefix}${tail}`;
}

// Internal <Link> href for an internal path.
export function hubLink(ctx: SiteContext, path: string): string {
  if (path === "/") return ctx.prefix || "/";
  return `${ctx.prefix}${path}`;
}
