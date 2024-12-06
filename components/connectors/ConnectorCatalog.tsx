"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONNECTOR_CATEGORIES, type ConnectorCategory } from "@/types/connectors";
import type { ConnectorSummary } from "@/lib/connectors/registry";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/cn";
import { Tile } from "@/components/ui/Tile";

interface ConnectorCatalogProps {
  connectors: ConnectorSummary[];
  total: number;
  hero: { eyebrow: string; heading: string; lede: string; searchPlaceholder: string };
}

type CategoryFilter = ConnectorCategory | "All";

/** Catalog header with search, plus the filterable connector grid. Press "/" anywhere on the page to focus search. */
export function ConnectorCatalog({ connectors, total, hero }: ConnectorCatalogProps) {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "/" && target?.tagName !== "INPUT" && target?.tagName !== "TEXTAREA") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return connectors.filter(
      (connector) =>
        (category === "All" || connector.category === category) &&
        (!needle || connector.name.toLowerCase().includes(needle) || connector.category.toLowerCase().includes(needle)),
    );
  }, [connectors, category, query]);

  return (
    <>
      <section className="phero small">
        <div className="wrap">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.heading}</h1>
          <p className="lede">{hero.lede}</p>
          <label className="cat-search">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder={hero.searchPlaceholder}
            aria-label="Search connectors"
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>/</kbd>
          </label>
        </div>
      </section>
      <section className="sec cat">
        <div className="wrap">
          <div className="cat-bar">
            <div className="cat-chips" role="group" aria-label="Category">
              {(["All", ...CONNECTOR_CATEGORIES] as const).map((name) => (
                <button key={name} type="button" className={cn(category === name && "on")} aria-pressed={category === name} onClick={() => setCategory(name)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="conn-grid">
            {visible.map((connector) => (
              <article key={connector.id} className="conn">
                <Tile tone={connector.tone}>{connector.monogram}</Tile>
                <div className="conn-b">
                  <h3>{connector.name}</h3>
                  <em>{connector.category}</em>
                </div>
                <div className="conn-meta">
                  <span className="auth">{connector.auth}</span>
                  <div className="caps">
                    {connector.capabilities.map((capability) => (
                      <span key={capability}>{capability}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cat-more">
            <span className="muted cat-count">
              {visible.length === 0 ? "No connectors match. Request one below." : `Showing ${visible.length} of ${total} connectors`}
            </span>
            <a className="btn btn-line" href={`${siteConfig.docsUrl}/connectors`}>
              Load more connectors
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
