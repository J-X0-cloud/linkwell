import type { Condition, SyncRecord } from "@/lib/sync/types";
import { readPath } from "@/lib/sync/paths";

function compare(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

export function matches(record: SyncRecord, condition: Condition, objectName?: string): boolean {
  const actual = readPath(record, condition.field, objectName);
  const { value } = condition;

  switch (condition.op) {
    case "eq":
      return actual === value;
    case "neq":
      return actual !== value;
    case "in":
      return Array.isArray(value) && value.includes(actual);
    case "not_in":
      return Array.isArray(value) && !value.includes(actual);
    case "gt":
      return actual !== undefined && compare(actual, value) > 0;
    case "gte":
      return actual !== undefined && compare(actual, value) >= 0;
    case "lt":
      return actual !== undefined && compare(actual, value) < 0;
    case "lte":
      return actual !== undefined && compare(actual, value) <= 0;
    case "exists":
      return actual !== undefined && actual !== null;
  }
}

export function matchesAll(record: SyncRecord, conditions: Condition[], objectName?: string): boolean {
  return conditions.every((condition) => matches(record, condition, objectName));
}

/** Human-readable form used in the pipeline builder: `Account.Type is "New Business"`. */
export function describeCondition({ field, op, value }: Condition): string {
  const shown = typeof value === "string" ? `"${value}"` : JSON.stringify(value);
  const verbs: Record<Condition["op"], string> = {
    eq: "is",
    neq: "is not",
    in: "is one of",
    not_in: "is not one of",
    gt: ">",
    gte: "≥",
    lt: "<",
    lte: "≤",
    exists: "is set",
  };
  return op === "exists" ? `${field} ${verbs[op]}` : `${field} ${verbs[op]} ${shown}`;
}
