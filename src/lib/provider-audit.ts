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
export const PROVIDER_AUDITS: Record<string, ProviderAuditEntry> = {
  // Verified against Talkspace's published pricing and insurance pages,
  // October 2026. Keep in sync with the review's pricingPlans.
  "online-therapy:talkspace": {
    rows: [
      { label: "Messaging Only", value: "$69/week, self-pay (individuals and teens 13-17)" },
      { label: "Video + Messaging", value: "$99/week - up to four 30-minute live sessions a month plus unlimited messaging" },
      { label: "Video + Messaging + Workshops", value: "$109/week" },
      { label: "Couples therapy", value: "$109/week - four joint 30-minute sessions a month plus messaging" },
      { label: "Extra live session", value: "$65 per session" },
      { label: "Psychiatry", value: "$299 initial evaluation, $175 per follow-up (self-pay)" },
      { label: "Insurance", value: "In-network with Aetna, Cigna, Optum, Anthem, Medicare, TRICARE and more; copays typically $0-$30" },
      { label: "Trustpilot", value: "4.4 across 2,370 reviews (Aug 2026)" },
    ],
  },
};
