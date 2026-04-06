"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  { num: "I",    name: "Integrity & Transparency",              declared: "ai",   verified: "ai",   certified: "ai" },
  { num: "II",   name: "Accountability Chain",                  declared: "ai",   verified: "ai",   certified: "human" },
  { num: "III",  name: "Safety & Robustness",                   declared: "ai",   verified: "both", certified: "both" },
  { num: "IV",   name: "Equality & Non-Discrimination",         declared: "ai",   verified: "both", certified: "both" },
  { num: "V",    name: "Human Override & Control",              declared: "ai",   verified: "ai",   certified: "human" },
  { num: "VI",   name: "Use Limits & Proportionality",          declared: "ai",   verified: "ai",   certified: "ai" },
  { num: "VII",  name: "Data Sovereignty & Empowerment",        declared: "ai",   verified: "ai",   certified: "ai" },
  { num: "VIII", name: "Independent Audit",                     declared: "ai",   verified: "both", certified: "human" },
  { num: "IX",   name: "Human Dignity Across the Full Stack",   declared: "ai",   verified: "ai",   certified: "human" },
];

const badgeStyle = (type: string): React.CSSProperties => ({
  fontFamily: "var(--font-ibm-plex-mono)",
  fontSize: "0.57rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "0.2rem 0.5rem",
  border: "1px solid",
  borderColor: type === "human" ? "rgba(184,92,56,0.3)" : "rgba(168,184,200,0.38)",
  color: type === "human" ? "#B85C38" : "#A8B8C8",
  background: type === "human" ? "rgba(184,92,56,0.12)" : type === "both" ? "rgba(168,184,200,0.14)" : "transparent",
  display: "inline-block",
});

const badgeLabel = (type: string) =>
  type === "ai" ? "AI" : type === "human" ? "Human" : "AI + Docs";

export default function RubricSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rubric" ref={ref}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 2.5rem" }}>

        <div className={`reveal ${visible ? "visible" : ""}`}>
          <p style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.65rem", letterSpacing: "0.22em",
            color: "#B85C38", textTransform: "uppercase",
            marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "28px", height: "1px", background: "#B85C38", opacity: 0.5, display: "block", flexShrink: 0 }} />
            Scoring Rubric
          </p>
          <h2 style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            fontWeight: 700, textTransform: "uppercase",
            lineHeight: 0.95, color: "#FFFFFF",
            marginBottom: "1.5rem", letterSpacing: "-0.01em",
          }}>
            What gets<br />
            <span style={{ color: "#A8B8C8" }}>
              evaluated.
              <span style={{
                display: "inline-block", width: "18px", height: "0.82em",
                background: "#B85C38", marginLeft: "5px",
                verticalAlign: "middle", position: "relative", top: "-3px",
                animation: "blink 1.1s step-end infinite",
              }} />
            </span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#7A96B0", maxWidth: "560px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Each pillar is covered across three tiers. The scoring methodology — weights, thresholds, and how we detect documentation gaming — is not public. The coverage is.
          </p>
        </div>

        {/* Rubric table */}
        <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{
          border: "1px solid rgba(168,184,200,0.18)",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
            background: "#162840",
            borderBottom: "1px solid rgba(168,184,200,0.38)",
          }}>
            {["Pillar", "Declared", "Verified", "Certified"].map((h) => (
              <div key={h} style={{
                padding: "0.7rem 1.25rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.58rem", letterSpacing: "0.18em",
                color: "#A8B8C8", textTransform: "uppercase",
                borderRight: h !== "Certified" ? "1px solid rgba(168,184,200,0.18)" : "none",
              }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {pillars.map((pillar, i) => (
            <div key={pillar.num} style={{
              display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              borderBottom: i < pillars.length - 1 ? "1px solid rgba(168,184,200,0.18)" : "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(168,184,200,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                padding: "0.85rem 1.25rem",
                fontSize: "0.82rem", color: "#DCE4EC",
                borderRight: "1px solid rgba(168,184,200,0.18)",
                display: "flex", alignItems: "center", gap: "0.6rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.65rem", color: "#B85C38",
                  letterSpacing: "0.05em", flexShrink: 0,
                }}>{pillar.num}</span>
                {pillar.name}
              </div>
              {[pillar.declared, pillar.verified, pillar.certified].map((tier, j) => (
                <div key={j} style={{
                  padding: "0.85rem 1.25rem",
                  borderRight: j < 2 ? "1px solid rgba(168,184,200,0.18)" : "none",
                  display: "flex", alignItems: "center",
                }}>
                  <span style={badgeStyle(tier)}>{badgeLabel(tier)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{
          display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1.25rem",
        }}>
          {[
            { type: "ai",    label: "Automated review" },
            { type: "both",  label: "Automated + benchmark or doc testing" },
            { type: "human", label: "Qualified independent reviewer required" },
          ].map(({ type, label }) => (
            <div key={type} style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.73rem", color: "#7A96B0",
              fontFamily: "var(--font-ibm-plex-mono)",
            }}>
              <span style={{ ...badgeStyle(type), fontSize: "0.56rem" }}>{badgeLabel(type)}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
