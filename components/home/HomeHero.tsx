import Link from "next/link";
import { homeHero } from "@/lib/data/home";
import { siteConfig } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Checks } from "@/components/ui/Checks";
import { HeroMock } from "@/components/mockups/HeroMock";

export function HomeHero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Link className="announce" href={homeHero.announce.href}>
            <b>{homeHero.announce.tag}</b>
            {homeHero.announce.text} <span>→</span>
          </Link>
          <h1>{homeHero.heading}</h1>
          <p className="lede">{homeHero.lede}</p>
          <div className="hero-btns">
            <ButtonLink href={siteConfig.salesEmail} size="lg">
              Book a demo
            </ButtonLink>
            <ButtonLink href="/connectors" size="lg" variant="line">
              Browse connectors
            </ButtonLink>
          </div>
          <Checks items={homeHero.ticks} variant="ticks" />
        </div>
        <HeroMock />
      </div>
    </section>
  );
}
