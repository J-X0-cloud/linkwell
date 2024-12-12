# @linkwell/sdk

TypeScript client for the Linkwell API. Server-side only: it authenticates with your secret key.

```bash
pnpm add @linkwell/sdk
```

## Mint a tenant token for the embedded marketplace

```ts
import { LinkwellClient } from "@linkwell/sdk";

const linkwell = new LinkwellClient({ secretKey: process.env.LINKWELL_SECRET_KEY!, region: "us" });

export async function GET(req: Request) {
  const user = await requireUser(req);
  const { token, expiresAt } = await linkwell.tenants.createToken(user.accountId, { ttlSeconds: 900 });
  return Response.json({ token, expiresAt });
}
```

## Receive events

```ts
import { constructEvent } from "@linkwell/sdk/webhooks";

export async function POST(req: Request) {
  const event = constructEvent(await req.text(), req.headers.get("linkwell-signature"), process.env.LINKWELL_WEBHOOK_SECRET!);
  if (event.type === "invoice.paid") await markInvoicePaid(event.tenantId, event.data);
  return new Response(null, { status: 204 });
}
```

Deliveries carry an `idempotency-key` header that stays the same across retries and replays.

## Other resources

| Call                                          | Description                                  |
| --------------------------------------------- | -------------------------------------------- |
| `connections.list(tenantId)`                  | A tenant's connected apps                    |
| `connections.delete(connectionId)`            | Revoke credentials and stop its pipelines    |
| `pipelines.run(pipelineId, tenantId)`         | Trigger an incremental run (or `fullResync`) |
| `events.list({ status: "failed" })`           | Delivery history                             |
| `events.replay({ from, to, tenantId })`       | Re-deliver a window of events                |
| `linkwell.paginate(opts => …)`                | Iterate every page of a list call            |

Errors are typed: `AuthenticationError`, `NotFoundError`, `RateLimitError` (with `retryAfterSeconds`), `LinkwellApiError`, `ConnectionError` and `SignatureVerificationError`. 429, 5xx and network failures are retried twice with backoff by default.
