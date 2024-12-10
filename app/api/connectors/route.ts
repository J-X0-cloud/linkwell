import { z } from "zod";
import { CONNECTOR_CATEGORIES } from "@/types/connectors";
import { CATALOG_SIZE } from "@/lib/connectors/catalog";
import { registry } from "@/lib/connectors/registry";

const querySchema = z.object({
  category: z.enum(["All", ...CONNECTOR_CATEGORIES]).optional(),
  capability: z.enum(["sync", "actions", "events"]).optional(),
  q: z.string().max(80).optional(),
});

/** GET /api/connectors?category=CRM&capability=events&q=invoice — the public catalog feed. */
export async function GET(request: Request): Promise<Response> {
  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const { category, capability, q } = parsed.data;
  const connectors = registry.summaries({ category, capability, search: q });
  return Response.json({ connectors, count: connectors.length, total: CATALOG_SIZE });
}
