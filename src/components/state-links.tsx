import Link from "next/link";
import { STATES } from "@/lib/states";

// Compact "online therapy by state" grid for the homepage. The state pages
// are the site's early search engine, so the homepage links every one of them
// directly (not only via the footer) to pass internal link equity.
export function StateLinks() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 className="mb-2 text-[22px] font-bold text-[#191919]">Online Therapy by State</h2>
        <p className="mb-5 max-w-[720px] text-[15px] leading-relaxed text-gray-600">
          Therapists are licensed state by state, so the platforms match you with clinicians credentialed
          where you live. Pick your state for what serves it and what to know about coverage there.
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4 lg:grid-cols-6">
          {STATES.map((s) => (
            <Link
              key={s.slug}
              href={`/online-therapy/${s.slug}`}
              className="block truncate rounded-md px-2 py-1 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#1A7A52]"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
