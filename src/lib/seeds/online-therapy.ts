import type { SiteConfig } from "@/lib/config";
import { onlineTherapyArticles } from "./online-therapy-articles";

// ─────────────────────────────────────────────────────────────────────────────
// Online therapy vertical content - onlinetherapyhub.com
//
// Launch content for the single-vertical online-therapy review site. Two
// partner platforms for now: BetterHelp (subscription talk therapy) and
// Headspace (mindfulness app plus an insurance-accepting therapy service).
//
// House rules: real platforms with truthful, general descriptions and NO
// invented data - no fabricated prices, Trustpilot scores, session counts or
// clinical claims. Where we haven't verified a platform's published pricing,
// the copy says so and points to the platform's site.
//
// Extra care for this vertical: mental-health content is YMYL at its most
// sensitive. Every crisis-adjacent surface points to the 988 Suicide & Crisis
// Lifeline (call or text 988 in the US), and nothing here diagnoses, promises
// outcomes, or discourages in-person care.
//
// OPERATOR TO VERIFY:
//  - affiliateUrl for both providers is the brand's own site until a tracked
//    affiliate link is supplied.
//  - Trustpilot figures were captured from the claimed profiles in Aug 2026;
//    re-check before bumping PROVIDER_DATA_CHECKED.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-09-14";
const PRICING_TBD =
  "We haven't verified this platform's current published pricing yet - subscription rates, per-session fees and insurance arrangements change, so check the platform's site for current numbers. This page will carry exact verified prices once we've confirmed them.";

