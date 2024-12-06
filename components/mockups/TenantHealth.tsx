"use client";

import { useState } from "react";
import { tenants } from "@/lib/data/mockups";
import { cn } from "@/lib/cn";

/** Per-tenant integration health, filterable to the customers that need attention. */
export function TenantHealth() {
  const [attentionOnly, setAttentionOnly] = useState(false);
  const rows = attentionOnly ? tenants.filter((tenant) => tenant.health !== "ok") : tenants;

  return (
    <div className="tenants">
      <div className="log-top">
        <b>Tenant health</b>
        <div className="log-f" role="group" aria-label="Filter tenants">
          <button type="button" className={cn(!attentionOnly && "on")} aria-pressed={!attentionOnly} onClick={() => setAttentionOnly(false)}>
            All tenants
          </button>
          <button type="button" className={cn(attentionOnly && "on")} aria-pressed={attentionOnly} onClick={() => setAttentionOnly(true)}>
            Needs attention
          </button>
        </div>
      </div>
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th className="hide-s">Connected apps</th>
              <th>Status</th>
              <th className="hide-s">Last run</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tenant) => (
              <tr key={tenant.name}>
                <td>
                  <b>{tenant.name}</b>
                </td>
                <td className="hide-s">{tenant.apps}</td>
                <td>
                  <span className={`hs ${tenant.health}`}>
                    <i />
                    {tenant.status}
                  </span>
                </td>
                <td className="muted hide-s">{tenant.lastRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
