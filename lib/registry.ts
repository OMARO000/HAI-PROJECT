export type CertificationTier = "certified" | "verified" | "declared" | "none";

export type PillarResult = "pass" | "partial" | "fail" | "pending";

export type AuditResult = "pass" | "pending" | "suspended";

export interface AuditEntry {
  date: string;
  type: string;
  result: AuditResult;
}

export interface Company {
  slug: string;
  name: string;
  tier: CertificationTier;
  since: string; // ISO date YYYY-MM-DD
  country: string;
  industry: string;
  website?: string;
  description?: string;
  pillars: Record<number, PillarResult>;
  auditHistory: AuditEntry[];
}

export const companies: Company[] = [
  {
    slug: "omaro-pbc",
    name: "OMARO PBC",
    tier: "certified",
    since: "2026-01-01",
    country: "US",
    industry: "Technology / Public Benefit Corporation",
    website: "https://omaro.xyz",
    description:
      "Sovereign-by-Design technology infrastructure. Builds human-centered products including OMEN, iGITit, and HAI Project. Founded by Trenton W. Roberts.",
    pillars: {
      1: "pass",
      2: "pass",
      3: "pass",
      4: "pass",
      5: "pass",
      6: "pass",
      7: "pass",
      8: "pass",
      9: "pass",
    },
    auditHistory: [
      { date: "April 2026", type: "Initial Certification", result: "pass" },
    ],
  },
];

export const tierLabel: Record<CertificationTier, string> = {
  certified: "HAI Certified",
  verified: "HAI Verified",
  declared: "HAI Declared",
  none: "Not Listed",
};

export const pillarNames: Record<number, string> = {
  1: "Integrity & Transparency",
  2: "Accountability Chain",
  3: "Safety & Robustness",
  4: "Equality & Non-Discrimination",
  5: "Human Override & Control",
  6: "Use Limits & Proportionality",
  7: "Data Sovereignty & Empowerment",
  8: "Independent Audit",
  9: "Human Dignity Across the Full Stack",
};
