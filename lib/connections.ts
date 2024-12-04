import "server-only";

/** A tenant's authorized connection to one upstream app. */
export interface Connection {
  id: string;
  tenantId: string;
  connectorId: string;
  webhookSecret: string;
  status: "active" | "token_expiring" | "revoked";
}

export interface ConnectionStore {
  get(connectionId: string): Promise<Connection | undefined>;
}

/**
 * Connection lookup for webhook routing. Secrets come from CONNECTION_WEBHOOK_SECRETS
 * (JSON: { "<connectionId>": { "tenantId", "connectorId", "secret" } }) in single-region
 * deployments; the multi-tenant control plane serves the same interface from the vault.
 */
export class EnvConnectionStore implements ConnectionStore {
  private readonly connections: Map<string, Connection>;

  constructor(json = process.env.CONNECTION_WEBHOOK_SECRETS ?? "{}") {
    const parsed = JSON.parse(json) as Record<string, { tenantId: string; connectorId: string; secret: string }>;
    this.connections = new Map(
      Object.entries(parsed).map(([id, value]) => [
        id,
        { id, tenantId: value.tenantId, connectorId: value.connectorId, webhookSecret: value.secret, status: "active" as const },
      ]),
    );
  }

  async get(connectionId: string): Promise<Connection | undefined> {
    return this.connections.get(connectionId);
  }
}
