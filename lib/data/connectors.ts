export const connectorsHero = {
  eyebrow: "Connector catalog",
  heading: "380+ connectors, maintained by us.",
  lede: "Every connector ships with managed auth, normalized objects and events. Pick the ones your customers need and turn them on per plan.",
  searchPlaceholder: "Search connectors, e.g. “invoices” or “Shopify”",
} as const;

export const customConnectors = {
  eyebrow: "Custom connectors",
  heading: "Need an app that isn't listed? Build it in an afternoon.",
  body: "Import an OpenAPI spec or describe endpoints in the connector builder. Linkwell generates auth, pagination and objects, then runs your custom connector on the same infrastructure as the rest of the catalog.",
  checks: [
    "OpenAPI 3 and Postman collection import",
    "Private connectors for your own internal APIs",
    "Versioned releases with staged rollout per tenant",
  ],
} as const;

export const requestConnector = {
  heading: "Tell us what to build next.",
  body: "Customers on Scale and Enterprise plans get new catalog connectors built by our team, usually within three weeks of request.",
  cta: "Request a connector",
} as const;
