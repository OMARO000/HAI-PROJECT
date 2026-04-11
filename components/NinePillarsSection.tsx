"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    numeral: "I",
    name: "Integrity & Transparency",
    desc: "Disclose purpose plainly, explain decisions, reject dark patterns.",
  },
  {
    numeral: "II",
    name: "Accountability Chain",
    desc: "Named, reachable human responsibility exists before deployment.",
  },
  {
    numeral: "III",
    name: "Safety & Robustness",
    desc: "Test adversarial conditions and population diversity. Monitor continuously.",
  },
  {
    numeral: "IV",
    name: "Equality & Non-Discrimination",
    desc: "Test for discriminatory outcomes continuously. Correct when found.",
  },
  {
    numeral: "V",
    name: "Human Override & Control",
    desc: "Meaningful human review for any significant AI decision.",
  },
  {
    numeral: "VI",
    name: "Use Limits & Proportionality",
    desc: "AI only for disclosed purposes. No function creep without consent.",
  },
  {
    numeral: "VII",
    name: "Data Sovereignty & Empowerment",
    desc: "Access, correct, limit, and delete data in practice, not policy.",
  },
  {
    numeral: "VIII",
    name: "Independent Audit",
    desc: "No financial relationship with auditor. Full published findings.",
  },
  {
    numeral: "IX",
    name: "Human Dignity Across the Full Stack",
    desc: "Heightened protections for vulnerable users. Supply chain disclosure required.",
  },
];

export default function NinePillarsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ scrollMarginTop: "112px" }}>
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
            The Framework
          </p>

          <h2 style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            fontWeight: 700, textTransform: "uppercase",
            lineHeight: 0.95, letterSpacing: "-0.01em",
            color: "#FFFFFF", marginBottom: "1.5rem",
          }}>
            The Nine Pillars.
          </h2>

          <p style={{
            fontSize: "0.92rem", color: "#7A96B0",
            maxWidth: "560px", marginBottom: "3rem", lineHeight: 1.7,
          }}>
            Every organization that builds or deploys AI must answer to all nine. There is no partial compliance.
          </p>
        </div>

        {/* 3-column grid */}
        <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(168,184,200,0.18)",
        }}>
          {pillars.map((p) => (
            <div
              key={p.numeral}
              style={{
                background: "#0F2035",
                padding: "1.75rem",
                transition: "background 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "#162840";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "#0F2035";
              }}
            >
              <p style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "2rem", fontWeight: 700,
                color: "rgba(184,92,56,0.35)",
                lineHeight: 1, marginBottom: "0.5rem",
                letterSpacing: "0.02em",
              }}>{p.numeral}</p>
              <p style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "1.05rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.04em",
                color: "#FFFFFF", marginBottom: "0.5rem", lineHeight: 1.2,
              }}>{p.name}</p>
              <p style={{
                fontSize: "0.78rem", color: "#7A96B0",
                lineHeight: 1.6,
              }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ marginTop: "2rem" }}>
          <a
            href="/HAI_Standard_v1.1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.65rem", letterSpacing: "0.1em",
              color: "#7A96B0", textDecoration: "none", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B85C38")}
            onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
          >Read the full standard — HAI Standard v1.1 →</a>
        </div>

      </div>
    </section>
  );
}
