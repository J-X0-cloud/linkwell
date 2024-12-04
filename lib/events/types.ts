/** The normalized event Linkwell delivers to a customer's endpoint, whatever app it came from. */
export interface LinkwellEvent<T = Record<string, unknown>> {
  id: string;
  type: string;
  tenantId: string;
  connectionId: string;
  connector: string;
  occurredAt: string;
  /** Stable across retries and replays so receivers can deduplicate. */
  idempotencyKey: string;
  data: T;
}

export type DeliveryStatus = "delivered" | "retrying" | "failed";

export interface DeliveryAttempt {
  eventId: string;
  attempt: number;
  status: number | null;
  latencyMs: number;
  at: string;
}
