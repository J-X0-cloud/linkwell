export const siteConfig = {
  name: "Linkwell",
  title: "Linkwell | Embedded integrations for SaaS products",
  description:
    "Linkwell gives SaaS companies 380+ pre-built connectors, sync pipelines, webhooks and a white-label integrations marketplace, embedded in weeks.",
  tagline:
    "Embedded integrations for SaaS products. Pre-built connectors, sync pipelines, webhooks and a marketplace that looks like yours.",
  salesEmail: "mailto:hello@linkwell.com",
  securityEmail: "security@linkwell.com",
  docsUrl: "https://docs.linkwell.com",
  appUrl: "https://app.linkwell.com",
  statusUrl: "https://status.linkwell.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://linkwell.com",
} as const;

export const mainNav = [
  { label: "Platform", href: "/platform" },
  { label: "Connectors", href: "/connectors" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Sync pipelines", href: "/platform#pipelines" },
      { label: "Webhooks", href: "/platform#webhooks" },
      { label: "Embedded marketplace", href: "/platform#marketplace" },
    ],
  },
  {
    title: "Connectors",
    links: [
      { label: "Connector catalog", href: "/connectors" },
      { label: "Custom connectors", href: "/connectors#custom" },
      { label: "Request a connector", href: "/connectors#request" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Docs & API reference", href: siteConfig.docsUrl },
      { label: "Contact sales", href: siteConfig.salesEmail },
    ],
  },
] as const;

export const legalLinks = [
  { label: "Privacy", href: "/security#faq" },
  { label: "Terms", href: "/pricing#faq" },
  { label: "DPA", href: "/security" },
] as const;

export const customerLogos = [
  { name: "Fieldnote", style: "lg-a" },
  { name: "HarborPay", style: "lg-b" },
  { name: "Quarrystack", style: "lg-c" },
  { name: "Tallyhall", style: "lg-d" },
  { name: "Orbitly", style: "lg-e" },
  { name: "Parcelworks", style: "lg-f" },
  { name: "Brightdesk", style: "lg-g" },
] as const;

export const ctaBand = {
  heading: "Put your integrations roadmap on rails.",
  body: "Bring the three connectors your customers ask about most. We'll show you them running inside a sandbox copy of your product in the first call.",
} as const;
