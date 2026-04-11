"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, tierLabel, pillarNames, type PillarResult, type AuditResult } from "@/lib/registry";

const mono: React.CSSProperties = { fontFamily: "var(--font-ibm-plex-mono)" };

const resultLabel: Record<PillarResult, string> = {
  pass: "Pass",
  partial: "Partial",
  fail: "Fail",
  pending: "Pending",
};

const resultColor: Record<PillarResult, string> = {
  pass: "#B85C38",
  partial: "#7A96B0",
  fail: "#C04040",
  pending: "#4A6070",
};

interface PageProps {
  params: { slug: string };
}

export default function CompanyDetailPage({ params }: PageProps) {
  const company = companies.find(c => c.slug === params.slug);
  if (!company) notFound();

  const [disputePillar, setDisputePillar] = useState("");
  const [disputeDesc, setDisputeDesc] = useState("");
  const [disputeEmail, setDisputeEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  async function handleDispute(e: React.FormEvent) {
    e.preventDefault();
    if (!disputePillar || !disputeDesc.trim() || !disputeEmail.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/registry/dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: company!.slug,
          pillar: disputePillar,
          description: disputeDesc,
          email: disputeEmail,
        }),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
    setSubmitting(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B1929", color: "#DCE4EC", paddingTop: "112px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "4rem 2.5rem" }}>

        {/* Back */}
        <Link href="/registry" style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A6070", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#7A96B0")}
          onMouseLeave={e => (e.currentTarget.style.color = "#4A6070")}
        >← Registry</Link>

        {/* Header */}
        <div style={{ marginTop: "2rem", marginBottom: "2.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.22em", color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {company.country} · {company.industry}
            </p>
            <h1 style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
              textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.01em",
              color: "#FFFFFF", marginBottom: "0.5rem",
            }}>{company.name}</h1>
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" style={{ ...mono, fontSize: "0.65rem", color: "#7A96B0", letterSpacing: "0.06em", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
              >{company.website.replace(/^https?:\/\//, "")} ↗</a>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{
              ...mono,
              display: "inline-block",
              fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "0.4rem 1rem",
              border: "1px solid rgba(184,92,56,0.45)",
              color: "#B85C38",
              background: "rgba(184,92,56,0.12)",
              marginBottom: "0.4rem",
            }}>{tierLabel[company.tier]}</span>
            <p style={{ ...mono, fontSize: "0.58rem", color: "#4A6070", letterSpacing: "0.08em" }}>Since {company.since}</p>
          </div>
        </div>

        {company.description && (
          <p style={{ fontSize: "0.88rem", color: "#7A96B0", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: "600px" }}>
            {company.description}
          </p>
        )}

        {/* Pillar results */}
        <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.2em", color: "#B85C38", textTransform: "uppercase", marginBottom: "1rem" }}>
          Audit Results — Nine Pillars
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(168,184,200,0.18)", marginBottom: "3rem" }}>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => {
            const result = company!.pillars[n] ?? "pending";
            return (
              <div key={n} style={{
                background: "#0F2035",
                padding: "1rem 1.25rem",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: "1rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ ...mono, fontSize: "0.6rem", color: "rgba(184,92,56,0.45)", letterSpacing: "0.06em", minWidth: "2rem" }}>
                    {["I","II","III","IV","V","VI","VII","VIII","IX"][n - 1]}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "#A8B8C8" }}>{pillarNames[n]}</span>
                </div>
                <span style={{
                  ...mono,
                  fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.2rem 0.6rem",
                  border: `1px solid ${resultColor[result]}`,
                  color: resultColor[result],
                  background: `${resultColor[result]}1a`,
                  whiteSpace: "nowrap",
                }}>{resultLabel[result]}</span>
              </div>
            );
          })}
        </div>

        {/* Audit timeline */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.2em", color: "#B85C38", textTransform: "uppercase", marginBottom: "0.35rem" }}>
            Audit History
          </p>
          <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.08em", color: "#4A6070", marginBottom: "1.5rem" }}>
            Quarterly scheduled · Randomized surprise audits · Suspension possible between cycles
          </p>

          {company.auditHistory.length === 0 ? (
            <p style={{ ...mono, fontSize: "0.72rem", color: "#4A6070", letterSpacing: "0.06em" }}>
              No audit history yet.
            </p>
          ) : (
            <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: "6px", top: "8px",
                width: "1px", bottom: "8px",
                background: "rgba(168,184,200,0.15)",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {company.auditHistory.map((entry, i) => {
                  const dotColor: Record<AuditResult, string> = {
                    pass: "#3D8A5A",
                    pending: "#B8943A",
                    suspended: "#C04040",
                  };
                  const badgeColor: Record<AuditResult, string> = {
                    pass: "#3D8A5A",
                    pending: "#B8943A",
                    suspended: "#C04040",
                  };
                  const resultText: Record<AuditResult, string> = {
                    pass: "Passed",
                    pending: "Pending",
                    suspended: "Suspended",
                  };
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      {/* Dot */}
                      <div style={{
                        width: "13px", height: "13px", borderRadius: "50%",
                        background: dotColor[entry.result],
                        flexShrink: 0, marginTop: "2px",
                        position: "relative", left: "-1.5rem",
                        boxShadow: `0 0 6px ${dotColor[entry.result]}66`,
                      }} />
                      <div style={{ marginLeft: "-1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                          <span style={{
                            fontFamily: "var(--font-barlow-condensed)",
                            fontSize: "1rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.04em",
                            color: "#FFFFFF",
                          }}>{entry.type}</span>
                          <span style={{
                            ...mono,
                            fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase",
                            padding: "0.15rem 0.5rem",
                            border: `1px solid ${badgeColor[entry.result]}`,
                            color: badgeColor[entry.result],
                            background: `${badgeColor[entry.result]}1a`,
                          }}>{resultText[entry.result]}</span>
                        </div>
                        <p style={{ ...mono, fontSize: "0.6rem", color: "#4A6070", letterSpacing: "0.08em", marginTop: "0.15rem" }}>
                          {entry.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dispute form */}
        <div style={{ borderTop: "1px solid rgba(168,184,200,0.12)", paddingTop: "2.5rem" }}>
          <p style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.2em", color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            File a Dispute
          </p>
          <p style={{ fontSize: "0.82rem", color: "#7A96B0", lineHeight: 1.6, marginBottom: "1.75rem", maxWidth: "500px" }}>
            If you have evidence that this record is inaccurate, submit a dispute. All disputes are reviewed by HAI Project staff.
          </p>

          {submitState === "success" ? (
            <div style={{
              ...mono,
              fontSize: "0.75rem", letterSpacing: "0.06em", color: "#B85C38",
              padding: "1.25rem", border: "1px solid rgba(184,92,56,0.3)",
              background: "rgba(184,92,56,0.06)",
            }}>
              Dispute received. We will review and follow up at the email provided.
            </div>
          ) : (
            <form onSubmit={handleDispute} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", color: "#B85C38", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Pillar in question
                </label>
                <select
                  value={disputePillar}
                  onChange={e => setDisputePillar(e.target.value)}
                  required
                  style={{
                    ...mono,
                    width: "100%", background: "#0F2035",
                    border: "1px solid rgba(168,184,200,0.18)",
                    color: disputePillar ? "#DCE4EC" : "#4A6070",
                    padding: "0.65rem 1rem", fontSize: "0.82rem", outline: "none",
                  }}
                >
                  <option value="">Select a pillar</option>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={String(n)}>
                      {["I","II","III","IV","V","VI","VII","VIII","IX"][n - 1]}. {pillarNames[n]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", color: "#B85C38", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Description
                </label>
                <textarea
                  value={disputeDesc}
                  onChange={e => setDisputeDesc(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the inaccuracy and any supporting evidence..."
                  style={{
                    ...mono,
                    width: "100%", background: "#0F2035",
                    border: "1px solid rgba(168,184,200,0.18)",
                    color: "#DCE4EC",
                    padding: "0.65rem 1rem", fontSize: "0.82rem",
                    outline: "none", resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.18em", color: "#B85C38", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                  Your email
                </label>
                <input
                  type="email"
                  value={disputeEmail}
                  onChange={e => setDisputeEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    ...mono,
                    width: "100%", background: "#0F2035",
                    border: "1px solid rgba(168,184,200,0.18)",
                    color: "#DCE4EC",
                    padding: "0.65rem 1rem", fontSize: "0.82rem", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {submitState === "error" && (
                <p style={{ ...mono, fontSize: "0.7rem", color: "#C04040" }}>Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={submitting || !disputePillar || !disputeDesc.trim() || !disputeEmail.trim()}
                style={{
                  ...mono,
                  alignSelf: "flex-start",
                  fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0.75rem 1.75rem",
                  background: "#B85C38", color: "#FFFFFF",
                  border: "none", cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.6 : 1,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#D4724E"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; }}
              >{submitting ? "Submitting..." : "Submit Dispute →"}</button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
