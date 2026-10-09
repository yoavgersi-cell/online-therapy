import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_ORIGIN, SITE_NAME, REVIEWERS, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";

const CANONICAL = `${SITE_ORIGIN}/medical-review-policy`;
const TITLE = `Medical Review Policy: How ${SITE_NAME} Checks Health Content`;
const DESCRIPTION =
  `Who reviews the medical statements on ${SITE_NAME}, what they check, what they do not, how review dates work, and how to report an error.`;
const UPDATED = "2026-10-09";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { siteName: SITE_NAME, title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

export default function MedicalReviewPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": CANONICAL,
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    dateModified: UPDATED,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_ORIGIN },
    about: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN, employee: REVIEWERS.map(reviewerPersonSchema) },
  };
  const ext = "font-semibold text-[#1A7A52] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review policy" }]} />
          <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">How we review health content</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            {SITE_NAME} compares online therapy and mental-health platforms and publishes guides on therapy, psychiatry
            and getting care online. The medical and scientific statements in that content are checked by a named
            reviewer with the training to check them. This page says exactly what that means, and what it does not.
          </p>
          <p className="mt-3 text-[13px] text-gray-500">Last updated {UPDATED}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Who reviews</h2>
          <div className="space-y-3">
            {REVIEWERS.map((r) => (
              <Link key={r.slug} href={reviewerPath(r)} className="flex items-center gap-4 rounded-xl border border-[#E5E5E5] bg-white p-4 transition-colors hover:border-[#1A7A52]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image.thumb} alt={r.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <span>
                  <span className="block text-[15px] font-bold text-[#191919]">{reviewerDisplayName(r)}</span>
                  <span className="block text-[13px] text-gray-500">{r.jobTitle} · {r.headline}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-gray-500">
            Our reviewer is a licensed medical laboratory scientist with a Master of Public Health degree and clinical-trial
            experience - not a licensed therapist, psychologist or prescribing clinician. We say &ldquo;reviewed for
            medical accuracy&rdquo; rather than &ldquo;medically reviewed by a doctor&rdquo; for that reason.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What is reviewed</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>How talk therapy, cognitive behavioral therapy (CBT) and other evidence-based approaches work, and the terminology used to describe them.</li>
            <li>Statements about psychiatric medication and online psychiatry: what can and cannot be prescribed by telehealth, and how evaluation and follow-up work.</li>
            <li>Research claims about whether online therapy works, and whether the cited study or guideline actually supports the statement.</li>
            <li>Descriptions of conditions such as anxiety and depression, and of therapist and prescriber credentials and licensing.</li>
            <li>Crisis guidance: that every crisis-adjacent page points to the 988 Suicide &amp; Crisis Lifeline and emergency services, and that platforms are described as ongoing care, not emergency care.</li>
            <li>Whether a claim is supported by the source it cites, and whether the source is current.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What is not reviewed</h2>
          <p className="mb-3">
            Prices, platform rankings, partner selection, platform descriptions and &ldquo;best for&rdquo; verdicts are editorial.
            They are produced by the {SITE_NAME} editorial team under the method on{" "}
            <Link href="/how-we-rank" className={ext}>how we rank</Link>, and the reviewer has no role in them.
            Customer review figures and excerpts (Trustpilot, Reddit) are quoted as captured and are not medical evidence.
          </p>
          <p>
            Reviewers do not choose platforms, set prices or rankings, or take part in commercial partnerships. We may earn
            a commission from platform links; that never changes a medical statement or a review date.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">How review dates work</h2>
          <p className="mb-3">
            Every content page carries a review bar under its title. It has two states:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-[#191919]">&ldquo;Reviewed for medical accuracy by&rdquo; with a date.</strong> The named
              reviewer went through that page on that date. The same date is published in the page&rsquo;s structured data.
            </li>
            <li>
              <strong className="text-[#191919]">&ldquo;Medical reviewer&rdquo; with no date.</strong> The page names the site&rsquo;s
              reviewer but has not yet been reviewed. We do not backfill dates.
            </li>
          </ul>
          <p className="mt-3">
            A page is re-reviewed when its medical content changes materially or when the underlying guidance changes.
            Price and ranking updates do not trigger a medical re-review and do not change the review date.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-[#E6F4EC] bg-[#E6F4EC]/50 p-6">
          <h2 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-[#191919]">
            <ShieldCheck className="h-5 w-5 text-[#1A7A52]" strokeWidth={2} />
            Found an error?
          </h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            Tell us through our <Link href="/contact" className={ext}>contact page</Link>, with the
            page address and the statement in question. Confirmed medical errors are corrected and the page is re-reviewed.
          </p>
        </section>

        <p className="text-[13px] leading-relaxed text-gray-500">
          Nothing on this site is medical advice. Whether therapy, medication or both is right for you is a decision for a
          licensed clinician. Online platforms are for ongoing care, not emergencies - if you are in crisis in the US, call
          or text 988 (the Suicide &amp; Crisis Lifeline, free and open 24/7), or call 911 in immediate danger.
        </p>
      </div>
    </div>
  );
}
