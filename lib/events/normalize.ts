import { createHash, randomUUID } from "node:crypto";
import type { ConnectorDefinition } from "@/types/connectors";
import type { LinkwellEvent } from "@/lib/events/types";

export interface UpstreamWebhook {
  topic: string;
  /** Upstream delivery or event id when the app provides one. */
  upstreamId?: string;
  occurredAt?: string;
  payload: Record<string, unknown>;
}

/** Pulls the topic, id and timestamp out of each app's webhook envelope. */
export function readEnvelope(connector: ConnectorDefinition, headers: Headers, payload: Record<string, unknown>): UpstreamWebhook {
  switch (connector.id) {
    case "shopify":
      return {
        topic: headers.get("x-shopify-topic") ?? "",
        upstreamId: headers.get("x-shopify-webhook-id") ?? undefined,
        occurredAt: headers.get("x-shopify-triggered-at") ?? undefined,
        payload,
      };
    case "stripe":
      return {
        topic: String(payload.type ?? ""),
        upstreamId: String(payload.id ?? ""),
        occurredAt: typeof payload.created === "number" ? new Date(payload.created * 1000).toISOString() : undefined,
        payload: ((payload.data as { object?: Record<string, unknown> } | undefined)?.object ?? {}) as Record<string, unknown>,
      };
    case "slack": {
      const event = (payload.event ?? {}) as Record<string, unknown>;
      return { topic: String(event.type ?? ""), upstreamId: String(payload.event_id ?? ""), payload: event };
    }
    default:
      return {
        topic: String(payload.topic ?? payload.subscriptionType ?? payload.eventType ?? ""),
        upstreamId: payload.eventId != null ? String(payload.eventId) : undefined,
        occurredAt: typeof payload.occurredAt === "string" ? payload.occurredAt : undefined,
        payload,
      };
  }
}

/** Maps an upstream webhook onto Linkwell's event type for that connector. */
export function normalizeEvent(
  connector: ConnectorDefinition,
  webhook: UpstreamWebhook,
  ids: { tenantId: string; connectionId: string },
): LinkwellEvent | null {
  const type = connector.webhook?.topics[webhook.topic];
  if (!type) return null;

  const idempotencyKey = createHash("sha256")
    .update(`${connector.id}:${ids.connectionId}:${webhook.upstreamId ?? JSON.stringify(webhook.payload)}`)
    .digest("hex")
    .slice(0, 32);

  return {
    id: `evt_${randomUUID().replace(/-/g, "").slice(0, 20)}`,
    type,
    tenantId: ids.tenantId,
    connectionId: ids.connectionId,
    connector: connector.id,
    occurredAt: webhook.occurredAt ?? new Date().toISOString(),
    idempotencyKey,
    data: webhook.payload,
  };
}
