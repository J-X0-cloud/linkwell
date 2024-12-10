import type { Metadata } from "next";
import { securityFaq, securityHero } from "@/lib/data/security";
import { siteConfig } from "@/lib/data/site";
import { ArchitectureFlow } from "@/components/security/ArchitectureFlow";
import { ComplianceBadges } from "@/components/security/ComplianceBadges";
import { Controls } from "@/components/security/Controls";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/ui/Faq";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Security & compliance",
  description: "SOC 2 Type II, per-tenant credential encryption, isolated workers and US or EU data residency for embedded integrations.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero eyebrow={securityHero.eyebrow} heading={securityHero.heading} lede={securityHero.lede} small />
      <ComplianceBadges />
      <ArchitectureFlow />
      <Controls />
      <section className="sec sec-tint" id="faq">
        <div className="wrap faq-wrap">
          <div className="shead">
            <span className="eyebrow">Security FAQ</span>
            <h2>Questions from your security review.</h2>
            <p>
              Need a completed questionnaire? <TextLink href={`mailto:${siteConfig.securityEmail}`}>{siteConfig.securityEmail}</TextLink>
            </p>
          </div>
          <Faq items={securityFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
