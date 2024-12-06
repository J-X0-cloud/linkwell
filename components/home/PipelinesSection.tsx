import { pipelinesSection } from "@/lib/data/home";
import { PipelineMock } from "@/components/mockups/PipelineMock";
import { SectionHead } from "@/components/ui/SectionHead";

export function PipelinesSection() {
  return (
    <section className="sec sec-dark">
      <div className="wrap">
        <SectionHead eyebrow={pipelinesSection.eyebrow} heading={pipelinesSection.heading} body={pipelinesSection.body} />
        <PipelineMock />
        <div className="mini-feats">
          {pipelinesSection.features.map((feature) => (
            <div key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
