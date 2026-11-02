// Curated topic-cluster links. Each article or landing page links to its
// cluster hub and to its closest siblings, with anchor text written for that
// page (never one repeated phrase across the site). Hand-maintained on purpose:
// an automatic "similar posts" widget links unrelated pages and dilutes
// relevance. Targets must exist; the site audit checks every href.

export interface RelatedLink {
  href: string;
  label: string;
}

const COST: RelatedLink[] = [
  { href: "/articles/online-therapy-cost", label: "Online therapy cost, with every verified price" },
  { href: "/articles/how-much-does-talkspace-cost", label: "Talkspace pricing, plan by plan" },
  { href: "/articles/how-much-does-betterhelp-cost", label: "What betterhelp costs and what to ask at signup" },
  { href: "/articles/how-much-does-headspace-cost", label: "headspace cost: the app versus therapy" },
  { href: "/cheapest-online-therapy", label: "The cheapest online therapy platforms, compared" },
  { href: "/articles/free-and-low-cost-therapy-options", label: "Free and low-cost therapy options that exist" },
];

const INSURANCE: RelatedLink[] = [
  { href: "/articles/does-insurance-cover-online-therapy", label: "Does insurance cover online therapy? The full guide" },
  { href: "/articles/online-therapy-that-takes-insurance", label: "Online therapy that takes insurance: the short version" },
  { href: "/articles/does-talkspace-take-insurance", label: "Does Talkspace take insurance?" },
  { href: "/articles/does-betterhelp-take-insurance", label: "Does betterhelp take insurance now?" },
  { href: "/best-online-therapy-with-insurance", label: "The best platforms for insured patients" },
];

const TRUST_BETTERHELP: RelatedLink[] = [
  { href: "/articles/is-betterhelp-legit", label: "Is betterhelp legit? The scorecard and scam check" },
  { href: "/reviews/betterhelp", label: "betterhelp review: verdict and trade-offs" },
  { href: "/articles/betterhelp-alternatives", label: "betterhelp alternatives, matched to why you're leaving" },
  { href: "/betterhelp-vs-talkspace", label: "betterhelp vs Talkspace head-to-head" },
];

const PSYCHIATRY: RelatedLink[] = [
  { href: "/articles/online-psychiatry", label: "How online psychiatry works and what it can prescribe" },
  { href: "/articles/therapy-vs-psychiatry", label: "Therapist vs psychiatrist: which do you need?" },
  { href: "/best-online-psychiatry", label: "Best online psychiatry platforms, compared" },
  { href: "/reviews/talkspace", label: "Talkspace review: therapy plus psychiatry" },
];

const CONDITIONS: RelatedLink[] = [
  { href: "/articles/online-therapy-for-anxiety", label: "Online therapy for anxiety: what helps" },
  { href: "/articles/online-therapy-for-depression", label: "Online therapy for depression: when it helps" },
  { href: "/articles/cbt-online", label: "CBT online: how a course works" },
  { href: "/articles/does-online-therapy-work", label: "Does online therapy work? The evidence" },
  { href: "/articles/types-of-therapy", label: "Types of therapy and the conditions each suits" },
];

const AUDIENCE: RelatedLink[] = [
  { href: "/online-therapy-for-women", label: "Online therapy for women: matching, cost, formats" },
  { href: "/online-family-therapy", label: "Online family therapy: platforms and formats" },
  { href: "/articles/online-couples-therapy", label: "Online couples therapy and what it costs" },
  { href: "/articles/what-is-family-therapy", label: "What is family therapy?" },
  { href: "/online-therapy-for-beginners", label: "Online therapy for beginners: your first session" },
];

const FORMAT: RelatedLink[] = [
  { href: "/articles/online-therapy-vs-in-person", label: "Online vs in-person therapy, honestly compared" },
  { href: "/articles/online-therapy-near-me", label: "Online therapy near me: why location barely matters" },
  { href: "/articles/how-to-choose-an-online-therapy-platform", label: "How to choose a platform in four questions" },
  { href: "/articles/online-therapy-guide", label: "The complete guide to online therapy" },
];

