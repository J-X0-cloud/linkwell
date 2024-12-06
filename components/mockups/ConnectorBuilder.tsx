import { connectorBuilder } from "@/lib/data/mockups";

export function ConnectorBuilder() {
  return (
    <div className="builder" aria-hidden="true">
      <div className="log-top">
        <b>{connectorBuilder.title}</b>
        <span className="pill ok">Spec imported</span>
      </div>
      <div className="bl-body">
        {connectorBuilder.rows.map((row) => (
          <div key={row.label} className="bl-row">
            <span>{row.label}</span>
            <code>{row.value}</code>
          </div>
        ))}
        <div className="bl-objs">
          <b>Objects detected</b>
          <div>
            {connectorBuilder.objects.map((object) => (
              <span key={object}>{object}</span>
            ))}
          </div>
        </div>
        <div className="bl-foot">
          <span className="btn btn-xs btn-line">Edit mappings</span>
          <span className="btn btn-xs">Publish to staging</span>
        </div>
      </div>
    </div>
  );
}
