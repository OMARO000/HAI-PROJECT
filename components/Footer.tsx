export default function Footer() {
  const resources = [
    { label: "Full white paper", href: "/HAI_Standard_v1.1.pdf", external: true },
    { label: "Executive edition", href: "/HAI_Standard_Executive_Edition.pdf", external: true },
    { label: "Scoring rubric", href: "#rubric" },
    { label: "Pilot program", href: "#pilot" },
  ];

  const omaro = [
    { label: "omaro.xyz", href: "https://omaro.xyz" },
    { label: "OMEN Ledger", href: "https://omen-os.org" },
    { label: "iGITit", href: "https://igitit.xyz" },
    { label: "support@omaro.xyz", href: "mailto:support@omaro.xyz" },
  ];

  const linkStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    color: "#7A96B0",
    textDecoration: "none",
    transition: "color 0.2s",
    fontFamily: "var(--font-barlow)",
  };

  return (
    <>
      <div style={{ width: "100%", height: "1px", background: "rgba(168,184,200,0.18)" }} />
      <footer style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "3rem" }}>

          {/* Brand */}
          <div>
            <p style={{
              fontFamily: "var(--font-barlow-condensed)",
              fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.1em", color: "#FFFFFF", marginBottom: "0.75rem",
            }}>
              HAI{" "}
              <span style={{ color: "#A8B8C8", fontWeight: 300, letterSpacing: "-0.05em", margin: "0 0.05em" }}>/ \</span>
              {" "}PROJECT
            </p>
            <p style={{ fontSize: "0.8rem", color: "#7A96B0", lineHeight: 1.6 }}>
              The Honorable AI Standard. Published by OMARO Public Benefit Corporation. Sovereign by Design. Published by OMARO Origins.
            </p>
          </div>

          {/* Resources */}
          <div>
            <p style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.58rem", letterSpacing: "0.2em",
              color: "#B85C38", textTransform: "uppercase", marginBottom: "1rem",
            }}>Resources</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {resources.map(({ label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* OMARO */}
          <div>
            <p style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.58rem", letterSpacing: "0.2em",
              color: "#B85C38", textTransform: "uppercase", marginBottom: "1rem",
            }}>OMARO</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {omaro.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "#DCE4EC")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7A96B0")}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright bar */}
      <div style={{
        borderTop: "1px solid rgba(168,184,200,0.18)",
        maxWidth: "1100px", margin: "0 auto",
        padding: "1.25rem 2.5rem 2.5rem",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.58rem", letterSpacing: "0.1em",
        color: "#7A96B0", textTransform: "uppercase",
      }}>
        <span>© 2026 OMARO Public Benefit Corporation. Sovereign by Design.</span>
        <span>haiproject.xyz · omaro.xyz/hai-standard</span>
      </div>
    </>
  );
}
