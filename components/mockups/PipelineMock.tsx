import type { ReactNode } from "react";
import { pipelineNodes } from "@/lib/data/mockups";
import { describeCondition } from "@/lib/sync/conditions";
import { transforms } from "@/lib/sync/mapping";
import { dealsToProjects } from "@/lib/sync/pipelines";
import { cn } from "@/lib/cn";
import { Tile } from "@/components/ui/Tile";

/** Pipeline builder rendered from the actual pipeline definition in lib/sync/pipelines.ts. */
export function PipelineMock() {
  const pipeline = dealsToProjects;
  const formulas = pipeline.mapping.filter((mapping) => mapping.transform).length;
  const [filter] = pipeline.filters;

  return (
    <div className="pipe" aria-hidden="true">
      <div className="pipe-top">
        <div>
          <b>{pipeline.name}</b>
          <span className="pill ok">Live</span>
        </div>
        <div className="pipe-tabs">
          <span className="on">Builder</span>
          <span>Runs</span>
          <span>Settings</span>
        </div>
      </div>
      <div className="pipe-body">
        <div className="nodes">
          <Node kicker="Trigger" icon={<Tile tone={2} size="sm">Sf</Tile>} title={pipelineNodes.trigger.label} detail={pipelineNodes.trigger.detail} />
          <div className="link" />
          <Node
            kicker="Filter"
            icon={<Tile tone="glyph" size="sm">≡</Tile>}
            title={pipelineNodes.filter.label}
            detail={filter ? describeCondition(filter) : "No filters"}
          />
          <div className="link" />
          <Node
            kicker="Map fields"
            icon={<Tile tone="brand" size="sm">⇆</Tile>}
            title="Transform"
            detail={`${pipeline.mapping.length} fields mapped · ${formulas} formula${formulas === 1 ? "" : "s"}`}
            selected
          />
          <div className="link" />
          <Node
            kicker="Destination"
            icon={<Tile tone="brand" size="sm">F</Tile>}
            title={pipelineNodes.destination.label}
            detail={pipelineNodes.destination.detail}
          />
        </div>
        <div className="mapper">
          <div className="map-h">
            <b>Field mapping</b>
            <span>Salesforce → Your app</span>
          </div>
          <table>
            <tbody>
              {pipeline.mapping.map((mapping) => (
                <tr key={mapping.target}>
                  <td>
                    <code>{mapping.source}</code>
                  </td>
                  <td className="ar">→</td>
                  <td>
                    <code>{mapping.target}</code>
                    {mapping.transform ? <span className="fx">{transforms[mapping.transform].label}</span> : null}
                    {mapping.key ? <span className="fx key">key</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="map-f">
            <span>
              Incremental cursor: <code>{pipeline.cursorField}</code>
            </span>
            <span className="btn btn-xs">Test with sample record</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ kicker, icon, title, detail, selected = false }: { kicker: string; icon: ReactNode; title: string; detail: string; selected?: boolean }) {
  return (
    <div className={cn("node", selected && "sel")}>
      <span className="n-k">{kicker}</span>
      <div className="n-row">
        {icon}
        <b>{title}</b>
      </div>
      <em>{detail}</em>
    </div>
  );
}
