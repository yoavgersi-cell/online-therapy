import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Online Therapy Hub editorial team - corrections, feedback, platform and partnership inquiries for onlinetherapyhub.com.",
  alternates: { canonical: "https://www.onlinetherapyhub.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-[#191919]">Contact Us</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          We&apos;re an independent editorial team that researches and compares online
          online therapy and mental-health platforms. We&apos;d love to hear from you - whether you have
          feedback, spotted something that needs correcting, or want to reach us about a partnership.
        </p>

        <div className="my-6 flex items-center gap-3 rounded-xl border border-[#EAEAEA] bg-white p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1A7A52]/8">
            <Mail className="h-5 w-5 text-[#1A7A52]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#191919]">Email us</p>
            <a href="mailto:hello@onlinetherapyhub.com" className="text-[15px] font-semibold text-[#1A7A52] hover:underline">
              hello@onlinetherapyhub.com
            </a>
          </div>
        </div>

        <h2 className="pt-2 text-xl font-semibold text-[#191919]">What we can help with</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li><strong>Corrections &amp; feedback</strong> - see something inaccurate or out of date? Let us know and we&apos;ll review it.</li>
          <li><strong>Editorial questions</strong> - how we research, score, and rank providers (see our{" "}
            <a href="/how-we-rank" className="font-semibold text-[#1A7A52] hover:underline">methodology</a>).</li>
          <li><strong>Provider &amp; partnership inquiries</strong> - if you represent a provider and want to reach us.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What we can&apos;t help with</h2>
        <p>
          We are <strong>not a mental-health provider</strong> and cannot give medical advice, diagnose
          conditions, or answer questions about a specific therapist, session or subscription. For anything
          clinical, please consult a licensed professional or contact the platform directly. If you are in
          crisis, call or text 988 (US) - free and open 24/7. This site is intended for adults aged 18 and older.
        </p>

        <p className="pt-2 text-sm text-gray-400">
          We aim to respond to messages within a few business days.
        </p>
      </div>
    </div>
  );
}
