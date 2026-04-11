"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  pledgeCount: number;
  orgCount: number;
  countryCount: number;
  onPledgeClick: () => void;
}

export default function Hero({ pledgeCount, orgCount, countryCount, onPledgeClick }: HeroProps) {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "54px 2.5rem 5rem",
      maxWidth: "1100px",
      margin: "0 auto",
    }}>
      <div style={{ paddingTop: "5rem" }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.67rem",
          letterSpacing: "0.22em",
          color: "#B85C38",
          textTransform: "uppercase",
          marginBottom: "1.75rem",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.2s",
        }}>
          Honorable AI Standard
        </p>

        {/* Accent rule */}
        <div style={{
          width: "44px", height: "1px",
          background: "#B85C38", opacity: 0.55,
          marginBottom: "1.75rem",
          animation: "fadeUp 0.7s ease forwards 0.3s",
        }} />

        {/* Hero title — first line */}
        <h1 style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "clamp(3.8rem, 8.5vw, 8.5rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 0.95,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
          marginBottom: "1.25rem",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.4s",
        }}>
          This is<br />
          the<span style={{
            color: "#A8B8C8",
            fontWeight: 300,
            letterSpacing: "-0.05em",
            marginLeft: "0.08em",
            marginRight: "0.08em",
          }}>/ \</span>floor.
        </h1>

        {/* Floor divider */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "420px",
          margin: "16px 0",
          gap: "8px",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.5s",
        }}>
          <div style={{ flex: 1, height: "2px", backgroundColor: "#B85C38" }} />
          <span style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "18px",
            color: "#B85C38",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}>← floor</span>
        </div>

        {/* Hero title — second line */}
        <div style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "clamp(3.8rem, 8.5vw, 8.5rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 0.95,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
          marginBottom: "2.5rem",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.55s",
        }}>
          Where do you<br />
          stand?
          <span style={{
            display: "inline-block",
            width: "18px",
            height: "0.82em",
            background: "#B85C38",
            marginLeft: "5px",
            verticalAlign: "middle",
            position: "relative",
            top: "-3px",
            animation: "blink 1.1s step-end infinite",
          }} />
        </div>

        {/* Subheading */}
        <p style={{
          fontSize: "1rem",
          color: "#7A96B0",
          maxWidth: "500px",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.58s",
        }}>
          A nine-pillar framework for AI that is transparent, accountable, and genuinely built for people. Companies either meet the standard or they don't. Both are telling.
        </p>

        {/* Actions */}
        <div style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.7s",
        }}>
          <button
            onClick={onPledgeClick}
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.8rem 1.75rem",
              background: "#B85C38",
              color: "#FFFFFF",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D4724E")}
            onMouseLeave={e => (e.currentTarget.style.background = "#B85C38")}
          >
            Sign the pledge
          </button>
          <a
            href="#standard"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.8rem 1.75rem",
              background: "transparent",
              color: "#DCE4EC",
              border: "1px solid rgba(168,184,200,0.38)",
              cursor: "pointer",
              transition: "border-color 0.2s",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#DCE4EC")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.38)")}
          >
            Read the standard
          </a>
        </div>

        {/* Pledge bar */}
        <div style={{
          marginTop: "5rem",
          borderTop: "1px solid rgba(168,184,200,0.18)",
          borderBottom: "1px solid rgba(168,184,200,0.18)",
          padding: "1.75rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(3, auto) 1fr",
          gap: 0,
          opacity: 0,
          animation: "fadeUp 0.7s ease forwards 0.85s",
        }}>
          {/* Stat 1 */}
          <div style={{ paddingRight: "2.5rem", borderRight: "1px solid rgba(168,184,200,0.18)", marginRight: "2.5rem" }}>
            <div id="pledge-count" style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "3rem", fontWeight: 700,
              color: "#FFFFFF", lineHeight: 1,
              marginBottom: "0.2rem",
            }}>
              {pledgeCount.toLocaleString()}
            </div>
            <div style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem", letterSpacing: "0.18em",
              color: "#7A96B0", textTransform: "uppercase",
            }}>
              Individuals pledged
            </div>
          </div>

          {/* Stat 2 */}
          <div style={{ paddingRight: "2.5rem", borderRight: "1px solid rgba(168,184,200,0.18)", marginRight: "2.5rem" }}>
            <div id="org-count" style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "3rem", fontWeight: 700,
              color: "#FFFFFF", lineHeight: 1,
              marginBottom: "0.2rem",
            }}>
              {orgCount.toLocaleString()}
            </div>
            <div style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem", letterSpacing: "0.18em",
              color: "#7A96B0", textTransform: "uppercase",
            }}>
              Organizations signed
            </div>
          </div>

          {/* Stat 3 */}
          <div style={{ paddingRight: "2.5rem", borderRight: "1px solid rgba(168,184,200,0.18)", marginRight: "2.5rem" }}>
            <div style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "3rem", fontWeight: 700,
              color: "#FFFFFF", lineHeight: 1,
              marginBottom: "0.2rem",
            }}>
              {countryCount > 0 ? `${countryCount}+` : "—"}
            </div>
            <div style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem", letterSpacing: "0.18em",
              color: "#7A96B0", textTransform: "uppercase",
            }}>
              Countries represented
            </div>
          </div>

          {/* CTA */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.75rem",
          }}>
            <p style={{ fontSize: "0.83rem", color: "#7A96B0", lineHeight: 1.55 }}>
              Every signature declares that accountability must be structural — not aspirational.
            </p>
            <div>
              <button
                onClick={onPledgeClick}
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "0.55rem 1.2rem",
                  background: "#B85C38",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#D4724E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#B85C38")}
              >
                Add your name
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
