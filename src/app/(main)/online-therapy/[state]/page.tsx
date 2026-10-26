import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { orgRef, WEBSITE_ID } from "@/lib/geo";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";
import { STATES, STATE_BY_SLUG } from "@/lib/states";
import { stateNeighbors, medicaidProgramName, hasBrandedMedicaid } from "@/lib/state-details";

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
  const title = `Best Online Therapy in ${s.name} (2026): Platforms, Insurance & Cost`;
  const description =
    `The best online therapy platforms serving ${s.name} in 2026, compared: ${s.abbr}-licensed therapists by video, phone or messaging, insurance and ${medicaidProgramName(s.slug, s.name)} coverage, verified prices and how to start from anywhere in ${s.name}.`;
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
      answer: `Often, but it's always plan-specific rather than state-specific. Talkspace is covered by many major plans and EAPs, betterhelp now accepts insurance, with copays cited from around $23/session for covered members, and headspace's therapy service takes insurance too. Run each platform's coverage check with your plan details before paying out of pocket - it takes minutes and answers the only question that matters for you.`,
    },
    {
      question: `Can I choose a therapist's gender or specialty in ${s.name}?`,
      answer: `Yes. The platforms we compare ask about your preferences at intake - including a therapist's gender, the concerns you want to work on (anxiety, depression, relationships, grief and more), and, on some platforms, faith or cultural background - and match you from clinicians licensed in ${s.name} who fit. If the first match isn't right, switching is free and normal; many people in ${s.name} change therapists once before settling.`,
    },
    {
      question: `How much does online therapy cost in ${s.name}?`,
      answer: `Pricing depends on the platform, your plan and your insurance - not on where you live in ${s.name}, although betterhelp's self-pay rate can vary by location and therapist availability. We only publish prices we've verified, so confirm your number at signup and use financial aid or employer EAP sessions where they apply.`,
    },
  ];

  const medicaid = medicaidProgramName(s.slug, s.name);
  const neighbors = stateNeighbors(s.slug)
    .map((slug) => STATE_BY_SLUG.get(slug))
    .filter((n): n is NonNullable<typeof n> => !!n);

  faqs.push({
    question: `Does Medicaid cover online therapy in ${s.name}?`,
    answer: `Medicaid in ${s.name} - ${hasBrandedMedicaid(s.slug) ? `run as ${medicaid}` : `the state's Medicaid program`} - covers mental-health care, and most states cover telehealth therapy, but which online platforms are in-network is decided state by state and plan by plan. Run each platform's eligibility check with your ${medicaid} details; if none is covered, ${s.name}'s community mental-health centers accept Medicaid and increasingly offer video sessions. Program names and managed-care plans change, so confirm with the state program.`,
  });

  const author = config.experts?.[0];
  const url = `${SITE_URL}/online-therapy/${s.slug}`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best online therapy platforms in ${s.name}`,
    numberOfItems: displayList.length,
    itemListElement: displayList.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/reviews/${p.id}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Best Online Therapy in ${s.name} (2026)`,
    description: `The best online therapy platforms serving ${s.name}: state-licensed therapists, flexible session formats, insurance and Medicaid coverage, verified prices.`,
    url,
    inLanguage: "en-US",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: orgRef(),
    about: { "@type": "Thing", name: `Online therapy in ${s.name}` },
    ...(author && { author: { "@type": "Organization", name: author.name, url: `${SITE_URL}/about` } }),
    ...pageReviewSchema(`/online-therapy/${s.slug}`),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <HeroSection
        backgroundImageUrl=""
        imageAlt=""
        updatedLabel="Last Updated: October 2026"
        h1={`Best Online Therapy in ${s.name}`}
        h2={`The online therapy platforms serving ${s.name}, compared on insurance, formats and cost`}
        description={`Licensed ${s.name} therapists by video, phone, chat or messaging - with insurance accepted and matching in days, from anywhere in the state. Compare your options below.`}
      />

      <section className="mx-auto max-w-[1200px] px-4 pt-3">
        <MedicalReviewBar path={`/online-therapy/${s.slug}`} className="max-w-[760px]" />
      </section>

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
          Online Therapy in {citiesPhrase}
        </h2>
        <p className="mb-4">
          Whether you&apos;re searching for an online therapist in {c0}{c1 ? `, ${c1}` : ""}{c2 ? ` or ${c2}` : ""},
          or you live hours from any of them, the answer is the same platform list: online matching draws
          from every clinician licensed in {s.name}, not from one city&apos;s practices. That matters most
          outside the metros, where the local pool is thin, but it helps in the cities too - you can filter
          for a therapist who works with your specific concern instead of whoever has an opening nearby.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Online Therapy, Virtual Counseling, Telehealth: Same Thing in {s.name}?
        </h2>
        <p className="mb-4">
          Mostly, yes. &quot;Online therapy&quot;, &quot;virtual therapy&quot;, &quot;online counseling&quot; and
          &quot;telehealth therapy&quot; all describe the same care: sessions with a licensed {s.name} clinician
          by video, phone, chat or messaging instead of in an office. The one distinction worth knowing is
          between a <strong>therapist</strong> (talk therapy - the platforms above) and a{" "}
          <strong>psychiatric clinician</strong> (evaluation and medication management), which only Talkspace
          offers on-platform here. Whatever you searched for, the platforms that serve {s.name} are the ones
          compared above.
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
          Coverage is plan-specific rather than state-specific. Talkspace is covered by many major plans and employer EAPs and claims a $0 copay for most insured members; betterhelp now accepts insurance, with copays
          cited from around $23/session for covered members and a financial-aid questionnaire for self-pay;
          headspace&apos;s therapy service accepts insurance too, with a coverage check on its site. Employer
          EAPs often include fully covered sessions and go unused. Medicaid in {s.name}
          {hasBrandedMedicaid(s.slug) ? <> - run as <strong>{medicaid}</strong> - </> : " "}
          covers mental-health care, but which online platforms are in-network is decided plan by plan, so
          run the checks with your Medicaid details and keep {s.name}&apos;s community mental-health centers
          in mind as the fallback that always accepts it. Self-pay, the lowest verified published price in
          our coverage is Talkspace&apos;s $69-per-week messaging plan; its video tiers are $99 and $109 per
          week, and betterhelp quotes its subscription at signup with financial aid available. We only
          publish prices we&apos;ve verified, so run the coverage checks and confirm your own number - our{" "}
          <Link href="/articles/does-insurance-cover-online-therapy" className="font-semibold text-[#1A7A52] hover:underline">
            complete guide to insurance and online therapy
          </Link>{" "}
          covers copays, deductibles, Medicare, Medicaid and EAPs in depth, and our{" "}
          <Link href="/articles/online-therapy-cost" className="font-semibold text-[#1A7A52] hover:underline">
            cost guide
          </Link>{" "}
          has every verified price.
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

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Keep Reading
        </h2>
        <ul className="mb-4 ml-5 list-disc space-y-1.5">
          <li><Link href="/articles/online-therapy-guide" className="font-semibold text-[#1A7A52] hover:underline">The complete guide to online therapy</Link> - what it is, how it works, whether it works, and a first-30-days plan.</li>
          <li><Link href="/online-therapy-for-beginners" className="font-semibold text-[#1A7A52] hover:underline">Online therapy for beginners</Link> - what the intake asks and what a first session looks like.</li>
          <li><Link href="/best-online-psychiatry" className="font-semibold text-[#1A7A52] hover:underline">Online psychiatry</Link> - if medication might be part of your care in {s.name}.</li>
          <li><Link href="/cheapest-online-therapy" className="font-semibold text-[#1A7A52] hover:underline">Cheapest online therapy</Link> and <Link href="/free-online-therapy" className="font-semibold text-[#1A7A52] hover:underline">free options</Link> - for when cost is the deciding factor.</li>
        </ul>

        {neighbors.length > 0 && (
          <>
            <h2 className="mb-3 mt-8 text-[24px] font-bold text-[#191919]">
              Online Therapy in Nearby States
            </h2>
            <p className="mb-3">
              Licensing stops at the state line, so if you split time between {s.name} and a neighboring state,
              or are about to move, the page for that state shows what serves it:
            </p>
            <ul className="mb-4 flex flex-wrap gap-2">
              {neighbors.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/online-therapy/${n.slug}`}
                    className="inline-block rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] font-semibold text-[#1A7A52] hover:border-[#1A7A52]"
                  >
                    Online therapy in {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/online-therapy" className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[14px] font-semibold text-gray-600 hover:border-[#1A7A52]">
                  All states
                </Link>
              </li>
            </ul>
          </>
        )}

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
