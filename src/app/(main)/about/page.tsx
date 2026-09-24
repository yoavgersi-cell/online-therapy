import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, Award, BookOpen, Search, BarChart3 } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { ExpertTeam } from "@/components/expert-team";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Top Online Therapy - Our Mission, Team & Review Methodology",
  description:
    "Learn how toponlinetherapy.io independently ranks and reviews online therapy and mental-health platforms. Our editorial methodology, review process, and commitment to unbiased comparisons.",
  alternates: {
    canonical: "https://www.toponlinetherapy.io/about",
  },
};

export default async function AboutPage() {
  const config = await getConfig();
  const experts = config.experts ?? [];

  const teamSchema = experts.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "toponlinetherapy.io",
    url: "https://www.toponlinetherapy.io",
    employee: experts.map((e) => ({
      "@type": "Person",
      name: e.credentials ? `${e.name}, ${e.credentials}` : e.name,
      jobTitle: e.role,
      description: e.bio,
    })),
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {teamSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />}
      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            About Top Online Therapy
          </h1>
          <p className="mt-3 max-w-[600px] text-[16px] leading-relaxed text-gray-500">
            We help people make informed decisions about online therapy by independently
            comparing platforms on insurance coverage, session formats, clinician support,
            and value.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Our Mission</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            The online therapy market has grown rapidly, with subscription platforms, insurance-billed
            teletherapy services and mindfulness apps all competing under the same label. For someone
            looking for help, this creates a confusing landscape of options with sharply different
            pricing, insurance arrangements, session formats, scope of care, and privacy practices.
          </p>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            Top Online Therapy exists to simplify this decision. We independently research,
            compare, and review the major platforms so you can find the right fit for your
            needs, budget, and privacy - without spending hours doing the research yourself.
          </p>
        </section>

        {/* What we do - icons grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-[22px] font-bold text-[#191919]">What We Do</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Search, title: "Research Platforms", desc: "We evaluate every major online therapy platform on insurance coverage, pricing, session formats, clinician licensing, and member experience." },
              { icon: BarChart3, title: "Compare Side by Side", desc: "Our comparison tools let you see exactly how platforms differ on the factors that matter most to you." },
              { icon: BookOpen, title: "Educate Readers", desc: "Our articles and guides help you understand how online therapy works, what it costs, whether insurance covers it, and what to expect from care." },
            ].map(({ icon: Icon, title, desc }) => (
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

        {/* Editorial team */}
        <ExpertTeam experts={experts} />

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How We Rank Providers</h2>
          <p className="mb-6 text-[16px] leading-[1.75] text-gray-600">
            Our rankings are based on a weighted evaluation across six core categories.
            We update our assessments regularly as platforms change their pricing, services,
            and treatment offerings.
          </p>
          <div className="space-y-4">
            {[
              { category: "Clinical Credibility", weight: "25%", desc: "Licensed, state-credentialed therapists and clinicians, quality of intake and matching, clear scope of care, and privacy standards." },
              { category: "Care Access", weight: "20%", desc: "Speed of matching, session formats (video, phone, chat, messaging), specialty coverage, and how easily you can switch therapists." },
              { category: "Pricing & Value", weight: "20%", desc: "Insurance acceptance and copays, self-pay rates, financial aid, and what a plan includes per week. Transparency of pricing and absence of hidden fees." },
              { category: "Member Experience", weight: "15%", desc: "Signup and intake process, app and interface quality, customer support responsiveness, and billing clarity." },
              { category: "Ongoing Support", weight: "10%", desc: "Between-session messaging, tools and worksheets, group sessions, and continuity of care when re-matching." },
              { category: "Flexibility", weight: "10%", desc: "Subscription terms, cancellation and pause policies, ability to change session formats, and HSA/FSA acceptance." },
            ].map(({ category, weight, desc }) => (
              <div key={category} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                <span className="shrink-0 rounded bg-[#1A7A52] px-2.5 py-1 text-[12px] font-bold text-white">{weight}</span>
                <div>
                  <p className="text-[14px] font-bold text-[#191919]">{category}</p>
                  <p className="mt-0.5 text-[13px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] leading-[1.75] text-gray-600">
            Want the full picture? Read our detailed{" "}
            <Link href="/how-we-rank" className="font-semibold text-[#1A7A52] hover:underline">
              ranking &amp; review methodology
            </Link>{" "}
            - the factors we score, where our data comes from, and how we pick winners.
          </p>
        </section>

        {/* Editorial standards */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Editorial Standards</h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#191919]">Independence.</strong> Our editorial team operates
              independently. Provider rankings and reviews are determined by our evaluation criteria,
              not by commercial relationships.
            </p>
            <p>
              <strong className="text-[#191919]">Transparency.</strong> We clearly disclose that some
              providers compensate us through affiliate partnerships. This may affect how providers are
              displayed but does not influence our ratings or review content.
            </p>
            <p>
              <strong className="text-[#191919]">Evidence-based.</strong> Our mental-health content references
              published research and established guidance from sources like NIMH and the APA when
              discussing what online therapy can and cannot do.
            </p>
            <p>
              <strong className="text-[#191919]">Regular updates.</strong> We continuously review and
              update our rankings, reviews, and articles as providers change their offerings, new clinical
              data emerges, and the market evolves.
            </p>
          </div>
        </section>

        {/* Trust signals */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <Users className="h-8 w-8 shrink-0 text-[#1A7A52]" strokeWidth={1.5} />
              <div>
                <p className="text-[18px] font-extrabold text-[#191919]">124,598</p>
                <p className="text-[12px] text-gray-500">People compared therapy platforms this month</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <Award className="h-8 w-8 shrink-0 text-[#1A7A52]" strokeWidth={1.5} />
              <div>
                <p className="text-[18px] font-extrabold text-[#191919]">{config.providers.length}</p>
                <p className="text-[12px] text-gray-500">Platforms independently reviewed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
              <Shield className="h-8 w-8 shrink-0 text-[#1A7A52]" strokeWidth={1.5} />
              <div>
                <p className="text-[18px] font-extrabold text-[#191919]">{(config.articles ?? []).length}+</p>
                <p className="text-[12px] text-gray-500">Expert articles and guides published</p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical disclaimer */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Medical Disclaimer</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              Top Online Therapy is not a mental-health provider and does not deliver therapy or
              prescribe medication. The information on this site is for general information and comparison
              purposes only and should not replace professional advice. Therapy and psychiatric care should
              be provided by licensed clinicians, and what is right for you depends on your situation.
              Online platforms are not emergency services - if you are in crisis in the US, call or text
              988, free and open 24/7. Individual results vary.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#191919]">Ready to compare platforms?</p>
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
              Read the Reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
