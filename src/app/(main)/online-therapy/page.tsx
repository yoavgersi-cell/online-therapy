import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/lib/states";

export const revalidate = 60;

const SITE_URL = "https://www.onlinetherapyhub.com";

export const metadata: Metadata = {
  title: { absolute: "Online Therapy by State (2026) | Online Therapy Hub" },
  description:
    "Find online therapy in your state. Compare platforms that match you with therapists licensed where you live - video, phone or messaging sessions, insurance accepted. Pick your state to see options.",
  alternates: { canonical: `${SITE_URL}/online-therapy` },
  openGraph: {
    title: "Online Therapy by State (2026)",
    description: "Compare online therapy platforms with therapists licensed in your state.",
    url: `${SITE_URL}/online-therapy`,
    type: "website",
  },
};

export default function OnlineTherapyIndex() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-[#191919]">Online Therapy by State</h1>
      <p className="mb-4 max-w-2xl text-[16px] leading-[1.7] text-gray-700">
        Online therapy is available in all 50 states, but therapists are licensed state by state - so a
        platform matches you with a clinician credentialed where you live, and sessions happen by video, phone,
        chat or messaging from wherever you are. Choose your state below to see the platforms that serve your
        area and what to know about coverage and licensing there.
      </p>
      <p className="mb-8 max-w-2xl text-[15px] leading-[1.7] text-gray-600">
        Prefer to jump straight in? See our{" "}
        <Link href="/" className="font-semibold text-[#1A7A52] hover:underline">full platform comparison</Link>{" "}
        or read our guide to{" "}
        <Link href="/articles/how-to-choose-an-online-therapy-platform" className="font-semibold text-[#1A7A52] hover:underline">
          choosing an online therapy platform
        </Link>.
      </p>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
        {STATES.map((s) => (
          <Link
            key={s.slug}
            href={`/online-therapy/${s.slug}`}
            className="block rounded-md px-3 py-2 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-[#1A7A52]"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
