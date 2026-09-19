import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, Database, ShieldCheck, Scale, Trophy, RefreshCw, Check, X } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { ExpertTeam } from "@/components/expert-team";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.onlinetherapyhub.com/how-we-rank";

export const metadata: Metadata = {
  title: "How We Rank & Review Online Therapy Platforms - Our Methodology",
  description:
    "Our full methodology for ranking and reviewing online therapy platforms: the factors we score, where our data comes from, how we verify accuracy, and how we pick winners in head-to-head comparisons.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "How We Rank & Review Online Therapy Platforms - Our Methodology",
    description:
      "The factors we score, where our data comes from, how we verify accuracy, and how we pick winners in our online therapy platform comparisons.",
    url: CANONICAL,
    type: "article",
  },
};

const FACTORS = [
  { category: "Clinical Credibility", weight: "25%", desc: "Licensed, state-credentialed therapists and clinicians, quality of the intake and matching process, clear scope of care (therapy vs psychiatry vs self-guided practice), and privacy standards." },
  { category: "Care Access", weight: "20%", desc: "Speed of matching, session formats offered (video, phone, chat, messaging), specialty coverage such as couples or teen therapy, and how easily you can switch therapists." },
  { category: "Pricing & Value", weight: "20%", desc: "Insurance acceptance and copays, self-pay rates, financial aid and discounts, and what a plan actually includes per week - plus pricing transparency and the absence of hidden fees." },
  { category: "Member Experience", weight: "15%", desc: "Signup and intake process, app and interface quality, support responsiveness, billing clarity, and recent verified customer feedback." },
  { category: "Ongoing Support", weight: "10%", desc: "Between-session messaging, tools and worksheets, group sessions, and how the platform handles re-matching and continuity of care." },
  { category: "Flexibility", weight: "10%", desc: "Subscription terms, cancellation and pause policies, ability to change session formats, and payment options including HSA/FSA." },
];

const METHOD_FAQS = [
  {
    question: "How often are prices updated?",
    answer:
      "Whenever a provider changes its published rates. We re-verify each provider's pricing against its own site and revise every affected page - reviews, comparisons and cost breakdowns - and each page displays its last-updated date.",
  },
  {
    question: "Does affiliate status affect scores or rankings?",
    answer:
      "No. Partnerships can affect how providers are displayed, but never scores, review content, or head-to-head winners. Our verdicts regularly favor the cheaper or better-documented provider in a matchup, and our reviews cite real customer records - including mixed ones - for partners and non-partners alike.",
  },
  {
    question: "Why do some providers show no customer rating on your pages?",
    answer:
      "Because they don't publish one, and we never invent or estimate a score. Where no aggregate exists, our pages say so explicitly and rely on the individual reviews we can verify plus the provider's published terms.",
  },
  {
    question: "How do you compare pricing between providers?",
    answer:
      "From each platform's published rates and cited copays, with promo conditions applied exactly as published: first-month discounts roll to the regular rate from month two, subscriptions are labeled with what a week actually includes, and insurance figures are shown as the platform cites them - always to be confirmed with your own plan.",
  },
];

const SOURCES = [
  { icon: Database, title: "The platforms' own materials", desc: "We pull pricing, insurance terms, session formats and the care model directly from each platform's official website - so what you read here matches what you'll see when you sign up." },
  { icon: ClipboardCheck, title: "Recent verified customer reviews", desc: "We read current customer reviews to gauge real-world experience - matching, therapist fit, billing, and support - not just marketing claims." },
  { icon: Scale, title: "In-house research", desc: "Our editors independently walk signup flows, compare pricing and coverage side by side, and track how each platform's offering changes over time." },
  { icon: ShieldCheck, title: "Clinical literature", desc: "Mental-health claims reference published research on psychotherapy and teletherapy from sources like NIMH and the APA - not opinion." },
];

