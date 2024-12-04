/** A record as read from, or written to, either side of a sync. */
export type SyncRecord = Record<string, unknown>;

export type Operator = "eq" | "neq" | "in" | "not_in" | "gt" | "gte" | "lt" | "lte" | "exists";

export interface Condition {
  field: string;
  op: Operator;
  value?: unknown;
}

export type TransformName = "multiply100" | "lowercase" | "trim" | "dateOnly" | "toNumber";

export interface FieldMapping {
  /** Dotted source path, e.g. "Opportunity.Amount" → read as record.Amount on the Opportunity object. */
  source: string;
  target: string;
  transform?: TransformName;
  /** Marks the upsert key on the destination. */
  key?: boolean;
}

export type ConflictRule = "last_write_wins" | "source_of_truth" | "hold_for_review";

export interface PipelineDefinition {
  id: string;
  name: string;
  source: { connector: string; object: string };
  trigger: Condition[];
  filters: Condition[];
  mapping: FieldMapping[];
  destination: { object: string; mode: "upsert" | "insert" };
  /** Source field used as the incremental cursor. */
  cursorField: string;
  schedule: { everyMinutes: number };
  conflict: ConflictRule;
}

export interface RunError {
  recordKey: string;
  message: string;
  retryable: boolean;
}

export interface RunResult {
  pipelineId: string;
  tenantId: string;
  read: number;
  written: number;
  skipped: number;
  held: number;
  errors: RunError[];
  cursor: string | null;
  startedAt: string;
  finishedAt: string;
}
