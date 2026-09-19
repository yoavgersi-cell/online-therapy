import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import { hreflangLanguages } from "@/lib/regions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://www.toponlinetherapy.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Top Online Therapy",
  title: {
    default: "Top Online Therapy - Compare the Best Online Therapy Platforms & Prices",
    template: "%s | Top Online Therapy",
  },
  description:
    "Compare the best online therapy platforms of 2026 - licensed teletherapy providers ranked by insurance coverage, session formats, price and ongoing support.",
  keywords: [
    "online therapy",
    "best online therapy",
    "teletherapy",
    "online counseling",
    "online therapy that takes insurance",
    "BetterHelp review",
    "Headspace review",
    "online therapy platforms",
  ],
  openGraph: {
    title: "Top Online Therapy - Compare the Best Online Therapy Platforms & Prices",
    description:
      "Independent, side-by-side comparisons of top online therapy platforms - ranked on insurance, session formats, price and support.",
    type: "website",
    siteName: "Top Online Therapy",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Online Therapy - Compare the Best Online Therapy Platforms & Prices",
    description:
      "Independent, side-by-side comparisons of top online therapy platforms.",
  },
  other: {
    "geo.region": "US",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "content-language": "en-US",
  },
  alternates: {
    canonical: SITE_URL,
    languages: hreflangLanguages(SITE_URL, "/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Top Online Therapy",
              url: SITE_URL,
              areaServed: { "@type": "Country", name: "United States" },
              description:
                "Independent guides and platform comparisons for online therapy and mental-health care - expert reviews, pricing research, and side-by-side comparisons.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Top Online Therapy",
              alternateName: ["toponlinetherapy.io", "Top Online Therapy .io"],
              url: SITE_URL,
              description:
                "Compare trusted online therapy platforms side by side.",
            }),
          }}
        />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
