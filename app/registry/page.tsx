"use client";

import { useState } from "react";
import Link from "next/link";
import { companies, tierLabel, type CertificationTier } from "@/lib/registry";

const mono: React.CSSProperties = { fontFamily: "var(--font-ibm-plex-mono)" };

const tierColor: Record<CertificationTier, string> = {
  certified: "#B85C38",
  verified: "#7A96B0",
  declared: "#4A6070",
  none: "#2A3A4A",
};

const TIERS: Array<CertificationTier | "all"> = ["all", "certified", "verified", "declared"];

export default function RegistryPage() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<CertificationTier | "all">("all");

  const filtered = companies.filter((c) => {
    const matchesTier = tierFilter === "all" || c.tier === tierFilter;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q);
    return matchesTier && matchesQuery;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0B1929", color: "#DCE4EC", paddingTop: "112px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2.5rem" }}>

        {/* Header */}
        <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.22em", color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          HAI Project
        </p>
        <h1 style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700,
          textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.01em",
          color: "#FFFFFF", marginBottom: "1rem",
        }}>
          The Registry.
        </h1>
        <p style={{ fontSize: "0.92rem", color: "#7A96B0", maxWidth: "560px", lineHeight: 1.7, marginBottom: "3rem" }}>
          Every organization in this registry has been audited against the nine-pillar Honorable AI Standard. The record is public and permanent.
        </p>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, country, or industry..."
            style={{
              ...mono,
              flex: 1, minWidth: "200px",
              background: "#0F2035",
              border: "1px solid rgba(168,184,200,0.18)",
              color: "#DCE4EC",
              padding: "0.65rem 1rem",
              fontSize: "0.85rem",
              outline: "none",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
          />
          <div style={{ display: "flex", gap: "1px", background: "rgba(168,184,200,0.18)" }}>
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                style={{
                  ...mono,
                  fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "0.65rem 1rem",
                  background: tierFilter === t ? "rgba(184,92,56,0.12)" : "#0F2035",
                  color: tierFilter === t ? "#B85C38" : "#7A96B0",
                  border: "none",
                  borderBottom: tierFilter === t ? "1px solid #B85C38" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >{t === "all" ? "All" : tierLabel[t]}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: "#4A6070", textTransform: "uppercase", marginBottom: "1rem" }}>
          {filtered.length} {filtered.length === 1 ? "record" : "records"}
        </p>

        {/* Company list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(168,184,200,0.18)" }}>
          {filtered.length === 0 && (
            <div style={{ background: "#0F2035", padding: "2rem", textAlign: "center" }}>
              <p style={{ ...mono, fontSize: "0.75rem", color: "#4A6070" }}>No records match your search.</p>
            </div>
          )}
          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/registry/${c.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#0F2035",
                  padding: "1.25rem 1.75rem",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "1rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#162840")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "#0F2035")}
              >
                <div>
                  <p style={{
                    fontFamily: "var(--font-barlow-condensed)",
                    fontSize: "1.2rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.02em",
                    color: "#FFFFFF", marginBottom: "0.2rem",
                  }}>{c.name}</p>
                  <p style={{ ...mono, fontSize: "0.65rem", color: "#7A96B0", letterSpacing: "0.06em" }}>
                    {c.country} · {c.industry}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                  <span style={{ ...mono, fontSize: "0.6rem", color: "#4A6070", letterSpacing: "0.08em" }}>
                    Since {c.since.slice(0, 4)}
                  </span>
                  <span style={{
                    ...mono,
                    fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "0.25rem 0.75rem",
                    border: `1px solid ${tierColor[c.tier]}`,
                    color: tierColor[c.tier],
                    background: `${tierColor[c.tier]}1a`,
                    whiteSpace: "nowrap",
                  }}>{tierLabel[c.tier]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
