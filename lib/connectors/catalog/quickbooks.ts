import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const quickbooks: ConnectorDefinition = {
  id: "quickbooks-online",
  name: "QuickBooks Online",
  category: "Accounting",
  monogram: "Qb",
  tone: 5,
  auth: oauth2("https://appcenter.intuit.com/connect/oauth2", "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", [
    "com.intuit.quickbooks.accounting",
  ]),
  capabilities: ["sync", "actions", "events"],
  baseUrl: "https://quickbooks.api.intuit.com/v3/company/{realmId}",
  pagination: "offset",
  rateLimit: { requests: 500, perSeconds: 60, scope: "tenant" },
  objects: {
    Invoice: {
      primaryKey: "Id",
      cursorField: "MetaData.LastUpdatedTime",
      fields: { Id: "id", DocNumber: "string", TotalAmt: "currency", Balance: "currency", "CustomerRef.name": "string", "MetaData.LastUpdatedTime": "datetime" },
    },
    Customer: {
      primaryKey: "Id",
      cursorField: "MetaData.LastUpdatedTime",
      fields: { Id: "id", DisplayName: "string", "PrimaryEmailAddr.Address": "email", "MetaData.LastUpdatedTime": "datetime" },
    },
  },
  events: ["invoice.created", "invoice.paid", "customer.updated"],
  webhook: {
    signatureHeader: "intuit-signature",
    algorithm: "sha256",
    encoding: "base64",
    topics: { "Invoice.Create": "invoice.created", "Payment.Create": "invoice.paid", "Customer.Update": "customer.updated" },
  },
};
