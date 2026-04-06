"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import StandardSection from "@/components/StandardSection";
import RubricSection from "@/components/RubricSection";
import Rule from "@/components/Rule";

export default function Home() {
  const [pledgeCount, setPledgeCount] = useState(2847);
  const [orgCount, setOrgCount] = useState(114);
  const [pledgeOpen, setPledgeOpen] = useState(false);

  return (
    <main style={{ paddingTop: 0 }}>
      <Hero
        pledgeCount={pledgeCount}
        orgCount={orgCount}
        onPledgeClick={() => setPledgeOpen(true)}
      />
      <Rule />
      <StandardSection />
      <Rule />
      <RubricSection />
    </main>
  );
}
