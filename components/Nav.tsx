"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "#standard", label: "Standard" },
  { href: "#rubric", label: "Scoring" },
  { href: "#pilot", label: "Pilot" },
  { href: "https://omaro.xyz", label: "OMARO", external: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,25,41,0.94)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(168,184,200,0.18)",
      height: "54px",
    }}>
      <nav
        style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 2.5rem", height: "54px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        {/* Left side: Logo + OMARO badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 700, fontSize: "1.4rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#FFFFFF",
            }}>
              HAI&nbsp;
            </span>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 300, fontSize: "1.4rem",
              letterSpacing: "-0.05em", textTransform: "uppercase",
              color: "#A8B8C8", margin: "0 0.05em",
            }}>
              / \
            </span>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 700, fontSize: "1.4rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#FFFFFF",
            }}>
              &nbsp;PROJECT
            </span>
            <span style={{
              display: "inline-block",
              width: "3px", height: "1em",
              background: "#B85C38",
              marginLeft: "5px",
              verticalAlign: "middle",
              position: "relative" as const, top: "-1px",
              animation: "blink 1.1s step-end infinite",
            }} />
          </Link>

          {/* OMARO badge */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(184,92,56,0.18)",
            border: "1px solid rgba(184,92,56,0.45)",
            padding: "0.2rem 0.55rem",
            lineHeight: 1.2,
          }}>
            <span style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#B85C38",
              whiteSpace: "nowrap",
            }}>
              An OMARO Company
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <ul style={{
          display: "flex", gap: "1.75rem",
          listStyle: "none", alignItems: "center",
        }} className="hidden md:flex">
          {navLinks.map(({ href, label, external }) => (
            <li key={href}>
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.67rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    color: "#7A96B0", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
                >
                  {label}
                </a>
              ) : (
                <a
                  href={href}
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.67rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    color: "#7A96B0", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right side: CTA + Account buttons */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.75rem", paddingRight: "0" }}>
          <a
            href="#pilot"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.67rem", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none",
              padding: "0.42rem 1rem",
              background: "#B85C38", color: "#FFFFFF",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D4724E")}
            onMouseLeave={e => (e.currentTarget.style.background = "#B85C38")}
          >
            Apply for Pilot
          </a>

          {/* Stacked account buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingRight: "24px" }}>
            <a
              href="/account"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.625rem", letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none",
                padding: "5px 0", minWidth: "120px", textAlign: "center",
                background: "transparent", color: "#B85C38",
                border: "1px solid #B85C38", borderRadius: "2px",
                transition: "background 0.2s, color 0.2s",
                display: "block",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,92,56,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >Login</a>
            <a
              href="/account"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.625rem", letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none",
                padding: "5px 0", minWidth: "120px", textAlign: "center",
                background: "#B85C38", color: "#FFFFFF",
                border: "1px solid #B85C38", borderRadius: "2px",
                transition: "background 0.2s",
                display: "block",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4724E"; e.currentTarget.style.borderColor = "#D4724E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; e.currentTarget.style.borderColor = "#B85C38"; }}
            >Create Account</a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "20px", height: "1px",
              background: "#DCE4EC", transition: "all 0.2s",
              transform: menuOpen
                ? i === 0 ? "translateY(5px) rotate(45deg)"
                : i === 2 ? "translateY(-5px) rotate(-45deg)"
                : "none"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{ borderTop: "1px solid rgba(168,184,200,0.18)", background: "rgba(11,25,41,0.98)" }}
        >
          <ul style={{
            maxWidth: "1100px", margin: "0 auto",
            padding: "1.25rem 2.5rem",
            display: "flex", flexDirection: "column", gap: "1.25rem",
            listStyle: "none",
          }}>
            {navLinks.map(({ href, label, external }) => (
              <li key={href}>
                {external ? (
                  <a
                    href={href} target="_blank" rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.85rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", textDecoration: "none",
                      color: "#7A96B0",
                    }}
                  >{label}</a>
                ) : (
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.85rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", textDecoration: "none",
                      color: "#7A96B0",
                    }}
                  >{label}</a>
                )}
              </li>
            ))}
            <li>
              <a
                href="#pilot"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.75rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", textDecoration: "none",
                  padding: "0.6rem 1.25rem",
                  background: "#B85C38", color: "#FFFFFF",
                }}
              >Apply for Pilot</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
