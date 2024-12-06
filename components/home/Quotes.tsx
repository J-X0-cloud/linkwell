import { quotes } from "@/lib/data/home";
import { SectionHead } from "@/components/ui/SectionHead";

export function Quotes() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={quotes.eyebrow} heading={quotes.heading} />
        <div className="quotes">
          {quotes.items.map((item) => (
            <figure key={item.name} className="quote">
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <span className="av">{item.name.charAt(0)}</span>
                <div>
                  <b>{item.name}</b>
                  <em>{item.role}</em>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
