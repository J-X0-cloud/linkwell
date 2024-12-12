/** Base class for every error thrown by the SDK. */
export class LinkwellError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

/** The API responded with a non-2xx status. */
export class LinkwellApiError extends LinkwellError {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly requestId: string | null,
  ) {
    super(`${status} ${code}: ${message}`);
  }
}

export class AuthenticationError extends LinkwellApiError {}
export class NotFoundError extends LinkwellApiError {}
export class RateLimitError extends LinkwellApiError {
  constructor(
    status: number,
    code: string,
    message: string,
    requestId: string | null,
    readonly retryAfterSeconds: number | null,
  ) {
    super(status, code, message, requestId);
  }
}

/** The request never produced a response (DNS, TLS, timeout). */
export class ConnectionError extends LinkwellError {}

/** A webhook failed signature or timestamp verification. */
export class SignatureVerificationError extends LinkwellError {}
