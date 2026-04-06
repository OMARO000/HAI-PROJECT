"use client";

import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the HAI Assistant — a knowledgeable guide for the Honorable AI Standard (HAI Standard v1.1), published by OMARO Public Benefit Corporation, founded by Trenton W. Roberts.

NINE PILLARS:
I. Integrity & Transparency — Disclose purpose plainly, explain decisions, no dark patterns.
II. Accountability Chain — Named, reachable human responsibility chain before deployment.
III. Safety & Robustness — Test adversarial conditions and population diversity. Ongoing monitoring.
IV. Equality & Non-Discrimination — Continuous testing for discriminatory outcomes. Correct when found.
V. Human Override & Control — Meaningful human review for any significant AI decision.
VI. Use Limits & Proportionality — AI only for disclosed purposes. No function creep without consent.
VII. Data Sovereignty & Empowerment — Access, correct, limit, and delete data in practice, not policy.
VIII. Independent Audit — No financial relationship, no prior 24-month consulting, full published findings. Benchmarks: BBQ, WinoQueer, TruthfulQA, HaluEval, HELM, KorNAT, SafetyBench, ToxiGen, FMTI.
IX. Human Dignity Across the Full Stack — Heightened protections for children, elderly, mental health crisis users, economically coerced users. Supply chain disclosure: data laborer conditions, environmental cost.

THREE TIERS:
- HAI Declared (free): Self-attested, AI verifies documentation.
- HAI Verified (subscription): Active AI testing, benchmark suite, full scoring.
- HAI Certified (paid, annual): Above plus human verification of Pillars II, V, IX.

PILOT PROGRAM: 30-day window. Every qualifying company gets free Declared audit with published findings. Lottery for Verified or Certified free year one. Apply at haiproject.xyz.

OMARO: OMARO PBC builds human-centered technology infrastructure. OMEN (corporate accountability ledger), iGITit (open source code analysis), HAI Project. Founded by Trenton W. Roberts. Sovereign by Design. omaro.xyz.

INTELLECTUAL LINEAGE: Vienna Manifesto (Werthner et al., 2019), Zuboff Surveillance Capitalism (2019), Steffen/Lee/Vardi "It's Not the AI" (arXiv:2511.15740), EU CORDIS Digital Humanism, Berners-Lee Solid/Inrupt, Anthropic 81K study (Huang et al., 2026).

vs NIST: Process playbook for orgs. HAI is a rights framework for people.
vs EU AI Act: Government-enforced, geographic. HAI is voluntary and borderless.
vs ISO 42001: Internal management certification. HAI is external accountability with public registry.
vs IEEE CertifAIEd: Technically scoped. HAI extends into human rights and supply chain.

TONE: Direct, confident, human. Not a chatbot. Concise. Plain language. Never evasive.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const sectionStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "6rem 2.5rem",
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono)",
  fontSize: "0.65rem",
  letterSpacing: "0.22em",
  color: "#B85C38",
  textTransform: "uppercase",
  marginBottom: "1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-barlow-condensed)",
  fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
  fontWeight: 700,
  textTransform: "uppercase",
  lineHeight: 0.95,
  color: "#FFFFFF",
  marginBottom: "1.5rem",
  letterSpacing: "-0.01em",
};

