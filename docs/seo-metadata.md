# Page titles and meta descriptions: how to change them

This is the process for changing a page title or meta description on toponlinetherapy.io. It follows the change made on 20 November 2026.

## Where each one lives

| Page type | Title source | Description source |
|---|---|---|
| Articles and guides | `title` in `src/lib/seeds/online-therapy-*.ts` and `*-article.ts` | `description` in the same object |
| Pillar and comparison pages (`/best-online-psychiatry`, `/cheapest-online-therapy`, etc.) | `seoTitle` in `src/lib/seeds/online-therapy.ts` | `seoDescription` in the same object |
| State pages (`/online-therapy/<state>`) | Template in `src/app/(main)/online-therapy/[state]/page.tsx` | Same file |
| Homepage | `src/app/(main)/page.tsx` (`metadata`, including `openGraph`) | Same file |

Do not use `ARTICLE_SEO_OVERRIDES` in `src/components/pages/article-page.tsx`. It only applies to the weight-loss vertical, so it has no effect on this site.

## Limits

- **Title:** 60 characters or fewer. Article pages add ` | Top Online Therapy` (24 characters) in the browser, so keep article titles near 45 to 50 characters if the brand suffix must stay visible.
- **Description:** 160 characters or fewer.
- Check them with `node scripts/check-meta-lengths.mjs`. Use `--strict` to fail on any violation.

## How to choose which page to change

1. Open the Search Console **Pages** report for the last 28 days. Look for pages with many impressions and a click-through rate under 1%. Those are the candidates.
2. Check the same pages in the Bing Webmaster report. A page that does well in both is a safer choice.
3. Do not change pages that already get clicks. In November 2026 that was `/articles/free-and-low-cost-therapy-options`, which earned clicks on both engines, so only its description was trimmed.
4. Pick the query the page should win. Put that phrase near the start of the title and in the description.

## What to write

- Lead with the query, then the year, then the qualifier. Example: `Online Therapy Cost in 2026: $69-$109/Week or $0-$30 Copays`.
- Do not write numbers that are not verified. A price, rating or copay appears only if it already appears on the page with a source. Unverified figures (for example betterhelp's self-pay range) stay out of titles and descriptions.
- The description should say what the page answers, not repeat the title.
- Use the brand spelling rules: `betterhelp` and `headspace` in lowercase, `Talkspace` capitalized.

## How to verify

1. `node scripts/check-meta-lengths.mjs` shows no new violations for the fields you changed.
2. `npx tsc --noEmit -p .` passes.
3. `npm run build` passes.
4. Start the production server and read the `<title>` and `<meta name="description">` of the changed pages with `curl`.

## What was changed on 20 November 2026

| Page | Before (title) | After (title) |
|---|---|---|
| Homepage | Best Online Therapy Platforms of 2026 - Compare Top Providers | Best Online Therapy Platforms of 2026: Compare Providers |
| Online therapy guide | Online Therapy: The Complete 2026 Guide (Cost, Insurance, Platforms) | Online Therapy in 2026: Cost, Insurance and Platforms |
| State pages (all states) | Best Online Therapy in {State} (2026): Platforms, Insurance & Cost | Online Therapy in {State} (2026): Costs & Insurance |
| Best online psychiatry | Best Online Psychiatry (2026): Medication Management by Video, Compared | Best Online Psychiatry (2026): Medication Visits Compared |
| Talkspace pricing | Talkspace Pricing (2026): $69-$109/Week Self-Pay, $0-$30 Copays With Insurance | Talkspace Pricing (2026): $69-$109/Week Self-Pay |
| betterhelp alternatives | betterhelp Alternatives (2026): Options That Take Insurance, Add Psychiatry or Cost Less | betterhelp Alternatives (2026): Insurance, Psychiatry, Cost |
| Online therapy cost | Online Therapy Cost in 2026: $69-$109/Week Self-Pay or $0-$30 Copays | Online Therapy Cost in 2026: $69-$109/Week or $0-$30 Copays |
| Free online therapy (description only) | Real routes to affordable mental-health support... | Real routes to affordable support... |

The state-page template covers all states at once, so its change applies to every state page. The other rows change one page each.

## Not yet done

The checker reports about 45 remaining fields over the limit, mostly article descriptions. Those should be fixed in batches, starting with pages that have the most impressions.
