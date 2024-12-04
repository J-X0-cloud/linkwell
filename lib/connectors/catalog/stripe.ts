import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const stripe: ConnectorDefinition = {
  id: "stripe",
  name: "Stripe",
  category: "Payments",
  monogram: "St",
  tone: 2,
  auth: oauth2("https://connect.stripe.com/oauth/authorize", "https://connect.stripe.com/oauth/token", ["read_only"]),
  capabilities: ["sync", "events"],
  baseUrl: "https://api.stripe.com/v1",
  pagination: "cursor",
  rateLimit: { requests: 100, perSeconds: 1, scope: "app" },
  objects: {
    Charge: {
      primaryKey: "id",
      cursorField: "created",
      fields: { id: "id", amount: "integer", currency: "string", status: "string", customer: "id", created: "datetime" },
    },
  },
  events: ["payment.succeeded", "payment.failed", "invoice.paid"],
  webhook: {
    signatureHeader: "stripe-signature",
    algorithm: "sha256",
    encoding: "hex",
    topics: { "charge.succeeded": "payment.succeeded", "charge.failed": "payment.failed", "invoice.paid": "invoice.paid" },
  },
};
