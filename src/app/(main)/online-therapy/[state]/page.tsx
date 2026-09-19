import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { ExpertByline } from "@/components/expert-byline";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { STATES, STATE_BY_SLUG } from "@/lib/states";

export const revalidate = 60;

const SITE_URL = "https://www.toponlinetherapy.io";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = STATE_BY_SLUG.get(state);
  if (!s) return {};
  const url = `${SITE_URL}/online-therapy/${s.slug}`;
  const title = `Online Therapy in ${s.name} (2026)`;
  const description =
    `Compare online therapy platforms serving ${s.name}. Licensed ${s.abbr} therapists, video, phone or messaging sessions, and insurance accepted - start from anywhere in ${s.name}.`;
  return {
    title: { absolute: `${title} | Top Online Therapy` },
    description,
    alternates: { canonical: url },
    openGraph: { siteName: "Top Online Therapy", title, description, url, type: "website" },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = STATE_BY_SLUG.get(state);
  if (!s) return notFound();

  const config = await getConfig();
  const { positions } = config.ranking;

  // Platforms available in this state = ranking order, minus any that exclude it.
  const availableIds = config.ranking.providerOrder.filter((id) => {
    const p = config.providers.find((pr) => pr.id === id);
    return p && !(p.excludedStates ?? []).includes(s.abbr);
  });

  const displayList = availableIds
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id)!;
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
    });

  const topName = displayList[0]?.name ?? "our top-rated platform";
  const [c0, c1, c2] = s.cities;
  const citiesPhrase = s.cities.length >= 3 ? `${c0}, ${c1}, and ${c2}` : s.cities.join(" and ");

  const faqs = [
    {
      question: `Is online therapy available in ${s.name}?`,
      answer: `Yes. Online therapy platforms match residents across ${s.name} - from ${citiesPhrase} to smaller towns and rural areas - with therapists licensed to practice in ${s.name}. Sessions happen by video, phone, live chat or messaging, so where you live in the state doesn't limit your choice of clinician the way it does with an office practice.`,
    },
    {
      question: `Are online therapists licensed in ${s.name}?`,
      answer: `They should be, and on the platforms we compare they are. Therapy licensing is state-based, so a clinician treating you must hold a license valid in ${s.name}; platforms match you only with therapists credentialed for your state. You can ask to see a therapist's license details at any time.`,
    },
    {
      question: `Does insurance cover online therapy in ${s.name}?`,
      answer: `Often, but it's always plan-specific rather than state-specific. Talkspace is covered by many major plans and EAPs, BetterHelp now accepts insurance, with copays cited from around $23/session for covered members, and Headspace's therapy service takes insurance too. Run each platform's coverage check with your plan details before paying out of pocket - it takes minutes and answers the only question that matters for you.`,
    },
    {
      question: `How much does online therapy cost in ${s.name}?`,
      answer: `Pricing depends on the platform, your plan and your insurance - not on where you live in ${s.name}, although BetterHelp's self-pay rate can vary by location and therapist availability. We only publish prices we've verified, so confirm your number at signup and use financial aid or employer EAP sessions where they apply.`,
    },
  ];

  const author = config.experts?.[0];
  const reviewer = config.experts?.[1];
  const url = `${SITE_URL}/online-therapy/${s.slug}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Online Therapy in ${s.name} (2026)`,
    description: `Compare online therapy platforms serving ${s.name}, with state-licensed therapists, flexible session formats and insurance accepted.`,
    url,
    inLanguage: "en-US",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@type": "WebSite", name: "Top Online Therapy", url: SITE_URL },
    about: { "@type": "Thing", name: `Online therapy in ${s.name}` },
    ...(author && { author: { "@type": "Organization", name: author.name, url: `${SITE_URL}/about` } }),
    ...(reviewer && { reviewedBy: { "@type": "Organization", name: reviewer.name } }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Online Therapy by State", item: `${SITE_URL}/online-therapy` },
      { "@type": "ListItem", position: 3, name: s.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <HeroSection
        backgroundImageUrl=""
        imageAlt=""
        updatedLabel="Last Updated: September 2026"
        h1={`Online Therapy in ${s.name}`}
        h2={`Compare online therapy platforms serving ${s.name}`}
        description={`Licensed ${s.name} therapists by video, phone, chat or messaging - with insurance accepted and matching in days, from anywhere in the state. Compare your options below.`}
      />

      {(author || reviewer) && (
        <section className="mx-auto max-w-[1200px] px-4 pt-3.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {author && <ExpertByline expert={author} label="Written by" />}
            {reviewer && <ExpertByline expert={reviewer} label="Reviewed by" />}
          </div>
        </section>
      )}

      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1200px] px-4 pt-4">
        <nav className="text-[13px] text-gray-500">
          <Link href="/" className="hover:text-[#1A7A52] hover:underline">Home</Link>
          <span className="px-1.5">/</span>
          <Link href="/online-therapy" className="hover:text-[#1A7A52] hover:underline">By State</Link>
          <span className="px-1.5">/</span>
          <span className="text-[#191919]">{s.name}</span>
        </nav>
      </section>

      {/* Platform comparison */}
      <section className="mx-auto max-w-[900px] px-4 pt-6 pb-6">
        <div className="space-y-4">
          {displayList.map((product) => (
            <ComparisonCard key={product.id} product={product} socialProof={config.cardSocialProof} />
          ))}
        </div>
      </section>

      {/* Valuable, state-specific editorial */}
      <div className="mx-auto max-w-[1200px] px-4 pb-12 text-[16px] leading-[1.7] text-gray-800">
        <hr className="mb-8 border-gray-200" />

        <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
          Getting Online Therapy in {s.name}
        </h2>
        <p className="mb-4">
          If you live in {s.name} - whether in {citiesPhrase}, or a smaller community across {s.region} -
          you no longer have to find a therapist within driving distance, wait weeks for an opening, or fit
          sessions around an office&apos;s hours. Online platforms match you with a therapist licensed in{" "}
          {s.name} and run sessions by video, phone, chat or messaging from wherever you are. Below is how it
          works, what serves {s.name}, and how to choose.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          How Online Therapy Works in {s.name}
        </h2>
        <ol className="mb-4 ml-5 list-decimal space-y-2">
          <li><strong>A short intake.</strong> You describe what you&apos;re dealing with, how you&apos;d like sessions to work, and - where the platform accepts insurance - your plan details for a coverage check.</li>
          <li><strong>Matching with a {s.name}-licensed therapist.</strong> Platforms match you only with clinicians credentialed to practice in {s.name}; if the first fit isn&apos;t right, switching is free and normal.</li>
          <li><strong>Sessions and support.</strong> Weekly live sessions - video, phone or chat - with messaging in between on most platforms, and tools like worksheets or a daily practice app alongside.</li>
        </ol>
        <p className="mb-4">
          Not sure where to start? {topName} is our current top pick - see the full{" "}
          <Link href="/" className="font-semibold text-[#1A7A52] hover:underline">comparison</Link>{" "}
          and our{" "}
          <Link href="/reviews" className="font-semibold text-[#1A7A52] hover:underline">in-depth reviews</Link>.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Therapist Licensing in {s.name}
        </h2>
        <p className="mb-4">
          Therapy licensing is state-based, which is the one thing that makes location matter online. A
          therapist treating you must hold a license valid in {s.name}, so the platforms we compare match you
          from clinicians credentialed for the state - not from a national pool. In practice that widens your
          choice rather than narrowing it: someone in a rural corner of {s.name} gets the same statewide pool
          as someone in {c0}. If you travel or move, tell your platform - a therapist licensed only in {s.name}{" "}
          may not be able to see you from another state.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Insurance and Cost in {s.name}
        </h2>
        <p className="mb-4">
          Coverage is plan-specific rather than state-specific. Talkspace is covered by many major plans and employer EAPs and claims a $0 copay for most insured members; BetterHelp now accepts insurance, with copays
          cited from around $23/session for covered members and a financial-aid questionnaire for self-pay;
          Headspace&apos;s therapy service accepts insurance too, with a coverage check on its site. Employer
          EAPs often include fully covered sessions and go unused. We only publish prices we&apos;ve verified,
          so run the coverage checks and confirm your own number - our guide to{" "}
          <Link href="/articles/online-therapy-that-takes-insurance" className="font-semibold text-[#1A7A52] hover:underline">
            online therapy that takes insurance
          </Link>{" "}
          walks through it.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          {s.name} vs. Finding a Therapist Near You
        </h2>
        <p className="mb-4">
          Searching &quot;therapist near me&quot; in {s.name} will surface local practices, and those are a good
          fit if you want to be in a room with someone, need higher-intensity or coordinated care, or
          don&apos;t have reliable privacy at home. But for many common concerns - anxiety, low mood, stress,
          relationship strain - online therapy is faster to start, easier to keep up, and often less
          expensive once insurance is in the picture. Our guide to{" "}
          <Link href="/articles/online-therapy-vs-in-person" className="font-semibold text-[#1A7A52] hover:underline">
            online therapy vs in-person
          </Link>{" "}
          weighs the trade-offs honestly.
        </p>

        <p className="mt-8 text-[13.5px] text-gray-500">
          This page is general information, not medical advice. Whether online therapy is right for you is a
          decision for you and a licensed clinician. Online platforms are for ongoing care, not emergencies -
          if you&apos;re in crisis in {s.name}, call or text 988 (the Suicide &amp; Crisis Lifeline), free and
          open 24/7, or call 911 in immediate danger. Always confirm current pricing, coverage and terms directly
          with the platform.
        </p>
      </div>

      <FaqAccordion items={faqs} />
    </>
  );
}
