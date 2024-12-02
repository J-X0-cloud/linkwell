export const homeHero = {
  announce: { tag: "New", text: "Webhook replay and per-tenant delivery logs", href: "/platform#webhooks" },
  heading: "Ship the integrations your customers keep asking for.",
  lede: "Linkwell gives your SaaS product 380+ pre-built connectors, two-way sync pipelines and a white-label integrations marketplace, embedded in weeks instead of quarters.",
  ticks: ["White-label by default", "SOC 2 Type II", "US & EU data residency"],
  logosLabel: "Native integrations inside product teams at",
} as const;

export const platformIntro = {
  eyebrow: "The platform",
  heading: "Everything behind an integrations page, done properly.",
  body: "Connectors are the easy part to demo and the hard part to run. Linkwell covers the full stack, from auth to the retry queue, so your team ships product instead.",
} as const;

export type PillarVisual = "tiles" | "flow" | "hooks" | "marketplace";

export const pillars: { title: string; body: string; visual: PillarVisual }[] = [
  {
    title: "Pre-built connectors",
    body: "380+ maintained connectors with auth, pagination, rate limits and schema drift handled for you. Your engineers never touch an OAuth refresh token again.",
    visual: "tiles",
  },
  {
    title: "Sync pipelines",
    body: "Two-way, incremental syncs between your data model and theirs. Field mapping, transforms and dedupe rules live in config, not in a cron job someone wrote in 2021.",
    visual: "flow",
  },
  {
    title: "Webhooks & events",
    body: "Normalized events from every connected app, signed and delivered to one endpoint. Automatic retries with backoff and one-click replay when your service hiccups.",
    visual: "hooks",
  },
  {
    title: "White-label marketplace",
    body: "A drop-in integrations page that inherits your fonts, colours and domain. Customers browse, connect and configure without leaving your product.",
    visual: "marketplace",
  },
];

export const marketplaceSection = {
  eyebrow: "Embedded marketplace",
  heading: "Looks like your product. Because it is.",
  body: "The Linkwell marketplace ships as a React component, a web component or a hosted page on your own domain. It inherits your design tokens, so customers never see a third-party brand.",
  checks: [
    "Theme with your colours, fonts and radius in the console",
    "Show only the connectors each plan includes",
    "Custom setup steps and field pickers per connector",
    "Serve from integrations.yourapp.com",
  ],
  link: { label: "See the marketplace →", href: "/platform#marketplace" },
} as const;

export const pipelinesSection = {
  eyebrow: "Sync pipelines",
  heading: "Model the sync once. Run it for every customer.",
  body: "Build a pipeline in the visual editor or as code, then let each tenant choose their own fields and filters. Linkwell handles cursors, backfills, dedupe and conflict rules.",
  features: [
    { title: "Incremental by default", body: "Cursor-based change detection keeps every run small, even for tenants with millions of records." },
    { title: "Conflict rules you choose", body: "Last-write-wins, source-of-truth per field, or hold for review. Set it per pipeline." },
    { title: "Backfill without downtime", body: "Historical imports run in a separate lane so live changes keep flowing." },
  ],
} as const;

export const developersSection = {
  eyebrow: "For developers",
  heading: "Twelve lines to a working integrations page.",
  body: "Mint a short-lived tenant token on your backend, render the component, and listen for events. Everything else is configuration you can version in Git.",
  checks: [
    "Typed SDKs for TypeScript, Python, Go and Ruby",
    "Unified API across CRM, accounting and ecommerce apps",
    "Signed webhooks with idempotency keys",
    "Staging and production environments per workspace",
  ],
  link: { label: "Explore the platform →", href: "/platform" },
} as const;

export const rollout = {
  eyebrow: "Rollout",
  heading: "From kickoff to live in about a month.",
  body: "A solutions engineer works alongside your team through launch. Most customers ship their first connectors inside four weeks.",
  steps: [
    { when: "Week 1", title: "Scope", body: "We map your data model, pick launch connectors and agree on the sync rules your customers expect." },
    { when: "Week 2", title: "Embed", body: "Drop the marketplace component into your settings page and mint tenant tokens from your backend." },
    { when: "Weeks 3–4", title: "Configure", body: "Build pipelines and field mappings in the console, test against sandbox accounts, tune error handling." },
    { when: "Launch", title: "Ship & grow", body: "Roll out to a beta cohort, then everyone. Add connectors from the catalog as requests come in." },
  ],
} as const;

export const quotes = {
  eyebrow: "Customers",
  heading: "Product teams that stopped hand-building connectors.",
  items: [
    {
      quote: "We had a backlog of 40 integration requests and two engineers. Linkwell let us ship the top twelve in a quarter, and our support queue for broken syncs basically disappeared.",
      name: "Maya R.",
      role: "VP Product, Fieldnote",
    },
    {
      quote: "The white-label marketplace was the deciding factor. Customers think we built every connector ourselves, and our sales team finally has an answer for the integrations checklist.",
      name: "Daniel K.",
      role: "Co-founder & CEO, HarborPay",
    },
    {
      quote: "Per-tenant logs are what sold our on-call team. When a customer's QuickBooks sync fails we see why before they open a ticket, and replay it in one click.",
      name: "Priya S.",
      role: "Head of Engineering, Tallyhall",
    },
  ],
} as const;