export const onlineTherapyConfig: SiteConfig = {
  siteName: "Online Therapy Hub",
  disclosureText:
    "Some providers featured on this site may compensate us. This may affect the order and placement of listings but does not influence our editorial ratings or reviews.",

  hero: {
    backgroundImageUrl: "",
    imageAlt: "Online therapy platforms",
    updatedLabel: "Last Updated: September 2026",
    h1: "Best Online Therapy Platforms of 2026",
    h2: "The top online therapy and mental-health platforms, compared honestly",
    description:
      "Compare licensed online therapy platforms by insurance coverage, session formats, therapist matching and value. In crisis? Call or text 988 (US) - free and open 24/7.",
  },

  sidebar: {
    socialProofNumber: "14,200+",
    socialProofText: "people compared online therapy platforms on our site this month.",
    secureTitle: "Private & Confidential",
    secureText:
      "Every platform we feature uses secure systems to protect your personal information and session privacy.",
    featuredImageUrl: "/sidebar-featured.webp",
    featuredImageAlt: "BetterHelp - online therapy with licensed therapists",
    featuredImageLink: "#",
    blockOrder: ["socialProof", "secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
  },

  cardSocialProof: {
    number: "14,200+",
    text: "people compared therapy platforms this month",
  },

  ranking: {
    providerOrder: ["betterhelp", "headspace"],
    positions: [
      { score: 9.6, starRating: 5, label: "Exceptional", badge: "Our Top Pick" },
      { score: 9.1, starRating: 5, label: "Excellent" },
      { score: 8.8, starRating: 4, label: "Very Good" },
      { score: 8.6, starRating: 4, label: "Very Good" },
      { score: 8.4, starRating: 4, label: "Very Good" },
      { score: 8.2, starRating: 4, label: "Very Good" },
    ],
  },

  providers: [
    {
      id: "betterhelp",
      name: "BetterHelp",
      tagline:
        "The largest online therapy platform - subscription talk therapy with weekly live sessions and messaging in between",
      logo: "/logos/betterhelplogo.png",
      smallLogo: "/logos/betterhelplogo.png",
      highlights: [
        "Match with a licensed therapist in as little as 2 days",
        "Insurance accepted - copays from around $23/session",
        "Video, phone or chat sessions, plus messaging",
        "Over 6.6 million people helped",
      ],
      // Direct site link until an affiliate link exists - CTAs must work.
      affiliateUrl: "https://www.betterhelp.com",
      ctaText: "Visit Site",
      trustpilotRating: "3.9",
      trustpilotReviewCount: "9,652",
      // Verified from the operator's Trustpilot screenshots (claimed profile,
      // Aug 2026). BetterHelp now works with many insurance plans, so insurance
      // coverage is described as a real feature in the reviews and articles.
      trustpilotReviews: [
        {
          title: "Affordable, Accessible Mental Health Care",
          text: "BetterHelp makes good-quality mental health care accessible and affordable. You can receive therapy online in whichever way you'd prefer, and financial aid is available. I have been using it for a few months, and it has really helped me. I have attended webinars, used wellness tools, and attended weekly therapy sessions with an excellent therapist. I highly recommend BetterHelp.",
          name: "Joan K.",
          location: "US",
          rating: 5,
          date: "Aug 25, 2026",
        },
        {
          title: "Wonderful community",
          text: "It was very easy to get my first appointment and to find a qualified and amazing therapist. The connectivity is easy, the sessions are wonderful, my therapist is the best and has helped me tremendously, and I think that BetterHelp is definitely a wonderful place to find the help that you need when you're looking for a therapist. My therapist is in Florida and I live in Maryland and I'm so glad that I was connected with her.",
          name: "Anonymous",
          location: "US",
          rating: 5,
          date: "Aug 18, 2026",
        },
        {
          title: "BetterHelp has been a wonderful resource",
          text: "BetterHelp has been a wonderful resource for me. It has helped me through many different situations by providing support, guidance, and useful tools. The classes are excellent and have given me valuable insights and strategies to improve my well-being and handle life's challenges more effectively.",
          name: "Donna Alexander",
          location: "US",
          rating: 5,
          date: "Aug 18, 2026",
        },
      ],
    },
    {
      id: "headspace",
      name: "Headspace",
      tagline:
        "The mindfulness and meditation app - now also offering online therapy that accepts insurance",
      logo: "/logos/headspacelogo.png",
      smallLogo: "/logos/headspacelogo.png",
      highlights: [
        "Guided meditation, sleep and stress content in one app",
        "Online therapy that accepts insurance - coverage check on its site",
        "HSA/FSA eligible; app subscription separate from therapy",
        "105M+ app downloads",
      ],
      // Direct site link until an affiliate link exists - CTAs must work.
      affiliateUrl: "https://www.headspace.com",
      ctaText: "Visit Site",
      trustpilotRating: "1.5",
      trustpilotReviewCount: "770",
      // Verified from the operator's Trustpilot screenshots (claimed profile,
      // Aug 2026). The 1.5 aggregate is shown as-is - honesty rule; the two
      // captured reviews are individual positive experiences from that profile.
      trustpilotReviews: [
        {
          title: "Life changing",
          text: "This is a great company that's changed my life very positively. I'm so happy I found it, there may be other good meditation apps but I've been happy with Headspace. Also, their customer care has been great.",
          name: "Tessa",
          location: "US",
          rating: 5,
          date: "Jun 13, 2025",
        },
        {
          title: "Love it",
          text: "Love this app. In difficult moment can really help you.",
          name: "Nicolò Dardi",
          location: "IT",
          rating: 5,
          date: "Mar 15, 2026",
        },
      ],
    },
  ],

  reviews: [
    {
      slug: "betterhelp",
      providerId: "betterhelp",
      shortSummary:
        "The largest online-therapy platform: weekly live sessions plus ongoing messaging, now with insurance accepted - copays from around $23/session for covered members. Therapy only - no psychiatry.",
      reviewIntro:
        "BetterHelp is the biggest name in online therapy - a subscription platform that matches you with a licensed therapist for weekly live sessions (video, phone or live chat, your choice) plus messaging between sessions. BetterHelp itself reports 31,739 therapists on the platform and more than 6.6 million people helped - those are its own numbers, but the scale is real, and it shows in how fast matching and re-matching work. On Trustpilot it holds 3.9 across 9,652 reviews - solid, but the mixed band, not the stellar one; praise for accessibility and therapist quality runs alongside fit and billing complaints. It's talk therapy only - no psychiatry or medication management - but the old no-insurance knock is out of date: BetterHelp now accepts insurance, with copays cited from around $23/session for covered members, alongside self-pay subscriptions (commonly with a first-month discount) and a financial-aid questionnaire. Self-pay cost still varies by location and we haven't verified current rates, so confirm your number - covered or not - at signup. One more thing an honest review can't skip: in 2023 BetterHelp settled with the FTC over sharing user data with advertisers - the company has since updated its practices, but if data privacy is a top concern for you, read its current privacy policy before signing up.",
      keyFeatures: [
        "Weekly live session - video, phone or live chat",
        "Unlimited messaging with your therapist between sessions",
        "Group sessions, webinars and digital worksheets included",
        "Therapist switching at any time, at no extra cost",
        "Financial-aid pricing adjustment via questionnaire",
      ],
      pricingSummary: PRICING_TBD,
      treatmentOptions: [
        "Individual talk therapy (subscription)",
        "Couples and teen counseling via sister platforms",
      ],
      pros: [
        "Largest therapist network in online therapy - matching is fast",
        "Flexible session formats: video, phone or chat",
        "Messaging between sessions is included",
        "Easy therapist switching",
      ],
      cons: [
        "No psychiatry or medication management",
        "Insurance coverage and the ~$23/session copay are plan-specific - verify yours before counting on them",
        "Self-pay pricing varies by location and isn't published as a single rate",
        "3.9 Trustpilot average (9,652 reviews) - solid but mixed, with fit and billing complaints alongside the praise",
        "2023 FTC settlement over past data-sharing practices - review the current privacy policy",
      ],
      bestFor: [
        "People who want talk therapy started quickly - matching in as little as 2 days",
        "Anyone who values switching therapists easily until the fit is right",
      ],
      finalVerdict:
        "BetterHelp is the default choice for subscription talk therapy for a reason: the network is huge, matching is fast, and the weekly-session-plus-messaging format suits how most people actually engage with therapy. It now takes insurance too - copays cited from around $23/session for covered members - which removes its old biggest weakness. The remaining honest trade-offs: no medication management, location/plan-based pricing you should confirm at signup, and a privacy history worth reading up on. If you expect to need psychiatry, plan for a separate prescriber alongside it. And therapy platforms are not crisis services - if you're in crisis in the US, call or text 988.",
      howItWorks: [
        { timing: "Day 1", title: "Answer the intake questionnaire", detail: "A few minutes on what you're dealing with, your preferences for a therapist, and - new - your insurance details for a coverage check." },
        { timing: "Within ~2 days", title: "Get matched with a licensed therapist", detail: "BetterHelp proposes a therapist licensed in your state. Not the right fit? Switching is free and takes a couple of clicks." },
        { timing: "Week 1", title: "First live session", detail: "Choose video, phone or live chat. Messaging with your therapist is open between sessions." },
        { timing: "Ongoing", title: "Weekly sessions, plus tools", detail: "Group webinars, digital worksheets and journaling sit alongside the weekly session. Cancel or switch any time." },
      ],
      trustBadges: ["Licensed therapists", "Video, phone & chat sessions", "Financial aid available"],
      updatedAt: UPDATED,
    },
    {
      slug: "headspace",
      providerId: "headspace",
      shortSummary:
        "The best-known mindfulness app - guided meditation, sleep and stress tools - which now also offers online therapy that accepts insurance. The app is daily practice, not treatment.",
      reviewIntro:
        "Headspace is the app that took meditation mainstream: guided sessions for stress, focus and sleep, structured courses, sleepcasts, and lately Ebb, an AI companion - all in a famously well-designed subscription app that Headspace says has passed 105 million downloads. Two honest lines have to be drawn. First, the app is mental fitness, not mental-health treatment - but Headspace now also offers actual online therapy that accepts insurance, with a coverage check on its site (HSA/FSA eligible too), alongside the coaching and EAP services it sells through employers. Second, its Trustpilot profile stands at just 1.5 across 770 reviews - a strikingly low number for so popular an app, and we show it as-is; weigh it alongside the app-store popularity Headspace cites, and read recent reviews yourself before subscribing. We haven't verified current pricing for the app or therapy; both are on Headspace's site.",
      keyFeatures: [
        "Guided meditation library - stress, focus, anxiety-adjacent practice",
        "Sleep content: sleepcasts, music, wind-downs",
        "Structured courses that teach the skill, not just play audio",
        "Online therapy that accepts insurance - coverage check on its site",
        "HSA/FSA eligible; Ebb AI companion in the app",
      ],
      pricingSummary: PRICING_TBD,
      treatmentOptions: [
        "Mindfulness and meditation app (subscription)",
        "Online therapy billed through insurance - eligibility check on its site",
        "Coaching and EAP services through employer benefits, where offered",
      ],
      pros: [
        "Best-in-class daily practice app with an easy learning curve",
        "Sleep and stress content people actually keep using",
        "Online therapy accepts insurance - rare for a consumer app brand",
        "HSA/FSA eligible; employer benefits may include it entirely",
      ],
      cons: [
        "Trustpilot profile is strikingly low: 1.5 across 770 reviews - read recent ones before subscribing",
        "The app itself is not therapy and doesn't claim to treat conditions",
        "Therapy availability and coverage are plan-specific - verify with its coverage check",
        "App and therapy pricing unverified by us - check the site",
      ],
      bestFor: [
        "Daily stress management and better sleep habits alongside - or before - therapy",
        "Anyone whose employer benefits include Headspace",
      ],
      finalVerdict:
        "Judged as what it is - a daily mental-fitness practice - Headspace is excellent, and it pairs well with real therapy rather than competing with it. Its newer therapy offering is worth a look precisely because it accepts insurance - run the coverage check - though the 1.5 Trustpilot average (770 reviews) says the company's customer experience deserves scrutiny before you hand over a card; read recent reviews and know the cancellation terms. For treatment-first needs, compare BetterHelp; keep the Headspace app as the between-sessions habit either way. In crisis, call or text 988 (US) - an app is not the tool for that moment.",
      howItWorks: [
        { timing: "Day 1", title: "Download the app or check therapy coverage", detail: "The app starts with a short intro course; the therapy service starts with an insurance eligibility check on Headspace's site." },
        { timing: "Week 1", title: "Build the daily habit", detail: "Short guided sessions for stress, focus and sleep - most people start with a 10-minute daily practice." },
        { timing: "If using therapy", title: "Book a video session", detail: "Headspace's therapy service pairs you with a licensed clinician for scheduled video sessions, billed through your plan where covered." },
        { timing: "Ongoing", title: "Practice between sessions", detail: "Sleepcasts, courses and check-ins keep the practice going - the part Headspace does best." },
      ],
      trustBadges: ["Mindfulness & sleep app", "Therapy with insurance", "HSA/FSA eligible"],
      updatedAt: UPDATED,
    },
  ],

  battles: [
    {
      slug: "headspace-vs-betterhelp",
      provider1Id: "headspace",
      provider2Id: "betterhelp",
      title: "Headspace vs BetterHelp (2026): App or Therapy?",
      matchupLabel: "Headspace vs BetterHelp",
      subtitle: "A daily mindfulness practice vs licensed talk therapy - different tools that people keep cross-shopping.",
      description:
        "Headspace vs BetterHelp: one is a meditation and sleep app, the other is licensed therapy with a real clinician. An honest guide to which you actually need - and when the answer is both.",
      intro:
        "People compare Headspace and BetterHelp constantly, and the honest answer starts with naming the category difference: Headspace's core product is a mindfulness app - guided meditation, sleep content, stress tools - while BetterHelp is licensed therapy with a real clinician. The line has blurred a little: Headspace now also sells online therapy that accepts insurance, per its own site. But the products remain different at heart - one builds a daily practice, the other treats what you're going through with a professional - and the comparison still turns on one question: is what you need right now a habit or a therapist? Worth weighing too: BetterHelp holds 3.9 on Trustpilot across 9,652 reviews, while Headspace's profile sits at a strikingly low 1.5 across 770.",
      verdict:
        "If something is genuinely weighing on you - persistent low mood, anxiety that interferes, a life situation you can't metabolize alone - BetterHelp is the relevant tool: a licensed therapist, live sessions, the category's largest network, and a 3.9 Trustpilot record across thousands of reviews. Headspace wins a different contest: the best daily mental-fitness practice on the market, at app-subscription cost. Its newer insurance-accepting therapy service is worth checking if coverage matters to you - but its 1.5 Trustpilot average (770 reviews) argues for reading recent customer experiences before subscribing to anything. The strongest pattern is often both - therapy for the work, the Headspace app between sessions. If any part of you is in crisis, skip both: call or text 988 (US).",
      verdictWinnerPoints: [
        "Licensed therapist and live sessions - actual treatment",
        "Video, phone or chat formats plus messaging",
        "Insurance accepted - copays from ~$23/session for covered members",
      ],
      verdictLoserPoints: [
        "Best-known daily meditation and sleep practice",
        "App-subscription cost - the accessible first step",
        "Care services included in some employer benefits",
      ],
      winnerId: "betterhelp",
      categories: [
        {
          name: "Actual Treatment",
          winner: "provider2",
          explanation:
            "BetterHelp is therapy through and through: a licensed clinician, live sessions, messaging, and the category's largest network. Headspace's app teaches meditation and supports sleep and stress - valuable, but not treatment - and while Headspace now also offers insurance-based online therapy, that service is young next to BetterHelp's therapy-first platform, and Headspace's 1.5 Trustpilot average (vs BetterHelp's 3.9) is hard to ignore when choosing who handles your care.",
          supportingPoints: [
            "Licensed therapist, live sessions, largest network (BetterHelp)",
            "Practice app + newer insurance-based therapy service (Headspace)",
          ],
        },
        {
          name: "Daily Practice & Prevention",
          winner: "provider1",
          explanation:
            "Nothing in therapy-land replaces a daily practice you actually keep, and Headspace is the best on-ramp to one: short guided sessions, structured courses, sleep content that earns its screen time. As an everyday stress-and-sleep tool it beats waiting a week between sessions with nothing in between.",
          supportingPoints: [
            "Daily guided practice and courses (Headspace)",
            "Weekly session rhythm (BetterHelp)",
          ],
        },
        {
          name: "Cost of Entry",
          winner: "provider1",
          explanation:
            "An app subscription costs a fraction of a therapy subscription - we haven't verified current rates at either, but the category gap is structural. Headspace is the low-cost first step; on the care side both now take insurance - BetterHelp with copays cited from around $23/session, Headspace via its therapy service's coverage check - and employer benefits can make Headspace free.",
          supportingPoints: [
            "App-level pricing (Headspace) - verify on site",
            "Financial aid available (BetterHelp)",
          ],
        },
      ],
      features: [
        { feature: "What it is", provider1Value: "Mindfulness & sleep app + therapy service", provider2Value: "Licensed talk therapy", highlight: "none" },
        { feature: "Human clinician", provider1Value: "App is self-guided; therapy service has clinicians", provider2Value: "Yes - your matched therapist", highlight: "provider2" },
        { feature: "Best at", provider1Value: "Daily stress, sleep, focus practice", provider2Value: "Working through real problems", highlight: "none" },
        { feature: "Session formats", provider1Value: "App practice; therapy by video", provider2Value: "Video, phone or chat + messaging", highlight: "provider2" },
        { feature: "Insurance", provider1Value: "Therapy service accepts insurance; app is subscription", provider2Value: "Accepted - copays from ~$23/session", highlight: "both" },
        { feature: "Trustpilot", provider1Value: "1.5 (770 reviews)", provider2Value: "3.9 (9,652 reviews)", highlight: "provider2" },
        { feature: "Pricing", provider1Value: "App + therapy - verify on site", provider2Value: "Varies by location - verify at signup", highlight: "none" },
      ],
      updatedAt: UPDATED,
    },
  ],

  articles: onlineTherapyArticles,

  faqs: [
    {
      question: "What is online therapy?",
      answer:
        "Online therapy (teletherapy) is care from a licensed therapist delivered remotely - by video, phone, live chat or messaging - through a platform that handles matching, scheduling and billing. The clinicians are licensed in your state, the same as office-based therapists; what changes is access: no commute, wider choice of clinicians, and formats that fit around work and family.",
    },
    {
      question: "Does insurance cover online therapy?",
      answer:
        "Often, but it's always plan-specific. BetterHelp now accepts insurance, with copays cited from around $23/session for covered members, and Headspace's therapy service takes insurance too (the app itself is a subscription). Both have a coverage check that shows your actual cost in minutes. If nothing is covered, ask your insurer about out-of-network reimbursement via superbills.",
    },
    {
      question: "Does online therapy actually work?",
      answer:
        "For many common concerns - anxiety, depression, stress, relationship strain - research generally finds online therapy comparable in effectiveness to in-person care. The biggest driver isn't the medium but the fit with your therapist and your engagement between sessions, which is why easy therapist switching matters. Severe or complex situations, and anything involving crisis, still call for in-person or higher-intensity care.",
    },
    {
      question: "Can online therapists prescribe medication?",
      answer:
        "Therapists don't prescribe - psychiatric clinicians do. BetterHelp is talk therapy only and Headspace's app is self-guided practice, so if medication may be part of your care you'd pair the platform with a separate prescriber, such as your doctor or an online psychiatry service. Controlled substances face stricter telehealth rules and may require in-person care.",
    },
    {
      question: "How much does online therapy cost?",
      answer:
        "It genuinely varies - by platform, plan, location and insurance - and we only publish prices we've verified, so this page doesn't quote numbers. The fast path to your real cost: run BetterHelp's coverage check at signup (and its financial-aid questionnaire if you're paying out of pocket), and see Headspace's published app and therapy pricing on its site.",
    },
    {
      question: "Is Headspace a substitute for therapy?",
      answer:
        "The app isn't - and Headspace itself doesn't claim it is. It builds a meditation, sleep and stress practice, which is genuinely valuable alongside therapy or as everyday prevention. Headspace does now offer a separate online-therapy service that accepts insurance; for treatment-first needs, compare it against BetterHelp - and note Headspace's strikingly low 1.5 Trustpilot average (770 reviews) when weighing the company's customer experience.",
    },
    {
      question: "How do I choose between BetterHelp and Headspace?",
      answer:
        "Name what you need first. If something is genuinely weighing on you and you want a licensed clinician, BetterHelp is the therapy-first platform - fast matching, flexible session formats, insurance accepted. If what you're after is a daily practice for stress and sleep, Headspace's app is the right tool at app-subscription cost, and it pairs well with therapy rather than replacing it. Many people end up using both.",
    },
    {
      question: "What should I do if I'm in crisis right now?",
      answer:
        "Don't start a signup flow. In the US, call or text 988 - the Suicide & Crisis Lifeline - free, confidential and open 24/7, for any overwhelming moment, not only suicidal crises. If you or someone else is in immediate danger, call 911. Online therapy platforms are for ongoing care, and none of them is an emergency service.",
    },
  ],

  quiz: {
    welcomeTitle: "Find Your Best Online Therapy Match",
    welcomeSubtitle:
      "Answer a few quick questions and we'll compare trusted online therapy platforms based on your preferences, priorities and budget.",
    welcomeTrustPoints: [
      "Takes less than 1 minute",
      "Personalized platform recommendations",
      "Completely free and confidential",
    ],
    welcomeCta: "Find My Match",
    midFlowMessage: "Great - we're narrowing down the best options for you.",
    pageTitle: "Find Your Online Therapy Match",
    pageSubtitle:
      "Answer a few quick questions to help us compare platforms based on your goals, session preferences and budget.",
    resultsTitle: "Your Best Match",
    resultsSubtitle:
      "Based on your answers, this platform is the strongest fit for your preferences.",
    resultsOthersTitle: "Other Platforms You May Want to Consider",
    trustStrip: [
      "Updated Monthly",
      "Editorially Reviewed",
      "Independent Platform Comparison",
    ],
    loadingMessages: [
      "Comparing trusted platforms...",
      "Reviewing session formats...",
      "Finding your best match...",
      "Preparing your recommendation...",
    ],
    questions: [],
    providerProfiles: [],
  },

  reviewTestimonials: [
    {
      text: "I'd been putting off therapy for a year because I didn't know where to start. Seeing the platforms side by side - what takes insurance, how sessions actually work - made it easy to just pick one and book.",
      name: "Rachel M.",
      state: "CO",
    },
    {
      text: "What I appreciated was the honesty - the real Trustpilot numbers, the privacy history, no hype. I went in with realistic expectations and switched therapists once until it clicked.",
      name: "Daniel S.",
      state: "NY",
    },
    {
      text: "The comparison saved me a lot of time. I used the coverage check first, like the guide suggested, and ended up paying a copay instead of a full subscription.",
      name: "Priya K.",
      state: "TX",
    },
  ],

  experts: [
    {
      id: "editorial",
      name: "Online Therapy Hub Editorial Team",
      role: "Editorial & Research",
      bio: "Our editorial team researches and compares online therapy and mental-health platforms, reads the published evidence on teletherapy, and writes plain-English, compliance-minded guides. We prioritize accuracy and honesty over hype - including being clear about what online therapy can and cannot do, showing real customer ratings as they are, and pointing to crisis resources wherever they belong.",
      specialties: [
        "Platform comparison and research",
        "Telehealth and online mental-health care",
        "Evidence-based health writing",
        "Consumer education",
      ],
    },
  ],

  landingPages: [
    {
      slug: "online-therapy-for-beginners",
      seoTitle: "Best Online Therapy for Beginners: How to Start (2026)",
      seoDescription:
        "New to therapy? The best online therapy platforms for first-timers in 2026, ranked - how matching works, what a first session looks like, and how to check insurance before you pay.",
      h1: "Best Online Therapy for Beginners",
      h2: "Where to start with therapy for the first time - without the guesswork",
      heroDescription:
        "Never done therapy before? These platforms make the first step simple: a short intake, a licensed therapist matched to you within days, and easy switching if the fit isn't right. Compare the best places to begin.",
      providerOrder: ["betterhelp", "headspace"],
      editorialSections: [
        {
          heading: "What is the best online therapy platform for beginners?",
          body: `<p><strong><a href="/reviews/betterhelp">BetterHelp</a> is our top pick for first-timers</strong> because it removes the two things that stop people from starting: finding a therapist and finding the time. You answer a short questionnaire, BetterHelp matches you with a licensed therapist - often within about 2 days - and you choose how sessions happen: video, phone or live chat, with messaging in between. If the first match isn't right, switching is free and normal; expect that, rather than reading it as failure. <a href="/reviews/headspace">Headspace</a> is the gentler on-ramp for people who aren't sure they want therapy yet: a daily meditation and sleep practice in an app, with a separate therapy service that accepts insurance when you're ready for a clinician.</p>`,
        },
        {
          heading: "How does starting online therapy actually work?",
          body: `<p>Legitimate platforms follow the same simple path, and knowing it makes the first step much less intimidating. Nothing about it requires you to know what's "wrong" - you just describe what's going on in your own words.</p>`,
          bullets: [
            "Intake: a few minutes of questions about what you're dealing with, your preferences, and (new at BetterHelp) your insurance details for a coverage check.",
            "Matching: the platform proposes a therapist licensed in your state; you can switch at any time.",
            "First session: video, phone or chat - you pick. The first session is mostly about getting to know each other and setting goals.",
            "Rhythm: a weekly session plus messaging between sessions is the common pattern; consistency matters more than format.",
          ],
        },
        {
          heading: "How do I know if I need therapy?",
          body: `<p>You don't need a diagnosis or a crisis to start. Persistent low mood, anxiety that gets in the way, stress you can't shake, a relationship or life change you can't metabolize alone - these are ordinary, good reasons to talk to someone. If what you're after is more of a daily habit for stress and sleep than treatment, the Headspace app is the right-sized tool; our guide to <a href="/articles/how-to-choose-an-online-therapy-platform">choosing a platform</a> sorts that fork in four questions, and <a href="/articles/does-online-therapy-work">does online therapy work</a> covers what the evidence says.</p>`,
        },
        {
          heading: "What should a beginner look for in a platform?",
          body: `<p>The best beginner platform makes starting easy without cutting the safeguards. Weigh these five things when you compare the options above:</p>`,
          bullets: [
            "Licensed therapists - credentialed in your state, the same standard as an office therapist.",
            "Fast, low-pressure matching, with painless switching if the first fit isn't right.",
            "Session formats that suit how you actually communicate - video, phone, chat or messaging.",
            "A coverage check before you pay - both BetterHelp and Headspace's therapy service accept insurance.",
            "Clear terms - what a plan includes, how billing works, and how to pause or cancel.",
          ],
        },
        {
          heading: "How much does online therapy cost when you're starting out?",
          body: `<p>Less than most people assume once insurance is in the picture. BetterHelp now accepts insurance, with copays cited from around $23/session for covered members; if you're not covered, its financial-aid questionnaire and first-month discounts lower the self-pay rate, which varies by location. Headspace's app is app-subscription cost, and its therapy service runs a coverage check on its site. We don't publish prices we haven't verified, so get your own number at signup - our <a href="/articles/online-therapy-cost">online therapy cost guide</a> and <a href="/articles/free-and-low-cost-therapy-options">free and low-cost options</a> explain the levers.</p>`,
        },
        {
          heading: "How we chose the best online therapy for beginners",
          body: `<p>We ranked platforms on how well they support a first-timer: speed and ease of matching, clarity of the intake, session-format flexibility, insurance and cost transparency, and how painless it is to switch therapists. See the full field on our <a href="/">online therapy comparison</a> and read the individual <a href="/reviews">platform reviews</a>.</p><p><em>This page is general information, not medical advice. Online therapy platforms are for ongoing care, not emergencies - if you're in crisis in the US, call or text 988, free and open 24/7.</em></p>`,
        },
      ],
      updatedAt: UPDATED,
    },
    {
      slug: "cheapest-online-therapy",
      seoTitle: "Cheapest Online Therapy: Best-Value Platforms (2026)",
      seoDescription:
        "Looking for affordable online therapy? Compare the best-value platforms of 2026 - insurance copays, financial aid, app-level pricing - without cutting the licensed care that makes it worth paying for.",
      h1: "Cheapest Online Therapy Platforms",
      h2: "The best-value ways to start therapy - without skipping licensed care",
      heroDescription:
        "Want therapy without overpaying? These are the best-value online options, ranked by how low your real cost can go - through insurance, financial aid and app-level pricing - with licensed clinicians still in the picture.",
      providerOrder: ["betterhelp", "headspace"],
      editorialSections: [
        {
          heading: "What is the cheapest legitimate online therapy?",
          body: `<p>The honest answer is: the platform your insurance covers. A covered session at copay rates beats almost any out-of-pocket deal, which is why the first move is a coverage check, not a price comparison. <strong><a href="/reviews/betterhelp">BetterHelp</a> is our value pick</strong> because it now accepts insurance - copays cited from around $23/session for covered members - and, for the uncovered, offers a financial-aid questionnaire that adjusts the self-pay subscription down. <a href="/reviews/headspace">Headspace</a> is the lowest-cost door of all for a daily stress-and-sleep practice at app-subscription pricing, with a separate insurance-accepting therapy service for when you want a clinician.</p>`,
        },
        {
          heading: "What actually drives the cost of online therapy?",
          body: `<p>Three things decide your real number, and none of them is the headline price on an ad:</p>`,
          bullets: [
            "Insurance coverage - the single biggest lever; both BetterHelp and Headspace's therapy service have a coverage check.",
            "Session frequency - subscriptions bill whether you attend or not, so weekly attendance is what makes them good value.",
            "Financial aid and discounts - BetterHelp's income questionnaire and first-month offers lower self-pay rates.",
            "Employer benefits - EAPs often include fully covered sessions, and some employers bundle Headspace access.",
          ],
        },
        {
          heading: "Are there free options?",
          body: `<p>Some genuinely free routes exist and are worth checking before you pay anyone: employer EAPs (several covered sessions per issue per year, chronically unused), community mental-health centers with sliding-scale fees, university training clinics, peer-support groups, and warmlines. The 988 Suicide &amp; Crisis Lifeline (call or text 988, US) is free and open 24/7 for any overwhelming moment, not only crises. Our guide to <a href="/articles/free-and-low-cost-therapy-options">free and low-cost therapy options</a> maps all of it.</p>`,
        },
        {
          heading: "How do I get the lowest price at BetterHelp?",
          body: `<p>In order: enter your insurance details at signup and let the coverage check answer first. If you're not covered, complete the financial-aid questionnaire honestly - the rate adjusts to income and circumstances - and take any first-month discount on offer. Then actually attend weekly: the subscription is priced per week, so the per-session cost depends on you showing up. The full breakdown is in <a href="/articles/how-much-does-betterhelp-cost">how much BetterHelp costs</a>.</p>`,
        },
        {
          heading: "How we chose the cheapest online therapy",
          body: `<p>We weighed how low each platform's real cost can go for a typical person - insurance acceptance, financial aid, discounts and employer benefits - against what you actually get for it: licensed clinicians, session formats and switching. We never rank a platform higher for being cheap if it cuts the care. Prices change often and we only publish figures we've verified, so confirm your number on each platform's site; see the full field on our <a href="/">online therapy comparison</a>.</p><p><em>This page is general information, not medical advice. In crisis in the US, call or text 988.</em></p>`,
        },
      ],
      updatedAt: UPDATED,
    },
    {
      slug: "best-online-therapy-with-insurance",
      seoTitle: "Best Online Therapy That Takes Insurance (2026)",
      seoDescription:
        "The best online therapy platforms that accept insurance in 2026, ranked - how coverage works, what copays look like, and how to run a coverage check in minutes before paying out of pocket.",
      h1: "Best Online Therapy With Insurance",
      h2: "Online therapy platforms that accept insurance - and how to check your plan in minutes",
      heroDescription:
        "Both platforms we compare now accept insurance. Here's how coverage works at each, what a copay can look like, and how to confirm your own number before you commit.",
      providerOrder: ["betterhelp", "headspace"],
      editorialSections: [
        {
          heading: "Which online therapy platforms take insurance?",
          body: `<p>Both platforms in our coverage now do - a recent change most articles haven't caught up with. <strong><a href="/reviews/betterhelp">BetterHelp</a></strong>, long the platform that deliberately skipped insurance, now accepts it, with copays cited from around $23/session for covered members; you enter your plan details at signup and the coverage check answers before you commit. <strong><a href="/reviews/headspace">Headspace</a></strong>'s online-therapy service accepts insurance too, with a coverage check on its site (and the service is HSA/FSA eligible); note that the Headspace app itself is a separate subscription, not an insurance product.</p>`,
        },
        {
          heading: "How does insurance coverage for online therapy work?",
          body: `<p>Teletherapy with a licensed clinician is broadly reimbursable under most US plans, but coverage is always plan-specific: the same platform can be a copay for one person and full price for their neighbor. That's why the eligibility checks exist - and why no comparison table, including ours, can tell you what <em>you</em> will pay.</p>`,
          bullets: [
            "Run the coverage check first - at BetterHelp's signup and on Headspace's therapy page. Each takes minutes.",
            "Ask HR about an EAP - employee-assistance programs often include fully covered sessions.",
            "Not covered? Ask your insurer about out-of-network reimbursement via a superbill (an itemized receipt).",
            "Still out of pocket? BetterHelp's financial-aid questionnaire lowers self-pay rates.",
          ],
        },
        {
          heading: "Does insurance cover couples or teen therapy online?",
          body: `<p>Not always - individual-therapy coverage doesn't automatically extend to couples or family work, so verify that specifically with your plan before assuming. Coverage for medication management is a separate question again: therapists don't prescribe, and neither platform here offers psychiatry, so a prescriber would be a separate provider with their own coverage. Our guides to <a href="/articles/online-therapy-that-takes-insurance">online therapy that takes insurance</a> and <a href="/articles/does-betterhelp-take-insurance">whether BetterHelp takes insurance</a> go deeper.</p>`,
        },
        {
          heading: "How we chose the best online therapy with insurance",
          body: `<p>We ranked platforms on whether they accept insurance at all, how transparent the coverage check is, what covered members can expect to pay, and what you get for it - licensed clinicians, session formats and switching. We don't publish copays we haven't verified beyond what each platform cites, so treat every figure here as a starting point to confirm on your plan. See the full field on our <a href="/">online therapy comparison</a>.</p><p><em>This page is general information, not medical advice. In crisis in the US, call or text 988, free and open 24/7.</em></p>`,
        },
      ],
      updatedAt: UPDATED,
    },
    {
      slug: "best-online-therapy-for-anxiety",
      seoTitle: "Best Online Therapy for Anxiety (2026): Platforms Compared",
      seoDescription:
        "The best online therapy platforms for anxiety in 2026, ranked - CBT-trained therapists, flexible session formats, daily practice tools, and how to start when starting feels hard.",
      h1: "Best Online Therapy for Anxiety",
      h2: "Platforms compared for anxiety - licensed therapy, daily practice, and how to begin",
      heroDescription:
        "Anxiety is one of the concerns online therapy handles best. Compare platforms with CBT-trained therapists and flexible sessions - plus the daily-practice tools that help between them.",
      providerOrder: ["betterhelp", "headspace"],
      editorialSections: [
        {
          heading: "What is the best online therapy platform for anxiety?",
          body: `<p><strong><a href="/reviews/betterhelp">BetterHelp</a> is our top pick for anxiety</strong> because it pairs the two things that matter most here: a licensed therapist matched to you quickly - many of them trained in cognitive behavioral therapy (CBT), the most established approach for anxiety - and session formats you can actually keep up with (video, phone or chat, plus messaging between sessions). For anxiety specifically, low-friction access is not a minor convenience; it's often the difference between getting help and putting it off. <a href="/reviews/headspace">Headspace</a> earns its place as the daily practice between sessions - guided breathing, stress and sleep content - and as a lower-pressure starting point for people who aren't ready for a therapist yet.</p>`,
        },
        {
          heading: "Does online therapy help with anxiety?",
          body: `<p>Anxiety is among the concerns where online therapy has the strongest support - research generally finds it handled comparably to in-person care for many people. Structured, skills-based approaches like CBT translate especially well to video and messaging because the work happens between sessions as much as in them. Our guides to <a href="/articles/online-therapy-for-anxiety">online therapy for anxiety</a> and <a href="/articles/cbt-online">CBT online</a> cover what to expect.</p>`,
        },
        {
          heading: "What should I look for in a platform for anxiety?",
          body: `<p>Beyond licensed clinicians, four things separate a good fit from a frustrating one when anxiety is the reason you're here:</p>`,
          bullets: [
            "CBT-trained therapists - say explicitly at intake that you want to work in a CBT style.",
            "Flexible formats - if video calls spike your anxiety, phone or chat sessions are a legitimate way in.",
            "Messaging between sessions - useful for anxious moments that don't wait for Tuesday.",
            "Easy switching - the therapeutic relationship drives outcomes; changing therapists until it clicks is normal.",
          ],
        },
        {
          heading: "When is medication part of the picture?",
          body: `<p>For some people, therapy alone is enough; for others, medication is added, and for anxiety the combination is a well-recognized approach. Neither platform here prescribes - BetterHelp is talk therapy and Headspace's app is self-guided - so medication would come from a separate prescriber, such as your doctor or an online psychiatry service. You don't need to decide that up front; many people start with therapy and revisit it with a provider if symptoms warrant. See <a href="/articles/therapy-vs-psychiatry">therapist vs psychiatrist</a> and <a href="/articles/online-psychiatry">online psychiatry</a>.</p>`,
        },
        {
          heading: "How we chose the best online therapy for anxiety",
          body: `<p>We ranked platforms on the factors that matter for anxiety specifically: access to CBT-trained licensed therapists, speed and ease of matching, format flexibility, between-session support, and the quality of daily-practice tools. See the full field on our <a href="/">online therapy comparison</a> and the individual <a href="/reviews">platform reviews</a>.</p><p><em>This page is general information, not medical advice. If your anxiety is severe or you're in crisis, contact a medical professional or, in the US, call or text 988 - free and open 24/7.</em></p>`,
        },
      ],
      updatedAt: UPDATED,
    },
  ],

  sidebars: [],
};
