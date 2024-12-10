import type { Metadata } from "next";
import Link from "next/link";
import { platformHero, platformSections } from "@/lib/data/platform";
import { siteConfig } from "@/lib/data/site";
import { AuthCard } from "@/components/mockups/AuthCard";
import { HookLog } from "@/components/mockups/HookLog";
import { PipelineMock } from "@/components/mockups/PipelineMock";
import { TenantHealth } from "@/components/mockups/TenantHealth";
import { ThemeMock } from "@/components/mockups/ThemeMock";
import { BuildVsBuy } from "@/components/platform/BuildVsBuy";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Split } from "@/components/sections/Split";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = {
  title: "Platform",
  description: "Connectors, sync pipelines, webhooks, a white-label marketplace and per-tenant observability for SaaS products.",
};

export default function PlatformPage() {
  const { connectors, pipelines, webhooks, marketplace, observability } = platformSections;

  return (
    <>
      <PageHero eyebrow={platformHero.eyebrow} heading={platformHero.heading} lede={platformHero.lede}>
        <div className="hero-btns center">
          <ButtonLink href={siteConfig.salesEmail} size="lg">
            Book a demo
          </ButtonLink>
          <ButtonLink href={siteConfig.docsUrl} size="lg" variant="line">
            Read the docs
          </ButtonLink>
        </div>
        <nav className="jump" aria-label="On this page">
          {platformHero.jump.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </PageHero>

      <Split id="connectors" {...connectors} visual={<AuthCard />} />

      <section className="sec sec-dark" id="pipelines">
        <div className="wrap">
          <SectionHead eyebrow={pipelines.eyebrow} heading={pipelines.heading} body={pipelines.body} />
          <PipelineMock />
        </div>
      </section>

      <Split id="webhooks" reverse {...webhooks} visual={<HookLog />} />
      <Split id="marketplace" tone="tint" {...marketplace} visual={<ThemeMock />} />

      <section className="sec" id="observability">
        <div className="wrap">
          <SectionHead eyebrow={observability.eyebrow} heading={observability.heading} body={observability.body} />
          <TenantHealth />
        </div>
      </section>

      <BuildVsBuy />
      <CtaBand />
    </>
  );
}
