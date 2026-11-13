import type { Metadata } from "next";

import { OG_IMAGE } from "@/lib/seo";
export const metadata: Metadata = {
  title: "Find Your Best Online Therapy Match - Free Quiz",
  description:
    "Answer a few quick questions and get a personalized online therapy platform recommendation. Compare platforms based on your needs, budget, and how you want sessions to work.",
  alternates: {
    canonical: "https://www.toponlinetherapy.io/find-your-match",
  },
  openGraph: { images: [OG_IMAGE],
    siteName: "Top Online Therapy",
    title: "Find Your Best Online Therapy Match",
    description:
      "Take our free quiz and get matched with the best online therapy platform for your needs and budget.",
    url: "https://www.toponlinetherapy.io/find-your-match",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Find Your Best Online Therapy Match</h1>
      {children}
    </>
  );
}
