import { ctaBand, siteConfig } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <div>
          <h2>{ctaBand.heading}</h2>
          <p>{ctaBand.body}</p>
        </div>
        <div className="cta-btns">
          <ButtonLink href={siteConfig.salesEmail} variant="light">
            Book a demo
          </ButtonLink>
          <ButtonLink href="/connectors" variant="ghost-light">
            Browse connectors
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
