import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Checks } from "@/components/ui/Checks";
import { TextLink } from "@/components/ui/TextLink";

interface SplitProps {
  id?: string;
  tone?: "plain" | "tint" | "dark";
  reverse?: boolean;
  eyebrow: string;
  heading: string;
  body: string;
  checks?: readonly ReactNode[];
  link?: { label: string; href: string };
  visual: ReactNode;
}

/** Copy on one side, a product mockup on the other. */
export function Split({ id, tone = "plain", reverse = false, eyebrow, heading, body, checks, link, visual }: SplitProps) {
  return (
    <section className={cn("sec", tone === "tint" && "sec-tint", tone === "dark" && "sec-dark")} id={id}>
      <div className={cn("wrap split", reverse && "rev")}>
        <div className="split-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{body}</p>
          {checks ? <Checks items={checks} /> : null}
          {link ? <TextLink href={link.href}>{link.label}</TextLink> : null}
        </div>
        {visual}
      </div>
    </section>
  );
}
