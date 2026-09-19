// Three-way brand comparisons (/{a}-vs-{b}-vs-{c}).
//
// This standalone site does not use three-way comparison pages - all
// matchups are two-way battles served at the root. The registry below is kept
// EMPTY so the shared page templates that import these symbols still compile,
// while nothing three-way ever renders. The type exports are preserved for the
// same reason.

// Field shape retained so the (unused, empty) three-way page template still
// type-checks against MATRIX_ROWS. TRIO_FACTS is empty, so none of these render.
export interface TrioFacts {
  id: string;
  semaglutide: string;
  tirzepatide: string;
  billing: string;
  shipping: string;
  support: string;
  guarantee: string;
  standout: string;
}

// Empty on this single-vertical build - no three-way pages are generated.
export const TRIO_FACTS: Record<string, TrioFacts> = {};

export interface ThreeWayFaq {
  question: string;
  answer: string;
}

export interface ThreeWayComparison {
  slug: string;
  providerIds: [string, string, string];
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  verdict: string;
  faqs: ThreeWayFaq[];
}

// Empty registry: no three-way comparisons on this site.
export const THREE_WAY_COMPARISONS: ThreeWayComparison[] = [];

export const threeWayBySlug = new Map<string, ThreeWayComparison>(
  THREE_WAY_COMPARISONS.map((t) => [t.slug, t]),
);
