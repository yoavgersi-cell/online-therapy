// Shared SEO constants. Every page-level openGraph block should include OG_IMAGE:
// a page-level openGraph object replaces the root one, so without it the page
// ships no og:image for social shares and link previews.
export const SITE_ORIGIN = "https://www.toponlinetherapy.io";

export const OG_IMAGE = {
  url: `${SITE_ORIGIN}/og-default`,
  width: 1200,
  height: 630,
  alt: "Top Online Therapy - compare online therapy platforms",
};
