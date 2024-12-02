export const platformHero = {
  eyebrow: "Platform",
  heading: "One integrations layer for every app your customers use.",
  lede: "Connectors, sync pipelines, webhooks, a white-label marketplace and per-tenant observability, running on infrastructure built for multi-tenant SaaS.",
  jump: [
    { label: "Connectors", href: "#connectors" },
    { label: "Sync pipelines", href: "#pipelines" },
    { label: "Webhooks", href: "#webhooks" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Observability", href: "#observability" },
  ],
} as const;

export const platformSections = {
  connectors: {
    eyebrow: "01 · Connectors",
    heading: "Maintained connectors, not SDK wrappers.",
    body: "Every Linkwell connector covers authentication, pagination, rate limits, webhooks and schema changes for its app. When an upstream API changes, we ship the fix. Your customers never notice.",
    checks: [
      "OAuth, API key and token-based auth with automatic refresh",
      "Normalized objects across apps in the same category",
      "Passthrough requests for anything not modelled yet",
    ],
    link: { label: "Browse the catalog →", href: "/connectors" },
  },
  pipelines: {
    eyebrow: "02 · Sync pipelines",
    heading: "Visual when you want it. Code when you need it.",
    body: "Pipelines run per tenant with their own cursors, schedules and error budgets. Define them in the editor, or export to YAML and review changes like any other pull request.",
  },
  webhooks: {
    eyebrow: "03 · Webhooks & events",
    heading: "One endpoint for every event, from every app.",
    body: "Linkwell listens to upstream webhooks (or polls when an app doesn't offer them), normalizes the payload and delivers a signed event to your service. Failed deliveries back off and queue, never drop.",
    checks: [
      "HMAC-signed payloads with idempotency keys",
      "Exponential backoff for up to 72 hours",
      "Replay any event, or a whole time window",
      "Filter by tenant, connector, status or event type",
    ],
  },
  marketplace: {
    eyebrow: "04 · Embedded marketplace",
    heading: "An integrations page your designers will sign off on.",
    body: "Theme it from the console or pass your own design tokens. Choose which connectors each plan unlocks, reorder categories, and add custom setup steps so customers configure syncs themselves.",
    checks: ["React, web component or hosted page", "Plan-based gating for upsell-ready integrations", "Localized into 14 languages"],
  },
  observability: {
    eyebrow: "05 · Observability",
    heading: "See every customer's integrations at a glance.",
    body: "Support and success teams get a per-tenant health view, so they spot expired tokens and failing syncs before the ticket arrives.",
  },
} as const;

export const buildVsBuy = {
  eyebrow: "Build vs. Linkwell",
  heading: "What it takes to run integrations in-house.",
  rows: [
    { label: "Time to first connector", linkwell: "2–4 weeks", inHouse: "1–3 months per connector" },
    { label: "Auth & token refresh", linkwell: "Managed, per tenant", inHouse: "Built and maintained in-house" },
    { label: "API changes upstream", linkwell: "Linkwell patches connectors", inHouse: "Your on-call finds out first" },
    { label: "Customer-facing UI", linkwell: "White-label marketplace included", inHouse: "Design and build from scratch" },
    { label: "Observability", linkwell: "Per-tenant runs, logs, replay", inHouse: "Grep through application logs" },
    { label: "Rate limits & retries", linkwell: "Adaptive backoff, queued payloads", inHouse: "Custom per integration" },
  ],
} as const;
