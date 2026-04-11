"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "https://omen-app-cyan.vercel.app", label: "OMEN", external: true },
  { href: "https://igitit-app.vercel.app", label: "iGITit", external: true, noUppercase: true },
  { href: "/registry", label: "Registry" },
  { href: "#standard", label: "Standard" },
  { href: "#rubric", label: "Scoring" },
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
      height: "128px",
    }}>
      <nav
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "128px",
          padding: 0,
          boxSizing: "border-box",
        }}
        aria-label="Main navigation"
      >
        {/* Child 1 — Logo + badge (LEFT) */}
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "24px", flexShrink: 0, gap: "0.75rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 700, fontSize: "1.75rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#FFFFFF",
            }}>
              HAI&nbsp;
            </span>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 300, fontSize: "1.75rem",
              letterSpacing: "-0.05em", textTransform: "uppercase",
              color: "#A8B8C8", margin: "0 0.05em",
            }}>
              / \
            </span>
            <span style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontWeight: 700, fontSize: "1.75rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#FFFFFF",
            }}>
              &nbsp;PROJECT
            </span>
            <span style={{
              display: "inline-block",
              width: "3px", height: "1.75rem",
              background: "#B85C38",
              marginLeft: "5px",
              verticalAlign: "middle",
              position: "relative" as const, top: "-1px",
              animation: "blink 1.1s step-end infinite",
            }} />
          </Link>

          {/* OMARO badge */}
          <Link
            href="https://omaro-site.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(184,92,56,0.18)",
              border: "1px solid rgba(184,92,56,0.45)",
              padding: "5px 10px",
              lineHeight: 1.2,
              transition: "background 0.2s",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "rgba(184,92,56,0.28)")}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "rgba(184,92,56,0.18)")}
            >
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#B85C38",
                whiteSpace: "nowrap",
              }}>
                An OMARO Company
              </span>
            </div>
          </Link>
        </div>

        {/* Child 2 — Nav links (CENTER) */}
        <ul
          suppressHydrationWarning
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "32px",
            flexWrap: "nowrap",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map(({ href, label, external, noUppercase }) => (
            <li key={href}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "15px", letterSpacing: "0.06em",
                  textTransform: noUppercase ? "none" : "uppercase",
                  textDecoration: "none",
                  color: "#7A96B0", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Child 3 — Account buttons (RIGHT) */}
        <div className="hidden md:flex" style={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          gap: "4px",
          paddingRight: "24px",
          paddingTop: "8px",
          flexShrink: 0,
          width: "160px",
        }}>
          <a
            href="#pilot"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "11px", letterSpacing: "0.08em",
              textTransform: "uppercase", textDecoration: "none",
              padding: "5px 0", width: "100%", textAlign: "center",
              background: "#B85C38", color: "#FFFFFF",
              border: "1px solid #B85C38", borderRadius: "2px",
              transition: "background 0.2s",
              display: "block", boxSizing: "border-box",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4724E"; e.currentTarget.style.borderColor = "#D4724E"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; e.currentTarget.style.borderColor = "#B85C38"; }}
          >Apply for Pilot</a>
          <a
            href="/account"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "13px", letterSpacing: "0.08em",
              textTransform: "uppercase", textDecoration: "none",
              padding: "5px 0", width: "100%", textAlign: "center",
              background: "transparent", color: "#B85C38",
              border: "1px solid #B85C38", borderRadius: "2px",
              transition: "background 0.2s",
              display: "block", boxSizing: "border-box",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,92,56,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >Login</a>
          <a
            href="/account"
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "13px", letterSpacing: "0.08em",
              textTransform: "uppercase", textDecoration: "none",
              padding: "5px 0", width: "100%", textAlign: "center",
              background: "#B85C38", color: "#FFFFFF",
              border: "1px solid #B85C38", borderRadius: "2px",
              transition: "background 0.2s",
              display: "block", boxSizing: "border-box",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#D4724E"; e.currentTarget.style.borderColor = "#D4724E"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; e.currentTarget.style.borderColor = "#B85C38"; }}
          >Create Account</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ background: "none", border: "none", cursor: "pointer", marginRight: "16px" }}
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
            {navLinks.map(({ href, label, external, noUppercase }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.85rem", letterSpacing: "0.1em",
                    textTransform: noUppercase ? "none" : "uppercase",
                    textDecoration: "none",
                    color: "#7A96B0",
                  }}
                >{label}</a>
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
