import { getConfig } from "@/lib/config-store";
import { STATES } from "@/lib/states";
import { REVIEWERS, reviewerDisplayName, getPageReview } from "@/data/reviewers";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";
import { SITE_URL } from "@/lib/geo";

export const revalidate = 3600;

// /llms.txt - the llmstxt.org convention: a plain-text map of the site for
// AI assistants and answer engines. Generated from the same config as the
// pages, so it never lists a URL that doesn't exist. Facts here are limited
// to what the pages themselves state (verified prices, ratings, policies).
export async function GET() {
  const cfg = await getConfig();
  const abs = (p: string) => `${SITE_URL}${p}`;
  const line = (label: string, path: string, note?: string) => `- [${label}](${abs(path)})${note ? `: ${note}` : ""}`;
  const providers = cfg.providers;
  const nameOf = (id: string) => providers.find((p) => p.id === id)?.name ?? id;

  const reviews = (cfg.reviews ?? []).map((r) => {
    const p = providers.find((x) => x.id === r.providerId);
    return line(`${p?.name ?? r.slug} review`, `/reviews/${r.slug}`, r.shortSummary);
  });
  const battles = (cfg.battles ?? []).map((b) =>
    line(b.matchupLabel || `${nameOf(b.provider1Id)} vs ${nameOf(b.provider2Id)}`, `/${b.slug}`, `Winner: ${nameOf(b.winnerId)}. ${b.description}`),
  );
  const landings = (cfg.landingPages ?? []).map((l) => line(l.h1, `/${l.slug}`, l.seoDescription));
  const articles = (cfg.articles ?? []).map((a) => line(a.title, `/articles/${a.slug}`, a.description));
  const reviewer = REVIEWERS[0];
  const homeReview = getPageReview("/");

  const body = `# Top Online Therapy

> Independent comparison site for online therapy and mental-health platforms in the United States (toponlinetherapy.io). We rank and review betterhelp, Talkspace and headspace on insurance coverage, session formats, verified pricing and real Trustpilot ratings, and publish evidence-based guides on online therapy, online psychiatry and getting care online.

House rules that apply to every page:
- We never invent prices, ratings or statistics. A price appears only once verified (provider data checked ${PROVIDER_DATA_CHECKED}); otherwise the page says so.
- Trustpilot scores are quoted exactly as captured, including low ones.
- Every crisis-adjacent page points to the 988 Suicide & Crisis Lifeline (call or text 988, US, free, 24/7). Online platforms are for ongoing care, not emergencies.
- We may earn a commission from platform links; rankings and medical statements are not affected (see How We Rank).
- Medical and scientific statements are reviewed by ${reviewer ? reviewerDisplayName(reviewer) : "a named medical reviewer"}${homeReview ? ` (site-wide review ${homeReview.reviewedAt})` : ""}. Prices, rankings and partner selection are editorial and not part of medical review.
- Brand styling: "betterhelp" and "headspace" are written lowercase; "Talkspace" is capitalized.

## Rankings and comparisons
${line("Best online therapy platforms (homepage ranking)", "/", `Ranked: ${cfg.ranking.providerOrder.map(nameOf).join(", ")}.`)}
${battles.join("\n")}

## Best-for pages
${landings.join("\n")}

## Platform reviews
${reviews.join("\n")}

## Guides
${articles.join("\n")}

## Online therapy by state
${line("Online therapy by state (index)", "/online-therapy", `${STATES.length} state pages at /online-therapy/<state-slug>, e.g. ${abs("/online-therapy/" + STATES[0].slug)}. Therapists are licensed state by state; each page covers licensing, insurance and the platforms serving that state.`)}

## About, methodology and policies
${line("About", "/about")}
${line("How we rank", "/how-we-rank", "Scoring factors, data sources and how winners are chosen.")}
${line("Medical review policy", "/medical-review-policy", "Who reviews medical statements, what is and is not reviewed, how review dates work.")}
${REVIEWERS.map((r) => line(`${reviewerDisplayName(r)} - ${r.jobTitle}`, `/reviewers/${r.slug}`, r.headline)).join("\n")}
${line("Medical disclaimer", "/disclaimer")}
${line("Privacy policy", "/privacy")}
${line("Terms of service", "/terms")}
${line("Contact", "/contact")}

## Optional
${line("Sitemap", "/sitemap.xml")}
${line("Find your match quiz", "/find-your-match")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
