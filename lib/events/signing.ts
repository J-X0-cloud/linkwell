import { createHmac, timingSafeEqual } from "node:crypto";
import type { ConnectorDefinition } from "@/types/connectors";

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/**
 * Verifies an upstream app's webhook signature using the scheme declared on its connector.
 * Stripe-style headers ("t=…,v1=…") sign "timestamp.body"; the rest sign the raw body.
 */
export function verifyUpstreamSignature(
  connector: ConnectorDefinition,
  rawBody: string,
  header: string | null,
  secret: string,
): boolean {
  const scheme = connector.webhook;
  if (!scheme || !header) return false;

  const parts = Object.fromEntries(
    header.split(",").map((part) => {
      const [k, ...v] = part.split("=");
      return [k?.trim() ?? "", v.join("=")];
    }),
  );

  if (parts.t && parts.v1) {
    const expected = createHmac(scheme.algorithm, secret).update(`${parts.t}.${rawBody}`).digest(scheme.encoding);
    return safeEqual(expected, parts.v1);
  }

  const provided = header.replace(/^sha256=/, "");
  const expected = createHmac(scheme.algorithm, secret).update(rawBody).digest(scheme.encoding);
  return safeEqual(expected, provided);
}

export const SIGNATURE_HEADER = "linkwell-signature";

/** Signs an outbound delivery: `t=<unix seconds>,v1=<hex HMAC-SHA256 of "t.body">`. */
export function signDelivery(body: string, secret: string, timestamp = Math.floor(Date.now() / 1000)): string {
  const digest = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return `t=${timestamp},v1=${digest}`;
}
