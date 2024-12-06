import { requestConnector } from "@/lib/data/connectors";
import { siteConfig } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";

export function RequestConnector() {
  return (
    <section className="sec" id="request">
      <div className="wrap">
        <div className="request">
          <div>
            <h2>{requestConnector.heading}</h2>
            <p>{requestConnector.body}</p>
          </div>
          <ButtonLink href={`${siteConfig.salesEmail}?subject=Connector%20request`} size="lg">
            {requestConnector.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
