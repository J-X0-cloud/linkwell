import type { ReactNode } from "react";

export function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 10.5l3.2 3L15 6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Tick list. `variant="ticks"` is the compact inline style used under the hero. */
export function Checks({ items, variant = "checks" }: { items: readonly ReactNode[]; variant?: "checks" | "ticks" }) {
  return (
    <ul className={variant}>
      {items.map((item, i) => (
        <li key={i}>
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}
