"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccountBlock() {
  const [status, setStatus] = useState<{ active: boolean; masked?: string } | null>(null);

  useEffect(() => {
    fetch("/api/account/status")
      .then(r => r.json())
      .then(setStatus)
      .catch(() => setStatus({ active: false }));
  }, []);

  if (status === null) return null; // Don't flash during load

  const mono: React.CSSProperties = { fontFamily: "var(--font-ibm-plex-mono)" };

  return (
    <div style={{
      maxWidth: "1100px", margin: "0 auto",
      padding: "2rem 2.5rem",
    }}>
      <div style={{
        border: "1px solid rgba(184,92,56,0.3)",
        background: "rgba(184,92,56,0.06)",
        padding: "1.25rem 1.75rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <p style={{
            ...mono,
            fontSize: "0.58rem", letterSpacing: "0.2em",
            color: "#B85C38", textTransform: "uppercase", marginBottom: "0.3rem",
          }}>Your OMARO Account</p>
          <p style={{ fontSize: "0.8rem", color: "#7A96B0", lineHeight: 1.5 }}>
            One number. Every OMARO product.
          </p>
        </div>

        {status.active ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{
              ...mono,
              fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              border: "1px solid rgba(184,92,56,0.3)",
              background: "rgba(184,92,56,0.12)",
              color: "#B85C38",
            }}>Account Active</span>
            <span style={{
              ...mono,
              fontSize: "0.85rem", letterSpacing: "0.1em",
              color: "#A8B8C8",
            }}>{status.masked}</span>
            <Link href="/account/dashboard" style={{
              ...mono,
              fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#7A96B0", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
            >Dashboard →</Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href="/account" style={{
              ...mono,
              fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.45rem 1rem", textDecoration: "none",
              background: "transparent", color: "#B85C38",
              border: "1px solid #B85C38", borderRadius: "2px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(184,92,56,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >Login</Link>
            <Link href="/account" style={{
              ...mono,
              fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.45rem 1rem", textDecoration: "none",
              background: "#B85C38", color: "#FFFFFF",
              border: "1px solid #B85C38", borderRadius: "2px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4724E"; e.currentTarget.style.borderColor = "#D4724E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; e.currentTarget.style.borderColor = "#B85C38"; }}
            >Create Account</Link>
          </div>
        )}
      </div>
    </div>
  );
}
