import { developersSection, homeHero, marketplaceSection } from "@/lib/data/home";
import { HomeHero } from "@/components/home/HomeHero";
import { Pillars } from "@/components/home/Pillars";
import { PipelinesSection } from "@/components/home/PipelinesSection";
import { Quotes } from "@/components/home/Quotes";
import { Rollout } from "@/components/home/Rollout";
import { CodeBox } from "@/components/mockups/CodeBox";
import { ThemeMock } from "@/components/mockups/ThemeMock";
import { CtaBand } from "@/components/sections/CtaBand";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Split } from "@/components/sections/Split";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <LogoStrip label={homeHero.logosLabel} />
      <Pillars />
      <Split
        tone="tint"
        eyebrow={marketplaceSection.eyebrow}
        heading={marketplaceSection.heading}
        body={marketplaceSection.body}
        checks={[
          ...marketplaceSection.checks.slice(0, 3),
          <>
            Serve from <code>integrations.yourapp.com</code>
          </>,
        ]}
        link={marketplaceSection.link}
        visual={<ThemeMock />}
      />
      <PipelinesSection />
      <Split
        reverse
        eyebrow={developersSection.eyebrow}
        heading={developersSection.heading}
        body={developersSection.body}
        checks={developersSection.checks}
        link={developersSection.link}
        visual={<CodeBox />}
      />
      <Rollout />
      <Quotes />
      <CtaBand />
    </>
  );
}
