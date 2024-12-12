import { createHmac, timingSafeEqual } from "node:crypto";
import { SignatureVerificationError } from "./errors.js";
import type { LinkwellEvent } from "./types.js";

export const SIGNATURE_HEADER = "linkwell-signature";
const DEFAULT_TOLERANCE_SECONDS = 300;

/**
 * Verifies a delivery's `linkwell-signature` header (`t=<unix>,v1=<hex HMAC-SHA256 of "t.body">`)
 * and returns the parsed event. Pass the raw request body, before any JSON parsing.
 *
 * ```ts
 * const event = constructEvent(await req.text(), req.headers.get("linkwell-signature"), secret);
 * ```
 */
export function constructEvent<T = Record<string, unknown>>(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  { toleranceSeconds = DEFAULT_TOLERANCE_SECONDS, now = Date.now() }: { toleranceSeconds?: number; now?: number } = {},
): LinkwellEvent<T> {
  if (!signatureHeader) throw new SignatureVerificationError(`Missing ${SIGNATURE_HEADER} header`);

  const parts = new Map(
    signatureHeader.split(",").map((part) => {
      const index = part.indexOf("=");
      return [part.slice(0, index).trim(), part.slice(index + 1).trim()] as const;
    }),
  );
  const timestamp = Number(parts.get("t"));
  const signature = parts.get("v1");
  if (!Number.isFinite(timestamp) || !signature) throw new SignatureVerificationError("Malformed signature header");

  if (Math.abs(now / 1000 - timestamp) > toleranceSeconds) {
    throw new SignatureVerificationError("Signature timestamp outside the tolerance window");
  }

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new SignatureVerificationError("Signature mismatch");

  return JSON.parse(rawBody) as LinkwellEvent<T>;
}
