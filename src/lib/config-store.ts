import { type SiteConfig } from "./config";
import { onlineTherapyConfig } from "./seeds/online-therapy";

// ─────────────────────────────────────────────────────────────────────────────
// Single-vertical config store.
//
// This site is a single, standalone online-therapy vertical whose content is
// code-authoritative (src/lib/seeds/online-therapy.ts), so config-store is a
// thin accessor: every page calls getConfig() and gets the online-therapy
// config. The `vertical` argument is accepted (so existing call sites keep
// compiling) but ignored - there is only one vertical here.
// ─────────────────────────────────────────────────────────────────────────────

export async function getConfig(_vertical?: string): Promise<SiteConfig> {
  return onlineTherapyConfig;
}

// No-op: content is code-authoritative on this site (no blob CMS). Kept so the
// admin/api routes that import it continue to type-check.
export async function saveConfig(_config: SiteConfig, _vertical?: string): Promise<void> {
  return;
}
