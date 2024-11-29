import type { TileTone } from "@/types/connectors";
import { cn } from "@/lib/cn";

/** Connector monogram tile. `brand` uses the host product's colour, `glyph` the neutral grey. */
export function Tile({ children, tone, size }: { children: string; tone: TileTone | "brand" | "glyph"; size?: "sm" }) {
  const toneClass = tone === "brand" ? "tb" : tone === "glyph" ? "tg" : `t${tone}`;
  return <span className={cn("tile", toneClass, size)}>{children}</span>;
}
