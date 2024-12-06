import { architecture } from "@/lib/data/security";
import { SectionHead } from "@/components/ui/SectionHead";

export function ArchitectureFlow() {
  const { product, core, apps } = architecture;

  return (
    <section className="sec sec-dark">
      <div className="wrap">
        <SectionHead eyebrow={architecture.eyebrow} heading={architecture.heading} body={architecture.body} />
        <div className="flow" aria-label="Data flow: your product, Linkwell region, customer's apps">
          <div className="fl-box">
            <span className="fl-k">{product.kicker}</span>
            <b>{product.title}</b>
            <em>{product.detail}</em>
          </div>
          <div className="fl-arrow">
            <span>{architecture.toCore}</span>
          </div>
          <div className="fl-box core">
            <span className="fl-k">{core.kicker}</span>
            <b>{core.title}</b>
            <div className="fl-sub">
              {core.parts.map((part) => (
                <span key={part}>{part}</span>
              ))}
            </div>
          </div>
          <div className="fl-arrow">
            <span>{architecture.toApps}</span>
          </div>
          <div className="fl-box">
            <span className="fl-k">{apps.kicker}</span>
            <b>{apps.title}</b>
            <em>{apps.detail}</em>
          </div>
        </div>
      </div>
    </section>
  );
}
