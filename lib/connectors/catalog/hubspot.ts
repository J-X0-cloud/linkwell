import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const hubspot: ConnectorDefinition = {
  id: "hubspot",
  name: "HubSpot",
  category: "CRM",
  monogram: "Hs",
  tone: 1,
  auth: oauth2("https://app.hubspot.com/oauth/authorize", "https://api.hubapi.com/oauth/v1/token", [
    "crm.objects.contacts.read",
    "crm.objects.contacts.write",
    "crm.objects.deals.read",
  ]),
  capabilities: ["sync", "actions", "events"],
  baseUrl: "https://api.hubapi.com",
  pagination: "cursor",
  rateLimit: { requests: 110, perSeconds: 10, scope: "tenant" },
  objects: {
    Contact: {
      primaryKey: "id",
      cursorField: "updatedAt",
      fields: { id: "id", email: "email", firstname: "string", lastname: "string", company: "string", updatedAt: "datetime" },
    },
  },
  events: ["contact.created", "contact.updated", "deal.won"],
  webhook: {
    signatureHeader: "x-hubspot-signature-v3",
    algorithm: "sha256",
    encoding: "base64",
    topics: { "contact.creation": "contact.created", "contact.propertyChange": "contact.updated", "deal.propertyChange": "deal.updated" },
  },
};
