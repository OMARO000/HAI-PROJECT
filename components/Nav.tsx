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
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 700, fontSize: "1rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#FFFFFF",
          }}>
            HAI&nbsp;
          </span>
          <span style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 300, fontSize: "1rem",
            letterSpacing: "0.13em", textTransform: "uppercase",
            color: "#A8B8C8",
          }}>
            / \
          </span>
          <span style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontWeight: 700, fontSize: "1rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#FFFFFF",
          }}>
            &nbsp;PROJECT
          </span>
          <span style={{
            display: "inline-block",
            width: "3px", height: "0.82em",
            background: "#B85C38",
            marginLeft: "4px",
            verticalAlign: "middle",
            position: "relative", top: "-1px",
            animation: "blink 1.1s step-end infinite",
          }} />
        </Link>

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

        {/* CTA */}
        <a
          href="#pilot"
          className="hidden md:inline-block"
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
