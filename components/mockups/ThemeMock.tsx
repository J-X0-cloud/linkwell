"use client";

import { useState, type CSSProperties } from "react";
import { themeMock } from "@/lib/data/mockups";
import { cn } from "@/lib/cn";
import { Tile } from "@/components/ui/Tile";

/** Marketplace theming: pick a brand colour and tile style, see the embedded page update. */
export function ThemeMock() {
  const [swatch, setSwatch] = useState<number>(themeMock.defaultSwatch);
  const [layout, setLayout] = useState<"Cards" | "List">("Cards");
  const accent = themeMock.swatches[swatch] ?? themeMock.swatches[0];

  return (
    <div className="theme" style={{ "--accent": accent } as CSSProperties}>
      <div className="theme-panel">
        <b>Marketplace appearance</b>
        <label>Brand colour</label>
        <div className="sw" role="radiogroup" aria-label="Brand colour">
          {themeMock.swatches.map((color, i) => (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={i === swatch}
              aria-label={color}
              className={cn(i === swatch && "on")}
              style={{ background: color }}
              onClick={() => setSwatch(i)}
            />
          ))}
        </div>
        <label>Corner radius</label>
        <div className="slider">
          <i style={{ width: "46%" }} />
        </div>
        <label>Custom domain</label>
        <div className="field">{themeMock.domain}</div>
        <label>Tile style</label>
        <div className="seg">
          {(["Cards", "List"] as const).map((option) => (
            <button key={option} type="button" className={cn(layout === option && "on")} aria-pressed={layout === option} onClick={() => setLayout(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="theme-prev">
        <div className="tp-head">
          <b>{themeMock.product}</b>
          <span>Integrations</span>
        </div>
        <div className={cn("tp-grid", layout === "List" && "tp-list")}>
          {themeMock.apps.map((app) => (
            <div key={app.name} className="tp">
              <Tile tone={app.tone}>{app.mono}</Tile>
              <b>{app.name}</b>
              <span className={cn("tp-btn", !app.connected && "line")}>{app.connected ? "Connected" : "Connect"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