export default function StandardSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'm here to help you understand the Honorable AI Standard. Ask me about any of the nine pillars, how the audit tiers work, what compliance looks like for your organization, or how HAI compares to NIST, the EU AI Act, or ISO 42001.",
    },
    {
      role: "assistant",
      content: 'Try: "What is Pillar IX?" · "How does HAI differ from ISO 42001?" · "What does the pilot include?"',
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = [...messages, userMsg].filter(m => m.role === "user" || (m.role === "assistant" && messages.indexOf(m) > 1));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages.slice(2), userMsg], system: SYSTEM_PROMPT }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <section id="standard" ref={sectionRef}>
      <div style={sectionStyle}>
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <p style={eyebrowStyle}>
            <span style={{ width: "28px", height: "1px", background: "#B85C38", opacity: 0.5, display: "block", flexShrink: 0 }} />
            The Standard
          </p>
          <h2 style={titleStyle}>
            Nine pillars.<br />
            <span style={{ color: "#A8B8C8" }}>One commitment.
              <span style={{
                display: "inline-block", width: "18px", height: "0.82em",
                background: "#B85C38", marginLeft: "5px",
                verticalAlign: "middle", position: "relative", top: "-3px",
                animation: "blink 1.1s step-end infinite",
              }} />
            </span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "#7A96B0", maxWidth: "560px", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            The full HAI Standard is available in two editions. Ask the HAI assistant anything about the standard, audit tiers, or what compliance looks like for your organization.
          </p>
        </div>

        {/* White paper cards */}
        <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "1px", background: "rgba(168,184,200,0.18)",
          marginBottom: "2.5rem",
        }}>
          {[
            {
              label: "Full White Paper · 28 pages",
              title: "HAI Standard v1.1",
              body: "Complete nine-pillar framework with intellectual lineage, benchmark suite, audit qualifications, standard governance addendum, and the world each pillar produces.",
              href: "/HAI_Standard_v1.1.pdf",
            },
            {
              label: "Executive Edition · 6 pages",
              title: "HAI Standard — Executive Summary",
              body: "All nine pillars distilled, key citations, governance structure, and the pilot program. Built for leadership teams and procurement conversations.",
              href: "/HAI_Standard_Executive_Edition.pdf",
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: "#0F2035", padding: "2rem",
              position: "relative", overflow: "hidden",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "#162840";
                const line = e.currentTarget.querySelector(".hover-line") as HTMLElement;
                if (line) line.style.transform = "scaleX(1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "#0F2035";
                const line = e.currentTarget.querySelector(".hover-line") as HTMLElement;
                if (line) line.style.transform = "scaleX(0)";
              }}
            >
              <div className="hover-line" style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                background: "#B85C38", transform: "scaleX(0)",
                transformOrigin: "left", transition: "transform 0.3s ease",
              }} />
              <p style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6rem", letterSpacing: "0.16em",
                color: "#B85C38", textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>{card.label}</p>
              <h3 style={{
                fontFamily: "var(--font-barlow-condensed)",
                fontSize: "1.4rem", fontWeight: 700, textTransform: "uppercase",
                color: "#FFFFFF", marginBottom: "0.6rem", letterSpacing: "0.01em",
              }}>{card.title}</h3>
              <p style={{ fontSize: "0.82rem", color: "#7A96B0", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {card.body}
              </p>
              <a href={card.href} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.64rem", letterSpacing: "0.1em",
                color: "#B85C38", textDecoration: "none", textTransform: "uppercase",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#D4724E")}
                onMouseLeave={e => (e.currentTarget.style.color = "#B85C38")}
              >Download PDF →</a>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{
          background: "#0F2035",
          border: "1px solid rgba(168,184,200,0.18)",
          display: "flex", flexDirection: "column", height: "460px",
        }}>
          <div style={{
            padding: "0.85rem 1.5rem",
            borderBottom: "1px solid rgba(168,184,200,0.18)",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#B85C38", display: "block",
              animation: "blink 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.64rem", letterSpacing: "0.14em",
              color: "#B85C38", textTransform: "uppercase",
            }}>HAI Assistant — Ask anything about the standard</span>
          </div>

          <div ref={messagesRef} style={{
            flex: 1, overflowY: "auto", padding: "1.25rem",
            display: "flex", flexDirection: "column", gap: "0.9rem",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                gap: "0.65rem",
              }}>
                <div style={{
                  width: "26px", height: "26px", flexShrink: 0, marginTop: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.55rem",
                  background: msg.role === "assistant" ? "rgba(184,92,56,0.12)" : "rgba(168,184,200,0.08)",
                  border: msg.role === "assistant" ? "1px solid rgba(184,92,56,0.3)" : "1px solid rgba(168,184,200,0.18)",
                  color: msg.role === "assistant" ? "#B85C38" : "#7A96B0",
                }}>
                  {msg.role === "assistant" ? "HAI" : "You"}
                </div>
                <div style={{
                  fontSize: "0.85rem", lineHeight: 1.65, maxWidth: "85%",
                  color: msg.role === "user" ? "#7A96B0" : "#DCE4EC",
                  textAlign: msg.role === "user" ? "right" : "left",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "0.65rem" }}>
                <div style={{
                  width: "26px", height: "26px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.55rem",
                  background: "rgba(184,92,56,0.12)",
                  border: "1px solid rgba(184,92,56,0.3)",
                  color: "#B85C38",
                }}>HAI</div>
                <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 0" }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: "#B85C38", display: "block",
                      animation: `typeBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{
            padding: "0.85rem 1.25rem",
            borderTop: "1px solid rgba(168,184,200,0.18)",
            display: "flex", gap: "0.75rem",
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about the HAI Standard..."
              style={{
                flex: 1, background: "#0B1929",
                border: "1px solid rgba(168,184,200,0.18)",
                color: "#DCE4EC", padding: "0.65rem 0.9rem",
                fontFamily: "var(--font-barlow)", fontSize: "0.85rem",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "#B85C38", border: "none", color: "#FFFFFF",
                padding: "0.65rem 1.1rem", cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "background 0.2s", opacity: loading ? 0.4 : 1,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#D4724E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#B85C38"; }}
            >Send</button>
          </div>
        </div>
      </div>
    </section>
  );
}
