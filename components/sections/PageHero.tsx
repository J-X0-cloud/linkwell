import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  lede: string;
  small?: boolean;
  children?: ReactNode;
}

export function PageHero({ eyebrow, heading, lede, small = false, children }: PageHeroProps) {
  return (
    <section className={cn("phero", small && "small")}>
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{heading}</h1>
        <p className="lede">{lede}</p>
        {children}
      </div>
    </section>
  );
}
