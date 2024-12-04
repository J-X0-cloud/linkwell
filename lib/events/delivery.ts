import type { DeliveryAttempt, LinkwellEvent } from "@/lib/events/types";
import { SIGNATURE_HEADER, signDelivery } from "@/lib/events/signing";

export const MAX_ATTEMPTS = 5;
/** Deliveries keep retrying for up to 72 hours on Scale and Enterprise. */
export const MAX_RETRY_WINDOW_SECONDS = 72 * 3600;

/**
 * Exponential backoff with full jitter: 30s, 1m, 2m, 4m… capped by the retry window.
 * Honours an upstream Retry-After when the receiver sends one.
 */
export function nextRetryDelaySeconds(attempt: number, retryAfterSeconds?: number, random = Math.random): number {
  if (retryAfterSeconds && retryAfterSeconds > 0) return Math.min(retryAfterSeconds, MAX_RETRY_WINDOW_SECONDS);
  const base = 30 * 2 ** Math.max(0, attempt - 1);
  const jittered = base / 2 + random() * (base / 2);
  return Math.min(Math.round(jittered), MAX_RETRY_WINDOW_SECONDS);
}

export function isRetryable(status: number | null): boolean {
  return status === null || status === 408 || status === 409 || status === 425 || status === 429 || status >= 500;
}

export interface DeliveryQueue {
  enqueue(event: LinkwellEvent, options?: { delaySeconds?: number; attempt?: number }): Promise<void>;
}

export interface Endpoint {
  url: string;
  secret: string;
}

export interface DeliveryOutcome {
  attempt: DeliveryAttempt;
  retryInSeconds: number | null;
}

/** Posts one signed event to the customer's endpoint and decides whether to retry. */
export async function deliver(event: LinkwellEvent, endpoint: Endpoint, attempt: number, fetchImpl: typeof fetch = fetch): Promise<DeliveryOutcome> {
  const body = JSON.stringify(event);
  const started = Date.now();
  let status: number | null = null;
  let retryAfter: number | undefined;

  try {
    const response = await fetchImpl(endpoint.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        [SIGNATURE_HEADER]: signDelivery(body, endpoint.secret),
        "idempotency-key": event.idempotencyKey,
        "linkwell-event-type": event.type,
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    status = response.status;
    const header = response.headers.get("retry-after");
    retryAfter = header && /^\d+$/.test(header) ? Number(header) : undefined;
  } catch {
    status = null;
  }

  const record: DeliveryAttempt = {
    eventId: event.id,
    attempt,
    status,
    latencyMs: Date.now() - started,
    at: new Date().toISOString(),
  };

  const ok = status !== null && status >= 200 && status < 300;
  const retry = !ok && isRetryable(status) && attempt < MAX_ATTEMPTS;
  return { attempt: record, retryInSeconds: retry ? nextRetryDelaySeconds(attempt, retryAfter) : null };
}

/** Holds events in memory; production uses a durable queue with the same interface. */
export class InMemoryDeliveryQueue implements DeliveryQueue {
  readonly pending: { event: LinkwellEvent; runAt: number; attempt: number }[] = [];

  async enqueue(event: LinkwellEvent, { delaySeconds = 0, attempt = 1 } = {}): Promise<void> {
    this.pending.push({ event, runAt: Date.now() + delaySeconds * 1000, attempt });
  }
}
