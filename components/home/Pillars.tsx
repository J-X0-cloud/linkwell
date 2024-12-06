import { pillars, platformIntro, type PillarVisual } from "@/lib/data/home";
import { registry } from "@/lib/connectors/registry";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatusCode } from "@/components/ui/StatusCode";
import { Tile } from "@/components/ui/Tile";

const FEATURED = [
  { id: "salesforce", tone: 2 },
  { id: "hubspot", tone: 1 },
  { id: "quickbooks-online", tone: 5 },
  { id: "shopify", tone: 3 },
  { id: "slack", tone: 0 },
  { id: "jira", tone: 4 },
] as const;

function PillarArt({ visual }: { visual: PillarVisual }) {
  switch (visual) {
    case "tiles":
      return (
        <div className="pv-tiles">
          {FEATURED.map(({ id, tone }) => (
            <Tile key={id} tone={tone}>
              {registry.require(id).monogram}
            </Tile>
          ))}
          <span className="more">+374</span>
        </div>
      );
    case "flow":
      return (
        <div className="pv-flow">
          <span>Source</span>
          <i />
          <span>Map</span>
          <i />
          <span className="on">Your app</span>
        </div>
      );
    case "hooks":
      return (
        <div className="pv-hooks">
          {([
            [200, "deal.won"],
            [429, "order.created"],
            [200, "invoice.paid"],
          ] as const).map(([status, event]) => (
            <div key={event}>
              <StatusCode status={status} />
              <code>{event}</code>
            </div>
          ))}
        </div>
      );
    case "marketplace":
      return (
        <div className="pv-mk">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
          <span className="b4" />
        </div>
      );
  }
}

export function Pillars() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={platformIntro.eyebrow} heading={platformIntro.heading} body={platformIntro.body} />
        <div className="pillars">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="pillar">
              <div className="pv" aria-hidden="true">
                <PillarArt visual={pillar.visual} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
