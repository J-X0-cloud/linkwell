import type { SyncRecord } from "@/lib/sync/types";

/**
 * Reads a dotted path. The first segment may name the object itself ("Opportunity.Amount" on an
 * Opportunity record) or a related object ("Account.Name" → record.Account.Name).
 */
export function readPath(record: SyncRecord, path: string, objectName?: string): unknown {
  const segments = path.split(".");
  if (objectName && segments[0] === objectName) segments.shift();

  let current: unknown = record;
  for (const segment of segments) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/** Writes "project.budget_cents" as { budget_cents } — the first segment is the target object. */
export function writePath(target: SyncRecord, path: string, value: unknown, objectName?: string): void {
  const segments = path.split(".");
  if (objectName && segments[0] === objectName) segments.shift();

  let current: Record<string, unknown> = target;
  segments.forEach((segment, i) => {
    if (i === segments.length - 1) {
      current[segment] = value;
      return;
    }
    const next = current[segment];
    if (next === null || typeof next !== "object") current[segment] = {};
    current = current[segment] as Record<string, unknown>;
  });
}
