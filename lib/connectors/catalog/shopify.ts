import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const shopify: ConnectorDefinition = {
  id: "shopify",
  name: "Shopify",
  category: "Ecommerce",
  monogram: "Sh",
  tone: 3,
  auth: oauth2("https://{shop}.myshopify.com/admin/oauth/authorize", "https://{shop}.myshopify.com/admin/oauth/access_token", [
    "read_orders",
    "read_customers",
    "read_products",
  ]),
  capabilities: ["sync", "actions", "events"],
  baseUrl: "https://{shop}.myshopify.com/admin/api/2025-07",
  pagination: "link_header",
  rateLimit: { requests: 40, perSeconds: 20, scope: "tenant" },
  objects: {
    Order: {
      primaryKey: "id",
      cursorField: "updated_at",
      fields: { id: "id", name: "string", email: "email", total_price: "currency", financial_status: "string", updated_at: "datetime" },
    },
  },
  events: ["order.created", "order.paid", "customer.created"],
  webhook: {
    signatureHeader: "x-shopify-hmac-sha256",
    algorithm: "sha256",
    encoding: "base64",
    topics: { "orders/create": "order.created", "orders/paid": "order.paid", "customers/create": "customer.created" },
  },
};
