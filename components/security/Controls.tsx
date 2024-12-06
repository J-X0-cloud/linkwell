import { controls } from "@/lib/data/security";
import { SectionHead } from "@/components/ui/SectionHead";

export function Controls() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={controls.eyebrow} heading={controls.heading} />
        <div className="sec-pts">
          {controls.items.map((item) => (
            <div key={item.title} className="sec-pt">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
