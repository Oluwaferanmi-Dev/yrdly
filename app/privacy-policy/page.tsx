import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Privacy Policy - Yrdly",
  description: "How Yrdly collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    intro: "When you use Yrdly, we may collect:",
    items: [
      ["Account details:", " Name, email, phone number, and profile information you provide."],
      ["Usage data:", " Listings you create, events you attend, items you purchase, and how you interact with the app."],
      ["Device information:", " IP address, browser type, and device identifiers, used to help keep your account secure."],
    ],
  },
  {
    title: "2. How We Use Your Information",
    intro: "We use your information to:",
    items: [
      [null, "Enable core features such as creating listings, purchasing items, and joining events."],
      [null, "Personalize your experience and suggest content relevant to your neighborhood."],
      [null, "Improve our services through analytics and user feedback."],
      [null, "Communicate with you about updates, promotions, or customer support."],
    ],
  },
  {
    title: "3. Sharing of Information",
    intro: "We do not sell your personal data. We may share information only with:",
    items: [
      [null, "Trusted service providers who support our platform (e.g., hosting, payment processing)."],
      [null, "Law enforcement or legal authorities, if required by law."],
    ],
  },
  {
    title: "4. Data Security",
    intro: "We use industry-standard measures to protect your data. However, no system is 100% secure, so we also encourage you to keep your login details private.",
    items: [],
  },
  {
    title: "5. Your Choices",
    intro: "You can:",
    items: [
      [null, "Update or delete your account information in your profile settings."],
      [null, "Opt out of promotional emails by clicking the \u201cunsubscribe\u201d link."],
      [null, "Contact us if you want your account permanently deleted."],
    ],
  },
  {
    title: "6. Children\u2019s Privacy",
    intro: "Yrdly is not intended for children under 13. We do not knowingly collect personal data from minors.",
    items: [],
  },
  {
    title: "7. Updates to This Policy",
    intro: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated \u201cLast updated\u201d date.",
    items: [],
  },
  {
    title: "8. Contact Us",
    intro: "If you have questions about this Privacy Policy, please reach out to us:",
    items: [],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Header band */}
      <section style={{ paddingTop: 96, paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-work-sans), sans-serif",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            ← Back to Home
          </Link>
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Legal</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300 }}>Last updated: February 4, 2026</p>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: "4rem 1.5rem 6rem", flex: 1 }}>
        <div
          className="redesign-card"
          style={{ maxWidth: 800, margin: "0 auto", padding: "2.5rem 2rem", background: "var(--bg-card)" }}
        >
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "2.5rem" }}>
            At Yrdly, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect
            your personal information when you use our platform.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.75rem" }}>
                  {s.title}
                </h2>
                {s.intro && (
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300, marginBottom: "0.5rem" }}>
                    {s.title === "8. Contact Us" ? (
                      <>
                        {s.intro}{" "}
                        <a href="mailto:support@yrdly.ng" style={{ color: "var(--green-text)", textDecoration: "underline" }}>
                          support@yrdly.ng
                        </a>
                      </>
                    ) : (
                      s.intro
                    )}
                  </p>
                )}
                {s.items.length > 0 && (
                  <ul style={{ listStyle: "disc", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {s.items.map(([bold, rest], i) => (
                      <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--fg-muted)", fontWeight: 300 }}>
                        {bold && <strong style={{ color: "var(--fg)", fontWeight: 500 }}>{bold}</strong>}
                        {rest}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
