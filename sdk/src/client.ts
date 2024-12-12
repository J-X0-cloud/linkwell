import {
  AuthenticationError,
  ConnectionError,
  LinkwellApiError,
  NotFoundError,
  RateLimitError,
} from "./errors.js";
import type {
  Connection,
  LinkwellEvent,
  ListOptions,
  Page,
  PipelineRun,
  Region,
  TenantToken,
} from "./types.js";

export interface LinkwellClientOptions {
  /** Secret key from the console (lw_sk_…). Server-side only. */
  secretKey: string;
  region?: Region;
  baseUrl?: string;
  /** Retries for 429, 5xx and network failures. Default 2. */
  maxRetries?: number;
  timeoutMs?: number;
  fetch?: typeof fetch;
}

type Method = "GET" | "POST" | "DELETE";

const DEFAULT_BASE: Record<Region, string> = {
  us: "https://api.linkwell.com/v1",
  eu: "https://eu.api.linkwell.com/v1",
};

const SDK_VERSION = "0.4.0";

/**
 * Server-side client for the Linkwell API.
 *
 * ```ts
 * const linkwell = new LinkwellClient({ secretKey: process.env.LINKWELL_SECRET_KEY! });
 * const { token } = await linkwell.tenants.createToken("acct_48sK", { ttlSeconds: 900 });
 * ```
 */
export class LinkwellClient {
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private readonly maxRetries: number;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  readonly tenants = {
    /** Mints a short-lived token the embedded marketplace uses for one tenant. */
    createToken: (tenantId: string, options: { ttlSeconds?: number } = {}) =>
      this.request<TenantToken>("POST", `/tenants/${encodeURIComponent(tenantId)}/tokens`, {
        ttl_seconds: options.ttlSeconds ?? 900,
      }),
  };

  readonly connections = {
    list: (tenantId: string, options: ListOptions = {}) =>
      this.request<Page<Connection>>("GET", `/tenants/${encodeURIComponent(tenantId)}/connections`, undefined, options),
    get: (connectionId: string) => this.request<Connection>("GET", `/connections/${encodeURIComponent(connectionId)}`),
    /** Revokes stored credentials and stops every pipeline on the connection. */
    delete: (connectionId: string) => this.request<{ deleted: true }>("DELETE", `/connections/${encodeURIComponent(connectionId)}`),
  };

  readonly pipelines = {
    run: (pipelineId: string, tenantId: string, options: { fullResync?: boolean } = {}) =>
      this.request<PipelineRun>("POST", `/pipelines/${encodeURIComponent(pipelineId)}/runs`, {
        tenant_id: tenantId,
        full_resync: options.fullResync ?? false,
      }),
    getRun: (pipelineId: string, runId: string) =>
      this.request<PipelineRun>("GET", `/pipelines/${encodeURIComponent(pipelineId)}/runs/${encodeURIComponent(runId)}`),
  };

  readonly events = {
    list: (options: ListOptions & { tenantId?: string; type?: string; status?: "delivered" | "retrying" | "failed" } = {}) =>
      this.request<Page<LinkwellEvent>>("GET", "/events", undefined, options),
    /** Re-delivers one event, or every event in a time window. */
    replay: (target: { eventId: string } | { from: string; to: string; tenantId?: string }) =>
      this.request<{ replayed: number }>("POST", "/events/replay", target),
  };

  constructor(options: LinkwellClientOptions) {
    if (!options.secretKey?.startsWith("lw_sk_")) {
      throw new Error("LinkwellClient needs a secret key (lw_sk_…). Never ship it to the browser.");
    }
    this.secretKey = options.secretKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE[options.region ?? "us"]).replace(/\/$/, "");
    this.maxRetries = options.maxRetries ?? 2;
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.fetchImpl = options.fetch ?? globalThis.fetch;
  }

  /** Iterates every page of a list endpoint. */
  async *paginate<T>(list: (options: ListOptions) => Promise<Page<T>>, options: ListOptions = {}): AsyncGenerator<T> {
    let cursor = options.cursor;
    do {
      const page = await list({ ...options, cursor });
      yield* page.data;
      cursor = page.nextCursor ?? undefined;
    } while (cursor);
  }

  private async request<T>(method: Method, path: string, body?: unknown, query?: object): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined) url.searchParams.set(toSnake(key), String(value));
    }

    for (let attempt = 0; ; attempt++) {
      let response: Response;
      try {
        response = await this.fetchImpl(url, {
          method,
          headers: {
            authorization: `Bearer ${this.secretKey}`,
            "content-type": "application/json",
            "user-agent": `linkwell-node/${SDK_VERSION}`,
          },
          body: body === undefined ? undefined : JSON.stringify(body),
          signal: AbortSignal.timeout(this.timeoutMs),
        });
      } catch (error) {
        if (attempt < this.maxRetries) {
          await sleep(backoffMs(attempt));
          continue;
        }
        throw new ConnectionError(error instanceof Error ? error.message : "Network error");
      }

      if (response.ok) return (await response.json()) as T;

      const retryAfter = Number(response.headers.get("retry-after")) || null;
      if ((response.status === 429 || response.status >= 500) && attempt < this.maxRetries) {
        await sleep(retryAfter ? retryAfter * 1000 : backoffMs(attempt));
        continue;
      }
      throw await toApiError(response, retryAfter);
    }
  }
}

async function toApiError(response: Response, retryAfter: number | null): Promise<LinkwellApiError> {
  const requestId = response.headers.get("linkwell-request-id");
  const payload = (await response.json().catch(() => ({}))) as { error?: { code?: string; message?: string } };
  const code = payload.error?.code ?? "unknown_error";
  const message = payload.error?.message ?? response.statusText;

  if (response.status === 401 || response.status === 403) return new AuthenticationError(response.status, code, message, requestId);
  if (response.status === 404) return new NotFoundError(response.status, code, message, requestId);
  if (response.status === 429) return new RateLimitError(response.status, code, message, requestId, retryAfter);
  return new LinkwellApiError(response.status, code, message, requestId);
}

function backoffMs(attempt: number): number {
  return Math.min(8_000, 500 * 2 ** attempt) * (0.5 + Math.random() / 2);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSnake(key: string): string {
  return key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}
