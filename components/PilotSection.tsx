"use client";

import { useEffect, useRef, useState } from "react";

const FREE_EMAIL_DOMAINS = [
  "gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com",
  "aol.com","mail.com","protonmail.com","pm.me","tutanota.com",
  "gmx.com","zoho.com","yandex.com","live.com","msn.com",
];

function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

interface PilotSectionProps {
  onOrgCountIncrement: () => void;
}

export default function PilotSection({ onOrgCountIncrement }: PilotSectionProps) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLElement>(null);

  const [form, setForm] = useState({
    company: "", name: "", email: "", role: "",
    size: "", usecase: "", tier: "", why: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setError("");
  }

  function handleSubmit() {
    if (!form.company || !form.email || !form.tier) {
      setError("Please fill in company name, email, and desired tier.");
      return;
    }
    if (!isWorkEmail(form.email)) {
      setError("Please use a work email address. Personal email domains are not accepted for organizational applications.");
      return;
    }
    setSubmitted(true);
    onOrgCountIncrement();
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
    WebkitAppearance: "none",
    appearance: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "0.58rem",
    letterSpacing: "0.18em",
    color: "#B85C38",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <section id="pilot" ref={ref}>
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
            Pilot Program
          </p>
          <h2 style={{
            fontFamily: "var(--font-barlow-condensed)",
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            fontWeight: 700, textTransform: "uppercase",
            lineHeight: 0.95, color: "#FFFFFF",
            marginBottom: "1.5rem", letterSpacing: "-0.01em",
          }}>
            Be among the<br />
            <span style={{ color: "#A8B8C8" }}>
              first evaluated.
              <span style={{
                display: "inline-block", width: "18px", height: "0.82em",
                background: "#B85C38", marginLeft: "5px",
                verticalAlign: "middle", position: "relative", top: "-3px",
                animation: "blink 1.1s step-end infinite",
              }} />
            </span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#7A96B0", maxWidth: "560px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            The HAI Project pilot is open for 30 days from launch. Every qualifying company receives a free Declared audit. A selection wins their tier free for year one.
          </p>
        </div>

        <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{
          border: "1px solid rgba(168,184,200,0.18)",
          background: "#0F2035",
        }}>
          {/* Top header */}
          <div style={{
            padding: "2.5rem",
            borderBottom: "1px solid rgba(168,184,200,0.18)",
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "2rem", flexWrap: "wrap",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                border: "1px solid rgba(184,92,56,0.3)",
                padding: "0.28rem 0.75rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.58rem", letterSpacing: "0.16em",
                color: "#B85C38", textTransform: "uppercase",
                marginBottom: "1rem", background: "rgba(184,92,56,0.12)",
              }}>
                <span style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "#B85C38", display: "block",
                  animation: "blink 1.5s ease-in-out infinite",
                }} />
                30-Day Launch Window · Open Now
              </div>
              <h3 style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "1.8rem", fontWeight: 700, textTransform: "uppercase",
                color: "#FFFFFF", letterSpacing: "0.01em", marginBottom: "0.5rem",
              }}>Open for applications</h3>
              <p style={{ fontSize: "0.82rem", color: "#7A96B0", maxWidth: "480px", lineHeight: 1.6 }}>
                Every qualifying company gets a free Declared audit with findings published to the public registry. A lottery selects companies for Verified or Certified — free for year one. Lottery size scales with applicant volume.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "3.8rem", fontWeight: 700,
                color: "#FFFFFF", lineHeight: 1,
              }}>29</div>
              <div style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.58rem", letterSpacing: "0.18em",
                color: "#7A96B0", textTransform: "uppercase",
              }}>Days remaining</div>
            </div>
          </div>

          {/* Three tiers */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderBottom: "1px solid rgba(168,184,200,0.18)",
          }}>
            {[
              {
                name: "HAI Declared", value: "Free for all",
                desc: "Full AI-run audit across all nine pillars. Findings published to the public registry. Every qualifying applicant receives this.",
                badge: "ai", badgeLabel: "All applicants",
              },
              {
                name: "HAI Verified", value: "Lottery",
                desc: "Active AI testing across all pillars. Benchmark suite run. Full pillar-by-pillar scoring. Free for year one for selected companies.",
                badge: "both", badgeLabel: "Selected companies",
              },
              {
                name: "HAI Certified", value: "Lottery",
                desc: "Full AI testing plus human verification of Pillars II, V, and IX. Limited slots. Company must qualify structurally.",
                badge: "human", badgeLabel: "Limited slots",
              },
            ].map((tier, i) => (
              <div key={tier.name} style={{
                padding: "1.75rem 2rem",
                borderRight: i < 2 ? "1px solid rgba(168,184,200,0.18)" : "none",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(168,184,200,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <p style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.6rem", letterSpacing: "0.18em",
                  color: "#B85C38", textTransform: "uppercase", marginBottom: "0.5rem",
                }}>{tier.name}</p>
                <p style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase",
                  color: "#FFFFFF", marginBottom: "0.5rem",
                }}>{tier.value}</p>
                <p style={{ fontSize: "0.8rem", color: "#7A96B0", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {tier.desc}
                </p>
                <span style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.57rem", letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.2rem 0.5rem", border: "1px solid", display: "inline-block",
                  borderColor: tier.badge === "human" ? "rgba(184,92,56,0.3)" : "rgba(168,184,200,0.38)",
                  color: tier.badge === "human" ? "#B85C38" : "#A8B8C8",
                  background: tier.badge === "human" ? "rgba(184,92,56,0.12)" : tier.badge === "both" ? "rgba(168,184,200,0.14)" : "transparent",
                }}>{tier.badgeLabel}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ padding: "2.5rem" }}>
            <p style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.65rem", letterSpacing: "0.22em",
              color: "#B85C38", textTransform: "uppercase",
              marginBottom: "1.5rem",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ width: "28px", height: "1px", background: "#B85C38", opacity: 0.5, display: "block", flexShrink: 0 }} />
              Apply for the pilot
            </p>

            {!submitted ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[
                    { id: "company", label: "Company name", placeholder: "Acme Corporation", type: "text" },
                    { id: "name",    label: "Your name",     placeholder: "Jane Smith",        type: "text" },
                    { id: "email",   label: "Work email",    placeholder: "jane@acme.com",     type: "email" },
                    { id: "role",    label: "Your role",     placeholder: "Chief Ethics Officer", type: "text" },
                  ].map(field => (
                    <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label style={labelStyle} htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id} type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as keyof typeof form]}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={labelStyle} htmlFor="size">Company size</label>
                    <select id="size" value={form.size} onChange={handleChange} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
                    >
                      <option value="" disabled>Select range</option>
                      {["1–10","11–50","51–250","251–1,000","1,000+"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={labelStyle} htmlFor="usecase">Primary AI use case</label>
                    <select id="usecase" value={form.usecase} onChange={handleChange} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
                    >
                      <option value="" disabled>Select category</option>
                      {["Healthcare / Clinical","Finance / Lending","HR / Hiring","Education","Legal / Compliance","Customer service","Marketing / Content","Infrastructure / DevOps","Other"].map(u => <option key={u}>{u}</option>)}
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", gridColumn: "1 / -1" }}>
                    <label style={labelStyle} htmlFor="tier">Tier applying for</label>
                    <select id="tier" value={form.tier} onChange={handleChange} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
                    >
                      <option value="" disabled>Select tier</option>
                      <option>HAI Declared — free, all applicants</option>
                      <option>HAI Verified — lottery</option>
                      <option>HAI Certified — lottery, limited slots</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", gridColumn: "1 / -1" }}>
                    <label style={labelStyle} htmlFor="why">Why does your company want HAI evaluation? (optional)</label>
                    <textarea
                      id="why" rows={3}
                      placeholder="Brief description of your AI systems and why accountability matters to your organization..."
                      value={form.why} onChange={handleChange}
                      style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-barlow)" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(184,92,56,0.3)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "rgba(168,184,200,0.18)")}
                    />
                  </div>
                </div>

                {error && (
                  <p style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.72rem", color: "#B85C38",
                    marginBottom: "1rem", letterSpacing: "0.05em",
                  }}>{error}</p>
                )}

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <p style={{ fontSize: "0.73rem", color: "#7A96B0", maxWidth: "500px", lineHeight: 1.55 }}>
                    By applying you agree to have your HAI Declared audit results published in the public registry. Pilot participants grant OMARO permission to use anonymized findings in aggregate research. No payment required. Work email required for organizational applications.
                  </p>
                  <button
                    onClick={handleSubmit}
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
                      padding: "0.8rem 1.75rem",
                      background: "#B85C38", color: "#FFFFFF", border: "none", cursor: "pointer",
                      transition: "background 0.2s", flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#D4724E")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#B85C38")}
                  >Submit application →</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <p style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "1.2rem", fontWeight: 700,
                  color: "#B85C38", marginBottom: "1rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                }}>[ Application Received ]</p>
                <h3 style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "1.8rem", fontWeight: 700, textTransform: "uppercase",
                  color: "#FFFFFF", marginBottom: "0.5rem",
                }}>You&apos;re in the queue.</h3>
                <p style={{ fontSize: "0.83rem", color: "#7A96B0" }}>
                  You&apos;ll hear from the HAI Project team within 5 business days. Lottery results are announced at close of the 30-day window.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
