export const securityHero = {
  eyebrow: "Security",
  heading: "Your customers' credentials, handled like they're ours.",
  lede: "Linkwell sits between your product and the systems your customers run their business on. We treat that position with the seriousness it deserves.",
} as const;

export const complianceBadges = [
  { title: "SOC 2 Type II", body: "Audited annually by an independent firm. Report available under NDA." },
  { title: "GDPR & CCPA", body: "DPA with standard contractual clauses, sub-processor list and deletion SLAs." },
  { title: "HIPAA-ready", body: "BAA available on Enterprise for teams handling protected health data." },
  { title: "Pen-tested", body: "Third-party penetration test every year, plus a private bug bounty." },
] as const;

export const architecture = {
  eyebrow: "Architecture",
  heading: "How data moves through Linkwell.",
  body: "Credentials and payloads are separated at every step, and each tenant's work runs in its own sandboxed lane.",
  product: { kicker: "Your product", title: "Marketplace component", detail: "Short-lived tenant token" },
  toCore: "TLS 1.3",
  core: { kicker: "Linkwell region: US or EU", title: "Isolated tenant workers", parts: ["Credential vault (KMS)", "Sync engine", "Event queue"] },
  toApps: "Scoped OAuth",
  apps: { kicker: "Customer's apps", title: "CRM, accounting, ecommerce", detail: "Least-privilege scopes" },
} as const;

export const controls = {
  eyebrow: "Controls",
  heading: "Security built into the platform, not bolted on.",
  items: [
    { title: "Credential vault", body: "OAuth tokens and API keys are encrypted with per-tenant keys (AES-256) held in a managed KMS. Your servers never see customer credentials." },
    { title: "Tenant isolation", body: "Every run executes in an isolated worker with its own scoped credentials. One tenant's data can't reach another's pipeline." },
    { title: "Data minimization", body: "Pass-through mode streams records without storing them. When caching is needed, you set the retention window per pipeline." },
    { title: "Data residency", body: "Choose US or EU regions per workspace. Payloads, logs and credentials stay in-region, including backups." },
    { title: "Access controls", body: "SAML SSO, SCIM provisioning, role-based permissions and a full audit log of every console action." },
    { title: "Availability", body: "Multi-zone deployment, queued deliveries during upstream outages and a public status page with incident history." },
  ],
} as const;

export const securityFaq = [
  {
    question: "Where is customer data processed?",
    answer: "In the region you select for your workspace: US (Oregon and Virginia) or EU (Frankfurt and Dublin). Nothing is replicated across regions.",
  },
  {
    question: "Do you store the records you sync?",
    answer: "Only if a pipeline needs it, for example for dedupe or conflict resolution, and only for the retention window you configure. Pass-through mode stores nothing.",
  },
  {
    question: "Can we review your security documentation?",
    answer: "Yes. Our SOC 2 report, pen-test summary and security questionnaire answers are available in our trust portal after a mutual NDA.",
  },
];
