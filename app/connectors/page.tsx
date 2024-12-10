import type { Metadata } from "next";
import { CATALOG_SIZE } from "@/lib/connectors/catalog";
import { registry } from "@/lib/connectors/registry";
import { connectorsHero, customConnectors } from "@/lib/data/connectors";
import { ConnectorCatalog } from "@/components/connectors/ConnectorCatalog";
import { RequestConnector } from "@/components/connectors/RequestConnector";
import { ConnectorBuilder } from "@/components/mockups/ConnectorBuilder";
import { CtaBand } from "@/components/sections/CtaBand";
import { Split } from "@/components/sections/Split";

export const metadata: Metadata = {
  title: "Connector catalog",
  description:
    "Browse 380+ maintained connectors for CRM, accounting, ecommerce, messaging and data apps, or build a custom connector from an OpenAPI spec.",
};

export default function ConnectorsPage() {
  return (
    <>
      <ConnectorCatalog connectors={registry.summaries()} total={CATALOG_SIZE} hero={connectorsHero} />
      <Split id="custom" tone="tint" {...customConnectors} visual={<ConnectorBuilder />} />
      <RequestConnector />
      <CtaBand />
    </>
  );
}
