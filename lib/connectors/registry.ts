import type { Capability, ConnectorCategory, ConnectorDefinition } from "@/types/connectors";
import { authLabel } from "@/lib/connectors/auth";
import { catalog } from "@/lib/connectors/catalog";

export interface ConnectorQuery {
  category?: ConnectorCategory | "All";
  capability?: Capability;
  search?: string;
}

export interface ConnectorSummary {
  id: string;
  name: string;
  category: ConnectorCategory;
  monogram: string;
  tone: ConnectorDefinition["tone"];
  auth: string;
  capabilities: string[];
}

const CAPABILITY_LABEL: Record<Capability, string> = { sync: "Sync", actions: "Actions", events: "Events" };

/** In-process registry over the connector catalog; lookup by id, filter and search. */
export class ConnectorRegistry {
  private readonly byId: Map<string, ConnectorDefinition>;

  constructor(private readonly connectors: ConnectorDefinition[]) {
    this.byId = new Map(connectors.map((connector) => [connector.id, connector]));
    if (this.byId.size !== connectors.length) {
      throw new Error("Duplicate connector ids in catalog");
    }
  }

  get(id: string): ConnectorDefinition | undefined {
    return this.byId.get(id);
  }

  require(id: string): ConnectorDefinition {
    const connector = this.get(id);
    if (!connector) throw new Error(`Unknown connector "${id}"`);
    return connector;
  }

  list({ category, capability, search }: ConnectorQuery = {}): ConnectorDefinition[] {
    const needle = search?.trim().toLowerCase();
    return this.connectors.filter(
      (connector) =>
        (!category || category === "All" || connector.category === category) &&
        (!capability || connector.capabilities.includes(capability)) &&
        (!needle ||
          connector.name.toLowerCase().includes(needle) ||
          connector.category.toLowerCase().includes(needle) ||
          Object.keys(connector.objects ?? {}).some((object) => object.toLowerCase().includes(needle)) ||
          (connector.events ?? []).some((event) => event.includes(needle))),
    );
  }

  /** Emits the events a connector can deliver, for webhook normalization. */
  eventTypeFor(connectorId: string, upstreamTopic: string): string | undefined {
    return this.get(connectorId)?.webhook?.topics[upstreamTopic];
  }

  summaries(query?: ConnectorQuery): ConnectorSummary[] {
    return this.list(query).map(toSummary);
  }
}

export function toSummary(connector: ConnectorDefinition): ConnectorSummary {
  return {
    id: connector.id,
    name: connector.name,
    category: connector.category,
    monogram: connector.monogram,
    tone: connector.tone,
    auth: authLabel(connector.auth),
    capabilities: connector.capabilities.map((capability) => CAPABILITY_LABEL[capability]),
  };
}

export const registry = new ConnectorRegistry(catalog);
