import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RelatedLink } from "@/lib/related";

// "Keep exploring" block: a few topic-cluster links with page-specific anchors.
// Renders nothing when there are no links, so pages without a cluster are unchanged.
export function RelatedLinks({ links, heading = "Keep exploring" }: { links: RelatedLink[]; heading?: string }) {
  if (links.length === 0) return null;
  return (
    <nav aria-label={heading} className="mt-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-7">
      <h2 className="mb-4 text-[18px] font-bold text-[#191919]">{heading}</h2>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-[14px] font-semibold text-[#1A7A52] transition-colors hover:border-[#1A7A52]/30 hover:bg-[#1A7A52]/[0.02]"
            >
              <span>{l.label}</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
