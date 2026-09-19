import type { Metadata } from "next";
import { ROOT_CONTEXT } from "@/lib/site-context";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Root-level slugs that are real pages/route groups, not battle comparisons.
const RESERVED_SLUGS = [
  "about",
  "admin",
  "api",
  "articles",
  "disclaimer",
  "find-your-match",
  "how-we-rank",
  "reviews",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return {};
  return battleMetadata(battleSlug, ROOT_CONTEXT);
}

// Single-vertical build: every dynamic root slug is a head-to-head battle page
// (e.g. /headspace-vs-betterhelp). The multi-vertical hub branch has been removed.
export default async function BattlePage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();
  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
