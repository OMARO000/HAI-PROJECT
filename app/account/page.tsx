"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateAccountNumber, hashAccountNumber } from "@/lib/account";

const mono: React.CSSProperties = { fontFamily: "var(--font-ibm-plex-mono)" };

export default function AccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "login">("create");

  // Create state
  const [accountNumber, setAccountNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Login state
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    setAccountNumber(generateAccountNumber());
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function handleActivate() {
    if (!confirmed) return;
    setCreating(true);
    setCreateError("");
    try {
      const hash = await hashAccountNumber(accountNumber);
      const res = await fetch("/api/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountHash: hash }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error || "Something went wrong.");
        return;
      }
      // Set cookie via login route (reuse login to set httpOnly cookie)
      await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber }),
      });
      router.push("/account/dashboard");
    } catch {
      setCreateError("Network error. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function handleLogin() {
    if (!loginInput.trim()) return;
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber: loginInput }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || "Account number not found.");
        return;
      }
      router.push("/account/dashboard");
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  }

  function formatLoginInput(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const parts = [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8, 12), digits.slice(12, 16)].filter(Boolean);
    return parts.join(" ");
  }

  const inputStyle: React.CSSProperties = {
    ...mono,
    width: "100%",
    background: "#0B1929",
    border: "1px solid rgba(168,184,200,0.18)",
    color: "#DCE4EC",
    padding: "0.75rem 1rem",
    fontSize: "1.05rem",
    letterSpacing: "0.12em",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1929",
      color: "#DCE4EC",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      paddingTop: "80px",
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* Eyebrow */}
        <p style={{
          ...mono,
          fontSize: "0.6rem", letterSpacing: "0.22em",
          color: "#B85C38", textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}>OMARO · HAI Project</p>

        <h1 style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "2.4rem", fontWeight: 700, textTransform: "uppercase",
          color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1,
          marginBottom: "2rem",
        }}>Your OMARO<br />Account</h1>

        {/* Mode toggle */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(168,184,200,0.18)", marginBottom: "2rem" }}>
          {(["create", "login"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                ...mono,
                fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
                padding: "0.65rem 1rem",
                background: mode === m ? "rgba(184,92,56,0.12)" : "#0F2035",
                color: mode === m ? "#B85C38" : "#7A96B0",
                border: "none",
                borderBottom: mode === m ? "1px solid #B85C38" : "1px solid transparent",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >{m === "create" ? "Create Account" : "Login"}</button>
          ))}
        </div>

        {/* ── CREATE MODE ── */}
        {mode === "create" && (
          <div style={{ border: "1px solid rgba(168,184,200,0.18)", background: "#0F2035", padding: "2rem" }}>
            <p style={{ fontSize: "0.82rem", color: "#7A96B0", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              One account number works across every OMARO product — HAI Project, [us], OMEN, and everything we build. No email. No password. Just a number that is yours. We cannot recover it if you lose it.
            </p>

            {/* Account number display */}
            <p style={{
              ...mono,
              fontSize: "0.55rem", letterSpacing: "0.2em",
              color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem",
            }}>Your account number</p>

            <div
              onClick={handleCopy}
              style={{
                ...mono,
                fontSize: "1.65rem", letterSpacing: "0.18em",
                color: "#FFFFFF", textAlign: "center",
                padding: "1.25rem",
                border: "1px solid rgba(184,92,56,0.3)",
                background: "rgba(184,92,56,0.06)",
                cursor: "pointer",
                marginBottom: "0.5rem",
                userSelect: "none",
                transition: "background 0.2s",
              }}
              title="Click to copy"
            >
              {accountNumber}
            </div>

            <p style={{
              ...mono,
              fontSize: "0.55rem", letterSpacing: "0.12em",
              color: copied ? "#B85C38" : "#4A6070",
              textAlign: "center", marginBottom: "1.25rem",
              textTransform: "uppercase",
            }}>
              {copied ? "COPIED" : "Click to copy"}
            </p>

            {/* Warning */}
            <p style={{
              ...mono,
              fontSize: "0.65rem", letterSpacing: "0.06em",
              color: "#B85C38", lineHeight: 1.6,
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              border: "1px solid rgba(184,92,56,0.3)",
              background: "rgba(184,92,56,0.08)",
            }}>
              Write this down. Screenshot it. Store it somewhere safe. This is the only time it will be shown in full.
            </p>

            {/* Checkbox */}
            <label style={{
              display: "flex", alignItems: "flex-start", gap: "0.65rem",
              cursor: "pointer", marginBottom: "1.5rem",
            }}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
                style={{ marginTop: "2px", accentColor: "#B85C38", flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.8rem", color: "#A8B8C8", lineHeight: 1.5 }}>
                I have saved my account number
              </span>
            </label>

            {createError && (
              <p style={{ ...mono, fontSize: "0.7rem", color: "#B85C38", marginBottom: "1rem" }}>{createError}</p>
            )}

            <button
              onClick={handleActivate}
              disabled={!confirmed || creating}
              style={{
                ...mono,
                width: "100%",
                fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.85rem",
                background: confirmed && !creating ? "#B85C38" : "rgba(184,92,56,0.25)",
                color: confirmed && !creating ? "#FFFFFF" : "#7A4030",
                border: "none",
                cursor: confirmed && !creating ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (confirmed && !creating) e.currentTarget.style.background = "#D4724E"; }}
              onMouseLeave={e => { if (confirmed && !creating) e.currentTarget.style.background = "#B85C38"; }}
            >{creating ? "Activating..." : "Activate Account →"}</button>
          </div>
        )}

        {/* ── LOGIN MODE ── */}
        {mode === "login" && (
          <div style={{ border: "1px solid rgba(168,184,200,0.18)", background: "#0F2035", padding: "2rem" }}>
            <p style={{ fontSize: "0.82rem", color: "#7A96B0", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Enter your 16-digit OMARO account number to access your account.
            </p>

            <p style={{
              ...mono,
              fontSize: "0.55rem", letterSpacing: "0.2em",
              color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem",
            }}>Account number</p>

            <input
              type="text"
              value={loginInput}
              onChange={e => {
                setLoginInput(formatLoginInput(e.target.value));
                setLoginError("");
              }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="0000 0000 0000 0000"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
            />

            {loginError && (
              <p style={{ ...mono, fontSize: "0.7rem", color: "#B85C38", marginTop: "0.75rem" }}>{loginError}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loggingIn || loginInput.replace(/\s/g, "").length < 16}
              style={{
                ...mono,
                width: "100%", marginTop: "1.25rem",
                fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.85rem",
                background: !loggingIn && loginInput.replace(/\s/g, "").length === 16 ? "#B85C38" : "rgba(184,92,56,0.25)",
                color: !loggingIn && loginInput.replace(/\s/g, "").length === 16 ? "#FFFFFF" : "#7A4030",
                border: "none",
                cursor: !loggingIn && loginInput.replace(/\s/g, "").length === 16 ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (!loggingIn && loginInput.replace(/\s/g, "").length === 16) e.currentTarget.style.background = "#D4724E"; }}
              onMouseLeave={e => { if (!loggingIn && loginInput.replace(/\s/g, "").length === 16) e.currentTarget.style.background = "#B85C38"; }}
            >{loggingIn ? "Checking..." : "Enter →"}</button>
          </div>
        )}

        {/* Toggle link */}
        <p style={{ ...mono, fontSize: "0.65rem", color: "#4A6070", marginTop: "1.25rem", textAlign: "center" }}>
          {mode === "create" ? (
            <>Already have an account?{" "}
              <button onClick={() => setMode("login")} style={{ background: "none", border: "none", color: "#B85C38", cursor: "pointer", ...mono, fontSize: "0.65rem", padding: 0 }}>Login</button>
            </>
          ) : (
            <>Need an account?{" "}
              <button onClick={() => setMode("create")} style={{ background: "none", border: "none", color: "#B85C38", cursor: "pointer", ...mono, fontSize: "0.65rem", padding: 0 }}>Create one</button>
            </>
          )}
        </p>

      </div>
    </div>
  );
}