export default async function HowWeRankPage() {
  const config = await getConfig();
  const experts = config.experts ?? [];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How We Rank & Review Online Therapy Platforms - Our Methodology",
    description:
      "Our full methodology for ranking and reviewing online therapy platforms: the factors we score, where our data comes from, how we verify accuracy, and how we pick winners.",
    url: CANONICAL,
    publisher: { "@type": "Organization", name: "onlinetherapyhub.com", url: "https://www.onlinetherapyhub.com" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.onlinetherapyhub.com" },
      { "@type": "ListItem", position: 2, name: "How We Rank", item: CANONICAL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: METHOD_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How We Rank" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            How We Rank &amp; Review Providers
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Every review and head-to-head comparison on this site is built on the same
            repeatable, evidence-first process. Here&rsquo;s exactly how we evaluate each
            online therapy platform, where our information comes from, and how we keep it accurate.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* Factors */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">The 6 factors we score</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            We rate every provider on a weighted evaluation across six core categories. The
            weighting reflects what matters most for safe, affordable, and effective online therapy.
          </p>
          <div className="space-y-4">
            {FACTORS.map(({ category, weight, desc }) => (
              <div key={category} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="shrink-0 rounded bg-[#1A7A52] px-2.5 py-1 text-[12px] font-bold text-white">{weight}</span>
                <div>
                  <p className="text-[14px] font-bold text-[#191919]">{category}</p>
                  <p className="mt-0.5 text-[13px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price verification protocol */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How we verify prices</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            Every price on this site comes straight from each provider&rsquo;s own published rates,
            and we record four things for each one: the headline rate, the regular rate behind any
            promotion, the condition attached (plan length, first-month rate, per-dose vs. monthly
            pricing), and the shipping terms. A number is never published without its condition.
          </p>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            When a provider changes its published pricing, we re-verify against its site and every
            affected page - reviews, head-to-heads and cost breakdowns - is revised, with the
            &ldquo;last updated&rdquo; date refreshed so you always know how current a figure is.
          </p>
        </section>

        {/* What moves a score - the published rubric */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What earns points - and what costs them</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            Within the six weighted factors, these are the specific signals that consistently move a
            provider up or down in our evaluations:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-emerald-700">
                <Check className="h-4 w-4" strokeWidth={2.5} /> Earns points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-800">
                <li>Clear, flat pricing with no surprise increases</li>
                <li>A large, public customer record (review volume + score)</li>
                <li>Licensed, state-credentialed therapists and a clear scope of care</li>
                <li>Real guarantees in writing - refunds and satisfaction promises</li>
                <li>Fast matching and painless therapist switching</li>
                <li>Clean exit terms: month-to-month, pause or cancel anytime</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-amber-700">
                <X className="h-4 w-4" strokeWidth={2.5} /> Costs points
              </p>
              <ul className="space-y-2 text-[14px] leading-relaxed text-gray-800">
                <li>Teaser rates that jump after month one - we publish the regular rate next to every promo</li>
                <li>No published review aggregate - noted plainly in the review</li>
                <li>Prepaid commitments a shopper could miss at checkout</li>
                <li>Undisclosed fees stacked on the subscription price</li>
                <li>Thin public detail on plan terms, cancellation or privacy practices</li>
                <li>A weak or mixed published review record - we cite the real number even for partners</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrity rules - the house rules the content actually runs on */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Our review-integrity rules</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100 text-[14.5px] leading-[1.75] text-gray-600">
              <p className="p-5"><strong className="text-[#191919]">No invented ratings, ever.</strong> If a provider has no published customer-rating aggregate, our pages say exactly that - we never estimate or fabricate a score. Partner status doesn&rsquo;t change this: we openly discuss a partner&rsquo;s mixed reviews when that&rsquo;s the record.</p>
              <p className="p-5"><strong className="text-[#191919]">Every promo carries its regular rate.</strong> Promotional prices are always published alongside the regular rate and the condition (&ldquo;first month only&rdquo;, &ldquo;annual plan&rdquo;, &ldquo;per dose&rdquo;), so a discounted headline never hides what you&rsquo;ll actually pay.</p>
              <p className="p-5"><strong className="text-[#191919]">Community feedback is verified, not scraped.</strong> The &ldquo;What Reddit says&rdquo; sections on our reviews are built only from real public threads we&rsquo;ve independently verified - quotes lightly trimmed, vote counts shown only as captured, gripes included alongside praise.</p>
              <p className="p-5"><strong className="text-[#191919]">Medical claims cite primary sources.</strong> Clinical figures reference published research on psychotherapy and teletherapy from NIMH, the APA and peer-reviewed sources, cited on our pages - never blog folklore.</p>
              <p className="p-5"><strong className="text-[#191919]">We don&rsquo;t republish what we can&rsquo;t verify.</strong> Claims circulating about providers - regulatory actions, corporate relationships - appear on our pages only after independent verification, no matter who they help or hurt.</p>
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Where our data comes from</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Our evaluations only carry weight if the underlying information is real. We draw
            on four sources for every provider:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOURCES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A7A52]/5">
                  <Icon className="h-5 w-5 text-[#1A7A52]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-[15px] font-bold text-[#191919]">{title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accuracy commitment */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How we keep it accurate</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-4 text-[15px] leading-[1.75] text-gray-600">
              <p>
                <strong className="text-[#191919]">We don&rsquo;t make things up.</strong> Prices,
                session formats, insurance terms, and clinical details are taken from each platform&rsquo;s
                own official sources. We don&rsquo;t invent figures, name services a platform
                doesn&rsquo;t offer, or attach clinical claims that aren&rsquo;t supported.
              </p>
              <p>
                <strong className="text-[#191919]">We update when providers change.</strong> Pricing
                and offerings in this space move quickly. When a provider changes its plans, we revise
                the affected reviews and comparisons and refresh their &ldquo;last updated&rdquo; date.
              </p>
              <p>
                <strong className="text-[#191919]">We separate fact from experience.</strong> Objective
                details (price, delivery, treatments) are reported as fact; customer sentiment is
                clearly attributed to reviews; and our own take is presented as editorial analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How scoring works</h2>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            Each provider earns an overall score on a 10-point scale, translated into a plain-English
            label - from <strong className="text-[#191919]">Exceptional</strong> at the top through{" "}
            <strong className="text-[#191919]">Excellent</strong> and{" "}
            <strong className="text-[#191919]">Very Good</strong>. A score reflects the weighted result
            across the six factors above. Strong transparent pricing, credible medical oversight, and
            consistently positive recent customer feedback move a score up; hidden fees, thin medical
            support, or recurring complaints move it down.
          </p>
        </section>

        {/* Head-to-head winners */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#191919]">How we pick a winner</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                In a head-to-head comparison we score the two providers category by category -
                pricing, medical support, treatment options, speed, and customer experience. The
                provider that wins the majority of categories takes the matchup, and the advantage
                meter reflects how decisive that edge is. We always name the runner-up&rsquo;s genuine
                strengths, because the &ldquo;better&rdquo; provider still depends on what you value most.
              </p>
            </div>
          </div>
        </section>

        {/* Freshness */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <RefreshCw className="mt-0.5 h-6 w-6 shrink-0 text-[#1A7A52]" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#191919]">Keeping reviews current</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                We continuously monitor platform pricing and offerings, new clinical research, and recent
                customer reviews, and revise our rankings, reviews, and comparisons as things change.
                Each review and comparison shows when it was last updated.
              </p>
            </div>
          </div>
        </section>

        {/* Independence */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Editorial independence</h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#191919]">Independent rankings.</strong> Our rankings and
              reviews are determined by the evaluation criteria on this page - not by commercial
              relationships.
            </p>
            <p>
              <strong className="text-[#191919]">Transparent about affiliates.</strong> Some providers
              compensate us through affiliate partnerships when you click through and sign up. This may
              affect how providers are displayed, but it does not influence our scores or the content of
              our reviews. See our{" "}
              <Link href="/disclaimer" className="font-semibold text-[#1A7A52] hover:underline">full disclaimer</Link>.
            </p>
          </div>
        </section>

        {/* Who's behind the reviews */}
        <ExpertTeam experts={experts} />

        {/* Medical disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Medical disclaimer</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              onlinetherapyhub.com is not a mental-health provider and does not deliver therapy or
              prescribe medication. The information on this site is for general information and comparison
              purposes only and should not replace professional advice. Therapy and psychiatric care should
              be provided by licensed clinicians, and what is right for you depends on your situation.
              Online platforms are not emergency services - if you are in crisis in the US, call or text
              988, free and open 24/7. Individual results vary.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Methodology FAQs</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {METHOD_FAQS.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#191919]">See the rankings in action</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#1A7A52] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#14634A]"
            >
              Compare Providers
            </Link>
            <Link
              href="/reviews"
              className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              Read Our Reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
