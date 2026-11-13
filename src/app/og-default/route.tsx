import { ImageResponse } from "next/og";

// Stable, crawlable default social image (1200x630) for every page that does not
// define its own. Referenced from src/lib/seo.ts so og:image is always present.
export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#E6F4EC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#1A7A52", marginBottom: 24 }}>Top Online Therapy</div>
        <div style={{ fontSize: 68, fontWeight: 800, color: "#191919", lineHeight: 1.1, maxWidth: 1000 }}>
          Compare the best online therapy platforms
        </div>
        <div style={{ fontSize: 30, color: "#4B5563", marginTop: 32 }}>
          Verified prices, insurance coverage and trust data for betterhelp, Talkspace and headspace
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
