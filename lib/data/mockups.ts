import type { TenantHealth, TileTone } from "@/types/connectors";

/** Sample data for the product mockups. Tones here follow each mockup's palette, not the catalog. */

export const heroApp = {
  url: "app.fieldnote.io/settings/integrations",
  product: "Fieldnote",
  nav: ["Dashboard", "Projects", "Clients", "Invoices", "Integrations", "Settings"],
  active: "Integrations",
  search: "Search 380 apps",
  chips: ["All", "CRM", "Accounting", "Messaging"],
  apps: [
    { name: "HubSpot", mono: "Hs", tone: 1, objects: "Contacts, deals", connected: true },
    { name: "QuickBooks", mono: "Qb", tone: 5, objects: "Invoices, payments", connected: true },
    { name: "Slack", mono: "Sl", tone: 0, objects: "Alerts, approvals", connected: false },
    { name: "Salesforce", mono: "Sf", tone: 2, objects: "Accounts, leads", connected: false },
    { name: "Google Sheets", mono: "Gs", tone: 3, objects: "Rows, exports", connected: false },
    { name: "Xero", mono: "Xe", tone: 4, objects: "Invoices, contacts", connected: false },
  ] satisfies { name: string; mono: string; tone: TileTone; objects: string; connected: boolean }[],
  sync: { schedule: "every 15 min", label: "HubSpot contacts → Fieldnote clients", done: 1284, total: 1790, errors: 0 },
  hook: { status: 200, event: "invoice.paid", detail: "POST /hooks/qb · 142 ms" },
} as const;

export const themeMock = {
  swatches: ["#2F5BEA", "#0F766E", "#9A3412", "#111827"],
  defaultSwatch: 1,
  domain: "integrations.harborpay.com",
  product: "HarborPay",
  apps: [
    { name: "Xero", mono: "Xe", tone: 0, connected: true },
    { name: "Stripe", mono: "St", tone: 2, connected: false },
    { name: "NetSuite", mono: "Ns", tone: 1, connected: false },
    { name: "Slack", mono: "Sl", tone: 3, connected: false },
  ] satisfies { name: string; mono: string; tone: TileTone; connected: boolean }[],
} as const;

export type HookStatus = 200 | 429 | 500;

export const hookRows: { status: HookStatus; event: string; tenant: string; source: string; latency: string; time: string }[] = [
  { status: 200, event: "invoice.paid", tenant: "tenant_48sK", source: "QuickBooks", latency: "142 ms", time: "14:02:11" },
  { status: 200, event: "contact.updated", tenant: "tenant_91Qa", source: "HubSpot", latency: "88 ms", time: "14:02:09" },
  { status: 429, event: "order.created", tenant: "tenant_12Zt", source: "Shopify", latency: "retry 2/5", time: "14:02:04" },
  { status: 200, event: "deal.won", tenant: "tenant_48sK", source: "Salesforce", latency: "203 ms", time: "14:01:58" },
  { status: 500, event: "ticket.created", tenant: "tenant_77Hm", source: "Zendesk", latency: "retry 1/5", time: "14:01:51" },
  { status: 200, event: "payment.succeeded", tenant: "tenant_30Lp", source: "Stripe", latency: "64 ms", time: "14:01:47" },
  { status: 200, event: "message.posted", tenant: "tenant_91Qa", source: "Slack", latency: "117 ms", time: "14:01:40" },
];

export const hookDetail = {
  event: "order.created",
  tenant: "tenant_12Zt",
  source: "Shopify",
  message: "Upstream returned 429 Too Many Requests. Backing off 32s (attempt 3 of 5), payload held in queue.",
} as const;

export const tenants: { name: string; apps: string; health: TenantHealth; status: string; lastRun: string }[] = [
  { name: "Larkspur Dental Group", apps: "HubSpot, QuickBooks", health: "ok", status: "Healthy", lastRun: "2 min ago" },
  { name: "Oakmere Logistics", apps: "NetSuite, Slack", health: "ok", status: "Healthy", lastRun: "4 min ago" },
  { name: "Sierra Row Studio", apps: "Shopify, Klaviyo", health: "warn", status: "Token expires in 3 days", lastRun: "11 min ago" },
  { name: "Hollis & Grant LLP", apps: "Salesforce", health: "bad", status: "Auth revoked by user", lastRun: "1 hr ago" },
  { name: "Tidewater Supply", apps: "Xero, Google Sheets", health: "ok", status: "Healthy", lastRun: "6 min ago" },
];

export const authCard = {
  title: "Connect QuickBooks Online",
  subtitle: "Tallyhall wants access to your company file",
  steps: [
    { label: "Sign in to QuickBooks", state: "done" },
    { label: "Choose company: Oakmere Logistics", state: "done" },
    { label: "Pick what to sync", state: "cur" },
  ],
  options: [
    { label: "Invoices & payments", on: true },
    { label: "Customers", on: true },
    { label: "Chart of accounts", on: false },
    { label: "Items & services", on: true },
  ],
} as const;

export const pipelineNodes = {
  trigger: { label: "Salesforce", detail: "Opportunity stage = Closed Won" },
  filter: { label: "Only new accounts" },
  destination: { label: "Create project", detail: "Upsert on external_id" },
} as const;

export const connectorBuilder = {
  title: "New connector · Routeline TMS",
  rows: [
    { label: "Base URL", value: "https://api.routeline.example/v2" },
    { label: "Auth", value: "OAuth 2.0 · client credentials" },
    { label: "Pagination", value: "cursor · next_page_token" },
    { label: "Rate limit", value: "600 req / min per tenant" },
  ],
  objects: ["Shipment", "Stop", "Carrier", "Invoice", "Driver"],
} as const;
