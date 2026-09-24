import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS, latestUpdate, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import { PRODUCT_CATALOG } from "@/lib/product-catalog";
import { enhanceArticleHtml } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExpertByline } from "@/components/expert-byline";
import { MedicalSources } from "@/components/medical-sources";
import { ProductCarousel } from "@/components/product-carousel";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { TopProvidersBlock } from "@/components/top-providers-block";
import { ComparisonCard } from "@/components/comparison-card";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { notFound, permanentRedirect } from "next/navigation";

// Code-side CTR overrides and quick-answer boxes for high-impression articles
// were a weight-loss-vertical feature (applied only when ctx.vertical ===
// "weight-loss"). This single-vertical build keeps the maps empty so the
// article pages render purely from the ED config (src/lib/seeds/ed.ts); add an
// an entry here only with real, verified figures if CTR tuning is ever needed.
const ARTICLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {};

const ARTICLE_QUICK_ANSWERS: Record<string, string> = {};

export async function articleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const article = (config.articles ?? []).find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const url = canonicalUrl(ctx, `/articles/${slug}`);

  // CTR override (code-controlled) wins over stored meta for target articles.
  const override = ctx.vertical === "weight-loss" ? ARTICLE_SEO_OVERRIDES[slug] : undefined;

  return {
    title: override?.title ?? article.title,
    description: override?.description ?? article.description,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : NOINDEX_ARTICLE_SLUGS.includes(slug)
        ? { index: false, follow: true }
        : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      siteName: "Top Online Therapy",
      title: override?.title ?? article.title,
      description: override?.description ?? article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: latestUpdate(article.updatedAt),
      authors: [article.author || ctx.brandDomain],
    },
  };
}

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function ArticlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const articles = config.articles ?? [];
  const experts = config.experts ?? [];

  // Head-to-head provider comparisons are canonical at the root battle URL.
  // If a battle owns this slug, consolidate /articles/<slug> → /<slug> (301/308)
  // so a duplicate or stale /articles/ URL doesn't compete with the battle page.
  if ((config.battles ?? []).some((b) => b.slug === slug)) {
    permanentRedirect(hubLink(ctx, `/${slug}`));
  }

  // Cannibalization consolidation: the generic "best telehealth providers"
  // article competed with the ranking homepage for the exact query cluster the
  // homepage should own ("best telehealth weight loss", "best online weight
  // loss clinic"). Its equity 301s to the homepage instead.
  if (slug === "best-weight-loss-telehealth-providers") {
    permanentRedirect(hubLink(ctx, "/"));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Brand-cluster articles (is-embody-legit, happyhead-cost, ...) carry the
  // provider id as a slug segment. On those, surface the provider's real
  // social proof - Trustpilot and Reddit carousels - high on the page.
  // Exact segment match so "ro" never fires inside "sprout". Trustpilot data
  // lives on the current vertical's own provider record, so it's safe on any
  // vertical; the Reddit registry is weight-loss-researched and stays gated
  // (a shared provider id like directmeds must not inherit those threads).
  const slugParts = slug.split("-");
  const subjectProvider = config.providers.find((p) => slugParts.includes(p.id));

  // On a single-brand legitimacy article ("is-<brand>-legit"), the product
  // carousel should showcase THAT brand only - competitors' products don't
  // belong on a page about whether this one provider is legit. Guarded so we
  // only restrict when the subject actually has affiliate catalog products
  // (otherwise fall back to the full catalog rather than an empty carousel).
  const isLegitArticle = /^is-.+-legit$/.test(slug);
  const restrictCarouselToSubject =
    isLegitArticle &&
    !!subjectProvider &&
    PRODUCT_CATALOG.some(
      (p) => p.providerId === subjectProvider.id && AFFILIATE_PROVIDER_IDS.includes(p.providerId),
    );
  const subjectTrustpilot =
    subjectProvider?.trustpilotReviews?.length ? subjectProvider : undefined;
  const subjectReddit =
    ctx.vertical === "weight-loss" && subjectProvider && REDDIT_COMMUNITY_FEEDBACK[subjectProvider.id]
      ? subjectProvider
      : undefined;

  // Conversion block: on select high-intent buyer guides that are otherwise all
  // prose, surface the site's top-ranked providers with the same ranked cards +
  // CTAs the comparison page uses, high on the page. Gated to specific slugs so
  // it never leaks onto informational articles.
  const TOP_PROVIDERS_CRO_SLUGS = new Set(["best-tirzepatide-online"]);
  const isWeightLoss = ctx.vertical === "weight-loss";
  const showTopProvidersCro = isWeightLoss && TOP_PROVIDERS_CRO_SLUGS.has(slug);
  // Every provider-"alternatives" guide (altrx-alternatives, best-ozempic-
  // alternatives, etc.) gets a CRO block featuring our three GLP-1 partners
  // (embody, altRx, trimrx) with the same comparison-page cards.
  const showPartnerCro = isWeightLoss && slug.endsWith("-alternatives");

  // Byline author: match the article's author to a team member, else the lead
  const author = experts.find((e) => e.name === article.author) ?? experts[0];

  // Top 3 providers, rendered with the SAME ComparisonCard used on the homepage.
  const { providerOrder, positions } = config.ranking;
  const topThreeCards = providerOrder
    .slice(0, 3)
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      return {
        id: provider.id,
        name: provider.name,
        tagline: provider.tagline,
        logo: provider.logo,
        highlights: provider.highlights,
        affiliateUrl: provider.affiliateUrl,
        ctaText: provider.ctaText,
        rank: index + 1,
        rating: position.score,
        ratingLabel: position.label,
        starRating: position.starRating,
        badge: position.badge,
      };
    })
    .filter(Boolean) as Array<{
      id: string; name: string; tagline: string; logo: string; highlights: string[];
      affiliateUrl: string; ctaText: string; rank: number; rating: number;
      ratingLabel: string; starRating?: number; badge?: string;
    }>;

  // Related articles: same category first, then others, exclude self, max 3
  const relatedArticles = [
    ...articles.filter(
      (a) => a.slug !== slug && a.category === article.category
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.category !== article.category
    ),
  ].slice(0, 3);

  const formattedDate = new Date(latestUpdate(article.updatedAt)).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );

  // Word count for schema
  const wordCount = article.sections.reduce(
    (sum, s) =>
      sum + s.body.replace(/<[^>]*>/g, "").split(/\s+/).length,
    0
  );

  // JSON-LD Article schema (enhanced)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: canonicalUrl(ctx, `/articles/${slug}/opengraph-image`),
    datePublished: article.publishedAt,
    dateModified: latestUpdate(article.updatedAt),
    wordCount,
    articleSection: article.category,
    author: author
      ? {
          "@type": "Person",
          name: author.credentials ? `${author.name}, ${author.credentials}` : author.name,
          jobTitle: author.role,
          url: canonicalUrl(ctx, "/about"),
        }
      : {
          "@type": "Organization",
          name: article.author || ctx.brandDomain,
          url: ctx.origin,
        },
    publisher: {
      "@type": "Organization",
      name: ctx.brandDomain,
      url: ctx.origin,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.origin}/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(ctx, `/articles/${slug}`),
    },
    keywords: [
      "online therapy",
      "teletherapy",
      "mental health",
      "online counseling",
      article.category.toLowerCase(),
      ...article.sections.map((s) => s.heading),
    ],
  };

  // JSON-LD Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(ctx, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: canonicalUrl(ctx, "/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl(ctx, `/articles/${slug}`),
      },
    ],
  };

  // FAQ schema - ONLY from sections that are genuinely question-shaped (heading
  // ends with "?"). Marking narrative section headings as FAQ questions is
  // non-compliant structured data (risk of a Google structured-data flag, and no
  // upside since FAQ rich results are gated to authoritative health/gov sites),
  // so we emit FAQPage only when there are at least two real questions.
  const faqEntries = article.sections.filter((s) => s.heading.trim().endsWith("?"));
  const faqSchema =
    faqEntries.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: {
              "@type": "Answer",
              text: s.body.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - light, so the dark masthead title/text stay readable
            (article.heroColor is intentionally not used as the header bg). */}
        <div className="w-full border-b border-gray-200 bg-[#E8F5EE]">
          <div className="mx-auto max-w-[1100px] px-4 py-7 sm:px-6 sm:py-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Articles", href: hubLink(ctx, "/articles") },
                { label: article.title },
              ]}
            />

            {/* Tight editorial masthead: eyebrow (category + read time) → H1 →
                short dek → low-weight byline/date. Spacing kept deliberately
                compact so the first mobile viewport reads like a publication,
                not a long SEO intro. */}
            <div className="mb-2.5 flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-[24px] font-bold leading-tight text-[#191919] sm:text-[32px]">
              {article.title}
            </h1>
            <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.55] text-gray-600 sm:text-[16px]">
              {article.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {author ? (
                <ExpertByline
                  expert={author}
                  label="Written by"
                  showRole={false}
                  compact
                />
              ) : (
                article.author && <span className="text-[12px] text-gray-500">By {article.author}</span>
              )}
              <span className="text-[12px] text-gray-400">Updated {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div>
          {/* On a brand legitimacy article ("is-<brand>-legit"), real user
              experiences answer the reader's core question first - so the
              operator-verified Reddit threads lead the page, above everything
              else. Other articles keep it mid-body (rendered in the loop). */}
          {isLegitArticle && subjectReddit && (
            <div className="mb-8">
              <RedditThreadCarousel
                providers={[subjectReddit]}
                reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
              />
            </div>
          )}
          {/* Direct answer up top (featured-snippet target) - code-injected so
              it also covers articles whose body lives in the CMS blob. */}
          {ctx.vertical === "weight-loss" && ARTICLE_QUICK_ANSWERS[slug] && (
            <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
              <div className="qa">
                <strong>The quick answer</strong>
                {ARTICLE_QUICK_ANSWERS[slug]}
              </div>
            </div>
          )}
          {/* Key takeaways - 3-4 verified bullets, scannable and quotable
              (featured snippets / AI overviews lift lists like this whole). */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-8 rounded-xl border border-[#1A7A52]/15 bg-[#F4F8FB] p-5 sm:p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#1A7A52]">Key takeaways</p>
              <ul className="space-y-2">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Table of contents - anchor jump-links. Signals structure to Google
              (eligible for "jump to" sitelinks) and improves navigation on long
              articles. Rendered only when there are enough sections to warrant it. */}
          {article.sections.length >= 4 && (
            <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">
                In this article
              </p>
              <ol className="space-y-1.5">
                {article.sections.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-snug">
                    <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
                    <a href={`#${slugifyHeading(s.heading)}`} className="text-[#1A7A52] hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <div key={i}>
                <section id={slugifyHeading(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#191919] scroll-mt-24">
                    {section.heading}
                  </h2>
                  {/* div (not p) so author HTML can include block elements -
                      lists, tables, callouts - styled via .article-body css */}
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#1A7A52] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#14634A]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>

                {/* Top-providers conversion block, right after the intro: the
                    ranked comparison-page cards + CTAs on an otherwise-prose
                    buyer guide. Gated per slug (see showTopProvidersCro). */}
                {i === 0 && showTopProvidersCro && (
                  <TopProvidersBlock
                    config={config}
                    linkPrefix={ctx.prefix}
                    limit={3}
                    title="Our top 3 tirzepatide providers"
                    subtitle="Ranked by price, plans and verified reviews - the same cards from our full comparison."
                  />
                )}

                {/* Provider-"alternatives" guides: CRO block of our three GLP-1
                    partners with the comparison-page cards (see showPartnerCro). */}
                {i === 0 && showPartnerCro && (
                  <TopProvidersBlock
                    config={config}
                    linkPrefix={ctx.prefix}
                    limit={3}
                    providerIds={["embody", "altrx", "trimrx"]}
                    title="Our top-rated GLP-1 providers"
                    subtitle="Our recommended telehealth providers - the same cards from our full comparison."
                  />
                )}

                {/* Subject-provider social proof, high on the page: Trustpilot
                    carousel after the first section, Reddit carousel after the
                    second (or first, on very short articles). Verified data
                    only - providers without it simply render nothing. */}
                {i === 0 && subjectTrustpilot && (
                  <div className="my-10">
                    <TrustpilotCarousel
                      providerName={subjectTrustpilot.name}
                      providerLogo={subjectTrustpilot.logo}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                  </div>
                )}
                {!isLegitArticle && i === Math.min(1, article.sections.length - 1) && subjectReddit && (
                  <div className="my-10">
                    <RedditThreadCarousel
                      providers={[subjectReddit]}
                      reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
                    />
                  </div>
                )}

                {/* Full-catalog product carousel mid-article (weight-loss only) -
                    after roughly the halfway section, never at the bottom. */}
                {ctx.vertical === "weight-loss" &&
                  i === Math.max(0, Math.ceil(article.sections.length / 2) - 1) && (
                    <div className="my-10">
                      <ProductCarousel
                        providers={config.providers}
                        onlyProviderIds={
                          restrictCarouselToSubject && subjectProvider ? [subjectProvider.id] : undefined
                        }
                        title={
                          restrictCarouselToSubject && subjectProvider
                            ? `Shop ${subjectProvider.name}'s GLP-1 plans`
                            : "Shop GLP-1 plans by product"
                        }
                        subtitle={
                          restrictCarouselToSubject && subjectProvider
                            ? `${subjectProvider.name}'s published plans - conditions shown under each price.`
                            : "Every provider's published plans - cheapest first, conditions under each price."
                        }
                        withSchema
                        pageUrl={canonicalUrl(ctx, `/articles/${slug}`)}
                      />
                    </div>
                  )}

                {/* Editorial callout after 4th section - GLP-1 copy, so
                    weight-loss articles only (it was leaking onto every
                    vertical's articles before this gate). */}
                {ctx.vertical === "weight-loss" && i === 3 && article.sections.length > 4 && (
                  <div className="my-10 overflow-hidden rounded-xl bg-transparent">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
                        <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#1A7A52] sm:text-[20px]">
                          What To Know Before Starting GLP-1 Treatment
                        </h3>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          Before starting GLP-1 treatment, it&apos;s important to understand a few key things. These medications require a prescription from a licensed clinician and aren&apos;t suitable for everyone. Some people may experience side effects, especially during the first few weeks as the body adjusts.
                        </p>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          GLP-1s also tend to work best when combined with basic lifestyle habits like balanced nutrition and regular physical activity.
                        </p>
                        <p className="text-[16px] leading-[1.75] text-gray-800">
                          That&apos;s why choosing a provider that offers proper medical screening and ongoing follow-up support is essential for both safety and long-term success.
                        </p>
                      </div>
                      <div className="flex items-center justify-center sm:w-[260px] sm:shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/editorial-injection.png"
                          alt="Woman preparing GLP-1 weight loss injection"
                          className="h-[200px] w-full object-cover sm:h-full sm:rounded-r-xl"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Inline provider CTA after 2nd section. Suppressed on
                    "is X legit" articles: a trust-check page advertising the
                    reviewed provider's competitors undermines the article's
                    credibility and cannibalizes its own conversion. */}
                {i === 1 && !/^is-.+-legit$/.test(slug) && topThreeCards.length > 0 && (
                  <section className="not-prose my-10">
                    <div className="mb-5">
                      <h2 className="text-[20px] font-bold text-[#191919] sm:text-[22px]">Our top-rated online therapy platforms</h2>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">
                        The same ranked cards from our full comparison - our top 3 picks.
                      </p>
                    </div>
                    <div className="space-y-4">
                      {topThreeCards.map((product) => (
                        <ComparisonCard
                          key={product.id}
                          product={product}
                          pageType="listing"
                          sourceFlow="main_comparison"
                          linkPrefix={ctx.prefix}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <p className="text-[18px] font-bold text-[#191919]">
              Ready to compare online therapy platforms?
            </p>
            <p className="mt-1 text-[14px] text-gray-500">
              See how top providers stack up on pricing, medical support, and
              treatment options.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubLink(ctx, "/")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#1A7A52] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#14634A]"
              >
                Compare Providers
              </Link>
              <Link
                href={hubLink(ctx, "/reviews")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Read the Reviews
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-5 text-[18px] font-bold text-[#191919]">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={hubLink(ctx, `/articles/${ra.slug}`)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-2 ${categoryColors[ra.category] || "bg-gray-100 text-gray-600"}`}
                    >
                      {ra.category}
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#1A7A52] transition-colors">
                      {ra.title}
                    </p>
                    <p className="mt-1.5 text-[12px] text-gray-400 line-clamp-2">
                      {ra.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={hubLink(ctx, `/articles/${prevArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#1A7A52] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Previous
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#1A7A52] transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={hubLink(ctx, `/articles/${nextArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md sm:text-right sm:flex-row-reverse"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#1A7A52] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Next
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#1A7A52] transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Contextual comparison hub (weight-loss): routes informational
              readers into the highest-intent comparison pages. Code-injected,
              so it also renders on articles whose bodies live in the CMS blob. */}
          {ctx.vertical === "weight-loss" && (
            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
              <h2 className="mb-1 text-[17px] font-bold text-[#191919]">Compare providers head-to-head</h2>
              <p className="mb-4 text-[13.5px] text-gray-500">
                Real prices, real trade-offs - the comparisons readers use to decide.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  { href: "/weight-loss/embody-vs-wellmedr", label: "embody vs wellmedr - $69 vs $59" },
                  { href: "/weight-loss/altrx-vs-embody", label: "altRx vs embody - $89 vs $69" },
                  { href: "/weight-loss/healthrx-vs-medvi", label: "HealthRx vs Medvi - prepaid vs monthly" },
                  { href: "/weight-loss/embody-vs-altrx-vs-wellmedr", label: "The budget trio: embody vs altRx vs wellmedr" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#1A7A52] transition-colors hover:border-[#1A7A52]/30 hover:bg-[#1A7A52]/[0.02]"
                  >
                    <span className="truncate">{c.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <MedicalSources vertical={ctx.vertical} />

          </div>
        </div>
      </div>
    </>
  );
}
