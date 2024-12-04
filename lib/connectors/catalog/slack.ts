import type { ConnectorDefinition } from "@/types/connectors";
import { oauth2 } from "@/lib/connectors/auth";

export const slack: ConnectorDefinition = {
  id: "slack",
  name: "Slack",
  category: "Messaging",
  monogram: "Sl",
  tone: 0,
  auth: oauth2("https://slack.com/oauth/v2/authorize", "https://slack.com/api/oauth.v2.access", ["chat:write", "channels:read"]),
  capabilities: ["actions", "events"],
  baseUrl: "https://slack.com/api",
  pagination: "cursor",
  rateLimit: { requests: 50, perSeconds: 60, scope: "tenant" },
  events: ["message.posted", "channel.created"],
  webhook: {
    signatureHeader: "x-slack-signature",
    algorithm: "sha256",
    encoding: "hex",
    topics: { message: "message.posted", channel_created: "channel.created" },
  },
};
