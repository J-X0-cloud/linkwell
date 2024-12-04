import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const salesforce: ConnectorDefinition = {
  id: "salesforce",
  name: "Salesforce",
  category: "CRM",
  monogram: "Sf",
  tone: 0,
  auth: oauth2(
    "https://login.salesforce.com/services/oauth2/authorize",
    "https://login.salesforce.com/services/oauth2/token",
    ["api", "refresh_token"],
  ),
  capabilities: ["sync", "actions", "events"],
  baseUrl: "https://{instance}.my.salesforce.com/services/data/v61.0",
  pagination: "cursor",
  rateLimit: { requests: 100_000, perSeconds: 86_400, scope: "tenant" },
  objects: {
    Opportunity: {
      primaryKey: "Id",
      cursorField: "SystemModstamp",
      fields: {
        Id: "id",
        Name: "string",
        Amount: "currency",
        CloseDate: "date",
        StageName: "string",
        SystemModstamp: "datetime",
        "Account.Name": "string",
        "Account.Type": "string",
        "Owner.Email": "email",
      },
    },
    Account: {
      primaryKey: "Id",
      cursorField: "SystemModstamp",
      fields: { Id: "id", Name: "string", Type: "string", Website: "string", SystemModstamp: "datetime" },
    },
  },
  events: ["deal.won", "deal.updated", "account.created"],
};
