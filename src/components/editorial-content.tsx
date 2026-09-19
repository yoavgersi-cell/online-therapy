import Link from "next/link";

const modelRows: [string, string, string][] = [
  ["Subscription therapy", "A matched licensed therapist, live sessions plus messaging, billed as a subscription or through insurance.", "BetterHelp is the biggest example; Talkspace runs the same model with broad insurance coverage."],
  ["Psychiatry & medication", "Evaluation, diagnosis and medication management by psychiatric clinicians.", "Talkspace offers it as a service alongside therapy; BetterHelp and Headspace's app don't prescribe."],
  ["Therapy billed through insurance", "Scheduled video sessions with a licensed clinician, paid as a copay where your plan covers it.", "Headspace's therapy service works this way; Talkspace and BetterHelp accept insurance too."],
  ["Mindfulness apps", "Self-guided meditation, sleep and stress practice - not treatment.", "Headspace is the best-known; pairs well with therapy rather than replacing it."],
];

// Verified Trustpilot standings, captured from each platform's live profile
// (operator screenshots, August 2026). Real aggregates only - never adjusted.
const ratingRows: [string, string, string][] = [
  ["Talkspace", "4.4 across 2,370 reviews", "The best verified score in our coverage - praise centers on therapists who stick; the captured reviews carry Trustpilot's \"Invited\" tag."],
  ["betterhelp", "3.9 across 9,652 reviews", "Solid but mixed on the category's biggest review base - accessibility and therapist quality praised, fit and billing complaints alongside."],
  ["headspace", "1.5 across 770 reviews", "Strikingly low for so popular an app - weigh it against the app-store popularity Headspace cites, and read recent reviews before subscribing."],
];

