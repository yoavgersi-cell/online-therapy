import Link from "next/link";
import { getConfig } from "@/lib/config-store";

// Single-site online-therapy footer. Category links are absolute site routes.
// Popular comparisons are resolved from live config, so an entry that isn't a
// real battle is silently dropped (the footer never renders a dead link).
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Reviews",
    links: [
      { label: "BetterHelp", href: "/reviews/betterhelp" },
      { label: "Headspace", href: "/reviews/headspace" },
      { label: "All Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Does Online Therapy Work", href: "/articles/does-online-therapy-work" },
      { label: "Therapy That Takes Insurance", href: "/articles/online-therapy-that-takes-insurance" },
      { label: "Online Therapy Cost", href: "/articles/online-therapy-cost" },
      { label: "How to Choose a Platform", href: "/articles/how-to-choose-an-online-therapy-platform" },
      { label: "Online Therapy by State", href: "/online-therapy" },
      { label: "All Guides", href: "/articles" },
    ],
  },
  {
    title: "Best Therapy For",
    links: [
      { label: "Beginners", href: "/online-therapy-for-beginners" },
      { label: "Best Value", href: "/cheapest-online-therapy" },
      { label: "With Insurance", href: "/best-online-therapy-with-insurance" },
      { label: "Anxiety", href: "/best-online-therapy-for-anxiety" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Rank", href: "/how-we-rank" },
      { label: "Contact", href: "/contact" },
      { label: "Medical Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

async function featuredComparisons(): Promise<{ label: string; href: string }[]> {
  try {
    const cfg = await getConfig();
    const nameOf = (id: string) => cfg.providers.find((p) => p.id === id)?.name ?? id;
    return (cfg.battles ?? []).slice(0, 5).map((b) => ({
      label: b.matchupLabel || `${nameOf(b.provider1Id)} vs ${nameOf(b.provider2Id)}`,
      href: `/${b.slug}`,
    }));
  } catch {
    return [];
  }
}

export async function Footer() {
  const comparisons = await featuredComparisons();
  const columns = [
    ...COLUMNS,
    ...(comparisons.length > 0 ? [{ title: "Popular Comparisons", links: comparisons }] : []),
  ];

  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand blurb */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-[13px] leading-relaxed text-gray-500">
              <span className="font-bold text-[#1A7A52]">Online Therapy Hub</span> is an independent comparison
              publisher for online therapy and mental-health platforms.
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-gray-400">
              In crisis? In the US, call or text <span className="font-semibold text-gray-500">988</span> - the
              Suicide &amp; Crisis Lifeline - free and open 24/7.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-[#191919]">{col.title}</h4>
              <nav className="space-y-1.5">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="block text-[13px] text-gray-500 hover:text-[#1A7A52]">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="mb-4 text-xs text-gray-400">
            <strong className="text-gray-500">Affiliate Disclosure:</strong> Online Therapy Hub may earn a commission
            when you click on links and make a purchase. This does not affect our rankings or reviews. We are
            committed to providing honest, independent comparisons to help you make informed decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[12px] text-gray-400">
              &copy; {new Date().getFullYear()} Online Therapy Hub. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-300">
              onlinetherapyhub.com is not a mental-health provider. Always consult a licensed clinician.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
