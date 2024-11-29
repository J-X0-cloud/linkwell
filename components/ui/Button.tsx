import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "line" | "light" | "ghost-light";
type Size = "md" | "sm" | "lg" | "xs";

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function btnClass(variant: Variant = "primary", size: Size = "md", className?: string): string {
  return cn("btn", variant !== "primary" && `btn-${variant}`, size !== "md" && `btn-${size}`, className);
}

/** Internal routes use next/link; mailto: and external URLs render a plain anchor. */
export function ButtonLink({ variant, size, className, href, children, ...props }: ButtonLinkProps) {
  const classes = btnClass(variant, size, className);
  if (typeof href === "string" && /^(mailto:|https?:)/.test(href)) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
