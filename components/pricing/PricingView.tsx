"use client";

import { useState } from "react";
import { MONTHLY_UPLIFT, monthlyPrice, plans, pricingHero } from "@/lib/data/pricing";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/cn";
import { Checks } from "@/components/ui/Checks";

type Billing = "annual" | "monthly";

/** Pricing hero and plan cards share the billing toggle. */
export function PricingView() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <>
      <section className="phero small">
        <div className="wrap">
          <span className="eyebrow">{pricingHero.eyebrow}</span>
          <h1>{pricingHero.heading}</h1>
          <p className="lede">{pricingHero.lede}</p>
          <div className="billing" role="group" aria-label="Billing period">
            <button type="button" className={cn(billing === "annual" && "on")} aria-pressed={billing === "annual"} onClick={() => setBilling("annual")}>
              Billed annually
            </button>
            <button type="button" className={cn(billing === "monthly" && "on")} aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>
              Monthly <em>+{Math.round(MONTHLY_UPLIFT * 100)}%</em>
            </button>
          </div>
        </div>
      </section>
      <section className="sec pricing">
        <div className="wrap">
          <div className="plans">
            {plans.map((plan) => {
              const price = monthlyPrice(plan, billing);
              return (
                <article key={plan.id} className={cn("plan", plan.popular && "hot")}>
                  {plan.popular ? <span className="tag">Most popular</span> : null}
                  <h3>{plan.name}</h3>
                  <p className="pdesc">{plan.description}</p>
                  <div className="price">
                    <b>{price === null ? "Custom" : `$${price.toLocaleString("en-US")}`}</b>
                    <span>{price === null ? "" : "/month"}</span>
                  </div>
                  <p className="cap">{plan.capacity}</p>
                  <a className={cn("btn", !plan.popular && "btn-line")} href={`${siteConfig.salesEmail}?subject=${encodeURIComponent(`Linkwell ${plan.name}`)}`}>
                    {plan.cta}
                  </a>
                  <Checks items={plan.features} />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
