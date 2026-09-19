import { BookOpen } from "lucide-react";

// Authoritative outgoing citations, per vertical. Every entry is a real,
// verifiable source (FDA pages, peer-reviewed trials via DOI, NIH/MedlinePlus)
// - never invent or approximate a citation. Rendered as a "Sources" section on
// articles, reviews and comparisons so YMYL pages visibly ground their claims.
export interface MedicalSource {
  label: string;
  publisher: string;
  href: string;
}

export const SOURCES_BY_VERTICAL: Record<string, MedicalSource[]> = {
  "online-therapy": [
    {
      label: "Psychotherapies - overview of evidence-based approaches",
      publisher: "National Institute of Mental Health (NIMH), NIH",
      href: "https://www.nimh.nih.gov/health/topics/psychotherapies",
    },
    {
      label: "Understanding psychotherapy and how it works",
      publisher: "American Psychological Association (APA)",
      href: "https://www.apa.org/topics/psychotherapy/understanding",
    },
    {
      label: "Depression - symptoms, treatments and evidence",
      publisher: "National Institute of Mental Health (NIMH), NIH",
      href: "https://www.nimh.nih.gov/health/topics/depression",
    },
    {
      label: "Anxiety disorders - symptoms, treatments and evidence",
      publisher: "National Institute of Mental Health (NIMH), NIH",
      href: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
    },
    {
      label: "988 Suicide & Crisis Lifeline (call or text 988, free, 24/7)",
      publisher: "Substance Abuse and Mental Health Services Administration",
      href: "https://988lifeline.org/",
    },
    {
      label: "SAMHSA National Helpline (free, confidential, 24/7 treatment referral)",
      publisher: "Substance Abuse and Mental Health Services Administration",
      href: "https://www.samhsa.gov/find-help/national-helpline",
    },
  ],
};

// Compact citation list for the bottom of YMYL content pages. Renders nothing
// for verticals without a curated source list yet.
export function MedicalSources({ vertical }: { vertical: string }) {
  const sources = SOURCES_BY_VERTICAL[vertical];
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[#1A7A52]" strokeWidth={2} />
        <h2 className="text-[15px] font-bold uppercase tracking-[0.05em] text-[#191919]">
          Sources &amp; medical references
        </h2>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-gray-500">
        Treatment facts on this page are grounded in regulatory guidance and peer-reviewed research.
        Pricing and plan details come from each provider&apos;s published information. This content
        is for information only and is not medical advice - always consult a licensed clinician
        before starting treatment.
      </p>
      <ol className="space-y-2">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed">
            <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
            <span className="text-gray-600">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#1A7A52] underline underline-offset-2 hover:text-[#14634A]"
              >
                {s.label}
              </a>{" "}
              <span className="text-gray-400">- {s.publisher}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// One-line affiliate disclosure under the byline, above the first affiliate
// link (FTC: clear, conspicuous, before the links). Deliberately compact - the
// "not medical advice" disclaimer lives once at the bottom of these pages
// (SourcesMethodology footer, or the MedicalSources intro below) instead of
// being repeated here.
export function TrustDisclosure({ disclaimerHref }: { disclaimerHref: string }) {
  return (
    <p className="mt-2.5 max-w-[720px] text-[11.5px] leading-[1.55] text-gray-400 sm:mt-3 sm:text-[12px]">
      We may earn a commission from links on this page - it never affects our rankings (
      <a href={disclaimerHref} className="font-medium text-[#1A7A52] hover:underline">
        how we stay objective
      </a>
      ).
    </p>
  );
}
