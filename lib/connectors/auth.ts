import type { AuthScheme } from "@/types/connectors";

/** Short label shown on catalog cards, e.g. "OAuth 2.0" or "API key". */
export function authLabel(auth: AuthScheme): string {
  switch (auth.type) {
    case "oauth2":
      return "OAuth 2.0";
    case "api_key":
      return "API key";
    case "token_based":
      return "Token-based";
    case "key_pair":
      return "Key pair";
    case "credentials":
      return "Credentials";
    case "iam_role":
      return "IAM role";
  }
}

export function oauth2(authorizeUrl: string, tokenUrl: string, scopes: string[] = []): AuthScheme {
  return { type: "oauth2", endpoints: { authorizeUrl, tokenUrl }, scopes, grant: "authorization_code" };
}

export function apiKey(header = "Authorization", prefix = "Bearer "): AuthScheme {
  return { type: "api_key", header, prefix };
}

/** Access tokens are refreshed when they're within this window of expiry. */
export const REFRESH_SKEW_SECONDS = 300;

export interface StoredToken {
  accessToken: string;
  refreshToken?: string;
  /** Unix seconds */
  expiresAt: number;
}

export function needsRefresh(token: StoredToken, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  return token.expiresAt - nowSeconds <= REFRESH_SKEW_SECONDS;
}
