"use client";

import { useState } from "react";

const FREE_EMAIL_DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com",
  "aol.com","mail.com","protonmail.com","pm.me","tutanota.com",
  "gmx.com","zoho.com","yandex.com","live.com","msn.com",
];

interface PledgeModalProps {
  open: boolean;
  onClose: () => void;
  onPledgeCountIncrement: () => void;
}

export default function PledgeModal({ open, onClose, onPledgeCountIncrement }: PledgeModalProps) {
  const [type, setType] = useState<"individual" | "organization">("individual");
  const [form, setForm] = useState({ name: "", org: "", email: "", country: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setError("");
  }

  function handleSubmit() {
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    if (type === "organization") {
      const domain = form.email.split("@")[1]?.toLowerCase();
      if (FREE_EMAIL_DOMAINS.includes(domain)) {
        setError("Organizations must use a work email address.");
        return;
      }
    }
    setSubmitted(true);
    onPledgeCountIncrement();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0B1929",
    border: "1px solid rgba(168,184,200,0.18)",
    color: "#DCE4EC",
    padding: "0.7rem 0.9rem",
    fontFamily: "var(--font-barlow)",
    fontSize: "0.85rem",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "0.58rem", letterSpacing: "0.18em",
    color: "#B85C38", textTransform: "uppercase",
    display: "block", marginBottom: "0.4rem",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(11,25,41,0.95)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#0F2035",
        border: "1px solid rgba(168,184,200,0.38)",
        padding: "2.5rem", maxWidth: "500px", width: "90%",
        position: "relative",
        animation: "fadeUp 0.25s ease",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1.25rem", right: "1.25rem",
            background: "none", border: "none", color: "#7A96B0",
            cursor: "pointer", fontSize: "1rem", lineHeight: 1,
            fontFamily: "var(--font-ibm-plex-mono)",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
          onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
        >✕</button>

        {!submitted ? (
          <>
            <h2 style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "2rem", fontWeight: 700, textTransform: "uppercase",
              color: "#FFFFFF", marginBottom: "0.4rem", letterSpacing: "0.01em",
            }}>Sign the pledge.</h2>
            <p style={{ fontSize: "0.82rem", color: "#7A96B0", marginBottom: "2rem", lineHeight: 1.6 }}>
              Add your name to the registry of people who believe AI accountability must be structural — not aspirational.
            </p>

            {/* Type toggle */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {(["individual", "organization"] as const).map((t) => (
                <div
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: "0.7rem 1rem",
                    border: `1px solid ${type === t ? "rgba(184,92,56,0.3)" : "rgba(168,184,200,0.18)"}`,
                    background: type === t ? "rgba(184,92,56,0.12)" : "transparent",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    display: "block",
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.58rem", letterSpacing: "0.14em",
                    textTransform: "uppercase", marginBottom: "0.2rem",
                    color: "#B85C38",
                  }}>{t === "individual" ? "Individual" : "Organization"}</span>
                  <span style={{ fontSize: "0.82rem", color: type === t ? "#DCE4EC" : "#7A96B0" }}>
                    {t === "individual" ? "Sign as a person" : "Sign on behalf of a company"}
                  </span>
                </div>
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "0" }}>
              <div>
                <label style={labelStyle} htmlFor="name">Your name</label>
                <input id="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")} />
              </div>
              {type === "organization" && (
                <div>
                  <label style={labelStyle} htmlFor="org">Organization</label>
                  <input id="org" type="text" placeholder="Company or institution" value={form.org} onChange={handleChange} style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")} />
                </div>
              )}
              <div>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="country">Country</label>
                <input id="country" type="text" placeholder="Country" value={form.country} onChange={handleChange} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")} />
              </div>
            </div>

            {/* Pledge quote */}
            <div style={{
              borderLeft: "2px solid rgba(184,92,56,0.3)",
              padding: "0.85rem 1.1rem",
              fontSize: "0.8rem", color: "#7A96B0",
              lineHeight: 1.6, margin: "1.5rem 0",
              fontStyle: "italic",
              background: "rgba(184,92,56,0.12)",
            }}>
              &ldquo;I believe AI accountability must be structural — not aspirational. I support the HAI Standard and the right of every person to technology that is transparent, accountable, and built to serve them.&rdquo;
            </div>

            {error && (
              <p style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.72rem", color: "#B85C38",
                marginBottom: "1rem", letterSpacing: "0.05em",
              }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.8rem 1.75rem",
                background: "#B85C38", color: "#FFFFFF", border: "none", cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#D4724E")}
              onMouseLeave={e => (e.currentTarget.style.background = "#B85C38")}
            >Sign the pledge →</button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "1.2rem", fontWeight: 700,
              color: "#B85C38", marginBottom: "1rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>[ Pledge Signed ]</p>
            <h3 style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "1.8rem", fontWeight: 700, textTransform: "uppercase",
              color: "#FFFFFF", marginBottom: "0.5rem",
            }}>You&apos;re on the record.</h3>
            <p style={{ fontSize: "0.83rem", color: "#7A96B0", marginBottom: "1.5rem" }}>
              Your name has been added to the HAI registry. Thank you for standing with the movement.
            </p>
            <button
              onClick={onClose}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.55rem 1.2rem",
                background: "transparent", color: "#DCE4EC",
                border: "1px solid rgba(168,184,200,0.38)", cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#DCE4EC")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.38)")}
            >Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
