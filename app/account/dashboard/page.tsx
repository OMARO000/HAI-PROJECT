import Link from "next/link";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("omaro_account")?.value;

  let masked = "—";
  if (raw) {
    const parts = raw.split(" ");
    if (parts.length === 4) {
      masked = `${parts[0]} **** **** ${parts[3]}`;
    }
  }

  const products = [
    { name: "HAI Project", active: true, desc: "Honorable AI Standard — public registry and pilot program." },
    { name: "[us]", active: false, desc: "Coming soon." },
    { name: "OMEN Ledger", active: false, desc: "Corporate accountability ledger. Coming soon." },
    { name: "iGITit", active: false, desc: "Open source code analysis. Coming soon." },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1929",
      color: "#DCE4EC",
      padding: "80px 2rem 4rem",
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6rem", letterSpacing: "0.22em",
          color: "#B85C38", textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}>OMARO Account</p>

        <h1 style={{
          fontFamily: "var(--font-barlow-condensed)",
          fontSize: "2.4rem", fontWeight: 700, textTransform: "uppercase",
          color: "#FFFFFF", letterSpacing: "0.01em", lineHeight: 1,
          marginBottom: "0.5rem",
        }}>Account Active</h1>

        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.85rem", letterSpacing: "0.1em",
          color: "#A8B8C8", marginBottom: "2.5rem",
        }}>{masked}</p>

        {/* Products */}
        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.58rem", letterSpacing: "0.2em",
          color: "#B85C38", textTransform: "uppercase", marginBottom: "1rem",
        }}>Connected Products</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(168,184,200,0.18)" }}>
          {products.map(p => (
            <div key={p.name} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "#0F2035", padding: "1rem 1.25rem", gap: "1rem",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-barlow-condensed)",
                  fontSize: "1rem", fontWeight: 700, textTransform: "uppercase",
                  color: p.active ? "#FFFFFF" : "#4A6070", marginBottom: "0.15rem",
                }}>{p.name}</p>
                <p style={{ fontSize: "0.75rem", color: "#7A96B0" }}>{p.desc}</p>
              </div>
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.2rem 0.6rem",
                border: "1px solid",
                borderColor: p.active ? "rgba(184,92,56,0.3)" : "rgba(168,184,200,0.18)",
                color: p.active ? "#B85C38" : "#4A6070",
                background: p.active ? "rgba(184,92,56,0.12)" : "transparent",
                whiteSpace: "nowrap",
              }}>{p.active ? "Active" : "—"}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Link href="/" style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#7A96B0", textDecoration: "none", transition: "color 0.2s",
          }}>← Return to HAI Project</Link>
        </div>
      </div>
    </div>
  );
}
