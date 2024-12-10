import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" heading="This page lost its connection." lede="The link may be out of date. Try the connector catalog or head back home.">
      <div className="hero-btns center">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/connectors" variant="line">
          Browse connectors
        </ButtonLink>
      </div>
    </PageHero>
  );
}
