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
import { stateNote } from "@/lib/state-notes";

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
  const note = stateNote(s.slug);
  const titles = note ? note.licenses.slice(0, 2).join(" and ") : `${s.abbr}-licensed`;
  const description =
    `The best online therapy platforms serving ${s.name} in 2026, compared: ${titles} therapists licensed in ${s.name}, video, phone or messaging sessions, insurance and ${medicaidProgramName(s.slug, s.name)} coverage, verified prices, and what is different about getting care in ${s.name}.`;
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

  const note = stateNote(s.slug);
  const licenseList = note ? note.licenses.join(", ") : "";
  const mentionsTricare = !!note && note.note.includes("TRICARE");
  const mentionsMedicare = !!note && note.note.includes("Medicare Part B");
  const expansionClause = note
    ? note.medicaidExpanded
      ? `${s.name} has adopted Medicaid expansion, so low-income adults are generally eligible`
      : `${s.name} has not adopted Medicaid expansion, so adults without children or a disability often fall outside it`
    : "";

  const faqs = [
    {
      question: `Is online therapy available in ${s.name}?`,
      answer: `Yes. Online therapy platforms match residents across ${s.name} - from ${citiesPhrase} to smaller towns and rural areas - with therapists licensed to practice in ${s.name}. Sessions happen by video, phone, live chat or messaging, so where you live in the state doesn't limit your choice of clinician the way it does with an office practice.${note ? ` ${s.name} keeps ${note.timeZone} time, and the statewide pool matters most outside ${c0} and ${c1}, where local practices are thin.` : ""}`,
    },
    {
      question: `Are online therapists licensed in ${s.name}?`,
      answer: `They should be, and on the platforms we compare they are. Therapy licensing is state-based, so a clinician treating you must hold a license valid in ${s.name}; platforms match you only with therapists credentialed for your state.${licenseList ? ` In ${s.name} the titles to look for on a profile are ${licenseList} - each is a state license you can verify on the licensing board's public lookup.` : ""} You can ask to see a therapist's license details at any time.`,
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
      answer: `Pricing depends on the platform, your plan and your insurance - not on where you live in ${s.name}, although betterhelp's self-pay rate can vary by location and therapist availability. We only publish prices we've verified, so confirm your number at signup and use financial aid or employer EAP sessions where they apply.${note ? ` The lowest verified self-pay price in our coverage is Talkspace's $69-per-week messaging plan; with insurance, copays typically land between $0 and $30. ${expansionClause}${note.medicaidExpanded ? ", so run the platform checks with your Medicaid details too." : ", which makes the EAP question and the insurance checks the first two steps for working adults in " + s.name + "."}` : ""}`,
    },
  ];

  const medicaid = medicaidProgramName(s.slug, s.name);
  const neighbors = stateNeighbors(s.slug)
    .map((slug) => STATE_BY_SLUG.get(slug))
    .filter((n): n is NonNullable<typeof n> => !!n);

  faqs.push({
    question: `Does Medicaid cover online therapy in ${s.name}?`,
    answer: `Medicaid in ${s.name} - ${hasBrandedMedicaid(s.slug) ? `run as ${medicaid}` : `the state's Medicaid program`} - covers mental-health care, and most states cover telehealth therapy, but which online platforms are in-network is decided state by state and plan by plan. Run each platform's eligibility check with your ${medicaid} details; if none is covered, ${s.name}'s community mental-health centers accept Medicaid and increasingly offer video sessions.${note && !note.medicaidExpanded ? ` Note that ${s.name} has not adopted Medicaid expansion, so eligibility for adults without children or a disability is narrower than in most states - if you fall outside it, an employer EAP, Talkspace's $69-per-week messaging tier and betterhelp's financial-aid questionnaire are the realistic routes.` : ""} Program names and managed-care plans change, so confirm with the state program.`,
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
        description={
          note
            ? `${note.licenses.slice(0, 2).join(" and ")} therapists licensed in ${s.name}, by video, phone, chat or messaging - insurance and ${medicaid} checks, matching in days, and what is different about online care in ${s.name}. Compare your options below.`
            : `Licensed ${s.name} therapists by video, phone, chat or messaging - with insurance accepted and matching in days, from anywhere in the state. Compare your options below.`
        }
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

        {note && (
          <>
            <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
              What&apos;s Different About Online Therapy in {s.name}
            </h2>
            <p className="mb-4">{note.note}</p>
          </>
        )}

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          How Online Therapy Works in {s.name}
        </h2>
        <ol className="mb-4 ml-5 list-decimal space-y-2">
          <li><strong>Intake and coverage check</strong> - what you need, how you want sessions to work, and your plan details.</li>
          <li><strong>A {s.name}-licensed match</strong>{note ? ` - a ${note.licenses[0]}, ${note.licenses[1]} or ${note.licenses[2]} credentialed for ${s.name}` : ""}; switching is free if the first fit is wrong.</li>
          <li><strong>Weekly sessions plus messaging</strong> by video, phone or chat, from {c0}, {c1} or anywhere else in the state.</li>
          {note && (
            <li><strong>Scheduling in {note.timeZone} time.</strong> {s.name} keeps {note.timeZone} time; set your availability in your local time and confirm the session clock when you are matched, since platform tools sometimes default to another zone.</li>
          )}
        </ol>
        <p className="mb-4">
          {topName} is our current top pick for {s.name}; the full{" "}
          <Link href="/" className="font-semibold text-[#1A7A52] hover:underline">comparison</Link>,{" "}
          <Link href="/reviews" className="font-semibold text-[#1A7A52] hover:underline">reviews</Link> and{" "}
          <Link href="/articles/online-therapy-guide" className="font-semibold text-[#1A7A52] hover:underline">complete guide</Link>{" "}
          explain every step in depth.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Online Therapy in {citiesPhrase}
        </h2>
        <p className="mb-4">
          An online therapist &quot;in&quot; {c0}, {c1} or {c2} is really a therapist licensed anywhere in {s.name}:
          matching draws from the whole state, not one city&apos;s practices. In {s.name} that matters most
          outside the metros, and in the metros it means filtering for the specialty, language or background you
          want instead of whoever has an opening nearby.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Online Therapy, Virtual Counseling, Telehealth: Same Thing in {s.name}?
        </h2>
        <p className="mb-4">
          Mostly, yes - all four terms mean sessions with a {s.name}-licensed clinician by video, phone, chat or
          messaging. The distinction that matters is <strong>therapist</strong> versus{" "}
          <strong>psychiatric clinician</strong>; only Talkspace offers the latter on-platform in {s.name}. Our{" "}
          <Link href="/articles/online-therapy-guide" className="font-semibold text-[#1A7A52] hover:underline">complete guide</Link>{" "}
          covers the vocabulary.
        </p>

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Therapist Licensing in {s.name}
        </h2>
        <p className="mb-4">
          A therapist treating you must hold a license valid in {s.name}, so platforms match you from clinicians
          credentialed for the state - the same statewide pool for someone in {c2} as for someone in {c0}. If you
          travel or move, tell your platform; a {s.name}-only license may not cover you from another state.
        </p>
        {note && (
          <p className="mb-4">
            The license titles you will see on {s.name} therapist profiles are <strong>{licenseList}</strong>.
            In {s.name} a clinical counselor is a {note.licenses[0]} and a clinical social worker a {note.licenses[1]};
            each title means a graduate degree, supervised hours, a licensing exam and an active license that{" "}
            {s.name}&apos;s board can discipline or revoke, checkable in two minutes on the board&apos;s lookup.
          </p>
        )}

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          Insurance and Cost in {s.name}
        </h2>
        <p className="mb-4">
          Coverage is plan-specific, and the platform facts are the same everywhere: Talkspace is in-network with
          many major plans, Medicare, TRICARE and EAPs (copays typically $0 to $30); betterhelp accepts insurance
          (copays cited from around $23) and offers financial aid; headspace&apos;s therapy service accepts
          insurance. Self-pay, the lowest verified price is Talkspace&apos;s $69-per-week messaging plan.
        </p>
        {note && (
          <p className="mb-4">
            What is specific to {s.name}: Medicaid here is{" "}
            {hasBrandedMedicaid(s.slug) ? <>run as <strong>{medicaid}</strong></> : <>{s.name} Medicaid</>}, and{" "}
            {expansionClause}
            {note.medicaidExpanded
              ? " - run the platform checks with your Medicaid plan card, and keep the community mental-health centers in mind as the fallback that always accepts it."
              : ` - for working adults who fall outside it, the EAP question and the insurance checks come first, then the $69 messaging tier or financial aid, then ${s.name}'s community mental-health centers on a sliding scale.`}
            {mentionsTricare && ` Military households in ${s.name} can run the Talkspace check with TRICARE details.`}
            {mentionsMedicare && ` For ${s.name}'s older residents, Medicare Part B covers telehealth therapy from home, and Talkspace lists Medicare among the plans it works with.`}
            {" "}Our{" "}
            <Link href="/articles/does-insurance-cover-online-therapy" className="font-semibold text-[#1A7A52] hover:underline">
              insurance guide
            </Link>{" "}
            and{" "}
            <Link href="/articles/online-therapy-cost" className="font-semibold text-[#1A7A52] hover:underline">
              cost guide
            </Link>{" "}
            go deeper.
          </p>
        )}

        {note && (
          <>
            <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
              Online Therapy in {s.name} at a Glance
            </h2>
            <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[520px] text-left text-[14px]">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-2.5 font-semibold text-[#191919]">License titles to look for</td><td className="px-4 py-2.5 text-gray-600">{licenseList}</td></tr>
                  <tr className="bg-gray-50/50"><td className="px-4 py-2.5 font-semibold text-[#191919]">Time zone</td><td className="px-4 py-2.5 text-gray-600">{note.timeZone}</td></tr>
                  <tr><td className="px-4 py-2.5 font-semibold text-[#191919]">Medicaid program</td><td className="px-4 py-2.5 text-gray-600">{medicaid}</td></tr>
                  <tr className="bg-gray-50/50"><td className="px-4 py-2.5 font-semibold text-[#191919]">Medicaid expansion</td><td className="px-4 py-2.5 text-gray-600">{note.medicaidExpanded ? "Adopted - low-income adults generally eligible" : "Not adopted - adult eligibility is narrower"}</td></tr>
                  <tr><td className="px-4 py-2.5 font-semibold text-[#191919]">Largest metros</td><td className="px-4 py-2.5 text-gray-600">{citiesPhrase}</td></tr>
                  <tr className="bg-gray-50/50"><td className="px-4 py-2.5 font-semibold text-[#191919]">Bordering states</td><td className="px-4 py-2.5 text-gray-600">{neighbors.length ? neighbors.map((n) => n.name).join(", ") : "None (see nearby states below)"}</td></tr>
                  <tr><td className="px-4 py-2.5 font-semibold text-[#191919]">Platforms serving {s.name}</td><td className="px-4 py-2.5 text-gray-600">{displayList.map((p) => p.name).join(", ")}</td></tr>
                  <tr className="bg-gray-50/50"><td className="px-4 py-2.5 font-semibold text-[#191919]">Crisis line</td><td className="px-4 py-2.5 text-gray-600">Call or text 988 (free, 24/7); 911 in immediate danger</td></tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2 className="mb-4 mt-8 text-[24px] font-bold text-[#191919]">
          {s.name} vs. Finding a Therapist Near You
        </h2>
        <p className="mb-4">
          A local {c0} practice suits people who want to be in a room, need higher-intensity care, or lack
          privacy at home. For anxiety, low mood, stress and relationship strain, online therapy in {s.name} is
          faster to start and easier to keep. Our guide to{" "}
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
