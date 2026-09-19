import Link from "next/link";
import type { Expert } from "@/lib/config";

function initials(name: string) {
  const words = name.replace(/^The\s+/i, "").split(/\s+/).filter(Boolean);
  const letters = words.length >= 2 ? words[0][0] + words[words.length - 1][0] : (words[0]?.slice(0, 2) ?? "");
  return letters.toUpperCase();
}

// Reusable credibility byline. Drops into battle pages, reviews, articles.
// `label` sets the framing: "Analysis by", "Reviewed by", "Written by".
export function ExpertByline({
  expert,
  label = "Analysis by",
  href = "/about",
  showRole = true,
  compact = false,
}: {
  expert: Expert;
  label?: string;
  href?: string;
  /** Hide the trailing "· <role>" - keeps the byline to name only. */
  showRole?: boolean;
  /** Smaller avatar + tighter padding for a lower-weight metadata line. */
  compact?: boolean;
}) {
  const credit = expert.credentials ? `${expert.name}, ${expert.credentials}` : expert.name;

  return (
    <Link
      href={href}
      className={`group inline-flex items-center ${compact ? "gap-1.5" : "gap-2"}`}
    >
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1A7A52]/[0.07] text-[10px] font-bold text-[#1A7A52] ${
          compact ? "h-5 w-5" : "h-6 w-6"
        }`}
      >
        {expert.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={expert.avatar} alt={expert.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          initials(expert.name)
        )}
      </span>
      <span className="text-[12px] leading-tight text-gray-500">
        <span className="text-gray-400">{label} </span>
        <span className="font-semibold text-[#191919] group-hover:text-[#1A7A52]">{credit}</span>
        {showRole && <span className="hidden text-gray-400 sm:inline"> · {expert.role}</span>}
      </span>
    </Link>
  );
}
