import { z } from "zod";
import { EnvConnectionStore } from "@/lib/connections";
import { registry } from "@/lib/connectors/registry";
import { InMemoryDeliveryQueue } from "@/lib/events/delivery";
import { normalizeEvent, readEnvelope } from "@/lib/events/normalize";
import { verifyUpstreamSignature } from "@/lib/events/signing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const connections = new EnvConnectionStore();
const queue = new InMemoryDeliveryQueue();

const querySchema = z.object({
  connection: z.string().regex(/^conn_[A-Za-z0-9]+$/),
});

/**
 * POST /api/webhooks?connection=conn_…
 * Receives webhooks from upstream apps (Shopify, Stripe, HubSpot, QuickBooks…), verifies the
 * app's signature, normalizes the payload into a Linkwell event and queues it for signed
 * delivery to the customer's endpoint. Responds 202 quickly so upstream apps don't retry.
 */
export async function POST(request: Request): Promise<Response> {
  const query = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!query.success) return Response.json({ error: "Missing or malformed connection id" }, { status: 400 });

  const connection = await connections.get(query.data.connection);
  if (!connection || connection.status === "revoked") {
    return Response.json({ error: "Unknown connection" }, { status: 404 });
  }

  const connector = registry.get(connection.connectorId);
  if (!connector?.webhook) {
    return Response.json({ error: `${connection.connectorId} does not send webhooks` }, { status: 422 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get(connector.webhook.signatureHeader);
  if (!verifyUpstreamSignature(connector, rawBody, signature, connection.webhookSecret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    payload = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Body must be a JSON object" }, { status: 400 });
  }

  // Slack verifies endpoints with a one-time challenge.
  if (connector.id === "slack" && payload.type === "url_verification") {
    return Response.json({ challenge: payload.challenge });
  }

  const envelope = readEnvelope(connector, request.headers, payload);
  const event = normalizeEvent(connector, envelope, { tenantId: connection.tenantId, connectionId: connection.id });

  if (!event) {
    // Topics we don't normalize are acknowledged so the upstream app doesn't keep retrying.
    return Response.json({ received: true, ignored: envelope.topic || "unknown topic" }, { status: 202 });
  }

  await queue.enqueue(event);
  return Response.json({ received: true, event: { id: event.id, type: event.type } }, { status: 202 });
}
