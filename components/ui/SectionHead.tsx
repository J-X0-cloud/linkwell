import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadProps {
  eyebrow: string;
  heading: string;
  body?: ReactNode;
  center?: boolean;
}

export function SectionHead({ eyebrow, heading, body, center = true }: SectionHeadProps) {
  return (
    <div className={cn("shead", center && "center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{heading}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
