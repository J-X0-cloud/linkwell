import { rollout } from "@/lib/data/home";
import { SectionHead } from "@/components/ui/SectionHead";

export function Rollout() {
  return (
    <section className="sec sec-tint">
      <div className="wrap">
        <SectionHead eyebrow={rollout.eyebrow} heading={rollout.heading} body={rollout.body} />
        <ol className="steps">
          {rollout.steps.map((step) => (
            <li key={step.title}>
              <span className="st-when">{step.when}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
