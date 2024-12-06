"use client";

import { useState } from "react";
import { hookDetail, hookRows } from "@/lib/data/mockups";
import { cn } from "@/lib/cn";
import { StatusCode } from "@/components/ui/StatusCode";

const FILTERS = {
  All: () => true,
  Failed: (status: number) => status >= 500,
  Retrying: (status: number) => status === 429 || status >= 500,
} as const;

type Filter = keyof typeof FILTERS;

/** Webhook delivery log with status filters and the detail of a retrying delivery. */
export function HookLog() {
  const [filter, setFilter] = useState<Filter>("All");
  const rows = hookRows.filter((row) => FILTERS[filter](row.status));

  return (
    <div className="log">
      <div className="log-top">
        <b>Webhook deliveries</b>
        <div className="log-f" role="group" aria-label="Filter deliveries">
          {(Object.keys(FILTERS) as Filter[]).map((name) => (
            <button key={name} type="button" className={cn(filter === name && "on")} aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name}
            </button>
          ))}
        </div>
        <span className="live">
          <i />
          Live
        </span>
      </div>
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Event</th>
              <th className="hide-s">Source</th>
              <th>Latency</th>
              <th className="hide-s">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.event}-${row.time}`}>
                <td>
                  <StatusCode status={row.status} />
                </td>
                <td>
                  <code>{row.event}</code>
                </td>
                <td className="hide-s">{row.source}</td>
                <td className="mono">{row.latency}</td>
                <td className="mono muted hide-s">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="log-detail">
        <div>
          <b>{hookDetail.event}</b> · {hookDetail.tenant} · {hookDetail.source}
        </div>
        <p>{hookDetail.message}</p>
        <div className="log-actions">
          <span className="btn btn-xs">Replay now</span>
          <span className="btn btn-xs btn-line">View payload</span>
        </div>
      </div>
    </div>
  );
}
