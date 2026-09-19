// The Top Online Therapy provider audit - the "what we verified" registry.
//
// Every row is a fact the operator verified against the provider's own
// published information (pricing pages, plan terms, certification pages).
// Rules, in order of importance:
//   1. NEVER add a row that hasn't been verified. A missing row means "not
//      verified" - the component simply doesn't show it. No TBD, no guesses.
//   2. A provider with no entry renders no audit at all. That is the correct
//      state for providers whose data is still incomplete.
//   3. Values must agree with the same numbers shown elsewhere on the site
//      (price index, review pricing plans, battle cost math). One source of
//      truth in substance, even where the strings are hand-written.
//   4. When pricing changes, update the row AND bump PROVIDER_DATA_CHECKED
//      in @/lib/config only after actually re-checking.

export interface ProviderAuditEntry {
  rows: { label: string; value: string }[];
}

// Keyed "<vertical>:<providerId>" so a provider that exists in two verticals
// (e.g. maximus in hair-loss and trt) can carry a separate audit per vertical.
// Empty on this single-vertical build - add an "online-therapy:<providerId>" entry only
// when every row has been verified against the provider's own published data.
export const PROVIDER_AUDITS: Record<string, ProviderAuditEntry> = {};
