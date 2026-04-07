"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import StandardSection from "@/components/StandardSection";
import RubricSection from "@/components/RubricSection";
import PilotSection from "@/components/PilotSection";
import Footer from "@/components/Footer";
import PledgeModal from "@/components/PledgeModal";
import Rule from "@/components/Rule";

export default function Home() {
  const [pledgeCount, setPledgeCount] = useState(0);
  const [orgCount, setOrgCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  const [pledgeOpen, setPledgeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/api/counts")
      .then(r => r.json())
      .then(d => {
        setPledgeCount(d.pledgeCount ?? 0);
        setOrgCount(d.orgCount ?? 0);
        setCountryCount(d.countryCount ?? 0);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <main style={{ paddingTop: 0 }}>
        <Hero
          pledgeCount={pledgeCount}
          orgCount={orgCount}
          countryCount={countryCount}
          onPledgeClick={() => setPledgeOpen(true)}
        />
        <Rule />
        <StandardSection />
        <Rule />
        <RubricSection />
        <Rule />
        <PilotSection onOrgCountIncrement={() => setOrgCount(c => c + 1)} />
        <Footer />
      </main>
      <PledgeModal
        open={pledgeOpen}
        onClose={() => setPledgeOpen(false)}
        onPledgeCountIncrement={() => setPledgeCount(c => c + 1)}
      />
    </>
  );
}
