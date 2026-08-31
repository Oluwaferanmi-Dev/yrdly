"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const APP_URL = "https://app.yrdly.ng";

interface MarketingEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  category: string;
  ticketCapacity: number | null;
  lowestPrice: number;
  appEventUrl: string;
}

function formatPrice(naira: number) {
  return naira === 0 ? "Free" : `₦${naira.toLocaleString()}`;
}

export default function EventsPage() {
  const [events, setEvents] = useState<MarketingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState<string>("All");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch((err) => console.error("Failed to fetch events:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filters = ["All", ...Array.from(new Set(events.map((e) => e.category).filter(Boolean)))];

  const filtered = active === "All" ? events : events.filter((e) => e.category === active);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Page hero */}
      <section
        style={{
          paddingTop: 96,
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          background: "var(--section-alt)",
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <Link
            href="/"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.82rem",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-work-sans), sans-serif",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 0,
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            ← Back to Home
          </Link>
          <span className="pill" style={{ marginBottom: "1rem", display: "inline-flex" }}>Event Directory</span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--fg)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Discover Events{" "}
            <em style={{ color: "var(--green-text)", fontStyle: "italic" }}>Near You</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 480, marginBottom: "2rem" }}>
            From owambe nights to farmers markets — find what&apos;s happening in your estate and secure your spot instantly.
          </p>
          {/* Filters */}
          {filters.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={active === f ? "btn-cta" : ""}
                    style={{
                      ...(active === f
                        ? { padding: "0.4rem 1rem", fontSize: "0.82rem" }
                        : {
                            background: "var(--bg-card)",
                            color: "var(--fg-muted)",
                            border: "1px solid var(--border)",
                            borderRadius: 9999,
                            padding: "0.4rem 1rem",
                            fontSize: "0.82rem",
                            fontFamily: "var(--font-work-sans), sans-serif",
                            fontWeight: 400,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }),
                    }}
                  >
                    {f}
                  </button>
                ))}
          </div>
          )}
        </div>
      </section>

      {/* Events grid */}
      <section style={{ padding: "3rem 1.5rem 6rem", flex: 1 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "6rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem" }}>Curating community highlights…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h3 className="font-display" style={{ fontSize: "1.5rem", color: "var(--fg)", marginBottom: "0.5rem" }}>No Events Scheduled</h3>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>No events in this category yet. Want to host one?</p>
              <a href={`${APP_URL}/events/create`} target="_blank" rel="noreferrer" className="btn-cta">Host an Event</a>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {filtered.map((e) => (
                <div key={e.id} className="redesign-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: 192, overflow: "hidden", background: "var(--bg-raised)" }}>
                    <Image
                      src={e.image || "/hero-image.png"}
                      alt={e.name}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.4s" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }} />
                    <span className="pill" style={{ position: "absolute", top: 12, left: 12, fontSize: "0.65rem" }}>{e.category || "Community"}</span>
                    <span
                      className="font-display"
                      style={{ position: "absolute", bottom: 12, right: 12, fontSize: "1.05rem", fontWeight: 600, color: "#fff" }}
                    >
                      {formatPrice(e.lowestPrice)}
                    </span>
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem", lineHeight: 1.35 }}>{e.name}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "0.75rem", flex: 1 }}>{e.description}</p>
                    <div style={{ fontSize: "0.79rem", color: "var(--fg-muted)", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: 3 }}>
                      <span>📅 {e.date}</span>
                      <span>📍 {e.location}</span>
                      <span>👥 {e.attendees}</span>
                    </div>
                    <a
                      href={`${APP_URL}${e.appEventUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-cta"
                      style={{ textAlign: "center", fontSize: "0.82rem", padding: "0.55rem 1rem" }}
                    >
                      Secure My Spot
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Host CTA */}
          <div
            style={{
              marginTop: "4rem",
              borderRadius: 16,
              padding: "2.5rem",
              background: "var(--section-alt)",
              border: "1px solid var(--border-accent)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎪</div>
            <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.5rem" }}>Want to host an event?</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: 300, marginBottom: "1.25rem", maxWidth: 400, margin: "0 auto 1.25rem" }}>
              Create your event on Yrdly, sell tickets via Paystack, and manage attendance with our built-in QR scanner.
            </p>
            <a href={`${APP_URL}/events/create`} target="_blank" rel="noreferrer" className="btn-cta">Host an Event on Yrdly</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
