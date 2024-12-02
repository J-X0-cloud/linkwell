export interface Plan {
  id: "launch" | "scale" | "enterprise";
  name: string;
  /** Monthly price when billed annually, in USD. Null for custom pricing. */
  annualMonthly: number | null;
  description: string;
  capacity: string;
  features: string[];
  popular: boolean;
  cta: string;
}

/** Monthly billing costs this much more than the annual rate. */
export const MONTHLY_UPLIFT = 0.15;

export const pricingHero = {
  eyebrow: "Pricing",
  heading: "Priced on customers connected, not on API calls.",
  lede: "Predictable plans that grow with adoption. Every plan includes guided onboarding and the full sync and webhook engine.",
} as const;

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    annualMonthly: 750,
    description: "For teams shipping their first native integrations.",
    capacity: "Up to 100 connected customers",
    features: ["10 catalog connectors", "Embedded marketplace (Linkwell theme options)", "Sync pipelines & webhooks", "7-day log retention", "Email support"],
    popular: false,
    cta: "Start a trial",
  },
  {
    id: "scale",
    name: "Scale",
    annualMonthly: 2400,
    description: "For products where integrations drive expansion revenue.",
    capacity: "Up to 1,000 connected customers",
    features: [
      "Unlimited catalog connectors",
      "Full white-label & custom domain",
      "Custom connector builder",
      "30-day logs, replay & alerts",
      "Shared Slack channel with our engineers",
      "New connectors built on request",
    ],
    popular: true,
    cta: "Book a demo",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    annualMonthly: null,
    description: "For platforms with complex data, security or residency needs.",
    capacity: "Unlimited connected customers",
    features: ["Everything in Scale", "Dedicated or single-tenant deployment", "EU or US data residency", "SAML SSO, SCIM & audit exports", "99.95% uptime SLA", "Named solutions engineer"],
    popular: false,
    cta: "Talk to sales",
  },
];

export const planComparison: { label: string; values: [string, string, string] }[] = [
  { label: "Connected customers (tenants)", values: ["100", "1,000", "Unlimited"] },
  { label: "Catalog connectors", values: ["10", "All", "All"] },
  { label: "Custom connectors", values: ["–", "5", "Unlimited"] },
  { label: "Sync frequency", values: ["Hourly", "Every 5 min", "Real time"] },
  { label: "Webhook retries", values: ["24 hours", "72 hours", "72 hours + dead-letter export"] },
  { label: "Log retention", values: ["7 days", "30 days", "Up to 1 year"] },
  { label: "White-label & custom domain", values: ["Theme only", "Yes", "Yes"] },
  { label: "SSO & SCIM", values: ["–", "SSO", "SSO + SCIM"] },
  { label: "Support", values: ["Email", "Slack, 4 h response", "Slack, 1 h response, named SE"] },
];

export const pricingFaq = [
  {
    question: "What counts as a connected customer?",
    answer: "A tenant in your product with at least one active connection during the billing month. Customers who browse the marketplace but never connect don't count.",
  },
  {
    question: "Can we charge our customers for integrations?",
    answer: "Yes. Plan-based gating lets you include some connectors in every tier and reserve others for premium plans. Many teams use it to support an integrations add-on.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No. Onboarding with a solutions engineer is included on every plan, and Launch includes a 21-day trial on sandbox data.",
  },
  {
    question: "What happens if we go over our tenant limit?",
    answer: "Nothing breaks. We'll reach out to talk about moving up a plan, and extra tenants are billed at your plan's per-tenant rate until then.",
  },
];

export function monthlyPrice(plan: Plan, billing: "annual" | "monthly"): number | null {
  if (plan.annualMonthly === null) return null;
  return billing === "annual" ? plan.annualMonthly : Math.round((plan.annualMonthly * (1 + MONTHLY_UPLIFT)) / 10) * 10;
}
