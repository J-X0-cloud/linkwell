export type Region = "us" | "eu";

export interface TenantToken {
  token: string;
  tenantId: string;
  expiresAt: string;
}

export type ConnectionStatus = "active" | "token_expiring" | "revoked" | "error";

export interface Connection {
  id: string;
  tenantId: string;
  connector: string;
  status: ConnectionStatus;
  createdAt: string;
  lastSyncAt: string | null;
}

export type RunStatus = "queued" | "running" | "succeeded" | "failed";

export interface PipelineRun {
  id: string;
  pipelineId: string;
  tenantId: string;
  status: RunStatus;
  read: number;
  written: number;
  skipped: number;
  errors: number;
  startedAt: string;
  finishedAt: string | null;
}

export interface LinkwellEvent<T = Record<string, unknown>> {
  id: string;
  type: string;
  tenantId: string;
  connectionId: string;
  connector: string;
  occurredAt: string;
  idempotencyKey: string;
  data: T;
}

export interface Page<T> {
  data: T[];
  nextCursor: string | null;
}

export interface ListOptions {
  limit?: number;
  cursor?: string;
}
