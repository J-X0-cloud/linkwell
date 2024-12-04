import type { AuthScheme, Capability, ConnectorCategory, ConnectorDefinition, TileTone } from "@/types/connectors";
import { apiKey } from "@/lib/connectors/auth";
import { hubspot } from "@/lib/connectors/catalog/hubspot";
import { quickbooks } from "@/lib/connectors/catalog/quickbooks";
import { salesforce } from "@/lib/connectors/catalog/salesforce";
import { shopify } from "@/lib/connectors/catalog/shopify";
import { slack } from "@/lib/connectors/catalog/slack";
import { stripe } from "@/lib/connectors/catalog/stripe";

const OAUTH: AuthScheme = { type: "oauth2", scopes: [] };
const KEY = apiKey();

/**
 * Catalog listing entry for connectors whose object schemas are loaded from their manifest at
 * runtime; only the metadata the catalog and marketplace need is declared here.
 */
function listing(
  id: string,
  name: string,
  category: ConnectorCategory,
  monogram: string,
  tone: TileTone,
  auth: AuthScheme,
  capabilities: Capability[],
): ConnectorDefinition {
  return { id, name, category, monogram, tone, auth, capabilities };
}

/** Catalog order matches the connector page: grouped by category, most requested first. */
export const catalog: ConnectorDefinition[] = [
  salesforce,
  hubspot,
  listing("pipedrive", "Pipedrive", "CRM", "Pd", 2, OAUTH, ["sync", "actions"]),
  listing("zoho-crm", "Zoho CRM", "CRM", "Zo", 3, OAUTH, ["sync", "actions"]),
  listing("attio", "Attio", "CRM", "At", 4, KEY, ["sync", "actions"]),
  quickbooks,
  listing("xero", "Xero", "Accounting", "Xe", 0, OAUTH, ["sync", "actions", "events"]),
  listing("netsuite", "NetSuite", "Accounting", "Ns", 1, { type: "token_based", description: "Token-based authentication (TBA)" }, ["sync", "actions"]),
  stripe,
  shopify,
  listing("woocommerce", "WooCommerce", "Ecommerce", "Wc", 4, KEY, ["sync", "actions"]),
  listing("bigcommerce", "BigCommerce", "Ecommerce", "Bc", 5, OAUTH, ["sync", "actions"]),
  slack,
  listing("microsoft-teams", "Microsoft Teams", "Messaging", "Mt", 1, OAUTH, ["actions", "events"]),
  listing("twilio", "Twilio", "Messaging", "Tw", 2, KEY, ["actions", "events"]),
  listing("google-sheets", "Google Sheets", "Productivity", "Gs", 3, OAUTH, ["sync", "actions"]),
  listing("airtable", "Airtable", "Productivity", "Ai", 4, OAUTH, ["sync", "actions"]),
  listing("notion", "Notion", "Productivity", "No", 5, OAUTH, ["sync", "actions"]),
  listing("jira", "Jira", "Dev & support", "Ji", 0, OAUTH, ["sync", "actions", "events"]),
  listing("zendesk", "Zendesk", "Dev & support", "Zd", 1, OAUTH, ["sync", "actions", "events"]),
  listing("intercom", "Intercom", "Dev & support", "Ic", 2, OAUTH, ["sync", "events"]),
  listing("mailchimp", "Mailchimp", "Marketing", "Mc", 3, OAUTH, ["sync", "actions"]),
  listing("klaviyo", "Klaviyo", "Marketing", "Kl", 4, KEY, ["sync", "actions", "events"]),
  listing("google-calendar", "Google Calendar", "Productivity", "Gc", 5, OAUTH, ["sync", "events"]),
  listing("bamboohr", "BambooHR", "HR", "Bh", 0, KEY, ["sync"]),
  listing("gusto", "Gusto", "HR", "Gu", 1, OAUTH, ["sync", "events"]),
  listing("snowflake", "Snowflake", "Data", "Sn", 2, { type: "key_pair" }, ["sync"]),
  listing("postgresql", "PostgreSQL", "Data", "Pg", 3, { type: "credentials" }, ["sync"]),
  listing("amazon-s3", "Amazon S3", "Data", "S3", 4, { type: "iam_role" }, ["sync"]),
  listing("docusign", "DocuSign", "Productivity", "Ds", 5, OAUTH, ["actions", "events"]),
];

/** Total connectors in the production catalog, including those not featured on the site. */
export const CATALOG_SIZE = 384;
