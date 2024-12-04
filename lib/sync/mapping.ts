import type { ObjectSchema } from "@/types/connectors";
import type { FieldMapping, SyncRecord, TransformName } from "@/lib/sync/types";
import { readPath, writePath } from "@/lib/sync/paths";

export const transforms: Record<TransformName, { label: string; apply: (value: unknown) => unknown }> = {
  multiply100: {
    label: "×100",
    apply: (value) => (typeof value === "number" ? Math.round(value * 100) : value == null ? value : Math.round(Number(value) * 100)),
  },
  lowercase: { label: "lowercase", apply: (value) => (typeof value === "string" ? value.toLowerCase() : value) },
  trim: { label: "trim", apply: (value) => (typeof value === "string" ? value.trim() : value) },
  dateOnly: { label: "date", apply: (value) => (typeof value === "string" ? value.slice(0, 10) : value) },
  toNumber: { label: "number", apply: (value) => (value == null || value === "" ? null : Number(value)) },
};

export interface MappingContext {
  sourceObject: string;
  targetObject: string;
}

/** Applies a field mapping to one source record, returning the destination payload. */
export function applyMapping(record: SyncRecord, mappings: FieldMapping[], ctx: MappingContext): SyncRecord {
  const out: SyncRecord = {};
  for (const mapping of mappings) {
    const raw = readPath(record, mapping.source, ctx.sourceObject);
    const value = mapping.transform ? transforms[mapping.transform].apply(raw) : raw;
    if (value !== undefined) writePath(out, mapping.target, value, ctx.targetObject);
  }
  return out;
}

export function upsertKey(mappings: FieldMapping[]): FieldMapping {
  const keys = mappings.filter((mapping) => mapping.key);
  if (keys.length !== 1) throw new Error(`A pipeline mapping needs exactly one key field, found ${keys.length}`);
  return keys[0] as FieldMapping;
}

export interface MappingIssue {
  mapping: FieldMapping;
  problem: string;
}

/** Checks a mapping against the source object's schema before a pipeline is published. */
export function validateMapping(mappings: FieldMapping[], schema: ObjectSchema, sourceObject: string): MappingIssue[] {
  const issues: MappingIssue[] = [];
  const seenTargets = new Set<string>();

  for (const mapping of mappings) {
    const field = mapping.source.startsWith(`${sourceObject}.`) ? mapping.source.slice(sourceObject.length + 1) : mapping.source;
    const type = schema.fields[field];
    if (!type) issues.push({ mapping, problem: `${mapping.source} is not a field on ${sourceObject}` });
    if (mapping.transform === "multiply100" && type && type !== "currency" && type !== "number" && type !== "integer") {
      issues.push({ mapping, problem: `×100 needs a numeric field, ${mapping.source} is ${type}` });
    }
    if (seenTargets.has(mapping.target)) issues.push({ mapping, problem: `${mapping.target} is mapped twice` });
    seenTargets.add(mapping.target);
  }

  if (mappings.filter((mapping) => mapping.key).length !== 1) {
    issues.push({ mapping: mappings[0] ?? { source: "", target: "" }, problem: "Mark exactly one field as the upsert key" });
  }
  return issues;
}
