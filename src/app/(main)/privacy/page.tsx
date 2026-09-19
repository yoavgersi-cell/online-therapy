import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Top Online Therapy (toponlinetherapy.io) collects, uses, and protects your information, including analytics, cookies, and affiliate tracking.",
  alternates: { canonical: "https://www.toponlinetherapy.io/privacy" },
};

const UPDATED = "September 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-400">Last updated: {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          This Privacy Policy explains how Top Online Therapy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
          operating the website toponlinetherapy.io, collects, uses, and shares information when you
          visit our site. Top Online Therapy is an independent publisher that compares online
          therapy and mental-health platforms; we are not a mental-health provider and do not
          deliver therapy or prescribe medication.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Information We Collect</h2>
        <p>
          <strong>Information you provide.</strong> If you contact us by email, we receive the
          information you choose to share (such as your name, email address, and message).
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, we automatically
          collect certain technical information when you visit, such as your IP address, browser and
          device type, pages viewed, referring pages, and general usage activity. This is collected
          through cookies and similar technologies described below.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Cookies &amp; Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to understand how visitors use the site and to
          measure the performance of our content and outbound links. These include:
        </p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Analytics</strong> - we use analytics tools (which may include Google Analytics)
            to understand aggregate site traffic and usage.
          </li>
          <li>
            <strong>Advertising/measurement pixels</strong> - we may use measurement pixels (which may
            include the Meta Pixel) to understand the effectiveness of our content.
          </li>
          <li>
            <strong>Affiliate tracking</strong> - when you click an outbound link to a provider, our
            affiliate partners may set cookies to attribute a referral to us.
          </li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings. Doing so may affect how the
          site functions.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">How We Use Information</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li>To operate, maintain, and improve the website and its content;</li>
          <li>To analyze traffic and measure the performance of our comparisons and articles;</li>
          <li>To respond to your inquiries when you contact us;</li>
          <li>To detect, prevent, and address technical issues or misuse.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">How Information Is Shared</h2>
        <p>
          We do not sell your personal information. We may share information with service providers who
          help us operate the site (such as analytics and hosting providers), and with affiliate
          networks that attribute referrals. These third parties process data under their own privacy
          policies. We may also disclose information if required by law.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Affiliate Links</h2>
        <p>
          This site contains affiliate links. When you click a link to a provider and take a qualifying
          action, we may earn a commission at no additional cost to you. See our{" "}
          <a href="/disclaimer" className="font-semibold text-[#1A7A52] hover:underline">disclosure</a>{" "}
          for details. We do not control, and are not responsible for, the privacy practices of the
          third-party sites you visit through these links - please review their policies.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Your Privacy Rights</h2>
        <p>
          Depending on where you live (for example, under the GDPR in the EU/UK or the CCPA/CPRA in
          California), you may have rights to access, correct, delete, or restrict the processing of
          your personal information, and to opt out of certain data uses. To make a request, contact us
          at the address below. You can also opt out of Google Analytics using Google&apos;s browser
          add-on, and manage ad personalization in your Google and Meta account settings.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Data Retention</h2>
        <p>
          We retain information only as long as needed for the purposes described in this policy, or as
          required by law. Aggregate analytics data may be retained on our providers&apos; standard
          schedules.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Children&apos;s Privacy</h2>
        <p>
          This site is intended for adults (18 and older) and is not directed to children. We do not
          knowingly collect personal information from anyone under 18.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes take effect when posted, and the
          &quot;last updated&quot; date above will reflect the latest revision.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Contact Us</h2>
        <p>
          Questions about this policy or your data? Email us at{" "}
          <a href="mailto:privacy@toponlinetherapy.io" className="font-semibold text-[#1A7A52] hover:underline">
            privacy@toponlinetherapy.io
          </a>{" "}
          or visit our{" "}
          <a href="/contact" className="font-semibold text-[#1A7A52] hover:underline">contact page</a>.
        </p>
      </div>
    </div>
  );
}
