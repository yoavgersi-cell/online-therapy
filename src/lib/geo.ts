// ───── GEO (Generative Engine Optimization) helpers ─────
// One Organization entity, referenced by @id from every page's JSON-LD, so AI
// answer engines (Google AI Overviews, ChatGPT search, Perplexity, Claude,
// Copilot) resolve the publisher, its policies and its reviewer consistently.
// Also: provider entities with their official sites (verified, well-known
// domains only), the site's authoritative citations, and the list of AI
// crawlers robots.txt explicitly allows.
import { SOURCES_BY_VERTICAL } from "@/components/medical-sources";
import { SITE_ORIGIN, SITE_NAME, getReviewer, reviewerUrl } from "@/data/reviewers";

export const SITE_URL = SITE_ORIGIN;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Compact reference to the publisher - spread as `publisher` / `author`. */
export function orgRef() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
  };
}

/** Full Organization entity, emitted once in the root layout. */
export function organizationSchema() {
  const reviewer = getReviewer();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["toponlinetherapy.io"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
    description:
      "Independent comparison publisher for online therapy and mental-health platforms: verified pricing, insurance coverage, session formats and Trustpilot ratings for betterhelp, Talkspace and headspace, plus evidence-based guides reviewed for medical accuracy.",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Online therapy",
      "Teletherapy platforms",
      "Online psychiatry and medication management",
      "Therapy insurance coverage and copays",
      "Cognitive behavioral therapy (CBT)",
      "betterhelp",
      "Talkspace",
      "headspace",
    ],
    publishingPrinciples: `${SITE_URL}/how-we-rank`,
    correctionsPolicy: `${SITE_URL}/medical-review-policy`,
    ethicsPolicy: `${SITE_URL}/disclaimer`,
    ...(reviewer && {
      employee: [{ "@type": "Person", "@id": `${reviewerUrl(reviewer)}#person`, name: reviewer.name, jobTitle: reviewer.jobTitle, url: reviewerUrl(reviewer) }],
    }),
    contactPoint: { "@type": "ContactPoint", contactType: "editorial", url: `${SITE_URL}/contact` },
  };
}

/** WebSite entity, emitted once in the root layout. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: ["toponlinetherapy.io", "Top Online Therapy .io"],
    url: SITE_URL,
    inLanguage: "en-US",
    description: "Compare trusted online therapy platforms side by side.",
    publisher: { "@id": ORG_ID },
  };
}

// Official websites of the platforms we cover. Well-known public domains, not
// affiliate links - used only to disambiguate the entity in structured data.
export const PROVIDER_OFFICIAL_SITES: Record<string, string> = {
  betterhelp: "https://www.betterhelp.com",
  talkspace: "https://www.talkspace.com",
  headspace: "https://www.headspace.com",
};

/** Schema entity for a platform we review, for `about` / `mentions`. */
export function providerEntity(p: { id: string; name: string; tagline?: string }) {
  const url = PROVIDER_OFFICIAL_SITES[p.id];
  return {
    "@type": "Organization",
    name: p.name,
    ...(url && { url, sameAs: [url] }),
    ...(p.tagline && { description: p.tagline }),
  };
}

/** The site's authoritative sources as schema `citation` entries. */
export function citations(vertical = "online-therapy") {
  return (SOURCES_BY_VERTICAL[vertical] ?? []).map((s) => ({
    "@type": "CreativeWork",
    name: s.label,
    url: s.href,
    publisher: { "@type": "Organization", name: s.publisher },
  }));
}

/**
 * AI and search crawlers explicitly allowed in robots.txt. A blanket `*`
 * already allows them; naming them removes any ambiguity for operators that
 * check for an explicit rule, and documents the policy in one place.
 */
export const AI_CRAWLERS = [
  // OpenAI (ChatGPT search, training, user-triggered fetches)
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (AI Overviews / Gemini grounding use Googlebot; Google-Extended governs training)
  "Googlebot",
  "Google-Extended",
  // Microsoft (Bing, Copilot)
  "Bingbot",
  // Apple (Siri / Apple Intelligence)
  "Applebot",
  "Applebot-Extended",
  // Others
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
  "MistralAI-User",
  "CCBot",
];
