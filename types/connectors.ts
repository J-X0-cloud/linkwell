/** Connector domain types: how an upstream app authenticates, what it exposes and how it's rate-limited. */

export const CONNECTOR_CATEGORIES = [
  "CRM",
  "Accounting",
  "Payments",
  "Ecommerce",
  "Messaging",
  "Productivity",
  "Dev & support",
  "Marketing",
  "HR",
  "Data",
] as const;

export type ConnectorCategory = (typeof CONNECTOR_CATEGORIES)[number];

export type Capability = "sync" | "actions" | "events";

/** Six tile colourways used for connector monograms. */
export type TileTone = 0 | 1 | 2 | 3 | 4 | 5;

export type AuthScheme =
  | {
      type: "oauth2";
      /** Omitted for catalog listings whose endpoints are resolved from the connector manifest. */
      endpoints?: { authorizeUrl: string; tokenUrl: string };
      scopes: string[];
      grant?: "authorization_code" | "client_credentials";
    }
  | { type: "api_key"; header: string; prefix?: string }
  | { type: "token_based"; description: string }
  | { type: "key_pair" }
  | { type: "credentials" }
  | { type: "iam_role" };

export type FieldType = "string" | "number" | "integer" | "boolean" | "date" | "datetime" | "email" | "currency" | "id";

export interface ObjectSchema {
  /** Dotted paths are allowed for nested/related fields, e.g. "Account.Name". */
  fields: Record<string, FieldType>;
  primaryKey: string;
  /** Field used for incremental change detection. */
  cursorField?: string;
}

export interface RateLimit {
  requests: number;
  perSeconds: number;
  scope: "tenant" | "app";
}

export type Pagination = "cursor" | "offset" | "page" | "link_header";

export interface ConnectorDefinition {
  id: string;
  name: string;
  category: ConnectorCategory;
  monogram: string;
  tone: TileTone;
  auth: AuthScheme;
  capabilities: Capability[];
  baseUrl?: string;
  pagination?: Pagination;
  rateLimit?: RateLimit;
  objects?: Record<string, ObjectSchema>;
  /** Normalized Linkwell event types this connector emits. */
  events?: string[];
  webhook?: {
    signatureHeader: string;
    algorithm: "sha256" | "sha1";
    encoding: "hex" | "base64";
    /** Maps the upstream topic/type to a normalized event type. */
    topics: Record<string, string>;
  };
}

export type TenantHealth = "ok" | "warn" | "bad";
