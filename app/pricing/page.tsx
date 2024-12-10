import type { Metadata } from "next";
import { pricingFaq } from "@/lib/data/pricing";
import { siteConfig } from "@/lib/data/site";
import { PlanComparison } from "@/components/pricing/PlanComparison";
import { PricingView } from "@/components/pricing/PricingView";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/ui/Faq";
import { TextLink } from "@/components/ui/TextLink";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Linkwell plans are priced on connected customers, with guided onboarding, sync pipelines, webhooks and a white-label marketplace included.",
};

export default function PricingPage() {
  return (
    <>
      <PricingView />
      <PlanComparison />
      <section className="sec" id="faq">
        <div className="wrap faq-wrap">
          <div className="shead">
            <span className="eyebrow">FAQ</span>
            <h2>Pricing questions, answered.</h2>
            <p>
              Something else? <TextLink href={siteConfig.salesEmail}>Email our team</TextLink> and a real person will reply the same day.
            </p>
          </div>
          <Faq items={pricingFaq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
