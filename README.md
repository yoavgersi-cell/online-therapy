# Top Online Therapy

Independent comparison site for online therapy and mental-health platforms
(toponlinetherapy.io). Built on the same Next.js structure as the TRT and ED
treatment sites: ranked provider cards on the homepage, provider reviews,
head-to-head comparisons, guides, programmatic per-state pages, a matching
quiz, and a light-green theme.

Partners: **BetterHelp**, **Talkspace** and **Headspace**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

- `src/lib/seeds/online-therapy.ts` - providers, reviews, comparisons, FAQs,
  landing pages, quiz copy (code-authoritative content).
- `src/lib/seeds/online-therapy-articles.ts` - guides shown under `/articles`.
- `src/lib/config.ts` - vertical id, affiliate provider list, ranking positions.
- `src/lib/site-context.ts`, `src/lib/indexnow.ts` - domain and IndexNow key.
- `src/components/reddit-community.tsx`, `src/components/medical-sources.tsx` -
  verified community feedback and cited references.
- `src/app/globals.css` - theme tokens.

## Content rules

Mental-health content is YMYL at its most sensitive. Keep every crisis-adjacent
surface pointing to the 988 Suicide & Crisis Lifeline, never invent prices,
ratings or outcome statistics, and only add a provider's Reddit or audit entry
with real, verified source material.

## Deploy

Deploy on Vercel. `vercel.json` schedules the IndexNow cron.
