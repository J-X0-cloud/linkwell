import type { PipelineDefinition, RunError, RunResult, SyncRecord } from "@/lib/sync/types";
import { matchesAll } from "@/lib/sync/conditions";
import { applyMapping, upsertKey } from "@/lib/sync/mapping";
import { readPath } from "@/lib/sync/paths";

/** Reads changed records from the upstream app, oldest first, after the given cursor. */
export interface SourceReader {
  readChanges(args: { object: string; cursorField: string; after: string | null; pageSize: number }): AsyncIterable<SyncRecord[]>;
}

/** Writes to the customer's product through its integration API. */
export interface DestinationWriter {
  find(object: string, key: { field: string; value: unknown }): Promise<(SyncRecord & { updated_at?: string }) | null>;
  upsert(object: string, key: { field: string; value: unknown }, record: SyncRecord): Promise<void>;
}

export interface CursorStore {
  get(pipelineId: string, tenantId: string): Promise<string | null>;
  set(pipelineId: string, tenantId: string, cursor: string): Promise<void>;
}

export class RetryableError extends Error {}

export interface RunOptions {
  tenantId: string;
  source: SourceReader;
  destination: DestinationWriter;
  cursors: CursorStore;
  pageSize?: number;
  now?: () => Date;
}

/**
 * Runs one incremental pass of a pipeline for one tenant: read changes after the stored cursor,
 * apply trigger and filter conditions, map fields, resolve conflicts and upsert. The cursor only
 * advances past records that were fully processed, so a failed run resumes where it stopped.
 */
export async function runPipeline(pipeline: PipelineDefinition, options: RunOptions): Promise<RunResult> {
  const now = options.now ?? (() => new Date());
  const startedAt = now().toISOString();
  const key = upsertKey(pipeline.mapping);
  const targetKeyField = key.target.split(".").pop() ?? key.target;
  const ctx = { sourceObject: pipeline.source.object, targetObject: pipeline.destination.object };

  let cursor = await options.cursors.get(pipeline.id, options.tenantId);
  const seen = new Set<unknown>();
  const errors: RunError[] = [];
  let read = 0;
  let written = 0;
  let skipped = 0;
  let held = 0;

  const pages = options.source.readChanges({
    object: pipeline.source.object,
    cursorField: pipeline.cursorField,
    after: cursor,
    pageSize: options.pageSize ?? 200,
  });

  outer: for await (const page of pages) {
    for (const record of page) {
      read += 1;
      const recordCursor = String(readPath(record, pipeline.cursorField, ctx.sourceObject) ?? "");
      const keyValue = readPath(record, key.source, ctx.sourceObject);

      if (!matchesAll(record, [...pipeline.trigger, ...pipeline.filters], ctx.sourceObject) || seen.has(keyValue)) {
        skipped += 1;
        cursor = recordCursor || cursor;
        continue;
      }
      seen.add(keyValue);

      try {
        const payload = applyMapping(record, pipeline.mapping, ctx);
        const existing = await options.destination.find(ctx.targetObject, { field: targetKeyField, value: keyValue });

        if (existing && pipeline.conflict === "hold_for_review") {
          held += 1;
        } else if (existing && pipeline.conflict === "last_write_wins" && existing.updated_at && existing.updated_at > recordCursor) {
          skipped += 1;
        } else {
          await options.destination.upsert(ctx.targetObject, { field: targetKeyField, value: keyValue }, payload);
          written += 1;
        }
        cursor = recordCursor || cursor;
      } catch (error) {
        const retryable = error instanceof RetryableError;
        errors.push({ recordKey: String(keyValue), message: error instanceof Error ? error.message : String(error), retryable });
        // Stop at the first retryable failure so the cursor doesn't skip past it.
        if (retryable) break outer;
        cursor = recordCursor || cursor;
      }
    }
  }

  if (cursor) await options.cursors.set(pipeline.id, options.tenantId, cursor);

  return {
    pipelineId: pipeline.id,
    tenantId: options.tenantId,
    read,
    written,
    skipped,
    held,
    errors,
    cursor,
    startedAt,
    finishedAt: now().toISOString(),
  };
}

export class InMemoryCursorStore implements CursorStore {
  private readonly cursors = new Map<string, string>();

  async get(pipelineId: string, tenantId: string): Promise<string | null> {
    return this.cursors.get(`${pipelineId}:${tenantId}`) ?? null;
  }

  async set(pipelineId: string, tenantId: string, cursor: string): Promise<void> {
    this.cursors.set(`${pipelineId}:${tenantId}`, cursor);
  }
}
