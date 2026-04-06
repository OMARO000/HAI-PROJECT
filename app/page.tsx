"use client";

import { useState } from "react";
import Hero from "@/components/Hero";

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
    </main>
  );
}