function ComparisonTable({ colA, colHeadB, colB, rows }: { colA: string; colHeadB?: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colHeadB ?? "What it does"}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([k, a, b], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
              <td className="px-4 py-3 align-top text-gray-600">{a}</td>
              <td className="px-4 py-3 align-top text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const link = "font-semibold text-[#1A7A52] hover:underline";

// Editorial, general-information content for the online-therapy homepage.
// Mental-health claims are kept general and hedged; the only numbers on the
// page are verified Trustpilot aggregates captured from the live profiles -
// no fabricated statistics, prices or platform claims. Internal links, a 988
// crisis pointer and a disclaimer close it out.
export function EditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online Therapy Platforms, Compared</h2>
      <p className="mb-4">
        Online therapy connects you with a licensed clinician by video, phone or messaging - no commute, wider choice
        of therapists, and formats that fit around work and family. The platforms differ far more than their ads
        suggest: insurance coverage and copays vary sharply between them, some are therapy-first and some are built
        around a daily practice app, and one of the best-known names isn&rsquo;t primarily therapy at all. We compare
        them on exactly those lines - with real published information and verified customer ratings, never invented
        numbers. Read our{" "}
        <Link href="/reviews" className={link}>
          platform reviews
        </Link>{" "}
        or compare the two biggest names in our{" "}
        <Link href="/betterhelp-vs-talkspace" className={link}>
          BetterHelp vs Talkspace comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Verified customer ratings, side by side</h3>
      <p className="mb-4">
        These are each platform&rsquo;s real Trustpilot standings, checked against the live profiles in August 2026 -
        shown exactly as they are, including the uncomfortable ones. Aggregate ratings at telehealth companies tend to
        be driven by logistics (billing, cancellation, support) at least as much as by clinical care, so treat them as
        a customer-experience signal and read recent reviews for the current picture.
      </p>
      <ComparisonTable colA="Platform" colHeadB="Trustpilot (verified Aug 2026)" colB="What stands out" rows={ratingRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Different products, one label</h3>
      <p className="mb-4">
        &ldquo;Online therapy&rdquo; gets used for genuinely different products, and knowing which one you&rsquo;re
        buying is half the decision:
      </p>
      <ComparisonTable colA="Model" colB="Who does it" rows={modelRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">The insurance question comes first</h3>
      <p className="mb-4">
        The single biggest cost factor is whether your insurance covers a platform.{" "}
        <Link href="/reviews/talkspace" className={link}>
          Talkspace
        </Link>{" "}
        is covered by many major plans and employer EAPs and claims a $0 copay for most insured members.{" "}
        <Link href="/reviews/betterhelp" className={link}>
          BetterHelp
        </Link>{" "}
        - long the insurance holdout - now accepts it, with copays cited from around $23/session for covered members
        and a financial-aid questionnaire for self-pay.{" "}
        <Link href="/reviews/headspace" className={link}>
          Headspace
        </Link>
        &rsquo;s therapy service accepts insurance as well, with a coverage check on its site. Every check is free
        and takes minutes - run two or three before paying anyone out of pocket; they answer the question no comparison table
        can: what <em>you</em> will actually pay. Our{" "}
        <Link href="/articles/online-therapy-that-takes-insurance" className={link}>
          insurance guide
        </Link>{" "}
        walks through the whole thing, including out-of-network reimbursement when nothing is covered.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Which platform fits which person</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          <strong>You want talk therapy, started fast:</strong>{" "}
          <Link href="/reviews/betterhelp" className={link}>BetterHelp</Link>{" "}
          - the largest network, matching in as little as 2 days, video/phone/chat sessions with messaging in between, easy switching, and insurance now accepted (copays from ~$23/session for covered members).
        </li>
        <li>
          <strong>You have insurance, or might need medication too:</strong>{" "}
          <Link href="/reviews/talkspace" className={link}>Talkspace</Link>{" "}
          - therapy plus psychiatry on one platform, broad plan and EAP coverage, and the strongest verified rating in our coverage.
        </li>
        <li>
          <strong>You want a daily practice for stress and sleep, not treatment:</strong>{" "}
          <Link href="/reviews/headspace" className={link}>Headspace</Link>{" "}
          - the best-known meditation app, best used alongside therapy rather than instead of it. Its separate therapy service accepts insurance if you decide you want a clinician. Our{" "}
          <Link href="/headspace-vs-betterhelp" className={link}>Headspace vs BetterHelp comparison</Link>{" "}
          covers that fork in depth.
        </li>
        <li>
          <strong>Medication might be part of your care:</strong> Talkspace is the platform here with psychiatry
          on board; BetterHelp is talk therapy only and Headspace&rsquo;s app is self-guided, so with those plan for
          a separate prescriber alongside. Our guides to{" "}
          <Link href="/articles/therapy-vs-psychiatry" className={link}>therapist vs psychiatrist</Link>{" "}
          and{" "}
          <Link href="/articles/online-psychiatry" className={link}>online psychiatry</Link>{" "}
          explain how that works.
        </li>
        <li>
          <strong>You&rsquo;re new to therapy altogether:</strong> start with our guide to{" "}
          <Link href="/online-therapy-for-beginners" className={link}>online therapy for beginners</Link>{" "}
          - what the intake asks, what a first session looks like, and why switching therapists is normal.
        </li>
      </ul>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What online therapy costs</h3>
      <p className="mb-4">
        We publish prices only after we&rsquo;ve verified them, and in this category prices genuinely vary - by
        platform, location, plan and insurance - so this page quotes none. What we can tell you is where the cost
        levers are: insurance coverage (worth checking first, always), employer EAPs that quietly include free
        sessions, BetterHelp&rsquo;s financial-aid questionnaire for out-of-pocket subscribers, HSA/FSA eligibility
        where offered, and out-of-network reimbursement via superbills. Looking for{" "}
        <Link href="/free-online-therapy" className={link}>
          free online therapy
        </Link>
        ? The genuinely free routes exist and we map them. Our{" "}
        <Link href="/articles/online-therapy-cost" className={link}>
          online therapy cost guide
        </Link>{" "}
        and{" "}
        <Link href="/articles/free-and-low-cost-therapy-options" className={link}>
          free and low-cost therapy guide
        </Link>{" "}
        map the options below every platform&rsquo;s price, including community clinics and sliding-scale therapists.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">A word on privacy</h3>
      <p className="mb-4">
        Therapy data is as sensitive as data gets, and the category&rsquo;s record isn&rsquo;t spotless - BetterHelp
        settled with the FTC in 2023 over past sharing of user data with advertisers, a fact our{" "}
        <Link href="/reviews/betterhelp" className={link}>
          BetterHelp review
        </Link>{" "}
        covers rather than buries. Before signing up anywhere: read the platform&rsquo;s current privacy policy, check
        whether your data is used for advertising, and know that therapy notes and billing records are handled under
        different rules. Insurance-billed care (Talkspace, Headspace&rsquo;s therapy service, BetterHelp with a
        covered plan) also creates claims records with your insurer - a normal part of
        healthcare, but worth knowing.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in a platform</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>Licensed clinicians</strong> - therapists licensed in your state; psychiatric clinicians (Talkspace has them on-platform) if medication may be part of your care. Our <Link href="/articles/online-psychiatry" className={link}>online psychiatry guide</Link> explains how remote prescribing works and its limits.</li>
        <li><strong>The right care model</strong> - therapy-first, therapy plus psychiatry, or daily practice. Our <Link href="/articles/how-to-choose-an-online-therapy-platform" className={link}>choosing guide</Link> sorts it in four questions.</li>
        <li><strong>A session rhythm you&rsquo;ll keep</strong> - video, phone, chat or messaging; consistency drives outcomes more than format, and the best platform is the one you&rsquo;re still attending in month three.</li>
        <li><strong>Easy switching</strong> - finding the right therapist can take more than one try (community feedback says exactly this), so how painless re-matching is matters more than it sounds.</li>
        <li><strong>Transparent terms</strong> - current rates, cancellation terms and refund rules on the platform&rsquo;s own site. We don&rsquo;t quote prices we haven&rsquo;t verified, and neither should your memory of an ad.</li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice or a substitute for professional care. Online
        platforms are for ongoing care, not emergencies - if you&rsquo;re in crisis in the US, call or text 988 (the
        Suicide &amp; Crisis Lifeline, free and open 24/7), or call 911 in immediate danger.
      </p>
    </div>
  );
}