// Page slug -> its related links (self-links are removed at render time).
export const RELATED: Record<string, RelatedLink[]> = {
  // Cost cluster
  "online-therapy-cost": [...COST.slice(1), ...INSURANCE.slice(0, 2)],
  "how-much-does-talkspace-cost": [COST[0], COST[2], COST[4], INSURANCE[2]],
  "how-much-does-betterhelp-cost": [COST[0], COST[1], COST[4], INSURANCE[3]],
  "how-much-does-headspace-cost": [COST[0], COST[1], COST[4], TRUST_BETTERHELP[1]],
  "cheapest-online-therapy": [COST[0], COST[4], INSURANCE[4], COST[5]],
  "free-and-low-cost-therapy-options": [COST[4], INSURANCE[1], COST[0], AUDIENCE[4]],
  // Insurance cluster
  "does-insurance-cover-online-therapy": [INSURANCE[1], INSURANCE[2], INSURANCE[3], COST[0]],
  "online-therapy-that-takes-insurance": [INSURANCE[0], INSURANCE[2], INSURANCE[4], COST[0]],
  "does-talkspace-take-insurance": [INSURANCE[0], INSURANCE[1], COST[1], PSYCHIATRY[0]],
  "does-betterhelp-take-insurance": [INSURANCE[0], INSURANCE[1], TRUST_BETTERHELP[0], COST[2]],
  "best-online-therapy-with-insurance": [INSURANCE[0], INSURANCE[1], PSYCHIATRY[0], COST[0]],
  // Betterhelp trust cluster
  "is-betterhelp-legit": [TRUST_BETTERHELP[1], TRUST_BETTERHELP[2], TRUST_BETTERHELP[3], INSURANCE[3]],
  "betterhelp-alternatives": [TRUST_BETTERHELP[0], TRUST_BETTERHELP[3], COST[1], PSYCHIATRY[3]],
  // Psychiatry cluster
  "online-psychiatry": [PSYCHIATRY[1], PSYCHIATRY[2], PSYCHIATRY[3], INSURANCE[1]],
  "therapy-vs-psychiatry": [PSYCHIATRY[0], PSYCHIATRY[2], CONDITIONS[0], AUDIENCE[4]],
  "best-online-psychiatry": [PSYCHIATRY[0], PSYCHIATRY[1], PSYCHIATRY[3], INSURANCE[1]],
  // Conditions cluster
  "online-therapy-for-anxiety": [CONDITIONS[1], CONDITIONS[2], CONDITIONS[3], { href: "/best-online-therapy-for-anxiety", label: "Best online therapy platforms for anxiety" }],
  "online-therapy-for-depression": [CONDITIONS[0], CONDITIONS[2], CONDITIONS[3], PSYCHIATRY[1]],
  "best-online-therapy-for-anxiety": [CONDITIONS[0], CONDITIONS[2], PSYCHIATRY[1], FORMAT[0]],
  "cbt-online": [CONDITIONS[0], CONDITIONS[1], CONDITIONS[4], { href: "/best-online-therapy-for-anxiety", label: "Best online therapy for anxiety, compared" }],
  "does-online-therapy-work": [FORMAT[0], CONDITIONS[0], CONDITIONS[1], FORMAT[3]],
  "types-of-therapy": [CONDITIONS[2], CONDITIONS[0], CONDITIONS[4], AUDIENCE[2]],
  // Audience cluster
  "online-therapy-for-women": [AUDIENCE[1], AUDIENCE[4], CONDITIONS[0], FORMAT[1]],
  "online-family-therapy": [AUDIENCE[0], AUDIENCE[2], AUDIENCE[3], CONDITIONS[4]],
  "online-couples-therapy": [AUDIENCE[1], AUDIENCE[3], COST[1], CONDITIONS[4]],
  "what-is-family-therapy": [AUDIENCE[1], AUDIENCE[2], CONDITIONS[4], FORMAT[0]],
  "online-therapy-for-beginners": [FORMAT[3], FORMAT[2], AUDIENCE[0], CONDITIONS[4]],
  // Timeline article (new)
  "how-long-does-online-therapy-take-to-work": [CONDITIONS[0], CONDITIONS[1], FORMAT[2], FORMAT[0]],
  // Format cluster
  "online-therapy-vs-in-person": [FORMAT[1], FORMAT[2], CONDITIONS[3], FORMAT[3]],
  "online-therapy-near-me": [FORMAT[0], FORMAT[3], FORMAT[2], INSURANCE[0]],
  "how-to-choose-an-online-therapy-platform": [FORMAT[3], COST[0], INSURANCE[0], TRUST_BETTERHELP[3]],
};

export function relatedFor(slug: string, self: string): RelatedLink[] {
  const seen = new Set<string>();
  return (RELATED[slug] ?? []).filter((l) => {
    if (l.href === `/${self}` || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  }).slice(0, 4);
}
